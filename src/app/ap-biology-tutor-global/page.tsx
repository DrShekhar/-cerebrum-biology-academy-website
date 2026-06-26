import type { Metadata } from 'next'
import GlobalExamHubTemplate from '@/components/global-exams/GlobalExamHubTemplate'
import { GLOBAL_EXAM_BY_SLUG } from '@/data/global-exams/exams'

const exam = GLOBAL_EXAM_BY_SLUG['ap-biology']
const SITE_URL = 'https://cerebrumbiologyacademy.com'
const url = `${SITE_URL}/ap-biology-tutor-global`

// Title + keywords narrowed here (rather than in shared exams.ts data) so this
// page owns the "online / worldwide / any country" intent and cedes the bare
// "ap biology tutor" head term to the US hub at /ap-biology-tutor. Keeps the
// AP cluster de-cannibalised without touching the parent-owned exams dataset.
const ONLINE_WORLDWIDE_TITLE =
  'Online AP Biology Tutor (Any Country, Worldwide) — Score-5 Coaching | Cerebrum'
const ONLINE_WORLDWIDE_KEYWORDS = [
  'ap biology tutor online',
  'ap biology tutor worldwide',
  'online ap biology tutor any country',
  'ap biology score 5',
  'ap biology coaching online',
  'ap biology frq help',
]

export const metadata: Metadata = {
  title: ONLINE_WORLDWIDE_TITLE,
  description: exam.metaDescription,
  keywords: ONLINE_WORLDWIDE_KEYWORDS,
  alternates: { canonical: url },
  openGraph: {
    title: ONLINE_WORLDWIDE_TITLE,
    description: exam.metaDescription,
    url,
    locale: 'en',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: ONLINE_WORLDWIDE_TITLE,
    description: exam.metaDescription,
  },
  robots: 'index, follow, max-image-preview:large',
}

export default function Page() {
  return <GlobalExamHubTemplate exam={exam} />
}
