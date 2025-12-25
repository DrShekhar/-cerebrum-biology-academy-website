import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tutor in Noida Extension | NEET Coaching | Cerebrum Academy',
  description:
    'Best Biology tutor in Noida Extension (Greater Noida West) for NEET & Board exams. Expert coaching near Gaur City. AIIMS faculty guidance. Offline & online classes.',
  keywords: [
    'biology tutor noida extension',
    'neet coaching noida extension',
    'biology classes greater noida west',
    'biology tuition noida extension',
    'neet tutor gaur city',
    'biology coaching noida extension',
    'neet classes greater noida west',
    'biology teacher noida extension',
    'neet preparation noida extension',
    'best biology coaching gaur city',
  ],
  openGraph: {
    title: 'Biology Tutor in Noida Extension | NEET Coaching',
    description:
      'Best Biology tutor in Noida Extension for NEET & Board exams. Expert coaching by AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cerebrumbiologyacademy.com/biology-tutor-noida-extension',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Tutor in Noida Extension | Cerebrum Academy',
    description: 'Expert NEET Biology coaching in Noida Extension.',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/biology-tutor-noida-extension',
  },
}

export default function BiologyTutorNoidaExtensionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
