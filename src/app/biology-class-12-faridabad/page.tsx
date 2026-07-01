import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { CityAreaSchema } from '@/components/seo/CityAreaSchema'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('biology-class-12-faridabad')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'Class 12 Biology Faridabad tuition',
    'Class 12 Biology Faridabad coaching',
    'Class 12 Biology Faridabad classes',
    'CBSE Class 12 Biology Faridabad',
    'board exam Class 12 Biology Faridabad',
    'NCERT Class 12 Biology Faridabad',
    'biology tutor Class 12 Biology Faridabad',
    'NEET foundation Class 12 Biology Faridabad',
  ],
  openGraph: {
    locale: 'en_IN',
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-class-12-faridabad`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/biology-class-12-faridabad`,
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
        city="Faridabad"
        state="Haryana"
        pageSlug="biology-class-12-faridabad"
        serviceName="Class 12 Biology Coaching Faridabad"
      />
      <CityHubPage data={cityData} />
    </>
  )
}
