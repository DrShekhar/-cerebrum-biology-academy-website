'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  CheckCircle,
  XCircle,
  ChevronRight,
  ChevronDown,
  Phone,
  Play,
  Home,
  Users,
  Award,
  BookOpen,
  Zap,
  Star,
  ArrowRight,
  MessageCircle,
  TrendingUp,
  GraduationCap,
  IndianRupee,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface FAQ {
  question: string
  answer: string
}

const comparisonData = [
  { feature: 'Batch Size', cerebrum: '15-20 students', allen: '200+ students', winner: 'cerebrum' },
  { feature: 'Faculty Background', cerebrum: 'AIIMS-trained (Dr. Shekhar)', allen: 'Mixed faculty pool', winner: 'cerebrum' },
  { feature: 'Personal Attention', cerebrum: 'High - Every student known by name', allen: 'Low - Mass batches', winner: 'cerebrum' },
  { feature: 'Subject Focus', cerebrum: 'Biology Specialized', allen: 'All subjects (Physics, Chemistry, Biology)', winner: 'tie' },
  { feature: 'Doubt Clearing', cerebrum: 'Daily 1-on-1 sessions', allen: 'Crowded doubt counters', winner: 'cerebrum' },
  { feature: 'Study Material', cerebrum: 'NCERT-focused, curated notes', allen: 'Comprehensive but bulky', winner: 'tie' },
  { feature: 'Mock Tests', cerebrum: '50+ NEET-pattern Biology tests', allen: '30+ full-length tests', winner: 'cerebrum' },
  { feature: 'Fee Structure', cerebrum: 'Rs 45K - Rs 1.56L/year', allen: 'Rs 1.2L - Rs 2L/year', winner: 'cerebrum' },
  { feature: 'Biology Success Rate', cerebrum: '98% (300+ in Biology)', allen: '~85% (overall)', winner: 'cerebrum' },
  { feature: 'Online + Offline', cerebrum: 'Full hybrid model', allen: 'Primarily offline', winner: 'cerebrum' },
  { feature: 'Parent Updates', cerebrum: 'Weekly progress reports', allen: 'Periodic PTMs', winner: 'cerebrum' },
  { feature: 'Test Analysis', cerebrum: 'AI-powered weakness detection', allen: 'Basic rank analysis', winner: 'cerebrum' },
]

const reasonsToSwitch = [
  {
    title: 'Lost in Large Batches?',
    description:
      'Allen\'s 200+ student batches make personal attention nearly impossible. At Cerebrum, with only 15-20 students, every doubt gets addressed and every student is tracked individually.',
    icon: Users,
  },
  {
    title: 'Biology Needs Depth',
    description:
      'Biology requires conceptual understanding and visual memory. Our AIIMS faculty brings real medical knowledge to make topics relatable and memorable - something generic coaching misses.',
    icon: BookOpen,
  },
  {
    title: 'Instant Doubt Resolution',
    description:
      'No more waiting 30+ minutes at doubt counters. Get your Biology doubts cleared instantly through daily 1-on-1 sessions and 7am-11pm WhatsApp support.',
    icon: Zap,
  },
  {
    title: 'Value for Money',
    description:
      'Get premium Biology coaching at 20-40% lower fees than Allen, with significantly better student-teacher ratio. Small investment, big returns.',
    icon: IndianRupee,
  },
]

const successStories = [
  {
    name: 'Sadhna Sirin',
    score: '695/720',
    previousInstitute: 'Ex-Allen Student',
    quote:
      'After struggling in Allen\'s large batches, I joined Cerebrum for Biology. The personal attention and AIIMS faculty made all the difference. My Biology score jumped from 280 to 360!',
    improvement: '+80 in Biology',
  },
  {
    name: 'Rahul Sharma',
    score: '658/720',
    previousInstitute: 'Allen + Cerebrum',
    quote:
      'I continued Physics/Chemistry at Allen but joined Cerebrum for Biology. Best decision ever - Biology became my strongest subject with 350+ marks.',
    improvement: 'Biology strongest subject',
  },
  {
    name: 'Priya Gupta',
    score: '642/720',
    previousInstitute: 'Dropper (Previously Allen)',
    quote:
      'First attempt at Allen - 520. Joined Cerebrum for my drop year. The focused Biology coaching and personalized study plan helped me improve by 122 marks.',
    improvement: '+122 overall',
  },
]

const complementBenefits = [
  'Weekend batches that don\'t clash with Allen schedule',
  'Evening sessions for extra Biology practice',
  'Centers near major Allen locations in Delhi NCR',
  'Focused Biology boost for weak areas',
  'Flexible online option for revision',
]

export default function CerebrumVsAllenContent({ faqs }: { faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: 'cerebrum-vs-allen-neet-coaching',
      message:
        'Hi! I want to compare Cerebrum and Allen for NEET Biology coaching. Please share how Cerebrum is different and better for Biology preparation.',
      campaign: 'cerebrum-vs-allen',
    })
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="bg-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center flex-wrap gap-1 text-sm">
            <li>
              <Link href="/" className="text-gray-600 hover:text-teal-600">
                <Home className="w-4 h-4" />
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <Link href="/compare" className="text-gray-600 hover:text-teal-600">
                Compare
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <span className="text-teal-700 font-medium">Cerebrum vs Allen</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div
            className="max-w-4xl animate-fadeInUp"
          >
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              Honest Comparison for NEET 2026
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Cerebrum vs Allen
              <span className="block text-teal-400 mt-2">NEET Biology Coaching Comparison</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              A fair, fact-based comparison to help you make the right choice for NEET Biology preparation.
              See why 500+ students chose focused coaching over mass batches.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Users className="w-5 h-5 text-teal-400" />
                <span>15-20 vs 200+ batch size</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <GraduationCap className="w-5 h-5 text-yellow-400" />
                <span>AIIMS Faculty</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span>98% Biology Success Rate</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-teal-500 text-white hover:bg-teal-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-4 rounded-xl font-semibold animate-fadeInUp"
              >
                <MessageCircle className="w-5 h-5" />
                Ask Questions on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="py-8 bg-teal-50 border-y border-teal-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-teal-700">15-20</p>
              <p className="text-sm text-gray-600">Cerebrum Batch Size</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-orange-600">200+</p>
              <p className="text-sm text-gray-600">Allen Batch Size</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">98%</p>
              <p className="text-sm text-gray-600">Cerebrum Biology Success</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">695/720</p>
              <p className="text-sm text-gray-600">Top Score (Sadhna Sirin)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Students Switch */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Students Switch from Allen to Cerebrum
            </h2>
            <p className="text-xl text-slate-600">
              Common challenges that bring students to focused Biology coaching
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasonsToSwitch.map((reason, index) => (
              <div
                key={reason.title}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow animate-fadeInUp"
              >
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                  <reason.icon className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{reason.title}</h3>
                <p className="text-slate-600 text-sm">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Comparison Table */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Cerebrum vs Allen: Detailed Comparison
            </h2>
            <p className="text-xl text-slate-600">
              Side-by-side comparison of key factors for NEET Biology preparation
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Factor</th>
                  <th className="px-6 py-4 text-center bg-teal-700 font-semibold">
                    <span className="flex items-center justify-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      Cerebrum
                    </span>
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">Allen</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={row.feature} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-medium text-slate-900">{row.feature}</td>
                    <td className="px-6 py-4 text-center bg-teal-50">
                      <span className="flex items-center justify-center gap-2">
                        {row.winner === 'cerebrum' && (
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        )}
                        <span className="text-slate-800">{row.cerebrum}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="flex items-center justify-center gap-2">
                        {row.winner === 'cerebrum' && (
                          <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                        )}
                        <span className="text-slate-600">{row.allen}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <p className="text-lg text-slate-600">
              <span className="font-bold text-teal-700">Cerebrum wins in 10 out of 12 factors</span>{' '}
              for specialized Biology coaching
            </p>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Award className="w-4 h-4" />
              Real Results
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Students Who Made the Switch
            </h2>
            <p className="text-xl text-slate-300">
              Real success stories from students who chose focused Biology coaching
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <div
                key={story.name}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 animate-fadeInUp"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {story.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-white">{story.name}</p>
                      <p className="text-sm text-slate-400">{story.previousInstitute}</p>
                    </div>
                  </div>
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {story.score}
                  </div>
                </div>
                <p className="text-slate-300 italic mb-4">"{story.quote}"</p>
                <div className="bg-yellow-500/20 text-yellow-400 px-3 py-2 rounded-lg text-sm font-medium">
                  {story.improvement}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Complement Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
             className="animate-fadeInUp">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Don't Want to Leave Allen?
                <br />
                Complement Your Coaching!
              </h2>
              <p className="text-xl text-blue-100 mb-6">
                Many students continue at Allen for Physics & Chemistry while joining Cerebrum
                specifically for Biology. Get the best of both worlds without compromising on either.
              </p>
              <ul className="space-y-3 mb-8">
                {complementBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link href="/demo-booking">
                <Button className="bg-white text-blue-600 hover:bg-blue-50">
                  Book a Free Trial Class <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 animate-fadeInUp"
            >
              <h3 className="text-2xl font-bold mb-6">The Winning Combination</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <span className="font-bold">A</span>
                  </div>
                  <div>
                    <p className="font-semibold">Allen for Physics & Chemistry</p>
                    <p className="text-sm text-blue-200">Comprehensive preparation</p>
                  </div>
                </div>
                <div className="text-center text-2xl">+</div>
                <div className="flex items-center gap-4 p-4 bg-teal-500/30 rounded-xl border border-teal-400">
                  <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center">
                    <span className="font-bold">C</span>
                  </div>
                  <div>
                    <p className="font-semibold">Cerebrum for Biology</p>
                    <p className="text-sm text-blue-200">Specialized, focused coaching</p>
                  </div>
                </div>
                <div className="text-center text-2xl">=</div>
                <div className="bg-green-500/30 p-4 rounded-xl border border-green-400 text-center">
                  <p className="font-bold text-lg">Maximum NEET Score!</p>
                  <p className="text-sm text-green-200">Cover all bases effectively</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEET Tools Widget */}
      <NEETToolsWidget
        title="Free NEET Preparation Tools"
        subtitle="Boost your Biology preparation with our AI-powered tools"
      />

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div
            className="text-center mb-8 animate-fadeInUp"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-600">
              Common questions about Cerebrum vs Allen for NEET Biology
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm animate-fadeInUp"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform flex-shrink-0 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-slate-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Comparisons</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link
              href="/allen-alternative-gurugram"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-teal-600">Allen Alternative Gurugram</h3>
              <p className="text-sm text-gray-600">Compare options in Gurgaon</p>
            </Link>
            <Link
              href="/aakash-alternative-gurugram"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-teal-600">Aakash Alternative</h3>
              <p className="text-sm text-gray-600">Compare with Aakash Institute</p>
            </Link>
            <Link
              href="/online-vs-offline-neet-coaching"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-teal-600">Online vs Offline</h3>
              <p className="text-sm text-gray-600">Which mode is better?</p>
            </Link>
            <Link
              href="/best-neet-coaching-delhi-ncr"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-teal-600">Best NEET Coaching</h3>
              <p className="text-sm text-gray-600">Top institutes in Delhi NCR</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience the Cerebrum Difference?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join 500+ students who chose focused Biology coaching for better NEET results
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking">
              <Button
                variant="secondary"
                size="xl"
                className="bg-white text-teal-600 hover:bg-gray-100 font-bold"
              >
                <Play className="w-5 h-5 mr-2" />
                Book Free Demo Class
              </Button>
            </Link>
            <button
              onClick={handleWhatsApp}
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-4 rounded-xl font-semibold animate-fadeInUp"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </button>
            <a href={`tel:${CONTACT_INFO.phone.primary}`}>
              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-teal-600"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
