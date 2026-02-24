import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Online Biology Tutor for Class 9 | Foundation Course',
  description:
    'Best online biology tutor for Class 9 students. Build strong biology foundation for future NEET preparation. NCERT-based teaching. Book FREE demo!',
  keywords: [
    'online biology tutor class 9',
    'class 9 biology online tutor',
    'class 9 biology online classes',
    'online biology teacher class 9',
    'class 9 biology tuition online',
    '9th biology online coaching',
    'online biology tutor for 9th class',
    'cbse class 9 biology online tutor',
    'class 9 biology foundation course',
  ],
  openGraph: {
    title: 'Online Biology Tutor for Class 9 | Foundation Course',
    description: 'Build strong biology foundation with expert online tutor!',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/online-biology-tutor-class-9',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Class 9 Online Biology Tutor',
    description: 'Expert biology foundation course, live online classes!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/online-biology-tutor-class-9',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
