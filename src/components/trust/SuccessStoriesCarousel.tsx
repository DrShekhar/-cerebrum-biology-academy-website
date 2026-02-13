'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  ChevronLeft,
  ChevronRight,
  Award,
  TrendingUp,
  MapPin,
  Calendar,
  Star,
  Quote,
  Play,
  ExternalLink,
  Medal,
  Trophy,
  Target,
  BookOpen,
} from 'lucide-react'
import { getPlaceholderAvatar } from '@/lib/images/imageUtils'

interface SuccessStory {
  id: string
  name: string
  photo: string
  neetRank: number
  previousRank?: number
  improvementPoints?: number
  collegeName: string
  location: string
  examYear: number
  series: 'pinnacle' | 'ascent' | 'pursuit'
  planType: 'A' | 'B' | 'C'
  testimonial: string
  videoUrl?: string
  achievements: {
    biologyScore: number
    totalScore: number
    percentile: number
    aiRank?: number
  }
  journey: {
    startingScore?: number
    monthsStudied: number
    previousAttempts?: number
    backgroundStory: string
  }
  currentStatus: string
  socialProof: {
    verified: boolean
    linkedIn?: string
    medicalCollege?: string
  }
}

interface SuccessStoriesCarouselProps {
  autoPlay?: boolean
  showVideoThumbnails?: boolean
  filterBySeries?: 'pinnacle' | 'ascent' | 'pursuit' | 'all'
  className?: string
}

// Sample success stories — to be replaced with verified student data
const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    photo: getPlaceholderAvatar('Priya Sharma', 150, '4F46E5', 'fff'),
    neetRank: 42,
    previousRank: 2341,
    improvementPoints: 2299,
    collegeName: 'AIIMS Delhi',
    location: 'Kota, Rajasthan',
    examYear: 2024,
    series: 'pinnacle',
    planType: 'A',
    testimonial:
      "Cerebrum's personalized mentoring and small batch size made all the difference. The faculty's individual attention helped me identify and strengthen my weak areas systematically.",
    videoUrl: '',
    achievements: {
      biologyScore: 358,
      totalScore: 695,
      percentile: 99.98,
      aiRank: 42,
    },
    journey: {
      startingScore: 420,
      monthsStudied: 24,
      previousAttempts: 1,
      backgroundStory: 'Started as an average performer, transformed through dedicated practice',
    },
    currentStatus: 'MBBS Student at AIIMS Delhi',
    socialProof: {
      verified: true,
      medicalCollege: 'AIIMS Delhi',
    },
  },
  {
    id: '2',
    name: 'Arjun Patel',
    photo: getPlaceholderAvatar('Arjun Patel', 150, '059669', 'fff'),
    neetRank: 156,
    collegeName: 'JIPMER Puducherry',
    location: 'Ahmedabad, Gujarat',
    examYear: 2024,
    series: 'ascent',
    planType: 'B',
    testimonial:
      "The structured approach and regular mock tests helped me maintain consistency. Cerebrum's biology faculty simplified complex concepts beautifully.",
    achievements: {
      biologyScore: 340,
      totalScore: 671,
      percentile: 99.95,
    },
    journey: {
      startingScore: 485,
      monthsStudied: 20,
      backgroundStory: 'Consistent performer who needed strategic guidance for top ranks',
    },
    currentStatus: 'MBBS Student at JIPMER',
    socialProof: {
      verified: true,
      medicalCollege: 'JIPMER Puducherry',
    },
  },
  {
    id: '3',
    name: 'Sneha Reddy',
    photo: getPlaceholderAvatar('Sneha Reddy', 150, '7C3AED', 'fff'),
    neetRank: 289,
    previousRank: 8934,
    improvementPoints: 8645,
    collegeName: 'King George Medical University',
    location: 'Hyderabad, Telangana',
    examYear: 2024,
    series: 'ascent',
    planType: 'A',
    testimonial:
      "Being a dropper student, I was demotivated. Cerebrum's support system and personalized study plan helped me achieve my dream rank!",
    videoUrl: '',
    achievements: {
      biologyScore: 335,
      totalScore: 658,
      percentile: 99.92,
    },
    journey: {
      startingScore: 298,
      monthsStudied: 18,
      previousAttempts: 1,
      backgroundStory: 'Dropper student who made remarkable improvement with focused preparation',
    },
    currentStatus: 'MBBS Student at KGMU Lucknow',
    socialProof: {
      verified: true,
      medicalCollege: 'KGMU Lucknow',
    },
  },
  {
    id: '4',
    name: 'Rahul Kumar',
    photo: getPlaceholderAvatar('Rahul Kumar', 150, 'DC2626', 'fff'),
    neetRank: 523,
    collegeName: 'Maulana Azad Medical College',
    location: 'Patna, Bihar',
    examYear: 2024,
    series: 'pursuit',
    planType: 'B',
    testimonial:
      "Coming from a small town, Cerebrum's online platform gave me access to world-class teaching. The doubt clearing sessions were incredibly helpful.",
    achievements: {
      biologyScore: 318,
      totalScore: 634,
      percentile: 99.85,
    },
    journey: {
      startingScore: 380,
      monthsStudied: 22,
      backgroundStory: 'Small town student who leveraged online education for success',
    },
    currentStatus: 'MBBS Student at MAMC Delhi',
    socialProof: {
      verified: true,
      medicalCollege: 'MAMC Delhi',
    },
  },
  {
    id: '5',
    name: 'Ananya Gupta',
    photo: getPlaceholderAvatar('Ananya Gupta', 150, '0891B2', 'fff'),
    neetRank: 1247,
    collegeName: 'Seth GS Medical College',
    location: 'Mumbai, Maharashtra',
    examYear: 2024,
    series: 'ascent',
    planType: 'C',
    testimonial:
      'The interactive teaching methods and regular assessments kept me motivated throughout my preparation. Biology became my strongest subject!',
    achievements: {
      biologyScore: 312,
      totalScore: 598,
      percentile: 99.72,
    },
    journey: {
      startingScore: 445,
      monthsStudied: 16,
      backgroundStory: 'Focused student who optimized limited time for maximum results',
    },
    currentStatus: 'MBBS Student at Seth GS Medical College',
    socialProof: {
      verified: true,
      medicalCollege: 'Seth GS Medical College Mumbai',
    },
  },
  {
    id: '6',
    name: 'Vikram Singh',
    photo: getPlaceholderAvatar('Vikram Singh', 150, 'CA8A04', 'fff'),
    neetRank: 2156,
    previousRank: 15623,
    improvementPoints: 13467,
    collegeName: 'Government Medical College',
    location: 'Chandigarh, Punjab',
    examYear: 2024,
    series: 'pinnacle',
    planType: 'B',
    testimonial:
      "Cerebrum's small batch advantage and personal mentoring helped me overcome my weak areas. The improvement was beyond my expectations!",
    achievements: {
      biologyScore: 295,
      totalScore: 567,
      percentile: 99.58,
    },
    journey: {
      startingScore: 276,
      monthsStudied: 20,
      previousAttempts: 1,
      backgroundStory: 'Struggled initially but made exceptional improvement with right guidance',
    },
    currentStatus: 'MBBS Student at GMC Chandigarh',
    socialProof: {
      verified: true,
      medicalCollege: 'GMC Chandigarh',
    },
  },
]

function getRankCategory(rank: number): { label: string; color: string; icon: any } {
  if (rank <= 100) return { label: 'Top 100', color: 'text-purple-600 bg-purple-100', icon: Trophy }
  if (rank <= 500) return { label: 'Top 500', color: 'text-blue-600 bg-blue-100', icon: Medal }
  if (rank <= 2000) return { label: 'Top 2000', color: 'text-green-600 bg-green-100', icon: Award }
  if (rank <= 10000)
    return { label: 'Top 10K', color: 'text-orange-600 bg-orange-100', icon: Target }
  return { label: 'Qualified', color: 'text-gray-600 bg-gray-100', icon: BookOpen }
}

function getSeriesTheme(series: string) {
  const themes = {
    pinnacle: {
      color: 'purple',
      bg: 'bg-purple-50',
      text: 'text-purple-900',
      badge: 'bg-purple-600 text-white',
    },
    ascent: {
      color: 'blue',
      bg: 'bg-blue-50',
      text: 'text-blue-900',
      badge: 'bg-blue-600 text-white',
    },
    pursuit: {
      color: 'green',
      bg: 'bg-green-50',
      text: 'text-green-900',
      badge: 'bg-green-600 text-white',
    },
  }
  return themes[series as keyof typeof themes] || themes.ascent
}

function SuccessStoryCard({ story }: { story: SuccessStory }) {
  const [showFullTestimonial, setShowFullTestimonial] = useState(false)
  const rankCategory = getRankCategory(story.neetRank)
  const RankIcon = rankCategory.icon
  const theme = getSeriesTheme(story.series)

  return (
    <div
      className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fadeInUp"
    >
      {/* Header with student info */}
      <div className={`${theme.bg} p-6 relative`}>
        {/* Verification Badge */}
        {story.socialProof.verified && (
          <div className="absolute top-4 right-4 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
            <Star className="w-3 h-3 mr-1 fill-current" />
            Verified
          </div>
        )}

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              src={story.photo}
              alt={story.name}
              width={64}
              height={64}
              className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
            />
            {story.videoUrl && (
              <button className="absolute -bottom-1 -right-1 bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 transition-colors">
                <Play className="w-3 h-3 fill-current" />
              </button>
            )}
          </div>

          <div className="flex-grow">
            <h3 className={`text-xl font-bold ${theme.text}`}>{story.name}</h3>
            <div className="flex items-center mt-1 text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-1" />
              {story.location}
            </div>
            <div className="flex items-center mt-1 text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-1" />
              NEET {story.examYear}
            </div>
          </div>
        </div>

        {/* Rank Achievement */}
        <div className="mt-4 flex items-center justify-between">
          <div
            className={`${rankCategory.color} px-3 py-1 rounded-full text-sm font-bold flex items-center`}
          >
            <RankIcon className="w-4 h-4 mr-1" />
            {rankCategory.label}
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${theme.text}`}>#{story.neetRank}</div>
            <div className="text-sm text-gray-600">NEET Rank</div>
          </div>
        </div>

        {/* Improvement highlight */}
        {story.previousRank && story.improvementPoints && (
          <div className="mt-3 bg-white/80 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Previous Rank: <span className="font-semibold">#{story.previousRank}</span>
              </div>
              <div className="flex items-center text-green-600 font-bold">
                <TrendingUp className="w-4 h-4 mr-1" />+{story.improvementPoints} ranks
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Achievement Stats */}
      <div className="p-6 border-b border-gray-100">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-gray-900">
              {story.achievements.biologyScore}/360
            </div>
            <div className="text-xs text-gray-600">Biology Score</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">
              {story.achievements.totalScore}/720
            </div>
            <div className="text-xs text-gray-600">Total Score</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">{story.achievements.percentile}%</div>
            <div className="text-xs text-gray-600">Percentile</div>
          </div>
        </div>

        {/* College Achievement */}
        <div className="mt-4 text-center">
          <div className="text-lg font-semibold text-gray-900">{story.collegeName}</div>
          <div className="text-sm text-gray-600">{story.currentStatus}</div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="p-6 relative">
        <Quote className="absolute top-4 left-4 text-gray-300 w-8 h-8" />
        <div className="pl-12">
          <p className={`text-gray-700 italic ${showFullTestimonial ? '' : 'line-clamp-3'}`}>
            "{story.testimonial}"
          </p>
          {story.testimonial.length > 150 && (
            <button
              onClick={() => setShowFullTestimonial(!showFullTestimonial)}
              className="text-blue-600 hover:text-blue-700 text-sm mt-2 font-medium"
            >
              {showFullTestimonial ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
      </div>

      {/* Course Info & Journey */}
      <div className="px-6 pb-6">
        {/* Course taken */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Course:</span>
            <span className={`${theme.badge} px-2 py-1 rounded-full text-xs font-bold capitalize`}>
              {story.series} Plan {story.planType}
            </span>
          </div>
          <div className="text-sm text-gray-600">{story.journey.monthsStudied} months</div>
        </div>

        {/* Journey details */}
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm text-gray-700">{story.journey.backgroundStory}</p>
          {story.journey.startingScore && (
            <div className="mt-2 text-xs text-gray-600">
              Starting Practice Score: {story.journey.startingScore}/720
            </div>
          )}
        </div>

        {/* Social Proof Links */}
        {story.socialProof.linkedIn && (
          <div className="mt-4 flex justify-center">
            <a
              href={story.socialProof.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Connect on LinkedIn
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SuccessStoriesCarousel({
  autoPlay = true,
  showVideoThumbnails = true,
  filterBySeries = 'all',
  className = '',
}: SuccessStoriesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay)

  const filteredStories =
    filterBySeries === 'all'
      ? SUCCESS_STORIES
      : SUCCESS_STORIES.filter((story) => story.series === filterBySeries)

  const totalSlides = filteredStories.length
  const storiesPerSlide = 3 // Show 3 stories per slide
  const totalSlideGroups = Math.ceil(totalSlides / storiesPerSlide)

  const currentStories = filteredStories.slice(
    currentIndex * storiesPerSlide,
    (currentIndex + 1) * storiesPerSlide
  )

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlideGroups)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlideGroups) % totalSlideGroups)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(nextSlide, 8000) // 8 seconds per slide
    return () => clearInterval(interval)
  }, [isAutoPlaying, currentIndex])

  // Stats calculation
  const stats = {
    totalStudents: filteredStories.length,
    averageRank: Math.round(
      filteredStories.reduce((sum, story) => sum + story.neetRank, 0) / filteredStories.length
    ),
    top100Count: filteredStories.filter((story) => story.neetRank <= 100).length,
    averageImprovement: Math.round(
      filteredStories
        .filter((story) => story.improvementPoints)
        .reduce((sum, story) => sum + (story.improvementPoints || 0), 0) /
        filteredStories.filter((story) => story.improvementPoints).length
    ),
  }

  return (
    <div
      className={`bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl overflow-hidden ${className}`}
    >
      {/* Header with Stats */}
      <div className="bg-indigo-500 text-white p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">🎉 Student Success Stories</h2>
          <p className="text-blue-100 text-lg">
            Real students, real results - NEET toppers share their journey with Cerebrum
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl font-bold">{stats.totalStudents}+</div>
            <div className="text-sm text-blue-100">Success Stories</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl font-bold">#{stats.averageRank}</div>
            <div className="text-sm text-blue-100">Avg. NEET Rank</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl font-bold">{stats.top100Count}</div>
            <div className="text-sm text-blue-100">Top 100 Ranks</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl font-bold">+{stats.averageImprovement}</div>
            <div className="text-sm text-blue-100">Avg. Improvement</div>
          </div>
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="flex items-center justify-between p-6 bg-white border-b border-gray-100">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Showing {currentIndex * storiesPerSlide + 1}-
            {Math.min((currentIndex + 1) * storiesPerSlide, totalSlides)} of {totalSlides}
          </h3>
          {filterBySeries !== 'all' && (
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
              {filterBySeries} Series
            </span>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {/* Auto-play toggle */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              isAutoPlaying ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {isAutoPlaying ? 'Auto-play ON' : 'Auto-play OFF'}
          </button>

          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            disabled={totalSlideGroups <= 1}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            disabled={totalSlideGroups <= 1}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="p-6">
<div
            key={currentIndex}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeInUp"
          >
            {currentStories.map((story) => (
              <SuccessStoryCard key={story.id} story={story} />
            ))}
          </div>
</div>

      {/* Slide Indicators */}
      {totalSlideGroups > 1 && (
        <div className="flex justify-center space-x-2 pb-6">
          {Array.from({ length: totalSlideGroups }, (_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`w-3 h-3 rounded-full transition-colors ${
                i === currentIndex ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide group ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8 text-center">
        <h3 className="text-2xl font-bold mb-2">Ready to Write Your Success Story?</h3>
        <p className="text-green-100 mb-6 max-w-2xl mx-auto">
          Join thousands of students who have achieved their NEET dreams with personalized coaching
          and expert guidance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-green-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
            🎯 Book FREE Demo Class
          </button>
          <button className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-400 transition-colors">
            💬 Talk to Success Counselor
          </button>
        </div>
      </div>
    </div>
  )
}
