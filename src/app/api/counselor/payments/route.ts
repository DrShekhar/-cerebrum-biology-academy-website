import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withCounselor } from '@/lib/auth/middleware'
import type { UserSession } from '@/lib/auth/config'

async function handleGET(request: NextRequest, session: UserSession) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const leadId = searchParams.get('leadId')

    const whereClause: any = {}

    if (status && status !== 'ALL') {
      whereClause.status = status
    }

    // Ownership scoping: a COUNSELOR only sees installments for leads assigned
    // to them; ADMIN sees all. Without this, any counselor could read every
    // lead's payment PII (name/phone/email/amounts) across the whole org.
    const isAdmin = (session.role || '').toUpperCase() === 'ADMIN'
    const leadWhere: any = isAdmin ? {} : { assignedToId: session.userId }
    if (leadId) leadWhere.id = leadId
    if (Object.keys(leadWhere).length > 0) {
      whereClause.fee_plans = { leads: leadWhere }
    }

    const installments = await prisma.installments.findMany({
      where: whereClause,
      include: {
        fee_plans: {
          include: {
            leads: true,
          },
        },
      },
      orderBy: [{ status: 'asc' }, { dueDate: 'asc' }],
    })

    const formattedInstallments = installments.map((inst) => ({
      id: inst.id,
      installmentNumber: inst.installmentNumber,
      dueDate: inst.dueDate.toISOString(),
      amount: inst.amount,
      status: inst.status,
      remindersSent: inst.remindersSent as Record<string, string> | undefined,
      feePlan: {
        id: inst.fee_plans.id,
        courseName: inst.fee_plans.courseName,
        lead: {
          id: inst.fee_plans.leads.id,
          studentName: inst.fee_plans.leads.studentName,
          phone: inst.fee_plans.leads.phone,
          email: inst.fee_plans.leads.email,
        },
      },
    }))

    return NextResponse.json(formattedInstallments)
  } catch (error) {
    console.error('Error fetching payments:', error)
    return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 })
  }
}

export const GET = withCounselor(handleGET)
