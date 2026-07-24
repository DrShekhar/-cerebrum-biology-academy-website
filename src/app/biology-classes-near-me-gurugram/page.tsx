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
  Sunrise,
  Sun,
  Sunset,
  Laptop,
  Compass,
  ChevronRight,
  Home,
} from 'lucide-react'

const CANONICAL = 'https://cerebrumbiologyacademy.com/biology-classes-near-me-gurugram'
const WHATSAPP_PHONE = '918826444334'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
  "Hi! I'm looking for biology classes near me in Gurugram. Please share batch timings and how to reach your Sector 51 centre."
)}`
const MAP_URL = 'https://maps.google.com/maps?q=M2K+Corporate+Park+Sector+51+Gurugram'

export const metadata: Metadata = {
  title: 'Biology Classes Near Me in Gurugram | Small Batches, Sector 51 · Cerebrum',
  description:
    'Looking for biology classes near you in Gurugram? Small-batch classes (15-20) at our Sector 51 centre with morning, afternoon and evening timings — central to DLF, Sohna Road, Golf Course Road and MG Road, plus a live online option for far sectors.',
  keywords: [
    'biology classes near me Gurugram',
    'biology classes near me Gurgaon',
    'NEET biology classes Sector 51 Gurugram',
    'biology tuition classes Gurugram',
    'biology coaching classes DLF Sohna Road',
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Biology Classes Near Me in Gurugram · Cerebrum Biology Academy',
    description:
      'Small-batch biology classes near you — Sector 51 centre, morning/afternoon/evening timings, plus live online across Gurugram.',
    url: CANONICAL,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Biology Classes Near Me in Gurugram · Cerebrum',
    description:
      'Small-batch classes at Sector 51 with flexible timings, plus online across Gurugram.',
  },
  robots: 'index, follow, max-image-preview:large',
}

const faqs = [
  {
    question: 'Where are your biology classes held in Gurugram?',
    answer:
      'Classes run at our centre — Unit 17, M2K Corporate Park, Mayfield Garden, Sector 51, Gurugram 122018. It is central to DLF, Golf Course Road, Sohna Road and MG Road, with parking in the building.',
  },
  {
    question: 'What batch timings do you offer?',
    answer:
      'We run morning, afternoon and evening batches so you can pick a slot that fits school and travel. Tell us your area and school timings on WhatsApp and we will suggest the batch that works best.',
  },
  {
    question: 'How do I reach the classes near Sector 51?',
    answer:
      'The nearest metro is Sector 53-54 Rapid Metro, about 2 km away, and the centre is also reachable from HUDA City Centre and MG Road. By road it is just off NH-48 and Sohna Road, so most areas are 10-20 minutes away.',
  },
  {
    question: 'What if there are no classes near me in the newer sectors?',
    answer:
      'If you are in the New Gurugram sectors (80s-110s), the Sohna Road belt or Manesar, you can join the same classes live online, and come to the Sector 51 centre for full-length tests and doubt sessions when you want.',
  },
  {
    question: 'How many students are in a class, and is it only biology?',
    answer:
      'Classes are small (15-20 students) so the teacher can give each student attention. We are biology-only specialists with a strong NEET track record — many students keep their Physics and Chemistry coaching and add us for biology.',
  },
]

const batches = [
  {
    icon: Sunrise,
    label: 'Morning Batch',
    detail: 'Early slots that finish before or fit around school hours.',
  },
  {
    icon: Sun,
    label: 'Afternoon Batch',
    detail: 'Midday sessions for students on flexible or half-day schedules.',
  },
  {
    icon: Sunset,
    label: 'Evening Batch',
    detail: 'After-school slots convenient for DLF, Sohna Road and MG Road commuters.',
  },
]

const nearbyAreas = [
  { name: 'DLF Phase 1-5', time: '10-20 min' },
  { name: 'Golf Course Road', time: '10 min' },
  { name: 'Sohna Road', time: '8 min' },
  { name: 'Sushant Lok', time: '8 min' },
  { name: 'South City 1 & 2', time: '6 min' },
  { name: 'Nirvana Country', time: '10 min' },
  { name: 'MG Road', time: '20 min' },
  { name: 'Sector 56-57', time: '5 min' },
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
  name: 'Cerebrum Biology Academy — Biology Classes, Sector 51 Gurugram',
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

export default function BiologyClassesNearMeGurugramPage() {
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
              <Link href="/neet-coaching-gurugram" className="text-gray-600 hover:text-teal-600">
                NEET Coaching Gurugram
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <span className="text-teal-700 font-medium">Biology Classes Near Me</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-blue-700 to-teal-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              Sector 51, Gurugram — Small-Batch Classes
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Biology Classes Near Me
              <span className="block text-yellow-400 mt-2">in Gurugram</span>
            </h1>
            <p className="text-xl text-slate-200 mb-8 max-w-3xl">
              If you&apos;re looking for biology classes near you in Gurugram, our Sector 51 centre
              runs <strong className="text-white">small batches of 15-20</strong> with morning,
              afternoon and evening timings. Live far out? Join the same classes online — same
              teacher, same material.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <MapPin className="w-5 h-5 text-yellow-400" />
                <span>M2K Corporate Park, Sector 51</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span>Morning / Afternoon / Evening</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Users className="w-5 h-5 text-green-400" />
                <span>15-20 per batch</span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-yellow-500 text-slate-900 hover:bg-yellow-400 px-6 py-4 rounded-xl font-bold"
              >
                <Phone className="w-5 h-5" />
                Ask for Batch Timings
              </a>
              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-semibold border border-white/30"
              >
                <Navigation className="w-5 h-5" />
                Get Directions
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
              { stat: '15-20', label: 'Students per Batch' },
              { stat: '3 slots', label: 'Morning / Afternoon / Evening' },
              { stat: 'AIIMS', label: 'Trained Faculty' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-blue-600">{item.stat}</p>
                <p className="text-sm text-slate-600 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Batch timings */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Class Timings That Fit Your Day
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Pick a batch around your school and travel. Tell us your area and we&apos;ll suggest
              the slot with the easiest commute.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {batches.map((b) => (
              <div key={b.label} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <b.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{b.label}</h3>
                <p className="text-slate-600 text-sm">{b.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why near */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Classes That Are Genuinely Near You
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Sector 51 is central, so getting to class doesn&apos;t eat your evening.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Compass,
                title: 'Central Location',
                description:
                  'Roughly equidistant from DLF, Golf Course Road, Sohna Road and MG Road.',
              },
              {
                icon: Train,
                title: 'Easy Metro Access',
                description:
                  'About 2 km from Sector 53-54 Rapid Metro; also HUDA City Centre and MG Road.',
              },
              {
                icon: Car,
                title: 'Off NH-48 & Sohna Road',
                description: 'Simple drive with parking at M2K Corporate Park.',
              },
              {
                icon: Laptop,
                title: 'Online for Far Sectors',
                description: 'Same live classes for New Gurugram sectors (80s-110s) and Manesar.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-2xl p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas served */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Areas We Serve</h2>
            <p className="text-xl text-slate-600">Typical drive time to the Sector 51 centre</p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {nearbyAreas.map((area) => (
              <div
                key={area.name}
                className="bg-white rounded-xl p-4 border border-blue-100 shadow-sm"
              >
                <h3 className="font-bold text-slate-900">{area.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-700 font-semibold">{area.time} drive</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-500 mt-6">
            Don&apos;t see your area?{' '}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Ask us on WhatsApp
            </a>
          </p>
        </div>
      </section>

      {/* Address */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 border border-blue-100">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-slate-900">Where the Classes Run</h2>
            </div>
            <p className="text-slate-700 mb-2">
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
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold"
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                <p className="text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related links */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Explore More</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link
              href="/neet-coaching-gurugram"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-blue-600">NEET Coaching Gurugram</h3>
              <p className="text-sm text-gray-600">Full programme overview</p>
            </Link>
            <Link
              href="/biology-tutor-gurugram"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-blue-600">Biology Tutor Gurugram</h3>
              <p className="text-sm text-gray-600">Meet the faculty</p>
            </Link>
            <Link
              href="/neet-coaching-near-me-gurugram"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-blue-600">NEET Coaching Near Me</h3>
              <p className="text-sm text-gray-600">Location &amp; directions</p>
            </Link>
            <Link
              href="/online-neet-coaching-gurugram"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-blue-600">Online NEET Coaching</h3>
              <p className="text-sm text-gray-600">For far sectors</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Biology Classes Near You</h2>
          <p className="text-xl mb-8 opacity-90">
            Ask for the batch timings that fit your area, or book a free demo class.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-gray-100 px-6 py-4 rounded-xl font-bold"
            >
              <Phone className="w-5 h-5" />
              WhatsApp for Timings
            </a>
            <a
              href={MAP_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 border border-white text-white hover:bg-white hover:text-blue-600 px-6 py-4 rounded-xl font-semibold"
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
