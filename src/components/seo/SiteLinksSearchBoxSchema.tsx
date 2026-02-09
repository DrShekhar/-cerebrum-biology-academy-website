// Server Component - JSON-LD Schema for Google Sitelinks Search Box
// Enables search functionality in Google search results for the site
import Script from 'next/script'

/**
 * SiteLinksSearchBoxSchema - Generates WebSite schema with SearchAction
 *
 * Helps Google display a search box in sitelinks beneath your site in search results
 * Improves SERP real estate and click-through rates
 *
 * Usage:
 * <SiteLinksSearchBoxSchema />
 */
export function SiteLinksSearchBoxSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://cerebrumbiologyacademy.com',
    name: 'Cerebrum Biology Academy',
    description: 'Premier NEET Biology coaching with AIIMS-trained faculty',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://cerebrumbiologyacademy.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    sameAs: [
      'https://www.youtube.com/@CerebrumBiologyAcademy',
      'https://www.instagram.com/cerebrumbiologyacademy',
      'https://www.facebook.com/cerebrumbiologyacademy',
      'https://www.linkedin.com/company/cerebrum-biology-academy',
    ],
  }

  return (
    <Script
      id="sitelinks-search-box-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  )
}
