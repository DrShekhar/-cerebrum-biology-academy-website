import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MessageCircle, CheckCircle, Star, Users, Trophy, Monitor, Building2, ArrowRight, BookOpen, Target, Clock, Gift } from 'lucide-react'
import { NoidaPageSchemas } from '@/components/seo/NoidaSchemas'

export const metadata: Metadata = {
  title: 'Biology Tuition for Class 11 in Noida 2026 | NEET Foundation',
  description:
    'Biology tuition for Class 11 students in Noida. NEET foundation + Board prep. AIIMS faculty, Rs 48,000-98,000/year. Gaur City, Sector 150. Free demo class!',
  keywords: [
    'biology tuition class 11 noida',
    'class 11 biology tuition noida',
    '11th biology tuition noida',
    'biology tuition for class 11 noida',
    'class xi biology tuition noida',
    'neet foundation tuition noida',
  ],
  openGraph: {
    title: 'Biology Tuition Class 11 Noida | NEET Foundation',
    description: 'Expert Biology tuition for Class 11 with NEET foundation. AIIMS faculty.',
    url: 'https://cerebrumbiologyacademy.com/biology-tuition-class-11-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-class-11-noida',
  },
}

const tuitionPlans = [
  {
    name: 'Pursuit - Class 11',
    batchSize: '30-40 students',
    hours: '6 hrs/week',
    fee: '48,000',
    features: ['AIIMS faculty teaching', 'NCERT syllabus coverage', '3,000+ practice questions', 'AI doubt bot access'],
    popular: true,
  },
  {
    name: 'Ascent - Class 11',
    batchSize: '16-18 students',
    hours: '8 hrs/week',
    fee: '76,000',
    features: ['AIIMS faculty teaching', '5,000+ practice questions', 'Weekly group doubt sessions', 'Performance tracking'],
    recommended: true,
  },
  {
    name: 'Pinnacle - Class 11',
    batchSize: '10-12 students',
    hours: '10-12 hrs/week',
    fee: '98,000',
    features: ['Personal mentorship from Dr. Shekhar', '7,000+ practice questions', 'Weekly 1-on-1 doubts', 'Money-back guarantee'],
  },
]

const class11Topics = [
  { unit: 'Diversity in Living World', chapters: 4, neetWeight: '14%' },
  { unit: 'Structural Organisation', chapters: 3, neetWeight: '10%' },
  { unit: 'Cell Structure & Function', chapters: 3, neetWeight: '15%' },
  { unit: 'Plant Physiology', chapters: 5, neetWeight: '12%' },
  { unit: 'Human Physiology', chapters: 7, neetWeight: '20%' },
]

const freeTools = [
  { name: 'NEET Rank Predictor', href: '/neet-rank-predictor', icon: Target },
  { name: 'College Predictor', href: '/neet-college-predictor', icon: Building2 },
  { name: 'Study Plan Generator', href: '/neet-study-plan-generator', icon: BookOpen },
]

const faqs = [
  {
    question: 'Why is Class 11 Biology tuition important for NEET?',
    answer: 'Class 11 Biology contributes ~50% of NEET questions! Topics like Human Physiology, Cell Biology, and Plant Physiology are heavily tested. Starting tuition in Class 11 gives you 2 years to master the complete syllabus.',
  },
  {
    question: 'What is the fee for Class 11 Biology tuition in Noida?',
    answer: 'Our Class 11 tuition fees: Pursuit (30-40 students) - Rs 48,000/year, Ascent (16-18 students) - Rs 76,000/year, Pinnacle (10-12 students) - Rs 98,000/year. All include AIIMS faculty and online mode.',
  },
  {
    question: 'Do you cover both Board and NEET syllabus in Class 11?',
    answer: 'Yes! NEET syllabus is same as NCERT (Board syllabus). We teach at NEET depth which automatically covers boards. Our students typically score 90%+ in school exams while preparing for NEET.',
  },
  {
    question: 'Can I join online tuition from Noida?',
    answer: 'Absolutely! 70% of our Noida students prefer online mode. Live Zoom classes, recorded lectures, WhatsApp doubt support. Same quality as offline at the same fee.',
  },
]

export default function BiologyTuitionClass11NoidaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-violet-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <BookOpen className="w-4 h-4" /> Class 11 Specialist
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Biology Tuition for Class 11 in Noida</h1>
            <p className="text-xl text-slate-300 mb-6">
              Build your NEET foundation right. AIIMS faculty, 3 tier options, online available.
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
                <span>98% Success Rate</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://wa.me/918826444334?text=Hi!%20I%20need%20Biology%20tuition%20for%20Class%2011%20in%20Noida.%20Please%20share%20batch%20details."
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
      <section className="py-6 bg-gradient-to-r from-violet-600 to-purple-600 text-white">
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
          <h2 className="text-3xl font-bold text-center mb-4">Class 11 Biology Tuition Plans</h2>
          <p className="text-center text-gray-600 mb-12">Choose based on your batch size preference</p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tuitionPlans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 relative ${
                  plan.recommended
                    ? 'bg-yellow-400 shadow-xl scale-105'
                    : plan.popular
                    ? 'bg-violet-50 border-2 border-violet-300'
                    : 'bg-gray-50 border-2 border-gray-200'
                }`}
              >
                {plan.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-4 py-1 rounded-full">
                    RECOMMENDED
                  </span>
                )}
                {plan.popular && !plan.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    BUDGET FRIENDLY
                  </span>
                )}
                <Monitor className={`w-10 h-10 mb-4 ${plan.recommended ? 'text-slate-900' : 'text-violet-600'}`} />
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

      {/* Class 11 Syllabus */}
      <section className="py-16 bg-violet-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Class 11 Biology Syllabus - NEET Weightage</h2>
          <p className="text-center text-gray-600 mb-12">Class 11 = ~50% of NEET Biology!</p>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-3">
              {class11Topics.map((topic, index) => (
                <div key={index} className="bg-white rounded-lg p-4 flex justify-between items-center shadow-sm">
                  <div>
                    <h3 className="font-semibold">{topic.unit}</h3>
                    <p className="text-sm text-gray-500">{topic.chapters} chapters</p>
                  </div>
                  <span className="bg-violet-100 text-violet-700 text-sm font-bold px-3 py-1 rounded-full">
                    {topic.neetWeight} NEET
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-gray-50 rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-100">
                  {faq.question}
                  <span className="text-violet-600 group-open:rotate-180 transition-transform">▼</span>
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
          <h2 className="text-3xl font-bold mb-4">Start Class 11 Biology Tuition Today!</h2>
          <p className="text-xl text-slate-300 mb-8">Build your NEET foundation with expert guidance</p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <a
              href="https://wa.me/918826444334?text=Hi!%20I%20want%20to%20join%20Class%2011%20Biology%20tuition%20in%20Noida.%20Please%20share%20demo%20class%20details."
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition shadow-lg"
            >
              <MessageCircle className="w-6 h-6" />
              Book Free Demo
            </a>
            <Link
              href="/biology-class-11-noida"
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
        pageName="Biology Tuition for Class 11 in Noida"
        pageDescription="Biology tuition for Class 11 students in Noida. NEET foundation + Board prep with AIIMS faculty."
        pageUrl="https://cerebrumbiologyacademy.com/biology-tuition-class-11-noida"
        breadcrumbs={[
          { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
          { name: 'Noida', url: 'https://cerebrumbiologyacademy.com/locations/noida' },
          { name: 'Biology Tuition Class 11', url: 'https://cerebrumbiologyacademy.com/biology-tuition-class-11-noida' },
        ]}
        customFAQs={faqs}
      />
    </div>
  )
}
