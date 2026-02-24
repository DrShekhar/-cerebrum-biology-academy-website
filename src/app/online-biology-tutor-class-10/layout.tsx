import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Online Biology Tutor for Class 10 | Board + Foundation',
  description:
    'Best online biology tutor for Class 10. Expert coaching for Board exams & NEET foundation. Learn from Dr. Shekhar C Singh, AIIMS Alumnus. Book FREE demo!',
  keywords: [
    'online biology tutor class 10',
    'class 10 biology online tutor',
    'class 10 biology online classes',
    'online biology teacher class 10',
    'class 10 biology tuition online',
    '10th biology online coaching',
    'online biology tutor for 10th class',
    'cbse class 10 biology online tutor',
    'class 10 board exam biology',
  ],
  openGraph: {
    title: 'Online Biology Tutor for Class 10 | Board + Foundation',
    description: 'Expert Class 10 biology tuition. Board exam + NEET foundation!',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/online-biology-tutor-class-10',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Class 10 Online Biology Tutor',
    description: 'Board exam prep + NEET foundation, live classes!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/online-biology-tutor-class-10',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
