import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('rk-puram')!

export const metadata: Metadata = {
  title: 'Best Biology Tuition in RK Puram | Tutors for DPS RKP Students',
  description:
    'Best biology tuition in RK Puram, Delhi. Expert tutors for DPS RK Puram students. Class 11, 12 & NEET preparation. Call 88264-44334 for demo.',
  keywords: [
    'best biology tuition rk puram',
    'biology tutor rk puram delhi',
    'biology coaching for dps rkp students',
    'biology home tuition rk puram',
    'class 11 biology tuition rk puram',
    'class 12 biology tutor rk puram sector 7',
    'private biology tuition munirka',
    'biology teacher rk puram',
  ],
  openGraph: {
    title: 'Best Biology Tuition in RK Puram | Tutors for DPS RKP Students',
    description:
      'Best biology tuition in RK Puram, Delhi. Expert tutors for DPS RK Puram students. Class 11, 12 & NEET preparation.',
    url: 'https://cerebrumbiologyacademy.com/best-biology-tuition-rk-puram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-biology-tuition-rk-puram',
  },
}

export default function BestBiologyTuitionRKPuramPage() {
  return <CityHubPage data={cityData} />
}
