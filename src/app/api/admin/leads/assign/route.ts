// Lead Assignment/Reassignment API
// POST: Assign or reassign leads to counselors (Admin only)

import { NextRequest, NextResponse } from 'next/server'
import { withAdmin } from '@/lib/auth/middleware'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import type { LeadStage } from '@/generated/prisma'
import { WebhookService } from '@/lib/webhooks/webhookService'

const assignLeadSchema = z.object({
  leadIds: z.array(z.string()).min(1, 'At least one lead ID required').max(100, 'Maximum 100 leads per request'),
  counselorId: z.string().min(1, 'Counselor ID is required'),
  notifyCounselor: z.boolean().optional().default(true),
  reason: z.string().optional(),
})

const bulkAssignSchema = z.object({
  // Auto-assign unassigned leads
  assignUnassigned: z.boolean().optional(),
  // Rebalance all leads evenly
  rebalance: z.boolean().optional(),
  // Only include leads from specific stages
  stages: z.array(z.string()).optional(),
})

async function handlePOST(request: NextRequest, session: { userId: string; role: string }) {
  try {
    const body = await request.json()
    const validatedData = assignLeadSchema.parse(body)

    // Verify counselor exists and is active
    const counselor = await prisma.users.findFirst({
      where: {
        id: validatedData.counselorId,
        role: { in: ['COUNSELOR', 'ADMIN'] },
        isActive: true,
      },
      select: { id: true, name: true, email: true },
    })

    if (!counselor) {
      return NextResponse.json(
        { success: false, error: 'Invalid or inactive counselor' },
        { status: 400 }
      )
    }

    // Get existing leads with all fields needed for webhook dispatch
    const leads = await prisma.leads.findMany({
      where: { id: { in: validatedData.leadIds } },
      select: {
        id: true,
        studentName: true,
        email: true,
        phone: true,
        courseInterest: true,
        stage: true,
        priority: true,
        assignedToId: true,
      },
    })

    if (leads.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No valid leads found' },
        { status: 404 }
      )
    }

    // Track reassignments for activity logging
    const reassignments = leads.filter((lead) => lead.assignedToId !== validatedData.counselorId)

    // Update all leads in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Update leads
      const updateResult = await tx.leads.updateMany({
        where: { id: { in: validatedData.leadIds } },
        data: {
          assignedToId: validatedData.counselorId,
          updatedAt: new Date(),
        },
      })

      // Create activity logs for each reassignment
      for (const lead of reassignments) {
        await tx.activities.create({
          data: {
            id: `act_${Date.now()}_${Math.random().toString(36).substring(7)}`,
            userId: session.userId,
            leadId: lead.id,
            action: 'LEAD_REASSIGNED',
            description: `Lead reassigned to ${counselor.name}${validatedData.reason ? `: ${validatedData.reason}` : ''}`,
            metadata: {
              previousCounselorId: lead.assignedToId,
              newCounselorId: validatedData.counselorId,
              reason: validatedData.reason,
            },
          },
        })
      }

      return updateResult
    })

    // Dispatch webhook events for each assigned lead
    try {
      const counselorData = {
        id: counselor.id,
        name: counselor.name,
        email: counselor.email,
      }

      for (const lead of leads) {
        await WebhookService.onLeadAssigned(
          {
            id: lead.id,
            studentName: lead.studentName,
            email: lead.email,
            phone: lead.phone,
            courseInterest: lead.courseInterest,
            stage: lead.stage,
            priority: lead.priority,
            previousAssignedToId: lead.assignedToId,
          },
          counselorData
        )
      }
    } catch (webhookError) {
      console.error('Failed to dispatch lead.assigned webhooks:', webhookError)
    }

    // TODO: Send notification to counselor if notifyCounselor is true
    // This would integrate with email/WhatsApp notification service

    return NextResponse.json({
      success: true,
      message: `${result.count} lead(s) assigned to ${counselor.name}`,
      data: {
        assignedCount: result.count,
        counselor: {
          id: counselor.id,
          name: counselor.name,
          email: counselor.email,
        },
        reassignedLeadIds: reassignments.map((l) => l.id),
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Error assigning leads:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to assign leads' },
      { status: 500 }
    )
  }
}

// GET: Get assignment statistics and counselor workloads
async function handleGET(_request: NextRequest, _session: { userId: string; role: string }) {
  try {
    // Get counselor workload statistics
    const counselors = await prisma.users.findMany({
      where: {
        role: { in: ['COUNSELOR', 'ADMIN'] },
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        _count: {
          select: {
            leads: true,
          },
        },
      },
    })

    // Get lead distribution by stage
    const leadsByStage = await prisma.leads.groupBy({
      by: ['stage', 'assignedToId'],
      _count: { id: true },
    })

    // Get unassigned leads count
    const unassignedLeads = await prisma.leads.count({
      where: {
        OR: [
          { assignedToId: null as unknown as string },
          { users: { isActive: false } },
        ],
      },
    })

    // Calculate workload per counselor
    const workloadStats = counselors.map((c) => {
      const stageBreakdown = leadsByStage
        .filter((s) => s.assignedToId === c.id)
        .reduce(
          (acc, s) => {
            acc[s.stage] = s._count.id
            return acc
          },
          {} as Record<string, number>
        )

      return {
        counselor: {
          id: c.id,
          name: c.name,
          email: c.email,
        },
        totalLeads: c._count.leads,
        stageBreakdown,
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        counselors: workloadStats,
        unassignedLeads,
        totalLeads: workloadStats.reduce((sum, c) => sum + c.totalLeads, 0) + unassignedLeads,
      },
    })
  } catch (error) {
    console.error('Error fetching assignment stats:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch assignment statistics' },
      { status: 500 }
    )
  }
}

// PUT: Bulk operations (auto-assign, rebalance)
async function handlePUT(request: NextRequest, session: { userId: string; role: string }) {
  try {
    const body = await request.json()
    const validatedData = bulkAssignSchema.parse(body)

    // Get active counselors
    const counselors = await prisma.users.findMany({
      where: {
        role: { in: ['COUNSELOR', 'ADMIN'] },
        isActive: true,
      },
      select: { id: true, name: true },
      orderBy: {
        leads: { _count: 'asc' },
      },
    })

    if (counselors.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No active counselors available' },
        { status: 400 }
      )
    }

    let assignedCount = 0

    if (validatedData.assignUnassigned) {
      // Find unassigned leads
      const unassignedLeads = await prisma.leads.findMany({
        where: {
          OR: [
            { assignedToId: null as unknown as string },
            // Could also check for inactive counselors
          ],
          ...(validatedData.stages && {
            stage: { in: validatedData.stages as LeadStage[] },
          }),
        },
        select: { id: true },
      })

      // Round-robin assignment
      for (let i = 0; i < unassignedLeads.length; i++) {
        const counselor = counselors[i % counselors.length]

        await prisma.leads.update({
          where: { id: unassignedLeads[i].id },
          data: {
            assignedToId: counselor.id,
            updatedAt: new Date(),
          },
        })

        await prisma.activities.create({
          data: {
            id: `act_${Date.now()}_${Math.random().toString(36).substring(7)}`,
            userId: session.userId,
            leadId: unassignedLeads[i].id,
            action: 'LEAD_AUTO_ASSIGNED',
            description: `Lead auto-assigned to ${counselor.name}`,
          },
        })

        assignedCount++
      }
    }

    if (validatedData.rebalance) {
      // Get all leads
      const allLeads = await prisma.leads.findMany({
        where: validatedData.stages
          ? { stage: { in: validatedData.stages as LeadStage[] } }
          : undefined,
        select: { id: true, assignedToId: true },
      })

      // Calculate target per counselor (for reference, could be used for smarter distribution)
      const _targetPerCounselor = Math.ceil(allLeads.length / counselors.length)

      // Reassign to balance
      for (let i = 0; i < allLeads.length; i++) {
        const counselor = counselors[i % counselors.length]
        const lead = allLeads[i]

        if (lead.assignedToId !== counselor.id) {
          await prisma.leads.update({
            where: { id: lead.id },
            data: {
              assignedToId: counselor.id,
              updatedAt: new Date(),
            },
          })

          assignedCount++
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `${assignedCount} lead(s) processed`,
      data: {
        processedCount: assignedCount,
        counselorCount: counselors.length,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Error in bulk assignment:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process bulk assignment' },
      { status: 500 }
    )
  }
}

export const POST = withAdmin(handlePOST)
export const GET = withAdmin(handleGET)
export const PUT = withAdmin(handlePUT)
