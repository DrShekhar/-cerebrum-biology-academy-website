/**
 * Teacher Test Assignments API
 *
 * GET /api/teacher/test-assignments - Get all test assignments created by teacher
 * POST /api/teacher/test-assignments - Create new test assignment
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { generateAndPersistQuestions } from '@/lib/ai/generateAndPersistQuestions'

// AI generation can take a while for a full paper — allow a longer budget.
export const maxDuration = 120

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
          test_templates: {
            select: {
              id: true,
              title: true,
              type: true,
            },
          },
          test_assignment_submissions: {
            select: {
              id: true,
              status: true,
              submittedAt: true,
              totalScore: true,
              percentage: true,
            },
          },
          test_assignment_questions: {
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
        const totalSubmissions = a.test_assignment_submissions.length
        const submittedCount = a.test_assignment_submissions.filter(
          (s) => s.status === 'SUBMITTED' || s.status === 'GRADED'
        ).length
        const gradedCount = a.test_assignment_submissions.filter(
          (s) => s.status === 'GRADED'
        ).length
        const inProgressCount = a.test_assignment_submissions.filter(
          (s) => s.status === 'IN_PROGRESS'
        ).length
        const avgScore =
          a.test_assignment_submissions.length > 0
            ? a.test_assignment_submissions.reduce(
                (acc, s) => acc + (Number(s.percentage) || 0),
                0
              ) / a.test_assignment_submissions.length
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
          testTemplate: a.test_templates,
          questionsCount: a.test_assignment_questions.length,
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

    // Normalize UI values to the Prisma enums (the create UI uses lowercase /
    // short forms; the columns are enums, so raw values would 500 on write).
    const SHOW_RESULTS_MAP: Record<string, string> = {
      immediately: 'IMMEDIATELY',
      after_deadline: 'AFTER_DEADLINE',
      manual: 'MANUAL_RELEASE',
      never: 'NEVER',
    }
    const ASSIGN_TO_MAP: Record<string, string> = {
      ALL: 'ALL_STUDENTS',
      COURSE: 'ALL_STUDENTS',
      CLASS: 'SPECIFIC_CLASS',
      BATCH: 'SPECIFIC_BATCH',
      INDIVIDUAL: 'INDIVIDUAL_STUDENTS',
      STUDENTS: 'INDIVIDUAL_STUDENTS',
    }
    const normalizedShowResults =
      SHOW_RESULTS_MAP[String(showResults).toLowerCase()] ||
      (typeof showResults === 'string' ? showResults.toUpperCase() : 'IMMEDIATELY')
    const normalizedAssignToType =
      ASSIGN_TO_MAP[String(assignToType).toUpperCase()] ||
      (typeof assignToType === 'string' ? assignToType.toUpperCase() : 'ALL_STUDENTS')

    // Resolve the real target students once (reused for totalAssigned + publish).
    //  - ALL_STUDENTS: everyone with an ACTIVE enrollment in the course.
    //  - SPECIFIC_CLASS: everyone ACTIVE-enrolled in a course of the selected
    //    class level(s) (assignedClassIds are StudentClass values, e.g. CLASS_12)
    //    — batches have no student-membership model, so class is resolved via
    //    course.class.
    //  - INDIVIDUAL_STUDENTS: the explicit list.
    async function resolveStudentIds(): Promise<string[]> {
      if (normalizedAssignToType === 'ALL_STUDENTS' && courseId) {
        const e = await prisma.enrollments.findMany({
          where: { courseId, status: 'ACTIVE' },
          select: { userId: true },
        })
        return Array.from(new Set(e.map((x) => x.userId)))
      }
      if (
        normalizedAssignToType === 'SPECIFIC_CLASS' &&
        Array.isArray(assignedClassIds) &&
        assignedClassIds.length > 0
      ) {
        const e = await prisma.enrollments.findMany({
          where: { status: 'ACTIVE', courses: { class: { in: assignedClassIds } } },
          select: { userId: true },
        })
        return Array.from(new Set(e.map((x) => x.userId)))
      }
      if (normalizedAssignToType === 'INDIVIDUAL_STUDENTS' && Array.isArray(assignedStudentIds)) {
        return Array.from(new Set(assignedStudentIds))
      }
      return []
    }
    const resolvedStudentIds = await resolveStudentIds()
    const totalAssigned = resolvedStudentIds.length

    const assignment = await prisma.test_assignments.create({
      data: {
        id: `ta_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        updatedAt: new Date(),
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
        showResults: normalizedShowResults as any,
        passingMarks: passingMarks ? parseInt(passingMarks) : null,
        assignToType: normalizedAssignToType as any,
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
        test_templates: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    })

    // Resolve the questions to attach. test_assignment_questions.questionId is a
    // FK to questions.id, so every attached question MUST be a real DB row.
    //  - Explicit client list (e.g. curated/static bank): kept only if the id
    //    actually exists in the DB (avoids FK violations).
    //  - Otherwise pull from the DB question bank by selected topics/chapters.
    let resolvedQuestions: { questionId: string; marks?: number; negativeMarks?: number }[] = []
    if (useAI) {
      // Generate fresh MCQs with Claude, persist them (FK-safe), and attach.
      const aiTopics =
        Array.isArray(selectedTopics) && selectedTopics.length > 0
          ? selectedTopics
          : Array.isArray(selectedChapters)
            ? selectedChapters
            : []
      const aiIds = await generateAndPersistQuestions({
        topics: aiTopics,
        count: parseInt(totalQuestions),
        difficulty: typeof difficulty === 'string' ? difficulty : 'MEDIUM',
        grade: Array.isArray(assignedClassIds) ? assignedClassIds[0] : undefined,
        curriculum: 'NEET',
      })
      resolvedQuestions = aiIds.map((id) => ({ questionId: id }))
    } else if (Array.isArray(questions) && questions.length > 0) {
      const ids = questions.map((q: any) => q.questionId).filter(Boolean)
      const existing = await prisma.questions.findMany({
        where: { id: { in: ids } },
        select: { id: true },
      })
      const existingSet = new Set(existing.map((e) => e.id))
      resolvedQuestions = questions
        .filter((q: any) => existingSet.has(q.questionId))
        .map((q: any) => ({
          questionId: q.questionId,
          marks: q.marks,
          negativeMarks: q.negativeMarks,
        }))
    } else if (
      (Array.isArray(selectedTopics) && selectedTopics.length > 0) ||
      (Array.isArray(selectedChapters) && selectedChapters.length > 0)
    ) {
      const where: any = { isActive: true }
      if (Array.isArray(selectedTopics) && selectedTopics.length > 0) {
        where.topic = { in: selectedTopics }
      } else {
        where.ncertChapterName = { in: selectedChapters }
      }
      const pool = await prisma.questions.findMany({
        where,
        select: { id: true },
        take: parseInt(totalQuestions),
      })
      resolvedQuestions = pool.map((q) => ({ questionId: q.id }))
    }

    if (resolvedQuestions.length > 0) {
      await prisma.test_assignment_questions.createMany({
        data: resolvedQuestions.map((q, index) => ({
          id: `taq_${Date.now()}_${index}_${Math.random().toString(36).slice(2, 9)}`,
          testAssignmentId: assignment.id,
          questionId: q.questionId,
          orderIndex: index,
          marks: q.marks || 4,
          negativeMarks: q.negativeMarks ?? null,
        })),
        skipDuplicates: true,
      })
    }

    if (status === 'PUBLISHED' && resolvedStudentIds.length > 0) {
      await prisma.test_assignment_submissions.createMany({
        data: resolvedStudentIds.map((studentId: string, i: number) => ({
          id: `tas_${Date.now()}_${i}_${Math.random().toString(36).slice(2, 9)}`,
          updatedAt: new Date(),
          testAssignmentId: assignment.id,
          studentId,
          status: 'NOT_STARTED' as const,
        })),
        skipDuplicates: true,
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Test assignment created successfully',
      assignment,
      attachedQuestions: resolvedQuestions.length,
      assignedStudents: status === 'PUBLISHED' ? resolvedStudentIds.length : 0,
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
