import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Classes Near Me | Find Best Bio Classes in Delhi NCR 2027',
  description:
    'Looking for biology classes near you? Find the best bio classes in Delhi, Gurugram, Noida, Faridabad. Expert faculty, small batches, both online & offline options available.',
  keywords: [
    'biology classes near me',
    'bio classes near me',
    'biology coaching near me',
    'biology classes in delhi',
    'biology classes in gurugram',
    'biology classes in noida',
    'bio classes nearby',
    'best biology classes near me',
    'neet biology classes near me',
  ],
  openGraph: {
    title: 'Biology Classes Near Me | Delhi NCR',
    description:
      'Find expert biology classes near your location. Online & offline options in Delhi NCR.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/biology-classes-near-me',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Classes Near Me',
    description:
      'Find the best biology classes near your location. Expert faculty, proven results!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-near-me',
  },
}

export default function BiologyClassesNearMeLayout({ children }: { children: React.ReactNode }) {
  return children
}
