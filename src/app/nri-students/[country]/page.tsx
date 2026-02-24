import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NRICountryPageTemplate } from '@/components/nri/NRICountryPageTemplate'
import { nriCountriesData, nriCountriesList } from '@/data/nriCountries'

interface PageProps {
  params: Promise<{ country: string }>
}

export async function generateStaticParams() {
  return nriCountriesList.map((country) => ({
    country,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country } = await params
  const countryData = nriCountriesData[country]

  if (!countryData) {
    return {
      title: 'Country Not Found',
    }
  }

  const title = `NEET Coaching for ${countryData.country} Students | Online Classes`
  const description = `Best NEET Biology coaching for Indian students in ${countryData.country}. ${countryData.cbseSchools}+ CBSE schools, ${countryData.neetCenter ? `NEET exam center in ${countryData.neetCenter}` : 'complete exam support'}. Live classes at ${countryData.classTimings} ${countryData.timezone}. 98% success rate.`

  return {
    title,
    description,
    keywords: countryData.seoKeywords.join(', '),
    openGraph: {
      title: `NEET Coaching for ${countryData.country} Students`,
      description: `Top NEET Biology coaching for NRI students in ${countryData.country}. AIIMS faculty, flexible timings, ${countryData.studentCount} students enrolled.`,
      url: `https://cerebrumbiologyacademy.com/nri-students/${country}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://cerebrumbiologyacademy.com/nri-students/${country}`,
    },
  }
}

export default async function NRICountryPage({ params }: PageProps) {
  const { country } = await params
  const countryData = nriCountriesData[country]

  if (!countryData) {
    notFound()
  }

  return <NRICountryPageTemplate data={countryData} />
}
