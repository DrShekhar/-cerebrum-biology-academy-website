import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth/config'
import { nanoid } from 'nanoid'

export const dynamic = 'force-dynamic'

/**
 * GET /api/consultant/links
 * Fetch all referral links for the authenticated consultant
 *
 * Query params:
 * - status: Filter by status (all, active, inactive)
 * - sortBy: Sort field (createdAt, clickCount, conversionCount, name)
 * - sortOrder: asc or desc
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
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    // Build where clause
    const where: Record<string, unknown> = { consultantId: consultant.id }

    // Status filter
    if (status === 'active') {
      where.isActive = true
    } else if (status === 'inactive') {
      where.isActive = false
    }

    // Get referral links with sorting
    const links = await prisma.referral_links.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      include: {
        _count: {
          select: { referrals: true },
        },
      },
    })

    // Calculate overall stats
    const totalClicks = links.reduce((sum, l) => sum + l.clickCount, 0)
    const totalConversions = links.reduce((sum, l) => sum + l.conversionCount, 0)
    const overallConversionRate = totalClicks > 0 ? Math.round((totalConversions / totalClicks) * 100) : 0

    // Transform data
    const linkList = links.map((l) => ({
      id: l.id,
      code: l.code,
      name: l.name,
      description: l.description,
      fullUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://cerebrumbiologyacademy.com'}/ref/${l.code}`,
      isActive: l.isActive,
      clickCount: l.clickCount,
      conversionCount: l.conversionCount,
      conversionRate: l.clickCount > 0 ? Math.round((l.conversionCount / l.clickCount) * 100) : 0,
      referralCount: l._count.referrals,
      targetCourse: l.targetCourse,
      targetCampaign: l.targetCampaign,
      expiresAt: l.expiresAt?.toISOString(),
      createdAt: l.createdAt.toISOString(),
      updatedAt: l.updatedAt.toISOString(),
    }))

    // Get status counts
    const activeCount = links.filter((l) => l.isActive).length
    const inactiveCount = links.filter((l) => !l.isActive).length

    return NextResponse.json({
      success: true,
      data: {
        links: linkList,
        summary: {
          total: links.length,
          active: activeCount,
          inactive: inactiveCount,
          totalClicks,
          totalConversions,
          overallConversionRate,
        },
      },
    })
  } catch (error) {
    console.error('Error fetching referral links:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch referral links' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/consultant/links
 * Create a new referral link
 *
 * Body:
 * - name: string (required) - Display name for the link
 * - description?: string - Optional description
 * - targetCourse?: string - Specific course this link is for
 * - targetCampaign?: string - Campaign identifier
 * - expiresAt?: string - ISO date when link expires
 * - customCode?: string - Custom code (if allowed and available)
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
    const { name, description, targetCourse, targetCampaign, expiresAt, customCode } = body

    // Validate required fields
    if (!name || name.trim().length === 0) {
      return NextResponse.json({ success: false, error: 'Link name is required' }, { status: 400 })
    }

    // Generate or validate code
    let code = customCode?.trim().toLowerCase().replace(/[^a-z0-9-]/g, '') || ''

    if (code) {
      // Validate custom code length
      if (code.length < 4 || code.length > 20) {
        return NextResponse.json(
          { success: false, error: 'Custom code must be 4-20 characters' },
          { status: 400 }
        )
      }

      // Check if custom code is available
      const existingCode = await prisma.referral_links.findUnique({
        where: { code },
      })

      if (existingCode) {
        return NextResponse.json(
          { success: false, error: 'This code is already in use. Please choose another.' },
          { status: 400 }
        )
      }
    } else {
      // Generate unique code using consultant code prefix + random suffix
      const prefix = consultant.consultantCode.toLowerCase().slice(0, 4)
      code = `${prefix}-${nanoid(6).toLowerCase()}`

      // Ensure uniqueness (very unlikely to collide but just in case)
      let attempts = 0
      while (attempts < 5) {
        const existing = await prisma.referral_links.findUnique({ where: { code } })
        if (!existing) break
        code = `${prefix}-${nanoid(6).toLowerCase()}`
        attempts++
      }
    }

    // Create the referral link
    const link = await prisma.referral_links.create({
      data: {
        consultantId: consultant.id,
        code,
        name: name.trim(),
        description: description?.trim() || null,
        targetCourse: targetCourse?.trim() || null,
        targetCampaign: targetCampaign?.trim() || null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        isActive: true,
        clickCount: 0,
        conversionCount: 0,
      },
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
        targetCourse: link.targetCourse,
        targetCampaign: link.targetCampaign,
        expiresAt: link.expiresAt?.toISOString(),
        createdAt: link.createdAt.toISOString(),
      },
      message: 'Referral link created successfully',
    })
  } catch (error) {
    console.error('Error creating referral link:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create referral link' },
      { status: 500 }
    )
  }
}
