'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface CityBreadcrumbProps {
  cityName: string
  stateName: string
  stateSlug?: string
}

export function CityBreadcrumb({ cityName, stateName, stateSlug }: CityBreadcrumbProps) {
  const stateHref = stateSlug ? `/neet-coaching-${stateSlug}` : '#'

  return (
    <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <ol className="flex items-center text-sm text-gray-600 flex-wrap gap-1">
          <li className="flex items-center">
            <Link href="/" className="hover:text-teal-600 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
          </li>
          <ChevronRight className="w-3.5 h-3.5 mx-1 text-gray-400 flex-shrink-0" />
          <li>
            <Link href="/locations" className="hover:text-teal-600 transition-colors">
              Locations
            </Link>
          </li>
          <ChevronRight className="w-3.5 h-3.5 mx-1 text-gray-400 flex-shrink-0" />
          <li>
            <Link href={stateHref} className="hover:text-teal-600 transition-colors">
              {stateName}
            </Link>
          </li>
          <ChevronRight className="w-3.5 h-3.5 mx-1 text-gray-400 flex-shrink-0" />
          <li className="text-teal-700 font-medium" aria-current="page">
            NEET Coaching {cityName}
          </li>
        </ol>
      </div>
    </nav>
  )
}
