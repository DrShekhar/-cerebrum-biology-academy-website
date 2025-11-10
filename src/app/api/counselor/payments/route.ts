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
      whereClause.feePlan = {
        leadId,
      }
    }

    const installments = await prisma.installment.findMany({
      where: whereClause,
      include: {
        feePlan: {
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
        id: inst.feePlan.id,
        courseName: inst.feePlan.courseName,
        lead: {
          id: inst.feePlan.lead.id,
          studentName: inst.feePlan.lead.studentName,
          phone: inst.feePlan.lead.phone,
          email: inst.feePlan.lead.email,
        },
      },
    }))

    return NextResponse.json(formattedInstallments)
  } catch (error) {
    console.error('Error fetching payments:', error)
    return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 })
  }
}
