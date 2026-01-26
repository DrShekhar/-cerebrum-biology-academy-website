'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { testimonials, successStats, videoTestimonials } from '@/data/testimonials'
import {
  Star,
  Play,
  Quote,
  MapPin,
  Award,
  Users,
  ChevronLeft,
  ChevronRight,
  Youtube,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useI18n } from '@/contexts/I18nContext'

export function TestimonialsSection() {
  const { t } = useI18n()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState('')

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const openVideoModal = (videoId: string) => {
    setSelectedVideo(videoId)
    setShowVideoModal(true)
  }

  const closeVideoModal = () => {
    setShowVideoModal(false)
    setSelectedVideo('')
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Award className="w-4 h-4 mr-2" />
            {t('studentSuccessStories')}
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('hearFromAchievers')}
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('realStoriesDescription')}</p>
        </motion.div>

        {/* Success Statistics */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {successStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="font-semibold text-gray-900 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Testimonial Carousel */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>

            <div className="relative">
              {/* Quote Icon */}
              <Quote className="w-16 h-16 text-blue-200 mb-6" />

              <div className="grid md:grid-cols-3 gap-8 items-center">
                {/* Testimonial Content */}
                <div className="md:col-span-2">
                  <blockquote className="text-xl md:text-2xl text-gray-800 leading-relaxed mb-6">
                    &ldquo;{testimonials[currentTestimonial].comment}&rdquo;
                  </blockquote>

                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400 mr-3">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm">5.0 out of 5</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xl text-gray-900">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-blue-600 font-medium">
                        {testimonials[currentTestimonial].course}
                      </p>
                      <div className="flex items-center text-gray-500 text-sm mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {testimonials[currentTestimonial].location}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {testimonials[currentTestimonial].result}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Student Image & Video */}
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="w-48 h-48 mx-auto bg-blue-500 rounded-full flex items-center justify-center text-white relative overflow-hidden">
                      {/* Placeholder for student image */}
                      <Users className="w-24 h-24 opacity-80" />
                      {testimonials[currentTestimonial].videoId && (
                        <button
                          onClick={() => openVideoModal(testimonials[currentTestimonial].videoId!)}
                          className="absolute inset-0 bg-black/30 flex items-center justify-center hover:bg-black/40 transition-colors group"
                          aria-label={`Watch video testimonial from ${testimonials[currentTestimonial].name}`}
                        >
                          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-8 h-8 text-blue-600 ml-1" aria-hidden="true" />
                          </div>
                        </button>
                      )}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {testimonials[currentTestimonial].videoId && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      onClick={() => openVideoModal(testimonials[currentTestimonial].videoId!)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {t('watchVideo')}
                    </Button>
                  )}
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex justify-center mt-8 space-x-4">
                <button
                  onClick={prevTestimonial}
                  className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors min-w-[48px] min-h-[48px]"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600" aria-hidden="true" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors min-w-[48px] min-h-[48px]"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-6 h-6 text-white" aria-hidden="true" />
                </button>
              </div>

              {/* Dots Indicator */}
              <div
                className="flex justify-center mt-4 space-x-2"
                role="tablist"
                aria-label="Testimonial navigation"
              >
                {testimonials.map((testimonial, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-4 h-4 rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center ${
                      index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                    role="tab"
                    aria-selected={index === currentTestimonial}
                    aria-label={`View testimonial from ${testimonial.name}`}
                  >
                    <span
                      className={`w-3 h-3 rounded-full ${index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'}`}
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Video Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
            {t('videoSuccessStories')}
          </h3>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {videoTestimonials.map((video, index) => (
              <motion.div
                key={video.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                onClick={() => openVideoModal(video.videoId)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    openVideoModal(video.videoId)
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Watch ${video.title} - ${video.studentName}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative aspect-video bg-blue-500">
                  {/* Placeholder thumbnail */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Youtube className="w-16 h-16 text-white opacity-80" />
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-blue-600 ml-1" />
                    </div>
                  </div>

                  {/* Video Stats */}
                  <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                    <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </span>
                    <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.views} views
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {video.title}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">{video.studentName}</span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {video.result}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center bg-blue-600 rounded-3xl p-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-4">{t('readyToWriteStory')}</h3>
          <p className="text-xl mb-8 text-blue-100">{t('joinThousands')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="xl"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              {t('startYourJourney')}
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              {t('watchMoreStories')}
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full aspect-video relative">
            <button
              onClick={closeVideoModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-2xl font-bold min-w-[48px] min-h-[48px] flex items-center justify-center"
              aria-label="Close video modal"
            >
              <span aria-hidden="true">×</span>
            </button>
            <div className="w-full h-full rounded-2xl overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="Student Testimonial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
