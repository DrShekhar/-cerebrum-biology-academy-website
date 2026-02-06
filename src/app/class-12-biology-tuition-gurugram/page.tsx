import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('class-12-biology-tuition-gurugram')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'class 12 biology tuition gurugram',
    'class 12 biology coaching gurgaon',
    '12th class biology tuition',
    'biology tutor class 12 gurugram',
    'cbse class 12 biology gurugram',
    'class 12 neet biology gurugram',
    'board exam biology class 12',
    'neet preparation class 12',
    'biology classes for 12th gurugram',
    '12th biology coaching for neet',
    'human physiology coaching',
    'genetics coaching gurugram',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/class-12-biology-tuition-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/class-12-biology-tuition-gurugram',
  },
}

export default function Class12BiologyTuitionGurugramPage() {
  return <CityHubPage data={cityData} />
}
