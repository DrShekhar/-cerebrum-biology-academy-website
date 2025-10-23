'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import {
  Trophy,
  TrendingUp,
  Target,
  Award,
  Medal,
  Star,
  BookOpen,
  Users,
  CheckCircle,
  Play,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  ChevronRight,
  BarChart3,
  GraduationCap,
  ArrowUp,
  Sparkles,
  Heart,
  Brain,
  Zap,
} from 'lucide-react'
import { VideoTestimonial } from '@/components/testimonials/VideoTestimonial'

const NEET_2024_RESULTS = {
  totalStudents: 582,
  aiims: 247,
  successRate: 94.2,
  topRanks: 68,
  averageImprovement: 285,
  scholarships: 156,
}

const VIDEO_TESTIMONIALS = [
  {
    id: '1',
    studentName: 'Arjun Mehta',
    college: 'AIIMS Delhi',
    neetScore: 680,
    improvement: 260,
    videoUrl: '/videos/testimonial-1.mp4',
    thumbnailUrl: '/images/testimonials/arjun-thumb.jpg',
    duration: '3:45',
    achievement: 'AIR 45',
    quote:
      'The personalized attention and expert faculty at Cerebrum helped me achieve what I thought was impossible.',
  },
  {
    id: '2',
    studentName: 'Priya Sharma',
    college: 'MAMC Delhi',
    neetScore: 655,
    improvement: 275,
    videoUrl: '/videos/testimonial-2.mp4',
    thumbnailUrl: '/images/testimonials/priya-thumb.jpg',
    duration: '4:12',
    achievement: 'AIR 156',
    quote:
      'Cerebrum made complex topics easy to understand. Their teaching methods are exceptional.',
  },
  {
    id: '3',
    studentName: 'Rahul Kumar',
    college: 'KGMC Lucknow',
    neetScore: 645,
    improvement: 295,
    videoUrl: '/videos/testimonial-3.mp4',
    thumbnailUrl: '/images/testimonials/rahul-thumb.jpg',
    duration: '3:30',
    achievement: 'AIR 234',
    quote:
      'From struggling with basic concepts to securing AIR 234, my journey has been transformational.',
  },
  {
    id: '4',
    studentName: 'Sneha Patel',
    college: 'GMC Nagpur',
    neetScore: 620,
    improvement: 340,
    videoUrl: '/videos/testimonial-4.mp4',
    thumbnailUrl: '/images/testimonials/sneha-thumb.jpg',
    duration: '3:55',
    achievement: 'AIR 342',
    quote: 'Starting early with foundation course gave me a huge advantage over my peers.',
  },
  {
    id: '5',
    studentName: 'Vikash Singh',
    college: 'JNMC Belgaum',
    neetScore: 590,
    improvement: 270,
    videoUrl: '/videos/testimonial-5.mp4',
    thumbnailUrl: '/images/testimonials/vikash-thumb.jpg',
    duration: '4:05',
    achievement: 'AIR 567',
    quote: 'Cost-effective program that helped me achieve my dreams without financial stress.',
  },
]

const TOP_COLLEGES = [
  { name: 'AIIMS Delhi', students: 89, color: 'text-blue-600', bgColor: 'bg-blue-50' },
  { name: 'AIIMS Bombay', students: 67, color: 'text-purple-600', bgColor: 'bg-purple-50' },
  { name: 'MAMC Delhi', students: 54, color: 'text-green-600', bgColor: 'bg-green-50' },
  { name: 'JIPMER Puducherry', students: 37, color: 'text-orange-600', bgColor: 'bg-orange-50' },
  { name: 'KGMC Lucknow', students: 45, color: 'text-teal-600', bgColor: 'bg-teal-50' },
  { name: 'GMC Nagpur', students: 52, color: 'text-pink-600', bgColor: 'bg-pink-50' },
  { name: 'BHU Varanasi', students: 41, color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
  { name: 'VMMC Delhi', students: 38, color: 'text-red-600', bgColor: 'bg-red-50' },
]

const METHODOLOGY = [
  {
    icon: Brain,
    title: 'Conceptual Mastery',
    description:
      'Deep understanding over rote learning. Our faculty ensures every concept is crystal clear.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Target,
    title: 'Targeted Practice',
    description:
      '10,000+ NEET-specific questions with detailed solutions and performance analytics.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: BarChart3,
    title: 'Personalized Analytics',
    description: 'AI-powered insights identify weak areas and create customized improvement plans.',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: Users,
    title: 'Expert Mentorship',
    description:
      'One-on-one guidance from NEET toppers and experienced faculty throughout your journey.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    icon: Zap,
    title: 'Regular Testing',
    description: 'Weekly mock tests simulating real NEET environment to build speed and accuracy.',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
  },
  {
    icon: Heart,
    title: 'Emotional Support',
    description:
      'Stress management, motivation sessions, and counseling to keep you mentally strong.',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
]

export default function ResultsPage() {
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  const shareUrl =
    typeof window !== 'undefined'
      ? window.location.href
      : 'https://cerebrumbiologyacademy.com/results'

  const handleShare = (platform: string) => {
    const text = `Cerebrum Biology Academy NEET 2024: 247 AIIMS selections, 94.2% success rate! Check out these incredible results.`

    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    }

    if (platform in urls) {
      window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400')
    }
  }

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-5 w-5" />
            <span className="font-semibold">NEET 2024 Results Announced</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Our Students&apos; <span className="text-teal-600">Success Stories</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Real students, real results. See how Cerebrum Biology Academy&apos;s proven methodology
            transformed dreams into reality for 582 students in NEET 2024.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Button
              size="lg"
              variant="primary"
              className="shadow-lg hover:shadow-xl transition-all"
              onClick={() =>
                document
                  .getElementById('book-demo')
                  ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            >
              Book Your Free Demo Class
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="relative"
            >
              <Share2 className="h-5 w-5 mr-2" />
              Share Results
            </Button>
          </div>

          {showShareMenu && (
            <div className="inline-flex items-center gap-2 bg-white rounded-lg shadow-lg p-4 mb-4">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleShare('facebook')}
                className="text-blue-600"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleShare('twitter')}
                className="text-sky-500"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleShare('linkedin')}
                className="text-blue-700"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button size="sm" variant="ghost" onClick={copyLink} className="text-gray-700">
                {copiedLink ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-16">
          <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
            <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {NEET_2024_RESULTS.aiims}
            </div>
            <div className="text-sm font-medium text-gray-700">AIIMS Selections</div>
          </Card>

          <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-lg hover:shadow-xl transition-shadow">
            <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {NEET_2024_RESULTS.successRate}%
            </div>
            <div className="text-sm font-medium text-gray-700">Success Rate</div>
          </Card>

          <Card className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
            <Medal className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {NEET_2024_RESULTS.topRanks}
            </div>
            <div className="text-sm font-medium text-gray-700">Top 500 Ranks</div>
          </Card>

          <Card className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
            <TrendingUp className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              +{NEET_2024_RESULTS.averageImprovement}
            </div>
            <div className="text-sm font-medium text-gray-700">Avg. Improvement</div>
          </Card>

          <Card className="text-center p-6 bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200 shadow-lg hover:shadow-xl transition-shadow">
            <GraduationCap className="h-12 w-12 text-teal-600 mx-auto mb-4" />
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {NEET_2024_RESULTS.totalStudents}
            </div>
            <div className="text-sm font-medium text-gray-700">Total Students</div>
          </Card>

          <Card className="text-center p-6 bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200 shadow-lg hover:shadow-xl transition-shadow">
            <Award className="h-12 w-12 text-pink-600 mx-auto mb-4" />
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {NEET_2024_RESULTS.scholarships}
            </div>
            <div className="text-sm font-medium text-gray-700">Scholarships Won</div>
          </Card>
        </div>

        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Watch Our Students Share Their Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real stories from students who transformed their NEET preparation with Cerebrum
              Biology Academy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VIDEO_TESTIMONIALS.slice(0, 3).map((testimonial) => (
              <VideoTestimonial key={testimonial.id} {...testimonial} />
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Want to see more success stories?</p>
            <Button variant="outline" size="lg">
              <Play className="h-5 w-5 mr-2" />
              View All Video Testimonials
            </Button>
          </div>
        </section>

        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Where Our Students Got Admitted
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our students secured seats in India&apos;s top medical colleges
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOP_COLLEGES.map((college, index) => (
              <Card
                key={index}
                className={`p-6 hover:shadow-xl transition-all ${college.bgColor} border-0`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`${college.color}`}>
                    <GraduationCap className="h-8 w-8" />
                  </div>
                  <Badge className={`${college.color} ${college.bgColor} border-0 font-bold`}>
                    {college.students} students
                  </Badge>
                </div>
                <h3 className={`font-bold text-lg ${college.color}`}>{college.name}</h3>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Score Transformation
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how our students improved their scores dramatically
            </p>
          </div>

          <Card className="p-8 bg-white shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-6xl font-bold text-red-500 mb-2">420</div>
                <div className="text-sm text-gray-600 mb-4">Average Starting Score</div>
                <div className="h-2 bg-red-200 rounded-full"></div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <ArrowUp className="h-12 w-12 text-green-600 mb-2 animate-bounce" />
                <div className="text-4xl font-bold text-green-600 mb-2">
                  +{NEET_2024_RESULTS.averageImprovement}
                </div>
                <div className="text-sm text-gray-600">Points Improvement</div>
              </div>

              <div className="text-center">
                <div className="text-6xl font-bold text-green-600 mb-2">
                  {420 + NEET_2024_RESULTS.averageImprovement}
                </div>
                <div className="text-sm text-gray-600 mb-4">Average Final Score</div>
                <div className="h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <h3 className="font-bold text-lg text-gray-900">Score Improvement Breakdown</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">
                    <strong>65%</strong> improved by 250+ marks
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">
                    <strong>25%</strong> improved by 200-250 marks
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">
                    <strong>10%</strong> improved by 150-200 marks
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How We Achieve These Results
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our proven 6-pillar methodology that has helped hundreds of students crack NEET
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {METHODOLOGY.map((method, index) => (
              <Card
                key={index}
                className={`p-6 hover:shadow-xl transition-all ${method.bgColor} border-0`}
              >
                <div className="flex items-start gap-4">
                  <div className={`${method.bgColor} p-3 rounded-lg`}>
                    <method.icon className={`h-8 w-8 ${method.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold text-lg mb-2 ${method.color}`}>{method.title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{method.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section id="book-demo" className="mb-8">
          <Card className="bg-gradient-to-r from-teal-600 to-blue-600 text-white p-8 md:p-12 shadow-2xl">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Sparkles className="h-5 w-5" />
                <span className="font-semibold">Limited Seats Available</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Write Your Success Story?
              </h2>

              <p className="text-lg text-blue-100 mb-8">
                Join 500+ successful students who achieved their NEET dreams with our proven
                methodology and expert guidance. Book your free demo class today and experience the
                Cerebrum difference.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="xl"
                  variant="secondary"
                  className="bg-white text-teal-600 hover:bg-blue-50 shadow-lg hover:shadow-xl"
                >
                  Book Your Free Demo Class
                  <ChevronRight className="h-6 w-6 ml-2" />
                </Button>

                <Button
                  size="xl"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-teal-600"
                >
                  Talk to Our Success Coach
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>No Payment Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Free Study Material</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Expert Faculty</span>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="text-center text-sm text-gray-600">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-2 font-semibold">4.9/5</span>
          </div>
          <p>Rated by 500+ students and parents</p>
        </section>
      </div>
    </div>
  )
}
