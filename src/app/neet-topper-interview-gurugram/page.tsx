import { Metadata } from 'next'
import Link from 'next/link'
import {
  Phone,
  Quote,
  Award,
  Star,
  BookOpen,
  Clock,
  Target,
  ArrowRight,
  GraduationCap,
} from 'lucide-react'
import { GurgaonGurugramAreaSchema } from '@/components/seo/GurgaonGurugramAreaSchema'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

export const metadata: Metadata = {
  title: 'NEET Study Strategies Gurugram | What Toppers Do',
  description:
    'The study habits that raise your NEET Biology score, and the approach we coach at Cerebrum Biology Academy Gurugram (Gurgaon). Practical strategy, no gimmicks. Call 88264-44334!',
  keywords: [
    'neet study strategy gurugram',
    'neet biology preparation tips',
    'how to score high in neet biology',
    'neet preparation gurugram',
    'neet study habits',
    'neet biology coaching gurugram',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'NEET Study Strategies Gurugram | What Toppers Do',
    description:
      'The study habits that raise your NEET Biology score. Practical strategy, no gimmicks.',
    url: 'https://cerebrumbiologyacademy.com/neet-topper-interview-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-topper-interview-gurugram',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Study Strategies Gurugram | What Toppers Do',
    description:
      'The study habits that raise your NEET Biology score, and the approach we coach at Cerebrum Biology Academy Gurugram. Call 88264-44334!',
  },
}

const commonTips = [
  { tip: 'NCERT is non-negotiable', icon: BookOpen },
  { tip: 'Start PYQs early', icon: Target },
  { tip: 'Daily MCQ practice', icon: Clock },
  { tip: 'Regular sleep schedule', icon: Star },
  { tip: 'Teach what you learn', icon: GraduationCap },
  { tip: "Don't skip any topic", icon: Award },
]

const methods = [
  {
    title: 'Make NCERT your base',
    description:
      'Most NEET Biology marks come straight from NCERT. Read it until you know it line by line, including the diagrams and the small print, before you reach for anything else.',
    icon: BookOpen,
  },
  {
    title: 'Build a routine you can keep',
    description:
      'A steady daily schedule you can sustain for months beats a punishing one you abandon in a week. Protect your sleep, especially in the run-up to the exam.',
    icon: Clock,
  },
  {
    title: 'Start past papers early',
    description:
      'Begin previous-year questions from early in your prep, not the last month. They show you how NEET actually asks a concept, so you study for the real exam.',
    icon: Target,
  },
  {
    title: 'Practise MCQs every day',
    description:
      'Biology is roughly half your NEET marks, and it rewards daily reps. A fixed set of MCQs each day turns recall into a habit instead of a scramble.',
    icon: Star,
  },
  {
    title: 'Analyse every mistake',
    description:
      'After each test, go back over the questions you got wrong and work out why. Closing the same gap twice is how a score actually climbs.',
    icon: Award,
  },
  {
    title: 'Revise on a schedule',
    description:
      'Plan revision rounds instead of hoping to remember. Teaching a topic aloud, or explaining it to a friend, is one of the fastest ways to find what you have not really learnt.',
    icon: GraduationCap,
  },
]

const faqs = [
  {
    question: 'How many hours should I study for NEET?',
    answer:
      'There is no magic number. Focused study beats long, distracted hours. Most students who do well put in steady daily effort and protect their sleep before exams, so aim for quality and consistency rather than a headline hour count.',
  },
  {
    question: 'What is the single most important habit?',
    answer:
      'Treat NCERT Biology as your base and read it until you know it line by line. Almost every strong NEET Biology score is built on knowing NCERT cold, not on exotic extra material.',
  },
  {
    question: 'Is coaching or self-study better?',
    answer:
      'Both, together. Coaching gives you structure, doubt-clearing and regular tests; self-study builds depth. The students who improve the most use class time and disciplined self-study side by side.',
  },
  {
    question: 'How do droppers improve their score?',
    answer:
      'By pinning down exactly which topics cost them marks, giving full-time focus without school pulling them in two directions, sitting plenty of full mock tests, and closing weak areas one at a time.',
  },
]

export default function NEETTopperInterviewGurugram() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <CerebrumPersonSchema
        knowsAbout={[
          'NEET Gurugram',
          'NEET Biology Gurugram',
          'Medical entrance coaching Gurugram',
        ]}
      />
      <GurgaonGurugramAreaSchema spelling="gurugram" pageSlug="neet-topper-interview-gurugram" />
      <section className="bg-gradient-to-r from-purple-800 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-purple-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <Award className="w-4 h-4" />
              Study Strategies
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              What NEET Toppers Do Differently
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              The study habits that raise your Biology score, and the approach we coach at Cerebrum
              Academy, Gurugram.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">The Habits That Matter Most</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {commonTips.map((item, index) => (
              <div key={index} className="bg-purple-50 rounded-xl p-4 text-center">
                <item.icon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="font-semibold text-sm">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">The Method, Step by Step</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            These are the working habits behind a strong NEET Biology score. None of them are
            secrets. The hard part is doing them consistently, which is exactly what our small
            batches are built to keep you on.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {methods.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <item.icon className="w-8 h-8 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-3 bg-purple-50 p-6 rounded-xl">
              <Quote className="w-8 h-8 text-purple-400 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-bold mb-2">Are you a Cerebrum student?</h2>
                <p className="text-gray-700">
                  We would rather share real stories than invented ones. If you have studied with us
                  and want your NEET journey featured here in your own words, talk to your teacher
                  or call us. Until then, the strategies above are the honest version of what works.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-50">
                  {faq.question}
                  <span className="text-purple-600 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-t">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Explore More</h2>
          <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Link
              href="/neet-result-2024-gurugram"
              className="bg-green-50 p-4 rounded-lg hover:bg-green-100 transition text-center"
            >
              <h3 className="font-semibold text-green-800">Our Results</h3>
              <p className="text-sm text-gray-600">98% of our students qualify</p>
            </Link>
            <Link
              href="/neet-biology-faculty-gurugram"
              className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition text-center"
            >
              <h3 className="font-semibold text-blue-800">Our Faculty</h3>
              <p className="text-sm text-gray-600">Meet our AIIMS-trained teachers</p>
            </Link>
            <Link
              href="/free-neet-demo-class-gurugram"
              className="bg-amber-50 p-4 rounded-lg hover:bg-amber-100 transition text-center"
            >
              <h3 className="font-semibold text-amber-800">Free Demo Class</h3>
              <p className="text-sm text-gray-600">Experience our teaching style</p>
            </Link>
            <Link
              href="/neet-coaching-gurugram"
              className="bg-purple-50 p-4 rounded-lg hover:bg-purple-100 transition text-center"
            >
              <h3 className="font-semibold text-purple-800">NEET Coaching</h3>
              <p className="text-sm text-gray-600">Complete program details</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-purple-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Put the Method to Work</h2>
          <p className="text-xl text-purple-100 mb-8">
            Small batches at our Sector 51 centre keep you consistent. Come in for a diagnostic and
            we will build a plan around your gaps.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918826444334"
              className="inline-flex items-center gap-2 bg-yellow-500 text-purple-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
            >
              <Phone className="w-5 h-5" />
              Call 88264-44334
            </a>
            <Link
              href="/free-neet-demo-class-gurugram"
              className="inline-flex items-center gap-2 bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition"
            >
              Book a Free Demo
              <ArrowRight className="w-5 h-5" />
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
            headline: 'NEET Study Strategies - Cerebrum Biology Academy Gurugram',
            description:
              'The study habits that raise your NEET Biology score, coached at Cerebrum.',
            author: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
            publisher: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
            datePublished: '2025-07-01',
            dateModified: '2026-06-08',
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
