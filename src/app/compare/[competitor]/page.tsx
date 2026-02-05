import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  COMPETITORS,
  CEREBRUM_DATA,
  ComparisonSchema,
  getComparisonData,
} from '@/components/seo/ComparisonSchema'
import { ComparisonLandingPage } from '@/components/seo/ComparisonLandingPage'

// Generate static params for all competitors
export function generateStaticParams() {
  return Object.keys(COMPETITORS).map((competitor) => ({
    competitor: competitor,
  }))
}

// Generate metadata for each comparison
export async function generateMetadata({
  params,
}: {
  params: Promise<{ competitor: string }>
}): Promise<Metadata> {
  const { competitor: competitorSlug } = await params
  const competitor = getComparisonData(competitorSlug)

  if (!competitor) {
    return {
      title: 'Comparison Not Found',
    }
  }

  const feeSavings = competitor.averageFee - CEREBRUM_DATA.averageFee
  const title = `Cerebrum vs ${competitor.name} - NEET Coaching Comparison 2026`
  const description = `Compare Cerebrum Biology Academy with ${competitor.name}. See fees (save ₹${feeSavings.toLocaleString()}/year), batch sizes, success rates, and more. Make an informed decision.`

  return {
    title,
    description,
    keywords: [
      `Cerebrum vs ${competitor.name}`,
      `${competitor.name} vs Cerebrum`,
      `${competitor.name} review`,
      'NEET coaching comparison',
      'best NEET Biology coaching',
      'Kota coaching alternative',
      `${competitor.name} fees`,
      'NEET coaching fees comparison',
    ],
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://cerebrumbiologyacademy.com/compare/${competitor.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://cerebrumbiologyacademy.com/compare/${competitor.slug}`,
    },
  }
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ competitor: string }>
}) {
  const { competitor: competitorSlug } = await params
  const competitor = getComparisonData(competitorSlug)

  if (!competitor) {
    notFound()
  }

  const pageUrl = `https://cerebrumbiologyacademy.com/compare/${competitor.slug}`

  return (
    <>
      <ComparisonSchema competitor={competitor} pageUrl={pageUrl} />
      <ComparisonLandingPage competitor={competitor} />
    </>
  )
}
