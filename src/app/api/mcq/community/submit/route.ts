import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { QuestionSubmission } from '@/lib/mcq/types'
import type { DifficultyLevel } from '@/generated/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      question,
      options,
      correctAnswer,
      explanation,
      topic,
      subtopic,
      chapter,
      difficulty,
      isPYQ,
      pyqYear,
      source,
      freeUserId,
      name,
      phone,
      email,
    } = body as QuestionSubmission & {
      freeUserId: string
      name?: string
      phone?: string
      email?: string
    }

    // Validate required fields
    if (!question || !options || !correctAnswer || !explanation || !topic || !freeUserId) {
      return NextResponse.json(
        {
          error:
            'Missing required fields: question, options, correctAnswer, explanation, topic, freeUserId',
        },
        { status: 400 }
      )
    }

    // Validate options array
    if (!Array.isArray(options) || options.length !== 4) {
      return NextResponse.json({ error: 'Options must be an array of 4 items' }, { status: 400 })
    }

    // Validate correct answer
    if (!['A', 'B', 'C', 'D'].includes(correctAnswer)) {
      return NextResponse.json({ error: 'Correct answer must be A, B, C, or D' }, { status: 400 })
    }

    // Validate question length
    if (question.length < 20) {
      return NextResponse.json(
        { error: 'Question must be at least 20 characters' },
        { status: 400 }
      )
    }

    // Validate explanation length
    if (explanation.length < 30) {
      return NextResponse.json(
        { error: 'Explanation must be at least 30 characters' },
        { status: 400 }
      )
    }

    // Check for duplicate questions (simple check)
    const existingQuestion = await prisma.community_questions.findFirst({
      where: {
        question: {
          contains: question.substring(0, 50),
        },
      },
    })

    if (existingQuestion) {
      return NextResponse.json({ error: 'A similar question already exists' }, { status: 409 })
    }

    // Get submitter details
    let submitterName = name || 'Anonymous'
    let submitterPhone = phone
    let submitterEmail = email

    const freeUser = await prisma.free_users.findUnique({
      where: { id: freeUserId },
      select: { name: true, phone: true, email: true },
    })

    if (freeUser) {
      submitterName = freeUser.name || submitterName
      submitterPhone = freeUser.phone || submitterPhone
      submitterEmail = freeUser.email || submitterEmail
    }

    // Create the community question
    const communityQuestion = await prisma.community_questions.create({
      data: {
        question,
        options: options as unknown as object,
        correctAnswer,
        explanation,
        topic,
        subtopic: subtopic || null,
        chapter: chapter || null,
        difficulty: (difficulty as DifficultyLevel) || 'MEDIUM',
        isPYQ: isPYQ || false,
        pyqYear: pyqYear || null,
        submittedBy: freeUserId,
        submitterName,
        submitterPhone: submitterPhone || null,
        submitterEmail: submitterEmail || null,
        status: 'PENDING',
      },
    })

    // Update user stats
    await prisma.mcq_user_stats.upsert({
      where: { freeUserId },
      create: {
        freeUserId,
        questionsSubmitted: 1,
      },
      update: {
        questionsSubmitted: { increment: 1 },
      },
    })

    return NextResponse.json({
      success: true,
      questionId: communityQuestion.id,
      message: 'Question submitted successfully! It will be reviewed before being published.',
    })
  } catch (error) {
    console.error('Community question submission error:', error)
    return NextResponse.json({ error: 'Failed to submit question' }, { status: 500 })
  }
}

// GET - Get user's submitted questions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const freeUserId = searchParams.get('freeUserId')

    if (!freeUserId) {
      return NextResponse.json({ error: 'freeUserId required' }, { status: 400 })
    }

    const questions = await prisma.community_questions.findMany({
      where: { submittedBy: freeUserId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        question: true,
        topic: true,
        status: true,
        aiScore: true,
        reviewNotes: true,
        rejectionReason: true,
        contributorXpAwarded: true,
        createdAt: true,
        publishedAt: true,
      },
    })

    return NextResponse.json({ questions })
  } catch (error) {
    console.error('Error fetching user questions:', error)
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 })
  }
}
