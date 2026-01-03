import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  getQuestionsByChapter,
  class11Questions,
  class12Questions,
} from '@/data/questions'
import { AuthenticQuestion } from '@/data/questions/types'
import { verifyHostToken, unauthorizedResponse } from '@/lib/quiz/auth'
import { ipRateLimit, getRateLimitHeaders } from '@/lib/middleware/rateLimit'

export const dynamic = 'force-dynamic'

interface QuizSettings {
  correct: number
  wrong: number
  pass: number
  chapters?: string[]
  classId?: string
  questionCount?: number
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ roomCode: string }> }
) {
  try {
    const rateLimitResult = await ipRateLimit(request, {
      limit: 100,
      window: 15 * 60 * 1000,
      endpoint: 'quiz:questions:get',
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please slow down.' },
        { status: 429, headers: getRateLimitHeaders(rateLimitResult) }
      )
    }

    const { roomCode } = await params
    const { searchParams } = new URL(request.url)
    const questionIndex = parseInt(searchParams.get('index') || '0')

    const session = await prisma.quiz_sessions.findUnique({
      where: { roomCode: roomCode.toUpperCase() },
    })

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Quiz session not found' },
        { status: 404 }
      )
    }

    if (session.questionMode !== 'PRELOADED') {
      return NextResponse.json(
        { success: false, error: 'This quiz is not in preloaded question mode' },
        { status: 400 }
      )
    }

    const settings = session.scoringRules as QuizSettings
    const chapters = settings?.chapters || []
    const classId = settings?.classId || 'class-11'
    const questionCount = settings?.questionCount || 20

    if (chapters.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No chapters selected for this quiz' },
        { status: 400 }
      )
    }

    let questions = getQuestionsByChapter(chapters, classId)

    if (questions.length === 0) {
      const allQuestions = classId === 'class-12' ? class12Questions : class11Questions
      questions = allQuestions.filter((q) => chapters.some((ch) => q.chapterId.includes(ch)))
    }

    if (questions.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No questions found for selected chapters' },
        { status: 404 }
      )
    }

    const seed = session.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const seededRandom = (i: number) => {
      const x = Math.sin(seed + i) * 10000
      return x - Math.floor(x)
    }

    const shuffledQuestions = [...questions].sort((a, b) => {
      const aVal = seededRandom(questions.indexOf(a))
      const bVal = seededRandom(questions.indexOf(b))
      return aVal - bVal
    })

    const selectedQuestions = shuffledQuestions.slice(0, questionCount)

    if (questionIndex < 0 || questionIndex >= selectedQuestions.length) {
      return NextResponse.json(
        { success: false, error: 'Invalid question index' },
        { status: 400 }
      )
    }

    const question = selectedQuestions[questionIndex]

    return NextResponse.json({
      success: true,
      data: {
        currentIndex: questionIndex,
        totalQuestions: selectedQuestions.length,
        question: {
          id: question.id,
          question: question.question,
          options: question.options,
          difficulty: question.difficulty,
          timeEstimate: question.timeEstimate,
        },
        hasNext: questionIndex < selectedQuestions.length - 1,
        hasPrevious: questionIndex > 0,
      },
    })
  } catch (error) {
    console.error('Error fetching quiz questions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch questions' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ roomCode: string }> }
) {
  try {
    const rateLimitResult = await ipRateLimit(request, {
      limit: 50,
      window: 15 * 60 * 1000,
      endpoint: 'quiz:questions:post',
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please slow down.' },
        { status: 429, headers: getRateLimitHeaders(rateLimitResult) }
      )
    }

    const { roomCode } = await params
    const body = await request.json()
    const { questionIndex, revealAnswer } = body

    // Host authorization required to reveal answers
    const authResult = await verifyHostToken(request, roomCode)
    if (!authResult.valid || !authResult.session) {
      return unauthorizedResponse(authResult.error)
    }
    const session = authResult.session

    const settings = session.scoringRules as QuizSettings
    const chapters = settings?.chapters || []
    const classId = settings?.classId || 'class-11'
    const questionCount = settings?.questionCount || 20

    let questions = getQuestionsByChapter(chapters, classId)

    if (questions.length === 0) {
      const allQuestions = classId === 'class-12' ? class12Questions : class11Questions
      questions = allQuestions.filter((q) => chapters.some((ch) => q.chapterId.includes(ch)))
    }

    const seed = session.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const seededRandom = (i: number) => {
      const x = Math.sin(seed + i) * 10000
      return x - Math.floor(x)
    }

    const shuffledQuestions = [...questions].sort((a, b) => {
      const aVal = seededRandom(questions.indexOf(a))
      const bVal = seededRandom(questions.indexOf(b))
      return aVal - bVal
    })

    const selectedQuestions = shuffledQuestions.slice(0, questionCount)
    const question = selectedQuestions[questionIndex]

    if (!question) {
      return NextResponse.json(
        { success: false, error: 'Question not found' },
        { status: 404 }
      )
    }

    const responseData: {
      id: string
      question: string
      options: string[]
      difficulty: string
      correctAnswer?: string
      explanation?: string
    } = {
      id: question.id,
      question: question.question,
      options: question.options,
      difficulty: question.difficulty,
    }

    if (revealAnswer) {
      responseData.correctAnswer = question.correctAnswer
      responseData.explanation = question.explanation
    }

    return NextResponse.json({
      success: true,
      data: {
        currentIndex: questionIndex,
        totalQuestions: selectedQuestions.length,
        question: responseData,
      },
    })
  } catch (error) {
    console.error('Error fetching question details:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch question' },
      { status: 500 }
    )
  }
}
