'use client'

import { useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react'

interface Testimonial {
  name: string
  class: string
  score: string
  image: string
  quote: string
  rating: number
  verified: boolean
}

const testimonials: Testimonial[] = [
  {
    name: 'Priya Sharma',
    class: 'NEET 2024',
    score: '680/720',
    image: '/testimonials/priya.jpg',
    quote:
      "The demo class changed everything. Dr. Rahul's teaching made complex topics crystal clear. Enrolled immediately!",
    rating: 5,
    verified: true,
  },
  {
    name: 'Arjun Mehta',
    class: 'NEET 2024',
    score: '665/720',
    image: '/testimonials/arjun.jpg',
    quote:
      'Best decision ever! The personalized attention during the demo convinced me. Now in AIIMS Delhi thanks to their guidance.',
    rating: 5,
    verified: true,
  },
  {
    name: 'Sneha Reddy',
    class: 'NEET 2023',
    score: '692/720',
    image: '/testimonials/sneha.jpg',
    quote:
      'The demo session gave me confidence. Their teaching methodology is unmatched. Got AIR 234!',
    rating: 5,
    verified: true,
  },
  {
    name: 'Rohan Kumar',
    class: 'NEET 2024',
    score: '658/720',
    image: '/testimonials/rohan.jpg',
    quote:
      'After struggling for a year, the demo class showed me exactly what I was missing. Their way of teaching Biology finally made sense to me!',
    rating: 5,
    verified: true,
  },
  {
    name: 'Aisha Patel',
    class: 'NEET 2023',
    score: '671/720',
    image: '/testimonials/aisha.jpg',
    quote:
      'The free demo was so valuable! Dr. Priya explained concepts I had been confused about for months. Worth every minute!',
    rating: 5,
    verified: true,
  },
]

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const handlePrevious = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  }

  return (
    <div className="bg-gray-50 rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">
          What Students Say About Our Demo Classes
        </h3>
        <div className="flex gap-2">
          <button
            onClick={handlePrevious}
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4 text-gray-700" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden min-h-[200px]">
<div
            key={currentIndex}
            custom={direction}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute w-full animate-fadeInUp"
          >
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-indigo-400 flex items-center justify-center text-white font-bold text-xl">
                    {currentTestimonial.name.charAt(0)}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-semibold text-gray-900">{currentTestimonial.name}</p>
                    {currentTestimonial.verified && (
                      <BadgeCheck className="w-4 h-4 text-blue-600" aria-label="Verified student" />
                    )}
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm text-gray-600">{currentTestimonial.class}</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                      Score: {currentTestimonial.score}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <blockquote className="text-gray-700 italic leading-relaxed">
                    "{currentTestimonial.quote}"
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
</div>

      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? 'w-8 bg-blue-600' : 'w-2 bg-blue-200 hover:bg-blue-300'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
