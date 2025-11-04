'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Menu,
  X,
  ChevronDown,
  BookOpen,
  Award,
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
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { BurgerMenu } from '@/components/navigation/BurgerMenu'
import { SearchMenu } from '@/components/navigation/SearchMenu'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCoursesOpen, setIsCoursesOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()
  const { user, isAuthenticated } = useAuth()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
    setIsCoursesOpen(false)
    setIsAuthOpen(false)
    setIsBurgerMenuOpen(false)
    setIsSearchOpen(false)
  }, [pathname])

  const courseLinks = [
    { href: '/courses/class-11', label: 'Class 11th NEET', icon: BookOpen },
    { href: '/courses/class-12', label: 'Class 12th NEET', icon: BookOpen },
    { href: '/courses/neet-dropper', label: 'Dropper Program', icon: Award },
    { href: '/courses/class-9-foundation', label: 'Early Bird (9th/10th)', icon: BookOpen },
  ]

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
      hasDropdown: true,
      items: courseLinks,
      priority: 2,
    },
    {
      href: '/faculty',
      label: 'Faculty',
      icon: Users,
      priority: 3,
    },
    {
      href: '/demo-booking',
      label: 'Free Demo',
      icon: Play,
      highlight: true,
      priority: 4,
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
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => {
                      if (item.label === 'Courses') setIsCoursesOpen(true)
                    }}
                    onMouseLeave={() => {
                      if (item.label === 'Courses') setIsCoursesOpen(false)
                    }}
                  >
                    <Link
                      href={item.href!}
                      className={`flex items-center space-x-1 font-medium transition-colors ${
                        isActive(item.href!) ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                      }`}
                      aria-current={isActive(item.href!) ? 'page' : undefined}
                      aria-haspopup="true"
                      aria-expanded={isCoursesOpen}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="w-4 h-4" aria-hidden="true" />
                    </Link>

                    <AnimatePresence>
                      {item.label === 'Courses' && isCoursesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-3 xs:py-4 z-50 w-64 xs:w-72 min-w-[240px]"
                          role="menu"
                          aria-label="Course options"
                        >
                          <div className="px-3 xs:px-4">
                            <div className="mb-2 xs:mb-3">
                              <h3 className="text-xs xs:text-sm font-semibold text-gray-900 mb-1">
                                NEET Biology Courses
                              </h3>
                              <p className="text-[10px] xs:text-xs text-gray-600">
                                Choose your program
                              </p>
                            </div>
                            <div className="space-y-1.5 xs:space-y-2">
                              {item.items?.map((subItem, subIndex) => {
                                const Icon = subItem.icon
                                return (
                                  <Link
                                    key={subIndex}
                                    href={subItem.href}
                                    className="flex items-center space-x-2 xs:space-x-3 p-2.5 xs:p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg"
                                    role="menuitem"
                                  >
                                    <Icon
                                      className="w-4 xs:w-5 h-4 xs:h-5 flex-shrink-0"
                                      aria-hidden="true"
                                    />
                                    <span className="font-medium text-xs xs:text-sm">
                                      {subItem.label}
                                    </span>
                                  </Link>
                                )
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : item.highlight ? (
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

          {/* Right Section - Search + CTA Buttons */}
          <div className="flex items-center space-x-3">
            {/* Search Menu */}
            <SearchMenu
              isOpen={isSearchOpen}
              onToggle={() => setIsSearchOpen(!isSearchOpen)}
              onClose={() => setIsSearchOpen(false)}
            />

            {/* Authentication & CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Student Dashboard Button (for authenticated users) */}
              {isAuthenticated && (
                <Link
                  href="/student/dashboard"
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-full font-semibold transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg whitespace-nowrap text-sm"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>My Dashboard</span>
                </Link>
              )}

              {/* Auth Buttons (show for non-authenticated users) */}
              {!isAuthenticated && (
                <>
                  {/* Primary CTA - Enroll Now */}
                  <Link
                    href={primaryCTA.href}
                    className={`flex items-center space-x-2 px-6 py-2.5 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap text-sm ${primaryCTA.className}`}
                  >
                    <span>{primaryCTA.label}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {/* Combined Sign In Button */}
                  <Link
                    href="/auth/signin"
                    className="flex items-center space-x-2 px-5 py-2.5 rounded-full font-semibold transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg whitespace-nowrap text-sm"
                  >
                    <UserPlus className="w-4 h-4" />
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
                    {item.hasDropdown ? (
                      <div>
                        <div className="flex items-center">
                          <Link
                            href={item.href!}
                            className={`flex-1 font-medium py-2 transition-colors flex items-center space-x-2 ${
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
                          <button
                            onClick={() => {
                              if (item.label === 'Courses') setIsCoursesOpen(!isCoursesOpen)
                            }}
                            className="p-3 text-gray-500 hover:text-blue-600 min-h-[44px] min-w-[44px] flex items-center justify-center"
                            aria-label={`Toggle ${item.label} submenu`}
                            aria-expanded={item.label === 'Courses' && isCoursesOpen}
                            aria-haspopup="menu"
                          >
                            <ChevronDown
                              className={`w-4 h-4 transition-transform ${
                                item.label === 'Courses' && isCoursesOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                        </div>

                        <AnimatePresence>
                          {item.label === 'Courses' && isCoursesOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-3 xs:ml-4 mt-1.5 xs:mt-2 space-y-1.5 xs:space-y-2"
                            >
                              {item.items?.map((subItem, subIndex) => {
                                const Icon = subItem.icon
                                return (
                                  <Link
                                    key={subIndex}
                                    href={subItem.href}
                                    className="flex items-center space-x-2 xs:space-x-3 text-gray-600 hover:text-blue-600 py-1.5 xs:py-2 transition-colors"
                                  >
                                    <Icon className="w-3.5 xs:w-4 h-3.5 xs:h-4 flex-shrink-0" />
                                    <span className="text-xs xs:text-sm">{subItem.label}</span>
                                  </Link>
                                )
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : item.highlight ? (
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
                  {isAuthenticated && (
                    <Link
                      href="/student/dashboard"
                      className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-4 rounded-full font-bold hover:bg-blue-700 transition-all duration-300 min-h-[52px] shadow-lg"
                    >
                      <BarChart3 className="w-5 h-5" />
                      <span>My Dashboard</span>
                    </Link>
                  )}

                  {/* Auth Buttons (show for non-authenticated users) */}
                  {!isAuthenticated && (
                    <>
                      {/* Primary CTA - Enroll Now */}
                      <Link
                        href={primaryCTA.href}
                        className="flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-4 rounded-full font-bold hover:bg-green-700 transition-all duration-300 min-h-[52px] shadow-lg"
                      >
                        <span>{primaryCTA.label}</span>
                        <ArrowRight className="w-5 h-5" />
                      </Link>

                      {/* Combined Sign In Button */}
                      <Link
                        href="/auth/signin"
                        className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-4 rounded-full font-bold hover:bg-blue-700 transition-all duration-300 min-h-[52px] shadow-lg"
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
