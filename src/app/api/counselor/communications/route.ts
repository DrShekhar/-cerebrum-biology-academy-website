import { NextRequest, NextResponse } from 'next/server'
import { authenticateCounselor } from '@/lib/auth/counselor-auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { WebhookService } from '@/lib/webhooks/webhookService'

const createCommunicationSchema = z.object({
  leadId: z.string().min(1, 'Lead ID is required'),
  type: z.enum(['WHATSAPP', 'EMAIL', 'CALL']),
  direction: z.enum(['INBOUND', 'OUTBOUND']),
  subject: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
  templateName: z.string().optional(),
  callDuration: z.number().optional(),
  attachments: z.array(z.string()).optional(),
})

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateCounselor()
    if ('error' in authResult) return authResult.error
    const { session } = authResult

    const { searchParams } = new URL(request.url)
    const leadId = searchParams.get('leadId')
    const type = searchParams.get('type')

    const where: Record<string, unknown> = {}

    if (leadId) {
      const lead = await prisma.leads.findUnique({
        where: { id: leadId },
        select: { assignedToId: true },
      })

      if (!lead) {
        return NextResponse.json(
          {
            success: false,
            error: 'Lead not found',
          },
          { status: 404 }
        )
      }

      if (lead.assignedToId !== session.userId && session.role !== 'ADMIN') {
        return NextResponse.json(
          {
            success: false,
            error: 'Access denied',
          },
          { status: 403 }
        )
      }

      where.leadId = leadId
    } else {
      where.leads = {
        assignedToId: session.userId,
      }
    }

    if (type) {
      where.type = type
    }

    const communications = await prisma.crm_communications.findMany({
      where,
      include: {
        leads: {
          select: {
            id: true,
            studentName: true,
            email: true,
            phone: true,
          },
        },
        users: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { sentAt: 'desc' },
      take: 100,
    })

    return NextResponse.json({
      success: true,
      data: communications,
      count: communications.length,
    })
  } catch (error) {
    console.error('Error fetching communications:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch communications',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateCounselor()
    if ('error' in authResult) return authResult.error
    const { session } = authResult

    const body = await request.json()
    const validatedData = createCommunicationSchema.parse(body)

    const lead = await prisma.leads.findUnique({
      where: { id: validatedData.leadId },
      select: { assignedToId: true, studentName: true },
    })

    if (!lead) {
      return NextResponse.json(
        {
          success: false,
          error: 'Lead not found',
        },
        { status: 404 }
      )
    }

    if (lead.assignedToId !== session.userId && session.role !== 'ADMIN') {
      return NextResponse.json(
        {
          success: false,
          error: 'Access denied',
        },
        { status: 403 }
      )
    }

    const communication = await prisma.crm_communications.create({
      data: {
        ...validatedData,
        sentById: session.userId,
        status: 'SENT',
      },
      include: {
        leads: {
          select: {
            id: true,
            studentName: true,
          },
        },
        users: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    await prisma.leads.update({
      where: { id: validatedData.leadId },
      data: {
        lastContactedAt: new Date(),
      },
    })

    await prisma.activities.create({
      data: {
        id: `act_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        userId: session.userId,
        leadId: validatedData.leadId,
        action: 'COMMUNICATION_SENT',
        description: `Sent ${validatedData.type} message to ${lead.studentName}`,
      },
    })

    // Dispatch webhook event for communication sent
    try {
      await WebhookService.onCommunicationSent(
        {
          id: validatedData.leadId,
          studentName: lead.studentName,
        },
        {
          id: communication.id,
          type: validatedData.type,
          direction: validatedData.direction,
          subject: validatedData.subject,
          messagePreview: validatedData.message.substring(0, 100),
          sentBy: session.userId,
          sentAt: communication.sentAt,
        }
      )
    } catch (webhookError) {
      console.error('Failed to dispatch communication.sent webhook:', webhookError)
    }

    return NextResponse.json(
      {
        success: true,
        data: communication,
        message: 'Communication logged successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.issues,
        },
        { status: 400 }
      )
    }

    console.error('Error creating communication:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create communication',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
