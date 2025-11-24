import { NextRequest, NextResponse } from 'next/server'
import { authenticateCounselor } from '@/lib/auth/counselor-auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const updateRuleSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  triggerType: z
    .enum([
      'STAGE_CHANGE',
      'TIME_BASED',
      'SCORE_THRESHOLD',
      'INACTIVITY',
      'DEMO_NO_SHOW',
      'DEMO_COMPLETED',
      'OFFER_SENT',
      'CUSTOM',
    ])
    .optional(),
  triggerConditions: z.record(z.any()).optional(),
  delayMinutes: z.number().min(0).optional(),
  actionType: z.enum(['EMAIL', 'WHATSAPP', 'CALL_TASK', 'SMS', 'NOTIFICATION', 'TASK']).optional(),
  templateId: z.string().nullable().optional(),
  priority: z.enum(['HOT', 'WARM', 'COLD']).optional(),
  assignToCounselor: z.boolean().optional(),
  isActive: z.boolean().optional(),
})

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authResult = await authenticateCounselor()
    if ('error' in authResult) return authResult.error

    const rule = await prisma.followup_rules.findUnique({
      where: { id: params.id },
      include: {
        template: {
          select: {
            id: true,
            name: true,
            channel: true,
            content: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            followup_queue: true,
          },
        },
      },
    })

    if (!rule) {
      return NextResponse.json(
        {
          success: false,
          error: 'Follow-up rule not found',
        },
        { status: 404 }
      )
    }

    const queueStats = await prisma.followup_queue.groupBy({
      by: ['status'],
      where: { ruleId: rule.id },
      _count: true,
    })

    const stats = {
      total: rule._count.followup_queue,
      pending: queueStats.find((s) => s.status === 'PENDING')?._count || 0,
      processing: queueStats.find((s) => s.status === 'PROCESSING')?._count || 0,
      completed: queueStats.find((s) => s.status === 'COMPLETED')?._count || 0,
      failed: queueStats.find((s) => s.status === 'FAILED')?._count || 0,
      skipped: queueStats.find((s) => s.status === 'SKIPPED')?._count || 0,
      cancelled: queueStats.find((s) => s.status === 'CANCELLED')?._count || 0,
    }

    return NextResponse.json({
      success: true,
      data: {
        ...rule,
        stats,
      },
    })
  } catch (error) {
    console.error('Error fetching follow-up rule:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch follow-up rule',
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

    const existingRule = await prisma.followup_rules.findUnique({
      where: { id: params.id },
    })

    if (!existingRule) {
      return NextResponse.json(
        {
          success: false,
          error: 'Follow-up rule not found',
        },
        { status: 404 }
      )
    }

    const body = await request.json()
    const validatedData = updateRuleSchema.parse(body)

    if (validatedData.templateId !== undefined) {
      if (validatedData.templateId) {
        const template = await prisma.followup_templates.findUnique({
          where: { id: validatedData.templateId },
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

        const actionType = validatedData.actionType || existingRule.actionType
        if (template.channel !== actionType) {
          return NextResponse.json(
            {
              success: false,
              error: 'Template channel does not match action type',
            },
            { status: 400 }
          )
        }
      }
    }

    const updatedRule = await prisma.followup_rules.update({
      where: { id: params.id },
      data: {
        ...validatedData,
        updatedBy: session.userId,
        updatedAt: new Date(),
      },
      include: {
        template: {
          select: {
            id: true,
            name: true,
            channel: true,
          },
        },
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
        action: 'FOLLOWUP_RULE_UPDATED',
        description: `Updated follow-up rule: ${updatedRule.name}`,
      },
    })

    return NextResponse.json({
      success: true,
      data: updatedRule,
      message: 'Follow-up rule updated successfully',
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

    console.error('Error updating follow-up rule:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update follow-up rule',
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

    const existingRule = await prisma.followup_rules.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            followup_queue: true,
          },
        },
      },
    })

    if (!existingRule) {
      return NextResponse.json(
        {
          success: false,
          error: 'Follow-up rule not found',
        },
        { status: 404 }
      )
    }

    const hasQueueItems = existingRule._count.followup_queue > 0

    if (hasQueueItems) {
      await prisma.followup_rules.update({
        where: { id: params.id },
        data: {
          isActive: false,
          updatedBy: session.userId,
          updatedAt: new Date(),
        },
      })

      await prisma.activities.create({
        data: {
          userId: session.userId,
          action: 'FOLLOWUP_RULE_DEACTIVATED',
          description: `Deactivated follow-up rule: ${existingRule.name} (has existing queue items)`,
        },
      })

      return NextResponse.json({
        success: true,
        message: 'Follow-up rule deactivated (has existing queue items)',
        softDeleted: true,
      })
    } else {
      await prisma.followup_rules.delete({
        where: { id: params.id },
      })

      await prisma.activities.create({
        data: {
          userId: session.userId,
          action: 'FOLLOWUP_RULE_DELETED',
          description: `Deleted follow-up rule: ${existingRule.name}`,
        },
      })

      return NextResponse.json({
        success: true,
        message: 'Follow-up rule deleted successfully',
        softDeleted: false,
      })
    }
  } catch (error) {
    console.error('Error deleting follow-up rule:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete follow-up rule',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
