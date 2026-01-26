import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Online Biology Tutor in India [98% Success Rate] | Cerebrum Academy',
  description:
    'Learn Biology online from Dr. Shekhar C Singh, AIIMS Alumnus. Expert online biology tutor for NEET, Class 11-12, and Board exams. Live interactive classes, personalized attention. Book FREE demo!',
  keywords: [
    'online biology tutor',
    'online biology tutor india',
    'best online biology tutor',
    'online biology tuition',
    'biology tutor online',
    'online biology classes',
    'online biology teacher',
    'biology online coaching',
    'best online biology teacher india',
    'neet biology online tutor',
    'class 11 biology online tutor',
    'class 12 biology online tutor',
  ],
  openGraph: {
    title: 'Best Online Biology Tutor in India [98% Success Rate]',
    description:
      'Learn from AIIMS Alumnus Dr. Shekhar C Singh. Live interactive online biology classes for NEET & Boards!',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/online-biology-tutor',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Online Biology Tutor in India',
    description: 'AIIMS faculty, 98% success rate, live interactive classes!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/online-biology-tutor',
  },
}

export default function OnlineBiologyTutorLayout({ children }: { children: React.ReactNode }) {
  return children
}
