import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('rohini-sector-13')!

export const metadata: Metadata = {
  title: 'Biology Classes Rohini Sector 13 | NEET Coaching | Cerebrum Academy',
  description:
    'Top biology classes near Rohini Sector 13. DC Chauk center 7 min away. Expert faculty, 98% NEET success. Board + competitive prep. Call 88264-44334!',
  keywords: [
    'biology classes Rohini Sector 13',
    'NEET coaching Rohini Sector 13',
    'best biology tuition Rohini',
    'DC Chauk coaching center',
    'NEET preparation Sector 13',
    'Dr Shekhar C Singh',
    'AIIMS faculty',
    'biology coaching Rohini',
    'medical entrance coaching',
    'board exam biology',
  ],
  openGraph: {
    title: 'Biology Classes Rohini Sector 13 | NEET Coaching | Cerebrum Academy',
    description:
      'Top biology classes near Rohini Sector 13. DC Chauk center 7 min away. Expert faculty, 98% NEET success. Board + competitive prep. Call 88264-44334!',
    url: 'https://cerebrumbiologyacademy.com/biology-classes-rohini-sector-13',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-rohini-sector-13',
  },
}

export default function RohiniSector13Page() {
  return <CityHubPage data={cityData} />
}
