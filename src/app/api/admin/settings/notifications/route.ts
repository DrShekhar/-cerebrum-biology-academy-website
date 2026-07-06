import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { requireAdminAuth } from '@/lib/auth'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Persists the admin notification matrix (channels on/off + per-event
// email/sms/whatsapp toggles). The settings page previously "saved" via a
// setTimeout and success toast — nothing was written anywhere. Stored under
// the admin user's profile JSON (profile.notificationSettings), so no schema
// migration is required.

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

    const user = await prisma.users.findUnique({
      where: { id: session.user.id },
      select: { profile: true },
    })
    const profile = (user?.profile as Record<string, unknown> | null) || {}

    await prisma.users.update({
      where: { id: session.user.id },
      data: {
        profile: {
          ...profile,
          notificationSettings: {
            ...parsed.data,
            updatedAt: new Date().toISOString(),
          },
        },
        updatedAt: new Date(),
      },
      select: { id: true },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[admin/settings/notifications] PUT failed:', error)
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
  }
}
