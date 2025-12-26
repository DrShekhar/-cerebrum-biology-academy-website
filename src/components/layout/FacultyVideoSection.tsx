'use client'

import { motion } from 'framer-motion'
import { VideoShowcase } from '@/components/ui/VideoShowcase'
import { BookOpen, Award, Users, Star, Play, Zap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'

// Video data structure - easily configurable
interface FacultyVideo {
  id: string
  videoId: string
  title: string
  description: string
  category: 'demo' | 'testimonial' | 'faculty' | 'course_preview'
  subject?: string
  duration?: string
  featured?: boolean
}

// Dr. Shekhar's videos - configured for easy management
const facultyVideos: FacultyVideo[] = [
  {
    id: 'teaching_demo_1',
    videoId: 'WqcWDy0K4lU', // Your provided video
    title: 'NEET Biology - Advanced Teaching Methodology',
    description:
      'Watch Dr. Shekhar demonstrate the proven teaching techniques that have helped 2,847+ students secure medical seats with 98% success rate.',
    category: 'demo',
    subject: 'Biology',
    duration: 'Watch Preview',
    featured: true,
  },
  // Additional videos can be added here
  {
    id: 'student_success_1',
    videoId: 'WqcWDy0K4lU', // Placeholder - replace with actual testimonial video
    title: 'Student Success Story - AIIMS Selection',
    description:
      'Hear from our student who secured AIIMS admission after joining Cerebrum Biology Academy.',
    category: 'testimonial',
    duration: '3:45',
    featured: false,
  },
  {
    id: 'course_preview_1',
    videoId: 'WqcWDy0K4lU', // Placeholder - replace with course preview
    title: 'Cerebrum Class 12th Biology - Course Preview',
    description:
      'Get a sneak peek into our comprehensive NEET Biology curriculum designed for Class 12th students.',
    category: 'course_preview',
    subject: 'Class 12th Biology',
    duration: '2:30',
    featured: false,
  },
]

export function FacultyVideoSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [featuredVideoId, setFeaturedVideoId] = useState(
    facultyVideos.find((v) => v.featured)?.videoId || facultyVideos[0].videoId
  )

  // Filter videos based on selected category
  const filteredVideos =
    selectedCategory === 'all'
      ? facultyVideos
      : facultyVideos.filter((video) => video.category === selectedCategory)

  const featuredVideo = facultyVideos.find((v) => v.videoId === featuredVideoId) || facultyVideos[0]

  const categories = [
    { id: 'all', label: 'All Videos', icon: Play },
    { id: 'demo', label: 'Teaching Demos', icon: BookOpen },
    { id: 'testimonial', label: 'Success Stories', icon: Star },
    { id: 'course_preview', label: 'Course Previews', icon: Users },
    { id: 'faculty', label: 'Faculty Insights', icon: Award },
  ]

  const handleDemoBooking = () => {
    // Navigate to demo booking or trigger modal
    console.log('Demo booking triggered from video section')

    // Track conversion
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_from_video', {
        event_category: 'conversion',
        event_label: 'faculty_video_section',
        value: 1,
      })
    }
  }

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Play className="w-4 h-4 mr-2" />
            Dr. Shekhar's Teaching Excellence
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Experience <span className="text-blue-600">Cerebrum's Teaching</span> Quality
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Watch Dr. Shekhar Singh in action - see the proven teaching methodology that has helped
            2,847+ students secure medical seats with our industry-leading 98% success rate.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: Users, label: '2,847+', sublabel: 'Students Placed', color: 'text-blue-600' },
              { icon: Award, label: '98%', sublabel: 'Success Rate', color: 'text-green-600' },
              {
                icon: BookOpen,
                label: '247',
                sublabel: 'AIIMS Selections',
                color: 'text-green-600',
              },
              { icon: Star, label: '4.9/5', sublabel: 'Student Rating', color: 'text-yellow-600' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  className={`w-12 h-12 ${stat.color} mx-auto mb-3 rounded-lg flex items-center justify-center bg-white shadow-lg`}
                >
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Video Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:text-blue-600 hover:bg-blue-50 shadow-md'
              }`}
            >
              <category.icon className="w-4 h-4 mr-2" />
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Featured Video */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Featured Teaching Demo</h3>
            <p className="text-gray-600">Experience Dr. Shekhar's proven teaching methodology</p>
          </div>

          <VideoShowcase
            videoId={featuredVideo.videoId}
            title={featuredVideo.title}
            description={featuredVideo.description}
            category={featuredVideo.category}
            duration={featuredVideo.duration}
            className="max-w-4xl mx-auto"
            showCTA={true}
            ctaText="Book Free Cerebrum Demo Class"
            onCTAClick={handleDemoBooking}
          />
        </motion.div>

        {/* Video Grid */}
        {filteredVideos.length > 1 && (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {filteredVideos
              .filter((video) => !video.featured)
              .map((video, index) => (
                <VideoShowcase
                  key={video.id}
                  videoId={video.videoId}
                  title={video.title}
                  description={video.description}
                  category={video.category}
                  duration={video.duration}
                  showCTA={true}
                  ctaText="Learn More"
                  onCTAClick={handleDemoBooking}
                />
              ))}
          </motion.div>
        )}

        {/* Bottom CTA Section */}
        <motion.div
          className="text-center bg-navy-900 rounded-3xl p-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Experience Cerebrum's Teaching Excellence?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Join 2,847+ successful students and start your journey to medical college admission
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="xl"
                className="bg-white text-blue-600 hover:bg-gray-100"
                onClick={handleDemoBooking}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Book Free Demo Class
              </Button>

              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-blue-600"
                onClick={() => window.open('tel:+918826444334', '_self')}
              >
                <Zap className="w-5 h-5 mr-2" />
                Call Now: +91 88264 44334
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-8 mt-8 text-sm opacity-90">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span>Free Demo Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                <span>AIIMS Faculty</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                <span>98% Success Rate</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
