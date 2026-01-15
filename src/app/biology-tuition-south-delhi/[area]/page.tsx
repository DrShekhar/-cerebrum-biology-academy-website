import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageContent from './PageContent'
import { getAreaData, getAllAreaSlugs } from './data'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

interface PageProps {
  params: Promise<{ area: string }>
}

export async function generateStaticParams() {
  const slugs = getAllAreaSlugs()
  return slugs.map((area) => ({ area }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { area: areaSlug } = await params
  const area = getAreaData(areaSlug)

  if (!area) {
    return {
      title: 'Area Not Found | Cerebrum Biology Academy',
    }
  }

  const title = `Biology Tuition in ${area.name} | Classes 9-12 | Cerebrum Biology Academy`
  const description = `Best biology tuition in ${area.name}, South Delhi for Classes 9-12. ${area.description}. CBSE, ICSE & State Boards. NEET foundation. Expert faculty from AIIMS/JIPMER. Book free demo today.`

  return {
    title,
    description,
    keywords: [
      `biology tuition ${area.name.toLowerCase()}`,
      `biology coaching ${area.name.toLowerCase()}`,
      `biology classes ${area.name.toLowerCase()} delhi`,
      `cbse biology tuition ${area.name.toLowerCase()}`,
      `icse biology tuition ${area.name.toLowerCase()}`,
      `neet biology ${area.name.toLowerCase()}`,
      'biology tuition south delhi',
      'best biology tutor delhi',
    ],
    openGraph: {
      title,
      description,
      url: `https://cerebrumbiologyacademy.com/biology-tuition-south-delhi/${areaSlug}`,
      siteName: 'Cerebrum Biology Academy',
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://cerebrumbiologyacademy.com/biology-tuition-south-delhi/${areaSlug}`,
    },
  }
}

export default async function BiologyTuitionAreaPage({ params }: PageProps) {
  const { area: areaSlug } = await params
  const area = getAreaData(areaSlug)

  if (!area) {
    notFound()
  }

  const title = `Biology Tuition in ${area.name} | Classes 9-12 | Cerebrum Biology Academy`
  const description = `Best biology tuition in ${area.name}, South Delhi for Classes 9-12. ${area.description}. CBSE, ICSE & State Boards. NEET foundation.`

  return (
    <>
      {/* AI/LLM Optimized Schema for voice search and generative AI discovery */}
      <LocalitySchema
        locality={area.name}
        slug={`biology-tuition-south-delhi/${areaSlug}`}
        pageTitle={title}
        pageDescription={description}
        pageType="tuition"
      />
      <PageContent area={area} areaSlug={areaSlug} />
    </>
  )
}
