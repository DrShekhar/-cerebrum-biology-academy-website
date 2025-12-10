import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Home Tutor | Home Tuition for Biology 2025',
  description:
    'Looking for a biology home tutor? Discover why ordinary home tutors fail and how Cerebrum small batch coaching produces NEET toppers. AIIMS trained faculty, peer learning environment.',
  keywords: [
    'biology home tutor',
    'biology home tutor near me',
    'home tuition for biology',
    'biology home tuition',
    'private biology tutor',
    'biology tutor at home',
    'home biology teacher',
    'biology private tuition',
    'NEET biology home tutor',
    'biology home coaching',
  ],
  openGraph: {
    title: 'Biology Home Tutor | Home Tuition for Biology 2025',
    description:
      'Looking for biology home tutor? Learn why small batch coaching beats home tuition. AIIMS trained faculty, peer learning, proven results.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cerebrumbiologyacademy.com/biology-home-tutor',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Home Tutor',
    description: 'Why ordinary home tutors fail and what actually works for NEET success.',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/biology-home-tutor',
  },
}

export default function BiologyHomeTutorLayout({ children }: { children: React.ReactNode }) {
  return children
}
