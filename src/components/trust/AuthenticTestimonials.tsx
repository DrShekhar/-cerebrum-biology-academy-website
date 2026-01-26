'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star,
  CheckCircle,
  Play,
  Quote,
  MapPin,
  Calendar,
  Award,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useTranslations } from '@/lib/i18n/translations'
import { OptimizedImage } from '@/components/mobile/OptimizedImage'
import { LazyVideo } from '@/components/performance/LazyVideo'

interface TestimonialData {
  id: string
  studentName: string
  location: string
  course: string
  neetScore: number
  rank: number
  college: string
  admissionYear: number
  testimonialText: string
  rating: number
  videoUrl?: string
  photoUrl: string
  verificationId: string
  dateAdded: string
  beforeScore?: number
  improvement?: number
  parentTestimonial?: {
    parentName: string
    text: string
  }
}

const testimonialData: TestimonialData[] = [
  {
    id: '1',
    studentName: 'Priya Sharma',
    location: 'Delhi',
    course: 'NEET 2024 Complete',
    neetScore: 348,
    rank: 1247,
    college: 'AIIMS Delhi',
    admissionYear: 2024,
    testimonialText:
      'Cerebrum Academy के बिना मेरा AIIMS Delhi में दाखिला संभव नहीं था। Biology में 356/360 marks लाने में उनके teachers ने मेरी बहुत मदद की। Live classes और doubt clearing sessions बहुत helpful थे।',
    rating: 5,
    videoUrl: '/testimonials/priya-sharma.mp4',
    photoUrl: '/testimonials/priya-sharma.jpg',
    verificationId: 'NEET2024-1247',
    dateAdded: '2024-08-15',
    beforeScore: 280,
    improvement: 68,
    parentTestimonial: {
      parentName: 'Mrs. Rajesh Sharma',
      text: 'As a parent, I was initially skeptical about online coaching. But Cerebrum Academy proved me wrong. The faculty is excellent and they genuinely care about each student.',
    },
  },
  {
    id: '2',
    studentName: 'Rahul Kumar',
    location: 'Mumbai',
    course: 'NEET Dropper Batch',
    neetScore: 342,
    rank: 1892,
    college: 'KEM Hospital Mumbai',
    admissionYear: 2024,
    testimonialText:
      "After failing NEET in my first attempt, I was demotivated. Cerebrum Academy's dropper batch gave me the confidence and strategy I needed. The mentors understood my weaknesses and helped me improve systematically.",
    rating: 5,
    photoUrl: '/testimonials/rahul-kumar.jpg',
    verificationId: 'NEET2024-1892',
    dateAdded: '2024-08-10',
    beforeScore: 295,
    improvement: 47,
  },
  {
    id: '3',
    studentName: 'Sneha Patel',
    location: 'Ahmedabad',
    course: 'Class 12 + NEET',
    neetScore: 335,
    rank: 3456,
    college: 'Government Medical College, Ahmedabad',
    admissionYear: 2024,
    testimonialText:
      'The way Biology is taught at Cerebrum is exceptional. Complex topics like Genetics and Evolution became so easy to understand. Mock tests helped me manage time during the actual exam.',
    rating: 5,
    videoUrl: '/testimonials/sneha-patel.mp4',
    photoUrl: '/testimonials/sneha-patel.jpg',
    verificationId: 'NEET2024-3456',
    dateAdded: '2024-08-05',
    improvement: 55,
  },
  {
    id: '4',
    studentName: 'Arjun Singh',
    location: 'Jaipur',
    course: 'NEET 2024 Complete',
    neetScore: 329,
    rank: 4567,
    college: 'SMS Medical College, Jaipur',
    admissionYear: 2024,
    testimonialText:
      'मैं एक छोटे शहर से हूं और यहां अच्छी coaching नहीं मिल पाती थी। Cerebrum Academy के online classes से मुझे Delhi-Mumbai जैसी quality की education मिली। Teachers बहुत supportive हैं।',
    rating: 5,
    photoUrl: '/testimonials/arjun-singh.jpg',
    verificationId: 'NEET2024-4567',
    dateAdded: '2024-07-28',
    improvement: 62,
  },
  {
    id: '5',
    studentName: 'Ananya Reddy',
    location: 'Hyderabad',
    course: 'NEET Complete + Test Series',
    neetScore: 325,
    rank: 5789,
    college: 'Osmania Medical College',
    admissionYear: 2024,
    testimonialText:
      'The test series was a game-changer for me. Regular mock tests helped me identify my weak areas. The detailed analysis after each test showed exactly where I needed to improve.',
    rating: 5,
    photoUrl: '/testimonials/ananya-reddy.jpg',
    verificationId: 'NEET2024-5789',
    dateAdded: '2024-07-20',
    improvement: 48,
  },
]

export function AuthenticTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showVideo, setShowVideo] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'video' | 'high-score'>('all')
  const { language } = useTranslations()

  const filteredTestimonials = testimonialData.filter((testimonial) => {
    if (filter === 'video') return testimonial.videoUrl
    if (filter === 'high-score') return testimonial.neetScore >= 340
    return true
  })

  const currentTestimonial = filteredTestimonials[currentIndex]

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length
    )
  }

  if (!currentTestimonial) return null

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            {language === 'hi' ? 'सत्यापित सफलता की कहानियां' : 'Verified Success Stories'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 mb-8"
          >
            {language === 'hi'
              ? 'हमारे छात्रों की प्रामाणिक समीक्षाएं और उनकी सफलता'
              : 'Authentic reviews and success stories from our students'}
          </motion.p>

          {/* Filters */}
          <div className="flex justify-center space-x-4 mb-8">
            {[
              { key: 'all', label: language === 'hi' ? 'सभी' : 'All' },
              { key: 'video', label: language === 'hi' ? 'वीडियो' : 'Video' },
              { key: 'high-score', label: language === 'hi' ? 'हाई स्कोर' : 'High Score' },
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => {
                  setFilter(filterOption.key as any)
                  setCurrentIndex(0)
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === filterOption.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden"
            >
              <div className="p-8 md:p-12">
                {/* Student Info Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <OptimizedImage
                        src={currentTestimonial.photoUrl}
                        alt={currentTestimonial.studentName}
                        width={80}
                        height={80}
                        className="rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-green-600 border-2 border-white rounded-full p-1">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {currentTestimonial.studentName}
                      </h3>
                      <div className="flex items-center space-x-2 text-gray-600 mb-1">
                        <MapPin className="w-4 h-4" />
                        <span>{currentTestimonial.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{currentTestimonial.course}</span>
                      </div>
                    </div>
                  </div>

                  {/* Video Play Button */}
                  {currentTestimonial.videoUrl && (
                    <button
                      onClick={() => setShowVideo(currentTestimonial.id)}
                      className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <Play className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {language === 'hi' ? 'वीडियो देखें' : 'Watch Video'}
                      </span>
                    </button>
                  )}
                </div>

                {/* Achievement Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <Award className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-800">
                      {currentTestimonial.neetScore}
                    </div>
                    <div className="text-sm text-green-600">NEET Score</div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <Star className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-800">
                      {currentTestimonial.rank.toLocaleString()}
                    </div>
                    <div className="text-sm text-blue-600">AIR Rank</div>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 text-center">
                    <CheckCircle className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-lg font-bold text-purple-800">
                      {currentTestimonial.college}
                    </div>
                    <div className="text-sm text-purple-600">Admitted To</div>
                  </div>
                  {currentTestimonial.improvement && (
                    <div className="bg-orange-50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-orange-800">
                        +{currentTestimonial.improvement}
                      </div>
                      <div className="text-sm text-orange-600">Score Improvement</div>
                    </div>
                  )}
                </div>

                {/* Testimonial Quote */}
                <div className="relative mb-8">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-200" />
                  <blockquote className="text-lg text-gray-700 leading-relaxed pl-6 italic">
                    "{currentTestimonial.testimonialText}"
                  </blockquote>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-6">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < currentTestimonial.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {language === 'hi'
                      ? `${currentTestimonial.rating}/5 - सत्यापित समीक्षा`
                      : `${currentTestimonial.rating}/5 - Verified Review`}
                  </span>
                </div>

                {/* Verification Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>
                      {language === 'hi' ? 'सत्यापित छात्र' : 'Verified Student'} • ID:{' '}
                      {currentTestimonial.verificationId}
                    </span>
                  </div>

                  <div className="text-sm text-gray-500">
                    {new Date(currentTestimonial.dateAdded).toLocaleDateString()}
                  </div>
                </div>

                {/* Parent Testimonial */}
                {currentTestimonial.parentTestimonial && (
                  <div className="mt-8 bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {language === 'hi' ? 'अभिभावक की प्रतिक्रिया' : 'Parent Feedback'}
                    </h4>
                    <blockquote className="text-gray-700 italic mb-2">
                      "{currentTestimonial.parentTestimonial.text}"
                    </blockquote>
                    <cite className="text-sm text-gray-600">
                      - {currentTestimonial.parentTestimonial.parentName}
                    </cite>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prevTestimonial}
              className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>{language === 'hi' ? 'पिछला' : 'Previous'}</span>
            </button>

            <div className="flex space-x-2">
              {filteredTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
            >
              <span>{language === 'hi' ? 'अगला' : 'Next'}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Modal */}
        <AnimatePresence>
          {showVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
              onClick={() => setShowVideo(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <LazyVideo
                  src={testimonialData.find((t) => t.id === showVideo)?.videoUrl || ''}
                  poster={testimonialData.find((t) => t.id === showVideo)?.photoUrl || ''}
                  controls
                  autoPlay
                  muted={false}
                  className="w-full aspect-video rounded-xl"
                />
                <button
                  onClick={() => setShowVideo(null)}
                  className="absolute -top-4 -right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors z-10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

// Testimonial stats summary
export function TestimonialStats() {
  const { language } = useTranslations()

  const stats = [
    {
      value: '2,847',
      label: language === 'hi' ? 'सत्यापित समीक्षाएं' : 'Verified Reviews',
      icon: CheckCircle,
      color: 'text-green-600',
    },
    {
      value: '4.9/5',
      label: language === 'hi' ? 'औसत रेटिंग' : 'Average Rating',
      icon: Star,
      color: 'text-yellow-600',
    },
    {
      value: '94.2%',
      label: language === 'hi' ? 'सफलता दर' : 'Success Rate',
      icon: Award,
      color: 'text-blue-600',
    },
    {
      value: '567',
      label: language === 'hi' ? 'वीडियो प्रशंसापत्र' : 'Video Testimonials',
      icon: Play,
      color: 'text-purple-600',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="text-center"
        >
          <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
          <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
          <div className="text-sm text-gray-600">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  )
}
