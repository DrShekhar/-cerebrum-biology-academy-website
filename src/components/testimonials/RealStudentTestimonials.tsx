'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, Star, Quote, ChevronLeft, ChevronRight, Volume2, VolumeX, Play } from 'lucide-react'
import { RealTestimonial } from '@/data/realTestimonials'
import { Button } from '@/components/ui/Button'

interface RealStudentTestimonialsProps {
  testimonials: RealTestimonial[]
  title?: string
  subtitle?: string
  showVideoModal?: boolean
}

export function RealStudentTestimonials({
  testimonials,
  title = 'Real Student Success Stories',
  subtitle = 'Hear directly from our NEET toppers and successful students',
  showVideoModal = true,
}: RealStudentTestimonialsProps) {
  const [selectedVideo, setSelectedVideo] = useState<RealTestimonial | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 3

  const totalPages = Math.ceil(testimonials.length / itemsPerPage)
  const currentTestimonials = testimonials.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  )

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const openVideoModal = (testimonial: RealTestimonial) => {
    if (testimonial.youtubeId && showVideoModal) {
      setSelectedVideo(testimonial)
    }
  }

  const closeVideoModal = () => {
    setSelectedVideo(null)
  }

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </motion.div>

        <div className="relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <AnimatePresence mode="popLayout">
              {currentTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                  <div
                    className="relative aspect-video bg-indigo-600 cursor-pointer group"
                    onClick={() => openVideoModal(testimonial)}
                  >
                    {testimonial.youtubeId ? (
                      <>
                        <img
                          src={testimonial.thumbnail}
                          alt={`${testimonial.studentName} testimonial`}
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <motion.div
                            className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Play className="w-8 h-8 text-blue-600 ml-1" />
                          </motion.div>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center text-white p-6">
                          <Award className="w-16 h-16 mx-auto mb-4 opacity-80" />
                          <p className="text-lg font-semibold">{testimonial.achievement}</p>
                        </div>
                      </div>
                    )}

                    <div className="absolute top-4 right-4 bg-[#4a5d4a] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      {testimonial.year}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {testimonial.studentName}
                      </h3>
                      {testimonial.college && (
                        <p className="text-blue-600 font-semibold mb-1">{testimonial.college}</p>
                      )}
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Award className="w-4 h-4 mr-2 text-yellow-500" />
                        <span className="font-medium">{testimonial.score}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                      <p className="text-sm font-semibold text-gray-800 mb-1">Achievement</p>
                      <p className="text-sm text-gray-700">{testimonial.achievement}</p>
                    </div>

                    <div className="relative">
                      <Quote className="absolute -top-2 -left-2 w-6 h-6 text-gray-300" />
                      <blockquote className="text-gray-700 italic pl-6 pr-2 text-sm leading-relaxed">
                        {testimonial.quote}
                      </blockquote>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      {testimonial.youtubeId && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openVideoModal(testimonial)}
                          className="text-xs"
                        >
                          Watch Video
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={handlePrevPage}
                className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>

              <div className="flex items-center space-x-3">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-all ${
                      currentPage === i ? 'bg-blue-600' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                    aria-label={`Go to page ${i + 1}`}
                  >
                    <span
                      className={`rounded-full transition-all ${
                        currentPage === i ? 'w-6 h-3 bg-white' : 'w-3 h-3 bg-gray-500'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={handleNextPage}
                className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
                aria-label="Next page"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeVideoModal}
          >
            <motion.div
              className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeVideoModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition-colors shadow-lg"
                aria-label="Close video"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="aspect-video bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                  title={`${selectedVideo.studentName} testimonial`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              <div className="p-6 bg-gray-50">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedVideo.studentName}
                    </h3>
                    {selectedVideo.college && (
                      <p className="text-blue-600 font-semibold mb-1">{selectedVideo.college}</p>
                    )}
                    <p className="text-gray-700 font-medium">{selectedVideo.achievement}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600">{selectedVideo.score}</div>
                    <div className="text-sm text-gray-600">{selectedVideo.year}</div>
                  </div>
                </div>

                <div className="relative bg-white rounded-2xl p-4">
                  <Quote className="absolute -top-2 -left-2 w-6 h-6 text-gray-300" />
                  <blockquote className="text-gray-700 italic pl-6 pr-2">
                    {selectedVideo.quote}
                  </blockquote>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
