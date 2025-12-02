import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, phone, source, variant, page } = body

    // Validate required fields
    if (!email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Email and phone are required' },
        { status: 400 }
      )
    }

    // Check if lead already exists
    const existingLead = await prisma.lead.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    })

    if (existingLead) {
      // Update existing lead with exit intent data
      await prisma.lead.update({
        where: { id: existingLead.id },
        data: {
          source: source || existingLead.source,
          notes: `${existingLead.notes || ''}\n[Exit Intent] Variant: ${variant}, Page: ${page}`,
          updatedAt: new Date(),
        },
      })

      return NextResponse.json({
        success: true,
        message: 'Lead updated',
        leadId: existingLead.id,
        isExisting: true,
      })
    }

    // Create new lead
    const newLead = await prisma.lead.create({
      data: {
        email,
        phone,
        source: source || 'exit_intent',
        stage: 'NEW',
        notes: `[Exit Intent] Variant: ${variant}, Page: ${page}`,
        metadata: {
          exitIntentVariant: variant,
          exitIntentPage: page,
          capturedAt: new Date().toISOString(),
        },
      },
    })

    // Trigger WhatsApp welcome series for new leads
    try {
      const { startWelcomeSeries } = await import('@/lib/whatsapp/welcomeSeries')
      await startWelcomeSeries(newLead.id)
      console.log('WhatsApp welcome series started for lead:', newLead.id)
    } catch (welcomeError) {
      console.error('Failed to start welcome series:', welcomeError)
      // Non-blocking - don't fail the lead creation
    }

    // Calculate initial lead score
    try {
      const { updateLeadScore } = await import('@/lib/leads/leadScoring')
      await updateLeadScore(newLead.id)
      console.log('Lead score calculated for:', newLead.id)
    } catch (scoreError) {
      console.error('Failed to calculate lead score:', scoreError)
      // Non-blocking
    }

    return NextResponse.json({
      success: true,
      message: 'Lead created successfully',
      leadId: newLead.id,
      isExisting: false,
    })
  } catch (error) {
    console.error('Exit intent API error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
