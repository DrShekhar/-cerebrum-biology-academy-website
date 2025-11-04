'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  BarChart3,
  MessageCircle,
  User,
  Menu,
  X,
  BookOpen,
  Award,
  Users,
  HelpCircle,
  ChevronRight,
  Play,
  LogIn,
  UserPlus,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

interface MobileNavigationProps {
  className?: string
}

interface NavItem {
  icon: React.ComponentType<{ className?: string }>
  label: string
  href: string
  requiresAuth?: boolean
  ariaLabel: string
}

interface MenuSection {
  title: string
  items: MenuItem[]
}

interface MenuItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  description?: string
}

export function MobileNavigation({ className = '' }: MobileNavigationProps) {
  const pathname = usePathname()
  const { user, isAuthenticated } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMenuOpen])

  const bottomNavItems: NavItem[] = [
    {
      icon: Home,
      label: 'Home',
      href: '/',
      ariaLabel: 'Navigate to home page',
    },
    {
      icon: BookOpen,
      label: 'Tests',
      href: '/ai-education-demo',
      ariaLabel: 'Navigate to tests page',
    },
    {
      icon: BarChart3,
      label: 'Progress',
      href: '/dashboard/student',
      requiresAuth: true,
      ariaLabel: 'View your progress dashboard',
    },
    {
      icon: MessageCircle,
      label: 'Chat',
      href: '/ai-education-demo#chat',
      ariaLabel: 'Open AI chat',
    },
    {
      icon: User,
      label: 'Profile',
      href: isAuthenticated ? '/profile' : '/auth/signin',
      ariaLabel: isAuthenticated ? 'View your profile' : 'Sign in to view profile',
    },
  ]

  const menuSections: MenuSection[] = [
    {
      title: 'Main Navigation',
      items: [
        { label: 'Home', href: '/', icon: Home },
        { label: 'About Us', href: '/about', icon: Users },
        { label: 'Courses', href: '/courses', icon: BookOpen },
        { label: 'Results', href: '/results', icon: Award },
        { label: 'Resources', href: '/resources', icon: BookOpen },
        { label: 'Contact', href: '/contact', icon: HelpCircle },
      ],
    },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    if (href.includes('#')) {
      const [path, hash] = href.split('#')
      return pathname === path
    }
    return pathname.startsWith(href)
  }

  const handleMenuItemClick = () => {
    setIsMenuOpen(false)
  }

  const handleBackdropClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <nav
        role="navigation"
        aria-label="Mobile bottom navigation"
        className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-40 ${className}`}
        style={{
          paddingBottom: 'max(env(safe-area-inset-bottom), 12px)',
        }}
      >
        <div className="flex justify-around items-center py-3">
          {bottomNavItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)

            if (item.label === 'Menu') {
              return (
                <button
                  key={item.label}
                  onClick={() => setIsMenuOpen(true)}
                  className="flex flex-col items-center gap-1 transition-colors min-w-[44px] min-h-[44px] justify-center text-gray-500 hover:text-gray-900"
                  aria-label="Open main menu"
                  aria-expanded={isMenuOpen}
                  aria-haspopup="menu"
                >
                  <Icon className="w-6 h-6" aria-hidden="true" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              )
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex flex-col items-center gap-1 transition-colors min-w-[44px] min-h-[44px] justify-center ${
                  active ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'
                }`}
                aria-label={item.ariaLabel}
                aria-current={active ? 'page' : undefined}
              >
                <Icon className="w-6 h-6" aria-hidden="true" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
              onClick={handleBackdropClick}
              aria-hidden="true"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              role="dialog"
              aria-modal="true"
              aria-label="Main menu"
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-xl z-50 md:hidden overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
                <h2 className="text-lg font-bold text-gray-900">Menu</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-gray-500" aria-hidden="true" />
                </button>
              </div>

              <div className="p-4 space-y-6">
                {menuSections.map((section) => (
                  <div key={section.title}>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      {section.title}
                    </h3>
                    <div className="space-y-1">
                      {section.items.map((item) => {
                        const ItemIcon = item.icon
                        const active = isActive(item.href)

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={handleMenuItemClick}
                            className={`flex items-center justify-between p-3 rounded-lg transition-colors min-h-[48px] ${
                              active ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                            }`}
                            aria-current={active ? 'page' : undefined}
                          >
                            <div className="flex items-center gap-3">
                              <ItemIcon className="w-5 h-5" aria-hidden="true" />
                              <div>
                                <span className="font-medium">{item.label}</span>
                                {item.description && (
                                  <p className="text-xs text-gray-500">{item.description}</p>
                                )}
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4" aria-hidden="true" />
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                ))}

                <div className="pt-6 border-t border-gray-200">
                  {isAuthenticated ? (
                    <Link
                      href="/dashboard/student"
                      onClick={handleMenuItemClick}
                      className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors min-h-[52px]"
                    >
                      <BarChart3 className="w-5 h-5" aria-hidden="true" />
                      <span>My Dashboard</span>
                    </Link>
                  ) : (
                    <div className="space-y-3">
                      <Link
                        href="/auth/signin"
                        onClick={handleMenuItemClick}
                        className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors min-h-[52px]"
                      >
                        <LogIn className="w-5 h-5" aria-hidden="true" />
                        <span>Sign In</span>
                      </Link>
                      <Link
                        href="/auth/signup"
                        onClick={handleMenuItemClick}
                        className="flex items-center justify-center gap-2 w-full bg-gray-100 text-gray-700 px-6 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors min-h-[52px]"
                      >
                        <UserPlus className="w-5 h-5" aria-hidden="true" />
                        <span>Sign Up</span>
                      </Link>
                    </div>
                  )}
                </div>

                <div className="pt-4">
                  <Link
                    href="/demo-booking"
                    onClick={handleMenuItemClick}
                    className="flex items-center justify-center gap-2 w-full bg-orange-100 text-orange-700 px-6 py-4 rounded-lg font-semibold hover:bg-orange-200 transition-colors border border-orange-300 min-h-[52px]"
                  >
                    <Play className="w-5 h-5" aria-hidden="true" />
                    <span>Book Free Demo</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
