/**
 * Teacher Test Assignment by ID API
 *
 * GET /api/teacher/test-assignments/[id] - Get single test assignment
 * PUT /api/teacher/test-assignments/[id] - Update test assignment
 * DELETE /api/teacher/test-assignments/[id] - Delete test assignment
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session || (session.user.role !== 'teacher' && session.user.role !== 'admin')) {
      return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
    }

    const { id } = await params

    const assignment = await prisma.test_assignments.findUnique({
      where: { id },
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        testTemplate: {
          select: {
            id: true,
            title: true,
            type: true,
            category: true,
          },
        },
        questions: {
          include: {
            question: {
              select: {
                id: true,
                question: true,
                options: true,
                correctAnswer: true,
                explanation: true,
                topic: true,
                difficulty: true,
                type: true,
              },
            },
          },
          orderBy: {
            orderIndex: 'asc',
          },
        },
        submissions: {
          include: {
            student: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    if (!assignment) {
      return NextResponse.json({ error: 'Test assignment not found' }, { status: 404 })
    }

    if (assignment.teacherId !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized to view this assignment' }, { status: 403 })
    }

    return NextResponse.json({
      success: true,
      assignment,
    })
  } catch (error) {
    console.error('Failed to fetch test assignment:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch test assignment',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session || (session.user.role !== 'teacher' && session.user.role !== 'admin')) {
      return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()

    const existing = await prisma.test_assignments.findUnique({
      where: { id },
      select: { teacherId: true, status: true },
    })

    if (!existing) {
      return NextResponse.json({ error: 'Test assignment not found' }, { status: 404 })
    }

    if (existing.teacherId !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized to update this assignment' }, { status: 403 })
    }

    const {
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
      questions,
    } = body

    const updateData: any = {}

    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (instructions !== undefined) updateData.instructions = instructions
    if (difficulty !== undefined) updateData.difficulty = difficulty
    if (totalQuestions !== undefined) updateData.totalQuestions = parseInt(totalQuestions)
    if (totalMarks !== undefined) updateData.totalMarks = parseInt(totalMarks)
    if (duration !== undefined) updateData.duration = parseInt(duration)
    if (negativeMarking !== undefined) updateData.negativeMarking = negativeMarking
    if (negativeMarkValue !== undefined) updateData.negativeMarkValue = negativeMarkValue
    if (shuffleQuestions !== undefined) updateData.shuffleQuestions = shuffleQuestions
    if (showResults !== undefined) updateData.showResults = showResults
    if (passingMarks !== undefined)
      updateData.passingMarks = passingMarks ? parseInt(passingMarks) : null
    if (assignToType !== undefined) updateData.assignToType = assignToType
    if (assignedClassIds !== undefined) updateData.assignedClassIds = assignedClassIds
    if (assignedBatchIds !== undefined) updateData.assignedBatchIds = assignedBatchIds
    if (assignedStudentIds !== undefined) updateData.assignedStudentIds = assignedStudentIds
    if (courseId !== undefined) updateData.courseId = courseId
    if (dueDate !== undefined) updateData.dueDate = new Date(dueDate)
    if (availableFrom !== undefined)
      updateData.availableFrom = availableFrom ? new Date(availableFrom) : null
    if (selectedChapters !== undefined) updateData.selectedChapters = selectedChapters
    if (selectedTopics !== undefined) updateData.selectedTopics = selectedTopics

    if (status !== undefined) {
      updateData.status = status
      if (status === 'PUBLISHED' && existing.status === 'DRAFT') {
        updateData.publishedAt = new Date()
      }
    }

    const assignment = await prisma.test_assignments.update({
      where: { id },
      data: updateData,
      include: {
        testTemplate: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    })

    if (questions !== undefined) {
      await prisma.test_assignment_questions.deleteMany({
        where: { testAssignmentId: id },
      })

      if (questions.length > 0) {
        await prisma.test_assignment_questions.createMany({
          data: questions.map((q: any, index: number) => ({
            testAssignmentId: id,
            questionId: q.questionId,
            orderIndex: index,
            marks: q.marks || 4,
            negativeMarks: q.negativeMarks || null,
          })),
        })
      }
    }

    if (status === 'PUBLISHED' && existing.status === 'DRAFT') {
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
            testAssignmentId: id,
            studentId,
            status: 'NOT_STARTED',
          })),
          skipDuplicates: true,
        })

        await prisma.test_assignments.update({
          where: { id },
          data: { totalAssigned: studentIds.length },
        })
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Test assignment updated successfully',
      assignment,
    })
  } catch (error) {
    console.error('Failed to update test assignment:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update test assignment',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session || (session.user.role !== 'teacher' && session.user.role !== 'admin')) {
      return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
    }

    const { id } = await params

    const existing = await prisma.test_assignments.findUnique({
      where: { id },
      select: { teacherId: true, status: true },
    })

    if (!existing) {
      return NextResponse.json({ error: 'Test assignment not found' }, { status: 404 })
    }

    if (existing.teacherId !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized to delete this assignment' }, { status: 403 })
    }

    await prisma.test_assignments.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: 'Test assignment deleted successfully',
    })
  } catch (error) {
    console.error('Failed to delete test assignment:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete test assignment',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
