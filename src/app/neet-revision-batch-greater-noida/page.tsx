import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('neet-revision-batch-greater-noida')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet revision batch greater-noida',
    'neet final revision greater-noida',
    'neet biology revision greater-noida',
    '3 month neet revision',
    'neet revision course greater-noida',
    'pre-neet revision batch',
    'intensive neet revision',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/neet-revision-batch-greater-noida`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/neet-revision-batch-greater-noida`,
  },
}

export default function Page() {
  return <CityHubPage data={cityData} />
}
