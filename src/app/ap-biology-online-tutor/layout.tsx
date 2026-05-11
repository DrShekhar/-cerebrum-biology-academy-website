import type { Metadata } from 'next'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'

// USD pricing + College-Board AP curriculum = US-primary audience. Use the
// shared AP Biology US-locale builder so hreflang and ogLocale are emitted
// (the prior hand-rolled metadata was missing alternates.languages).
export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Online Tutor | College Board Aligned Coaching',
  description:
    'Expert AP Biology tutoring aligned with Campbell Biology textbook. Master all 8 units, ace your labs, and score 5 on the AP exam with personalized online coaching.',
  keywords: [
    'AP Biology tutor',
    'AP Biology online tutor',
    'AP Biology coaching',
    'AP Biology prep',
    'AP Biology exam preparation',
    'AP Biology score 5',
    'College Board Biology',
    'AP Biology labs',
    'AP Biology FRQ',
  ],
  canonical: '/ap-biology-online-tutor',
})

export default function APBiologyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
