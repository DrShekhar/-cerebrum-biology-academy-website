/**
 * API Route: Get Fee Plans for Lead
 * GET /api/counselor/fee-plans/[leadId]
 */

import { NextRequest, NextResponse } from 'next/server'
import { withCounselor } from '@/lib/auth/middleware'
import { FeePlanService } from '@/lib/counselor/feePlanService'

async function handleGET(req: NextRequest, session: any) {
  try {
    // Extract leadId from URL path
    const pathParts = req.nextUrl.pathname.split('/')
    const leadId = pathParts[pathParts.length - 1]

    if (!leadId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Lead ID is required',
        },
        { status: 400 }
      )
    }

    const feePlans = await FeePlanService.getLeadFeePlans(leadId)

    return NextResponse.json({
      success: true,
      data: feePlans,
    })
  } catch (error) {
    console.error('Get fee plans error:', error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch fee plans',
      },
      { status: 500 }
    )
  }
}

export const GET = withCounselor(handleGET)
