'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, Quote, Award, TrendingUp, Users, BookOpen, Target, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'

const testimonials = [
  {
    id: 1,
    name: 'Arjun Sharma',
    score: 685,
    rank: 'AIR 1,245',
    college: 'AIIMS Delhi',
    course: 'MBBS',
    year: '2024',
    image: '/images/students/arjun-sharma.jpg',
    testimonial:
      'Cerebrum Biology Academy transformed my NEET preparation completely. The faculty here understands each student individually and provides personalized guidance. The conceptual clarity I gained in Biology helped me score 358/360 in the subject. I am grateful for their consistent support throughout my journey.',
    improvement: '+145 marks',
    duration: '2 years',
    batch: 'Class 11th & 12th',
  },
  {
    id: 2,
    name: 'Priya Patel',
    score: 672,
    rank: 'AIR 2,156',
    college: 'JIPMER Puducherry',
    course: 'MBBS',
    year: '2024',
    image: '/images/students/priya-patel.jpg',
    testimonial:
      "After failing NEET in my first attempt, I was devastated. Joining Cerebrum's Dropper batch was the best decision I made. Their systematic approach, regular tests, and emotional support helped me bounce back stronger. The biology faculty is exceptional!",
    improvement: '+178 marks',
    duration: '1 year',
    batch: 'Dropper Program',
  },
  {
    id: 3,
    name: 'Rohit Kumar',
    score: 658,
    rank: 'AIR 3,892',
    college: 'KGMU Lucknow',
    course: 'MBBS',
    year: '2024',
    image: '/images/students/rohit-kumar.jpg',
    testimonial:
      'The teaching methodology at Cerebrum is outstanding. Every concept is explained with real-life examples and clinical correlations. The doubt-clearing sessions and regular assessments kept me motivated. Thank you for making my medical dream come true!',
    improvement: '+134 marks',
    duration: '18 months',
    batch: 'Intensive Program',
  },
  {
    id: 4,
    name: 'Sneha Singh',
    score: 645,
    rank: 'AIR 5,467',
    college: 'BHU Varanasi',
    course: 'MBBS',
    year: '2024',
    image: '/images/students/sneha-singh.jpg',
    testimonial:
      "Coming from a small town, I was initially nervous about competitive exams. But Cerebrum's supportive environment and comprehensive study material boosted my confidence. The regular mock tests prepared me well for the actual NEET exam.",
    improvement: '+156 marks',
    duration: '2 years',
    batch: 'Foundation to Final',
  },
  {
    id: 5,
    name: 'Aman Verma',
    score: 639,
    rank: 'AIR 6,823',
    college: 'GSVM Medical College',
    course: 'MBBS',
    year: '2024',
    image: '/images/students/aman-verma.jpg',
    testimonial:
      'The individual attention I received at Cerebrum made all the difference. The faculty identified my weak areas and provided targeted practice. The biology diagrams and mnemonics taught here are unforgettable. Highly recommend!',
    improvement: '+167 marks',
    duration: '1.5 years',
    batch: 'Target Plus',
  },
  {
    id: 6,
    name: 'Kavya Reddy',
    score: 631,
    rank: 'AIR 8,234',
    college: 'Osmania Medical College',
    course: 'MBBS',
    year: '2024',
    image: '/images/students/kavya-reddy.jpg',
    testimonial:
      "Cerebrum's online classes during COVID were as effective as offline ones. The interactive sessions, recorded lectures, and digital study material ensured continuous learning. The faculty's dedication is commendable!",
    improvement: '+143 marks',
    duration: '2 years',
    batch: 'Hybrid Learning',
  },
]

const stats = [
  {
    icon: Users,
    value: '2,847',
    label: 'Students Taught',
    color: 'text-blue-600',
  },
  {
    icon: Award,
    value: '98%',
    label: 'NEET Qualification',
    color: 'text-emerald-600',
  },
  {
    icon: Target,
    value: '186+',
    label: 'AIIMS/JIPMER Selected',
    color: 'text-purple-600',
  },
  {
    icon: TrendingUp,
    value: '685',
    label: 'Highest Score',
    color: 'text-orange-600',
  },
]

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-12 sm:py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Success Stories
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 opacity-90 max-w-3xl mx-auto">
              Discover how our students achieved their medical dreams with our proven teaching
              methodology and personalized guidance
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-8 text-xs sm:text-sm opacity-75 px-4">
              <span className="whitespace-nowrap">98% NEET Qualification Rate</span>
              <span className="hidden sm:inline">•</span>
              <span className="whitespace-nowrap">2,847+ Students Taught</span>
              <span className="hidden sm:inline">•</span>
              <span className="whitespace-nowrap">186+ AIIMS/JIPMER Selected</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Our Track Record
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Numbers that speak for our commitment to student success
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gray-100 mb-3 sm:mb-4`}
                >
                  <stat.icon className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${stat.color}`} />
                </div>
                <div className={`text-2xl sm:text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium text-xs sm:text-sm md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-10 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              What Our Students Say
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from real students who achieved their medical dreams with us
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-14 md:mb-16">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 md:p-8 hover:shadow-lg transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start gap-3 sm:gap-4 mb-5 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary-600">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 truncate">
                      {testimonial.name}
                    </h3>
                    <div className="text-primary-600 font-medium mb-1 text-sm sm:text-base truncate">
                      {testimonial.college}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-1 text-xs sm:text-sm text-gray-500">
                      <span className="whitespace-nowrap">NEET {testimonial.year}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="whitespace-nowrap">{testimonial.rank}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="whitespace-nowrap">{testimonial.score}/720</span>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center space-x-1 text-yellow-500 flex-shrink-0">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <div className="relative mb-5 sm:mb-6">
                  <Quote className="absolute top-0 left-0 w-5 h-5 sm:w-6 sm:h-6 text-primary-200 -translate-x-2 -translate-y-2" />
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed pl-4">
                    {testimonial.testimonial}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-3 sm:gap-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                    <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-600">Improvement:</span>
                    <span className="font-semibold text-emerald-600 whitespace-nowrap">
                      {testimonial.improvement}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold text-blue-600 whitespace-nowrap">
                      {testimonial.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                    <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500 flex-shrink-0" />
                    <span className="text-gray-600">Batch:</span>
                    <span className="font-semibold text-purple-600">{testimonial.batch}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Video Testimonials CTA */}
          <div className="text-center mb-12 sm:mb-14 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-primary-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Watch Video Testimonials
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-5 sm:mb-6">
                Hear directly from our successful students about their journey and experience
              </p>
              <Button>
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zM8 14.5V5.5l6 4.5-6 4.5z" />
                </svg>
                Watch Success Stories
              </Button>
            </motion.div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 max-w-4xl mx-auto"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                Ready to Write Your Success Story?
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8">
                Join thousands of successful students who achieved their medical dreams with our
                expert guidance and proven methodology
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link href="/admissions">
                  <Button size="lg">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Enroll Now
                  </Button>
                </Link>
                <Link href="/demo-booking">
                  <Button size="lg" variant="outline">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Free Demo
                  </Button>
                </Link>
              </div>
              <div className="mt-6 text-sm text-gray-500">
                Join 2,847+ students who trust Cerebrum Biology Academy
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
