import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getAvailableMentorSlots } from '@/lib/mentor/slots'

export const dynamic = 'force-dynamic'

/**
 * GET /api/student/mentor-slots — bookable mentor sessions for the next 14 days,
 * with seats remaining. Optional ?teacherId= / ?courseId= filters.
 */
export async function GET(request: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const slots = await getAvailableMentorSlots(new Date(), 14, {
      teacherId: searchParams.get('teacherId') || undefined,
      courseId: searchParams.get('courseId') || undefined,
    })
    return NextResponse.json({ success: true, data: { slots } })
  } catch (error) {
    console.error('[student/mentor-slots] availability error:', error)
    return NextResponse.json({ success: false, error: 'Could not load sessions' }, { status: 500 })
  }
}
