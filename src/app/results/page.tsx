'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import {
  Trophy,
  TrendingUp,
  Target,
  Award,
  Medal,
  Star,
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

// BreadcrumbList Schema for improved SERP display and CTR
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://cerebrumbiologyacademy.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Results',
      item: 'https://cerebrumbiologyacademy.com/results',
    },
  ],
}

const NEET_2024_RESULTS = {
  totalStudents: 150000,
  aiims: 67,
  successRate: 98,
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
  { name: 'AIIMS Delhi', students: 89, iconBg: 'bg-[#ea4335]' },
  { name: 'AIIMS Rishikesh', students: 67, iconBg: 'bg-[#4285f4]' },
  { name: 'MAMC Delhi', students: 54, iconBg: 'bg-[#fbbc04]' },
  { name: 'JIPMER Puducherry', students: 37, iconBg: 'bg-[#34a853]' },
  { name: 'KGMC Lucknow', students: 45, iconBg: 'bg-[#7c3aed]' },
  { name: 'GMC Nagpur', students: 52, iconBg: 'bg-[#0d9488]' },
  { name: 'BHU Varanasi', students: 41, iconBg: 'bg-[#ea4335]' },
  { name: 'VMMC Delhi', students: 38, iconBg: 'bg-[#4285f4]' },
]

const METHODOLOGY = [
  {
    icon: Brain,
    title: 'Conceptual Mastery',
    description:
      'Deep understanding over rote learning. Our faculty ensures every concept is crystal clear.',
    bgColor: 'bg-[#ea4335]',
  },
  {
    icon: Target,
    title: 'Targeted Practice',
    description:
      '10,000+ NEET-specific questions with detailed solutions and performance analytics.',
    bgColor: 'bg-[#4285f4]',
  },
  {
    icon: BarChart3,
    title: 'Personalized Analytics',
    description: 'AI-powered insights identify weak areas and create customized improvement plans.',
    bgColor: 'bg-[#fbbc04]',
  },
  {
    icon: Users,
    title: 'Expert Mentorship',
    description:
      'One-on-one guidance from NEET toppers and experienced faculty throughout your journey.',
    bgColor: 'bg-[#34a853]',
  },
  {
    icon: Zap,
    title: 'Regular Testing',
    description: 'Weekly mock tests simulating real NEET environment to build speed and accuracy.',
    bgColor: 'bg-[#7c3aed]',
  },
  {
    icon: Heart,
    title: 'Emotional Support',
    description:
      'Stress management, motivation sessions, and counseling to keep you mentally strong.',
    bgColor: 'bg-[#0d9488]',
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
    const text = `Cerebrum Biology Academy NEET 2024: 67+ AIIMS selections, 98% success rate! Check out these incredible results.`

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
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#3d4d3d] text-white px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6 text-xs sm:text-sm">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="font-semibold">NEET 2024 Results Announced</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#3d4d3d] mb-4 sm:mb-6 px-4">
            Our Students&apos; <span className="text-[#4a5d4a]">Success Stories</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            Real students, real results. See how Cerebrum Biology Academy&apos;s proven methodology
            transformed dreams into reality for 582 students in NEET 2024.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 mb-6 sm:mb-8 px-4">
            <Button
              size="lg"
              variant="primary"
              className="bg-[#3d4d3d] hover:bg-[#4a5d4a] text-white shadow-lg hover:shadow-xl transition-all w-full sm:w-auto min-h-11"
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
              className="border-[#3d4d3d] text-[#3d4d3d] hover:bg-[#3d4d3d] hover:text-white relative w-full sm:w-auto min-h-11"
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6 mb-10 sm:mb-12 md:mb-16">
          <Card className="text-center p-4 sm:p-6 bg-white border border-gray-100 hover:border-[#ea4335]/30 shadow-lg hover:shadow-xl transition-all">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#ea4335] rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Trophy className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
              {NEET_2024_RESULTS.aiims}
            </div>
            <div className="text-xs sm:text-sm font-medium text-gray-600">AIIMS Selections</div>
          </Card>

          <Card className="text-center p-4 sm:p-6 bg-white border border-gray-100 hover:border-[#4285f4]/30 shadow-lg hover:shadow-xl transition-all">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#4285f4] rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Target className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
              {NEET_2024_RESULTS.successRate}%
            </div>
            <div className="text-xs sm:text-sm font-medium text-gray-600">Success Rate</div>
          </Card>

          <Card className="text-center p-4 sm:p-6 bg-white border border-gray-100 hover:border-[#fbbc04]/30 shadow-lg hover:shadow-xl transition-all">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#fbbc04] rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Medal className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
              {NEET_2024_RESULTS.topRanks}
            </div>
            <div className="text-xs sm:text-sm font-medium text-gray-600">Top 500 Ranks</div>
          </Card>

          <Card className="text-center p-4 sm:p-6 bg-white border border-gray-100 hover:border-[#34a853]/30 shadow-lg hover:shadow-xl transition-all">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#34a853] rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
              +{NEET_2024_RESULTS.averageImprovement}
            </div>
            <div className="text-xs sm:text-sm font-medium text-gray-600">Avg. Improvement</div>
          </Card>

          <Card className="text-center p-4 sm:p-6 bg-white border border-gray-100 hover:border-[#7c3aed]/30 shadow-lg hover:shadow-xl transition-all">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#7c3aed] rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <GraduationCap className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
              {NEET_2024_RESULTS.totalStudents}
            </div>
            <div className="text-xs sm:text-sm font-medium text-gray-600">Total Students</div>
          </Card>

          <Card className="text-center p-4 sm:p-6 bg-white border border-gray-100 hover:border-[#0d9488]/30 shadow-lg hover:shadow-xl transition-all">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#0d9488] rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Award className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
              {NEET_2024_RESULTS.scholarships}
            </div>
            <div className="text-xs sm:text-sm font-medium text-gray-600">Scholarships Won</div>
          </Card>
        </div>

        <section className="mb-10 sm:mb-12 md:mb-16">
          <div className="text-center mb-8 sm:mb-10 md:mb-12 px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3d4d3d] mb-3 sm:mb-4">
              Watch Our Students Share Their Journey
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Real stories from students who transformed their NEET preparation with Cerebrum
              Biology Academy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {VIDEO_TESTIMONIALS.slice(0, 3).map((testimonial) => (
              <VideoTestimonial key={testimonial.id} {...testimonial} />
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Want to see more success stories?</p>
            <Button
              variant="outline"
              size="lg"
              className="border-[#3d4d3d] text-[#3d4d3d] hover:bg-[#3d4d3d] hover:text-white"
            >
              <Play className="h-5 w-5 mr-2" />
              View All Video Testimonials
            </Button>
          </div>
        </section>

        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#3d4d3d] mb-4">
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
                className="p-6 hover:shadow-xl transition-all bg-white border border-[#3d4d3d]/10 hover:border-[#3d4d3d]/30"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-10 h-10 ${college.iconBg} rounded-xl flex items-center justify-center`}
                  >
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  <Badge className="bg-[#e8ede8] text-[#3d4d3d] border-0 font-bold">
                    {college.students} students
                  </Badge>
                </div>
                <h3 className="font-bold text-lg text-[#3d4d3d]">{college.name}</h3>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#3d4d3d] mb-4">
              Score Transformation
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how our students improved their scores dramatically
            </p>
          </div>

          <Card className="p-4 sm:p-6 md:p-8 bg-white shadow-xl border border-[#3d4d3d]/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-400 mb-2">
                  420
                </div>
                <div className="text-sm text-gray-600 mb-4">Average Starting Score</div>
                <div className="h-2 bg-gray-200 rounded-full"></div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <ArrowUp className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-[#3d4d3d] mb-2 animate-bounce" />
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3d4d3d] mb-2">
                  +{NEET_2024_RESULTS.averageImprovement}
                </div>
                <div className="text-sm text-gray-600">Points Improvement</div>
              </div>

              <div className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#3d4d3d] mb-2">
                  {420 + NEET_2024_RESULTS.averageImprovement}
                </div>
                <div className="text-sm text-gray-600 mb-4">Average Final Score</div>
                <div className="h-2 bg-[#3d4d3d] rounded-full"></div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-[#e8ede8] rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-6 w-6 text-[#3d4d3d]" />
                <h3 className="font-bold text-lg text-[#3d4d3d]">Score Improvement Breakdown</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#3d4d3d] rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">
                    <strong>65%</strong> improved by 250+ marks
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#4a5d4a] rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">
                    <strong>25%</strong> improved by 200-250 marks
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#5a6d5a] rounded-full flex-shrink-0"></div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#3d4d3d] mb-4">
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
                className="p-6 hover:shadow-xl transition-all bg-white border border-gray-100 hover:border-gray-200"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 ${method.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}
                  >
                    <method.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2 text-gray-900">{method.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{method.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section id="book-demo" className="mb-8">
          <Card className="bg-[#e8ede8] p-8 md:p-12 shadow-2xl border border-[#3d4d3d]/10">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-[#3d4d3d] text-white px-4 py-2 rounded-full mb-6">
                <Sparkles className="h-5 w-5" />
                <span className="font-semibold">Limited Seats Available</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#3d4d3d]">
                Ready to Write Your Success Story?
              </h2>

              <p className="text-lg text-[#4a5d4a] mb-8">
                Join 1,50,000+ successful students who achieved their NEET dreams with our proven
                methodology and expert guidance. Book your free demo class today and experience the
                Cerebrum difference.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="xl"
                  variant="secondary"
                  className="bg-[#3d4d3d] text-white hover:bg-[#4a5d4a] shadow-lg hover:shadow-xl"
                >
                  Book Your Free Demo Class
                  <ChevronRight className="h-6 w-6 ml-2" />
                </Button>

                <Button
                  size="xl"
                  variant="outline"
                  className="border-2 border-[#3d4d3d] text-[#3d4d3d] hover:bg-[#3d4d3d] hover:text-white"
                >
                  Talk to Our Success Coach
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-[#3d4d3d]">
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

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="/testimonials" className="block bg-white rounded-xl shadow-md p-5 text-center hover:shadow-lg transition-shadow">
            <Star className="h-7 w-7 text-yellow-500 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Student Testimonials</h3>
            <p className="text-sm text-gray-500 mt-1">Hear from our students</p>
          </a>
          <a href="/wall-of-achievers" className="block bg-white rounded-xl shadow-md p-5 text-center hover:shadow-lg transition-shadow">
            <Trophy className="h-7 w-7 text-yellow-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Wall of Achievers</h3>
            <p className="text-sm text-gray-500 mt-1">Our top NEET scorers</p>
          </a>
          <a href="/neet-success-stories" className="block bg-white rounded-xl shadow-md p-5 text-center hover:shadow-lg transition-shadow">
            <TrendingUp className="h-7 w-7 text-green-500 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">NEET Success Stories</h3>
            <p className="text-sm text-gray-500 mt-1">Inspiring journeys</p>
          </a>
          <a href="/best-neet-biology-coaching" className="block bg-white rounded-xl shadow-md p-5 text-center hover:shadow-lg transition-shadow">
            <Award className="h-7 w-7 text-blue-500 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Best NEET Coaching</h3>
            <p className="text-sm text-gray-500 mt-1">Why choose us</p>
          </a>
        </section>

        <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join 1,50,000+ students who cracked NEET with Cerebrum Biology Academy. Book a free demo
            class today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/demo-booking"
              className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Book Free Demo Class
            </a>
            <a
              href="/courses"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-lg border border-white/20 transition-colors"
            >
              Explore Courses
            </a>
          </div>
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
          <p>Rated by 1,50,000+ students and parents</p>
        </section>
      </div>
      </div>
    </>
  )
}
