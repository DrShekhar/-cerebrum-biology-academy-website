import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateUserSession, type UserSession } from '@/lib/auth/config'
import { withRateLimit } from '@/lib/middleware/rateLimit'
import { logger } from '@/lib/utils/logger'

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

// Helper function to generate detailed question analysis
async function generateQuestionAnalysis(responses: any[]) {
  const questionAnalysis = responses.map((response, index) => {
    const question = response.question

    return {
      questionNumber: index + 1,
      questionId: question.id,
      topic: question.topic,
      subtopic: question.subtopic,
      difficulty: question.difficulty,
      type: question.type,
      marks: question.marks,
      questionText: question.question,
      options: question.options,
      correctAnswer: question.correctAnswer,
      userAnswer: response.selectedAnswer,
      isCorrect: response.isCorrect,
      marksAwarded: response.marksAwarded,
      timeSpent: response.timeSpent || 0,
      confidence: response.confidence,
      explanation: question.explanation,
      explanationImage: question.explanationImage,
      videoExplanation: question.videoExplanation,
      tags: question.tags,
      relatedConcepts: question.relatedConcepts,
      answeredAt: response.answeredAt,
    }
  })

  return questionAnalysis
}

// Helper function to generate comprehensive analytics
function generateComprehensiveAnalytics(responses: any[], analytics: any) {
  // Topic-wise deep analysis
  const topicAnalysis = Object.entries(analytics.topicPerformance || {}).map(
    ([topic, stats]: [string, any]) => ({
      topic,
      totalQuestions: stats.total,
      correctAnswers: stats.correct,
      accuracy: Math.round(stats.accuracy * 100) / 100,
      averageTime: Math.round(stats.averageTime),
      marksEarned: stats.marks,
      difficulty: responses
        .filter((r) => r.question.topic === topic)
        .reduce(
          (acc, r) => {
            acc[r.question.difficulty] = (acc[r.question.difficulty] || 0) + 1
            return acc
          },
          {} as Record<string, number>
        ),
      performance:
        stats.accuracy >= 80
          ? 'Excellent'
          : stats.accuracy >= 60
            ? 'Good'
            : stats.accuracy >= 40
              ? 'Average'
              : 'Needs Improvement',
    })
  )

  // Difficulty-wise analysis
  const difficultyAnalysis = {
    easy: {
      attempted: analytics.easyQuestions?.total || 0,
      correct: analytics.easyQuestions?.correct || 0,
      accuracy:
        analytics.easyQuestions?.total > 0
          ? Math.round(
              (analytics.easyQuestions.correct / analytics.easyQuestions.total) * 100 * 100
            ) / 100
          : 0,
      averageTime:
        analytics.easyQuestions?.total > 0
          ? Math.round(analytics.easyQuestions.time / analytics.easyQuestions.total)
          : 0,
    },
    medium: {
      attempted: analytics.mediumQuestions?.total || 0,
      correct: analytics.mediumQuestions?.correct || 0,
      accuracy:
        analytics.mediumQuestions?.total > 0
          ? Math.round(
              (analytics.mediumQuestions.correct / analytics.mediumQuestions.total) * 100 * 100
            ) / 100
          : 0,
      averageTime:
        analytics.mediumQuestions?.total > 0
          ? Math.round(analytics.mediumQuestions.time / analytics.mediumQuestions.total)
          : 0,
    },
    hard: {
      attempted: analytics.hardQuestions?.total || 0,
      correct: analytics.hardQuestions?.correct || 0,
      accuracy:
        analytics.hardQuestions?.total > 0
          ? Math.round(
              (analytics.hardQuestions.correct / analytics.hardQuestions.total) * 100 * 100
            ) / 100
          : 0,
      averageTime:
        analytics.hardQuestions?.total > 0
          ? Math.round(analytics.hardQuestions.time / analytics.hardQuestions.total)
          : 0,
    },
  }

  // Time analysis
  const timeAnalysis = {
    totalTimeSpent: analytics.totalTime || 0,
    averageTimePerQuestion: Math.round(analytics.averageTimePerQ || 0),
    fastestQuestion: Math.min(...responses.map((r) => r.timeSpent || 0).filter((t) => t > 0)),
    slowestQuestion: Math.max(...responses.map((r) => r.timeSpent || 0)),
    timeDistribution: analytics.timeDistribution || [],
    timeEfficiency:
      responses.length > 0
        ? Math.round(
            (responses.filter((r) => r.isCorrect && (r.timeSpent || 0) < analytics.averageTimePerQ)
              .length /
              responses.length) *
              100
          )
        : 0,
  }

  // Behavioral patterns
  const behavioralAnalysis = {
    questionsRevisited: analytics.questionsRevisited || 0,
    questionsSkipped: analytics.questionsSkipped || 0,
    answerChangePattern: responses.filter(
      (r) => r.timeSpent && r.timeSpent > analytics.averageTimePerQ * 1.5
    ).length,
    confidencePattern: responses
      .filter((r) => r.confidence)
      .reduce(
        (acc, r) => {
          acc.total += 1
          acc.averageConfidence += r.confidence
          if (r.confidence >= 4 && r.isCorrect) acc.highConfidenceCorrect += 1
          if (r.confidence <= 2 && !r.isCorrect) acc.lowConfidenceIncorrect += 1
          return acc
        },
        { total: 0, averageConfidence: 0, highConfidenceCorrect: 0, lowConfidenceIncorrect: 0 }
      ),
  }

  if (behavioralAnalysis.confidencePattern.total > 0) {
    behavioralAnalysis.confidencePattern.averageConfidence =
      Math.round(
        (behavioralAnalysis.confidencePattern.averageConfidence /
          behavioralAnalysis.confidencePattern.total) *
          100
      ) / 100
  }

  return {
    topicAnalysis,
    difficultyAnalysis,
    timeAnalysis,
    behavioralAnalysis,
  }
}

// Helper function to generate personalized recommendations
function generateRecommendations(analytics: any, performance: any) {
  const recommendations = {
    immediate: [] as string[],
    shortTerm: [] as string[],
    longTerm: [] as string[],
    studyPlan: [] as string[],
    practiceTests: [] as string[],
  }

  // Based on overall performance
  if (performance.accuracy < 40) {
    recommendations.immediate.push('Review fundamental concepts')
    recommendations.immediate.push('Focus on understanding basic principles')
    recommendations.shortTerm.push('Complete topic-wise practice tests')
    recommendations.longTerm.push('Consider additional coaching or tutoring')
  } else if (performance.accuracy < 60) {
    recommendations.immediate.push('Practice more questions on weak topics')
    recommendations.shortTerm.push('Take mock tests regularly')
    recommendations.longTerm.push('Aim for 70%+ accuracy in next tests')
  } else if (performance.accuracy < 80) {
    recommendations.immediate.push('Work on time management')
    recommendations.shortTerm.push('Focus on difficult level questions')
    recommendations.longTerm.push('Target 85%+ accuracy consistently')
  } else {
    recommendations.immediate.push('Maintain current momentum')
    recommendations.shortTerm.push('Challenge yourself with advanced tests')
    recommendations.longTerm.push('Prepare for competitive exam strategies')
  }

  // Based on weak topics
  if (analytics.weaknessTopics && analytics.weaknessTopics.length > 0) {
    recommendations.studyPlan.push(`Focus on: ${analytics.weaknessTopics.join(', ')}`)
    recommendations.practiceTests.push(
      `Take topic-specific tests for: ${analytics.weaknessTopics.slice(0, 3).join(', ')}`
    )
  }

  // Based on time management
  if (analytics.averageTimePerQ > 90) {
    // More than 1.5 minutes per question
    recommendations.immediate.push('Improve time management - aim for 1 minute per question')
    recommendations.shortTerm.push('Practice speed solving techniques')
  }

  // Based on difficulty performance
  if (
    analytics.easyQuestions &&
    analytics.easyQuestions.total > 0 &&
    analytics.easyQuestions.correct / analytics.easyQuestions.total < 0.8
  ) {
    recommendations.immediate.push('Master easy level questions first')
  }

  return recommendations
}

// GET /api/test/[id]/results - Get comprehensive test results and analytics
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: testSessionId } = await params
    const { searchParams } = new URL(request.url)
    const includeAnalytics = searchParams.get('analytics') !== 'false'
    const includeQuestions = searchParams.get('questions') !== 'false'
    const includeComparison = searchParams.get('comparison') !== 'false'

    const session = await validateUserSession(request)
    if (!session.valid) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'AUTH_REQUIRED' },
        { status: 401 }
      )
    }

    // Rate limiting
    const rateLimitResult = await withRateLimit(request, {
      identifier: session.userId!,
      limit: 50, // 50 result requests per hour
      window: 3600000,
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded', code: 'RATE_LIMIT_EXCEEDED' },
        { status: 429 }
      )
    }

    // Fetch test session with comprehensive data
    const testSession = await prisma.testSession.findUnique({
      where: {
        id: testSessionId,
        OR: [{ userId: session.userId }, { freeUserId: session.userId }],
      },
      include: {
        testTemplate: {
          select: {
            id: true,
            title: true,
            description: true,
            type: true,
            category: true,
            difficulty: true,
            timeLimit: true,
            totalQuestions: true,
            totalMarks: true,
            passingMarks: true,
            negativeMarking: true,
            topics: true,
            curriculum: true,
            grade: true,
            subject: true,
            averageScore: true,
            attemptCount: true,
          },
        },
        responses: {
          include: {
            question: {
              select: {
                id: true,
                topic: true,
                subtopic: true,
                type: true,
                difficulty: true,
                question: true,
                options: true,
                correctAnswer: true,
                explanation: true,
                explanationImage: true,
                videoExplanation: true,
                marks: true,
                tags: true,
                relatedConcepts: true,
                totalAttempts: true,
                correctAttempts: true,
              },
            },
          },
          orderBy: { answeredAt: 'asc' },
        },
        analytics: true,
      },
    })

    if (!testSession) {
      return NextResponse.json(
        { error: 'Test session not found', code: 'NOT_FOUND' },
        { status: 404 }
      )
    }

    // Check if test is completed
    if (testSession.status !== 'COMPLETED') {
      return NextResponse.json(
        { error: 'Test not yet completed', code: 'TEST_NOT_COMPLETED' },
        { status: 400 }
      )
    }

    // Calculate basic performance metrics
    const totalQuestions = testSession.responses.length
    const correctAnswers = testSession.responses.filter((r) => r.isCorrect).length
    const totalMarks = testSession.responses.reduce((sum, r) => sum + r.marksAwarded, 0)
    const maxPossibleMarks = testSession.testTemplate?.totalMarks || 0
    const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0
    const percentage = maxPossibleMarks > 0 ? (totalMarks / maxPossibleMarks) * 100 : 0

    // Build response object
    const resultData: any = {
      testSession: {
        id: testSession.id,
        status: testSession.status,
        startedAt: testSession.startedAt,
        submittedAt: testSession.submittedAt,
        timeSpent: testSession.timeSpent,
        totalScore: testSession.totalScore || totalMarks,
        percentage: testSession.percentage || Math.round(percentage * 100) / 100,
        percentileRank: testSession.analytics?.percentileRank,
        rank: testSession.rank,
      },
      testDetails: {
        title: testSession.testTemplate?.title,
        description: testSession.testTemplate?.description,
        type: testSession.testTemplate?.type,
        category: testSession.testTemplate?.category,
        difficulty: testSession.testTemplate?.difficulty,
        topics: testSession.testTemplate?.topics,
        curriculum: testSession.testTemplate?.curriculum,
        grade: testSession.testTemplate?.grade,
        subject: testSession.testTemplate?.subject,
        timeLimit: testSession.testTemplate?.timeLimit,
        totalQuestions: testSession.testTemplate?.totalQuestions,
        totalMarks: testSession.testTemplate?.totalMarks,
        passingMarks: testSession.testTemplate?.passingMarks,
        negativeMarking: testSession.testTemplate?.negativeMarking,
      },
      performance: {
        totalQuestions,
        questionsAttempted: totalQuestions,
        correctAnswers,
        incorrectAnswers: totalQuestions - correctAnswers,
        totalMarks,
        maxPossibleMarks,
        accuracy: Math.round(accuracy * 100) / 100,
        percentage: Math.round(percentage * 100) / 100,
        timeSpent: testSession.timeSpent || 0,
        averageTimePerQuestion:
          totalQuestions > 0 ? Math.round((testSession.timeSpent || 0) / totalQuestions) : 0,
        isPassed: testSession.testTemplate?.passingMarks
          ? totalMarks >= testSession.testTemplate.passingMarks
          : percentage >= 40,
      },
    }

    // Add detailed question analysis if requested
    if (includeQuestions) {
      resultData.questionAnalysis = await generateQuestionAnalysis(testSession.responses)
    }

    // Add comprehensive analytics if requested and available
    if (includeAnalytics && testSession.analytics) {
      const comprehensiveAnalytics = generateComprehensiveAnalytics(
        testSession.responses,
        testSession.analytics
      )

      resultData.analytics = {
        ...comprehensiveAnalytics,
        percentileRank: testSession.analytics.percentileRank,
        averageComparison: testSession.analytics.averageComparison,
        predictedScore: testSession.analytics.predictedScore,
        recommendedStudyTime: testSession.analytics.recommendedStudyTime,
      }

      // Generate personalized recommendations
      resultData.recommendations = generateRecommendations(
        testSession.analytics,
        resultData.performance
      )
    }

    // Add comparison data if requested
    if (includeComparison && testSession.testTemplate) {
      const comparisonData = await prisma.testSession.aggregate({
        where: {
          testTemplateId: testSession.testTemplate.id,
          status: 'COMPLETED',
          totalScore: { not: null },
        },
        _avg: {
          totalScore: true,
          timeSpent: true,
          percentage: true,
        },
        _count: {
          id: true,
        },
      })

      resultData.comparison = {
        averageScore: comparisonData._avg.totalScore || 0,
        averagePercentage: comparisonData._avg.percentage || 0,
        averageTime: comparisonData._avg.timeSpent || 0,
        totalAttempts: comparisonData._count.id,
        userVsAverage: {
          scoreComparison: totalMarks - (comparisonData._avg.totalScore || 0),
          percentageComparison: percentage - (comparisonData._avg.percentage || 0),
          timeComparison: (testSession.timeSpent || 0) - (comparisonData._avg.timeSpent || 0),
        },
      }
    }

    // Add achievement data
    resultData.achievements = {
      newAchievements: [], // Would be populated based on performance milestones
      progress: {
        testsCompleted: 1, // This would come from user's total test count
        topicsStrength: testSession.analytics?.strengthTopics?.length || 0,
        improvementAreas: testSession.analytics?.weaknessTopics?.length || 0,
      },
    }

    // Log result access
    logger.info('Test results accessed:', {
      testSessionId,
      userId: session.userId,
      includeAnalytics,
      includeQuestions,
      includeComparison,
      performance: `${correctAnswers}/${totalQuestions} (${Math.round(accuracy)}%)`,
    })

    return NextResponse.json({
      success: true,
      data: resultData,
      generatedAt: new Date().toISOString(),
    })
  } catch (error) {
    logger.error('Error fetching test results:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch test results',
        code: 'INTERNAL_ERROR',
      },
      { status: 500 }
    )
  }
}
