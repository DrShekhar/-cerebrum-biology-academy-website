import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('neet-revision-batch-ghaziabad')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet revision batch ghaziabad',
    'neet final revision ghaziabad',
    'neet biology revision ghaziabad',
    '3 month neet revision',
    'neet revision course ghaziabad',
    'pre-neet revision batch',
    'intensive neet revision',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/neet-revision-batch-ghaziabad`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/neet-revision-batch-ghaziabad`,
  },
}

export default function Page() {
  return <CityHubPage data={cityData} />
}
