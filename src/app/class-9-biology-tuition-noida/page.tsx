import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('class-9-biology-tuition-noida')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  openGraph: {
    locale: 'en_IN',
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/class-9-biology-tuition-noida`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/class-9-biology-tuition-noida`,
  },

  twitter: { card: 'summary_large_image' as const },
}

export const revalidate = 86400

export default function Page() {
  return <CityHubPage data={cityData} />
}
