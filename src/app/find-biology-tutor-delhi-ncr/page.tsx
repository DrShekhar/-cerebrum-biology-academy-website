import { Metadata } from 'next'
import Link from 'next/link'
import {
  Phone,
  CheckCircle,
  MapPin,
  Users,
  BookOpen,
  Award,
  ArrowRight,
  Search,
  ShieldCheck,
  XCircle,
  Star,
  MessageCircle,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Find Best Biology Tutor in Delhi NCR 2026 | Class 11, 12 | NEET + Board',
  description:
    'Looking for a biology tutor in Delhi NCR? Compare home tutors vs coaching institutes. AIIMS faculty, 15-student batches, ₹4K/month. 4 centers + online. Call 88264-44334.',
  keywords: [
    'find biology tutor delhi ncr',
    'biology tutor near me delhi',
    'best biology tutor noida',
    'biology tutor gurugram',
    'biology home tutor faridabad',
    'biology tutor rohini',
    'biology tutor south delhi',
    'biology tuition near me',
    'find biology coaching delhi',
  ],
  openGraph: {
    title: 'Find Best Biology Tutor in Delhi NCR 2026 | Class 11, 12 | NEET + Board',
    description:
      'Looking for a biology tutor in Delhi NCR? Compare home tutors vs coaching institutes. AIIMS faculty, 15-student batches, ₹4K/month. 4 centers + online.',
    url: 'https://cerebrumbiologyacademy.com/find-biology-tutor-delhi-ncr',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/find-biology-tutor-delhi-ncr',
  },
}

const comparisonData = [
  {
    feature: 'Monthly Fee',
    homeTutor: '₹5,000–8,000',
    onlineTutor: '₹3,000–5,000',
    cerebrum: '₹4,000',
  },
  {
    feature: 'Faculty Background',
    homeTutor: 'Unverified (B.Sc / M.Sc)',
    onlineTutor: 'Variable',
    cerebrum: 'AIIMS / Medical Graduates',
  },
  {
    feature: 'Batch Size',
    homeTutor: '1-on-1',
    onlineTutor: '50–200',
    cerebrum: '15 Students Max',
  },
  {
    feature: 'Test Series',
    homeTutor: 'Not included',
    onlineTutor: 'Basic (extra cost)',
    cerebrum: '19,000+ MCQ Bank Included',
  },
  {
    feature: 'Study Material',
    homeTutor: 'Buy separately (₹5K+)',
    onlineTutor: 'PDFs only',
    cerebrum: 'Complete Material Included',
  },
  {
    feature: 'Recorded Lectures',
    homeTutor: 'Not available',
    onlineTutor: 'Sometimes',
    cerebrum: 'All Lectures Recorded',
  },
  {
    feature: 'Doubt Support',
    homeTutor: 'During class only',
    onlineTutor: 'Chat-based (slow)',
    cerebrum: 'WhatsApp + In-class',
  },
  {
    feature: 'Board + NEET Prep',
    homeTutor: 'Board only (usually)',
    onlineTutor: 'NEET only (usually)',
    cerebrum: 'Both — Integrated',
  },
]

const cityData = [
  {
    city: 'Noida',
    address: 'Sector 62, Noida — Near Fortis Hospital',
    areas: ['Sector 18', 'Sector 62', 'Sector 44', 'Greater Noida', 'Noida Extension'],
    slug: '/biology-classes-noida',
  },
  {
    city: 'Gurugram',
    address: 'Sector 14, Gurugram — Near HUDA City Centre Metro',
    areas: ['Sector 14', 'DLF Phase 1-5', 'Sohna Road', 'Golf Course Road', 'Palam Vihar'],
    slug: '/biology-classes-gurgaon',
  },
  {
    city: 'Faridabad',
    address: 'Sector 15, Faridabad — Near NIT',
    areas: ['NIT', 'Sector 15-21', 'Ballabgarh', 'Greater Faridabad', 'Old Faridabad'],
    slug: '/biology-classes-faridabad',
  },
  {
    city: 'Rohini',
    address: 'Sector 7, Rohini — Near Rithala Metro',
    areas: ['Sector 3-24', 'Pitampura', 'Shalimar Bagh', 'Paschim Vihar', 'Prashant Vihar'],
    slug: '/biology-classes-rohini',
  },
  {
    city: 'South Delhi',
    address: 'Online classes available for South Delhi students',
    areas: ['Kalkaji', 'CR Park', 'GK 1 & 2', 'Hauz Khas', 'Vasant Vihar', 'Saket'],
    slug: '/biology-classes-south-delhi',
  },
]

const checklist = [
  'AIIMS or medical college background',
  'Proven NEET coaching experience (5+ years)',
  'Board exam track record (90%+ scores)',
  'Small batch size (under 20 students)',
  'Structured study material provided',
  'Regular test series with analysis',
  'Recorded lectures for revision',
  'Transparent fee structure — no hidden costs',
]

const faqs = [
  {
    question: 'How do I find a good biology tutor near me in Delhi NCR?',
    answer:
      'Instead of relying on listing sites like Sulekha or UrbanPro that charge tutors commissions (which they recover from you), look for coaching institutes with verified faculty credentials. Cerebrum Biology Academy has AIIMS-qualified faculty, 4 centers across Delhi NCR, and online classes — so you get expert teaching without the middleman markup.',
  },
  {
    question: 'What are the biology tuition fees in Delhi NCR?',
    answer:
      'Home tutors charge ₹5,000–8,000/month, online tutors ₹3,000–5,000/month, and coaching institutes vary widely. Cerebrum Biology Academy charges approximately ₹4,000/month (₹48,000/year for Class 11) with AIIMS faculty, test series, study material, and recordings included — making it the best value in Delhi NCR.',
  },
  {
    question: 'Is a home tutor or coaching institute better for NEET biology?',
    answer:
      'For NEET biology, coaching institutes consistently outperform home tutors. 90% of NEET toppers credit structured coaching for their success. Home tutors lack test series, peer competition, and NEET-specific expertise. Small batch coaching (like Cerebrum with 15 students) gives you the best of both — personal attention plus structured preparation.',
  },
  {
    question: 'Which is the best biology tuition for Class 11 and 12 in Delhi NCR?',
    answer:
      'Cerebrum Biology Academy is rated among the top biology-only coaching institutes in Delhi NCR. With AIIMS faculty, 15-student batches, 19,000+ MCQ bank, integrated Board + NEET preparation, and 4 physical centers, it offers specialized biology coaching that general NEET factories cannot match.',
  },
  {
    question: 'Do you offer online biology tuition for Delhi NCR students?',
    answer:
      'Yes. Cerebrum offers live interactive online classes taught by the same AIIMS faculty. Online students get recorded lectures, WhatsApp doubt support, the full test series, and digital study material. Many South Delhi and Ghaziabad students prefer our online mode for convenience.',
  },
  {
    question: 'Is there a CBSE biology tutor near me for Board exam preparation?',
    answer:
      'Cerebrum Biology Academy covers both CBSE Board and NEET preparation in an integrated curriculum. Our students consistently score 90%+ in Board exams while simultaneously preparing for NEET. We have centers in Noida, Gurugram, Faridabad, and Rohini — plus online classes for all Delhi NCR areas.',
  },
]

export default function FindBiologyTutorDelhiNCR() {
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

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Find Biology Tutor Delhi NCR',
        item: 'https://cerebrumbiologyacademy.com/find-biology-tutor-delhi-ncr',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-teal-900 py-16 text-white md:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <nav className="mb-8 text-sm text-green-200">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <span>Find Biology Tutor Delhi NCR</span>
            </nav>
            <h1 className="mb-6 text-3xl font-bold leading-tight md:text-5xl">
              Find the Best Biology Tutor in Delhi NCR
            </h1>
            <p className="mb-8 max-w-2xl text-lg text-green-100">
              Stop scrolling through listing sites. Compare home tutors, online tutors, and coaching
              institutes side-by-side. Make an informed decision for your child&apos;s NEET + Board preparation.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-green-900 shadow-lg transition hover:bg-green-50"
              >
                Book Free Demo <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+918826444334"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                <Phone className="h-4 w-4" /> Call 88264-44334
              </a>
            </div>
          </div>
        </section>

        {/* 3 Ways to Find Biology Tuition */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-900 md:text-3xl">
              3 Ways to Find Biology Tuition in Delhi NCR
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
              Each option has trade-offs. Here&apos;s an honest comparison so you can decide what works
              for your child.
            </p>

            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
              <table className="w-full min-w-[700px] text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Feature</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">Home Tutor</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">Online Tutor</th>
                    <th className="bg-green-50 px-4 py-3 text-center font-semibold text-green-800">
                      Cerebrum Academy
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row) => (
                    <tr key={row.feature} className="border-t border-gray-100">
                      <td className="px-4 py-3 font-medium text-gray-800">{row.feature}</td>
                      <td className="px-4 py-3 text-center text-gray-600">{row.homeTutor}</td>
                      <td className="px-4 py-3 text-center text-gray-600">{row.onlineTutor}</td>
                      <td className="bg-green-50 px-4 py-3 text-center font-medium text-green-800">
                        {row.cerebrum}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Why Smart Parents Skip Listing Sites */}
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-900 md:text-3xl">
              Why Smart Parents Skip Listing Sites
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
              Aggregator platforms like Sulekha, UrbanPro, and JustDial charge tutors 15-30% commission.
              That cost gets passed to you — or the tutor cuts corners to stay profitable.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-red-200 bg-white p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-red-700">
                  <XCircle className="h-5 w-5" /> What Listing Sites Don&apos;t Tell You
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
                    Tutors pay ₹5,000–15,000 to get listed — they recover it from your fees
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
                    No faculty verification — anyone can claim &quot;10 years experience&quot;
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
                    Fake reviews are common — 5-star ratings are often purchased
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
                    No accountability after you pay — the platform disappears
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
                    No test series, no study material, no progress tracking
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-green-200 bg-white p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-green-700">
                  <ShieldCheck className="h-5 w-5" /> What Cerebrum Guarantees
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                    AIIMS / medical college verified faculty — credentials on website
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                    Transparent pricing — no hidden charges, EMI available
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                    19,000+ MCQ bank with performance analytics included
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                    Weekly tests, recorded lectures, WhatsApp doubt support
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                    Free demo class — judge quality before committing
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* City-wise Section */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-12 text-center text-2xl font-bold text-gray-900 md:text-3xl">
              Biology Tutors Across Delhi NCR
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {cityData.map((city) => (
                <div key={city.city} className="rounded-xl border border-gray-200 p-6 transition hover:shadow-md">
                  <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <MapPin className="h-5 w-5 text-green-600" />
                    Biology Tutors in {city.city}
                  </h3>
                  <p className="mb-3 text-sm text-gray-600">{city.address}</p>
                  <p className="mb-3 text-sm text-gray-500">
                    <span className="font-medium">Areas served:</span> {city.areas.join(', ')}
                  </p>
                  <Link
                    href={city.slug}
                    className="inline-flex items-center gap-1 text-sm font-medium text-green-700 hover:text-green-800"
                  >
                    View {city.city} center <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What to Look for in a Biology Tutor */}
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-900 md:text-3xl">
              What to Look for in a Biology Tutor
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
              Before you hire a tutor or join a coaching institute, check these 8 non-negotiables.
              Cerebrum meets all of them.
            </p>
            <div className="mx-auto grid max-w-3xl gap-4 md:grid-cols-2">
              {checklist.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="mb-12 text-center text-2xl font-bold text-gray-900 md:text-3xl">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-xl border border-gray-200 p-6">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <p className="leading-relaxed text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-green-900 via-green-800 to-teal-900 py-16 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
              Stop Searching. Start Learning.
            </h2>
            <p className="mb-8 text-lg text-green-100">
              Book a free demo class with AIIMS faculty. See the difference yourself before committing.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-green-900 shadow-lg transition hover:bg-green-50"
              >
                Book Free Demo <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="tel:+918826444334"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition hover:bg-white/10"
              >
                <Phone className="h-5 w-5" /> Call 88264-44334
              </a>
              <a
                href="https://wa.me/918826444334?text=Hi%2C%20I%20want%20to%20know%20about%20biology%20tuition%20in%20Delhi%20NCR"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition hover:bg-white/10"
              >
                <MessageCircle className="h-5 w-5" /> WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
