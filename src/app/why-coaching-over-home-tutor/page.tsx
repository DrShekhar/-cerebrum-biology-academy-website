import { Metadata } from 'next'
import Link from 'next/link'
import {
  Phone,
  CheckCircle,
  ArrowRight,
  XCircle,
  Users,
  BookOpen,
  Award,
  MessageCircle,
  GraduationCap,
  Target,
  TrendingUp,
  AlertTriangle,
  Heart,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Why Coaching Institute Beats Home Tutor for Biology | NEET + Board 2026',
  description:
    'Home tutor vs coaching for biology — honest comparison. Why 90% of NEET toppers choose coaching over private tutors. Small batch coaching from ₹4K/month. Call 88264-44334.',
  keywords: [
    'home tutor vs coaching biology',
    'private tutor vs coaching institute',
    'biology home tuition vs coaching',
    'should I take coaching for NEET biology',
    'best way to study biology for NEET',
    'coaching vs self study biology',
  ],
  openGraph: {
    title: 'Why Coaching Institute Beats Home Tutor for Biology | NEET + Board 2026',
    description:
      'Home tutor vs coaching for biology — honest comparison. Why 90% of NEET toppers choose coaching over private tutors. Small batch coaching from ₹4K/month.',
    url: 'https://cerebrumbiologyacademy.com/why-coaching-over-home-tutor',
    type: 'article',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/why-coaching-over-home-tutor',
  },
}

const tutorProblems = [
  {
    title: 'No Peer Competition',
    description:
      'Studying alone with a tutor means zero competitive environment. NEET is a race against 20 lakh students — your child needs to benchmark against peers regularly.',
  },
  {
    title: 'No Structured Test Series',
    description:
      'Most home tutors assign homework from guidebooks. They lack the infrastructure for timed mock tests, OMR practice, or NEET-pattern question papers.',
  },
  {
    title: 'No Accountability System',
    description:
      'If your child is underperforming, there is no parent-teacher meeting, no progress report, no corrective action plan. The tutor just continues teaching.',
  },
  {
    title: 'Variable Quality',
    description:
      'Most home tutors are B.Sc or M.Sc graduates who never cracked a medical entrance themselves. They teach from textbooks — not from exam experience.',
  },
  {
    title: 'High Effective Cost',
    description:
      'A tutor charging ₹6,000/month gives you only lectures. Add study material (₹5K), test series (₹3K), and doubt sessions — the real cost is ₹8,000–10,000/month.',
  },
]

const topperReasons = [
  { icon: Users, text: 'Peer learning and healthy competition drive better performance' },
  { icon: Target, text: 'Structured weekly tests reveal weak areas early' },
  { icon: GraduationCap, text: 'Expert faculty who cracked NEET themselves know the shortcuts' },
  { icon: BookOpen, text: 'Curated study material saves 200+ hours of self-compilation' },
  { icon: TrendingUp, text: 'Progressive difficulty keeps students challenged and growing' },
  { icon: Award, text: 'Proven methodology refined over thousands of successful students' },
]

const comparisonTable = [
  {
    parameter: 'Faculty',
    homeTutor: 'B.Sc / M.Sc graduate',
    largeCoaching: 'Mixed — some experts, some juniors',
    cerebrum: 'AIIMS / Medical graduates only',
  },
  {
    parameter: 'Batch Size',
    homeTutor: '1 student',
    largeCoaching: '100–300 students',
    cerebrum: '15 students maximum',
  },
  {
    parameter: 'Monthly Fees',
    homeTutor: '₹5,000–8,000',
    largeCoaching: '₹8,000–15,000',
    cerebrum: '₹4,000–5,400',
  },
  {
    parameter: 'Test Series',
    homeTutor: 'Not available',
    largeCoaching: 'Included (generic)',
    cerebrum: '19,000+ MCQ bank included',
  },
  {
    parameter: 'Recorded Lectures',
    homeTutor: 'Not available',
    largeCoaching: 'Sometimes (extra cost)',
    cerebrum: 'All lectures recorded — free',
  },
  {
    parameter: 'Doubt Clearing',
    homeTutor: 'During class only',
    largeCoaching: 'Doubt counter (long queues)',
    cerebrum: 'In-class + WhatsApp support',
  },
  {
    parameter: 'NEET Focus',
    homeTutor: 'Depends on tutor',
    largeCoaching: 'High (Phy + Chem + Bio combined)',
    cerebrum: 'Biology-specialized',
  },
  {
    parameter: 'Board Preparation',
    homeTutor: 'Primary focus',
    largeCoaching: 'Secondary (NEET priority)',
    cerebrum: 'Integrated Board + NEET',
  },
  {
    parameter: 'Flexibility',
    homeTutor: 'High (your schedule)',
    largeCoaching: 'Low (fixed batches)',
    cerebrum: 'Medium (multiple batch timings)',
  },
  {
    parameter: 'Personal Attention',
    homeTutor: 'Maximum (1-on-1)',
    largeCoaching: 'Minimal (lost in crowd)',
    cerebrum: 'High (15 students, faculty knows each)',
  },
]

const testimonials = [
  {
    name: 'Priya S., Parent from Noida',
    text: 'My daughter had a home tutor for 8 months. Her marks stayed flat. Within 3 months at Cerebrum, she jumped from 55% to 78% in biology. The test series and peer competition made the difference.',
  },
  {
    name: 'Rahul M., Class 12 Student, Gurugram',
    text: 'My home tutor was nice but could never explain NEET-level genetics properly. At Cerebrum, the AIIMS faculty breaks down every concept with exam-oriented tricks. I wish I had joined earlier.',
  },
  {
    name: 'Kavita T., Parent from Rohini',
    text: 'We spent ₹7,000/month on a tutor plus ₹5,000 on test series separately. At Cerebrum, we pay less and get better faculty, better tests, and recorded lectures for revision. It was an easy decision.',
  },
]

const faqs = [
  {
    question: 'Should I take coaching or hire a home tutor for NEET biology?',
    answer:
      'For NEET biology, coaching is strongly recommended. 90% of NEET toppers credit structured coaching for their success. Home tutors lack test infrastructure, peer competition, and NEET-specific expertise. If you want personal attention, choose small batch coaching (like Cerebrum with 15 students) instead of a large factory or a home tutor.',
  },
  {
    question: 'Is home tuition enough for NEET biology preparation?',
    answer:
      'Home tuition alone is usually insufficient for NEET biology. While a good tutor can cover NCERT, NEET requires timed practice with 19,000+ MCQ-level question banks, OMR sheet practice, and competitive benchmarking — things a home tutor cannot provide. Students who rely solely on home tutors typically score 50-100 marks lower than coaching students.',
  },
  {
    question: 'Why is small batch coaching better than both large coaching and home tutors?',
    answer:
      'Small batch coaching (15 students) combines the best of both worlds: personal attention like a home tutor, plus structured tests, peer competition, and expert faculty like a coaching institute. Large coaching (100-300 students) loses the personal touch, while home tutors lack the infrastructure. Cerebrum offers this sweet spot at ₹4,000/month.',
  },
  {
    question: 'Can I supplement coaching with a home tutor?',
    answer:
      'At Cerebrum, supplementary tutoring is rarely needed because of 15-student batches, WhatsApp doubt support, and recorded lectures. However, if a student has a very weak foundation (below 40% in Class 10), 2-3 months of remedial home tutoring alongside coaching can help bridge the gap. We advise parents on this during enrollment counseling.',
  },
  {
    question: 'What if my child does not perform well in a coaching batch?',
    answer:
      'Unlike large coaching where weak students get ignored, Cerebrum identifies struggling students through weekly test analytics and provides targeted interventions — extra doubt sessions, personalized study plans, and parent progress reports. With only 15 students per batch, no one falls through the cracks.',
  },
]

export default function WhyCoachingOverHomeTutor() {
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
        name: 'Why Coaching Over Home Tutor',
        item: 'https://cerebrumbiologyacademy.com/why-coaching-over-home-tutor',
      },
    ],
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Home Tutor vs Coaching Institute for Biology — The Truth',
    description:
      'An honest comparison of home tutors, large coaching institutes, and small batch coaching for NEET biology preparation in Delhi NCR.',
    author: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    datePublished: '2026-03-20',
    dateModified: '2026-03-20',
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 py-16 text-white md:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <nav className="mb-8 text-sm text-purple-200">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <span>Why Coaching Over Home Tutor</span>
            </nav>
            <h1 className="mb-6 text-3xl font-bold leading-tight md:text-5xl">
              Home Tutor vs Coaching Institute for Biology — The Truth
            </h1>
            <p className="mb-8 max-w-2xl text-lg text-purple-100">
              An honest, data-backed comparison. We&apos;ll tell you when a home tutor makes sense too
              — but for most NEET aspirants, small batch coaching is the clear winner.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-purple-900 shadow-lg transition hover:bg-purple-50"
              >
                Book Free Demo <ArrowRight className="h-4 w-4" />
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

        {/* The Problem with Home Tutors */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-900 md:text-3xl">
              The Problem with Home Tutors for Serious Biology Students
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
              Home tutors are comfortable and convenient. But comfort does not crack NEET. Here are
              the 5 biggest drawbacks parents discover too late.
            </p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tutorProblems.map((problem) => (
                <div key={problem.title} className="rounded-xl border border-red-100 bg-red-50/50 p-6">
                  <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    {problem.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">{problem.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why 90% of NEET Toppers Choose Coaching */}
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-900 md:text-3xl">
              Why 90% of NEET Toppers Choose Coaching
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
              Year after year, NEET toppers credit structured coaching for their success. Here&apos;s why
              the coaching model works better for competitive exams.
            </p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {topperReasons.map((reason) => (
                <div key={reason.text} className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-sm">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-green-100">
                    <reason.icon className="h-5 w-5 text-green-700" />
                  </div>
                  <p className="text-gray-700">{reason.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 10-Parameter Comparison Table */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-900 md:text-3xl">
              Head-to-Head: Home Tutor vs Large Coaching vs Cerebrum
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
              10 parameters that matter for NEET + Board biology preparation. See where each option
              stands.
            </p>

            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
              <table className="w-full min-w-[750px] text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Parameter</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">Home Tutor</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">
                      Large Coaching (Aakash/Allen)
                    </th>
                    <th className="bg-green-50 px-4 py-3 text-center font-semibold text-green-800">
                      Cerebrum (Small Batch)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row) => (
                    <tr key={row.parameter} className="border-t border-gray-100">
                      <td className="px-4 py-3 font-medium text-gray-800">{row.parameter}</td>
                      <td className="px-4 py-3 text-center text-gray-600">{row.homeTutor}</td>
                      <td className="px-4 py-3 text-center text-gray-600">{row.largeCoaching}</td>
                      <td className="bg-green-50 px-4 py-3 text-center font-medium text-green-800">
                        {row.cerebrum}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* The Sweet Spot */}
        <section className="bg-gradient-to-br from-green-50 to-teal-50 py-16">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              The Sweet Spot: Small Batch Coaching
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-gray-600">
              You don&apos;t have to choose between personal attention and structured preparation.
              Cerebrum gives you both.
            </p>

            <div className="grid gap-6 text-left md:grid-cols-3">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <p className="mb-2 text-3xl font-bold text-green-700">15</p>
                <p className="mb-1 font-semibold text-gray-900">Students Per Batch</p>
                <p className="text-sm text-gray-600">
                  Small enough for the faculty to know every student by name. Large enough for
                  healthy peer competition during tests and discussions.
                </p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <p className="mb-2 text-3xl font-bold text-green-700">₹4K</p>
                <p className="mb-1 font-semibold text-gray-900">Per Month (Equivalent)</p>
                <p className="text-sm text-gray-600">
                  Less than a home tutor (₹5-8K) and much less than Aakash/Allen (₹8-15K). Everything
                  included — no hidden costs.
                </p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <p className="mb-2 text-3xl font-bold text-green-700">AIIMS</p>
                <p className="mb-1 font-semibold text-gray-900">Faculty for Every Lecture</p>
                <p className="text-sm text-gray-600">
                  Not B.Sc tutors, not junior faculty. Every biology lecture is taught by a doctor who
                  cracked medical entrance exams themselves.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-12 text-center text-2xl font-bold text-gray-900 md:text-3xl">
              What Parents and Students Say
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <div key={t.name} className="rounded-xl border border-gray-200 p-6">
                  <div className="mb-4 flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Award key={s} className="h-4 w-4 text-yellow-500" />
                    ))}
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-gray-600">
                    &quot;{t.text}&quot;
                  </p>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* When Home Tutor Makes Sense */}
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-900 md:text-3xl">
              When a Home Tutor Makes Sense
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-center text-gray-600">
              We believe in being fair. There are specific situations where a home tutor is the better
              choice — but they are the exception, not the rule.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-sm">
                <Heart className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-500" />
                <div>
                  <p className="font-semibold text-gray-900">Very weak foundation (below 40% in Class 10 Biology)</p>
                  <p className="text-sm text-gray-600">
                    These students need 1-on-1 remedial teaching for 2-3 months before they can keep up
                    in any batch setting. A home tutor can bridge this gap.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-sm">
                <Heart className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-500" />
                <div>
                  <p className="font-semibold text-gray-900">Students with special learning needs</p>
                  <p className="text-sm text-gray-600">
                    Students who require specialized teaching approaches benefit from dedicated 1-on-1
                    attention that only a home tutor can provide.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-sm">
                <Heart className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-500" />
                <div>
                  <p className="font-semibold text-gray-900">For everyone else — small batch coaching is better</p>
                  <p className="text-sm text-gray-600">
                    If your child scores above 40% and can learn in a group setting, structured coaching
                    with 15-student batches will deliver better results at lower cost than any home tutor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="mb-12 text-center text-2xl font-bold text-gray-900 md:text-3xl">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-xl border border-gray-200 p-6">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <p className="leading-relaxed text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 py-16 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
              Experience the Difference Yourself
            </h2>
            <p className="mb-8 text-lg text-purple-100">
              Book a free demo class. Sit in a 15-student batch with AIIMS faculty. Then decide.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-purple-900 shadow-lg transition hover:bg-purple-50"
              >
                Book Free Demo <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="tel:+918826444334"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition hover:bg-white/10"
              >
                <Phone className="h-5 w-5" /> Call 88264-44334
              </a>
              <a
                href="https://wa.me/918826444334?text=Hi%2C%20I%20want%20to%20compare%20coaching%20vs%20home%20tutor%20for%20biology"
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
