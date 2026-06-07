import { Metadata } from 'next'
import { PageContent } from './PageContent'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'
import { NRI_INTERNATIONAL_CITIES } from '@/data/locality-content/nri-international-cities'

const city = NRI_INTERNATIONAL_CITIES['melbourne-australia']!

export const metadata: Metadata = {
  title: `NEET Biology Coaching in ${city.city}, ${city.country} | Cerebrum (Live Online)`,
  description: `Live online NEET Biology coaching for Melbourne-Indian Class 11-12 students. Feeder schools: ${city.indianSchools.slice(0, 3).join(', ')}. Time-zone-friendly Saturday morning live batch (9-11:30 AM AEDT) + weekday recordings. NRI quota guidance for AIIMS / JIPMER / Manipal / KMC. GAMSAT B Section also available. 98% success rate.`,
  keywords: [
    'NEET coaching Melbourne',
    'NEET coaching Australia',
    'online NEET coaching Melbourne',
    'NEET tutor Melbourne',
    'Indian MBBS pathway Melbourne',
    'NRI quota AIIMS Melbourne',
    'biology tutor Melbourne',
    'Wyndham NEET coaching',
    'Casey NEET coaching',
    'Hume NEET coaching',
    'NEET vs GAMSAT Melbourne',
    'Monash University biology',
    ...city.indianSchools.map((s) => `${s} NEET`),
  ].join(', '),
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-melbourne-australia',
  },
  openGraph: {
    title: `NEET Biology Coaching in ${city.city}, ${city.country} | Cerebrum`,
    description: `Saturday morning live (9-11:30 AM AEDT) + weekday recordings. NRI quota pathway. 98% qualification rate.`,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-melbourne-australia',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/og-neet-coaching-melbourne-australia.jpg',
        width: 1200,
        height: 630,
        alt: 'NEET Coaching Melbourne',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `NEET Biology Coaching in ${city.city} — Live Online from India`,
    description: `For Melbourne-Indian Class 11-12 students. Saturday live + weekday recordings.`,
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
