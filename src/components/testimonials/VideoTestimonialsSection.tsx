'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { LazyYouTubeEmbed } from '@/components/performance/LazyYouTubeEmbed'

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
    studentName: 'Sadhna Sirin',
    college: 'LHMC Delhi',
    neetScore: 695,
    improvement: 200,
    rank: undefined,
    videoId: 'YI7caDdqC-k',
    thumbnailUrl: '/images/testimonials/sadhna.jpg',
    quote:
      "I scored 695/720 (100 percentile) in NEET with Dr. Shekhar sir's guidance. The structured approach and personalized attention made all the difference!",
    year: 2024,
  },
  {
    id: '2',
    studentName: 'Dattatreya',
    college: 'Government Medical College',
    neetScore: 650,
    improvement: 165,
    rank: undefined,
    videoId: 'NfhkGqOQXzk',
    thumbnailUrl: '/images/testimonials/dattatreya.jpg',
    quote:
      'Got selected in Government Medical College! The systematic teaching methodology and doubt solving sessions were excellent.',
    year: 2024,
  },
  {
    id: '3',
    studentName: 'Nishita',
    college: 'Medical College',
    neetScore: 680,
    improvement: 180,
    rank: undefined,
    videoId: 't5F8RBuHITM',
    thumbnailUrl: '/images/testimonials/nishita.jpg',
    quote:
      'The comprehensive study material and regular mock tests helped me achieve my dream of becoming a doctor!',
    year: 2024,
  },
  {
    id: '4',
    studentName: 'Abhishek Sharma',
    college: 'AFMC Pune',
    neetScore: 672,
    improvement: 175,
    rank: undefined,
    videoId: 'Eim_y7yc5Y8',
    thumbnailUrl: '/images/testimonials/abhishek.jpg',
    quote:
      'Selected in AFMC! The personalized attention and strategic preparation approach made my dream come true.',
    year: 2024,
  },
  {
    id: '5',
    studentName: 'Cerebrum Students Success Stories',
    college: 'Multiple Medical Colleges',
    neetScore: 690,
    improvement: 190,
    rank: undefined,
    videoId: 'WqcWDy0K4lU',
    thumbnailUrl: '/images/testimonials/students.jpg',
    quote:
      'Hear from our successful students who cracked NEET and got into their dream medical colleges!',
    year: 2024,
  },
]

export function VideoTestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  // Track which videos have been clicked to play
  const [playingVideos, setPlayingVideos] = useState<Set<number>>(new Set())

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? VIDEO_TESTIMONIALS.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === VIDEO_TESTIMONIALS.length - 1 ? 0 : prev + 1))
  }

  const handleVideoPlay = (index: number) => {
    setPlayingVideos((prev) => new Set(prev).add(index))
  }

  const activeTestimonial = VIDEO_TESTIMONIALS[activeIndex]

  return (
    <section className="py-16 md:py-24 bg-gray-50">
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
            {/* Video Player - Using LazyYouTubeEmbed for LCP optimization */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <LazyYouTubeEmbed
                videoId={activeTestimonial.videoId}
                title={`${activeTestimonial.studentName} testimonial`}
                thumbnailUrl={activeTestimonial.thumbnailUrl}
                onPlay={() => handleVideoPlay(activeIndex)}
                badge={{
                  text: `${activeTestimonial.neetScore} marks`,
                  className: 'bg-white/90 text-green-600 font-bold',
                }}
                playButtonSize="lg"
              />
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
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
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
