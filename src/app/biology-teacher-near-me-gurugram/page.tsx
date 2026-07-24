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
  Award,
  BookOpen,
  Laptop,
  Compass,
  CheckCircle,
  ChevronRight,
  Home,
} from 'lucide-react'

const CANONICAL = 'https://cerebrumbiologyacademy.com/biology-teacher-near-me-gurugram'
const WHATSAPP_PHONE = '918826444334'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
  "Hi! I'm looking for a biology teacher near me in Gurugram. Please tell me how to reach your Sector 51 centre from my area."
)}`
const MAP_URL = 'https://maps.google.com/maps?q=M2K+Corporate+Park+Sector+51+Gurugram'

export const metadata: Metadata = {
  title: 'Biology Teacher Near Me in Gurugram | AIIMS-Trained, Sector 51 · Cerebrum',
  description:
    'Want an expert biology teacher near you in Gurugram? Our AIIMS-trained faculty teach from the Sector 51 centre — central to DLF, Golf Course Road, Sohna Road and MG Road, 10-20 minutes from most areas, with a live online option for far sectors.',
  keywords: [
    'biology teacher near me Gurugram',
    'biology teacher near me Gurgaon',
    'NEET biology teacher Sector 51 Gurugram',
    'expert biology teacher Gurugram',
    'AIIMS biology teacher DLF Sohna Road',
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Biology Teacher Near Me in Gurugram · Cerebrum Biology Academy',
    description:
      'An expert, AIIMS-trained biology teacher near you — Sector 51 centre central to all Gurugram, plus live online for far sectors.',
    url: CANONICAL,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Biology Teacher Near Me in Gurugram · Cerebrum',
    description:
      'AIIMS-trained biology teacher at Sector 51, central to DLF, Golf Course Road and Sohna Road, plus online.',
  },
  robots: 'index, follow, max-image-preview:large',
}

const faqs = [
  {
    question: 'Where does your biology teacher teach in Gurugram?',
    answer:
      'Our AIIMS-trained faculty teach from our centre at Unit 17, M2K Corporate Park, Mayfield Garden, Sector 51, Gurugram 122018 — central to DLF, Golf Course Road, Sohna Road and MG Road, with parking in the building.',
  },
  {
    question: 'What makes the teacher an expert?',
    answer:
      'Teaching is led by Dr. Shekhar C Singh, an AIIMS alumnus with 15+ years of experience. We are biology-only specialists with a strong NEET track record, so the teacher does biology and nothing else, all day.',
  },
  {
    question: 'How do I reach the teacher near Sector 51?',
    answer:
      'The nearest metro is Sector 53-54 Rapid Metro, about 2 km away, and the centre is also reachable from HUDA City Centre and MG Road. By road it is off NH-48 and Sohna Road, so most Gurugram areas are 10-20 minutes away.',
  },
  {
    question: "There's no biology teacher near me in the newer sectors. What can I do?",
    answer:
      'If you are in the New Gurugram sectors (80s-110s), the Sohna Road belt or Manesar, you can learn from the same teacher live online, and visit the Sector 51 centre for tests and doubt sessions whenever it suits you.',
  },
  {
    question: 'Does the teacher take large classes?',
    answer:
      'No. Batches are kept small (15-20 students) so the teacher knows each student, reviews their answers and tracks their progress every week.',
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
  name: 'Cerebrum Biology Academy — Biology Teacher, Sector 51 Gurugram',
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

export default function BiologyTeacherNearMeGurugramPage() {
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
              <span className="text-teal-700 font-medium">Biology Teacher Near Me</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-purple-800 to-teal-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              AIIMS-Trained Faculty — Sector 51, Gurugram
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Biology Teacher Near Me
              <span className="block text-yellow-400 mt-2">in Gurugram</span>
            </h1>
            <p className="text-xl text-slate-200 mb-8 max-w-3xl">
              If you&apos;re searching for a biology teacher near you in Gurugram, our Sector 51
              centre puts an{' '}
              <strong className="text-white">AIIMS-trained teacher with 15+ years</strong> within a
              short drive of most areas. In a far sector? Learn from the same teacher live online.
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
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-yellow-500 text-slate-900 hover:bg-yellow-400 px-6 py-4 rounded-xl font-bold"
              >
                <Phone className="w-5 h-5" />
                Ask Distance from My Area
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
              { stat: 'AIIMS', label: 'Trained Faculty' },
              { stat: '15+ yrs', label: 'Teaching Biology' },
              { stat: 'Sector 51', label: 'Central Gurugram Location' },
              { stat: '15-20', label: 'Students per Batch' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-purple-700">{item.stat}</p>
                <p className="text-sm text-slate-600 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teacher credentials */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              An Expert Biology Teacher, Close By
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              A specialist who teaches biology and nothing else — and whose centre you can actually
              get to.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: GraduationCap,
                title: 'AIIMS-Trained',
                description:
                  'Teaching led by Dr. Shekhar C Singh, an AIIMS alumnus with 15+ years of experience.',
              },
              {
                icon: BookOpen,
                title: 'Biology-Only Focus',
                description:
                  'A biology specialist with a strong NEET track record — depth you rarely get from all-subject coaching.',
              },
              {
                icon: Users,
                title: 'Small Batches',
                description:
                  '15-20 students per batch, so the teacher knows your name and reviews your answers.',
              },
              {
                icon: Laptop,
                title: 'Online for Far Sectors',
                description:
                  'Same teacher live online for New Gurugram sectors (80s-110s) and Manesar.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-purple-700" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why reachable */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              A Teacher Who Is Genuinely Near You
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Sector 51 sits in the middle of Gurugram, so the trip to class is short.
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
                icon: CheckCircle,
                title: '10-20 Min Away',
                description: 'Most Gurugram areas reach the Sector 51 centre in 10-20 minutes.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-2xl p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-purple-700" />
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
                className="bg-white rounded-xl p-4 border border-purple-100 shadow-sm"
              >
                <h3 className="font-bold text-slate-900">{area.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <Clock className="w-4 h-4 text-purple-700" />
                  <span className="text-purple-700 font-semibold">{area.time} drive</span>
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
              className="text-purple-700 hover:underline"
            >
              Ask us on WhatsApp
            </a>
          </p>
        </div>
      </section>

      {/* Address */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-br from-purple-50 to-teal-50 rounded-2xl p-8 border border-purple-100">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-8 h-8 text-purple-700" />
              <h2 className="text-2xl font-bold text-slate-900">Where the Teacher Is</h2>
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
                className="inline-flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-5 py-3 rounded-xl font-semibold"
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
              <h3 className="font-semibold text-purple-700">NEET Coaching Gurugram</h3>
              <p className="text-sm text-gray-600">Full programme overview</p>
            </Link>
            <Link
              href="/biology-tutor-gurugram"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-purple-700">Biology Tutor Gurugram</h3>
              <p className="text-sm text-gray-600">Meet the faculty</p>
            </Link>
            <Link
              href="/neet-coaching-near-me-gurugram"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-purple-700">NEET Coaching Near Me</h3>
              <p className="text-sm text-gray-600">Location &amp; directions</p>
            </Link>
            <Link
              href="/online-neet-coaching-gurugram"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-purple-700">Online NEET Coaching</h3>
              <p className="text-sm text-gray-600">For far sectors</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-purple-700 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Your Biology Teacher</h2>
          <p className="text-xl mb-8 opacity-90">
            Book a free demo, or ask us the exact distance from your area in Gurugram.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-purple-700 hover:bg-gray-100 px-6 py-4 rounded-xl font-bold"
            >
              <Phone className="w-5 h-5" />
              WhatsApp Us
            </a>
            <a
              href={MAP_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 border border-white text-white hover:bg-white hover:text-purple-700 px-6 py-4 rounded-xl font-semibold"
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
