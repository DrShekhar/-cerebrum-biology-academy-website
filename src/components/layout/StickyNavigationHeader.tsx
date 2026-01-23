'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  Search,
  Phone,
  MessageCircle,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Users,
  Trophy,
  ArrowRight,
  GraduationCap,
  Target,
  Brain,
  Zap,
  Video,
  FileText,
} from 'lucide-react'
import { trackAndOpenWhatsApp, WHATSAPP_MESSAGES } from '@/lib/whatsapp/tracking'
import { getPhoneLink } from '@/lib/constants/contactInfo'

interface NavigationItem {
  label: string
  href: string
  icon?: React.ReactNode
  description?: string
}

interface MegaMenuSection {
  title: string
  items: NavigationItem[]
  icon: React.ReactNode
  color: string
}

interface SearchResult {
  title: string
  type: 'course' | 'page' | 'faculty' | 'resource'
  href: string
  description: string
}

// Harvard-level navigation structure with Silicon Valley UX patterns
const MEGA_MENU_DATA: MegaMenuSection[] = [
  {
    title: 'Premium Series',
    icon: <Trophy className="h-5 w-5" />,
    color: 'text-yellow-600',
    items: [
      {
        label: 'Ascent Series',
        href: '/programs/ascent',
        description: 'Premium elite programs for top performers',
      },
      {
        label: 'Pinnacle Series',
        href: '/programs/pinnacle',
        description: 'Ultra-exclusive coaching for rank 1-100',
      },
      {
        label: 'Pursuit Series',
        href: '/programs/pursuit',
        description: 'Comprehensive NEET preparation',
      },
      {
        label: 'Foundation Series',
        href: '/programs/foundation',
        description: 'Strong conceptual building',
      },
      {
        label: 'Intensive Series',
        href: '/programs/intensive',
        description: 'Last-minute preparation boost',
      },
    ],
  },
  {
    title: 'Class Programs',
    icon: <GraduationCap className="h-5 w-5" />,
    color: 'text-blue-600',
    items: [
      { label: 'Class 11th', href: '/programs/class-11', description: 'Foundation year programs' },
      { label: 'Class 12th', href: '/programs/class-12', description: 'Final year preparation' },
      {
        label: 'Dropper Program',
        href: '/programs/dropper',
        description: 'Specialized for repeat students',
      },
      { label: 'Target 2025', href: '/programs/target-2025', description: 'Next year preparation' },
      { label: 'Target 2026', href: '/programs/target-2026', description: 'Long-term planning' },
    ],
  },
  {
    title: 'Specialized Programs',
    icon: <Target className="h-5 w-5" />,
    color: 'text-purple-600',
    items: [
      {
        label: 'AIIMS Specific',
        href: '/programs/aiims',
        description: 'AIIMS-focused preparation',
      },
      {
        label: 'Test Series',
        href: '/programs/test-series',
        description: 'Comprehensive mock tests',
      },
      {
        label: 'Crash Courses',
        href: '/programs/crash',
        description: 'Intensive revision programs',
      },
      {
        label: 'Doubt Resolution',
        href: '/programs/doubt',
        description: '24/7 doubt clearing support',
      },
      {
        label: 'Mentorship',
        href: '/programs/mentorship',
        description: 'Personal guidance programs',
      },
    ],
  },
  {
    title: 'Quick Access',
    icon: <Zap className="h-5 w-5" />,
    color: 'text-green-600',
    items: [
      {
        label: 'Compare Courses',
        href: '/courses/compare',
        description: 'Find your perfect program',
      },
      { label: 'Fee Calculator', href: '/calculator', description: 'Calculate total costs' },
      { label: 'Scholarship Test', href: '/scholarship', description: 'Earn up to 90% discount' },
      { label: 'Free Resources', href: '/resources/free', description: 'Practice papers & notes' },
      { label: 'Book Demo Class', href: '/demo', description: 'Experience our teaching' },
    ],
  },
]

const SEARCH_SUGGESTIONS: SearchResult[] = [
  {
    title: 'Ascent Series Program',
    type: 'course',
    href: '/programs/ascent',
    description: 'Premium elite program for top performers',
  },
  {
    title: 'NEET Mock Tests',
    type: 'resource',
    href: '/resources/mock-tests',
    description: 'Practice with real exam patterns',
  },
  {
    title: 'Dr. Rajesh Kumar',
    type: 'faculty',
    href: '/faculty/rajesh-kumar',
    description: 'Senior Biology Faculty, 15+ years experience',
  },
  {
    title: 'Success Stories',
    type: 'page',
    href: '/success-stories',
    description: 'Student achievements and testimonials',
  },
  {
    title: 'Course Finder',
    type: 'page',
    href: '/courses/finder',
    description: 'Find the perfect course for you',
  },
  {
    title: 'Dropper Program',
    type: 'course',
    href: '/programs/dropper',
    description: 'Specialized program for repeat students',
  },
  {
    title: 'Free Study Material',
    type: 'resource',
    href: '/resources/free',
    description: 'Download practice papers and notes',
  },
  {
    title: 'Fee Calculator',
    type: 'page',
    href: '/calculator',
    description: 'Calculate total program costs',
  },
]

interface StickyNavigationHeaderProps {
  className?: string
}

export function StickyNavigationHeader({ className = '' }: StickyNavigationHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProgramsDropdownOpen, setIsProgramsDropdownOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])

  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  // Scroll detection for sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProgramsDropdownOpen(false)
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
        setSearchQuery('')
        setSearchResults([])
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Search functionality with predictive suggestions
  useEffect(() => {
    if (searchQuery.length > 1) {
      const filtered = SEARCH_SUGGESTIONS.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (!isSearchOpen) setIsSearchOpen(true)
  }

  const getSearchIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'course':
        return <BookOpen className="h-4 w-4 text-blue-500" />
      case 'faculty':
        return <Users className="h-4 w-4 text-green-600" />
      case 'resource':
        return <FileText className="h-4 w-4 text-purple-500" />
      default:
        return <Search className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <>
      {/* Main Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200'
            : 'bg-white/90 backdrop-blur-md'
        } ${className}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="text-xl font-bold text-navy-900">Cerebrum Academy</div>
                <div className="text-xs text-gray-500 font-medium">Biology Excellence</div>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
              {/* Programs Mega Dropdown */}
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setIsProgramsDropdownOpen(!isProgramsDropdownOpen)}
                  className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  Programs
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isProgramsDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Mega Dropdown */}
                <AnimatePresence>
                  {isProgramsDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute top-full left-0 mt-2 w-screen max-w-4xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                      style={{ transform: 'translateX(-40%)' }}
                    >
                      <div className="p-8">
                        <div className="grid grid-cols-4 gap-8">
                          {MEGA_MENU_DATA.map((section, index) => (
                            <motion.div
                              key={section.title}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="space-y-4"
                            >
                              <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                                <div className={section.color}>{section.icon}</div>
                                <h3 className="font-semibold text-gray-900">{section.title}</h3>
                              </div>

                              <div className="space-y-3">
                                {section.items.map((item) => (
                                  <motion.a
                                    key={item.label}
                                    href={item.href}
                                    whileHover={{ x: 4 }}
                                    className="block group"
                                  >
                                    <div className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200">
                                      {item.label}
                                    </div>
                                    {item.description && (
                                      <div className="text-xs text-gray-500 mt-1 leading-relaxed">
                                        {item.description}
                                      </div>
                                    )}
                                  </motion.a>
                                ))}
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Featured Action */}
                        <div className="mt-8 pt-6 border-t border-gray-100">
                          <div className="bg-navy-50 rounded-xl p-4 flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-gray-900">
                                Not sure which program to choose?
                              </div>
                              <div className="text-sm text-gray-600">
                                Take our course finder quiz
                              </div>
                            </div>
                            <motion.a
                              href="/courses/finder"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-green-700 hover:shadow-lg transition-all duration-200"
                            >
                              Find Course
                              <ArrowRight className="h-4 w-4" />
                            </motion.a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Other Navigation Items */}
              <a
                href="/courses/finder"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Course Finder
              </a>
              <a
                href="/success-stories"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Success Stories
              </a>
              <a
                href="/faculty"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Faculty
              </a>
              <a
                href="/resources"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Resources
              </a>
              <a
                href="/gallery"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Gallery
              </a>
              <a
                href="/contact"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Contact
              </a>
            </nav>

            {/* Search & Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div ref={searchRef} className="relative hidden md:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search courses, faculty..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => setIsSearchOpen(true)}
                    className="w-64 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                  />
                </div>

                {/* Search Results */}
                <AnimatePresence>
                  {isSearchOpen && (searchResults.length > 0 || searchQuery.length > 1) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                    >
                      {searchResults.length > 0 ? (
                        <div className="max-h-80 overflow-y-auto">
                          {searchResults.map((result, index) => (
                            <motion.a
                              key={index}
                              href={result.href}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-50 last:border-0"
                              onClick={() => {
                                setIsSearchOpen(false)
                                setSearchQuery('')
                                setSearchResults([])
                              }}
                            >
                              {getSearchIcon(result.type)}
                              <div className="flex-1">
                                <div className="font-medium text-gray-900 text-sm">
                                  {result.title}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {result.description}
                                </div>
                                <div className="text-xs text-blue-600 mt-1 capitalize">
                                  {result.type}
                                </div>
                              </div>
                            </motion.a>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 text-center text-gray-500 text-sm">
                          No results found for "{searchQuery}"
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {/* WhatsApp */}
                <motion.button
                  onClick={async () => {
                    await trackAndOpenWhatsApp({
                      source: 'sticky-header-desktop',
                      message: WHATSAPP_MESSAGES.default,
                      campaign: 'header-cta',
                    })
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden sm:flex items-center gap-2 bg-green-600 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </motion.button>

                {/* Call */}
                <motion.a
                  href={getPhoneLink()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden sm:flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  <Phone className="h-4 w-4" />
                  Call
                </motion.a>

                {/* Book Demo */}
                <motion.a
                  href="/demo-booking"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Book Demo
                </motion.a>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Slide-out */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 md:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                      <Brain className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Cerebrum</div>
                      <div className="text-xs text-gray-500">Biology Excellence</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Mobile Search */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between py-3 text-gray-900 font-medium">
                      Programs
                      <ChevronRight className="h-4 w-4" />
                    </div>
                    <div className="pl-4 space-y-2">
                      {MEGA_MENU_DATA[0].items.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="block py-2 text-sm text-gray-600 hover:text-blue-600"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>

                  <a
                    href="/courses/finder"
                    className="block py-3 text-gray-900 font-medium border-t border-gray-100"
                  >
                    Course Finder
                  </a>
                  <a
                    href="/success-stories"
                    className="block py-3 text-gray-900 font-medium border-t border-gray-100"
                  >
                    Success Stories
                  </a>
                  <a
                    href="/faculty"
                    className="block py-3 text-gray-900 font-medium border-t border-gray-100"
                  >
                    Faculty
                  </a>
                  <a
                    href="/resources"
                    className="block py-3 text-gray-900 font-medium border-t border-gray-100"
                  >
                    Resources
                  </a>
                  <a
                    href="/gallery"
                    className="block py-3 text-gray-900 font-medium border-t border-gray-100"
                  >
                    Gallery
                  </a>
                  <a
                    href="/contact"
                    className="block py-3 text-gray-900 font-medium border-t border-gray-100"
                  >
                    Contact
                  </a>
                </nav>

                {/* Mobile Action Buttons */}
                <div className="mt-8 space-y-3">
                  <button
                    onClick={async () => {
                      await trackAndOpenWhatsApp({
                        source: 'sticky-header-mobile',
                        message: WHATSAPP_MESSAGES.default,
                        campaign: 'header-cta',
                      })
                      setIsMobileMenuOpen(false)
                    }}
                    className="flex items-center justify-center gap-2 w-full bg-green-600 text-white py-3 rounded-xl font-medium cursor-pointer"
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp Us
                  </button>
                  <a
                    href={getPhoneLink()}
                    className="flex items-center justify-center gap-2 w-full bg-blue-500 text-white py-3 rounded-xl font-medium"
                  >
                    <Phone className="h-5 w-5" />
                    Call Now
                  </a>
                  <a
                    href="/demo-booking"
                    className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium"
                  >
                    <Video className="h-5 w-5" />
                    Book Demo Class
                  </a>
                </div>

                {/* Mobile Quick Links */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="text-sm font-medium text-gray-900 mb-3">Quick Links</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <a href="/scholarship" className="text-blue-600 hover:underline">
                      Scholarship Test
                    </a>
                    <a href="/calculator" className="text-blue-600 hover:underline">
                      Fee Calculator
                    </a>
                    <a href="/resources/free" className="text-blue-600 hover:underline">
                      Free Resources
                    </a>
                    <a href="/courses/compare" className="text-blue-600 hover:underline">
                      Compare Courses
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-16 lg:h-20" />
    </>
  )
}
