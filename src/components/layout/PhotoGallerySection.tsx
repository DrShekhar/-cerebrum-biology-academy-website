'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Camera,
  Grid,
  BookOpen,
  Trophy,
  Users,
  Award,
  Heart,
  Search,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Tag,
  Play,
  Download,
  Share2,
  Eye,
  ZoomIn,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import {
  photoGallery,
  photoCategories,
  galleryStats,
  getPhotosByCategory,
  getFeaturedPhotos,
  searchPhotos,
  PhotoItem,
} from '@/data/photoGalleryData'

interface PhotoGallerySectionProps {
  showFeaturedOnly?: boolean
  maxPhotos?: number
  enableLightbox?: boolean
  showSearch?: boolean
}

export function PhotoGallerySection({
  showFeaturedOnly = false,
  maxPhotos = 12,
  enableLightbox = true,
  showSearch = true,
}: PhotoGallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredPhotos, setFilteredPhotos] = useState<PhotoItem[]>([])
  const [lightboxPhoto, setLightboxPhoto] = useState<PhotoItem | null>(null)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for photos
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let photos = showFeaturedOnly ? getFeaturedPhotos() : getPhotosByCategory(selectedCategory)

    if (searchQuery) {
      photos = searchPhotos(searchQuery)
    }

    setFilteredPhotos(photos.slice(0, maxPhotos))
  }, [selectedCategory, searchQuery, showFeaturedOnly, maxPhotos])

  const openLightbox = (photo: PhotoItem, index: number) => {
    if (!enableLightbox) return
    setLightboxPhoto(photo)
    setCurrentPhotoIndex(index)
  }

  const closeLightbox = () => {
    setLightboxPhoto(null)
  }

  const nextPhoto = () => {
    const nextIndex = (currentPhotoIndex + 1) % filteredPhotos.length
    setCurrentPhotoIndex(nextIndex)
    setLightboxPhoto(filteredPhotos[nextIndex])
  }

  const prevPhoto = () => {
    const prevIndex = (currentPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length
    setCurrentPhotoIndex(prevIndex)
    setLightboxPhoto(filteredPhotos[prevIndex])
  }

  const getCategoryIcon = (categoryId: string) => {
    const iconMap: Record<string, any> = {
      all: Grid,
      classroom: BookOpen,
      celebrations: Trophy,
      seminars: Users,
      awards: Award,
      mentoring: Heart,
    }
    return iconMap[categoryId] || Grid
  }

  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_from_photo_gallery', {
        event_category: 'conversion',
        event_label: 'photo_gallery_cta',
        value: 1,
      })
    }
  }

  return (
    <section className="py-20 bg-navy-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center bg-blue-100 text-blue-600 px-6 py-3 rounded-full text-sm font-medium mb-6">
            <Camera className="w-5 h-5 mr-2" />
            Cerebrum Photo Gallery - Real Moments, Real Success
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Memories of <span className="text-blue-600">Success & Learning</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            Take a look behind the scenes at Cerebrum Biology Academy. These authentic moments
            capture Dr. Shekhar's dedication to students, classroom interactions, and celebrations
            of NEET success.
          </p>

          {/* Gallery Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              {
                label: galleryStats.totalPhotos + '+',
                sublabel: 'Photos',
                icon: Camera,
                color: 'text-blue-600',
              },
              {
                label: galleryStats.yearsOfMemories + '+',
                sublabel: 'Years',
                icon: Calendar,
                color: 'text-emerald-600',
              },
              {
                label: galleryStats.studentsDocumented + '+',
                sublabel: 'Students',
                icon: Users,
                color: 'text-teal-600',
              },
              {
                label: galleryStats.successMoments + '+',
                sublabel: 'Success Stories',
                icon: Trophy,
                color: 'text-yellow-600',
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  className={`w-12 h-12 ${stat.color} mx-auto mb-3 rounded-xl flex items-center justify-center bg-white shadow-lg`}
                >
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-xl font-bold text-gray-900">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Search and Filters */}
        {showSearch && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-8">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search photos by title, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-4">
              {photoCategories.map((category) => {
                const Icon = getCategoryIcon(category.id)
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center px-6 py-3 rounded-full font-medium transition-all ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white text-gray-600 hover:text-blue-600 hover:bg-blue-50 shadow-md'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {category.name}
                    <span className="ml-2 text-xs bg-black/10 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Photo Grid */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {isLoading ? (
            // Loading Skeleton
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="aspect-square bg-gray-200 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredPhotos.map((photo, index) => (
                  <motion.div
                    key={photo.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                    onClick={() => openLightbox(photo, index)}
                  >
                    {/* Photo Placeholder with Category Color */}
                    <div
                      className={`w-full h-full bg-gradient-to-br ${
                        photo.category === 'classroom'
                          ? 'from-blue-400 to-blue-600'
                          : photo.category === 'celebrations'
                            ? 'from-emerald-400 to-emerald-600'
                            : photo.category === 'seminars'
                              ? 'from-teal-400 to-teal-600'
                              : photo.category === 'awards'
                                ? 'from-yellow-400 to-yellow-600'
                                : photo.category === 'mentoring'
                                  ? 'from-navy-400 to-navy-600'
                                  : 'from-gray-400 to-gray-600'
                      } flex items-center justify-center text-white`}
                    >
                      <div className="text-center p-4">
                        <Camera className="w-12 h-12 mx-auto mb-3 opacity-60" />
                        <p className="text-sm font-medium opacity-90">{photo.title}</p>
                        <p className="text-xs opacity-70 mt-1">{photo.date}</p>
                      </div>
                    </div>

                    {/* Overlay with Info */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              photo.category === 'classroom'
                                ? 'bg-blue-100 text-blue-700'
                                : photo.category === 'celebrations'
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : photo.category === 'seminars'
                                    ? 'bg-teal-100 text-teal-700'
                                    : photo.category === 'awards'
                                      ? 'bg-yellow-100 text-yellow-700'
                                      : photo.category === 'mentoring'
                                        ? 'bg-navy-100 text-navy-700'
                                        : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {photo.category.replace('_', ' ')}
                          </span>
                          <ZoomIn className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-white font-semibold text-sm mb-1">{photo.title}</h3>
                        <p className="text-white/80 text-xs line-clamp-2">{photo.description}</p>
                      </div>

                      <div className="space-y-2">
                        {photo.achievement && (
                          <div className="flex items-center text-white/80 text-xs">
                            <Trophy className="w-3 h-3 mr-1" />
                            <span className="line-clamp-1">{photo.achievement}</span>
                          </div>
                        )}
                        <div className="flex items-center text-white/80 text-xs">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span>{photo.location}</span>
                        </div>
                        <div className="flex items-center text-white/80 text-xs">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>{new Date(photo.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Featured Badge */}
                    {photo.featured && (
                      <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        Featured
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}

          {/* No Results Message */}
          {!isLoading && filteredPhotos.length === 0 && (
            <div className="text-center py-12">
              <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No photos found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxPhoto && enableLightbox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <div
                className="relative max-w-4xl w-full max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center z-10 hover:bg-white/30 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>

                {/* Navigation Buttons */}
                <button
                  onClick={prevPhoto}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center z-10 hover:bg-white/30 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center z-10 hover:bg-white/30 transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>

                {/* Photo */}
                <div className="aspect-video bg-gradient-to-br from-teal-400 to-navy-600 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center text-white p-8">
                    <Camera className="w-20 h-20 mx-auto mb-4 opacity-60" />
                    <h3 className="text-2xl font-bold mb-2">{lightboxPhoto.title}</h3>
                    <p className="text-lg opacity-90">{lightboxPhoto.description}</p>
                  </div>
                </div>

                {/* Photo Details */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-bold mb-4">{lightboxPhoto.title}</h3>
                      <p className="text-white/80 mb-4">{lightboxPhoto.description}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{new Date(lightboxPhoto.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{lightboxPhoto.location}</span>
                        </div>
                        {lightboxPhoto.achievement && (
                          <div className="flex items-center">
                            <Trophy className="w-4 h-4 mr-2" />
                            <span>{lightboxPhoto.achievement}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {lightboxPhoto.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center bg-white/20 text-white px-3 py-1 rounded-full text-xs font-medium"
                          >
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      {lightboxPhoto.students && (
                        <div>
                          <h4 className="font-semibold mb-2">Students Featured:</h4>
                          <div className="text-sm text-white/80">
                            {lightboxPhoto.students.join(', ')}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div
          className="text-center bg-navy-900 rounded-3xl p-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-4">Be Part of the Next Success Story</h3>
          <p className="text-xl mb-8 opacity-90">
            Join Dr. Shekhar's classes and create your own success memories at Cerebrum Biology
            Academy. Your NEET journey starts here!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary_cta"
              size="xl"
              className="bg-teal-600 text-white hover:bg-teal-700 shadow-lg hover:shadow-xl"
              onClick={handleDemoBooking}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Book Your Demo Class
            </Button>

            <Button
              variant="outline"
              size="xl"
              className="border-white text-white hover:bg-white hover:text-navy-900"
            >
              <Camera className="w-5 h-5 mr-2" />
              View Complete Gallery
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-8 mt-8 text-sm opacity-90">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span>5+ Years Documented</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
              <span>2,500+ Students Mentored</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
              <span>Authentic Moments</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
