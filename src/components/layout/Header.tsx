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
  BarChart3
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCoursesOpen, setIsCoursesOpen] = useState(false)
  const [isTestsOpen, setIsTestsOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
    setIsCoursesOpen(false)
    setIsTestsOpen(false)
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

  const mainNavigation = [
    { href: '/', label: 'Home' },
    { 
      label: 'Courses', 
      hasDropdown: true,
      items: courseLinks
    },
    {
      label: 'Tests',
      hasDropdown: true, 
      items: testLinks
    },
    { href: '/faculty', label: 'Faculty' },
    { href: '/success-stories', label: 'Success Stories' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-gray-900">Cerebrum</span>
              <span className="text-sm text-gray-600 block -mt-1">Biology Academy</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {mainNavigation.map((item, index) => (
              <div key={index} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => {
                      if (item.label === 'Courses') setIsCoursesOpen(true)
                      if (item.label === 'Tests') setIsTestsOpen(true)
                    }}
                    onMouseLeave={() => {
                      if (item.label === 'Courses') setIsCoursesOpen(false)
                      if (item.label === 'Tests') setIsTestsOpen(false)
                    }}
                  >
                    <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors">
                      <span>{item.label}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    
                    <AnimatePresence>
                      {((item.label === 'Courses' && isCoursesOpen) || (item.label === 'Tests' && isTestsOpen)) && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                        >
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
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href!}
                    className={`font-medium transition-colors ${
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
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/admissions"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Enroll Now
            </Link>
            <Link
              href="/contact"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Book Demo</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-gray-700 hover:text-blue-600 p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
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
                        <button
                          onClick={() => {
                            if (item.label === 'Courses') setIsCoursesOpen(!isCoursesOpen)
                            if (item.label === 'Tests') setIsTestsOpen(!isTestsOpen)
                          }}
                          className="flex items-center justify-between w-full text-left text-gray-700 hover:text-blue-600 font-medium py-2"
                        >
                          <span>{item.label}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${
                            (item.label === 'Courses' && isCoursesOpen) || (item.label === 'Tests' && isTestsOpen)
                              ? 'rotate-180' 
                              : ''
                          }`} />
                        </button>
                        
                        <AnimatePresence>
                          {((item.label === 'Courses' && isCoursesOpen) || (item.label === 'Tests' && isTestsOpen)) && (
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
                
                {/* Mobile CTA Buttons */}
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <Link
                    href="/admissions"
                    className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                  >
                    Enroll Now
                  </Link>
                  <Link
                    href="/contact"
                    className="flex items-center justify-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Book Demo Class</span>
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