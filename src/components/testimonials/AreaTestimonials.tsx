'use client'

import { Star, MapPin, TrendingUp, Quote } from 'lucide-react'
import { RealTestimonial, CityKey, getTestimonialsForCity } from '@/data/realTestimonials'

interface AreaTestimonialsProps {
  citySlug: CityKey
  areaName: string
  cityName: string
}

export function AreaTestimonials({ citySlug, areaName, cityName }: AreaTestimonialsProps) {
  const testimonials = getTestimonialsForCity(citySlug)

  if (testimonials.length === 0) return null

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Success Stories from {cityName} Students
          </h2>
          <p className="text-gray-600">
            Students from {areaName} and nearby areas who cracked NEET with Cerebrum Biology Academy
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 6).map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: RealTestimonial }) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-gray-900">{testimonial.studentName}</h3>
          <div className="flex items-center gap-2 mt-1">
            {testimonial.area && (
              <span className="flex items-center text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                <MapPin className="w-3 h-3 mr-1" />
                {testimonial.area}
              </span>
            )}
            <span className="text-xs text-gray-500">{testimonial.year}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-green-700">{testimonial.score}</div>
          {testimonial.improvement && (
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              {testimonial.improvement}
            </div>
          )}
        </div>
      </div>

      {testimonial.achievement && (
        <div className="mb-3">
          <span className="text-xs font-medium text-purple-700 bg-purple-50 px-2 py-1 rounded-full">
            {testimonial.achievement}
          </span>
        </div>
      )}

      <div className="relative">
        <Quote className="w-6 h-6 text-blue-200 absolute -top-1 -left-1" />
        <p className="text-sm text-gray-700 pl-4 italic leading-relaxed">
          {testimonial.quote}
        </p>
      </div>

      <div className="flex items-center gap-1 mt-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        ))}
      </div>
    </div>
  )
}
