import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Online Biology Tutor in India | 1:1 AIIMS Faculty | Cerebrum',
  description:
    'Best online biology tutor in India — Dr. Shekhar C Singh, AIIMS alumnus. 1:1 personalised mentoring across NEET, IB, AP, MCAT and Class 11–12 boards. 680+ medical college selections, 98% NEET qualification rate. Book a FREE demo!',
  keywords: [
    'best online biology tutor in india',
    'best online biology tutor india',
    'online biology tutor india 1:1',
    'best 1 on 1 biology tutor india',
    'best online biology tutor for neet',
    'best online biology tutor for ib',
    'best online biology tutor for ap',
    'best online biology tutor for mcat',
    'top online biology tutor india',
    'india best online biology coaching',
    'pan india online biology tutor',
    'online biology tutor near me',
  ],
  openGraph: {
    title: 'Best Online Biology Tutor in India | 1:1 AIIMS Faculty',
    description:
      'Best online biology tutor in India — 1:1 personalised mentoring with Dr. Shekhar C Singh (AIIMS). 680+ medical college selections, 98% NEET qualification rate.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/best-online-biology-tutor-india',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Online Biology Tutor in India',
    description:
      '1:1 AIIMS faculty. NEET, IB, AP, MCAT, Class 11–12. 680+ medical college selections.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-online-biology-tutor-india',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
