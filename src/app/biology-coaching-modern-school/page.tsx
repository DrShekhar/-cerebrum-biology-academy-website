import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('lajpat-nagar')!

export const metadata: Metadata = {
  title: 'Biology Coaching for Modern School Barakhamba Students | NEET',
  description:
    'Expert biology coaching for Modern School Barakhamba Road students. CBSE aligned curriculum with NEET focus. Top results every year. Call 88264-44334 for demo.',
  keywords: [
    'biology coaching for modern school students',
    'modern school barakhamba biology tuition',
    'neet coaching modern school delhi',
    'biology tutor for modern school students',
    'modern school neet preparation',
    'class 11 biology modern school',
    'class 12 biology coaching modern school',
    'best coaching for modern school students',
    'biology classes near modern school barakhamba',
  ],
  openGraph: {
    title: 'Biology Coaching for Modern School Barakhamba Students | NEET',
    description:
      'Expert biology coaching for Modern School Barakhamba Road students. CBSE aligned curriculum with NEET focus. Top results every year.',
    url: 'https://cerebrumbiologyacademy.com/biology-coaching-modern-school',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-coaching-modern-school',
  },
}

export default function BiologyCoachingModernSchoolPage() {
  return <CityHubPage data={cityData} />
}
