import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MessageCircle, CheckCircle, Monitor, Building2, ArrowRight, BookOpen, Target, Clock, Gift, GraduationCap, FileText } from 'lucide-react'
import { NoidaPageSchemas } from '@/components/seo/NoidaSchemas'

export const metadata: Metadata = {
  title: 'CBSE Biology Coaching in Noida 2026 | Class 11-12 | Score 95%+',
  description:
    'CBSE Biology coaching in Noida for Class 11 & 12. NCERT mastery, board exam prep, practical viva. AIIMS faculty, Rs 45,000/year. Gaur City, Sector 150. Free demo!',
  keywords: [
    'cbse biology coaching noida',
    'cbse biology tuition noida',
    'cbse class 11 biology noida',
    'cbse class 12 biology noida',
    'ncert biology coaching noida',
    'cbse board biology noida',
    'cbse biology classes noida',
  ],
  openGraph: {
    title: 'CBSE Biology Coaching Noida | Class 11-12 | Score 95%+',
    description: 'Expert CBSE Biology coaching with NCERT mastery. AIIMS faculty, proven results.',
    url: 'https://cerebrumbiologyacademy.com/cbse-biology-coaching-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/cbse-biology-coaching-noida',
  },
}

const courses = [
  {
    name: 'CBSE Class 11 (Academic)',
    fee: '40,000 - 98,000',
    duration: '12 months',
    features: ['Complete NCERT coverage', 'Chapter tests', '3 tier options (Pursuit/Ascent/Pinnacle)', 'AIIMS faculty'],
    link: '/biology-class-11-noida',
  },
  {
    name: 'CBSE Class 12 (Board Only)',
    fee: '40,000 - 68,000',
    duration: '12 months',
    features: ['NCERT + Previous years', 'Practical viva prep', 'Sample papers', 'Board exam strategy'],
    link: '/class-12-board-biology-noida',
    popular: true,
  },
  {
    name: 'CBSE + NEET Combo',
    fee: '70,000 - 98,000',
    duration: '12 months',
    features: ['Board + NEET integrated', 'Competitive edge', '20-50+ mock tests', 'Personal mentoring options'],
    link: '/neet-coaching-noida',
    recommended: true,
  },
]

const ncertApproach = [
  { title: 'Line-by-Line Reading', description: 'Every sentence of NCERT explained - no shortcuts', icon: BookOpen },
  { title: 'Diagram Mastery', description: 'All NCERT diagrams practiced with labeling', icon: FileText },
  { title: 'Previous 10 Years', description: 'All CBSE board questions sorted chapter-wise', icon: Target },
  { title: 'Practical Preparation', description: 'Lab work, specimen ID, viva questions', icon: GraduationCap },
]

const freeTools = [
  { name: 'NEET Rank Predictor', href: '/neet-rank-predictor', icon: Target },
  { name: 'College Predictor', href: '/neet-college-predictor', icon: Building2 },
  { name: 'Study Plan Generator', href: '/neet-study-plan-generator', icon: BookOpen },
]

const cbseVsOthers = [
  { board: 'CBSE', coverage: '100% NCERT', examPattern: 'Theory 70 + Practical 30', difficulty: 'Moderate' },
  { board: 'ICSE/ISC', coverage: 'NCERT + Additional', examPattern: 'Theory 70 + Practical 30', difficulty: 'Slightly Higher' },
  { board: 'State Boards', coverage: 'State Syllabus', examPattern: 'Varies', difficulty: 'Varies' },
]

const faqs = [
  {
    question: 'Do you cover complete NCERT for CBSE Biology?',
    answer: 'Yes, 100%! Our CBSE Biology coaching covers every line, diagram, and activity from NCERT textbooks. We also solve all NCERT exercises and previous year CBSE questions. NCERT is the Bible for CBSE boards.',
  },
  {
    question: 'What is the fee for CBSE Biology coaching in Noida?',
    answer: 'CBSE fees vary by tier (Pursuit/Ascent/Pinnacle): Class 11 Academic: Rs 40,000-98,000/year, Class 12 Board-Only: Rs 40,000-68,000/year, CBSE + NEET combo: Rs 70,000-98,000/year. Online mode available for all tiers.',
  },
  {
    question: 'Can I prepare for both CBSE boards and NEET together?',
    answer: 'Absolutely! In fact, we recommend it. NEET syllabus is 100% from NCERT (same as CBSE). Our CBSE + NEET combo course teaches at NEET depth, which automatically prepares you for 95%+ in boards.',
  },
  {
    question: 'Do you help with CBSE Biology practicals?',
    answer: 'Yes! We cover all practical experiments, specimen identification, lab record format, and viva questions. Weekend practical sessions available for hybrid students.',
  },
]

const results = [
  { score: '95%+', count: '200+', label: 'CBSE Students 2024' },
  { score: '90-95%', count: '350+', label: 'CBSE Students 2024' },
  { score: 'School Toppers', count: '45+', label: 'From Noida' },
]

export default function CBSEBiologyCoachingNoidaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <GraduationCap className="w-4 h-4" /> CBSE Board Specialist
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">CBSE Biology Coaching in Noida</h1>
            <p className="text-xl text-slate-300 mb-6">
              Master NCERT, score 95%+ in CBSE boards. AIIMS faculty, complete practical preparation.
            </p>

            {/* Results Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              {results.map((result, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl font-bold text-blue-400">{result.count}</p>
                  <p className="text-sm text-slate-300">{result.score} {result.label}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons - WhatsApp Priority */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://wa.me/918826444334?text=Hi!%20I'm%20looking%20for%20CBSE%20Biology%20coaching%20in%20Noida.%20Please%20share%20course%20details."
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
      <section className="py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
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

      {/* NCERT Approach */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Our NCERT-First Approach</h2>
          <p className="text-center text-gray-600 mb-12">The only way to master CBSE Biology</p>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {ncertApproach.map((item, index) => (
              <div key={index} className="bg-blue-50 rounded-xl p-6 text-center">
                <item.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Cards */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">CBSE Biology Courses for Noida Students</h2>
          <p className="text-center text-gray-600 mb-12">Board exam focused preparation</p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {courses.map((course, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 relative ${
                  course.recommended
                    ? 'bg-yellow-400 shadow-xl scale-105'
                    : course.popular
                    ? 'bg-white border-2 border-blue-300'
                    : 'bg-white border-2 border-gray-200'
                }`}
              >
                {course.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-4 py-1 rounded-full">
                    BEST VALUE
                  </span>
                )}
                {course.popular && !course.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    POPULAR
                  </span>
                )}
                <Monitor className={`w-10 h-10 mb-4 ${course.recommended ? 'text-slate-900' : 'text-blue-600'}`} />
                <h3 className="text-xl font-bold mb-2">{course.name}</h3>
                <p className={`text-sm mb-2 ${course.recommended ? 'text-slate-700' : 'text-gray-500'}`}>{course.duration}</p>
                <p className="text-3xl font-bold mb-4">
                  ₹{course.fee}
                  <span className="text-sm font-normal">/year</span>
                </p>
                <ul className="space-y-2 mb-6">
                  {course.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className={`w-4 h-4 mt-0.5 ${course.recommended ? 'text-slate-900' : 'text-green-600'}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/918826444334?text=Hi!%20I'm%20interested%20in%20${encodeURIComponent(course.name)}%20in%20Noida.%20Fee:%20Rs%20${course.fee}`}
                  className={`block text-center py-3 rounded-lg font-semibold transition ${
                    course.recommended
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

      {/* Board Comparison */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">CBSE vs Other Boards</h2>
          <p className="text-center text-gray-600 mb-12">We also support ICSE/ISC students</p>

          <div className="max-w-3xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left">Board</th>
                  <th className="px-4 py-3 text-center">Syllabus Coverage</th>
                  <th className="px-4 py-3 text-center">Exam Pattern</th>
                  <th className="px-4 py-3 text-center">Difficulty</th>
                </tr>
              </thead>
              <tbody>
                {cbseVsOthers.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                    <td className="px-4 py-3 font-medium">{item.board}</td>
                    <td className="px-4 py-3 text-center">{item.coverage}</td>
                    <td className="px-4 py-3 text-center">{item.examPattern}</td>
                    <td className="px-4 py-3 text-center">{item.difficulty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-gray-600 mt-6">
            <CheckCircle className="w-4 h-4 inline mr-1 text-green-600" />
            We cover all boards - CBSE, ICSE/ISC, and State Boards
          </p>
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
                  <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
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
          <h2 className="text-3xl font-bold mb-4">Master CBSE Biology with Expert Coaching</h2>
          <p className="text-xl text-slate-300 mb-8">Join 200+ students who scored 95%+ in boards</p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <a
              href="https://wa.me/918826444334?text=Hi!%20I%20want%20to%20join%20CBSE%20Biology%20coaching%20in%20Noida.%20Please%20share%20batch%20details."
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition shadow-lg"
            >
              <MessageCircle className="w-6 h-6" />
              Chat on WhatsApp
            </a>
            <Link
              href="/free-neet-demo-class-gurugram"
              className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition"
            >
              Book Free Demo <ArrowRight className="w-5 h-5" />
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
        pageName="CBSE Biology Coaching in Noida"
        pageDescription="CBSE Biology coaching for Class 11-12 in Noida. NCERT mastery, board exam preparation with AIIMS faculty."
        pageUrl="https://cerebrumbiologyacademy.com/cbse-biology-coaching-noida"
        breadcrumbs={[
          { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
          { name: 'Noida', url: 'https://cerebrumbiologyacademy.com/locations/noida' },
          { name: 'CBSE Biology Coaching', url: 'https://cerebrumbiologyacademy.com/cbse-biology-coaching-noida' },
        ]}
        customFAQs={faqs}
      />
    </div>
  )
}
