import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tutor Online | Online Biology Tuition - Cerebrum Biology Academy',
  description:
    'Find the best biology tutor online for personalized learning. Online biology tuition with 1-on-1 mentoring, flexible scheduling, progress tracking. CBSE, ICSE, NEET preparation. Book free demo!',
  keywords: [
    'biology tutor online',
    'online biology tuition',
    'biology tuition online',
    'biology teacher web',
    'online biology tutoring',
    'virtual biology tutor',
    'private biology tutor online',
    'biology home tuition online',
    'online biology tutor india',
  ],
  openGraph: {
    title: 'Biology Tutor Online | Personalized Online Biology Tuition',
    description:
      'Expert biology tutor online with personalized attention. 1-on-1 sessions, flexible timing, progress tracking. 60% lower cost than home tutors.',
    url: 'https://cerebrumbiologyacademy.com/biology-tutor-online',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Biology Tutor Online',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Tutor Online | Cerebrum Biology Academy',
    description:
      'Personalized online biology tuition with expert tutors. Flexible scheduling, progress tracking.',
    images: ['https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=630&fit=crop'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tutor-online',
  },
}

export default function BiologyTutorOnlineLayout({ children }: { children: React.ReactNode }) {
  return children
}
