import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('nirvana-country-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes nirvana country gurgaon',
    'neet coaching nirvana country gurugram',
    'biology tuition sector 50 gurgaon',
    'best biology teacher nirvana country',
    'class 11 biology coaching unitech nirvana',
    'class 12 biology tuition close south gurgaon',
    'neet biology classes nirvana country sector 50',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-nirvana-country-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-nirvana-country-gurgaon',
  },
}

export default function BiologyClassesNirvanaCountryGurgaonPage() {
  return <CityHubPage data={cityData} />
}
