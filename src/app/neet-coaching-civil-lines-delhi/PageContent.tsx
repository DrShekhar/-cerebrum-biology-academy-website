'use client'

import Link from 'next/link'
import {
  MapPin,
  GraduationCap,
  Users,
  Trophy,
  Star,
  CheckCircle,
  Phone,
  ArrowRight,
  Clock,
  Award,
  Play,
  Building2,
  School,
  ExternalLink,
  ThumbsUp,
  MessageCircle,
  Train,
  Home,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { QuickAnswers } from '@/components/seo/QuickAnswers'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'
import { LazyGoogleMap } from '@/components/performance/LazyGoogleMap'
import { CityBreadcrumb } from '@/components/city/CityBreadcrumb'
import { PricingSection } from '@/components/city/PricingSection'
import { CostComparisonSection } from '@/components/city/CostComparisonSection'
import { RelatedCityLinks } from '@/components/seo/RelatedCityLinks'
import { LazyYouTubeEmbed } from '@/components/performance/LazyYouTubeEmbed'

interface FAQ {
  question: string
  answer: string
}

interface PageContentProps {
  faqs: FAQ[]
}

const premiumResidences = [
  {
    name: 'Oberoi Apartments',
    description: 'Ultra-luxury apartments with distinguished families',
    highlights: ['Ultra Premium', 'Exclusive Society', 'Top Schools'],
    students: '25+',
  },
  {
    name: 'Mittal Rishi Apartments',
    description: 'Premium residential complex with academic families',
    highlights: ['Premium Society', 'Well-Connected', 'Educated Families'],
    students: '30+',
  },
  {
    name: 'Maidens Court',
    description: 'Heritage locality with established families',
    highlights: ['Heritage Area', 'Elite Residents', 'Near Metro'],
    students: '20+',
  },
  {
    name: 'Cavalry Lines',
    description: 'Prestigious defense area with service families',
    highlights: ['Defense Colony', 'Disciplined Students', 'Academic Focus'],
    students: '35+',
  },
]

const nearbySchools = [
  { name: 'St. Stephens College Area', location: 'Civil Lines', students: '500+' },
  { name: 'Hindu College Area', location: 'North Campus', students: '400+' },
  { name: 'SRCC Area', location: 'Maurice Nagar', students: '350+' },
  { name: 'St. Xaviers School', location: 'Civil Lines', students: '200+' },
  { name: 'The British School', location: 'Chanakyapuri (nearby)', students: '150+' },
  { name: 'Convent of Jesus & Mary', location: 'Bangla Sahib (nearby)', students: '180+' },
]

const stats = [
  { label: 'Students from Civil Lines', value: '180+' },
  { label: 'Success Rate', value: '98%' },
  { label: 'Metro Stations Away', value: '8' },
  { label: 'Top 1000 Rankers', value: '45+' },
]

const testimonials = [
  {
    name: 'Arjun Mehta',
    residence: 'Oberoi Apartments, Civil Lines',
    school: "St. Xavier's School",
    beforeScore: 520,
    afterScore: 672,
    improvement: 152,
    neetRank: 'AIR 1,150',
    college: 'MAMC Delhi',
    year: 2024,
    quote:
      "Living in Civil Lines, I was worried about finding quality NEET coaching nearby. But Cerebrum at Rohini is just 20 minutes via Yellow Line Metro - no transfers needed! The small batch size of 15 students meant I got personal attention. Dr. Shekhar Sir's NCERT-focused approach helped me master concepts I struggled with for years. From 520 to 672, my journey wouldn't have been possible without Cerebrum!",
  },
  {
    name: 'Priya Kapoor',
    residence: 'Mittal Rishi Apartments, Civil Lines',
    school: 'DPS RK Puram',
    beforeScore: 485,
    afterScore: 658,
    improvement: 173,
    neetRank: 'AIR 1,890',
    college: 'Lady Hardinge Medical College',
    year: 2024,
    quote:
      "My parents were initially skeptical about traveling to Rohini from Civil Lines for coaching. But the direct Yellow Line Metro connection made it so convenient! The weekend batches were perfect for my DPS schedule. Cerebrum's study material is comprehensive - no need for multiple books. The regular mock tests and analysis helped me identify weak areas. I improved by 173 marks and got into LHMC Delhi!",
  },
  {
    name: 'Rahul Sharma',
    residence: 'Cavalry Lines, Civil Lines',
    school: 'Army Public School',
    beforeScore: 545,
    afterScore: 689,
    improvement: 144,
    neetRank: 'AIR 650',
    college: 'UCMS Delhi',
    year: 2024,
    quote:
      "As an army kid from Cavalry Lines, discipline is in my blood. Cerebrum matched that discipline with structured teaching. The hybrid mode - weekends at Rohini center, weekdays online - worked perfectly. Dr. Shekhar Sir's clinical correlations made Biology come alive. From scoring 545 to 689 and AIR 650, I secured a seat at UCMS Delhi. Best decision for any Civil Lines student!",
  },
]

export default function PageContent({ faqs }: PageContentProps) {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as typeof globalThis & { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as typeof globalThis & { gtag?: (...args: unknown[]) => void }).gtag?.('event', 'demo_booking_civil_lines', {
        event_category: 'conversion',
        event_label: 'neet_coaching_civil_lines_delhi',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4">
          <div
            className="text-center max-w-5xl mx-auto animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Building2 className="w-5 h-5 mr-2 text-yellow-300" />
              Ultra-Premium Civil Lines - Direct Metro to Rohini
            </div>

            <h1 className="hero-title text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Best <span className="text-yellow-300">NEET Coaching in Civil Lines Delhi</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Oberoi Apartments - Mittal Rishi - Cavalry Lines - Maidens Court
            </h2>

            <p className="hero-description text-lg md:text-xl opacity-80 mb-8 max-w-4xl mx-auto speakable-intro">
              Join Delhi's most trusted NEET Biology coaching. Civil Lines' ultra-premium families
              trust us for academic excellence. Direct Yellow Line Metro to our Rohini DC Chauk
              center - just 8 stops, 20 minutes! AIIMS faculty, 98% success rate, small batches of
              15-20 students.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="https://wa.me/918826444334?text=Hi%2C%20I%27m%20from%20Civil%20Lines%20Delhi%20and%20interested%20in%20NEET%20Biology%20coaching.%20Please%20share%20details%20about%20batches%20and%20fees."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-green-500 text-white hover:bg-green-600 font-bold"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp: 88264-44334
                </Button>
              </a>

              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <a href="tel:+918826444334">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-purple-900"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </a>
            </div>

            {/* Metro Connectivity Highlight */}
            <div
              className="bg-yellow-500/20 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto mb-8 border border-yellow-400/30 animate-fadeInUp"
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <Train className="w-8 h-8 text-yellow-300" />
                <span className="text-xl font-bold text-yellow-300">Nearest to Rohini via Metro</span>
              </div>
              <p className="text-white/90">
                <strong>Yellow Line:</strong> Civil Lines Station → Rohini West Station
                <br />
                <span className="text-yellow-200">Just 8 stops | 20 minutes | No transfers needed!</span>
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 animate-fadeInUp"
                >
                  <div className="text-xl md:text-2xl font-bold text-yellow-300">{stat.value}</div>
                  <div className="text-xs md:text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Answers Section - Optimized for Featured Snippets */}
      <section className="py-12 md:py-16 bg-white quick-answers">
        <div className="max-w-7xl mx-auto px-4">
          <QuickAnswers locality="Civil Lines Delhi" />
        </div>
      </section>

      {/* Why Civil Lines Students Choose Cerebrum */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Building2 className="w-4 h-4 mr-2" />
              Ultra-Premium Locality
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Civil Lines Families Trust Cerebrum
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Civil Lines is one of Delhi's most prestigious areas. Families here demand excellence -
              and Cerebrum delivers with AIIMS faculty, proven results, and personalized attention.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Metro Connectivity Card */}
            <div
              className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100 animate-fadeInUp"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Train className="w-8 h-8 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Direct Yellow Line Metro</h3>
                  <p className="text-gray-600">Nearest Premium NEET Coaching to Civil Lines</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-yellow-50 rounded-lg p-4">
                  <MapPin className="w-6 h-6 text-yellow-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Civil Lines Metro Station</p>
                    <p className="text-sm text-gray-600">Start point - Yellow Line</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="flex flex-col items-center">
                    <div className="w-1 h-8 bg-yellow-400"></div>
                    <span className="text-xs text-gray-500 my-1">8 stops</span>
                    <div className="w-1 h-8 bg-yellow-400"></div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-green-50 rounded-lg p-4">
                  <MapPin className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Rohini West Metro Station</p>
                    <p className="text-sm text-gray-600">2-min walk to Cerebrum Academy</p>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-purple-700">20 Minutes Total</p>
                  <p className="text-sm text-gray-600">Door to door - No transfers!</p>
                </div>
              </div>
            </div>

            {/* Ultra-Premium Expectations */}
            <div
              className="bg-white rounded-2xl shadow-xl p-8 border border-indigo-100 animate-fadeInUp"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Meeting Premium Expectations</h3>
                  <p className="text-gray-600">What Civil Lines families get at Cerebrum</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: GraduationCap,
                    title: 'AIIMS-Trained Faculty',
                    desc: 'Dr. Shekhar C Singh (Ex-AIIMS) personally teaches batches',
                  },
                  {
                    icon: Users,
                    title: 'Small Batch Size (15-20)',
                    desc: 'Individual attention for every student',
                  },
                  {
                    icon: Trophy,
                    title: '98% Success Rate',
                    desc: 'Top score 695/720 in NEET Biology',
                  },
                  {
                    icon: Clock,
                    title: 'Flexible Timings',
                    desc: 'Weekend, evening & hybrid batches available',
                  },
                  {
                    icon: Star,
                    title: 'Personalized Mentoring',
                    desc: 'Regular parent-teacher meetings & progress reports',
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Residences Grid */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Home className="w-4 h-4 mr-2" />
              Premium Residences We Serve
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Students from Civil Lines' Finest Addresses
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're trusted by families from Oberoi Apartments, Mittal Rishi Apartments, and other
              elite residences in Civil Lines
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {premiumResidences.map((residence, index) => (
              <div
                key={residence.name}
                className="bg-gradient-to-br from-amber-50 to-white rounded-xl shadow-lg p-6 border border-amber-100 hover:shadow-xl transition-all animate-fadeInUp"
              >
                <div className="flex items-center justify-between mb-4">
                  <Building2 className="w-8 h-8 text-amber-600" />
                  <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold">
                    {residence.students} Students
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{residence.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{residence.description}</p>
                <div className="flex flex-wrap gap-2">
                  {residence.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="bg-amber-50 text-amber-700 text-xs px-2 py-1 rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free NEET Tools Widget */}
      <NEETToolsWidget
        title="Free NEET Preparation Tools"
        subtitle="Boost your NEET preparation with our AI-powered tools - 100% Free for Civil Lines students"
        showAllLink={true}
      />

      {/* Student Testimonials */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Trophy className="w-4 h-4 mr-2" />
              Success Stories from Civil Lines
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Real Results from Civil Lines Students
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Read how students from Oberoi Apartments, Mittal Rishi, and Cavalry Lines transformed
              their NEET scores at Cerebrum
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((story, index) => (
              <div
                key={story.name}
                className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-300 animate-fadeInUp"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{story.name}</h3>
                    <p className="text-sm text-gray-600">{story.school}</p>
                    <p className="text-xs text-purple-600 font-medium mt-1">{story.residence}</p>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">
                    {story.year}
                  </div>
                </div>

                {/* Score Improvement */}
                <div className="bg-gradient-to-r from-red-50 to-green-50 rounded-xl p-4 mb-6">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Before</p>
                      <p className="text-2xl font-bold text-red-600">{story.beforeScore}</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <ArrowRight className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">After</p>
                      <p className="text-2xl font-bold text-green-600">{story.afterScore}</p>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <span className="inline-block bg-green-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                      +{story.improvement} marks improvement
                    </span>
                  </div>
                </div>

                {/* Achievement */}
                <div className="flex items-center justify-between bg-purple-50 rounded-lg p-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">NEET Rank</p>
                    <p className="text-lg font-bold text-purple-900">{story.neetRank}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600 mb-1">College</p>
                    <p className="text-sm font-bold text-purple-900">{story.college}</p>
                  </div>
                </div>

                {/* Quote */}
                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <p className="text-sm text-gray-700 leading-relaxed italic">
                    &quot;{story.quote}&quot;
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            className="text-center mt-12 animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full text-sm font-semibold">
              <Award className="w-5 h-5 mr-2" />
              Average improvement: 155+ marks | 180+ students from Civil Lines qualified NEET
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Play className="w-4 h-4 mr-2" />
              Video Success Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Watch NEET Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear directly from our top achievers about their journey at Cerebrum Biology Academy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              {
                youtubeId: 'bk6wQCh6b9w',
                student: 'Sadhna Sirin',
                score: '695/720',
                achievement: 'Delhi-NCR Topper NEET 2023',
                percentile: '100 Percentile Biology',
              },
              {
                youtubeId: 'NfhkGqOQXzk',
                student: 'Abhisek',
                score: 'AFMC Selection',
                achievement: 'Armed Forces Medical College',
                percentile: 'Pune Campus',
              },
              {
                youtubeId: 't5F8RBuHITM',
                student: 'Nishita',
                score: 'Medical College',
                achievement: '6-Month Intensive Program',
                percentile: 'Quick Success Story',
              },
            ].map((video, index) => (
              <div
                key={video.youtubeId}
                className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 group hover:shadow-2xl transition-all duration-300 animate-fadeInUp"
              >
                <LazyYouTubeEmbed
                  videoId={video.youtubeId}
                  title={`${video.student} NEET Success Story`}
                  playButtonSize="md"
                />
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{video.student}</h3>
                  <p className="text-green-600 font-semibold mb-1">{video.score}</p>
                  <p className="text-gray-600 text-sm mb-1">{video.achievement}</p>
                  <p className="text-purple-600 text-xs font-medium">{video.percentile}</p>
                </div>
              </div>
            ))}
          </div>

          <div
            className="text-center animate-fadeInUp"
          >
            <a
              href="https://www.youtube.com/@cerebrumbiologyacademy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <Play className="w-6 h-6" />
              Watch More Success Stories on YouTube
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Schools Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Students from Top Schools Near Civil Lines
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We coach students from prestigious schools in and around Civil Lines
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nearbySchools.map((school, index) => (
              <div
                key={school.name}
                className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100 animate-fadeInUp"
              >
                <div className="flex items-center mb-3">
                  <School className="w-8 h-8 text-purple-600 mr-3" />
                  <div>
                    <h3 className="font-bold text-gray-900">{school.name}</h3>
                    <p className="text-sm text-gray-500">{school.location}</p>
                  </div>
                </div>
                <div className="text-sm text-purple-600 font-medium">
                  {school.students} students from this area
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 bg-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Civil Lines Students Choose Cerebrum
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              'AIIMS-trained expert faculty',
              'Direct Yellow Line Metro access',
              'Small batches (15-20 students)',
              'Weekend & evening batches',
              '98% NEET success rate',
              'Personalized mentoring',
              'Hybrid mode available',
              'Regular progress reports',
              'Scholarship for toppers',
              'EMI payment options',
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-4 animate-fadeInUp"
              >
                <CheckCircle className="w-6 h-6 text-yellow-300 mr-3 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews & Contact Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Civil Lines Families
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See what students and parents from Civil Lines are saying about us
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Google Rating Card */}
            <div
              className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl p-8 border border-blue-100 animate-fadeInUp"
            >
              <div className="flex items-center justify-center mb-6">
                <img
                  src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                  alt="Google"
                  className="h-10"
                />
              </div>
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-gray-900 mb-3">4.9</div>
                <div className="flex items-center justify-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-7 h-7 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 font-semibold text-lg mb-2">Based on 847+ reviews</p>
                <p className="text-sm text-gray-500">
                  Verified reviews from students and parents
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href="https://www.google.com/search?q=cerebrum+biology+academy+reviews"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
                >
                  <ThumbsUp className="w-5 h-5" />
                  Read All Reviews on Google
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Reviews from Civil Lines */}
            <div
              className="bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-xl p-8 border border-purple-100 animate-fadeInUp"
            >
              <h3 className="font-bold text-gray-900 text-xl mb-6 flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-purple-600" />
                Reviews from Civil Lines
              </h3>
              <div className="space-y-5">
                {[
                  {
                    text: "Best NEET coaching accessible from Civil Lines! The Yellow Line metro connection to Rohini is perfect. My son from Oberoi Apartments improved from 520 to 668. Small batch size meant personal attention.",
                    author: 'Parent',
                    location: 'Oberoi Apartments, Civil Lines',
                    rating: 5,
                  },
                  {
                    text: "Living in Mittal Rishi Apartments, I was looking for quality coaching without traveling far. Cerebrum's metro connectivity is unmatched. Dr. Shekhar Sir's teaching methodology is exceptional!",
                    author: 'Anika M.',
                    location: 'Mittal Rishi Apartments',
                    rating: 5,
                  },
                  {
                    text: "The hybrid mode is perfect for Civil Lines students. Weekend classes at Rohini center + weekday online. My daughter scored 665 in NEET and got LHMC. Highly recommend!",
                    author: 'Parent',
                    location: 'Cavalry Lines',
                    rating: 5,
                  },
                ].map((review, index) => (
                  <div key={index} className="border-l-4 border-purple-500 pl-4 py-2">
                    <div className="flex gap-1 mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed mb-2 italic">
                      &quot;{review.text}&quot;
                    </p>
                    <p className="text-xs text-gray-600 font-medium">
                      - {review.author}, {review.location}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map & Contact */}
          <div
            className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-xl overflow-hidden border border-green-100 animate-fadeInUp"
          >
            <div className="grid lg:grid-cols-2">
              {/* Map */}
              <div className="relative h-96 lg:h-auto bg-gray-100">
                <LazyGoogleMap
                  embedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.8!2d77.1025!3d28.7041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDQyJzE0LjgiTiA3N8KwMDYnMDkuMCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  title="Cerebrum Biology Academy - Nearest to Civil Lines via Metro"
                  height="100%"
                  placeholder={{
                    lat: 28.7041,
                    lng: 77.1025,
                    address: "211 Vikas Surya Tower, DC Chauk, Rohini - Near Rohini West Metro"
                  }}
                />
              </div>

              {/* Contact Details */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Visit Our Rohini Center
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Address</p>
                      <p className="text-gray-600 leading-relaxed">
                        Cerebrum Biology Academy
                        <br />
                        211 Vikas Surya Tower, DC Chauk
                        <br />
                        Sector 9, Rohini, Delhi - 110085
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Train className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Metro Connectivity</p>
                      <p className="text-gray-600">
                        <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium mr-1">
                          Yellow Line
                        </span>
                        Civil Lines → Rohini West (8 stops, 20 min)
                        <br />
                        <span className="text-green-600 font-medium text-sm mt-1 inline-block">
                          2-minute walk from Rohini West Metro
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Phone & WhatsApp</p>
                      <a
                        href="tel:+918826444334"
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        +91-88264-44334
                      </a>
                      <p className="text-sm text-gray-500 mt-1">Mon-Sat: 8 AM - 8 PM | Sun: 9 AM - 5 PM</p>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <a
                      href="https://wa.me/918826444334?text=Hi%2C%20I%27m%20from%20Civil%20Lines%20Delhi%20and%20interested%20in%20NEET%20Biology%20coaching."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors justify-center"
                    >
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp Us
                    </a>
                    <a
                      href="https://maps.google.com/?q=Cerebrum+Biology+Academy+Rohini"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors justify-center"
                    >
                      <MapPin className="w-5 h-5" />
                      Get Directions
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NEET Coaching Civil Lines Delhi - FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md animate-fadeInUp"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 md:py-16 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {[
              {
                icon: Award,
                label: '15+ Years',
                sublabel: 'Excellence Since 2009',
                color: 'text-blue-600',
              },
              {
                icon: Users,
                label: '180+ Students',
                sublabel: 'From Civil Lines',
                color: 'text-green-600',
              },
              {
                icon: Star,
                label: '4.9/5 Rating',
                sublabel: '847+ Google Reviews',
                color: 'text-yellow-600',
              },
              {
                icon: GraduationCap,
                label: 'AIIMS Faculty',
                sublabel: 'Expert Teachers',
                color: 'text-purple-600',
              },
              {
                icon: Trophy,
                label: '98% Success',
                sublabel: 'NEET Qualification',
                color: 'text-orange-600',
              },
              {
                icon: Train,
                label: '20 Min Metro',
                sublabel: 'From Civil Lines',
                color: 'text-red-600',
              },
            ].map((badge, index) => (
              <div
                key={badge.label}
                className="text-center bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 animate-fadeInUp"
              >
                <badge.icon className={`w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 ${badge.color}`} />
                <div className="font-bold text-gray-900 text-sm md:text-base mb-1">
                  {badge.label}
                </div>
                <div className="text-xs text-gray-600">{badge.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
           className="animate-fadeInUp">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2 text-yellow-300" />
              Limited Seats Available for Civil Lines Batch
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Civil Lines' Most Trusted NEET Coaching
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Oberoi Apartments, Mittal Rishi, Cavalry Lines families trust us. Book your free demo
              today!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/918826444334?text=Hi%2C%20I%27m%20from%20Civil%20Lines%20Delhi%20and%20want%20to%20book%20a%20FREE%20NEET%20Biology%20demo%20class."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-green-500 text-white hover:bg-green-600 font-bold"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp: 88264-44334
                </Button>
              </a>

              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/courses">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-purple-700"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  View All Courses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/918826444334?text=Hi%2C%20I%27m%20from%20Civil%20Lines%20Delhi%20and%20interested%20in%20NEET%20Biology%20coaching.%20Please%20share%20details%20about%20batches%20and%20fees."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 group hover:scale-110 animate-fadeInUp"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
          1
        </span>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Chat with us on WhatsApp
        </span>
      </a>

      {/* Additional Schema for Educational Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'Cerebrum Biology Academy - NEET Coaching for Civil Lines Delhi',
            description:
              'Best NEET coaching for Civil Lines Delhi students. Ultra-premium area with direct Yellow Line Metro access. 98% success rate, AIIMS faculty.',
            url: 'https://cerebrumbiologyacademy.com/neet-coaching-civil-lines-delhi',
            areaServed: [
              'Civil Lines',
              'Oberoi Apartments',
              'Mittal Rishi Apartments',
              'Cavalry Lines',
              'Maidens Court',
            ],
            address: {
              '@type': 'PostalAddress',
              streetAddress: '211 Vikas Surya Tower, DC Chauk, Sector 9, Rohini',
              addressLocality: 'Delhi',
              addressRegion: 'Delhi',
              postalCode: '110085',
              addressCountry: 'IN',
            },
          }),
        }}
      />
      <PricingSection cityName="Civil Lines" />
      <CostComparisonSection cityName="Civil Lines" />
      <RelatedCityLinks currentCity="civil-lines-delhi" variant="default" />
    </div>
  )
}
