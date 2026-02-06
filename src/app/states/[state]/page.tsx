import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { INDIAN_STATES, StateSchema } from '@/components/seo/StateSchema'
import { StateLandingPage } from '@/components/seo/StateLandingPage'

// Generate static params for all states
export function generateStaticParams() {
  return Object.keys(INDIAN_STATES).map((state) => ({
    state: state,
  }))
}

// Generate metadata for each state
export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>
}): Promise<Metadata> {
  const { state: stateSlug } = await params
  const state = INDIAN_STATES[stateSlug]

  if (!state) {
    return {
      title: 'State Not Found',
    }
  }

  const title = `Best NEET Biology Coaching in ${state.name} | Cerebrum Academy`
  const description = `Top NEET Biology coaching for ${state.name} students. AIIMS-trained faculty, 98% success rate. Online classes for ${state.majorCities.slice(0, 3).join(', ')}. ${state.neetSeats}+ medical seats. Book FREE demo!`

  return {
    title,
    description,
    keywords: [
      `NEET coaching ${state.name}`,
      `best NEET coaching ${state.capital}`,
      `biology coaching ${state.name}`,
      `NEET preparation ${state.capital}`,
      ...state.majorCities.map((city) => `NEET coaching ${city}`),
      ...state.medicalColleges.map((college) => college),
      'online NEET coaching',
      'AIIMS faculty',
      'NEET biology classes',
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://cerebrumbiologyacademy.com/states/${state.slug}`,
      images: [
        {
          url: 'https://cerebrumbiologyacademy.com/og-image-states.jpg',
          width: 1200,
          height: 630,
          alt: `NEET Biology Coaching in ${state.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://cerebrumbiologyacademy.com/og-image-states.jpg'],
    },
    alternates: {
      canonical: `https://cerebrumbiologyacademy.com/states/${state.slug}`,
    },
  }
}

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>
}) {
  const { state: stateSlug } = await params
  const state = INDIAN_STATES[stateSlug]

  if (!state) {
    notFound()
  }

  const pageUrl = `https://cerebrumbiologyacademy.com/states/${state.slug}`

  return (
    <>
      <StateSchema state={state} pageUrl={pageUrl} />
      <StateLandingPage state={state} />
    </>
  )
}
