import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('rohini-sector-8')!

export const metadata: Metadata = {
  title: 'NEET Coaching Rohini Sector 8 | Biology Classes DC Chauk | Cerebrum Academy',
  description:
    'Top NEET coaching in Rohini Sector 8. DC Chauk center next door. Dr. Shekhar Singh, 1,50,000+ students trained. 98% success. Call 88264-44334!',
  keywords: [
    'NEET coaching Rohini Sector 8',
    'biology classes Rohini Sector 8',
    'best NEET coaching DC Chauk',
    'biology tuition Sector 8',
    'AIIMS trained teacher',
    'Dr Shekhar C Singh',
    'NEET preparation Rohini',
    'medical coaching Delhi',
    'biology classes near me',
    'NEET biology expert',
  ],
  openGraph: {
    title: 'NEET Coaching Rohini Sector 8 | Biology Classes DC Chauk | Cerebrum Academy',
    description:
      'Top NEET coaching in Rohini Sector 8. DC Chauk center next door. Dr. Shekhar Singh, 1,50,000+ students trained. 98% success. Call 88264-44334!',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-rohini-sector-8',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-rohini-sector-8',
  },
}

export default function RohiniSector8Page() {
  return <CityHubPage data={cityData} />
}
