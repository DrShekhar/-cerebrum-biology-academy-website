import { Metadata } from 'next'
import Link from 'next/link'
import { Award, CheckCircle, X, Phone, ArrowRight, Star, MessageCircle } from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const SLUG = 'cerebrum-vs-kaplan-ap-biology'
const CANONICAL = `${BASE_URL}/${SLUG}`
const PHONE = '+91 88264-44334'
const PHONE_TEL = 'tel:+918826444334'
const COMPETITOR = 'Kaplan AP Biology'

export const metadata: Metadata = {
  title: 'Cerebrum vs Kaplan AP Biology | Biology-Only Specialist vs Generalist',
  description:
    'Cerebrum Biology Academy vs Kaplan for AP Biology. Kaplan is a generalist multi-AP brand where AP Bio is one of dozens of courses; Cerebrum is a biology-only specialist with live, consistent faculty focused on a score of 5.',
  keywords: [
    'cerebrum vs kaplan ap biology',
    'kaplan ap biology alternative',
    'best ap biology tutor vs kaplan',
    'ap biology specialist vs kaplan',
    'kaplan ap biology review alternative',
    'live ap biology tutoring usa',
  ],
  openGraph: {
    title: 'Cerebrum vs Kaplan AP Biology | Specialist vs Generalist',
    description:
      'Biology-only AP specialist with live, consistent faculty vs a generalist multi-AP brand. Compare focus, faculty, and score-5 emphasis.',
    url: CANONICAL,
    type: 'website',
    locale: 'en_US',
  },
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Cerebrum vs Kaplan AP Biology | Specialist vs Generalist',
    description:
      'Biology-only AP specialist with live, consistent faculty vs a generalist multi-AP brand. Compare focus, faculty, and score-5 emphasis.',
  },
}

const comparison = [
  {
    criterion: 'Focus',
    cerebrum: 'AP Biology only — a single-subject specialist',
    competitor: 'One of dozens of AP courses across the catalog',
    cerebrumWins: true,
  },
  {
    criterion: 'Faculty Continuity',
    cerebrum: 'Consistent biology faculty across the full course',
    competitor: 'Instructors can rotate across subjects and cohorts',
    cerebrumWins: true,
  },
  {
    criterion: 'Faculty Background',
    cerebrum: 'AIIMS-trained, biology-only teaching depth',
    competitor: 'Experienced generalist test-prep instructors',
    cerebrumWins: true,
  },
  {
    criterion: 'Format',
    cerebrum: 'Live small-batch + 1:1 sessions',
    competitor: 'Self-paced materials with some live options',
    cerebrumWins: true,
  },
  {
    criterion: 'Score Emphasis',
    cerebrum: 'Explicit score-5 and FRQ technique focus',
    competitor: 'Broad AP exam readiness',
    cerebrumWins: true,
  },
  {
    criterion: 'Brand Breadth',
    cerebrum: 'Biology vertical only',
    competitor: 'Large, established multi-AP and test-prep brand',
    cerebrumWins: false,
  },
  {
    criterion: 'Multi-Subject Bundling',
    cerebrum: 'Biology only (no multi-AP bundle)',
    competitor: 'Can bundle several AP subjects in one place',
    cerebrumWins: false,
  },
  {
    criterion: 'Pricing',
    cerebrum: '$2,500 / $4,500 / $7,000 per year (1:1 from $40/hr)',
    competitor: 'Generalist AP course pricing per subject',
    cerebrumWins: false,
  },
]

const whyChoose = [
  {
    title: 'Biology-Only, Not One of Thirty Courses',
    description:
      'For Kaplan, AP Biology is one subject within a large multi-AP catalog. For Cerebrum, biology is the only subject — so the curriculum, faculty, and feedback are built entirely around it.',
  },
  {
    title: 'Consistent, AIIMS-Trained Faculty',
    description:
      'Cerebrum students work with the same biology faculty throughout the course. That faculty is trained at AIIMS (the All India Institute of Medical Sciences — India’s apex medical institute, comparable to Harvard Medical School in selectivity) and teaches nothing but biology.',
  },
  {
    title: 'Live and Score-5 Focused',
    description:
      'Live small-batch and 1:1 sessions target the exact skills the AP Biology exam rewards — data analysis, experimental design, and free-response technique — with an explicit push toward a score of 5.',
  },
  {
    title: 'Flexible 1:1 from $40/hour',
    description:
      'Beyond full-year programmes ($2,500–$7,000), Cerebrum offers 1:1 tutoring from $40/hour — useful for targeted gap-fill ahead of the May exam.',
  },
]

const whenCompetitorBetter = [
  'You want to prepare for several AP subjects through one provider',
  'You prefer a large, well-known national test-prep brand',
  'You want fully self-paced materials and are comfortable studying solo',
]

const testimonials = [
  {
    name: 'High-school junior, New Jersey',
    score: 'AP Biology 5',
    college: 'Applied to BS/MD programs',
    quote:
      'Having one biology teacher who knew exactly where I was struggling beat the rotating, one-size-fits-all approach I had before. The FRQ coaching was the difference.',
  },
  {
    name: 'High-school senior, Bay Area',
    score: 'AP Biology 5',
    college: 'Pre-med track',
    quote:
      'The live sessions and consistent faculty kept me accountable. I felt like the whole course was built around AP Bio, not squeezed into a big catalog.',
  },
]

const faqs = [
  {
    question: 'How is Cerebrum different from Kaplan for AP Biology?',
    answer:
      'Kaplan is a generalist multi-AP test-prep brand where AP Biology is one of many courses, often with self-paced materials and rotating instructors. Cerebrum is a biology-only specialist: live coaching, consistent AIIMS-trained faculty, and a curriculum built entirely around AP Biology and a score of 5.',
  },
  {
    question: 'Does specialist focus actually help on AP Biology?',
    answer:
      'AP Biology rewards experimental design, data analysis, and free-response writing more than rote recall. A biology-only specialist who teaches these skills all day — and works with the same student across the course — can target weak areas more precisely than a generalist covering many subjects.',
  },
  {
    question: 'What does Cerebrum cost compared with Kaplan?',
    answer:
      'Cerebrum offers full-year AP Biology programmes at $2,500, $4,500, and $7,000, plus 1:1 tutoring from $40/hour. Kaplan prices its AP courses per subject as a generalist brand. The right comparison is live single-subject specialist coaching versus a self-paced multi-AP catalog — different models for different needs.',
  },
  {
    question: 'Can Cerebrum help with several AP subjects at once?',
    answer:
      'No — Cerebrum is biology only. If you want one provider for multiple AP subjects, a generalist like Kaplan is the more convenient choice. For AP Biology specifically, Cerebrum’s single-subject focus is the advantage.',
  },
]

const whatsappMessage =
  "Hi — I'm comparing Cerebrum and Kaplan for AP Biology. Please share programme details, pricing, and how the live biology-only coaching works."
const waLink = `https://wa.me/918826444334?text=${encodeURIComponent(whatsappMessage)}`

const crossLinks = [
  { href: '/best-ap-biology-tutor-usa', label: 'Best AP Biology Tutor USA' },
  { href: '/ap-biology-tutor', label: 'AP Biology Tutor' },
]

export default function Page() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Cerebrum AP Biology Coaching',
    description:
      'Live, biology-only AP Biology coaching with consistent AIIMS-trained faculty and an explicit score-5 focus — distinct from generalist multi-AP test-prep brands.',
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
    headline: 'Cerebrum vs Kaplan AP Biology: Biology-Only Specialist vs Generalist',
    description:
      'An honest comparison of Cerebrum Biology Academy and Kaplan for AP Biology — a biology-only specialist with consistent live faculty versus a generalist multi-AP brand.',
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
          'AP Biology',
          'AP Biology Free-Response Questions',
          'College Board AP Biology Curriculum',
        ]}
        jobTitle="Founder & Lead Biology Faculty — AP Biology Specialist"
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
              Biology-Only Specialist vs Multi-AP Generalist
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Cerebrum vs Kaplan for AP Biology
            </h1>
            <p className="text-2xl text-green-50 mb-3">
              Live, biology-only coaching built entirely around a score of 5.
            </p>
            <p className="text-lg text-green-100 mb-8 max-w-3xl mx-auto speakable-intro">
              Kaplan is a large, well-known generalist test-prep brand where AP Biology is one of
              dozens of AP courses — typically self-paced materials with some live options and
              instructors who may rotate across subjects. Cerebrum is a biology-only specialist:
              live coaching, consistent AIIMS-trained faculty, and a curriculum focused entirely on
              AP Biology and the free-response skills that earn a 5.
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
              Cerebrum Biology Academy vs {COMPETITOR} — across what actually matters for AP
              Biology.
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
              Why Students Choose Cerebrum for AP Biology
            </h2>
            <p className="text-lg text-slate-600">
              The structural reasons a biology-only specialist outperforms a generalist multi-AP
              brand for AP Biology specifically.
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
              When {COMPETITOR} Might Be Better
            </h2>
            <p className="text-slate-600 mb-6">
              Honest assessment — there are real scenarios where a generalist brand like Kaplan is
              the better fit:
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
              The choice comes down to breadth versus depth: a multi-AP catalog for several subjects
              in one place, or a biology-only specialist when AP Biology is the priority.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Students Who Chose the Specialist
            </h2>
            <p className="text-lg text-slate-600">
              Results from AP Biology students who chose biology-only coaching.
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
            No obligation — experience biology-only AP coaching for yourself, in your time zone.
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
