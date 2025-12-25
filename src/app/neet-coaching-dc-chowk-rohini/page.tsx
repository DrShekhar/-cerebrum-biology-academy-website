import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('dc-chowk-rohini')!

export const metadata: Metadata = {
  title: 'NEET Coaching DC Chowk Rohini | Biology Classes | Cerebrum Academy',
  description:
    'NEET coaching at DC Chowk, Rohini - our flagship center! 211 Vikas Surya Tower, next to metro. AIIMS faculty, 98% success. Call 88264-44334!',
  keywords: [
    'NEET coaching DC Chowk',
    'biology classes DC Chauk Rohini',
    'best NEET coaching Rohini',
    'DC Chauk metro coaching',
    'biology tuition Rohini',
    'Dr Shekhar C Singh',
    'AIIMS faculty DC Chowk',
    'NEET preparation Rohini',
    'flagship center Rohini',
    'biology coaching near metro',
  ],
  openGraph: {
    title: 'NEET Coaching DC Chowk Rohini | Biology Classes | Cerebrum Academy',
    description:
      'NEET coaching at DC Chowk, Rohini - our flagship center! 211 Vikas Surya Tower, next to metro. AIIMS faculty, 98% success. Call 88264-44334!',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-dc-chowk-rohini',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-dc-chowk-rohini',
  },
}

export default function DCChowkRohiniPage() {
  return <CityHubPage data={cityData} />
}
