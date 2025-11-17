import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'
import { z } from 'zod'

const prisma = new PrismaClient()

const leadCaptureSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  whatsappNumber: z.string().optional().or(z.literal('')),
  topicSlug: z.string(),
  leadMagnetId: z.string(),
  source: z.string().default('topic-page'),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  referrer: z.string().optional(),
  userAgent: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const validatedData = leadCaptureSchema.parse(body)

    if (!validatedData.email && !validatedData.whatsappNumber) {
      return NextResponse.json(
        { error: 'Either email or WhatsApp number is required' },
        { status: 400 }
      )
    }

    const topic = await prisma.biology_topics.findUnique({
      where: { slug: validatedData.topicSlug },
      select: { slug: true, id: true },
    })

    if (!topic) {
      return NextResponse.json({ error: 'Topic not found' }, { status: 404 })
    }

    const leadMagnet = await prisma.lead_magnets.findUnique({
      where: { id: validatedData.leadMagnetId },
      select: { id: true, fileUrl: true, requiresEmail: true, requiresWhatsApp: true },
    })

    if (!leadMagnet) {
      return NextResponse.json({ error: 'Lead magnet not found' }, { status: 404 })
    }

    if (leadMagnet.requiresEmail && !validatedData.email) {
      return NextResponse.json({ error: 'Email is required for this resource' }, { status: 400 })
    }

    if (leadMagnet.requiresWhatsApp && !validatedData.whatsappNumber) {
      return NextResponse.json(
        { error: 'WhatsApp number is required for this resource' },
        { status: 400 }
      )
    }

    const deviceType = validatedData.userAgent?.toLowerCase().includes('mobile')
      ? 'MOBILE'
      : 'DESKTOP'

    const contentLead = await prisma.content_leads.create({
      data: {
        id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        email: validatedData.email || undefined,
        whatsappNumber: validatedData.whatsappNumber || undefined,
        name: validatedData.name,
        source: validatedData.source,
        topicSlug: validatedData.topicSlug,
        leadMagnetId: validatedData.leadMagnetId,
        utmSource: validatedData.utmSource || undefined,
        utmMedium: validatedData.utmMedium || undefined,
        utmCampaign: validatedData.utmCampaign || undefined,
        referrerUrl: validatedData.referrer || undefined,
        deviceType: deviceType,
        leadStage: 'NEW',
        leadScore: 10,
        updatedAt: new Date(),
      },
    })

    await Promise.all([
      prisma.biology_topics.update({
        where: { id: topic.id },
        data: { leadConversions: { increment: 1 } },
      }),
      prisma.lead_magnets.update({
        where: { id: leadMagnet.id },
        data: { downloadCount: { increment: 1 } },
      }),
    ])

    const downloadUrl = leadMagnet.fileUrl
      ? leadMagnet.fileUrl
      : `/api/seo/leads/download/${leadMagnet.id}?leadId=${contentLead.id}`

    return NextResponse.json(
      {
        success: true,
        leadId: contentLead.id,
        downloadUrl,
        message: 'Lead captured successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Lead capture error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to capture lead. Please try again.' },
      { status: 500 }
    )
  }
}
