/**
 * Student Work Tracking API
 * GET: Fetch work tracking data with summary statistics
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

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

    const studentId = session.user.id
    const { searchParams } = new URL(req.url)
    const courseId = searchParams.get('courseId')
    const period = searchParams.get('period') || '7' // days
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    // Calculate date range
    let dateFrom: Date
    let dateTo: Date = new Date()

    if (startDate && endDate) {
      dateFrom = new Date(startDate)
      dateTo = new Date(endDate)
    } else {
      const parsed = Number.parseInt(period, 10)
      const days = Number.isFinite(parsed) ? parsed : 30 // tolerate 'week'/'month'/etc.
      dateFrom = new Date()
      dateFrom.setDate(dateFrom.getDate() - days)
    }

    // Real daily activity, computed from student-side signals. The work_tracking
    // table has no writer, so instead of returning an empty (fake-looking) report
    // we aggregate real events: completed test sessions, material study time, and
    // class attendance. Teacher-side counters (assigned/checked) stay 0 until a
    // teacher-tracking flow exists.
    const dayKey = (d: Date) => d.toISOString().slice(0, 10)
    type DayRecord = {
      date: Date
      assignmentsAssigned: number
      assignmentsSubmitted: number
      assignmentsChecked: number
      testsAssigned: number
      testsAttempted: number
      testsChecked: number
      worksheetsAssigned: number
      worksheetsSubmitted: number
      worksheetsChecked: number
      classesScheduled: number
      classesAttended: number
      studyMinutes: number
      remarks: string | null
      specialNotes: string | null
    }
    const byDay = new Map<string, DayRecord>()
    const ensureDay = (key: string): DayRecord => {
      let rec = byDay.get(key)
      if (!rec) {
        rec = {
          date: new Date(key),
          assignmentsAssigned: 0,
          assignmentsSubmitted: 0,
          assignmentsChecked: 0,
          testsAssigned: 0,
          testsAttempted: 0,
          testsChecked: 0,
          worksheetsAssigned: 0,
          worksheetsSubmitted: 0,
          worksheetsChecked: 0,
          classesScheduled: 0,
          classesAttended: 0,
          studyMinutes: 0,
          remarks: null,
          specialNotes: null,
        }
        byDay.set(key, rec)
      }
      return rec
    }

    const [sessions, matProgress, attendance] = await Promise.all([
      prisma.test_sessions.findMany({
        where: { userId: studentId, status: 'COMPLETED', createdAt: { gte: dateFrom, lte: dateTo } },
        select: { createdAt: true, timeSpent: true },
      }),
      prisma.material_progress.findMany({
        where: { userId: studentId, lastViewedAt: { gte: dateFrom, lte: dateTo } },
        select: { lastViewedAt: true, timeSpent: true },
      }),
      prisma.student_attendance.findMany({
        where: { studentId, markedAt: { gte: dateFrom, lte: dateTo } },
        select: { markedAt: true, status: true },
      }),
    ])

    for (const s of sessions) {
      const rec = ensureDay(dayKey(s.createdAt))
      rec.testsAttempted += 1
      rec.studyMinutes += Math.round((s.timeSpent || 0) / 60)
    }
    for (const m of matProgress) {
      if (!m.lastViewedAt) continue
      const rec = ensureDay(dayKey(m.lastViewedAt))
      rec.studyMinutes += Math.round((m.timeSpent || 0) / 60)
    }
    for (const a of attendance) {
      const rec = ensureDay(dayKey(a.markedAt))
      rec.classesScheduled += 1
      if (a.status === 'PRESENT' || a.status === 'LATE' || a.status === 'HALF_DAY') {
        rec.classesAttended += 1
      }
    }

    const workTracking = Array.from(byDay.values()).sort(
      (x, y) => y.date.getTime() - x.date.getTime()
    )
    void courseId // course-scoping not applied to computed activity (period-based)

    // Calculate aggregate statistics
    const totals = workTracking.reduce(
      (acc, record) => ({
        assignmentsAssigned: acc.assignmentsAssigned + record.assignmentsAssigned,
        assignmentsSubmitted: acc.assignmentsSubmitted + record.assignmentsSubmitted,
        assignmentsChecked: acc.assignmentsChecked + record.assignmentsChecked,
        testsAssigned: acc.testsAssigned + record.testsAssigned,
        testsAttempted: acc.testsAttempted + record.testsAttempted,
        testsChecked: acc.testsChecked + record.testsChecked,
        worksheetsAssigned: acc.worksheetsAssigned + record.worksheetsAssigned,
        worksheetsSubmitted: acc.worksheetsSubmitted + record.worksheetsSubmitted,
        worksheetsChecked: acc.worksheetsChecked + record.worksheetsChecked,
        classesScheduled: acc.classesScheduled + record.classesScheduled,
        classesAttended: acc.classesAttended + record.classesAttended,
        studyMinutes: acc.studyMinutes + record.studyMinutes,
      }),
      {
        assignmentsAssigned: 0,
        assignmentsSubmitted: 0,
        assignmentsChecked: 0,
        testsAssigned: 0,
        testsAttempted: 0,
        testsChecked: 0,
        worksheetsAssigned: 0,
        worksheetsSubmitted: 0,
        worksheetsChecked: 0,
        classesScheduled: 0,
        classesAttended: 0,
        studyMinutes: 0,
      }
    )

    // Calculate completion rates
    const assignmentCompletionRate =
      totals.assignmentsAssigned > 0
        ? Math.round((totals.assignmentsSubmitted / totals.assignmentsAssigned) * 100)
        : 0

    const testCompletionRate =
      totals.testsAssigned > 0
        ? Math.round((totals.testsAttempted / totals.testsAssigned) * 100)
        : 0

    const worksheetCompletionRate =
      totals.worksheetsAssigned > 0
        ? Math.round((totals.worksheetsSubmitted / totals.worksheetsAssigned) * 100)
        : 0

    const attendanceRate =
      totals.classesScheduled > 0
        ? Math.round((totals.classesAttended / totals.classesScheduled) * 100)
        : 0

    // Get pending work counts
    const pendingAssignments = totals.assignmentsAssigned - totals.assignmentsSubmitted
    const pendingTests = totals.testsAssigned - totals.testsAttempted
    const pendingWorksheets = totals.worksheetsAssigned - totals.worksheetsSubmitted

    // Format daily records for chart display
    const dailyData = workTracking.map((record) => ({
      date: record.date,
      assignments: {
        assigned: record.assignmentsAssigned,
        submitted: record.assignmentsSubmitted,
        checked: record.assignmentsChecked,
      },
      tests: {
        assigned: record.testsAssigned,
        attempted: record.testsAttempted,
        checked: record.testsChecked,
      },
      worksheets: {
        assigned: record.worksheetsAssigned,
        submitted: record.worksheetsSubmitted,
        checked: record.worksheetsChecked,
      },
      classes: {
        scheduled: record.classesScheduled,
        attended: record.classesAttended,
      },
      studyMinutes: record.studyMinutes,
      remarks: record.remarks,
      specialNotes: record.specialNotes,
    }))

    // Get special notes/remarks from recent records
    const recentRemarks = workTracking
      .filter((r) => r.remarks || r.specialNotes)
      .slice(0, 5)
      .map((r) => ({
        date: r.date,
        remarks: r.remarks,
        specialNotes: r.specialNotes,
      }))

    // Calculate overall completion score (weighted average)
    const overallCompletionScore = Math.round(
      assignmentCompletionRate * 0.35 +
        testCompletionRate * 0.35 +
        worksheetCompletionRate * 0.15 +
        attendanceRate * 0.15
    )

    return NextResponse.json({
      success: true,
      data: {
        summary: {
          period: {
            from: dateFrom,
            to: dateTo,
            days: Math.ceil((dateTo.getTime() - dateFrom.getTime()) / (1000 * 60 * 60 * 24)),
          },
          totals,
          completionRates: {
            assignments: assignmentCompletionRate,
            tests: testCompletionRate,
            worksheets: worksheetCompletionRate,
            attendance: attendanceRate,
            overall: overallCompletionScore,
          },
          pending: {
            assignments: pendingAssignments,
            tests: pendingTests,
            worksheets: pendingWorksheets,
            total: pendingAssignments + pendingTests + pendingWorksheets,
          },
          studyHours: Math.round((totals.studyMinutes / 60) * 10) / 10,
        },
        dailyData,
        recentRemarks,
        recordCount: workTracking.length,
      },
    })
  } catch (error) {
    console.error('Error fetching work tracking:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch work tracking data' },
      { status: 500 }
    )
  }
}
