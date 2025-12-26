'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { BlogPostMeta, BlogCategory, Difficulty } from '@/types/blog'
import { blogCategories } from '@/lib/blog/mdx'
import {
  Clock,
  Eye,
  Calendar,
  User,
  Search,
  Filter,
  BookOpen,
  TrendingUp,
  X,
  SortAsc,
  Flame,
  Bookmark,
  ArrowUpDown,
} from 'lucide-react'
import Link from 'next/link'
import { DifficultyBadge } from './DifficultyBadge'
import { NEETTopicBadge } from './NEETTopicBadge'
import { BlogPagination } from './BlogPagination'
import { BlogThumbnail } from './BlogThumbnail'

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

type SortOption = 'newest' | 'popular' | 'readTime'

// Format large numbers for display (e.g., 2525000 -> "2.5M+", 150000 -> "150K+")
function formatViewCount(views: number): string {
  if (views >= 1000000) {
    const millions = views / 1000000
    return millions >= 10
      ? `${Math.round(millions)}M+`
      : `${millions.toFixed(1).replace(/\.0$/, '')}M+`
  }
  if (views >= 1000) {
    const thousands = views / 1000
    return thousands >= 100
      ? `${Math.round(thousands)}K+`
      : `${thousands.toFixed(1).replace(/\.0$/, '')}K+`
  }
  return `${views}+`
}

interface BlogListingPageProps {
  posts: BlogPostMeta[]
  categories: BlogCategory[]
  stats: {
    totalPosts: number
    totalViews: number
    avgReadTime: number
    categories: number
  }
}

const POSTS_PER_PAGE = 9

export function BlogListingPage({ posts, categories, stats }: BlogListingPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all')
  const [selectedAuthor, setSelectedAuthor] = useState<string>('all')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isSearching, setIsSearching] = useState(false)
  const [showSearchPreview, setShowSearchPreview] = useState(false)
  const [bookmarkedPosts, setBookmarkedPosts] = useState<string[]>([])
  const searchRef = useRef<HTMLDivElement>(null)

  const debouncedSearch = useDebounce(searchInput, 200)

  // Load bookmarks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('blog-bookmarks')
    if (saved) {
      setBookmarkedPosts(JSON.parse(saved))
    }
  }, [])

  // Get unique authors
  const authors = useMemo(() => {
    const authorSet = new Set<string>()
    posts.forEach((post) => authorSet.add(post.author.name))
    return Array.from(authorSet)
  }, [posts])

  useEffect(() => {
    setSearchTerm(debouncedSearch)
    setIsSearching(false)
  }, [debouncedSearch])

  // Close search preview when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchPreview(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Search preview results (show top 5 matches)
  const searchPreviewResults = useMemo(() => {
    if (!searchInput.trim()) return []
    const searchLower = searchInput.toLowerCase()
    return posts
      .filter(
        (post) =>
          post.isPublished &&
          (post.title.toLowerCase().includes(searchLower) ||
            post.excerpt.toLowerCase().includes(searchLower) ||
            post.tags.some((tag) => tag.toLowerCase().includes(searchLower)))
      )
      .slice(0, 5)
  }, [posts, searchInput])

  const filteredAndSortedPosts = useMemo(() => {
    let result = posts.filter((post) => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
      const matchesDifficulty =
        selectedDifficulty === 'all' || post.difficulty === selectedDifficulty
      const matchesAuthor = selectedAuthor === 'all' || post.author.name === selectedAuthor
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch =
        searchTerm === '' ||
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
        (post.neetChapter && post.neetChapter.toLowerCase().includes(searchLower))
      return (
        matchesCategory && matchesDifficulty && matchesAuthor && matchesSearch && post.isPublished
      )
    })

    // Sort posts
    switch (sortBy) {
      case 'popular':
        result = [...result].sort((a, b) => (b.views || 0) - (a.views || 0))
        break
      case 'readTime':
        result = [...result].sort((a, b) => (a.readTime || 0) - (b.readTime || 0))
        break
      case 'newest':
      default:
        result = [...result].sort(
          (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        )
    }

    return result
  }, [posts, selectedCategory, selectedDifficulty, selectedAuthor, searchTerm, sortBy])

  const totalPages = Math.ceil(filteredAndSortedPosts.length / POSTS_PER_PAGE)
  const paginatedPosts = filteredAndSortedPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleFilterChange = () => {
    setCurrentPage(1)
  }

  const clearAllFilters = () => {
    setSearchInput('')
    setSearchTerm('')
    setSelectedCategory('all')
    setSelectedDifficulty('all')
    setSelectedAuthor('all')
    setSortBy('newest')
    handleFilterChange()
  }

  const toggleBookmark = (slug: string) => {
    const newBookmarks = bookmarkedPosts.includes(slug)
      ? bookmarkedPosts.filter((s) => s !== slug)
      : [...bookmarkedPosts, slug]
    setBookmarkedPosts(newBookmarks)
    localStorage.setItem('blog-bookmarks', JSON.stringify(newBookmarks))
  }

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedDifficulty !== 'all' ||
    selectedAuthor !== 'all' ||
    searchTerm !== ''

  const getCategoryInfo = (categorySlug: string) => {
    return (
      blogCategories[categorySlug] || {
        name: categorySlug,
        color: 'bg-gray-100 text-gray-800',
      }
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4 mr-2" />
              Expert Biology Education
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              NEET Biology <span className="text-yellow-300">Mastery</span> Blog
            </h1>

            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Expert tips, study strategies, and preparation guides by AIIMS faculty to help you ace
              NEET Biology
            </p>

            {/* Blog Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-2xl font-bold">{stats.totalPosts}+</div>
                <div className="text-sm opacity-80">Articles</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-2xl font-bold">{formatViewCount(stats.totalViews)}</div>
                <div className="text-sm opacity-80">Total Reads</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-2xl font-bold">{stats.avgReadTime}</div>
                <div className="text-sm opacity-80">Avg Read Time</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-2xl font-bold">{stats.categories}</div>
                <div className="text-sm opacity-80">Categories</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 mb-12">
            {/* Search and Filters Row */}
            <div className="flex flex-col lg:flex-row gap-4 items-stretch">
              {/* Search Bar with Preview */}
              <div className="flex-1 relative" ref={searchRef}>
                <Search
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${isSearching ? 'text-blue-500 animate-pulse' : 'text-gray-400'}`}
                />
                <input
                  type="text"
                  placeholder="Search articles, topics, or keywords..."
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value)
                    setIsSearching(true)
                    setShowSearchPreview(true)
                    handleFilterChange()
                  }}
                  onFocus={() => setShowSearchPreview(true)}
                  className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  aria-label="Search blog articles"
                  autoComplete="off"
                />
                {searchInput && (
                  <button
                    onClick={() => {
                      setSearchInput('')
                      setSearchTerm('')
                      setShowSearchPreview(false)
                      handleFilterChange()
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                )}

                {/* Search Preview Dropdown */}
                {showSearchPreview && searchInput && searchPreviewResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-fade-in">
                    <div className="p-2">
                      <p className="text-xs text-gray-500 px-3 py-2">
                        {searchPreviewResults.length} results found
                      </p>
                      {searchPreviewResults.map((post) => (
                        <Link
                          key={post.slug}
                          href={`/blog/${post.slug}`}
                          onClick={() => setShowSearchPreview(false)}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-colors"
                        >
                          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 text-sm truncate">
                              {post.title}
                            </p>
                            <p className="text-xs text-gray-500 flex items-center gap-2">
                              <span>{post.readTime} min read</span>
                              <span>•</span>
                              <span>{(post.views || 0).toLocaleString()} views</span>
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-5 h-5 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value as SortOption)
                    handleFilterChange()
                  }}
                  className="px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm font-medium"
                  aria-label="Sort articles"
                >
                  <option value="newest">Newest First</option>
                  <option value="popular">Most Popular</option>
                  <option value="readTime">Quick Reads</option>
                </select>
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" aria-hidden="true" />
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value)
                    handleFilterChange()
                  }}
                  className="px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
                  aria-label="Filter by category"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <select
                value={selectedDifficulty}
                onChange={(e) => {
                  setSelectedDifficulty(e.target.value as Difficulty | 'all')
                  handleFilterChange()
                }}
                className="px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
                aria-label="Filter by difficulty"
              >
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>

              {/* Author Filter */}
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-gray-500" />
                <select
                  value={selectedAuthor}
                  onChange={(e) => {
                    setSelectedAuthor(e.target.value)
                    handleFilterChange()
                  }}
                  className="px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
                  aria-label="Filter by author"
                >
                  <option value="all">All Authors</option>
                  {authors.map((author) => (
                    <option key={author} value={author}>
                      {author}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filters & Category Pills */}
            <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-gray-100">
              {/* Sort indicator */}
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
                {sortBy === 'newest' && <SortAsc className="w-4 h-4" />}
                {sortBy === 'popular' && <Flame className="w-4 h-4 text-orange-500" />}
                {sortBy === 'readTime' && <Clock className="w-4 h-4 text-blue-500" />}
                <span>
                  {sortBy === 'newest' && 'Newest'}
                  {sortBy === 'popular' && 'Most Popular'}
                  {sortBy === 'readTime' && 'Quick Reads'}
                </span>
              </div>

              {/* Active filter chips */}
              {hasActiveFilters && (
                <>
                  {selectedCategory !== 'all' && (
                    <button
                      onClick={() => {
                        setSelectedCategory('all')
                        handleFilterChange()
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
                    >
                      {getCategoryInfo(selectedCategory).name}
                      <X className="w-3 h-3" />
                    </button>
                  )}
                  {selectedDifficulty !== 'all' && (
                    <button
                      onClick={() => {
                        setSelectedDifficulty('all')
                        handleFilterChange()
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition-colors"
                    >
                      {selectedDifficulty}
                      <X className="w-3 h-3" />
                    </button>
                  )}
                  {selectedAuthor !== 'all' && (
                    <button
                      onClick={() => {
                        setSelectedAuthor('all')
                        handleFilterChange()
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200 transition-colors"
                    >
                      {selectedAuthor}
                      <X className="w-3 h-3" />
                    </button>
                  )}
                  {searchTerm && (
                    <button
                      onClick={() => {
                        setSearchInput('')
                        setSearchTerm('')
                        handleFilterChange()
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-sm hover:bg-yellow-200 transition-colors"
                    >
                      "{searchTerm}"
                      <X className="w-3 h-3" />
                    </button>
                  )}
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear all
                  </button>
                </>
              )}

              {/* Category quick filters */}
              <div className="flex-1" />
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 4).map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(
                        selectedCategory === category.slug ? 'all' : category.slug
                      )
                      handleFilterChange()
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedCategory === category.slug
                        ? category.color
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Results count */}
          <div className="mb-6 flex items-center justify-between">
            <span className="text-gray-600">
              Showing {paginatedPosts.length} of {filteredAndSortedPosts.length} articles
            </span>
            {bookmarkedPosts.length > 0 && (
              <button
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                onClick={() => {
                  // TODO: Show bookmarked posts
                }}
              >
                <Bookmark className="w-4 h-4 fill-current" />
                {bookmarkedPosts.length} saved
              </button>
            )}
          </div>

          {filteredAndSortedPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
              <Button onClick={clearAllFilters} variant="primary">
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Featured Post */}
                {currentPage === 1 && paginatedPosts.length > 0 && (
                  <div className="lg:col-span-2 animate-fade-in-up">
                    <article className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full group">
                      <div className="aspect-video relative overflow-hidden">
                        <BlogThumbnail
                          slug={paginatedPosts[0].slug}
                          title={paginatedPosts[0].title}
                          size="lg"
                          className="absolute inset-0 w-full h-full rounded-none group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Badges */}
                        <div className="absolute top-6 left-6 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium flex items-center z-10">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          Featured
                        </div>
                        <div
                          className={`absolute top-6 right-6 px-3 py-1 rounded-full text-sm font-medium z-10 ${getCategoryInfo(paginatedPosts[0].category).color}`}
                        >
                          {getCategoryInfo(paginatedPosts[0].category).name}
                        </div>
                        {/* Bookmark button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            toggleBookmark(paginatedPosts[0].slug)
                          }}
                          className="absolute bottom-6 right-6 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center z-10 hover:bg-white transition-colors shadow-lg"
                        >
                          <Bookmark
                            className={`w-5 h-5 ${
                              bookmarkedPosts.includes(paginatedPosts[0].slug)
                                ? 'text-blue-600 fill-current'
                                : 'text-gray-600'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="p-8">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {paginatedPosts[0].difficulty && (
                            <DifficultyBadge difficulty={paginatedPosts[0].difficulty} />
                          )}
                          {paginatedPosts[0].neetChapter && (
                            <NEETTopicBadge
                              chapter={paginatedPosts[0].neetChapter}
                              weightage={paginatedPosts[0].neetWeightage}
                            />
                          )}
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                          <Link href={`/blog/${paginatedPosts[0].slug}`}>
                            {paginatedPosts[0].title}
                          </Link>
                        </h2>

                        <p className="text-gray-600 mb-6 line-clamp-3">
                          {paginatedPosts[0].excerpt}
                        </p>

                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(paginatedPosts[0].publishedAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {paginatedPosts[0].readTime} min
                            </div>
                            <div className="flex items-center text-orange-600">
                              <Eye className="w-4 h-4 mr-1" />
                              {(paginatedPosts[0].views || 0).toLocaleString()}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <Link
                            href={`/blog?author=${encodeURIComponent(paginatedPosts[0].author.name)}`}
                            onClick={(e) => {
                              e.preventDefault()
                              setSelectedAuthor(paginatedPosts[0].author.name)
                              handleFilterChange()
                            }}
                            className="flex items-center hover:opacity-80 transition-opacity"
                          >
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm mr-3">
                              {paginatedPosts[0].author.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 text-sm">
                                {paginatedPosts[0].author.name}
                              </div>
                              <div className="text-gray-500 text-xs">
                                {paginatedPosts[0].author.role}
                              </div>
                            </div>
                          </Link>

                          <Link href={`/blog/${paginatedPosts[0].slug}`}>
                            <Button variant="primary" size="sm">
                              Read Article
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </article>
                  </div>
                )}

                {/* Regular Posts */}
                <div className={`space-y-6 ${currentPage === 1 ? '' : 'lg:col-span-3'}`}>
                  <div
                    className={`grid ${currentPage === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-6`}
                  >
                    {(currentPage === 1 ? paginatedPosts.slice(1) : paginatedPosts).map((post) => (
                      <article
                        key={post.slug}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group animate-fade-in"
                      >
                        <div className="relative">
                          <Link href={`/blog/${post.slug}`}>
                            <BlogThumbnail
                              slug={post.slug}
                              title={post.title}
                              size="sm"
                              className="rounded-none group-hover:scale-105 transition-transform duration-500"
                            />
                          </Link>
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              toggleBookmark(post.slug)
                            }}
                            className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center z-10 hover:bg-white transition-colors shadow"
                          >
                            <Bookmark
                              className={`w-4 h-4 ${
                                bookmarkedPosts.includes(post.slug)
                                  ? 'text-blue-600 fill-current'
                                  : 'text-gray-600'
                              }`}
                            />
                          </button>
                        </div>

                        <div className="p-5">
                          <div
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${getCategoryInfo(post.category).color}`}
                          >
                            {getCategoryInfo(post.category).name}
                          </div>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.difficulty && (
                              <DifficultyBadge difficulty={post.difficulty} size="sm" />
                            )}
                            {post.neetChapter && (
                              <NEETTopicBadge
                                chapter={post.neetChapter}
                                weightage={post.neetWeightage}
                                size="sm"
                              />
                            )}
                          </div>

                          <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                          </h3>

                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>

                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {post.readTime}m
                              </div>
                              <div className="flex items-center text-orange-600">
                                <Eye className="w-3 h-3 mr-1" />
                                {(post.views || 0).toLocaleString()}
                              </div>
                            </div>

                            <button
                              onClick={(e) => {
                                e.preventDefault()
                                setSelectedAuthor(post.author.name)
                                handleFilterChange()
                              }}
                              className="flex items-center hover:text-blue-600 transition-colors"
                            >
                              <User className="w-3 h-3 mr-1" />
                              {post.author.name}
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>

              <BlogPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Master NEET Biology?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of successful students who achieved their medical dreams with expert
            guidance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking">
              <Button
                variant="secondary"
                size="xl"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Start Free Demo Class
              </Button>
            </Link>
            <Link href="/resources">
              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Download Study Material
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
