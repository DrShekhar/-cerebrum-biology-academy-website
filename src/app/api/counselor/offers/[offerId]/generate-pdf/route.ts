import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { withCounselor } from '@/lib/auth/middleware'
import { offerLetterService } from '@/lib/documents/offerLetterService'

const generatePDFSchema = z.object({
  leadId: z.string().min(1, 'Lead ID is required'),
  feePlanId: z.string().min(1, 'Fee Plan ID is required'),
})

async function handlePOST(
  req: NextRequest,
  session: any,
  context: { params: Promise<{ offerId: string }> }
) {
  try {
    const { offerId } = await context.params

    if (!offerId) {
      return NextResponse.json({ success: false, error: 'Offer ID is required' }, { status: 400 })
    }

    const body = await req.json()
    const validatedData = generatePDFSchema.parse(body)

    const counselorId = session.user.id

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

    const result = await offerLetterService.generateOfferLetter({
      leadId: validatedData.leadId,
      feePlanId: validatedData.feePlanId,
      offerId,
      userId: counselorId,
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

    const headers = new Headers()
    headers.set('Content-Type', 'application/pdf')
    headers.set('Content-Disposition', `attachment; filename="${result.fileName}"`)
    headers.set('Content-Length', result.pdfBuffer.length.toString())
    headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    headers.set('Pragma', 'no-cache')
    headers.set('Expires', '0')

    return new NextResponse(result.pdfBuffer as unknown as BodyInit, {
      status: 200,
      headers,
    })
  } catch (error) {
    console.error('Generate PDF error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request data',
          details: error.issues,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate PDF',
      },
      { status: 500 }
    )
  }
}

export const POST = withCounselor(handlePOST)
