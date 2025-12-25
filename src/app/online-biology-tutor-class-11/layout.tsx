import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Online Biology Tutor for Class 11 | NEET + Boards | Cerebrum Academy',
  description:
    'Best online biology tutor for Class 11 students. NCERT-based teaching for NEET & Board exams. Learn from Dr. Shekhar C Singh, AIIMS Alumnus. Book FREE demo!',
  keywords: [
    'online biology tutor class 11',
    'class 11 biology online tutor',
    'class 11 biology online classes',
    'online biology teacher class 11',
    'class 11 biology tuition online',
    '11th biology online coaching',
    'online biology tutor for 11th class',
    'cbse class 11 biology online tutor',
  ],
  openGraph: {
    title: 'Online Biology Tutor for Class 11 | NEET + Boards',
    description: 'Expert Class 11 biology tuition online. NCERT-focused teaching!',
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cerebrumbiologyacademy.com/online-biology-tutor-class-11',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Class 11 Online Biology Tutor',
    description: 'AIIMS faculty, NCERT-based teaching, live classes!',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/online-biology-tutor-class-11',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
