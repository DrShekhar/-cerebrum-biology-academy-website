import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('rohini-sector-22')!

export const metadata: Metadata = {
  title: 'NEET Coaching Rohini Sector 22 | Biology Classes | Cerebrum Academy',
  description:
    'Best NEET coaching near Rohini Sector 22. DC Chauk center via metro. AIIMS faculty, 98% success. 1,50,000+ students taught. Call 88264-44334!',
  keywords: [
    'NEET coaching Rohini Sector 22',
    'biology classes Rohini Sector 22',
    'best NEET coaching Rohini',
    'DC Chauk metro coaching',
    'biology tuition Sector 22',
    'Dr Shekhar C Singh',
    'AIIMS faculty Delhi',
    'NEET preparation Rohini',
    'medical entrance coaching',
    'biology classes near me',
  ],
  openGraph: {
    title: 'NEET Coaching Rohini Sector 22 | Biology Classes | Cerebrum Academy',
    description:
      'Best NEET coaching near Rohini Sector 22. DC Chauk center via metro. AIIMS faculty, 98% success. 1,50,000+ students taught. Call 88264-44334!',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-rohini-sector-22',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-rohini-sector-22',
  },
}

export default function RohiniSector22Page() {
  return <CityHubPage data={cityData} />
}
