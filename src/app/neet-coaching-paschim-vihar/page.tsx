import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('paschim-vihar')!

export const metadata: Metadata = {
  title: 'NEET Coaching in Paschim Vihar | Best Biology Classes Delhi | Cerebrum Academy',
  description:
    'Top NEET coaching in Paschim Vihar, West Delhi. Dr. Shekhar C Singh, 15+ years experience. 97% success rate. Near Rohini center. Book free demo!',
  keywords: [
    'NEET coaching Paschim Vihar',
    'biology classes Paschim Vihar',
    'NEET preparation Paschim Vihar',
    'Dr Shekhar C Singh',
    'AIIMS faculty',
    'biology tuition Paschim Vihar',
    'NEET biology classes',
    'medical entrance coaching',
    'Rohini center',
    'West Delhi NEET',
    'Pitampura coaching',
  ],
  openGraph: {
    title: 'NEET Coaching in Paschim Vihar | Best Biology Classes Delhi | Cerebrum Academy',
    description:
      'Top NEET coaching in Paschim Vihar, West Delhi. Dr. Shekhar C Singh, 15+ years experience. 97% success rate. Near Rohini center. Book free demo!',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-paschim-vihar',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-paschim-vihar',
  },
}

export default function PaschimViharPage() {
  return <CityHubPage data={cityData} />
}
