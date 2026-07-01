import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { CityAreaSchema } from '@/components/seo/CityAreaSchema'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('class-11-biology-coaching-greater-noida')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  openGraph: {
    locale: 'en_IN',
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/class-11-biology-coaching-greater-noida`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/class-11-biology-coaching-greater-noida`,
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: cityData.metaTitle,
    description: cityData.metaDescription,
  },
}

export const revalidate = 86400

export default function Page() {
  return (
    <>
      <CityAreaSchema
        city="Greater Noida"
        state="Uttar Pradesh"
        pageSlug="class-11-biology-coaching-greater-noida"
        serviceName="Class 11 Biology Coaching Greater Noida"
        altNames={['Gr. Noida']}
      />
      <CityHubPage data={cityData} />
    </>
  )
}
