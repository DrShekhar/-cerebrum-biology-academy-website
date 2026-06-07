import { Metadata } from 'next'
import PageContent from './PageContent'
import { NRI_INTERNATIONAL_CITIES } from '@/data/locality-content/nri-international-cities'

const city = NRI_INTERNATIONAL_CITIES['dar-es-salaam-tanzania']!

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
    'Hindu Mandal Academy NEET',
    'Aga Khan Mzizima NEET',
    ...city.indianSchools.map((s) => `${s} NEET`),
  ].join(', '),
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-dar-es-salaam-tanzania',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: `NEET Biology Coaching in ${city.city} — Live Online from India`,
    description: `For Indian-origin students at ${city.indianSchools.slice(0, 2).join(' / ')} and other ${city.city} schools. NRI quota pathway to AIIMS / JIPMER.`,
  },
  openGraph: {
    title: `NEET Biology Coaching in ${city.city}, ${city.country} | Cerebrum`,
    description: `Live online evening batch (${city.localBatchSlot}). NRI quota guidance, NCERT-deep biology, 98% success rate. ${city.indianCommunitySize}.`,
    type: 'website',
    locale: 'en_IN',
  },
}

export default function Page() {
  return <PageContent />
}
