import type { Metadata } from 'next'

const URL = 'https://cerebrumbiologyacademy.com/programs/biology-olympiad'

export const metadata: Metadata = {
  title: 'Biology Olympiad & IBO Coaching for International-School Students | Cerebrum',
  description:
    'AIIMSonian-led Biology Olympiad & IBO coaching for international-school students worldwide. Live online, small batches (4–6 students), 99%+ NCERT-aligned foundation that doubles as Pre-Med preparation. 27 countries served.',
  keywords: [
    'biology olympiad coaching',
    'IBO coaching international students',
    'biology olympiad tutor international school',
    'Pre-Med foundation biology coaching',
    'international biology olympiad coaching online',
    'AIIMS biology faculty for international students',
    'biology olympiad coaching UAE',
    'biology olympiad coaching USA international school',
    'biology olympiad coaching UK international',
    'biology olympiad coaching Singapore international',
  ],
  alternates: {
    canonical: URL,
    languages: {
      en: URL,
      'x-default': URL,
    },
  },
  openGraph: {
    title: 'Biology Olympiad & IBO Coaching — Live Online, Globally',
    description:
      'AIIMSonian-led, biology-only coaching for international-school students in 27 countries. Olympiad-grade depth + Pre-Med foundation.',
    url: URL,
    type: 'website',
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Olympiad & IBO Coaching — Live Online, Globally',
    description:
      'AIIMSonian-led, biology-only coaching for international-school students in 27 countries.',
  },
}

export default function BiologyOlympiadLayout({ children }: { children: React.ReactNode }) {
  return children
}
