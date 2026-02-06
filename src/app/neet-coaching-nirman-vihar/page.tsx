import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('nirman-vihar')!

export const metadata: Metadata = {
  title: 'NEET Coaching in Nirman Vihar | Best Biology Classes East Delhi | Cerebrum Academy',
  description:
    'Top NEET coaching in Nirman Vihar, Delhi by Dr. Shekhar C Singh. 15+ years experience, 97% success rate. Online & offline options. Book free demo!',
  keywords: [
    'NEET coaching Nirman Vihar',
    'biology classes Nirman Vihar',
    'NEET preparation East Delhi',
    'Dr Shekhar C Singh',
    'AIIMS faculty',
    'biology tuition Nirman Vihar',
    'NEET biology classes',
    'medical entrance coaching',
    'Laxmi Nagar NEET',
    'East Delhi coaching',
    'Rohini center',
  ],
  openGraph: {
    title: 'NEET Coaching in Nirman Vihar | Best Biology Classes East Delhi | Cerebrum Academy',
    description:
      'Top NEET coaching in Nirman Vihar, Delhi by Dr. Shekhar C Singh. 15+ years experience, 97% success rate. Online & offline options. Book free demo!',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-nirman-vihar',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-nirman-vihar',
  },
}

export default function NirmanViharPage() {
  return <CityHubPage data={cityData} />
}
