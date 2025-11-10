import { NextRequest, NextResponse } from 'next/server'
import { withCounselor } from '@/lib/auth/middleware'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

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

async function handleGET(request: NextRequest, session: any) {
  try {
    const { searchParams } = new URL(request.url)
    const leadId = searchParams.get('leadId')
    const type = searchParams.get('type')

    const where: any = {}

    if (leadId) {
      const lead = await prisma.lead.findUnique({
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
      where.lead = {
        assignedToId: session.userId,
      }
    }

    if (type) {
      where.type = type
    }

    const communications = await prisma.communication.findMany({
      where,
      include: {
        lead: {
          select: {
            id: true,
            studentName: true,
            email: true,
            phone: true,
          },
        },
        sentBy: {
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

async function handlePOST(request: NextRequest, session: any) {
  try {
    const body = await request.json()
    const validatedData = createCommunicationSchema.parse(body)

    const lead = await prisma.lead.findUnique({
      where: { id: validatedData.leadId },
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

    const communication = await prisma.communication.create({
      data: {
        ...validatedData,
        sentById: session.userId,
        status: 'SENT',
      },
      include: {
        lead: {
          select: {
            id: true,
            studentName: true,
          },
        },
        sentBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    await prisma.lead.update({
      where: { id: validatedData.leadId },
      data: {
        lastContactedAt: new Date(),
      },
    })

    await prisma.activity.create({
      data: {
        userId: session.userId,
        leadId: validatedData.leadId,
        action: 'COMMUNICATION_SENT',
        description: `Sent ${validatedData.type} message to ${communication.lead.studentName}`,
      },
    })

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
          details: error.errors,
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

export const GET = withCounselor(handleGET)
export const POST = withCounselor(handlePOST)
