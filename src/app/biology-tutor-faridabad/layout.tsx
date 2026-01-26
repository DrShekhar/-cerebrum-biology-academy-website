import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tutor in Faridabad | NEET Coaching | Cerebrum Academy',
  description:
    'Best Biology tutor in Faridabad for NEET & Board exams. Expert coaching for Sector 15, NIT, and all Faridabad. AIIMS faculty guidance. Offline & online classes.',
  keywords: [
    'biology tutor faridabad',
    'neet coaching faridabad',
    'biology classes faridabad',
    'biology tuition faridabad',
    'neet tutor faridabad',
    'biology coaching faridabad',
    'neet classes faridabad',
    'biology teacher faridabad',
    'neet preparation faridabad',
    'best biology coaching faridabad',
    'biology tutor nit faridabad',
    'neet coaching sector 15 faridabad',
  ],
  openGraph: {
    title: 'Biology Tutor in Faridabad | NEET Coaching',
    description:
      'Best Biology tutor in Faridabad for NEET & Board exams. Expert coaching by AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/biology-tutor-faridabad',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Tutor in Faridabad | Cerebrum Academy',
    description: 'Expert NEET Biology coaching in Faridabad.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tutor-faridabad',
  },
}

export default function BiologyTutorFaridabadLayout({ children }: { children: React.ReactNode }) {
  return children
}
