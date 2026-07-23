// Force dynamic rendering to prevent auth issues during static build
export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import ConsultantLayoutClient from './ConsultantLayoutClient'

/**
 * Server-side gate for the consultant panel. Access = a `consultants` profile
 * row (the same rule the /api/consultant routes enforce) or ADMIN. This used
 * to be a client-only check that admitted ONLY admins — so real consultants
 * were bounced by the UI while the APIs would have served them, and the pages
 * were reachable with no server-side auth at all.
 */
export default async function ConsultantLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user?.id) {
    redirect('/sign-in?redirect_url=/consultant/dashboard')
  }

  const role = (session.user.role || '').toUpperCase()
  if (role !== 'ADMIN') {
    const consultant = await prisma.consultants.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    })
    if (!consultant) {
      redirect('/dashboard?error=consultant_required')
    }
  }

  return <ConsultantLayoutClient>{children}</ConsultantLayoutClient>
}
