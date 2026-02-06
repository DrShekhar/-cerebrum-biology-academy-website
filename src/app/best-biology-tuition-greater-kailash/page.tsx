import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('greater-kailash')!

export const metadata: Metadata = {
  title: 'Best Biology Tuition in Greater Kailash | Top Tutors GK Delhi',
  description:
    'Best biology tuition in Greater Kailash, Delhi. Expert tutors for Class 11, 12 & NEET preparation. Personalized coaching in GK-1, GK-2. Call 88264-44334 for demo.',
  keywords: [
    'best biology tuition greater kailash',
    'biology tutor gk delhi',
    'top biology coaching gk-1',
    'biology home tuition greater kailash',
    'class 11 biology tuition gk',
    'class 12 biology tutor gk-2',
    'private biology tuition greater kailash',
    'biology teacher gk delhi',
  ],
  openGraph: {
    title: 'Best Biology Tuition in Greater Kailash | Top Tutors GK Delhi',
    description:
      'Best biology tuition in Greater Kailash, Delhi. Expert tutors for Class 11, 12 & NEET preparation. Personalized coaching in GK-1, GK-2.',
    url: 'https://cerebrumbiologyacademy.com/best-biology-tuition-greater-kailash',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-biology-tuition-greater-kailash',
  },
}

export default function BestBiologyTuitionGreaterKailashPage() {
  return <CityHubPage data={cityData} />
}
