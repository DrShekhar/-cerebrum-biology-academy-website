'use client'

import { useState, useEffect, useRef } from 'react'
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
  const inputRef = useRef<HTMLInputElement>(null)
  const fuse = useRef<Fuse<any> | null>(null)

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

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      // Add to recent searches
      const newRecentSearches = [
        searchQuery,
        ...recentSearches.filter(s => s !== searchQuery),
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

  const popularSearches = [
    'Class 12 Biology',
    'NEET Mock Tests',
    'Dropper Batch',
    'Online Classes',
    'Free Demo',
    'CBSE Biology',
    'Admission Process',
    'Fee Structure',
  ]

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  }

  const modalVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      y: -20,
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
  }

  return (
    <>
      {/* Search Button */}
      <button
        onClick={onToggle}
        className="flex items-center justify-center w-10 h-10 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 group"
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
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20 px-4"
            onClick={onClose}
          >
            <motion.div
              variants={modalVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Search Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search courses, services, or help topics..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && query.trim()) {
                        handleSearch(query)
                      }
                    }}
                    className="w-full pl-12 pr-12 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  )}
                </div>
              </div>

              {/* Search Results */}
              <div className="max-h-96 overflow-y-auto">
                {query && results.length > 0 && (
                  <div className="p-6">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                      Search Results ({results.length})
                    </h3>
                    <div className="space-y-2">
                      {results.map(({ item }) => (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={() => {
                            handleSearch(query)
                            onClose()
                          }}
                          className="group flex items-center justify-between p-4 rounded-xl hover:bg-blue-50 transition-all duration-200"
                        >
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-semibold text-gray-900 group-hover:text-blue-600">
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
                            <p className="text-sm text-gray-600 mb-1">{item.description}</p>
                            <span className="text-xs text-blue-600 font-medium">{item.category}</span>
                          </div>
                          <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transform group-hover:scale-110 transition-all duration-200" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {query && results.length === 0 && !isLoading && (
                  <div className="p-6 text-center">
                    <div className="text-gray-400 mb-2">
                      <Search className="w-8 h-8 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                    <p className="text-gray-600">
                      Try searching for courses, services, or help topics
                    </p>
                  </div>
                )}

                {isLoading && (
                  <div className="p-6 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-gray-600 mt-2">Searching...</p>
                  </div>
                )}

                {!query && (
                  <div className="p-6 space-y-6">
                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            Recent Searches
                          </h3>
                          <button
                            onClick={clearRecentSearches}
                            className="text-sm text-blue-600 hover:text-blue-700"
                          >
                            Clear
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map((search, index) => (
                            <button
                              key={index}
                              onClick={() => setQuery(search)}
                              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors duration-200"
                            >
                              {search}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Popular Searches */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Popular Searches
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {popularSearches.map((search, index) => (
                          <button
                            key={index}
                            onClick={() => setQuery(search)}
                            className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm hover:bg-blue-100 transition-colors duration-200"
                          >
                            {search}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                        Quick Actions
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        <Link
                          href="/support/demo"
                          onClick={onClose}
                          className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all duration-200 group"
                        >
                          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Star className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium text-blue-700 group-hover:text-blue-800">
                            Book Demo
                          </span>
                        </Link>
                        <Link
                          href="/support/admission"
                          onClick={onClose}
                          className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg hover:from-green-100 hover:to-green-200 transition-all duration-200 group"
                        >
                          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                            <ChevronRight className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium text-green-700 group-hover:text-green-800">
                            Admission
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Search Footer */}
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Press ESC to close</span>
                  <span>Use ↑↓ to navigate</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}