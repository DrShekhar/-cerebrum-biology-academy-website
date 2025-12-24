import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('kalkaji')!

export const metadata: Metadata = {
  title: 'Best Biology Tuition in Kalkaji | Expert Tutors Near Nehru Place',
  description:
    'Best biology tuition in Kalkaji, South Delhi. Expert tutors near Nehru Place & Lotus Temple. Class 11, 12 & NEET prep. Call 88264-44334 for enrollment.',
  keywords: [
    'best biology tuition kalkaji',
    'biology tutor kalkaji delhi',
    'biology coaching near nehru place',
    'biology home tuition kalkaji',
    'class 11 biology tuition kalkaji',
    'class 12 biology tutor govind puri',
    'private biology tuition kalkaji',
    'biology teacher near lotus temple',
  ],
  openGraph: {
    title: 'Best Biology Tuition in Kalkaji | Expert Tutors Near Nehru Place',
    description:
      'Best biology tuition in Kalkaji, South Delhi. Expert tutors near Nehru Place & Lotus Temple. Class 11, 12 & NEET prep.',
    url: 'https://cerebrumbiologyacademy.com/best-biology-tuition-kalkaji',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-biology-tuition-kalkaji',
  },
}

export default function BestBiologyTuitionKalkajiPage() {
  return <CityHubPage data={cityData} />
}
