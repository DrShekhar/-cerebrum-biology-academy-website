'use client'

import React, { useState, useEffect } from 'react'
import {
  CountryContentService,
  CountryTestimonial,
} from '@/lib/international/countryContentService'
import { usePersonalization } from '@/components/providers/PersonalizationProvider'
import {
  Star,
  GraduationCap,
  MapPin,
  Calendar,
  Trophy,
} from 'lucide-react'

interface InternationalTestimonialsProps {
  countryCode?: string
  limit?: number
  showTitle?: boolean
  className?: string
}

export function InternationalTestimonials({
  countryCode,
  limit = 6,
  showTitle = true,
  className = '',
}: InternationalTestimonialsProps) {
  const { preferences, trackBehavior } = usePersonalization()
  const [testimonials, setTestimonials] = useState<CountryTestimonial[]>([])
  const [selectedTestimonial, setSelectedTestimonial] = useState<CountryTestimonial | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTestimonials()
  }, [countryCode, preferences.location])

  const loadTestimonials = () => {
    setLoading(true)
    try {
      // Determine country code from props or user preferences
      const targetCountry =
        countryCode || preferences.countryCode || preferences.location?.country || 'IN'

      // Get testimonials for the specific country
      let countryTestimonials = CountryContentService.getRegionalTestimonials(targetCountry, limit)

      // If no testimonials for the specific country, get from nearest supported country
      if (countryTestimonials.length === 0) {
        const nearestCountry = CountryContentService.getNearnestSupportedCountry(targetCountry)
        if (nearestCountry) {
          countryTestimonials = CountryContentService.getRegionalTestimonials(
            nearestCountry.code,
            limit
          )
        }
      }

      // Mix in some international testimonials for variety
      const allCountries = CountryContentService.getAllCountries()
      const internationalTestimonials: CountryTestimonial[] = []

      allCountries.forEach((country) => {
        if (country.code !== targetCountry) {
          internationalTestimonials.push(...country.testimonials.slice(0, 1))
        }
      })

      // Combine and limit
      const combined = [
        ...countryTestimonials,
        ...internationalTestimonials.slice(0, Math.max(0, limit - countryTestimonials.length)),
      ].slice(0, limit)

      setTestimonials(combined)

      trackBehavior('testimonials_loaded', {
        countryCode: targetCountry,
        testimonialsCount: combined.length,
      })
    } catch (error) {
      console.error('Failed to load testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTestimonialClick = (testimonial: CountryTestimonial) => {
    setSelectedTestimonial(testimonial)
    trackBehavior('testimonial_clicked', {
      studentName: testimonial.name,
      location: testimonial.location,
      course: testimonial.course,
      year: testimonial.year,
    })
  }

  const getScoreColor = (score: string): string => {
    const numericScore = parseInt(score.match(/\d+/)?.[0] || '0')
    if (numericScore >= 650) return 'text-green-600 bg-green-100'
    if (numericScore >= 600) return 'text-blue-600 bg-blue-100'
    if (numericScore >= 550) return 'text-yellow-600 bg-yellow-100'
    return 'text-purple-600 bg-purple-100'
  }

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        {showTitle && (
          <div className="text-center">
            <div className="animate-pulse bg-gray-200 h-8 w-64 rounded mx-auto mb-4"></div>
            <div className="animate-pulse bg-gray-200 h-4 w-96 rounded mx-auto"></div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(limit)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                <div className="h-3 bg-gray-200 rounded w-4/6"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-6 bg-gray-200 rounded w-20"></div>
                <div className="h-6 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (testimonials.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <Trophy className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Testimonials Available</h3>
        <p className="text-gray-600">
          We're collecting success stories from your region. Check back soon!
        </p>
      </div>
    )
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {showTitle && (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">🌟 Global Success Stories</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from students around the world who achieved their medical dreams with Cerebrum
            Biology Academy
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={`${testimonial.name}-${index}`}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
            onClick={() => handleTestimonialClick(testimonial)}
          >
            {/* Student Header */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {testimonial.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {testimonial.name}
                </h4>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <MapPin className="h-3 w-3" />
                  <span>{testimonial.location}</span>
                </div>
              </div>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
            </div>

            {/* Quote */}
            <blockquote className="text-gray-700 italic text-sm leading-relaxed mb-4 line-clamp-3">
              "{testimonial.message}"
            </blockquote>

            {/* Achievements */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2">
                <Trophy className="h-4 w-4 text-yellow-500" />
                <span
                  className={`text-xs px-2 py-1 rounded-full font-semibold ${getScoreColor(testimonial.score)}`}
                >
                  {testimonial.score}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <GraduationCap className="h-4 w-4 text-blue-500" />
                <span className="text-xs text-gray-600">{testimonial.course}</span>
              </div>

              {testimonial.university && (
                <div className="flex items-center space-x-2">
                  <GraduationCap className="h-4 w-4 text-green-600" />
                  <span className="text-xs font-medium text-green-700">
                    {testimonial.university}
                  </span>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-xs text-gray-500">{testimonial.year}</span>
              </div>
            </div>

            {/* Read More Indicator */}
            <div className="text-center">
              <button className="text-blue-600 text-xs font-medium group-hover:text-blue-700 transition-colors">
                Read Full Story →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Full Testimonial */}
      {selectedTestimonial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    {selectedTestimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedTestimonial.name}</h3>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{selectedTestimonial.location}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTestimonial(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Achievement Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4 text-center">
                  <Trophy className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="font-bold text-green-900">{selectedTestimonial.score}</div>
                  <div className="text-xs text-green-700">Score Achieved</div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4 text-center">
                  <GraduationCap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-bold text-blue-900 text-sm">
                    {selectedTestimonial.course}
                  </div>
                  <div className="text-xs text-blue-700">Course Taken</div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4 text-center">
                  <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="font-bold text-purple-900">{selectedTestimonial.year}</div>
                  <div className="text-xs text-purple-700">Success Year</div>
                </div>
              </div>

              {/* University Info */}
              {selectedTestimonial.university && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <GraduationCap className="h-6 w-6 text-yellow-600" />
                    <div>
                      <div className="font-semibold text-yellow-900">Currently Studying At</div>
                      <div className="text-yellow-800">{selectedTestimonial.university}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Full Quote */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="text-4xl text-gray-300 mb-2">"</div>
                <blockquote className="text-gray-700 text-lg leading-relaxed italic">
                  {selectedTestimonial.message}
                </blockquote>
                <div className="text-4xl text-gray-300 text-right">"</div>
              </div>

              {/* Rating */}
              <div className="text-center">
                <div className="flex justify-center text-yellow-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  {selectedTestimonial.name} rated their experience 5/5 stars
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-indigo-500 rounded-xl p-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-4">Ready to Join Our Success Stories?</h3>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Join thousands of students worldwide who achieved their medical dreams with our expert
          Biology coaching.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Start Your Journey
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
            View All Success Stories
          </button>
        </div>
      </div>
    </div>
  )
}
