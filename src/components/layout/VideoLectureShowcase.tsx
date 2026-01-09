'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { VideoShowcase } from '@/components/ui/VideoShowcase'
import { VideoSkeleton } from '@/components/ui/LoadingStates'
import {
  BookOpen,
  Play,
  Users,
  Clock,
  Award,
  Filter,
  ExternalLink,
  Microscope,
  Zap,
  Leaf,
  Heart,
  Brain,
  Search,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

// Video lecture data structure based on biologyforneetug.com content
interface VideoLecture {
  id: string
  videoId: string // YouTube video ID
  title: string
  description: string
  topic: string
  chapter: string
  class: '11th' | '12th' | 'both' | 'dropper'
  difficulty: 'foundation' | 'intermediate' | 'advanced'
  duration: string
  views?: string
  featured?: boolean
  thumbnailUrl?: string
  tags: string[]
}

// Dr. Shekhar's NEET Biology Video Lectures
const videoLectures: VideoLecture[] = [
  {
    id: 'rnai_lecture',
    videoId: 'WqcWDy0K4lU', // Placeholder - replace with actual RNAi video ID
    title: 'RNAi (RNA Interference) - Complete Concept',
    description:
      'Comprehensive explanation of RNA interference mechanism, applications in gene silencing, and NEET exam importance.',
    topic: 'Molecular Biology',
    chapter: 'Biotechnology',
    class: '12th',
    difficulty: 'advanced',
    duration: '45:30',
    views: '15.2K',
    featured: true,
    tags: ['NEET', 'Biotechnology', 'RNA', 'Gene Regulation'],
  },
  {
    id: 'gene_therapy',
    videoId: 'WqcWDy0K4lU', // Placeholder - replace with actual Gene Therapy video ID
    title: 'Gene Therapy - Principles and Applications',
    description:
      'Learn about gene therapy techniques, vectors, and therapeutic applications for NEET Biology preparation.',
    topic: 'Biotechnology',
    chapter: 'Biotechnology and Its Applications',
    class: '12th',
    difficulty: 'advanced',
    duration: '38:45',
    views: '12.8K',
    featured: true,
    tags: ['NEET', 'Gene Therapy', 'Medical Biotechnology'],
  },
  {
    id: 'bt_cotton',
    videoId: 'WqcWDy0K4lU', // Placeholder - replace with actual Bt Cotton video ID
    title: 'Bt Cotton - Genetic Engineering Application',
    description:
      'Understanding Bt cotton production, benefits, controversies, and NEET exam questions on transgenic crops.',
    topic: 'Biotechnology',
    chapter: 'Biotechnology and Its Applications',
    class: '12th',
    difficulty: 'intermediate',
    duration: '32:15',
    views: '18.5K',
    featured: false,
    tags: ['NEET', 'Bt Cotton', 'Transgenic Plants', 'GMOs'],
  },
  {
    id: 'photosynthesis_complete',
    videoId: 'WqcWDy0K4lU', // Add your photosynthesis video ID
    title: 'Photosynthesis - Light & Dark Reactions',
    description:
      'Complete photosynthesis process covering light reactions, Calvin cycle, and C3, C4, CAM pathways.',
    topic: 'Plant Physiology',
    chapter: 'Photosynthesis in Higher Plants',
    class: '11th',
    difficulty: 'intermediate',
    duration: '52:20',
    views: '25.3K',
    featured: true,
    tags: ['NEET', 'Photosynthesis', 'Plant Physiology'],
  },
  {
    id: 'respiration_cellular',
    videoId: 'WqcWDy0K4lU', // Add your respiration video ID
    title: 'Cellular Respiration - Glycolysis to ETC',
    description:
      'Detailed explanation of cellular respiration: glycolysis, Krebs cycle, and electron transport chain.',
    topic: 'Plant Physiology',
    chapter: 'Respiration in Plants',
    class: '11th',
    difficulty: 'intermediate',
    duration: '48:35',
    views: '22.1K',
    featured: false,
    tags: ['NEET', 'Respiration', 'Metabolism'],
  },
  {
    id: 'human_reproduction',
    videoId: 'WqcWDy0K4lU', // Add your reproduction video ID
    title: 'Human Reproduction - Male & Female Systems',
    description:
      'Complete coverage of human reproductive system, gametogenesis, and reproductive health.',
    topic: 'Human Physiology',
    chapter: 'Human Reproduction',
    class: '12th',
    difficulty: 'intermediate',
    duration: '55:40',
    views: '28.7K',
    featured: true,
    tags: ['NEET', 'Human Reproduction', 'Physiology'],
  },
]

const topics = [
  { id: 'all', label: 'All Topics', icon: BookOpen },
  { id: 'Biotechnology', label: 'Biotechnology', icon: Zap },
  { id: 'Plant Physiology', label: 'Plant Physiology', icon: Leaf },
  { id: 'Human Physiology', label: 'Human Physiology', icon: Heart },
  { id: 'Molecular Biology', label: 'Molecular Biology', icon: Microscope },
]

const classes = [
  { id: 'all', label: 'All Classes' },
  { id: '11th', label: 'Class 11th' },
  { id: '12th', label: 'Class 12th' },
  { id: 'dropper', label: 'Dropper Batch' },
]

export function VideoLectureShowcase() {
  const [selectedTopic, setSelectedTopic] = useState('all')
  const [selectedClass, setSelectedClass] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [featuredOnly, setFeaturedOnly] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading time for initial render
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  // Filter videos based on selected criteria
  const filteredVideos = videoLectures.filter((video) => {
    const topicMatch = selectedTopic === 'all' || video.topic === selectedTopic
    const classMatch =
      selectedClass === 'all' || video.class === selectedClass || video.class === 'both'
    const searchMatch =
      searchTerm === '' ||
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const featuredMatch = !featuredOnly || video.featured

    return topicMatch && classMatch && searchMatch && featuredMatch
  })

  const featuredVideos = videoLectures.filter((video) => video.featured)

  const handleDemoBooking = () => {
    // Track video lecture demo booking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_from_video_lectures', {
        event_category: 'conversion',
        event_label: 'video_lecture_showcase',
        value: 1,
      })
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center bg-indigo-100 text-indigo-600 px-6 py-3 rounded-full text-sm font-medium mb-6">
            <Play className="w-5 h-5 mr-2" />
            Cerebrum's Complete Video Lecture Series
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Master <span className="text-indigo-600">NEET Biology</span> with Expert Video Lectures
          </h2>

          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            Access Dr. Shekhar's comprehensive video lecture library covering all NEET Biology
            topics. Learn from an AIIMSonian's expertise with 2,847+ successful students.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-3xl mx-auto">
            {[
              { icon: Play, label: '200+', sublabel: 'Video Lectures', color: 'text-indigo-600' },
              { icon: Clock, label: '100+', sublabel: 'Hours Content', color: 'text-blue-600' },
              { icon: Users, label: '50K+', sublabel: 'Views', color: 'text-green-600' },
              { icon: Award, label: '98%', sublabel: 'Success Rate', color: 'text-yellow-600' },
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
                  className={`w-12 h-12 ${stat.color} mx-auto mb-3 rounded-xl flex items-center justify-center bg-white shadow-lg`}
                >
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-xl font-bold text-gray-900">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Videos Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Featured Lectures</h3>
            <p className="text-gray-600">Most popular and high-impact NEET Biology topics</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVideos.map((video) => (
              <VideoShowcase
                key={video.id}
                videoId={video.videoId}
                title={video.title}
                description={video.description}
                category="course_preview"
                duration={video.duration}
                showCTA={true}
                ctaText="Access Full Lecture"
                onCTAClick={handleDemoBooking}
              />
            ))}
          </div>
        </motion.div>

        {/* Filters Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search lectures by topic or tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Topic Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className={`flex items-center px-6 py-3 rounded-full font-medium transition-all ${
                  selectedTopic === topic.id
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 shadow-md'
                }`}
              >
                <topic.icon className="w-4 h-4 mr-2" />
                {topic.label}
              </button>
            ))}
          </div>

          {/* Class Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {classes.map((classItem) => (
              <button
                key={classItem.id}
                onClick={() => setSelectedClass(classItem.id)}
                className={`px-5 py-2 rounded-full font-medium transition-all ${
                  selectedClass === classItem.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:text-blue-600 hover:bg-blue-50 border border-gray-200'
                }`}
              >
                {classItem.label}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-center">
            <span className="text-gray-600">
              Showing {filteredVideos.length} lecture{filteredVideos.length !== 1 ? 's' : ''}
            </span>
          </div>
        </motion.div>

        {/* Video Grid */}
        <AnimatePresence>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {isLoading
              ? // Loading skeleton for videos
                Array.from({ length: 6 }).map((_, index) => (
                  <motion.div
                    key={`skeleton-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <VideoSkeleton />
                  </motion.div>
                ))
              : filteredVideos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative"
                  >
                    {/* Class Badge */}
                    <div
                      className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-semibold ${
                        video.class === '11th'
                          ? 'bg-green-100 text-green-700'
                          : video.class === '12th'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-purple-100 text-purple-700'
                      }`}
                    >
                      {video.class === 'dropper' ? 'Dropper' : `Class ${video.class}`}
                    </div>

                    <VideoShowcase
                      videoId={video.videoId}
                      title={video.title}
                      description={video.description}
                      category="course_preview"
                      duration={video.duration}
                      showCTA={true}
                      ctaText="Watch Full Lecture"
                      onCTAClick={handleDemoBooking}
                    />

                    {/* Video Stats */}
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center">
                        <Play className="w-4 h-4 mr-1" />
                        {video.views} views
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {video.duration}
                      </span>
                    </div>
                  </motion.div>
                ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          className="text-center bg-green-600 rounded-3xl p-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-4">Ready to Access Complete Video Library?</h3>
          <p className="text-xl mb-8 text-indigo-100">
            Join 2,847+ successful students and get unlimited access to all Cerebrum video lectures
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              variant="secondary"
              size="xl"
              className="bg-white text-indigo-600 hover:bg-gray-100"
              onClick={handleDemoBooking}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Get Full Access - Free Demo
            </Button>

            <Button
              variant="outline"
              size="xl"
              className="border-white text-white hover:bg-white hover:text-indigo-600"
              onClick={() =>
                window.open(
                  'https://www.biologyforneetug.com/recorded-video-lectures-for-neet-biology',
                  '_blank'
                )
              }
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              View All Lectures
            </Button>
          </div>

          {/* Trust Signals */}
          <div className="flex items-center justify-center space-x-8 text-sm text-indigo-100">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span>AIIMS Faculty</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
              <span>Complete Syllabus</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
              <span>HD Quality</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
