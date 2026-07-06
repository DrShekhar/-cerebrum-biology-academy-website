import { NextRequest, NextResponse } from 'next/server'
import { performanceAnalytics } from '@/lib/analytics/performanceService'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const testAttemptId = searchParams.get('testAttemptId')

    if (!testAttemptId) {
      return NextResponse.json({ error: 'Test attempt ID is required' }, { status: 400 })
    }

    // SECURITY: was open to any testAttemptId (IDOR). Require login and
    // ownership of the attempt (staff can view any).
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const isStaff = ['ADMIN', 'TEACHER', 'COUNSELOR'].includes(session.user.role as string)
    const attempt = await prisma.test_attempts.findUnique({
      where: { id: testAttemptId },
      select: { freeUserId: true },
    })
    if (!attempt || (!isStaff && attempt.freeUserId !== session.user.id)) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const sessionAnalytics = await performanceAnalytics.getTestSessionAnalytics(testAttemptId)

    return NextResponse.json({
      success: true,
      data: sessionAnalytics,
    })
  } catch (error) {
    console.error('Error fetching test session analytics:', error)
    return NextResponse.json({ error: 'Failed to fetch test session analytics' }, { status: 500 })
  }
}
