'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Quote,
  Star,
  Heart,
  TrendingUp,
  Users,
  Award,
  MapPin,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Play,
  Verified,
  ThumbsUp,
  MessageCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import {
  parentTestimonials,
  parentSuccessMetrics,
  ParentTestimonial,
} from '@/data/parentTestimonialsData'

interface ParentTestimonialsSectionProps {
  showVideoTestimonials?: boolean
  maxTestimonials?: number
  autoSlide?: boolean
  slideInterval?: number
}

export function ParentTestimonialsSection({
  showVideoTestimonials = true,
  maxTestimonials = 6,
  autoSlide = true,
  slideInterval = 8000,
}: ParentTestimonialsSectionProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isPlaying, setIsPlaying] = useState(false)

  const featuredTestimonials = parentTestimonials.slice(0, maxTestimonials)

  useEffect(() => {
    if (!autoSlide) return

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % featuredTestimonials.length)
    }, slideInterval)

    return () => clearInterval(interval)
  }, [autoSlide, slideInterval, featuredTestimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % featuredTestimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + featuredTestimonials.length) % featuredTestimonials.length
    )
  }

  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_from_parent_testimonials', {
        event_category: 'conversion',
        event_label: 'parent_testimonials_cta',
        value: 1,
      })
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  const currentTestimonialData = featuredTestimonials[currentTestimonial]

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
          <div className="inline-flex items-center bg-teal-100 text-teal-600 px-6 py-3 rounded-full text-sm font-medium mb-6">
            <Heart className="w-5 h-5 mr-2" />
            Parent Testimonials - Real Stories of Trust
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What <span className="text-navy-700">Parents Say</span> About Cerebrum
          </h2>

          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            Hear from parents whose children transformed their medical dreams into reality with
            Cerebrum's guidance. These are stories of trust, dedication, and extraordinary results.
          </p>

          {/* Parent Success Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: TrendingUp,
                label: `${parentSuccessMetrics.averageImprovement}+`,
                sublabel: 'Avg. Improvement',
                color: 'text-emerald-600',
              },
              {
                icon: ThumbsUp,
                label: `${parentSuccessMetrics.parentSatisfaction}%`,
                sublabel: 'Parent Satisfaction',
                color: 'text-blue-600',
              },
              {
                icon: Users,
                label: `${parentSuccessMetrics.recommendationRate}%`,
                sublabel: 'Recommendation Rate',
                color: 'text-navy-600',
              },
              {
                icon: Star,
                label: `${parentSuccessMetrics.averageRating}`,
                sublabel: 'Average Rating',
                color: 'text-yellow-600',
              },
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  className={`w-12 h-12 ${metric.color} mx-auto mb-3 rounded-xl flex items-center justify-center bg-white shadow-lg`}
                >
                  <metric.icon className="w-6 h-6" />
                </div>
                <div className="text-xl font-bold text-gray-900">{metric.label}</div>
                <div className="text-sm text-gray-600">{metric.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Testimonial Showcase */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="p-8 md:p-12"
              >
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  {/* Parent Info */}
                  <div className="text-center md:text-left">
                    <div className="relative inline-block mb-6">
                      <div className="w-24 h-24 bg-navy-900 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg border-2 border-teal-600">
                        {currentTestimonialData.parentName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                        <Verified className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {currentTestimonialData.parentName}
                    </h3>
                    <p className="text-gray-600 mb-2">{currentTestimonialData.parentOccupation}</p>
                    <div className="flex items-center justify-center md:justify-start text-sm text-gray-500 mb-4">
                      <MapPin className="w-4 h-4 mr-1" />
                      {currentTestimonialData.location}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-center md:justify-start mb-4">
                      {renderStars(currentTestimonialData.rating)}
                      <span className="ml-2 text-sm text-gray-600">
                        ({currentTestimonialData.rating}/5)
                      </span>
                    </div>

                    {/* Student Achievement Badge */}
                    <div className="inline-flex items-center bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
                      <Award className="w-4 h-4 mr-2" />
                      Child: {currentTestimonialData.studentAchievement}
                    </div>
                  </div>

                  {/* Testimonial Content */}
                  <div className="md:col-span-2">
                    <div className="relative">
                      <Quote className="w-12 h-12 text-teal-200 absolute -top-4 -left-4" />
                      <blockquote className="text-lg text-gray-700 leading-relaxed italic mb-6 pl-8">
                        "{currentTestimonialData.testimonial}"
                      </blockquote>
                    </div>

                    {/* Student Details */}
                    <div className="bg-teal-50 rounded-xl p-6 mb-6 border border-teal-100">
                      <h4 className="font-semibold text-gray-900 mb-3">Success Story Details:</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Student:</span>
                          <span className="font-medium text-gray-900 ml-2">
                            {currentTestimonialData.studentName}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">College:</span>
                          <span className="font-medium text-gray-900 ml-2">
                            {currentTestimonialData.college}
                          </span>
                        </div>
                        {currentTestimonialData.beforeScore &&
                          currentTestimonialData.afterScore && (
                            <>
                              <div>
                                <span className="text-gray-600">Score Improvement:</span>
                                <span className="font-medium text-emerald-600 ml-2">
                                  {currentTestimonialData.beforeScore} →{' '}
                                  {currentTestimonialData.afterScore}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-600">Improvement:</span>
                                <span className="font-bold text-emerald-600 ml-2">
                                  +
                                  {currentTestimonialData.afterScore -
                                    currentTestimonialData.beforeScore}{' '}
                                  marks
                                </span>
                              </div>
                            </>
                          )}
                      </div>
                    </div>

                    {/* Key Highlights */}
                    <div className="flex flex-wrap gap-2">
                      {currentTestimonialData.highlights.map((highlight, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center bg-navy-100 text-navy-700 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Testimonial Indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {featuredTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-teal-600' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Additional Testimonials Grid */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">More Parent Stories</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {parentTestimonials
              .slice(maxTestimonials, maxTestimonials + 6)
              .map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg p-6 border border-navy-200"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-navy-900 rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-teal-600">
                      {testimonial.parentName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div className="ml-3">
                      <h4 className="font-semibold text-gray-900">{testimonial.parentName}</h4>
                      <p className="text-sm text-gray-600">{testimonial.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center mb-3">
                    {renderStars(testimonial.rating)}
                    <span className="ml-2 text-sm text-gray-600">({testimonial.rating}/5)</span>
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-4">
                    "{testimonial.testimonial.substring(0, 150)}..."
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>
                      {testimonial.studentName} → {testimonial.college}
                    </span>
                    <span className="text-emerald-600 font-medium">
                      {testimonial.beforeScore &&
                        testimonial.afterScore &&
                        `+${testimonial.afterScore - testimonial.beforeScore} marks`}
                    </span>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center bg-navy-900 rounded-3xl p-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-4">
            Join the Cerebrum Family of Successful Parents
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Over 847 parents have trusted Cerebrum with their children's medical dreams. Let us
            guide your child to success too.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              variant="secondary"
              size="xl"
              className="bg-white text-navy-900 hover:bg-gray-100"
              onClick={handleDemoBooking}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Book Free Parent Consultation
            </Button>

            <Button
              variant="outline"
              size="xl"
              className="border-white text-white hover:bg-white hover:text-navy-900"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Talk to Other Parents
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-8 text-sm opacity-90">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span>98.7% Parent Satisfaction</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
              <span>847+ Success Stories</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-teal-400 rounded-full mr-2"></div>
              <span>96.2% Recommend</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
