import { ComingSoonPage } from '@/components/ui/ComingSoonPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Score Calculator - Coming Soon | Cerebrum Biology Academy',
  description:
    'Our NEET score calculator is coming soon. Calculate your expected NEET score and rank.',
}

export default function CalculatorPage() {
  return (
    <ComingSoonPage
      title="NEET Score Calculator"
      description="Our NEET score calculator will help you estimate your expected score and rank based on your mock test performance. This feature is currently under development."
    />
  )
}
