import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('vasant-vihar')!

export const metadata: Metadata = {
  title: 'Best Biology Tuition in Vasant Vihar | Premium Tutors South Delhi',
  description:
    'Best biology tuition in Vasant Vihar, South Delhi. Premium tutors for Vasant Valley School students. Class 11, 12 & NEET prep. Call 88264-44334.',
  keywords: [
    'best biology tuition vasant vihar',
    'biology tutor vasant vihar delhi',
    'biology coaching vasant valley school',
    'biology home tuition vasant vihar',
    'class 11 biology tuition vasant vihar',
    'class 12 biology tutor embassy area',
    'premium biology tuition south delhi',
    'biology teacher vasant vihar',
  ],
  openGraph: {
    title: 'Best Biology Tuition in Vasant Vihar | Premium Tutors South Delhi',
    description:
      'Best biology tuition in Vasant Vihar, South Delhi. Premium tutors for Vasant Valley School students. Class 11, 12 & NEET prep.',
    url: 'https://cerebrumbiologyacademy.com/best-biology-tuition-vasant-vihar',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-biology-tuition-vasant-vihar',
  },
}

export default function BestBiologyTuitionVasantViharPage() {
  return <CityHubPage data={cityData} />
}
