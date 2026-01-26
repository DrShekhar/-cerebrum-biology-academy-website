import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth/config'

export const dynamic = 'force-dynamic'

type ConcernSeverity = 'critical' | 'high' | 'medium' | 'low'
type ConcernCategory = 'attendance' | 'academic' | 'homework' | 'behavior' | 'payment'
type ConcernStatus = 'active' | 'improving' | 'resolved'

interface Concern {
  id: string
  childId: string
  childName: string
  category: ConcernCategory
  severity: ConcernSeverity
  title: string
  description: string
  details: string[]
  status: ConcernStatus
  trend: 'improving' | 'stable' | 'declining'
  actionRecommended?: string
  reportedBy?: string
  reportedAt: string
  lastUpdated: string
}

interface ConcernSummary {
  total: number
  critical: number
  high: number
  medium: number
  low: number
  byCategory: Record<ConcernCategory, number>
  byChild: {
    childId: string
    childName: string
    total: number
    critical: number
  }[]
}

/**
 * GET /api/parent/concerns
 * Fetch concerns and alerts about children based on their academic/behavioral patterns
 *
 * Query params:
 * - childId: Filter by specific child (optional)
 * - category: Filter by category (optional)
 * - severity: Filter by severity (optional)
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const childIdFilter = searchParams.get('childId')
    const categoryFilter = searchParams.get('category') as ConcernCategory | null
    const severityFilter = searchParams.get('severity') as ConcernSeverity | null

    // Verify user is a parent
    const parent = await prisma.users.findUnique({
      where: { id: session.user.id },
      select: { id: true, role: true },
    })

    if (!parent || parent.role !== 'PARENT') {
      return NextResponse.json({ success: false, error: 'Parent access required' }, { status: 403 })
    }

    // Get all children for this parent
    const childRelationships = await prisma.parent_child_relationships.findMany({
      where: {
        parentId: parent.id,
        ...(childIdFilter && { childId: childIdFilter }),
      },
      include: {
        child: {
          select: { id: true, name: true, email: true },
        },
      },
    })

    if (childRelationships.length === 0) {
      return NextResponse.json({
        success: true,
        data: {
          concerns: [],
          summary: {
            total: 0,
            critical: 0,
            high: 0,
            medium: 0,
            low: 0,
            byCategory: { attendance: 0, academic: 0, homework: 0, behavior: 0, payment: 0 },
            byChild: [],
          },
          children: [],
        },
      })
    }

    const childIds = childRelationships.map((r) => r.childId)
    const concerns: Concern[] = []
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    // Analyze each child for concerns
    for (const rel of childRelationships) {
      const childId = rel.childId
      const childName = rel.child.name

      // 1. ATTENDANCE CONCERNS
      const attendanceRecords = await prisma.attendance.findMany({
        where: {
          studentId: childId,
          date: { gte: thirtyDaysAgo },
        },
        orderBy: { date: 'desc' },
      })

      if (attendanceRecords.length > 0) {
        const totalDays = attendanceRecords.length
        const presentDays = attendanceRecords.filter(
          (a) => a.status === 'PRESENT' || a.status === 'LATE'
        ).length
        const absentDays = attendanceRecords.filter((a) => a.status === 'ABSENT').length
        const attendanceRate = (presentDays / totalDays) * 100

        // Check for consecutive absences
        let consecutiveAbsences = 0
        let maxConsecutive = 0
        for (const record of attendanceRecords) {
          if (record.status === 'ABSENT') {
            consecutiveAbsences++
            maxConsecutive = Math.max(maxConsecutive, consecutiveAbsences)
          } else {
            consecutiveAbsences = 0
          }
        }

        // Determine severity based on attendance patterns
        if (attendanceRate < 60 || maxConsecutive >= 5) {
          concerns.push({
            id: `attendance-${childId}-critical`,
            childId,
            childName,
            category: 'attendance',
            severity: 'critical',
            title: 'Critical Attendance Issue',
            description: `Attendance rate is ${attendanceRate.toFixed(0)}% over the last 30 days`,
            details: [
              `Present: ${presentDays} days`,
              `Absent: ${absentDays} days`,
              maxConsecutive >= 3 ? `Max consecutive absences: ${maxConsecutive} days` : '',
            ].filter(Boolean),
            status: 'active',
            trend: 'declining',
            actionRecommended:
              'Please contact the school immediately to discuss attendance improvement plan',
            reportedBy: 'System',
            reportedAt: now.toISOString(),
            lastUpdated: now.toISOString(),
          })
        } else if (attendanceRate < 75 || maxConsecutive >= 3) {
          concerns.push({
            id: `attendance-${childId}-high`,
            childId,
            childName,
            category: 'attendance',
            severity: 'high',
            title: 'Low Attendance',
            description: `Attendance rate is ${attendanceRate.toFixed(0)}% - below expected 85%`,
            details: [
              `Present: ${presentDays} days`,
              `Absent: ${absentDays} days`,
              maxConsecutive >= 3 ? `Recent consecutive absences: ${maxConsecutive} days` : '',
            ].filter(Boolean),
            status: 'active',
            trend: 'stable',
            actionRecommended: 'Ensure regular attendance to maintain academic progress',
            reportedBy: 'System',
            reportedAt: now.toISOString(),
            lastUpdated: now.toISOString(),
          })
        } else if (attendanceRate < 85) {
          concerns.push({
            id: `attendance-${childId}-medium`,
            childId,
            childName,
            category: 'attendance',
            severity: 'medium',
            title: 'Attendance Below Target',
            description: `Attendance rate is ${attendanceRate.toFixed(0)}% - target is 85%`,
            details: [`Present: ${presentDays} days`, `Absent: ${absentDays} days`],
            status: 'active',
            trend: 'stable',
            actionRecommended: 'Monitor attendance closely',
            reportedBy: 'System',
            reportedAt: now.toISOString(),
            lastUpdated: now.toISOString(),
          })
        }
      }

      // 2. ACADEMIC CONCERNS - Test Performance
      const testAttempts = await prisma.test_attempts.findMany({
        where: {
          studentId: childId,
          submittedAt: { gte: thirtyDaysAgo },
        },
        orderBy: { submittedAt: 'desc' },
        take: 10,
      })

      if (testAttempts.length >= 3) {
        const avgScore =
          testAttempts.reduce((sum, t) => sum + (t.percentage || 0), 0) / testAttempts.length
        const recentAvg =
          testAttempts.slice(0, 3).reduce((sum, t) => sum + (t.percentage || 0), 0) / 3
        const olderAvg =
          testAttempts.slice(3).reduce((sum, t) => sum + (t.percentage || 0), 0) /
          Math.max(testAttempts.length - 3, 1)

        const trend =
          recentAvg > olderAvg + 5 ? 'improving' : recentAvg < olderAvg - 5 ? 'declining' : 'stable'

        if (avgScore < 35) {
          concerns.push({
            id: `academic-${childId}-critical`,
            childId,
            childName,
            category: 'academic',
            severity: 'critical',
            title: 'Critical Academic Performance',
            description: `Average test score is ${avgScore.toFixed(0)}% - needs immediate attention`,
            details: [
              `Tests taken: ${testAttempts.length}`,
              `Recent average: ${recentAvg.toFixed(0)}%`,
              `Performance trend: ${trend}`,
            ],
            status: 'active',
            trend,
            actionRecommended: 'Schedule a meeting with teachers to create a remedial study plan',
            reportedBy: 'System',
            reportedAt: now.toISOString(),
            lastUpdated: now.toISOString(),
          })
        } else if (avgScore < 50) {
          concerns.push({
            id: `academic-${childId}-high`,
            childId,
            childName,
            category: 'academic',
            severity: 'high',
            title: 'Below Average Test Performance',
            description: `Average test score is ${avgScore.toFixed(0)}% - below passing threshold`,
            details: [
              `Tests taken: ${testAttempts.length}`,
              `Recent average: ${recentAvg.toFixed(0)}%`,
              `Performance trend: ${trend}`,
            ],
            status: 'active',
            trend,
            actionRecommended: 'Consider additional tutoring or study support',
            reportedBy: 'System',
            reportedAt: now.toISOString(),
            lastUpdated: now.toISOString(),
          })
        } else if (trend === 'declining' && recentAvg < olderAvg - 10) {
          concerns.push({
            id: `academic-${childId}-declining`,
            childId,
            childName,
            category: 'academic',
            severity: 'medium',
            title: 'Declining Test Scores',
            description: `Recent scores dropped from ${olderAvg.toFixed(0)}% to ${recentAvg.toFixed(0)}%`,
            details: [
              `Drop: ${(olderAvg - recentAvg).toFixed(0)} percentage points`,
              `Tests analyzed: ${testAttempts.length}`,
            ],
            status: 'active',
            trend: 'declining',
            actionRecommended: 'Investigate cause of decline and provide support',
            reportedBy: 'System',
            reportedAt: now.toISOString(),
            lastUpdated: now.toISOString(),
          })
        }
      }

      // 3. HOMEWORK CONCERNS
      const assignments = await prisma.assignments.findMany({
        where: {
          enrollments: { studentId: childId },
          dueDate: { gte: thirtyDaysAgo, lte: now },
        },
        include: {
          homework_submissions: {
            where: { studentId: childId },
          },
        },
      })

      if (assignments.length > 0) {
        const totalAssignments = assignments.length
        const submittedOnTime = assignments.filter((a) => {
          const submission = a.homework_submissions[0]
          return submission && submission.submittedAt && submission.submittedAt <= a.dueDate
        }).length
        const lateSubmissions = assignments.filter((a) => {
          const submission = a.homework_submissions[0]
          return submission && submission.submittedAt && submission.submittedAt > a.dueDate
        }).length
        const notSubmitted = assignments.filter((a) => !a.homework_submissions[0]).length
        const completionRate = ((totalAssignments - notSubmitted) / totalAssignments) * 100

        // Check grades
        const gradedSubmissions = assignments
          .filter((a) => a.homework_submissions[0]?.grade !== null)
          .map((a) => a.homework_submissions[0])
        const avgGrade =
          gradedSubmissions.length > 0
            ? gradedSubmissions.reduce((sum, s) => sum + (s?.grade || 0), 0) /
              gradedSubmissions.length
            : null

        if (notSubmitted >= 5 || completionRate < 50) {
          concerns.push({
            id: `homework-${childId}-critical`,
            childId,
            childName,
            category: 'homework',
            severity: 'critical',
            title: 'Critical Homework Backlog',
            description: `${notSubmitted} assignments not submitted in the last 30 days`,
            details: [
              `Total assignments: ${totalAssignments}`,
              `On-time: ${submittedOnTime}`,
              `Late: ${lateSubmissions}`,
              `Not submitted: ${notSubmitted}`,
              `Completion rate: ${completionRate.toFixed(0)}%`,
            ],
            status: 'active',
            trend: 'declining',
            actionRecommended: 'Help your child catch up on pending assignments immediately',
            reportedBy: 'System',
            reportedAt: now.toISOString(),
            lastUpdated: now.toISOString(),
          })
        } else if (notSubmitted >= 3 || completionRate < 70) {
          concerns.push({
            id: `homework-${childId}-high`,
            childId,
            childName,
            category: 'homework',
            severity: 'high',
            title: 'Multiple Missing Assignments',
            description: `${notSubmitted} assignments pending submission`,
            details: [
              `Completion rate: ${completionRate.toFixed(0)}%`,
              avgGrade ? `Average grade: ${avgGrade.toFixed(0)}%` : '',
            ].filter(Boolean),
            status: 'active',
            trend: 'stable',
            actionRecommended: 'Ensure all pending assignments are completed this week',
            reportedBy: 'System',
            reportedAt: now.toISOString(),
            lastUpdated: now.toISOString(),
          })
        } else if (lateSubmissions > submittedOnTime || (avgGrade && avgGrade < 50)) {
          concerns.push({
            id: `homework-${childId}-medium`,
            childId,
            childName,
            category: 'homework',
            severity: 'medium',
            title: avgGrade && avgGrade < 50 ? 'Low Homework Grades' : 'Frequent Late Submissions',
            description:
              avgGrade && avgGrade < 50
                ? `Average homework grade is ${avgGrade.toFixed(0)}%`
                : `${lateSubmissions} out of ${totalAssignments} submissions were late`,
            details: [
              `On-time: ${submittedOnTime}`,
              `Late: ${lateSubmissions}`,
              avgGrade ? `Average grade: ${avgGrade.toFixed(0)}%` : '',
            ].filter(Boolean),
            status: 'active',
            trend: 'stable',
            actionRecommended: 'Establish a homework routine with set times for completion',
            reportedBy: 'System',
            reportedAt: now.toISOString(),
            lastUpdated: now.toISOString(),
          })
        }
      }

      // 4. PAYMENT CONCERNS
      const childEmail = rel.child.email
      if (childEmail) {
        const overduePayments = await prisma.fee_payments.count({
          where: {
            fee_plans: { leads: { email: childEmail } },
            status: { in: ['PENDING', 'OVERDUE'] },
            dueDate: { lt: now },
          },
        })

        const overdueInstallments = await prisma.installments.count({
          where: {
            fee_plans: { leads: { email: childEmail } },
            status: 'OVERDUE',
          },
        })

        const totalOverdue = overduePayments + overdueInstallments

        if (totalOverdue > 0) {
          concerns.push({
            id: `payment-${childId}`,
            childId,
            childName,
            category: 'payment',
            severity: totalOverdue >= 3 ? 'critical' : totalOverdue >= 2 ? 'high' : 'medium',
            title: 'Overdue Payments',
            description: `${totalOverdue} payment${totalOverdue > 1 ? 's' : ''} overdue`,
            details: [
              overduePayments > 0 ? `Fee payments overdue: ${overduePayments}` : '',
              overdueInstallments > 0 ? `Installments overdue: ${overdueInstallments}` : '',
            ].filter(Boolean),
            status: 'active',
            trend: 'stable',
            actionRecommended: 'Please clear pending payments to avoid service disruption',
            reportedBy: 'System',
            reportedAt: now.toISOString(),
            lastUpdated: now.toISOString(),
          })
        }
      }
    }

    // Apply filters
    let filteredConcerns = concerns
    if (categoryFilter) {
      filteredConcerns = filteredConcerns.filter((c) => c.category === categoryFilter)
    }
    if (severityFilter) {
      filteredConcerns = filteredConcerns.filter((c) => c.severity === severityFilter)
    }

    // Sort by severity (critical first) then by date
    const severityOrder: Record<ConcernSeverity, number> = {
      critical: 0,
      high: 1,
      medium: 2,
      low: 3,
    }
    filteredConcerns.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity])

    // Calculate summary
    const summary: ConcernSummary = {
      total: concerns.length,
      critical: concerns.filter((c) => c.severity === 'critical').length,
      high: concerns.filter((c) => c.severity === 'high').length,
      medium: concerns.filter((c) => c.severity === 'medium').length,
      low: concerns.filter((c) => c.severity === 'low').length,
      byCategory: {
        attendance: concerns.filter((c) => c.category === 'attendance').length,
        academic: concerns.filter((c) => c.category === 'academic').length,
        homework: concerns.filter((c) => c.category === 'homework').length,
        behavior: concerns.filter((c) => c.category === 'behavior').length,
        payment: concerns.filter((c) => c.category === 'payment').length,
      },
      byChild: childRelationships.map((rel) => {
        const childConcerns = concerns.filter((c) => c.childId === rel.childId)
        return {
          childId: rel.childId,
          childName: rel.child.name,
          total: childConcerns.length,
          critical: childConcerns.filter((c) => c.severity === 'critical').length,
        }
      }),
    }

    return NextResponse.json({
      success: true,
      data: {
        concerns: filteredConcerns,
        summary,
        children: childRelationships.map((r) => ({
          id: r.child.id,
          name: r.child.name,
        })),
      },
    })
  } catch (error) {
    console.error('Error fetching parent concerns:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch concerns data' },
      { status: 500 }
    )
  }
}
