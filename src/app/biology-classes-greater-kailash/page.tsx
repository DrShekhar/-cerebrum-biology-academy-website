import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('greater-kailash')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in greater kailash',
    'biology coaching gk delhi',
    'neet biology classes gk',
    'best biology tuition greater kailash',
    'biology classes gk-1',
    'biology coaching gk-2',
    'dps gk biology tuition',
    'class 11 biology tuition gk',
  ],
  openGraph: {
    locale: 'en_IN',
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-greater-kailash`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-greater-kailash',
  },

  twitter: { card: 'summary_large_image' as const },
}

export const revalidate = 86400

export default function BiologyClassesGreaterKailashPage() {
  return <CityHubPage data={cityData} />
}
