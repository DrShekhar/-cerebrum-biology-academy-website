import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tutor in Dwarka | NEET Coaching | Cerebrum Academy',
  description:
    'Best Biology tutor in Dwarka for NEET & Board exams. Expert coaching for Dwarka Sectors 1-23, Uttam Nagar, Nawada. AIIMS faculty guidance. Online classes available.',
  keywords: [
    'biology tutor dwarka',
    'neet coaching dwarka',
    'biology classes dwarka sector',
    'biology tuition dwarka delhi',
    'neet tutor dwarka',
    'biology coaching dwarka',
    'neet classes dwarka',
    'biology teacher dwarka',
    'neet preparation dwarka',
    'best biology coaching dwarka',
  ],
  openGraph: {
    title: 'Biology Tutor in Dwarka | NEET Coaching',
    description:
      'Best Biology tutor in Dwarka for NEET & Board exams. Expert coaching for all Dwarka Sectors.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/biology-tutor-dwarka',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Tutor in Dwarka | Cerebrum Academy',
    description: 'Expert NEET Biology coaching in Dwarka Delhi.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tutor-dwarka',
  },
}

export default function BiologyTutorDwarkaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
