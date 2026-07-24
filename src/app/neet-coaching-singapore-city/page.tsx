import { Metadata } from 'next'
import { PageContent } from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'
import { NRI_INTERNATIONAL_CITIES } from '@/data/locality-content/nri-international-cities'

const city = NRI_INTERNATIONAL_CITIES['singapore-city-singapore']!

export const metadata: Metadata = {
  title: `NEET Biology Coaching in ${city.city}, ${city.country} | Cerebrum (Live Online)`,
  description: `Live online NEET Biology coaching for Singapore-Indian Class 11-12 students. Schools we serve: ${city.indianSchools.slice(0, 3).join(', ')}. Batch slot: ${city.localBatchSlot}. NRI quota guidance for AIIMS / JIPMER / MMMC Manipal / KMC Mangalore. IB-to-NCERT bridge available. 98% success rate.`,
  keywords: [
    `NEET coaching ${city.city}`,
    'NEET coaching Singapore',
    'online NEET coaching Singapore',
    'NEET tutor Singapore',
    'NEET preparation Singapore',
    'UWCSEA NEET',
    'Global Indian International School Singapore NEET',
    'NPS International School Singapore NEET',
    'GIIS Singapore NEET',
    'Stamford American NEET',
    'Tanglin Trust NEET',
    'NRI quota AIIMS Singapore',
    'biology tutor Singapore',
    'IB-to-NCERT bridge Singapore',
    'MCAT Biology Singapore',
    ...city.indianSchools.map((s) => `${s} NEET`),
  ].join(', '),
  openGraph: {
    title: `NEET Biology Coaching in ${city.city}, ${city.country} | Cerebrum`,
    description: `Live online SGT-time-zone batch (${city.localBatchSlot}). NRI quota guidance, IB-to-NCERT bridge, MCAT Biology track for US premed. 98% success rate.`,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-singapore-city',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/og-neet-coaching-singapore-city.jpg',
        width: 1200,
        height: 630,
        alt: 'Neet Coaching Singapore City — Cerebrum Biology Academy',
      },
    ],
  },
  robots: 'index, follow',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-singapore-city',
    languages: {
      'en-SG': 'https://cerebrumbiologyacademy.com/neet-coaching-singapore-city',
      'en-IN': 'https://cerebrumbiologyacademy.com/neet-coaching-singapore-city',
      'x-default': 'https://cerebrumbiologyacademy.com/neet-coaching-singapore-city',
    },
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: `NEET Biology Coaching in ${city.city} — Live Online from India`,
    description: `For Singapore-Indian students at ${city.indianSchools.slice(0, 2).join(' / ')}. NRI quota + MCAT premed pathways.`,
  },
}

export default function Page() {
  const localityData = {
    name: 'Singapore City, Singapore',
    latitude: 1.3521,
    longitude: 103.8198,
    address: 'Singapore City, Singapore',
  }

  return (
    <>
      <LocalitySchema
        country="SG"
        data={{
          ...localityData,
          phone: '+918826444334',
          email: 'info@cerebrumbiologyacademy.com',
          website: 'https://cerebrumbiologyacademy.com',
          doctor: 'Dr. Shekhar C Singh',
        }}
      />
      <PageContent city="Singapore City" country="Singapore" />
    </>
  )
}
