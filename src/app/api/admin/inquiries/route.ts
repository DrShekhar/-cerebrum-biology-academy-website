import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth'

/**
 * GET /api/admin/inquiries
 *
 * Unified read view over the two lead tables that previously had no admin
 * surface at all: contact_inquiries (/api/contact/inquiry — ARIA, chatbot,
 * contact form, olympiad form) and content_leads (/api/enquiry — city pages,
 * book-free-demo, lead magnets). Leads were persisting but nobody could see
 * them without a DB client.
 */
export async function GET(request: NextRequest) {
  try {
    await requireAdminAuth()

    const { searchParams } = new URL(request.url)
    const days = Math.min(parseInt(searchParams.get('days') || '30', 10) || 30, 365)
    const limit = Math.min(parseInt(searchParams.get('limit') || '200', 10) || 200, 500)
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

    const [inquiries, enquiries] = await Promise.all([
      prisma.contact_inquiries.findMany({
        where: { createdAt: { gte: since } },
        orderBy: { createdAt: 'desc' },
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          supportType: true,
          message: true,
          source: true,
          status: true,
          priority: true,
          createdAt: true,
        },
      }),
      prisma.content_leads.findMany({
        where: { createdAt: { gte: since } },
        orderBy: { createdAt: 'desc' },
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          whatsappNumber: true,
          source: true,
          grade: true,
          interestedIn: true,
          landingPage: true,
          country: true,
          createdAt: true,
        },
      }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        contactInquiries: inquiries,
        contentLeads: enquiries,
        counts: { contactInquiries: inquiries.length, contentLeads: enquiries.length },
        since: since.toISOString(),
      },
    })
  } catch (error) {
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Get inquiries error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch inquiries' },
      { status: 500 }
    )
  }
}
