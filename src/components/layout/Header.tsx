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
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { BurgerMenu } from '@/components/navigation/BurgerMenu'
import { SearchMenu } from '@/components/navigation/SearchMenu'

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
    { href: '/courses', label: 'All Courses', icon: BookOpen },
    { href: '/courses/class-11', label: 'Class 11th Biology', icon: BookOpen },
    { href: '/courses/class-12', label: 'Class 12th Biology', icon: BookOpen },
    { href: '/courses/neet-dropper', label: 'NEET Dropper Program', icon: Award },
  ]

  const testLinks = [
    { href: '/mock-tests', label: 'Mock Tests', icon: BarChart3 },
    { href: '/analytics', label: 'Performance Analytics', icon: BarChart3 },
    { href: '/test/demo', label: 'Demo Test', icon: Play },
  ]

  const serviceLinks = [
    { href: '/services/online-classes', label: 'Online Classes', icon: Monitor },
    { href: '/services/classroom', label: 'Classroom Coaching', icon: Users },
    { href: '/services/international', label: 'International Students', icon: Globe },
    { href: '/services/doubt-resolution', label: 'Doubt Resolution', icon: HelpCircle },
  ]

  // Enhanced navigation structure with video lectures
  const mainNavigation = [
    { href: '/', label: 'Home' },
    {
      href: '/courses',
      label: 'Courses',
      hasDropdown: true,
      items: courseLinks,
      isMegaMenu: true,
    },
    { href: '/video-lectures', label: 'Video Lectures' },
    { href: '/success-stories', label: 'Success Stories' },
    { href: '/faculty', label: 'Faculty' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Left Section - Burger Menu + Logo */}
          <div className="flex items-center space-x-4">
            {/* Burger Menu */}
            <BurgerMenu
              isOpen={isBurgerMenuOpen}
              onToggle={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
              onClose={() => setIsBurgerMenuOpen(false)}
            />

            {/* Enhanced Logo with Full Brand Visibility */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>

              {/* Mobile: Compact brand display */}
              <div className="block sm:hidden">
                <span className="text-lg font-bold text-gray-900">Cerebrum</span>
                <span className="text-xs text-gray-600 block -mt-1 font-medium">
                  Biology Academy
                </span>
              </div>

              {/* Desktop: Full brand display */}
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-gray-900">Cerebrum</span>
                <span className="text-sm text-gray-600 block -mt-1 font-medium">
                  Biology Academy
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
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
                          className={`absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-4 z-50 ${
                            item.isMegaMenu ? 'w-96' : 'w-64'
                          }`}
                        >
                          {item.isMegaMenu ? (
                            <div className="px-6">
                              <div className="mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                  Cerebrum NEET Biology Courses
                                </h3>
                                <p className="text-sm text-gray-600 mb-4">
                                  Comprehensive programs designed for medical entrance success with
                                  94.2% success rate
                                </p>
                              </div>
                              <div className="grid grid-cols-1 gap-3">
                                {item.items?.map((subItem, subIndex) => {
                                  const Icon = subItem.icon
                                  return (
                                    <Link
                                      key={subIndex}
                                      href={subItem.href}
                                      className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg border border-gray-100 hover:border-blue-200"
                                    >
                                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <Icon className="w-5 h-5 text-blue-600" />
                                      </div>
                                      <div>
                                        <span className="font-medium block">{subItem.label}</span>
                                        <span className="text-xs text-gray-500">
                                          {subIndex === 0
                                            ? 'All courses overview'
                                            : subIndex === 1
                                              ? 'Foundation building'
                                              : subIndex === 2
                                                ? 'Board + NEET prep'
                                                : 'Intensive NEET focus'}
                                        </span>
                                      </div>
                                    </Link>
                                  )
                                })}
                              </div>
                              <div className="mt-4 pt-4 border-t border-gray-200">
                                <Link
                                  href="/support/demo"
                                  className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all"
                                >
                                  Book Free Cerebrum Demo Class
                                </Link>
                              </div>
                            </div>
                          ) : (
                            <div className="py-2">
                              {item.items?.map((subItem, subIndex) => {
                                const Icon = subItem.icon
                                return (
                                  <Link
                                    key={subIndex}
                                    href={subItem.href}
                                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                  >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium">{subItem.label}</span>
                                  </Link>
                                )
                              })}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href!}
                    className={`font-medium transition-colors ${
                      isActive(item.href!) ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Section - Search + CTA Buttons */}
          <div className="flex items-center space-x-4">
            {/* Search Menu */}
            <SearchMenu
              isOpen={isSearchOpen}
              onToggle={() => setIsSearchOpen(!isSearchOpen)}
              onClose={() => setIsSearchOpen(false)}
            />

            {/* Authentication & CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Consolidated Login Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsAuthOpen(true)}
                onMouseLeave={() => setIsAuthOpen(false)}
              >
                <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 font-medium transition-colors px-4 py-3 rounded-xl hover:bg-primary-50 min-h-[44px] touch-manipulation">
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                  <ChevronDown className="w-3 h-3" />
                </button>

                <AnimatePresence>
                  {isAuthOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                    >
                      {authOptions.map((option, index) => {
                        const Icon = option.icon
                        return (
                          <Link
                            key={index}
                            href={option.href}
                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{option.label}</span>
                          </Link>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Primary CTA with Brand Integration */}
              <Link
                href="/support/demo"
                className="bg-gradient-to-r from-primary-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-primary-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 min-h-[48px] flex items-center touch-manipulation"
                style={{ boxShadow: 'var(--shadow-premium)' }}
              >
                Book Cerebrum Demo
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
                {mainNavigation.map((item, index) => (
                  <div key={index}>
                    {item.hasDropdown ? (
                      <div>
                        <div className="flex items-center">
                          <Link
                            href={item.href!}
                            className={`flex-1 font-medium py-2 transition-colors ${
                              isActive(item.href!)
                                ? 'text-blue-600'
                                : 'text-gray-700 hover:text-blue-600'
                            }`}
                          >
                            {item.label}
                          </Link>
                          <button
                            onClick={() => {
                              if (item.label === 'Courses') setIsCoursesOpen(!isCoursesOpen)
                            }}
                            className="p-2 text-gray-500 hover:text-blue-600"
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
                                    <span>{subItem.label}</span>
                                  </Link>
                                )
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href!}
                        className={`block font-medium py-2 transition-colors ${
                          isActive(item.href!)
                            ? 'text-blue-600'
                            : 'text-gray-700 hover:text-blue-600'
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Mobile Auth & CTA Buttons */}
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  {/* Consolidated Auth Options */}
                  <div className="space-y-2">
                    {authOptions.map((option, index) => {
                      const Icon = option.icon
                      return (
                        <Link
                          key={index}
                          href={option.href}
                          className="flex items-center space-x-3 text-gray-700 hover:text-primary-600 font-medium transition-colors py-3 px-4 border border-gray-200 rounded-xl hover:bg-primary-50 min-h-[48px] touch-manipulation"
                        >
                          <Icon className="w-4 h-4" />
                          <span>{option.label}</span>
                        </Link>
                      )
                    })}
                  </div>

                  {/* Primary CTA with Brand Integration */}
                  <Link
                    href="/support/demo"
                    className="block w-full text-center bg-gradient-to-r from-primary-600 to-purple-600 text-white px-6 py-4 rounded-full font-semibold hover:from-primary-700 hover:to-purple-700 transition-all duration-300 min-h-[52px] flex items-center justify-center touch-manipulation"
                    style={{ boxShadow: 'var(--shadow-premium)' }}
                  >
                    Book Free Cerebrum Demo
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
