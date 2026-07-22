import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Middle School Biology Tutor & Olympiad Prep — SF Bay Area (Online) | Cerebrum',
  description:
    'Online middle school biology tutoring & honest olympiad prep for SF Bay Area families (grades 6-8). Live small batches in Pacific Time evenings, taught by AIIMS-trained specialists. Science Olympiad Division B coaching. $2,500/year.',
  keywords: [
    'middle school biology tutor bay area',
    'biology tutor san jose',
    'science olympiad division b coaching bay area',
    'middle school biology enrichment cupertino',
    'biology olympiad prep fremont',
    'online biology tutor palo alto',
    'gifted biology program middle school bay area',
    'pre-usabo foundation california',
    'biology tutor saratoga',
    'middle school science tutor silicon valley',
    'national biology bowl coaching',
    'biology enrichment grades 6 7 8 bay area',
  ],
  openGraph: {
    title: 'Middle School Biology Tutor & Olympiad Prep — SF Bay Area (Online)',
    description:
      'Honest, age-appropriate biology tutoring for Bay Area middle schoolers (grades 6-8). Live online classes in Pacific Time evenings, small batches, AIIMS-trained faculty. $2,500/year.',
    url: 'https://cerebrumbiologyacademy.com/middle-school-biology-tutor-bay-area',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Middle School Biology Tutor & Olympiad Prep — SF Bay Area (Online)',
    description:
      'Online biology tutoring & Science Olympiad Division B prep for Bay Area grades 6-8. Pacific Time evening batches, AIIMS-trained specialists.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/middle-school-biology-tutor-bay-area',
    languages: {
      'en-US': 'https://cerebrumbiologyacademy.com/middle-school-biology-tutor-bay-area',
      en: 'https://cerebrumbiologyacademy.com/middle-school-biology-tutor-bay-area',
      'x-default': 'https://cerebrumbiologyacademy.com/middle-school-biology-tutor-bay-area',
    },
  },
}

export default function MiddleSchoolBiologyTutorBayAreaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
