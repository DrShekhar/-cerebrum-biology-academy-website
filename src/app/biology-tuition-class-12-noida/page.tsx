import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MessageCircle, CheckCircle, Star, Users, Trophy, Monitor, Building2, ArrowRight, BookOpen, Target, Clock, Gift, GraduationCap } from 'lucide-react'
import { NoidaPageSchemas } from '@/components/seo/NoidaSchemas'

export const metadata: Metadata = {
  title: 'Biology Tuition for Class 12 in Noida 2026 | NEET + Board',
  description:
    'Biology tuition for Class 12 students in Noida. NEET preparation + Board exam coaching. AIIMS faculty, Rs 70,000-98,000/year. Gaur City, Sector 150. Free demo!',
  keywords: [
    'biology tuition class 12 noida',
    'class 12 biology tuition noida',
    '12th biology tuition noida',
    'biology tuition for class 12 noida',
    'class xii biology tuition noida',
    'neet biology tuition class 12 noida',
  ],
  openGraph: {
    title: 'Biology Tuition Class 12 Noida | NEET + Board Prep',
    description: 'Expert Biology tuition for Class 12 with NEET + Board focus. AIIMS faculty.',
    url: 'https://cerebrumbiologyacademy.com/biology-tuition-class-12-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-class-12-noida',
  },
}

const tuitionPlans = [
  {
    name: 'Pursuit - Class 12',
    batchSize: '30-40 students',
    hours: '6 hrs/week',
    fee: '70,000',
    features: ['AIIMS faculty teaching', 'NEET + Board coverage', '4,000+ practice questions', 'AI doubt bot access'],
    popular: true,
  },
  {
    name: 'Ascent - Class 12',
    batchSize: '16-18 students',
    hours: '8 hrs/week',
    fee: '76,000',
    features: ['AIIMS faculty teaching', '6,000+ practice questions', 'Weekly group doubt sessions', 'Performance tracking'],
    recommended: true,
  },
  {
    name: 'Pinnacle - Class 12',
    batchSize: '10-12 students',
    hours: '10-12 hrs/week',
    fee: '98,000',
    features: ['Personal mentorship from Dr. Shekhar', '8,000+ practice questions', 'Weekly 1-on-1 doubts', 'Money-back guarantee'],
  },
]

const class12Topics = [
  { unit: 'Reproduction', chapters: 4, neetWeight: '12%', boardWeight: '16 marks' },
  { unit: 'Genetics & Evolution', chapters: 5, neetWeight: '18%', boardWeight: '20 marks' },
  { unit: 'Biology & Human Welfare', chapters: 3, neetWeight: '8%', boardWeight: '14 marks' },
  { unit: 'Biotechnology', chapters: 2, neetWeight: '10%', boardWeight: '10 marks' },
  { unit: 'Ecology', chapters: 4, neetWeight: '6%', boardWeight: '10 marks' },
]

const freeTools = [
  { name: 'NEET Rank Predictor', href: '/neet-rank-predictor', icon: Target },
  { name: 'College Predictor', href: '/neet-college-predictor', icon: Building2 },
  { name: 'Study Plan Generator', href: '/neet-study-plan-generator', icon: BookOpen },
]

const faqs = [
  {
    question: 'How is Class 12 Biology tuition different from Class 11?',
    answer: 'Class 12 is crucial - it contributes ~50% of NEET questions AND has board exams. Our tuition covers both simultaneously. Topics like Genetics, Biotechnology, and Reproduction are extensively tested in NEET. We ensure you score 90%+ in boards while building NEET competitiveness.',
  },
  {
    question: 'What is the fee for Class 12 Biology tuition in Noida?',
    answer: 'Our Class 12 tuition fees: Pursuit (30-40 students) - Rs 70,000/year, Ascent (16-18 students) - Rs 76,000/year, Pinnacle (10-12 students) - Rs 98,000/year. All include AIIMS faculty and online mode option.',
  },
  {
    question: 'Can I prepare for both Board exams and NEET together?',
    answer: 'Absolutely! That is exactly what our program is designed for. NEET syllabus follows NCERT, so preparing at NEET depth automatically covers boards. Our students typically score 90-95% in boards while being NEET-ready.',
  },
  {
    question: 'Is online tuition available for Class 12 in Noida?',
    answer: 'Yes! 70% of our Noida students prefer online mode. Live Zoom classes, recorded lectures, WhatsApp doubt support - all at the same fee as offline. Perfect for Gaur City, Sector 150, and Greater Noida students.',
  },
]

export default function BiologyTuitionClass12NoidaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <GraduationCap className="w-4 h-4" /> Class 12 NEET + Board
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Biology Tuition for Class 12 in Noida</h1>
            <p className="text-xl text-slate-300 mb-6">
              Master NEET Biology + Score 90%+ in Boards. AIIMS faculty, 3 batch options.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-yellow-400" />
                <span>10-40 Students/Batch</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>AIIMS Faculty</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span>95% Board Success</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://wa.me/918826444334?text=Hi!%20I%20need%20Biology%20tuition%20for%20Class%2012%20in%20Noida.%20Please%20share%20batch%20details."
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
      <section className="py-6 bg-gradient-to-r from-orange-500 to-red-500 text-white">
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

      {/* Tuition Plans */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Class 12 Biology Tuition Plans</h2>
          <p className="text-center text-gray-600 mb-12">NEET + Board preparation in every batch</p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tuitionPlans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 relative ${
                  plan.recommended
                    ? 'bg-yellow-400 shadow-xl scale-105'
                    : plan.popular
                    ? 'bg-orange-50 border-2 border-orange-300'
                    : 'bg-gray-50 border-2 border-gray-200'
                }`}
              >
                {plan.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-4 py-1 rounded-full">
                    RECOMMENDED
                  </span>
                )}
                {plan.popular && !plan.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    BUDGET FRIENDLY
                  </span>
                )}
                <Monitor className={`w-10 h-10 mb-4 ${plan.recommended ? 'text-slate-900' : 'text-orange-600'}`} />
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
                  href={`https://wa.me/918826444334?text=Hi!%20I'm%20interested%20in%20${encodeURIComponent(plan.name)}%20Biology%20tuition%20in%20Noida.%20Fee:%20Rs%20${plan.fee}`}
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

      {/* Class 12 Syllabus with Board + NEET Weightage */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Class 12 Biology Syllabus</h2>
          <p className="text-center text-gray-600 mb-12">NEET Weightage + Board Marks Distribution</p>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-3">
              {class12Topics.map((topic, index) => (
                <div key={index} className="bg-white rounded-lg p-4 flex justify-between items-center shadow-sm">
                  <div>
                    <h3 className="font-semibold">{topic.unit}</h3>
                    <p className="text-sm text-gray-500">{topic.chapters} chapters</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="bg-orange-100 text-orange-700 text-sm font-bold px-3 py-1 rounded-full">
                      {topic.neetWeight} NEET
                    </span>
                    <span className="bg-blue-100 text-blue-700 text-sm font-bold px-3 py-1 rounded-full">
                      {topic.boardWeight}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Class 12 is Critical */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Class 12 Biology Tuition is Critical</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-orange-50 rounded-xl">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-bold text-xl mb-2">50% NEET Questions</h3>
              <p className="text-gray-600">Class 12 contributes nearly half of all NEET Biology questions. Strong Class 12 prep = strong NEET score.</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl mb-2">Board Exam Year</h3>
              <p className="text-gray-600">Class 12 boards matter for college admissions. Our dual-focus approach ensures 90%+ board scores.</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-xl mb-2">High-Weightage Topics</h3>
              <p className="text-gray-600">Genetics, Biotechnology, Reproduction - these Class 12 topics have the highest NEET weightage.</p>
            </div>
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
                  <span className="text-orange-600 group-open:rotate-180 transition-transform">▼</span>
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
          <h2 className="text-3xl font-bold mb-4">Start Class 12 Biology Tuition Today!</h2>
          <p className="text-xl text-slate-300 mb-8">Ace both NEET and Board exams with expert guidance</p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <a
              href="https://wa.me/918826444334?text=Hi!%20I%20want%20to%20join%20Class%2012%20Biology%20tuition%20in%20Noida.%20Please%20share%20demo%20class%20details."
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition shadow-lg"
            >
              <MessageCircle className="w-6 h-6" />
              Book Free Demo
            </a>
            <Link
              href="/biology-class-12-noida"
              className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition"
            >
              View Full Details <ArrowRight className="w-5 h-5" />
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
        pageName="Biology Tuition for Class 12 in Noida"
        pageDescription="Biology tuition for Class 12 students in Noida. NEET + Board preparation with AIIMS faculty."
        pageUrl="https://cerebrumbiologyacademy.com/biology-tuition-class-12-noida"
        breadcrumbs={[
          { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
          { name: 'Noida', url: 'https://cerebrumbiologyacademy.com/locations/noida' },
          { name: 'Biology Tuition Class 12', url: 'https://cerebrumbiologyacademy.com/biology-tuition-class-12-noida' },
        ]}
        customFAQs={faqs}
      />
    </div>
  )
}
