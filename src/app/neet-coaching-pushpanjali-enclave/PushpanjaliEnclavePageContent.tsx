'use client'

import Link from 'next/link'
import Script from 'next/script'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO, getPhoneLink, getDisplayPhone } from '@/lib/constants/contactInfo'
import {
  MapPin,
  Users,
  Trophy,
  Star,
  CheckCircle,
  Phone,
  Clock,
  GraduationCap,
  MessageCircle,
  Building,
  ArrowRight,
  Target,
  Navigation,
  FileText,
  Zap,
  Award,
  Stethoscope,
  Brain,
  TrendingUp,
  School,
  Home,
} from 'lucide-react'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

// Pushpanjali Enclave specific testimonials
const testimonials = [
  {
    name: 'Aditya Malhotra',
    location: 'Pushpanjali Enclave, Pitampura',
    score: '678/720',
    college: 'AIIMS Delhi',
    quote:
      'Living in Pushpanjali Enclave, I could reach DC Chauk center in just 8 minutes by metro or auto. Dr. Shekhar Sir\'s conceptual teaching helped me crack AIIMS in my first attempt.',
    year: '2025',
  },
  {
    name: 'Sneha Kapoor',
    location: 'Pushpanjali Enclave Co-op Housing',
    score: '665/720',
    college: 'Maulana Azad Medical College',
    quote:
      'The small batch size at Cerebrum made all the difference. Coming from Pushpanjali Enclave, I found the location perfect - close enough to attend evening batches after school.',
    year: '2025',
  },
  {
    name: 'Rahul Saxena',
    location: 'Pushpanjali Enclave, Pitampura',
    score: '652/720',
    college: 'Lady Hardinge Medical College',
    quote:
      'The WhatsApp doubt support was incredible! Even late nights before exams, I could get my Biology doubts cleared instantly. Best decision for any Pushpanjali Enclave student.',
    year: '2024',
  },
]

// Pushpanjali Enclave sectors for local SEO
const pushpanjaliSectors = [
  { name: 'Sector 1', distance: '8 min' },
  { name: 'Sector 2', distance: '9 min' },
  { name: 'Sector 3', distance: '10 min' },
  { name: 'Co-op Housing', distance: '8 min' },
]

// Free NEET Tools
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

// Local FAQs for Pushpanjali Enclave
const faqs = [
  {
    question: 'Where is the nearest NEET coaching center from Pushpanjali Enclave, Pitampura?',
    answer:
      "Cerebrum Biology Academy's Rohini center at DC Chauk is just 8-10 minutes from Pushpanjali Enclave. Located at 211 Vikas Surya Tower, DC Chauk, Sector 9, Rohini, it is easily accessible from the Co-operative Housing Society area via auto-rickshaw, metro, or bike.",
  },
  {
    question: 'Which is the best NEET coaching in Pushpanjali Enclave area?',
    answer:
      'Cerebrum Biology Academy is the top choice for Pushpanjali Enclave students with 98% success rate, AIIMS-trained faculty led by Dr. Shekhar C Singh, and over 150+ students from Pitampura localities already enrolled. The DC Chauk Rohini center is the closest premium NEET coaching.',
  },
  {
    question: 'How far is Cerebrum Academy from Pushpanjali Enclave Co-operative Housing Society?',
    answer:
      'The Pushpanjali Enclave Co-operative Housing Society is approximately 8 minutes away from our Rohini DC Chauk center. Students can easily commute by auto-rickshaw (Rs 30-40), metro (Rohini West station), or bike. The short distance means more time for studies!',
  },
  {
    question: 'What are the batch timings for Pushpanjali Enclave students at Rohini center?',
    answer:
      'We offer flexible batch timings: Morning batch (8-10 AM), Afternoon batch (2-4 PM), and Evening batch (6-8 PM). Most Pushpanjali Enclave students prefer the evening batch after school. Weekend batches are also available for intensive practice sessions.',
  },
  {
    question: 'What is the fee for NEET coaching for Pushpanjali Enclave students?',
    answer:
      'Biology coaching at our Rohini center ranges from Rs 45,000 to Rs 75,000 per year depending on the course. This includes live classes, comprehensive study material, weekly tests, mock exams, and unlimited doubt sessions. EMI options are available.',
  },
  {
    question: 'Is online NEET coaching available for Pushpanjali Enclave students?',
    answer:
      'Yes! We offer live interactive online classes for students who prefer studying from home. Online fees range from Rs 35,000 to Rs 60,000 per year. Many Pushpanjali Enclave students opt for hybrid mode - online regular classes with weekend offline sessions at DC Chauk.',
  },
]

// Schema data
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': `${BASE_URL}/neet-coaching-pushpanjali-enclave#organization`,
  name: 'Cerebrum Biology Academy - Pushpanjali Enclave',
  description:
    'Best NEET coaching for Pushpanjali Enclave, Pitampura students. 8-10 min from DC Chauk Rohini center. AIIMS faculty, 98% success rate.',
  url: `${BASE_URL}/neet-coaching-pushpanjali-enclave`,
  telephone: CONTACT_INFO.phone.primary,
  email: 'info@cerebrumbiologyacademy.com',
  logo: `${BASE_URL}/logo.png`,
  priceRange: 'Rs Rs',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '211 Vikas Surya Tower, DC Chauk, Sector 9',
    addressLocality: 'Rohini',
    addressRegion: 'Delhi',
    postalCode: '110085',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '28.7041',
    longitude: '77.1025',
  },
  areaServed: [
    'Pushpanjali Enclave',
    'Pushpanjali Enclave Sector 1',
    'Pushpanjali Enclave Sector 2',
    'Pushpanjali Enclave Sector 3',
    'Pushpanjali Enclave Co-operative Housing Society',
    'Pitampura',
    'Rohini',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '523',
  },
  founder: {
    '@type': 'Person',
    name: 'Dr. Shekhar C Singh',
    jobTitle: 'Founder & Chief Academic Officer',
    alumniOf: 'AIIMS Delhi',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${BASE_URL}/neet-coaching-pushpanjali-enclave`,
  name: 'NEET Coaching Pushpanjali Enclave | Biology Classes Pitampura | Cerebrum Academy',
  description:
    'Best NEET coaching for Pushpanjali Enclave students in Pitampura. 8-10 min from Rohini DC Chauk center. AIIMS faculty, 98% success rate.',
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['.speakable-intro', '.speakable-location', '.speakable-cta'],
  },
  mainEntity: { '@id': `${BASE_URL}/#organization` },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'NEET Coaching Pitampura',
      item: `${BASE_URL}/neet-coaching-pitampura`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'NEET Coaching Pushpanjali Enclave',
      item: `${BASE_URL}/neet-coaching-pushpanjali-enclave`,
    },
  ],
}

export function PushpanjaliEnclavePageContent() {
  return (
    <>
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="speakable-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-white">
        {/* Speakable content for voice search */}
        <div className="sr-only" aria-hidden="false">
          <p className="speakable-intro">
            Cerebrum Biology Academy offers the best NEET coaching for students living in
            Pushpanjali Enclave, Pitampura. With a 98 percent success rate and AIIMS-trained faculty
            led by Dr. Shekhar C Singh, we are the top choice for medical entrance preparation.
          </p>
          <p className="speakable-location">
            Pushpanjali Enclave is a well-known Co-operative Housing Society area in Pitampura. Our
            Rohini DC Chauk center is just 8 to 10 minutes away, making it the most convenient NEET
            coaching option for students in this locality.
          </p>
          <p className="speakable-cta">
            To join the best NEET biology coaching near Pushpanjali Enclave, call 88264-44334 or
            WhatsApp us. Book your free demo class today at our Rohini DC Chauk center.
          </p>
        </div>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 py-20 text-white lg:py-24">
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
                <MapPin className="mr-2 h-4 w-4 text-yellow-400" />
                <Home className="mr-2 h-4 w-4 text-green-400" />
                Co-operative Housing Society Area | 8-10 min from DC Chauk
              </div>

              <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
                NEET Coaching in{' '}
                <span className="text-yellow-400">Pushpanjali Enclave</span>, Pitampura
              </h1>

              <p className="mb-8 text-xl text-slate-300 md:text-2xl">
                Premium NEET coaching for the Co-operative Housing Society area. Just 8-10 minutes
                from our Rohini DC Chauk center!
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
                <div className="flex items-center rounded-full bg-white/10 px-4 py-2">
                  <Navigation className="mr-2 h-5 w-5 text-blue-400" />
                  <span className="text-sm font-medium">8-10 min away</span>
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
                      source: 'pushpanjali-enclave-hero',
                      message:
                        "Hi! I'm from Pushpanjali Enclave, Pitampura. I want to join NEET Biology coaching at your Rohini center.",
                      campaign: 'pushpanjali-enclave-seo',
                      locality: 'Pushpanjali Enclave',
                    })
                  }}
                  className="inline-flex cursor-pointer items-center justify-center rounded-xl border-2 border-green-500 bg-green-500/10 px-4 py-3 text-base font-semibold text-green-400 transition hover:bg-green-500/20 sm:px-8 sm:py-4 sm:text-lg"
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
                <div className="text-xl font-bold sm:text-2xl">150+</div>
                <div className="text-xs text-slate-400 sm:text-sm">Pitampura Students</div>
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
                <Clock className="mx-auto mb-2 h-6 w-6 text-yellow-400 sm:h-8 sm:w-8" />
                <div className="text-xl font-bold sm:text-2xl">8-10 min</div>
                <div className="text-xs text-slate-400 sm:text-sm">From Your Home</div>
              </div>
            </div>
          </div>
        </section>

        {/* Pushpanjali Enclave Location Section */}
        <section className="bg-gradient-to-br from-green-50 to-blue-50 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="mb-8 text-center">
                <div className="mb-4 inline-flex items-center rounded-full bg-green-100 px-6 py-2 text-sm font-semibold text-green-700">
                  <MapPin className="mr-2 h-4 w-4" />
                  Serving Pushpanjali Enclave Co-operative Housing Society
                </div>
                <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                  Co-operative Housing Society Area, Premium NEET Coaching
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-gray-600">
                  Pushpanjali Enclave is a well-established Co-operative Housing Society in
                  Pitampura. Our Rohini DC Chauk center is conveniently located just 8-10 minutes
                  away, easily accessible via Rohini West Metro or auto.
                </p>
              </div>

              {/* Distance from sectors */}
              <div className="mb-8 grid gap-4 sm:grid-cols-4">
                {pushpanjaliSectors.map((sector) => (
                  <div
                    key={sector.name}
                    className="rounded-xl bg-white p-4 text-center shadow-md transition hover:shadow-lg"
                  >
                    <Home className="mx-auto mb-2 h-8 w-8 text-[#4a5d4a]" />
                    <div className="font-semibold text-gray-900">{sector.name}</div>
                    <div className="text-sm text-green-600">{sector.distance} to center</div>
                  </div>
                ))}
              </div>

              {/* Center Info Card */}
              <div className="rounded-2xl border-2 border-green-200 bg-white p-8 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-green-600">
                    <Building className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-2xl font-bold text-gray-900">
                      Rohini DC Chauk Center
                    </h3>
                    <div className="mb-4 flex items-center gap-2 text-gray-600">
                      <MapPin className="h-5 w-5 text-green-600" />
                      211 Vikas Surya Tower, DC Chauk, Sector 9, Rohini, Delhi 110085
                    </div>
                    <div className="mb-4 flex items-center gap-2 text-gray-600">
                      <Clock className="h-5 w-5 text-green-600" />
                      Open: 8:00 AM - 8:00 PM (Mon-Sat)
                    </div>
                    <div className="mb-4 flex items-center gap-2 text-gray-600">
                      <Navigation className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-700">
                        Just 8-10 minutes from Pushpanjali Enclave
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href="/demo-booking"
                        className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700"
                      >
                        Book Demo at Center
                      </Link>
                      <a
                        href="https://maps.google.com/?q=28.7041,77.1025"
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

        {/* Why Pushpanjali Enclave Students Choose Us */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center rounded-full bg-yellow-500/20 px-6 py-2 text-sm font-semibold text-yellow-400">
                <Stethoscope className="mr-2 h-4 w-4" />
                Your Path to Medical College
              </div>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Why Pushpanjali Enclave Students Choose Cerebrum
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-300">
                150+ students from Pitampura localities are already preparing with us
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:bg-white/10">
                <Navigation className="mb-4 h-10 w-10 text-yellow-400" />
                <div className="mb-2 text-2xl font-bold text-green-400">8-10 min</div>
                <h3 className="mb-2 text-lg font-semibold">Close to Your Home</h3>
                <p className="text-sm text-slate-400">
                  DC Chauk Rohini center is the closest premium NEET coaching from Pushpanjali
                  Enclave. No long commutes, more study time!
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:bg-white/10">
                <GraduationCap className="mb-4 h-10 w-10 text-yellow-400" />
                <div className="mb-2 text-2xl font-bold text-green-400">AIIMS Faculty</div>
                <h3 className="mb-2 text-lg font-semibold">Learn from the Best</h3>
                <p className="text-sm text-slate-400">
                  Dr. Shekhar C Singh (AIIMS Delhi Alumnus) personally teaches at the Rohini center
                  with 15+ years experience.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:bg-white/10">
                <Users className="mb-4 h-10 w-10 text-yellow-400" />
                <div className="mb-2 text-2xl font-bold text-green-400">15-20 Students</div>
                <h3 className="mb-2 text-lg font-semibold">Small Batch Size</h3>
                <p className="text-sm text-slate-400">
                  Personal attention for every student. Your doubts never go unanswered. Join your
                  neighbors who already study with us!
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:bg-white/10">
                <Target className="mb-4 h-10 w-10 text-yellow-400" />
                <div className="mb-2 text-2xl font-bold text-green-400">98% Success</div>
                <h3 className="mb-2 text-lg font-semibold">Proven Track Record</h3>
                <p className="text-sm text-slate-400">
                  Multiple Pushpanjali Enclave students have secured AIIMS, Maulana Azad, and other
                  top medical colleges.
                </p>
              </div>
            </div>

            <div className="mt-10 text-center">
              <button
                onClick={async () => {
                  await trackAndOpenWhatsApp({
                    source: 'pushpanjali-enclave-why-choose',
                    message:
                      "Hi! I'm from Pushpanjali Enclave and interested in NEET Biology coaching. Please share batch details.",
                    campaign: 'pushpanjali-enclave-seo',
                    locality: 'Pushpanjali Enclave',
                  })
                }}
                className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-yellow-500 px-4 py-3 text-base font-bold text-slate-900 shadow-lg transition hover:bg-yellow-400 sm:px-8 sm:py-4 sm:text-lg"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp for Details
              </button>
            </div>
          </div>
        </section>

        {/* Student Testimonials */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Success Stories from Pushpanjali Enclave
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Hear from students who live in your neighborhood and achieved their medical dreams
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="rounded-xl bg-white p-6 shadow-lg transition hover:shadow-xl"
                >
                  <div className="mb-4 flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="mb-4 italic text-gray-600">&quot;{testimonial.quote}&quot;</p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4 text-green-600" />
                      {testimonial.location}
                    </div>
                    <div className="mt-2 flex items-center gap-4">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                        {testimonial.score}
                      </span>
                      <span className="text-sm text-gray-600">{testimonial.college}</span>
                    </div>
                  </div>
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
                Free NEET Tools for Pushpanjali Enclave Students
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

        {/* NEET Tools Widget */}
        <NEETToolsWidget
          title="Free NEET Preparation Tools for Pushpanjali Enclave Students"
          subtitle="Boost your preparation with our AI-powered tools - 100% Free"
        />

        {/* FAQs */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-10 text-center text-3xl font-bold text-gray-900">
                Frequently Asked Questions - Pushpanjali Enclave, Pitampura
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

        {/* Nearby Areas */}
        <section className="bg-[#e8ede8] py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
              NEET Coaching for Nearby Areas
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { name: 'Pitampura', url: '/neet-coaching-pitampura' },
                { name: 'Rohini', url: '/biology-classes-rohini' },
                { name: 'Saraswati Vihar', url: '/neet-coaching-saraswati-vihar' },
                { name: 'Shalimar Bagh', url: '/biology-classes-shalimar-bagh' },
                { name: 'Model Town', url: '/biology-classes-model-town' },
                { name: 'Ashok Vihar', url: '/biology-classes-ashok-vihar' },
                { name: 'Prashant Vihar', url: '/neet-coaching-prashant-vihar' },
              ].map((area) => (
                <Link
                  key={area.name}
                  href={area.url}
                  className="rounded-lg bg-white px-5 py-3 text-gray-700 shadow-sm transition hover:bg-[#4a5d4a] hover:text-white"
                >
                  NEET Coaching {area.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            {/* Urgency Badge */}
            <div className="mb-6 inline-flex items-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-6 py-2 text-sm font-bold">
              <Zap className="mr-2 h-4 w-4" />
              Limited Seats for NEET 2026 Batch!
            </div>

            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Pushpanjali Enclave Students - Start Your Medical Journey!
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-xl text-slate-300">
              Join 150+ students from Pitampura who are already preparing with Cerebrum Biology
              Academy. Just 8-10 minutes from your home!
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
                <span className="text-sm">8-10 min from home</span>
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
                    source: 'pushpanjali-enclave-cta',
                    message:
                      "Hi! I'm from Pushpanjali Enclave, Pitampura. I want to join NEET Biology coaching. Please share details.",
                    campaign: 'pushpanjali-enclave-seo',
                    locality: 'Pushpanjali Enclave',
                  })
                }}
                className="inline-flex cursor-pointer items-center justify-center rounded-xl border-2 border-green-500 bg-green-500/10 px-4 py-3 text-base font-semibold text-green-400 transition hover:bg-green-500/20 sm:px-8 sm:py-4 sm:text-lg"
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
