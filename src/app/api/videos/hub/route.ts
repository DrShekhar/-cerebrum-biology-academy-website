import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

/**
 * Student video hub — published playlists + items for ANY signed-in account,
 * including FREE tier (engagement/nurture surface, deliberately ungated).
 * POST { itemId } increments the view counter.
 */
export async function GET() {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Please sign in.' }, { status: 401 })
  }
  try {
    const playlists = await prisma.video_playlists.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: 'asc' },
      include: {
        items: {
          where: { isPublished: true },
          orderBy: { sortOrder: 'asc' },
          select: {
            id: true,
            title: true,
            description: true,
            youtubeId: true,
            videoLectureId: true,
            thumbnailUrl: true,
            durationLabel: true,
            viewCount: true,
          },
        },
      },
    })
    return NextResponse.json({
      success: true,
      data: { playlists: playlists.filter((p) => p.items.length > 0) },
    })
  } catch (error) {
    console.error('[videos/hub] failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to load videos' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ success: false }, { status: 401 })
  try {
    const body = (await request.json().catch(() => ({}))) as { itemId?: string }
    if (body.itemId) {
      await prisma.video_items.update({
        where: { id: body.itemId },
        data: { viewCount: { increment: 1 } },
      })
    }
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: true }) // view counting is best-effort
  }
}
