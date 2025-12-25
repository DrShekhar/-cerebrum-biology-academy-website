import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('rohini-sector-11')!

export const metadata: Metadata = {
  title: 'Biology Classes Rohini Sector 11 | NEET Coaching | Cerebrum Academy',
  description:
    'Best biology classes in Rohini Sector 11. Just 5 min from DC Chauk. AIIMS faculty, 98% NEET success. Small batches. Call 88264-44334!',
  keywords: [
    'biology classes Rohini Sector 11',
    'NEET coaching Rohini Sector 11',
    'best biology tuition Rohini',
    'DC Chauk biology classes',
    'NEET preparation Sector 11',
    'Dr Shekhar Singh',
    'AIIMS faculty Rohini',
    'biology coaching near me',
    'medical entrance coaching',
    'NEET biology classes',
  ],
  openGraph: {
    title: 'Biology Classes Rohini Sector 11 | NEET Coaching | Cerebrum Academy',
    description:
      'Best biology classes in Rohini Sector 11. Just 5 min from DC Chauk. AIIMS faculty, 98% NEET success. Small batches. Call 88264-44334!',
    url: 'https://cerebrumbiologyacademy.com/biology-classes-rohini-sector-11',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-rohini-sector-11',
  },
}

export default function RohiniSector11Page() {
  return <CityHubPage data={cityData} />
}
