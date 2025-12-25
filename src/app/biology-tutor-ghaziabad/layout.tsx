import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tutor in Ghaziabad | NEET Coaching | Cerebrum Academy',
  description:
    'Best Biology tutor in Ghaziabad for NEET & Board exams. Expert coaching for Indirapuram, Vaishali, Kaushambi. AIIMS faculty guidance. Offline & online classes.',
  keywords: [
    'biology tutor ghaziabad',
    'neet coaching ghaziabad',
    'biology classes ghaziabad',
    'biology tuition ghaziabad',
    'neet tutor ghaziabad',
    'biology coaching ghaziabad',
    'neet classes ghaziabad',
    'biology teacher ghaziabad',
    'neet preparation ghaziabad',
    'best biology coaching ghaziabad',
    'biology tutor indirapuram',
    'neet coaching vaishali',
  ],
  openGraph: {
    title: 'Biology Tutor in Ghaziabad | NEET Coaching',
    description:
      'Best Biology tutor in Ghaziabad for NEET & Board exams. Expert coaching by AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cerebrumbiologyacademy.com/biology-tutor-ghaziabad',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Tutor in Ghaziabad | Cerebrum Academy',
    description: 'Expert NEET Biology coaching in Ghaziabad.',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/biology-tutor-ghaziabad',
  },
}

export default function BiologyTutorGhaziabadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
