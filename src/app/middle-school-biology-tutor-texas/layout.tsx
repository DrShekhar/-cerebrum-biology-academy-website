import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Middle School Biology Tutor & Olympiad Prep — Texas (Online) | Cerebrum',
  description:
    'Online middle school biology tutoring & honest olympiad-foundation prep for Texas families (grades 6-8). Live small batches in Central Time (CT) evenings, AIIMS-trained specialists. Batches from $1,500.',
  keywords: [
    'middle school biology tutor texas',
    'online biology tutor texas middle school',
    'biology olympiad prep texas',
    'science olympiad division b biology texas',
    'middle school biology enrichment texas',
    'plano biology tutor',
    'southlake biology tutor',
    'sugar land biology tutor',
    'dallas biology tutor middle school',
    'austin biology tutor middle school',
    'houston biology tutor middle school',
    'pre-usabo foundation texas',
  ],
  openGraph: {
    title: 'Middle School Biology Tutor & Olympiad Prep — Texas (Online)',
    description:
      'Honest, age-appropriate biology tutoring for Texas middle schoolers (grades 6-8). Live online classes in Central Time evenings, small batches, AIIMS-trained faculty. Batches from $1,500.',
    url: 'https://cerebrumbiologyacademy.com/middle-school-biology-tutor-texas',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Middle School Biology Tutor & Olympiad Prep — Texas (Online)',
    description:
      'Online biology tutoring for Texas grades 6-8. Central Time evening batches, small groups, AIIMS-trained specialists.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/middle-school-biology-tutor-texas',
    languages: {
      'en-US': 'https://cerebrumbiologyacademy.com/middle-school-biology-tutor-texas',
      en: 'https://cerebrumbiologyacademy.com/middle-school-biology-tutor-texas',
      'x-default': 'https://cerebrumbiologyacademy.com/middle-school-biology-tutor-texas',
    },
  },
}

export default function MiddleSchoolBiologyTutorTexasLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
