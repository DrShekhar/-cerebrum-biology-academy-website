import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { requireAdminAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

/**
 * Admin — YouTube-style video hub management.
 * GET    — all playlists + items (incl. unpublished)
 * POST   — { kind:'playlist', title, description? } | { kind:'item', playlistId,
 *          url? (YouTube link → oEmbed autofills title/thumbnail), videoLectureId?,
 *          title?, durationLabel? }
 * PATCH  — { kind, id, ...fields }   DELETE — ?kind=&id=
 */

function parseYoutubeId(url: string): string | null {
  try {
    const u = new URL(url.trim())
    if (u.hostname === 'youtu.be') return u.pathname.slice(1).split('/')[0] || null
    if (u.hostname.endsWith('youtube.com')) {
      if (u.pathname === '/watch') return u.searchParams.get('v')
      const m = u.pathname.match(/^\/(embed|shorts|live)\/([\w-]{6,})/)
      if (m) return m[2]
    }
    return null
  } catch {
    return null
  }
}

export async function GET() {
  try {
    await requireAdminAuth()
    const playlists = await prisma.video_playlists.findMany({
      orderBy: { sortOrder: 'asc' },
      include: { items: { orderBy: { sortOrder: 'asc' } } },
    })
    return NextResponse.json({ success: true, data: { playlists } })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ success: false, error: 'Failed to load' }, { status: 500 })
  }
}

const postSchema = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('playlist'),
    title: z.string().trim().min(2).max(120),
    description: z.string().max(500).optional(),
  }),
  z.object({
    kind: z.literal('item'),
    playlistId: z.string().min(1),
    url: z.string().url().optional(),
    videoLectureId: z.string().optional(),
    title: z.string().trim().max(200).optional(),
    durationLabel: z.string().max(12).optional(),
  }),
])

export async function POST(request: NextRequest) {
  try {
    await requireAdminAuth()
    const parsed = postSchema.safeParse(await request.json().catch(() => ({})))
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: 'Invalid input' }, { status: 400 })
    }
    const p = parsed.data

    if (p.kind === 'playlist') {
      const count = await prisma.video_playlists.count()
      const playlist = await prisma.video_playlists.create({
        data: { title: p.title, description: p.description || null, sortOrder: count },
      })
      return NextResponse.json({ success: true, data: { playlist } }, { status: 201 })
    }

    // Item: YouTube link OR uploaded lecture
    let youtubeId: string | null = null
    let title = p.title || ''
    let thumbnailUrl: string | null = null

    if (p.url) {
      youtubeId = parseYoutubeId(p.url)
      if (!youtubeId) {
        return NextResponse.json(
          { success: false, error: 'That does not look like a YouTube link.' },
          { status: 400 }
        )
      }
      thumbnailUrl = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`
      if (!title) {
        // Public oEmbed — no API key needed. Best-effort title autofill.
        try {
          const res = await fetch(
            `https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${youtubeId}`)}&format=json`,
            { signal: AbortSignal.timeout(5000) }
          )
          if (res.ok) {
            const meta = (await res.json()) as { title?: string }
            title = meta.title || ''
          }
        } catch {
          /* fall through to manual title requirement */
        }
      }
    } else if (p.videoLectureId) {
      const lecture = await prisma.video_lectures.findUnique({
        where: { id: p.videoLectureId },
        select: { title: true, cloudflareThumbUrl: true, duration: true },
      })
      if (!lecture) {
        return NextResponse.json({ success: false, error: 'Lecture not found' }, { status: 404 })
      }
      title = title || lecture.title
      thumbnailUrl = lecture.cloudflareThumbUrl
    } else {
      return NextResponse.json(
        { success: false, error: 'Provide a YouTube link or a lecture.' },
        { status: 400 }
      )
    }

    if (!title) {
      return NextResponse.json(
        { success: false, error: 'Could not fetch the title — please enter one.' },
        { status: 400 }
      )
    }

    const count = await prisma.video_items.count({ where: { playlistId: p.playlistId } })
    const item = await prisma.video_items.create({
      data: {
        playlistId: p.playlistId,
        title,
        youtubeId,
        videoLectureId: p.videoLectureId || null,
        thumbnailUrl,
        durationLabel: p.durationLabel || null,
        sortOrder: count,
      },
    })
    return NextResponse.json({ success: true, data: { item } }, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[video-hub] POST failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to save' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAdminAuth()
    const { searchParams } = new URL(request.url)
    const kind = searchParams.get('kind')
    const id = searchParams.get('id') || ''
    if (kind === 'playlist') await prisma.video_playlists.delete({ where: { id } })
    else if (kind === 'item') await prisma.video_items.delete({ where: { id } })
    else return NextResponse.json({ success: false, error: 'Invalid kind' }, { status: 400 })
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ success: false, error: 'Delete failed' }, { status: 500 })
  }
}
