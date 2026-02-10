import { NextRequest, NextResponse } from 'next/server'
import { shekharSir, archanaMaam } from '@/lib/ai/agents'
import { auth } from '@/lib/auth/config'
import { z } from 'zod'

export const maxDuration = 60 // Allow longer execution for AI generation

const generateRequestSchema = z.object({
  ncertClass: z.union([z.literal(11), z.literal(12)]),
  ncertChapter: z.number().min(1).max(25),
  ncertChapterName: z.string().min(1),
  count: z.number().min(1).max(50).default(10),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD', 'MIXED']).optional(),
  includeVerification: z.boolean().default(true),
})

/**
 * POST /api/agents/generate-questions
 *
 * Generate NEET Biology questions using Shekhar Sir agent
 * Optionally verify them using Archana Ma'am agent
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only allow admins and teachers to generate questions
    const allowedRoles = ['ADMIN', 'TEACHER']
    if (!allowedRoles.includes(session.user.role || '')) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }

    // Parse and validate request
    const body = await request.json()
    const validated = generateRequestSchema.parse(body)

    // Generate questions using Shekhar Sir

    const generationResult = await shekharSir.generateQuestions({
      ncertClass: validated.ncertClass,
      ncertChapter: validated.ncertChapter,
      ncertChapterName: validated.ncertChapterName,
      count: validated.count,
      difficulty: validated.difficulty,
      includeNEETImportant: true,
      includePYQStyle: true,
    })

    let verificationResult = null

    // Optionally verify questions using Archana Ma'am
    if (validated.includeVerification && generationResult.questions.length > 0) {

      verificationResult = await archanaMaam.verifyBatch(generationResult.questions)
    }

    return NextResponse.json({
      success: true,
      data: {
        generation: {
          questions: generationResult.questions,
          metadata: generationResult.metadata,
        },
        verification: verificationResult
          ? {
              summary: verificationResult.summary,
              validQuestions: verificationResult.validQuestions,
              invalidQuestions: verificationResult.invalidQuestions,
              results: verificationResult.results.map((r) => ({
                questionId: r.questionId,
                isValid: r.isValid,
                score: r.overallScore,
                issueCount: r.issues.length,
                issues: r.issues.filter((i) => i.type === 'ERROR' || i.severity >= 3),
              })),
            }
          : null,
      },
      meta: {
        generatedBy: 'Shekhar Sir Agent',
        verifiedBy: validated.includeVerification ? "Archana Ma'am Agent" : null,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('[Question Generation Error]', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Invalid request',
          details: error.issues,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        error: 'Failed to generate questions',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/agents/generate-questions
 *
 * Get NEET pattern insights and recommended topics
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const ncertClass = searchParams.get('ncertClass')

    const patternData = shekharSir.getPatternInsights()
    const recommendations = ncertClass
      ? shekharSir.getRecommendedTopics(parseInt(ncertClass) as 11 | 12)
      : null

    return NextResponse.json({
      success: true,
      data: {
        patternInsights: patternData,
        recommendations,
        agents: {
          generator: {
            name: 'Shekhar Sir',
            description: 'Expert Biology teacher with 15+ years NEET coaching experience',
            capabilities: [
              'NEET PYQ pattern analysis',
              'NCERT-aligned question generation',
              'Difficulty-appropriate distractors',
              'Detailed explanations with references',
            ],
          },
          verifier: {
            name: "Archana Ma'am",
            description: 'Meticulous quality assurance and verification expert',
            capabilities: [
              'Scientific accuracy verification',
              'NCERT alignment checking',
              'Answer validation',
              'Explanation quality review',
            ],
          },
        },
      },
    })
  } catch (error) {
    console.error('[Pattern Insights Error]', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch pattern insights',
      },
      { status: 500 }
    )
  }
}
