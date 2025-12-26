'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Search,
  X,
  ChevronDown,
  ChevronUpIcon,
  Phone,
  Mail,
  MessageSquare,
  Rocket,
  GraduationCap,
  PlayCircle,
  BookOpen,
  Monitor,
  CreditCard,
  UserCircleIcon,
  ClipboardCheck,
  ShieldCheck,
  Sparkles,
  Lightbulb,
  HelpCircle,
} from 'lucide-react'
import {
  allFAQs,
  helpCategories,
  searchFAQs,
  getPopularFAQs,
  getFAQsByCategory,
  type FAQCategory,
  type FAQ,
} from '@/data/helpCenter'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Rocket: Rocket,
  GraduationCap: GraduationCap,
  PlayCircle: PlayCircle,
  BookOpen: BookOpen,
  Monitor: Monitor,
  CreditCard: CreditCard,
  UserCircleIcon: UserCircleIcon,
  ClipboardCheck: ClipboardCheck,
  MessageSquare: MessageSquare,
  ShieldCheck: ShieldCheck,
}

const colorMap: Record<string, { bg: string; text: string; border: string; hover: string }> = {
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    border: 'border-blue-200',
    hover: 'hover:bg-blue-100',
  },
  purple: {
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    border: 'border-purple-200',
    hover: 'hover:bg-purple-100',
  },
  green: {
    bg: 'bg-green-50',
    text: 'text-green-600',
    border: 'border-green-200',
    hover: 'hover:bg-green-100',
  },
  indigo: {
    bg: 'bg-indigo-50',
    text: 'text-indigo-600',
    border: 'border-indigo-200',
    hover: 'hover:bg-indigo-100',
  },
  cyan: {
    bg: 'bg-cyan-50',
    text: 'text-cyan-600',
    border: 'border-cyan-200',
    hover: 'hover:bg-cyan-100',
  },
  emerald: {
    bg: 'bg-green-50',
    text: 'text-green-600',
    border: 'border-green-200',
    hover: 'hover:bg-green-100',
  },
  orange: {
    bg: 'bg-orange-50',
    text: 'text-orange-600',
    border: 'border-orange-200',
    hover: 'hover:bg-orange-100',
  },
  pink: {
    bg: 'bg-pink-50',
    text: 'text-pink-600',
    border: 'border-pink-200',
    hover: 'hover:bg-pink-100',
  },
  teal: {
    bg: 'bg-green-50',
    text: 'text-green-600',
    border: 'border-green-200',
    hover: 'hover:bg-green-100',
  },
  gray: {
    bg: 'bg-gray-50',
    text: 'text-gray-600',
    border: 'border-gray-200',
    hover: 'hover:bg-gray-100',
  },
}

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory | 'all'>('all')
  const [expandedFAQs, setExpandedFAQs] = useState<Set<string>>(new Set())
  const [viewMode, setViewMode] = useState<'categories' | 'popular' | 'all'>('categories')

  const toggleFAQ = (faqId: string) => {
    const newExpanded = new Set(expandedFAQs)
    if (newExpanded.has(faqId)) {
      newExpanded.delete(faqId)
    } else {
      newExpanded.add(faqId)
    }
    setExpandedFAQs(newExpanded)
  }

  const filteredFAQs = useMemo(() => {
    if (searchQuery.trim()) {
      return searchFAQs(searchQuery)
    }
    if (selectedCategory === 'all') {
      return allFAQs
    }
    return getFAQsByCategory(selectedCategory)
  }, [searchQuery, selectedCategory])

  const popularFAQs = useMemo(() => getPopularFAQs(8), [])

  const clearSearch = () => {
    setSearchQuery('')
    setSelectedCategory('all')
  }

  const renderFAQItem = (faq: FAQ) => {
    const isExpanded = expandedFAQs.has(faq.id)
    return (
      <div
        key={faq.id}
        className="bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200"
      >
        <button
          onClick={() => toggleFAQ(faq.id)}
          className="w-full px-6 py-5 flex items-start justify-between text-left hover:bg-gray-50 rounded-t-xl transition-colors"
        >
          <div className="flex-1 pr-4">
            <h3 className="font-semibold text-gray-900 text-base sm:text-lg leading-relaxed">
              {faq.question}
            </h3>
            {!isExpanded && <p className="text-sm text-gray-500 mt-1 line-clamp-1">{faq.answer}</p>}
          </div>
          {isExpanded ? (
            <ChevronUpIcon className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
          )}
        </button>
        {isExpanded && (
          <div className="px-6 pb-5 pt-2 border-t border-gray-100">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{faq.answer}</p>
            {faq.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {faq.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <HelpCircle className="w-5 h-5" />
              <span className="font-semibold text-sm">We are here to help</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Help Center
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto">
              Find answers to your questions about NEET preparation, enrollment, courses, and more
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search your question... (e.g., 'How do I enroll?', 'payment methods', 'demo class')"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  if (e.target.value.trim()) {
                    setViewMode('all')
                  }
                }}
                className="w-full pl-16 pr-14 py-6 rounded-2xl border-2 border-transparent bg-white text-gray-900 placeholder-gray-500 focus:border-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-400/30 text-lg shadow-2xl transition-all"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>

            {searchQuery && (
              <div className="mt-4 text-center text-white/90">
                Found <span className="font-bold">{filteredFAQs.length}</span> results for &ldquo;
                {searchQuery}&rdquo;
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <div className="mb-6 sm:mb-8 flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center">
          <button
            onClick={() => {
              setViewMode('categories')
              setSelectedCategory('all')
              setSearchQuery('')
            }}
            className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-all ${
              viewMode === 'categories'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Browse by Category
          </button>
          <button
            onClick={() => {
              setViewMode('popular')
              setSearchQuery('')
            }}
            className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-all ${
              viewMode === 'popular'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Popular Questions
          </button>
          <button
            onClick={() => {
              setViewMode('all')
              setSelectedCategory('all')
              setSearchQuery('')
            }}
            className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-all ${
              viewMode === 'all'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <span className="hidden sm:inline">All FAQs ({allFAQs.length})</span>
            <span className="sm:hidden">All ({allFAQs.length})</span>
          </button>
        </div>

        {viewMode === 'categories' && !searchQuery && (
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
              Choose a Category
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-10 sm:mb-12">
              {helpCategories
                .sort((a, b) => a.order - b.order)
                .map((category) => {
                  const Icon = iconMap[category.icon]
                  const colors = colorMap[category.color]
                  const faqCount = getFAQsByCategory(category.id).length
                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id)
                        setViewMode('all')
                      }}
                      className={`${colors.bg} ${colors.border} border-2 rounded-xl sm:rounded-2xl p-5 sm:p-6 text-left hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group`}
                    >
                      <div className={`${colors.text} mb-3 sm:mb-4`}>
                        {Icon && <Icon className="w-10 h-10 sm:w-12 sm:h-12" />}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-semibold ${colors.text}`}>
                          {faqCount} articles
                        </span>
                        <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                          View →
                        </span>
                      </div>
                    </button>
                  )
                })}
            </div>
          </div>
        )}

        {viewMode === 'popular' && !searchQuery && (
          <div>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full mb-4">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">Most Asked Questions</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Popular Questions</h2>
              <p className="text-gray-600 mt-2">
                Quick answers to the questions we hear most often
              </p>
            </div>
            <div className="max-w-4xl mx-auto space-y-4">{popularFAQs.map(renderFAQItem)}</div>
          </div>
        )}

        {(viewMode === 'all' || searchQuery) && (
          <div>
            <div className="mb-8">
              {selectedCategory !== 'all' && !searchQuery && (
                <div className="flex items-center gap-4 mb-6">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
                  >
                    ← Back to all categories
                  </button>
                </div>
              )}
              <h2 className="text-3xl font-bold text-gray-900">
                {selectedCategory !== 'all' && !searchQuery
                  ? helpCategories.find((c) => c.id === selectedCategory)?.name
                  : searchQuery
                    ? 'Search Results'
                    : 'All Frequently Asked Questions'}
              </h2>
              <p className="text-gray-600 mt-2">
                {filteredFAQs.length} question{filteredFAQs.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {filteredFAQs.length > 0 ? (
              <div className="max-w-4xl mx-auto space-y-4">{filteredFAQs.map(renderFAQItem)}</div>
            ) : (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <HelpCircle className="w-20 h-20 mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-6">
                  We could not find any questions matching your search. Try different keywords or
                  browse by category.
                </p>
                <button
                  onClick={clearSearch}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        )}

        <div className="mt-12 sm:mt-14 md:mt-16 bg-indigo-500 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 text-white">
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-3 sm:mb-4">
              <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-semibold text-xs sm:text-sm">Still need help?</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Contact Our Support Team
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
              Our friendly support team is here to help you with any questions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 text-center hover:bg-white/20 transition-all">
              <Phone className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-bold mb-2">Call Us</h3>
              <p className="text-blue-100 mb-2 sm:mb-3 text-sm sm:text-base">
                Mon-Sun, 9 AM - 9 PM
              </p>
              <a
                href="tel:+918826444334"
                className="text-white font-bold text-base sm:text-lg hover:text-yellow-300 transition-colors"
              >
                +91-88264-44334
              </a>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 text-center hover:bg-white/20 transition-all sm:col-span-2 md:col-span-1">
              <Mail className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-bold mb-2">Email Us</h3>
              <p className="text-blue-100 mb-2 sm:mb-3 text-sm sm:text-base">
                Response within 4-6 hours
              </p>
              <a
                href="mailto:support@cerebrumacademy.in"
                className="text-white font-bold hover:text-yellow-300 transition-colors break-all text-sm sm:text-base"
              >
                support@cerebrumacademy.in
              </a>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 text-center hover:bg-white/20 transition-all sm:col-span-2 md:col-span-1">
              <MessageSquare className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-bold mb-2">Live Chat</h3>
              <p className="text-blue-100 mb-2 sm:mb-3 text-sm sm:text-base">
                Instant support available
              </p>
              <button className="text-white font-bold hover:text-yellow-300 transition-colors text-sm sm:text-base">
                Start Chat
              </button>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-blue-100 mb-4">Or visit our other support pages</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo-booking"
                className="px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all"
              >
                Book Free Demo Class
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white border-2 border-white rounded-xl font-semibold hover:bg-white/30 transition-all"
              >
                Contact Form
              </Link>
              <Link
                href="/pricing"
                className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white border-2 border-white rounded-xl font-semibold hover:bg-white/30 transition-all"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <Lightbulb className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Did not find what you were looking for?
              </h3>
              <p className="text-gray-700 mb-4">
                Our support team is constantly updating this help center with new articles. If your
                question is not answered here, please reach out to us directly and we will be happy
                to help you.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:support@cerebrumacademy.in?subject=Help Center Inquiry"
                  className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  Email Your Question
                </a>
                <a
                  href="tel:+918826444334"
                  className="inline-flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
