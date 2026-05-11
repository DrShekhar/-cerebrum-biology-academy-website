import type { Metadata } from 'next'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'

// USD pricing + College-Board AP curriculum = US-primary audience. Use the
// shared AP Biology US-locale builder so hreflang and ogLocale match the
// audience instead of inheriting the global en_IN default.
export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor | Score 5 on Your AP Bio Exam | Cerebrum',
  description:
    'Score 5 on AP Biology with expert tutors. 90% of students score 4–5. Complete College Board curriculum, FRQ mastery, PhD-level instructors. Book a free demo.',
  keywords: [
    'ap biology tutor',
    'ap bio tutor',
    'ap biology tutoring',
    'ap bio help',
    'ap biology exam prep',
    'ap biology online tutoring',
    'college board ap biology',
    'ap biology score 5',
    'ap biology frq help',
    'ap biology test prep',
    'ap bio exam help',
    'ap biology study guide',
    'ap bio practice test',
    'ap biology course help',
    'best ap biology tutor',
    'ap biology private tutor',
    'ap bio tutoring online',
    'ap biology 1-on-1 tutoring',
  ],
  canonical: '/ap-biology-tutor',
})

export default function APBiologyTutorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
