import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Science Olympiad Division B Biology Coaching (Grades 6-9) | Online | Cerebrum',
  description:
    'Online coaching for Science Olympiad Division B biology events — Anatomy & Physiology, Heredity, Ecology, Microbe Mission, Disease Detectives, Botany. Small live batches, US timezones, AIIMS-trained biology specialists.',
  keywords: [
    'science olympiad division b biology',
    'science olympiad division b coaching',
    'science olympiad biology events',
    'anatomy and physiology science olympiad',
    'microbe mission coaching',
    'disease detectives science olympiad',
    'heredity science olympiad',
    'ecology science olympiad',
    'botany science olympiad',
    'middle school biology competition',
    'science olympiad tutor online',
    'science olympiad grades 6 7 8 9',
  ],
  openGraph: {
    title: 'Science Olympiad Division B Biology Coaching (Grades 6-9) — Online',
    description:
      'Event-focused online coaching for Science Olympiad Division B life-science events, taught by biology specialists. Small live batches in US timezones.',
    url: 'https://cerebrumbiologyacademy.com/science-olympiad-division-b-biology-coaching',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Science Olympiad Division B Biology Coaching (Grades 6-9) — Online',
    description:
      'Coaching for Division B biology events: Anatomy & Physiology, Heredity, Ecology, Microbe Mission, Disease Detectives, Botany. Live online, US timezones.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/science-olympiad-division-b-biology-coaching',
    languages: {
      'en-US': 'https://cerebrumbiologyacademy.com/science-olympiad-division-b-biology-coaching',
      en: 'https://cerebrumbiologyacademy.com/science-olympiad-division-b-biology-coaching',
      'x-default':
        'https://cerebrumbiologyacademy.com/science-olympiad-division-b-biology-coaching',
    },
  },
}

export default function ScienceOlympiadDivisionBLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
