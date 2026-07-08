import { prisma } from '@/lib/prisma'

/**
 * Lead ownership gate for the counselor namespace. A COUNSELOR may only act on
 * leads assigned to them; ADMIN may act on any. Used to close the BOLA/IDOR
 * gap on counselor routes that took a leadId from the request without checking
 * assignment (payments, fee-plans, offers, score, manual sends).
 *
 * Returns true if allowed. Never throws.
 */
export async function counselorCanAccessLead(
  leadId: string | null | undefined,
  userId: string | null | undefined,
  role: string | null | undefined
): Promise<boolean> {
  if ((role || '').toUpperCase() === 'ADMIN') return true
  if (!leadId || !userId) return false
  try {
    const lead = await prisma.leads.findFirst({
      where: { id: leadId, assignedToId: userId },
      select: { id: true },
    })
    return !!lead
  } catch {
    return false
  }
}

/**
 * Same gate, resolved from an installment. Walks installment → fee_plan → lead
 * and checks the lead is assigned to the counselor (ADMIN bypasses). Closes the
 * IDOR on the FeePlanService-backed payment routes that take an installmentId
 * from the request. Never throws.
 */
export async function counselorCanAccessInstallment(
  installmentId: string | null | undefined,
  userId: string | null | undefined,
  role: string | null | undefined
): Promise<boolean> {
  if ((role || '').toUpperCase() === 'ADMIN') return true
  if (!installmentId || !userId) return false
  try {
    const installment = await prisma.installments.findFirst({
      where: { id: installmentId, fee_plans: { is: { leads: { is: { assignedToId: userId } } } } },
      select: { id: true },
    })
    return !!installment
  } catch {
    return false
  }
}
