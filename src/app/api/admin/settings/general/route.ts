import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { requireAdminAuth } from '@/lib/auth'
import { getSettings, saveSettings, generalSettingsSchema } from '@/lib/settings/siteSettings'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await requireAdminAuth()
    const settings = await getSettings('general')
    return NextResponse.json({ success: true, data: settings })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[admin/settings/general] GET failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to load settings' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const adminSession = await requireAdminAuth()

    const body = await request.json()
    const parsed = generalSettingsSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid settings payload', details: parsed.error.issues },
        { status: 400 }
      )
    }

    const saved = await saveSettings('general', parsed.data, adminSession?.user?.id)
    return NextResponse.json({ success: true, data: saved })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[admin/settings/general] PUT failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to save settings' }, { status: 500 })
  }
}
