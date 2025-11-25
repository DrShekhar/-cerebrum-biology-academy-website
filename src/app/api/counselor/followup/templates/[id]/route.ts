import { NextRequest, NextResponse } from 'next/server'
import { authenticateCounselor } from '@/lib/auth/counselor-auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { validateTemplate } from '@/lib/templateRenderer'

const updateTemplateSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  channel: z.enum(['EMAIL', 'WHATSAPP', 'CALL_TASK', 'SMS', 'NOTIFICATION', 'TASK']).optional(),
  subject: z.string().optional(),
  content: z.string().min(1).optional(),
  variables: z.record(z.string(), z.any()).optional(),
  isActive: z.boolean().optional(),
})

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authResult = await authenticateCounselor()
    if ('error' in authResult) return authResult.error

    const template = await prisma.followup_templates.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        rules: {
          select: {
            id: true,
            name: true,
            isActive: true,
            triggerType: true,
            actionType: true,
          },
        },
      },
    })

    if (!template) {
      return NextResponse.json(
        {
          success: false,
          error: 'Template not found',
        },
        { status: 404 }
      )
    }

    const validation = validateTemplate(template.content)

    return NextResponse.json({
      success: true,
      data: {
        ...template,
        validation: {
          valid: validation.valid,
          invalidPlaceholders: validation.invalidPlaceholders,
          validPlaceholders: validation.validPlaceholders,
        },
      },
    })
  } catch (error) {
    console.error('Error fetching template:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch template',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authResult = await authenticateCounselor()
    if ('error' in authResult) return authResult.error
    const { session } = authResult

    const existingTemplate = await prisma.followup_templates.findUnique({
      where: { id: params.id },
    })

    if (!existingTemplate) {
      return NextResponse.json(
        {
          success: false,
          error: 'Template not found',
        },
        { status: 404 }
      )
    }

    const body = await request.json()
    const validatedData = updateTemplateSchema.parse(body)

    if (validatedData.content) {
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
    }

    const channel = validatedData.channel || existingTemplate.channel
    if (channel === 'EMAIL') {
      const subject =
        validatedData.subject !== undefined ? validatedData.subject : existingTemplate.subject

      if (!subject) {
        return NextResponse.json(
          {
            success: false,
            error: 'Subject is required for email templates',
          },
          { status: 400 }
        )
      }
    }

    if (validatedData.channel && validatedData.channel !== existingTemplate.channel) {
      const linkedRules = await prisma.followup_rules.findMany({
        where: {
          templateId: params.id,
          isActive: true,
        },
        select: { id: true, name: true },
      })

      if (linkedRules.length > 0) {
        return NextResponse.json(
          {
            success: false,
            error: 'Cannot change template channel while linked to active rules',
            details: {
              linkedRules: linkedRules.map((r) => ({ id: r.id, name: r.name })),
            },
          },
          { status: 400 }
        )
      }
    }

    const updatedTemplate = await prisma.followup_templates.update({
      where: { id: params.id },
      data: {
        ...validatedData,
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
        rules: {
          select: {
            id: true,
            name: true,
            isActive: true,
          },
        },
      },
    })

    await prisma.activities.create({
      data: {
        userId: session.userId,
        action: 'FOLLOWUP_TEMPLATE_UPDATED',
        description: `Updated follow-up template: ${updatedTemplate.name}`,
      },
    })

    const validation = validateTemplate(updatedTemplate.content)

    return NextResponse.json({
      success: true,
      data: {
        ...updatedTemplate,
        validation: {
          valid: validation.valid,
          invalidPlaceholders: validation.invalidPlaceholders,
          validPlaceholders: validation.validPlaceholders,
        },
      },
      message: 'Template updated successfully',
    })
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

    console.error('Error updating template:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update template',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authResult = await authenticateCounselor()
    if ('error' in authResult) return authResult.error
    const { session } = authResult

    const existingTemplate = await prisma.followup_templates.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            rules: true,
          },
        },
      },
    })

    if (!existingTemplate) {
      return NextResponse.json(
        {
          success: false,
          error: 'Template not found',
        },
        { status: 404 }
      )
    }

    const hasLinkedRules = existingTemplate._count.rules > 0

    if (hasLinkedRules) {
      await prisma.followup_templates.update({
        where: { id: params.id },
        data: {
          isActive: false,
          updatedAt: new Date(),
        },
      })

      await prisma.activities.create({
        data: {
          userId: session.userId,
          action: 'FOLLOWUP_TEMPLATE_DEACTIVATED',
          description: `Deactivated follow-up template: ${existingTemplate.name} (has linked rules)`,
        },
      })

      return NextResponse.json({
        success: true,
        message: 'Template deactivated (has linked rules)',
        softDeleted: true,
      })
    } else {
      await prisma.followup_templates.delete({
        where: { id: params.id },
      })

      await prisma.activities.create({
        data: {
          userId: session.userId,
          action: 'FOLLOWUP_TEMPLATE_DELETED',
          description: `Deleted follow-up template: ${existingTemplate.name}`,
        },
      })

      return NextResponse.json({
        success: true,
        message: 'Template deleted successfully',
        softDeleted: false,
      })
    }
  } catch (error) {
    console.error('Error deleting template:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete template',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
