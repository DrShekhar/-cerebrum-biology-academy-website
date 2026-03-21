import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('knowledge-park')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'NEET coaching Knowledge Park',
    'biology classes Knowledge Park',
    'NEET preparation Knowledge Park',
    'best biology coaching Knowledge Park',
    'NEET tuition Knowledge Park',
    'AIIMS faculty Knowledge Park',
    'NEET online classes Knowledge Park',
    'biology coaching near Knowledge Park',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/neet-coaching-knowledge-park`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/neet-coaching-knowledge-park`,
  },
}

export default function Page() {
  return <CityHubPage data={cityData} />
}
