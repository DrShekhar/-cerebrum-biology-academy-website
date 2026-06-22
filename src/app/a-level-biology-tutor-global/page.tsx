import type { Metadata } from 'next'
import GlobalExamHubTemplate from '@/components/global-exams/GlobalExamHubTemplate'
import { GLOBAL_EXAM_BY_SLUG } from '@/data/global-exams/exams'

const exam = GLOBAL_EXAM_BY_SLUG['a-level-biology']
const SITE_URL = 'https://cerebrumbiologyacademy.com'
const url = `${SITE_URL}/a-level-biology-tutor-global`

export const metadata: Metadata = {
  title: exam.metaTitle,
  description: exam.metaDescription,
  keywords: exam.keywords,
  alternates: { canonical: url },
  openGraph: {
    title: exam.metaTitle,
    description: exam.metaDescription,
    url,
    locale: 'en',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: exam.metaTitle,
    description: exam.metaDescription,
  },
  robots: 'index, follow, max-image-preview:large',
}

export default function Page() {
  return <GlobalExamHubTemplate exam={exam} />
}
