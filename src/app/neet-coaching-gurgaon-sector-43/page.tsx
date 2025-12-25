import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('gurgaon-sector-43')!

export const metadata: Metadata = {
  title: 'NEET Coaching in Sector 43 Gurgaon | Best Biology Classes | Cerebrum Academy',
  description: 'Top NEET coaching for Sector 43 Gurgaon students. Center in Sector 51 (8 min). AIIMS faculty Dr. Shekhar Singh, 98% success. Call 88264-44334!',
  keywords: ['NEET coaching Sector 43 Gurgaon', 'biology classes Sector 43', 'best NEET coaching Gurgaon', 'AIIMS faculty', 'Dr. Shekhar Singh', 'NEET biology Sector 43', 'M2K Corporate Park coaching'],
  openGraph: {
    title: 'NEET Coaching in Sector 43 Gurgaon | Best Biology Classes | Cerebrum Academy',
    description: 'Top NEET coaching for Sector 43 Gurgaon students. Center in Sector 51 (8 min). AIIMS faculty Dr. Shekhar Singh, 98% success. Call 88264-44334!',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-43',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-43',
  },
}

export default function Sector43GurgaonPage() {
  return <CityHubPage data={cityData} />
}
