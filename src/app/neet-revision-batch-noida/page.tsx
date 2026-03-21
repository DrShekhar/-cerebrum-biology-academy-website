import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('neet-revision-batch-noida')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet revision batch noida',
    'neet final revision noida',
    'neet biology revision noida',
    '3 month neet revision',
    'neet revision course noida',
    'pre-neet revision batch',
    'intensive neet revision',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/neet-revision-batch-noida`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/neet-revision-batch-noida`,
  },
}

export default function Page() {
  return <CityHubPage data={cityData} />
}
