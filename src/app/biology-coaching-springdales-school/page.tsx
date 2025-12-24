import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('hauz-khas')!

export const metadata: Metadata = {
  title: 'Biology Coaching for Springdales School Students | NEET & Boards',
  description:
    'Specialized biology coaching for Springdales School Pusa Road & Dhaula Kuan students. NEET-UG & board exam preparation. Call 88264-44334 for demo class.',
  keywords: [
    'biology coaching for springdales school students',
    'springdales school biology tuition',
    'neet coaching springdales pusa road',
    'biology tutor springdales school',
    'springdales dhaula kuan neet preparation',
    'class 11 biology springdales school',
    'class 12 biology coaching springdales',
    'best coaching for springdales students',
    'biology classes near springdales school delhi',
  ],
  openGraph: {
    title: 'Biology Coaching for Springdales School Students | NEET & Boards',
    description:
      'Specialized biology coaching for Springdales School Pusa Road & Dhaula Kuan students. NEET-UG & board exam preparation.',
    url: 'https://cerebrumbiologyacademy.com/biology-coaching-springdales-school',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-coaching-springdales-school',
  },
}

export default function BiologyCoachingSpringdalesSchoolPage() {
  return <CityHubPage data={cityData} />
}
