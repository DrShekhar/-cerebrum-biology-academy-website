import { Metadata } from 'next'
import { PageContent } from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'
import { NRI_INTERNATIONAL_CITIES } from '@/data/locality-content/nri-international-cities'

const city = NRI_INTERNATIONAL_CITIES['kathmandu-nepal']!

export const metadata: Metadata = {
  title: `NEET Biology Coaching in ${city.city}, ${city.country} | Cerebrum (Live Online)`,
  description: `Live online NEET Biology coaching for Nepalese and Indian-origin Class 11-12 students in ${city.city}, ${city.country}. Feeder schools: ${city.indianSchools.slice(0, 3).join(', ')}. Batch slot: ${city.localBatchSlot}. Foreign-national + NRI quota guidance for AIIMS / JIPMER / KMC Mangalore. 98% success rate.`,
  keywords: [
    `NEET coaching ${city.city}`,
    `NEET coaching ${city.country}`,
    `online NEET coaching ${city.city}`,
    `NEET tutor ${city.city}`,
    `NEET preparation ${city.country}`,
    'KMC Mangalore Nepalese students',
    'AIIMS foreign-national quota Nepal',
    'MMMC Manipal Nepalese',
    'NEET coaching Nepal NRI quota',
    'Rato Bangala NEET',
    'Modern Indian School Kathmandu NEET',
    ...city.indianSchools.map((s) => `${s} NEET`),
  ].join(', '),
  openGraph: {
    title: `NEET Biology Coaching in ${city.city}, ${city.country} | Cerebrum`,
    description: `Live online NPT-time-zone batch (${city.localBatchSlot}). Foreign-national + NRI quota guidance for Nepalese students. 98% success rate.`,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-kathmandu-nepal',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/og-neet-coaching-kathmandu-nepal.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
  robots: 'index, follow',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-kathmandu-nepal',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: `NEET Biology Coaching in ${city.city} — Live Online from India`,
    description: `For Nepalese + Indian-origin students at ${city.indianSchools.slice(0, 2).join(' / ')}. Foreign-national + NRI quota pathway.`,
  },
}

export default async function Page() {
  const localityData = {
    name: 'Kathmandu, Nepal',
    latitude: 27.7172,
    longitude: 85.324,
    address: 'Kathmandu, Nepal',
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
        skipCourseList
      />
      <PageContent city="Kathmandu" country="Nepal" />
      <NEETNRIPricingTiers />
    </>
  )
}
