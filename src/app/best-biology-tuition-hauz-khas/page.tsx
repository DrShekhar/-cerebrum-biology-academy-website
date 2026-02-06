import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('hauz-khas')!

export const metadata: Metadata = {
  title: 'Best Biology Tuition in Hauz Khas | Expert Tutors South Delhi',
  description:
    'Best biology tuition in Hauz Khas, South Delhi. Expert tutors near IIT Delhi & SDA. Class 11, 12 & NEET biology preparation. Call 88264-44334 for enrollment.',
  keywords: [
    'best biology tuition hauz khas',
    'biology tutor hauz khas delhi',
    'biology coaching near iit delhi',
    'biology home tuition hauz khas',
    'class 11 biology tuition hauz khas',
    'class 12 biology tutor sda',
    'private biology tuition green park',
    'biology teacher hauz khas',
  ],
  openGraph: {
    title: 'Best Biology Tuition in Hauz Khas | Expert Tutors South Delhi',
    description:
      'Best biology tuition in Hauz Khas, South Delhi. Expert tutors near IIT Delhi & SDA. Class 11, 12 & NEET biology preparation.',
    url: 'https://cerebrumbiologyacademy.com/best-biology-tuition-hauz-khas',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-biology-tuition-hauz-khas',
  },
}

export default function BestBiologyTuitionHauzKhasPage() {
  return <CityHubPage data={cityData} />
}
