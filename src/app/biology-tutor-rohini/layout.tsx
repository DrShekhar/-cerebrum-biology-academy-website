import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tutor in Rohini | NEET Coaching | Cerebrum Academy',
  description:
    'Best Biology tutor in Rohini for NEET & Board exams. Expert coaching for Rohini Sectors, Pitampura, Shalimar Bagh. AIIMS faculty guidance. Online classes available.',
  keywords: [
    'biology tutor rohini',
    'neet coaching rohini',
    'biology classes rohini sector',
    'biology tuition rohini delhi',
    'neet tutor rohini',
    'biology coaching rohini',
    'neet classes rohini',
    'biology teacher rohini',
    'neet preparation rohini',
    'best biology coaching rohini',
  ],
  openGraph: {
    title: 'Biology Tutor in Rohini | NEET Coaching',
    description:
      'Best Biology tutor in Rohini for NEET & Board exams. Expert coaching for all Rohini Sectors.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cerebrumbiologyacademy.com/biology-tutor-rohini',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Tutor in Rohini | Cerebrum Academy',
    description: 'Expert NEET Biology coaching in Rohini Delhi.',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/biology-tutor-rohini',
  },
}

export default function BiologyTutorRohiniLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
