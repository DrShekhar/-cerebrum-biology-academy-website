import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tutor in Saket | NEET Coaching | Cerebrum Academy',
  description:
    'Best Biology tutor in Saket for NEET & Board exams. Expert coaching for Saket, Malviya Nagar, Hauz Khas, Green Park. AIIMS faculty guidance. Online classes available.',
  keywords: [
    'biology tutor saket',
    'neet coaching saket',
    'biology classes saket',
    'biology tuition saket delhi',
    'neet tutor saket',
    'biology coaching saket',
    'neet classes saket',
    'biology teacher saket',
    'neet preparation saket',
    'best biology coaching saket',
  ],
  openGraph: {
    title: 'Biology Tutor in Saket | NEET Coaching',
    description:
      'Best Biology tutor in Saket for NEET & Board exams. Expert coaching by AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/biology-tutor-saket',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Tutor in Saket | Cerebrum Academy',
    description: 'Expert NEET Biology coaching in Saket Delhi.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tutor-saket',
  },
}

export default function BiologyTutorSaketLayout({ children }: { children: React.ReactNode }) {
  return children
}
