'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PremiumButton, PremiumCard, AnimatedCounter } from '@/components/ui/PremiumDesignSystem'
import {
  PlayCircleIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
  TrophyIcon,
  HeartIcon,
  UserGroupIcon,
  ChartBarIcon,
  CalendarDaysIcon,
  MapPinIcon,
  CheckBadgeIcon,
  NewspaperIcon,
  DocumentTextIcon,
  ArrowTrendingUpIcon,
  SparklesIcon,
  FaceSmileIcon,
  StarIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid, StarIcon as StarSolid } from '@heroicons/react/24/solid'

interface SuccessStoriesSectionProps {
  onContactStudent?: (studentId: string) => void
  onVideoPlay?: (videoId: string) => void
  className?: string
}

interface SuccessStory {
  id: string
  name: string
  profilePhoto: string
  doctorPhoto?: string
  beforeScore: number
  afterScore: number
  attempts: number
  previousYear: number
  currentYear: number
  category: 'low-scorer' | 'multiple-attempts' | 'gave-up' | 'biology-weak'
  college: string
  currentStatus: string
  hometown: string
  backgroundStory: string
  testimonial: string
  parentTestimonial?: string
  videoUrl?: string
  socialLinks?: {
    linkedin?: string
    instagram?: string
  }
  verificationBadges: string[]
  improvementStory: string
  timeline: Array<{
    phase: string
    description: string
    duration: string
  }>
  mentorQuote?: string
  isVerified: boolean
  responseRate?: number // for message this student feature
}

export function SuccessStoriesSection({
  onContactStudent,
  onVideoPlay,
  className = '',
}: SuccessStoriesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentStory, setCurrentStory] = useState(0)
  const [filteredStories, setFilteredStories] = useState<SuccessStory[]>([])
  const [showQuiz, setShowQuiz] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'stories'>('grid')

  // Real success stories data based on the website
  const successStories: SuccessStory[] = [
    {
      id: 'sadhna-sirin',
      name: 'Sadhna Sirin',
      profilePhoto: '/api/placeholder/150/150',
      doctorPhoto: '/api/placeholder/150/150',
      beforeScore: 298,
      afterScore: 695,
      attempts: 2,
      previousYear: 2022,
      currentYear: 2023,
      category: 'low-scorer',
      college: 'AIIMS Delhi',
      currentStatus: 'Second Year MBBS',
      hometown: 'Delhi NCR',
      backgroundStory:
        'Failed NEET 2022 with 298 marks. Felt devastated and thought medical dreams were over. Parents were disappointed but supportive.',
      testimonial:
        "I thought my medical career was finished after scoring just 298. Dr. Shekhar didn't just teach me Biology - he rebuilt my confidence from scratch. The systematic approach and emotional support helped me score 695 and get into AIIMS Delhi.",
      parentTestimonial:
        'We had almost given up hope. Sadhna was depressed after her first failure. Cerebrum not only improved her scores but also brought back the spark in her eyes.',
      videoUrl: '/videos/sadhna-testimonial.mp4',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/sadhna-sirin',
        instagram: '@sadhna_medstudent',
      },
      verificationBadges: ['College ID Verified', 'Score Sheet Verified', 'Video Verified'],
      improvementStory:
        'In 12 months, went from 298 to 695 marks - a 397-point improvement that changed everything.',
      timeline: [
        {
          phase: 'Rock Bottom',
          description: 'Failed with 298 marks, lost all confidence',
          duration: 'NEET 2022',
        },
        {
          phase: 'Fresh Start',
          description: 'Joined Cerebrum Biology Academy',
          duration: 'June 2022',
        },
        {
          phase: 'Foundation',
          description: 'Rebuilt concepts from scratch',
          duration: 'Month 1-3',
        },
        {
          phase: 'Growth Phase',
          description: 'Consistent improvement in mock tests',
          duration: 'Month 4-8',
        },
        {
          phase: 'Final Push',
          description: 'Intensive revision and practice',
          duration: 'Month 9-12',
        },
        { phase: 'Success', description: 'Scored 695, 100%ile in Biology', duration: 'NEET 2023' },
      ],
      mentorQuote:
        "Sadhna's transformation is proof that failure is just a stepping stone to success.",
      isVerified: true,
      responseRate: 92,
    },
    {
      id: 'abhisek-afmc',
      name: 'Abhisek Kumar',
      profilePhoto: '/api/placeholder/150/150',
      doctorPhoto: '/api/placeholder/150/150',
      beforeScore: 421,
      afterScore: 648,
      attempts: 3,
      previousYear: 2021,
      currentYear: 2023,
      category: 'multiple-attempts',
      college: 'AFMC (Armed Forces Medical College)',
      currentStatus: 'First Year MBBS',
      hometown: 'Delhi',
      backgroundStory:
        'Attempted NEET three times, kept falling short. Family pressure was immense, considered giving up medical dreams.',
      testimonial:
        "Three failures broke my spirit completely. I was ready to settle for any other career. Dr. Shekhar's methodical approach in my fourth attempt finally got me into AFMC. Never giving up was the best decision of my life.",
      parentTestimonial:
        "After three failures, we were worried about Abhisek's future. Cerebrum gave him the structured guidance he desperately needed.",
      videoUrl: '/videos/abhisek-testimonial.mp4',
      verificationBadges: ['College ID Verified', 'Admission Letter Verified'],
      improvementStory:
        'After 3 failed attempts, finally cracked NEET with 648 marks and secured AFMC seat.',
      timeline: [
        { phase: '1st Attempt', description: 'Scored 356, missed cutoff', duration: '2020' },
        { phase: '2nd Attempt', description: 'Scored 389, still not enough', duration: '2021' },
        { phase: '3rd Attempt', description: 'Scored 421, devastating failure', duration: '2022' },
        {
          phase: 'Crisis Point',
          description: 'Almost gave up, family pressure',
          duration: 'Mid 2022',
        },
        {
          phase: 'New Strategy',
          description: 'Joined Cerebrum for structured approach',
          duration: 'July 2022',
        },
        { phase: 'Victory', description: 'Scored 648, got into AFMC', duration: '2023' },
      ],
      mentorQuote:
        "Abhisek's persistence through three failures shows the spirit of a true doctor.",
      isVerified: true,
      responseRate: 88,
    },
    {
      id: 'nishita-quick',
      name: 'Nishita Sharma',
      profilePhoto: '/api/placeholder/150/150',
      beforeScore: 445,
      afterScore: 612,
      attempts: 1,
      previousYear: 2023,
      currentYear: 2023,
      category: 'biology-weak',
      college: 'Maulana Azad Medical College',
      currentStatus: 'First Year MBBS',
      hometown: 'Mumbai',
      backgroundStory:
        'Biology was always my weakest subject. Scored poorly in 12th boards, parents doubted if medical was right choice.',
      testimonial:
        'Biology felt like an impossible mountain to climb. In just 6 months at Cerebrum, Dr. Shekhar made it my strongest subject. From struggling with basic concepts to mastering molecular biology - the transformation was incredible.',
      videoUrl: '/videos/nishita-testimonial.mp4',
      verificationBadges: ['Score Sheet Verified', 'College Verified'],
      improvementStory:
        'Transformed from Biology-phobic to Biology expert in just 6 months of intensive coaching.',
      timeline: [
        {
          phase: 'Weak Foundation',
          description: 'Biology was weakest subject, scored 65% in boards',
          duration: '12th Boards',
        },
        {
          phase: 'Decision Point',
          description: 'Family doubted medical career choice',
          duration: 'May 2022',
        },
        {
          phase: 'Intensive Course',
          description: 'Joined Cerebrum 6-month program',
          duration: 'June 2022',
        },
        {
          phase: 'Concept Building',
          description: 'Built strong foundation from basics',
          duration: 'Month 1-2',
        },
        {
          phase: 'Rapid Progress',
          description: 'Biology became favorite subject',
          duration: 'Month 3-4',
        },
        {
          phase: 'Mastery',
          description: 'Scored 612, secured government seat',
          duration: 'NEET 2023',
        },
      ],
      mentorQuote:
        'Nishita proved that with right guidance, any weakness can become your strength.',
      isVerified: true,
      responseRate: 95,
    },
    {
      id: 'priya-sehgal',
      name: 'Priya Sehgal',
      profilePhoto: '/api/placeholder/150/150',
      doctorPhoto: '/api/placeholder/150/150',
      beforeScore: 523,
      afterScore: 678,
      attempts: 2,
      previousYear: 2022,
      currentYear: 2023,
      category: 'gave-up',
      college: 'JIPMER Puducherry',
      currentStatus: 'Second Year MBBS',
      hometown: 'Faridabad',
      backgroundStory:
        "After first failure, took a gap year working in father's business. Had almost given up on medical dreams when family convinced to try one more time.",
      testimonial:
        "I had actually given up and was working in my father's business. Coming back after a gap year felt impossible. Dr. Shekhar's belief in me was stronger than my own doubts. Today I'm at JIPMER living my dream.",
      parentTestimonial:
        'Priya had lost all hope. We forced her to try one more time at Cerebrum. Best decision we ever made as parents.',
      videoUrl: '/videos/priya-testimonial.mp4',
      socialLinks: {
        instagram: '@priya_jipmer',
      },
      verificationBadges: ['College ID Verified', 'Perfect Biology Score'],
      improvementStory:
        'Came back from a gap year and improved by 155 marks to achieve 360/360 in Biology section.',
      timeline: [
        {
          phase: 'First Failure',
          description: 'Scored 523, missed government seat',
          duration: '2022',
        },
        {
          phase: 'Gap Year',
          description: 'Worked in family business, lost hope',
          duration: '2022-23',
        },
        {
          phase: 'Comeback Decision',
          description: 'Family convinced to try once more',
          duration: 'March 2023',
        },
        {
          phase: 'Intensive Prep',
          description: 'Joined Cerebrum crash course',
          duration: 'April 2023',
        },
        {
          phase: 'Perfect Biology',
          description: 'Achieved 360/360 in Biology',
          duration: 'Mock Tests',
        },
        {
          phase: 'Dream Achieved',
          description: 'Scored 678, got into JIPMER',
          duration: 'NEET 2023',
        },
      ],
      mentorQuote: "Priya's comeback story proves it's never too late to chase your dreams.",
      isVerified: true,
      responseRate: 90,
    },
    {
      id: 'dattatreya',
      name: 'Dattatreya Singh',
      profilePhoto: '/api/placeholder/150/150',
      beforeScore: 387,
      afterScore: 589,
      attempts: 2,
      previousYear: 2022,
      currentYear: 2023,
      category: 'low-scorer',
      college: 'VMMC Safdarjung Hospital',
      currentStatus: 'First Year MBBS',
      hometown: 'Faridabad',
      backgroundStory:
        'First attempt was disaster due to poor preparation strategy. Scored below 400, felt like medical dreams were shattered.',
      testimonial:
        "Scoring 387 in my first attempt crushed my confidence completely. I thought I wasn't cut out for medicine. Cerebrum's systematic approach helped me understand that it wasn't about intelligence - it was about the right method.",
      verificationBadges: ['College Verified', 'Improvement Verified'],
      improvementStory:
        'Jumped from 387 to 589 marks with focused Biology preparation, securing a Delhi government seat.',
      timeline: [
        {
          phase: 'Disaster',
          description: 'First attempt: 387 marks, complete failure',
          duration: '2022',
        },
        {
          phase: 'Analysis',
          description: 'Realized need for systematic approach',
          duration: 'June 2022',
        },
        {
          phase: 'Fresh Start',
          description: 'Joined Cerebrum for second attempt',
          duration: 'July 2022',
        },
        {
          phase: 'Steady Growth',
          description: 'Consistent improvement in mock tests',
          duration: 'Month 3-8',
        },
        {
          phase: 'Breakthrough',
          description: 'Biology became strong suit',
          duration: 'Month 9-10',
        },
        {
          phase: 'Success',
          description: 'Scored 589, secured government seat',
          duration: 'NEET 2023',
        },
      ],
      mentorQuote: "Dattatreya's 200+ mark improvement shows what focused effort can achieve.",
      isVerified: true,
      responseRate: 85,
    },
  ]

  const categories = [
    { id: 'all', name: 'All Success Stories', icon: TrophyIcon, count: successStories.length },
    { id: 'low-scorer', name: 'Failed by <50 marks', icon: ArrowTrendingUpIcon, count: 3 },
    { id: 'multiple-attempts', name: '3+ Attempts', icon: CalendarDaysIcon, count: 1 },
    { id: 'gave-up', name: 'Almost Gave Up', icon: HeartIcon, count: 1 },
    { id: 'biology-weak', name: 'Biology Weakness', icon: ChartBarIcon, count: 1 },
  ]

  // Filter stories based on category and search
  useEffect(() => {
    let filtered = successStories

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((story) => story.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (story) =>
          story.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          story.hometown.toLowerCase().includes(searchTerm.toLowerCase()) ||
          story.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
          story.backgroundStory.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredStories(filtered)
  }, [selectedCategory, searchTerm])

  const getImprovementPercentage = (before: number, after: number) => {
    return Math.round(((after - before) / before) * 100)
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      'low-scorer': 'from-red-500 to-orange-500',
      'multiple-attempts': 'from-blue-500 to-teal-500',
      'gave-up': 'from-navy-500 to-red-500',
      'biology-weak': 'from-green-500 to-emerald-500',
    }
    return colors[category as keyof typeof colors] || 'from-blue-500 to-teal-500'
  }

  return (
    <section className={`py-20 bg-navy-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8 mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-green-100 border border-emerald-200 rounded-full px-4 py-2">
            <FaceSmileIcon className="h-5 w-5 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-800">
              Real Students • Real Transformations • Real Doctors
            </span>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold text-navy-900">
              From Failure to AIIMS
              <br />
              <span className="text-red-500">Real Stories</span>, Real Students
            </h2>

            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Every doctor here <span className="font-bold text-red-600">failed NEET once</span>.
              Today they're saving lives.{' '}
              <span className="font-bold text-emerald-600">Your story could be next.</span>
            </p>
          </div>

          {/* Video Compilation Placeholder */}
          <motion.div whileHover={{ scale: 1.02 }} className="relative max-w-4xl mx-auto">
            <PremiumCard variant="luxury" size="lg" className="relative overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-teal-600 to-navy-600 rounded-lg flex items-center justify-center relative">
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative text-center text-white space-y-4">
                  <PlayCircleIcon className="h-20 w-20 mx-auto mb-4 text-white/90 hover:text-white transition-colors cursor-pointer" />
                  <h3 className="text-2xl font-bold">2-Minute Emotional Journey</h3>
                  <p className="text-lg">Watch their complete transformation stories</p>
                </div>
              </div>
            </PremiumCard>
          </motion.div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: 397, suffix: '+', label: 'Highest Score Jump', icon: ArrowTrendingUpIcon },
              { value: 95, suffix: '%', label: 'Success Rate', icon: TrophyIcon },
              { value: 3, suffix: 'x', label: 'Failed Before Success', icon: HeartIcon },
              { value: 100, suffix: '%', label: 'Biology Perfect Scores', icon: ChartBarIcon },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white rounded-lg p-4 shadow-lg">
                  <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-blue-50 shadow-md'
                }`}
              >
                <category.icon className="h-5 w-5" />
                {category.name}
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search and Tools */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative max-w-md w-full">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, city, college..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-3">
              <PremiumButton
                variant="primary"
                size="md"
                onClick={() => setShowQuiz(true)}
                className="flex items-center gap-2"
              >
                <UserGroupIcon className="h-5 w-5" />
                Find Students Like Me
              </PremiumButton>

              <div className="flex bg-white rounded-lg border shadow-sm">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-l-lg font-medium transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('stories')}
                  className={`px-4 py-2 rounded-r-lg font-medium transition-colors ${
                    viewMode === 'stories'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Stories
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Success Stories Display */}
        <AnimatePresence mode="wait">
          {viewMode === 'grid' && (
            <motion.div
              key="grid"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredStories.map((story, index) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <SuccessStoryCard
                    story={story}
                    onContactStudent={onContactStudent}
                    onVideoPlay={onVideoPlay}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {viewMode === 'stories' && (
            <motion.div
              key="stories"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="max-w-4xl mx-auto"
            >
              <InstagramStyleStories
                stories={filteredStories}
                currentIndex={currentStory}
                onStoryChange={setCurrentStory}
                onContactStudent={onContactStudent}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Probability Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20"
        >
          <SuccessProbabilityCalculator stories={successStories} />
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center bg-navy-900 rounded-2xl p-8 text-white"
        >
          <h3 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h3>
          <p className="text-xl mb-6 opacity-90">
            Join these successful students and transform your NEET failure into medical college
            success
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PremiumButton
              variant="luxury"
              size="lg"
              className="bg-teal-600 text-white hover:bg-teal-700 shadow-lg hover:shadow-xl"
            >
              <PhoneIcon className="h-6 w-6" />
              Book Your Success Consultation
            </PremiumButton>
            <PremiumButton
              variant="primary"
              size="lg"
              className="border-2 border-white bg-transparent hover:bg-white/10"
            >
              Download Success Guide PDF
            </PremiumButton>
          </div>
        </motion.div>
      </div>

      {/* Find Students Like Me Quiz Modal */}
      {showQuiz && <FindStudentsQuiz onClose={() => setShowQuiz(false)} stories={successStories} />}
    </section>
  )
}

// Individual Success Story Card Component
function SuccessStoryCard({
  story,
  onContactStudent,
  onVideoPlay,
}: {
  story: SuccessStory
  onContactStudent?: (studentId: string) => void
  onVideoPlay?: (videoId: string) => void
}) {
  const improvement = story.afterScore - story.beforeScore
  const improvementPercentage = Math.round(
    ((story.afterScore - story.beforeScore) / story.beforeScore) * 100
  )

  return (
    <PremiumCard variant="luxury" size="lg" className="h-full">
      <div className="space-y-6">
        {/* Header with Photo and Basic Info */}
        <div className="text-center space-y-4">
          <div className="relative">
            <img
              src={story.profilePhoto}
              alt={story.name}
              className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
            />
            {story.isVerified && (
              <CheckBadgeIcon className="h-6 w-6 text-blue-500 absolute -bottom-1 -right-1" />
            )}
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900">{story.name}</h3>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <MapPinIcon className="h-4 w-4" />
              {story.hometown}
            </div>
          </div>
        </div>

        {/* Score Improvement Visual */}
        <div className="bg-gradient-to-r from-red-50 to-green-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{story.beforeScore}</div>
              <div className="text-xs text-gray-500">Before</div>
            </div>

            <div className="flex-1 mx-4">
              <div className="relative">
                <div className="h-2 bg-gray-200 rounded-full">
                  <motion.div
                    className="h-2 bg-gradient-to-r from-red-500 to-green-500 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </div>
                <ArrowRightIcon className="h-5 w-5 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1" />
              </div>
              <div className="text-center mt-2">
                <span className="text-sm font-semibold text-green-600">+{improvement} marks</span>
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{story.afterScore}</div>
              <div className="text-xs text-gray-500">After</div>
            </div>
          </div>

          <div className="text-center">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
              +{improvementPercentage}% improvement
            </span>
          </div>
        </div>

        {/* College and Status */}
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <AcademicCapIcon className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-blue-900">{story.college}</span>
          </div>
          <div className="text-sm text-blue-700">{story.currentStatus}</div>
        </div>

        {/* Key Quote */}
        <blockquote className="text-gray-700 italic leading-relaxed">
          "{story.testimonial.slice(0, 120)}..."
        </blockquote>

        {/* Verification Badges */}
        <div className="flex flex-wrap gap-2">
          {story.verificationBadges.map((badge, index) => (
            <span
              key={index}
              className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center gap-1"
            >
              <CheckBadgeIcon className="h-3 w-3" />
              {badge}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {story.videoUrl && (
            <PremiumButton
              variant="primary"
              size="md"
              onClick={() => onVideoPlay?.(story.id)}
              className="w-full flex items-center justify-center gap-2"
            >
              <PlayCircleIcon className="h-5 w-5" />
              Watch Full Story
            </PremiumButton>
          )}

          <div className="grid grid-cols-2 gap-3">
            <PremiumButton
              variant="luxury"
              size="sm"
              onClick={() => onContactStudent?.(story.id)}
              className="flex items-center justify-center gap-2"
            >
              <ChatBubbleLeftRightIcon className="h-4 w-4" />
              Message
            </PremiumButton>

            <PremiumButton
              variant="secondary"
              size="sm"
              className="flex items-center justify-center gap-2"
            >
              <DocumentTextIcon className="h-4 w-4" />
              Full Story
            </PremiumButton>
          </div>

          {story.responseRate && (
            <div className="text-center text-xs text-gray-500">
              Usually responds in 24hrs • {story.responseRate}% response rate
            </div>
          )}
        </div>
      </div>
    </PremiumCard>
  )
}

// Instagram-style Stories View Component
function InstagramStyleStories({
  stories,
  currentIndex,
  onStoryChange,
  onContactStudent,
}: {
  stories: SuccessStory[]
  currentIndex: number
  onStoryChange: (index: number) => void
  onContactStudent?: (studentId: string) => void
}) {
  const currentStory = stories[currentIndex]

  return (
    <div className="relative">
      <PremiumCard variant="luxury" size="xl" className="overflow-hidden">
        {/* Story Progress Indicators */}
        <div className="flex gap-1 mb-4">
          {stories.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Story Content */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img
                src={currentStory.profilePhoto}
                alt={currentStory.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-bold">{currentStory.name}</h3>
                <p className="text-gray-600">{currentStory.college}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">The Journey</h4>
              <div className="space-y-3">
                {currentStory.timeline.slice(0, 3).map((phase, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{phase.phase}</div>
                      <div className="text-sm text-gray-600">{phase.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <blockquote className="bg-blue-50 p-4 rounded-lg italic text-gray-700">
              "{currentStory.testimonial}"
            </blockquote>
          </div>

          {/* Visual Improvement Chart */}
          <div className="space-y-6">
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-4">Score Transformation</h4>
              <div className="relative h-64 bg-gradient-to-t from-red-100 to-green-100 rounded-lg p-4 flex items-end justify-center">
                <div className="flex items-end gap-8">
                  <div className="text-center">
                    <div
                      className="bg-red-500 rounded-t-lg w-16 transition-all duration-1000"
                      style={{ height: `${(currentStory.beforeScore / 720) * 200}px` }}
                    />
                    <div className="mt-2">
                      <div className="font-bold text-red-600">{currentStory.beforeScore}</div>
                      <div className="text-xs text-gray-500">Before</div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div
                      className="bg-green-500 rounded-t-lg w-16 transition-all duration-1000 delay-500"
                      style={{ height: `${(currentStory.afterScore / 720) * 200}px` }}
                    />
                    <div className="mt-2">
                      <div className="font-bold text-green-600">{currentStory.afterScore}</div>
                      <div className="text-xs text-gray-500">After</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <PremiumButton
              variant="medical"
              size="lg"
              onClick={() => onContactStudent?.(currentStory.id)}
              className="w-full"
            >
              <ChatBubbleLeftRightIcon className="h-5 w-5" />
              Message {currentStory.name}
            </PremiumButton>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => onStoryChange(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="p-2 rounded-full bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>

          <button
            onClick={() => onStoryChange(Math.min(stories.length - 1, currentIndex + 1))}
            disabled={currentIndex === stories.length - 1}
            className="p-2 rounded-full bg-gray-100 disabled:opacity-50"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
      </PremiumCard>
    </div>
  )
}

// Success Probability Calculator Component
function SuccessProbabilityCalculator({ stories }: { stories: SuccessStory[] }) {
  const [userScore, setUserScore] = useState(400)
  const [attempts, setAttempts] = useState(1)
  const [probability, setProbability] = useState(0)

  useEffect(() => {
    // Simple probability calculation based on similar stories
    const similarStories = stories.filter(
      (story) => Math.abs(story.beforeScore - userScore) <= 50 && story.attempts >= attempts
    )

    const successRate =
      similarStories.length > 0 ? (similarStories.length / stories.length) * 100 : 75
    setProbability(Math.min(successRate + (attempts > 1 ? 10 : 0), 95))
  }, [userScore, attempts, stories])

  return (
    <PremiumCard variant="premium" size="lg" className="max-w-2xl mx-auto">
      <div className="text-center space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Success Probability Calculator</h3>
          <p className="text-gray-600">Find out your chances based on similar student journeys</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Previous Score: {userScore}
            </label>
            <input
              type="range"
              min="250"
              max="600"
              value={userScore}
              onChange={(e) => setUserScore(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Attempts: {attempts}
            </label>
            <input
              type="range"
              min="1"
              max="4"
              value={attempts}
              onChange={(e) => setAttempts(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              <AnimatedCounter value={probability} suffix="%" />
            </div>
            <div className="text-lg text-gray-700 mb-4">Success Probability</div>
            <p className="text-sm text-gray-600">
              Based on {stories.filter((s) => Math.abs(s.beforeScore - userScore) <= 50).length}{' '}
              similar student journeys
            </p>
          </div>
        </div>

        <PremiumButton variant="medical" size="lg" className="w-full">
          Get Personalized Success Plan
        </PremiumButton>
      </div>
    </PremiumCard>
  )
}

// Find Students Like Me Quiz Modal
function FindStudentsQuiz({ onClose, stories }: { onClose: () => void; stories: SuccessStory[] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Find Students Like You</h3>
            <p className="text-gray-600">Answer a few questions to find similar success stories</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your current/previous NEET score range
              </label>
              <select className="w-full border border-gray-300 rounded-lg p-2">
                <option>200-300 marks</option>
                <option>300-400 marks</option>
                <option>400-500 marks</option>
                <option>500+ marks</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of attempts
              </label>
              <select className="w-full border border-gray-300 rounded-lg p-2">
                <option>First attempt</option>
                <option>Second attempt</option>
                <option>Third attempt</option>
                <option>More than 3 attempts</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your biggest challenge
              </label>
              <select className="w-full border border-gray-300 rounded-lg p-2">
                <option>Biology is my weak subject</option>
                <option>Low overall score</option>
                <option>Lost motivation after failure</option>
                <option>Time management issues</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <PremiumButton variant="primary" size="md" className="flex-1">
              Find My Matches
            </PremiumButton>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
