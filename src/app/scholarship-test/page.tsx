import { Metadata } from 'next'
import Link from 'next/link'
import { Award, Clock, FileQuestion, PhoneCall, ShieldCheck, Sparkles } from 'lucide-react'
import { ScholarshipRegistrationForm } from './ScholarshipRegistrationForm'
import {
  ensureDefaultScholarshipTest,
  parseBands,
  DEFAULT_WAIVER_BANDS,
} from '@/lib/scholarship/scholarshipTest'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

export const metadata: Metadata = {
  title: 'Cerebrum Scholarship Test (CST) — Free NEET Biology Scholarship Exam',
  description:
    'Take the free Cerebrum Scholarship Test online and earn up to 90% fee waiver on NEET Biology coaching. Class 11, 12 & droppers. Instant scorecard, one attempt, AIIMS-faculty courses.',
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/scholarship-test' },
  openGraph: {
    locale: 'en_IN',
    title: 'Cerebrum Scholarship Test — earn up to 90% off NEET Biology coaching',
    description:
      'Free online scholarship exam for NEET aspirants (Class 11/12/Dropper). Instant scorecard + fee waiver.',
    url: 'https://cerebrumbiologyacademy.com/scholarship-test',
  },
}

export const revalidate = 3600

const faqs = [
  {
    question: 'What is the Cerebrum Scholarship Test?',
    answer:
      'A free online Biology exam for NEET aspirants (Class 11, Class 12 and droppers). Your score decides a fee waiver on Cerebrum Biology Academy courses — every student who completes the test earns a scholarship tier.',
  },
  {
    question: 'How is the fee waiver decided?',
    answer:
      'By your score band. Higher scores earn bigger waivers (up to 90% off the course fee). Every completed attempt earns at least the base tier, and our admissions counselor confirms your exact waiver on the result call.',
  },
  {
    question: 'What is the exam format?',
    answer:
      'NEET-pattern Biology MCQs in a computer-based test: +4 for correct, −1 for wrong. Timed, one attempt per student, taken online on your phone or laptop. You get your scorecard instantly.',
  },
  {
    question: 'Do I need to create an account?',
    answer:
      'No. Register with your name and WhatsApp number and the test starts immediately. Your scorecard link is yours to keep and share.',
  },
  {
    question: 'Who teaches at Cerebrum Biology Academy?',
    answer:
      'Courses are led by Dr. Shekhar C Singh (AIIMS New Delhi alumnus, 15+ years of NEET Biology teaching) and faculty, with 680+ medical-college selections including 67+ AIIMS seats.',
  },
]

export default async function ScholarshipTestPage() {
  // Config-driven: bands/duration are admin-editable; fall back to defaults.
  let bands = DEFAULT_WAIVER_BANDS
  let durationMin = 60
  let questionCount = 45
  try {
    const test = await ensureDefaultScholarshipTest()
    bands = parseBands(test.waiverBands)
    durationMin = test.durationMin
    questionCount = test.questionCount
  } catch {
    // DB unavailable at build — render with defaults.
  }

  const topWaiver = bands[0]?.waiverPercent ?? 90

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <main className="min-h-screen bg-white">
      <CerebrumPersonSchema
        knowsAbout={['NEET Biology scholarship test', 'NEET coaching fee waiver India']}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-900 to-teal-800 py-16 md:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-10 top-16 h-72 w-72 rounded-full bg-green-500 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-teal-500 blur-3xl" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 px-4 py-2 text-sm font-semibold text-amber-300">
              <Sparkles className="h-4 w-4" /> Free · Online · Instant scorecard
            </div>
            <h1 className="mt-5 text-4xl font-bold text-white md:text-5xl">
              Cerebrum Scholarship Test
              <span className="mt-2 block text-amber-400">
                Earn up to {topWaiver}% off your NEET Biology course
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-300">
              A {durationMin}-minute NEET-pattern Biology exam for Class 11, Class 12 and droppers.
              Every student who completes it earns a scholarship tier — your score decides how big.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-white">
              <span className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2">
                <FileQuestion className="h-4 w-4 text-amber-400" /> {questionCount} NEET-pattern
                MCQs
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2">
                <Clock className="h-4 w-4 text-green-400" /> {durationMin} minutes
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2">
                <ShieldCheck className="h-4 w-4 text-teal-300" /> One attempt · fair play
              </span>
            </div>
          </div>
          <div className="lg:justify-self-end lg:w-[26rem]">
            <ScholarshipRegistrationForm />
          </div>
        </div>
      </section>

      {/* Waiver bands */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-center text-3xl font-bold text-slate-900">Scholarship bands</h2>
          <p className="mt-2 text-center text-slate-600">
            Score high, save big — and everyone who completes the test earns a tier.
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-sm text-gray-500">
                <tr>
                  <th className="px-6 py-3 font-semibold">Score</th>
                  <th className="px-6 py-3 font-semibold">Fee waiver earned</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-slate-800">
                {bands.map((band, i) => (
                  <tr key={band.minPercent} className={i === 0 ? 'bg-amber-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-medium">
                      {band.minPercent}%+{i === 0 ? ' (top band)' : ''}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 font-bold ${i === 0 ? 'text-amber-600' : 'text-green-700'}`}
                      >
                        <Award className="h-4 w-4" /> {band.waiverPercent}% off course fee
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-bold text-slate-900">How it works</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: FileQuestion,
                title: '1 · Register & take the test',
                text: `Register free with your name and WhatsApp number — the ${durationMin}-minute exam starts instantly on your phone or laptop.`,
              },
              {
                icon: Award,
                title: '2 · Get your scorecard + waiver',
                text: 'Your score is computed instantly and your scholarship band is revealed on a shareable scorecard.',
              },
              {
                icon: PhoneCall,
                title: '3 · Claim on a counseling call',
                text: 'Our admissions counselor calls to confirm your waiver, answer questions and reserve your batch seat.',
              },
            ].map((step) => (
              <div key={step.title} className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                  <step.icon className="h-6 w-6 text-green-700" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-slate-600">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-center text-3xl font-bold text-slate-900">
            Frequently asked questions
          </h2>
          <div className="mt-8 space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-xl bg-gray-50 p-5">
                <summary className="cursor-pointer list-none font-semibold text-slate-900">
                  {faq.question}
                </summary>
                <p className="mt-3 text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href="#register"
              className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-8 py-4 text-lg font-bold text-white hover:bg-green-700"
            >
              <Sparkles className="h-5 w-5" /> Take the free test now
            </a>
            <p className="mt-3 text-sm text-gray-500">
              Prefer talking first?{' '}
              <Link href="/book-free-demo" className="font-semibold text-green-700 underline">
                Book a free demo class
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
