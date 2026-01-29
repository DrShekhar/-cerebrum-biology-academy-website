import { Metadata } from 'next'
import { PushpanjaliEnclavePageContent } from './PushpanjaliEnclavePageContent'

export const metadata: Metadata = {
  title: 'NEET Coaching Pushpanjali Enclave | Biology Classes Pitampura | Cerebrum Academy',
  description:
    'Best NEET coaching for Pushpanjali Enclave students in Pitampura. 8-10 min from Rohini DC Chauk center. AIIMS faculty, 98% success rate. WhatsApp 88264-44334',
  keywords: [
    'NEET coaching pushpanjali enclave',
    'biology tuition pushpanjali pitampura',
    'NEET coaching Pitampura',
    'biology classes Pushpanjali Enclave',
    'NEET preparation Pushpanjali Enclave',
    'DC Chauk biology coaching',
    'Rohini NEET coaching',
    'Dr Shekhar Singh',
    'AIIMS trained faculty',
    'biology coaching Delhi',
    'medical entrance coaching',
    'NEET biology classes Pitampura',
    'Pushpanjali Enclave NEET',
    'Pushpanjali Enclave biology tutor',
    'Co-operative Housing Society Pitampura',
  ],
  openGraph: {
    title: 'NEET Coaching Pushpanjali Enclave | Biology Classes Pitampura | Cerebrum Academy',
    description:
      'Best NEET coaching for Pushpanjali Enclave students in Pitampura. 8-10 min from Rohini DC Chauk center. AIIMS faculty, 98% success rate. WhatsApp 88264-44334',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-pushpanjali-enclave',
    type: 'website',
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching Pushpanjali Enclave | Biology Classes Pitampura | Cerebrum Academy',
    description:
      'Best NEET coaching for Pushpanjali Enclave students. 8-10 min from DC Chauk Rohini. AIIMS faculty, 98% success rate.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-pushpanjali-enclave',
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

export default function PushpanjaliEnclavePage() {
  return <PushpanjaliEnclavePageContent />
}
