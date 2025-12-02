'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface VideoTestimonial {
  id: string
  studentName: string
  college: string
  neetScore: number
  improvement: number
  rank?: number
  videoId: string
  thumbnailUrl: string
  quote: string
  year: number
}

const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: '1',
    studentName: 'Priya Sharma',
    college: 'AIIMS Delhi',
    neetScore: 705,
    improvement: 180,
    rank: 156,
    videoId: 'dQw4w9WgXcQ',
    thumbnailUrl: '/images/testimonials/priya.jpg',
    quote:
      'The personalized attention and structured approach helped me improve 180 marks in just 6 months!',
    year: 2024,
  },
  {
    id: '2',
    studentName: 'Arjun Kumar',
    college: 'JIPMER Puducherry',
    neetScore: 685,
    improvement: 150,
    rank: 312,
    videoId: 'dQw4w9WgXcQ',
    thumbnailUrl: '/images/testimonials/arjun.jpg',
    quote: 'Dr. Shekhar sir made complex topics so simple. His teaching style is unmatched!',
    year: 2024,
  },
  {
    id: '3',
    studentName: 'Sneha Reddy',
    college: 'CMC Vellore',
    neetScore: 672,
    improvement: 200,
    rank: 456,
    videoId: 'dQw4w9WgXcQ',
    thumbnailUrl: '/images/testimonials/sneha.jpg',
    quote:
      'From average student to AIR 456 - this journey was only possible because of Cerebrum Academy!',
    year: 2024,
  },
  {
    id: '4',
    studentName: 'Rahul Verma',
    college: 'KGMU Lucknow',
    neetScore: 658,
    improvement: 165,
    rank: 678,
    videoId: 'dQw4w9WgXcQ',
    thumbnailUrl: '/images/testimonials/rahul.jpg',
    quote: 'The doubt solving sessions and mentor support were game changers for my preparation.',
    year: 2024,
  },
]

export function VideoTestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? VIDEO_TESTIMONIALS.length - 1 : prev - 1))
    setIsPlaying(false)
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === VIDEO_TESTIMONIALS.length - 1 ? 0 : prev + 1))
    setIsPlaying(false)
  }

  const activeTestimonial = VIDEO_TESTIMONIALS[activeIndex]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Hear From Our <span className="text-blue-600">Toppers</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real students, real results. Watch how Cerebrum Biology Academy transformed their NEET
            preparation journey.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Video Player */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gray-900"
            >
              {isPlaying ? (
                <iframe
                  src={`https://www.youtube.com/embed/${activeTestimonial.videoId}?autoplay=1`}
                  title={`${activeTestimonial.studentName} testimonial`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <div
                    className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center cursor-pointer group"
                    onClick={() => setIsPlaying(true)}
                  >
                    <div className="text-center text-white p-8">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <Play className="w-10 h-10 text-white fill-white" />
                      </div>
                      <p className="text-lg font-medium">
                        Watch {activeTestimonial.studentName}&apos;s Story
                      </p>
                      <p className="text-white/80 text-sm mt-1">
                        AIR {activeTestimonial.rank} | NEET {activeTestimonial.year}
                      </p>
                    </div>
                  </div>
                  {/* Score Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-2xl font-bold text-green-600">
                      {activeTestimonial.neetScore}
                    </span>
                    <span className="text-gray-600 text-sm ml-1">marks</span>
                  </div>
                </>
              )}
            </motion.div>

            {/* Testimonial Details */}
            <div className="space-y-6">
              {/* Quote */}
              <motion.div
                key={`quote-${activeIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative"
              >
                <Quote className="absolute -top-2 -left-2 w-10 h-10 text-blue-200" />
                <p className="text-xl md:text-2xl text-gray-700 italic pl-8 leading-relaxed">
                  &ldquo;{activeTestimonial.quote}&rdquo;
                </p>
              </motion.div>

              {/* Student Info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {activeTestimonial.studentName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {activeTestimonial.studentName}
                  </h3>
                  <p className="text-blue-600 font-medium">{activeTestimonial.college}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-green-600">{activeTestimonial.neetScore}</p>
                  <p className="text-sm text-gray-600">NEET Score</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    +{activeTestimonial.improvement}
                  </p>
                  <p className="text-sm text-gray-600">Improvement</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-purple-600">AIR {activeTestimonial.rank}</p>
                  <p className="text-sm text-gray-600">All India Rank</p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4">
                <div className="flex gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-700" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-700" />
                  </button>
                </div>

                {/* Dots */}
                <div className="flex gap-2">
                  {VIDEO_TESTIMONIALS.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveIndex(index)
                        setIsPlaying(false)
                      }}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === activeIndex ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <Link href="/success-stories">
                  <Button variant="outline" size="sm">
                    View All Stories
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
        >
          {[
            { label: 'Students Placed', value: '500+', color: 'text-blue-600' },
            { label: 'AIIMS Selections', value: '45+', color: 'text-green-600' },
            { label: 'Average Score Increase', value: '+150', color: 'text-purple-600' },
            { label: 'Success Rate', value: '94.2%', color: 'text-orange-600' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className={`text-3xl md:text-4xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
