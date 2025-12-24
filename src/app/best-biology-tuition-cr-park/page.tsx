import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('cr-park')!

export const metadata: Metadata = {
  title: 'Best Biology Tuition in CR Park | Top Tutors Chittaranjan Park',
  description:
    'Best biology tuition in CR Park (Chittaranjan Park), South Delhi. Expert tutors for Class 11, 12 & NEET preparation. Call 88264-44334 for demo class.',
  keywords: [
    'best biology tuition cr park',
    'biology tutor chittaranjan park',
    'biology coaching cr park delhi',
    'biology home tuition cr park',
    'class 11 biology tuition cr park',
    'class 12 biology tutor chittaranjan park',
    'private biology tuition south delhi',
    'biology teacher cr park',
  ],
  openGraph: {
    title: 'Best Biology Tuition in CR Park | Top Tutors Chittaranjan Park',
    description:
      'Best biology tuition in CR Park (Chittaranjan Park), South Delhi. Expert tutors for Class 11, 12 & NEET preparation.',
    url: 'https://cerebrumbiologyacademy.com/best-biology-tuition-cr-park',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-biology-tuition-cr-park',
  },
}

export default function BestBiologyTuitionCRParkPage() {
  return <CityHubPage data={cityData} />
}
