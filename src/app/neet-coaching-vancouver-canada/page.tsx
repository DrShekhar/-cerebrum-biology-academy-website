import { Metadata } from 'next'
import { PageContent } from './PageContent'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'
import { NRI_INTERNATIONAL_CITIES } from '@/data/locality-content/nri-international-cities'

const city = NRI_INTERNATIONAL_CITIES['vancouver-canada']!

export const metadata: Metadata = {
  title: `NEET Biology Coaching in ${city.city}, ${city.country} | Cerebrum (Live Online)`,
  description: `Live online NEET Biology coaching for Greater Vancouver Indian Class 11-12 students — Surrey, Burnaby, Richmond, Coquitlam. Time-zone-friendly Saturday morning live batch (9-11:30 AM PST) + weekday recordings. NRI quota guidance for AIIMS / JIPMER / Manipal / KMC. MCAT B/B Section track available. 98% success rate.`,
  keywords: [
    'NEET coaching Vancouver',
    'NEET coaching Canada',
    'NEET coaching Surrey',
    'NEET coaching Burnaby',
    'NEET coaching Richmond BC',
    'NEET coaching Coquitlam',
    'NEET coaching Greater Vancouver',
    'online NEET coaching Vancouver',
    'NEET tutor Vancouver',
    'Indian MBBS pathway Vancouver',
    'NRI quota AIIMS Vancouver',
    'MCAT biology Vancouver',
    'UBC Medicine vs NEET',
    'biology tutor Surrey',
    'Surrey Indian community NEET',
  ].join(', '),
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-vancouver-canada',
  },
  openGraph: {
    title: `NEET Biology Coaching in ${city.city}, ${city.country} | Cerebrum`,
    description: `Saturday morning live (9-11:30 AM PST) + weekday recordings. NRI quota + MCAT B/B track. 98% qualification.`,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-vancouver-canada',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/og-neet-coaching-vancouver-canada.jpg',
        width: 1200,
        height: 630,
        alt: 'NEET Coaching Vancouver',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `NEET Biology Coaching in ${city.city} — Live Online from India`,
    description: `For Greater Vancouver Indian-origin students. Surrey-heavy student base.`,
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
