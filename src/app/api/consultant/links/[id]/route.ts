import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth/config'

export const dynamic = 'force-dynamic'

interface RouteParams {
  params: Promise<{ id: string }>
}

/**
 * GET /api/consultant/links/[id]
 * Get detailed information about a specific referral link
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

    // Get the referral link (only if it belongs to this consultant)
    const link = await prisma.referral_links.findFirst({
      where: {
        id,
        consultantId: consultant.id,
      },
      include: {
        referrals: {
          orderBy: { createdAt: 'desc' },
          take: 10,
          select: {
            id: true,
            studentName: true,
            phone: true,
            status: true,
            createdAt: true,
            enrolledAt: true,
          },
        },
        _count: {
          select: { referrals: true },
        },
      },
    })

    if (!link) {
      return NextResponse.json({ success: false, error: 'Referral link not found' }, { status: 404 })
    }

    // Get referral status breakdown
    const statusBreakdown = await prisma.referrals.groupBy({
      by: ['status'],
      where: { referralLinkId: id },
      _count: { id: true },
    })

    const breakdown: Record<string, number> = {}
    statusBreakdown.forEach((stat) => {
      breakdown[stat.status.toLowerCase()] = stat._count.id
    })

    const fullUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://cerebrumbiologyacademy.com'}/ref/${link.code}`

    return NextResponse.json({
      success: true,
      data: {
        id: link.id,
        code: link.code,
        name: link.name,
        description: link.description,
        fullUrl,
        isActive: link.isActive,
        clickCount: link.clickCount,
        conversionCount: link.conversionCount,
        conversionRate: link.clickCount > 0 ? Math.round((link.conversionCount / link.clickCount) * 100) : 0,
        referralCount: link._count.referrals,
        targetCourse: link.targetCourse,
        targetCampaign: link.targetCampaign,
        expiresAt: link.expiresAt?.toISOString(),
        isExpired: link.expiresAt ? new Date() > link.expiresAt : false,
        recentReferrals: link.referrals.map((r) => ({
          id: r.id,
          studentName: r.studentName,
          phone: r.phone,
          status: r.status,
          createdAt: r.createdAt.toISOString(),
          enrolledAt: r.enrolledAt?.toISOString(),
        })),
        statusBreakdown: breakdown,
        createdAt: link.createdAt.toISOString(),
        updatedAt: link.updatedAt.toISOString(),
      },
    })
  } catch (error) {
    console.error('Error fetching referral link:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch referral link' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/consultant/links/[id]
 * Update a referral link
 *
 * Body:
 * - name?: string
 * - description?: string
 * - targetCourse?: string
 * - targetCampaign?: string
 * - expiresAt?: string (ISO date) or null to remove expiry
 * - isActive?: boolean
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

    // Get the referral link
    const link = await prisma.referral_links.findFirst({
      where: {
        id,
        consultantId: consultant.id,
      },
    })

    if (!link) {
      return NextResponse.json({ success: false, error: 'Referral link not found' }, { status: 404 })
    }

    const body = await request.json()
    const { name, description, targetCourse, targetCampaign, expiresAt, isActive } = body

    // Build update data
    const updateData: Record<string, unknown> = {}

    if (name !== undefined) {
      if (!name || name.trim().length === 0) {
        return NextResponse.json({ success: false, error: 'Link name cannot be empty' }, { status: 400 })
      }
      updateData.name = name.trim()
    }

    if (description !== undefined) {
      updateData.description = description?.trim() || null
    }

    if (targetCourse !== undefined) {
      updateData.targetCourse = targetCourse?.trim() || null
    }

    if (targetCampaign !== undefined) {
      updateData.targetCampaign = targetCampaign?.trim() || null
    }

    if (expiresAt !== undefined) {
      updateData.expiresAt = expiresAt ? new Date(expiresAt) : null
    }

    if (isActive !== undefined) {
      updateData.isActive = Boolean(isActive)
    }

    // Update the link
    const updated = await prisma.referral_links.update({
      where: { id },
      data: updateData,
    })

    const fullUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://cerebrumbiologyacademy.com'}/ref/${updated.code}`

    return NextResponse.json({
      success: true,
      data: {
        id: updated.id,
        code: updated.code,
        name: updated.name,
        description: updated.description,
        fullUrl,
        isActive: updated.isActive,
        targetCourse: updated.targetCourse,
        targetCampaign: updated.targetCampaign,
        expiresAt: updated.expiresAt?.toISOString(),
        updatedAt: updated.updatedAt.toISOString(),
      },
      message: 'Referral link updated successfully',
    })
  } catch (error) {
    console.error('Error updating referral link:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update referral link' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/consultant/links/[id]
 * Delete a referral link (only if no referrals are associated)
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

    // Get the referral link
    const link = await prisma.referral_links.findFirst({
      where: {
        id,
        consultantId: consultant.id,
      },
      include: {
        _count: {
          select: { referrals: true },
        },
      },
    })

    if (!link) {
      return NextResponse.json({ success: false, error: 'Referral link not found' }, { status: 404 })
    }

    // Check if there are associated referrals
    if (link._count.referrals > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Cannot delete link with ${link._count.referrals} associated referral(s). Deactivate it instead.`,
        },
        { status: 400 }
      )
    }

    // Delete the link
    await prisma.referral_links.delete({ where: { id } })

    return NextResponse.json({
      success: true,
      message: 'Referral link deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting referral link:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete referral link' },
      { status: 500 }
    )
  }
}
