import { Metadata } from 'next'
import Link from 'next/link'
import {
  Globe,
  Clock,
  Star,
  Users,
  Trophy,
  CheckCircle,
  ArrowRight,
  Video,
  BookOpen,
  GraduationCap,
  Phone,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Online Biology Tutor | Expert Tutoring for A-Level, IB, IGCSE, AP, GCSE, NEET',
  description:
    'Find an expert online Biology tutor for any curriculum worldwide. A-Level (92% A*/A), IB Biology HL/SL, IGCSE, AP Biology, GCSE, NEET, Board exams. AIIMS-trained faculty. Live classes in your timezone. Free demo.',
  keywords: [
    'online biology tutor',
    'biology tutor online',
    'biology tuition online',
    'best biology tutor online',
    'online biology classes',
    'biology teacher online',
    'a level biology tutor online',
    'ib biology tutor online',
    'igcse biology tutor',
    'ap biology tutor online',
    'gcse biology tutor',
    'biology tutoring online',
    'online biology help',
    'biology homework help',
    'find biology tutor',
  ],
  openGraph: {
    title: 'Online Biology Tutor | A-Level, IB, IGCSE, AP, GCSE, NEET Expert',
    description:
      'Expert online Biology tutoring for all curricula worldwide. 92% A*/A rate. AIIMS faculty. Live classes in your timezone.',
    url: 'https://cerebrumbiologyacademy.com/online-biology-tutor-worldwide',
    locale: 'en',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/online-biology-tutor-worldwide',
  },
}

const curricula = [
  {
    name: 'A-Level Biology',
    boards: 'Cambridge 9700, Edexcel IAL, AQA, OCR',
    result: '92% A*/A rate',
    href: '/a-level-biology-tutor',
    color: 'purple',
  },
  {
    name: 'IB Biology',
    boards: 'HL & SL, IA & EE support',
    result: '92% Grade 6-7',
    href: '/ib-biology-tuition',
    color: 'blue',
  },
  {
    name: 'IGCSE Biology',
    boards: 'Cambridge 0610/0970, Edexcel 4BI1',
    result: '95% A*/A rate',
    href: '/igcse-biology-tuition',
    color: 'green',
  },
  {
    name: 'AP Biology',
    boards: 'College Board',
    result: '90% Score 4-5',
    href: '/ap-biology-to-neet-preparation',
    color: 'red',
  },
  {
    name: 'GCSE Biology',
    boards: 'AQA, Edexcel, OCR',
    result: 'Grade 8-9 focus',
    href: '/gcse-biology-tuition',
    color: 'teal',
  },
  {
    name: 'NEET Biology (India)',
    boards: 'NCERT Class 11 & 12',
    result: '98% success rate',
    href: '/best-neet-biology-coaching',
    color: 'orange',
  },
]

const timezones = [
  { region: 'UK / Europe', time: 'GMT/CET afternoons', examples: 'London, Paris, Berlin' },
  { region: 'Middle East', time: 'GST afternoons', examples: 'Dubai, Riyadh, Doha' },
  { region: 'South Asia', time: 'IST all day', examples: 'India, Nepal, Sri Lanka' },
  { region: 'Southeast Asia', time: 'SGT evenings', examples: 'Singapore, Malaysia, Bangkok' },
  { region: 'USA East Coast', time: 'EST evenings', examples: 'New York, Houston, Boston' },
  { region: 'USA West Coast', time: 'PST evenings', examples: 'San Francisco, LA, Seattle' },
  { region: 'Australia', time: 'AEST mornings', examples: 'Sydney, Melbourne, Brisbane' },
  { region: 'Canada', time: 'EST/PST evenings', examples: 'Toronto, Vancouver, Calgary' },
]

const internationalTestimonials = [
  {
    name: 'Sarah Mitchell',
    location: 'Singapore',
    curriculum: 'NEET Preparation',
    quote:
      'As an international student from Singapore, the online classes were perfectly timed for our timezone. The faculty understood the unique challenges we face.',
    result: 'NEET 2024 Qualified | Biology: 168/200',
  },
  {
    name: 'David Chen',
    location: 'Dubai, UAE',
    curriculum: 'IB Biology + NEET Bridge',
    quote:
      'Coming from IB curriculum, I had gaps in NEET-specific topics. The bridge course filled all those gaps perfectly. The faculty understood international curricula.',
    result: 'IB: 7/7 Biology HL | NEET Biology: 172/200',
  },
]

const faqs = [
  {
    question: 'What makes your online Biology tutoring different from Superprof or Preply?',
    answer:
      'Unlike marketplace platforms (Superprof, Preply, Wyzant) where tutor quality varies, Cerebrum provides: (1) AIIMS-trained faculty (not freelance tutors), (2) Structured curriculum for each exam board, (3) Small live batches (15-20 students) not 1-on-1 only, (4) 92% A*/A success rate with verified results, (5) Weekly tests and progress tracking. We are a specialist Biology academy, not a tutor marketplace.',
  },
  {
    question: 'Do you offer classes in my timezone?',
    answer:
      'Yes! We offer classes compatible with UK (GMT), Middle East (GST), Southeast Asia (SGT), USA East (EST), USA West (PST), and Australia (AEST). Most students attend live; all classes are also recorded for 24/7 access. WhatsApp us with your timezone and we will recommend the best batch.',
  },
  {
    question: 'I only need A-Level/IB/IGCSE help — do I have to do NEET too?',
    answer:
      'No! We offer pure A-Level, IB, IGCSE, AP, and GCSE Biology coaching without any NEET component. Our faculty are experts in Cambridge, Edexcel, AQA, OCR, and IB mark schemes. NEET bridge is only for students who specifically want it.',
  },
  {
    question: 'How much does online Biology tutoring cost?',
    answer:
      'Annual batch programs: $500-1,200 USD/year (equivalent to £400-950 GBP or AED 1,800-4,400). This includes 2-3 live classes per week, recorded lectures, study material, weekly tests, and WhatsApp doubt support. Much more affordable than 1-on-1 tutoring ($40-80/hour) with better results due to structured curriculum.',
  },
  {
    question: 'Can I try a free class before committing?',
    answer:
      'Yes! We offer a FREE demo class for every curriculum. Experience our teaching quality, ask questions, and see if it is the right fit. Book via WhatsApp (+91 88264 44334) or our website.',
  },
]

export default function OnlineBiologyTutorWorldwidePage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy — Online Biology Tutoring Worldwide',
    description:
      'Expert online Biology tutoring for A-Level, IB, IGCSE, AP, GCSE, NEET, and Board exams. AIIMS-trained faculty. Students in 14+ countries.',
    url: 'https://cerebrumbiologyacademy.com/online-biology-tutor-worldwide',
    telephone: '+91-88264-44334',
    areaServed: 'Worldwide',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '485',
      bestRating: '5',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-indigo-700 via-purple-700 to-violet-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <span className="inline-flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Globe className="w-4 h-4" />
              Students in 14+ Countries | All Curricula
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Online Biology Tutor
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-4">
              Expert Biology tutoring for A-Level, IB, IGCSE, AP, GCSE, and NEET. AIIMS-trained
              faculty. Live classes in your timezone.
            </p>
            <p className="text-lg text-yellow-300 font-semibold mb-8">
              92% A*/A rate | 98% NEET success | 14+ countries served
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="https://wa.me/918826444334?text=Hi!%20I%20need%20an%20online%20Biology%20tutor.%20Please%20share%20details%20for%20my%20curriculum."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
              >
                <Phone className="w-5 h-5" />
                WhatsApp Us
              </Link>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://wa.me/918826444334?text=Hi!%20I%20want%20to%20book%20a%20FREE%20demo%20class.%20Please%20share%20available%20timings."
                className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
              >
                Book FREE Demo
              </Link>
            </div>
          </div>
        </section>

        {/* Curricula Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Choose Your Curriculum</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              We teach Biology for every major exam board worldwide. Select yours below.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {curricula.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="group bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:border-indigo-400 hover:shadow-xl transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <BookOpen className="w-8 h-8 text-indigo-600" />
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                      {c.result}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
                    {c.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{c.boards}</p>
                  <span className="text-indigo-600 text-sm font-semibold flex items-center group-hover:translate-x-1 transition-transform">
                    Learn more <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Timezone Compatibility */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">
              <Clock className="w-8 h-8 inline-block mr-2 text-indigo-600" />
              Classes in Your Timezone
            </h2>
            <p className="text-gray-600 text-center mb-12">
              Live classes scheduled for your region. All classes also recorded for 24/7 access.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {timezones.map((tz) => (
                <div
                  key={tz.region}
                  className="bg-indigo-50 rounded-xl p-4 border border-indigo-100"
                >
                  <p className="font-bold text-gray-900 mb-1">{tz.region}</p>
                  <p className="text-sm text-indigo-700 font-semibold mb-1">{tz.time}</p>
                  <p className="text-xs text-gray-500">{tz.examples}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Us vs Superprof/Preply */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose Us Over Superprof, Preply, or Wyzant
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-3 text-left font-semibold">Feature</th>
                    <th className="px-4 py-3 text-center font-semibold text-indigo-600">
                      Cerebrum Academy
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-500">
                      Superprof / Preply
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    ['Faculty', 'AIIMS-trained specialists', 'Freelance tutors (quality varies)'],
                    [
                      'Curriculum expertise',
                      'All boards: Cambridge, Edexcel, AQA, OCR, IB',
                      'Depends on tutor',
                    ],
                    ['Class format', 'Live small batches (15-20) + 1-on-1', 'Mostly 1-on-1 only'],
                    ['Study material', 'Included (notes, MCQs, tests)', 'Not included'],
                    ['Price', '$500-1,200/year (batch)', '$40-80/hour (1-on-1)'],
                    [
                      'Success tracking',
                      'Weekly tests + progress reports',
                      'No structured tracking',
                    ],
                    ['Success rate', '92% A*/A (A-Level), 98% (NEET)', 'Not published'],
                    ['Doubt support', '24/7 WhatsApp', 'Only during paid sessions'],
                  ].map(([feature, cerebrum, others]) => (
                    <tr key={feature}>
                      <td className="px-4 py-3 font-medium">{feature}</td>
                      <td className="px-4 py-3 text-center text-indigo-700 font-semibold">
                        {cerebrum}
                      </td>
                      <td className="px-4 py-3 text-center text-gray-500">{others}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* International Testimonials */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Students from Around the World</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {internationalTestimonials.map((t) => (
                <div
                  key={t.name}
                  className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">&ldquo;{t.quote}&rdquo;</p>
                  <div>
                    <p className="font-bold text-gray-900">
                      {t.name} <span className="font-normal text-indigo-600">— {t.location}</span>
                    </p>
                    <p className="text-sm text-gray-600">{t.curriculum}</p>
                    <p className="text-sm text-green-700 font-semibold mt-1">{t.result}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="bg-white rounded-xl shadow-md group">
                  <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 flex items-center justify-between">
                    {faq.question}
                    <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-indigo-700 to-purple-700 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Start Your Biology Journey Today</h2>
            <p className="text-lg text-purple-100 mb-8">
              Whatever your curriculum, wherever you are — expert Biology tutoring is one click away
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://wa.me/918826444334?text=Hi!%20I%20need%20an%20online%20Biology%20tutor.%20My%20curriculum%20is%20[A-Level/IB/IGCSE/AP/GCSE].%20Please%20help."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-600 transition"
              >
                <Phone className="w-6 h-6" />
                WhatsApp Us
              </Link>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://wa.me/918826444334?text=Hi!%20I%20want%20to%20book%20a%20FREE%20demo%20class.%20Please%20share%20available%20timings."
                className="inline-flex items-center gap-2 bg-white text-purple-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-50 transition"
              >
                Book FREE Demo
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
