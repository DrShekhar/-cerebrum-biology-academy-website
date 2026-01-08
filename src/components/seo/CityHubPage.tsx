'use client'

import Link from 'next/link'
import { trackAndOpenWhatsApp, WHATSAPP_MESSAGES } from '@/lib/whatsapp/tracking'
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
  Wifi,
  Navigation,
  FileText,
  Calculator,
  ClipboardList,
  ExternalLink,
  Sparkles,
  Zap,
  Shield,
  Award,
  HeartPulse,
  Stethoscope,
  Brain,
  TrendingUp,
  School,
} from 'lucide-react'
import type { CityHubData } from '@/data/city-seo/city-hub-data'

interface CityHubPageProps {
  data: CityHubData
}

// Actual courses with real prices
const courses = [
  {
    name: 'Class 9th Foundation Biology',
    description: 'Build strong foundation for NEET from early',
    price: 57000,
    originalPrice: 60000,
    duration: '1 Year',
    features: ['NCERT Mastery', 'Concept Building', 'Weekly Tests'],
    href: '/courses/class-9-foundation-biology',
    enrollHref: '/enrollments?course=class-9-foundation-biology&tier=ascent',
    tag: 'Early Bird',
  },
  {
    name: 'Class 10th Foundation Biology',
    description: 'Advanced foundation preparing for NEET journey',
    price: 57000,
    originalPrice: 60000,
    duration: '1 Year',
    features: ['Bridge to NEET', 'PYQ Pattern', 'Mock Tests'],
    href: '/courses/class-10-foundation-biology',
    enrollHref: '/enrollments?course=class-10-foundation-biology&tier=ascent',
    tag: null,
  },
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

const freeResources = [
  {
    icon: FileText,
    title: 'Free Study Notes',
    description: 'Chapter-wise biology notes for NEET preparation',
    href: '/free-resources',
    cta: 'Get Free Notes',
  },
  {
    icon: ClipboardList,
    title: 'Free Mock Tests',
    description: 'Practice with NEET-pattern questions',
    href: '/neet-mock-test-free',
    cta: 'Start Free Test',
  },
  {
    icon: ExternalLink,
    title: 'Official NEET Resources',
    description: 'NTA official materials and previous papers',
    href: '/neet-official-resources',
    cta: 'Access Resources',
  },
]

// Enhanced NEET Tools - Free for all students
const neetTools = [
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
    icon: Brain,
    title: 'Biology MCQ Practice',
    description: 'Practice 10,000+ NEET Biology MCQs with explanations',
    href: '/neet-biology-mcq-test',
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    cta: 'Start Practice',
  },
  {
    icon: FileText,
    title: 'NEET PYQ Papers',
    description: 'Access last 10 years previous year questions with solutions',
    href: '/neet-previous-year-papers',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    cta: 'Solve PYQs',
  },
]

// How Cerebrum helps students reach medical colleges
const howWeHelp = [
  {
    icon: GraduationCap,
    title: 'AIIMS-Trained Faculty',
    stat: '15+ Years',
    description:
      'Learn Biology from Dr. Shekhar C Singh, AIIMS Delhi Alumnus who understands exactly what NEET demands',
  },
  {
    icon: Target,
    title: 'Focused NEET Strategy',
    stat: '98% Success',
    description:
      'Our proven teaching methodology focuses on high-yield topics that appear repeatedly in NEET',
  },
  {
    icon: Users,
    title: 'Small Batch Attention',
    stat: '15-20 Students',
    description: 'Personal attention ensures no student falls behind. Every doubt gets answered.',
  },
  {
    icon: ClipboardList,
    title: 'Rigorous Testing',
    stat: '100+ Mock Tests',
    description: 'Weekly tests simulate NEET environment so you perform best on exam day',
  },
]

export function CityHubPage({ data }: CityHubPageProps) {
  const baseUrl = 'https://cerebrumbiologyacademy.com'

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${baseUrl}/biology-classes-${data.slug}#organization`,
    name: `Cerebrum Biology Academy - ${data.cityName}`,
    description: data.metaDescription,
    url: `${baseUrl}/biology-classes-${data.slug}`,
    telephone: '+91-88264-44334',
    email: 'info@cerebrumbiologyacademy.com',
    logo: `${baseUrl}/logo.png`,
    priceRange: '₹₹',
    address: data.hasOfflineCenter
      ? {
          '@type': 'PostalAddress',
          streetAddress: data.nearestCenter?.address,
          addressLocality: data.cityName,
          addressRegion: data.stateName,
          addressCountry: 'IN',
        }
      : undefined,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: data.geoCoordinates.lat,
      longitude: data.geoCoordinates.lng,
    },
    areaServed: [data.cityName, ...data.localities.map((l) => l.name)],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: data.stats.rating,
      bestRating: '5',
      worstRating: '1',
      ratingCount: data.stats.studentsFromCity.replace(/[^0-9]/g, ''),
    },
    founder: {
      '@type': 'Person',
      name: 'Dr. Shekhar Singh',
      jobTitle: 'Founder & Chief Academic Officer',
      alumniOf: 'AIIMS Delhi',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      {
        '@type': 'ListItem',
        position: 2,
        name: `Biology Classes in ${data.cityName}`,
        item: `${baseUrl}/biology-classes-${data.slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section - Cerebrum Brand Colors */}
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
                {data.hasOfflineCenter ? (
                  <>
                    <Building className="mr-2 h-4 w-4 text-green-400" />
                    Offline Center Available near {data.cityName}
                  </>
                ) : (
                  <>
                    <Wifi className="mr-2 h-4 w-4 text-yellow-400" />
                    Online Classes + Nearby Centers
                  </>
                )}
              </div>

              <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
                {data.heroTitle.split(' ').map((word, i) =>
                  word.toLowerCase() === data.cityName.toLowerCase() ||
                  data.heroTitle.toLowerCase().includes(word.toLowerCase()) ? (
                    <span key={i} className="text-yellow-400">
                      {word}{' '}
                    </span>
                  ) : (
                    word + ' '
                  )
                )}
              </h1>

              <p className="mb-8 text-xl text-slate-300 md:text-2xl">{data.heroSubtitle}</p>

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
                  <Shield className="mr-2 h-5 w-5 text-green-400" />
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
                      source: `city-hub-hero-${data.slug}`,
                      message: `Hi! I'm interested in NEET Biology coaching in ${data.cityName}`,
                      campaign: 'city-hub',
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
                <a href="tel:+918826444334" className="inline-flex items-center hover:text-white">
                  <Phone className="mr-2 h-4 w-4" />
                  Call: +91 88264-44334
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm sm:p-6">
                <Users className="mx-auto mb-2 h-6 w-6 text-yellow-400 sm:h-8 sm:w-8" />
                <div className="text-xl font-bold sm:text-2xl">{data.stats.studentsFromCity}</div>
                <div className="text-xs text-slate-400 sm:text-sm">{data.cityName} Students</div>
              </div>
              <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm sm:p-6">
                <Trophy className="mx-auto mb-2 h-6 w-6 text-yellow-400 sm:h-8 sm:w-8" />
                <div className="text-xl font-bold sm:text-2xl">{data.stats.successRate}</div>
                <div className="text-xs text-slate-400 sm:text-sm">Success Rate</div>
              </div>
              <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm sm:p-6">
                <Star className="mx-auto mb-2 h-6 w-6 text-yellow-400 sm:h-8 sm:w-8" />
                <div className="text-xl font-bold sm:text-2xl">{data.stats.rating}/5</div>
                <div className="text-xs text-slate-400 sm:text-sm">Google Rating</div>
              </div>
              <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm sm:p-6">
                <GraduationCap className="mx-auto mb-2 h-6 w-6 text-yellow-400 sm:h-8 sm:w-8" />
                <div className="text-xl font-bold sm:text-2xl">1.5L+</div>
                <div className="text-xs text-slate-400 sm:text-sm">Total Students</div>
              </div>
            </div>
          </div>
        </section>

        {/* Center Info Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              {data.hasOfflineCenter ? (
                <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-green-600">
                      <Building className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="mb-2 text-2xl font-bold text-gray-900">
                        {data.nearestCenter?.name}
                      </h2>
                      <div className="mb-4 flex items-center gap-2 text-gray-600">
                        <MapPin className="h-5 w-5 text-green-600" />
                        {data.nearestCenter?.address}
                      </div>
                      <div className="mb-4 flex items-center gap-2 text-gray-600">
                        <Clock className="h-5 w-5 text-green-600" />
                        Open: 8:00 AM - 8:00 PM (Mon-Sat)
                      </div>
                      <div className="flex gap-3">
                        <Link
                          href="/demo"
                          className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700"
                        >
                          Book Demo at Center
                        </Link>
                        <a
                          href={`https://maps.google.com/?q=${data.geoCoordinates.lat},${data.geoCoordinates.lng}`}
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
              ) : (
                <div className="rounded-2xl border-2 border-blue-200 bg-blue-50 p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                      <Wifi className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="mb-2 text-2xl font-bold text-gray-900">
                        Live Online Classes for {data.cityName} Students
                      </h2>
                      <p className="mb-4 text-gray-600">
                        Join our interactive online classes from the comfort of your home. Same
                        AIIMS faculty, same curriculum, same results!
                      </p>
                      {data.nearestCenter && (
                        <div className="mb-4 rounded-lg bg-white p-4">
                          <p className="mb-1 text-sm font-medium text-gray-700">
                            Nearest Offline Center:
                          </p>
                          <p className="text-gray-600">
                            {data.nearestCenter.name} - {data.nearestCenter.distance}
                          </p>
                        </div>
                      )}
                      <div className="flex gap-3">
                        <Link
                          href="/demo"
                          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
                        >
                          Book Online Demo
                        </Link>
                        <Link
                          href="/online-biology-classes"
                          className="rounded-lg border border-blue-600 px-6 py-3 font-medium text-blue-700 transition hover:bg-blue-50"
                        >
                          Learn About Online Classes
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* How Cerebrum Helps You Get Into Medical College */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center rounded-full bg-yellow-500/20 px-6 py-2 text-sm font-semibold text-yellow-400">
                <Stethoscope className="mr-2 h-4 w-4" />
                Your Path to Medical College
              </div>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                How Cerebrum Helps You Get Into Medical College
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-300">
                Our proven methodology has helped thousands of students crack NEET and secure MBBS
                seats
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {howWeHelp.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:bg-white/10"
                >
                  <item.icon className="mb-4 h-10 w-10 text-yellow-400" />
                  <div className="mb-2 text-2xl font-bold text-green-400">{item.stat}</div>
                  <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/demo-booking"
                className="inline-flex items-center justify-center rounded-xl bg-yellow-500 px-4 py-3 text-base font-bold text-slate-900 shadow-lg transition hover:bg-yellow-400 sm:px-8 sm:py-4 sm:text-lg"
              >
                Start Your Medical Journey Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Why {data.cityName} Students Choose Cerebrum?
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                We are committed to helping you excel in NEET and board exams
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

        {/* Courses with Actual Prices */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center rounded-full bg-green-100 px-6 py-2 text-sm font-semibold text-green-700">
                <Sparkles className="mr-2 h-4 w-4" />
                Special Discounts for Early Enrollment
              </div>
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                NEET Biology Courses for {data.cityName} Students
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Choose the right course for your NEET preparation journey
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

                  {/* Pricing */}
                  <div className="mb-4 rounded-lg bg-gray-50 p-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-[#4a5d4a]">
                        ₹{course.price.toLocaleString()}
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        ₹{course.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm font-medium text-green-600">
                        Save ₹{(course.originalPrice - course.price).toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500">• {course.duration}</span>
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
                    source: `city-hub-courses-${data.slug}`,
                    message: WHATSAPP_MESSAGES.courseEnquiry,
                    campaign: 'city-hub-courses',
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

        {/* Free Resources Section */}
        <section className="bg-gradient-to-br from-green-50 to-blue-50 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-10 text-center">
              <div className="mb-4 inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                <Sparkles className="mr-2 h-4 w-4" />
                100% Free Resources
              </div>
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Free NEET Preparation Resources
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Start your preparation with our free study materials - no registration required
              </p>
            </div>

            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
              {freeResources.map((resource) => (
                <Link
                  key={resource.title}
                  href={resource.href}
                  className="group rounded-xl border-2 border-transparent bg-white p-6 shadow-md transition hover:border-green-600 hover:shadow-lg"
                >
                  <resource.icon className="mb-4 h-10 w-10 text-green-600" />
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">{resource.title}</h3>
                  <p className="mb-4 text-gray-600">{resource.description}</p>
                  <span className="inline-flex items-center font-medium text-green-600 group-hover:text-green-700">
                    {resource.cta}
                    <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* NEET Tools Section - Enhanced Cards */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="mb-10 text-center">
              <div className="mb-4 inline-flex items-center rounded-full bg-purple-100 px-6 py-2 text-sm font-semibold text-purple-700">
                <Zap className="mr-2 h-4 w-4" />
                100% Free for All Students
              </div>
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Free NEET Tools for {data.cityName} Students
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Use our powerful free tools to track your preparation and predict your performance
              </p>
            </div>

            <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {neetTools.map((tool) => (
                <Link
                  key={tool.title}
                  href={tool.href}
                  className="group relative overflow-hidden rounded-2xl border-2 border-gray-100 bg-white p-6 shadow-md transition hover:border-transparent hover:shadow-xl"
                >
                  {/* Gradient background on hover */}
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

            <div className="mt-10 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-center text-white">
              <h3 className="mb-2 text-xl font-bold">Not sure where you stand?</h3>
              <p className="mb-4 text-purple-100">
                Take our free NEET Readiness Quiz to assess your preparation level
              </p>
              <Link
                href="/neet-readiness-quiz"
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-purple-700 transition hover:bg-purple-50"
              >
                Take Free Quiz
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Localities */}
        {data.localities.length > 0 && (
          <section className="bg-[#e8ede8] py-16">
            <div className="container mx-auto px-4">
              <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
                NEET Biology Classes in {data.cityName} Areas
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {data.localities.map((locality) => (
                  <Link
                    key={locality.name}
                    href={locality.url}
                    className="rounded-lg bg-white px-5 py-3 text-gray-700 shadow-sm transition hover:bg-[#4a5d4a] hover:text-white"
                  >
                    Biology Classes in {locality.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQs */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-10 text-center text-3xl font-bold text-gray-900">
                Frequently Asked Questions - {data.cityName}
              </h2>
              <div className="space-y-4">
                {data.faqs.map((faq) => (
                  <div key={faq.question} className="rounded-xl bg-gray-50 p-6">
                    <h3 className="mb-3 text-lg font-semibold text-gray-900">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Cities */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
              NEET Biology Classes in Nearby Cities
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {data.relatedCities.map((city) => (
                <Link
                  key={city.name}
                  href={city.url}
                  className="rounded-lg bg-white px-6 py-3 font-medium text-gray-700 shadow-sm transition hover:bg-[#4a5d4a] hover:text-white"
                >
                  Biology Classes in {city.name}
                </Link>
              ))}
              <Link
                href="/online-biology-classes"
                className="rounded-lg bg-white px-6 py-3 font-medium text-gray-700 shadow-sm transition hover:bg-[#4a5d4a] hover:text-white"
              >
                Online Biology Classes
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA - Cerebrum Colors with WhatsApp */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            {/* Urgency Badge */}
            <div className="mb-6 inline-flex items-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-6 py-2 text-sm font-bold">
              <Zap className="mr-2 h-4 w-4" />
              Limited Seats for NEET 2026 Batch!
            </div>

            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Start Your NEET Journey from {data.cityName}!
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-xl text-slate-300">
              Join {data.stats.studentsFromCity} students from {data.cityName} who are already
              preparing with Cerebrum Biology Academy
            </p>

            {/* Benefits */}
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
                <span className="text-sm">98% Success Rate</span>
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
                    source: `city-hub-cta-${data.slug}`,
                    message: `Hi! I'm from ${data.cityName} and interested in NEET Biology coaching`,
                    campaign: 'city-hub-cta',
                  })
                }}
                className="inline-flex items-center justify-center rounded-xl border-2 border-green-500 bg-green-500/10 px-4 py-3 text-base font-semibold text-green-400 transition hover:bg-green-500/20 cursor-pointer sm:px-8 sm:py-4 sm:text-lg"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Us Now
              </button>
              <a
                href="tel:+918826444334"
                className="inline-flex items-center justify-center rounded-xl border-2 border-white/30 px-4 py-3 text-base font-semibold transition hover:bg-white/10 sm:px-8 sm:py-4 sm:text-lg"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call: 88264-44334
              </a>
            </div>

            {/* Operating Hours */}
            <div className="mt-8 flex items-center justify-center text-slate-400">
              <Clock className="mr-2 h-4 w-4" />
              <span className="text-sm">Available Mon-Sat, 8 AM - 8 PM</span>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
