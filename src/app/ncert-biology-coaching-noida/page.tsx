import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MessageCircle, CheckCircle, Star, Trophy, Monitor, Building2, ArrowRight, BookOpen, Target, Clock, Gift, Book } from 'lucide-react'
import { NoidaPageSchemas } from '@/components/seo/NoidaSchemas'

export const metadata: Metadata = {
  title: 'NCERT Biology Coaching in Noida 2026 | Class 11 & 12 | Cerebrum',
  description:
    'NCERT Biology coaching for Class 11 & 12 in Noida. Complete NCERT coverage for NEET + Boards. AIIMS faculty, Rs 48,000-98,000/year. Gaur City, Sector 150.',
  keywords: [
    'ncert biology coaching noida',
    'ncert biology tuition noida',
    'ncert biology classes noida',
    'ncert biology for neet noida',
    'ncert biology class 11 12 noida',
    'biology ncert coaching noida',
  ],
  openGraph: {
    title: 'NCERT Biology Coaching Noida | NEET + Board Prep',
    description: 'Complete NCERT Biology coaching for NEET success. AIIMS faculty.',
    url: 'https://cerebrumbiologyacademy.com/ncert-biology-coaching-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/ncert-biology-coaching-noida',
  },
}

const coachingPlans = [
  {
    name: 'Pursuit - NCERT',
    batchSize: '30-40 students',
    hours: '6 hrs/week',
    fee: '48,000 - 70,000',
    features: ['Complete NCERT coverage', 'Line-by-line analysis', '3,000+ NCERT MCQs', 'AI doubt bot access'],
    popular: true,
  },
  {
    name: 'Ascent - NCERT',
    batchSize: '16-18 students',
    hours: '8 hrs/week',
    fee: '76,000',
    features: ['Deep NCERT analysis', '5,000+ NCERT-based questions', 'Weekly doubt sessions', 'Performance tracking'],
    recommended: true,
  },
  {
    name: 'Pinnacle - NCERT',
    batchSize: '10-12 students',
    hours: '10-12 hrs/week',
    fee: '98,000',
    features: ['1-on-1 NCERT mentorship', '7,000+ practice questions', 'Weekly personal doubts', 'Money-back guarantee'],
  },
]

const ncertChapters = [
  { class: 'Class 11', units: 5, chapters: 22, pages: '~300 pages' },
  { class: 'Class 12', units: 5, chapters: 16, pages: '~250 pages' },
]

const whyNcert = [
  {
    title: '95% NEET Questions from NCERT',
    description: 'NEET Biology is almost entirely NCERT-based. Every line, diagram, and example matters.',
    icon: Target,
  },
  {
    title: 'Board Exam Bible',
    description: 'CBSE Biology papers are 100% from NCERT. Master NCERT = Master Boards.',
    icon: Book,
  },
  {
    title: 'Line-by-Line Analysis',
    description: 'We teach NCERT word-by-word. No line is skipped. Every diagram is explained.',
    icon: BookOpen,
  },
]

const freeTools = [
  { name: 'NEET Rank Predictor', href: '/neet-rank-predictor', icon: Target },
  { name: 'College Predictor', href: '/neet-college-predictor', icon: Building2 },
  { name: 'Study Plan Generator', href: '/neet-study-plan-generator', icon: BookOpen },
]

const faqs = [
  {
    question: 'Why is NCERT so important for NEET Biology?',
    answer: 'NEET Biology is 95%+ NCERT-based! The NTA explicitly states NCERT as the primary source. Even NEET toppers recommend reading NCERT 10+ times. Our coaching ensures you master every line, diagram, and example from NCERT.',
  },
  {
    question: 'Do you teach only NCERT or additional books too?',
    answer: 'We focus 90% on NCERT with supplementary materials only for practice questions. NCERT is sufficient for 650+ in NEET Biology. We provide 5,000+ NCERT-based MCQs that test every concept from the textbook.',
  },
  {
    question: 'What is the fee for NCERT Biology coaching in Noida?',
    answer: 'NCERT Biology coaching fees: Pursuit (30-40 students) - Rs 48,000-70,000/year, Ascent (16-18 students) - Rs 76,000/year, Pinnacle (10-12 students) - Rs 98,000/year. All include complete NCERT coverage.',
  },
  {
    question: 'How many times do you cover NCERT in a year?',
    answer: 'We complete NCERT 3 times: First reading for understanding, second for deep analysis, third for revision and retention. This ensures you remember every important line for the exam.',
  },
]

export default function NcertBiologyCoachingNoidaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <Book className="w-4 h-4" /> NCERT Specialists
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">NCERT Biology Coaching in Noida</h1>
            <p className="text-xl text-slate-300 mb-6">
              95% of NEET Biology = NCERT. Master it with AIIMS faculty. Line-by-line coverage.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Book className="w-5 h-5 text-yellow-400" />
                <span>38 NCERT Chapters</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>AIIMS Faculty</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span>3x NCERT Coverage</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://wa.me/918826444334?text=Hi!%20I%20need%20NCERT%20Biology%20coaching%20in%20Noida.%20Please%20share%20batch%20details."
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition shadow-lg"
              >
                <MessageCircle className="w-6 h-6" />
                WhatsApp Now
              </a>
              <a
                href="tel:+918826444334"
                className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition"
              >
                <Phone className="w-5 h-5" />
                Call: 88264-44334
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Free Tools Banner */}
      <section className="py-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5" />
              <span className="font-semibold">Free NEET Tools:</span>
            </div>
            {freeTools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition"
              >
                <tool.icon className="w-4 h-4" />
                {tool.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why NCERT Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Why NCERT is the NEET Bible</h2>
          <p className="text-center text-gray-600 mb-12">Understanding why NCERT mastery = NEET success</p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {whyNcert.map((item, index) => (
              <div key={index} className="text-center p-6 bg-emerald-50 rounded-xl">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NCERT Coverage Stats */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Complete NCERT Coverage</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {ncertChapters.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-2xl font-bold text-emerald-600 mb-4">{item.class}</h3>
                <div className="space-y-2">
                  <p className="flex justify-between"><span>Units:</span><span className="font-semibold">{item.units}</span></p>
                  <p className="flex justify-between"><span>Chapters:</span><span className="font-semibold">{item.chapters}</span></p>
                  <p className="flex justify-between"><span>Content:</span><span className="font-semibold">{item.pages}</span></p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 mt-8">Total: 10 Units, 38 Chapters, ~550 pages covered 3 times!</p>
        </div>
      </section>

      {/* Coaching Plans */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">NCERT Biology Coaching Plans</h2>
          <p className="text-center text-gray-600 mb-12">Every plan includes complete NCERT coverage</p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {coachingPlans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 relative ${
                  plan.recommended
                    ? 'bg-yellow-400 shadow-xl scale-105'
                    : plan.popular
                    ? 'bg-emerald-50 border-2 border-emerald-300'
                    : 'bg-gray-50 border-2 border-gray-200'
                }`}
              >
                {plan.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-4 py-1 rounded-full">
                    RECOMMENDED
                  </span>
                )}
                {plan.popular && !plan.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    BUDGET FRIENDLY
                  </span>
                )}
                <Monitor className={`w-10 h-10 mb-4 ${plan.recommended ? 'text-slate-900' : 'text-emerald-600'}`} />
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className={`text-sm ${plan.recommended ? 'text-slate-700' : 'text-gray-500'}`}>{plan.batchSize} | {plan.hours}</p>
                <p className="text-3xl font-bold my-4">
                  ₹{plan.fee}
                  <span className="text-sm font-normal">/year</span>
                </p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className={`w-4 h-4 mt-0.5 ${plan.recommended ? 'text-slate-900' : 'text-green-600'}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/918826444334?text=Hi!%20I'm%20interested%20in%20${encodeURIComponent(plan.name)}%20NCERT%20coaching%20in%20Noida.`}
                  className={`block text-center py-3 rounded-lg font-semibold transition ${
                    plan.recommended
                      ? 'bg-slate-900 text-white hover:bg-slate-800'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  <MessageCircle className="w-4 h-4 inline mr-2" />
                  Enquire Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-50">
                  {faq.question}
                  <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Master NCERT Biology Today!</h2>
          <p className="text-xl text-slate-300 mb-8">Join our students who scored 650+ with our NCERT-focused approach</p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <a
              href="https://wa.me/918826444334?text=Hi!%20I%20want%20to%20join%20NCERT%20Biology%20coaching%20in%20Noida.%20Please%20share%20demo%20class%20details."
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition shadow-lg"
            >
              <MessageCircle className="w-6 h-6" />
              Book Free Demo
            </a>
            <Link
              href="/biology-tuition-noida"
              className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition"
            >
              View All Programs <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <p className="text-slate-400 text-sm">
            <Clock className="w-4 h-4 inline mr-1" />
            Respond within 30 minutes during 9 AM - 9 PM
          </p>
        </div>
      </section>

      {/* Comprehensive Schema Markup */}
      <NoidaPageSchemas
        area="Noida"
        pageName="NCERT Biology Coaching in Noida"
        pageDescription="Complete NCERT Biology coaching for Class 11 & 12 in Noida. 95% NEET syllabus covered through NCERT mastery."
        pageUrl="https://cerebrumbiologyacademy.com/ncert-biology-coaching-noida"
        breadcrumbs={[
          { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
          { name: 'Noida', url: 'https://cerebrumbiologyacademy.com/locations/noida' },
          { name: 'NCERT Biology Coaching', url: 'https://cerebrumbiologyacademy.com/ncert-biology-coaching-noida' },
        ]}
        customFAQs={faqs}
      />
    </div>
  )
}
