import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AP Biology Online Tutor | College Board Aligned Coaching',
  description:
    'Expert AP Biology tutoring aligned with Campbell Biology textbook. Master all 8 units, ace your labs, and score 5 on the AP exam with personalized online coaching.',
  keywords: [
    'AP Biology tutor',
    'AP Biology online tutor',
    'AP Biology coaching',
    'AP Biology prep',
    'AP Biology exam preparation',
    'AP Biology score 5',
    'College Board Biology',
    'AP Biology labs',
    'AP Biology FRQ',
  ],
  twitter: {
    card: 'summary_large_image',
    title: 'AP Biology Online Tutor | College Board Aligned Coaching',
    description: 'Expert AP Biology tutoring aligned with Campbell Biology textbook.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/ap-biology-online-tutor/',
  },
  openGraph: {
    title: 'AP Biology Online Tutor | College Board Aligned Coaching',
    description:
      'Expert AP Biology tutoring aligned with Campbell Biology textbook. Score 5 on your AP exam with personalized coaching.',
    type: 'website',
    siteName: 'Cerebrum Biology Academy',
  },
}

export default function APBiologyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
