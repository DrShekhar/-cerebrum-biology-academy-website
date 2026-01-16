// Force dynamic rendering to prevent auth issues during static build
export const dynamic = 'force-dynamic'

import ConsultantLayoutClient from './ConsultantLayoutClient'

export default function ConsultantLayout({ children }: { children: React.ReactNode }) {
  return <ConsultantLayoutClient>{children}</ConsultantLayoutClient>
}
