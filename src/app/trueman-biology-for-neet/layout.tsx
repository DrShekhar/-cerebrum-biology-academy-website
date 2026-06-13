import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Trueman's Biology for NEET | Book Review + Strategy | Cerebrum Biology Academy",
  description:
    "Trueman's Biology for NEET — complete book review, chapter-wise analysis, when to use it vs NCERT. AIIMS-trained Dr. Shekhar C Singh explains how Trueman's Vol 1 (Class 11) and Vol 2 (Class 12) fit into NEET preparation. Best companion for NCERT depth + diagram-heavy chapters. Recommended buy links.",
  keywords: [
    'Trueman Biology for NEET',
    'Trueman Biology NEET review',
    'Trueman Biology Vol 1',
    'Trueman Biology Vol 2',
    'Trueman Biology Class 11',
    'Trueman Biology Class 12',
    'Trueman vs NCERT biology',
    'Trueman Biology PDF',
    'best NEET biology book',
    'Trueman Biology MCQ',
    'NEET biology reference book',
    'Cerebrum Trueman recommendation',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/trueman-biology-for-neet' },
  openGraph: {
    title: "Trueman's Biology for NEET | Cerebrum",
    description: 'Complete book review + NCERT companion strategy from AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/trueman-biology-for-neet',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: "Trueman's Biology for NEET | Cerebrum",
    description: 'Review + NCERT companion strategy.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
