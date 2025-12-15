import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { OMRPaperStatus } from '@/generated/prisma'
import { calculateOMRResult } from '@/lib/omr/calculator'
import { SectionConfig, AnswerKey, SubmittedAnswers, AnswerOption } from '@/lib/omr/types'

const answerOptionSchema = z.enum(['A', 'B', 'C', 'D']).nullable()

const submitSchema = z.object({
  paperId: z.string().min(1),
  studentName: z.string().min(2).max(100),
  studentPhone: z.string().min(10).max(15),
  studentEmail: z.string().email().optional(),
  studentClass: z.string().min(1),
  studentRollNo: z.string().optional(),
  submittedAnswers: z.record(z.string(), answerOptionSchema),
  useVerifiedKey: z.boolean(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = submitSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: validation.error.issues },
        { status: 400 }
      )
    }

    const data = validation.data

    const paper = await prisma.omr_papers.findUnique({
      where: { id: data.paperId },
      include: {
        answerKeys: true,
      },
    })

    if (!paper) {
      return NextResponse.json({ success: false, error: 'Paper not found' }, { status: 404 })
    }

    if (paper.status !== OMRPaperStatus.ACTIVE || !paper.isActive) {
      return NextResponse.json(
        { success: false, error: 'This paper is not currently active' },
        { status: 400 }
      )
    }

    const now = new Date()
    if (now < new Date(paper.submissionStart) || now > new Date(paper.submissionEnd)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Submission window is closed',
          submissionStart: paper.submissionStart,
          submissionEnd: paper.submissionEnd,
        },
        { status: 400 }
      )
    }

    if (data.useVerifiedKey && !paper.hasVerifiedKey) {
      return NextResponse.json(
        {
          success: false,
          error: 'Verified key is not available for this paper. Please use unverified key.',
        },
        { status: 400 }
      )
    }

    const sections = (paper.sections as SectionConfig[]) || []
    const answerKeys: AnswerKey[] = paper.answerKeys.map((k) => ({
      id: k.id,
      paperId: k.paperId,
      questionNo: k.questionNo,
      section: k.section,
      correctAnswer: k.correctAnswer,
      explanation: k.explanation,
      topic: k.topic,
      subtopic: k.subtopic,
      difficulty: k.difficulty,
      keyStatus: k.keyStatus,
      verifiedBy: k.verifiedBy,
      verifiedAt: k.verifiedAt,
    }))

    const result = calculateOMRResult(
      data.submittedAnswers as SubmittedAnswers,
      answerKeys,
      sections,
      paper.totalQuestions,
      data.useVerifiedKey,
      {
        correct: paper.marksPerCorrect,
        wrong: paper.marksPerWrong,
        unattempted: paper.marksPerUnattempted,
      }
    )

    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
    const userAgent = request.headers.get('user-agent')

    const submission = await prisma.omr_submissions.create({
      data: {
        paperId: data.paperId,
        studentName: data.studentName,
        studentPhone: data.studentPhone,
        studentEmail: data.studentEmail,
        studentClass: data.studentClass,
        studentRollNo: data.studentRollNo,
        submittedAnswers: data.submittedAnswers,
        useVerifiedKey: data.useVerifiedKey,
        totalAttempted: result.totalAttempted,
        totalCorrect: result.totalCorrect,
        totalWrong: result.totalWrong,
        totalUnattempted: result.totalUnattempted,
        marksObtained: result.marksObtained,
        maxMarks: result.maxMarks,
        percentage: result.percentage,
        sectionResults: result.sectionResults,
        questionResults: result.questionResults,
        ipAddress: ip,
        userAgent: userAgent,
      },
    })

    return NextResponse.json({
      success: true,
      submissionId: submission.id,
      result,
      paper: {
        paperCode: paper.paperCode,
        title: paper.title,
        subjectType: paper.subjectType,
      },
      keyType: data.useVerifiedKey ? 'verified' : 'unverified',
      submittedAt: submission.submittedAt,
    })
  } catch (error) {
    console.error('Error submitting OMR:', error)
    return NextResponse.json({ success: false, error: 'Failed to submit OMR' }, { status: 500 })
  }
}
