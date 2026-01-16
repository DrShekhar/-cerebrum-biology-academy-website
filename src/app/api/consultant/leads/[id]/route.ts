import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth/config'

export const dynamic = 'force-dynamic'

interface RouteParams {
  params: Promise<{ id: string }>
}

/**
 * GET /api/consultant/leads/[id]
 * Get detailed information about a specific lead
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 })
    }

    const { id } = await params

    // Get consultant profile
    const consultant = await prisma.consultants.findUnique({
      where: { userId: session.user.id },
    })

    if (!consultant) {
      return NextResponse.json(
        { success: false, error: 'Consultant profile not found' },
        { status: 403 }
      )
    }

    // Get the referral (only if it belongs to this consultant)
    const referral = await prisma.referrals.findFirst({
      where: {
        id,
        consultantId: consultant.id,
      },
      include: {
        referral_link: {
          select: { id: true, code: true, name: true },
        },
        commissions: {
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!referral) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 })
    }

    // Get timeline of status changes (from metadata if available)
    const timeline = buildTimeline(referral)

    return NextResponse.json({
      success: true,
      data: {
        id: referral.id,
        studentName: referral.studentName,
        phone: referral.phone,
        email: referral.email,
        courseInterest: referral.courseInterest,
        status: referral.status,
        statusLabel: getStatusLabel(referral.status),
        source: referral.source,
        notes: referral.notes,
        referralLink: referral.referral_link,
        demoScheduledAt: referral.demoScheduledAt?.toISOString(),
        demoCompletedAt: referral.demoCompletedAt?.toISOString(),
        offerSentAt: referral.offerSentAt?.toISOString(),
        paymentReceivedAt: referral.paymentReceivedAt?.toISOString(),
        enrolledAt: referral.enrolledAt?.toISOString(),
        lostAt: referral.lostAt?.toISOString(),
        lostReason: referral.lostReason,
        enrollmentId: referral.enrollmentId,
        totalFeeAmount: referral.totalFeeAmount ? Number(referral.totalFeeAmount) : null,
        commissionEarned: referral.commissionEarned ? Number(referral.commissionEarned) : null,
        commissions: referral.commissions.map((c) => ({
          id: c.id,
          amount: Number(c.amount),
          percentage: Number(c.percentage),
          baseAmount: Number(c.baseAmount),
          status: c.status,
          paidAt: c.paidAt?.toISOString(),
          paymentRef: c.paymentRef,
          createdAt: c.createdAt.toISOString(),
        })),
        timeline,
        metadata: referral.metadata,
        createdAt: referral.createdAt.toISOString(),
        updatedAt: referral.updatedAt.toISOString(),
      },
    })
  } catch (error) {
    console.error('Error fetching lead:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch lead' }, { status: 500 })
  }
}

/**
 * PATCH /api/consultant/leads/[id]
 * Update a lead's status or information
 *
 * Body:
 * - status?: string (NEW_LEAD, DEMO_SCHEDULED, DEMO_COMPLETED, OFFER_SENT, PAYMENT_PENDING, ENROLLED, LOST)
 * - studentName?: string
 * - phone?: string
 * - email?: string
 * - courseInterest?: string
 * - notes?: string
 * - demoScheduledAt?: string (ISO date)
 * - lostReason?: string (required when status is LOST)
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 })
    }

    const { id } = await params

    // Get consultant profile
    const consultant = await prisma.consultants.findUnique({
      where: { userId: session.user.id },
    })

    if (!consultant) {
      return NextResponse.json(
        { success: false, error: 'Consultant profile not found' },
        { status: 403 }
      )
    }

    // Get the referral
    const referral = await prisma.referrals.findFirst({
      where: {
        id,
        consultantId: consultant.id,
      },
    })

    if (!referral) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 })
    }

    // Check if lead is in a final state
    if (referral.status === 'ENROLLED' || referral.status === 'LOST') {
      return NextResponse.json(
        { success: false, error: 'Cannot update a lead that has been enrolled or lost' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { status, studentName, phone, email, courseInterest, notes, demoScheduledAt, lostReason } =
      body

    // Build update data
    const updateData: Record<string, unknown> = {}

    if (studentName) updateData.studentName = studentName
    if (phone) updateData.phone = phone
    if (email !== undefined) updateData.email = email || null
    if (courseInterest !== undefined) updateData.courseInterest = courseInterest || null
    if (notes !== undefined) updateData.notes = notes || null

    // Handle status transitions
    if (status && status !== referral.status) {
      const validTransitions = getValidTransitions(referral.status)

      if (!validTransitions.includes(status)) {
        return NextResponse.json(
          {
            success: false,
            error: `Cannot transition from ${referral.status} to ${status}. Valid transitions: ${validTransitions.join(', ')}`,
          },
          { status: 400 }
        )
      }

      updateData.status = status

      // Set appropriate timestamp based on new status
      const now = new Date()
      switch (status) {
        case 'DEMO_SCHEDULED':
          updateData.demoScheduledAt = demoScheduledAt ? new Date(demoScheduledAt) : now
          break
        case 'DEMO_COMPLETED':
          updateData.demoCompletedAt = now
          break
        case 'OFFER_SENT':
          updateData.offerSentAt = now
          break
        case 'PAYMENT_PENDING':
          updateData.paymentReceivedAt = now
          break
        case 'ENROLLED':
          updateData.enrolledAt = now
          // Update consultant stats
          await prisma.consultants.update({
            where: { id: consultant.id },
            data: { successfulReferrals: { increment: 1 } },
          })
          break
        case 'LOST':
          if (!lostReason) {
            return NextResponse.json(
              { success: false, error: 'Lost reason is required when marking lead as lost' },
              { status: 400 }
            )
          }
          updateData.lostAt = now
          updateData.lostReason = lostReason
          break
      }
    } else if (demoScheduledAt && referral.status === 'DEMO_SCHEDULED') {
      updateData.demoScheduledAt = new Date(demoScheduledAt)
    }

    // Update the referral
    const updated = await prisma.referrals.update({
      where: { id },
      data: updateData,
      include: {
        referral_link: {
          select: { code: true, name: true },
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        id: updated.id,
        studentName: updated.studentName,
        phone: updated.phone,
        email: updated.email,
        courseInterest: updated.courseInterest,
        status: updated.status,
        statusLabel: getStatusLabel(updated.status),
        notes: updated.notes,
        demoScheduledAt: updated.demoScheduledAt?.toISOString(),
        demoCompletedAt: updated.demoCompletedAt?.toISOString(),
        offerSentAt: updated.offerSentAt?.toISOString(),
        paymentReceivedAt: updated.paymentReceivedAt?.toISOString(),
        enrolledAt: updated.enrolledAt?.toISOString(),
        lostAt: updated.lostAt?.toISOString(),
        lostReason: updated.lostReason,
        updatedAt: updated.updatedAt.toISOString(),
      },
      message: status ? `Lead status updated to ${getStatusLabel(status)}` : 'Lead updated',
    })
  } catch (error) {
    console.error('Error updating lead:', error)
    return NextResponse.json({ success: false, error: 'Failed to update lead' }, { status: 500 })
  }
}

/**
 * DELETE /api/consultant/leads/[id]
 * Delete a lead (only NEW_LEAD status can be deleted)
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 })
    }

    const { id } = await params

    // Get consultant profile
    const consultant = await prisma.consultants.findUnique({
      where: { userId: session.user.id },
    })

    if (!consultant) {
      return NextResponse.json(
        { success: false, error: 'Consultant profile not found' },
        { status: 403 }
      )
    }

    // Get the referral
    const referral = await prisma.referrals.findFirst({
      where: {
        id,
        consultantId: consultant.id,
      },
    })

    if (!referral) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 })
    }

    // Only allow deletion of new leads
    if (referral.status !== 'NEW_LEAD') {
      return NextResponse.json(
        { success: false, error: 'Only new leads can be deleted. Mark as LOST instead.' },
        { status: 400 }
      )
    }

    // Delete the referral
    await prisma.referrals.delete({ where: { id } })

    // Update consultant stats
    await prisma.consultants.update({
      where: { id: consultant.id },
      data: { totalReferrals: { decrement: 1 } },
    })

    return NextResponse.json({
      success: true,
      message: 'Lead deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting lead:', error)
    return NextResponse.json({ success: false, error: 'Failed to delete lead' }, { status: 500 })
  }
}

function getStatusLabel(status: string): string {
  switch (status) {
    case 'NEW_LEAD':
      return 'New Lead'
    case 'DEMO_SCHEDULED':
      return 'Demo Scheduled'
    case 'DEMO_COMPLETED':
      return 'Demo Completed'
    case 'OFFER_SENT':
      return 'Offer Sent'
    case 'PAYMENT_PENDING':
      return 'Payment Pending'
    case 'ENROLLED':
      return 'Enrolled'
    case 'LOST':
      return 'Lost'
    default:
      return status
  }
}

function getValidTransitions(currentStatus: string): string[] {
  switch (currentStatus) {
    case 'NEW_LEAD':
      return ['DEMO_SCHEDULED', 'LOST']
    case 'DEMO_SCHEDULED':
      return ['DEMO_COMPLETED', 'LOST']
    case 'DEMO_COMPLETED':
      return ['OFFER_SENT', 'LOST']
    case 'OFFER_SENT':
      return ['PAYMENT_PENDING', 'LOST']
    case 'PAYMENT_PENDING':
      return ['ENROLLED', 'LOST']
    default:
      return []
  }
}

interface ReferralData {
  createdAt: Date
  demoScheduledAt: Date | null
  demoCompletedAt: Date | null
  offerSentAt: Date | null
  paymentReceivedAt: Date | null
  enrolledAt: Date | null
  lostAt: Date | null
  status: string
}

interface TimelineEvent {
  status: string
  label: string
  timestamp: string
  isCurrent: boolean
}

function buildTimeline(referral: ReferralData): TimelineEvent[] {
  const timeline: TimelineEvent[] = []

  timeline.push({
    status: 'NEW_LEAD',
    label: 'Lead Created',
    timestamp: referral.createdAt.toISOString(),
    isCurrent: referral.status === 'NEW_LEAD',
  })

  if (referral.demoScheduledAt) {
    timeline.push({
      status: 'DEMO_SCHEDULED',
      label: 'Demo Scheduled',
      timestamp: referral.demoScheduledAt.toISOString(),
      isCurrent: referral.status === 'DEMO_SCHEDULED',
    })
  }

  if (referral.demoCompletedAt) {
    timeline.push({
      status: 'DEMO_COMPLETED',
      label: 'Demo Completed',
      timestamp: referral.demoCompletedAt.toISOString(),
      isCurrent: referral.status === 'DEMO_COMPLETED',
    })
  }

  if (referral.offerSentAt) {
    timeline.push({
      status: 'OFFER_SENT',
      label: 'Offer Sent',
      timestamp: referral.offerSentAt.toISOString(),
      isCurrent: referral.status === 'OFFER_SENT',
    })
  }

  if (referral.paymentReceivedAt) {
    timeline.push({
      status: 'PAYMENT_PENDING',
      label: 'Payment Received',
      timestamp: referral.paymentReceivedAt.toISOString(),
      isCurrent: referral.status === 'PAYMENT_PENDING',
    })
  }

  if (referral.enrolledAt) {
    timeline.push({
      status: 'ENROLLED',
      label: 'Enrolled',
      timestamp: referral.enrolledAt.toISOString(),
      isCurrent: referral.status === 'ENROLLED',
    })
  }

  if (referral.lostAt) {
    timeline.push({
      status: 'LOST',
      label: 'Lost',
      timestamp: referral.lostAt.toISOString(),
      isCurrent: referral.status === 'LOST',
    })
  }

  return timeline
}
