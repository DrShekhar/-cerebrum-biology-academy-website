import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home Tuition for Biology | Private Biology Home Tutors 2025',
  description:
    'Looking for home tuition for biology? Get personalized learning with expert AIIMS-trained tutors. Better than traditional home tutors - structured online classes with 24/7 doubt support.',
  keywords: [
    'home tuition for biology',
    'biology home tuition',
    'home tutor for biology',
    'private biology tutor',
    'biology home tuition near me',
    'home biology classes',
    'biology tuition at home',
    'personal biology tutor',
    'biology home teacher',
    'online home tuition biology',
  ],
  openGraph: {
    title: 'Home Tuition for Biology | Expert Tutors',
    description:
      'Personalized biology learning from home. Better than traditional tutors with structured curriculum.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cerebrumbiologyacademy.com/home-tuition-for-biology',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Tuition for Biology',
    description: 'Expert biology home tuition. AIIMS faculty, structured learning, proven results!',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/home-tuition-for-biology',
  },
}

export default function HomeTuitionBiologyLayout({ children }: { children: React.ReactNode }) {
  return children
}
