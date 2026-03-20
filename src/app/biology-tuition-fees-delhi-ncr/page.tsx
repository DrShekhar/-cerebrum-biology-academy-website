import { Metadata } from 'next'
import Link from 'next/link'
import {
  Phone,
  CheckCircle,
  ArrowRight,
  XCircle,
  IndianRupee,
  BookOpen,
  Users,
  Award,
  Video,
  MessageCircle,
  GraduationCap,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Biology Tuition Fees in Delhi NCR 2026 | ₹3K-8K/Month | Compare & Save',
  description:
    'Compare biology tuition fees across Delhi NCR. Home tutors ₹5-8K/month, online ₹3-5K/month, Cerebrum ₹4K/month with AIIMS faculty + test series included. Call 88264-44334.',
  keywords: [
    'biology tuition fees delhi',
    'biology tuition fees noida',
    'biology tuition fees gurugram',
    'biology coaching fees',
    'biology home tuition fees',
    'class 11 biology tuition fees',
    'class 12 biology tuition fees',
    'affordable biology tuition delhi ncr',
  ],
  openGraph: {
    title: 'Biology Tuition Fees in Delhi NCR 2026 | ₹3K-8K/Month | Compare & Save',
    description:
      'Compare biology tuition fees across Delhi NCR. Home tutors ₹5-8K/month, online ₹3-5K/month, Cerebrum ₹4K/month with AIIMS faculty + test series included.',
    url: 'https://cerebrumbiologyacademy.com/biology-tuition-fees-delhi-ncr',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-fees-delhi-ncr',
  },
}

const cityFeeData = [
  {
    city: 'Noida',
    homeTutor: '₹5,000–7,000',
    onlineTutor: '₹3,000–5,000',
    localCoaching: '₹4,000–10,000',
    cerebrum: '₹4,000',
  },
  {
    city: 'Gurugram',
    homeTutor: '₹6,000–8,000',
    onlineTutor: '₹3,000–5,000',
    localCoaching: '₹5,000–12,000',
    cerebrum: '₹4,000',
  },
  {
    city: 'Faridabad',
    homeTutor: '₹4,000–6,000',
    onlineTutor: '₹3,000–4,000',
    localCoaching: '₹3,500–8,000',
    cerebrum: '₹4,000',
  },
  {
    city: 'Rohini / North Delhi',
    homeTutor: '₹5,000–7,000',
    onlineTutor: '₹3,000–5,000',
    localCoaching: '₹4,000–9,000',
    cerebrum: '₹4,000',
  },
  {
    city: 'South Delhi',
    homeTutor: '₹7,000–10,000',
    onlineTutor: '₹3,000–5,000',
    localCoaching: '₹6,000–15,000',
    cerebrum: '₹4,000',
  },
  {
    city: 'Ghaziabad',
    homeTutor: '₹4,000–6,000',
    onlineTutor: '₹3,000–4,000',
    localCoaching: '₹3,000–7,000',
    cerebrum: '₹4,000',
  },
]

const cerebrumPricing = [
  {
    course: 'Foundation (Class 9-10)',
    annual: '₹45,000',
    monthly: '~₹3,750/month',
    tag: 'Early Start',
  },
  {
    course: 'Class 11 (NEET + Board)',
    annual: '₹48,000',
    monthly: '~₹4,000/month',
    tag: 'Most Popular',
  },
  {
    course: 'Class 12 (NEET + Board)',
    annual: '₹60,000',
    monthly: '~₹5,000/month',
    tag: 'Intensive',
  },
  {
    course: 'Dropper Batch (NEET)',
    annual: '₹65,000',
    monthly: '~₹5,400/month',
    tag: 'Full Focus',
  },
]

const includedFeatures = [
  { icon: GraduationCap, text: 'AIIMS / medical college faculty for every lecture' },
  { icon: BookOpen, text: '19,000+ MCQ bank with NEET-pattern questions' },
  { icon: Video, text: 'Recorded lectures — revise anytime, never miss a class' },
  { icon: Award, text: 'Weekly chapter tests + full-length mock tests' },
  { icon: MessageCircle, text: 'WhatsApp doubt support — get answers within hours' },
  { icon: Users, text: 'Max 15 students per batch — personal attention guaranteed' },
]

const hiddenCosts = [
  { item: 'Study material (not provided)', cost: '₹3,000–5,000/year' },
  { item: 'Test series (separate purchase)', cost: '₹2,000–4,000/year' },
  { item: 'Missed class (no recording)', cost: 'Lost forever' },
  { item: 'Extra doubt sessions', cost: '₹500–1,000/hour' },
  { item: 'Board exam-specific prep', cost: '₹2,000–3,000 extra' },
  { item: 'Practice papers / PYQs', cost: '₹1,000–2,000/year' },
]

const faqs = [
  {
    question: 'What is the average biology tuition fee in Delhi NCR?',
    answer:
      'Biology tuition fees in Delhi NCR range from ₹3,000 to ₹10,000 per month depending on the mode (home tutor, online, coaching institute) and location. South Delhi and Gurugram are the most expensive (₹7,000–10,000/month for home tutors), while Faridabad and Ghaziabad are more affordable (₹4,000–6,000/month). Cerebrum Biology Academy charges a flat ₹4,000/month equivalent across all locations.',
  },
  {
    question: 'Are biology coaching fees higher than home tutor fees?',
    answer:
      'Not necessarily. Large coaching institutes (Aakash, Allen) charge ₹1.5–3 lakh/year for a full NEET program (including physics and chemistry). Biology-specific coaching like Cerebrum costs ₹48,000–65,000/year, which is often less than a good home tutor (₹5,000–8,000/month = ₹60,000–96,000/year) while including test series, study material, and recordings.',
  },
  {
    question: 'Does Cerebrum offer EMI or installment payment plans?',
    answer:
      'Yes. Cerebrum Biology Academy offers flexible payment plans including quarterly installments and EMI options through select banks. You can also pay the full annual fee upfront for a discount. Contact us at 88264-44334 for the latest EMI options and offers.',
  },
  {
    question: 'What is included in Cerebrum Biology Academy fees?',
    answer:
      'Cerebrum fees include everything: AIIMS faculty lectures, 19,000+ MCQ question bank, weekly tests, recorded lectures for revision, WhatsApp doubt support, complete study material, and Olympiad preparation. There are zero hidden charges. Home tutors typically charge ₹8,000–12,000 extra per year for equivalent services.',
  },
  {
    question: 'Is online biology tuition cheaper than offline?',
    answer:
      'At Cerebrum, online and offline classes are priced the same because you get the same faculty, same study material, and same test series. However, online students save on commuting costs (₹2,000–4,000/month in Delhi NCR). For students in South Delhi, Ghaziabad, or far-off areas, online is the most cost-effective option.',
  },
]

export default function BiologyTuitionFeesDelhiNCR() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Biology Tuition Fees Delhi NCR',
        item: 'https://cerebrumbiologyacademy.com/biology-tuition-fees-delhi-ncr',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 py-16 text-white md:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <nav className="mb-8 text-sm text-blue-200">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <span>Biology Tuition Fees Delhi NCR</span>
            </nav>
            <h1 className="mb-6 text-3xl font-bold leading-tight md:text-5xl">
              Biology Tuition Fees in Delhi NCR — Complete Comparison 2026
            </h1>
            <p className="mb-8 max-w-2xl text-lg text-blue-100">
              Don&apos;t overpay for biology tuition. Compare fees across home tutors, online tutors,
              and coaching institutes. See exactly what you get for your money.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-blue-900 shadow-lg transition hover:bg-blue-50"
              >
                View Full Pricing <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+918826444334"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                <Phone className="h-4 w-4" /> Call 88264-44334
              </a>
            </div>
          </div>
        </section>

        {/* City-wise Fee Comparison Table */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-900 md:text-3xl">
              Biology Tuition Fees by City — Monthly Comparison
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
              Fee ranges based on 2025-26 market rates. Cerebrum offers consistent pricing across all
              Delhi NCR locations.
            </p>

            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
              <table className="w-full min-w-[700px] text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">City</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">Home Tutor</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">Online Tutor</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">Local Coaching</th>
                    <th className="bg-green-50 px-4 py-3 text-center font-semibold text-green-800">
                      Cerebrum Academy
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cityFeeData.map((row) => (
                    <tr key={row.city} className="border-t border-gray-100">
                      <td className="px-4 py-3 font-medium text-gray-800">{row.city}</td>
                      <td className="px-4 py-3 text-center text-gray-600">{row.homeTutor}</td>
                      <td className="px-4 py-3 text-center text-gray-600">{row.onlineTutor}</td>
                      <td className="px-4 py-3 text-center text-gray-600">{row.localCoaching}</td>
                      <td className="bg-green-50 px-4 py-3 text-center font-semibold text-green-700">
                        {row.cerebrum}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-center text-xs text-gray-400">
              *Cerebrum fees shown as monthly equivalent of annual pricing. All fees are per month for biology only.
            </p>
          </div>
        </section>

        {/* Cerebrum Pricing Breakdown */}
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-900 md:text-3xl">
              Cerebrum Biology Academy — Course-wise Pricing
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
              Transparent pricing with everything included. No hidden charges, no surprise fees.
            </p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {cerebrumPricing.map((plan) => (
                <div
                  key={plan.course}
                  className={`relative rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md ${
                    plan.tag === 'Most Popular' ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-200'
                  }`}
                >
                  {plan.tag === 'Most Popular' && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
                      Most Popular
                    </span>
                  )}
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                    {plan.tag}
                  </p>
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">{plan.course}</h3>
                  <p className="mb-1 text-3xl font-bold text-gray-900">{plan.annual}</p>
                  <p className="mb-4 text-sm text-gray-500">{plan.monthly}</p>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-1 text-sm font-medium text-green-700 hover:text-green-800"
                  >
                    View details <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-900 md:text-3xl">
              What&apos;s Included at Cerebrum (That Tutors Don&apos;t Offer)
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
              Every Cerebrum enrollment includes these at no extra cost. Home tutors charge ₹8,000–12,000
              extra per year for equivalent services — if they offer them at all.
            </p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {includedFeatures.map((feature) => (
                <div key={feature.text} className="flex items-start gap-4 rounded-xl border border-gray-200 p-5">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-green-100">
                    <feature.icon className="h-5 w-5 text-green-700" />
                  </div>
                  <p className="text-gray-700">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hidden Costs of Home Tutors */}
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-900 md:text-3xl">
              Hidden Costs of Home Tutors
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
              A home tutor advertising ₹5,000/month ends up costing ₹8,000–10,000/month once you add
              everything a serious NEET aspirant needs.
            </p>

            <div className="mx-auto max-w-2xl overflow-hidden rounded-xl border border-red-200 bg-white">
              <div className="bg-red-50 px-6 py-3">
                <h3 className="flex items-center gap-2 font-semibold text-red-800">
                  <IndianRupee className="h-4 w-4" /> Extra Costs You&apos;ll Pay with a Home Tutor
                </h3>
              </div>
              <div className="divide-y divide-gray-100">
                {hiddenCosts.map((cost) => (
                  <div key={cost.item} className="flex items-center justify-between px-6 py-3">
                    <span className="flex items-center gap-2 text-gray-700">
                      <XCircle className="h-4 w-4 text-red-400" />
                      {cost.item}
                    </span>
                    <span className="font-medium text-red-700">{cost.cost}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between bg-red-50 px-6 py-3">
                  <span className="font-semibold text-gray-900">Total extra cost per year</span>
                  <span className="font-bold text-red-700">₹8,000–15,000</span>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-green-200 bg-green-50 p-6 text-center">
              <p className="text-lg font-semibold text-green-800">
                At Cerebrum, all of the above is included in your fee. Zero extra charges.
              </p>
            </div>
          </div>
        </section>

        {/* EMI / Payment Plan */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              Flexible Payment Options
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-gray-600">
              We believe financial constraints should never stop a serious student. Cerebrum offers
              multiple payment plans to make quality biology education accessible.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-gray-200 p-6">
                <p className="mb-2 text-2xl font-bold text-gray-900">Annual</p>
                <p className="mb-1 text-sm text-gray-600">Pay full year upfront</p>
                <p className="text-sm font-medium text-green-700">Best value — save up to 10%</p>
              </div>
              <div className="rounded-xl border border-gray-200 p-6">
                <p className="mb-2 text-2xl font-bold text-gray-900">Quarterly</p>
                <p className="mb-1 text-sm text-gray-600">Pay every 3 months</p>
                <p className="text-sm font-medium text-blue-700">Manageable installments</p>
              </div>
              <div className="rounded-xl border border-gray-200 p-6">
                <p className="mb-2 text-2xl font-bold text-gray-900">EMI</p>
                <p className="mb-1 text-sm text-gray-600">Monthly bank EMI available</p>
                <p className="text-sm font-medium text-purple-700">Select bank partners</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="mb-12 text-center text-2xl font-bold text-gray-900 md:text-3xl">
              Frequently Asked Questions About Fees
            </h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-xl border border-gray-200 bg-white p-6">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <p className="leading-relaxed text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 py-16 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
              Get the Best Value for Biology Tuition
            </h2>
            <p className="mb-8 text-lg text-blue-100">
              AIIMS faculty, 19,000+ MCQs, recorded lectures, weekly tests — all included from ₹4,000/month.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-blue-900 shadow-lg transition hover:bg-blue-50"
              >
                View Full Pricing <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="tel:+918826444334"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition hover:bg-white/10"
              >
                <Phone className="h-5 w-5" /> Call 88264-44334
              </a>
              <a
                href="https://wa.me/918826444334?text=Hi%2C%20I%20want%20to%20know%20about%20biology%20tuition%20fees"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition hover:bg-white/10"
              >
                <MessageCircle className="h-5 w-5" /> WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
