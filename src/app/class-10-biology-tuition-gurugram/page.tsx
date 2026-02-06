import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('class-10-biology-tuition-gurugram')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'class 10 biology tuition gurugram',
    'class 10 biology coaching gurgaon',
    '10th class biology tuition',
    'biology tutor class 10 gurugram',
    'cbse class 10 biology gurugram',
    'icse class 10 biology gurgaon',
    'class 10 board biology gurugram',
    'neet foundation class 10',
    'biology classes for 10th gurugram',
    '10th board exam biology coaching',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/class-10-biology-tuition-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/class-10-biology-tuition-gurugram',
  },
}

export default function Class10BiologyTuitionGurugramPage() {
  return <CityHubPage data={cityData} />
}
