'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  HomeIcon,
  BookOpenIcon,
  BeakerIcon,
  TrophyIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'
import {
  HomeIcon as HomeSolid,
  BookOpenIcon as BookSolid,
  BeakerIcon as BeakerSolid,
  TrophyIcon as TrophySolid,
  PhoneIcon as PhoneSolid,
} from '@heroicons/react/24/solid'

interface MobileBottomNavProps {
  className?: string
}

interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  iconSolid: React.ComponentType<{ className?: string }>
  highlight?: boolean
  isExternal?: boolean
}

export function MobileBottomNav({ className = '' }: MobileBottomNavProps) {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    {
      href: '/',
      label: 'Home',
      icon: HomeIcon,
      iconSolid: HomeSolid,
    },
    {
      href: '/courses',
      label: 'Courses',
      icon: BookOpenIcon,
      iconSolid: BookSolid,
    },
    {
      href: '/course-finder',
      label: 'Find Course',
      icon: BeakerIcon,
      iconSolid: BeakerSolid,
      highlight: true,
    },
    {
      href: '/success-stories',
      label: 'Results',
      icon: TrophyIcon,
      iconSolid: TrophySolid,
    },
    {
      href: 'tel:+918826444334',
      label: 'Call',
      icon: PhoneIcon,
      iconSolid: PhoneSolid,
      isExternal: true,
    },
  ]

  const handleNavClick = (item: NavItem) => {
    if (item.isExternal) {
      window.open(item.href, '_self')
    }
  }

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <div
      className={`mobile-nav fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 z-50 shadow-lg safe-area-bottom ${className}`}
      style={{
        paddingBottom: 'max(env(safe-area-inset-bottom), 8px)',
      }}
    >
      <div className="grid grid-cols-5 gap-0 bg-white">
        {navItems.map((item) => {
          const active = isActive(item.href)
          const IconComponent = active ? item.iconSolid : item.icon

          if (item.isExternal) {
            return (
              <button
                key={item.href}
                onClick={() => handleNavClick(item)}
                className={`nav-item flex flex-col items-center justify-center touch-target-large mobile-focus ripple-effect ${
                  item.highlight
                    ? 'text-emerald-600 bg-emerald-50 border-t-2 border-emerald-600'
                    : active
                      ? 'text-primary-600 bg-primary-50 border-t-2 border-primary-600'
                      : 'text-gray-500 hover:text-gray-700 border-t-2 border-transparent'
                } py-2 px-1 min-h-touch-md transition-all duration-200`}
                aria-label={`${item.label} - ${item.isExternal ? 'Call now' : 'Navigate to'}`}
              >
                <IconComponent className="w-6 h-6 mb-1" />
                <span className="text-xs leading-tight font-medium">{item.label}</span>
              </button>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item flex flex-col items-center justify-center touch-target-large mobile-focus ripple-effect ${
                item.highlight
                  ? 'text-emerald-600 bg-emerald-50 border-t-2 border-emerald-600'
                  : active
                    ? 'text-primary-600 bg-primary-50 border-t-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700 border-t-2 border-transparent'
              } py-2 px-1 min-h-touch-md transition-all duration-200`}
              aria-label={`${item.label} - Navigate to ${item.label} page`}
            >
              <IconComponent className="w-6 h-6 mb-1" />
              <span className="text-xs leading-tight font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
