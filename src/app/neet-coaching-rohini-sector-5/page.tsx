import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('rohini-sector-5')!

export const metadata: Metadata = {
  title: 'NEET Coaching Rohini Sector 5 | Biology Classes DC Chauk | Cerebrum Academy',
  description:
    'Best NEET coaching near Rohini Sector 5. DC Chauk center just 3 min away. Expert biology faculty, 98% success. Book free demo - 88264-44334!',
  keywords: [
    'NEET coaching Rohini Sector 5',
    'biology classes Rohini Sector 5',
    'best NEET coaching Rohini',
    'DC Chauk biology coaching',
    'AIIMS trained faculty',
    'biology tuition Sector 5',
    'Dr Shekhar C Singh',
    'NEET preparation Rohini',
    'medical coaching Rohini',
    'biology coaching near me',
  ],
  openGraph: {
    title: 'NEET Coaching Rohini Sector 5 | Biology Classes DC Chauk | Cerebrum Academy',
    description:
      'Best NEET coaching near Rohini Sector 5. DC Chauk center just 3 min away. Expert biology faculty, 98% success. Book free demo - 88264-44334!',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-rohini-sector-5',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-rohini-sector-5',
  },
}

export default function RohiniSector5Page() {
  return <CityHubPage data={cityData} />
}
