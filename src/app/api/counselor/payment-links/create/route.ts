import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { randomUUID } from 'crypto'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { RazorpayService } from '@/lib/payments/razorpayService'
import { CashfreeService } from '@/lib/payments/cashfreeService'

export const dynamic = 'force-dynamic'

const createSchema = z.object({
  leadId: z.string().min(1),
  amount: z.number().positive().max(10_000_000),
  currency: z.enum(['INR', 'USD']).default('INR'),
  description: z.string().min(1).max(200),
  provider: z.enum(['RAZORPAY', 'CASHFREE']).default('RAZORPAY'),
  expiryDays: z.union([z.literal(1), z.literal(3), z.literal(7), z.literal(30)]).default(7),
  notifySms: z.boolean().default(false),
  notifyEmail: z.boolean().default(false),
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://cerebrumbiologyacademy.com'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (session.user.role !== 'COUNSELOR' && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = createSchema.parse(await request.json())

    // Tenant isolation: counselor can only create links for leads assigned to them.
    const isAdmin = session.user.role === 'ADMIN'
    const lead = await prisma.leads.findFirst({
      where: { id: body.leadId, ...(isAdmin ? {} : { assignedToId: session.user.id }) },
      select: {
        id: true,
        studentName: true,
        email: true,
        phone: true,
        courseInterest: true,
      },
    })
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    // Cashfree links only support INR. Route USD requests to Razorpay.
    if (body.currency === 'USD' && body.provider === 'CASHFREE') {
      return NextResponse.json(
        { error: 'Cashfree payment links do not support USD. Use RAZORPAY for USD.' },
        { status: 400 }
      )
    }

    const paymentLinkId = randomUUID()
    const expiresAt = new Date(Date.now() + body.expiryDays * 86400 * 1000)
    const callbackUrl = `${SITE_URL}/payment-status?link_id=${paymentLinkId}`

    let providerLinkId: string
    let shortUrl: string

    if (body.provider === 'RAZORPAY') {
      const link = await RazorpayService.createPaymentLink({
        amount: body.amount,
        currency: body.currency,
        description: body.description,
        referenceId: paymentLinkId,
        customer: {
          name: lead.studentName,
          email: lead.email ?? undefined,
          contact: lead.phone,
        },
        expireBySeconds: body.expiryDays * 86400,
        notify: { sms: body.notifySms, email: body.notifyEmail },
        callbackUrl,
        notes: { leadId: lead.id, counselorId: session.user.id },
      })
      providerLinkId = link.id
      shortUrl = link.short_url
    } else {
      const link = await CashfreeService.createPaymentLink({
        linkId: paymentLinkId,
        amount: body.amount,
        currency: body.currency,
        purpose: body.description,
        customer: {
          name: lead.studentName,
          email: lead.email ?? undefined,
          phone: lead.phone,
        },
        expireAt: expiresAt,
        notify: { sms: body.notifySms, email: body.notifyEmail },
        returnUrl: callbackUrl,
        notes: { leadId: lead.id, counselorId: session.user.id },
      })
      providerLinkId = link.link_id
      shortUrl = link.link_url
    }

    const record = await prisma.payment_links.create({
      data: {
        id: paymentLinkId,
        leadId: lead.id,
        createdById: session.user.id,
        amount: body.amount,
        currency: body.currency,
        description: body.description,
        provider: body.provider,
        providerLinkId,
        shortUrl,
        expiresAt,
        status: 'ACTIVE',
        metadata: {
          counselorName: session.user.name,
          courseInterest: lead.courseInterest,
        },
      },
      select: {
        id: true,
        amount: true,
        currency: true,
        status: true,
        shortUrl: true,
        expiresAt: true,
        provider: true,
        createdAt: true,
      },
    })

    return NextResponse.json({ data: record })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.flatten() },
        { status: 400 }
      )
    }
    console.error('Payment link create error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create payment link' },
      { status: 500 }
    )
  }
}
