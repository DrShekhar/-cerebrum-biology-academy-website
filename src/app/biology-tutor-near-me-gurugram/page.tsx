import type { Metadata } from 'next'
import Link from 'next/link'
import {
  MapPin,
  Phone,
  Navigation,
  Train,
  Car,
  Clock,
  Users,
  GraduationCap,
  Laptop,
  Compass,
  CheckCircle,
  ChevronRight,
  Home,
} from 'lucide-react'

const CANONICAL = 'https://cerebrumbiologyacademy.com/biology-tutor-near-me-gurugram'
const WHATSAPP_PHONE = '918826444334'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
  "Hi! I'm searching for a biology tutor near me in Gurugram. Please tell me how to reach your Sector 51 centre from my area."
)}`
const MAP_URL = 'https://maps.google.com/maps?q=M2K+Corporate+Park+Sector+51+Gurugram'

export const metadata: Metadata = {
  title: 'Biology Tutor Near Me in Gurugram | Sector 51 · Cerebrum Biology Academy',
  description:
    'Searching for a biology tutor near you in Gurugram? Dr. Shekhar C Singh (AIIMS alumnus, 15+ years) teaches from our Sector 51 centre — central to DLF, Golf Course Road, Sohna Road and MG Road, and 10-20 minutes from most areas. Live online too for far sectors.',
  keywords: [
    'biology tutor near me Gurugram',
    'biology tutor near me Gurgaon',
    'NEET biology tutor Sector 51 Gurugram',
    'biology home tutor Gurugram',
    'biology tutor DLF Sohna Road Golf Course Road',
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Biology Tutor Near Me in Gurugram · Cerebrum Biology Academy',
    description:
      'A biology tutor you can actually reach — Sector 51 centre central to all Gurugram, plus live online for far sectors. AIIMS-trained, 15+ years.',
    url: CANONICAL,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Biology Tutor Near Me in Gurugram · Cerebrum',
    description:
      'Sector 51 centre central to DLF, Golf Course Road and Sohna Road, plus online across Gurugram.',
  },
  robots: 'index, follow, max-image-preview:large',
}

const faqs = [
  {
    question: 'Where is your biology tutor based in Gurugram?',
    answer:
      'Our tutor, Dr. Shekhar C Singh, teaches from our centre at Unit 17, M2K Corporate Park, Mayfield Garden, Sector 51, Gurugram 122018 — a central spot with parking, reachable from DLF, Golf Course Road, Sohna Road and MG Road.',
  },
  {
    question: 'How do I reach the Sector 51 centre?',
    answer:
      'The nearest metro is Sector 53-54 on the Rapid Metro, about 2 km away, and the centre is also easy to reach from HUDA City Centre and MG Road. By road it sits just off NH-48 and Sohna Road, so most Gurugram areas are 10-20 minutes away.',
  },
  {
    question: 'I live far from Sector 51. Can I still learn from this tutor?',
    answer:
      'Yes. If you are in the newer sectors (80s-110s), the Sohna Road belt or Manesar, you can learn from the same tutor through live online biology classes, and come in to the Sector 51 centre for tests and doubt sessions whenever you want.',
  },
  {
    question: 'Do you tutor only biology?',
    answer:
      'Yes, we are biology-only specialists with a strong NEET track record. Many students keep their existing Physics and Chemistry coaching and add us purely for biology depth.',
  },
  {
    question: 'How big are the batches?',
    answer:
      'Batches are kept small (15-20 students) so the tutor can give each student personal attention, review their answers and track their progress week to week.',
  },
]

const nearbyAreas = [
  { name: 'DLF Phase 1-5', time: '10-20 min', direction: 'North' },
  { name: 'Golf Course Road', time: '10 min', direction: 'West' },
  { name: 'Sohna Road', time: '8 min', direction: 'South' },
  { name: 'Sushant Lok', time: '8 min', direction: 'North-West' },
  { name: 'South City 1 & 2', time: '6 min', direction: 'South' },
  { name: 'Nirvana Country', time: '10 min', direction: 'South-West' },
  { name: 'MG Road', time: '20 min', direction: 'North' },
  { name: 'Sector 56-57', time: '5 min', direction: 'West' },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Cerebrum Biology Academy — Biology Tutor, Sector 51 Gurugram',
  url: CANONICAL,
  telephone: '+91-88264-44334',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Unit 17, M2K Corporate Park, Mayfield Garden, Sector 51',
    addressLocality: 'Gurugram',
    addressRegion: 'Haryana',
    postalCode: '122018',
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 28.4295, longitude: 77.0426 },
  areaServed: [
    'DLF Phase 1-5',
    'Golf Course Road',
    'Sohna Road',
    'Sushant Lok',
    'South City',
    'Nirvana Country',
    'MG Road',
    'Cyber City',
    'New Gurugram',
    'Manesar',
  ],
}

export default function BiologyTutorNearMeGurugramPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Breadcrumb */}
      <nav className="bg-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center flex-wrap gap-1 text-sm">
            <li>
              <Link href="/" className="text-gray-600 hover:text-teal-600">
                <Home className="w-4 h-4" />
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <Link href="/biology-tutor-gurugram" className="text-gray-600 hover:text-teal-600">
                Biology Tutor Gurugram
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <span className="text-teal-700 font-medium">Near Me</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-teal-700 to-blue-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              Sector 51, Gurugram — Central to All Areas
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Biology Tutor Near Me
              <span className="block text-yellow-400 mt-2">in Gurugram</span>
            </h1>
            <p className="text-xl text-slate-200 mb-8 max-w-3xl">
              If you&apos;re searching for a biology tutor near you in Gurugram, our Sector 51
              centre is a short drive from most areas — and you learn from{' '}
              <strong className="text-white">
                Dr. Shekhar C Singh, an AIIMS alumnus with 15+ years
              </strong>{' '}
              of teaching biology. Too far to travel? Join the same tutor live online.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <MapPin className="w-5 h-5 text-yellow-400" />
                <span>M2K Corporate Park, Sector 51</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span>10-20 min from most areas</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Users className="w-5 h-5 text-green-400" />
                <span>Small batches (15-20)</span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center gap-2 bg-yellow-500 text-slate-900 hover:bg-yellow-400 px-6 py-4 rounded-xl font-bold"
              >
                <Navigation className="w-5 h-5" />
                Get Directions
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-semibold border border-white/30"
              >
                <Phone className="w-5 h-5" />
                Ask Distance from My Area
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Honest stat cards */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { stat: 'Sector 51', label: 'Central Gurugram Location' },
              { stat: '10-20 min', label: 'From Most Gurugram Areas' },
              { stat: 'AIIMS', label: 'Alumnus as Your Tutor' },
              { stat: '15+ yrs', label: 'Teaching Biology' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-teal-600">{item.stat}</p>
                <p className="text-sm text-slate-600 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why reachable */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              A Biology Tutor You Can Actually Reach
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Sector 51 sits in the middle of Gurugram, so the tutor near you is genuinely near you.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Compass,
                title: 'Central Location',
                description:
                  'Sector 51 is roughly equidistant from DLF, Golf Course Road, Sohna Road and MG Road.',
              },
              {
                icon: Train,
                title: 'Easy Metro Access',
                description:
                  'About 2 km from Sector 53-54 Rapid Metro; also reachable from HUDA City Centre and MG Road.',
              },
              {
                icon: Car,
                title: 'Off NH-48 & Sohna Road',
                description:
                  'Straightforward drive with parking at M2K Corporate Park — no cross-city commute.',
              },
              {
                icon: Laptop,
                title: 'Online for Far Sectors',
                description:
                  'Live online classes with the same tutor for New Gurugram sectors and Manesar.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas served */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How Near We Are to Your Area
            </h2>
            <p className="text-xl text-slate-600">Typical drive time to the Sector 51 centre</p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {nearbyAreas.map((area) => (
              <div
                key={area.name}
                className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-4 border border-teal-100"
              >
                <h3 className="font-bold text-slate-900">{area.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <Clock className="w-4 h-4 text-teal-600" />
                  <span className="text-teal-700 font-semibold">{area.time} drive</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">{area.direction}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-500 mt-6">
            Don&apos;t see your area?{' '}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 hover:underline"
            >
              Ask us on WhatsApp
            </a>
          </p>
        </div>
      </section>

      {/* Tutor + address */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-8 h-8 text-teal-600" />
              <h2 className="text-2xl font-bold text-slate-900">Your Tutor</h2>
            </div>
            <p className="text-slate-600 mb-4">
              Dr. Shekhar C Singh is an AIIMS alumnus with over 15 years of teaching biology. He
              leads small batches personally, so the person you meet on day one is the person who
              teaches, reviews your answers and clears your doubts.
            </p>
            <ul className="space-y-3">
              {[
                'AIIMS-trained, biology-only specialist',
                'Small batches of 15-20 for personal attention',
                'Weekly testing with per-student review',
                'Strong NEET biology track record',
              ].map((point) => (
                <li key={point} className="flex items-start gap-2 text-slate-700">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-8 h-8 text-teal-600" />
              <h2 className="text-2xl font-bold text-slate-900">Centre Address</h2>
            </div>
            <p className="text-slate-600 mb-2">
              Unit 17, M2K Corporate Park, Mayfield Garden, Sector 51, Gurugram 122018
            </p>
            <p className="text-sm text-slate-500 mb-6">
              Nearest metro: Sector 53-54 Rapid Metro (~2 km). Off NH-48 and Sohna Road.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-xl font-semibold"
              >
                <Navigation className="w-4 h-4" />
                Open in Google Maps
              </a>
              <a
                href="tel:+918826444334"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl font-semibold"
              >
                <Phone className="w-4 h-4" />
                +91-88264-44334
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-gray-50 rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                <p className="text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related links */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Explore More</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link
              href="/neet-coaching-gurugram"
              className="bg-white p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">NEET Coaching Gurugram</h3>
              <p className="text-sm text-gray-600">Full programme overview</p>
            </Link>
            <Link
              href="/biology-tutor-gurugram"
              className="bg-white p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">Biology Tutor Gurugram</h3>
              <p className="text-sm text-gray-600">Meet the faculty</p>
            </Link>
            <Link
              href="/neet-coaching-near-me-gurugram"
              className="bg-white p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">NEET Coaching Near Me</h3>
              <p className="text-sm text-gray-600">Location &amp; directions</p>
            </Link>
            <Link
              href="/online-neet-coaching-gurugram"
              className="bg-white p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">Online NEET Coaching</h3>
              <p className="text-sm text-gray-600">For far sectors</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Find a Biology Tutor Near You</h2>
          <p className="text-xl mb-8 opacity-90">
            Book a free demo, or ask us the exact distance from your area in Gurugram.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-teal-600 hover:bg-gray-100 px-6 py-4 rounded-xl font-bold"
            >
              <Phone className="w-5 h-5" />
              WhatsApp Us
            </a>
            <a
              href={MAP_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 border border-white text-white hover:bg-white hover:text-teal-600 px-6 py-4 rounded-xl font-semibold"
            >
              <Navigation className="w-5 h-5" />
              Get Directions
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
