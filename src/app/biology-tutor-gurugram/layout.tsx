import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tutor in Gurugram | NEET Coaching | Cerebrum Academy',
  description:
    'Best Biology tutor in Gurugram for NEET & Board exams. Expert coaching for DLF, Sohna Road, Golf Course Road. AIIMS faculty guidance. Offline & online classes.',
  keywords: [
    'biology tutor gurugram',
    'neet coaching gurugram',
    'biology classes gurugram',
    'biology tuition gurugram',
    'neet tutor gurugram',
    'biology coaching gurugram',
    'neet classes gurugram',
    'biology teacher gurugram',
    'neet preparation gurugram',
    'best biology coaching gurugram',
    'biology tutor gurgaon',
    'neet coaching dlf gurugram',
    'biology tutor sohna road',
  ],
  openGraph: {
    title: 'Biology Tutor in Gurugram | NEET Coaching',
    description:
      'Best Biology tutor in Gurugram for NEET & Board exams. Expert coaching by AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/biology-tutor-gurugram',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Tutor in Gurugram | Cerebrum Academy',
    description: 'Expert NEET Biology coaching in Gurugram.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tutor-gurugram',
  },
}

export default function BiologyTutorGurugramLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
