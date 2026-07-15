import { Metadata } from 'next'
import { PageContent } from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'
import { NRI_INTERNATIONAL_CITIES } from '@/data/locality-content/nri-international-cities'

const city = NRI_INTERNATIONAL_CITIES['lagos-nigeria']!

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
    'NEET online Nigeria',
    'Indian Language School Ikoyi NEET',
    'Lekki British International NEET',
    'Dr. Shekhar C Singh Lagos',
    ...city.indianSchools.map((s) => `${s} NEET`),
  ].join(', '),
  openGraph: {
    title: `NEET Biology Coaching in ${city.city}, ${city.country} | Cerebrum`,
    description: `Live online WAT-time-zone batch (${city.localBatchSlot}). NRI quota guidance for ${city.city} Indian families across textiles, pharma, steel sectors. 98% success rate.`,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-lagos-nigeria',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/og-neet-coaching-lagos-nigeria.jpg',
        width: 1200,
        height: 630,
        alt: 'Neet Coaching Lagos Nigeria — Cerebrum Biology Academy',
      },
    ],
  },
  robots: 'index, follow',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-lagos-nigeria',
    languages: {
      'en-NG': 'https://cerebrumbiologyacademy.com/neet-coaching-lagos-nigeria',
      'en-IN': 'https://cerebrumbiologyacademy.com/neet-coaching-lagos-nigeria',
      'x-default': 'https://cerebrumbiologyacademy.com/neet-coaching-lagos-nigeria',
    },
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: `NEET Biology Coaching in ${city.city} — Live Online from India`,
    description: `For Indian-origin students at ${city.indianSchools.slice(0, 2).join(' / ')}. NRI quota pathway to AIIMS / JIPMER.`,
  },
}

export default function Page() {
  const localityData = {
    name: 'Lagos, Nigeria',
    latitude: 6.5244,
    longitude: 3.3792,
    address: 'Lagos, Nigeria',
  }

  return (
    <>
      <LocalitySchema
        country="NG"
        data={{
          ...localityData,
          phone: '+918826444334',
          email: 'shekharcsingh57@gmail.com',
          website: 'https://cerebrumbiologyacademy.com',
          doctor: 'Dr. Shekhar C Singh',
        }}
      />
      <PageContent city="Lagos" country="Nigeria" />
    </>
  )
}
