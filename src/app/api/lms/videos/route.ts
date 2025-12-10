/**
 * LMS Video API
 *
 * GET - Get video for playback
 * POST - Update video progress
 */

import { NextRequest, NextResponse } from 'next/server'
import { cloudflareStreamService } from '@/lib/lms/cloudflareStream'
import { auth } from '@/lib/auth/config'

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

    const result = await cloudflareStreamService.getVideoForPlayback(videoId, userId)

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      video: {
        url: result.videoUrl,
        thumbnail: result.thumbnail,
        duration: result.duration,
        chapters: result.chapters,
      },
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
