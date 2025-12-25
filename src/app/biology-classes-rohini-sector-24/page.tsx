import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('rohini-sector-24')!

export const metadata: Metadata = {
  title: 'Biology Classes Rohini Sector 24 | NEET Coaching | Cerebrum Academy',
  description:
    'Top biology classes near Rohini Sector 24. Metro to DC Chauk center. Expert faculty, 98% NEET success. Small batches. Call 88264-44334!',
  keywords: [
    'biology classes Rohini Sector 24',
    'NEET coaching Rohini Sector 24',
    'best biology tuition Rohini',
    'DC Chauk biology coaching',
    'NEET preparation Sector 24',
    'Dr Shekhar Singh',
    'AIIMS faculty Rohini',
    'biology coaching Delhi',
    'medical entrance coaching',
    'NEET biology classes',
  ],
  openGraph: {
    title: 'Biology Classes Rohini Sector 24 | NEET Coaching | Cerebrum Academy',
    description:
      'Top biology classes near Rohini Sector 24. Metro to DC Chauk center. Expert faculty, 98% NEET success. Small batches. Call 88264-44334!',
    url: 'https://cerebrumbiologyacademy.com/biology-classes-rohini-sector-24',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-rohini-sector-24',
  },
}

export default function RohiniSector24Page() {
  return <CityHubPage data={cityData} />
}
