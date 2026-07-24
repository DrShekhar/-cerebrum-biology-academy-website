import { Metadata } from 'next'
import { PageContent } from './PageContent'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'
import { NRI_INTERNATIONAL_CITIES } from '@/data/locality-content/nri-international-cities'

const city = NRI_INTERNATIONAL_CITIES['sydney-australia']!

export const metadata: Metadata = {
  title: `NEET Biology Coaching in ${city.city}, ${city.country} | Cerebrum (Live Online)`,
  description: `Live online NEET Biology coaching for Australian-Indian Class 11-12 students in ${city.city}. Schools we serve: ${city.indianSchools.slice(0, 3).join(', ')}. Time-zone-friendly Saturday morning live batch (9-11:30 AM AEDT) + weekday recordings. NRI quota guidance for AIIMS / JIPMER / Manipal / KMC. 98% success rate.`,
  keywords: [
    'NEET coaching Sydney',
    'NEET coaching Australia',
    'online NEET coaching Sydney',
    'NEET tutor Sydney',
    'Indian MBBS pathway Sydney',
    'NRI quota AIIMS Sydney',
    'biology tutor Sydney',
    'Parramatta NEET coaching',
    'Strathfield NEET coaching',
    'Westmead NEET coaching',
    'Pennant Hills NEET coaching',
    'NEET vs UCAT Sydney',
    ...city.indianSchools.map((s) => `${s} NEET`),
  ].join(', '),
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-sydney-australia',
  },
  openGraph: {
    title: `NEET Biology Coaching in ${city.city}, ${city.country} | Cerebrum`,
    description: `Saturday morning live (9-11:30 AM AEDT) + weekday recordings. NRI quota pathway to Indian MBBS. 98% qualification rate.`,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-sydney-australia',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/og-neet-coaching-sydney-australia.jpg',
        width: 1200,
        height: 630,
        alt: 'NEET Coaching Sydney',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `NEET Biology Coaching in ${city.city} — Live Online from India`,
    description: `For Australian-Indian Class 11-12 students. Saturday live + weekday recordings.`,
    creator: '@cerebrumacademy',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/twitter-neet-coaching-sydney-australia.jpg',
        width: 1200,
        height: 630,
        alt: 'Twitter Neet Coaching Sydney Australia — Cerebrum Biology Academy',
      },
    ],
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
