import { Metadata } from 'next'
import Link from 'next/link'
import { Award, CheckCircle, X, Phone, ArrowRight, Star, MessageCircle } from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const SLUG = 'cerebrum-vs-uworld-step-1'
const CANONICAL = `${BASE_URL}/${SLUG}`
const PHONE = '+91 88264-44334'
const PHONE_TEL = 'tel:+918826444334'
const COMPETITOR = 'UWorld'

export const metadata: Metadata = {
  title: 'Cerebrum vs UWorld (USMLE Step 1) | Coaching vs Question Bank',
  description:
    'Cerebrum Biology Academy vs UWorld for USMLE Step 1 biology foundations. UWorld is the dominant Step 1 question bank; Cerebrum is live, AIIMS-trained foundations coaching — the "why" behind the answers. They are complementary; most students use both.',
  keywords: [
    'cerebrum vs uworld step 1',
    'uworld step 1 alternative',
    'usmle step 1 biology tutor',
    'uworld supplement biology foundations',
    'step 1 biology coaching vs question bank',
    'live usmle step 1 biology coaching',
  ],
  openGraph: {
    title: 'Cerebrum vs UWorld (USMLE Step 1) | Coaching vs Question Bank',
    description:
      'Live AIIMS-trained Step 1 biology-foundations coaching vs the dominant Step 1 question bank. Complementary, not competing.',
    url: CANONICAL,
    type: 'website',
    locale: 'en_US',
  },
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Cerebrum vs UWorld (USMLE Step 1) | Coaching vs Question Bank',
    description:
      'Live AIIMS-trained Step 1 biology-foundations coaching vs the dominant Step 1 question bank. Complementary, not competing.',
  },
}

const comparison = [
  {
    criterion: 'Format',
    cerebrum: 'Live, scheduled biology-foundations coaching (small batch + 1:1)',
    competitor: 'Self-paced question bank with detailed answer explanations',
    cerebrumWins: true,
  },
  {
    criterion: 'Primary Strength',
    cerebrum: 'Building the conceptual "why" behind biology and biochemistry',
    competitor: 'Large, high-quality bank of practice questions',
    cerebrumWins: false,
  },
  {
    criterion: 'Scope',
    cerebrum: 'Biology / biochemistry foundations specialist',
    competitor: 'Whole-Step 1 question bank across all subjects',
    cerebrumWins: false,
  },
  {
    criterion: 'Faculty Interaction',
    cerebrum: 'AIIMS-trained faculty, live doubt-solving and feedback',
    competitor: 'Written explanations, no live instructor',
    cerebrumWins: true,
  },
  {
    criterion: 'Best For',
    cerebrum: 'Students whose biology/biochem fundamentals are shaky',
    competitor: 'Active recall and exam-style practice at scale',
    cerebrumWins: false,
  },
  {
    criterion: 'Accountability',
    cerebrum: 'Scheduled sessions and progress review',
    competitor: 'Self-driven; you build your own study blocks',
    cerebrumWins: true,
  },
  {
    criterion: 'Cost Model',
    cerebrum: 'Foundations coaching tiers (hourly / programme)',
    competitor: 'Subscription for the question bank',
    cerebrumWins: false,
  },
  {
    criterion: 'Best Use',
    cerebrum: 'The teaching layer when concepts, not practice, are the gap',
    competitor: 'The practice engine once foundations are solid',
    cerebrumWins: true,
  },
]

const whyChoose = [
  {
    title: 'The "Why," Not Just the Question',
    description:
      'UWorld is the gold-standard Step 1 question bank, and its explanations are excellent — but they assume the underlying biology is already understood. Cerebrum supplies that foundation: live coaching that builds the concepts UWorld questions test.',
  },
  {
    title: 'AIIMS-Trained Foundations Depth',
    description:
      'Faculty trained at AIIMS (the All India Institute of Medical Sciences — India’s apex medical institute, comparable to Harvard Medical School in selectivity) coach biology and biochemistry fundamentals with medical-school-level depth.',
  },
  {
    title: 'Live Feedback for Stubborn Gaps',
    description:
      'When you keep missing the same concept on UWorld, a written explanation rarely fixes it. A live session that reteaches the fundamental — and checks your understanding in real time — does.',
  },
  {
    title: 'Built to Pair With UWorld',
    description:
      'Most students keep UWorld as their primary question bank and add Cerebrum to shore up biology/biochem foundations. The two reinforce each other — practice plus understanding.',
  },
]

const whenCompetitorBetter = [
  'Your biology and biochemistry foundations are already strong',
  'You mainly need high-volume, exam-realistic practice and active recall',
  'You prefer a fully self-paced study schedule you manage yourself',
]

const testimonials = [
  {
    name: 'Medical student, IMG track',
    score: 'Step 1 Pass',
    college: 'Used UWorld + Cerebrum',
    quote:
      'UWorld kept flagging the same biochem gaps. Cerebrum’s live coaching reteaching those pathways was what finally made the explanations stick.',
  },
  {
    name: 'Pre-clinical student',
    score: 'Improved practice scores',
    college: 'USMLE Step 1 prep',
    quote:
      'I treated Cerebrum as my foundations layer and UWorld as my practice engine. Doing both moved my percent-correct more than grinding questions alone.',
  },
]

const faqs = [
  {
    question: 'Is Cerebrum a replacement for UWorld?',
    answer:
      'No. UWorld is the dominant USMLE Step 1 question bank and remains essential for most students. Cerebrum is a live biology-foundations specialist that builds the conceptual understanding behind the questions. They do different jobs, and most students use both.',
  },
  {
    question: 'UWorld explanations are already detailed — why add live coaching?',
    answer:
      'UWorld explanations assume you already grasp the underlying biology and biochemistry. If those foundations are shaky, reading more explanations rarely fixes the gap. Live coaching reteaches the fundamental concept and confirms you understand it, so the next batch of questions clicks.',
  },
  {
    question: 'How does Cerebrum fit into a UWorld-based study plan?',
    answer:
      'Use UWorld as your primary practice engine and Cerebrum as your foundations layer. When you keep missing a topic, bring it to a live session, rebuild the concept, then return to the question bank. The two reinforce each other rather than overlap.',
  },
  {
    question: 'Does Cerebrum cover all of USMLE Step 1?',
    answer:
      'No. Cerebrum focuses on biology and biochemistry foundations — it is a specialist, not a full Step 1 course. For broad question practice across every subject, UWorld and your other resources remain the right tools.',
  },
]

const whatsappMessage =
  "Hi — I'm comparing Cerebrum and UWorld for USMLE Step 1 biology foundations. Please share coaching details, pricing, and how it pairs with UWorld."
const waLink = `https://wa.me/918826444334?text=${encodeURIComponent(whatsappMessage)}`

const crossLinks = [
  { href: '/best-usmle-step-1-biology-tutor', label: 'Best USMLE Step 1 Biology Tutor' },
  { href: '/usmle-step-1-biology-preparation', label: 'USMLE Step 1 Biology Preparation' },
]

export default function Page() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Cerebrum USMLE Step 1 Biology Foundations Coaching',
    description:
      'Live, AIIMS-trained biology and biochemistry foundations coaching for USMLE Step 1 — the conceptual "why" behind the answers. A teaching layer that complements question banks such as UWorld.',
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
    headline: 'Cerebrum vs UWorld (USMLE Step 1): Foundations Coaching vs Question Bank',
    description:
      'An honest comparison of Cerebrum Biology Academy and UWorld for USMLE Step 1 — live biology-foundations coaching versus the dominant Step 1 question bank.',
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
          'USMLE Step 1 Biology',
          'USMLE Step 1 Biochemistry',
          'Medical Foundations Biology',
        ]}
        jobTitle="Founder & Lead Biology Faculty — USMLE Step 1 Biology Foundations"
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
              Foundations Coaching vs Question Bank
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Cerebrum vs UWorld for USMLE Step 1
            </h1>
            <p className="text-2xl text-green-50 mb-3">
              The "why" behind the answers — the foundations layer for Step 1 biology.
            </p>
            <p className="text-lg text-green-100 mb-8 max-w-3xl mx-auto speakable-intro">
              UWorld is the dominant USMLE Step 1 question bank — the gold standard for practice and
              detailed answer explanations. But those explanations assume you already understand the
              underlying biology and biochemistry. Cerebrum is a live foundations specialist:
              AIIMS-trained faculty who build the conceptual "why" behind the answers. They are
              complementary — most students keep UWorld for practice and add Cerebrum for
              foundations.
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
              Cerebrum Biology Academy vs {COMPETITOR} — across what actually matters for Step 1
              biology foundations.
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
              Why Add Cerebrum to a UWorld-Based Plan
            </h2>
            <p className="text-lg text-slate-600">
              The structural reasons a live foundations specialist complements a question bank.
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
              When {COMPETITOR} Alone Is Enough
            </h2>
            <p className="text-slate-600 mb-6">
              Honest assessment — {COMPETITOR} is rightly the cornerstone of most Step 1 prep. It is
              sufficient on its own when:
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
              Common pattern: students keep {COMPETITOR} as their primary question bank and add
              Cerebrum specifically to rebuild biology/biochem foundations — pairing the two rather
              than choosing.
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
              foundations.
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
            No obligation — experience live biology-foundations coaching for Step 1, in your time
            zone.
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
