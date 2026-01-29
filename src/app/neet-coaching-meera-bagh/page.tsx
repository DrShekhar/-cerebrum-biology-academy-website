import { Metadata } from 'next'
import { NEETCoachingMeeraBaghContent } from './MeeraBaghContent'

export const metadata: Metadata = {
  title: 'NEET Coaching Meera Bagh | Biology Classes Paschim Vihar | Cerebrum Academy',
  description:
    'Best NEET coaching in Meera Bagh, Paschim Vihar. Premium residential area near Virat Kohli residence. AIIMS faculty, 98% success rate. Only 15-20 min from Rohini center. Book free demo!',
  keywords: [
    'NEET coaching meera bagh',
    'biology tuition meera bagh paschim vihar',
    'NEET classes meera bagh',
    'biology coaching meera bagh',
    'NEET preparation paschim vihar',
    'biology tutor meera bagh',
    'medical entrance coaching meera bagh',
    'NEET biology classes paschim vihar',
    'best NEET coaching west delhi',
    'meera bagh coaching center',
    'AIIMS faculty paschim vihar',
    'Dr Shekhar C Singh',
  ],
  openGraph: {
    title: 'NEET Coaching Meera Bagh | Biology Classes Paschim Vihar | Cerebrum Academy',
    description:
      'Best NEET coaching in Meera Bagh, Paschim Vihar. Premium residential area near Virat Kohli residence. AIIMS faculty, 98% success rate. Book free demo!',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-meera-bagh',
    type: 'website',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/og-neet-coaching-meera-bagh.jpg',
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in Meera Bagh, Paschim Vihar',
      },
    ],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-meera-bagh',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function NEETCoachingMeeraBaghPage() {
  return <NEETCoachingMeeraBaghContent />
}
