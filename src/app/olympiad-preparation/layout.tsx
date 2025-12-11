import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Olympiad Preparation | Science Olympiad Coaching - Cerebrum Biology Academy',
  description:
    'Expert olympiad preparation classes for NSO, NSEB, KVPY, and all science olympiads. Specialized olympiad coaching with proven results, scholarships, and recognition. Join olympiad classes near you!',
  keywords: [
    'olympiad preparation',
    'science olympiad coaching',
    'olympiad classes',
    'olympiad coaching near me',
    'olympiad preparation classes',
    'NSO coaching',
    'NSEB coaching',
    'biology olympiad preparation',
    'olympiad training',
    'science olympiad classes',
    'olympiad exam preparation',
  ],
  openGraph: {
    title: 'Olympiad Preparation | Science Olympiad Coaching - Cerebrum',
    description:
      'Comprehensive olympiad preparation for NSO, NSEB, KVPY, and more. Expert coaching, proven strategies, and scholarships. Build problem-solving skills for competitive success.',
    url: 'https://cerebrumbiologyacademy.com/olympiad-preparation',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Olympiad Preparation',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Olympiad Preparation | Science Olympiad Coaching - Cerebrum',
    description:
      'Expert olympiad coaching for NSO, NSEB, KVPY. Scholarships, recognition, and problem-solving skills.',
    images: ['https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=1200&h=630&fit=crop'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/olympiad-preparation',
  },
}

export default function OlympiadPreparationLayout({ children }: { children: React.ReactNode }) {
  return children
}
