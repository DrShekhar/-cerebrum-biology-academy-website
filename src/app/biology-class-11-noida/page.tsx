import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MessageCircle, CheckCircle, Star, Users, Trophy, Monitor, Building2, MapPin, ArrowRight, BookOpen, Target, Clock, Gift } from 'lucide-react'
import { NoidaPageSchemas } from '@/components/seo/NoidaSchemas'

export const metadata: Metadata = {
  title: 'Class 11 Biology Coaching in Noida 2026 | NEET Foundation',
  description:
    'Best Class 11 Biology coaching in Noida. AIIMS faculty, small batches (15 students). Online Rs 48,000/year. NEET + Board integrated. Gaur City, Sector 150, Greater Noida. Free demo!',
  keywords: [
    'class 11 biology coaching noida',
    'class 11 biology tuition noida',
    'biology coaching class 11 noida',
    '11th biology classes noida',
    'biology tutor class 11 noida',
    'neet foundation class 11 noida',
    'class 11 biology greater noida',
    'class 11 biology gaur city',
  ],
  openGraph: {
    title: 'Class 11 Biology Coaching Noida | NEET Foundation 2026',
    description: 'Expert Class 11 Biology coaching with NEET foundation. AIIMS faculty, 15-student batches.',
    url: 'https://cerebrumbiologyacademy.com/biology-class-11-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-class-11-noida',
  },
}

const courses = [
  {
    name: 'Pursuit - Class 11 NEET',
    duration: '12 months',
    mode: '30-40 students | 6 hrs/week',
    fee: '48,000',
    features: ['AIIMS faculty teaching', 'NCERT syllabus', '3,000+ practice questions', 'AI doubt bot access'],
    popular: true,
  },
  {
    name: 'Ascent - Class 11 NEET',
    duration: '12 months',
    mode: '16-18 students | 8 hrs/week',
    fee: '76,000',
    features: ['AIIMS faculty teaching', '5,000+ practice questions', 'Weekly group doubt sessions', 'Performance tracking'],
    recommended: true,
  },
  {
    name: 'Pinnacle - Class 11 NEET',
    duration: '12 months',
    mode: '10-12 students | 10-12 hrs/week',
    fee: '98,000',
    features: ['Personal mentorship from Dr. Shekhar', '7,000+ practice questions', 'Weekly 1-on-1 doubt sessions', 'Money-back guarantee'],
  },
]

const freeTools = [
  { name: 'NEET Rank Predictor', href: '/neet-rank-predictor', icon: Target },
  { name: 'College Predictor', href: '/neet-college-predictor', icon: Building2 },
  { name: 'Study Plan Generator', href: '/neet-study-plan-generator', icon: BookOpen },
]

const syllabus = [
  { unit: 'Diversity in Living World', chapters: 'The Living World, Biological Classification, Plant Kingdom, Animal Kingdom', weight: '14%' },
  { unit: 'Structural Organisation', chapters: 'Morphology of Flowering Plants, Anatomy of Flowering Plants, Structural Organisation in Animals', weight: '10%' },
  { unit: 'Cell Structure & Function', chapters: 'Cell: The Unit of Life, Biomolecules, Cell Cycle and Cell Division', weight: '15%' },
  { unit: 'Plant Physiology', chapters: 'Transport in Plants, Mineral Nutrition, Photosynthesis, Respiration, Plant Growth', weight: '12%' },
  { unit: 'Human Physiology', chapters: 'Digestion, Breathing, Body Fluids, Excretion, Locomotion, Neural Control, Chemical Coordination', weight: '20%' },
]

const faqs = [
  {
    question: 'Is Class 11 Biology important for NEET?',
    answer: 'Yes! Class 11 Biology contributes about 50% of NEET Biology questions. Topics like Human Physiology, Plant Physiology, and Cell Biology are heavily tested. Starting NEET preparation from Class 11 gives you 2 years to master the syllabus.',
  },
  {
    question: 'What is the fee for Class 11 Biology coaching in Noida?',
    answer: 'Our Class 11 Biology coaching fees: Pursuit (30-40 students) - Rs 48,000/year, Ascent (16-18 students) - Rs 76,000/year, Pinnacle (10-12 students) - Rs 98,000/year. All tiers include AIIMS faculty teaching and doubt support.',
  },
  {
    question: 'Can Noida students attend online classes?',
    answer: 'Yes! Most of our Noida students (Gaur City, Sector 150, Greater Noida) prefer online mode. Live interactive classes from home with same quality as offline. Hybrid option available for weekend offline sessions.',
  },
  {
    question: 'Do you cover both Board and NEET syllabus?',
    answer: 'Yes, our Class 11 course covers NCERT thoroughly (for boards) while building NEET concepts. The syllabus is same - we teach at NEET depth which automatically covers board exam requirements.',
  },
]

const areas = [
  'Gaur City', 'Sector 150', 'Greater Noida West', 'Sector 128', 'Jaypee Greens',
  'ATS Pristine', 'Sector 62', 'Sector 18', 'Noida Extension', 'Sector 137'
]

export default function BiologyClass11NoidaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <Star className="w-4 h-4" /> 2026-27 Batch Open
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Class 11 Biology Coaching in Noida</h1>
            <p className="text-xl text-slate-300 mb-6">
              Build your NEET foundation with AIIMS faculty. Online classes from Noida + Hybrid mode available.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-yellow-400" />
                <span>15-Student Batches</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span>98% Success Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>4.9/5 Rating</span>
              </div>
            </div>

            {/* CTA Buttons - WhatsApp Priority */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://wa.me/918826444334?text=Hi!%20I'm%20looking%20for%20Class%2011%20Biology%20coaching%20in%20Noida.%20Please%20share%20batch%20details%20and%20fee%20structure."
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
      <section className="py-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
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
          <h2 className="text-3xl font-bold text-center mb-4">Class 11 Biology Courses for Noida Students</h2>
          <p className="text-center text-gray-600 mb-12">Choose the mode that fits your learning style</p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {courses.map((course, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 relative ${
                  course.recommended
                    ? 'bg-yellow-400 shadow-xl scale-105'
                    : course.popular
                    ? 'bg-blue-50 border-2 border-blue-300'
                    : 'bg-gray-50 border-2 border-gray-200'
                }`}
              >
                {course.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-4 py-1 rounded-full">
                    RECOMMENDED
                  </span>
                )}
                {course.popular && !course.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                )}
                <Monitor className={`w-10 h-10 mb-4 ${course.recommended ? 'text-slate-900' : 'text-blue-600'}`} />
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
                  href={`https://wa.me/918826444334?text=Hi!%20I'm%20interested%20in%20${encodeURIComponent(course.name)}%20for%20Class%2011%20in%20Noida.%20Fee:%20Rs%20${course.fee}`}
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
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Class 11 Biology Syllabus Coverage</h2>
          <p className="text-center text-gray-600 mb-12">Complete NCERT + NEET preparation</p>

          <div className="max-w-4xl mx-auto space-y-4">
            {syllabus.map((unit, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-blue-900">{unit.unit}</h3>
                  <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">
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
          <h2 className="text-3xl font-bold text-center mb-4">Serving Class 11 Students Across Noida</h2>
          <p className="text-center text-gray-600 mb-8">Online classes available for all locations</p>

          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {areas.map((area) => (
              <span key={area} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                <MapPin className="w-3 h-3 inline mr-1" />
                {area}
              </span>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Offline classes at South Extension, Delhi (45-50 min from Noida via expressway)</p>
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
          <h2 className="text-3xl font-bold mb-4">Start Your NEET Journey in Class 11</h2>
          <p className="text-xl text-slate-300 mb-8">Join 1,50,000+ successful students from Noida</p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <a
              href="https://wa.me/918826444334?text=Hi!%20I%20want%20to%20join%20Class%2011%20Biology%20coaching.%20I'm%20from%20Noida.%20Please%20share%20batch%20details."
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
        pageName="Class 11 Biology Coaching in Noida"
        pageDescription="Best Class 11 Biology coaching in Noida. NEET foundation with AIIMS faculty. Small batches, Rs 48,000/year onwards."
        pageUrl="https://cerebrumbiologyacademy.com/biology-class-11-noida"
        breadcrumbs={[
          { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
          { name: 'Noida', url: 'https://cerebrumbiologyacademy.com/locations/noida' },
          { name: 'Class 11 Biology Noida', url: 'https://cerebrumbiologyacademy.com/biology-class-11-noida' },
        ]}
        customFAQs={faqs}
      />
    </div>
  )
}
