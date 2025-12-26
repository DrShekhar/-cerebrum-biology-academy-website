'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  HomeIcon,
  BookOpen,
  FlaskConical,
  Trophy,
  Phone,
  Play,
} from 'lucide-react'
import { CONTACT_INFO, getPhoneLink, getFormattedPhone } from '@/lib/constants/contactInfo'

interface MobileBottomNavProps {
  className?: string
}

interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
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
    },
    {
      href: '/demo-booking',
      label: 'Demo',
      icon: Play,
      highlight: true,
    },
    {
      href: getPhoneLink('primary'),
      label: 'Call',
      icon: Phone,
      isExternal: true,
    },
    {
      href: '/tests',
      label: 'Tests',
      icon: BookOpen,
    },
    {
      href: '/results',
      label: 'Results',
      icon: Trophy,
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
      className={`mobile-nav fixed bottom-0 left-0 right-0 md:hidden bg-white border-t-2 border-gray-200 z-[60] shadow-2xl safe-area-bottom ${className}`}
      style={{
        paddingBottom: 'max(env(safe-area-inset-bottom), 12px)',
        paddingTop: '8px',
      }}
    >
      <div className="grid grid-cols-5 gap-1 bg-white">
        {navItems.map((item) => {
          const active = isActive(item.href)
          const IconComponent = item.icon

          if (item.isExternal) {
            return (
              <a
                key={item.href}
                href={item.href}
                className="nav-item flex flex-col items-center justify-center touch-target-large mobile-focus ripple-effect haptic-feedback text-green-600 bg-green-50 border-t-4 border-green-600 py-2.5 xs:py-3 px-2 xs:px-3 min-h-[60px] xs:min-h-[64px] transition-all duration-200 animate-pulse"
                aria-label={`Call us now at ${getFormattedPhone('primary')}`}
              >
                <IconComponent className="w-5 xs:w-6 h-5 xs:h-6 mb-1.5 xs:mb-2" />
                <span className="text-xs leading-tight font-semibold">{item.label}</span>
              </a>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item flex flex-col items-center justify-center touch-target-large mobile-focus ripple-effect haptic-feedback ${
                active
                  ? 'text-blue-600 bg-blue-50 border-t-4 border-blue-600'
                  : item.highlight
                    ? 'text-green-600 bg-green-50 border-t-4 border-green-600 rounded-t-xl scale-105 shadow-lg'
                    : 'text-gray-600 hover:text-gray-800 border-t-4 border-transparent hover:bg-gray-50'
              } py-2.5 xs:py-3 px-2 xs:px-3 min-h-[60px] xs:min-h-[64px] transition-all duration-200`}
              aria-label={`${item.label} - Navigate to ${item.label} page`}
            >
              <IconComponent className="w-5 xs:w-6 h-5 xs:h-6 mb-1.5 xs:mb-2" />
              <span className="text-xs leading-tight font-semibold">{item.label}</span>
              {item.highlight && (
                <span className="absolute top-1 right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
                </span>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
