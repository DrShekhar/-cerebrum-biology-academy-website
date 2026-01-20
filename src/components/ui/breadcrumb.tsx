import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav className={`flex items-center space-x-1 text-sm text-gray-600 ${className}`}>
      <Link 
        href="/" 
        className="flex items-center hover:text-blue-600 transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>
      
      {items.map((item, index) => (
        <div key={`bc-${item.label.toLowerCase().replace(/\s+/g, '-')}-${item.href || 'current'}`} className="flex items-center">
          <ChevronRight className="h-4 w-4 mx-2 text-gray-500" />
          {item.href && index < items.length - 1 ? (
            <Link 
              href={item.href}
              className="hover:text-blue-600 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className={index === items.length - 1 ? 'text-gray-900 font-medium' : ''}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}