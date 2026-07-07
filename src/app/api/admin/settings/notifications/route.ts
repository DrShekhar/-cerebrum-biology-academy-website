import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { requireAdminAuth } from '@/lib/auth'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getSettings, saveSettings } from '@/lib/settings/siteSettings'

// Persists the admin notification matrix (channels on/off + per-event
// email/sms/whatsapp toggles). SYSTEM-WIDE via site_settings — previously the
// matrix lived in the saving admin's users.profile, so admin A's changes were
// invisible to admin B. Reads fall back to the caller's legacy profile copy
// once, so nothing is lost before the first system-wide save.

const saveSchema = z.object({
  channels: z.array(z.object({ id: z.string(), enabled: z.boolean() })),
  events: z.array(
    z.object({
      id: z.string(),
      email: z.boolean(),
      sms: z.boolean(),
      whatsapp: z.boolean(),
    })
  ),
})

export async function GET() {
  try {
    await requireAdminAuth()
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const stored = await getSettings('notifications')
    if (stored.channels.length > 0 || stored.events.length > 0) {
      return NextResponse.json({ success: true, settings: stored })
    }

    // Lazy migration: fall back to this admin's legacy profile copy.
    const user = await prisma.users.findUnique({
      where: { id: session.user.id },
      select: { profile: true },
    })
    const profile = (user?.profile as Record<string, unknown> | null) || {}
    return NextResponse.json({
      success: true,
      settings: profile.notificationSettings || null,
    })
  } catch (error) {
    console.error('[admin/settings/notifications] GET failed:', error)
    return NextResponse.json({ error: 'Failed to load settings' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdminAuth()
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const parsed = saveSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid settings payload' }, { status: 400 })
    }

    await saveSettings('notifications', parsed.data, session.user.id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[admin/settings/notifications] PUT failed:', error)
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
  }
}
