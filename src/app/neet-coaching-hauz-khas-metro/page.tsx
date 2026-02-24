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
  name: 'Hauz Khas',
  slug: 'hauz-khas',
  lines: ['Yellow Line', 'Magenta Line'],
  lineColors: ['yellow', 'magenta'],
  area: 'South Delhi',
  description:
    'Hauz Khas Metro is a major interchange station connecting Yellow Line and Magenta Line. Located near IIT Delhi, JNU, and the famous Hauz Khas Village, it serves students from premium South Delhi localities seeking quality NEET coaching.',
  studentCount: '350+',
  coordinates: { lat: '28.5494', lng: '77.2001' },
  nearbyAreas: [
    'Hauz Khas Village',
    'SDA (Safdarjung Development Area)',
    'Green Park',
    'IIT Delhi',
    'JNU',
    'Malviya Nagar',
    'Sarvapriya Vihar',
    'Panchsheel',
  ],
  nearestCenter: {
    name: 'Green Park Center',
    distance: '5 min via Yellow Line',
    line: 'Yellow Line - 1 stop',
  },
  commuteDetails: [
    { destination: 'Green Park Center', time: '5 min', line: 'Yellow Line (1 stop)' },
    { destination: 'South Extension', time: '8 min', line: 'Yellow Line' },
    { destination: 'Gurugram Center', time: '35 min', line: 'Yellow Line' },
  ],
  faqs: [
    {
      question: 'Is there NEET coaching near Hauz Khas Metro Station?',
      answer:
        'Yes! Cerebrum Biology Academy has excellent connectivity from Hauz Khas Metro. Our Green Park center is just 1 stop away (5 min via Yellow Line). We also have a center near South Extension (8 min). 350+ students from Hauz Khas, SDA, IIT Delhi area, and Malviya Nagar are enrolled. Online classes also available.',
    },
    {
      question: 'How do I reach Cerebrum coaching from Hauz Khas Metro?',
      answer:
        'From Hauz Khas Metro, take Yellow Line towards Samaypur Badli. Get down at Green Park (just 1 stop, 3 min). Our center is a 2-minute walk from Green Park Metro Gate 1. Total travel time: under 5 minutes! This is one of the most convenient locations for South Delhi students.',
    },
    {
      question: 'What is the fee for NEET coaching near Hauz Khas?',
      answer:
        'NEET Biology coaching fees for Hauz Khas area students: Online classes - Rs 48,000/year. Hybrid mode (online + weekend offline at Green Park) - Rs 58,000/year. Full offline - Rs 68,000/year. Special discounts for IIT Delhi & JNU family members. EMI available.',
    },
    {
      question: 'Do you offer coaching for students from IIT Delhi and JNU campus?',
      answer:
        'Absolutely! We have many students whose parents work at IIT Delhi and JNU. Our Green Park center is just 5 minutes from Hauz Khas Metro, making it very convenient. We also offer flexible batch timings for students with different school schedules.',
    },
    {
      question: 'Which metro lines connect to NEET coaching from Hauz Khas?',
      answer:
        'Hauz Khas is an interchange station for Yellow Line and Magenta Line. For Green Park center: Yellow Line (1 stop). Students from Botanical Garden, Janakpuri, and IGI Airport areas can take Magenta Line to Hauz Khas, then Yellow Line to Green Park. Multiple connectivity options!',
    },
    {
      question: 'Is there any NEET coaching near SDA Market or Hauz Khas Village?',
      answer:
        'Yes! Our Green Park center is the closest NEET coaching to SDA Market and Hauz Khas Village - just 5 minutes by metro or 10 minutes by walk. Many students from Safdarjung Development Area prefer our weekend batches. Walk-in visits welcome!',
    },
  ],
}

export const metadata: Metadata = {
  title: 'NEET Coaching Near Hauz Khas Metro | Biology Classes South Delhi',
  description: `NEET Biology coaching near Hauz Khas Metro Station, South Delhi. ${metroData.studentCount} students enrolled from IIT Delhi, SDA, Green Park areas. Just ${metroData.nearestCenter.distance} to center. AIIMS faculty. Call ${CONTACT_INFO.phone.display.primary}`,
  keywords: [
    'neet coaching near hauz khas metro',
    'neet coaching sda south delhi',
    'biology classes hauz khas',
    'neet preparation green park delhi',
    'best neet coaching iit delhi area',
    'neet classes yellow line south delhi',
    'neet coaching magenta line metro',
    'biology tuition hauz khas village',
    'neet coaching malviya nagar',
    'medical coaching south delhi',
  ],
  openGraph: {
    title: 'NEET Coaching Near Hauz Khas Metro',
    description: `Online & Offline NEET Biology classes for students near Hauz Khas Metro. ${metroData.studentCount} students from South Delhi enrolled. 5 min to Green Park center.`,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-hauz-khas-metro',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-hauz-khas-metro',
  },
}

export default function NEETCoachingHauzKhasMetroPage() {
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
    name: 'Cerebrum Biology Academy - Near Hauz Khas Metro',
    description: metroData.description,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-hauz-khas-metro',
    telephone: CONTACT_INFO.phone.primary,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Green Park Main',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110016',
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
      ratingValue: '5.0',
      reviewCount: '38',
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
        name: 'South Delhi',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Hauz Khas Metro',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-hauz-khas-metro',
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
        <section className="relative bg-gradient-to-br from-yellow-600 via-yellow-700 to-pink-700 py-16 text-white lg:py-20">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-white opacity-5 blur-3xl" />
            <div className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-pink-400 opacity-10 blur-3xl" />
          </div>

          <div className="container relative mx-auto px-4 text-center">
            {/* Metro Line Badges */}
            <div className="mb-6 flex flex-wrap justify-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-yellow-500 px-4 py-1.5 text-sm font-semibold text-yellow-900">
                <Train className="h-4 w-4" />
                Yellow Line
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-4 py-1.5 text-sm font-semibold text-white">
                <Train className="h-4 w-4" />
                Magenta Line
              </span>
            </div>

            <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
              NEET Coaching Near{' '}
              <span className="text-yellow-300">Hauz Khas Metro</span>
            </h1>

            <p className="mx-auto mb-6 max-w-3xl text-xl text-white/90">
              Biology Classes for Students in South Delhi. {metroData.studentCount} students
              enrolled from IIT Delhi area, SDA, Green Park & nearby localities. Just{' '}
              {metroData.nearestCenter.distance} to our center!
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
                href={`https://wa.me/${CONTACT_INFO.whatsapp.number}?text=${encodeURIComponent(`Hi! I'm near Hauz Khas Metro. I'm interested in NEET Biology coaching.`)}`}
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
              <div className="rounded-xl bg-green-50 p-4 text-center">
                <Clock className="mx-auto mb-2 h-8 w-8 text-green-600" />
                <p className="text-2xl font-bold text-gray-900">5 min</p>
                <p className="text-sm text-gray-600">To Green Park Center</p>
              </div>
              <div className="rounded-xl bg-blue-50 p-4 text-center">
                <Trophy className="mx-auto mb-2 h-8 w-8 text-blue-600" />
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
                Metro Connectivity from Hauz Khas
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

              {/* Highlight - Very Close */}
              <div className="mt-8 rounded-xl border-2 border-green-200 bg-green-50 p-6 text-center">
                <CheckCircle className="mx-auto mb-2 h-10 w-10 text-green-600" />
                <h3 className="mb-2 text-lg font-bold text-gray-900">
                  Closest NEET Coaching to Hauz Khas!
                </h3>
                <p className="text-gray-600">
                  Our Green Park center is just 1 metro stop away - the most convenient location for South Delhi students!
                </p>
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
              Areas We Serve Near Hauz Khas Metro
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
              Hauz Khas students love our hybrid mode - just 5 min metro ride for offline classes!
            </p>

            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
              <div className="rounded-2xl border-2 border-green-200 bg-white p-6 shadow-md">
                <Monitor className="mb-4 h-10 w-10 text-green-600" />
                <h3 className="mb-2 text-xl font-bold">100% Online</h3>
                <p className="mb-4 text-gray-600">Live classes from home. Perfect for busy schedules.</p>
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

              <div className="relative rounded-2xl border-2 border-yellow-300 bg-yellow-50 p-6 shadow-md">
                <span className="absolute right-0 top-0 rounded-bl-lg bg-yellow-500 px-3 py-1 text-xs font-bold text-white">
                  RECOMMENDED
                </span>
                <Train className="mb-4 h-10 w-10 text-yellow-600" />
                <h3 className="mb-2 text-xl font-bold">Hybrid Mode</h3>
                <p className="mb-4 text-gray-600">Online + Weekend offline at Green Park center.</p>
                <ul className="mb-4 space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-600" />
                    Weekday online classes
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-600" />
                    Weekend doubt sessions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-600" />
                    Only 5 min from Hauz Khas!
                  </li>
                </ul>
                <p className="text-2xl font-bold text-yellow-700">Rs 58,000/year</p>
              </div>

              <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-md">
                <Building className="mb-4 h-10 w-10 text-gray-600" />
                <h3 className="mb-2 text-xl font-bold">Full Offline</h3>
                <p className="mb-4 text-gray-600">Daily at Green Park center (5 min away).</p>
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
          title="Free NEET Tools for Hauz Khas Area Students"
          subtitle="Boost your preparation with our AI-powered tools - 100% Free"
        />

        {/* FAQs */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
              Frequently Asked Questions - Hauz Khas Metro
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
        <section className="bg-gradient-to-br from-yellow-600 to-pink-600 py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-6 inline-flex items-center rounded-full bg-white/20 px-6 py-2 text-sm font-bold">
              <Zap className="mr-2 h-4 w-4" />
              Limited Seats for NEET 2026 Batch!
            </div>

            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Join {metroData.studentCount} Students from Hauz Khas Area
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-white/90">
              Start your medical journey with expert guidance from AIIMS faculty - just 5 min from Hauz Khas Metro!
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsapp.number}?text=${encodeURIComponent(`Hi! I'm near Hauz Khas Metro. I want to join NEET coaching.`)}`}
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
