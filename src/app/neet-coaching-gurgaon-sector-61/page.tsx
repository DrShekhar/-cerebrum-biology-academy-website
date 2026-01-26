import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('gurgaon-sector-61')!

export const metadata: Metadata = {
  title: 'NEET Coaching in Sector 61 Gurgaon | Best Biology Classes | Cerebrum Academy',
  description:
    'Top NEET coaching for Sector 61 Gurgaon students. Center in Sector 51 (14 min). AIIMS faculty Dr. Shekhar Singh, 98% success. Call 88264-44334!',
  keywords: [
    'NEET coaching Sector 61 Gurgaon',
    'biology classes Sector 61',
    'best NEET coaching Gurgaon',
    'AIIMS faculty',
    'Dr. Shekhar Singh',
    'NEET biology Sector 61',
  ],
  openGraph: {
    title: 'NEET Coaching in Sector 61 Gurgaon | Best Biology Classes | Cerebrum Academy',
    description:
      'Top NEET coaching for Sector 61 Gurgaon students. Center in Sector 51 (14 min). AIIMS faculty Dr. Shekhar Singh, 98% success. Call 88264-44334!',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-61',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-61',
  },
}

export default function Sector61GurgaonPage() {
  return <CityHubPage data={cityData} />
}
