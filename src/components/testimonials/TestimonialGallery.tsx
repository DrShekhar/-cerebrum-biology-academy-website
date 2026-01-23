'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { VideoTestimonial } from './VideoTestimonial'
import { ScoreComparison } from './ScoreComparison'
import {
  Play,
  BarChart3,
  Search,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  Star,
  Target,
  Calendar,
  MapPin,
  School,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface TestimonialData {
  id: string
  type: 'video' | 'score' | 'written'
  studentName: string
  college: string
  location: string
  school: string
  class: string
  year: string
  neetScore: number
  rank: number
  improvement: number
  videoUrl?: string
  thumbnailUrl?: string
  duration?: string
  achievement: string
  quote: string
  beforeScore?: {
    biology: number
    chemistry: number
    physics: number
    total: number
  }
  afterScore?: {
    biology: number
    chemistry: number
    physics: number
    total: number
  }
  category: 'topper' | 'improvement' | 'dropper' | 'repeater'
  featured: boolean
}

interface TestimonialGalleryProps {
  testimonials: TestimonialData[]
  title?: string
  subtitle?: string
}

export function TestimonialGallery({
  testimonials,
  title = 'Student Success Stories',
  subtitle = 'Real stories, real results from our NEET achievers',
}: TestimonialGalleryProps) {
  const [filteredTestimonials, setFilteredTestimonials] = useState(testimonials)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const galleryRef = useRef<HTMLDivElement>(null)

  const categories = [
    { id: 'all', label: 'All Stories', count: testimonials.length },
    {
      id: 'topper',
      label: 'Top Rankers',
      count: testimonials.filter((t) => t.category === 'topper').length,
    },
    {
      id: 'improvement',
      label: 'Best Improvement',
      count: testimonials.filter((t) => t.category === 'improvement').length,
    },
    {
      id: 'dropper',
      label: 'Dropper Success',
      count: testimonials.filter((t) => t.category === 'dropper').length,
    },
    {
      id: 'repeater',
      label: 'Repeater Success',
      count: testimonials.filter((t) => t.category === 'repeater').length,
    },
  ]

  const types = [
    { id: 'all', label: 'All Types', icon: Grid },
    { id: 'video', label: 'Video Stories', icon: Play },
    { id: 'score', label: 'Score Analysis', icon: BarChart3 },
    { id: 'written', label: 'Written Reviews', icon: Star },
  ]

  // Filter logic
  useEffect(() => {
    let filtered = testimonials

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((t) => t.category === selectedCategory)
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter((t) => t.type === selectedType)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (t) =>
          t.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.school.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredTestimonials(filtered)
    setCurrentPage(1)
  }, [selectedCategory, selectedType, searchTerm, testimonials])

  const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage)
  const currentTestimonials = filteredTestimonials.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const handleTypeChange = (type: string) => {
    setSelectedType(type)
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    galleryRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="max-w-7xl mx-auto" ref={galleryRef}>
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, college, or location..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Category</h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-6 py-3 rounded-2xl transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Type Filters */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Type</h3>
          <div className="flex flex-wrap gap-3">
            {types.map((type) => (
              <button
                key={type.id}
                onClick={() => handleTypeChange(type.id)}
                className={`flex items-center px-6 py-3 rounded-2xl transition-all ${
                  selectedType === type.id
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <type.icon className="w-4 h-4 mr-2" />
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center justify-between">
          <div className="text-gray-600">
            Showing {currentTestimonials.length} of {filteredTestimonials.length} stories
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${
                viewMode === 'grid'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${
                viewMode === 'list'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {currentTestimonials.length > 0 ? (
          <motion.div
            key={`${selectedCategory}-${selectedType}-${currentPage}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {viewMode === 'grid' ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {currentTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {testimonial.type === 'video' && testimonial.videoUrl && (
                      <VideoTestimonial
                        id={testimonial.id}
                        studentName={testimonial.studentName}
                        college={testimonial.college}
                        neetScore={testimonial.neetScore}
                        improvement={testimonial.improvement}
                        videoUrl={testimonial.videoUrl}
                        thumbnailUrl={testimonial.thumbnailUrl || '/placeholder-video.jpg'}
                        duration={testimonial.duration || '3:45'}
                        achievement={testimonial.achievement}
                        quote={testimonial.quote}
                      />
                    )}

                    {testimonial.type === 'score' &&
                      testimonial.beforeScore &&
                      testimonial.afterScore && (
                        <ScoreComparison
                          studentName={testimonial.studentName}
                          beforeScore={testimonial.beforeScore}
                          afterScore={testimonial.afterScore}
                          timeframe="12 months"
                          rank={{ after: testimonial.rank }}
                          animated={false}
                        />
                      )}

                    {testimonial.type === 'written' && (
                      <div className="bg-white rounded-3xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">
                              {testimonial.studentName}
                            </h3>
                            <p className="text-blue-600 font-medium">{testimonial.college}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">
                              {testimonial.neetScore}
                            </div>
                            <div className="text-sm text-gray-600">NEET Score</div>
                          </div>
                        </div>

                        <div className="space-y-3 mb-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <School className="w-4 h-4 mr-2" />
                            {testimonial.school}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {testimonial.location}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {testimonial.year} • {testimonial.class}
                          </div>
                        </div>

                        <blockquote className="text-gray-700 italic mb-4">
                          &ldquo;{testimonial.quote}&rdquo;
                        </blockquote>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                            +{testimonial.improvement} marks
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-6 mb-12">
                {currentTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    className="bg-white rounded-3xl shadow-lg p-8"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="grid md:grid-cols-3 gap-6 items-center">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {testimonial.studentName}
                        </h3>
                        <p className="text-blue-600 font-medium mb-1">{testimonial.college}</p>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div className="flex items-center">
                            <School className="w-4 h-4 mr-2" />
                            {testimonial.school}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {testimonial.location}
                          </div>
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-1">
                          {testimonial.neetScore}
                        </div>
                        <div className="text-sm text-gray-600 mb-2">NEET Score</div>
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          +{testimonial.improvement} improvement
                        </div>
                      </div>

                      <div>
                        <blockquote className="text-gray-700 italic mb-4">
                          &ldquo;{testimonial.quote.substring(0, 120)}...&rdquo;
                        </blockquote>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No stories found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
            <Button
              onClick={() => {
                setSelectedCategory('all')
                setSelectedType('all')
                setSearchTerm('')
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-3 rounded-xl bg-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-shadow"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-3 rounded-xl transition-all ${
                currentPage === page
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 shadow-lg hover:shadow-xl'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-3 rounded-xl bg-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-shadow"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  )
}
