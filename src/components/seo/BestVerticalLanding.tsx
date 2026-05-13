import Link from 'next/link'
import {
  Award,
  Star,
  CheckCircle,
  ArrowRight,
  Phone,
  GraduationCap,
  MessageCircle,
} from 'lucide-react'

const PHONE = '+91 88264-44334'
const PHONE_TEL = 'tel:+918826444334'
const WA_BASE = 'https://wa.me/918826444334?text='

export type BestVerticalConfig = {
  /** Canonical URL slug, e.g. 'best-ib-biology-tutor' */
  slug: string
  /** H1 lead-in, e.g. 'Best IB Biology Tutor' */
  headline: string
  /** Yellow ribbon text */
  ribbon: string
  /** Tagline shown below the H1 */
  subheadline: string
  /** Paragraph below the subheadline */
  intro: string
  /** Credentials chips (4–8 items) */
  credentials: { label: string }[]
  /** Sub-pages / city pages aggregated by this hub */
  pages: { title: string; href: string; note?: string }[]
  /** Pricing rows */
  pricing: { tier: string; price: string; description: string }[]
  /** Reasons this is the best (3–6 items) */
  whyBest: { title: string; description: string }[]
  /** Testimonials (3) */
  testimonials: {
    name: string
    score: string
    college: string
    quote: string
  }[]
  /** FAQs (4–8 items) */
  faqs: { question: string; answer: string }[]
  /** Knowsabout values for Person schema */
  knowsAbout: string[]
  /** WhatsApp message text */
  whatsappMessage: string
  /** Cluster size string for hero */
  clusterSummary: string
}

export function BestVerticalLanding({ config }: { config: BestVerticalConfig }) {
  const canonicalUrl = `https://cerebrumbiologyacademy.com/${config.slug}`

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://cerebrumbiologyacademy.com/dr-shekhar-singh-neet-biology-faculty#person',
    name: 'Dr. Shekhar C Singh',
    alternateName: ['Shekhar Singh', 'Dr Shekhar Singh'],
    honorificPrefix: 'Dr.',
    jobTitle: `Founder & Lead Faculty — ${config.headline}`,
    description:
      'Dr. Shekhar C Singh — AIIMS New Delhi alumnus, founder of Cerebrum Biology Academy (2014), with 15+ years of biology pedagogy across NEET, IB, AP, MCAT and Biology Olympiad. 680+ medical college selections and a 98% NEET-UG qualification rate.',
    image: 'https://cerebrumbiologyacademy.com/faculty/dr-shekhar-singh.jpg',
    url: 'https://cerebrumbiologyacademy.com/dr-shekhar-singh-neet-biology-faculty',
    sameAs: [
      'https://www.youtube.com/@drshekharcsingh',
      'https://www.youtube.com/@cerebrumbiologyacademy',
      'https://www.instagram.com/cerebrumbiologyacademy/',
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'All India Institute of Medical Sciences (AIIMS), New Delhi',
      url: 'https://www.aiims.edu/',
    },
    worksFor: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
      foundingDate: '2014',
    },
    knowsAbout: config.knowsAbout,
    award: [
      'Best Biology Teacher Award 2022 — Education Excellence Foundation',
      'NEET Educator of the Year 2023',
      '680+ Medical College Selections',
      '98% NEET-UG Qualification Rate',
    ],
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': 'https://cerebrumbiologyacademy.com/#organization',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
    logo: 'https://cerebrumbiologyacademy.com/logo.png',
    founder: {
      '@id': 'https://cerebrumbiologyacademy.com/dr-shekhar-singh-neet-biology-faculty#person',
    },
    foundingDate: '2014',
    description:
      "India's leading biology-only specialist coaching brand — NEET, IB, AP, MCAT and Biology Olympiad (USABO, INBO, IBO, NSEB) under AIIMS-trained faculty Dr. Shekhar C Singh.",
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '485',
      bestRating: '5',
      worstRating: '1',
    },
    review: config.testimonials.map((t) => ({
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      author: { '@type': 'Person', name: t.name },
      reviewBody: t.quote,
      itemReviewed: { '@type': 'EducationalOrganization', name: 'Cerebrum Biology Academy' },
    })),
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: config.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
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
        name: 'Best Biology Teacher in India',
        item: 'https://cerebrumbiologyacademy.com/best-biology-teacher-india',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: config.headline,
        item: canonicalUrl,
      },
    ],
  }

  const waLink = `https://wa.me/918826444334?text=${encodeURIComponent(config.whatsappMessage)}`

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
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
              {config.ribbon}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{config.headline}</h1>
            <p className="text-2xl text-green-50 mb-3">{config.subheadline}</p>
            <p className="text-lg text-green-100 mb-3 max-w-3xl mx-auto">{config.intro}</p>
            <p className="text-sm text-green-200 mb-8">{config.clusterSummary}</p>
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
                href="#pricing"
                className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition"
              >
                See Pricing
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-green-100 mt-6">
              Or call directly:{' '}
              <a href={PHONE_TEL} className="font-semibold text-yellow-300 hover:underline">
                {PHONE}
              </a>{' '}
              · Free demo, no obligation · Join 680+ medical college admissions
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
            {config.credentials.map((c) => (
              <span
                key={c.label}
                className="inline-flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full text-sm text-slate-700 border border-slate-200"
              >
                <GraduationCap className="w-4 h-4 text-green-700" />
                {c.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Explore the Programme
            </h2>
            <p className="text-lg text-slate-600">
              Every city, school and topic page is taught by the same AIIMS-trained biology
              specialists. Pick the entry point closest to you.
            </p>
          </div>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {config.pages.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="block bg-gradient-to-br from-slate-50 to-white p-5 rounded-xl border border-slate-200 hover:border-green-600 hover:shadow-md transition group"
              >
                <h3 className="font-semibold text-slate-900 group-hover:text-green-700 mb-1">
                  {p.title}
                </h3>
                {p.note ? <p className="text-sm text-slate-500">{p.note}</p> : null}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-16 bg-slate-50 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Transparent Pricing
            </h2>
            <p className="text-lg text-slate-600">
              No hidden fees. EMI available. Pricing benchmarked against branded competitors.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            {config.pricing.map((p) => {
              const tierWaMessage = `Hi! I'm interested in the ${p.tier} plan (${p.price}) for ${config.headline}. Please share details and demo class timings.`
              const tierWaLink = `${WA_BASE}${encodeURIComponent(tierWaMessage)}`
              return (
                <div
                  key={p.tier}
                  className="flex flex-col bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition"
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{p.tier}</h3>
                  <p className="text-2xl font-bold text-green-700 mb-3">{p.price}</p>
                  <p className="text-slate-600 text-sm mb-6 flex-grow">{p.description}</p>
                  <div className="flex flex-col gap-2 mt-auto">
                    <Link
                      href={tierWaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-green-700 transition"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp About This Plan
                    </Link>
                    <a
                      href={PHONE_TEL}
                      className="inline-flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-4 py-2.5 rounded-lg font-semibold hover:bg-slate-200 transition text-sm"
                    >
                      <Phone className="w-4 h-4" />
                      Call to Enrol
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
          <p className="text-center text-sm text-slate-500 mt-8">
            EMI plans available · Free demo class before enrolment · 7-day money-back guarantee
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Cerebrum is the Canonical Answer
            </h2>
            <p className="text-lg text-slate-600">
              The structural reasons a biology-only AIIMS-trained specialist outperforms generalist
              tutoring platforms.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {config.whyBest.map((item) => (
              <div key={item.title} className="bg-slate-50 p-6 rounded-xl">
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

      <section className="py-12 bg-gradient-to-r from-green-700 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-1">
                Convinced so far? Book a free demo class.
              </h3>
              <p className="text-green-50 text-lg">
                Experience the AIIMS-trained pedagogy yourself. No obligation, no commitment.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a
                href={PHONE_TEL}
                className="inline-flex items-center justify-center gap-2 bg-yellow-500 text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition whitespace-nowrap"
              >
                <Phone className="w-5 h-5" />
                Call {PHONE}
              </a>
              <Link
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition whitespace-nowrap"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Verified Results</h2>
            <p className="text-lg text-slate-600">
              485+ five-star reviews across platforms · 5.0/5 average.
            </p>
          </div>
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            {config.testimonials.map((t) => (
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
              {config.faqs.map((faq) => (
                <details key={faq.question} className="bg-slate-50 rounded-lg group">
                  <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-slate-100">
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
            No obligation, no commitment — just an honest look at the teaching.
          </p>
          <p className="text-sm text-slate-400 mb-8">
            680+ medical college admissions · 98% NEET qualification rate · 485+ five-star reviews
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
            See also:{' '}
            <Link href="/best-biology-teacher-india" className="underline">
              Best Biology Teacher in India
            </Link>
          </p>
        </div>
      </section>

      {/* Spacer for mobile sticky CTA bar */}
      <div className="h-20 md:hidden" aria-hidden="true" />

      {/* Sticky mobile CTA bar */}
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
