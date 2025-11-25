import { NextRequest, NextResponse } from 'next/server'
import { authenticateCounselor } from '@/lib/auth/counselor-auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { validateTemplate } from '@/lib/templateRenderer'
import type { FollowupAction } from '@/generated/prisma'

const createTemplateSchema = z.object({
  name: z.string().min(1, 'Template name is required'),
  description: z.string().optional(),
  channel: z.enum(['EMAIL', 'WHATSAPP', 'CALL_TASK', 'SMS', 'NOTIFICATION', 'TASK']),
  subject: z.string().optional(),
  content: z.string().min(1, 'Template content is required'),
  variables: z.record(z.string(), z.any()).optional(),
  isActive: z.boolean().default(true),
})

const updateTemplateSchema = createTemplateSchema.partial().extend({
  id: z.string(),
})

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateCounselor()
    if ('error' in authResult) return authResult.error

    const { searchParams } = new URL(request.url)
    const channel = searchParams.get('channel') as FollowupAction | null
    const isActive = searchParams.get('isActive')
    const search = searchParams.get('search')

    const where: any = {}

    if (channel) {
      where.channel = channel
    }

    if (isActive !== null) {
      where.isActive = isActive === 'true'
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ]
    }

    const templates = await prisma.followup_templates.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            rules: true,
          },
        },
      },
      orderBy: [{ isActive: 'desc' }, { createdAt: 'desc' }],
    })

    const templatesWithValidation = templates.map((template) => {
      const validation = validateTemplate(template.content)

      return {
        ...template,
        validation: {
          valid: validation.valid,
          invalidPlaceholders: validation.invalidPlaceholders,
          validPlaceholders: validation.validPlaceholders,
        },
      }
    })

    return NextResponse.json({
      success: true,
      data: templatesWithValidation,
      count: templatesWithValidation.length,
    })
  } catch (error) {
    console.error('Error fetching follow-up templates:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch follow-up templates',
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
    const validatedData = createTemplateSchema.parse(body)

    const validation = validateTemplate(validatedData.content)

    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Template contains invalid placeholders',
          details: {
            invalidPlaceholders: validation.invalidPlaceholders,
          },
        },
        { status: 400 }
      )
    }

    if (validatedData.channel === 'EMAIL' && !validatedData.subject) {
      return NextResponse.json(
        {
          success: false,
          error: 'Subject is required for email templates',
        },
        { status: 400 }
      )
    }

    const template = await prisma.followup_templates.create({
      data: {
        id: `template_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        ...validatedData,
        variables: validatedData.variables || {},
        createdBy: session.userId,
        updatedAt: new Date(),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    await prisma.activities.create({
      data: {
        userId: session.userId,
        action: 'FOLLOWUP_TEMPLATE_CREATED',
        description: `Created follow-up template: ${template.name}`,
      },
    })

    return NextResponse.json(
      {
        success: true,
        data: template,
        message: 'Follow-up template created successfully',
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

    console.error('Error creating follow-up template:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create follow-up template',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
