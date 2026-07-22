import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Middle School Biology Olympiad Foundation (USA) | Grades 6-8 | Cerebrum',
  description:
    'Online biology foundation & enrichment for US middle schoolers (grades 6-8). Honest early-prep for the biology olympiad pathway, taught by AIIMS-trained specialists. Small live batches in ET/CT/MT/PT. $2,500/year.',
  keywords: [
    'middle school biology olympiad',
    'biology olympiad foundation',
    'middle school biology enrichment',
    'biology for middle schoolers',
    'science olympiad division b biology',
    'national biology bowl',
    'middle school biology competition',
    'gifted biology program middle school',
    'pre-usabo foundation',
    'online biology tutor middle school usa',
    'early biology olympiad prep',
    'biology enrichment grades 6 7 8',
  ],
  openGraph: {
    title: 'Middle School Biology Olympiad Foundation (USA) | Grades 6-8',
    description:
      'An honest, age-appropriate biology foundation for US middle schoolers who want to get ahead before high school. Live online classes, small batches, AIIMS-trained faculty. $2,500/year.',
    url: 'https://cerebrumbiologyacademy.com/middle-school-biology-olympiad-usa',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Middle School Biology Olympiad Foundation (USA) | Grades 6-8',
    description:
      'Honest early-prep biology foundation for US grades 6-8. Small live batches, US timezones, AIIMS-trained specialists.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/middle-school-biology-olympiad-usa',
    languages: {
      'en-US': 'https://cerebrumbiologyacademy.com/middle-school-biology-olympiad-usa',
      en: 'https://cerebrumbiologyacademy.com/middle-school-biology-olympiad-usa',
      'x-default': 'https://cerebrumbiologyacademy.com/middle-school-biology-olympiad-usa',
    },
  },
}

export default function MiddleSchoolBiologyOlympiadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
