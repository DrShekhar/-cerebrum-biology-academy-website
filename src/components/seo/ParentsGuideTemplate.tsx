import Link from 'next/link'
import { Phone, ArrowRight, CheckCircle, Heart, Shield, AlertTriangle } from 'lucide-react'

// Shared template for /parents-guide-neet-coaching-{city} pages.
// City-specific copy + CTA targets are passed as props; the structural
// content (checklist, red flags, support tips, mental-health section,
// FAQs) is identical across NCR cities by design — parents need the same
// guidance regardless of locality.
//
// The gurugram page (shipped May 2025) stays on its own implementation
// to avoid regression risk; new NCR cities use this template.

export interface ParentsGuideCityConfig {
  cityName: string
  citySlug: string
  bookDemoUrl: string
  cityShortAside?: string
  cityFaq?: { question: string; answer: string }
}

const checklistBeforeJoining = [
  "Visit the center physically, don't just rely on ads",
  'Meet the actual faculty who will teach (not just counselors)',
  'Ask for batch size - smaller is better (20-30 ideal)',
  'Check fee structure including all hidden costs',
  'Talk to current students and their parents',
  'Verify success rate claims with actual data',
  'Check infrastructure: AC, seating, study material',
  'Ask about makeup classes for missed sessions',
]

const redFlags = [
  'Guaranteeing specific ranks or results',
  'Pressuring for immediate enrollment with "limited seats"',
  'Unwilling to show demo class before enrollment',
  'Hidden fees revealed after joining',
  'Batch size over 50 students',
  'No clear refund policy',
  'Faculty not available for parent meetings',
]

const supportTips = [
  {
    title: "Don't Compare",
    description:
      "Every child's journey is different. Comparing with relatives' kids adds pressure.",
  },
  {
    title: 'Maintain Communication',
    description: 'Have daily non-academic conversations. Ask about their day, not just studies.',
  },
  {
    title: 'Healthy Environment',
    description: 'Ensure proper sleep (7-8 hours), nutrition, and short breaks during study.',
  },
  {
    title: 'Manage Your Anxiety',
    description: 'Your stress transfers to your child. Stay calm and positive.',
  },
  {
    title: 'Plan B Conversation',
    description: 'Discuss alternatives calmly. Reduces "do or die" pressure on NEET.',
  },
  {
    title: 'Trust the Process',
    description: 'Consistent effort over 2 years matters more than daily monitoring.',
  },
]

const baseFaqs = [
  {
    question: 'How much should I spend on NEET coaching?',
    answer:
      "Quality biology coaching runs ₹40,000-₹1,56,000 per year across our three tiers (Pursuit / Ascent / Pinnacle). Expensive doesn't mean better — a small-batch programme with strong faculty often outperforms ₹2-3L generalist coaching. Focus on batch size and faculty quality, not brand name.",
  },
  {
    question: 'Should I send my child to Kota?',
    answer:
      'Not necessary. Good local coaching gives the same academic quality with family support. Kota suits self-motivated students who thrive independently. Consider the emotional and mental-health cost of sending your child away — and the ₹2-2.5L all-in (coaching + hostel + mess) vs ~half of that for Cerebrum Pinnacle with no relocation.',
  },
  {
    question: 'How do I know if my child is progressing?',
    answer:
      "Regular mock-test scores (should improve over time), reduced doubt questions in basic concepts, and the ability to explain topics to you in simple terms. Don't just track hours studied — track understanding.",
  },
  {
    question: 'What if my child wants to drop after 12th?',
    answer:
      "Dropping is okay if 1) the first attempt score was 550+, 2) the child is motivated (not just the parent's decision), and 3) a clear strategy for improvement exists. One drop year is reasonable; multiple drops need reassessment.",
  },
  {
    question: 'How can I help without being overbearing?',
    answer:
      'Create a distraction-free environment, ensure healthy meals and sleep, handle your own stress (don\'t add to theirs), attend parent-teacher meetings, and most importantly — express love and support unconditionally.',
  },
]

export function ParentsGuideTemplate({ config }: { config: ParentsGuideCityConfig }) {
  const faqs = config.cityFaq ? [...baseFaqs, config.cityFaq] : baseFaqs

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <section className="bg-gradient-to-r from-rose-700 to-rose-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-yellow-500 px-4 py-1 text-sm font-semibold text-rose-900">
              <Heart className="h-4 w-4" />
              For Parents · {config.cityName}
            </span>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">
              Parents Guide to NEET Coaching in {config.cityName}
            </h1>
            <p className="mb-8 text-xl text-rose-100">
              Everything you need to know to support your child's NEET journey
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 rounded-lg border-l-4 border-rose-600 bg-gradient-to-r from-rose-50 to-pink-50 p-6">
              <h2 className="mb-3 text-xl font-bold text-rose-900">Dear {config.cityName} Parent</h2>
              <p className="text-lg text-rose-800">
                Your child's NEET journey is stressful for the entire family. This guide helps you
                make informed decisions about coaching, understand what to expect, and most
                importantly — how to support your child without adding pressure. Remember:{' '}
                <strong>your emotional support matters more than the coaching you choose</strong>.
                {config.cityShortAside ? ` ${config.cityShortAside}` : ''}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold">
            Checklist Before Joining Any Coaching
          </h2>
          <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow-lg">
            <ul className="space-y-4">
              {checklistBeforeJoining.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-red-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-red-800">
            Red Flags to Watch For
          </h2>
          <div className="mx-auto max-w-3xl rounded-xl border-2 border-red-200 bg-white p-8 shadow-lg">
            <ul className="space-y-4">
              {redFlags.map((flag) => (
                <li key={flag} className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-6 w-6 flex-shrink-0 text-red-500" />
                  <span className="text-red-800">{flag}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold">How to Support Your Child</h2>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {supportTips.map((tip) => (
              <div key={tip.title} className="rounded-xl bg-rose-50 p-6">
                <h3 className="mb-2 font-bold text-rose-800">{tip.title}</h3>
                <p className="text-sm text-gray-600">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold">Understanding the NEET Timeline</h2>
            <div className="rounded-xl bg-white p-6 shadow-lg">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-24 flex-shrink-0">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
                      Class 11
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">Foundation Year</p>
                    <p className="text-sm text-gray-600">
                      Build concepts, develop study habits. Don't expect perfect scores yet. Focus
                      on understanding, not memorising.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-24 flex-shrink-0">
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-800">
                      Class 12
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">Intensive Year</p>
                    <p className="text-sm text-gray-600">
                      Balance boards and NEET. Scores should start improving in mock tests. This is
                      when pressure peaks — your support is crucial.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-24 flex-shrink-0">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
                      Final 3 Months
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">Revision &amp; Mocks</p>
                    <p className="text-sm text-gray-600">
                      No new topics. Focus on revision and mock tests. Manage exam anxiety. Ensure
                      proper sleep and nutrition.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-rose-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-start gap-4">
              <Shield className="mt-1 h-8 w-8 flex-shrink-0 text-rose-600" />
              <div>
                <h2 className="mb-2 text-xl font-bold text-rose-900">Mental Health Matters</h2>
                <p className="mb-4 text-rose-800">
                  NEET preparation stress is real. Watch for these signs and seek help if needed:
                </p>
                <ul className="space-y-2 text-rose-800">
                  <li>• Persistent anxiety or panic attacks</li>
                  <li>• Sleep issues (too much or too little)</li>
                  <li>• Loss of interest in previously enjoyed activities</li>
                  <li>• Extreme mood swings or irritability</li>
                  <li>• Talk of being a burden or giving up</li>
                </ul>
                <p className="mt-4 font-semibold">
                  If you notice these, consider professional counselling. Your child's mental health
                  is more important than any exam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Frequently Asked Questions</h2>
          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-lg bg-gray-50 shadow-md">
                <summary className="flex cursor-pointer items-center justify-between px-6 py-4 font-semibold hover:bg-gray-100">
                  {faq.question}
                  <span className="text-rose-600 transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-rose-700 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Have Questions? We're Here to Help</h2>
          <p className="mb-8 text-xl text-rose-100">
            Schedule a free parent counselling session. No pressure, just guidance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918826444334"
              className="inline-flex items-center gap-2 rounded-lg bg-yellow-500 px-8 py-3 font-semibold text-rose-900 transition hover:bg-yellow-400"
            >
              <Phone className="h-5 w-5" />
              Call 88264-44334
            </a>
            <Link
              href={config.bookDemoUrl}
              className="inline-flex items-center gap-2 rounded-lg bg-white/20 px-8 py-3 font-semibold text-white transition hover:bg-white/30"
            >
              Book Demo with Child
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: `Parents Guide to NEET Coaching in ${config.cityName}`,
            description: `Complete guide for ${config.cityName} parents on NEET coaching selection and child support`,
            author: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
            publisher: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
            datePublished: '2025-01-01',
            dateModified: new Date().toISOString().slice(0, 10),
            mainEntityOfPage: `https://cerebrumbiologyacademy.com/parents-guide-neet-coaching-${config.citySlug}`,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          }),
        }}
      />
    </div>
  )
}
