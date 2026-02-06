import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('malviya-nagar')!

export const metadata: Metadata = {
  title: 'Best Biology Tuition in Malviya Nagar | Affordable Tutors Delhi',
  description:
    'Best biology tuition in Malviya Nagar, South Delhi. Affordable & quality tutors for Class 11, 12 & NEET. Shivalik area. Call 88264-44334 for enrollment.',
  keywords: [
    'best biology tuition malviya nagar',
    'biology tutor malviya nagar delhi',
    'affordable biology coaching south delhi',
    'biology home tuition malviya nagar',
    'class 11 biology tuition malviya nagar',
    'class 12 biology tutor shivalik',
    'private biology tuition panchsheel',
    'biology teacher malviya nagar',
  ],
  openGraph: {
    title: 'Best Biology Tuition in Malviya Nagar | Affordable Tutors Delhi',
    description:
      'Best biology tuition in Malviya Nagar, South Delhi. Affordable & quality tutors for Class 11, 12 & NEET. Shivalik area.',
    url: 'https://cerebrumbiologyacademy.com/best-biology-tuition-malviya-nagar',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-biology-tuition-malviya-nagar',
  },
}

export default function BestBiologyTuitionMalviyaNagarPage() {
  return <CityHubPage data={cityData} />
}
