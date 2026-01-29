import { Metadata } from 'next'
import { SaraswatiViharPageContent } from './SaraswatiViharPageContent'

export const metadata: Metadata = {
  title: 'NEET Coaching Saraswati Vihar | Biology Classes Pitampura | Cerebrum Academy',
  description:
    'Best NEET coaching for Saraswati Vihar students in Pitampura. 5-10 min from Rohini DC Chauk center. AIIMS faculty, 98% success rate. WhatsApp 88264-44334',
  keywords: [
    'NEET coaching saraswati vihar',
    'biology tuition saraswati vihar pitampura',
    'NEET coaching Pitampura',
    'biology classes Saraswati Vihar',
    'NEET preparation Saraswati Vihar',
    'DC Chauk biology coaching',
    'Rohini NEET coaching',
    'Dr Shekhar Singh',
    'AIIMS trained faculty',
    'biology coaching Delhi',
    'medical entrance coaching',
    'NEET biology classes Pitampura',
    'Saraswati Vihar Block A NEET',
    'Saraswati Vihar Block B NEET',
    'Saraswati Vihar Block C NEET',
    'Saraswati Vihar Block D NEET',
    'Saraswati Vihar Block E NEET',
  ],
  openGraph: {
    title: 'NEET Coaching Saraswati Vihar | Biology Classes Pitampura | Cerebrum Academy',
    description:
      'Best NEET coaching for Saraswati Vihar students in Pitampura. 5-10 min from Rohini DC Chauk center. AIIMS faculty, 98% success rate. WhatsApp 88264-44334',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-saraswati-vihar',
    type: 'website',
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching Saraswati Vihar | Biology Classes Pitampura | Cerebrum Academy',
    description:
      'Best NEET coaching for Saraswati Vihar students. 5-10 min from DC Chauk Rohini. AIIMS faculty, 98% success rate.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-saraswati-vihar',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function SaraswatiViharPage() {
  return <SaraswatiViharPageContent />
}
