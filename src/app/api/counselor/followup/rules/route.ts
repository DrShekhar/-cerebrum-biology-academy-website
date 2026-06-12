import { NextRequest, NextResponse } from 'next/server'
import { authenticateCounselor } from '@/lib/auth/counselor-auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import type { FollowupTrigger, FollowupAction } from '@/generated/prisma'

const createRuleSchema = z.object({
  name: z.string().min(1, 'Rule name is required'),
  description: z.string().optional(),
  triggerType: z.enum([
    'STAGE_CHANGE',
    'TIME_BASED',
    'SCORE_THRESHOLD',
    'INACTIVITY',
    'DEMO_NO_SHOW',
    'DEMO_COMPLETED',
    'OFFER_SENT',
    'CUSTOM',
  ]),
  triggerConditions: z.record(z.string(), z.any()),
  delayMinutes: z.number().min(0).default(0),
  actionType: z.enum(['EMAIL', 'WHATSAPP', 'CALL_TASK', 'SMS', 'NOTIFICATION', 'TASK']),
  templateId: z.string().optional(),
  priority: z.enum(['HOT', 'WARM', 'COLD']).optional(),
  assignToCounselor: z.boolean().default(true),
  isActive: z.boolean().default(true),
})

const updateRuleSchema = createRuleSchema.partial().extend({
  id: z.string(),
})

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateCounselor()
    if ('error' in authResult) return authResult.error
    const { session } = authResult

    const { searchParams } = new URL(request.url)
    const isActive = searchParams.get('isActive')
    const triggerType = searchParams.get('triggerType') as FollowupTrigger | null
    const actionType = searchParams.get('actionType') as FollowupAction | null
    const search = searchParams.get('search')

    const where: any = {}

    if (isActive !== null) {
      where.isActive = isActive === 'true'
    }

    if (triggerType) {
      where.triggerType = triggerType
    }

    if (actionType) {
      where.actionType = actionType
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    const rules = await prisma.followup_rules.findMany({
      where,
      include: {
        followup_templates: {
          select: {
            id: true,
            name: true,
            channel: true,
          },
        },
        users_followup_rules_createdByIdTousers: {
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
      orderBy: [{ isActive: 'desc' }, { createdAt: 'desc' }],
    })

    const rulesWithStats = await Promise.all(
      rules.map(async (rule) => {
        const queueStats = await prisma.followup_queue.groupBy({
          by: ['status'],
          where: { ruleId: rule.id },
          _count: true,
        })

        const stats = {
          total: rule._count.followup_queue,
          pending: queueStats.find((s) => s.status === 'PENDING')?._count || 0,
          completed: queueStats.find((s) => s.status === 'COMPLETED')?._count || 0,
          failed: queueStats.find((s) => s.status === 'FAILED')?._count || 0,
        }

        const { followup_templates, users_followup_rules_createdByIdTousers, ...ruleRest } = rule
        return {
          ...ruleRest,
          template: followup_templates,
          user: users_followup_rules_createdByIdTousers,
          stats,
        }
      })
    )

    return NextResponse.json({
      success: true,
      data: rulesWithStats,
      count: rulesWithStats.length,
    })
  } catch (error) {
    console.error('Error fetching follow-up rules:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch follow-up rules',
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
    const validatedData = createRuleSchema.parse(body)

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

      if (template.channel !== validatedData.actionType) {
        return NextResponse.json(
          {
            success: false,
            error: 'Template channel does not match action type',
          },
          { status: 400 }
        )
      }
    }

    const rule = await prisma.followup_rules.create({
      data: {
        id: `rule_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        ...validatedData,
        priority: validatedData.priority || 'WARM',
        createdById: session.userId,
        updatedAt: new Date(),
      },
      include: {
        followup_templates: {
          select: {
            id: true,
            name: true,
            channel: true,
          },
        },
        users_followup_rules_createdByIdTousers: {
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
        id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        userId: session.userId,
        action: 'FOLLOWUP_RULE_CREATED',
        description: `Created follow-up rule: ${rule.name}`,
      },
    })

    const {
      followup_templates: ruleTemplate,
      users_followup_rules_createdByIdTousers: ruleUser,
      ...ruleData
    } = rule
    return NextResponse.json(
      {
        success: true,
        data: { ...ruleData, template: ruleTemplate, user: ruleUser },
        message: 'Follow-up rule created successfully',
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

    console.error('Error creating follow-up rule:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create follow-up rule',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
