import { ComingSoonPage } from '@/components/ui/ComingSoonPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mock Tests - Coming Soon | Cerebrum Biology Academy',
  description:
    'Practice with our NEET Biology mock tests. Full-length tests with detailed solutions coming soon.',
}

export default function MockTestsResourcePage() {
  return (
    <ComingSoonPage
      title="Mock Tests"
      description="Full-length NEET Biology mock tests with detailed solutions and performance analytics. Our comprehensive test series is under development."
    />
  )
}
