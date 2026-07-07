import { NextResponse } from 'next/server'
import { requireAdminAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

/**
 * GET /api/admin/nav-counts — real sidebar badge counts (replaces the
 * hardcoded badge:3/2/8 literals). Cheap indexed counts only; polled ~60s.
 */
export async function GET() {
  try {
    await requireAdminAuth()

    const [newLeads, pendingDemoBookings, unreadInquiries, pendingPayments] = await Promise.all([
      prisma.leads.count({ where: { stage: 'NEW_LEAD' } }),
      prisma.demo_bookings.count({ where: { status: 'PENDING' } }),
      prisma.contact_inquiries.count({ where: { status: 'NEW' } }),
      prisma.payments.count({ where: { status: 'PENDING' } }),
    ])

    return NextResponse.json({
      success: true,
      data: { newLeads, pendingDemoBookings, unreadInquiries, pendingPayments },
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[admin/nav-counts] GET failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to load counts' }, { status: 500 })
  }
}
