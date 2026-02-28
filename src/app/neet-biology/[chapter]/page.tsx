import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAllChapterSlugs, getChapterBySlug } from '@/data/neet-biology-chapters'
import ChapterPageContent from './ChapterPageContent'

type Props = {
  params: Promise<{ chapter: string }>
}

export function generateStaticParams() {
  return getAllChapterSlugs().map((slug) => ({ chapter: slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { chapter: chapterSlug } = await params
  const chapter = getChapterBySlug(chapterSlug)

  if (!chapter) {
    return { title: 'Chapter Not Found' }
  }

  const title = `${chapter.name} - NEET Biology | Cerebrum Biology Academy`
  const description = chapter.description

  return {
    title,
    description,
    alternates: {
      canonical: `https://cerebrumbiologyacademy.com/neet-biology/${chapterSlug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://cerebrumbiologyacademy.com/neet-biology/${chapterSlug}`,
      siteName: 'Cerebrum Biology Academy',
      type: 'article',
    },
  }
}

export default async function ChapterPage({ params }: Props) {
  const { chapter: chapterSlug } = await params
  const chapter = getChapterBySlug(chapterSlug)

  if (!chapter) {
    notFound()
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: `${chapter.name} - NEET Biology`,
    description: chapter.description,
    educationalLevel: `Class ${chapter.class}`,
    learningResourceType: 'Study Guide',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    url: `https://cerebrumbiologyacademy.com/neet-biology/${chapterSlug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ChapterPageContent chapter={chapter} chapterSlug={chapterSlug} />
    </>
  )
}
