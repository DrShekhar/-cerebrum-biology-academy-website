import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zoology Teacher Near Me | Best Zoology Classes 2025',
  description:
    'Find the best zoology teacher near you. Offline centers in Delhi NCR + online classes Pan-India. Expert faculty for Human Physiology, Animal Kingdom & NEET Zoology preparation.',
  keywords: [
    'zoology teacher near me',
    'zoology classes near me',
    'zoology tutor near me',
    'zoology coaching near me',
    'animal biology teacher near me',
    'best zoology teacher near me',
    'zoology faculty near me',
  ],
  openGraph: {
    title: 'Zoology Teacher Near Me | Offline & Online Classes',
    description:
      'Find expert zoology teachers near you. Delhi NCR offline centers + Pan-India online classes.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cerebrumbiologyacademy.com/zoology-teacher-near-me',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zoology Teacher Near Me',
    description: 'Expert zoology teachers in Delhi NCR & online across India!',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/zoology-teacher-near-me',
  },
}

export default function ZoologyTeacherNearMeLayout({ children }: { children: React.ReactNode }) {
  return children
}
