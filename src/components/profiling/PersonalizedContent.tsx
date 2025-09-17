'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Star,
  TrendingUp,
  Clock,
  Target,
  BookOpen,
  Video,
  FileText,
  Users,
  Award,
  Zap,
  Heart,
  Brain,
} from 'lucide-react'
import { UserProfileService } from '@/lib/profiling/userProfileService'
import { useUserProfile } from './ProgressiveProfilingWidget'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

interface PersonalizedContentProps {
  className?: string
  section?: 'hero' | 'courses' | 'recommendations' | 'testimonials' | 'urgency'
}

export function PersonalizedContent({
  className = '',
  section = 'recommendations',
}: PersonalizedContentProps) {
  const { profile, recommendations, segment } = useUserProfile()
  const [personalizedData, setPersonalizedData] = useState<any>(null)

  useEffect(() => {
    if (profile && recommendations) {
      setPersonalizedData(generatePersonalizedContent(profile, recommendations, segment, section))
    }
  }, [profile, recommendations, segment, section])

  if (!personalizedData) {
    return null
  }

  return (
    <div className={`${className}`}>
      {section === 'hero' && <PersonalizedHero data={personalizedData} />}
      {section === 'courses' && <PersonalizedCourses data={personalizedData} />}
      {section === 'recommendations' && <PersonalizedRecommendations data={personalizedData} />}
      {section === 'testimonials' && <PersonalizedTestimonials data={personalizedData} />}
      {section === 'urgency' && <PersonalizedUrgency data={personalizedData} />}
    </div>
  )
}

function PersonalizedHero({ data }: { data: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-8"
    >
      <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
        <Heart className="w-4 h-4 mr-2" />
        Personalized for You
      </Badge>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{data.title}</h2>
      <p className="text-xl text-gray-600 mb-6">{data.subtitle}</p>
      {data.stats && (
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          {data.stats.map((stat: any, index: number) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

function PersonalizedCourses({ data }: { data: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.courses.map((course: any, index: number) => (
        <motion.div
          key={course.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card
            className={`h-full ${course.recommended ? 'border-2 border-primary/30 bg-primary/5' : ''}`}
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge
                  className={
                    course.recommended ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'
                  }
                >
                  {course.recommended ? 'Recommended for You' : course.category}
                </Badge>
                {course.urgency && (
                  <Badge className="bg-red-100 text-red-800 border-red-200">
                    <Clock className="w-3 h-3 mr-1" />
                    {course.urgency}
                  </Badge>
                )}
              </div>
              <CardTitle className="text-xl">{course.title}</CardTitle>
              <p className="text-gray-600">{course.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                {course.features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-center text-sm text-gray-600">
                    <Star className="w-4 h-4 mr-2 text-primary" />
                    {feature}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-primary">₹{course.price}</span>
                  {course.originalPrice && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ₹{course.originalPrice}
                    </span>
                  )}
                </div>
                <Button size="sm" className={course.recommended ? 'bg-primary' : ''}>
                  {course.ctaText}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

function PersonalizedRecommendations({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Recommended for You</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Next Actions */}
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-900">
              <TrendingUp className="w-5 h-5 mr-2" />
              Your Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.nextActions.map((action: string, index: number) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start border-blue-200 hover:bg-blue-100"
                  onClick={() =>
                    UserProfileService.trackCTAClick('personalized_next_action', action)
                  }
                >
                  <Zap className="w-4 h-4 mr-2" />
                  {action}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Recommendations */}
        <Card className="border-2 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center text-green-900">
              <BookOpen className="w-5 h-5 mr-2" />
              Recommended Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.content.map((item: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200"
                >
                  <div className="flex items-center">
                    <Brain className="w-4 h-4 mr-2 text-green-600" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                  <Button size="sm" variant="ghost" className="text-green-600 hover:text-green-700">
                    Explore
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function PersonalizedTestimonials({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">
        Success Stories from Students Like You
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.testimonials.map((testimonial: any, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.achievement}</p>
                  </div>
                </div>
                <Badge className="bg-gold-100 text-gold-800 border-gold-200 w-fit">
                  <Award className="w-3 h-3 mr-1" />
                  {testimonial.similarity}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-primary font-semibold">Score: {testimonial.score}</span>
                  <span className="text-gray-500">{testimonial.year}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function PersonalizedUrgency({ data }: { data: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`p-6 rounded-lg ${
        data.urgencyLevel === 'high'
          ? 'bg-red-50 border-2 border-red-200'
          : data.urgencyLevel === 'medium'
            ? 'bg-orange-50 border-2 border-orange-200'
            : 'bg-blue-50 border-2 border-blue-200'
      }`}
    >
      <div className="text-center">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            data.urgencyLevel === 'high'
              ? 'bg-red-100'
              : data.urgencyLevel === 'medium'
                ? 'bg-orange-100'
                : 'bg-blue-100'
          }`}
        >
          <Target
            className={`w-8 h-8 ${
              data.urgencyLevel === 'high'
                ? 'text-red-600'
                : data.urgencyLevel === 'medium'
                  ? 'text-orange-600'
                  : 'text-blue-600'
            }`}
          />
        </div>

        <h3
          className={`text-2xl font-bold mb-2 ${
            data.urgencyLevel === 'high'
              ? 'text-red-900'
              : data.urgencyLevel === 'medium'
                ? 'text-orange-900'
                : 'text-blue-900'
          }`}
        >
          {data.title}
        </h3>

        <p
          className={`text-lg mb-6 ${
            data.urgencyLevel === 'high'
              ? 'text-red-700'
              : data.urgencyLevel === 'medium'
                ? 'text-orange-700'
                : 'text-blue-700'
          }`}
        >
          {data.message}
        </p>

        {data.timeRemaining && (
          <div className="mb-6">
            <Badge
              className={`text-sm px-4 py-2 ${
                data.urgencyLevel === 'high'
                  ? 'bg-red-600 text-white'
                  : data.urgencyLevel === 'medium'
                    ? 'bg-orange-600 text-white'
                    : 'bg-blue-600 text-white'
              }`}
            >
              <Clock className="w-4 h-4 mr-2" />
              {data.timeRemaining}
            </Badge>
          </div>
        )}

        <Button
          size="lg"
          className={`${
            data.urgencyLevel === 'high'
              ? 'bg-red-600 hover:bg-red-700'
              : data.urgencyLevel === 'medium'
                ? 'bg-orange-600 hover:bg-orange-700'
                : 'bg-blue-600 hover:bg-blue-700'
          } text-white px-8 py-3`}
          onClick={() =>
            UserProfileService.trackCTAClick('personalized_urgency_cta', data.urgencyLevel)
          }
        >
          {data.ctaText}
        </Button>
      </div>
    </motion.div>
  )
}

// Generate personalized content based on user profile
function generatePersonalizedContent(
  profile: any,
  recommendations: any,
  segment: string,
  section: string
) {
  const { preferences, behavior, engagement, visitCount } = profile

  switch (section) {
    case 'hero':
      return generatePersonalizedHero(preferences, segment, visitCount)

    case 'courses':
      return generatePersonalizedCourses(preferences, recommendations, segment)

    case 'recommendations':
      return {
        nextActions: recommendations.nextActions,
        content: recommendations.content,
      }

    case 'testimonials':
      return generatePersonalizedTestimonials(preferences, segment)

    case 'urgency':
      return generatePersonalizedUrgency(preferences, recommendations, segment)

    default:
      return null
  }
}

function generatePersonalizedHero(preferences: any, segment: string, visitCount: number) {
  const isReturningUser = visitCount > 1

  if (preferences.class === '12') {
    return {
      title: isReturningUser
        ? "Welcome Back! Let's Ace NEET 2025"
        : 'Class 12? Time to Master NEET Biology',
      subtitle:
        'Join thousands of Class 12 students achieving 650+ NEET scores with our intensive program',
      stats: [
        { value: '92%', label: 'Class 12 Success Rate' },
        { value: '348', label: 'Avg Biology Score' },
        { value: '45 days', label: 'Time to NEET' },
      ],
    }
  }

  if (preferences.class === 'dropper') {
    return {
      title: isReturningUser
        ? 'Your Comeback Year Starts Here'
        : 'Droppers: Turn This Year Into Your Success Story',
      subtitle: 'Specialized program for gap year students - 89% achieve their target scores',
      stats: [
        { value: '89%', label: 'Dropper Success Rate' },
        { value: '156', label: 'Score Improvement' },
        { value: '10 months', label: 'Focused Preparation' },
      ],
    }
  }

  if (preferences.class === '11') {
    return {
      title: isReturningUser
        ? 'Building Your NEET Foundation'
        : 'Class 11: Perfect Time to Start NEET Prep',
      subtitle:
        'Start strong with our 2-year foundation program - early starters score 50+ points higher',
      stats: [
        { value: '96%', label: 'Foundation Success Rate' },
        { value: '50+', label: 'Extra Points vs Late Starters' },
        { value: '2 years', label: 'Comprehensive Prep' },
      ],
    }
  }

  return {
    title: isReturningUser
      ? 'Welcome Back to Your NEET Journey'
      : "Master NEET Biology with India's #1 Faculty",
    subtitle: 'Join 10,000+ students who chose us for guaranteed NEET success',
    stats: [
      { value: '94.2%', label: 'Overall Success Rate' },
      { value: '330+', label: 'Avg Biology Score' },
      { value: '10,000+', label: 'Students Enrolled' },
    ],
  }
}

function generatePersonalizedCourses(preferences: any, recommendations: any, segment: string) {
  const courses = []

  if (preferences.class === '12') {
    courses.push({
      id: 'intensive-12',
      title: 'Intensive NEET Biology - Class 12',
      description: 'High-intensity program designed for Class 12 students with limited time',
      category: 'Class 12',
      recommended: true,
      urgency: 'Limited Time',
      features: [
        'Daily live classes',
        'Crash course modules',
        'Last-minute revision',
        'Mock tests every week',
      ],
      price: '49999',
      originalPrice: '79999',
      ctaText: 'Join Intensive Program',
    })
  }

  if (preferences.class === 'dropper') {
    courses.push({
      id: 'dropper-year',
      title: '1-Year Dropper Program',
      description: 'Complete NEET preparation designed specifically for gap year students',
      category: 'Dropper',
      recommended: true,
      urgency: 'New Batch Starting',
      features: [
        'Full syllabus coverage',
        'Motivational support',
        'Parent counseling',
        'Guaranteed improvement',
      ],
      price: '69999',
      originalPrice: '99999',
      ctaText: 'Start Comeback Journey',
    })
  }

  if (preferences.class === '11') {
    courses.push({
      id: 'foundation-11',
      title: '2-Year Foundation Program',
      description: 'Comprehensive NEET preparation starting from Class 11',
      category: 'Foundation',
      recommended: true,
      features: [
        'Gradual concept building',
        'Board + NEET sync',
        'Long-term planning',
        'Early advantage',
      ],
      price: '59999',
      originalPrice: '89999',
      ctaText: 'Start Foundation',
    })
  }

  // Add more general courses
  courses.push({
    id: 'online-premium',
    title: 'Premium Online Program',
    description: 'Complete online NEET Biology preparation with live classes',
    category: 'Online',
    recommended: false,
    features: [
      'Live interactive classes',
      'Recorded lectures',
      'Digital study materials',
      '24/7 doubt resolution',
    ],
    price: '39999',
    originalPrice: '59999',
    ctaText: 'Go Premium',
  })

  return { courses }
}

function generatePersonalizedTestimonials(preferences: any, segment: string) {
  const testimonials = []

  if (preferences.class === '12') {
    testimonials.push({
      name: 'Priya Sharma',
      achievement: 'AIIMS Delhi - 2024',
      score: '687',
      year: '2024',
      quote:
        'Started in Class 12 with just 6 months left. The intensive program helped me jump from 450 to 687!',
      similarity: 'Same Class as You',
    })
  }

  if (preferences.class === 'dropper') {
    testimonials.push({
      name: 'Arjun Patel',
      achievement: 'JIPMER - 2024',
      score: '659',
      year: '2024',
      quote:
        'After failing NEET in first attempt, this dropper program turned my failure into success.',
      similarity: 'Dropper Like You',
    })
  }

  if (preferences.class === '11') {
    testimonials.push({
      name: 'Ananya Singh',
      achievement: 'AIIMS Bhopal - 2024',
      score: '672',
      year: '2024',
      quote:
        'Starting in Class 11 gave me the perfect foundation. Two years of systematic preparation worked wonders!',
      similarity: 'Started in Class 11',
    })
  }

  // Add more general testimonials
  testimonials.push(
    {
      name: 'Rahul Kumar',
      achievement: 'KGMU Lucknow - 2024',
      score: '645',
      year: '2024',
      quote:
        'The Biology faculty explained concepts so clearly that I never needed any other reference.',
      similarity: 'Similar Background',
    },
    {
      name: 'Sakshi Gupta',
      achievement: 'GMC Nagpur - 2024',
      score: '638',
      year: '2024',
      quote:
        'From struggling with basics to mastering advanced concepts - this journey was incredible.',
      similarity: 'Similar Target Score',
    }
  )

  return { testimonials: testimonials.slice(0, 3) }
}

function generatePersonalizedUrgency(preferences: any, recommendations: any, segment: string) {
  if (preferences.class === '12') {
    return {
      urgencyLevel: 'high',
      title: 'NEET 2025 is Just Months Away!',
      message:
        'Class 12 students have limited time. Every day counts towards your medical college dream.',
      timeRemaining: 'Only 4 months left for NEET 2025',
      ctaText: 'Secure My Seat Now',
    }
  }

  if (preferences.class === 'dropper') {
    return {
      urgencyLevel: 'high',
      title: 'Your Comeback Year Starts Now',
      message: "Don't let another year slip by. This is your chance to turn failure into success.",
      timeRemaining: 'New batch starts in 3 days',
      ctaText: 'Begin My Comeback',
    }
  }

  if (preferences.class === '11') {
    return {
      urgencyLevel: 'medium',
      title: 'Early Bird Advantage',
      message:
        'Class 11 is the perfect time to start. Early starters consistently score 50+ points higher.',
      timeRemaining: 'Early bird discount ends in 5 days',
      ctaText: 'Claim Early Advantage',
    }
  }

  return {
    urgencyLevel: 'medium',
    title: 'Limited Seats Available',
    message: 'Join thousands of successful NEET aspirants who chose us for guaranteed results.',
    timeRemaining: 'Only 47 seats left this month',
    ctaText: 'Reserve My Seat',
  }
}
