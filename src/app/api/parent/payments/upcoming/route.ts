import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

/**
 * GET /api/parent/payments/upcoming — upcoming + overdue installments across
 * ALL of a parent's children, for the parent-dashboard reminder card. Mirrors
 * the student endpoint's shape; child→lead bridge is by email (same as the
 * student route), scoped to the parent's linked children.
 */
export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    const parent = await prisma.users.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    })
    if (!parent || parent.role !== 'PARENT') {
      return NextResponse.json({ success: false, error: 'Parent access required' }, { status: 403 })
    }

    const rels = await prisma.parent_child_relationships.findMany({
      where: { parentId: session.user.id },
      select: {
        users_parent_child_relationships_childIdTousers: {
          select: { email: true, name: true },
        },
      },
    })
    const children = rels
      .map((r) => r.users_parent_child_relationships_childIdTousers)
      .filter((c): c is { email: string; name: string } => !!c?.email)
    if (children.length === 0) {
      return NextResponse.json({ success: true, data: { upcoming: [], overdue: [], nextPayment: null } })
    }
    const emails = children.map((c) => c.email)
    const nameByEmail = new Map(children.map((c) => [c.email, c.name]))

    const now = new Date()
    const rows = await prisma.installments.findMany({
      where: {
        fee_plans: { leads: { email: { in: emails } } },
        status: { in: ['PENDING', 'OVERDUE'] },
      },
      include: {
        fee_plans: {
          select: { id: true, courseName: true, leads: { select: { email: true } } },
        },
      },
      orderBy: { dueDate: 'asc' },
      take: 50,
    })

    const shape = (i: (typeof rows)[number]) => ({
      id: i.id,
      installmentNumber: i.installmentNumber,
      amount: Number(i.amount),
      dueDate: i.dueDate,
      status: i.status,
      paymentLink: i.paymentLink,
      childName: nameByEmail.get(i.fee_plans?.leads?.email || '') || 'Student',
      feePlan: i.fee_plans ? { courseName: i.fee_plans.courseName } : undefined,
    })
    const overdue = rows.filter((i) => i.status === 'OVERDUE' || i.dueDate < now).map(shape)
    const upcoming = rows.filter((i) => i.status !== 'OVERDUE' && i.dueDate >= now).map(shape)
    const nextPayment = [...overdue, ...upcoming][0] || null

    return NextResponse.json({ success: true, data: { upcoming, overdue, nextPayment } })
  } catch (error) {
    console.error('[parent/payments/upcoming] failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to load payments' }, { status: 500 })
  }
}
