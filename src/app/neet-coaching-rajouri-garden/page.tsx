import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('rajouri-garden')!

export const metadata: Metadata = {
  title: 'NEET Coaching in Rajouri Garden | Best Biology Classes Delhi | Cerebrum Academy',
  description:
    'Top NEET coaching in Rajouri Garden, Delhi. AIIMS-trained faculty by Dr. Shekhar C Singh. 97% success rate. Near Rohini center. Book free demo! Call 88264-44334',
  keywords: [
    'NEET coaching Rajouri Garden',
    'biology classes Rajouri Garden',
    'NEET preparation Rajouri Garden',
    'best NEET coaching Delhi',
    'Dr Shekhar C Singh',
    'AIIMS faculty',
    'biology tuition Rajouri Garden',
    'NEET biology classes',
    'medical entrance coaching',
    'Rohini center',
    'West Delhi NEET',
  ],
  openGraph: {
    title: 'NEET Coaching in Rajouri Garden | Best Biology Classes Delhi | Cerebrum Academy',
    description:
      'Top NEET coaching in Rajouri Garden, Delhi. AIIMS-trained faculty by Dr. Shekhar C Singh. 97% success rate. Near Rohini center. Book free demo! Call 88264-44334',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-rajouri-garden',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-rajouri-garden',
  },
}

export default function RajouriGardenPage() {
  return <CityHubPage data={cityData} />
}
