import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('class-11-biology-tuition-gurugram')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'class 11 biology tuition gurugram',
    'class 11 biology coaching gurgaon',
    '11th class biology tuition',
    'biology tutor class 11 gurugram',
    'cbse class 11 biology gurugram',
    'class 11 neet biology gurugram',
    'botany zoology class 11',
    'neet foundation class 11',
    'biology classes for 11th gurugram',
    '11th biology coaching for neet',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/class-11-biology-tuition-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/class-11-biology-tuition-gurugram',
  },
}

export default function Class11BiologyTuitionGurugramPage() {
  return <CityHubPage data={cityData} />
}
