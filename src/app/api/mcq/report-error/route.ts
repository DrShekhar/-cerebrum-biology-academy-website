import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { rateLimit } from '@/lib/rateLimit'
import type { ErrorReportType } from '@/generated/prisma'

export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = await rateLimit(request, { maxRequests: 10, windowMs: 60 * 60 * 1000 })
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': String(rateLimitResult.limit),
            'X-RateLimit-Remaining': String(rateLimitResult.remaining),
            'X-RateLimit-Reset': String(rateLimitResult.reset),
          },
        }
      )
    }

    const body = await request.json()
    const {
      questionId,
      communityQuestionId,
      reportType,
      currentAnswer,
      suggestedAnswer,
      explanation,
      evidence,
      freeUserId,
      name,
      phone,
      email,
    } = body

    // Validate required fields
    if (!reportType || !currentAnswer || !explanation || !freeUserId) {
      return NextResponse.json(
        { error: 'Missing required fields: reportType, currentAnswer, explanation, freeUserId' },
        { status: 400 }
      )
    }

    if (!questionId && !communityQuestionId) {
      return NextResponse.json(
        { error: 'Either questionId or communityQuestionId is required' },
        { status: 400 }
      )
    }

    // Validate explanation length
    if (explanation.length < 20) {
      return NextResponse.json(
        { error: 'Explanation must be at least 20 characters' },
        { status: 400 }
      )
    }

    // Check for duplicate reports
    const existingReport = await prisma.answer_error_reports.findFirst({
      where: {
        OR: [
          { questionId: questionId || undefined },
          { communityQuestionId: communityQuestionId || undefined },
        ],
        reportedBy: freeUserId,
        status: { in: ['PENDING', 'UNDER_REVIEW'] },
      },
    })

    if (existingReport) {
      return NextResponse.json(
        { error: 'You have already reported this question. Your report is being reviewed.' },
        { status: 409 }
      )
    }

    // Get reporter details
    let reporterName = name || 'Anonymous'
    let reporterPhone = phone
    let reporterEmail = email

    const freeUser = await prisma.free_users.findUnique({
      where: { id: freeUserId },
      select: { name: true, phone: true, email: true },
    })

    if (freeUser) {
      reporterName = freeUser.name || reporterName
      reporterPhone = freeUser.phone || reporterPhone
      reporterEmail = freeUser.email || reporterEmail
    }

    // Create the error report
    const errorReport = await prisma.answer_error_reports.create({
      data: {
        questionId: questionId || null,
        communityQuestionId: communityQuestionId || null,
        reportedBy: freeUserId,
        reporterName,
        reporterPhone: reporterPhone || null,
        reporterEmail: reporterEmail || null,
        reportType: reportType as ErrorReportType,
        currentAnswer,
        suggestedAnswer: suggestedAnswer || null,
        explanation,
        evidence: evidence || null,
        status: 'PENDING',
      },
    })

    // Update report count on the question if it's a community question
    if (communityQuestionId) {
      await prisma.community_questions.update({
        where: { id: communityQuestionId },
        data: {
          reportCount: { increment: 1 },
        },
      })
    }

    // Update user stats
    await prisma.mcq_user_stats.upsert({
      where: { freeUserId },
      create: {
        freeUserId,
        errorsReported: 1,
      },
      update: {
        errorsReported: { increment: 1 },
      },
    })

    return NextResponse.json({
      success: true,
      reportId: errorReport.id,
      message: 'Thank you for your report! We will review it and update you.',
    })
  } catch (error) {
    console.error('Error report submission error:', error)
    return NextResponse.json({ error: 'Failed to submit error report' }, { status: 500 })
  }
}

// GET - Get user's error reports
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const freeUserId = searchParams.get('freeUserId')

    if (!freeUserId) {
      return NextResponse.json({ error: 'freeUserId required' }, { status: 400 })
    }

    const reports = await prisma.answer_error_reports.findMany({
      where: { reportedBy: freeUserId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        questionId: true,
        communityQuestionId: true,
        reportType: true,
        currentAnswer: true,
        suggestedAnswer: true,
        status: true,
        resolution: true,
        isValid: true,
        reporterXpAwarded: true,
        createdAt: true,
      },
    })

    return NextResponse.json({ reports })
  } catch (error) {
    console.error('Error fetching reports:', error)
    return NextResponse.json({ error: 'Failed to fetch reports' }, { status: 500 })
  }
}
