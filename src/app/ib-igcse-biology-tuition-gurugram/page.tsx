import { Metadata } from 'next'
import Link from 'next/link'

const PHONE = '88264-44334'
const WA_LINK = 'https://wa.me/918826444334?text=Hi%2C%20I%20want%20to%20know%20about%20IB%2FIGCSE%20Biology%20tuition%20in%20Gurugram'

export const metadata: Metadata = {
  title: 'IB & IGCSE Biology Tuition Gurugram | AIIMS Doctor | Pathways, DPS International',
  description:
    'IB HL/SL & IGCSE Biology tuition in Gurugram by AIIMS Alumnus. Serving Pathways, DPS International, Scottish High. IA support, dual NEET prep. Visit Sector 51. Call 88264-44334.',
  keywords:
    'IB biology tuition gurugram, IGCSE biology tuition gurgaon, IB biology tutor gurugram, IGCSE biology coaching gurugram, IB HL biology gurugram, international school biology tuition, DPS international biology tutor, pathways biology coaching',
  openGraph: {
    title: 'IB & IGCSE Biology Tuition Gurugram | AIIMS Doctor | Pathways, DPS International',
    description:
      'IB HL/SL & IGCSE Biology tuition in Gurugram by AIIMS Alumnus. Serving Pathways, DPS International, Scottish High. IA support, dual NEET prep. Visit Sector 51.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/ib-igcse-biology-tuition-gurugram',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IB & IGCSE Biology Tuition Gurugram | AIIMS Doctor | Pathways, DPS International',
    description:
      'IB HL/SL & IGCSE Biology tuition in Gurugram by AIIMS Alumnus. Serving Pathways, DPS International, Scottish High.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/ib-igcse-biology-tuition-gurugram',
  },
}

const faqs = [
  {
    q: 'Do you teach IB Biology HL?',
    a: 'Yes. We cover the complete IB Biology HL syllabus including all 4 themes (Unity and Diversity, Form and Function, Interaction and Interdependence, Continuity and Change), plus Additional Higher Level content. Our faculty has an AIIMS medical background with deep understanding of university-level biology concepts required for HL.',
  },
  {
    q: 'Can you help with IB Internal Assessment (IA)?',
    a: 'Absolutely. The IA is 20% of your final IB grade and most tutors ignore it completely. We guide students through research question formulation, experimental design, data collection and analysis, evaluation, and scientific writing. Our students consistently score 20+ out of 24 on their IAs.',
  },
  {
    q: 'Do you cover the IGCSE new 2026 syllabus (0610)?',
    a: 'Yes. We are fully updated with the Cambridge IGCSE Biology 0610 new 2026 syllabus including all revised content, practical skills requirements, and new assessment objectives. Our material is syllabus-mapped and regularly updated.',
  },
  {
    q: 'Can my child prepare for IB and NEET together?',
    a: 'Yes — and we are the ONLY institute in Gurugram that offers integrated IB + NEET preparation. 70% of IB Biology HL overlaps with NEET syllabus. We cover the overlapping topics together and add NEET-specific MCQ practice on top. 30% of our Gurugram IB students also take NEET.',
  },
  {
    q: 'What are the fees for IB Biology tuition?',
    a: 'Cerebrum charges ₹60,000-98,000/year depending on the program (IB HL/SL, IGCSE, dual IB+NEET). This includes AIIMS faculty, test series, recorded classes, IA support, and WhatsApp doubt clearing. Compare this to private IB tutors who charge ₹2-3K/hour (₹2.5L+/year) without any test infrastructure.',
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
          name: 'IB & IGCSE Biology Tuition Gurugram',
          item: 'https://cerebrumbiologyacademy.com/ib-igcse-biology-tuition-gurugram',
        },
      ],
    },
  ],
}

export default function IBIGCSEBiologyTuitionGurugramPage() {
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
            IB &amp; IGCSE Biology — Gurugram
          </p>
          <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
            IB &amp; IGCSE Biology Tuition in Gurugram —{' '}
            <span className="text-yellow-400">By an AIIMS Doctor</span>
          </h1>
          <p className="mb-8 text-lg text-slate-300">
            Your child&apos;s school teaches to the class. We teach to YOUR child.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/book-free-demo"
              className="rounded-lg bg-yellow-400 px-8 py-4 text-lg font-bold text-slate-900 shadow-lg hover:bg-yellow-300"
            >
              Book Private Consultation
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

      {/* Schools We Serve */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-10 text-center text-3xl font-bold text-slate-900">
            Schools We Serve in Gurugram
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {[
              'Pathways World School',
              'DPS International',
              'GD Goenka World School',
              'Scottish High International',
              'Shri Ram School',
              'Heritage Xperiential',
              'The Millennium School',
            ].map((school) => (
              <div
                key={school}
                className="flex items-center justify-center rounded-xl border border-purple-200 bg-purple-50 p-5 text-center"
              >
                <p className="text-sm font-semibold text-slate-800">{school}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-slate-500">
            And 10+ other international schools in Gurugram and South Delhi
          </p>
        </div>
      </section>

      {/* IB Problem */}
      <section className="bg-red-50 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-6 text-center text-3xl font-bold text-slate-900">
            The IB Biology Gap Your School Will Not Tell You About
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-white p-8 text-center shadow-lg">
              <p className="text-lg text-slate-600">IB Biology HL requires</p>
              <p className="text-5xl font-bold text-red-600">240 hours</p>
              <p className="mt-2 text-slate-500">of focused study</p>
            </div>
            <div className="rounded-xl bg-white p-8 text-center shadow-lg">
              <p className="text-lg text-slate-600">School gives</p>
              <p className="text-5xl font-bold text-slate-400">120 hours</p>
              <p className="mt-2 text-slate-500">across 2 years</p>
            </div>
          </div>
          <div className="mt-8 rounded-xl border-2 border-red-300 bg-white p-6 text-center">
            <p className="text-lg font-semibold text-red-600">
              The 120-hour gap = your child&apos;s grade dropping from a 7 to a 5.
            </p>
            <p className="mt-2 text-slate-600">
              And the IA (Internal Assessment) is 20% of the grade — most tutors ignore it completely.
            </p>
          </div>
        </div>
      </section>

      {/* What We Cover */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-10 text-center text-3xl font-bold text-slate-900">
            Complete IB &amp; IGCSE Coverage
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {[
              'IB HL/SL: All 4 themes — Unity & Diversity, Form & Function, Interaction & Interdependence, Continuity & Change',
              'IGCSE 0610: Complete new 2026 syllabus with practical skills focus',
              'IA research design — question formulation, data analysis, scientific writing',
              'Precise terminology coaching — the #1 reason students lose marks',
              'Past paper practice — 10+ years of IB and IGCSE papers with marking scheme analysis',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <span className="mt-0.5 text-xl text-green-500">&#10004;</span>
                <p className="text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dual Prep */}
      <section className="bg-teal-50 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-4 text-center text-3xl font-bold text-slate-900">
            IB + NEET: We Are the ONLY Institute That Preps for Both
          </h2>
          <p className="mb-8 text-center text-lg text-slate-600">
            30% of our Gurugram IB students also take NEET. Here is why it works:
          </p>
          <div className="overflow-x-auto rounded-xl shadow-lg">
            <table className="w-full text-left">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="px-6 py-4">Topic</th>
                  <th className="px-6 py-4 text-center">IB Biology</th>
                  <th className="px-6 py-4 text-center">NEET Biology</th>
                  <th className="px-6 py-4 text-center">Overlap</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Cell Biology', 'Theme A', 'Unit 1', '90%'],
                  ['Genetics', 'Theme D', 'Unit 5', '85%'],
                  ['Human Physiology', 'Theme B', 'Unit 4', '80%'],
                  ['Ecology', 'Theme C', 'Unit 8', '75%'],
                  ['Evolution', 'Theme D', 'Unit 5', '70%'],
                  ['Biotechnology', 'Theme D', 'Unit 6', '65%'],
                ].map(([topic, ib, neet, overlap]) => (
                  <tr key={topic} className="border-b border-slate-100 bg-white">
                    <td className="px-6 py-3 font-medium text-slate-900">{topic}</td>
                    <td className="px-6 py-3 text-center text-slate-600">{ib}</td>
                    <td className="px-6 py-3 text-center text-slate-600">{neet}</td>
                    <td className="px-6 py-3 text-center font-bold text-green-600">{overlap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-10 text-3xl font-bold text-slate-900">Our Results Speak</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { label: 'IB HL Biology', stat: '85%', desc: 'score 6 or 7' },
              { label: 'IGCSE Biology', stat: '90%', desc: 'A* or A grade' },
              { label: 'NEET Biology', stat: '98%', desc: 'qualify for NEET' },
            ].map((r) => (
              <div key={r.label} className="rounded-xl bg-slate-50 p-8 shadow-lg">
                <p className="text-sm font-semibold uppercase tracking-wide text-teal-600">{r.label}</p>
                <p className="mt-2 text-5xl font-bold text-slate-900">{r.stat}</p>
                <p className="mt-1 text-slate-600">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fee Positioning */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">
            Premium Quality. Fair Price.
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border-2 border-red-200 bg-red-50 p-8 text-center">
              <p className="mb-2 text-lg font-semibold text-red-600">Private IB Tutor</p>
              <p className="text-4xl font-bold text-slate-900">₹2.5L+<span className="text-lg">/year</span></p>
              <p className="mt-2 text-slate-500">₹2-3K/hour, no tests, no IA help</p>
            </div>
            <div className="rounded-xl border-2 border-green-200 bg-green-50 p-8 text-center">
              <p className="mb-2 text-lg font-semibold text-green-600">Cerebrum</p>
              <p className="text-4xl font-bold text-slate-900">₹60-98K<span className="text-lg">/year</span></p>
              <p className="mt-2 text-slate-500">AIIMS faculty + tests + recordings + IA support</p>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-slate-500">
            <Link href="/pricing" className="font-medium text-teal-600 underline">
              View detailed pricing for all programs
            </Link>
          </p>
        </div>
      </section>

      {/* Parent Testimonial */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="rounded-xl bg-slate-50 p-10 shadow-lg">
            <p className="mb-4 text-xl italic text-slate-700">
              &ldquo;We switched from an IB tutor charging ₹3,000/hour. My son scored 7 in HL Biology. We saved over ₹1.5 lakhs and got better results. Cerebrum understood the IB system better than any tutor we tried.&rdquo;
            </p>
            <p className="font-bold text-slate-900">Mrs. Kapoor</p>
            <p className="text-sm text-slate-500">Parent, DLF Phase 4, Gurugram</p>
          </div>
        </div>
      </section>

      {/* Visit Center */}
      <section className="bg-teal-600 py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Visit Our Gurugram Center</h2>
          <p className="mb-2 text-xl">M2K Corporate Park, Sector 51, Gurugram</p>
          <p className="mb-6 text-lg text-teal-100">
            10 minutes from DLF Phase 5 &bull; Free parking &bull; Near HUDA City Centre Metro
          </p>
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
              WhatsApp for Directions
            </a>
          </div>
        </div>
      </section>

      {/* Premium CTA */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-4 text-3xl font-bold">
            Book a Private Consultation with Dr. Shekhar
          </h2>
          <p className="mb-8 text-lg text-slate-300">
            Discuss your child&apos;s specific syllabus, school, and goals. Get a personalized study plan.
          </p>
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
