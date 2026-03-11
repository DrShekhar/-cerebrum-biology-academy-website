import { notFound } from 'next/navigation'
import { getTestBySlug, mockTests } from '@/data/mockTests'
import { TestInterface } from '@/components/mockTests/TestInterface'

export const dynamicParams = false

export function generateStaticParams() {
  return mockTests.map((t) => ({
    subject: t.subject.toLowerCase(),
    slug: t.slug,
  }))
}

interface Props {
  params: Promise<{
    subject: string
    slug: string
  }>
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params
  const test = getTestBySlug(resolvedParams.slug)

  if (!test) {
    return {
      title: 'Test Not Found',
    }
  }

  return {
    title: test.seoMetadata.title,
    description: test.seoMetadata.description,
    keywords: test.seoMetadata.keywords,
    openGraph: {
      title: test.title,
      description: test.description,
      type: 'website',
      url: `/mock-tests/${resolvedParams.subject}/${resolvedParams.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: test.title,
      description: test.description,
    },
    alternates: {
      canonical:
        test.seoMetadata.canonicalUrl ||
        `/mock-tests/${resolvedParams.subject}/${resolvedParams.slug}`,
    },
  }
}

export default async function TestPage({ params }: Props) {
  const resolvedParams = await params
  const test = getTestBySlug(resolvedParams.slug)

  if (!test) {
    notFound()
  }

  return <TestInterface test={test} />
}
