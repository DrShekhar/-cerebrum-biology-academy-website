import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('vasant-vihar')!

export const metadata: Metadata = {
  title: 'Biology Coaching for Vasant Valley School Students | NEET Prep',
  description:
    'Premium biology coaching for Vasant Valley School students. IB & CBSE aligned curriculum. Expert NEET-UG preparation near Vasant Vihar. Call 88264-44334.',
  keywords: [
    'biology coaching for vasant valley school students',
    'vasant valley school biology tuition',
    'neet coaching vasant valley students',
    'biology tutor vasant valley school',
    'ib biology coaching vasant vihar',
    'class 11 biology vasant valley',
    'class 12 biology coaching vasant valley school',
    'best coaching for vasant valley students',
    'biology classes near vasant valley school',
  ],
  openGraph: {
    title: 'Biology Coaching for Vasant Valley School Students | NEET Prep',
    description:
      'Premium biology coaching for Vasant Valley School students. IB & CBSE aligned curriculum. Expert NEET-UG preparation near Vasant Vihar.',
    url: 'https://cerebrumbiologyacademy.com/biology-coaching-vasant-valley-school',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-coaching-vasant-valley-school',
  },
}

export default function BiologyCoachingVasantValleySchoolPage() {
  return <CityHubPage data={cityData} />
}
