import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('rohini-sector-16')!

export const metadata: Metadata = {
  title: 'Biology Classes Rohini Sector 16 | NEET Coaching | Cerebrum Academy',
  description:
    'Top biology classes near Rohini Sector 16. 12 min to DC Chauk center. Expert NEET faculty, 98% success. Small batches. Call 88264-44334!',
  keywords: [
    'biology classes Rohini Sector 16',
    'NEET coaching Rohini Sector 16',
    'best biology tuition Rohini',
    'DC Chauk biology classes',
    'NEET preparation Sector 16',
    'Dr Shekhar Singh',
    'AIIMS trained faculty',
    'biology coaching Rohini',
    'medical entrance Delhi',
    'NEET biology tuition',
  ],
  openGraph: {
    title: 'Biology Classes Rohini Sector 16 | NEET Coaching | Cerebrum Academy',
    description:
      'Top biology classes near Rohini Sector 16. 12 min to DC Chauk center. Expert NEET faculty, 98% success. Small batches. Call 88264-44334!',
    url: 'https://cerebrumbiologyacademy.com/biology-classes-rohini-sector-16',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-rohini-sector-16',
  },
}

export default function RohiniSector16Page() {
  return <CityHubPage data={cityData} />
}
