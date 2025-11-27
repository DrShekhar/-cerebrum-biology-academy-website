import { ComingSoonPage } from '@/components/ui/ComingSoonPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Resources - Coming Soon | Cerebrum Biology Academy',
  description: 'Access free biology study materials, notes, and practice questions. Coming soon.',
}

export default function FreeResourcesPage() {
  return (
    <ComingSoonPage
      title="Free Resources"
      description="We are preparing a collection of free study materials, practice questions, and revision notes for NEET Biology. This section will be available soon."
    />
  )
}
