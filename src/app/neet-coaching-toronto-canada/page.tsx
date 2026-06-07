import { Metadata } from 'next'
import { PageContent } from './PageContent'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'
import { NRI_INTERNATIONAL_CITIES } from '@/data/locality-content/nri-international-cities'

const city = NRI_INTERNATIONAL_CITIES['toronto-canada']!

export const metadata: Metadata = {
  title: `NEET Biology Coaching in ${city.city}, ${city.country} | Cerebrum (Live Online)`,
  description: `Live online NEET Biology coaching for GTA-Indian Class 11-12 students in ${city.city}, Mississauga, Brampton, Markham. Time-zone-friendly EST 7-9:30 AM batch (matches IST evening) + Saturday morning live. NRI quota guidance for AIIMS / JIPMER / Manipal / KMC. MCAT B/B Section track also available. 98% success rate.`,
  keywords: [
    'NEET coaching Toronto',
    'NEET coaching Canada',
    'NEET coaching GTA',
    'NEET coaching Mississauga',
    'NEET coaching Brampton',
    'NEET coaching Markham',
    'NEET coaching Scarborough',
    'NEET coaching Vaughan',
    'online NEET coaching Toronto',
    'NEET tutor Toronto',
    'Indian MBBS pathway Toronto',
    'NRI quota AIIMS Toronto',
    'MCAT biology Toronto',
    'biology tutor Toronto',
    'McMaster MD vs NEET',
    'U of T medicine vs Indian MBBS',
  ].join(', '),
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-toronto-canada',
  },
  openGraph: {
    title: `NEET Biology Coaching in ${city.city}, ${city.country} | Cerebrum`,
    description: `EST 7-9:30 AM batch (matches IST evening) + Saturday live. NRI quota + MCAT B/B track. 98% qualification.`,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-toronto-canada',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/og-neet-coaching-toronto-canada.jpg',
        width: 1200,
        height: 630,
        alt: 'NEET Coaching Toronto',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `NEET Biology Coaching in ${city.city} — Live Online from India`,
    description: `For GTA Indian-origin students. EST early-morning batch + Saturday live.`,
    creator: '@cerebrumacademy',
  },
}

export default async function Page() {
  return (
    <>
      <PageContent />
      <NEETNRIPricingTiers />
    </>
  )
}
