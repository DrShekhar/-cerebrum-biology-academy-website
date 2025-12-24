import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('sarojini-nagar')!

export const metadata: Metadata = {
  title: 'Biology Classes in Sarojini Nagar | NEET Coaching Delhi',
  description:
    'Top biology classes in Sarojini Nagar for NEET & board exams. Expert faculty, proven results. Near Safdarjung metro. Call 88264-44334 for free demo.',
  keywords: [
    'biology classes sarojini nagar',
    'neet coaching sarojini nagar',
    'biology tuition sarojini nagar delhi',
    'best biology teacher sarojini nagar',
    'neet preparation sarojini nagar',
    'class 11 biology sarojini nagar',
    'class 12 biology coaching sarojini nagar',
    'cbse biology tutor sarojini nagar',
    'medical coaching sarojini nagar',
  ],
  openGraph: {
    title: 'Biology Classes in Sarojini Nagar | NEET Coaching Delhi',
    description:
      'Top biology classes in Sarojini Nagar for NEET & board exams. Expert faculty, proven results.',
    url: 'https://cerebrumbiologyacademy.com/biology-classes-sarojini-nagar',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-sarojini-nagar',
  },
}

export default function BiologyClassesSarojiniNagarPage() {
  return <CityHubPage data={cityData} />
}
