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
  name: 'Kashmere Gate',
  slug: 'kashmere-gate',
  lines: ['Red Line', 'Yellow Line', 'Violet Line'],
  lineColors: ['red', 'yellow', 'violet'],
  area: 'North Delhi',
  description:
    'Kashmere Gate is one of the largest metro interchange stations in Delhi, connecting Red Line, Yellow Line, and Violet Line. It serves as a major hub for students from North Delhi, Old Delhi, East Delhi, and areas towards Ghaziabad seeking quality NEET coaching.',
  studentCount: '400+',
  coordinates: { lat: '28.6675', lng: '77.2284' },
  nearbyAreas: [
    'Civil Lines',
    'Old Delhi',
    'Chandni Chowk',
    'Tis Hazari',
    'Model Town',
    'GTB Nagar',
    'Shastri Nagar',
    'University of Delhi',
    'Kamla Nagar',
  ],
  nearestCenter: {
    name: 'Rohini Center',
    distance: '20 min via Red Line',
    line: 'Red Line towards Rithala',
  },
  commuteDetails: [
    { destination: 'Rohini Center', time: '20 min', line: 'Red Line' },
    { destination: 'South Extension', time: '25 min', line: 'Yellow Line' },
    { destination: 'Green Park Center', time: '28 min', line: 'Yellow Line' },
  ],
  faqs: [
    {
      question: 'Is there NEET coaching near Kashmere Gate Metro Station?',
      answer:
        'Yes! Cerebrum Biology Academy offers NEET coaching easily accessible from Kashmere Gate Metro. Our Rohini center is 20 minutes via Red Line, and South Extension center is 25 minutes via Yellow Line. 400+ students from Civil Lines, Old Delhi, Model Town, and North Delhi areas are enrolled. Online classes also available.',
    },
    {
      question: 'How do I reach Cerebrum coaching center from Kashmere Gate Metro?',
      answer:
        'From Kashmere Gate, you have multiple options: (1) For Rohini Center: Take Red Line towards Rithala, get down at Rohini West (20 min). (2) For South Extension: Take Yellow Line towards HUDA City Centre, get down at Green Park (25-28 min). Both centers are a 5-minute walk from respective metro stations.',
    },
    {
      question: 'What is the fee for NEET coaching accessible from Kashmere Gate?',
      answer:
        'NEET Biology coaching fees for North Delhi students: Online classes - Rs 48,000/year (popular choice for Old Delhi students). Hybrid mode (online + weekend offline) - Rs 58,000/year. Full offline at Rohini - Rs 68,000/year. Special scholarship for DU students. EMI available.',
    },
    {
      question: 'Can students from Old Delhi and Chandni Chowk join online NEET classes?',
      answer:
        'Absolutely! 65% of our North Delhi students prefer online mode due to traffic in Old Delhi area. Live interactive classes via Zoom, recorded lectures available 24/7, WhatsApp doubt support (7 AM - 11 PM), and weekly tests. Same AIIMS faculty teaching quality!',
    },
    {
      question: 'Which metro lines connect to Cerebrum NEET coaching from Kashmere Gate?',
      answer:
        'Kashmere Gate is a triple-line interchange: Red Line (to Rohini Center - 20 min), Yellow Line (to South Extension/Green Park - 25-28 min), and Violet Line (connects East Delhi students via ITO). This makes Kashmere Gate one of the best-connected stations for our coaching.',
    },
    {
      question: 'Is there NEET coaching for Delhi University students near Kashmere Gate?',
      answer:
        'Yes! Many Delhi University students from North Campus area join our evening batches. From Kashmere Gate, GTB Nagar and Model Town students can easily reach our Rohini center in 15-20 minutes. We offer flexible batch timings: Morning (7-9 AM), Afternoon (2-4 PM), and Evening (6-8 PM).',
    },
  ],
}

export const metadata: Metadata = {
  title: 'NEET Coaching Near Kashmere Gate Metro | Biology Classes North Delhi',
  description: `NEET Biology coaching near Kashmere Gate Metro Station, North Delhi. ${metroData.studentCount} students enrolled from Civil Lines, Old Delhi, Model Town. Red, Yellow, Violet Line connectivity. AIIMS faculty. Call ${CONTACT_INFO.phone.display.primary}`,
  keywords: [
    'neet coaching near kashmere gate metro',
    'neet coaching north delhi',
    'biology classes old delhi',
    'neet preparation civil lines delhi',
    'best neet coaching near delhi university',
    'neet classes red line metro delhi',
    'neet coaching yellow line kashmere gate',
    'biology tuition chandni chowk',
    'neet coaching model town delhi',
    'medical coaching north delhi',
  ],
  openGraph: {
    title: 'NEET Coaching Near Kashmere Gate Metro',
    description: `Online & Offline NEET Biology classes for students near Kashmere Gate Metro. ${metroData.studentCount} students from North Delhi enrolled. Red, Yellow & Violet Line connectivity.`,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-kashmere-gate-metro',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-kashmere-gate-metro',
  },
}

export default function NEETCoachingKashmereGateMetroPage() {
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
    name: 'Cerebrum Biology Academy - Near Kashmere Gate Metro',
    description: metroData.description,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-kashmere-gate-metro',
    telephone: CONTACT_INFO.phone.primary,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Sector 9, Rohini',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110085',
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
        name: 'North Delhi',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-north-delhi',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Kashmere Gate Metro',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-kashmere-gate-metro',
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
        <section className="relative bg-gradient-to-br from-red-600 via-red-700 to-violet-700 py-16 text-white lg:py-20">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-white opacity-5 blur-3xl" />
            <div className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-yellow-400 opacity-10 blur-3xl" />
          </div>

          <div className="container relative mx-auto px-4 text-center">
            {/* Metro Line Badges */}
            <div className="mb-6 flex flex-wrap justify-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-red-500 px-4 py-1.5 text-sm font-semibold text-white">
                <Train className="h-4 w-4" />
                Red Line
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-yellow-500 px-4 py-1.5 text-sm font-semibold text-yellow-900">
                <Train className="h-4 w-4" />
                Yellow Line
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-violet-500 px-4 py-1.5 text-sm font-semibold text-white">
                <Train className="h-4 w-4" />
                Violet Line
              </span>
            </div>

            <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
              NEET Coaching Near{' '}
              <span className="text-yellow-300">Kashmere Gate Metro</span>
            </h1>

            <p className="mx-auto mb-6 max-w-3xl text-xl text-white/90">
              Biology Classes for Students in North Delhi. {metroData.studentCount} students
              enrolled from Civil Lines, Old Delhi, DU area & nearby localities. Triple metro line connectivity!
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
                href={`https://wa.me/${CONTACT_INFO.whatsapp.number}?text=${encodeURIComponent(`Hi! I'm near Kashmere Gate Metro. I'm interested in NEET Biology coaching.`)}`}
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
              <div className="rounded-xl bg-red-50 p-4 text-center">
                <Users className="mx-auto mb-2 h-8 w-8 text-red-600" />
                <p className="text-2xl font-bold text-gray-900">{metroData.studentCount}</p>
                <p className="text-sm text-gray-600">Students Enrolled</p>
              </div>
              <div className="rounded-xl bg-yellow-50 p-4 text-center">
                <Clock className="mx-auto mb-2 h-8 w-8 text-yellow-600" />
                <p className="text-2xl font-bold text-gray-900">20 min</p>
                <p className="text-sm text-gray-600">To Rohini Center</p>
              </div>
              <div className="rounded-xl bg-green-50 p-4 text-center">
                <Trophy className="mx-auto mb-2 h-8 w-8 text-green-600" />
                <p className="text-2xl font-bold text-gray-900">98%</p>
                <p className="text-sm text-gray-600">Success Rate</p>
              </div>
              <div className="rounded-xl bg-violet-50 p-4 text-center">
                <Train className="mx-auto mb-2 h-8 w-8 text-violet-600" />
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-sm text-gray-600">Metro Lines</p>
              </div>
            </div>
          </div>
        </section>

        {/* Metro Connectivity Section */}
        <section className="bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 md:text-3xl">
                <Train className="mb-2 inline h-8 w-8 text-red-600" />
                <br />
                Metro Connectivity from Kashmere Gate
              </h2>

              <p className="mb-8 text-center text-gray-600">{metroData.description}</p>

              <div className="grid gap-4 md:grid-cols-3">
                {metroData.commuteDetails.map((route, index) => (
                  <div
                    key={index}
                    className={`rounded-xl border-2 p-4 text-center ${
                      index === 0
                        ? 'border-red-200 bg-red-50'
                        : index === 1
                          ? 'border-yellow-200 bg-yellow-50'
                          : 'border-violet-200 bg-violet-50'
                    }`}
                  >
                    <div
                      className={`mb-2 text-2xl font-bold ${
                        index === 0 ? 'text-red-600' : index === 1 ? 'text-yellow-600' : 'text-violet-600'
                      }`}
                    >
                      {route.time}
                    </div>
                    <div className="font-medium text-gray-900">To {route.destination}</div>
                    <div className="text-sm text-gray-500">via {route.line}</div>
                  </div>
                ))}
              </div>

              {/* Highlight - Triple Line Hub */}
              <div className="mt-8 rounded-xl border-2 border-blue-200 bg-blue-50 p-6 text-center">
                <CheckCircle className="mx-auto mb-2 h-10 w-10 text-blue-600" />
                <h3 className="mb-2 text-lg font-bold text-gray-900">
                  Triple Line Interchange - Maximum Connectivity!
                </h3>
                <p className="text-gray-600">
                  Kashmere Gate connects 3 metro lines, making it the best hub for North Delhi, Old Delhi, and East Delhi students to access our coaching centers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Areas Served */}
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
              <MapPin className="mb-2 inline h-6 w-6 text-red-600" />
              <br />
              Areas We Serve from Kashmere Gate
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
              Most Old Delhi students prefer online to avoid traffic - study from home!
            </p>

            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
              <div className="relative rounded-2xl border-2 border-green-200 bg-white p-6 shadow-md">
                <span className="absolute right-0 top-0 rounded-bl-lg bg-green-600 px-3 py-1 text-xs font-bold text-white">
                  MOST POPULAR
                </span>
                <Monitor className="mb-4 h-10 w-10 text-green-600" />
                <h3 className="mb-2 text-xl font-bold">100% Online</h3>
                <p className="mb-4 text-gray-600">Live classes from home. Best for Old Delhi students.</p>
                <ul className="mb-4 space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Live Zoom classes
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    No traffic hassles
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    WhatsApp doubt support
                  </li>
                </ul>
                <p className="text-2xl font-bold text-green-700">Rs 48,000/year</p>
              </div>

              <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-6 shadow-md">
                <Train className="mb-4 h-10 w-10 text-red-600" />
                <h3 className="mb-2 text-xl font-bold">Hybrid Mode</h3>
                <p className="mb-4 text-gray-600">Online + Weekend offline at Rohini center.</p>
                <ul className="mb-4 space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-red-600" />
                    Weekday online classes
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-red-600" />
                    Weekend doubt sessions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-red-600" />
                    20 min via Red Line
                  </li>
                </ul>
                <p className="text-2xl font-bold text-red-700">Rs 58,000/year</p>
              </div>

              <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-md">
                <Building className="mb-4 h-10 w-10 text-gray-600" />
                <h3 className="mb-2 text-xl font-bold">Full Offline</h3>
                <p className="mb-4 text-gray-600">Daily at Rohini center (20 min away).</p>
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
          title="Free NEET Tools for Kashmere Gate Area Students"
          subtitle="Boost your preparation with our AI-powered tools - 100% Free"
        />

        {/* FAQs */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
              Frequently Asked Questions - Kashmere Gate Metro
            </h2>
            <div className="mx-auto max-w-3xl space-y-4">
              {metroData.faqs.map((faq, index) => (
                <details key={index} className="group rounded-lg bg-gray-50 shadow-md">
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-4 font-semibold hover:bg-gray-100">
                    {faq.question}
                    <span className="text-red-600 transition-transform group-open:rotate-180">
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
        <section className="bg-gradient-to-br from-red-600 to-violet-600 py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-6 inline-flex items-center rounded-full bg-white/20 px-6 py-2 text-sm font-bold">
              <Zap className="mr-2 h-4 w-4" />
              Limited Seats for NEET 2026 Batch!
            </div>

            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Join {metroData.studentCount} Students from Kashmere Gate Area
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-white/90">
              Start your medical journey with expert guidance from AIIMS faculty - connected by 3 metro lines!
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsapp.number}?text=${encodeURIComponent(`Hi! I'm near Kashmere Gate Metro. I want to join NEET coaching.`)}`}
                className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-8 py-3 font-semibold text-white transition hover:bg-green-600"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Now
              </a>
              <Link
                href="/demo-booking"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 font-semibold text-red-700 transition hover:bg-red-50"
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
