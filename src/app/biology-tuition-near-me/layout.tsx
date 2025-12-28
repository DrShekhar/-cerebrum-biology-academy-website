import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tuition Near Me | Best Bio Tuition Classes 2025',
  description:
    'Find the best biology tuition near you. Expert AIIMS-trained tutors, personalized attention, flexible timings. NEET & board exam preparation. Online & offline options.',
  keywords: [
    'biology tuition near me',
    'bio tuition near me',
    'best biology tuition near me',
    'biology tuition classes near me',
    'biology tuition in delhi',
    'biology tuition fees',
    'private biology tuition',
    'neet biology tuition',
    'biology tuition for class 11',
    'biology tuition for class 12',
  ],
  openGraph: {
    title: 'Biology Tuition Near Me | Expert Tutors',
    description:
      'Find personalized biology tuition near your location. AIIMS-trained tutors, flexible timings.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/biology-tuition-near-me',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Tuition Near Me',
    description: 'Expert biology tuition with personalized attention. Book a free demo today!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-near-me',
  },
}

export default function BiologyTuitionNearMeLayout({ children }: { children: React.ReactNode }) {
  return children
}
