import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MessageCircle, CheckCircle, Trophy, Monitor, Building2, MapPin, ArrowRight, BookOpen, Target, Clock, Gift, Wifi, Video, Laptop } from 'lucide-react'
import { NoidaPageSchemas } from '@/components/seo/NoidaSchemas'

export const metadata: Metadata = {
  title: 'Online Biology Tuition in Noida 2026 | Live Classes | Rs 48,000/year | Cerebrum',
  description:
    'Online Biology tuition for Noida students. Live classes from home. Class 9-12 & NEET. AIIMS faculty, Rs 48,000-98,000/year. Gaur City, Sector 150, Greater Noida. Free demo!',
  keywords: [
    'online biology tuition noida',
    'online biology classes noida',
    'online biology coaching noida',
    'live biology classes noida',
    'online neet biology noida',
    'virtual biology tuition noida',
    'online biology teacher noida',
  ],
  openGraph: {
    title: 'Online Biology Tuition Noida | Live Classes from Home',
    description: 'Live online Biology classes for Noida students. AIIMS faculty, recorded lectures, WhatsApp support.',
    url: 'https://cerebrumbiologyacademy.com/online-biology-tuition-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/online-biology-tuition-noida',
  },
}

const onlineCourses = [
  {
    name: 'Pursuit - Online',
    description: '30-40 students | 6 hrs/week',
    classLevel: 'Class 11-12 & Droppers',
    fee: '48,000 - 70,000',
    features: ['Live Zoom classes', 'Recorded lectures', 'AI doubt bot 24/7', 'Basic mock tests'],
    icon: Wifi,
    popular: true,
  },
  {
    name: 'Ascent - Online',
    description: '16-18 students | 8 hrs/week',
    classLevel: 'Class 11-12 & Droppers',
    fee: '76,000 - 90,000',
    features: ['Live interactive classes', 'Weekly group doubt sessions', 'Performance tracking', 'Standard mock tests'],
    icon: Video,
    recommended: true,
  },
  {
    name: 'Pinnacle - Online',
    description: '10-12 students | 10-12 hrs/week',
    classLevel: 'Class 11-12 & Droppers',
    fee: '98,000 - 1,56,000',
    features: ['Personal mentorship from Dr. Shekhar', 'Weekly 1-on-1 doubt sessions', '50+ mock tests', 'Money-back guarantee'],
    icon: Laptop,
  },
]

const onlineFeatures = [
  { title: 'Live Interactive Classes', description: 'Real-time teaching via Zoom with Q&A', icon: Video },
  { title: 'Recorded Lectures', description: 'Access recordings anytime for revision', icon: Laptop },
  { title: '24/7 AI Doubt Bot', description: 'Get instant answers to Biology doubts', icon: MessageCircle },
  { title: 'WhatsApp Support', description: 'Direct access to faculty for doubts', icon: Phone },
  { title: 'Digital Study Material', description: 'Notes, PDFs, and practice questions', icon: BookOpen },
  { title: 'Online Mock Tests', description: 'NEET-pattern tests with analytics', icon: Target },
]

const freeTools = [
  { name: 'NEET Rank Predictor', href: '/neet-rank-predictor', icon: Target },
  { name: 'College Predictor', href: '/neet-college-predictor', icon: Building2 },
  { name: 'Study Plan Generator', href: '/neet-study-plan-generator', icon: BookOpen },
]

const faqs = [
  {
    question: 'How do online Biology classes work for Noida students?',
    answer: 'Live classes via Zoom at scheduled times. You can ask questions in real-time, share your screen for doubts. All classes are recorded for revision. WhatsApp group for quick doubt resolution between classes.',
  },
  {
    question: 'What is the fee for online Biology tuition in Noida?',
    answer: 'Online tuition fees by tier: Pursuit (30-40 students) - Rs 48,000-70,000/year, Ascent (16-18 students) - Rs 76,000-90,000/year, Pinnacle (10-12 students) - Rs 98,000-1,56,000/year. All include AIIMS faculty and recorded lectures.',
  },
  {
    question: 'Is online tuition as effective as offline?',
    answer: 'Yes! Our online students perform equally well. Benefits: same AIIMS faculty, smaller effective batch size, no travel time, recorded lectures for revision, and 24/7 AI doubt support. 70% of our Noida students prefer online mode.',
  },
  {
    question: 'What equipment do I need for online classes?',
    answer: 'A laptop/tablet/smartphone with stable internet (4G or WiFi). Headphones recommended. We use Zoom for classes - easy to use on any device. No special software needed.',
  },
]

const areas = [
  'Gaur City', 'Sector 150', 'Greater Noida West', 'Jaypee Greens', 'ATS Pristine',
  'Sector 62', 'Sector 18', 'Noida Extension', 'Sector 137', 'Knowledge Park'
]

export default function OnlineBiologyTuitionNoidaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-cyan-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <Wifi className="w-4 h-4" /> 100% Online
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Online Biology Tuition in Noida</h1>
            <p className="text-xl text-slate-300 mb-6">
              Live classes from your home. AIIMS faculty, recorded lectures, 24/7 doubt support.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Monitor className="w-5 h-5 text-yellow-400" />
                <span>Live Zoom Classes</span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-yellow-400" />
                <span>Recorded Lectures</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span>500+ Selections</span>
              </div>
            </div>

            {/* CTA Buttons - WhatsApp Priority */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://wa.me/918826444334?text=Hi!%20I'm%20interested%20in%20online%20Biology%20tuition%20in%20Noida.%20Please%20share%20batch%20details%20and%20demo%20class."
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
      <section className="py-6 bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
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

      {/* Online Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">What You Get with Online Tuition</h2>
          <p className="text-center text-gray-600 mb-12">Complete learning experience from home</p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {onlineFeatures.map((feature, index) => (
              <div key={index} className="bg-cyan-50 rounded-xl p-6 text-center">
                <feature.icon className="w-12 h-12 text-cyan-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Cards */}
      <section className="py-16 bg-cyan-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Online Tuition Plans for Noida</h2>
          <p className="text-center text-gray-600 mb-12">Choose your tier based on batch size preference</p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {onlineCourses.map((course, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 relative ${
                  course.recommended
                    ? 'bg-yellow-400 shadow-xl scale-105'
                    : course.popular
                    ? 'bg-white border-2 border-cyan-300'
                    : 'bg-white border-2 border-gray-200'
                }`}
              >
                {course.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-4 py-1 rounded-full">
                    RECOMMENDED
                  </span>
                )}
                {course.popular && !course.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    BUDGET FRIENDLY
                  </span>
                )}
                <course.icon className={`w-10 h-10 mb-4 ${course.recommended ? 'text-slate-900' : 'text-cyan-600'}`} />
                <h3 className="text-xl font-bold mb-1">{course.name}</h3>
                <p className={`text-sm mb-2 ${course.recommended ? 'text-slate-700' : 'text-gray-500'}`}>{course.description}</p>
                <p className={`text-xs mb-2 ${course.recommended ? 'text-slate-600' : 'text-gray-400'}`}>{course.classLevel}</p>
                <p className="text-2xl font-bold mb-4">
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
                  href={`https://wa.me/918826444334?text=Hi!%20I'm%20interested%20in%20${encodeURIComponent(course.name)}%20online%20Biology%20tuition%20in%20Noida.`}
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

      {/* Areas Served */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Online Classes for All Noida Areas</h2>
          <p className="text-center text-gray-600 mb-8">No commute needed - learn from anywhere</p>

          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {areas.map((area) => (
              <span key={area} className="bg-cyan-100 text-cyan-800 px-4 py-2 rounded-full text-sm font-medium">
                <MapPin className="w-3 h-3 inline mr-1" />
                {area}
              </span>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              <Wifi className="w-4 h-4 inline mr-1" />
              All you need is internet - we bring AIIMS faculty to your home!
            </p>
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
                  <span className="text-cyan-600 group-open:rotate-180 transition-transform">▼</span>
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
          <h2 className="text-3xl font-bold mb-4">Start Online Biology Tuition Today!</h2>
          <p className="text-xl text-slate-300 mb-8">Join 500+ Noida students learning from home</p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <a
              href="https://wa.me/918826444334?text=Hi!%20I%20want%20to%20join%20online%20Biology%20tuition%20in%20Noida.%20Please%20share%20demo%20class%20details."
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition shadow-lg"
            >
              <MessageCircle className="w-6 h-6" />
              Book Free Demo
            </a>
            <Link
              href="/free-neet-demo-class-gurugram"
              className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition"
            >
              View Demo Schedule <ArrowRight className="w-5 h-5" />
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
        pageName="Online Biology Tuition in Noida"
        pageDescription="Live online Biology tuition for Noida students. Class 9-12 & NEET with AIIMS faculty."
        pageUrl="https://cerebrumbiologyacademy.com/online-biology-tuition-noida"
        breadcrumbs={[
          { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
          { name: 'Noida', url: 'https://cerebrumbiologyacademy.com/locations/noida' },
          { name: 'Online Biology Tuition', url: 'https://cerebrumbiologyacademy.com/online-biology-tuition-noida' },
        ]}
        customFAQs={faqs}
      />
    </div>
  )
}
