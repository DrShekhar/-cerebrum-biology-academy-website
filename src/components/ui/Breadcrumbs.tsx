'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface BreadcrumbItem {
  label: string
  href?: string
  current?: boolean
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const pathname = usePathname()

  // Auto-generate breadcrumbs from pathname if no items provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', href: '/' }]

    let currentPath = ''
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const isLast = index === pathSegments.length - 1

      // Convert URL segment to readable label
      let label = segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      // Special cases for common paths
      const labelMap: Record<string, string> = {
        courses: 'Courses',
        about: 'About',
        faculty: 'Faculty',
        locations: 'Centers',
        'success-stories': 'Results',
        'explore-courses': 'Explore Courses',
        demo: 'Book Demo',
        enrollment: 'Enrollment',
        'class-11': 'Class 11 NEET',
        'class-12': 'Class 12 NEET',
        dropper: 'Dropper Program',
        foundation: 'Foundation',
        'neet-complete': 'NEET Complete',
        'neet-dropper': 'NEET Dropper',
        'intensive-neet-biology': 'Intensive Biology',
      }

      if (labelMap[segment]) {
        label = labelMap[segment]
      }

      breadcrumbs.push({
        label,
        href: isLast ? undefined : currentPath,
        current: isLast,
      })
    })

    return breadcrumbs
  }

  const breadcrumbItems = items || generateBreadcrumbs()

  // Don't show breadcrumbs on homepage
  if (pathname === '/') {
    return null
  }

  return (
    <nav className={`breadcrumbs text-sm text-gray-400 py-2 ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-2 text-gray-500">/</span>}

            {item.href && !item.current ? (
              <Link href={item.href} className="hover:text-gray-300 transition-colors duration-200">
                {item.label}
              </Link>
            ) : (
              <span className={item.current ? 'text-white font-medium' : 'text-gray-400'}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// Convenience component for manual breadcrumb setup
export function BreadcrumbContainer({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={`container mx-auto px-4 ${className}`}>{children}</div>
}
