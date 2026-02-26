import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Online Biology Tutor for NEET | Expert NEET Biology Classes Online',
  description:
    'Get expert online biology tutoring for NEET preparation. Live 1-on-1 classes with AIIMS-trained faculty. Flexible scheduling, personalized study plans. Start your free demo today!',
  openGraph: {
    title: 'Online Biology Tutor for NEET | Expert NEET Biology Classes Online',
    description:
      'Get expert online biology tutoring for NEET preparation. Live 1-on-1 classes with AIIMS-trained faculty. Flexible scheduling, personalized study plans. Start your free demo today!',
    url: 'https://cerebrumbiologyacademy.com/online-biology-tutor-neet',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/online-biology-tutor-neet',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
