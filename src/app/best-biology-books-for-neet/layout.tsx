import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Biology Books for NEET 2026 | NCERT + Reference Guide | Cerebrum Biology Academy',
  description:
    'Best biology books for NEET 2026 — NCERT Class 11 & 12 (mandatory), Trueman\'s Biology, Pradeep Biology, MTG NCERT Fingertips, Allen Modules, Dinesh Objective Biology. Topic-by-topic recommendations from AIIMS-trained Dr. Shekhar C Singh. Class 11 / 12 / dropper / repeater book strategy.',
  keywords: [
    'best biology books for NEET',
    'NEET biology book list 2026',
    'NCERT biology Class 11 12',
    'Trueman biology NEET',
    'Pradeep biology NEET',
    'MTG NCERT Fingertips biology',
    'Allen biology module',
    'Dinesh objective biology',
    'NEET biology reference books',
    'biology book strategy NEET',
    'best biology book dropper',
    'NEET biology study material',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/best-biology-books-for-neet' },
  openGraph: {
    title: 'Best Biology Books for NEET 2026 | Cerebrum Biology Academy',
    description:
      'NCERT + reference book strategy from AIIMS-trained faculty. Topic-by-topic recommendations.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/best-biology-books-for-neet',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Best Biology Books for NEET 2026',
    description: 'NCERT-first strategy + reference book recommendations from AIIMS faculty.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
