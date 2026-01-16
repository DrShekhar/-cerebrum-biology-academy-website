import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth/config'

export const dynamic = 'force-dynamic'

/**
 * GET /api/consultant/leads
 * Fetch all leads/referrals for the authenticated consultant
 *
 * Query params:
 * - status: Filter by status (all, new_lead, demo_scheduled, etc.)
 * - search: Search by name, phone, or email
 * - sortBy: Sort field (createdAt, updatedAt, studentName)
 * - sortOrder: asc or desc
 * - limit: Number of results (default 20)
 * - offset: Pagination offset (default 0)
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 })
    }

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

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'all'
    const search = searchParams.get('search') || ''
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100)
    const offset = parseInt(searchParams.get('offset') || '0')

    // Build where clause
    const where: Record<string, unknown> = { consultantId: consultant.id }

    // Status filter
    if (status !== 'all') {
      where.status = status.toUpperCase()
    }

    // Search filter
    if (search) {
      where.OR = [
        { studentName: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
        { email: { contains: search, mode: 'insensitive' } },
      ]
    }

    // Get total count
    const total = await prisma.referrals.count({ where })

    // Get referrals with sorting
    const referrals = await prisma.referrals.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      skip: offset,
      take: limit,
      include: {
        referral_link: {
          select: { code: true, name: true },
        },
        commissions: {
          select: { id: true, amount: true, status: true },
        },
      },
    })

    // Transform data
    const leads = referrals.map((r) => ({
      id: r.id,
      studentName: r.studentName,
      phone: r.phone,
      email: r.email,
      courseInterest: r.courseInterest,
      status: r.status,
      statusLabel: getStatusLabel(r.status),
      source: r.source,
      notes: r.notes,
      referralLink: r.referral_link,
      demoScheduledAt: r.demoScheduledAt?.toISOString(),
      demoCompletedAt: r.demoCompletedAt?.toISOString(),
      offerSentAt: r.offerSentAt?.toISOString(),
      paymentReceivedAt: r.paymentReceivedAt?.toISOString(),
      enrolledAt: r.enrolledAt?.toISOString(),
      lostAt: r.lostAt?.toISOString(),
      lostReason: r.lostReason,
      totalFeeAmount: r.totalFeeAmount ? Number(r.totalFeeAmount) : null,
      commissionEarned: r.commissionEarned ? Number(r.commissionEarned) : null,
      commissions: r.commissions.map((c) => ({
        id: c.id,
        amount: Number(c.amount),
        status: c.status,
      })),
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
    }))

    // Get status counts for filters
    const statusCounts = await prisma.referrals.groupBy({
      by: ['status'],
      where: { consultantId: consultant.id },
      _count: { id: true },
    })

    const counts: Record<string, number> = { all: total }
    statusCounts.forEach((stat) => {
      counts[stat.status.toLowerCase()] = stat._count.id
    })

    return NextResponse.json({
      success: true,
      data: {
        leads,
        statusCounts: counts,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + leads.length < total,
        },
      },
    })
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch leads' }, { status: 500 })
  }
}

/**
 * POST /api/consultant/leads
 * Create a new lead/referral
 *
 * Body:
 * - studentName: string (required)
 * - phone: string (required)
 * - email?: string
 * - courseInterest?: string
 * - source?: string
 * - notes?: string
 * - referralLinkId?: string
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 })
    }

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

    if (!consultant.isActive) {
      return NextResponse.json(
        { success: false, error: 'Your consultant account is not active' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { studentName, phone, email, courseInterest, source, notes, referralLinkId } = body

    // Validate required fields
    if (!studentName || !phone) {
      return NextResponse.json(
        { success: false, error: 'Student name and phone are required' },
        { status: 400 }
      )
    }

    // Check for duplicate phone number (within this consultant's leads)
    const existingLead = await prisma.referrals.findFirst({
      where: {
        consultantId: consultant.id,
        phone: phone,
        status: { notIn: ['ENROLLED', 'LOST'] },
      },
    })

    if (existingLead) {
      return NextResponse.json(
        {
          success: false,
          error: 'A lead with this phone number already exists in your pipeline',
        },
        { status: 400 }
      )
    }

    // Validate referral link if provided
    if (referralLinkId) {
      const link = await prisma.referral_links.findFirst({
        where: {
          id: referralLinkId,
          consultantId: consultant.id,
          isActive: true,
        },
      })

      if (!link) {
        return NextResponse.json(
          { success: false, error: 'Invalid or inactive referral link' },
          { status: 400 }
        )
      }
    }

    // Create the referral
    const referral = await prisma.referrals.create({
      data: {
        consultantId: consultant.id,
        studentName,
        phone,
        email: email || null,
        courseInterest: courseInterest || null,
        source: source || 'Direct',
        notes: notes || null,
        referralLinkId: referralLinkId || null,
        status: 'NEW_LEAD',
      },
      include: {
        referral_link: {
          select: { code: true, name: true },
        },
      },
    })

    // Update consultant stats
    await prisma.consultants.update({
      where: { id: consultant.id },
      data: {
        totalReferrals: { increment: 1 },
      },
    })

    // Update referral link stats if used
    if (referralLinkId) {
      await prisma.referral_links.update({
        where: { id: referralLinkId },
        data: {
          conversionCount: { increment: 1 },
        },
      })
    }

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
        referralLink: referral.referral_link,
        createdAt: referral.createdAt.toISOString(),
      },
      message: 'Lead created successfully',
    })
  } catch (error) {
    console.error('Error creating lead:', error)
    return NextResponse.json({ success: false, error: 'Failed to create lead' }, { status: 500 })
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
