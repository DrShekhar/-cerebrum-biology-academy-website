import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('rohini-sector-7')!

export const metadata: Metadata = {
  title: 'NEET Coaching Rohini Sector 7 | Best Biology Classes | Cerebrum Academy',
  description:
    'Premium NEET coaching in Rohini Sector 7. Walk to DC Chauk center. AIIMS-trained Dr. Shekhar Singh, 98% success. Call 88264-44334!',
  keywords: [
    'NEET coaching Rohini Sector 7',
    'biology classes Rohini Sector 7',
    'best NEET coaching Rohini',
    'DC Chauk coaching',
    'AIIMS faculty',
    'biology tuition Sector 7',
    'Dr Shekhar Singh Rohini',
    'NEET biology preparation',
    'medical entrance Rohini',
    'top biology coaching',
  ],
  openGraph: {
    title: 'NEET Coaching Rohini Sector 7 | Best Biology Classes | Cerebrum Academy',
    description:
      'Premium NEET coaching in Rohini Sector 7. Walk to DC Chauk center. AIIMS-trained Dr. Shekhar Singh, 98% success. Call 88264-44334!',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-rohini-sector-7',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-rohini-sector-7',
  },
}

export default function RohiniSector7Page() {
  return <CityHubPage data={cityData} />
}
