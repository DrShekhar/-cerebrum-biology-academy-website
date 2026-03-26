import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbSchema } from '@/components/seo'
import {
  MapPin,
  Train,
  Phone,
  MessageCircle,
  GraduationCap,
  Users,
  Trophy,
  Video,
  BookOpen,
  Clock,
  Wifi,
  CheckCircle2,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Near Me | Delhi NCR | 4 Centers + Online | 98% Success',
  description:
    'Find NEET Biology coaching near you in Delhi NCR. 4 centers — South Extension, Rohini, Gurugram (Sector 51), Faridabad (Sector 17). AIIMS faculty, 15-student batches, ₹48K/year. Call 88264-44334.',
  keywords: [
    'neet biology coaching near me',
    'neet biology coaching near me delhi',
    'neet biology tutorials near me',
    'biology coaching near me',
    'neet coaching near me noida',
    'neet coaching near me gurugram',
    'neet coaching near me faridabad',
    'best neet biology coaching near me',
    'neet biology classes near me',
    'biology coaching classes near me',
  ],
  openGraph: {
    title: 'NEET Biology Coaching Near Me | Delhi NCR | 4 Centers + Online',
    description:
      'Find NEET Biology coaching near you in Delhi NCR. 4 centers, AIIMS faculty, 15-student batches, ₹48K/year.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/neet-biology-coaching-near-me',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Coaching Near Me | Delhi NCR | 4 Centers',
    description: 'AIIMS faculty, 98% success rate, 4 centers across Delhi NCR.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-biology-coaching-near-me',
  },
}

const centers = [
  {
    name: 'South Extension',
    address: 'D 35, South Extension Part 2, Delhi 110049',
    metro: 'South Extension Metro (Violet Line)',
    areas: 'GK, Defence Colony, Hauz Khas, Lajpat Nagar, Saket',
    mapUrl: 'https://maps.google.com/?q=D+35+South+Extension+Part+2+Delhi+110049',
    cityPage: '/neet-coaching-delhi',
  },
  {
    name: 'Rohini',
    address: '211 Vikas Surya Tower, DC Chowk, Sector 9, Delhi 110085',
    metro: 'Rohini West Metro (Red Line)',
    areas: 'Pitampura, Shalimar Bagh, Model Town, Prashant Vihar',
    mapUrl: 'https://maps.google.com/?q=211+Vikas+Surya+Tower+DC+Chowk+Sector+9+Rohini+Delhi',
    cityPage: '/neet-coaching-delhi',
  },
  {
    name: 'Gurugram',
    address: 'Unit 17, M2K Corporate Park, Sector 51, 122018',
    metro: 'HUDA City Centre Metro',
    areas: 'DLF Phases, Golf Course Road, Sushant Lok, Sector 14-57',
    mapUrl: 'https://maps.google.com/?q=M2K+Corporate+Park+Sector+51+Gurugram',
    cityPage: '/neet-coaching-gurugram',
  },
  {
    name: 'Faridabad',
    address: 'SCF-124-125, Huda Market, Sector 17, 121002',
    metro: 'Bata Chowk Metro (Violet Line)',
    areas: 'NIT, Sector 15-21, Ballabhgarh, Greater Faridabad',
    mapUrl: 'https://maps.google.com/?q=SCF+124+Huda+Market+Sector+17+Faridabad',
    cityPage: '/neet-coaching-faridabad',
  },
]

const differentiators = [
  {
    icon: GraduationCap,
    title: 'AIIMS-Trained Faculty',
    desc: 'Every teacher is an AIIMS alumnus with 10+ years of NEET coaching experience.',
  },
  {
    icon: Users,
    title: '15-Student Batches',
    desc: 'Small batches ensure personal attention. No 200-student lecture halls here.',
  },
  {
    icon: Trophy,
    title: '98% Success Rate',
    desc: '67+ AIIMS selections, 15,000+ students coached over 12 years.',
  },
  {
    icon: Video,
    title: 'Recorded Lectures',
    desc: 'Miss a class? Watch the recording. Every lecture is available on your dashboard.',
  },
  {
    icon: BookOpen,
    title: '19,000+ MCQ Bank',
    desc: 'Practice with our curated question bank covering every NEET Biology topic.',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    desc: 'Morning, evening, and weekend batches. Choose what fits your school schedule.',
  },
]

const stats = [
  { value: '15,000+', label: 'Students Coached' },
  { value: '98%', label: 'Success Rate' },
  { value: '67+', label: 'AIIMS Selections' },
  { value: '4', label: 'Centers in Delhi NCR' },
  { value: '12+', label: 'Years of Teaching' },
]

const faqs = [
  {
    q: 'Is there NEET biology coaching near me in Rohini?',
    a: 'Yes. Our Rohini center is at 211 Vikas Surya Tower, DC Chowk, Sector 9 — a 5-minute walk from Rohini West Metro (Red Line). Students from Pitampura, Shalimar Bagh, Model Town, and Prashant Vihar attend here.',
  },
  {
    q: 'Is there NEET biology coaching near me in Dwarka?',
    a: 'We do not have a center in Dwarka yet. However, our South Extension center is accessible via the Blue Line to Mandi House, then Violet Line to South Extension. Alternatively, join our online program — same faculty, same content, from home.',
  },
  {
    q: 'Is there NEET biology coaching near me in Noida?',
    a: 'Our Faridabad and South Extension centers serve parts of Noida, but for most Noida students, our online program is the best option. You get live classes with AIIMS faculty, recorded lectures, and the full MCQ bank — no commute required.',
  },
  {
    q: 'Is there NEET biology coaching near me in GK or Defence Colony?',
    a: 'Yes. Our South Extension center (D 35, South Extension Part 2) is just 5-10 minutes from Greater Kailash and Defence Colony. The nearest metro is South Extension on the Violet Line.',
  },
  {
    q: 'Is there NEET biology coaching near me in Gurugram?',
    a: 'Yes. Our Gurugram center is at M2K Corporate Park, Sector 51. Students from DLF Phases, Golf Course Road, Sushant Lok, and Sectors 14-57 attend here. The nearest metro is HUDA City Centre.',
  },
  {
    q: 'Is there NEET biology coaching near me in Faridabad?',
    a: 'Yes. Our Faridabad center is at SCF-124-125, Huda Market, Sector 17. It serves NIT, Sectors 15-21, Ballabhgarh, and Greater Faridabad. Bata Chowk Metro (Violet Line) is the nearest station.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Cerebrum Biology Academy',
  url: 'https://cerebrumbiologyacademy.com',
  telephone: '+91-88264-44334',
  location: centers.map((c) => ({
    '@type': 'LocalBusiness',
    name: `Cerebrum Biology Academy — ${c.name}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: c.address.split(',')[0],
      addressLocality: c.name,
      addressRegion: 'Delhi NCR',
      addressCountry: 'IN',
    },
    telephone: '+91-88264-44334',
    url: `https://cerebrumbiologyacademy.com${c.cityPage}`,
  })),
}

export default function NEETBiologyCoachingNearMePage() {
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

      <div className="mx-auto max-w-7xl px-4 pt-4">
        <BreadcrumbSchema
          items={[{ label: 'NEET Biology Coaching Near Me', isCurrentPage: true }]}
        />
      </div>

      <section className="bg-gradient-to-b from-green-50 to-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
            NEET Biology Coaching Near You — 4 Centers Across Delhi NCR
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600">
            Stop searching &quot;NEET biology coaching near me&quot; on JustDial. We have 4 physical
            centers + a full online program. AIIMS faculty, 15-student batches, 98% success rate.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="tel:+918826444334"
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white shadow-md hover:bg-green-700"
            >
              <Phone className="h-5 w-5" />
              Call 88264-44334
            </Link>
            <Link
              href="/book-free-demo"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-green-600 px-6 py-3 font-semibold text-green-700 hover:bg-green-50"
            >
              Book Free Demo
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center text-2xl font-bold text-slate-900 md:text-3xl">
            Find Your Nearest Center
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            4 centers strategically located near Metro stations across Delhi NCR
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {centers.map((center) => (
              <div
                key={center.name}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
                    <MapPin className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Cerebrum Biology Academy — {center.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">{center.address}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-teal-700">
                  <Train className="h-4 w-4" />
                  <span>Near {center.metro}</span>
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  <span className="font-medium text-slate-700">Areas served:</span> {center.areas}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href={center.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200"
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    Get Directions
                  </Link>
                  <Link
                    href={center.cityPage}
                    className="inline-flex items-center gap-1 rounded-md bg-green-100 px-3 py-1.5 text-sm font-medium text-green-700 hover:bg-green-200"
                  >
                    View Center Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-50 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-center gap-3">
            <Wifi className="h-7 w-7 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              No Center Near You? Join Online
            </h2>
          </div>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            Students in Noida, Ghaziabad, East Delhi, or anywhere far from our centers — our online
            program delivers the same quality without the commute.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              'Same AIIMS faculty teaching live — not pre-recorded videos',
              'Save 2-3 hours daily on travel — invest that time studying',
              'Recorded lectures available for revision anytime',
              'Full access to 19,000+ MCQ bank and test series',
            ].map((reason, i) => (
              <div
                key={i}
                className="rounded-lg border border-blue-200 bg-white p-5 text-center shadow-sm"
              >
                <CheckCircle2 className="mx-auto h-6 w-6 text-blue-600" />
                <p className="mt-3 text-sm font-medium text-slate-700">{reason}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/book-free-demo"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md hover:bg-blue-700"
            >
              Try a Free Online Demo Class
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center text-2xl font-bold text-slate-900 md:text-3xl">
            Why Choose Cerebrum Over 2,400+ Coaching Centers Listed Online
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            JustDial lists thousands. But quantity is not quality. Here is what sets us apart from
            every other result on your screen.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100">
                  <item.icon className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-green-600 py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="mt-1 text-sm text-green-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center text-2xl font-bold text-slate-900 md:text-3xl">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto mt-8 max-w-3xl space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-lg border border-slate-200 p-5">
                <h3 className="font-semibold text-slate-900">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-slate-50 to-white py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Ready to Start Your NEET Preparation?
          </h2>
          <p className="mt-3 text-slate-600">
            Call us, WhatsApp, or book a free demo. We will help you find the best option — offline
            at your nearest center or online from home.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="tel:+918826444334"
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white shadow-md hover:bg-green-700"
            >
              <Phone className="h-5 w-5" />
              Call 88264-44334
            </Link>
            <Link
              href="https://wa.me/918826444334?text=Hi%2C%20I%20found%20you%20searching%20for%20NEET%20biology%20coaching%20near%20me.%20Please%20share%20details."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white shadow-md hover:bg-teal-700"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp Us
            </Link>
            <Link
              href="/book-free-demo"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-green-600 px-6 py-3 font-semibold text-green-700 hover:bg-green-50"
            >
              Book Free Demo
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 py-10">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center text-lg font-semibold text-slate-700">Explore More</h2>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm">
            <Link href="/neet-coaching-delhi" className="text-teal-600 underline hover:text-teal-800">
              NEET Coaching Delhi
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/neet-coaching-gurugram" className="text-teal-600 underline hover:text-teal-800">
              NEET Coaching Gurugram
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/neet-coaching-faridabad" className="text-teal-600 underline hover:text-teal-800">
              NEET Coaching Faridabad
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/neet-coaching-noida" className="text-teal-600 underline hover:text-teal-800">
              NEET Coaching Noida
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/pricing" className="text-teal-600 underline hover:text-teal-800">
              Pricing
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/book-free-demo" className="text-teal-600 underline hover:text-teal-800">
              Book Free Demo
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
