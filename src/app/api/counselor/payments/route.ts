import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const leadId = searchParams.get('leadId')

    const whereClause: any = {}

    if (status && status !== 'ALL') {
      whereClause.status = status
    }

    if (leadId) {
      whereClause.fee_plans = {
        leadId,
      }
    }

    const installments = await prisma.installments.findMany({
      where: whereClause,
      include: {
        fee_plans: {
          include: {
            lead: {
              select: {
                id: true,
                studentName: true,
                phone: true,
                email: true,
              },
            },
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
          id: inst.fee_plans.lead.id,
          studentName: inst.fee_plans.lead.studentName,
          phone: inst.fee_plans.lead.phone,
          email: inst.fee_plans.lead.email,
        },
      },
    }))

    return NextResponse.json(formattedInstallments)
  } catch (error) {
    console.error('Error fetching payments:', error)
    return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 })
  }
}
