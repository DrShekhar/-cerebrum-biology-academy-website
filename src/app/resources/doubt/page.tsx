import { ComingSoonPage } from '@/components/ui/ComingSoonPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Doubt Resolution - Coming Soon | Cerebrum Biology Academy',
  description:
    'Get your biology doubts resolved by expert faculty. Our doubt resolution platform is coming soon.',
}

export default function DoubtResourcePage() {
  return (
    <ComingSoonPage
      title="Doubt Resolution"
      description="Our interactive doubt resolution platform will connect you directly with expert faculty for personalized help. This feature is currently under development."
    />
  )
}
