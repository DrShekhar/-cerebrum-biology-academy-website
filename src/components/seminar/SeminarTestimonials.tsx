'use client'

import { Star, Quote } from 'lucide-react'
import { SEMINAR_TESTIMONIALS } from '@/lib/seminar/config'

export function SeminarTestimonials() {
  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-teal-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-green-600 font-semibold mb-2">
            WHAT PARENTS ARE SAYING
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Join 500+ Parents Who Transformed Their Approach
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            <span className="text-slate-600">4.9/5 average rating</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {SEMINAR_TESTIMONIALS.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote className="w-8 h-8 text-green-200" />
              </div>

              {/* Quote */}
              <p className="text-slate-700 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Result Badge */}
              <div className="bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-medium mb-4">
                ✅ {testimonial.childResult}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <span className="text-4xl">{testimonial.avatar}</span>
                <div>
                  <p className="font-semibold text-slate-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-slate-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Social Proof */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-wrap justify-center items-center gap-6 bg-white rounded-full px-8 py-4 shadow-lg">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">500+</p>
              <p className="text-xs text-slate-500">Parents Attended</p>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">4.9/5</p>
              <p className="text-xs text-slate-500">Average Rating</p>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">92%</p>
              <p className="text-xs text-slate-500">Would Recommend</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SeminarTestimonials
