import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('prashant-vihar')!

export const metadata: Metadata = {
  title: 'NEET Coaching Prashant Vihar | Biology Classes Rohini | Cerebrum Academy',
  description:
    'Best NEET coaching for Prashant Vihar students. Near Rohini DC Chauk center. AIIMS faculty, 98% success. WhatsApp 88264-44334',
  keywords: [
    'NEET coaching Prashant Vihar',
    'biology classes Prashant Vihar',
    'biology tuition Prashant Vihar',
    'NEET preparation Prashant Vihar',
    'DC Chauk biology coaching',
    'Dr Shekhar Singh',
    'AIIMS trained faculty',
    'biology coaching Delhi',
    'medical entrance coaching',
    'NEET biology classes',
  ],
  openGraph: {
    title: 'NEET Coaching Prashant Vihar | Biology Classes Rohini | Cerebrum Academy',
    description:
      'Best NEET coaching for Prashant Vihar students. Near Rohini DC Chauk center. AIIMS faculty, 98% success. WhatsApp 88264-44334',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-prashant-vihar',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-prashant-vihar',
  },
}

export default function PrashantViharPage() {
  return <CityHubPage data={cityData} />
}
