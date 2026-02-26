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
  BookOpen,
  Target,
  Calendar,
  Repeat,
  Briefcase,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { QuickAnswers } from '@/components/seo/QuickAnswers'
import { LazyGoogleMap } from '@/components/performance/LazyGoogleMap'
import { CEREBRUM_METRICS } from '@/lib/constants/metrics'
import { CityBreadcrumb } from '@/components/city/CityBreadcrumb'
import { PricingSection } from '@/components/city/PricingSection'
import { CostComparisonSection } from '@/components/city/CostComparisonSection'
import { RelatedCityLinks } from '@/components/seo/RelatedCityLinks'

const duColleges = [
  {
    name: 'Hansraj College',
    slug: 'hansraj',
    description: 'Premier science college with strong Biology department',
    highlights: ['NAAC A++', 'Top BSc Biology', 'Research Focus'],
    students: '800+',
    type: 'premier',
  },
  {
    name: 'Hindu College',
    slug: 'hindu',
    description: 'One of the oldest and most prestigious DU colleges',
    highlights: ['Historic College', 'Strong Alumni', 'Academic Excellence'],
    students: '600+',
    type: 'premier',
  },
  {
    name: 'Miranda House',
    slug: 'miranda-house',
    description: "India's top women's college for science",
    highlights: ["#1 Women's College", 'NAAC A++', 'BSc Life Sciences'],
    students: '5,000+',
    type: 'premier',
  },
  {
    name: 'Kirori Mal College',
    slug: 'kirori-mal',
    description: 'Excellent Life Sciences and Zoology programs',
    highlights: ['Strong Science', 'Active Societies', 'Campus Life'],
    students: '450+',
    type: 'premier',
  },
  {
    name: 'Ramjas College',
    slug: 'ramjas',
    description: 'Well-known for academic rigor and campus culture',
    highlights: ['Academic Excellence', 'Diverse Programs', 'Sports Culture'],
    students: '400+',
    type: 'regular',
  },
  {
    name: 'SRCC',
    slug: 'srcc',
    description: 'Though commerce-focused, has aspiring NEET students',
    highlights: ['Top Commerce', 'Diverse Students', 'Career Changers'],
    students: '100+',
    type: 'other',
  },
]

const batchOptions = [
  {
    name: 'Evening Batch',
    timing: '6:00 PM - 8:00 PM',
    days: 'Monday to Friday',
    icon: Clock,
    description: 'Perfect for BSc students after college hours',
    ideal: 'Current DU students',
    color: 'purple',
  },
  {
    name: 'Weekend Batch',
    timing: '10:00 AM - 2:00 PM',
    days: 'Saturday & Sunday',
    icon: Calendar,
    description: 'Complete syllabus coverage on weekends only',
    ideal: 'Busy college schedules',
    color: 'blue',
  },
  {
    name: 'Dropper Intensive',
    timing: '9:00 AM - 1:00 PM',
    days: 'Monday to Saturday',
    icon: Target,
    description: 'Full-day focused preparation for repeaters',
    ideal: 'Gap year students',
    color: 'orange',
  },
  {
    name: 'Hybrid Mode',
    timing: 'Flexible',
    days: 'Online + Weekend Offline',
    icon: Repeat,
    description: 'Online classes with weekend offline sessions',
    ideal: 'Maximum flexibility',
    color: 'green',
  },
]

const stats = [
  { label: 'DU Students Trained', value: '1,500+' },
  { label: 'Success Rate', value: `${CEREBRUM_METRICS.successRateText}` },
  { label: 'BSc to MBBS Conversions', value: '200+' },
  { label: 'Avg Score Improvement', value: '150+' },
]

const faqs = [
  {
    question: 'Can BSc students prepare for NEET while studying at Delhi University?',
    answer: `Absolutely! Many BSc Biology students from DU colleges successfully prepare for NEET alongside their graduation. We offer specialized evening batches (6-8 PM) and weekend classes specifically designed for college students. Your BSc Biology curriculum actually strengthens your NEET foundation.`,
  },
  {
    question: 'Which is the best NEET coaching near DU North Campus?',
    answer: `Cerebrum Biology Academy is the top choice for NEET coaching near DU North Campus with ${CEREBRUM_METRICS.successRateText} success rate. We are easily accessible from Vishwavidyalaya Metro (10 min) and offer specialized batches for BSc students and NEET repeaters.`,
  },
  {
    question: 'Do you offer evening batches for DU college students?',
    answer: `Yes! We have dedicated evening batches from 6-8 PM specifically designed for DU students. These batches start after college hours, allowing you to attend regular classes at Hansraj, Hindu, Miranda House, or other DU colleges.`,
  },
  {
    question: 'Is NEET coaching available for NEET repeaters near Delhi University?',
    answer: `Yes, we have specialized dropper/repeater batches for students who are taking a gap year. We offer full-day batches for droppers and evening batches for those pursuing BSc simultaneously. Average improvement is 150+ marks.`,
  },
  {
    question: 'What is the fee for NEET coaching for DU students?',
    answer: `Our comprehensive NEET biology course fee is Rs.${CEREBRUM_METRICS.feeClass12.toLocaleString()}/year. Special discounts for DU students. EMI and scholarships up to 50% available.`,
  },
  {
    question: 'How far is Cerebrum from Vishwavidyalaya Metro?',
    answer: `Our center is conveniently located just 10-12 minutes from Vishwavidyalaya Metro station. Easy access via auto or short bus ride. Well-connected from GTB Nagar Metro too.`,
  },
]

const freeTools = [
  {
    name: 'NEET Mock Tests',
    description: 'Full-length NEET pattern tests with detailed analysis',
    icon: Target,
    link: '/free-neet-mock-test',
  },
  {
    name: 'Chapter-wise MCQs',
    description: '10,000+ NEET Biology MCQs with solutions',
    icon: BookOpen,
    link: '/neet-biology-mcq',
  },
  {
    name: 'NCERT Solutions',
    description: 'Complete NCERT Biology solutions for Class 11 & 12',
    icon: GraduationCap,
    link: '/ncert-biology-solutions',
  },
  {
    name: 'Previous Year Papers',
    description: 'Last 10 years NEET Biology papers with answers',
    icon: Award,
    link: '/neet-previous-year-papers',
  },
]

export default function PageContent() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_du_north_campus', {
        event_category: 'conversion',
        event_label: 'neet_coaching_du_north_campus',
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
          <div className="text-center max-w-5xl mx-auto animate-fadeInUp">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <GraduationCap className="w-5 h-5 mr-2 text-yellow-300" />
              Specialized NEET Coaching for DU Students
            </div>

            <h1 className="hero-title text-4xl md:text-6xl font-bold mb-6 leading-tight">
              NEET Coaching Near <span className="text-yellow-300">DU North Campus</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Biology Classes for BSc Students & NEET Repeaters
            </h2>

            <p className="hero-description text-lg md:text-xl opacity-80 mb-8 max-w-4xl mx-auto">
              Join specialized NEET coaching designed for Delhi University students. Evening &
              weekend batches for Hansraj, Hindu, Miranda House, Kirori Mal, and Ramjas students.
              {CEREBRUM_METRICS.successRateText} success rate. Flexible timings that fit your
              college schedule.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
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

              <a
                href={`https://wa.me/91${CEREBRUM_METRICS.phone.replace(/[^0-9]/g, '')}?text=Hi%2C%20I%27m%20a%20DU%20student%20interested%20in%20NEET%20Biology%20coaching.%20Please%20share%20details%20about%20evening%20batches.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-green-500 hover:border-green-500"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp: {CEREBRUM_METRICS.phoneDisplay}
                </Button>
              </a>

              <a href={`tel:${CEREBRUM_METRICS.phone}`}>
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

      {/* Metro Connectivity Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-white">
            <div className="flex items-center gap-3">
              <Train className="w-8 h-8" />
              <div>
                <p className="font-bold text-lg">Vishwavidyalaya Metro</p>
                <p className="text-sm opacity-90">Yellow Line - 10 min away</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/30" />
            <div className="flex items-center gap-3">
              <MapPin className="w-8 h-8" />
              <div>
                <p className="font-bold text-lg">GTB Nagar Metro</p>
                <p className="text-sm opacity-90">Yellow Line - 12 min away</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/30" />
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8" />
              <div>
                <p className="font-bold text-lg">Evening & Weekend</p>
                <p className="text-sm opacity-90">Batches after college hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Answers Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <QuickAnswers locality="DU North Campus" />
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Users className="w-4 h-4 mr-2" />
              Who Should Join?
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NEET Coaching for Every DU Aspirant
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whether you're a current BSc student, a NEET repeater, or preparing for your first
              attempt
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* BSc Biology Students */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-200 hover:border-purple-400 transition-colors animate-fadeInUp">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-purple-100 p-4 rounded-xl">
                  <GraduationCap className="w-8 h-8 text-purple-600" />
                </div>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-bold">
                  MOST POPULAR
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">BSc Biology Students</h3>
              <p className="text-gray-600 mb-6">
                Currently pursuing BSc Life Sciences, Botany, Zoology, or Microbiology at DU
                colleges
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  'Evening batches (6-8 PM)',
                  'Weekend-only option available',
                  'BSc syllabus overlaps with NEET',
                  'Manage both exams efficiently',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/demo-booking">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Join Evening Batch
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* NEET Repeaters */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-orange-200 hover:border-orange-400 transition-colors animate-fadeInUp">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-orange-100 p-4 rounded-xl">
                  <Repeat className="w-8 h-8 text-orange-600" />
                </div>
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-bold">
                  INTENSIVE
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">NEET Repeaters</h3>
              <p className="text-gray-600 mb-6">
                Droppers taking a gap year or students who want to improve their previous NEET score
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  'Full-day intensive batches',
                  'Personalized weak area focus',
                  '150+ marks avg improvement',
                  '10,000+ MCQ practice bank',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/demo-booking">
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  Join Dropper Batch
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Career Changers */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-200 hover:border-blue-400 transition-colors animate-fadeInUp">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-blue-100 p-4 rounded-xl">
                  <Briefcase className="w-8 h-8 text-blue-600" />
                </div>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold">
                  FLEXIBLE
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Working Professionals</h3>
              <p className="text-gray-600 mb-6">
                Graduates or working professionals who want to pursue medicine as a career change
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  'Weekend-only batches available',
                  'Online + Offline hybrid mode',
                  'Recorded lectures for revision',
                  'Flexible doubt sessions',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/demo-booking">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Join Weekend Batch
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DU Colleges Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Students from Top DU North Campus Colleges
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We coach BSc Biology students from all major Delhi University colleges
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {duColleges.map((college, index) => (
              <div
                key={college.slug}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100 hover:shadow-lg transition-all duration-300 animate-fadeInUp"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    {college.type === 'premier' && (
                      <Building2 className="w-6 h-6 text-purple-600 mr-2" />
                    )}
                    {college.type === 'regular' && (
                      <School className="w-6 h-6 text-blue-600 mr-2" />
                    )}
                    {college.type === 'other' && (
                      <GraduationCap className="w-6 h-6 text-green-600 mr-2" />
                    )}
                    <h3 className="font-bold text-gray-900 text-lg">{college.name}</h3>
                  </div>
                  <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2 py-1 rounded-full">
                    {college.students}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{college.description}</p>
                <div className="flex flex-wrap gap-2">
                  {college.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="bg-white text-purple-700 text-xs px-2 py-1 rounded-full border border-purple-200"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 animate-fadeInUp">
            <p className="text-gray-600 text-lg">
              Students from <strong>St. Stephen's, Daulat Ram, Gargi, Dyal Singh</strong> and other
              DU colleges also join us for NEET preparation
            </p>
          </div>
        </div>
      </section>

      {/* Batch Timings Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Clock className="w-4 h-4 mr-2" />
              Flexible Batch Options
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Batch Timings Designed for College Students
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose a batch that fits your college schedule - we have options for everyone
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {batchOptions.map((batch, index) => (
              <div
                key={batch.name}
                className={`bg-white rounded-xl shadow-lg p-6 border-t-4 hover:shadow-xl transition-all duration-300 ${
                  batch.color === 'purple'
                    ? 'border-purple-500'
                    : batch.color === 'blue'
                      ? 'border-blue-500'
                      : batch.color === 'orange'
                        ? 'border-orange-500'
                        : 'border-green-500'
                }`}
              >
                <div
                  className={`inline-flex p-3 rounded-xl mb-4 ${
                    batch.color === 'purple'
                      ? 'bg-purple-100'
                      : batch.color === 'blue'
                        ? 'bg-blue-100'
                        : batch.color === 'orange'
                          ? 'bg-orange-100'
                          : 'bg-green-100'
                  }`}
                >
                  <batch.icon
                    className={`w-6 h-6 ${
                      batch.color === 'purple'
                        ? 'text-purple-600'
                        : batch.color === 'blue'
                          ? 'text-blue-600'
                          : batch.color === 'orange'
                            ? 'text-orange-600'
                            : 'text-green-600'
                    }`}
                  />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{batch.name}</h3>
                <div className="mb-4">
                  <p
                    className={`text-2xl font-bold ${
                      batch.color === 'purple'
                        ? 'text-purple-600'
                        : batch.color === 'blue'
                          ? 'text-blue-600'
                          : batch.color === 'orange'
                            ? 'text-orange-600'
                            : 'text-green-600'
                    }`}
                  >
                    {batch.timing}
                  </p>
                  <p className="text-sm text-gray-500">{batch.days}</p>
                </div>
                <p className="text-gray-600 text-sm mb-4">{batch.description}</p>
                <div className="bg-gray-50 rounded-lg px-3 py-2">
                  <p className="text-xs text-gray-500">Ideal for:</p>
                  <p className="text-sm font-medium text-gray-900">{batch.ideal}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free NEET Tools Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <BookOpen className="w-4 h-4 mr-2" />
              Free NEET Resources
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Free NEET Biology Tools for DU Students
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start your NEET preparation with our free resources - no registration required
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {freeTools.map((tool, index) => (
              <div key={tool.name} className="animate-fadeInUp">
                <Link href={tool.link}>
                  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-green-100 group h-full">
                    <div className="bg-green-100 p-3 rounded-xl inline-flex mb-4 group-hover:bg-green-200 transition-colors">
                      <tool.icon className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-green-600 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                    <div className="flex items-center text-green-600 font-medium text-sm">
                      Access Free
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
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
              Why DU Students Choose Cerebrum?
            </h2>
            <p className="text-lg opacity-90">
              Specialized features designed for Delhi University students
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Evening batches after college hours (6-8 PM)',
              'Weekend-only batches available',
              'BSc syllabus complements NEET preparation',
              'Small batch size (15-20 students)',
              'AIIMS-trained expert faculty',
              'Flexible hybrid mode (Online + Offline)',
              '10 min from Vishwavidyalaya Metro',
              'Special discounts for DU students',
              'Dropper/Repeater intensive batches',
              '150+ marks average improvement',
              'Personalized mentoring & doubt sessions',
              'Comprehensive NCERT-focused material',
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

      {/* Success Stories */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Trophy className="w-4 h-4 mr-2" />
              Success Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              DU Students Who Cracked NEET
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real transformation stories of BSc students and repeaters who achieved their MBBS
              dream
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Priya Sharma',
                college: 'Miranda House (BSc Zoology)',
                location: 'North Campus',
                beforeScore: 480,
                afterScore: 645,
                improvement: 165,
                neetRank: 'AIR 3,200',
                medicalCollege: 'Lady Hardinge Medical College',
                year: 2024,
                quote:
                  "Balancing BSc and NEET seemed impossible until I joined Cerebrum's evening batch. The 6-8 PM timing was perfect after my Miranda House classes. The faculty understood that BSc Zoology covers many NEET topics, so they focused on filling gaps rather than repeating everything. I improved from 480 to 645 and got into Lady Hardinge!",
              },
              {
                name: 'Rahul Verma',
                college: 'Hansraj College (BSc Life Sciences)',
                location: 'Repeater - 2nd Attempt',
                beforeScore: 520,
                afterScore: 668,
                improvement: 148,
                neetRank: 'AIR 1,850',
                medicalCollege: 'UCMS Delhi',
                year: 2024,
                quote:
                  'After scoring 520 in my first attempt while at Hansraj, I knew I needed specialized coaching. The dropper batch at Cerebrum was intense but exactly what I needed. The personalized weak area analysis helped me focus on Botany and Human Physiology. The weekly mock tests built my confidence. I jumped to 668 and secured UCMS!',
              },
              {
                name: 'Ananya Gupta',
                college: 'Hindu College (BSc Botany)',
                location: 'North Campus',
                beforeScore: 510,
                afterScore: 655,
                improvement: 145,
                neetRank: 'AIR 2,400',
                medicalCollege: 'MAMC Delhi',
                year: 2024,
                quote:
                  'I was skeptical about preparing for NEET during BSc, but the weekend batch made it possible. Saturday-Sunday classes covered the entire syllabus without affecting my Hindu College studies. The study material was concise and NCERT-focused. My BSc Botany knowledge actually helped in NEET. Scored 655 and got MAMC!',
              },
            ].map((story, index) => (
              <div
                key={story.name}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-300 animate-fadeInUp"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{story.name}</h3>
                    <p className="text-sm text-gray-600">{story.college}</p>
                    <p className="text-xs text-purple-600 font-medium mt-1">{story.location}</p>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">
                    {story.year}
                  </div>
                </div>

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

                <div className="flex items-center justify-between bg-purple-50 rounded-lg p-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">NEET Rank</p>
                    <p className="text-lg font-bold text-purple-900">{story.neetRank}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600 mb-1">College</p>
                    <p className="text-sm font-bold text-purple-900">{story.medicalCollege}</p>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <p className="text-sm text-gray-700 leading-relaxed italic">
                    &quot;{story.quote}&quot;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews & Map Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by DU Students & Parents
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See what students from Hansraj, Hindu, Miranda House say about us
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Google Rating Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 animate-fadeInUp">
              <div className="flex items-center justify-center mb-6">
                <img
                  src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                  alt="Google Reviews rating for Cerebrum Biology Academy"
                  className="h-10"
                />
              </div>
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-gray-900 mb-3">
                  {CEREBRUM_METRICS.ratingText}
                </div>
                <div className="flex items-center justify-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-7 h-7 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 font-semibold text-lg mb-2">
                  Based on {CEREBRUM_METRICS.reviewCountText}
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
                  Read All Reviews
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 animate-fadeInUp">
              <h3 className="font-bold text-gray-900 text-xl mb-6 flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-purple-600" />
                Reviews from DU Students
              </h3>
              <div className="space-y-5">
                {[
                  {
                    text: "Perfect for Hansraj students! Evening batch timing (6-8 PM) fits perfectly after college. Faculty understands BSc syllabus overlap and focuses on what's extra for NEET. Scored 655 while managing both.",
                    author: 'Aditya R.',
                    location: 'Hansraj College',
                    rating: 5,
                  },
                  {
                    text: 'After failing NEET twice, I was losing hope. The dropper batch here changed everything. Personalized attention, weekly tests, and motivation from Dr. Shekhar Sir helped me score 640. Now at MAMC!',
                    author: 'Sneha M.',
                    location: 'NEET Repeater',
                    rating: 5,
                  },
                  {
                    text: 'Weekend batch is a lifesaver for Miranda House students. Covered full syllabus on Saturdays-Sundays. The study material is concise and NCERT-focused. Highly recommend for DU students!',
                    author: 'Riya S.',
                    location: 'Miranda House',
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
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 animate-fadeInUp">
            <div className="grid lg:grid-cols-2">
              <div className="relative h-96 lg:h-auto bg-gray-100">
                <LazyGoogleMap
                  embedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.5283752539247!2d77.20888621508392!3d28.68693308239895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xcdee88e47393c3f1!2sDelhi%20University!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  title="NEET Coaching Near DU North Campus"
                  height="100%"
                  placeholder={{
                    lat: 28.6869,
                    lng: 77.2089,
                    address: 'Near Delhi University North Campus',
                  }}
                />
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Visit Our Center Near DU North Campus
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <Train className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Metro Connectivity</p>
                      <p className="text-gray-600">
                        <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium mr-1">
                          Yellow Line
                        </span>
                        Vishwavidyalaya Metro (10 min)
                        <br />
                        <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium mr-1 mt-1">
                          Yellow Line
                        </span>
                        GTB Nagar Metro (12 min)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Phone & WhatsApp</p>
                      <a
                        href={`tel:${CEREBRUM_METRICS.phone}`}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {CEREBRUM_METRICS.phoneDisplay}
                      </a>
                      <p className="text-sm text-gray-500 mt-1">Mon-Sat: 9 AM - 8 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Batch Timings</p>
                      <p className="text-gray-600 text-sm">
                        Evening: 6-8 PM (Mon-Fri)
                        <br />
                        Weekend: 10 AM-2 PM (Sat-Sun)
                        <br />
                        Dropper: 9 AM-1 PM (Mon-Sat)
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <a
                      href={`https://wa.me/91${CEREBRUM_METRICS.phone.replace(/[^0-9]/g, '')}?text=Hi%2C%20I%27m%20a%20DU%20student%20interested%20in%20NEET%20coaching.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp Us
                    </a>
                    <a
                      href="https://maps.google.com/?q=Cerebrum+Biology+Academy+Delhi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                    >
                      <MapPin className="w-5 h-5" />
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NEET Coaching for DU Students - FAQs
            </h2>
            <p className="text-lg text-gray-600">
              Common questions from BSc students and NEET repeaters
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 animate-fadeInUp">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your NEET Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join 1,500+ DU students who achieved their MBBS dream with Cerebrum
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

              <a
                href={`https://wa.me/91${CEREBRUM_METRICS.phone.replace(/[^0-9]/g, '')}?text=Hi%2C%20I%27m%20interested%20in%20NEET%20coaching%20for%20DU%20students.%20Please%20share%20details.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-green-500 hover:border-green-500"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat on WhatsApp
                </Button>
              </a>

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
        href={`https://wa.me/91${CEREBRUM_METRICS.phone.replace(/[^0-9]/g, '')}?text=Hi%2C%20I%27m%20a%20DU%20student%20interested%20in%20NEET%20Biology%20coaching.%20Please%20share%20details%20about%20evening%20and%20weekend%20batches.`}
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

      {/* Educational Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'Cerebrum Biology Academy - DU North Campus',
            description: `Best NEET coaching for DU students near Delhi University North Campus. Evening & weekend batches for BSc Biology students and NEET repeaters. ${CEREBRUM_METRICS.successRateText} success rate.`,
            url: 'https://cerebrumbiologyacademy.com/neet-coaching-du-north-campus',
            areaServed: [
              'DU North Campus',
              'Hansraj College',
              'Hindu College',
              'Miranda House',
              'Kirori Mal College',
              'Ramjas College',
              'SRCC',
              'Vishwavidyalaya',
              'GTB Nagar',
            ],
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'North Delhi',
              addressRegion: 'Delhi',
              addressCountry: 'IN',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: CEREBRUM_METRICS.rating,
              bestRating: '5',
              worstRating: '1',
              ratingCount: CEREBRUM_METRICS.reviewCount,
            },
          }),
        }}
      />
      <PricingSection cityName="Du North Campus" />
      <CostComparisonSection cityName="Du North Campus" />
      <RelatedCityLinks currentCity="du-north-campus" variant="default" />
    </div>
  )
}
