import { Metadata } from 'next'
import Link from 'next/link'
import { Award, CheckCircle, X, Phone, ArrowRight, Star, MessageCircle } from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const SLUG = 'cerebrum-vs-dat-bootcamp'
const CANONICAL = `${BASE_URL}/${SLUG}`
const PHONE = '+91 88264-44334'
const PHONE_TEL = 'tel:+918826444334'
const COMPETITOR = 'DAT Bootcamp'

export const metadata: Metadata = {
  title: 'Cerebrum vs DAT Bootcamp | Live Bio Coaching vs Question Bank',
  description:
    'Cerebrum Biology Academy vs DAT Bootcamp for the DAT Biology section. DAT Bootcamp is a self-paced question-bank and video platform; Cerebrum is a live, AIIMS-trained biology-section specialist. Compare structure, depth, and how most students use both.',
  keywords: [
    'cerebrum vs dat bootcamp',
    'dat bootcamp alternative',
    'dat bootcamp biology tutor',
    'dat biology coaching vs question bank',
    'best dat biology tutor vs dat bootcamp',
    'live dat biology coaching',
  ],
  openGraph: {
    title: 'Cerebrum vs DAT Bootcamp | Live Bio Coaching vs Question Bank',
    description:
      'Live AIIMS-trained DAT Biology coaching vs a self-paced question-bank platform. Compare structure, depth, and pairing.',
    url: CANONICAL,
    type: 'website',
    locale: 'en_US',
  },
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Cerebrum vs DAT Bootcamp | Live Bio Coaching vs Question Bank',
    description:
      'Live AIIMS-trained DAT Biology coaching vs a self-paced question-bank platform. Compare structure, depth, and pairing.',
  },
}

const comparison = [
  {
    criterion: 'Format',
    cerebrum: 'Live, scheduled biology coaching (small batch + 1:1)',
    competitor: 'Self-paced video lessons + practice question bank',
    cerebrumWins: true,
  },
  {
    criterion: 'Primary Strength',
    cerebrum: 'Explanation and concept-building for the Biology section',
    competitor: 'High volume of DAT-style practice questions and bites',
    cerebrumWins: false,
  },
  {
    criterion: 'Scope',
    cerebrum: 'Biology section specialist (the Bio in Survey of Natural Sciences)',
    competitor: 'All-in-one DAT platform across most sections',
    cerebrumWins: false,
  },
  {
    criterion: 'Faculty Interaction',
    cerebrum: 'AIIMS-trained faculty, live doubt-solving and feedback',
    competitor: 'Recorded instructors, community/forum support',
    cerebrumWins: true,
  },
  {
    criterion: 'Accountability',
    cerebrum: 'Scheduled sessions, assigned work, progress review',
    competitor: 'Self-driven (you set your own pace)',
    cerebrumWins: true,
  },
  {
    criterion: 'Practice Volume',
    cerebrum: 'Curated biology question sets + AAMC-style reasoning drills',
    competitor: 'Large dedicated DAT question bank and full-length tests',
    cerebrumWins: false,
  },
  {
    criterion: 'Cost Model',
    cerebrum: '$499 / $999 / $1,499 programme tiers (Biology only)',
    competitor: 'Lower-cost subscription for the full platform',
    cerebrumWins: false,
  },
  {
    criterion: 'Best Use',
    cerebrum: 'The coaching layer when biology concepts are the bottleneck',
    competitor: 'Self-study drilling once concepts are solid',
    cerebrumWins: true,
  },
]

const whyChoose = [
  {
    title: 'A Coaching Layer, Not Another Question Bank',
    description:
      'DAT Bootcamp gives you volume to practice on. Cerebrum gives you a live biology specialist to explain why an answer is right and rebuild weak fundamentals — the layer a question bank cannot provide.',
  },
  {
    title: 'AIIMS-Trained Biology Depth',
    description:
      'Faculty trained at AIIMS (the All India Institute of Medical Sciences — India’s apex medical institute, comparable to Harvard Medical School in selectivity) teach the Biology section with medical-school-level depth, not generalist test-prep breadth.',
  },
  {
    title: 'Live Feedback and Accountability',
    description:
      'Scheduled sessions, assigned practice, and direct feedback keep you on track. For students who stall on self-paced platforms, the structure is the difference-maker.',
  },
  {
    title: 'Designed to Pair With DAT Bootcamp',
    description:
      'Most students keep DAT Bootcamp for drilling and full-lengths, and add Cerebrum specifically for biology concept depth. They complement each other — there is no need to choose.',
  },
]

const whenCompetitorBetter = [
  'Your biology fundamentals are already strong and you mainly need practice volume',
  'You prefer fully self-paced study and set your own schedule well',
  'You want one affordable all-in-one platform covering every DAT section',
]

const testimonials = [
  {
    name: 'Pre-dental applicant, New York',
    score: 'DAT Bio 23',
    college: 'Used DAT Bootcamp + Cerebrum',
    quote:
      'I drilled questions on DAT Bootcamp but kept missing the same biology concepts. Cerebrum’s live sessions fixed the foundation, then the practice finally clicked.',
  },
  {
    name: 'Pre-dental applicant, Bay Area',
    score: 'DAT Bio 24',
    college: 'Applied to dental school',
    quote:
      'Pairing both worked perfectly — Bootcamp for volume, Cerebrum for the explanations. The biology depth was on another level.',
  },
]

const faqs = [
  {
    question: 'Is Cerebrum a replacement for DAT Bootcamp?',
    answer:
      'Not exactly — they do different jobs. DAT Bootcamp is a self-paced question bank and video platform with strong drill volume across the DAT. Cerebrum is a live biology-section specialist that explains concepts and rebuilds weak fundamentals. Many students use both: Bootcamp for practice, Cerebrum for biology coaching.',
  },
  {
    question: 'Why would I add live coaching if DAT Bootcamp already has biology videos?',
    answer:
      'Recorded videos explain a topic once, to everyone, the same way. Live coaching adapts to your specific gaps, answers your questions in real time, and holds you accountable with scheduled sessions. If biology is your weak section, the interactive layer often matters more than another video.',
  },
  {
    question: 'How much does Cerebrum cost compared with DAT Bootcamp?',
    answer:
      'Cerebrum’s biology programme runs $499, $999, or $1,499 depending on tier (self-paced, small-batch, or 1:1 faculty). DAT Bootcamp is a lower-cost subscription for its full platform. They are priced for different purposes — a question-bank subscription versus live specialist coaching — so most students budget for both rather than comparing price head-to-head.',
  },
  {
    question: 'Does Cerebrum cover the whole DAT?',
    answer:
      'No. Cerebrum focuses on the Biology content within the Survey of Natural Sciences — it is a biology specialist, not an all-in-one DAT course. For the other sections, a platform like DAT Bootcamp or your own materials is the right tool.',
  },
]

const whatsappMessage =
  "Hi — I'm comparing Cerebrum and DAT Bootcamp for the DAT Biology section. Please share programme details, pricing, and how pairing the two works."
const waLink = `https://wa.me/918826444334?text=${encodeURIComponent(whatsappMessage)}`

const crossLinks = [
  { href: '/best-dat-biology-tutor', label: 'Best DAT Biology Tutor' },
  { href: '/dat-biology-preparation', label: 'DAT Biology Preparation' },
]

export default function Page() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Cerebrum DAT Biology Coaching',
    description:
      'Live, AIIMS-trained biology-section coaching for the DAT (the Biology within the Survey of Natural Sciences). A specialist coaching layer that complements self-paced question banks such as DAT Bootcamp.',
    url: CANONICAL,
    provider: {
      '@type': 'EducationalOrganization',
      '@id': `${BASE_URL}/#organization`,
      name: 'Cerebrum Biology Academy',
      url: BASE_URL,
    },
    areaServed: { '@type': 'Country', name: 'United States' },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT3H',
    },
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Cerebrum vs DAT Bootcamp: Live Biology Coaching vs Question Bank',
    description:
      'An honest comparison of Cerebrum Biology Academy and DAT Bootcamp for the DAT Biology section — live specialist coaching versus a self-paced question-bank platform.',
    mainEntityOfPage: CANONICAL,
    author: {
      '@id': `${BASE_URL}/dr-shekhar-singh-neet-biology-faculty#person`,
    },
    publisher: {
      '@type': 'EducationalOrganization',
      '@id': `${BASE_URL}/#organization`,
      name: 'Cerebrum Biology Academy',
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.speakable-intro'],
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

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Compare', item: `${BASE_URL}/compare` },
      { '@type': 'ListItem', position: 3, name: `Cerebrum vs ${COMPETITOR}`, item: CANONICAL },
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <CerebrumPersonSchema
        knowsAbout={['DAT Biology', 'DAT Survey of Natural Sciences', 'Pre-Dental Biology']}
        jobTitle="Founder & Lead Biology Faculty — DAT Biology Specialist"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="bg-gradient-to-br from-green-800 via-green-800 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-4 py-1 rounded-full text-sm font-semibold mb-6">
              <Award className="w-4 h-4" />
              Live Biology Coaching vs Self-Paced Question Bank
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Cerebrum vs DAT Bootcamp for DAT Biology
            </h1>
            <p className="text-2xl text-green-50 mb-3">
              The explanation layer for the Biology section — not another question bank.
            </p>
            <p className="text-lg text-green-100 mb-8 max-w-3xl mx-auto speakable-intro">
              DAT Bootcamp is a popular all-in-one DAT platform — a strong self-paced question bank
              with video lessons and full-length tests, at an affordable subscription. Cerebrum is a
              live biology-section specialist: AIIMS-trained faculty who coach the Biology in the
              Survey of Natural Sciences and rebuild weak fundamentals. They do different jobs, and
              most students use both — Bootcamp for drilling, Cerebrum for biology depth.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={PHONE_TEL}
                className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
              >
                <Phone className="w-5 h-5" />
                Book Free Demo Class
              </a>
              <Link
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </Link>
              <a
                href="#comparison"
                className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition"
              >
                See Comparison
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-green-100 mt-6">
              Sessions in US time zones (ET, CT, PT) · Or call:{' '}
              <a href={PHONE_TEL} className="font-semibold text-yellow-300 hover:underline">
                {PHONE}
              </a>{' '}
              · Free demo, no obligation
            </p>
          </div>
        </div>
      </section>

      <section id="comparison" className="py-16 bg-white scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">
              Side-by-Side Comparison
            </h2>
            <p className="text-lg text-slate-600 mb-10 text-center">
              Cerebrum Biology Academy vs {COMPETITOR} — across what actually matters for the DAT
              Biology section.
            </p>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="text-left p-4 font-semibold text-slate-700">Criterion</th>
                    <th className="text-left p-4 font-semibold text-green-700">
                      Cerebrum Biology Academy
                    </th>
                    <th className="text-left p-4 font-semibold text-slate-700">{COMPETITOR}</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row.criterion} className="border-b border-slate-200">
                      <td className="p-4 font-medium text-slate-800">{row.criterion}</td>
                      <td className="p-4 text-slate-700">
                        <div className="flex items-start gap-2">
                          {row.cerebrumWins ? (
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          ) : null}
                          <span>{row.cerebrum}</span>
                        </div>
                      </td>
                      <td className="p-4 text-slate-600">
                        <div className="flex items-start gap-2">
                          {!row.cerebrumWins ? (
                            <CheckCircle className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-5 h-5 text-slate-300 flex-shrink-0 mt-0.5" />
                          )}
                          <span>{row.competitor}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="md:hidden space-y-4">
              {comparison.map((row) => (
                <div
                  key={row.criterion}
                  className="bg-white border border-slate-200 rounded-xl p-4"
                >
                  <div className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wide">
                    {row.criterion}
                  </div>
                  <div className="space-y-3">
                    <div
                      className={`rounded-lg p-3 border ${row.cerebrumWins ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}
                    >
                      <div className="flex items-center gap-2 mb-1 text-xs font-semibold text-green-700 uppercase">
                        {row.cerebrumWins ? (
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        ) : null}
                        Cerebrum
                      </div>
                      <p className="text-sm text-slate-800 leading-relaxed">{row.cerebrum}</p>
                    </div>
                    <div
                      className={`rounded-lg p-3 border ${!row.cerebrumWins ? 'bg-slate-100 border-slate-300' : 'bg-slate-50 border-slate-200'}`}
                    >
                      <div className="flex items-center gap-2 mb-1 text-xs font-semibold text-slate-600 uppercase">
                        {!row.cerebrumWins ? (
                          <CheckCircle className="w-4 h-4 text-slate-500 flex-shrink-0" />
                        ) : (
                          <X className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        )}
                        {COMPETITOR}
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">{row.competitor}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Add Cerebrum for the Biology Section
            </h2>
            <p className="text-lg text-slate-600">
              The structural reasons a live biology specialist complements a self-paced
              question-bank platform.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {whyChoose.map((item) => (
              <div key={item.title} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                </div>
                <p className="text-slate-600 ml-9">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              When {COMPETITOR} Is the Right Tool
            </h2>
            <p className="text-slate-600 mb-6">
              Honest assessment — {COMPETITOR} is excellent for what it does. It is the better
              standalone choice when:
            </p>
            <ul className="space-y-3">
              {whenCompetitorBetter.map((reason) => (
                <li key={reason} className="flex items-start gap-3">
                  <span className="text-slate-400 mt-1">•</span>
                  <span className="text-slate-700">{reason}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-slate-500 mt-6 italic">
              Common pattern: students keep {COMPETITOR} for question volume and full-length tests,
              and add Cerebrum specifically for biology concept depth — pairing the two rather than
              choosing.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Students Who Paired Both
            </h2>
            <p className="text-lg text-slate-600">
              Results from students who used {COMPETITOR} for practice and Cerebrum for biology
              depth.
            </p>
          </div>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-slate-700 italic mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="border-t pt-4">
                  <p className="font-bold text-slate-900">{t.name}</p>
                  <p className="text-sm text-green-700">
                    {t.score} · {t.college}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.question} className="bg-slate-50 rounded-lg group">
                  <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 rounded-lg">
                    {faq.question}
                    <span className="text-slate-500 group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <p className="px-6 pb-4 text-slate-600 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Book Your Free Demo Class</h2>
          <p className="text-xl text-slate-300 mb-2 max-w-2xl mx-auto">
            No obligation — experience live biology-section coaching for the DAT, in your time zone.
          </p>
          <p className="text-sm text-slate-400 mb-8">
            Sessions in ET, CT and PT · AIIMS-trained biology faculty
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={PHONE_TEL}
              className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
            >
              <Phone className="w-5 h-5" />
              Call {PHONE}
            </a>
            <Link
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Demo Booking
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <p className="text-sm text-slate-400 mt-6">
            Learn more:{' '}
            {crossLinks.map((link, i) => (
              <span key={link.href}>
                <Link href={link.href} className="underline">
                  {link.label}
                </Link>
                {i < crossLinks.length - 1 ? ' · ' : null}
              </span>
            ))}
          </p>
        </div>
      </section>

      <div className="h-20 md:hidden" aria-hidden="true" />

      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-slate-200 shadow-lg grid grid-cols-2 gap-2 p-3">
        <a
          href={PHONE_TEL}
          className="flex items-center justify-center gap-2 bg-yellow-500 text-slate-900 py-3 rounded-lg font-semibold"
        >
          <Phone className="w-4 h-4" />
          Call
        </a>
        <Link
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg font-semibold"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </Link>
      </div>
    </div>
  )
}
