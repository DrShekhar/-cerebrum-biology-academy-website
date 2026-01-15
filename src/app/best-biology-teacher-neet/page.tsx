import { Metadata } from 'next'
import { SEOLandingPage } from '@/components/seo-landing'
import { universalSEOPages } from '@/data/seo-landing'
import { BreadcrumbSchema } from '@/components/seo'

const content = universalSEOPages.bestBiologyTeacherNeet

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
}

export default function BestBiologyTeacherNeetPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-4">
        <BreadcrumbSchema
          items={[{ label: 'Best Biology Teacher for NEET', isCurrentPage: true }]}
        />
      </div>
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
