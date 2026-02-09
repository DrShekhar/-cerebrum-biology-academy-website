import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('indirapuram')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'NEET coaching Indirapuram',
    'biology classes Indirapuram',
    'NEET preparation Indirapuram Ghaziabad',
    'best biology coaching Indirapuram',
    'NEET tuition Indirapuram',
    'AIIMS faculty Indirapuram',
    'NEET online classes Indirapuram',
    'biology classes near Indirapuram',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/neet-coaching-indirapuram`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-indirapuram',
  },
}

export default function NEETCoachingIndirapiramPage() {
  return <CityHubPage data={cityData} />
}
