import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('gurgaon-sector-82')!

export const metadata: Metadata = {
  title: 'NEET Coaching in Sector 82 Gurgaon | Best Biology Classes | Cerebrum Academy',
  description:
    'Top NEET coaching for Sector 82 Gurgaon students. Center in Sector 51 (25 min). AIIMS faculty Dr. Shekhar Singh, 98% success. Call 88264-44334!',
  keywords: [
    'NEET coaching Sector 82 Gurgaon',
    'biology classes Sector 82',
    'best NEET coaching Gurgaon',
    'AIIMS faculty',
    'Dr. Shekhar Singh',
    'NEET biology Sector 82',
    'New Gurgaon coaching',
  ],
  openGraph: {
    title: 'NEET Coaching in Sector 82 Gurgaon | Best Biology Classes | Cerebrum Academy',
    description:
      'Top NEET coaching for Sector 82 Gurgaon students. Center in Sector 51 (25 min). AIIMS faculty Dr. Shekhar Singh, 98% success. Call 88264-44334!',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-82',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-82',
  },
}

export default function Sector82GurgaonPage() {
  return <CityHubPage data={cityData} />
}
