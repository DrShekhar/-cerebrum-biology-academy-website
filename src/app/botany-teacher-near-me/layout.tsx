import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Botany Teacher Near Me | Best Botany Classes 2025',
  description:
    'Find the best botany teacher near you. Offline centers in Delhi NCR + online classes Pan-India. Expert faculty for Plant Physiology, Plant Kingdom & NEET Botany preparation.',
  keywords: [
    'botany teacher near me',
    'botany classes near me',
    'botany tutor near me',
    'botany coaching near me',
    'plant biology teacher near me',
    'best botany teacher near me',
    'botany faculty near me',
  ],
  openGraph: {
    title: 'Botany Teacher Near Me | Offline & Online Classes',
    description:
      'Find expert botany teachers near you. Delhi NCR offline centers + Pan-India online classes.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/botany-teacher-near-me',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Botany Teacher Near Me',
    description: 'Expert botany teachers in Delhi NCR & online across India!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/botany-teacher-near-me',
  },
}

export default function BotanyTeacherNearMeLayout({ children }: { children: React.ReactNode }) {
  return children
}
