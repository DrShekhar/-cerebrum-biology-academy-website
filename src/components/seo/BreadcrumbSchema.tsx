/**
 * BreadcrumbSchema Component
 * Standardized breadcrumb implementation with schema.org/BreadcrumbList
 * Critical for both user navigation and search engine understanding of site structure
 *
 * SEO IMPACT: Rich breadcrumbs appear in search results, improving CTR
 *
 * SECURITY NOTE: dangerouslySetInnerHTML is safe here - content is from trusted
 * props (not user input) for standard JSON-LD schema markup.
 */

import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'

export interface BreadcrumbItem {
  label: string
  href?: string
  isCurrentPage?: boolean
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[]
  showHome?: boolean
  homeLabel?: string
  variant?: 'default' | 'minimal' | 'pills'
  className?: string
  showSchemaOnly?: boolean
}

/**
 * Standard breadcrumb with schema markup
 */
export function BreadcrumbSchema({
  items,
  showHome = true,
  homeLabel = 'Home',
  variant = 'default',
  className = '',
  showSchemaOnly = false,
}: BreadcrumbSchemaProps) {
  const baseUrl = 'https://cerebrumbiologyacademy.com'

  const allItems: BreadcrumbItem[] = showHome ? [{ label: homeLabel, href: '/' }, ...items] : items

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `${baseUrl}${item.href}` : undefined,
    })),
  }

  if (showSchemaOnly) {
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    )
  }

  if (variant === 'minimal') {
    return (
      <>
        <nav
          aria-label="Breadcrumb"
          className={`breadcrumb-minimal text-sm text-slate-500 ${className}`}
        >
          <ol className="flex flex-wrap items-center gap-1">
            {allItems.map((item, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && <span className="mx-1 text-slate-400">/</span>}
                {item.href && !item.isCurrentPage ? (
                  <Link href={item.href} className="hover:text-teal-600 hover:underline">
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className="text-slate-700"
                    aria-current={item.isCurrentPage ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </>
    )
  }

  if (variant === 'pills') {
    return (
      <>
        <nav aria-label="Breadcrumb" className={`breadcrumb-pills ${className}`}>
          <ol className="flex flex-wrap items-center gap-2">
            {allItems.map((item, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && <ChevronRight className="mx-1 h-4 w-4 text-slate-400" />}
                {item.href && !item.isCurrentPage ? (
                  <Link
                    href={item.href}
                    className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600 hover:bg-teal-100 hover:text-teal-700"
                  >
                    {index === 0 && showHome ? <Home className="h-4 w-4" /> : item.label}
                  </Link>
                ) : (
                  <span
                    className="rounded-full bg-teal-100 px-3 py-1 text-sm font-medium text-teal-700"
                    aria-current={item.isCurrentPage ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </>
    )
  }

  return (
    <>
      <nav aria-label="Breadcrumb" className={`breadcrumb-default ${className}`}>
        <ol className="flex flex-wrap items-center text-sm">
          {allItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && <ChevronRight className="mx-2 h-4 w-4 flex-shrink-0 text-slate-400" />}
              {item.href && !item.isCurrentPage ? (
                <Link
                  href={item.href}
                  className="flex items-center text-slate-600 hover:text-teal-600"
                >
                  {index === 0 && showHome ? (
                    <>
                      <Home className="mr-1 h-4 w-4" />
                      <span className="sr-only md:not-sr-only">{item.label}</span>
                    </>
                  ) : (
                    item.label
                  )}
                </Link>
              ) : (
                <span
                  className="font-medium text-slate-900"
                  aria-current={item.isCurrentPage ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  )
}

/**
 * Pre-configured breadcrumbs for common page types
 */
export const COMMON_BREADCRUMBS = {
  courses: (courseName: string): BreadcrumbItem[] => [
    { label: 'Courses', href: '/courses' },
    { label: courseName, isCurrentPage: true },
  ],
  blog: (title: string, category?: string): BreadcrumbItem[] =>
    category
      ? [
          { label: 'Blog', href: '/blog' },
          {
            label: category,
            href: `/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
          },
          { label: title, isCurrentPage: true },
        ]
      : [
          { label: 'Blog', href: '/blog' },
          { label: title, isCurrentPage: true },
        ],
  glossary: (term: string): BreadcrumbItem[] => [
    { label: 'Resources', href: '/resources' },
    { label: 'Glossary', href: '/glossary' },
    { label: term, isCurrentPage: true },
  ],
  topic: (chapter: string, topic: string): BreadcrumbItem[] => [
    { label: 'NEET Biology', href: '/neet-biology' },
    { label: chapter, href: `/neet-biology/${chapter.toLowerCase().replace(/\s+/g, '-')}` },
    { label: topic, isCurrentPage: true },
  ],
  dashboard: (section: string): BreadcrumbItem[] => [
    { label: 'Dashboard', href: '/dashboard' },
    { label: section, isCurrentPage: true },
  ],
  about: (page: string): BreadcrumbItem[] => [
    { label: 'About', href: '/about' },
    { label: page, isCurrentPage: true },
  ],
}

/**
 * Hook-friendly breadcrumb generator for dynamic pages
 */
export function generateBreadcrumbs(
  pathname: string,
  customLabels?: Record<string, string>
): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = []

  let currentPath = ''

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const isLast = index === segments.length - 1
    const label =
      customLabels?.[segment] ||
      segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

    breadcrumbs.push({
      label,
      href: isLast ? undefined : currentPath,
      isCurrentPage: isLast,
    })
  })

  return breadcrumbs
}

/**
 * WebPage schema with breadcrumb for complete page SEO
 */
export function PageWithBreadcrumbSchema({
  title,
  description,
  url,
  breadcrumbs,
  image,
  dateModified,
}: {
  title: string
  description: string
  url: string
  breadcrumbs: BreadcrumbItem[]
  image?: string
  dateModified?: string
}) {
  const baseUrl = 'https://cerebrumbiologyacademy.com'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: `${baseUrl}${url}`,
    ...(image && { image: image }),
    ...(dateModified && { dateModified: new Date(dateModified).toISOString() }),
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
        ...breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 2,
          name: item.label,
          ...(item.href && { item: `${baseUrl}${item.href}` }),
        })),
      ],
    },
    isPartOf: {
      '@type': 'WebSite',
      name: 'Cerebrum Biology Academy',
      url: baseUrl,
    },
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: baseUrl,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default BreadcrumbSchema
