'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/Button'
import { BlogPostMeta, BlogCategory, Difficulty } from '@/types/blog'
import { blogCategories } from '@/lib/blog/mdx'
import { Clock, Eye, Calendar, User, Search, Filter, BookOpen, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { DifficultyBadge } from './DifficultyBadge'
import { NEETTopicBadge } from './NEETTopicBadge'
import { BlogPagination } from './BlogPagination'

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
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
      const matchesDifficulty =
        selectedDifficulty === 'all' || post.difficulty === selectedDifficulty
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      return matchesCategory && matchesDifficulty && matchesSearch && post.isPublished
    })
  }, [posts, selectedCategory, selectedDifficulty, searchTerm])

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const paginatedPosts = filteredPosts.slice(
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

  const getCategoryInfo = (categorySlug: string) => {
    return (
      blogCategories[categorySlug] || {
        name: categorySlug,
        color: 'bg-gray-100 text-gray-800',
      }
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
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
                <div className="text-2xl font-bold">{Math.round(stats.totalViews / 1000)}K+</div>
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
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-12">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles, topics, or keywords..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    handleFilterChange()
                  }}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value)
                    handleFilterChange()
                  }}
                  className="px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
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
              <div className="flex items-center gap-2">
                <select
                  value={selectedDifficulty}
                  onChange={(e) => {
                    setSelectedDifficulty(e.target.value as Difficulty | 'all')
                    handleFilterChange()
                  }}
                  className="px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="all">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-100">
              <button
                onClick={() => {
                  setSelectedCategory('all')
                  handleFilterChange()
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Topics
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.slug)
                    handleFilterChange()
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
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
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Results count */}
          <div className="mb-6 text-gray-600">
            Showing {paginatedPosts.length} of {filteredPosts.length} articles
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or category filter</p>
              <Button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                  setSelectedDifficulty('all')
                  handleFilterChange()
                }}
                variant="primary"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Featured Post */}
                {currentPage === 1 && paginatedPosts.length > 0 && (
                  <motion.div
                    className="lg:col-span-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <article className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full">
                      <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-500 relative">
                        {/* Featured badge */}
                        <div className="absolute top-6 left-6 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          Featured
                        </div>

                        {/* Category badge */}
                        <div
                          className={`absolute top-6 right-6 px-3 py-1 rounded-full text-sm font-medium ${getCategoryInfo(paginatedPosts[0].category).color}`}
                        >
                          {getCategoryInfo(paginatedPosts[0].category).name}
                        </div>
                      </div>

                      <div className="p-8">
                        {/* NEET badges */}
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

                        <h2 className="text-2xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors">
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
                              {paginatedPosts[0].readTime} min read
                            </div>
                            <div className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {paginatedPosts[0].views?.toLocaleString()}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm mr-3">
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
                          </div>

                          <Link href={`/blog/${paginatedPosts[0].slug}`}>
                            <Button variant="primary" size="sm">
                              Read Article
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </article>
                  </motion.div>
                )}

                {/* Regular Posts */}
                <div className={`space-y-6 ${currentPage === 1 ? '' : 'lg:col-span-3'}`}>
                  <div
                    className={`grid ${currentPage === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-6`}
                  >
                    {(currentPage === 1 ? paginatedPosts.slice(1) : paginatedPosts).map(
                      (post, index) => (
                        <motion.article
                          key={post.slug}
                          className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.1 + index * 0.05 }}
                        >
                          <div
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${getCategoryInfo(post.category).color}`}
                          >
                            {getCategoryInfo(post.category).name}
                          </div>

                          {/* NEET badges */}
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

                          <h3 className="text-lg font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors line-clamp-2">
                            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                          </h3>

                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>

                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {post.readTime}m
                              </div>
                              <div className="flex items-center">
                                <Eye className="w-3 h-3 mr-1" />
                                {post.views?.toLocaleString()}
                              </div>
                            </div>

                            <div className="flex items-center">
                              <User className="w-3 h-3 mr-1" />
                              {post.author.name}
                            </div>
                          </div>
                        </motion.article>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Pagination */}
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
