import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Online NEET Biology Tutor [98% Success Rate] | Dr. Shekhar AIIMS',
  description:
    'Best online NEET Biology tutor in India. Learn from Dr. Shekhar C Singh, AIIMS Alumnus. 67+ AIIMS selections, live classes, NCERT-focused teaching. Book FREE demo!',
  keywords: [
    'online neet biology tutor',
    'neet biology online tutor',
    'online biology tutor for neet',
    'best online neet biology teacher',
    'neet biology online classes',
    'online neet coaching biology',
    'neet biology tutor online india',
    'online neet biology preparation',
    'best online biology coaching for neet',
  ],
  openGraph: {
    title: 'Online NEET Biology Tutor [98% Success Rate]',
    description: 'Learn NEET Biology from AIIMS faculty online. 67+ AIIMS selections!',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/online-biology-tutor-neet',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online NEET Biology Tutor',
    description: 'AIIMS faculty, 98% success rate, live online classes!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/online-biology-tutor-neet',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
