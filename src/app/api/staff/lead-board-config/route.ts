import { NextRequest, NextResponse } from 'next/server'
import { authenticateStaff } from '@/lib/auth/staff-auth'
import { getSettings, saveSettings, leadBoardSettingsSchema } from '@/lib/settings/siteSettings'

export const dynamic = 'force-dynamic'

/**
 * Team-wide lead-board color vocabulary. GET: any staff (the legend).
 * PUT: admin/counselor edit the labels so the whole team shares one meaning
 * per color.
 */
export async function GET() {
  const authResult = await authenticateStaff()
  if ('error' in authResult) return authResult.error

  try {
    const settings = await getSettings('leadBoard')
    return NextResponse.json({ success: true, data: settings })
  } catch (error) {
    console.error('[staff/lead-board-config] GET failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to load config' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const authResult = await authenticateStaff()
  if ('error' in authResult) return authResult.error
  const { session } = authResult

  if (session.role !== 'ADMIN' && session.role !== 'COUNSELOR') {
    return NextResponse.json(
      { success: false, error: 'Only admins and counselors can edit the legend' },
      { status: 403 }
    )
  }

  try {
    const parsed = leadBoardSettingsSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid config', details: parsed.error.issues },
        { status: 400 }
      )
    }
    const saved = await saveSettings('leadBoard', parsed.data, session.userId)
    return NextResponse.json({ success: true, data: saved })
  } catch (error) {
    console.error('[staff/lead-board-config] PUT failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to save config' }, { status: 500 })
  }
}
