/**
 * Student Attendance Statistics API
 * GET: Fetch detailed attendance statistics for the student
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import type { AttendanceStatistics, MonthlyAttendanceSummary } from '@/types/attendance'

export async function GET(req: NextRequest) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role !== 'STUDENT') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Student access only' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(req.url)
    const courseId = searchParams.get('courseId')
    const enrollmentId = searchParams.get('enrollmentId')

    const where: any = {
      studentId: session.user.id,
    }

    if (courseId) {
      where.session = {
        courseId: courseId,
      }
    }

    if (enrollmentId) {
      where.enrollmentId = enrollmentId
    }

    const attendanceRecords = await prisma.student_attendance.findMany({
      where,
      include: {
        session: true,
      },
      orderBy: {
        markedAt: 'desc',
      },
    })

    const totalSessions = attendanceRecords.length
    const attendedSessions = attendanceRecords.filter(
      (r) => r.status === 'PRESENT' || r.status === 'LATE' || r.status === 'HALF_DAY'
    ).length
    const absentSessions = attendanceRecords.filter((r) => r.status === 'ABSENT').length
    const lateSessions = attendanceRecords.filter((r) => r.status === 'LATE').length
    const excusedSessions = attendanceRecords.filter((r) => r.status === 'EXCUSED').length

    const presentSessions = attendanceRecords.filter((r) => r.status === 'PRESENT').length
    const onTimeSessions = presentSessions
    const attendancePercentage =
      totalSessions > 0 ? Math.round((attendedSessions / totalSessions) * 100) : 0
    const onTimePercentage =
      totalSessions > 0 ? Math.round((onTimeSessions / totalSessions) * 100) : 0

    const participationScores = attendanceRecords
      .filter((r) => r.participationScore !== null)
      .map((r) => r.participationScore as number)
    const averageParticipationScore =
      participationScores.length > 0
        ? Math.round(participationScores.reduce((a, b) => a + b, 0) / participationScores.length)
        : null

    const totalHoursAttended = attendanceRecords
      .filter((r) => r.duration)
      .reduce((sum, r) => sum + (r.duration || 0), 0)

    const currentStreak = calculateStreak(attendanceRecords)
    const longestStreak = calculateLongestStreak(attendanceRecords)

    const recentTrend = calculateTrend(attendanceRecords)
    const warningLevel = calculateWarningLevel(attendancePercentage)

    const monthlyBreakdown = calculateMonthlyBreakdown(attendanceRecords)

    const statistics: AttendanceStatistics = {
      totalSessions,
      attendedSessions,
      absentSessions,
      lateSessions,
      excusedSessions,
      attendancePercentage,
      onTimePercentage,
      averageParticipationScore,
      totalHoursAttended: Math.round(totalHoursAttended / 60),
      currentStreak,
      longestStreak,
      recentTrend,
      warningLevel,
    }

    return NextResponse.json({
      success: true,
      data: {
        statistics,
        monthlyBreakdown,
      },
    })
  } catch (error) {
    console.error('Error fetching attendance statistics:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch attendance statistics' },
      { status: 500 }
    )
  }
}

function calculateStreak(records: any[]): number {
  if (records.length === 0) return 0

  const sortedRecords = [...records].sort(
    (a, b) => new Date(a.markedAt).getTime() - new Date(b.markedAt).getTime()
  )

  let streak = 0
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let i = sortedRecords.length - 1; i >= 0; i--) {
    const record = sortedRecords[i]
    const recordDate = new Date(record.markedAt)
    recordDate.setHours(0, 0, 0, 0)

    const daysDiff = Math.floor((today.getTime() - recordDate.getTime()) / (1000 * 60 * 60 * 24))

    if (daysDiff === streak && (record.status === 'PRESENT' || record.status === 'LATE')) {
      streak++
    } else if (record.status !== 'EXCUSED') {
      break
    }
  }

  return streak
}

function calculateLongestStreak(records: any[]): number {
  if (records.length === 0) return 0

  const sortedRecords = [...records].sort(
    (a, b) => new Date(a.markedAt).getTime() - new Date(b.markedAt).getTime()
  )

  let maxStreak = 0
  let currentStreak = 0

  for (const record of sortedRecords) {
    if (record.status === 'PRESENT' || record.status === 'LATE') {
      currentStreak++
      maxStreak = Math.max(maxStreak, currentStreak)
    } else if (record.status === 'ABSENT') {
      currentStreak = 0
    }
  }

  return maxStreak
}

function calculateTrend(records: any[]): 'improving' | 'declining' | 'stable' {
  if (records.length < 10) return 'stable'

  const recent = records.slice(0, 5)
  const previous = records.slice(5, 10)

  const recentPercentage =
    recent.filter((r) => r.status === 'PRESENT' || r.status === 'LATE').length / recent.length
  const previousPercentage =
    previous.filter((r) => r.status === 'PRESENT' || r.status === 'LATE').length / previous.length

  if (recentPercentage > previousPercentage + 0.1) return 'improving'
  if (recentPercentage < previousPercentage - 0.1) return 'declining'
  return 'stable'
}

function calculateWarningLevel(percentage: number): 'none' | 'low' | 'medium' | 'high' {
  if (percentage >= 85) return 'none'
  if (percentage >= 75) return 'low'
  if (percentage >= 65) return 'medium'
  return 'high'
}

function calculateMonthlyBreakdown(records: any[]): MonthlyAttendanceSummary[] {
  const monthlyData = new Map<string, any>()

  records.forEach((record) => {
    const date = new Date(record.markedAt)
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    const monthName = date.toLocaleString('en-US', { month: 'long' })
    const year = date.getFullYear()

    if (!monthlyData.has(key)) {
      monthlyData.set(key, {
        month: monthName,
        year,
        totalSessions: 0,
        present: 0,
        absent: 0,
        late: 0,
        excused: 0,
      })
    }

    const data = monthlyData.get(key)
    data.totalSessions++

    switch (record.status) {
      case 'PRESENT':
        data.present++
        break
      case 'ABSENT':
        data.absent++
        break
      case 'LATE':
        data.late++
        break
      case 'EXCUSED':
        data.excused++
        break
    }
  })

  const result = Array.from(monthlyData.values()).map((data) => ({
    ...data,
    percentage: Math.round(((data.present + data.late) / data.totalSessions) * 100),
  }))

  result.sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year
    return (
      new Date(`${a.month} 1, ${a.year}`).getMonth() -
      new Date(`${b.month} 1, ${b.year}`).getMonth()
    )
  })

  return result
}
