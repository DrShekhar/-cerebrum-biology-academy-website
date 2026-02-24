import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tutor in Janakpuri | NEET Coaching',
  description:
    'Best Biology tutor in Janakpuri for NEET & Board exams. Expert coaching for Janakpuri, Tilak Nagar, Vikaspuri, Uttam Nagar. AIIMS faculty. Online classes available.',
  keywords: [
    'biology tutor janakpuri',
    'neet coaching janakpuri',
    'biology classes janakpuri',
    'biology tuition janakpuri delhi',
    'neet tutor janakpuri',
    'biology coaching janakpuri',
    'neet classes janakpuri',
    'biology teacher janakpuri',
    'neet preparation janakpuri',
    'best biology coaching janakpuri',
  ],
  openGraph: {
    title: 'Biology Tutor in Janakpuri | NEET Coaching',
    description:
      'Best Biology tutor in Janakpuri for NEET & Board exams. Expert coaching by AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/biology-tutor-janakpuri',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Tutor in Janakpuri',
    description: 'Expert NEET Biology coaching in Janakpuri Delhi.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tutor-janakpuri',
  },
}

export default function BiologyTutorJanakpuriLayout({ children }: { children: React.ReactNode }) {
  return children
}
