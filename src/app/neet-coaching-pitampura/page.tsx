import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('pitampura')!

export const metadata: Metadata = {
  title: 'NEET Coaching Pitampura | Biology Classes DC Chauk Rohini | Cerebrum Academy',
  description:
    'Best NEET coaching in Pitampura. 10 min from Rohini center. AIIMS faculty, 98% success rate. 15+ years experience. WhatsApp 88264-44334!',
  keywords: [
    'NEET coaching Pitampura',
    'biology classes Pitampura',
    'biology tuition Pitampura',
    'NEET preparation Pitampura',
    'DC Chauk biology coaching',
    'Dr Shekhar Singh',
    'AIIMS trained faculty',
    'biology coaching Delhi',
    'medical entrance coaching',
    'NEET biology classes',
  ],
  openGraph: {
    title: 'NEET Coaching Pitampura | Biology Classes DC Chauk Rohini | Cerebrum Academy',
    description:
      'Best NEET coaching in Pitampura. 10 min from Rohini center. AIIMS faculty, 98% success rate. 15+ years experience. WhatsApp 88264-44334!',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-pitampura',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-pitampura',
  },
}

export default function PitampuraPage() {
  return <CityHubPage data={cityData} />
}
