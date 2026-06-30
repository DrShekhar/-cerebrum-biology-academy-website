import { Metadata } from 'next'
import { SEOLandingPage } from '@/components/seo-landing'
import { dropperSEOPages } from '@/data/seo-landing'

const content = dropperSEOPages.oneYearNeetDropperCourse

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
  keywords: content.keywords,
  openGraph: {
    title: content.title,
    description: content.metaDescription,
    type: 'website',
    url: `https://cerebrumbiologyacademy.com/${content.slug}`,
  },
  twitter: {
    card: 'summary_large_image',
    title: content.title,
    description: content.metaDescription,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/${content.slug}`,
  },
  // noindex 2026-06 (national dropper doorway consolidation): redundant intent
  // page; canonical commercial page /courses/neet-dropper carries the index
  // signal. Stays live for visitors + internal links (follow). Reversible.
  robots: 'noindex, follow',
}

export default function OneYearNeetDropperCoursePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(content.schema),
        }}
      />
      <SEOLandingPage content={content} />
    </>
  )
}
