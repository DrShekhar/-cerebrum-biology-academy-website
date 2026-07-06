import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { addSecurityHeaders } from '@/lib/auth/config'
import { upsertLead } from '@/lib/leads/upsertLead'
import { notifyAdminFormSubmission } from '@/lib/notifications/adminLeadNotification'

// Fee/installment/scholarship enquiries from the student portal. These were
// previously posted to /api/feedback, whose payload contract didn't even match
// (it 400'd) and whose storage was an in-memory demo array — every money
// question a student asked was silently lost. This route persists to
// contact_inquiries (surfaces in /admin/inquiries), captures a HOT CRM
// touchpoint, and alerts the owner.

const feeEnquirySchema = z.object({
  category: z.string().min(1).max(100),
  subject: z.string().min(1).max(200),
  message: z.string().min(1).max(5000),
  metadata: z
    .object({
      totalPending: z.number().optional(),
      totalOverdue: z.number().optional(),
    })
    .optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return addSecurityHeaders(
        NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 })
      )
    }

    const parsed = feeEnquirySchema.safeParse(await request.json())
    if (!parsed.success) {
      return addSecurityHeaders(
        NextResponse.json(
          { success: false, error: 'Please fill in all fields' },
          { status: 400 }
        )
      )
    }
    const { category, subject, message, metadata } = parsed.data

    const user = await prisma.users.findUnique({
      where: { id: session.user.id },
      select: { id: true, name: true, email: true, phone: true },
    })
    if (!user) {
      return addSecurityHeaders(
        NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
      )
    }

    const fullMessage = [
      `[${category}] ${subject}`,
      '',
      message,
      '',
      `— Pending: ₹${metadata?.totalPending ?? 0} | Overdue: ₹${metadata?.totalOverdue ?? 0}`,
    ].join('\n')

    const inquiry = await prisma.contact_inquiries.create({
      data: {
        id: `inq_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        updatedAt: new Date(),
        name: user.name || 'Student',
        email: user.email || '',
        phone: user.phone || '',
        supportType: 'FEE_ENQUIRY',
        message: fullMessage,
        source: 'student-portal-fees',
        status: 'NEW',
        // Money questions from an enrolled student are follow-up gold.
        priority: 'HIGH',
        department: 'Fees & Payments',
      },
      select: { id: true },
    })

    // CRM touchpoint (phone-keyed; fire-and-forget, never blocks the response)
    if (user.phone) {
      upsertLead({
        name: user.name,
        phone: user.phone,
        email: user.email,
        source: 'student-fee-enquiry',
        priority: 'HOT',
        message: `Fee enquiry [${category}]: ${subject}`,
      }).catch(() => {})
    }

    notifyAdminFormSubmission('Student Fee Enquiry', {
      Student: user.name || user.email || user.id,
      Phone: user.phone || '-',
      Category: category,
      Subject: subject,
      Message: message.slice(0, 300),
    }).catch(() => {})

    return addSecurityHeaders(NextResponse.json({ success: true, inquiryId: inquiry.id }))
  } catch (error) {
    console.error('[fee-enquiry] failed:', error)
    return addSecurityHeaders(
      NextResponse.json({ success: false, error: 'Failed to submit enquiry' }, { status: 500 })
    )
  }
}
