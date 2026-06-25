import { Metadata } from 'next'
import Link from 'next/link'
import { Award, CheckCircle, X, Phone, ArrowRight, Star, MessageCircle } from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const SLUG = 'cerebrum-vs-biolympiads'
const CANONICAL = `${BASE_URL}/${SLUG}`
const PHONE = '+91 88264-44334'
const PHONE_TEL = 'tel:+918826444334'
const COMPETITOR = 'Biolympiads'

export const metadata: Metadata = {
  title: 'Cerebrum vs Biolympiads | Structured USABO Coaching vs Free Self-Study',
  description:
    'Cerebrum Biology Academy vs Biolympiads for USABO prep. Biolympiads.com is a well-known free self-study resource and community; Cerebrum is structured live coaching with feedback and accountability. Free self-study works for the self-driven — many students use both.',
  keywords: [
    'cerebrum vs biolympiads',
    'biolympiads alternative',
    'usabo coaching vs self study',
    'usabo free resources vs coaching',
    'structured usabo prep',
    'usabo coach vs biolympiads',
  ],
  openGraph: {
    title: 'Cerebrum vs Biolympiads | Structured Coaching vs Free Self-Study',
    description:
      'Structured live USABO coaching with feedback vs a free self-study resource and community. Honest comparison — many students use both.',
    url: CANONICAL,
    type: 'website',
    locale: 'en_US',
  },
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Cerebrum vs Biolympiads | Structured Coaching vs Free Self-Study',
    description:
      'Structured live USABO coaching with feedback vs a free self-study resource and community. Honest comparison — many students use both.',
  },
}

const comparison = [
  {
    criterion: 'Model',
    cerebrum: 'Structured live coaching (small batch + 1:1)',
    competitor: 'Free self-study resources and community',
    cerebrumWins: false,
  },
  {
    criterion: 'Cost',
    cerebrum: '$2,500 / $4,500 / $6,000 programme tiers',
    competitor: 'Free',
    cerebrumWins: false,
  },
  {
    criterion: 'Structure',
    cerebrum: 'Sequenced syllabus, pacing, and milestones',
    competitor: 'Self-organized — you build your own plan',
    cerebrumWins: true,
  },
  {
    criterion: 'Feedback',
    cerebrum: 'Live faculty feedback on problems and reasoning',
    competitor: 'Self-checked answers, peer discussion',
    cerebrumWins: true,
  },
  {
    criterion: 'Accountability',
    cerebrum: 'Scheduled sessions and progress review',
    competitor: 'Fully self-driven',
    cerebrumWins: true,
  },
  {
    criterion: 'Faculty',
    cerebrum: 'AIIMS-trained biology specialists',
    competitor: 'Community-contributed materials and notes',
    cerebrumWins: true,
  },
  {
    criterion: 'Problem-Set Volume',
    cerebrum: 'Curated, coached problem sets',
    competitor: 'Broad library of free problem sets and notes',
    cerebrumWins: false,
  },
  {
    criterion: 'Best For',
    cerebrum: 'Students who want structure, feedback, and pacing',
    competitor: 'Self-driven students comfortable studying solo',
    cerebrumWins: true,
  },
]

const whyChoose = [
  {
    title: 'Structure Instead of a Blank Plan',
    description:
      'Biolympiads gives you excellent free material — but you decide what to study and when. Cerebrum supplies a sequenced syllabus, pacing, and milestones built around the USABO Open Exam, Semifinal, and Finals timeline.',
  },
  {
    title: 'Live Feedback on Your Reasoning',
    description:
      'Free problem sets tell you whether an answer is right. A live coach tells you why your reasoning went wrong and how to fix it — the feedback loop that drives Semifinal-level improvement.',
  },
  {
    title: 'Accountability That Self-Study Lacks',
    description:
      'Scheduled sessions and progress review keep preparation on track. For students who start strong on free resources and then drift, the accountability is the difference-maker.',
  },
  {
    title: 'AIIMS-Trained Biology Specialists',
    description:
      'Coaching is led by faculty trained at AIIMS (the All India Institute of Medical Sciences — India’s apex medical institute, comparable to Harvard Medical School in selectivity), who teach the molecular and cell biology depth USABO Semifinals demand.',
  },
]

const whenCompetitorBetter = [
  'You are highly self-driven and study consistently without external structure',
  'You have limited budget and want strong free material to start',
  'You prefer community discussion over scheduled live sessions',
]

const testimonials = [
  {
    name: 'USABO aspirant, Northern Virginia',
    score: 'USABO Semifinalist',
    college: 'Used Biolympiads + Cerebrum',
    quote:
      'I started with Biolympiads’ free problem sets, but I plateaued. Cerebrum’s structured coaching and live feedback pushed me through to the Semifinal.',
  },
  {
    name: 'High-school sophomore, Bay Area',
    score: 'Open Exam qualifier',
    college: 'USABO track',
    quote:
      'The free resources were great for self-study, but having a coach to explain the molecular biology and keep me accountable changed how fast I improved.',
  },
]

const faqs = [
  {
    question: 'Is Biolympiads good enough on its own for USABO?',
    answer:
      'For a highly self-driven student, free self-study resources like Biolympiads can be genuinely sufficient — they are well-respected within the olympiad community. Coaching adds structure, live feedback, and accountability. Many students use both: free material for breadth, coaching for guided depth and pacing.',
  },
  {
    question: 'Why pay for coaching when Biolympiads is free?',
    answer:
      'You are not paying for content alone — you are paying for structure, feedback, and accountability. A free problem set tells you the answer; a live coach explains why your reasoning failed and reteaches the concept. If you tend to plateau or lose momentum studying solo, that guided loop is what moves you forward.',
  },
  {
    question: 'How much does Cerebrum USABO coaching cost?',
    answer:
      'Cerebrum offers structured USABO programmes at $2,500, $4,500, and $6,000 depending on tier and intensity. Biolympiads is free. The honest framing is structure-and-feedback versus self-directed study — choose based on how you learn best, or combine the two.',
  },
  {
    question: 'Can I use Biolympiads and Cerebrum together?',
    answer:
      'Yes, and many students do. Use Biolympiads’ free problem sets and notes for extra practice and breadth, and Cerebrum for a sequenced syllabus, live feedback, and Semifinal-level molecular biology depth. They complement each other well.',
  },
]

const whatsappMessage =
  "Hi — I'm comparing Cerebrum and Biolympiads for USABO prep. Please share coaching details, pricing, and how structured coaching pairs with free self-study."
const waLink = `https://wa.me/918826444334?text=${encodeURIComponent(whatsappMessage)}`

const crossLinks = [
  { href: '/best-usabo-coach', label: 'Best USABO Coach' },
  { href: '/usabo-coaching', label: 'USABO Coaching' },
  { href: '/how-to-qualify-for-usabo', label: 'How to Qualify for USABO' },
]

export default function Page() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Cerebrum USABO Coaching',
    description:
      'Structured live USABO (USA Biology Olympiad) coaching with sequenced syllabus, AIIMS-trained faculty feedback, and accountability across the Open Exam, Semifinal, and Finals pathway — a guided alternative to free self-study resources.',
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
    headline: 'Cerebrum vs Biolympiads: Structured USABO Coaching vs Free Self-Study',
    description:
      'An honest comparison of Cerebrum Biology Academy and Biolympiads for USABO preparation — structured live coaching with feedback versus a free self-study resource and community.',
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
        knowsAbout={[
          'USA Biology Olympiad (USABO) Preparation',
          'USABO Semifinal Molecular Biology',
          'Biology Olympiad Coaching',
        ]}
        jobTitle="Founder & Lead Biology Faculty — USABO Coach"
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
              Structured Coaching vs Free Self-Study
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Cerebrum vs Biolympiads for USABO
            </h1>
            <p className="text-2xl text-green-50 mb-3">
              Structure, feedback, and accountability — on top of great free material.
            </p>
            <p className="text-lg text-green-100 mb-8 max-w-3xl mx-auto speakable-intro">
              Biolympiads.com is a well-known free self-study resource and community for biology
              olympiad — problem sets, notes, and discussion that many USABO students rely on.
              Cerebrum is structured live coaching: a sequenced syllabus, AIIMS-trained faculty
              feedback, and accountability across the Open Exam, Semifinal, and Finals pathway. Free
              self-study works well for the self-driven; coaching adds structure and feedback — and
              many students use both.
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
              Cerebrum Biology Academy vs {COMPETITOR} — across what actually matters for USABO
              preparation.
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
              Why Add Cerebrum to Free Self-Study
            </h2>
            <p className="text-lg text-slate-600">
              The structural reasons structured coaching complements free olympiad resources.
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
              When {COMPETITOR} Alone Is the Right Call
            </h2>
            <p className="text-slate-600 mb-6">
              Honest assessment — {COMPETITOR} is a genuinely strong free resource. Self-study alone
              is the right call when:
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
              Common pattern: students use {COMPETITOR}’ free problem sets for breadth and extra
              practice, and add Cerebrum for a sequenced syllabus, live feedback, and
              Semifinal-level depth — combining the two rather than choosing.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Students Who Combined Both
            </h2>
            <p className="text-lg text-slate-600">
              Results from students who used free self-study and added structured coaching.
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
            No obligation — experience structured USABO coaching for yourself, in your time zone.
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
