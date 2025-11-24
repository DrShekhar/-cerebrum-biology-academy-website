import { NextRequest, NextResponse } from 'next/server'
import { authenticateCounselor } from '@/lib/auth/counselor-auth'
import { prisma } from '@/lib/prisma'
import { executeFollowup, cancelQueueItem, skipQueueItem } from '@/lib/followupProcessor'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authResult = await authenticateCounselor()
    if ('error' in authResult) return authResult.error

    const queueItem = await prisma.followup_queue.findUnique({
      where: { id: params.id },
      include: {
        lead: {
          select: {
            id: true,
            studentName: true,
            email: true,
            phone: true,
            stage: true,
            assignedToId: true,
          },
        },
        rule: {
          select: {
            id: true,
            name: true,
            description: true,
            triggerType: true,
            actionType: true,
            priority: true,
          },
        },
      },
    })

    if (!queueItem) {
      return NextResponse.json(
        {
          success: false,
          error: 'Queue item not found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: queueItem,
    })
  } catch (error) {
    console.error('Error fetching queue item:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch queue item',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authResult = await authenticateCounselor()
    if ('error' in authResult) return authResult.error
    const { session } = authResult

    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')

    if (!action || !['execute', 'cancel', 'skip'].includes(action)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid action. Must be one of: execute, cancel, skip',
        },
        { status: 400 }
      )
    }

    const queueItem = await prisma.followup_queue.findUnique({
      where: { id: params.id },
      include: {
        lead: {
          include: {
            users: true,
          },
        },
        rule: {
          include: {
            template: true,
          },
        },
      },
    })

    if (!queueItem) {
      return NextResponse.json(
        {
          success: false,
          error: 'Queue item not found',
        },
        { status: 404 }
      )
    }

    if (queueItem.lead.assignedToId !== session.userId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized: This lead is not assigned to you',
        },
        { status: 403 }
      )
    }

    let result: any

    switch (action) {
      case 'execute':
        if (queueItem.status !== 'PENDING') {
          return NextResponse.json(
            {
              success: false,
              error: `Cannot execute queue item with status: ${queueItem.status}`,
            },
            { status: 400 }
          )
        }

        result = await executeFollowup(queueItem)

        if (result.success) {
          await prisma.followup_queue.update({
            where: { id: params.id },
            data: {
              status: 'COMPLETED',
              completedAt: new Date(),
            },
          })

          await prisma.followup_history.create({
            data: {
              leadId: queueItem.leadId,
              ruleId: queueItem.ruleId,
              action: queueItem.rule.actionType,
              channel: queueItem.rule.actionType,
              content: result.message,
              status: 'SENT',
              isAutomated: false,
              metadata: {
                queueItemId: queueItem.id,
                deliveryId: result.deliveryId,
                manuallyTriggered: true,
                triggeredBy: session.userId,
              },
            },
          })

          await prisma.activities.create({
            data: {
              userId: session.userId,
              action: 'FOLLOWUP_EXECUTED',
              description: `Manually executed follow-up: ${queueItem.rule.name} for lead ${queueItem.lead.studentName}`,
            },
          })

          return NextResponse.json({
            success: true,
            message: 'Follow-up executed successfully',
            result,
          })
        } else {
          await prisma.followup_queue.update({
            where: { id: params.id },
            data: {
              status: 'FAILED',
              errorMessage: result.message,
            },
          })

          return NextResponse.json(
            {
              success: false,
              error: 'Follow-up execution failed',
              message: result.message,
            },
            { status: 500 }
          )
        }

      case 'cancel':
        const body = await request.json()
        const reason = body.reason || 'Cancelled by counselor'

        await cancelQueueItem(params.id, reason)

        await prisma.activities.create({
          data: {
            userId: session.userId,
            action: 'FOLLOWUP_CANCELLED',
            description: `Cancelled follow-up: ${queueItem.rule.name} for lead ${queueItem.lead.studentName}. Reason: ${reason}`,
          },
        })

        return NextResponse.json({
          success: true,
          message: 'Follow-up cancelled successfully',
        })

      case 'skip':
        const skipBody = await request.json()
        const skipReason = skipBody.reason || 'Skipped by counselor'

        await skipQueueItem(params.id, skipReason)

        await prisma.activities.create({
          data: {
            userId: session.userId,
            action: 'FOLLOWUP_SKIPPED',
            description: `Skipped follow-up: ${queueItem.rule.name} for lead ${queueItem.lead.studentName}. Reason: ${skipReason}`,
          },
        })

        return NextResponse.json({
          success: true,
          message: 'Follow-up skipped successfully',
        })

      default:
        return NextResponse.json(
          {
            success: false,
            error: 'Unknown action',
          },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Error processing queue item action:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process queue item action',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
