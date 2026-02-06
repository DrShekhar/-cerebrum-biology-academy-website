import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('hauz-khas')!

export const metadata: Metadata = {
  title: 'Biology Coaching for Sanskriti School Students | NEET Prep Delhi',
  description:
    'Expert biology coaching for Sanskriti School students in Chanakyapuri. CBSE & NEET-UG focused preparation. Proven track record. Call 88264-44334 for enrollment.',
  keywords: [
    'biology coaching for sanskriti school students',
    'sanskriti school biology tuition',
    'neet coaching sanskriti school delhi',
    'biology tutor sanskriti school',
    'sanskriti school neet preparation',
    'class 11 biology sanskriti school',
    'class 12 biology coaching sanskriti',
    'best coaching for sanskriti school students',
    'biology classes near sanskriti school chanakyapuri',
  ],
  openGraph: {
    title: 'Biology Coaching for Sanskriti School Students | NEET Prep Delhi',
    description:
      'Expert biology coaching for Sanskriti School students in Chanakyapuri. CBSE & NEET-UG focused preparation. Proven track record.',
    url: 'https://cerebrumbiologyacademy.com/biology-coaching-sanskriti-school',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-coaching-sanskriti-school',
  },
}

export default function BiologyCoachingSanskritiSchoolPage() {
  return <CityHubPage data={cityData} />
}
