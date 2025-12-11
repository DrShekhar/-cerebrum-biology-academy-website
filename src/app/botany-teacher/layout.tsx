import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Botany Teacher | Best Botany Teacher for NEET 2025',
  description:
    'Looking for the best botany teacher? Expert AIIMS-trained faculty specializing in Plant Biology. Master Plant Physiology, Plant Kingdom & Ecology. 45% of NEET Biology is Botany!',
  keywords: [
    'botany teacher',
    'best botany teacher',
    'botany faculty',
    'plant biology teacher',
    'botany expert',
    'botany teacher for neet',
    'best botany teacher for neet',
    'botany tutor',
    'botany coaching',
  ],
  openGraph: {
    title: 'Best Botany Teacher | AIIMS-Trained Faculty',
    description:
      'Expert botany teaching focusing on Plant Physiology & Ecology. 45% NEET weightage!',
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cerebrumbiologyacademy.com/botany-teacher',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Botany Teacher',
    description: 'AIIMS-trained faculty specializing in Botany. 45% of NEET Biology covered!',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/botany-teacher',
  },
}

export default function BotanyTeacherLayout({ children }: { children: React.ReactNode }) {
  return children
}
