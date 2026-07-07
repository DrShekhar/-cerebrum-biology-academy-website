'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

/**
 * Standard page header: title + one-line subtitle + action slot (ONE primary
 * button; secondaries are outline/ghost). Optional back link for detail pages.
 */
export function PageHeader({
  title,
  subtitle,
  backHref,
  backLabel,
  actions,
}: {
  title: string
  subtitle?: string
  backHref?: string
  backLabel?: string
  actions?: ReactNode
}) {
  return (
    <div className="mb-8">
      {backHref && (
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          {backLabel || 'Back'}
        </Link>
      )}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
      </div>
    </div>
  )
}
