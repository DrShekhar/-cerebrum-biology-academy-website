import { Metadata } from 'next'

export interface PageMetadataParams {
  title: string
  description: string
  keywords: string | string[]
  path: string
  ogImage?: string
  canonical?: string
  noindex?: boolean
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://cerebrumbiologyacademy.com'

export function generatePageMetadata(params: PageMetadataParams): Metadata {
  const keywordsArray = Array.isArray(params.keywords)
    ? params.keywords
    : params.keywords.split(',').map(k => k.trim())

  const canonicalUrl = params.canonical || `${BASE_URL}${params.path}`

  return {
    title: params.title,
    description: params.description,
    keywords: keywordsArray,
    canonical: canonicalUrl,
    openGraph: {
      title: params.title,
      description: params.description,
      url: canonicalUrl,
      siteName: 'Cerebrum Biology Academy',
      images: params.ogImage ? [{ url: params.ogImage }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: params.title,
      description: params.description,
      images: params.ogImage ? [params.ogImage] : [],
    },
    robots: {
      index: !params.noindex,
      follow: true,
      googleBot: {
        index: !params.noindex,
        follow: true,
      },
    },
    alternates: {
      canonical: canonicalUrl,
    },
  }
}
