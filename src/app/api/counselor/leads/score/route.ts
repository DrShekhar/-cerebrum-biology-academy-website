/**
 * Lead Scoring API
 * GET: Calculate and update lead scores
 * POST: Bulk update lead scores
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import {
  calculateLeadScore,
  updateLeadScore,
  bulkUpdateLeadScores,
  updateAllLeadScores,
} from '@/lib/leadScoring'
import { z } from 'zod'

const updateScoreSchema = z.object({
  leadId: z.string().optional(),
  leadIds: z.array(z.string()).optional(),
  updateAll: z.boolean().optional(),
})

export async function GET(req: NextRequest) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role !== 'COUNSELOR' && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Counselor access only' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(req.url)
    const leadId = searchParams.get('leadId')

    if (!leadId) {
      return NextResponse.json({ success: false, error: 'Lead ID is required' }, { status: 400 })
    }

    const scoreBreakdown = await calculateLeadScore(leadId)

    return NextResponse.json({
      success: true,
      data: {
        leadId,
        ...scoreBreakdown,
      },
    })
  } catch (error) {
    console.error('Error calculating lead score:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to calculate lead score' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role !== 'COUNSELOR' && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Counselor access only' },
        { status: 403 }
      )
    }

    const body = await req.json()
    const validatedData = updateScoreSchema.parse(body)

    let updatedCount = 0

    if (validatedData.updateAll) {
      const counselorId = session.user.role === 'COUNSELOR' ? session.user.id : undefined
      updatedCount = await updateAllLeadScores(counselorId)

      return NextResponse.json({
        success: true,
        data: {
          updatedCount,
          message: `Successfully updated scores for ${updatedCount} leads`,
        },
      })
    }

    if (validatedData.leadId) {
      await updateLeadScore(validatedData.leadId)
      updatedCount = 1
    } else if (validatedData.leadIds && validatedData.leadIds.length > 0) {
      await bulkUpdateLeadScores(validatedData.leadIds)
      updatedCount = validatedData.leadIds.length
    } else {
      return NextResponse.json(
        { success: false, error: 'Either leadId, leadIds, or updateAll must be provided' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        updatedCount,
        message: `Successfully updated scores for ${updatedCount} lead(s)`,
      },
    })
  } catch (error) {
    console.error('Error updating lead scores:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update lead scores' },
      { status: 500 }
    )
  }
}
