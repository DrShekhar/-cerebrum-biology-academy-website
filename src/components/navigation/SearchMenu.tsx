'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useScrollLock } from '@/lib/hooks/useScrollLock'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  X,
  ChevronRight,
  Clock,
  TrendingUp,
  Star,
  Sparkles,
  ArrowUpRight,
  GraduationCap,
  FileText,
  RefreshCw,
  Laptop,
  Target,
  BookOpen,
  Phone,
  MessageSquare,
  HelpCircle,
  DollarSign,
  Flame,
  Eye,
  TrendingDown,
} from 'lucide-react'
import Link from 'next/link'
import Fuse from 'fuse.js'
import { searchableContent } from '@/data/navigationConfig'

interface SearchResult {
  item: {
    id: string
    title: string
    href: string
    description: string
    category: string
    keywords: string[]
    isNew?: boolean
    isPopular?: boolean
  }
  score?: number
}

interface SearchMenuProps {
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
}

export function SearchMenu({ isOpen, onToggle, onClose }: SearchMenuProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1) // For keyboard navigation
  const inputRef = useRef<HTMLInputElement>(null)
  const fuse = useRef<Fuse<(typeof searchableContent)[number]> | null>(null)
  const router = useRouter()

  // Use shared scroll lock to prevent race conditions with other modals
  useScrollLock(isOpen)

  // Initialize Fuse.js
  useEffect(() => {
    fuse.current = new Fuse(searchableContent, {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'description', weight: 0.3 },
        { name: 'keywords', weight: 0.2 },
        { name: 'category', weight: 0.1 },
      ],
      threshold: 0.3,
      includeScore: true,
      minMatchCharLength: 2,
    })

    // Load recent searches from localStorage
    try {
      const saved = localStorage.getItem('cerebrum-recent-searches')
      if (saved) {
        setRecentSearches(JSON.parse(saved))
      }
    } catch (error) {
      console.warn('Failed to load recent searches:', error)
      setRecentSearches([])
    }
  }, [])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  // Handle search
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)

    // Debounce search
    const timeoutId = setTimeout(() => {
      if (fuse.current) {
        const searchResults = fuse.current.search(query.trim())
        setResults(searchResults.slice(0, 8)) // Limit to 8 results
      }
      setIsLoading(false)
    }, 150)

    return () => clearTimeout(timeoutId)
  }, [query])

  // Handle escape key and keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowDown':
          if (results.length > 0) {
            e.preventDefault()
            setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1))
          }
          break
        case 'ArrowUp':
          if (results.length > 0) {
            e.preventDefault()
            setSelectedIndex((prev) => Math.max(prev - 1, -1))
          }
          break
        case 'Enter':
          if (selectedIndex >= 0 && results[selectedIndex]) {
            e.preventDefault()
            handleSearch(query)
            router.push(results[selectedIndex].item.href)
            onClose()
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, results, selectedIndex, query, router])

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(-1)
  }, [results])

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      // Add to recent searches
      const newRecentSearches = [
        searchQuery,
        ...recentSearches.filter((s) => s !== searchQuery),
      ].slice(0, 5)

      setRecentSearches(newRecentSearches)
      try {
        localStorage.setItem('cerebrum-recent-searches', JSON.stringify(newRecentSearches))
      } catch (error) {
        console.warn('Failed to save recent search:', error)
      }
    }
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem('cerebrum-recent-searches')
  }

  const popularSearches = useMemo(
    () => [
      { text: 'Class 12 Biology', icon: GraduationCap, trend: 'trending', count: '+45%' },
      { text: 'NEET Mock Tests', icon: FileText, trend: 'hot', count: 'Most viewed' },
      { text: 'Dropper Batch', icon: RefreshCw, trend: 'rising', count: '+30%' },
      { text: 'Online Classes', icon: Laptop, trend: null, count: null },
      { text: 'Free Demo', icon: Target, trend: 'hot', count: '2.5k views' },
      { text: 'CBSE Biology', icon: BookOpen, trend: null, count: null },
      { text: 'Admission Process', icon: ChevronRight, trend: 'rising', count: '+20%' },
      { text: 'Fee Structure', icon: DollarSign, trend: null, count: null },
    ],
    []
  )

  const quickActions = [
    {
      href: '/support/demo',
      label: 'Book Demo',
      icon: Phone,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      hoverBg: 'hover:from-blue-100 hover:to-blue-200',
      textColor: 'text-blue-700',
      iconBg: 'bg-blue-600',
    },
    {
      href: '/admissions',
      label: 'Admission',
      icon: ChevronRight,
      gradient: 'from-green-500 to-green-600',
      bgGradient: 'from-green-50 to-green-100',
      hoverBg: 'hover:from-green-100 hover:to-green-200',
      textColor: 'text-green-700',
      iconBg: 'bg-green-600',
    },
    {
      href: 'https://wa.me/918826444334?text=Hi%2C%20I%27m%20interested%20in%20your%20courses',
      label: 'WhatsApp',
      icon: MessageSquare,
      gradient: 'from-emerald-500 to-emerald-600',
      bgGradient: 'from-emerald-50 to-emerald-100',
      hoverBg: 'hover:from-emerald-100 hover:to-emerald-200',
      textColor: 'text-emerald-700',
      iconBg: 'bg-emerald-600',
      external: true,
    },
    {
      href: '/course-finder',
      label: 'Course Finder',
      icon: Target,
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
      hoverBg: 'hover:from-purple-100 hover:to-purple-200',
      textColor: 'text-purple-700',
      iconBg: 'bg-purple-600',
    },
    {
      href: '/courses#fees',
      label: 'Fee Structure',
      icon: DollarSign,
      gradient: 'from-orange-500 to-orange-600',
      bgGradient: 'from-orange-50 to-orange-100',
      hoverBg: 'hover:from-orange-100 hover:to-orange-200',
      textColor: 'text-orange-700',
      iconBg: 'bg-orange-600',
    },
    {
      href: '/contact',
      label: 'Help Center',
      icon: HelpCircle,
      gradient: 'from-pink-500 to-pink-600',
      bgGradient: 'from-pink-50 to-pink-100',
      hoverBg: 'hover:from-pink-100 hover:to-pink-200',
      textColor: 'text-pink-700',
      iconBg: 'bg-pink-600',
    },
  ]

  // Get user's personalization data (from localStorage or context)
  const [userClass, setUserClass] = useState<string | null>(null)
  const [userGoal, setUserGoal] = useState<string | null>(null)

  useEffect(() => {
    try {
      const savedClass = localStorage.getItem('user-class')
      const savedGoal = localStorage.getItem('user-goal')
      setUserClass(savedClass)
      setUserGoal(savedGoal || 'NEET')
    } catch (error) {
      console.warn('Failed to load user preferences')
    }
  }, [])

  const personalizedRecommendations = userClass
    ? [
        {
          label: `${userClass} Pinnacle Series`,
          href: `/courses/class-${userClass.toLowerCase()}`,
          description: 'Recommended for you',
          badge: '⭐ Best Match',
        },
        {
          label: 'Book Free Demo',
          href: '/support/demo',
          description: 'Next step',
          badge: '🎯 Action Item',
        },
        {
          label: `${userGoal} 2025 Pattern Analysis`,
          href: '/resources/neet-2025',
          description: 'Trending now',
          badge: '🔥 Hot Topic',
        },
      ]
    : null

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  }

  const [isMobile, setIsMobile] = useState(false)
  const [viewportHeight, setViewportHeight] = useState('85vh')

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Handle iOS keyboard - adjust modal height when virtual keyboard appears
  useEffect(() => {
    if (!isMobile || !isOpen) return

    const updateViewportHeight = () => {
      // Use visualViewport API for accurate height with keyboard
      if (window.visualViewport) {
        const vh = window.visualViewport.height
        setViewportHeight(`${vh}px`)
      } else {
        setViewportHeight('85vh')
      }
    }

    updateViewportHeight()

    // Listen for viewport changes (keyboard open/close)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateViewportHeight)
      window.visualViewport.addEventListener('scroll', updateViewportHeight)
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateViewportHeight)
        window.visualViewport.removeEventListener('scroll', updateViewportHeight)
      }
    }
  }, [isMobile, isOpen])

  const modalVariants = {
    closed: {
      opacity: 0,
      scale: isMobile ? 1 : 0.95,
      y: isMobile ? 100 : -20,
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
  }

  // Haptic feedback helper
  const triggerHaptic = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10)
    }
  }

  // Swipe to close on mobile - with improved threshold to prevent accidental closes
  const [touchStartY, setTouchStartY] = useState(0)
  const [touchEndY, setTouchEndY] = useState(0)
  const [touchStartX, setTouchStartX] = useState(0)
  const [touchEndX, setTouchEndX] = useState(0)
  const [touchStartTime, setTouchStartTime] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.targetTouches[0].clientY)
    setTouchStartX(e.targetTouches[0].clientX)
    setTouchStartTime(Date.now())
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndY(e.targetTouches[0].clientY)
    setTouchEndX(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!isMobile) return

    const deltaY = touchEndY - touchStartY // Positive = swipe down
    const deltaX = Math.abs(touchEndX - touchStartX)
    const swipeTime = Date.now() - touchStartTime
    const swipeVelocity = Math.abs(deltaY) / swipeTime

    // Only close on predominantly vertical downward swipe
    // Must be more vertical than horizontal to prevent accidental closes during scrolling
    if (deltaY > deltaX && (deltaY > 100 || (deltaY > 50 && swipeVelocity > 0.5))) {
      triggerHaptic()
      onClose()
    }
  }

  return (
    <>
      {/* Search Button - 44px minimum touch target for iOS accessibility */}
      <button
        onClick={onToggle}
        className="flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 group flex-shrink-0 touch-manipulation"
        aria-label="Open search menu"
      >
        <Search className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
      </button>

      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex ${isMobile ? 'items-end' : 'items-start justify-center pt-20'} px-0 md:px-4 overflow-hidden`}
            onClick={onClose}
          >
            <motion.div
              variants={modalVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className={`bg-white ${isMobile ? 'rounded-t-3xl w-full' : 'rounded-2xl w-full max-w-2xl'} shadow-2xl overflow-hidden flex flex-col`}
              style={{ maxHeight: isMobile ? viewportHeight : '80vh' }}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Mobile Drag Handle */}
              {isMobile && (
                <div className="flex justify-center pt-3 pb-2">
                  <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
                </div>
              )}
              {/* Search Header */}
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Search</h2>
                  <button
                    onClick={onClose}
                    className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors duration-200 touch-manipulation"
                    aria-label="Close search menu"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search courses, services..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && query.trim()) {
                        handleSearch(query)
                      }
                    }}
                    className="w-full pl-12 pr-12 py-3 sm:py-4 text-base sm:text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-gray-100 touch-manipulation"
                      aria-label="Clear search"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  )}
                </div>
              </div>

              {/* Search Results - flexible height for mobile keyboard */}
              <div
                className="flex-1 overflow-y-auto"
                style={{ maxHeight: isMobile ? 'calc(100% - 160px)' : '400px' }}
              >
                {query && results.length > 0 && (
                  <div className="p-4 sm:p-6">
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 sm:mb-4">
                      Search Results ({results.length})
                    </h3>
                    <div className="space-y-2">
                      {results.map(({ item }, index) => (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={() => {
                            handleSearch(query)
                            onClose()
                          }}
                          className={`group flex items-center justify-between p-3 sm:p-4 rounded-xl transition-all duration-200 min-h-[44px] touch-manipulation ${
                            selectedIndex === index
                              ? 'bg-blue-100 ring-2 ring-blue-500'
                              : 'hover:bg-blue-50'
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 mb-1">
                              <h4 className="font-semibold text-sm sm:text-base text-gray-900 group-hover:text-blue-600">
                                {item.title}
                              </h4>
                              {item.isNew && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600">
                                  <Sparkles className="w-3 h-3 mr-1" />
                                  New
                                </span>
                              )}
                              {item.isPopular && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-600">
                                  <Star className="w-3 h-3 mr-1" />
                                  Popular
                                </span>
                              )}
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600 mb-1 line-clamp-2">
                              {item.description}
                            </p>
                            <span className="text-xs text-blue-600 font-medium">
                              {item.category}
                            </span>
                          </div>
                          <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-blue-600 transform group-hover:scale-110 transition-all duration-200 flex-shrink-0 ml-2" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {query && results.length === 0 && !isLoading && (
                  <div className="p-4 sm:p-6 text-center">
                    <div className="text-gray-400 mb-2">
                      <Search className="w-8 h-8 mx-auto" />
                    </div>
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                      No results found
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Try searching for courses, services, or help topics
                    </p>
                  </div>
                )}

                {isLoading && (
                  <div className="p-4 sm:p-6 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-sm sm:text-base text-gray-600 mt-2">Searching...</p>
                  </div>
                )}

                {!query && (
                  <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                          <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide flex items-center">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                            Recent Searches
                          </h3>
                          <button
                            onClick={clearRecentSearches}
                            className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 min-h-[44px] flex items-center px-2 touch-manipulation"
                          >
                            Clear
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map((search, index) => (
                            <button
                              key={index}
                              onClick={() => setQuery(search)}
                              className="px-3 py-2 min-h-[44px] bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors duration-200 touch-manipulation"
                            >
                              {search}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Popular Searches */}
                    <div>
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 sm:mb-4 flex items-center">
                        <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                        Popular Searches
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        {popularSearches.map((search, index) => {
                          const Icon = search.icon
                          return (
                            <button
                              key={index}
                              onClick={() => {
                                setQuery(search.text)
                                triggerHaptic()
                              }}
                              className="group relative flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl text-left hover:border-blue-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 min-h-[52px] touch-manipulation"
                            >
                              <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-200">
                                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                                  <span className="font-medium text-gray-900 text-xs sm:text-sm truncate">
                                    {search.text}
                                  </span>
                                  {search.trend === 'trending' && (
                                    <span className="flex items-center gap-1 text-xs font-semibold text-orange-600">
                                      <Flame className="w-3 h-3" />
                                      {search.count}
                                    </span>
                                  )}
                                  {search.trend === 'hot' && (
                                    <span className="flex items-center gap-1 text-xs font-semibold text-red-600">
                                      <Eye className="w-3 h-3" />
                                      {search.count}
                                    </span>
                                  )}
                                  {search.trend === 'rising' && (
                                    <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
                                      <TrendingUp className="w-3 h-3" />
                                      {search.count}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Personalization Section */}
                    {personalizedRecommendations && (
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 sm:mb-4 flex items-center">
                          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                          For You
                        </h3>
                        <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 border border-purple-200 rounded-2xl p-3 sm:p-4 shadow-md">
                          <p className="text-xs text-purple-700 font-medium mb-2 sm:mb-3">
                            Based on your class ({userClass}) and goal ({userGoal})
                          </p>
                          <div className="space-y-2">
                            {personalizedRecommendations.map((rec, index) => (
                              <Link
                                key={index}
                                href={rec.href}
                                onClick={() => {
                                  onClose()
                                  triggerHaptic()
                                }}
                                className="group flex items-center justify-between p-3 bg-white/80 backdrop-blur-sm border border-purple-200 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200 min-h-[44px]"
                              >
                                <div className="flex-1">
                                  <div className="font-medium text-gray-900 text-sm mb-0.5">
                                    {rec.label}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-600">{rec.description}</span>
                                    <span className="text-xs">{rec.badge}</span>
                                  </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-purple-600 group-hover:translate-x-1 transition-transform" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Quick Actions - show only 4 on mobile to save space */}
                    <div>
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 sm:mb-4">
                        Quick Actions
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                        {(isMobile ? quickActions.slice(0, 6) : quickActions).map(
                          (action, index) => {
                            const ActionIcon = action.icon
                            const LinkComponent = action.external ? 'a' : Link
                            const linkProps = action.external
                              ? { href: action.href, target: '_blank', rel: 'noopener noreferrer' }
                              : { href: action.href }

                            return (
                              <LinkComponent
                                key={index}
                                {...linkProps}
                                onClick={() => {
                                  onClose()
                                  triggerHaptic()
                                }}
                                className={`group flex flex-col items-center justify-center gap-1.5 sm:gap-2 p-3 sm:p-4 bg-gradient-to-br ${action.bgGradient} border border-gray-200 rounded-xl ${action.hoverBg} hover:border-opacity-50 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-200 min-h-[88px] sm:min-h-[100px] touch-manipulation`}
                              >
                                <div
                                  className={`w-11 h-11 sm:w-12 sm:h-12 ${action.iconBg} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-200`}
                                >
                                  <ActionIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </div>
                                <span
                                  className={`font-semibold ${action.textColor} text-xs sm:text-sm text-center leading-tight`}
                                >
                                  {action.label}
                                </span>
                              </LinkComponent>
                            )
                          }
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Search Footer - Hide keyboard hints on mobile, with safe area padding */}
              <div
                className="border-t border-gray-200 p-3 sm:p-4 bg-gray-50"
                style={{
                  paddingBottom: isMobile ? 'max(12px, env(safe-area-inset-bottom, 12px))' : '16px',
                }}
              >
                <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                  <span className="hidden sm:inline">Press ESC to close</span>
                  <span className="sm:hidden">Swipe down to close</span>
                  <span className="hidden sm:inline">Use ↑↓ to navigate</span>
                  <span className="sm:hidden">Tap to select</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
