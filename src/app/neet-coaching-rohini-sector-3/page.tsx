import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('rohini-sector-3')!

export const metadata: Metadata = {
  title: 'NEET Coaching Rohini Sector 3 | Best Biology Classes | Cerebrum Academy',
  description:
    'Top NEET coaching in Rohini Sector 3. Just 5 min from DC Chauk center. AIIMS faculty, 98% success rate. Call 88264-44334 for free demo class!',
  keywords: [
    'NEET coaching Rohini Sector 3',
    'biology classes Rohini Sector 3',
    'best NEET coaching Rohini',
    'DC Chauk coaching center',
    'AIIMS faculty Rohini',
    'biology tuition Sector 3',
    'Dr Shekhar Singh',
    'NEET preparation Rohini',
    'medical entrance coaching',
    'biology coaching near me',
  ],
  openGraph: {
    title: 'NEET Coaching Rohini Sector 3 | Best Biology Classes | Cerebrum Academy',
    description:
      'Top NEET coaching in Rohini Sector 3. Just 5 min from DC Chauk center. AIIMS faculty, 98% success rate. Call 88264-44334 for free demo class!',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-rohini-sector-3',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-rohini-sector-3',
  },
}

export default function RohiniSector3Page() {
  return <CityHubPage data={cityData} />
}
