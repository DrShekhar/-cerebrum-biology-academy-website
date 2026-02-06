import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('lajpat-nagar')!

export const metadata: Metadata = {
  title: 'Best Biology Tuition in Lajpat Nagar | Top Tutors Central Delhi',
  description:
    'Best biology tuition in Lajpat Nagar, Delhi. Experienced tutors for Class 11, 12 & NEET. Near metro station. Call 88264-44334 for free demo class.',
  keywords: [
    'best biology tuition lajpat nagar',
    'biology tutor lajpat nagar delhi',
    'biology coaching defence colony',
    'biology home tuition lajpat nagar',
    'class 11 biology tuition lajpat nagar',
    'class 12 biology tutor jangpura',
    'private biology tuition central delhi',
    'biology teacher lajpat nagar',
  ],
  openGraph: {
    title: 'Best Biology Tuition in Lajpat Nagar | Top Tutors Central Delhi',
    description:
      'Best biology tuition in Lajpat Nagar, Delhi. Experienced tutors for Class 11, 12 & NEET. Near metro station.',
    url: 'https://cerebrumbiologyacademy.com/best-biology-tuition-lajpat-nagar',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-biology-tuition-lajpat-nagar',
  },
}

export default function BestBiologyTuitionLajpatNagarPage() {
  return <CityHubPage data={cityData} />
}
