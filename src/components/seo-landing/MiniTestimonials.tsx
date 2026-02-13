'use client'

import { Quote, Star } from 'lucide-react'
import { SEOLandingContent } from '@/data/seo-landing/types'

interface MiniTestimonialsProps {
  testimonials: SEOLandingContent['testimonials']
}

export function MiniTestimonials({ testimonials }: MiniTestimonialsProps) {
  return (
    <section className="bg-indigo-900 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="text-center animate-fadeInUp"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">What Our Students Say</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Real stories from students who achieved their NEET dreams with us
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl bg-white/10 p-6 backdrop-blur-sm animate-fadeInUp"
            >
              {/* Quote Icon */}
              <Quote className="absolute right-4 top-4 h-8 w-8 text-white/10" />

              {/* Score Badge */}
              {testimonial.score && (
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-600/20 px-3 py-1">
                  <span className="text-sm font-semibold text-green-400">{testimonial.score}</span>
                </div>
              )}

              {/* Quote */}
              <blockquote className="relative text-white/90">
                &quot;{testimonial.quote}&quot;
              </blockquote>

              {/* Author */}
              <div className="mt-6 border-t border-white/10 pt-4">
                <div className="flex items-center gap-3">
                  {/* Avatar Placeholder */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-lg font-bold text-white">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-white/70">{testimonial.achievement}</p>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="mt-3 flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicator */}
        <div
          className="mt-12 text-center animate-fadeInUp"
        >
          <p className="text-white/60">
            Join <span className="font-semibold text-white">1,50,000+</span> successful students
          </p>
        </div>
      </div>
    </section>
  )
}
