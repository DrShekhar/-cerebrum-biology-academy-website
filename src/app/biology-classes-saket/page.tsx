import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('saket')!

export const metadata: Metadata = {
  title: 'Biology Classes in Saket | NEET Coaching Near Select Citywalk Delhi',
  description:
    'Top biology classes in Saket for NEET & board exams. Near Saket metro & Select Citywalk. Expert faculty for Class 11, 12. Call 88264-44334 for enrollment.',
  keywords: [
    'biology classes saket',
    'neet coaching saket delhi',
    'biology tuition saket',
    'best biology teacher saket',
    'neet preparation saket delhi',
    'class 11 biology saket',
    'class 12 biology coaching saket',
    'cbse biology tutor saket',
    'medical coaching saket delhi',
  ],
  openGraph: {
    title: 'Biology Classes in Saket | NEET Coaching Near Select Citywalk Delhi',
    description:
      'Top biology classes in Saket for NEET & board exams. Near Saket metro & Select Citywalk.',
    url: 'https://cerebrumbiologyacademy.com/biology-classes-saket',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-saket',
  },
}

export default function BiologyClassesSaketPage() {
  return <CityHubPage data={cityData} />
}
