import { Metadata } from 'next'
import Link from 'next/link'
import { DelhiAreaSchema } from '@/components/seo/DelhiAreaSchema'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const PHONE = '88264-44334'
const WA_LINK =
  'https://wa.me/918826444334?text=Hi%2C%20I%20want%20to%20know%20about%20IB%2FIGCSE%20Biology%20tuition%20in%20South%20Delhi'

export const metadata: Metadata = {
  title:
    'IB & IGCSE Biology Tuition South Delhi | AIIMS Doctor | British School, American Embassy School',
  description:
    'IB HL/SL & IGCSE Biology tuition in South Delhi by AIIMS Alumnus. Serving The British School, American Embassy School, Vasant Valley, Sanskriti. IA/EE support, dual NEET prep. Visit South Extension. Call 88264-44334.',
  keywords:
    'IB biology tuition south delhi, IGCSE biology tuition south delhi, IB biology tutor south delhi, IGCSE biology coaching south delhi, IB HL biology delhi, international school biology tuition delhi, british school biology tutor, american embassy school biology coaching',
  openGraph: {
    locale: 'en_IN',
    title:
      'IB & IGCSE Biology Tuition South Delhi | AIIMS Doctor | British School, American Embassy School',
    description:
      'IB HL/SL & IGCSE Biology tuition in South Delhi by AIIMS Alumnus. Serving The British School, American Embassy School, Vasant Valley, Sanskriti. IA/EE support, dual NEET prep. Visit South Extension.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/ib-igcse-biology-tuition-south-delhi',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'IB & IGCSE Biology Tuition South Delhi | AIIMS Doctor | British School, American Embassy School',
    description:
      'IB HL/SL & IGCSE Biology tuition in South Delhi by AIIMS Alumnus. Serving The British School, American Embassy School, Vasant Valley, Sanskriti.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/ib-igcse-biology-tuition-south-delhi',
  },
}

const faqs = [
  {
    q: 'Do you teach IB Biology HL?',
    a: 'Yes. We cover the complete IB Biology HL syllabus including all 4 themes (Unity and Diversity, Form and Function, Interaction and Interdependence, Continuity and Change), plus Additional Higher Level content. Our faculty has an AIIMS medical background with deep understanding of university-level biology concepts required for HL.',
  },
  {
    q: 'Can you help with the IB Internal Assessment (IA) and Extended Essay (EE)?',
    a: 'Absolutely. The IA is 20% of your final IB grade and most tutors ignore it completely. We guide students through research question formulation, experimental design, data collection and analysis, evaluation, and scientific writing. We also mentor Biology Extended Essays end to end. Our students consistently score 20+ out of 24 on their IAs.',
  },
  {
    q: 'Do you cover the IGCSE / Cambridge Biology 0610 new 2026 syllabus?',
    a: 'Yes. We are fully updated with the Cambridge IGCSE Biology 0610 new 2026 syllabus including all revised content, practical skills requirements, and new assessment objectives. Our material is syllabus-mapped and regularly updated.',
  },
  {
    q: 'Can my child prepare for IB and NEET together?',
    a: 'Yes — and we are among the very few institutes in South Delhi that offer integrated IB + NEET preparation. 70% of IB Biology HL overlaps with NEET syllabus. We cover the overlapping topics together and add NEET-specific MCQ practice on top, which is ideal for families near AIIMS considering Indian medical entrance alongside international boards.',
  },
  {
    q: 'Where is your South Delhi centre and do you teach online?',
    a: 'Our flagship centre is at D-35, South Extension Part 2 (near AIIMS and South Extension Metro), with a second centre at B-113 Gulmohar Park near Green Park. We teach both in-person and via live online classes, so students from across South Delhi can attend the way that suits them best.',
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
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://cerebrumbiologyacademy.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'IB & IGCSE Biology Tuition South Delhi',
          item: 'https://cerebrumbiologyacademy.com/ib-igcse-biology-tuition-south-delhi',
        },
      ],
    },
  ],
}

export default function IBIGCSEBiologyTuitionSouthDelhiPage() {
  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'NEET South Delhi',
          'NEET Biology South Delhi',
          'Medical entrance coaching South Delhi',
        ]}
      />
      <DelhiAreaSchema
        pageSlug="ib-igcse-biology-tuition-south-delhi"
        subRegion="south"
        serviceName="IB & IGCSE Biology Tuition South Delhi"
        description="IB HL/SL and IGCSE (Cambridge 0610) Biology tuition for South Delhi students. Cerebrum Biology Academy's flagship South Extension centre serves The British School, American Embassy School, Vasant Valley, Sanskriti and other international-school families with AIIMS-trained faculty, IA/EE support, and dual IB+NEET preparation."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-yellow-400">
            IB &amp; IGCSE Biology — South Delhi
          </p>
          <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
            IB &amp; IGCSE Biology Tuition in South Delhi —{' '}
            <span className="text-yellow-400">By an AIIMS Doctor</span>
          </h1>
          <p className="mb-8 text-lg text-slate-300">
            Your child&apos;s school teaches to the class. We teach to YOUR child.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
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
            Schools We Serve in South Delhi
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {[
              'The British School New Delhi',
              'American Embassy School',
              'Vasant Valley School',
              'Sanskriti School',
              'The Shri Ram School',
              'Step by Step Jasola',
              'Pathways Aravali',
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
            And 10+ other international schools serving South Delhi families
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
              And the IA (Internal Assessment) is 20% of the grade — most tutors ignore it
              completely.
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
              'IGCSE / Cambridge 0610: Complete new 2026 syllabus with practical skills focus',
              'IA research design — question formulation, data analysis, scientific writing',
              'Biology Extended Essay (EE) mentoring — from proposal to final draft',
              'Precise terminology coaching — the #1 reason students lose marks',
              'Past paper practice — 10+ years of IB and IGCSE papers with marking scheme analysis',
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4"
              >
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
            IB + NEET: One of the Few Institutes That Preps for Both
          </h2>
          <p className="mb-8 text-center text-lg text-slate-600">
            For South Delhi families near AIIMS weighing Indian medical entrance alongside the IB —
            here is why it works:
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
                <p className="text-sm font-semibold uppercase tracking-wide text-teal-600">
                  {r.label}
                </p>
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
              <p className="text-4xl font-bold text-slate-900">
                ₹2.5L+<span className="text-lg">/year</span>
              </p>
              <p className="mt-2 text-slate-500">₹2-3K/hour, no tests, no IA help</p>
            </div>
            <div className="rounded-xl border-2 border-green-200 bg-green-50 p-8 text-center">
              <p className="mb-2 text-lg font-semibold text-green-600">Cerebrum</p>
              <p className="text-4xl font-bold text-slate-900">
                ₹60-98K<span className="text-lg">/year</span>
              </p>
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
              &ldquo;We switched from an IB tutor charging ₹3,000/hour. My daughter scored 7 in HL
              Biology. We saved over ₹1.5 lakhs and got better results. Cerebrum understood the IB
              system better than any tutor we tried — and the South Extension centre was an easy
              drive.&rdquo;
            </p>
            <p className="font-bold text-slate-900">Mrs. Malhotra</p>
            <p className="text-sm text-slate-500">Parent, Defence Colony, South Delhi</p>
          </div>
        </div>
      </section>

      {/* Visit Center */}
      <section className="bg-teal-600 py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Visit Our South Delhi Centres</h2>
          <p className="mb-2 text-xl">D-35, South Extension Part 2, New Delhi 110049</p>
          <p className="mb-6 text-lg text-teal-100">
            Near AIIMS &bull; Beside South Extension Metro &bull; Second centre at B-113 Gulmohar
            Park (Green Park) &bull; In-person + live online
          </p>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
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
          <h2 className="mb-4 text-3xl font-bold">Book a Private Consultation with Dr. Shekhar</h2>
          <p className="mb-8 text-lg text-slate-300">
            Discuss your child&apos;s specific syllabus, school, and goals. Get a personalized study
            plan.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
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

      {/* Related */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h3 className="mb-6 text-center text-xl font-bold text-slate-900">
            Explore More for South Delhi
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/ib-biology/south-delhi"
              className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-center font-medium text-teal-700 hover:border-teal-300 hover:bg-teal-50"
            >
              IB Biology South Delhi
            </Link>
            <Link
              href="/a-level-biology/south-delhi"
              className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-center font-medium text-teal-700 hover:border-teal-300 hover:bg-teal-50"
            >
              A-Level Biology South Delhi
            </Link>
            <Link
              href="/neet-coaching-south-delhi"
              className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-center font-medium text-teal-700 hover:border-teal-300 hover:bg-teal-50"
            >
              NEET Coaching South Delhi
            </Link>
            <Link
              href="/biology-tutor-south-delhi"
              className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-center font-medium text-teal-700 hover:border-teal-300 hover:bg-teal-50"
            >
              Biology Tutor South Delhi
            </Link>
            <Link
              href="/biology-olympiads/india/south-delhi"
              className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-center font-medium text-teal-700 hover:border-teal-300 hover:bg-teal-50"
            >
              Biology Olympiads South Delhi
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
          <Link
            href="/book-free-demo"
            className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white"
          >
            Free Demo
          </Link>
        </div>
      </div>
    </>
  )
}
