import { notFound } from 'next/navigation'
import { getTestBySlug } from '@/data/mockTests'
import { TestInterface } from '@/components/mockTests/TestInterface'

interface Props {
  params: {
    subject: string
    slug: string
  }
}

export async function generateMetadata({ params }: Props) {
  const test = getTestBySlug(params.slug)

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
      url: `/mock-tests/${params.subject}/${params.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: test.title,
      description: test.description,
    },
    alternates: {
      canonical: test.seoMetadata.canonicalUrl || `/mock-tests/${params.subject}/${params.slug}`,
    },
  }
}

export default function TestPage({ params }: Props) {
  const test = getTestBySlug(params.slug)

  if (!test) {
    notFound()
  }

  return <TestInterface test={test} />
}
