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
      href: '/admin/ai-education',
      label: 'AI Tutor',
      icon: BeakerIcon,
      iconSolid: BeakerSolid,
      highlight: true,
    },
    {
      href: '/tests',
      label: 'Tests',
      icon: BookOpenIcon,
      iconSolid: BookSolid,
    },
    {
      href: '/progress',
      label: 'Progress',
      icon: TrophyIcon,
      iconSolid: TrophySolid,
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
      className={`mobile-nav fixed bottom-0 left-0 right-0 md:hidden bg-white border-t-2 border-gray-200 z-50 shadow-2xl safe-area-bottom ${className}`}
      style={{
        paddingBottom: 'max(env(safe-area-inset-bottom), 12px)',
        paddingTop: '8px',
      }}
    >
      <div className="grid grid-cols-4 gap-0 bg-white">
        {navItems.map((item) => {
          const active = isActive(item.href)
          const IconComponent = active ? item.iconSolid : item.icon

          if (item.isExternal) {
            return (
              <button
                key={item.href}
                onClick={() => handleNavClick(item)}
                className={`nav-item flex flex-col items-center justify-center touch-target-large mobile-focus ripple-effect haptic-feedback ${
                  item.highlight
                    ? 'text-green-600 bg-green-50 border-t-4 border-green-600 rounded-t-xl'
                    : active
                      ? 'text-blue-600 bg-blue-50 border-t-4 border-blue-600'
                      : 'text-gray-600 hover:text-gray-800 border-t-4 border-transparent hover:bg-gray-50'
                } py-2.5 xs:py-3 px-0.5 xs:px-1 min-h-[60px] xs:min-h-[64px] transition-all duration-200`}
                aria-label={`${item.label} - ${item.isExternal ? 'Call now' : 'Navigate to'}`}
              >
                <IconComponent className="w-6 xs:w-7 h-6 xs:h-7 mb-0.5 xs:mb-1" />
                <span className="text-[9px] xs:text-[10px] leading-tight font-semibold">
                  {item.label}
                </span>
              </button>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item flex flex-col items-center justify-center touch-target-large mobile-focus ripple-effect haptic-feedback ${
                item.highlight
                  ? 'text-green-600 bg-green-50 border-t-4 border-green-600 rounded-t-xl scale-105 shadow-lg'
                  : active
                    ? 'text-blue-600 bg-blue-50 border-t-4 border-blue-600'
                    : 'text-gray-600 hover:text-gray-800 border-t-4 border-transparent hover:bg-gray-50'
              } py-2.5 xs:py-3 px-0.5 xs:px-1 min-h-[60px] xs:min-h-[64px] transition-all duration-200`}
              aria-label={`${item.label} - Navigate to ${item.label} page`}
            >
              <IconComponent className="w-6 xs:w-7 h-6 xs:h-7 mb-0.5 xs:mb-1" />
              <span className="text-[9px] xs:text-[10px] leading-tight font-semibold">
                {item.label}
              </span>
              {item.highlight && (
                <span className="absolute top-1 right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
