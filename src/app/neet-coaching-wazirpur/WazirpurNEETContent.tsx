'use client'

import Link from 'next/link'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { getPhoneLink, getDisplayPhone } from '@/lib/constants/contactInfo'
import {
  MapPin,
  Users,
  Trophy,
  Star,
  CheckCircle,
  Phone,
  Clock,
  BookOpen,
  GraduationCap,
  Video,
  MessageCircle,
  Building,
  ArrowRight,
  Target,
  Navigation,
  Zap,
  Award,
  Brain,
  TrendingUp,
  School,
  Train,
  Sparkles,
} from 'lucide-react'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'

interface FAQ {
  question: string
  answer: string
}

interface WazirpurNEETContentProps {
  faqs: FAQ[]
}

// Wazirpur-specific data
const wazirpurData = {
  cityName: 'Wazirpur',
  slug: 'wazirpur',
  nearestCenter: {
    name: 'Rohini Center',
    address: '211 Vikas Surya Tower, DC Chauk, Rohini',
    distance: '10-15 min drive from Wazirpur',
  },
  geoCoordinates: {
    lat: '28.6969',
    lng: '77.1650',
  },
}

// Student testimonials
const testimonials = [
  {
    name: 'Sadhna Sirin',
    score: '695/720',
    area: 'Wazirpur Industrial Area',
    quote:
      'The small batch size at Cerebrum made all the difference. Dr. Shekhar Sir explains complex biology concepts in such a simple way!',
    college: 'AIIMS Delhi',
  },
  {
    name: 'Nishita',
    score: '678/720',
    area: 'Lawrence Road',
    quote:
      'Worth the short commute from Wazirpur to Rohini. The AIIMS faculty and doubt clearing sessions helped me crack NEET.',
    college: 'MAMC Delhi',
  },
  {
    name: 'Rahul Verma',
    score: '665/720',
    area: 'Ashok Vihar Phase 4',
    quote:
      'I was confused between local coaching and Cerebrum. Best decision to choose quality over convenience!',
    college: 'Lady Hardinge',
  },
]

// Free NEET tools
const neetTools = [
  {
    icon: TrendingUp,
    title: 'NEET Rank Predictor',
    description: 'Predict your All India Rank based on expected score',
    href: '/neet-rank-predictor',
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    cta: 'Predict Rank',
  },
  {
    icon: School,
    title: 'NEET College Predictor',
    description: 'Find which medical colleges you can get based on your NEET score',
    href: '/neet-college-predictor',
    color: 'from-green-500 to-teal-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    cta: 'Predict Colleges',
  },
  {
    icon: Brain,
    title: 'Biology MCQ Practice',
    description: 'Practice 10,000+ NEET Biology MCQs with explanations',
    href: '/neet-biology-mcq',
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    cta: 'Start Practice',
  },
]

// Courses
const courses = [
  {
    name: 'Class 11th NEET Comprehensive',
    description: '60% of NEET syllabus covered with deep concepts',
    price: 72200,
    originalPrice: 76000,
    duration: '1 Year',
    features: ['Complete NCERT', 'NEET Pattern', 'Test Series'],
    href: '/courses/class-11-neet-comprehensive',
    enrollHref: '/enrollments?course=class-11-neet-comprehensive&tier=ascent',
    tag: 'Most Popular',
  },
  {
    name: 'Class 12th NEET Intensive',
    description: 'Dual preparation for boards and NEET',
    price: 72200,
    originalPrice: 76000,
    duration: '1 Year',
    features: ['Board + NEET', 'PYQ Analysis', '100+ Mocks'],
    href: '/courses/class-12-neet-intensive',
    enrollHref: '/enrollments?course=class-12-neet-intensive&tier=ascent',
    tag: null,
  },
  {
    name: 'NEET Dropper/Repeater Batch',
    description: 'Intensive 1-year crash course for rank improvement',
    price: 85500,
    originalPrice: 90000,
    duration: '1 Year',
    features: ['Complete Revision', 'Daily Practice', 'Score Guarantee'],
    href: '/courses/neet-dropper-intensive',
    enrollHref: '/enrollments?course=neet-dropper-intensive&tier=ascent',
    tag: 'High Demand',
  },
]

// Why choose us
const whyChooseUs = [
  {
    icon: GraduationCap,
    title: 'AIIMS-Trained Faculty',
    description:
      'Learn from Dr. Shekhar C Singh, AIIMS New Delhi Alumnus with 15+ years experience',
  },
  {
    icon: Users,
    title: 'Small Batch Size',
    description: 'Only 15-20 students per batch for personalized attention',
  },
  {
    icon: Target,
    title: '98% Success Rate',
    description: 'Proven track record with thousands of NEET qualifiers',
  },
  {
    icon: Video,
    title: 'Hybrid Learning',
    description: 'Flexibility to attend online or offline as per convenience',
  },
  {
    icon: MessageCircle,
    title: '24/7 Doubt Support',
    description: 'Get doubts resolved anytime via WhatsApp',
  },
  {
    icon: BookOpen,
    title: 'NCERT-Focused Material',
    description: 'Comprehensive study material aligned with NEET pattern',
  },
]

// Nearby areas
const nearbyAreas = [
  { name: 'Ashok Vihar', url: '/biology-classes-ashok-vihar' },
  { name: 'Shalimar Bagh', url: '/biology-classes-shalimar-bagh' },
  { name: 'Rohini', url: '/biology-classes-rohini' },
  { name: 'Pitampura', url: '/neet-coaching-pitampura' },
  { name: 'Lawrence Road', url: '/neet-coaching-north-delhi/wazirpur' },
  { name: 'Netaji Subhash Place', url: '/biology-classes-nsp' },
]

export default function WazirpurNEETContent({ faqs }: WazirpurNEETContentProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 py-20 text-white lg:py-24">
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-[#4a5d4a] opacity-10 blur-3xl" />
          <div className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-yellow-500 opacity-10 blur-3xl" />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            {/* Urgency Banner */}
            <div className="mb-6 inline-flex items-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-6 py-2 text-sm font-semibold">
              <Zap className="mr-2 h-4 w-4" />
              Limited Seats! NEET 2026 Batch Starting Soon
            </div>

            {/* Location Badge */}
            <div className="mb-6 inline-flex items-center rounded-full bg-white/10 px-6 py-2 text-sm font-medium backdrop-blur-sm">
              <MapPin className="mr-2 h-4 w-4 text-[#4a5d4a]" />
              <Train className="mr-2 h-4 w-4 text-yellow-400" />
              10-15 min from Rohini Center | Near NSP Metro
            </div>

            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              Best NEET Coaching in{' '}
              <span className="text-yellow-400">Wazirpur</span>
            </h1>

            <p className="mb-8 text-xl text-slate-300 md:text-2xl">
              Top-rated Biology Classes Near Rohini for Wazirpur, Lawrence Road & Ashok Vihar Students
            </p>

            {/* Trust Badges */}
            <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center rounded-full bg-white/10 px-4 py-2">
                <Award className="mr-2 h-5 w-5 text-yellow-400" />
                <span className="text-sm font-medium">AIIMS Faculty</span>
              </div>
              <div className="flex items-center rounded-full bg-white/10 px-4 py-2">
                <Star className="mr-2 h-5 w-5 text-yellow-400" />
                <span className="text-sm font-medium">4.9/5 Rating</span>
              </div>
              <div className="flex items-center rounded-full bg-white/10 px-4 py-2">
                <Trophy className="mr-2 h-5 w-5 text-green-400" />
                <span className="text-sm font-medium">98% Success Rate</span>
              </div>
            </div>

            {/* Primary CTAs */}
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/demo-booking"
                className="inline-flex items-center justify-center rounded-xl bg-yellow-500 px-4 py-3 text-base font-bold text-slate-900 shadow-lg shadow-yellow-500/30 transition hover:bg-yellow-400 sm:px-8 sm:py-4 sm:text-lg"
              >
                Book FREE Demo Class
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button
                onClick={async () => {
                  await trackAndOpenWhatsApp({
                    source: 'wazirpur-hero',
                    message: `Hi! I'm from Wazirpur area and interested in NEET Biology coaching. Please share details about batches and fees.`,
                    campaign: 'wazirpur-seo',
                  })
                }}
                className="inline-flex items-center justify-center rounded-xl border-2 border-green-500 bg-green-500/10 px-4 py-3 text-base font-semibold text-green-400 transition hover:bg-green-500/20 cursor-pointer sm:px-8 sm:py-4 sm:text-lg"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Us
              </button>
            </div>

            {/* Quick Contact */}
            <div className="mt-6 text-slate-400">
              <a href={getPhoneLink()} className="inline-flex items-center hover:text-white">
                <Phone className="mr-2 h-4 w-4" />
                Call: {getDisplayPhone()}
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm sm:p-6">
              <Users className="mx-auto mb-2 h-6 w-6 text-yellow-400 sm:h-8 sm:w-8" />
              <div className="text-xl font-bold sm:text-2xl">180+</div>
              <div className="text-xs text-slate-400 sm:text-sm">Wazirpur Students</div>
            </div>
            <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm sm:p-6">
              <Trophy className="mx-auto mb-2 h-6 w-6 text-yellow-400 sm:h-8 sm:w-8" />
              <div className="text-xl font-bold sm:text-2xl">98%</div>
              <div className="text-xs text-slate-400 sm:text-sm">Success Rate</div>
            </div>
            <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm sm:p-6">
              <Star className="mx-auto mb-2 h-6 w-6 text-yellow-400 sm:h-8 sm:w-8" />
              <div className="text-xl font-bold sm:text-2xl">4.9/5</div>
              <div className="text-xs text-slate-400 sm:text-sm">Google Rating</div>
            </div>
            <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm sm:p-6">
              <GraduationCap className="mx-auto mb-2 h-6 w-6 text-yellow-400 sm:h-8 sm:w-8" />
              <div className="text-xl font-bold sm:text-2xl">15+ Yrs</div>
              <div className="text-xs text-slate-400 sm:text-sm">Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Center Info Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-green-600">
                  <Building className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="mb-2 text-2xl font-bold text-gray-900">
                    Rohini Center - Nearest to Wazirpur
                  </h2>
                  <div className="mb-4 flex items-center gap-2 text-gray-600">
                    <MapPin className="h-5 w-5 text-green-600" />
                    {wazirpurData.nearestCenter.address}
                  </div>
                  <div className="mb-4 flex items-center gap-2 text-gray-600">
                    <Train className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-700">
                      Just 10-15 min drive from Wazirpur | Near NSP Metro
                    </span>
                  </div>
                  <div className="mb-4 flex items-center gap-2 text-gray-600">
                    <Clock className="h-5 w-5 text-green-600" />
                    Open 24/7 — Online Classes Globally
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/demo-booking"
                      className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700"
                    >
                      Book Demo at Rohini Center
                    </Link>
                    <a
                      href={`https://maps.google.com/?q=${wazirpurData.geoCoordinates.lat},${wazirpurData.geoCoordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-green-600 px-6 py-3 font-medium text-green-700 transition hover:bg-green-50"
                    >
                      <Navigation className="mr-2 inline h-4 w-4" />
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center rounded-full bg-yellow-500/20 px-6 py-2 text-sm font-semibold text-yellow-400">
              <Trophy className="mr-2 h-4 w-4" />
              Success Stories from Wazirpur Area
            </div>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Our Students from Wazirpur Area
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-300">
              See how students from Wazirpur, Lawrence Road, and nearby areas cracked NEET with Cerebrum
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <div className="mb-4 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-4 text-slate-300 italic">&quot;{testimonial.quote}&quot;</p>
                <div className="border-t border-white/10 pt-4">
                  <div className="font-semibold text-yellow-400">{testimonial.name}</div>
                  <div className="text-2xl font-bold text-green-400">{testimonial.score}</div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <MapPin className="h-3 w-3" /> {testimonial.area}
                  </div>
                  <div className="text-sm text-slate-300">{testimonial.college}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Why Wazirpur Students Choose Cerebrum?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Better than local coaching centers in Ashok Vihar and NSP
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="rounded-xl bg-white p-6 shadow-md">
                <item.icon className="mb-4 h-10 w-10 text-[#4a5d4a]" />
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free NEET Tools */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center rounded-full bg-purple-100 px-6 py-2 text-sm font-semibold text-purple-700">
              <Zap className="mr-2 h-4 w-4" />
              100% Free for All Students
            </div>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Free NEET Tools for Wazirpur Students
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Use our powerful free tools to track your preparation and predict your performance
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            {neetTools.map((tool) => (
              <Link
                key={tool.title}
                href={tool.href}
                className="group relative overflow-hidden rounded-2xl border-2 border-gray-100 bg-white p-6 shadow-md transition hover:border-transparent hover:shadow-xl"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 transition-opacity group-hover:opacity-10`}
                />

                <div className={`mb-4 inline-flex rounded-xl ${tool.bgColor} p-3`}>
                  <tool.icon className={`h-7 w-7 ${tool.textColor}`} />
                </div>

                <h3 className="mb-2 text-lg font-bold text-gray-900">{tool.title}</h3>
                <p className="mb-4 text-sm text-gray-600">{tool.description}</p>

                <span
                  className={`inline-flex items-center text-sm font-semibold ${tool.textColor} group-hover:underline`}
                >
                  {tool.cta}
                  <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center rounded-full bg-green-100 px-6 py-2 text-sm font-semibold text-green-700">
              <Sparkles className="mr-2 h-4 w-4" />
              Special Discounts for Early Enrollment
            </div>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              NEET Biology Courses for Wazirpur Students
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Choose the right course for your NEET preparation journey
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course.name}
                className="relative rounded-xl border-2 border-gray-200 bg-white p-6 transition hover:border-[#4a5d4a] hover:shadow-xl"
              >
                {course.tag && (
                  <div className="absolute -top-3 right-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-4 py-1 text-xs font-bold text-white">
                    {course.tag}
                  </div>
                )}
                <h3 className="mb-2 text-lg font-bold text-gray-900">{course.name}</h3>
                <p className="mb-4 text-sm text-gray-600">{course.description}</p>

                <div className="mb-4 rounded-lg bg-gray-50 p-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-[#4a5d4a]">
                      Rs {course.price.toLocaleString()}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      Rs {course.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-sm font-medium text-green-600">
                      Save Rs {(course.originalPrice - course.price).toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500">| {course.duration}</span>
                  </div>
                </div>

                <ul className="mb-4 space-y-2">
                  {course.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-600" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex gap-2">
                  <Link
                    href={course.enrollHref}
                    className="flex-1 rounded-lg bg-[#4a5d4a] py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#3d4d3d]"
                  >
                    Enroll Now
                  </Link>
                  <Link
                    href={course.href}
                    className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center rounded-lg bg-[#4a5d4a] px-4 py-3 text-base font-semibold text-white transition hover:bg-[#3d4d3d] sm:px-8 sm:py-4 sm:text-lg"
            >
              View All Courses & Fees
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <button
              onClick={async () => {
                await trackAndOpenWhatsApp({
                  source: 'wazirpur-courses',
                  message: `Hi! I'm from Wazirpur and interested in NEET coaching. Please share course details and fees.`,
                  campaign: 'wazirpur-seo',
                })
              }}
              className="inline-flex items-center justify-center rounded-lg border-2 border-green-500 px-4 py-3 text-base font-semibold text-green-600 transition hover:bg-green-50 cursor-pointer sm:px-8 sm:py-4 sm:text-lg"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Ask About Courses
            </button>
          </div>
        </div>
      </section>

      {/* Nearby Areas */}
      <section className="bg-[#e8ede8] py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
            NEET Biology Classes Near Wazirpur
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {nearbyAreas.map((area) => (
              <Link
                key={area.name}
                href={area.url}
                className="rounded-lg bg-white px-5 py-3 text-gray-700 shadow-sm transition hover:bg-[#4a5d4a] hover:text-white"
              >
                Biology Classes in {area.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEET Tools Widget */}
      <NEETToolsWidget
        title="Free NEET Preparation Tools for Wazirpur Students"
        subtitle="Boost your preparation with our AI-powered tools - 100% Free"
      />

      {/* FAQs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-10 text-center text-3xl font-bold text-gray-900">
              Frequently Asked Questions - Wazirpur
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-xl bg-gray-50 p-6">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6 inline-flex items-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-6 py-2 text-sm font-bold">
            <Zap className="mr-2 h-4 w-4" />
            Limited Seats for NEET 2026 Batch!
          </div>

          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Start Your NEET Journey from Wazirpur!
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-xl text-slate-300">
            Join 180+ students from Wazirpur area who are already preparing with Cerebrum Biology Academy
          </p>

          <div className="mx-auto mb-8 flex max-w-2xl flex-wrap justify-center gap-4">
            <div className="flex items-center rounded-full bg-white/10 px-4 py-2">
              <CheckCircle className="mr-2 h-5 w-5 text-green-400" />
              <span className="text-sm">Free Demo Class</span>
            </div>
            <div className="flex items-center rounded-full bg-white/10 px-4 py-2">
              <CheckCircle className="mr-2 h-5 w-5 text-green-400" />
              <span className="text-sm">AIIMS Faculty</span>
            </div>
            <div className="flex items-center rounded-full bg-white/10 px-4 py-2">
              <CheckCircle className="mr-2 h-5 w-5 text-green-400" />
              <span className="text-sm">10-15 min from Wazirpur</span>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/demo-booking"
              className="inline-flex items-center justify-center rounded-xl bg-yellow-500 px-4 py-3 text-base font-bold text-slate-900 shadow-lg shadow-yellow-500/30 transition hover:bg-yellow-400 sm:px-8 sm:py-4 sm:text-lg"
            >
              Book Free Demo Class
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <button
              onClick={async () => {
                await trackAndOpenWhatsApp({
                  source: 'wazirpur-cta',
                  message: `Hi! I'm from Wazirpur and interested in NEET Biology coaching. Please share details.`,
                  campaign: 'wazirpur-seo',
                })
              }}
              className="inline-flex items-center justify-center rounded-xl border-2 border-green-500 bg-green-500/10 px-4 py-3 text-base font-semibold text-green-400 transition hover:bg-green-500/20 cursor-pointer sm:px-8 sm:py-4 sm:text-lg"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp Us Now
            </button>
            <a
              href={getPhoneLink()}
              className="inline-flex items-center justify-center rounded-xl border-2 border-white/30 px-4 py-3 text-base font-semibold transition hover:bg-white/10 sm:px-8 sm:py-4 sm:text-lg"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call: {getDisplayPhone()}
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center text-slate-400">
            <Clock className="mr-2 h-4 w-4" />
            <span className="text-sm">Available 24/7 — Online Classes Globally</span>
          </div>
        </div>
      </section>
    </div>
  )
}
