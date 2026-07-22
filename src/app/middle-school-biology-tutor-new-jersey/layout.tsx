import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Middle School Biology Tutor & Olympiad Prep — New Jersey (Online) | Cerebrum',
  description:
    'Online middle school biology tutor for New Jersey families (grades 6-8). Honest olympiad prep — Science Olympiad Division B, National Biology Bowl — taught by AIIMS-trained specialists in ET evening slots. Small live batches. $2,500/year.',
  keywords: [
    'middle school biology tutor new jersey',
    'biology tutor nj',
    'online biology tutor new jersey',
    'science olympiad division b biology nj',
    'middle school biology olympiad new jersey',
    'national biology bowl new jersey',
    'biology enrichment grades 6 7 8 nj',
    'pre-usabo foundation new jersey',
    'bergen county biology tutor',
    'princeton edison biology tutoring',
    'cherry hill biology tutor',
    'gifted biology program middle school nj',
  ],
  openGraph: {
    title: 'Middle School Biology Tutor & Olympiad Prep — New Jersey (Online)',
    description:
      'An honest, age-appropriate online biology tutor for New Jersey middle schoolers (grades 6-8). Live small-batch classes in ET evening slots, AIIMS-trained faculty. $2,500/year.',
    url: 'https://cerebrumbiologyacademy.com/middle-school-biology-tutor-new-jersey',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Middle School Biology Tutor & Olympiad Prep — New Jersey (Online)',
    description:
      'Honest early-prep biology tutor for NJ grades 6-8. Small live batches, ET evening slots, AIIMS-trained specialists.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/middle-school-biology-tutor-new-jersey',
    languages: {
      'en-US': 'https://cerebrumbiologyacademy.com/middle-school-biology-tutor-new-jersey',
      en: 'https://cerebrumbiologyacademy.com/middle-school-biology-tutor-new-jersey',
      'x-default': 'https://cerebrumbiologyacademy.com/middle-school-biology-tutor-new-jersey',
    },
  },
}

export default function MiddleSchoolBiologyTutorNewJerseyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
