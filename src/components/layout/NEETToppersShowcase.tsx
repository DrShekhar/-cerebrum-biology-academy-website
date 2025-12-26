'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Trophy,
  Star,
  Award,
  TrendingUp,
  Play,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Camera,
  BookOpen,
  Target,
  Calendar,
  Medal,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface NEETTopper {
  id: string
  name: string
  score: number
  rank?: number
  year: number
  college: string
  photoUrl: string
  videoUrl?: string
  quote: string
  achievement: string
  beforeScore?: number
  improvement?: number
}

// NEET Toppers data inspired by biologyforneetug.com showcase
const neetToppers: NEETTopper[] = [
  {
    id: 'topper-001',
    name: 'Sadhna Sirin',
    score: 695,
    rank: 247,
    year: 2023,
    college: 'AIIMS Delhi',
    photoUrl: '/images/toppers/sadhna-sirin.jpg',
    videoUrl: 'https://youtube.com/watch?v=example1',
    quote:
      "Dr. Shekhar's teaching methodology transformed my understanding of Biology. The way he explains complex concepts with real-life examples made NEET preparation enjoyable.",
    achievement: 'NEET 2023 Topper - 695 Marks',
    beforeScore: 480,
    improvement: 215,
  },
  {
    id: 'topper-002',
    name: 'Abhisek Kumar',
    score: 672,
    rank: 489,
    year: 2024,
    college: 'AFMC Pune',
    photoUrl: '/images/toppers/abhisek-kumar.jpg',
    videoUrl: 'https://youtube.com/watch?v=example2',
    quote:
      "Cerebrum's disciplined approach and Dr. Shekhar's personal mentoring helped me crack AFMC. The study material and tests were perfectly aligned with exam patterns.",
    achievement: 'AFMC Selection 2024',
    beforeScore: 520,
    improvement: 152,
  },
  {
    id: 'topper-003',
    name: 'Priya Sharma',
    score: 658,
    rank: 724,
    year: 2024,
    college: 'AIIMS Jodhpur',
    photoUrl: '/images/toppers/priya-sharma.jpg',
    quote:
      'The individual attention and doubt clearing sessions at Cerebrum were exceptional. Dr. Shekhar believed in me even when I doubted myself.',
    achievement: 'AIIMS Jodhpur Selection',
    beforeScore: 465,
    improvement: 193,
  },
  {
    id: 'topper-004',
    name: 'Rohit Patel',
    score: 641,
    rank: 1247,
    year: 2023,
    college: 'KGMU Lucknow',
    photoUrl: '/images/toppers/rohit-patel.jpg',
    videoUrl: 'https://youtube.com/watch?v=example4',
    quote:
      "From struggling with basic concepts to scoring 641 in NEET - this transformation was possible only because of Cerebrum's structured approach.",
    achievement: 'KGMU Selection',
    beforeScore: 420,
    improvement: 221,
  },
  {
    id: 'topper-005',
    name: 'Ananya Gupta',
    score: 634,
    rank: 1456,
    year: 2024,
    college: 'BHU Varanasi',
    photoUrl: '/images/toppers/ananya-gupta.jpg',
    quote:
      "The mock tests and regular assessments at Cerebrum kept me exam-ready. Dr. Shekhar's motivational sessions boosted my confidence tremendously.",
    achievement: 'BHU Medical College',
    beforeScore: 445,
    improvement: 189,
  },
  {
    id: 'topper-006',
    name: 'Vikash Singh',
    score: 628,
    rank: 1789,
    year: 2023,
    college: 'CMC Vellore',
    photoUrl: '/images/toppers/vikash-singh.jpg',
    videoUrl: 'https://youtube.com/watch?v=example6',
    quote:
      "Cerebrum's faculty goes beyond teaching - they mentor and guide you through every challenge. Grateful for the complete transformation.",
    achievement: 'CMC Vellore Selection',
    beforeScore: 490,
    improvement: 138,
  },
]

interface NEETToppersShowcaseProps {
  maxToppers?: number
  showVideos?: boolean
  autoSlide?: boolean
}

export function NEETToppersShowcase({
  maxToppers = 6,
  showVideos = true,
  autoSlide = true,
}: NEETToppersShowcaseProps) {
  const [currentTopper, setCurrentTopper] = useState(0)
  const [showVideo, setShowVideo] = useState(false)

  const displayedToppers = neetToppers.slice(0, maxToppers)

  const nextTopper = () => {
    setCurrentTopper((prev) => (prev + 1) % displayedToppers.length)
  }

  const prevTopper = () => {
    setCurrentTopper((prev) => (prev - 1 + displayedToppers.length) % displayedToppers.length)
  }

  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_from_toppers', {
        event_category: 'conversion',
        event_label: 'neet_toppers_showcase',
        value: 1,
      })
    }
  }

  const currentTopperData = displayedToppers[currentTopper]

  return (
    <section className="py-20 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center bg-yellow-100 text-yellow-600 px-6 py-3 rounded-full text-sm font-medium mb-6">
            <Trophy className="w-5 h-5 mr-2" />
            Meet Our NEET Toppers - Real Success Stories
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Celebrating <span className="text-yellow-600">NEET Champions</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            From struggling students to NEET toppers - witness the incredible transformation
            journeys of our students who achieved their medical dreams with Cerebrum's guidance.
          </p>

          {/* Success Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { icon: Trophy, label: '695+', sublabel: 'Highest Score', color: 'text-yellow-600' },
              { icon: Medal, label: '247+', sublabel: 'Best Rank', color: 'text-orange-600' },
              {
                icon: TrendingUp,
                label: '221+',
                sublabel: 'Max Improvement',
                color: 'text-red-600',
              },
              { icon: Award, label: '94.2%', sublabel: 'Success Rate', color: 'text-green-600' },
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

        {/* Main Topper Showcase */}
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
                key={currentTopper}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="p-8 md:p-12"
              >
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  {/* Topper Photo & Achievement */}
                  <div className="text-center">
                    <div className="relative inline-block mb-6">
                      {/* Photo Placeholder with Achievement Colors */}
                      <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white shadow-2xl">
                        <div className="text-center">
                          <Trophy className="w-8 h-8 mx-auto mb-1" />
                          <div className="text-lg font-bold">{currentTopperData.score}</div>
                        </div>
                      </div>

                      {/* Achievement Badge */}
                      <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        Rank {currentTopperData.rank}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {currentTopperData.name}
                    </h3>
                    <p className="text-lg text-yellow-600 font-semibold mb-2">
                      NEET {currentTopperData.year} - {currentTopperData.score} Marks
                    </p>
                    <p className="text-gray-600 mb-4">{currentTopperData.college}</p>

                    {/* Video Play Button */}
                    {showVideos && currentTopperData.videoUrl && (
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setShowVideo(true)}
                        className="mb-4"
                      >
                        <Play className="w-5 h-5 mr-2" />
                        Watch Success Story
                      </Button>
                    )}

                    {/* Improvement Stats */}
                    {currentTopperData.improvement && (
                      <div className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                        <TrendingUp className="w-4 h-4 mr-2" />+{currentTopperData.improvement}{' '}
                        marks improvement
                      </div>
                    )}
                  </div>

                  {/* Success Story & Quote */}
                  <div className="md:col-span-2">
                    <div className="relative">
                      <h4 className="text-xl font-bold text-gray-900 mb-4">
                        {currentTopperData.achievement}
                      </h4>
                      <blockquote className="text-lg text-gray-700 leading-relaxed italic mb-6">
                        "{currentTopperData.quote}"
                      </blockquote>
                    </div>

                    {/* Achievement Details */}
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 mb-6">
                      <h5 className="font-semibold text-gray-900 mb-3">Journey Highlights:</h5>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">NEET Score:</span>
                          <span className="font-bold text-yellow-600 ml-2 text-lg">
                            {currentTopperData.score}/720
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">All India Rank:</span>
                          <span className="font-bold text-orange-600 ml-2">
                            {currentTopperData.rank}
                          </span>
                        </div>
                        {currentTopperData.beforeScore && (
                          <>
                            <div>
                              <span className="text-gray-600">Starting Score:</span>
                              <span className="font-medium text-gray-700 ml-2">
                                {currentTopperData.beforeScore}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600">Improvement:</span>
                              <span className="font-bold text-green-600 ml-2">
                                +{currentTopperData.improvement} marks
                              </span>
                            </div>
                          </>
                        )}
                        <div>
                          <span className="text-gray-600">College:</span>
                          <span className="font-medium text-gray-900 ml-2">
                            {currentTopperData.college}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Year:</span>
                          <span className="font-medium text-gray-700 ml-2">
                            NEET {currentTopperData.year}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Success Quote Attribution */}
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="w-4 h-4 mr-2 text-yellow-500" />
                      <span>Proud Cerebrum Student</span>
                      <span className="mx-2">•</span>
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>NEET {currentTopperData.year}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
              <button
                onClick={prevTopper}
                className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <button
                onClick={nextTopper}
                className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Topper Indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {displayedToppers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTopper(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTopper ? 'bg-yellow-500' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Toppers Grid */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            More Success Stories
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {neetToppers.slice(maxToppers).map((topper, index) => (
              <motion.div
                key={topper.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
                    {topper.score}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-900">{topper.name}</h4>
                    <p className="text-sm text-yellow-600 font-medium">NEET {topper.year}</p>
                    <p className="text-xs text-gray-600">{topper.college}</p>
                  </div>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                  "{topper.quote}"
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center">
                    <Trophy className="w-3 h-3 mr-1" />
                    Rank {topper.rank}
                  </span>
                  {topper.improvement && (
                    <span className="text-green-600 font-medium">
                      +{topper.improvement} marks
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 rounded-3xl p-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-4">Your Success Story Starts Here</h3>
          <p className="text-xl mb-8 opacity-90">
            Join the ranks of NEET toppers! Transform your medical dreams into reality with Dr.
            Shekhar's proven teaching methodology at Cerebrum Biology Academy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="xl"
              className="bg-white text-orange-600 hover:bg-gray-100"
              onClick={handleDemoBooking}
            >
              <Target className="w-5 h-5 mr-2" />
              Start Your NEET Journey
            </Button>

            <Button
              variant="outline"
              size="xl"
              className="border-white text-white hover:bg-white hover:text-orange-600"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch All Success Videos
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-8 mt-8 text-sm opacity-90">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
              <span>695+ Highest Score</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
              <span>247+ Best Rank</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
              <span>267+ NEET Selections</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
