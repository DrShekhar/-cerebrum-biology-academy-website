import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('rohini-sector-14')!

export const metadata: Metadata = {
  title: 'NEET Coaching Rohini Sector 14 | Best Biology Classes | Cerebrum Academy',
  description:
    'Premium NEET coaching near Rohini Sector 14. 8 min to DC Chauk center. Dr. Shekhar Singh, 1,50,000+ students. 98% success. Call 88264-44334!',
  keywords: [
    'NEET coaching Rohini Sector 14',
    'biology classes Rohini Sector 14',
    'best NEET coaching Rohini',
    'DC Chauk biology coaching',
    'biology tuition Sector 14',
    'Dr Shekhar Singh Rohini',
    'AIIMS trained faculty',
    'NEET preparation Rohini',
    'medical coaching Delhi',
    'biology classes near me',
  ],
  openGraph: {
    title: 'NEET Coaching Rohini Sector 14 | Best Biology Classes | Cerebrum Academy',
    description:
      'Premium NEET coaching near Rohini Sector 14. 8 min to DC Chauk center. Dr. Shekhar Singh, 1,50,000+ students. 98% success. Call 88264-44334!',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-rohini-sector-14',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-rohini-sector-14',
  },
}

export default function RohiniSector14Page() {
  return <CityHubPage data={cityData} />
}
