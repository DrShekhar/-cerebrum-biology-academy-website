import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('defence-colony')!

export const metadata: Metadata = {
  title: 'Biology Classes in Defence Colony | Best NEET Coaching South Delhi',
  description:
    'Premium biology classes in Defence Colony for NEET & board exams. Near Lajpat Nagar metro. Elite coaching for South Delhi students. Call 88264-44334 for demo.',
  keywords: [
    'biology classes defence colony',
    'neet coaching defence colony delhi',
    'biology tuition defence colony',
    'best biology teacher defence colony',
    'neet preparation defence colony',
    'class 11 biology defence colony',
    'class 12 biology coaching defence colony',
    'cbse biology tutor defence colony',
    'medical entrance defence colony',
  ],
  openGraph: {
    title: 'Biology Classes in Defence Colony | Best NEET Coaching South Delhi',
    description:
      'Premium biology classes in Defence Colony for NEET & board exams. Near Lajpat Nagar metro.',
    url: 'https://cerebrumbiologyacademy.com/biology-classes-defence-colony',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-defence-colony',
  },
}

export default function BiologyClassesDefenceColonyPage() {
  return <CityHubPage data={cityData} />
}
