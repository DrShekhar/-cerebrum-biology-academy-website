'use client'

import { motion } from 'framer-motion'
import { VideoShowcase } from '@/components/ui/VideoShowcase'
import { Play, ExternalLink, BookOpen, Clock, Users, Award } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

// Featured video lectures for homepage
const featuredLectures = [
  {
    id: 'rnai_featured',
    videoId: 'WqcWDy0K4lU', // Replace with actual RNAi video ID
    title: 'RNAi - RNA Interference',
    description: "Master the concept of RNA interference with Dr. Shekhar's expert explanation.",
    duration: '45:30',
    views: '15.2K',
    topic: 'Biotechnology',
  },
  {
    id: 'photosynthesis_featured',
    videoId: 'WqcWDy0K4lU', // Replace with photosynthesis video ID
    title: 'Photosynthesis Complete',
    description: 'Comprehensive coverage of light and dark reactions for NEET Biology.',
    duration: '52:20',
    views: '25.3K',
    topic: 'Plant Physiology',
  },
  {
    id: 'reproduction_featured',
    videoId: 'WqcWDy0K4lU', // Replace with reproduction video ID
    title: 'Human Reproduction',
    description: 'Complete human reproductive system with exam-focused approach.',
    duration: '55:40',
    views: '28.7K',
    topic: 'Human Physiology',
  },
]

export function CompactVideoLectures() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_from_compact_videos', {
        event_category: 'conversion',
        event_label: 'homepage_video_lectures',
        value: 1,
      })
    }
  }

  return (
    <section className="py-20 bg-navy-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Play className="w-4 h-4 mr-2" />
            Cerebrum Video Lecture Library
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Learn from <span className="text-purple-600">Expert Video Lectures</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Access Dr. Shekhar's comprehensive NEET Biology video library with 200+ lectures
            covering all topics with crystal clear explanations.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
            {[
              { icon: Play, label: '200+', sublabel: 'Lectures' },
              { icon: Clock, label: '100+', sublabel: 'Hours' },
              { icon: Users, label: '50K+', sublabel: 'Views' },
              { icon: Award, label: '98%', sublabel: 'Success' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center mx-auto mb-2">
                  <stat.icon className="w-5 h-5 text-purple-600" />
                </div>
                <div className="font-bold text-gray-900">{stat.label}</div>
                <div className="text-xs text-gray-600">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Videos Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {featuredLectures.map((lecture, index) => (
            <motion.div
              key={lecture.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <VideoShowcase
                videoId={lecture.videoId}
                title={lecture.title}
                description={lecture.description}
                category="course_preview"
                duration={lecture.duration}
                showCTA={true}
                ctaText="Watch Lecture"
                onCTAClick={handleDemoBooking}
                className="h-full"
              />

              {/* Video Stats */}
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                  {lecture.topic}
                </span>
                <span className="flex items-center">
                  <Play className="w-3 h-3 mr-1" />
                  {lecture.views} views
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center bg-white rounded-2xl shadow-lg p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            200+ More Lectures Available
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Get unlimited access to our complete video lecture library covering all NEET Biology
            topics from basic concepts to advanced problem-solving techniques.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/video-lectures">
              <Button variant="primary" size="xl" className="bg-teal-600 hover:bg-teal-700">
                <BookOpen className="w-5 h-5 mr-2" />
                Browse All Lectures
              </Button>
            </Link>

            <Button variant="outline" size="xl" onClick={handleDemoBooking}>
              <Play className="w-5 h-5 mr-2" />
              Get Full Access - Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span>HD Quality</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span>24/7 Access</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              <span>AIIMS Faculty</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
              <span>Complete Syllabus</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
