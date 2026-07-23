import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { getSettings } from '@/lib/settings/siteSettings'
import type { Prisma } from '@/generated/prisma'

export const dynamic = 'force-dynamic'

/**
 * POST /api/counselor/leads/[id]/color — set/clear a lead's color tag
 * (visual triage). Stored in leads.metadata.colorTag; the tag's meaning
 * comes from the team-wide legend (site_settings 'leadBoard').
 */
export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    if (!['COUNSELOR', 'ADMIN'].includes((session.user.role || '').toUpperCase())) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const colorTag: string | null = body.colorTag || null

    if (colorTag) {
      const config = await getSettings('leadBoard')
      if (!config.colorTags.some((t) => t.id === colorTag)) {
        return NextResponse.json({ success: false, error: 'Unknown color tag' }, { status: 400 })
      }
    }

    // Tenant isolation: counselor tags only their own leads.
    const isAdmin = (session.user.role || '').toUpperCase() === 'ADMIN'
    const lead = await prisma.leads.findFirst({
      where: { id: params.id, ...(isAdmin ? {} : { assignedToId: session.user.id }) },
      select: { id: true, metadata: true },
    })
    if (!lead) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 })
    }

    const metadata = (lead.metadata as Record<string, unknown> | null) || {}
    if (colorTag) {
      metadata.colorTag = colorTag
    } else {
      delete metadata.colorTag
    }

    await prisma.leads.update({
      where: { id: lead.id },
      data: { metadata: metadata as Prisma.InputJsonValue, updatedAt: new Date() },
    })

    return NextResponse.json({ success: true, data: { colorTag } })
  } catch (error) {
    console.error('Error setting lead color:', error)
    return NextResponse.json({ success: false, error: 'Failed to set color' }, { status: 500 })
  }
}
