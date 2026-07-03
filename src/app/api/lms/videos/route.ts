/**
 * LMS Video API
 *
 * GET - Get video for playback
 * POST - Update video progress
 */

import { NextRequest, NextResponse } from 'next/server'
import { cloudflareStreamService } from '@/lib/lms/cloudflareStream'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { hasTierAccess, getUserTier, tierLabel } from '@/lib/access/tierAccess'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    const { searchParams } = new URL(request.url)
    const videoId = searchParams.get('videoId')
    const action = searchParams.get('action') || 'playback'

    if (action === 'status') {
      // Return service status
      const status = cloudflareStreamService.getServiceStatus()
      return NextResponse.json({
        success: true,
        service: 'Cloudflare Stream',
        status,
      })
    }

    if (!videoId) {
      return NextResponse.json({ success: false, error: 'videoId is required' }, { status: 400 })
    }

    // For playback, require authentication
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Get user ID from session (using email as fallback)
    const userId = (session.user as { id?: string }).id || session.user.email

    // Tier gate: if the lecture's study material requires a tier, the user's
    // coachingTier must be at or above it.
    const lecture = await prisma.video_lectures.findFirst({
      where: { OR: [{ cloudflareVideoId: videoId }, { id: videoId }] },
      select: {
        id: true,
        study_materials: { select: { requiredTier: true } },
        video_checkpoints: {
          orderBy: { timeSeconds: 'asc' },
          select: {
            id: true,
            timeSeconds: true,
            isRequired: true,
            questions: { select: { id: true, question: true, options: true } },
          },
        },
      },
    })
    const requiredTier = lecture?.study_materials?.requiredTier
    if (requiredTier) {
      const realUserId = (session.user as { id?: string }).id
      const userTier = realUserId ? await getUserTier(realUserId) : 'FREE'
      if (!hasTierAccess(userTier, requiredTier)) {
        return NextResponse.json(
          {
            success: false,
            error: `This lecture is part of the ${tierLabel(requiredTier)} plan. Upgrade to watch it.`,
            requiredTier,
            upgradeUrl: '/pricing',
          },
          { status: 403 }
        )
      }
    }

    const result = await cloudflareStreamService.getVideoForPlayback(videoId, userId)

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 404 })
    }

    // In-video quiz checkpoints — question text + lettered options only; the
    // correct answer stays server-side (validated at /api/lms/videos/checkpoint).
    const parseOpts = (raw: unknown): string[] => {
      if (Array.isArray(raw)) return raw.map(String)
      if (typeof raw === 'string') {
        try {
          const p = JSON.parse(raw)
          return Array.isArray(p) ? p.map(String) : []
        } catch {
          return []
        }
      }
      return []
    }
    const checkpoints = (lecture?.video_checkpoints || [])
      .map((c) => {
        const opts = parseOpts(c.questions.options)
        if (opts.length === 0) return null
        return {
          id: c.id,
          timeSeconds: c.timeSeconds,
          isRequired: c.isRequired,
          question: {
            text: c.questions.question,
            options: opts.map((text, i) => ({ id: String.fromCharCode(65 + i), text })),
          },
        }
      })
      .filter(Boolean)

    return NextResponse.json({
      success: true,
      video: {
        url: result.videoUrl,
        thumbnail: result.thumbnail,
        duration: result.duration,
        chapters: result.chapters,
      },
      checkpoints,
      progress: result.progress,
    })
  } catch (error) {
    console.error('LMS Video API error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { videoId, currentPosition, watchedSeconds, isCompleted } = body

    if (!videoId) {
      return NextResponse.json({ success: false, error: 'videoId is required' }, { status: 400 })
    }

    if (currentPosition === undefined) {
      return NextResponse.json(
        { success: false, error: 'currentPosition is required' },
        { status: 400 }
      )
    }

    const userId = (session.user as { id?: string }).id || session.user.email

    await cloudflareStreamService.updateVideoProgress(videoId, userId, {
      currentPosition,
      watchedSeconds,
      isCompleted,
    })

    return NextResponse.json({
      success: true,
      message: 'Progress updated',
    })
  } catch (error) {
    console.error('LMS Video progress error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
