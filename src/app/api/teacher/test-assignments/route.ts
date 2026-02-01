/**
 * Teacher Test Assignments API
 *
 * GET /api/teacher/test-assignments - Get all test assignments created by teacher
 * POST /api/teacher/test-assignments - Create new test assignment
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session || (session.user.role !== 'TEACHER' && session.user.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const teacherId = session.user.id

    const where: any = {
      teacherId,
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (status) {
      where.status = status
    }

    const [assignments, total] = await Promise.all([
      prisma.test_assignments.findMany({
        where,
        include: {
          testTemplate: {
            select: {
              id: true,
              title: true,
              type: true,
            },
          },
          submissions: {
            select: {
              id: true,
              status: true,
              submittedAt: true,
              totalScore: true,
              percentage: true,
            },
          },
          questions: {
            select: {
              id: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.test_assignments.count({ where }),
    ])

    const stats = await prisma.test_assignments.groupBy({
      by: ['status'],
      where: { teacherId },
      _count: true,
    })

    const statsMap = {
      totalAssignments: total,
      draftAssignments: stats.find((s) => s.status === 'DRAFT')?._count || 0,
      publishedAssignments: stats.find((s) => s.status === 'PUBLISHED')?._count || 0,
      activeAssignments: stats.find((s) => s.status === 'ACTIVE')?._count || 0,
      completedAssignments: stats.find((s) => s.status === 'COMPLETED')?._count || 0,
      upcomingDeadlines: assignments.filter(
        (a) =>
          (a.status === 'PUBLISHED' || a.status === 'ACTIVE') && new Date(a.dueDate) > new Date()
      ).length,
    }

    return NextResponse.json({
      success: true,
      assignments: assignments.map((a) => {
        const totalSubmissions = a.submissions.length
        const submittedCount = a.submissions.filter(
          (s) => s.status === 'SUBMITTED' || s.status === 'GRADED'
        ).length
        const gradedCount = a.submissions.filter((s) => s.status === 'GRADED').length
        const inProgressCount = a.submissions.filter((s) => s.status === 'IN_PROGRESS').length
        const avgScore =
          a.submissions.length > 0
            ? a.submissions.reduce((acc, s) => acc + (Number(s.percentage) || 0), 0) /
              a.submissions.length
            : 0

        return {
          id: a.id,
          title: a.title,
          description: a.description,
          instructions: a.instructions,
          difficulty: a.difficulty,
          totalQuestions: a.totalQuestions,
          totalMarks: a.totalMarks,
          duration: a.duration,
          negativeMarking: a.negativeMarking,
          negativeMarkValue: a.negativeMarkValue,
          shuffleQuestions: a.shuffleQuestions,
          showResults: a.showResults,
          passingMarks: a.passingMarks,
          assignToType: a.assignToType,
          dueDate: a.dueDate,
          availableFrom: a.availableFrom,
          status: a.status,
          publishedAt: a.publishedAt,
          selectedChapters: a.selectedChapters,
          selectedTopics: a.selectedTopics,
          questionSource: a.questionSource,
          useAI: a.useAI,
          createdAt: a.createdAt,
          updatedAt: a.updatedAt,
          testTemplate: a.testTemplate,
          questionsCount: a.questions.length,
          submissionStats: {
            total: a.totalAssigned,
            submitted: submittedCount,
            graded: gradedCount,
            inProgress: inProgressCount,
            pending: a.totalAssigned - submittedCount - inProgressCount,
            averageScore: avgScore.toFixed(1),
          },
        }
      }),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      stats: statsMap,
    })
  } catch (error) {
    console.error('Failed to fetch test assignments:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch test assignments',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session || (session.user.role !== 'TEACHER' && session.user.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
    }

    const teacherId = session.user.id
    const body = await request.json()

    const {
      testTemplateId,
      title,
      description,
      instructions,
      difficulty,
      totalQuestions,
      totalMarks,
      duration,
      negativeMarking,
      negativeMarkValue,
      shuffleQuestions,
      showResults,
      passingMarks,
      assignToType,
      assignedClassIds,
      assignedBatchIds,
      assignedStudentIds,
      courseId,
      dueDate,
      availableFrom,
      status,
      selectedChapters,
      selectedTopics,
      questionSource,
      useAI,
      questions,
    } = body

    if (!title || !totalQuestions || !totalMarks || !duration || !dueDate) {
      return NextResponse.json(
        { error: 'Title, total questions, total marks, duration, and due date are required' },
        { status: 400 }
      )
    }

    let totalAssigned = 0
    if (assignToType === 'ALL_STUDENTS' && courseId) {
      const enrolledCount = await prisma.enrollments.count({
        where: {
          courseId,
          status: 'ACTIVE',
        },
      })
      totalAssigned = enrolledCount
    } else if (assignToType === 'INDIVIDUAL_STUDENTS') {
      totalAssigned = assignedStudentIds?.length || 0
    }

    const assignment = await prisma.test_assignments.create({
      data: {
        teacherId,
        testTemplateId: testTemplateId || null,
        title,
        description: description || null,
        instructions: instructions || null,
        difficulty: difficulty || 'MEDIUM',
        totalQuestions: parseInt(totalQuestions),
        totalMarks: parseInt(totalMarks),
        duration: parseInt(duration),
        negativeMarking: negativeMarking || false,
        negativeMarkValue: negativeMarkValue || null,
        shuffleQuestions: shuffleQuestions || false,
        showResults: showResults || 'IMMEDIATELY',
        passingMarks: passingMarks ? parseInt(passingMarks) : null,
        assignToType: assignToType || 'ALL_STUDENTS',
        assignedClassIds: assignedClassIds || [],
        assignedBatchIds: assignedBatchIds || [],
        assignedStudentIds: assignedStudentIds || [],
        courseId: courseId || null,
        dueDate: new Date(dueDate),
        availableFrom: availableFrom ? new Date(availableFrom) : null,
        status: status || 'DRAFT',
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
        selectedChapters: selectedChapters || [],
        selectedTopics: selectedTopics || [],
        questionSource: questionSource || 'QUESTION_BANK',
        useAI: useAI || false,
        totalAssigned,
      },
      include: {
        testTemplate: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    })

    if (questions && questions.length > 0) {
      await prisma.test_assignment_questions.createMany({
        data: questions.map((q: any, index: number) => ({
          testAssignmentId: assignment.id,
          questionId: q.questionId,
          orderIndex: index,
          marks: q.marks || 4,
          negativeMarks: q.negativeMarks || null,
        })),
      })
    }

    if (status === 'PUBLISHED') {
      let studentIds: string[] = []

      if (assignToType === 'ALL_STUDENTS' && courseId) {
        const enrollments = await prisma.enrollments.findMany({
          where: {
            courseId,
            status: 'ACTIVE',
          },
          select: {
            userId: true,
          },
        })
        studentIds = enrollments.map((e) => e.userId)
      } else if (assignToType === 'INDIVIDUAL_STUDENTS' && assignedStudentIds) {
        studentIds = assignedStudentIds
      }

      if (studentIds.length > 0) {
        await prisma.test_assignment_submissions.createMany({
          data: studentIds.map((studentId: string) => ({
            testAssignmentId: assignment.id,
            studentId,
            status: 'NOT_STARTED',
          })),
          skipDuplicates: true,
        })
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Test assignment created successfully',
      assignment,
    })
  } catch (error) {
    console.error('Failed to create test assignment:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create test assignment',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
