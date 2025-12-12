'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play,
  Pause,
  Heart,
  Star,
  Quote,
  MapPin,
  Calendar,
  TrendingUp,
  Award,
  Users,
  Phone,
  Mail,
  ExternalLink,
  Video,
  MessageSquare,
  ThumbsUp,
  CheckCircle,
  BookOpen,
} from 'lucide-react'
import { getPlaceholderAvatar } from '@/lib/images/imageUtils'

interface ParentTestimonial {
  id: string
  parentName: string
  parentPhoto?: string
  parentRole: string // Mother, Father, Guardian
  studentName: string
  studentPhoto: string

  // Student Achievement Info
  achievement: {
    neetRank: number
    previousRank?: number
    improvement?: number
    collegeName: string
    currentStatus: string
  }

  // Location & Timeline
  location: {
    city: string
    state: string
  }
  enrollmentYear: number
  courseDuration: string // "2 years", "18 months", etc.

  // Testimonial Content
  testimonial: {
    text: string
    videoUrl?: string
    videoThumbnail?: string
    audioDuration?: number // in seconds for audio testimonials
    highlights: string[] // Key points they mention
    rating: number // 1-5 stars
  }

  // Experience Details
  experience: {
    previousInstitutes?: string[]
    whyChoseCerebrum: string
    mostValuableAspect: string
    wouldRecommend: boolean
    recommendationReason: string
  }

  // Course Details
  courseInfo: {
    series: 'pinnacle' | 'ascent' | 'pursuit'
    planType: 'A' | 'B' | 'C'
    faculty?: string
    batchSize?: number
  }

  // Social Proof
  socialProof: {
    verified: boolean
    contactPermission: boolean
    linkedIn?: string
    socialMedia?: string
  }

  // Emotional Journey
  journey: {
    initialConcerns: string[]
    challengesFaced: string[]
    transformationSeen: string[]
    parentSatisfaction: number // 1-10 scale
  }
}

interface ParentTestimonialsSectionProps {
  showVideoTestimonials?: boolean
  filterBySeries?: 'pinnacle' | 'ascent' | 'pursuit' | 'all'
  showContactInfo?: boolean
  className?: string
}

// Mock parent testimonials data
const PARENT_TESTIMONIALS: ParentTestimonial[] = [
  {
    id: '1',
    parentName: 'Mrs. Sunita Sharma',
    parentPhoto: '/illustrations/parent-mother.svg',
    parentRole: 'Mother',
    studentName: 'Priya Sharma',
    studentPhoto: getPlaceholderAvatar('Priya Sharma', 80, '4F46E5', 'fff'),

    achievement: {
      neetRank: 42,
      previousRank: 2341,
      improvement: 2299,
      collegeName: 'AIIMS Delhi',
      currentStatus: '1st Year MBBS Student',
    },

    location: {
      city: 'Kota',
      state: 'Rajasthan',
    },
    enrollmentYear: 2022,
    courseDuration: '2 years',

    testimonial: {
      text: "When Priya was struggling with biology concepts in her first attempt, we were heartbroken. Cerebrum not only restored her confidence but transformed her into a NEET topper. The personal attention and systematic approach made all the difference. Today, seeing her at AIIMS, we can't thank Cerebrum enough.",
      videoUrl: 'https://youtube.com/watch?v=parent1',
      videoThumbnail: '/illustrations/video-thumbnail.svg',
      highlights: [
        'Personal attention from faculty',
        'Systematic teaching approach',
        'Confidence building',
        'Regular progress tracking',
      ],
      rating: 5,
    },

    experience: {
      previousInstitutes: ['Local coaching in Kota'],
      whyChoseCerebrum: 'Small batch sizes and personal mentoring approach',
      mostValuableAspect: 'Individual attention to weak areas and regular parent communication',
      wouldRecommend: true,
      recommendationReason:
        'Proven track record and caring faculty who treat students like their own children',
    },

    courseInfo: {
      series: 'pinnacle',
      planType: 'A',
      faculty: 'Dr. Rajesh Kumar Singh',
      batchSize: 12,
    },

    socialProof: {
      verified: true,
      contactPermission: true,
      linkedIn: 'https://linkedin.com/in/sunita-sharma',
    },

    journey: {
      initialConcerns: [
        "Priya's confidence was low after first attempt",
        'Worried about choosing the right coaching again',
        'Financial investment concern',
      ],
      challengesFaced: [
        'Initial adjustment to new teaching methodology',
        'Overcoming fear of biology topics',
      ],
      transformationSeen: [
        'Remarkable improvement in confidence',
        'Systematic problem-solving approach',
        'Consistent performance in mock tests',
        'Better time management skills',
      ],
      parentSatisfaction: 10,
    },
  },

  {
    id: '2',
    parentName: 'Mr. Rajesh Patel',
    parentPhoto: '/illustrations/parent-father.svg',
    parentRole: 'Father',
    studentName: 'Arjun Patel',
    studentPhoto: getPlaceholderAvatar('Arjun Patel', 80, '059669', 'fff'),

    achievement: {
      neetRank: 156,
      collegeName: 'JIPMER Puducherry',
      currentStatus: 'MBBS Student',
    },

    location: {
      city: 'Ahmedabad',
      state: 'Gujarat',
    },
    enrollmentYear: 2022,
    courseDuration: '20 months',

    testimonial: {
      text: "As a working parent, I was skeptical about online coaching. But Cerebrum's hybrid approach and regular parent meetings kept me informed about Arjun's progress. The faculty's dedication and the structured curriculum helped Arjun achieve what we thought was impossible. JIPMER admission is a dream come true!",
      highlights: [
        'Excellent parent communication',
        'Hybrid teaching approach',
        'Structured curriculum',
        'Faculty dedication',
      ],
      rating: 5,
    },

    experience: {
      whyChoseCerebrum: 'Flexibility of hybrid classes and strong faculty credentials',
      mostValuableAspect: 'Regular parent-teacher meetings and transparent progress tracking',
      wouldRecommend: true,
      recommendationReason: 'Perfect balance of technology and personal touch',
    },

    courseInfo: {
      series: 'ascent',
      planType: 'B',
      batchSize: 25,
    },

    socialProof: {
      verified: true,
      contactPermission: true,
    },

    journey: {
      initialConcerns: [
        'Effectiveness of online classes',
        'Lack of peer interaction',
        'Parent involvement in progress tracking',
      ],
      challengesFaced: [
        'Initial technical issues with online platform',
        'Balancing online and offline components',
      ],
      transformationSeen: [
        'Improved digital learning skills',
        'Better self-discipline',
        'Consistent improvement in mock tests',
        'Strong foundation in biology concepts',
      ],
      parentSatisfaction: 9,
    },
  },

  {
    id: '3',
    parentName: 'Mrs. Lakshmi Reddy',
    parentPhoto: '/illustrations/parent-mother.svg',
    parentRole: 'Mother',
    studentName: 'Sneha Reddy',
    studentPhoto: getPlaceholderAvatar('Sneha Reddy', 80, '7C3AED', 'fff'),

    achievement: {
      neetRank: 289,
      previousRank: 8934,
      improvement: 8645,
      collegeName: 'King George Medical University',
      currentStatus: 'MBBS Student at KGMU',
    },

    location: {
      city: 'Hyderabad',
      state: 'Telangana',
    },
    enrollmentYear: 2022,
    courseDuration: '18 months',

    testimonial: {
      text: "Sneha was a dropper student and we were all stressed about her second attempt. Cerebrum's counseling support not only helped Sneha but also guided us parents on how to support her emotionally. The transformation in her confidence and performance was remarkable. From rank 8934 to 289 - it still feels like a miracle!",
      videoUrl: 'https://youtube.com/watch?v=parent2',
      highlights: [
        'Excellent counseling support',
        'Emotional guidance for parents',
        'Remarkable rank improvement',
        'Confidence transformation',
      ],
      rating: 5,
    },

    experience: {
      previousInstitutes: ['Regional coaching institute'],
      whyChoseCerebrum: 'Specialized support for dropper students and counseling services',
      mostValuableAspect: 'Psychological support and motivation along with academic excellence',
      wouldRecommend: true,
      recommendationReason:
        'Understands the unique challenges of dropper students and provides holistic support',
    },

    courseInfo: {
      series: 'ascent',
      planType: 'A',
      batchSize: 20,
    },

    socialProof: {
      verified: true,
      contactPermission: true,
    },

    journey: {
      initialConcerns: [
        "Sneha's mental state after first attempt failure",
        'Social stigma of being a dropper',
        'Choosing the right approach for second attempt',
      ],
      challengesFaced: [
        'Overcoming failure trauma',
        'Building confidence for second attempt',
        'Managing family stress',
      ],
      transformationSeen: [
        'Complete mindset transformation',
        'Systematic study approach',
        'Better stress management',
        'Exceptional improvement in performance',
      ],
      parentSatisfaction: 10,
    },
  },

  {
    id: '4',
    parentName: 'Mrs. Geeta Kumar',
    parentPhoto: '/illustrations/parent-mother.svg',
    parentRole: 'Mother',
    studentName: 'Rahul Kumar',
    studentPhoto: getPlaceholderAvatar('Rahul Kumar', 80, 'DC2626', 'fff'),

    achievement: {
      neetRank: 523,
      collegeName: 'Maulana Azad Medical College',
      currentStatus: 'MBBS Student at MAMC Delhi',
    },

    location: {
      city: 'Patna',
      state: 'Bihar',
    },
    enrollmentYear: 2022,
    courseDuration: '22 months',

    testimonial: {
      text: "Coming from a small town, we were worried about Rahul getting quality education. Cerebrum's online platform brought world-class teaching to our home. The faculty's patience with our questions and the doubt-clearing sessions were exceptional. Rahul securing MAMC admission has made our entire family proud.",
      highlights: [
        'World-class online education',
        'Faculty patience with small-town students',
        'Excellent doubt-clearing support',
        'Accessible quality education',
      ],
      rating: 5,
    },

    experience: {
      whyChoseCerebrum: 'Quality online education accessible from small towns',
      mostValuableAspect: "Faculty's understanding of small-town students' challenges",
      wouldRecommend: true,
      recommendationReason: 'Bridges the gap between small towns and quality education',
    },

    courseInfo: {
      series: 'pursuit',
      planType: 'B',
      batchSize: 30,
    },

    socialProof: {
      verified: true,
      contactPermission: false,
    },

    journey: {
      initialConcerns: [
        'Quality of education in small town',
        'Internet connectivity issues',
        'Lack of competitive environment',
      ],
      challengesFaced: [
        'Technical setup for online classes',
        'Creating disciplined study environment at home',
      ],
      transformationSeen: [
        'Self-disciplined study habits',
        'Improved communication skills',
        'Better understanding of concepts',
        'Competitive performance in mock tests',
      ],
      parentSatisfaction: 9,
    },
  },
]

function VideoTestimonialCard({
  testimonial,
  onPlay,
}: {
  testimonial: ParentTestimonial
  onPlay: () => void
}) {
  return (
    <div className="relative group">
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={testimonial.testimonial.videoThumbnail || '/illustrations/video-thumbnail.svg'}
          alt={`Video testimonial by ${testimonial.parentName}`}
          className="w-full h-48 object-cover"
        />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onPlay}
            className="bg-white/90 hover:bg-white text-gray-900 p-4 rounded-full transition-colors shadow-lg"
          >
            <Play className="w-8 h-8 fill-current" />
          </button>
        </div>

        {/* Duration Badge */}
        {testimonial.testimonial.audioDuration && (
          <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
            {Math.floor(testimonial.testimonial.audioDuration / 60)}:
            {testimonial.testimonial.audioDuration % 60}
          </div>
        )}
      </div>

      {/* Quick Info */}
      <div className="mt-3">
        <div className="flex items-center space-x-2">
          <img
            src={testimonial.parentPhoto || '/illustrations/parent-mother.svg'}
            alt={testimonial.parentName}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <div className="font-medium text-gray-900 text-sm">{testimonial.parentName}</div>
            <div className="text-xs text-gray-600">
              {testimonial.parentRole} of {testimonial.studentName}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: ParentTestimonial }) {
  const [showFullText, setShowFullText] = useState(false)
  const [showContactInfo, setShowContactInfo] = useState(false)

  const getSeriesTheme = (series: string) => {
    const themes = {
      pinnacle: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-900',
        badge: 'bg-purple-600',
      },
      ascent: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-900',
        badge: 'bg-blue-600',
      },
      pursuit: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-900',
        badge: 'bg-green-600',
      },
    }
    return themes[series as keyof typeof themes] || themes.ascent
  }

  const theme = getSeriesTheme(testimonial.courseInfo.series)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
    >
      {/* Header */}
      <div className={`${theme.bg} ${theme.border} border-b-2 p-6`}>
        {/* Verification Badge */}
        {testimonial.socialProof.verified && (
          <div className="flex justify-end mb-4">
            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
              <CheckCircle className="w-3 h-3 mr-1 fill-current" />
              Verified Parent
            </div>
          </div>
        )}

        {/* Parent & Student Info */}
        <div className="flex items-start space-x-4">
          <img
            src={testimonial.parentPhoto || '/illustrations/parent-mother.svg'}
            alt={testimonial.parentName}
            className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
          />

          <div className="flex-grow">
            <h3 className={`text-xl font-bold ${theme.text}`}>{testimonial.parentName}</h3>
            <p className="text-gray-600">{testimonial.parentRole}</p>

            <div className="flex items-center mt-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-1" />
              {testimonial.location.city}, {testimonial.location.state}
            </div>

            <div className="flex items-center mt-1 text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-1" />
              Enrolled in {testimonial.enrollmentYear}
            </div>
          </div>

          {/* Student Achievement */}
          <div className="text-right">
            <div className="w-12 h-12 rounded-full border-4 border-white shadow-lg overflow-hidden mb-2">
              <img
                src={testimonial.studentPhoto}
                alt={testimonial.studentName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              #{testimonial.achievement.neetRank}
            </div>
            <div className="text-xs text-gray-600">{testimonial.studentName}</div>
          </div>
        </div>

        {/* Achievement Highlight */}
        <div className="mt-4 bg-white/80 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              <strong>{testimonial.studentName}</strong> secured admission to
            </div>
            {testimonial.achievement.improvement && (
              <div className="flex items-center text-green-600 font-bold text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />+{testimonial.achievement.improvement} ranks
              </div>
            )}
          </div>
          <div className="font-semibold text-gray-900 mt-1">
            {testimonial.achievement.collegeName}
          </div>
        </div>
      </div>

      {/* Testimonial Content */}
      <div className="p-6">
        {/* Star Rating */}
        <div className="flex items-center mb-4">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < testimonial.testimonial.rating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {testimonial.testimonial.rating}/5 stars
          </span>
        </div>

        {/* Testimonial Text */}
        <div className="relative mb-6">
          <Quote className="absolute -top-2 -left-2 w-8 h-8 text-gray-200" />
          <p className={`text-gray-700 italic pl-6 ${showFullText ? '' : 'line-clamp-4'}`}>
            "{testimonial.testimonial.text}"
          </p>
          {testimonial.testimonial.text.length > 200 && (
            <button
              onClick={() => setShowFullText(!showFullText)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2"
            >
              {showFullText ? 'Show less' : 'Read full testimonial'}
            </button>
          )}
        </div>

        {/* Key Highlights */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">What They Valued Most:</h4>
          <div className="flex flex-wrap gap-2">
            {testimonial.testimonial.highlights.map((highlight, index) => (
              <span
                key={index}
                className={`${theme.badge} text-white px-3 py-1 rounded-full text-xs font-medium`}
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>

        {/* Course Info */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div>
            <span className="text-gray-600">Course Taken:</span>
            <div className="font-semibold text-gray-900 capitalize">
              {testimonial.courseInfo.series} Plan {testimonial.courseInfo.planType}
            </div>
          </div>
          <div>
            <span className="text-gray-600">Duration:</span>
            <div className="font-semibold text-gray-900">{testimonial.courseDuration}</div>
          </div>
          {testimonial.courseInfo.batchSize && (
            <div>
              <span className="text-gray-600">Batch Size:</span>
              <div className="font-semibold text-gray-900">
                {testimonial.courseInfo.batchSize} students
              </div>
            </div>
          )}
          {testimonial.courseInfo.faculty && (
            <div>
              <span className="text-gray-600">Faculty:</span>
              <div className="font-semibold text-gray-900">{testimonial.courseInfo.faculty}</div>
            </div>
          )}
        </div>

        {/* Parent Satisfaction */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Overall Satisfaction:</span>
            <div className="flex items-center">
              <div className="text-2xl font-bold text-green-600">
                {testimonial.journey.parentSatisfaction}/10
              </div>
              <Heart className="w-5 h-5 text-red-500 ml-2 fill-current" />
            </div>
          </div>
        </div>

        {/* Video Testimonial Button */}
        {testimonial.testimonial.videoUrl && (
          <div className="mb-6">
            <button className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center">
              <Video className="w-5 h-5 mr-2" />
              Watch Video Testimonial
            </button>
          </div>
        )}

        {/* Contact Permission */}
        {testimonial.socialProof.contactPermission && (
          <div className="border-t border-gray-200 pt-4">
            <button
              onClick={() => setShowContactInfo(!showContactInfo)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
            >
              <MessageSquare className="w-4 h-4 mr-1" />
              {showContactInfo ? 'Hide contact info' : 'Connect with this parent'}
            </button>

            <AnimatePresence>
              {showContactInfo && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 bg-blue-50 rounded-lg p-3"
                >
                  <p className="text-xs text-blue-800 mb-2">
                    {testimonial.parentName} has agreed to share their experience with prospective
                    parents.
                  </p>
                  <div className="flex space-x-2">
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-blue-700 transition-colors">
                      <Phone className="w-3 h-3 inline mr-1" />
                      Request Call
                    </button>
                    <button className="bg-green-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-green-700 transition-colors">
                      <Mail className="w-3 h-3 inline mr-1" />
                      Send Message
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function ParentTestimonialsSection({
  showVideoTestimonials = true,
  filterBySeries = 'all',
  showContactInfo = true,
  className = '',
}: ParentTestimonialsSectionProps) {
  const [selectedTestimonial, setSelectedTestimonial] = useState<ParentTestimonial | null>(null)
  const [showVideoModal, setShowVideoModal] = useState(false)

  const filteredTestimonials =
    filterBySeries === 'all'
      ? PARENT_TESTIMONIALS
      : PARENT_TESTIMONIALS.filter((t) => t.courseInfo.series === filterBySeries)

  const videoTestimonials = filteredTestimonials.filter((t) => t.testimonial.videoUrl)

  // Calculate stats
  const stats = {
    totalParents: filteredTestimonials.length,
    averageRating: (
      filteredTestimonials.reduce((sum, t) => sum + t.testimonial.rating, 0) /
      filteredTestimonials.length
    ).toFixed(1),
    averageSatisfaction: (
      filteredTestimonials.reduce((sum, t) => sum + t.journey.parentSatisfaction, 0) /
      filteredTestimonials.length
    ).toFixed(1),
    recommendationRate: Math.round(
      (filteredTestimonials.filter((t) => t.experience.wouldRecommend).length /
        filteredTestimonials.length) *
        100
    ),
  }

  return (
    <div
      className={`bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">💕 Parent Testimonials</h2>
          <p className="text-purple-100 text-lg">
            Hear from parents whose children achieved their NEET dreams with Cerebrum
          </p>
        </div>

        {/* Parent Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl font-bold">{stats.totalParents}+</div>
            <div className="text-sm text-purple-100">Happy Parents</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl font-bold">{stats.averageRating}★</div>
            <div className="text-sm text-purple-100">Average Rating</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl font-bold">{stats.recommendationRate}%</div>
            <div className="text-sm text-purple-100">Would Recommend</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl font-bold">{stats.averageSatisfaction}/10</div>
            <div className="text-sm text-purple-100">Satisfaction Score</div>
          </div>
        </div>
      </div>

      {/* Video Testimonials Section */}
      {showVideoTestimonials && videoTestimonials.length > 0 && (
        <div className="p-8 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">🎥 Video Testimonials</h3>
            <span className="text-sm text-gray-600">
              {videoTestimonials.length} video testimonials available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoTestimonials.slice(0, 3).map((testimonial) => (
              <VideoTestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                onPlay={() => {
                  setSelectedTestimonial(testimonial)
                  setShowVideoModal(true)
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Main Testimonials */}
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-gray-900">Parent Experiences</h3>
          {filterBySeries !== 'all' && (
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
              {filterBySeries} Series Parents
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 text-center">
        <h3 className="text-2xl font-bold mb-2">Join Our Parent Community</h3>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Experience the same satisfaction and success that these parents have seen with their
          children.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
            📞 Talk to Our Parent Counselor
          </button>
          <button className="bg-blue-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-400 transition-colors">
            💬 Join Parent WhatsApp Group
          </button>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && selectedTestimonial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Video Testimonial</h3>
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <Video className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Video would play here</p>
                  <p className="text-sm text-gray-500">
                    {selectedTestimonial.testimonial.videoUrl}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedTestimonial.parentPhoto || '/illustrations/parent-mother.svg'}
                    alt={selectedTestimonial.parentName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-semibold">{selectedTestimonial.parentName}</div>
                    <div className="text-sm text-gray-600">
                      {selectedTestimonial.parentRole} of {selectedTestimonial.studentName} (NEET
                      Rank {selectedTestimonial.achievement.neetRank})
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
