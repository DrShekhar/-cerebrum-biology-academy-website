import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MCAT Bio/Biochem Curriculum & Study Plan | Campbell + Lehninger',
  description:
    'The week-by-week MCAT Bio/Biochem curriculum and study plan — Campbell Biology foundation, Lehninger biochemistry, AAMC content-outline mapping. Part of the MCAT Biology hub.',
  keywords: [
    'MCAT biology curriculum',
    'MCAT biology study plan',
    'MCAT bio/biochem syllabus',
    'MCAT Campbell biology plan',
    'MCAT Lehninger biochemistry',
    'AAMC content outline mapping',
    'MCAT B/B study schedule',
    'MCAT biology preparation plan',
  ],
  twitter: {
    card: 'summary_large_image',
    title: 'MCAT Bio/Biochem Curriculum & Study Plan | Campbell + Lehninger',
    description:
      'Week-by-week MCAT Bio/Biochem curriculum and study plan — Campbell + Lehninger, AAMC-outline mapped.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/mcat-biology-preparation',
  },
  openGraph: {
    title: 'MCAT Bio/Biochem Curriculum & Study Plan | Campbell + Lehninger',
    description:
      'The week-by-week MCAT Bio/Biochem curriculum and study plan — Campbell foundation, Lehninger biochemistry, AAMC-outline mapped. Part of the MCAT Biology hub.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Cerebrum Biology Academy',
  },
}

export default function MCATBiologyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
