'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import {
  Play,
  BarChart3,
  LogIn,
  UserPlus,
  Users,
  Trophy,
  ArrowRight,
  Search,
  GraduationCap,
} from 'lucide-react'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'
import { useI18n } from '@/contexts/I18nContext'

// Import BurgerMenu directly for reliable navigation (critical UI)
// This ensures the burger menu always renders even if dynamic chunks fail
import { BurgerMenu } from '@/components/navigation/BurgerMenu'

const SearchMenu = dynamic(
  () => import('@/components/navigation/SearchMenu').then((mod) => mod.SearchMenu),
  {
    ssr: false,
    loading: () => (
      <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Search">
        <Search className="w-5 h-5 text-gray-600" />
      </button>
    ),
  }
)

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()
  const { user, isAuthenticated } = useAuth()
  const { t } = useI18n()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
    setIsAuthOpen(false)
    setIsBurgerMenuOpen(false)
    setIsSearchOpen(false)
  }, [pathname])

  const mainNavigation = useMemo(
    () => [
      {
        href: '/results',
        labelKey: 'results' as const,
        icon: Trophy,
        badge: '98%',
        priority: 1,
      },
      {
        href: '/courses',
        labelKey: 'courses' as const,
        icon: GraduationCap,
        priority: 2,
      },
      {
        href: '/faculty',
        labelKey: 'faculty' as const,
        icon: Users,
        priority: 3,
      },
    ],
    []
  )

  const primaryCTA = useMemo(
    () => ({
      labelKey: 'enrollNow' as const,
      href: '/admissions',
      variant: 'primary',
      icon: ArrowRight,
      className: 'bg-green-600 hover:bg-green-700',
    }),
    []
  )

  // Authentication dropdown items
  const authOptions = [
    { href: '/sign-in', label: 'Student Login', icon: LogIn },
    { href: '/sign-up', label: 'New Student Registration', icon: UserPlus },
    { href: '/admin', label: 'Admin Login', icon: Users },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header
      className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-50 border-b border-gray-100"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Left Section - Burger Menu + Logo */}
          <div className="flex items-center space-x-4">
            {/* Burger Menu */}
            <BurgerMenu
              isOpen={isBurgerMenuOpen}
              onToggle={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
              onClose={() => setIsBurgerMenuOpen(false)}
            />

            {/* Enhanced Logo with Brain Design - iOS Safari fix */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group overflow-hidden max-w-[200px] sm:max-w-none">
              {/* Brain Logo */}
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center shadow-md border border-green-100 group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 overflow-hidden">
                  <Image
                    src="/brain-logo.png"
                    alt="Cerebrum Biology Academy Logo"
                    width={40}
                    height={40}
                    sizes="(max-width: 640px) 32px, 40px"
                    className="object-contain w-8 h-8 sm:w-10 sm:h-10"
                    priority
                  />
                </div>
              </div>

              {/* Responsive brand text - iOS Safari fix: use overflow-hidden */}
              <div className="flex flex-col justify-center min-w-0 overflow-hidden flex-shrink">
                <span className="text-lg sm:text-2xl font-bold text-slate-900 leading-none tracking-[-0.02em] antialiased whitespace-nowrap overflow-hidden text-ellipsis">
                  Cerebrum
                </span>
                <span className="text-[10px] sm:text-sm text-slate-600 font-medium leading-tight tracking-wide whitespace-nowrap overflow-hidden text-ellipsis">
                  Biology Academy
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center space-x-8"
            role="navigation"
            aria-label="Main navigation"
          >
            {mainNavigation.map((item, index) => (
              <div key={index} className="relative">
                {'highlight' in item && item.highlight ? (
                  <Link
                    href={item.href!}
                    className={`flex items-center gap-2 font-semibold px-4 py-2 rounded-lg bg-orange-100 text-orange-700 hover:bg-orange-200 border border-orange-300 transition-all duration-300 hover:scale-105 ${
                      isActive(item.href!) ? 'shadow-md' : ''
                    }`}
                  >
                    {item.icon && <item.icon className="w-5 h-5" />}
                    <span>{t(item.labelKey)}</span>
                  </Link>
                ) : (
                  <Link
                    href={item.href!}
                    className={`flex items-center gap-2 font-medium px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive(item.href!)
                        ? 'bg-blue-50 text-blue-600 border-l-2 border-blue-600'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                    aria-current={isActive(item.href!) ? 'page' : undefined}
                  >
                    {item.icon && <item.icon className="w-5 h-5" aria-hidden="true" />}
                    <span>{t(item.labelKey)}</span>
                    {item.badge && (
                      <span
                        className="bg-[#4a5d4a] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm"
                        aria-label={`${item.badge} success rate`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Section - Enhanced CTA Layout */}
          <div className="flex items-center space-x-4">
            {/* Search Menu */}
            <SearchMenu
              isOpen={isSearchOpen}
              onToggle={() => setIsSearchOpen(!isSearchOpen)}
              onClose={() => setIsSearchOpen(false)}
            />

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Dashboard Button (for authenticated users - role-based) */}
              {isAuthenticated ? (
                <Link
                  href={
                    user?.role === 'ADMIN'
                      ? '/admin'
                      : user?.role === 'COUNSELOR'
                        ? '/counselor/leads'
                        : user?.role === 'TEACHER'
                          ? '/teacher/assignments'
                          : '/student/dashboard'
                  }
                  className="flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 bg-[#4a5d4a] hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] whitespace-nowrap"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>
                    {user?.role === 'ADMIN'
                      ? 'Admin Panel'
                      : user?.role === 'COUNSELOR'
                        ? 'CRM Dashboard'
                        : user?.role === 'TEACHER'
                          ? 'Teacher Portal'
                          : 'My Dashboard'}
                  </span>
                </Link>
              ) : (
                <>
                  {/* Free Demo - Ghost Button Style */}
                  <Link
                    href="/demo-booking"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border-2 border-green-600 text-green-600 hover:bg-green-50 hover:border-green-700 hover:text-green-700 hover:shadow-md whitespace-nowrap group"
                  >
                    <Play className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <span>{t('demoClasses')}</span>
                  </Link>

                  {/* Primary CTA - Enroll Now (Enhanced) */}
                  <Link
                    href={primaryCTA.href}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 bg-[#4a5d4a] hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] whitespace-nowrap group"
                  >
                    <span>{t(primaryCTA.labelKey)}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  {/* Sign In - Minimal Text Link */}
                  <Link
                    href="/auth/whatsapp"
                    className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200 group"
                  >
                    <UserPlus className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <span>{t('login')}</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu - Conditional render for performance */}
        {isMenuOpen && (
          <div
            id="mobile-navigation-menu"
            role="navigation"
            aria-label="Mobile navigation"
            className="lg:hidden border-t border-gray-200 py-3 xs:py-4 animate-fade-in"
          >
            <div className="space-y-3 xs:space-y-4">
              {/* Regular Navigation Items */}
              {mainNavigation.map((item, index) => (
                <div key={index}>
                  {'highlight' in item && item.highlight ? (
                    <Link
                      href={item.href!}
                      className="flex items-center gap-2 font-semibold px-4 py-3 rounded-lg bg-orange-100 text-orange-700 hover:bg-orange-200 border border-orange-300 transition-all duration-300 min-h-[48px]"
                    >
                      {item.icon && <item.icon className="w-5 h-5" />}
                      <span>{t(item.labelKey)}</span>
                    </Link>
                  ) : (
                    <Link
                      href={item.href!}
                      className={`flex items-center gap-2 font-medium px-3 py-2 rounded-lg min-h-[48px] transition-all duration-200 ${
                        isActive(item.href!)
                          ? 'bg-blue-50 text-blue-600 border-l-2 border-blue-600'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                    >
                      {item.icon && <item.icon className="w-5 h-5" />}
                      <span>{t(item.labelKey)}</span>
                      {item.badge && (
                        <span className="bg-[#4a5d4a] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile CTA Buttons */}
              <div className="pt-3 xs:pt-4 border-t border-gray-200 space-y-3">
                {/* Dashboard Button (for authenticated users - role-based) */}
                {isAuthenticated ? (
                  <Link
                    href={
                      user?.role === 'ADMIN'
                        ? '/admin'
                        : user?.role === 'COUNSELOR'
                          ? '/counselor/leads'
                          : user?.role === 'TEACHER'
                            ? '/teacher/assignments'
                            : '/student/dashboard'
                    }
                    className="flex items-center justify-center gap-2 bg-[#4a5d4a] text-white px-6 py-4 rounded-full font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 min-h-[52px] shadow-lg"
                  >
                    <BarChart3 className="w-5 h-5" />
                    <span>
                      {user?.role === 'ADMIN'
                        ? 'Admin Panel'
                        : user?.role === 'COUNSELOR'
                          ? 'CRM Dashboard'
                          : user?.role === 'TEACHER'
                            ? 'Teacher Portal'
                            : 'My Dashboard'}
                    </span>
                  </Link>
                ) : (
                  <>
                    {/* Free Demo - Ghost Style */}
                    <Link
                      href="/demo-booking"
                      className="flex items-center justify-center gap-2 border-2 border-green-600 text-green-600 px-6 py-4 rounded-full font-semibold hover:bg-green-50 hover:border-green-700 hover:text-green-700 transition-all duration-300 min-h-[52px]"
                    >
                      <Play className="w-5 h-5" />
                      <span>{t('demoClasses')}</span>
                    </Link>

                    {/* Primary CTA - Enroll Now */}
                    <Link
                      href={primaryCTA.href}
                      className="flex items-center justify-center gap-2 bg-[#4a5d4a] text-white px-6 py-4 rounded-full font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 min-h-[52px] shadow-lg"
                    >
                      <span>{t(primaryCTA.labelKey)}</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>

                    {/* Sign In - Subtle Style (keep button for touch target) */}
                    <Link
                      href="/auth/whatsapp"
                      className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 px-6 py-4 rounded-full font-medium transition-all duration-300 min-h-[52px]"
                    >
                      <UserPlus className="w-5 h-5" />
                      <span>{t('login')}</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
