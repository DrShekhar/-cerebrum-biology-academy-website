import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('rohini-sector-15')!

export const metadata: Metadata = {
  title: 'NEET Coaching Rohini Sector 15 | Biology Classes | Cerebrum Academy',
  description:
    'Best NEET coaching near Rohini Sector 15. DC Chauk center 10 min away. AIIMS faculty, small batches, 98% success. Call 88264-44334 for demo!',
  keywords: [
    'NEET coaching Rohini Sector 15',
    'biology classes Rohini Sector 15',
    'best NEET coaching Rohini',
    'DC Chauk metro coaching',
    'biology tuition Sector 15',
    'Dr Shekhar C Singh',
    'AIIMS faculty Rohini',
    'NEET preparation Delhi',
    'medical entrance coaching',
    'biology coaching near me',
  ],
  openGraph: {
    title: 'NEET Coaching Rohini Sector 15 | Biology Classes | Cerebrum Academy',
    description:
      'Best NEET coaching near Rohini Sector 15. DC Chauk center 10 min away. AIIMS faculty, small batches, 98% success. Call 88264-44334 for demo!',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-rohini-sector-15',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-rohini-sector-15',
  },
}

export default function RohiniSector15Page() {
  return <CityHubPage data={cityData} />
}
