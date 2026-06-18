import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BrainBeeCityTemplate from '@/components/brain-bee/BrainBeeCityTemplate'
import {
  BRAIN_BEE_CITIES,
  BRAIN_BEE_CITY_BY_SLUG,
} from '@/data/brain-bee/brainBeeCities'

const SITE_URL = 'https://cerebrumbiologyacademy.com'

export const dynamicParams = false

export function generateStaticParams() {
  return BRAIN_BEE_CITIES.map((c) => ({ city: c.slug }))
}

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  const city = BRAIN_BEE_CITY_BY_SLUG[params.city]
  if (!city) return { title: 'Brain Bee Coaching' }
  const url = `${SITE_URL}/brain-bee-coaching/${city.slug}`
  return {
    title: `Brain Bee Coaching in ${city.cityName} | Neuroscience Competition Prep`,
    description: `Live Brain Bee coaching for ${city.cityName} students (ages 13-19), ${city.timezone}. AIIMS-trained faculty train the high-weight rounds — human neuroanatomy, neurohistology, MRI ID, patient diagnosis and the live oral — not just the free Brain Facts written exam. Free assessment.`,
    keywords: [
      `brain bee coaching ${city.cityName}`,
      `brain bee coaching ${city.slug.replace(/-/g, ' ')}`,
      `brain bee tutor ${city.cityName}`,
      `brain bee preparation ${city.cityName}`,
      `neuroscience competition coaching ${city.cityName}`,
      `brain bee classes ${city.cityName}`,
    ],
    alternates: { canonical: url },
    openGraph: {
      title: `Brain Bee Coaching in ${city.cityName} · Cerebrum Biology Academy`,
      description: `Live ${city.timezone} Brain Bee coaching for ${city.cityName} students — neuroanatomy, patient diagnosis & live-oral training by AIIMS-trained faculty.`,
      url,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: `Brain Bee Coaching in ${city.cityName}`,
      description: `Live ${city.timezone} Brain Bee coaching by AIIMS-trained faculty — trains the high-weight neuroanatomy, diagnosis and oral rounds.`,
    },
    robots: 'index, follow, max-image-preview:large',
  }
}

export default function BrainBeeCityPage({ params }: { params: { city: string } }) {
  const city = BRAIN_BEE_CITY_BY_SLUG[params.city]
  if (!city) notFound()
  return <BrainBeeCityTemplate city={city} />
}
