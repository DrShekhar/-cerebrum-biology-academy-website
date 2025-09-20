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
      className={`mobile-nav fixed bottom-0 left-0 right-0 md:hidden bg-slate-900 border-t border-slate-800 z-50 ${className}`}
    >
      <div className="grid grid-cols-5 gap-1">
        {navItems.map((item) => {
          const active = isActive(item.href)
          const IconComponent = active ? item.iconSolid : item.icon

          if (item.isExternal) {
            return (
              <button
                key={item.href}
                onClick={() => handleNavClick(item)}
                className={`nav-item flex flex-col items-center justify-center py-2 px-1 text-xs transition-colors duration-200 ${
                  item.highlight
                    ? 'text-emerald-400 bg-emerald-400/10'
                    : active
                      ? 'text-emerald-400 bg-slate-800'
                      : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <IconComponent className="w-5 h-5 mb-1" />
                <span className="text-xs leading-tight">{item.label}</span>
              </button>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item flex flex-col items-center justify-center py-2 px-1 text-xs transition-colors duration-200 ${
                item.highlight
                  ? 'text-emerald-400 bg-emerald-400/10'
                  : active
                    ? 'text-emerald-400 bg-slate-800'
                    : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <IconComponent className="w-5 h-5 mb-1" />
              <span className="text-xs leading-tight">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
