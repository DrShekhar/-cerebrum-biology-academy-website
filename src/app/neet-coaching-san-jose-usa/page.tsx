import { Metadata } from 'next'
import NEETCoachingPageContent from './PageContent'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'
import { NRI_INTERNATIONAL_CITIES } from '@/data/locality-content/nri-international-cities'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const city = NRI_INTERNATIONAL_CITIES['san-jose-usa']!

export const metadata: Metadata = {
  title: `NEET Biology Coaching in ${city.city}, Silicon Valley | Cerebrum (Live Online)`,
  description: `Live online NEET Biology coaching for Bay Area Indian-origin Class 11-12 students — San Jose, Cupertino, Fremont, Sunnyvale, Mountain View, Palo Alto, Milpitas. Feeder schools: Lynbrook, Monta Vista, Mission San Jose, Saratoga, Harker. AP Biology + NEET dual prep. PST Saturday morning live (9-11:30 AM). NRI quota guidance. MCAT B/B track. 98% success rate.`,
  keywords: [
    'NEET coaching San Jose',
    'NEET coaching Silicon Valley',
    'NEET coaching Bay Area',
    'NEET coaching Cupertino',
    'NEET coaching Fremont',
    'NEET coaching Sunnyvale',
    'NEET coaching Mountain View',
    'NEET coaching Palo Alto',
    'NEET coaching Milpitas',
    'Lynbrook HS NEET',
    'Monta Vista NEET',
    'Mission San Jose NEET',
    'Saratoga HS NEET',
    'Harker School NEET',
    'online NEET coaching San Jose',
    'NEET tutor Bay Area',
    'AP Biology + NEET dual prep',
    'NRI quota AIIMS Bay Area',
    'MCAT biology Silicon Valley',
    'Stanford premed vs NEET',
    'UC Berkeley premed vs Indian MBBS',
  ].join(', '),
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-san-jose-usa`,
    languages: {
      'en-US': `${BASE_URL}/neet-coaching-san-jose-usa`,
      'en-IN': `${BASE_URL}/neet-coaching-san-jose-usa`,
    },
  },
  openGraph: {
    title: `NEET Biology Coaching in ${city.city}, Silicon Valley | Cerebrum`,
    description: `Saturday morning live (9-11:30 AM PST). For Lynbrook/Monta Vista/Mission/Saratoga/Harker students.`,
    url: `${BASE_URL}/neet-coaching-san-jose-usa`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-neet-coaching-san-jose-usa.jpg`,
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in San Jose / Silicon Valley — Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `NEET Biology Coaching in ${city.city} / Silicon Valley`,
    description: `For Lynbrook/Monta Vista/Mission San Jose Bay Area Indian-American students.`,
    images: [`${BASE_URL}/og-neet-coaching-san-jose-usa.jpg`],
  },
}

export default async function SanJoseNEETCoachingPage() {
  return (
    <>
      <NEETCoachingPageContent />
      <NEETNRIPricingTiers />
    </>
  )
}
