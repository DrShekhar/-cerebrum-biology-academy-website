import { Metadata } from 'next'
import PageContent from './PageContent'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'
import { NRI_INTERNATIONAL_CITIES } from '@/data/locality-content/nri-international-cities'

const city = NRI_INTERNATIONAL_CITIES['al-wakrah-qatar']!

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
    'Birla Public School Al Wakrah NEET',
    'DPS Modern Indian School NEET',
    'MES Indian School NEET',
    ...city.indianSchools.map((s) => `${s} NEET`),
  ].join(', '),
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-al-wakrah-qatar',
    languages: {
      'en-QA': 'https://cerebrumbiologyacademy.com/neet-coaching-al-wakrah-qatar',
      'en-IN': 'https://cerebrumbiologyacademy.com/neet-coaching-al-wakrah-qatar',
      'x-default': 'https://cerebrumbiologyacademy.com/neet-coaching-al-wakrah-qatar',
    },
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: `NEET Biology Coaching in ${city.city} — Live Online from India`,
    description: `For Indian-origin students at ${city.indianSchools.slice(0, 2).join(' / ')} and other ${city.city} CBSE schools. NRI quota pathway to AIIMS / JIPMER.`,
  },
  openGraph: {
    title: `NEET Biology Coaching in ${city.city}, ${city.country} | Cerebrum`,
    description: `Live online evening batch (${city.localBatchSlot}). NRI quota guidance for Qatar Indian families, NCERT-deep biology, 98% success rate.`,
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
