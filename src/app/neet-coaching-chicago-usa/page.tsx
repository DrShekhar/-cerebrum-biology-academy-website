import { Metadata } from 'next'
import NEETCoachingPageContent from './PageContent'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'
import { NRI_INTERNATIONAL_CITIES } from '@/data/locality-content/nri-international-cities'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const city = NRI_INTERNATIONAL_CITIES['chicago-usa']!

export const metadata: Metadata = {
  title: `NEET Biology Coaching in ${city.city}, ${city.country} | Cerebrum (Live Online)`,
  description: `Live online NEET Biology coaching for Greater Chicago Indian-origin Class 11-12 students — Naperville, Schaumburg, Aurora, Bartlett, Hoffman Estates. AP Biology + NEET dual prep. CST 6-8:30 AM batch (matches IST evening). NRI quota guidance for AIIMS / JIPMER / Manipal / KMC. MCAT B/B Section track available. 98% success rate.`,
  keywords: [
    'NEET coaching Chicago',
    'NEET coaching USA',
    'NEET coaching Naperville',
    'NEET coaching Schaumburg',
    'NEET coaching Aurora',
    'NEET coaching Bartlett',
    'NEET coaching Hoffman Estates',
    'online NEET coaching Chicago',
    'NEET tutor Chicago',
    'AP Biology + NEET dual prep',
    'Indian MBBS pathway Chicago',
    'NRI quota AIIMS Chicago',
    'MCAT biology Chicago',
    ...city.indianSchools.map((s) => `${s} NEET`),
  ].join(', '),
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-chicago-usa`,
    languages: {
      'en-US': `${BASE_URL}/neet-coaching-chicago-usa`,
      'en-IN': `${BASE_URL}/neet-coaching-chicago-usa`,
    },
  },
  openGraph: {
    title: `NEET Biology Coaching in ${city.city}, ${city.country} | Cerebrum`,
    description: `CST 6-8:30 AM batch + Saturday live. AP Biology + NEET dual prep. NRI quota pathway.`,
    url: `${BASE_URL}/neet-coaching-chicago-usa`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-neet-coaching-chicago-usa.jpg`,
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in Chicago — Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `NEET Biology Coaching in ${city.city}, ${city.country}`,
    description: `For Naperville/Schaumburg/Aurora Indian-American students.`,
    images: [`${BASE_URL}/og-neet-coaching-chicago-usa.jpg`],
  },
}

export default async function ChicagoNEETCoachingPage() {
  return (
    <>
      <NEETCoachingPageContent />
      <NEETNRIPricingTiers />
    </>
  )
}
