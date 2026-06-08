import { Metadata } from 'next'
import { TopBiologyCoachingIndiaContent } from './Content'
import { NEETSchemaStack } from '@/components/seo/NEETSchemaStack'

export const metadata: Metadata = {
  title: 'Top 10 Biology Coaching in India 2026 | Honest Ranking — NEET + IB + AP + Olympiads',
  description:
    'Honest 2026 ranking of the top 10 biology coaching institutes in India across NEET, CBSE/ICSE boards, IB, AP, and biology olympiads (NSEB/INBO/IBO). Cerebrum Biology Academy #1 — only biology-only specialist with 98% NEET qualification.',
  keywords: [
    'top biology coaching india',
    'best biology coaching india',
    'top biology institute india',
    'best biology teacher india',
    'top biology faculty india',
    'best biology coaching 2026',
    'top biology tuition india',
    'best neet biology coaching india',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'Top 10 Biology Coaching in India 2026 — Across NEET + Boards + Olympiads',
    description:
      'Cerebrum Biology Academy ranked #1 in India for Biology — covers NEET + CBSE/ICSE + IB + AP + India olympiads.',
    url: 'https://cerebrumbiologyacademy.com/top-biology-coaching-india',
    type: 'article',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/top-biology-coaching-india',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'Top 10 Biology Coaching in India 2026 | Honest Ranking — NEET + IB + AP + Olympiads',
    description: 'Honest 2026 ranking of the top 10 biology coaching institutes in India across NEET, CBSE/ICSE boards, IB, AP, and biology olympiads (NSEB/INBO/IBO). Cerebrum Biology Academy #1 — only biology-only ...',
  },
}

export default function TopBiologyCoachingIndiaPage() {
  return (
    <>
      <NEETSchemaStack
        pageUrl="https://cerebrumbiologyacademy.com/top-biology-coaching-india"
        pageName="Top Biology Coaching in India"
        parentHub={{
          name: 'Best Biology Teacher India',
          url: 'https://cerebrumbiologyacademy.com/best-biology-teacher-india',
        }}
        personKnowsAbout={[
          'NEET Biology India',
          'CBSE Biology Class 11 12',
          'ICSE Biology',
          'India biology olympiads NSEB INBO',
          'Biology coaching India',
        ]}
      />
      <TopBiologyCoachingIndiaContent />
    </>
  )
}
