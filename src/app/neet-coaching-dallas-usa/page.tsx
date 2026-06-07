import { Metadata } from 'next'
import NEETCoachingPageContent from './PageContent'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'
import { NRI_INTERNATIONAL_CITIES } from '@/data/locality-content/nri-international-cities'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const city = NRI_INTERNATIONAL_CITIES['dallas-usa']!

export const metadata: Metadata = {
  title: `NEET Biology Coaching in ${city.city}, ${city.country} | Cerebrum (Live Online)`,
  description: `Live online NEET Biology coaching for Dallas-Fort Worth Indian-origin Class 11-12 students — Plano, Frisco, Irving, Carrollton, Coppell, Allen. AP Biology + NEET dual prep. CST 6-8:30 AM batch (matches IST evening). NRI quota guidance for AIIMS / JIPMER / Manipal / KMC. MCAT B/B track available. 98% success rate.`,
  keywords: [
    'NEET coaching Dallas',
    'NEET coaching DFW',
    'NEET coaching USA',
    'NEET coaching Plano',
    'NEET coaching Frisco',
    'NEET coaching Irving',
    'NEET coaching Carrollton',
    'NEET coaching Coppell',
    'NEET coaching Allen',
    'online NEET coaching Dallas',
    'NEET tutor Dallas',
    'AP Biology + NEET dual prep',
    'Indian MBBS pathway Dallas',
    'NRI quota AIIMS Dallas',
    'MCAT biology Dallas',
    'UT Austin premed vs NEET',
    'UTSW premed vs Indian MBBS',
    ...city.indianSchools.map((s) => `${s} NEET`),
  ].join(', '),
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-dallas-usa`,
    languages: {
      'en-US': `${BASE_URL}/neet-coaching-dallas-usa`,
      'en-IN': `${BASE_URL}/neet-coaching-dallas-usa`,
    },
  },
  openGraph: {
    title: `NEET Biology Coaching in ${city.city}, ${city.country} | Cerebrum`,
    description: `CST 6-8:30 AM batch + Saturday live. Plano/Frisco/Coppell student concentration. NRI quota pathway.`,
    url: `${BASE_URL}/neet-coaching-dallas-usa`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-neet-coaching-dallas-usa.jpg`,
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in Dallas — Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `NEET Biology Coaching in ${city.city}, ${city.country}`,
    description: `For Plano/Frisco/Coppell Indian-American students.`,
    images: [`${BASE_URL}/og-neet-coaching-dallas-usa.jpg`],
  },
}

export default async function DallasNEETCoachingPage() {
  return (
    <>
      <NEETCoachingPageContent />
      <NEETNRIPricingTiers />
    </>
  )
}
