import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('lodhi-colony')!

export const metadata: Metadata = {
  title: 'Biology Classes in Lodhi Colony | NEET Coaching South Delhi',
  description:
    'Premium biology classes in Lodhi Colony for NEET-UG & boards. Expert faculty near Lodhi Garden. Personalized coaching. Call 88264-44334 for enrollment.',
  keywords: [
    'biology classes lodhi colony',
    'neet coaching lodhi colony delhi',
    'biology tuition lodhi colony',
    'best biology teacher lodhi colony',
    'neet preparation lodhi colony',
    'class 11 biology lodhi colony',
    'class 12 biology coaching lodhi colony',
    'cbse biology tutor lodhi colony',
    'medical entrance lodhi colony',
  ],
  openGraph: {
    title: 'Biology Classes in Lodhi Colony | NEET Coaching South Delhi',
    description:
      'Premium biology classes in Lodhi Colony for NEET-UG & boards. Expert faculty near Lodhi Garden.',
    url: 'https://cerebrumbiologyacademy.com/biology-classes-lodhi-colony',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-lodhi-colony',
  },
}

export default function BiologyClassesLodhiColonyPage() {
  return <CityHubPage data={cityData} />
}
