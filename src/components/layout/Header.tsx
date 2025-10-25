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
import { BrainLogo } from '@/components/ui/BrainLogo'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCoursesOpen, setIsCoursesOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()

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
      href: '/demo',
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
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto pl-2 pr-4 sm:px-6 lg:px-8">
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
              {/* Beautiful Brain Logo with Sophisticated Background */}
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-xl flex items-center justify-center shadow-lg border border-slate-600/30 group-hover:shadow-2xl group-hover:scale-105 transition-all duration-300">
                  <BrainLogo size="lg" animate={false} className="drop-shadow-sm text-white" />
                </div>
                {/* Sophisticated amber glow effect */}
                <div className="absolute inset-0 bg-amber-400/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
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
          <nav className="hidden lg:flex items-center space-x-6">
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
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="w-4 h-4" />
                    </Link>

                    <AnimatePresence>
                      {item.label === 'Courses' && isCoursesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-4 z-50 w-72"
                        >
                          <div className="px-4">
                            <div className="mb-3">
                              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                                NEET Biology Courses
                              </h3>
                              <p className="text-xs text-gray-600">Choose your program</p>
                            </div>
                            <div className="space-y-2">
                              {item.items?.map((subItem, subIndex) => {
                                const Icon = subItem.icon
                                return (
                                  <Link
                                    key={subIndex}
                                    href={subItem.href}
                                    className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg"
                                  >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium text-sm">{subItem.label}</span>
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
              {/* Primary CTA - Enroll Now */}
              <Link
                href={primaryCTA.href}
                className={`flex items-center space-x-2 px-6 py-2.5 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap text-sm ${primaryCTA.className}`}
              >
                <span>{primaryCTA.label}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
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
              className="lg:hidden border-t border-gray-200 py-4"
            >
              <div className="space-y-4">
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
                              className="ml-4 mt-2 space-y-2"
                            >
                              {item.items?.map((subItem, subIndex) => {
                                const Icon = subItem.icon
                                return (
                                  <Link
                                    key={subIndex}
                                    href={subItem.href}
                                    className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 py-2 transition-colors"
                                  >
                                    <Icon className="w-4 h-4" />
                                    <span className="text-sm">{subItem.label}</span>
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
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  {/* Primary CTA - Enroll Now */}
                  <Link
                    href={primaryCTA.href}
                    className="flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-4 rounded-full font-bold hover:bg-green-700 transition-all duration-300 min-h-[52px] shadow-lg"
                  >
                    <span>{primaryCTA.label}</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
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
