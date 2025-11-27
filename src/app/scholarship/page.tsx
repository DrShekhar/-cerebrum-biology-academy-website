import { ComingSoonPage } from '@/components/ui/ComingSoonPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Scholarship Programs - Coming Soon | Cerebrum Biology Academy',
  description: 'Learn about our scholarship programs for deserving NEET aspirants. Coming soon.',
}

export default function ScholarshipPage() {
  return (
    <ComingSoonPage
      title="Scholarship Programs"
      description="We are finalizing our scholarship programs to support deserving NEET aspirants. Check back soon for details on eligibility, application process, and benefits."
    />
  )
}
