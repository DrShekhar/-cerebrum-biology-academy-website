import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET /api/counselor/payment-links?leadId=... — list links for a lead
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (!['COUNSELOR', 'ADMIN'].includes((session.user.role || '').toUpperCase())) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const leadId = request.nextUrl.searchParams.get('leadId')
    if (!leadId) {
      return NextResponse.json({ error: 'leadId is required' }, { status: 400 })
    }

    const isAdmin = (session.user.role || '').toUpperCase() === 'ADMIN'
    const lead = await prisma.leads.findFirst({
      where: { id: leadId, ...(isAdmin ? {} : { assignedToId: session.user.id }) },
      select: { id: true },
    })
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    const links = await prisma.payment_links.findMany({
      where: { leadId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        amount: true,
        currency: true,
        description: true,
        provider: true,
        shortUrl: true,
        status: true,
        expiresAt: true,
        paidAt: true,
        paidAmount: true,
        remindersSent: true,
        createdAt: true,
      },
    })

    return NextResponse.json({ data: links })
  } catch (error) {
    console.error('Payment links list error:', error)
    return NextResponse.json({ error: 'Failed to list payment links' }, { status: 500 })
  }
}
