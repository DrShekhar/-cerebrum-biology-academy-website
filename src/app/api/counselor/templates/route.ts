/**
 * API Route: Message Templates Management
 * GET /api/counselor/templates - List all templates (optionally filter by type)
 * POST /api/counselor/templates - Create new template
 */

import { NextRequest, NextResponse } from 'next/server'
import { withCounselor } from '@/lib/auth/middleware'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// GET handler - List templates
async function handleGET(req: NextRequest, session: any) {
  try {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type')
    const activeOnly = searchParams.get('activeOnly') === 'true'

    const where: any = {
      createdById: session.userId,
    }

    if (type) {
      where.type = type
    }

    if (activeOnly) {
      where.isActive = true
    }

    const templates = await prisma.message_templates.findMany({
      where,
      orderBy: [{ usageCount: 'desc' }, { createdAt: 'desc' }],
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: templates,
    })
  } catch (error) {
    console.error('Error fetching templates:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch templates',
      },
      { status: 500 }
    )
  }
}

// POST handler - Create template
const createTemplateSchema = z.object({
  name: z.string().min(1, 'Template name is required'),
  type: z.enum(['WHATSAPP', 'EMAIL', 'CALL', 'SMS']),
  subject: z.string().optional(),
  message: z.string().min(1, 'Message content is required'),
})

async function handlePOST(req: NextRequest, session: any) {
  try {
    const body = await req.json()
    const validatedData = createTemplateSchema.parse(body)

    // Email templates should have a subject
    if (validatedData.type === 'EMAIL' && !validatedData.subject) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email templates require a subject',
        },
        { status: 400 }
      )
    }

    const template = await prisma.message_templates.create({
      data: {
        name: validatedData.name,
        type: validatedData.type,
        subject: validatedData.subject || null,
        message: validatedData.message,
        createdById: session.userId,
      },
    })

    return NextResponse.json(
      {
        success: true,
        data: template,
        message: 'Template created successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          details: error.issues,
        },
        { status: 400 }
      )
    }

    console.error('Error creating template:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create template',
      },
      { status: 500 }
    )
  }
}

export const GET = withCounselor(handleGET)
export const POST = withCounselor(handlePOST)
