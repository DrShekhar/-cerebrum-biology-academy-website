import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MessageCircle, CheckCircle, Star, Monitor, Building2, ArrowRight, BookOpen, Target, Clock, Gift, GraduationCap } from 'lucide-react'
import { NoidaPageSchemas } from '@/components/seo/NoidaSchemas'

export const metadata: Metadata = {
  title: 'Class 12 Board Exam Biology Coaching Noida 2026 | Score 95%+ | Cerebrum',
  description:
    'Class 12 Board exam Biology coaching in Noida. Score 95%+ in CBSE/ISC Biology. NCERT mastery, previous year papers, practical viva prep. Gaur City, Sector 150. Free demo!',
  keywords: [
    'class 12 board biology noida',
    'class 12 board exam biology coaching noida',
    'cbse biology class 12 noida',
    '12th board biology tuition noida',
    'biology board exam preparation noida',
    'class 12 biology practical noida',
    'ncert biology class 12 noida',
  ],
  openGraph: {
    title: 'Class 12 Board Biology Noida | Score 95%+ in CBSE/ISC',
    description: 'Expert coaching for Class 12 Board Biology exam. NCERT mastery + practical preparation.',
    url: 'https://cerebrumbiologyacademy.com/class-12-board-biology-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/class-12-board-biology-noida',
  },
}

const courses = [
  {
    name: 'Pursuit - Board Only',
    duration: '12 months',
    mode: '30-40 students | 6 hrs/week',
    fee: '40,000',
    features: ['Complete NCERT coverage', 'Previous year solutions', 'Basic mock tests', 'AI doubt bot'],
    popular: true,
  },
  {
    name: 'Ascent - Board Only',
    duration: '12 months',
    mode: '16-18 students | 8 hrs/week',
    fee: '58,000',
    features: ['NCERT + Previous years', 'Practical viva preparation', 'Weekly group doubt sessions', 'Performance tracking'],
    recommended: true,
  },
  {
    name: 'Pinnacle - Board Only',
    duration: '12 months',
    mode: '10-12 students | 10-12 hrs/week',
    fee: '68,000',
    features: ['Personal mentorship', 'Complete practical preparation', 'Daily doubt sessions', 'Money-back guarantee'],
  },
]

const freeTools = [
  { name: 'NEET Rank Predictor', href: '/neet-rank-predictor', icon: Target },
  { name: 'College Predictor', href: '/neet-college-predictor', icon: Building2 },
  { name: 'Study Plan Generator', href: '/neet-study-plan-generator', icon: BookOpen },
]

const boardPrepFeatures = [
  { title: 'NCERT Line-by-Line', description: 'Complete NCERT textbook coverage - every diagram, every definition', icon: BookOpen },
  { title: 'Previous 10 Years', description: 'Solved papers with marking scheme and examiner insights', icon: Target },
  { title: 'Practical & Viva', description: 'Lab record completion, specimen identification, viva practice', icon: GraduationCap },
  { title: 'Sample Papers', description: 'CBSE sample papers + predicted questions for 2026', icon: Star },
]

const ncertChapters = [
  { name: 'Reproduction in Organisms', marks: 4 },
  { name: 'Sexual Reproduction in Flowering Plants', marks: 5 },
  { name: 'Human Reproduction', marks: 5 },
  { name: 'Reproductive Health', marks: 4 },
  { name: 'Principles of Inheritance', marks: 6 },
  { name: 'Molecular Basis of Inheritance', marks: 6 },
  { name: 'Evolution', marks: 4 },
  { name: 'Human Health & Disease', marks: 5 },
  { name: 'Microbes in Human Welfare', marks: 4 },
  { name: 'Biotechnology Principles', marks: 4 },
  { name: 'Biotechnology Applications', marks: 4 },
  { name: 'Organisms & Populations', marks: 4 },
  { name: 'Ecosystem', marks: 4 },
  { name: 'Biodiversity & Conservation', marks: 4 },
  { name: 'Environmental Issues', marks: 3 },
]

const faqs = [
  {
    question: 'How to score 95%+ in Class 12 Biology Board exam?',
    answer: 'Focus on NCERT - read every line, memorize diagrams. Practice 10-year previous papers. Write answers in points with diagrams. Our coaching provides structured revision + weekly tests that guarantee improvement.',
  },
  {
    question: 'What is the fee for Class 12 Board Biology coaching in Noida?',
    answer: 'Board-only course: Pursuit - Rs 40,000, Ascent - Rs 58,000, Pinnacle - Rs 68,000/year. For Board + NEET combo, fees range from Rs 70,000 to Rs 98,000/year. All include study material and test series.',
  },
  {
    question: 'Do you cover CBSE and ISC both?',
    answer: 'Yes, we cover both CBSE and ISC (CISCE) boards. The core biology content is same. We provide board-specific sample papers and marking scheme guidance for each.',
  },
  {
    question: 'How do you prepare for Biology practical exam?',
    answer: 'We cover practical viva questions, specimen identification, lab record format, and experiment procedures. Weekend practical sessions available for hybrid students.',
  },
]

const results = [
  { score: '95%+', count: '200+', label: 'Students 2024' },
  { score: '90-95%', count: '350+', label: 'Students 2024' },
  { score: 'School Toppers', count: '45+', label: 'From Noida' },
]

export default function Class12BoardBiologyNoidaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <GraduationCap className="w-4 h-4" /> Board Exam 2026
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Class 12 Board Biology Coaching in Noida</h1>
            <p className="text-xl text-slate-300 mb-6">
              Score 95%+ in CBSE/ISC Biology. NCERT mastery + Previous year papers + Practical preparation.
            </p>

            {/* Results Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              {results.map((result, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl font-bold text-green-400">{result.count}</p>
                  <p className="text-sm text-slate-300">{result.score} {result.label}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons - WhatsApp Priority */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://wa.me/918826444334?text=Hi!%20I%20need%20Class%2012%20Board%20Biology%20coaching%20in%20Noida.%20I%20want%20to%20score%2095%2B%20in%20boards.%20Please%20share%20details."
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
      <section className="py-6 bg-gradient-to-r from-green-600 to-teal-600 text-white">
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

      {/* Board Prep Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Complete Board Exam Preparation</h2>
          <p className="text-center text-gray-600 mb-12">Everything you need to score 95%+ in Biology</p>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {boardPrepFeatures.map((feature, index) => (
              <div key={index} className="bg-green-50 rounded-xl p-6 text-center">
                <feature.icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Cards */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Board Biology Courses for Noida Students</h2>
          <p className="text-center text-gray-600 mb-12">Choose Board-only or Board + NEET combo</p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {courses.map((course, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 relative ${
                  course.recommended
                    ? 'bg-yellow-400 shadow-xl scale-105'
                    : course.popular
                    ? 'bg-white border-2 border-green-300'
                    : 'bg-white border-2 border-gray-200'
                }`}
              >
                {course.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-4 py-1 rounded-full">
                    BEST VALUE
                  </span>
                )}
                {course.popular && !course.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    BOARD FOCUSED
                  </span>
                )}
                <Monitor className={`w-10 h-10 mb-4 ${course.recommended ? 'text-slate-900' : 'text-green-600'}`} />
                <h3 className="text-xl font-bold mb-2">{course.name}</h3>
                <p className={`text-sm mb-2 ${course.recommended ? 'text-slate-700' : 'text-gray-500'}`}>{course.mode} | {course.duration}</p>
                <p className="text-3xl font-bold mb-4">
                  ₹{course.fee}
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
                  href={`https://wa.me/918826444334?text=Hi!%20I'm%20interested%20in%20${encodeURIComponent(course.name)}%20for%20Class%2012%20Board%20in%20Noida.%20Fee:%20Rs%20${course.fee}`}
                  className={`block text-center py-3 rounded-lg font-semibold transition ${
                    course.recommended
                      ? 'bg-slate-900 text-white hover:bg-slate-800'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  <MessageCircle className="w-4 h-4 inline mr-2" />
                  Enquire on WhatsApp
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter-wise Marks Distribution */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">CBSE Biology Chapter-wise Marks (Total: 70)</h2>
          <p className="text-center text-gray-600 mb-12">Focus on high-weightage chapters first</p>

          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {ncertChapters.map((chapter, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3 flex justify-between items-center">
                  <span className="text-sm">{chapter.name}</span>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">{chapter.marks}M</span>
                </div>
              ))}
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
                  <span className="text-green-600 group-open:rotate-180 transition-transform">▼</span>
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
          <h2 className="text-3xl font-bold mb-4">Score 95%+ in Board Biology!</h2>
          <p className="text-xl text-slate-300 mb-8">Join Noida students who topped their schools</p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <a
              href="https://wa.me/918826444334?text=Hi!%20I%20want%20to%20join%20Class%2012%20Board%20Biology%20coaching%20in%20Noida.%20I%20want%20to%20score%2095%2B."
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
        pageName="Class 12 Board Exam Biology Coaching in Noida"
        pageDescription="Class 12 Board exam Biology coaching in Noida. Score 95%+ in CBSE/ISC Biology with AIIMS faculty."
        pageUrl="https://cerebrumbiologyacademy.com/class-12-board-biology-noida"
        breadcrumbs={[
          { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
          { name: 'Noida', url: 'https://cerebrumbiologyacademy.com/locations/noida' },
          { name: 'Class 12 Board Biology', url: 'https://cerebrumbiologyacademy.com/class-12-board-biology-noida' },
        ]}
        customFAQs={faqs}
      />
    </div>
  )
}
