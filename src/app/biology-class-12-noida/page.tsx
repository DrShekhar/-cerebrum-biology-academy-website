import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MessageCircle, CheckCircle, Trophy, Monitor, Building2, MapPin, ArrowRight, BookOpen, Target, Clock, Gift, AlertTriangle } from 'lucide-react'
import { NoidaPageSchemas } from '@/components/seo/NoidaSchemas'

export const metadata: Metadata = {
  title: 'Class 12 Biology Coaching in Noida 2026 | NEET + Board',
  description:
    'Best Class 12 Biology coaching in Noida. NEET + Board exam integrated. AIIMS faculty, Rs 70,000/year. Gaur City, Sector 150, Greater Noida. 650+ NEET scorers. Free demo!',
  keywords: [
    'class 12 biology coaching noida',
    'class 12 biology tuition noida',
    '12th biology classes noida',
    'biology coaching class 12 noida',
    'neet biology class 12 noida',
    'class 12 biology greater noida',
    'class 12 biology gaur city',
    'board exam biology noida',
  ],
  openGraph: {
    title: 'Class 12 Biology Coaching Noida | NEET + Board 2026',
    description: 'Expert Class 12 Biology coaching for NEET & Boards. AIIMS faculty, proven results.',
    url: 'https://cerebrumbiologyacademy.com/biology-class-12-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-class-12-noida',
  },
}

const courses = [
  {
    name: 'Pursuit - Class 12 NEET',
    duration: '12 months',
    mode: '30-40 students | 6 hrs/week',
    fee: '70,000',
    features: ['AIIMS faculty teaching', 'NEET syllabus coverage', '5,000+ practice questions', '20+ mock tests'],
    popular: true,
  },
  {
    name: 'Ascent - Class 12 NEET',
    duration: '12 months',
    mode: '16-18 students | 8 hrs/week',
    fee: '76,000',
    features: ['Focused NEET preparation', '8,000+ practice questions', '30+ mock tests', 'NEET strategy sessions'],
    recommended: true,
  },
  {
    name: 'Pinnacle - Class 12 NEET',
    duration: '12 months',
    mode: '10-12 students | 10-12 hrs/week',
    fee: '98,000',
    features: ['Personal mentorship from Dr. Shekhar', '15,000+ practice questions', '50+ full-length mocks', 'Money-back guarantee'],
  },
]

const freeTools = [
  { name: 'NEET Rank Predictor', href: '/neet-rank-predictor', icon: Target },
  { name: 'College Predictor', href: '/neet-college-predictor', icon: Building2 },
  { name: 'Study Plan Generator', href: '/neet-study-plan-generator', icon: BookOpen },
]

const syllabus = [
  { unit: 'Reproduction', chapters: 'Reproduction in Organisms, Sexual Reproduction in Plants, Human Reproduction, Reproductive Health', weight: '12%' },
  { unit: 'Genetics & Evolution', chapters: 'Principles of Inheritance, Molecular Basis of Inheritance, Evolution', weight: '18%' },
  { unit: 'Biology & Human Welfare', chapters: 'Human Health & Disease, Microbes in Human Welfare, Biotechnology Principles & Applications', weight: '14%' },
  { unit: 'Ecology', chapters: 'Organisms & Populations, Ecosystem, Biodiversity, Environmental Issues', weight: '14%' },
]

const faqs = [
  {
    question: 'Can I prepare for both Board and NEET together in Class 12?',
    answer: 'Yes! Our Class 12 course integrates Board and NEET preparation. NCERT is covered thoroughly (for boards) at NEET depth. Most NEET toppers score 95%+ in boards too. We complete syllabus by December for revision.',
  },
  {
    question: 'What is the fee for Class 12 Biology coaching in Noida?',
    answer: 'Our Class 12 Biology fees: Pursuit (30-40 students) - Rs 70,000/year, Ascent (16-18 students) - Rs 76,000/year, Pinnacle (10-12 students) - Rs 98,000/year. All tiers include AIIMS faculty, test series, and doubt support.',
  },
  {
    question: 'Is it too late to join NEET coaching in Class 12?',
    answer: 'Not at all! Class 12 is actually the best time - you have fresh syllabus knowledge and focused preparation time. Many of our 650+ scorers joined in Class 12. Our intensive program is designed for this.',
  },
  {
    question: 'How do online classes work for Class 12 students?',
    answer: 'Live interactive classes via Zoom, 6 days/week. Recorded lectures for revision. WhatsApp group for instant doubts. Weekly tests with detailed analysis. Most Noida students prefer online for convenience.',
  },
]

const results = [
  { score: '650+', count: '45+', label: 'Students in 2024' },
  { score: '600-650', count: '120+', label: 'Students in 2024' },
  { score: '95%+ Board', count: '200+', label: 'Students' },
]

const areas = [
  'Gaur City', 'Sector 150', 'Greater Noida West', 'Sector 128', 'Jaypee Greens',
  'ATS Pristine', 'Sector 62', 'Sector 18', 'Noida Extension', 'Sector 137'
]

export default function BiologyClass12NoidaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Urgency Banner */}
      <div className="bg-red-600 text-white py-3 text-center">
        <div className="container mx-auto px-4">
          <p className="flex items-center justify-center gap-2 font-semibold">
            <AlertTriangle className="w-5 h-5" />
            NEET 2026 in 5 months! Class 12 Intensive Batch Starting - Limited Seats
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <Trophy className="w-4 h-4" /> 650+ NEET Scorers
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Class 12 Biology Coaching in Noida</h1>
            <p className="text-xl text-slate-300 mb-6">
              NEET + Board integrated coaching. Score 650+ in NEET and 95%+ in Boards with AIIMS faculty.
            </p>

            {/* Results Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              {results.map((result, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl font-bold text-yellow-400">{result.count}</p>
                  <p className="text-sm text-slate-300">{result.score} {result.label}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons - WhatsApp Priority */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://wa.me/918826444334?text=Hi!%20I'm%20in%20Class%2012%20and%20looking%20for%20Biology%20coaching%20in%20Noida%20for%20NEET%20%2B%20Board.%20Please%20share%20batch%20details."
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
      <section className="py-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
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

      {/* Course Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Class 12 Biology Courses for Noida Students</h2>
          <p className="text-center text-gray-600 mb-12">NEET + Board Exam Integrated Preparation</p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {courses.map((course, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 relative ${
                  course.recommended
                    ? 'bg-yellow-400 shadow-xl scale-105'
                    : course.popular
                    ? 'bg-indigo-50 border-2 border-indigo-300'
                    : 'bg-gray-50 border-2 border-gray-200'
                }`}
              >
                {course.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-4 py-1 rounded-full">
                    RECOMMENDED
                  </span>
                )}
                {course.popular && !course.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                )}
                <Monitor className={`w-10 h-10 mb-4 ${course.recommended ? 'text-slate-900' : 'text-indigo-600'}`} />
                <h3 className="text-xl font-bold mb-2">{course.name}</h3>
                <p className={`text-sm mb-2 ${course.recommended ? 'text-slate-700' : 'text-gray-500'}`}>{course.mode}</p>
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
                  href={`https://wa.me/918826444334?text=Hi!%20I'm%20interested%20in%20${encodeURIComponent(course.name)}%20for%20Class%2012%20in%20Noida.%20Fee:%20Rs%20${course.fee}`}
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

      {/* Syllabus Section */}
      <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Class 12 Biology Syllabus - NEET Weightage</h2>
          <p className="text-center text-gray-600 mb-12">Class 12 contributes ~50% of NEET Biology questions</p>

          <div className="max-w-4xl mx-auto space-y-4">
            {syllabus.map((unit, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-indigo-900">{unit.unit}</h3>
                  <span className="bg-indigo-100 text-indigo-700 text-sm font-semibold px-3 py-1 rounded-full">
                    {unit.weight} NEET
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{unit.chapters}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Served */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Serving Class 12 Students Across Noida</h2>
          <p className="text-center text-gray-600 mb-8">Online classes available for all locations</p>

          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {areas.map((area) => (
              <span key={area} className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">
                <MapPin className="w-3 h-3 inline mr-1" />
                {area}
              </span>
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
                  <span className="text-indigo-600 group-open:rotate-180 transition-transform">▼</span>
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
          <h2 className="text-3xl font-bold mb-4">Don't Wait - NEET 2026 is Approaching!</h2>
          <p className="text-xl text-slate-300 mb-8">Join Class 12 Batch now and secure your medical seat</p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <a
              href="https://wa.me/918826444334?text=Hi!%20I'm%20in%20Class%2012%20from%20Noida.%20I%20want%20to%20join%20NEET%20Biology%20coaching%20urgently.%20Please%20share%20batch%20details."
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
        pageName="Class 12 Biology Coaching in Noida"
        pageDescription="Best Class 12 Biology coaching in Noida. NEET + Board integrated preparation. AIIMS faculty, Rs 70,000/year onwards."
        pageUrl="https://cerebrumbiologyacademy.com/biology-class-12-noida"
        breadcrumbs={[
          { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
          { name: 'Noida', url: 'https://cerebrumbiologyacademy.com/locations/noida' },
          { name: 'Class 12 Biology Noida', url: 'https://cerebrumbiologyacademy.com/biology-class-12-noida' },
        ]}
        customFAQs={faqs}
      />
    </div>
  )
}
