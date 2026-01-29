'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Award, Star, Quote, ChevronLeft, ChevronRight, Play, X } from 'lucide-react'
import { RealTestimonial } from '@/data/realTestimonials'
import { Button } from '@/components/ui/Button'
import { LazyYouTubeEmbed } from '@/components/performance/LazyYouTubeEmbed'

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
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className="relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {currentTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${currentPage}`}
                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className="relative aspect-video bg-indigo-600 cursor-pointer group"
                  onClick={() => openVideoModal(testimonial)}
                >
                  {testimonial.youtubeId ? (
                    <>
                      <Image
                        src={testimonial.thumbnail}
                        alt={`${testimonial.studentName} testimonial`}
                        fill
                        className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 text-blue-600 ml-1" />
                        </div>
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
              </div>
            ))}
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

      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeVideoModal}
        >
          <div
            className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition-colors shadow-lg"
              aria-label="Close video"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="aspect-video bg-black">
              <LazyYouTubeEmbed
                videoId={selectedVideo.youtubeId || ''}
                title={`${selectedVideo.studentName} testimonial`}
                thumbnailUrl={selectedVideo.thumbnail}
                autoplay={true}
                className="w-full h-full rounded-none"
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
          </div>
        </div>
      )}
    </div>
  )
}
