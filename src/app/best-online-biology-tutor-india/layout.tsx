import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Online Biology Tutor in India [#1 Rated] | Cerebrum Academy',
  description:
    'India\'s #1 online biology tutor - Dr. Shekhar C Singh, AIIMS Alumnus. 5000+ students, 98% success rate, pan-India coverage. NEET, Board exams, Class 9-12. Book FREE demo!',
  keywords: [
    'best online biology tutor in india',
    'online biology tutor india',
    'best biology tutor online india',
    'top online biology teacher india',
    'india best online biology coaching',
    'online biology classes india',
    'best online biology tuition india',
    'pan india online biology tutor',
    'online biology teacher for neet india',
  ],
  openGraph: {
    title: 'Best Online Biology Tutor in India [#1 Rated]',
    description: 'India\'s top-rated online biology tutor. 5000+ students, 98% success!',
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cerebrumbiologyacademy.com/best-online-biology-tutor-india',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Online Biology Tutor in India',
    description: '#1 rated, AIIMS faculty, 5000+ students trained!',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/best-online-biology-tutor-india',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
