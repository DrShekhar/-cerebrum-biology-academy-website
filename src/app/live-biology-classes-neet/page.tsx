import { Metadata } from 'next'
import { SEOLandingPage } from '@/components/seo-landing'
import { universalSEOPages } from '@/data/seo-landing'

const content = universalSEOPages.liveBiologyClassesNeet

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
  keywords: content.keywords,
  openGraph: {
    title: content.title,
    images: [
      { url: '/og-image.jpg', width: 1200, height: 630, alt: 'Image — Cerebrum Biology Academy' },
    ],
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

export default function LiveBiologyClassesNeetPage() {
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
