import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('pitampura')!

export const metadata: Metadata = {
  title: 'NEET Coaching Pitampura | Best Biology Classes Delhi | Cerebrum Academy',
  description:
    'Top NEET coaching in Pitampura. Quick metro access to DC Chauk Rohini center. AIIMS faculty, 98% success. Small batches. Call 88264-44334!',
  keywords: [
    'NEET coaching Pitampura',
    'biology classes Pitampura',
    'best NEET coaching Delhi',
    'DC Chauk metro coaching',
    'biology tuition Pitampura',
    'Dr Shekhar C Singh',
    'AIIMS faculty',
    'NEET preparation Pitampura',
    'medical entrance coaching',
    'biology coaching near me',
  ],
  openGraph: {
    title: 'NEET Coaching Pitampura | Best Biology Classes Delhi | Cerebrum Academy',
    description:
      'Top NEET coaching in Pitampura. Quick metro access to DC Chauk Rohini center. AIIMS faculty, 98% success. Small batches. Call 88264-44334!',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-pitampura',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-pitampura',
  },
}

export default function PitampuraPage() {
  return <CityHubPage data={cityData} />
}
