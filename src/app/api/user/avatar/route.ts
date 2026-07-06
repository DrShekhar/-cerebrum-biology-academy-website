import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const MAX_BYTES = 4 * 1024 * 1024 // 4 MB
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp']

/**
 * POST /api/user/avatar — profile-photo upload (roadmap P0c).
 * multipart/form-data with a `file` field. Stores in Vercel Blob and writes
 * the URL to users.profile.avatarUrl (JSON — no schema migration).
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({ error: 'Uploads not configured' }, { status: 503 })
    }

    const form = await request.formData()
    const file = form.get('file')
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }
    if (!ALLOWED.includes(file.type)) {
      return NextResponse.json({ error: 'Use a JPG, PNG, or WebP image' }, { status: 400 })
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: 'Image must be under 4 MB' }, { status: 400 })
    }

    const ext = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg'
    const blob = await put(`avatars/${session.user.id}.${ext}`, file, {
      access: 'public',
      contentType: file.type,
      addRandomSuffix: true, // cache-bust on replacement
    })

    const user = await prisma.users.findUnique({
      where: { id: session.user.id },
      select: { profile: true },
    })
    const profile = (user?.profile as Record<string, unknown> | null) || {}
    await prisma.users.update({
      where: { id: session.user.id },
      data: { profile: { ...profile, avatarUrl: blob.url }, updatedAt: new Date() },
      select: { id: true },
    })

    return NextResponse.json({ success: true, avatarUrl: blob.url })
  } catch (error) {
    console.error('[user/avatar] failed:', error)
    return NextResponse.json({ error: 'Failed to upload photo' }, { status: 500 })
  }
}
