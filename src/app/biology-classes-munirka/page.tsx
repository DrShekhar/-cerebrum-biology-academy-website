import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('munirka')!

export const metadata: Metadata = {
  title: 'Biology Classes in Munirka | NEET Coaching JNU Area Delhi',
  description:
    'Affordable biology classes in Munirka for NEET & boards. Near JNU campus. Expert faculty for Class 11, 12 students. Call 88264-44334 for demo.',
  keywords: [
    'biology classes munirka',
    'neet coaching munirka delhi',
    'biology tuition munirka',
    'best biology teacher munirka',
    'neet preparation munirka jnu',
    'class 11 biology munirka',
    'class 12 biology coaching munirka',
    'cbse biology tutor munirka',
    'medical coaching munirka delhi',
  ],
  openGraph: {
    title: 'Biology Classes in Munirka | NEET Coaching JNU Area Delhi',
    description:
      'Affordable biology classes in Munirka for NEET & boards. Near JNU campus. Expert faculty.',
    url: 'https://cerebrumbiologyacademy.com/biology-classes-munirka',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-munirka',
  },
}

export default function BiologyClassesMunirkaPage() {
  return <CityHubPage data={cityData} />
}
