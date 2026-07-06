import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rateLimit'
import { predictRank } from '@/lib/neet/rankTable'

export const dynamic = 'force-dynamic'

/**
 * GET /api/tools/rank-predictor?marks=N — public NEET marks → estimated AIR
 * band (P2.5 #5). No auth: it is a lead-magnet tool. Estimates come from the
 * static previous-year table in src/lib/neet/rankTable.ts.
 */
export async function GET(request: NextRequest) {
  try {
    const limited = await rateLimit(request, { maxRequests: 120, windowMs: 60 * 60 * 1000 })
    if (!limited.success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const raw = request.nextUrl.searchParams.get('marks')
    const marks = Number(raw)
    if (raw === null || !Number.isFinite(marks) || marks < 0 || marks > 720) {
      return NextResponse.json(
        { success: false, error: 'Provide marks between 0 and 720, e.g. ?marks=610' },
        { status: 400 }
      )
    }

    const prediction = predictRank(marks)
    return NextResponse.json({
      success: true,
      data: {
        marks: Math.round(marks),
        ...prediction,
        disclaimer:
          'Estimated from published NEET-UG 2024/2025 marks-vs-rank data. Actual ranks vary with paper difficulty, category and candidate pool.',
      },
    })
  } catch (error) {
    console.error('[tools/rank-predictor] failed:', error)
    return NextResponse.json({ success: false, error: 'Prediction failed' }, { status: 500 })
  }
}
