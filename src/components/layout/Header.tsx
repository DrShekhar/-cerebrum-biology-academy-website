'use client'

import { useState, useEffect, memo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Menu,
  X,
  Phone,
  Play,
  BarChart3,
  LogIn,
  UserPlus,
  Monitor,
  Users,
  Globe,
  HelpCircle,
  Brain,
  Sparkles,
  Trophy,
  ArrowRight,
  Search,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { BurgerMenu } from '@/components/navigation/BurgerMenu'
import { SearchMenu } from '@/components/navigation/SearchMenu'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()
  const { user, isAuthenticated } = useAuth()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
    setIsAuthOpen(false)
    setIsBurgerMenuOpen(false)
    setIsSearchOpen(false)
  }, [pathname])

  const mainNavigation = [
    {
      href: '/results',
      label: 'Results',
      icon: Trophy,
      badge: '98%',
      priority: 1,
    },
    {
      href: '/courses',
      label: 'Courses',
      priority: 2,
    },
    {
      href: '/faculty',
      label: 'Faculty',
      icon: Users,
      priority: 3,
    },
  ]

  const primaryCTA = {
    label: 'Enroll Now',
    href: '/admissions',
    variant: 'primary',
    icon: ArrowRight,
    className: 'bg-green-600 hover:bg-green-700',
  }

  // Authentication dropdown items
  const authOptions = [
    { href: '/auth/signin', label: 'Student Login', icon: LogIn },
    { href: '/auth/signup', label: 'New Student Registration', icon: UserPlus },
    { href: '/admin', label: 'Admin Login', icon: Users },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100" role="banner">
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

            {/* Enhanced Logo with Brain Design */}
            <Link href="/" className="flex items-center space-x-3 group">
              {/* Beautiful Brain Logo */}
              <div className="relative">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md border border-teal-100 group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 overflow-hidden">
                  <Image
                    src="/brain-logo.png"
                    alt="Cerebrum Biology Academy Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                    priority
                  />
                </div>
                {/* Teal glow effect on hover */}
                <div className="absolute inset-0 bg-teal-400/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
              </div>

              {/* Mobile: Compact brand display */}
              <div className="block sm:hidden">
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-slate-900 leading-tight tracking-[-0.02em] antialiased">
                    Cerebrum
                  </span>
                  <span className="text-xs text-slate-600 font-medium -mt-1 tracking-wide">
                    Biology Academy
                  </span>
                </div>
              </div>

              {/* Desktop: Full brand display */}
              <div className="hidden sm:block">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-slate-900 leading-tight tracking-[-0.02em] antialiased">
                    Cerebrum
                  </span>
                  <span className="text-sm text-slate-600 font-medium -mt-1 tracking-wide">
                    Biology Academy
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center space-x-6"
            role="navigation"
            aria-label="Main navigation"
          >
            {mainNavigation.map((item, index) => (
              <div key={index} className="relative">
                {item.highlight ? (
                  <Link
                    href={item.href!}
                    className={`flex items-center space-x-2 font-semibold px-4 py-2 rounded-lg bg-orange-100 text-orange-700 hover:bg-orange-200 border border-orange-300 transition-all duration-300 ${
                      isActive(item.href!) ? 'shadow-md' : ''
                    }`}
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <Link
                    href={item.href!}
                    className={`flex items-center space-x-1.5 font-medium transition-colors ${
                      isActive(item.href!) ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                    }`}
                    aria-current={isActive(item.href!) ? 'page' : undefined}
                  >
                    {item.icon && <item.icon className="w-4 h-4" aria-hidden="true" />}
                    <span>{item.label}</span>
                    {item.badge && (
                      <span
                        className="ml-1 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full"
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
          <div className="flex items-center gap-3">
            {/* Search Menu */}
            <SearchMenu
              isOpen={isSearchOpen}
              onToggle={() => setIsSearchOpen(!isSearchOpen)}
              onClose={() => setIsSearchOpen(false)}
            />

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Student Dashboard Button (for authenticated users) */}
              {isAuthenticated ? (
                <Link
                  href="/student/dashboard"
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] whitespace-nowrap"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>My Dashboard</span>
                </Link>
              ) : (
                <>
                  {/* Free Demo - Ghost Button Style */}
                  <Link
                    href="/demo-booking"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 border-2 border-green-600 text-green-600 hover:bg-green-50 hover:border-green-700 hover:text-green-700 whitespace-nowrap group"
                  >
                    <Play className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <span>Free Demo</span>
                  </Link>

                  {/* Primary CTA - Enroll Now (Enhanced) */}
                  <Link
                    href={primaryCTA.href}
                    className="flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all duration-300 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] whitespace-nowrap group"
                  >
                    <span>Enroll Now</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  {/* Sign In - Minimal Style */}
                  <Link
                    href="/auth/signin"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 text-blue-700 hover:bg-blue-50 hover:text-blue-800 whitespace-nowrap group"
                  >
                    <UserPlus className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <span>Sign In</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-gray-200 py-3 xs:py-4"
            >
              <div className="space-y-3 xs:space-y-4">
                {/* Regular Navigation Items */}
                {mainNavigation.map((item, index) => (
                  <div key={index}>
                    {item.highlight ? (
                      <Link
                        href={item.href!}
                        className="flex items-center space-x-2 font-semibold px-4 py-3 rounded-lg bg-orange-100 text-orange-700 hover:bg-orange-200 border border-orange-300 transition-all duration-300 min-h-[48px]"
                      >
                        {item.icon && <item.icon className="w-5 h-5" />}
                        <span>{item.label}</span>
                      </Link>
                    ) : (
                      <Link
                        href={item.href!}
                        className={`flex items-center space-x-2 font-medium py-2 transition-colors ${
                          isActive(item.href!)
                            ? 'text-blue-600'
                            : 'text-gray-700 hover:text-blue-600'
                        }`}
                      >
                        {item.icon && <item.icon className="w-4 h-4" />}
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="ml-1 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Mobile CTA Buttons */}
                <div className="pt-3 xs:pt-4 border-t border-gray-200 space-y-3">
                  {/* Student Dashboard Button (for authenticated users) */}
                  {isAuthenticated ? (
                    <Link
                      href="/student/dashboard"
                      className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-4 rounded-full font-bold hover:from-green-700 hover:to-green-800 transition-all duration-300 min-h-[52px] shadow-lg"
                    >
                      <BarChart3 className="w-5 h-5" />
                      <span>My Dashboard</span>
                    </Link>
                  ) : (
                    <>
                      {/* Free Demo - Ghost Style */}
                      <Link
                        href="/demo-booking"
                        className="flex items-center justify-center space-x-2 border-2 border-green-600 text-green-600 px-6 py-4 rounded-full font-bold hover:bg-green-50 transition-all duration-300 min-h-[52px]"
                      >
                        <Play className="w-5 h-5" />
                        <span>Free Demo</span>
                      </Link>

                      {/* Primary CTA - Enroll Now */}
                      <Link
                        href={primaryCTA.href}
                        className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-4 rounded-full font-bold hover:from-green-700 hover:to-green-800 transition-all duration-300 min-h-[52px] shadow-lg"
                      >
                        <span>{primaryCTA.label}</span>
                        <ArrowRight className="w-5 h-5" />
                      </Link>

                      {/* Sign In - Minimal Style */}
                      <Link
                        href="/auth/signin"
                        className="flex items-center justify-center space-x-2 text-blue-700 hover:bg-blue-50 px-6 py-4 rounded-full font-bold transition-all duration-300 min-h-[52px] border-2 border-blue-700 hover:border-blue-800"
                      >
                        <UserPlus className="w-5 h-5" />
                        <span>Sign In</span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Header
