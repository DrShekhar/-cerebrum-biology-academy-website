import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zoology Teacher | Best Zoology Teacher for NEET 2026',
  description:
    'Looking for the best zoology teacher? Expert AIIMS-trained faculty specializing in Animal Biology. Master Human Physiology, Animal Kingdom & Reproduction. 50% of NEET Biology is Zoology!',
  keywords: [
    'zoology teacher',
    'best zoology teacher',
    'zoology faculty',
    'animal biology teacher',
    'zoology expert',
    'zoology teacher for neet',
    'best zoology teacher for neet',
    'zoology tutor',
    'zoology coaching',
  ],
  openGraph: {
    title: 'Best Zoology Teacher | AIIMS-Trained Faculty',
    description:
      'Expert zoology teaching focusing on Human Physiology & Animal Kingdom. 50% NEET weightage!',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/zoology-teacher',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Zoology Teacher',
    description: 'AIIMS-trained faculty specializing in Zoology. 50% of NEET Biology covered!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/zoology-teacher',
  },
}

export default function ZoologyTeacherLayout({ children }: { children: React.ReactNode }) {
  return children
}
