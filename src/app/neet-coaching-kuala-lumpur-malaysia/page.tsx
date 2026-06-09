import { Metadata } from 'next'
import { PageContent } from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'
import { NRI_INTERNATIONAL_CITIES } from '@/data/locality-content/nri-international-cities'

const city = NRI_INTERNATIONAL_CITIES['kuala-lumpur-malaysia']!

export const metadata: Metadata = {
  title: `NEET Biology Coaching in ${city.city}, ${city.country} | Cerebrum (Live Online)`,
  description: `Live online NEET Biology coaching for Malaysian-Indian Class 11-12 students in ${city.city}, ${city.country}. Feeder schools: ${city.indianSchools.slice(0, 3).join(', ')}. Batch slot: ${city.localBatchSlot}. NRI quota guidance for AIIMS / JIPMER / MMMC Manipal / KMC Mangalore. 98% success rate.`,
  keywords: [
    `NEET coaching ${city.city}`,
    `NEET coaching ${city.country}`,
    'NEET coaching KL',
    `online NEET coaching ${city.city}`,
    `NEET tutor ${city.city}`,
    'NRI quota AIIMS Malaysia',
    'biology tutor Kuala Lumpur',
    'NEET coaching Malaysia',
    'Global Indian International School KL NEET',
    'International Indian School Malaysia NEET',
    'IISM NEET',
    'GIIS KL NEET',
    'Manipal Melaka MBBS',
    'Tamil-medium NEET bridge',
    ...city.indianSchools.map((s) => `${s} NEET`),
  ].join(', '),
  openGraph: {
    title: `NEET Biology Coaching in ${city.city}, ${city.country} | Cerebrum`,
    description: `Live online MYT-time-zone batch (${city.localBatchSlot}). NRI quota guidance for Malaysian-Indian families. Tamil-medium NCERT bridge available. 98% success rate.`,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-kuala-lumpur-malaysia',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/og-neet-coaching-kuala-lumpur-malaysia.jpg',
        width: 1200,
        height: 630,
        alt: 'Neet Coaching Kuala Lumpur Malaysia — Cerebrum Biology Academy',
      },
    ],
  },
  robots: 'index, follow',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-kuala-lumpur-malaysia',
    languages: {
      'en-MY': 'https://cerebrumbiologyacademy.com/neet-coaching-kuala-lumpur-malaysia',
      'en-IN': 'https://cerebrumbiologyacademy.com/neet-coaching-kuala-lumpur-malaysia',
      'x-default': 'https://cerebrumbiologyacademy.com/neet-coaching-kuala-lumpur-malaysia',
    },
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: `NEET Biology Coaching in ${city.city} — Live Online from India`,
    description: `For Malaysian-Indian students at ${city.indianSchools.slice(0, 2).join(' / ')}. NRI quota + Manipal Melaka pathway.`,
  },
}

export default async function Page() {
  const localityData = {
    name: 'Kuala Lumpur, Malaysia',
    latitude: 3.139,
    longitude: 101.6869,
    address: 'Kuala Lumpur, Malaysia',
  }

  return (
    <>
      <LocalitySchema
        data={{
          ...localityData,
          phone: '+918826444334',
          email: 'info@cerebrumbiologyacademy.com',
          website: 'https://cerebrumbiologyacademy.com',
          doctor: 'Dr. Shekhar C Singh',
        }}
      />
      <PageContent city="Kuala Lumpur" country="Malaysia" />
      <NEETNRIPricingTiers />
    </>
  )
}
