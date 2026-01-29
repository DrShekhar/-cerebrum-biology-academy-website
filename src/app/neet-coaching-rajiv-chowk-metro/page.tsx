import { Metadata } from 'next'
import Link from 'next/link'
import {
  Phone,
  MapPin,
  Monitor,
  Users,
  Trophy,
  Train,
  MessageCircle,
  Clock,
  CheckCircle,
  ArrowRight,
  Building,
  Star,
  Zap,
  GraduationCap,
} from 'lucide-react'
import { CONTACT_INFO, getPhoneLink, getDisplayPhone } from '@/lib/constants/contactInfo'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'

const metroData = {
  name: 'Rajiv Chowk',
  slug: 'rajiv-chowk',
  lines: ['Yellow Line', 'Blue Line'],
  lineColors: ['yellow', 'blue'],
  area: 'Central Delhi',
  description:
    'Rajiv Chowk is the busiest metro station in Delhi, serving as the interchange between Yellow and Blue Lines. Located in the heart of Connaught Place, it connects students from North Delhi, South Delhi, Noida, and Gurugram to NEET coaching.',
  studentCount: '500+',
  coordinates: { lat: '28.6328', lng: '77.2197' },
  nearbyAreas: [
    'Connaught Place',
    'Janpath',
    'Barakhamba Road',
    'Mandi House',
    'Patel Chowk',
    'RK Ashram Marg',
    'Shivaji Stadium',
  ],
  nearestCenter: {
    name: 'South Extension Center',
    distance: '15 min via Yellow Line',
    line: 'Yellow Line to Green Park',
  },
  commuteDetails: [
    { destination: 'South Extension', time: '15 min', line: 'Yellow Line' },
    { destination: 'Green Park Center', time: '12 min', line: 'Yellow Line' },
    { destination: 'Rohini Center', time: '25 min', line: 'Yellow Line to Red Line' },
  ],
  faqs: [
    {
      question: 'Is there NEET coaching near Rajiv Chowk Metro Station?',
      answer:
        'Yes! Cerebrum Biology Academy offers NEET coaching easily accessible from Rajiv Chowk Metro. Our South Extension center is just 15 minutes via Yellow Line (get down at Green Park). We also offer online classes for students who prefer studying from home. 500+ students from Central Delhi areas like Connaught Place, Janpath, and Barakhamba Road are enrolled.',
    },
    {
      question: 'How do I reach Cerebrum coaching center from Rajiv Chowk Metro?',
      answer:
        'From Rajiv Chowk, take the Yellow Line towards HUDA City Centre. Get down at Green Park Metro (5 stops, ~12 min). Our South Extension center is a 3-minute walk from Green Park Metro exit. Total travel time: 15 minutes. For hybrid students, weekend offline classes make commute convenient.',
    },
    {
      question: 'What is the fee for NEET coaching accessible from Rajiv Chowk?',
      answer:
        'NEET Biology coaching fees: Online classes - Rs 48,000/year (most popular for Central Delhi students). Hybrid mode (online + weekend offline) - Rs 58,000/year. Full offline at South Extension - Rs 68,000/year. EMI options available.',
    },
    {
      question: 'Can students from Connaught Place area join online NEET classes?',
      answer:
        'Absolutely! 70% of our Central Delhi students prefer online mode. Live interactive classes via Zoom, recorded lectures, WhatsApp doubt support (7 AM - 11 PM), and weekly tests. Same AIIMS faculty, same curriculum - just more convenient!',
    },
    {
      question: 'Which metro lines connect to Cerebrum NEET coaching from Rajiv Chowk?',
      answer:
        'Rajiv Chowk connects Yellow Line and Blue Line. For South Extension/Green Park center: Take Yellow Line (12-15 min). For Rohini center: Take Yellow Line to Kashmere Gate, then Red Line (25 min total). Both lines give you easy access to our centers.',
    },
  ],
}

export const metadata: Metadata = {
  title: 'NEET Coaching Near Rajiv Chowk Metro | Biology Classes Central Delhi',
  description: `NEET Biology coaching near Rajiv Chowk Metro Station, Central Delhi. ${metroData.studentCount} students enrolled. Yellow & Blue Line connectivity. ${metroData.nearestCenter.distance} to center. AIIMS faculty. Call ${CONTACT_INFO.phone.display.primary}`,
  keywords: [
    'neet coaching near rajiv chowk metro',
    'neet coaching connaught place delhi',
    'biology classes central delhi',
    'neet preparation rajiv chowk',
    'best neet coaching near cp delhi',
    'neet classes yellow line metro',
    'neet coaching blue line metro delhi',
    'biology tuition connaught place',
    'neet coaching janpath delhi',
    'medical coaching central delhi',
  ],
  openGraph: {
    title: 'NEET Coaching Near Rajiv Chowk Metro | Cerebrum Biology Academy',
    description: `Online & Offline NEET Biology classes for students near Rajiv Chowk Metro. ${metroData.studentCount} students from Central Delhi enrolled. 15 min to South Extension center.`,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-rajiv-chowk-metro',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-rajiv-chowk-metro',
  },
}

export default function NEETCoachingRajivChowkMetroPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: metroData.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy - Near Rajiv Chowk Metro',
    description: metroData.description,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-rajiv-chowk-metro',
    telephone: CONTACT_INFO.phone.primary,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'South Extension Part 2',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110049',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: metroData.coordinates.lat,
      longitude: metroData.coordinates.lng,
    },
    areaServed: metroData.nearbyAreas.map((area) => ({
      '@type': 'Place',
      name: area,
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1200',
      bestRating: '5',
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Delhi',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-delhi',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Rajiv Chowk Metro',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-rajiv-chowk-metro',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-yellow-600 via-yellow-700 to-blue-700 py-16 text-white lg:py-20">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-white opacity-5 blur-3xl" />
            <div className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-blue-400 opacity-10 blur-3xl" />
          </div>

          <div className="container relative mx-auto px-4 text-center">
            {/* Metro Line Badges */}
            <div className="mb-6 flex flex-wrap justify-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-yellow-500 px-4 py-1.5 text-sm font-semibold text-yellow-900">
                <Train className="h-4 w-4" />
                Yellow Line
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-4 py-1.5 text-sm font-semibold text-white">
                <Train className="h-4 w-4" />
                Blue Line
              </span>
            </div>

            <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
              NEET Coaching Near{' '}
              <span className="text-yellow-300">Rajiv Chowk Metro</span>
            </h1>

            <p className="mx-auto mb-6 max-w-3xl text-xl text-white/90">
              Biology Classes for Students in Central Delhi. {metroData.studentCount} students
              enrolled from Connaught Place, Janpath & nearby areas. Just{' '}
              {metroData.nearestCenter.distance} to our center.
            </p>

            {/* Trust Badges */}
            <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center rounded-full bg-white/10 px-4 py-2">
                <GraduationCap className="mr-2 h-5 w-5 text-yellow-300" />
                <span className="text-sm font-medium">AIIMS Faculty</span>
              </div>
              <div className="flex items-center rounded-full bg-white/10 px-4 py-2">
                <Star className="mr-2 h-5 w-5 text-yellow-300" />
                <span className="text-sm font-medium">4.9/5 Rating</span>
              </div>
              <div className="flex items-center rounded-full bg-white/10 px-4 py-2">
                <Trophy className="mr-2 h-5 w-5 text-yellow-300" />
                <span className="text-sm font-medium">98% Success Rate</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsapp.number}?text=${encodeURIComponent(`Hi! I'm near Rajiv Chowk Metro. I'm interested in NEET Biology coaching.`)}`}
                className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 font-semibold text-white transition hover:bg-green-600"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Us
              </a>
              <Link
                href="/demo-booking"
                className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-gray-900 transition hover:bg-yellow-300"
              >
                Book FREE Demo
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href={getPhoneLink()}
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-6 py-3 font-semibold transition hover:bg-white/10"
              >
                <Phone className="h-5 w-5" />
                {getDisplayPhone()}
              </a>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-b bg-white py-8">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded-xl bg-yellow-50 p-4 text-center">
                <Users className="mx-auto mb-2 h-8 w-8 text-yellow-600" />
                <p className="text-2xl font-bold text-gray-900">{metroData.studentCount}</p>
                <p className="text-sm text-gray-600">Students Enrolled</p>
              </div>
              <div className="rounded-xl bg-blue-50 p-4 text-center">
                <Clock className="mx-auto mb-2 h-8 w-8 text-blue-600" />
                <p className="text-2xl font-bold text-gray-900">15 min</p>
                <p className="text-sm text-gray-600">To South Extension</p>
              </div>
              <div className="rounded-xl bg-green-50 p-4 text-center">
                <Trophy className="mx-auto mb-2 h-8 w-8 text-green-600" />
                <p className="text-2xl font-bold text-gray-900">98%</p>
                <p className="text-sm text-gray-600">Success Rate</p>
              </div>
              <div className="rounded-xl bg-purple-50 p-4 text-center">
                <Monitor className="mx-auto mb-2 h-8 w-8 text-purple-600" />
                <p className="text-2xl font-bold text-gray-900">Live</p>
                <p className="text-sm text-gray-600">Online Classes</p>
              </div>
            </div>
          </div>
        </section>

        {/* Metro Connectivity Section */}
        <section className="bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 md:text-3xl">
                <Train className="mb-2 inline h-8 w-8 text-yellow-600" />
                <br />
                Metro Connectivity from Rajiv Chowk
              </h2>

              <p className="mb-8 text-center text-gray-600">{metroData.description}</p>

              <div className="grid gap-4 md:grid-cols-3">
                {metroData.commuteDetails.map((route, index) => (
                  <div
                    key={index}
                    className="rounded-xl border-2 border-gray-100 bg-gray-50 p-4 text-center"
                  >
                    <div className="mb-2 text-2xl font-bold text-yellow-600">{route.time}</div>
                    <div className="font-medium text-gray-900">To {route.destination}</div>
                    <div className="text-sm text-gray-500">via {route.line}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Areas Served */}
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
              <MapPin className="mb-2 inline h-6 w-6 text-yellow-600" />
              <br />
              Areas We Serve Near Rajiv Chowk
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {metroData.nearbyAreas.map((area, index) => (
                <span
                  key={index}
                  className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Learning Modes */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-4 text-center text-3xl font-bold text-gray-900">
              Choose Your Learning Mode
            </h2>
            <p className="mb-12 text-center text-gray-600">
              Most Central Delhi students prefer online - save commute time!
            </p>

            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
              <div className="relative rounded-2xl border-2 border-green-200 bg-white p-6 shadow-md">
                <span className="absolute right-0 top-0 rounded-bl-lg bg-green-600 px-3 py-1 text-xs font-bold text-white">
                  MOST POPULAR
                </span>
                <Monitor className="mb-4 h-10 w-10 text-green-600" />
                <h3 className="mb-2 text-xl font-bold">100% Online</h3>
                <p className="mb-4 text-gray-600">Live classes from home. No commute needed.</p>
                <ul className="mb-4 space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Live Zoom classes
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Recorded lectures
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    WhatsApp doubt support
                  </li>
                </ul>
                <p className="text-2xl font-bold text-green-700">Rs 48,000/year</p>
              </div>

              <div className="rounded-2xl border-2 border-yellow-200 bg-yellow-50 p-6 shadow-md">
                <Train className="mb-4 h-10 w-10 text-yellow-600" />
                <h3 className="mb-2 text-xl font-bold">Hybrid Mode</h3>
                <p className="mb-4 text-gray-600">Online + Weekend offline at center.</p>
                <ul className="mb-4 space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-600" />
                    Weekday online classes
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-600" />
                    Weekend offline sessions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-600" />
                    15 min via Yellow Line
                  </li>
                </ul>
                <p className="text-2xl font-bold text-yellow-700">Rs 58,000/year</p>
              </div>

              <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-md">
                <Building className="mb-4 h-10 w-10 text-gray-600" />
                <h3 className="mb-2 text-xl font-bold">Full Offline</h3>
                <p className="mb-4 text-gray-600">Daily at South Extension center.</p>
                <ul className="mb-4 space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-gray-600" />
                    Classroom learning
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-gray-600" />
                    Direct faculty access
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-gray-600" />
                    Peer learning
                  </li>
                </ul>
                <p className="text-2xl font-bold text-gray-700">Rs 68,000/year</p>
              </div>
            </div>
          </div>
        </section>

        {/* Free NEET Tools */}
        <NEETToolsWidget
          title="Free NEET Tools for Rajiv Chowk Area Students"
          subtitle="Boost your preparation with our AI-powered tools - 100% Free"
        />

        {/* FAQs */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
              Frequently Asked Questions - Rajiv Chowk Metro
            </h2>
            <div className="mx-auto max-w-3xl space-y-4">
              {metroData.faqs.map((faq, index) => (
                <details key={index} className="group rounded-lg bg-gray-50 shadow-md">
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-4 font-semibold hover:bg-gray-100">
                    {faq.question}
                    <span className="text-yellow-600 transition-transform group-open:rotate-180">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-yellow-600 to-yellow-700 py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-6 inline-flex items-center rounded-full bg-white/20 px-6 py-2 text-sm font-bold">
              <Zap className="mr-2 h-4 w-4" />
              Limited Seats for NEET 2026 Batch!
            </div>

            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Join {metroData.studentCount} Students from Rajiv Chowk Area
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-white/90">
              Start your medical journey with expert guidance from AIIMS faculty
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsapp.number}?text=${encodeURIComponent(`Hi! I'm near Rajiv Chowk Metro. I want to join NEET coaching.`)}`}
                className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-8 py-3 font-semibold text-white transition hover:bg-green-600"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Now
              </a>
              <Link
                href="/demo-booking"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 font-semibold text-yellow-700 transition hover:bg-yellow-50"
              >
                Book Free Demo
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center text-white/80">
              <Clock className="mr-2 h-4 w-4" />
              <span className="text-sm">Available Mon-Sat, 7 AM - 9 PM</span>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
