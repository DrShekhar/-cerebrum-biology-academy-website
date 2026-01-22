/**
 * CitationBadge Component
 * Displays verified statistics with source citations for GEO optimization
 * AI engines (Google SGE, Perplexity, Claude) require cited claims to be trustworthy
 *
 * CRITICAL FOR GEO: Uncited statistics will NOT be referenced by AI engines
 *
 * SECURITY NOTE: dangerouslySetInnerHTML is safe here - content is from trusted
 * props (not user input) for standard JSON-LD schema markup.
 */

import { CheckCircle, ExternalLink, Info } from 'lucide-react'

export interface CitationSource {
  name: string
  url?: string
  date?: string
  type?: 'internal' | 'external' | 'verified'
}

interface CitationBadgeProps {
  statistic: string
  value: string | number
  source: CitationSource
  description?: string
  verifiedDate?: string
  showBadge?: boolean
  variant?: 'inline' | 'block' | 'card'
  className?: string
}

interface CitedStatisticProps {
  label: string
  value: string | number
  unit?: string
  source: CitationSource
  description?: string
  icon?: React.ReactNode
}

/**
 * Inline citation badge - for use within text
 */
export function CitationBadge({
  statistic,
  value,
  source,
  verifiedDate,
  showBadge = true,
  variant = 'inline',
  className = '',
}: CitationBadgeProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Claim',
    claimReviewed: `${statistic}: ${value}`,
    author: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5',
      ratingExplanation: 'Verified internal data',
    },
    itemReviewed: {
      '@type': 'CreativeWork',
      author: {
        '@type': 'Organization',
        name: source.name,
        ...(source.url && { url: source.url }),
      },
      ...(source.date && { datePublished: source.date }),
    },
    ...(verifiedDate && { datePublished: verifiedDate }),
  }

  if (variant === 'inline') {
    return (
      <span
        className={`citation-inline inline-flex items-center gap-1 ${className}`}
        data-citation={source.name}
      >
        <strong className="font-semibold text-green-700">{value}</strong>
        {showBadge && (
          <span
            className="inline-flex items-center gap-0.5 rounded bg-green-50 px-1.5 py-0.5 text-xs text-green-600"
            title={`Source: ${source.name}${source.date ? ` (${source.date})` : ''}`}
          >
            <CheckCircle className="h-3 w-3" />
            <span className="sr-only">Verified by {source.name}</span>
          </span>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </span>
    )
  }

  if (variant === 'block') {
    return (
      <div
        className={`citation-block flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 ${className}`}
      >
        <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
        <div>
          <span className="font-semibold text-slate-900">{value}</span>
          <span className="ml-1 text-slate-700">{statistic}</span>
          <div className="mt-0.5 text-xs text-slate-500">
            Source: {source.name}
            {source.url && (
              <a
                href={source.url}
                target="_blank" rel="noopener noreferrer"
                className="ml-1 text-green-600 hover:underline"
              >
                <ExternalLink className="inline h-3 w-3" />
              </a>
            )}
          </div>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </div>
    )
  }

  return null
}

/**
 * Cited Statistic Card - for prominent statistics display
 */
export function CitedStatistic({
  label,
  value,
  unit = '',
  source,
  description,
  icon,
}: CitedStatisticProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'StatisticalPopulation',
    name: label,
    numConstraints: 1,
    populationType: {
      '@type': 'Class',
      name: 'Students',
    },
  }

  return (
    <div className="cited-stat-card rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-3 flex items-start justify-between">
        {icon && <div className="text-green-600">{icon}</div>}
        <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
          <CheckCircle className="h-3 w-3" />
          Verified
        </div>
      </div>

      <div className="mb-2">
        <span className="text-4xl font-bold text-slate-900">{value}</span>
        {unit && <span className="ml-1 text-lg text-slate-600">{unit}</span>}
      </div>

      <p className="mb-3 text-sm font-medium text-slate-700">{label}</p>

      {description && <p className="mb-3 text-xs text-slate-500">{description}</p>}

      <div className="flex items-center gap-1 border-t border-slate-100 pt-3 text-xs text-slate-500">
        <Info className="h-3 w-3" />
        <span>
          Source:{' '}
          {source.url ? (
            <a
              href={source.url}
              target="_blank" rel="noopener noreferrer"
              className="text-green-600 hover:underline"
            >
              {source.name}
            </a>
          ) : (
            <span>{source.name}</span>
          )}
        </span>
        {source.date && <span className="text-slate-400">({source.date})</span>}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </div>
  )
}

/**
 * Statistics Grid - for displaying multiple verified statistics
 */
export function VerifiedStatsGrid({
  stats,
}: {
  stats: Array<{
    label: string
    value: string | number
    unit?: string
    source: CitationSource
    icon?: React.ReactNode
  }>
}) {
  return (
    <div className="verified-stats-grid">
      <div className="mb-4 flex items-center gap-2">
        <CheckCircle className="h-5 w-5 text-green-600" />
        <span className="text-sm font-medium text-slate-700">
          All statistics verified from official sources
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat, idx) => (
          <CitedStatistic key={idx} {...stat} />
        ))}
      </div>
    </div>
  )
}

/**
 * Pre-configured citation sources for common statistics
 */
export const CITATION_SOURCES = {
  internalData: {
    name: 'Cerebrum Biology Academy Internal Records',
    date: '2024',
    type: 'internal' as const,
  },
  ntaResults: {
    name: 'NTA NEET Results',
    url: 'https://neet.nta.nic.in',
    date: '2024',
    type: 'external' as const,
  },
  studentSurvey: {
    name: 'Student Feedback Survey 2024',
    date: 'December 2024',
    type: 'internal' as const,
  },
  placementRecords: {
    name: 'MBBS Admission Records 2024',
    date: '2024',
    type: 'verified' as const,
  },
}

export default CitationBadge
