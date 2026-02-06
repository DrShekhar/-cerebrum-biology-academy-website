import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('kaushambi')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching kaushambi',
    'biology classes kaushambi',
    'best neet coaching kaushambi ghaziabad',
    'biology tuition kaushambi',
    'neet classes near kaushambi metro',
    'biology coaching kaushambi',
    'class 11 biology kaushambi',
    'neet preparation kaushambi',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-kaushambi',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-kaushambi',
  },
}

export default function NEETCoachingKaushambiPage() {
  return <CityHubPage data={cityData} />
}
