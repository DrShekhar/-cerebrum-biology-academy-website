import { Metadata } from 'next'
import PageContent from './PageContent'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'
import { NRI_INTERNATIONAL_CITIES } from '@/data/locality-content/nri-international-cities'

const city = NRI_INTERNATIONAL_CITIES['al-khobar-saudi-arabia']!

export const metadata: Metadata = {
  title: `NEET Biology Coaching in ${city.city}, ${city.country} | Cerebrum (Live Online)`,
  description: `Live online NEET Biology coaching for Indian-origin Class 11-12 students in ${city.city}, ${city.country}. Schools we serve: ${city.indianSchools.slice(0, 3).join(', ')}. Batch slot: ${city.localBatchSlot}. NRI quota guidance for AIIMS / JIPMER / Manipal / KMC. 98% success rate.`,
  keywords: [
    `NEET coaching ${city.city}`,
    `NEET coaching ${city.country}`,
    `online NEET coaching ${city.city}`,
    `NEET tutor ${city.city}`,
    `NRI quota AIIMS ${city.country}`,
    `biology tutor ${city.city}`,
    'International Indian School Dammam NEET',
    'IISD NEET',
    'Bhavans Saudi NEET',
    ...city.indianSchools.map((s) => `${s} NEET`),
  ].join(', '),
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-al-khobar-saudi-arabia',
    languages: {
      'en-SA': 'https://cerebrumbiologyacademy.com/neet-coaching-al-khobar-saudi-arabia',
      'en-IN': 'https://cerebrumbiologyacademy.com/neet-coaching-al-khobar-saudi-arabia',
      'x-default': 'https://cerebrumbiologyacademy.com/neet-coaching-al-khobar-saudi-arabia',
    },
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: `NEET Biology Coaching in ${city.city} — Live Online from India`,
    description: `For Indian-origin Eastern Province students at ${city.indianSchools.slice(0, 2).join(' / ')}. NRI quota pathway to AIIMS Delhi / JIPMER.`,
  },
  openGraph: {
    title: `NEET Biology Coaching in ${city.city}, ${city.country} | Cerebrum`,
    description: `Live online evening batch (${city.localBatchSlot}). Ramadan-adjusted schedule available. NRI quota guidance for Saudi Indian families. 98% success rate.`,
    type: 'website',
    locale: 'en_IN',
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
