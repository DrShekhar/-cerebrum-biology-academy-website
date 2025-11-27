import { ComingSoonPage } from '@/components/ui/ComingSoonPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers - Coming Soon | Cerebrum Biology Academy',
  description:
    'Join our team of expert educators. View career opportunities at Cerebrum Biology Academy.',
}

export default function CareersPage() {
  return (
    <ComingSoonPage
      title="Career Opportunities"
      description="We are always looking for passionate educators to join our team. Our careers page with open positions will be available soon. For immediate inquiries, please contact us."
    />
  )
}
