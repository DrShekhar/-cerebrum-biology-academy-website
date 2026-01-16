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

    if (session.user.role !== 'student') {
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
      const days = parseInt(period)
      dateFrom = new Date()
      dateFrom.setDate(dateFrom.getDate() - days)
    }

    // Fetch work tracking records
    const workTracking = await prisma.work_tracking.findMany({
      where: {
        studentId,
        ...(courseId && { courseId }),
        date: {
          gte: dateFrom,
          lte: dateTo,
        },
      },
      orderBy: {
        date: 'desc',
      },
    })

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
