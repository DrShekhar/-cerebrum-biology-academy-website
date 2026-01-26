import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('jor-bagh')!

export const metadata: Metadata = {
  title: 'Biology Classes in Jor Bagh | NEET Coaching Central Delhi',
  description:
    'Premium biology classes in Jor Bagh for NEET & board exams. Near Jor Bagh metro. Exclusive small batch coaching. Call 88264-44334 for enrollment.',
  keywords: [
    'biology classes jor bagh',
    'neet coaching jor bagh delhi',
    'biology tuition jor bagh',
    'best biology teacher jor bagh',
    'neet preparation jor bagh',
    'class 11 biology jor bagh',
    'class 12 biology coaching jor bagh',
    'cbse biology tutor jor bagh',
    'medical entrance jor bagh',
  ],
  openGraph: {
    title: 'Biology Classes in Jor Bagh | NEET Coaching Central Delhi',
    description: 'Premium biology classes in Jor Bagh for NEET & board exams. Near Jor Bagh metro.',
    url: 'https://cerebrumbiologyacademy.com/biology-classes-jor-bagh',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-jor-bagh',
  },
}

export default function BiologyClassesJorBaghPage() {
  return <CityHubPage data={cityData} />
}
