import { Metadata } from 'next'
import NEETCoachingPageContent from './PageContent'
import { NRI_INTERNATIONAL_CITIES } from '@/data/locality-content/nri-international-cities'

const city = NRI_INTERNATIONAL_CITIES['jakarta-indonesia']!

export const metadata: Metadata = {
  title: `NEET Biology Coaching in ${city.city}, ${city.country} | Cerebrum (Live Online)`,
  description: `Live online NEET Biology coaching for Indian-origin Class 11-12 students in ${city.city}, ${city.country}. Feeder schools: ${city.indianSchools.slice(0, 3).join(', ')}. Batch slot: ${city.localBatchSlot}. NRI quota guidance for AIIMS / JIPMER / Manipal / KMC. 98% success rate.`,
  keywords: [
    `NEET coaching ${city.city}`,
    `NEET coaching ${city.country}`,
    `online NEET coaching ${city.city}`,
    `NEET tutor ${city.city}`,
    `NRI quota AIIMS ${city.country}`,
    `biology tutor ${city.city}`,
    'NEET online Indonesia',
    'Gandhi Memorial International School NEET',
    'Dr. Shekhar C Singh Jakarta',
    ...city.indianSchools.map((s) => `${s} NEET`),
  ],
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-jakarta-indonesia',
    languages: {
      'en-ID': 'https://cerebrumbiologyacademy.com/neet-coaching-jakarta-indonesia',
      'en-IN': 'https://cerebrumbiologyacademy.com/neet-coaching-jakarta-indonesia',
      'x-default': 'https://cerebrumbiologyacademy.com/neet-coaching-jakarta-indonesia',
    },
  },
  openGraph: {
    title: `NEET Biology Coaching in ${city.city}, ${city.country} | Cerebrum`,
    description: `Live online WIB-time-zone batch (${city.localBatchSlot}). NRI quota guidance for Jakarta Indian families, NCERT-deep biology, 98% success rate.`,
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: `NEET Biology Coaching in ${city.city} — Live Online from India`,
    description: `For Indian-origin students at ${city.indianSchools.slice(0, 2).join(' / ')}. NRI quota pathway to AIIMS / JIPMER.`,
  },
}

export default function JakartaNEETCoachingPage() {
  return <NEETCoachingPageContent />
}
