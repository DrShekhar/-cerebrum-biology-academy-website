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
  Monitor,
  Wifi,
  Video,
  Globe,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { QuickAnswers } from '@/components/seo/QuickAnswers'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'
import { LazyGoogleMap } from '@/components/performance/LazyGoogleMap'
import { CityBreadcrumb } from '@/components/city/CityBreadcrumb'
import { PricingSection } from '@/components/city/PricingSection'
import { CostComparisonSection } from '@/components/city/CostComparisonSection'
import { RelatedCityLinks } from '@/components/seo/RelatedCityLinks'

interface FAQ {
  question: string
  answer: string
}

interface PageContentProps {
  faqs: FAQ[]
}

const dwarkaSectors = [
  {
    name: 'Sector 10',
    description: 'Main area with metro connectivity',
    highlights: ['Metro Station', 'DDA Flats', 'Markets'],
    students: '25+',
  },
  {
    name: 'Sector 6',
    description: 'Near Sector 9 metro, residential area',
    highlights: ['Near Metro', 'CGHS Society', 'Schools'],
    students: '20+',
  },
  {
    name: 'Sector 7',
    description: 'Close to Sector 10, good connectivity',
    highlights: ['Residential', 'Near Market', 'Parks'],
    students: '15+',
  },
  {
    name: 'Sector 11',
    description: 'Adjacent to Sector 10 metro',
    highlights: ['DDA Flats', 'Near Metro', 'Schools'],
    students: '12+',
  },
  {
    name: 'Sector 12',
    description: 'Well-connected residential sector',
    highlights: ['Residential', 'Markets', 'Parks'],
    students: '10+',
  },
  {
    name: 'Sector 21',
    description: 'Near IGI Airport, upcoming area',
    highlights: ['Airport Near', 'Developing', 'Metro'],
    students: '8+',
  },
]

const nearbySchools = [
  { name: 'DAV Public School', location: 'Sector 6, Dwarka', students: '150+' },
  { name: 'Delhi Public School', location: 'Sector 19, Dwarka', students: '200+' },
  { name: 'Montfort School', location: 'Sector 5, Dwarka', students: '180+' },
  { name: 'St. Gregorios School', location: 'Sector 11, Dwarka', students: '120+' },
  { name: 'RPVV Dwarka', location: 'Sector 10, Dwarka', students: '100+' },
  { name: 'K.R. Mangalam School', location: 'Sector 7, Dwarka', students: '130+' },
]

const stats = [
  { label: 'Students from Dwarka', value: '85+' },
  { label: 'Success Rate', value: '98%' },
  { label: 'Metro Travel Time', value: '25-30 min' },
  { label: 'Online Students', value: '40+' },
]

const testimonials = [
  {
    name: 'Aryan Sharma',
    residence: 'Sector 10, Dwarka',
    school: 'DAV Public School, Dwarka',
    beforeScore: 495,
    afterScore: 658,
    improvement: 163,
    neetRank: 'AIR 2,150',
    college: 'UCMS Delhi',
    year: 2024,
    mode: 'Hybrid',
    quote:
      "Living in Dwarka Sector 10, I was worried about the commute to Rohini. But Cerebrum's hybrid mode was perfect - I attended weekend classes at the center and weekday sessions online. The online classes are as good as offline - live interaction, doubt sessions, everything! Improved from 495 to 658 and got UCMS Delhi!",
  },
  {
    name: 'Sneha Gupta',
    residence: 'Sector 6, Dwarka',
    school: 'Delhi Public School, Dwarka',
    beforeScore: 520,
    afterScore: 672,
    improvement: 152,
    neetRank: 'AIR 1,420',
    college: 'MAMC Delhi',
    year: 2024,
    mode: 'Online',
    quote:
      'I chose 100% online classes because of the distance from Dwarka. Best decision ever! The live classes with Dr. Shekhar Sir are so interactive - you can ask questions anytime. The recorded lectures helped me revise before exams. From 520 to 672, I cracked MAMC Delhi completely through online coaching!',
  },
  {
    name: 'Rohit Verma',
    residence: 'Sector 11, Dwarka',
    school: 'Montfort School, Dwarka',
    beforeScore: 480,
    afterScore: 645,
    improvement: 165,
    neetRank: 'AIR 3,200',
    college: 'LHMC Delhi',
    year: 2024,
    mode: 'Offline',
    quote:
      "The metro journey from Dwarka Sector 10 to Rohini was worth every minute. Blue Line to Rajiv Chowk, then Yellow Line to Rohini West - I used that time to revise notes on my phone! The small batch of 15 students meant personal attention. From 480 to 645, I'm now at Lady Hardinge!",
  },
]

const onlineFeatures = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Real-time sessions with Dr. Shekhar Sir, not recorded videos',
  },
  {
    icon: MessageCircle,
    title: 'Instant Doubt Resolution',
    description: 'Ask questions during class, get answers immediately',
  },
  {
    icon: Monitor,
    title: 'HD Video Quality',
    description: 'Crystal clear whiteboard explanations and diagrams',
  },
  {
    icon: Wifi,
    title: 'Recorded Backup',
    description: '24/7 access to recorded lectures for revision',
  },
  {
    icon: Globe,
    title: 'Weekly Online Tests',
    description: 'Regular assessments with detailed performance analysis',
  },
  {
    icon: Users,
    title: 'Small Online Batches',
    description: 'Limited students ensure personal attention even online',
  },
]

export default function PageContent({ faqs }: PageContentProps) {
  const handleDemoBooking = () => {
    if (
      typeof window !== 'undefined' &&
      (window as typeof globalThis & { gtag?: (...args: unknown[]) => void }).gtag
    ) {
      ;(window as typeof globalThis & { gtag?: (...args: unknown[]) => void }).gtag?.(
        'event',
        'demo_booking_dwarka_sector_10',
        {
          event_category: 'conversion',
          event_label: 'neet_coaching_dwarka_sector_10',
          value: 1,
        }
      )
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center max-w-5xl mx-auto animate-fadeInUp">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Monitor className="w-5 h-5 mr-2 text-green-300" />
              Online Classes Available for Dwarka Students
            </div>

            <h1 className="hero-title text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Best <span className="text-yellow-300">NEET Coaching for Dwarka Sector 10</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Sector 6 - Sector 7 - Sector 10 - Sector 11 - Sector 12 - Sector 21
            </h2>

            <p className="hero-description text-lg md:text-xl opacity-80 mb-8 max-w-4xl mx-auto speakable-intro">
              Join Delhi's most trusted NEET Biology coaching. Dwarka students can attend via{' '}
              <strong>Online Classes</strong> or visit our Rohini center (25-30 min via Blue Line +
              Yellow Line). AIIMS faculty, 98% success rate, small batches of 15-20 students.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="https://wa.me/918826444334?text=Hi%2C%20I%27m%20from%20Dwarka%20Sector%2010%20and%20interested%20in%20NEET%20Biology%20coaching.%20Please%20share%20details%20about%20online%20and%20offline%20options."
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
                  className="border-white text-white hover:bg-white hover:text-blue-900"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </a>
            </div>

            {/* Online Classes Highlight */}
            <div className="online-highlight bg-green-500/20 backdrop-blur-sm rounded-2xl p-6 max-w-3xl mx-auto mb-8 border border-green-400/30 animate-fadeInUp">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Globe className="w-8 h-8 text-green-300" />
                <span className="text-xl font-bold text-green-300">
                  Online Classes - Study from Home!
                </span>
              </div>
              <p className="text-white/90">
                <strong>Live Interactive Classes</strong> with Dr. Shekhar Sir |
                <strong> Recorded Lectures</strong> for revision | <strong>Weekly Tests</strong>{' '}
                with analysis
                <br />
                <span className="text-green-200">
                  40+ Dwarka students already enrolled in online mode!
                </span>
              </p>
            </div>

            {/* Metro Connectivity Info */}
            <div className="bg-blue-500/20 backdrop-blur-sm rounded-2xl p-4 max-w-2xl mx-auto mb-8 border border-blue-400/30 animate-fadeInUp">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Train className="w-6 h-6 text-blue-300" />
                <span className="text-lg font-bold text-blue-300">
                  Or Visit Rohini Center via Metro
                </span>
              </div>
              <p className="text-white/80 text-sm">
                <strong>Blue Line:</strong> Dwarka Sector 10 → Rajiv Chowk |{' '}
                <strong>Yellow Line:</strong> Rajiv Chowk → Rohini West
                <br />
                <span className="text-blue-200">
                  Total: 25-30 minutes | 2-min walk from Rohini West Metro
                </span>
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
          <QuickAnswers locality="Dwarka Sector 10" />
        </div>
      </section>

      {/* Online Classes Section - Prominently Featured */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Globe className="w-4 h-4 mr-2" />
              Most Popular for Dwarka Students
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Online NEET Classes - Study from Dwarka!
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              No travel hassle! 40+ Dwarka students already enrolled in our online program. Same
              quality teaching, same results - from the comfort of your home.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {onlineFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-all animate-fadeInUp"
              >
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-200 animate-fadeInUp">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Why Dwarka Students Love Our Online Classes
                </h3>
                <ul className="space-y-3">
                  {[
                    'Save 1-2 hours daily on commute',
                    'Same faculty teaches online and offline',
                    'Live doubt sessions - ask anytime',
                    'Recorded lectures for unlimited revision',
                    'Weekly online tests with detailed analysis',
                    'Personal mentor assigned for progress tracking',
                    '650+ average score by online students',
                    'Same fee as offline - no extra cost',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center">
                <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
                  <div className="text-6xl font-bold text-green-600 mb-2">40+</div>
                  <p className="text-xl text-gray-700 mb-4">Dwarka students in online mode</p>
                  <p className="text-gray-600 mb-6">
                    Average improvement: <strong className="text-green-600">155+ marks</strong>
                  </p>
                  <a
                    href="https://wa.me/918826444334?text=Hi%2C%20I%27m%20from%20Dwarka%20and%20interested%20in%20ONLINE%20NEET%20coaching.%20Please%20share%20details."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Enquire About Online Classes
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metro Connectivity Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Train className="w-4 h-4 mr-2" />
              For Offline Classes
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Metro Route from Dwarka Sector 10 to Rohini
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Prefer attending classes in person? Our Rohini center is just 25-30 minutes away via
              Delhi Metro.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Metro Journey Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-8 border border-blue-100 animate-fadeInUp">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Train className="w-8 h-8 text-blue-600" />
                Your Metro Journey
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-blue-100 rounded-lg p-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Dwarka Sector 10 Metro</p>
                    <p className="text-sm text-gray-600">Board Blue Line towards Vaishali/Noida</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="flex flex-col items-center">
                    <div className="w-1 h-8 bg-blue-400"></div>
                    <span className="text-xs text-gray-500 my-1">~15 min</span>
                    <div className="w-1 h-8 bg-blue-400"></div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-purple-100 rounded-lg p-4">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Rajiv Chowk Metro (Interchange)</p>
                    <p className="text-sm text-gray-600">
                      Change to Yellow Line towards Samaypur Badli
                    </p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="flex flex-col items-center">
                    <div className="w-1 h-8 bg-yellow-400"></div>
                    <span className="text-xs text-gray-500 my-1">~12 min</span>
                    <div className="w-1 h-8 bg-yellow-400"></div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-green-100 rounded-lg p-4">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Rohini West Metro</p>
                    <p className="text-sm text-gray-600">2-minute walk to Cerebrum Academy</p>
                  </div>
                </div>

                <div className="bg-indigo-100 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-indigo-700">25-30 Minutes Total</p>
                  <p className="text-sm text-gray-600">
                    Many students use travel time for revision!
                  </p>
                </div>
              </div>
            </div>

            {/* Why Travel is Worth It */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 animate-fadeInUp">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Award className="w-8 h-8 text-purple-600" />
                Why Students Still Choose Offline
              </h3>

              <div className="space-y-4">
                {[
                  {
                    icon: GraduationCap,
                    title: 'In-Person Interaction',
                    desc: 'Direct face-to-face learning with Dr. Shekhar Sir',
                  },
                  {
                    icon: Users,
                    title: 'Peer Learning',
                    desc: 'Study group discussions with motivated batch-mates',
                  },
                  {
                    icon: Trophy,
                    title: 'Library Access',
                    desc: 'Use our study room and reference materials',
                  },
                  {
                    icon: Clock,
                    title: 'Dedicated Study Environment',
                    desc: 'Distraction-free learning away from home',
                  },
                  {
                    icon: Star,
                    title: 'Practical Sessions',
                    desc: 'Lab demos and hands-on Biology learning',
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-gray-600 mb-4">
                  <strong>Hybrid Mode Available:</strong> Attend weekends at center + weekdays
                  online
                </p>
                <Link href="/demo-booking">
                  <Button variant="primary" size="lg" className="w-full">
                    <Play className="w-5 h-5 mr-2" />
                    Book Free Demo at Rohini Center
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dwarka Sectors Grid */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <div className="inline-flex items-center bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Home className="w-4 h-4 mr-2" />
              Students from All Dwarka Sectors
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              85+ Students from Dwarka Trust Cerebrum
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We serve students from every sector in Dwarka. Most choose our online or hybrid mode
              for convenience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dwarkaSectors.map((sector, index) => (
              <div
                key={sector.name}
                className="bg-white rounded-xl shadow-lg p-6 border border-indigo-100 hover:shadow-xl transition-all animate-fadeInUp"
              >
                <div className="flex items-center justify-between mb-4">
                  <Building2 className="w-8 h-8 text-indigo-600" />
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-bold">
                    {sector.students} Students
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Dwarka {sector.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{sector.description}</p>
                <div className="flex flex-wrap gap-2">
                  {sector.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-full"
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
        subtitle="Boost your NEET preparation with our AI-powered tools - 100% Free for Dwarka students"
        showAllLink={true}
      />

      {/* Student Testimonials */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Trophy className="w-4 h-4 mr-2" />
              Success Stories from Dwarka
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Real Results from Dwarka Students
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Read how students from different Dwarka sectors transformed their NEET scores - both
              online and offline
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
                    <p className="text-xs text-indigo-600 font-medium mt-1">{story.residence}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">
                      {story.year}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        story.mode === 'Online'
                          ? 'bg-blue-100 text-blue-700'
                          : story.mode === 'Hybrid'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {story.mode} Mode
                    </span>
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
                <div className="flex items-center justify-between bg-indigo-50 rounded-lg p-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">NEET Rank</p>
                    <p className="text-lg font-bold text-indigo-900">{story.neetRank}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600 mb-1">College</p>
                    <p className="text-sm font-bold text-indigo-900">{story.college}</p>
                  </div>
                </div>

                {/* Quote */}
                <div className="border-l-4 border-indigo-500 pl-4 py-2">
                  <p className="text-sm text-gray-700 leading-relaxed italic">
                    &quot;{story.quote}&quot;
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 animate-fadeInUp">
            <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full text-sm font-semibold">
              <Award className="w-5 h-5 mr-2" />
              Average improvement: 155+ marks | 85+ students from Dwarka qualified NEET
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
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
                <div className="relative aspect-video bg-gray-100">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={`${video.student} NEET Success Story`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{video.student}</h3>
                  <p className="text-green-600 font-semibold mb-1">{video.score}</p>
                  <p className="text-gray-600 text-sm mb-1">{video.achievement}</p>
                  <p className="text-purple-600 text-xs font-medium">{video.percentile}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center animate-fadeInUp">
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
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Students from Top Schools in Dwarka
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We coach students from prestigious schools across Dwarka sub-city
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nearbySchools.map((school, index) => (
              <div
                key={school.name}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 animate-fadeInUp"
              >
                <div className="flex items-center mb-3">
                  <School className="w-8 h-8 text-blue-600 mr-3" />
                  <div>
                    <h3 className="font-bold text-gray-900">{school.name}</h3>
                    <p className="text-sm text-gray-500">{school.location}</p>
                  </div>
                </div>
                <div className="text-sm text-blue-600 font-medium">
                  {school.students} students from this school
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Dwarka Students Choose Cerebrum
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Online classes - Study from home',
              'AIIMS-trained expert faculty',
              'Hybrid mode available',
              'Small batches (15-20 students)',
              'Weekend & evening batches',
              '98% NEET success rate',
              'Personalized mentoring',
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
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Dwarka Families
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See what students and parents from Dwarka are saying about us
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Google Rating Card */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl p-8 border border-blue-100 animate-fadeInUp">
              <div className="flex items-center justify-center mb-6">
                <img
                  src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                  alt="Google Reviews rating for Cerebrum Biology Academy"
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
                <p className="text-sm text-gray-500">Verified reviews from students and parents</p>
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

            {/* Reviews from Dwarka */}
            <div className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl shadow-xl p-8 border border-indigo-100 animate-fadeInUp">
              <h3 className="font-bold text-gray-900 text-xl mb-6 flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-indigo-600" />
                Reviews from Dwarka Families
              </h3>
              <div className="space-y-5">
                {[
                  {
                    text: "Best NEET coaching for Dwarka students! My daughter enrolled in online classes and she's loving it. No travel hassle, same quality teaching. She improved from 510 to 652 in just 8 months!",
                    author: 'Parent',
                    location: 'Sector 10, Dwarka',
                    rating: 5,
                  },
                  {
                    text: 'The hybrid mode is perfect for us. Weekend classes at Rohini center and weekday sessions online. My son from DAV Dwarka is now confident about NEET 2026. Highly recommend!',
                    author: 'Rakesh Kumar',
                    location: 'Sector 6, Dwarka',
                    rating: 5,
                  },
                  {
                    text: 'I was skeptical about online coaching but Cerebrum proved me wrong. Live interactive classes, instant doubt clearing, weekly tests - everything is top quality. 100% satisfied!',
                    author: 'Meera S.',
                    location: 'Sector 11, Dwarka',
                    rating: 5,
                  },
                ].map((review, index) => (
                  <div key={index} className="border-l-4 border-indigo-500 pl-4 py-2">
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
          <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-xl overflow-hidden border border-green-100 animate-fadeInUp">
            <div className="grid lg:grid-cols-2">
              {/* Map */}
              <div className="relative h-96 lg:h-auto bg-gray-100">
                <LazyGoogleMap
                  embedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.8!2d77.1025!3d28.7041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDQyJzE0LjgiTiA3N8KwMDYnMDkuMCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  title="Cerebrum Biology Academy - NEET Coaching for Dwarka Sector 10"
                  height="100%"
                  placeholder={{
                    lat: 28.7041,
                    lng: 77.1025,
                    address: '211 Vikas Surya Tower, DC Chauk, Rohini - Near Rohini West Metro',
                  }}
                />
              </div>

              {/* Contact Details */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Get Started with Cerebrum</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <Globe className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Online Classes</p>
                      <p className="text-gray-600 leading-relaxed">
                        Live interactive sessions from home
                        <br />
                        <span className="text-green-600 font-medium">
                          Most popular with Dwarka students!
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Offline Address</p>
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
                    <Train className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Metro Connectivity</p>
                      <p className="text-gray-600">
                        <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium mr-1">
                          Blue Line
                        </span>
                        +
                        <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium mx-1">
                          Yellow Line
                        </span>
                        <br />
                        <span className="text-blue-600 font-medium text-sm mt-1 inline-block">
                          Dwarka Sector 10 → Rohini West (25-30 min)
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
                      <p className="text-sm text-gray-500 mt-1">
                        Open 24/7 — Online Classes Available Globally
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <a
                      href="https://wa.me/918826444334?text=Hi%2C%20I%27m%20from%20Dwarka%20Sector%2010%20and%20interested%20in%20NEET%20Biology%20coaching.%20Please%20share%20details."
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
                      className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors justify-center"
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
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NEET Coaching Dwarka Sector 10 - FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md animate-fadeInUp">
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
                label: '85+ Students',
                sublabel: 'From Dwarka',
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
                icon: Globe,
                label: 'Online + Offline',
                sublabel: 'Flexible Learning',
                color: 'text-indigo-600',
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
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="animate-fadeInUp">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2 text-yellow-300" />
              Limited Seats Available - Online & Offline
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Your NEET Journey from Dwarka Today!
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Choose Online Classes for convenience or Hybrid Mode for the best of both. Book your
              free demo now!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/918826444334?text=Hi%2C%20I%27m%20from%20Dwarka%20and%20want%20to%20book%20a%20FREE%20NEET%20Biology%20demo%20class.%20I%20prefer%20ONLINE%20classes."
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
                  className="border-white text-white hover:bg-white hover:text-blue-700"
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
        href="https://wa.me/918826444334?text=Hi%2C%20I%27m%20from%20Dwarka%20Sector%2010%20and%20interested%20in%20NEET%20Biology%20coaching.%20Please%20share%20details%20about%20online%20and%20offline%20options."
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
            name: 'Cerebrum Biology Academy - NEET Coaching for Dwarka Sector 10',
            description:
              'Best NEET coaching for Dwarka Sector 10 students. Online + Offline classes available. 25-30 min from Rohini via Metro. 98% success rate, AIIMS faculty.',
            url: 'https://cerebrumbiologyacademy.com/neet-coaching-dwarka-sector-10',
            areaServed: [
              'Dwarka Sector 10',
              'Dwarka Sector 6',
              'Dwarka Sector 7',
              'Dwarka Sector 11',
              'Dwarka Sector 12',
              'Dwarka Sector 21',
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
      <PricingSection cityName="Dwarka Sector 10" />
      <CostComparisonSection cityName="Dwarka Sector 10" />
      <RelatedCityLinks currentCity="dwarka-sector-10" variant="default" />
    </div>
  )
}
