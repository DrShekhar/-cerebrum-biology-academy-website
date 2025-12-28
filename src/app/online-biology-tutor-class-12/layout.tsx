import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Online Biology Tutor for Class 12 | NEET + Board Exams | Cerebrum',
  description:
    'Best online biology tutor for Class 12. Expert coaching for NEET 2026 & Board exams. Learn from Dr. Shekhar C Singh, AIIMS Alumnus. Book FREE demo today!',
  keywords: [
    'online biology tutor class 12',
    'class 12 biology online tutor',
    'class 12 biology online classes',
    'online biology teacher class 12',
    'class 12 biology tuition online',
    '12th biology online coaching',
    'online biology tutor for 12th class',
    'cbse class 12 biology online tutor',
    'class 12 neet biology online',
  ],
  openGraph: {
    title: 'Online Biology Tutor for Class 12 | NEET + Boards',
    description: 'Expert Class 12 biology tuition. NEET + Board exam preparation online!',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/online-biology-tutor-class-12',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Class 12 Online Biology Tutor',
    description: 'AIIMS faculty, NEET + Board prep, live classes!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/online-biology-tutor-class-12',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
