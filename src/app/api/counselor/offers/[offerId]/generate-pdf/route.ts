/**
 * API Route: Generate Offer Letter PDF
 * POST /api/counselor/offers/[offerId]/generate-pdf - Generate and download offer letter PDF
 */

import { NextRequest, NextResponse } from 'next/server'
import { withCounselor } from '@/lib/auth/middleware'
import { offerLetterService } from '@/lib/documents/offerLetterService'
import { z } from 'zod'

// Request schema
const generatePDFSchema = z.object({
  leadId: z.string(),
  feePlanId: z.string(),
  action: z.enum(['download', 'preview']).default('download'),
})

async function handlePOST(req: NextRequest, session: any) {
  try {
    // Extract offerId from URL path
    const pathParts = req.nextUrl.pathname.split('/')
    const offerId = pathParts[pathParts.indexOf('offers') + 1]

    if (!offerId || offerId === 'route') {
      return NextResponse.json(
        {
          success: false,
          error: 'Offer ID is required',
        },
        { status: 400 }
      )
    }

    // Parse request body
    const body = await req.json()
    const validatedData = generatePDFSchema.parse(body)

    // Check if offer letter can be generated
    const eligibility = await offerLetterService.canGenerateOfferLetter(
      validatedData.leadId,
      validatedData.feePlanId,
      offerId
    )

    if (!eligibility.canGenerate) {
      return NextResponse.json(
        {
          success: false,
          error: eligibility.reason || 'Cannot generate offer letter',
        },
        { status: 400 }
      )
    }

    // Generate the PDF
    const result = await offerLetterService.generateOfferLetter({
      leadId: validatedData.leadId,
      feePlanId: validatedData.feePlanId,
      offerId,
      userId: session.user.id,
    })

    if (!result.success || !result.pdfBuffer) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Failed to generate PDF',
        },
        { status: 500 }
      )
    }

    // For preview action, return base64 encoded PDF
    if (validatedData.action === 'preview') {
      return NextResponse.json({
        success: true,
        pdfBase64: result.pdfBase64,
        fileName: result.fileName,
      })
    }

    // For download action, return PDF file as response
    return new NextResponse(result.pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${result.fileName}"`,
        'Content-Length': result.pdfBuffer.length.toString(),
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request data',
          details: error.errors,
        },
        { status: 400 }
      )
    }

    console.error('Error generating offer letter PDF:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate offer letter',
      },
      { status: 500 }
    )
  }
}

async function handleGET(req: NextRequest, session: any) {
  try {
    // Extract offerId from URL path
    const pathParts = req.nextUrl.pathname.split('/')
    const offerId = pathParts[pathParts.indexOf('offers') + 1]

    if (!offerId || offerId === 'route') {
      return NextResponse.json(
        {
          success: false,
          error: 'Offer ID is required',
        },
        { status: 400 }
      )
    }

    // Get query parameters
    const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries())
    const leadId = searchParams.leadId
    const feePlanId = searchParams.feePlanId

    if (!leadId || !feePlanId) {
      return NextResponse.json(
        {
          success: false,
          error: 'leadId and feePlanId query parameters are required',
        },
        { status: 400 }
      )
    }

    // Get preview data (without generating PDF)
    const result = await offerLetterService.getOfferLetterPreviewData(leadId, feePlanId, offerId)

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Failed to get preview data',
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result.data,
    })
  } catch (error) {
    console.error('Error getting offer letter preview data:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get preview data',
      },
      { status: 500 }
    )
  }
}

export const POST = withCounselor(handlePOST)
export const GET = withCounselor(handleGET)
