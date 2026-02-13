'use client'

import {
  MapPin,
  Users,
  Trophy,
  Star,
  CheckCircle,
  Award,
  BookOpen,
  Clock,
  Shield,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  GraduationCap,
  Building,
  Train,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { RelatedCityLinks } from '@/components/seo/RelatedCityLinks'
import { CitySchema } from '@/components/seo/CitySchema'

const puneLocalities = [
  {
    name: 'Koregaon Park',
    slug: 'koregaon-park',
    students: '240+',
    highlight: 'Premium IT Hub Area',
    priority: 'high',
  },
  {
    name: 'Baner',
    slug: 'baner',
    students: '280+',
    highlight: 'IT Corporate Hub',
    priority: 'high',
  },
  {
    name: 'Hinjewadi',
    slug: 'hinjewadi',
    students: '220+',
    highlight: 'IT Park Zone',
    priority: 'high',
  },
  {
    name: 'Kothrud',
    slug: 'kothrud',
    students: '195+',
    highlight: 'Education District',
    priority: 'high',
  },
  {
    name: 'Aundh',
    slug: 'aundh',
    students: '210+',
    highlight: 'University Area',
    priority: 'high',
  },
  {
    name: 'Viman Nagar',
    slug: 'viman-nagar',
    students: '185+',
    highlight: 'Airport Road',
    priority: 'high',
  },
  {
    name: 'Kalyani Nagar',
    slug: 'kalyani-nagar',
    students: '170+',
    highlight: 'Premium Residential',
    priority: 'high',
  },
  {
    name: 'Wakad',
    slug: 'wakad',
    students: '165+',
    highlight: 'Tech Corridor',
    priority: 'high',
  },
  {
    name: 'Hadapsar',
    slug: 'hadapsar',
    students: '155+',
    highlight: 'Magarpatta & EON',
    priority: 'medium',
  },
  {
    name: 'Pimpri-Chinchwad',
    slug: 'pimpri-chinchwad',
    students: '200+',
    highlight: 'PCMC Region',
    priority: 'high',
  },
  {
    name: 'Shivaji Nagar',
    slug: 'shivaji-nagar',
    students: '145+',
    highlight: 'Central Pune',
    priority: 'medium',
  },
  {
    name: 'Deccan',
    slug: 'deccan',
    students: '140+',
    highlight: 'FC Road Area',
    priority: 'medium',
  },
  {
    name: 'Camp',
    slug: 'camp',
    students: '130+',
    highlight: 'Old Pune Heritage',
    priority: 'medium',
  },
  {
    name: 'Kharadi',
    slug: 'kharadi',
    students: '175+',
    highlight: 'EON IT Park',
    priority: 'medium',
  },
  {
    name: 'Magarpatta',
    slug: 'magarpatta',
    students: '160+',
    highlight: 'IT City Hub',
    priority: 'medium',
  },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Real-time teaching with instant doubt resolution - skip Pune traffic completely',
  },
  {
    icon: Users,
    title: 'Small Batches (10-15)',
    description: 'Exclusive Pune batches with personal attention for every student',
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculties',
    description: 'Expert doctors and teachers trained at premier medical institutions',
  },
  {
    icon: BookOpen,
    title: 'Complete Study Material',
    description: 'NCERT-based notes, previous year questions, mock tests included',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Morning, afternoon, and evening batches to fit Pune IT schedules',
  },
  {
    icon: Shield,
    title: 'No Commute Stress',
    description: 'Save 2+ hours daily on Pune traffic - study from your home',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Top Score 2024', value: '360', icon: Star },
  { label: 'Pune Students', value: '2,800+', icon: Users },
  { label: 'Areas Covered', value: '15+', icon: MapPin },
]

const faqs = [
  {
    question: 'Why choose online coaching over traveling across Pune for NEET preparation?',
    answer:
      'Pune students typically spend 2-3 hours daily in traffic commuting to coaching centers in Deccan or FC Road. Our online live classes deliver quality teaching from AIIMS trained faculties directly to your home. Save time, avoid Pune traffic jams, and focus 100% on NEET preparation. Our 98% success rate proves online is as effective as offline.',
  },
  {
    question: 'Which areas in Pune do you serve?',
    answer:
      'We serve all major Pune localities including Koregaon Park, Baner, Hinjewadi, Kothrud, Aundh, Viman Nagar, Kalyani Nagar, Wakad, Hadapsar, Pimpri-Chinchwad, Shivaji Nagar, Deccan, Camp, Kharadi, Magarpatta, and all surrounding areas. Students from any Pune pincode can join our online live classes.',
  },
  {
    question: 'What is the fee for NEET coaching in Pune?',
    answer:
      'Our complete NEET Biology course ranges from Rs 24,000 to Rs 48,000 per year - significantly lower than premium Pune coaching centers that charge Rs 1.5-2 lakhs. Plus you save on travel costs. We offer EMI options and merit scholarships.',
  },
  {
    question: 'How do live classes work for Pune students?',
    answer:
      'We conduct live interactive classes via Zoom/Google Meet. Ask questions in real-time, participate in discussions, and interact with teachers just like a physical classroom. All classes are recorded for revision. Dedicated Pune batches ensure peer interaction with local students.',
  },
  {
    question: 'Is online coaching effective for competitive exams like NEET?',
    answer:
      'Yes! Our 98% success rate and 67+ AIIMS selections prove that online coaching is highly effective. Pune students particularly benefit as they save commute time for self-study. Our interactive live classes, doubt sessions, and AI-powered practice tests ensure comprehensive preparation.',
  },
]

const premiumSchools = [
  'Symbiosis',
  'SNBP International',
  'VIBGYOR High',
  'Hutchings High',
  "Bishop's School",
  'CJM School',
  "St. Mary's School",
  'Pawar Public School',
  'Vidya Valley',
  'The Orchid School',
]

const whyPune = [
  {
    icon: Building,
    title: 'Quality Without Traffic',
    description:
      'From Kothrud to Hinjewadi, get premium coaching without spending hours in Pune traffic or IT corridor rush.',
  },
  {
    icon: Train,
    title: 'IT Hub Friendly',
    description:
      'Perfect for students whose parents work in Pune IT parks. Attend classes flexibly around family schedules without commute stress.',
  },
  {
    icon: GraduationCap,
    title: 'Education City Expertise',
    description:
      'We understand Maharashtra HSC board patterns, Pune school schedules, and local academic challenges. Personalized support for Pune students.',
  },
]

export default function NeetCoachingPunePage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_pune', {
        event_category: 'conversion',
        event_label: 'neet_coaching_pune_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      <CitySchema
        cityName="Pune"
        citySlug="pune"
        state="Maharashtra"
        localities={puneLocalities.map((l) => l.name)}
        faqs={faqs}
        studentCount="1800"
        coordinates={{ lat: '18.5204', lng: '73.8567' }}
      />
      {/* Hero Section */}
      <section className="relative bg-indigo-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div
            className="text-center max-w-4xl mx-auto animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-5 h-5 mr-2" />
              Serving All Pune Localities
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">NEET Coaching in Pune</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Koregaon Park | Baner | Hinjewadi | Kothrud | Aundh | Viman Nagar | Wakad
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Skip the Pune traffic commute. Get AIIMS trained faculties, 98% success rate, and live
              interactive classes - all from your Pune home. Join 2,800+ Pune students already
              preparing with us.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/courses">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-purple-900"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Course Details
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {successMetrics.map((metric, index) => (
                <div
                  key={metric.label}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 animate-fadeInUp"
                >
                  <metric.icon className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm opacity-80">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pune Localities Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              NEET Coaching Across All Pune Localities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Deccan to Hinjewadi, Kothrud to Magarpatta - we serve students from every corner
              of Pune and PCMC. Click on your locality for location-specific information.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {puneLocalities.map((locality, index) => (
              <div
                key={locality.slug}
               className="animate-fadeInUp">
                <Link href={`/locations/pune/${locality.slug}`}>
                  <div
                    className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer ${
                      locality.priority === 'high' ? 'ring-2 ring-violet-500' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{locality.name}</h3>
                      <MapPin className="w-5 h-5 text-violet-600" />
                    </div>
                    <div className="text-2xl font-bold text-violet-600 mb-1">
                      {locality.students}
                    </div>
                    <div className="text-sm text-gray-500">{locality.highlight}</div>
                    {locality.priority === 'high' && (
                      <div className="mt-2 inline-flex items-center text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded-full">
                        <Star className="w-3 h-3 mr-1" />
                        High Demand Area
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Pune Students Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Pune Students Choose Online NEET Coaching
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop the daily traffic struggle. Premium education delivered to your doorstep.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {whyPune.map((item, index) => (
              <div
                key={item.title}
                className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-8 border border-violet-100 animate-fadeInUp"
              >
                <item.icon className="w-12 h-12 text-violet-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Students from These Pune Schools Trust Us
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {premiumSchools.map((school, index) => (
                <span
                  key={school}
                  className="bg-white text-gray-700 px-4 py-2 rounded-full font-medium shadow-sm animate-fadeInUp"
                >
                  {school}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Cerebrum for NEET Coaching in Pune?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-8 shadow-lg animate-fadeInUp"
              >
                <feature.icon className="w-12 h-12 text-violet-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions - NEET Coaching Pune
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="bg-gray-50 rounded-xl p-8 animate-fadeInUp"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageCircle className="w-6 h-6 mr-3 text-violet-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Cities Section */}
      <RelatedCityLinks currentCity="pune" variant="default" />

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
           className="animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Start Your NEET Journey from Pune Today
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              98% success rate, AIIMS trained faculties, 2,800+ Pune students. No traffic commute
              required!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/enrollment">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-violet-600"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>All Pune Areas</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Live Classes</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>AIIMS Faculty</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>No Commute Needed</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
