import { Metadata } from 'next'
import Link from 'next/link'

const PHONE = '88264-44334'
const WA_LINK = 'https://wa.me/918826444334?text=Hi%2C%20I%20want%20to%20know%20about%20NEET%20Biology%20tutor%20options'

export const metadata: Metadata = {
  title: 'NEET Biology Tutor Delhi NCR | AIIMS Faculty | ₹4K/Month | 98% Success',
  description:
    "Stop wasting ₹8K/month on the wrong biology tutor. Get AIIMS faculty, test series, recordings & 19,000+ MCQs at ₹4K/month. 98% success rate. Call 88264-44334.",
  keywords:
    'neet biology tutor delhi ncr, neet biology tutor near me, neet biology tutors delhi, biology tutor for neet noida, neet biology tutor gurugram, best neet biology tutor, private neet biology tutor, biology for neet tutor india',
  openGraph: {
    title: 'NEET Biology Tutor Delhi NCR | AIIMS Faculty | ₹4K/Month | 98% Success',
    description:
      "Stop wasting ₹8K/month on the wrong biology tutor. Get AIIMS faculty, test series, recordings & 19,000+ MCQs at ₹4K/month. 98% success rate.",
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/neet-biology-tutor-delhi-ncr',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Tutor Delhi NCR | AIIMS Faculty | ₹4K/Month | 98% Success',
    description:
      "Stop wasting ₹8K/month on the wrong biology tutor. Get AIIMS faculty, test series, recordings & 19,000+ MCQs at ₹4K/month.",
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-biology-tutor-delhi-ncr',
  },
}

const faqs = [
  {
    q: 'How much does a NEET Biology tutor cost in Delhi NCR?',
    a: 'Private NEET Biology tutors in Delhi NCR charge ₹6,000-12,000/month for 1-on-1 sessions, often without any test series or study material. Cerebrum offers AIIMS faculty, weekly tests, 19,000+ MCQs, recorded classes, and WhatsApp doubt support — all for ₹4,000/month.',
  },
  {
    q: 'How do I find a good NEET Biology tutor near me?',
    a: 'Look for these 5 things: medical/AIIMS background, 10+ years NEET teaching experience, regular mock tests, study material included, and proven results. At Cerebrum, our faculty is AIIMS-trained with 15+ years of NEET experience and a 98% success rate.',
  },
  {
    q: 'Is a private tutor better than coaching for NEET Biology?',
    a: 'Private tutors offer personal attention but lack test infrastructure, peer competition, and structured curriculum. Cerebrum gives you the best of both — small 15-student batches (personal attention) with full coaching infrastructure (tests, material, recordings, analytics).',
  },
  {
    q: 'Can I switch from my current tutor mid-year?',
    a: 'Yes. Many of our top scorers joined mid-year after switching from private tutors. We provide catch-up recordings and a topic-wise assessment to identify gaps. Your first class is free — compare and decide.',
  },
  {
    q: 'Do you offer online NEET Biology tutoring?',
    a: 'Yes. Our online batches have only 15 students with camera-on policy, live doubt clearing, and recorded classes. Students from Noida, Greater Noida, Faridabad, and across India join our online batches. Call 88264-44334 to join.',
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'NEET Biology Tutor Delhi NCR',
          item: 'https://cerebrumbiologyacademy.com/neet-biology-tutor-delhi-ncr',
        },
      ],
    },
  ],
}

export default function NEETBiologyTutorDelhiNCRPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-yellow-400">
            NEET Biology Tutor — Delhi NCR
          </p>
          <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
            Stop Wasting <span className="text-yellow-400">₹8,000/Month</span> on the Wrong Biology Tutor
          </h1>
          <p className="mb-8 text-lg text-slate-300">
            Most private tutors cannot teach NEET Biology. Here is what you actually need.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/book-free-demo"
              className="rounded-lg bg-yellow-400 px-8 py-4 text-lg font-bold text-slate-900 shadow-lg hover:bg-yellow-300"
            >
              Get AIIMS Faculty for ₹4K/Month
            </Link>
            <a
              href={`tel:+91${PHONE.replace(/-/g, '')}`}
              className="rounded-lg border-2 border-white px-8 py-4 text-lg font-bold text-white hover:bg-white hover:text-slate-900"
            >
              Call {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* Problem Story */}
      <section className="bg-red-50 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold text-slate-900">The ₹2.4 Lakh Mistake</h2>
          <div className="rounded-xl bg-white p-8 shadow-lg">
            <p className="mb-4 text-lg text-slate-700">
              Ramesh hired <strong>3 tutors in 2 years</strong>. Spent <strong className="text-red-600">₹2.4 lakhs</strong>. His NEET score? Still <strong className="text-red-600">420</strong>.
            </p>
            <p className="text-lg text-slate-700">
              Then he found Cerebrum. Score after 8 months: <strong className="text-green-600">635</strong>.
            </p>
            <p className="mt-4 text-sm text-slate-500">NEET 2025 Qualifier, Cerebrum Biology Academy</p>
          </div>
        </div>
      </section>

      {/* 5 Signs */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-10 text-center text-3xl font-bold text-slate-900">
            5 Signs Your Biology Tutor Is Not Working
          </h2>
          <div className="space-y-4">
            {[
              'No score improvement in 3 months despite regular classes',
              'Cannot explain concepts beyond what is written in NCERT',
              'No mock tests, no performance tracking, no analytics',
              'Charges per hour — incentivized to go slow, not to get results',
              'No recorded classes — miss a class, miss the topic forever',
            ].map((sign, i) => (
              <div key={i} className="flex items-start gap-4 rounded-lg border border-red-100 bg-red-50 p-5">
                <span className="text-xl text-red-500">&#10060;</span>
                <p className="text-lg text-slate-800">{sign}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What a NEET Tutor Should Have */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-10 text-center text-3xl font-bold text-slate-900">
            What a NEET Biology Tutor SHOULD Have
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              'AIIMS/medical college background',
              '15+ years of NEET teaching experience',
              'Weekly test series with detailed analysis',
              'Study material and notes included in fee',
              'Recorded classes for revision',
              'WhatsApp doubt support till 10 PM',
              'Small batch of 15 students max',
              'Proven track record — 98% NEET qualification',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-md">
                <span className="mt-0.5 text-xl text-green-500">&#10004;</span>
                <p className="text-slate-700">{item}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-lg font-semibold text-teal-600">
            Cerebrum checks every single box. Your current tutor?
          </p>
        </div>
      </section>

      {/* The Math */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">The Math Does Not Lie</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border-2 border-red-200 bg-red-50 p-8 text-center">
              <p className="mb-2 text-lg font-semibold text-red-600">Private Tutor</p>
              <p className="text-4xl font-bold text-slate-900">₹96,000<span className="text-lg">/year</span></p>
              <p className="mt-2 text-slate-500">₹8K x 12 months</p>
              <p className="mt-4 text-red-600">Result: Uncertain</p>
            </div>
            <div className="rounded-xl border-2 border-green-200 bg-green-50 p-8 text-center">
              <p className="mb-2 text-lg font-semibold text-green-600">Cerebrum</p>
              <p className="text-4xl font-bold text-slate-900">₹48,000<span className="text-lg">/year</span></p>
              <p className="mt-2 text-slate-500">₹4K x 12 months</p>
              <p className="mt-4 font-bold text-green-600">98% Qualify for NEET</p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Switch Stories */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-10 text-center text-3xl font-bold text-slate-900">
            Students Who Switched — And Scored
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: 'Aisha K.', area: 'Rohini', before: 380, after: 620, months: 6 },
              { name: 'Vikram S.', area: 'Gurugram', before: 410, after: 595, months: 8 },
              { name: 'Neha R.', area: 'Noida', before: 350, after: 580, months: 7 },
            ].map((s) => (
              <div key={s.name} className="rounded-xl bg-white p-6 text-center shadow-xl">
                <p className="text-lg font-bold text-slate-900">{s.name}</p>
                <p className="mb-4 text-sm text-slate-500">{s.area}</p>
                <p className="mb-2 text-slate-600">
                  Score: <span className="font-bold text-red-600">{s.before}</span> &rarr;{' '}
                  <span className="font-bold text-green-600">{s.after}</span>
                </p>
                <p className="text-sm text-slate-500">in {s.months} months at Cerebrum</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City CTAs */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-10 text-center text-3xl font-bold text-slate-900">
            Find Cerebrum Near You
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { city: 'Rohini / North Delhi', center: 'Visit DC Chowk Center' },
              { city: 'Gurugram', center: 'Visit Sector 51 Center' },
              { city: 'Noida / Greater Noida', center: 'Join Online Batch' },
              { city: 'Faridabad', center: 'Visit Sector 17 Center' },
              { city: 'South Delhi', center: 'Visit South Extension Center' },
            ].map((loc) => (
              <div key={loc.city} className="rounded-lg border border-teal-200 bg-teal-50 p-5 text-center">
                <p className="text-lg font-bold text-slate-900">{loc.city}</p>
                <p className="text-teal-700">{loc.center}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Risk-Free CTA */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-700 py-14 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-3 text-3xl font-bold">Risk-Free: Attend a FREE Demo Class</h2>
          <p className="mb-6 text-lg">
            Compare with your current tutor. Then decide. No pressure. No follow-up calls.
          </p>
          <p className="mb-6 text-lg">
            WhatsApp <strong>&apos;TUTOR&apos;</strong> to {PHONE} to book your free class.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-green-500 px-8 py-4 text-lg font-bold text-white shadow-lg hover:bg-green-400"
            >
              WhatsApp Now
            </a>
            <Link
              href="/book-free-demo"
              className="rounded-lg bg-yellow-400 px-8 py-4 text-lg font-bold text-slate-900 shadow-lg hover:bg-yellow-300"
            >
              Book Free Demo
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-10 text-center text-3xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-xl bg-white shadow-md">
                <summary className="cursor-pointer px-6 py-5 text-lg font-semibold text-slate-900">
                  {faq.q}
                </summary>
                <p className="px-6 pb-5 text-slate-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-4 text-3xl font-bold">Your Child Deserves an AIIMS-Level Tutor</h2>
          <p className="mb-8 text-lg text-slate-300">At a price that makes sense.</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={`tel:+91${PHONE.replace(/-/g, '')}`}
              className="rounded-lg bg-yellow-400 px-8 py-4 text-lg font-bold text-slate-900 shadow-lg hover:bg-yellow-300"
            >
              Call {PHONE}
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-green-500 px-8 py-4 text-lg font-bold text-white shadow-lg hover:bg-green-400"
            >
              WhatsApp Us
            </a>
            <Link
              href="/book-free-demo"
              className="rounded-lg border-2 border-white px-8 py-4 text-lg font-bold text-white hover:bg-white hover:text-slate-900"
            >
              Book Free Demo
            </Link>
          </div>
          <p className="mt-6 text-sm text-slate-400">
            <Link href="/pricing" className="underline hover:text-white">
              View full pricing
            </Link>
          </p>
        </div>
      </section>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white p-3 shadow-2xl md:hidden">
        <div className="flex items-center justify-center gap-3">
          <a
            href={`tel:+91${PHONE.replace(/-/g, '')}`}
            className="rounded-lg bg-yellow-400 px-5 py-3 text-sm font-bold text-slate-900"
          >
            Call {PHONE}
          </a>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-green-500 px-5 py-3 text-sm font-bold text-white"
          >
            WhatsApp
          </a>
          <Link href="/book-free-demo" className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white">
            Free Demo
          </Link>
        </div>
      </div>
    </>
  )
}
