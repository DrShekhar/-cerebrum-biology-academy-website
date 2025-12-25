import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tutor in Vaishali | NEET Coaching | Cerebrum Academy',
  description:
    'Best Biology tutor in Vaishali for NEET & Board exams. Expert coaching near Vaishali Metro. AIIMS faculty guidance. Offline & online classes.',
  keywords: [
    'biology tutor vaishali',
    'neet coaching vaishali',
    'biology classes vaishali',
    'biology tuition vaishali',
    'neet tutor vaishali',
    'biology coaching vaishali',
    'neet classes vaishali',
    'biology teacher vaishali',
    'neet preparation vaishali',
    'best biology coaching vaishali',
    'biology tutor mahagun mall',
    'neet coaching ghaziabad',
  ],
  openGraph: {
    title: 'Biology Tutor in Vaishali | NEET Coaching',
    description:
      'Best Biology tutor in Vaishali for NEET & Board exams. Expert coaching by AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cerebrumbiologyacademy.com/biology-tutor-vaishali',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Tutor in Vaishali | Cerebrum Academy',
    description: 'Expert NEET Biology coaching in Vaishali.',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/biology-tutor-vaishali',
  },
}

export default function BiologyTutorVaishaliLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
