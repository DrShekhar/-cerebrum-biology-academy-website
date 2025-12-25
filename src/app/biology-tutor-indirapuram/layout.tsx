import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tutor in Indirapuram | NEET Coaching | Cerebrum Academy',
  description:
    'Best Biology tutor in Indirapuram for NEET & Board exams. Expert coaching near Shipra Mall. AIIMS faculty guidance. Offline & online classes.',
  keywords: [
    'biology tutor indirapuram',
    'neet coaching indirapuram',
    'biology classes indirapuram',
    'biology tuition indirapuram',
    'neet tutor indirapuram',
    'biology coaching indirapuram',
    'neet classes indirapuram',
    'biology teacher indirapuram',
    'neet preparation indirapuram',
    'best biology coaching indirapuram',
    'biology tutor shipra mall',
    'neet coaching ghaziabad',
  ],
  openGraph: {
    title: 'Biology Tutor in Indirapuram | NEET Coaching',
    description:
      'Best Biology tutor in Indirapuram for NEET & Board exams. Expert coaching by AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cerebrumbiologyacademy.com/biology-tutor-indirapuram',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Tutor in Indirapuram | Cerebrum Academy',
    description: 'Expert NEET Biology coaching in Indirapuram.',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/biology-tutor-indirapuram',
  },
}

export default function BiologyTutorIndirapuramLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
