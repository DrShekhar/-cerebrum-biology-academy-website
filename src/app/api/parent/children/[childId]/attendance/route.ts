import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth/config'

export const dynamic = 'force-dynamic'

interface RouteParams {
  params: Promise<{ childId: string }>
}

/**
 * GET /api/parent/children/[childId]/attendance
 * Fetch attendance records for a specific child
 *
 * Query params:
 * - period: Filter by period (today, week, month, all)
 * - startDate: Custom start date (YYYY-MM-DD)
 * - endDate: Custom end date (YYYY-MM-DD)
 * - limit: Number of results (default 30)
 * - offset: Pagination offset (default 0)
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 })
    }

    const { childId } = await params
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || 'month'
    const customStartDate = searchParams.get('startDate')
    const customEndDate = searchParams.get('endDate')
    const limit = Math.min(parseInt(searchParams.get('limit') || '30'), 100)
    const offset = parseInt(searchParams.get('offset') || '0')

    // Verify parent has access to this child
    const parentChildRelation = await prisma.parent_child_relationships.findFirst({
      where: {
        parentId: session.user.id,
        childId: childId,
      },
      include: {
        child: {
          select: { id: true, name: true, email: true, currentClass: true },
        },
      },
    })

    if (!parentChildRelation) {
      return NextResponse.json(
        { success: false, error: 'You do not have access to this child\'s data' },
        { status: 403 }
      )
    }

    // Calculate date range
    const { startDate, endDate } = getDateRange(period, customStartDate, customEndDate)

    // Fetch attendance records
    const attendanceRecords = await prisma.student_attendance.findMany({
      where: {
        studentId: childId,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        session: {
          select: {
            id: true,
            title: true,
            scheduledDate: true,
            startTime: true,
            endTime: true,
            status: true,
            course: { select: { id: true, name: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: offset,
      take: limit,
    })

    // Transform attendance data
    const attendance = attendanceRecords.map((record) => ({
      id: record.id,
      date: record.createdAt.toISOString(),
      status: record.status,
      statusLabel: getStatusLabel(record.status),
      session: {
        id: record.session.id,
        title: record.session.title,
        scheduledDate: record.session.scheduledDate.toISOString(),
        startTime: record.session.startTime,
        endTime: record.session.endTime,
        course: record.session.course,
      },
      checkInTime: record.checkInTime?.toISOString(),
      checkOutTime: record.checkOutTime?.toISOString(),
      duration: record.duration,
      isLate: record.isLate,
      lateBy: record.lateBy,
      isExcused: record.isExcused,
      notes: record.notes,
      participationScore: record.participationScore,
    }))

    // Calculate statistics for the period
    const allAttendanceInPeriod = await prisma.student_attendance.findMany({
      where: {
        studentId: childId,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: { status: true, isLate: true, isExcused: true, duration: true },
    })

    const stats = calculateAttendanceStats(allAttendanceInPeriod)

    // Calculate weekly breakdown for the period
    const weeklyBreakdown = await calculateWeeklyBreakdown(childId, startDate, endDate)

    // Calculate monthly summary for the year
    const monthlyTrend = await calculateMonthlyTrend(childId)

    return NextResponse.json({
      success: true,
      data: {
        child: parentChildRelation.child,
        attendance,
        stats,
        weeklyBreakdown,
        monthlyTrend,
        period: {
          name: period,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
        pagination: {
          limit,
          offset,
          hasMore: attendance.length === limit,
        },
      },
    })
  } catch (error) {
    console.error('Error fetching child attendance:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch attendance data' },
      { status: 500 }
    )
  }
}

function getDateRange(
  period: string,
  customStart: string | null,
  customEnd: string | null
): { startDate: Date; endDate: Date } {
  const now = new Date()
  const endDate = customEnd ? new Date(customEnd) : new Date(now)
  endDate.setHours(23, 59, 59, 999)

  let startDate: Date

  if (customStart) {
    startDate = new Date(customStart)
  } else {
    switch (period) {
      case 'today':
        startDate = new Date(now)
        startDate.setHours(0, 0, 0, 0)
        break
      case 'week':
        startDate = new Date(now)
        startDate.setDate(now.getDate() - 7)
        startDate.setHours(0, 0, 0, 0)
        break
      case 'month':
        startDate = new Date(now)
        startDate.setMonth(now.getMonth() - 1)
        startDate.setHours(0, 0, 0, 0)
        break
      case 'all':
        startDate = new Date('2020-01-01')
        break
      default:
        startDate = new Date(now)
        startDate.setMonth(now.getMonth() - 1)
        startDate.setHours(0, 0, 0, 0)
    }
  }

  return { startDate, endDate }
}

function getStatusLabel(status: string): string {
  switch (status) {
    case 'PRESENT':
      return 'Present'
    case 'ABSENT':
      return 'Absent'
    case 'LATE':
      return 'Late'
    case 'EXCUSED':
      return 'Excused'
    case 'HALF_DAY':
      return 'Half Day'
    default:
      return status
  }
}

interface AttendanceRecord {
  status: string
  isLate: boolean
  isExcused: boolean
  duration: number | null
}

interface AttendanceStats {
  totalSessions: number
  present: number
  absent: number
  late: number
  excused: number
  attendanceRate: number
  punctualityRate: number
  totalDuration: number
  avgDurationPerSession: number
}

function calculateAttendanceStats(records: AttendanceRecord[]): AttendanceStats {
  const totalSessions = records.length
  const present = records.filter((r) => r.status === 'PRESENT' || r.status === 'LATE').length
  const absent = records.filter((r) => r.status === 'ABSENT').length
  const late = records.filter((r) => r.isLate || r.status === 'LATE').length
  const excused = records.filter((r) => r.isExcused || r.status === 'EXCUSED').length
  const totalDuration = records.reduce((acc, r) => acc + (r.duration || 0), 0)

  return {
    totalSessions,
    present,
    absent,
    late,
    excused,
    attendanceRate: totalSessions > 0 ? Math.round((present / totalSessions) * 100) : 0,
    punctualityRate:
      present > 0 ? Math.round(((present - late) / present) * 100) : 0,
    totalDuration,
    avgDurationPerSession: present > 0 ? Math.round(totalDuration / present) : 0,
  }
}

interface WeeklyData {
  weekStart: string
  weekEnd: string
  present: number
  absent: number
  late: number
  total: number
  rate: number
}

async function calculateWeeklyBreakdown(
  childId: string,
  startDate: Date,
  endDate: Date
): Promise<WeeklyData[]> {
  const weeks: WeeklyData[] = []
  const current = new Date(startDate)

  while (current <= endDate) {
    const weekStart = new Date(current)
    const weekEnd = new Date(current)
    weekEnd.setDate(weekEnd.getDate() + 6)

    if (weekEnd > endDate) {
      weekEnd.setTime(endDate.getTime())
    }

    const records = await prisma.student_attendance.findMany({
      where: {
        studentId: childId,
        createdAt: {
          gte: weekStart,
          lte: weekEnd,
        },
      },
      select: { status: true, isLate: true },
    })

    const total = records.length
    const present = records.filter((r) => r.status === 'PRESENT' || r.status === 'LATE').length
    const absent = records.filter((r) => r.status === 'ABSENT').length
    const late = records.filter((r) => r.isLate || r.status === 'LATE').length

    weeks.push({
      weekStart: weekStart.toISOString(),
      weekEnd: weekEnd.toISOString(),
      present,
      absent,
      late,
      total,
      rate: total > 0 ? Math.round((present / total) * 100) : 0,
    })

    current.setDate(current.getDate() + 7)
  }

  return weeks
}

interface MonthlyData {
  month: string
  year: number
  present: number
  absent: number
  total: number
  rate: number
}

async function calculateMonthlyTrend(childId: string): Promise<MonthlyData[]> {
  const months: MonthlyData[] = []
  const now = new Date()

  for (let i = 5; i >= 0; i--) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59, 999)

    const records = await prisma.student_attendance.findMany({
      where: {
        studentId: childId,
        createdAt: {
          gte: monthStart,
          lte: monthEnd,
        },
      },
      select: { status: true },
    })

    const total = records.length
    const present = records.filter((r) => r.status === 'PRESENT' || r.status === 'LATE').length
    const absent = records.filter((r) => r.status === 'ABSENT').length

    const monthName = monthStart.toLocaleString('en-US', { month: 'short' })

    months.push({
      month: monthName,
      year: monthStart.getFullYear(),
      present,
      absent,
      total,
      rate: total > 0 ? Math.round((present / total) * 100) : 0,
    })
  }

  return months
}
