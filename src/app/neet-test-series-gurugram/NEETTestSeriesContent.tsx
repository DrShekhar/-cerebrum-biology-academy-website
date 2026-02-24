'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  CheckCircle, ChevronRight, ChevronDown, MapPin, Phone, Play, Home, Target, Clock, BookOpen, BarChart3, TrendingUp, FileText,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface FAQ { question: string; answer: string }

const testTypes = [
  { icon: BookOpen, title: 'Chapter Tests', count: '20', description: 'Topic-wise tests after each chapter' },
  { icon: FileText, title: 'Subject Tests', count: '15', description: 'Biology full subject tests' },
  { icon: Target, title: 'Full Syllabus', count: '15', description: 'Complete NEET pattern tests' },
  { icon: BarChart3, title: 'Analysis Reports', count: '50+', description: 'Detailed performance reports' },
]

const analysisFeatures = [
  { title: 'Subject-wise Breakdown', description: 'See your performance in Botany vs Zoology' },
  { title: 'Chapter Analysis', description: 'Identify weak chapters needing more practice' },
  { title: 'Time Management', description: 'Track time spent per question and section' },
  { title: 'Topper Comparison', description: 'Compare your answers with top scorers' },
  { title: 'Rank Prediction', description: 'AIR prediction based on 1,50,000+ students' },
  { title: 'Improvement Graph', description: 'Track your progress over time' },
]

const packages = [
  {
    name: 'Basic',
    price: '₹8,000',
    tests: '30 Tests',
    features: ['20 chapter tests', '10 full syllabus tests', 'Basic analysis', 'Online access', 'Solution videos'],
    popular: false,
  },
  {
    name: 'Premium',
    price: '₹15,000',
    tests: '50+ Tests',
    features: ['All 50+ tests', 'Detailed analysis', 'Rank prediction', 'Doubt sessions', 'Topper comparison', 'Mentorship calls'],
    popular: true,
  },
  {
    name: 'Online Only',
    price: '₹6,000',
    tests: '40 Tests',
    features: ['40 online tests', 'Self-paced', 'Basic analysis', 'Solution PDFs', 'Mobile friendly'],
    popular: false,
  },
]

const successStats = [
  { stat: '50+', label: 'Mock Tests' },
  { stat: '90%', label: 'Rank Accuracy' },
  { stat: '10K+', label: 'Students Tested' },
  { stat: '85%', label: 'Cleared NEET' },
]

export default function NEETTestSeriesContent({ faqs }: { faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: 'neet-test-series-gurugram',
      message: 'Hi! I am interested in the NEET Biology test series in Gurugram. Please share the packages and registration details.',
      campaign: 'test-series-gurugram',
    })
  }

  return (
    <main className="min-h-screen bg-white">
      <nav className="bg-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center flex-wrap gap-1 text-sm">
            <li><Link href="/" className="text-gray-600 hover:text-teal-600"><Home className="w-4 h-4" /></Link></li>
            <li className="flex items-center"><ChevronRight className="w-4 h-4 text-gray-400 mx-1" /><Link href="/neet-coaching-gurugram" className="text-gray-600 hover:text-teal-600">NEET Coaching Gurugram</Link></li>
            <li className="flex items-center"><ChevronRight className="w-4 h-4 text-gray-400 mx-1" /><span className="text-teal-700 font-medium">Test Series</span></li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-purple-700 to-indigo-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-4xl animate-fadeInUp">
            <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BarChart3 className="w-4 h-4" />
              Detailed Analysis with Every Test
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              NEET Test Series
              <span className="block text-yellow-400 mt-2">50+ Mock Tests in Gurugram</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              Comprehensive test series with detailed analysis, rank prediction, and personalized improvement suggestions.
              Join 1,50,000+ students preparing with us.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Target className="w-5 h-5 text-yellow-400" />
                <span>50+ Mock Tests</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <BarChart3 className="w-5 h-5 text-yellow-400" />
                <span>Detailed Analysis</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span>90% Rank Accuracy</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-8 inline-block">
              <p className="text-white text-lg">Starting from <span className="text-yellow-400 font-bold text-2xl">₹6,000</span></p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-6 py-4 rounded-xl font-bold animate-fadeInUp">
                <Play className="w-5 h-5" />Start Free Test
              </button>
              <button onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-semibold border border-white/30 animate-fadeInUp">
                <Phone className="w-5 h-5" />Get Package Details
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {successStats.map((item, index) => (
              <div key={item.label}
                className="text-center animate-fadeInUp">
                <p className="text-3xl md:text-4xl font-bold text-purple-600">{item.stat}</p>
                <p className="text-sm text-slate-600 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Test Types */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What's Included</h2>
            <p className="text-xl text-slate-600">Comprehensive test coverage for complete preparation</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testTypes.map((type, index) => (
              <div key={type.title}
                className="bg-white rounded-2xl p-6 shadow-lg text-center animate-fadeInUp">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <type.icon className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-3xl font-bold text-purple-600 mb-2">{type.count}</p>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{type.title}</h3>
                <p className="text-slate-600 text-sm">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analysis Features */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Detailed Analysis</h2>
            <p className="text-xl text-slate-600">Know exactly where you stand and how to improve</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analysisFeatures.map((feature, index) => (
              <div key={feature.title}
                className="flex items-start gap-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 animate-fadeInUp">
                <CheckCircle className="w-6 h-6 text-purple-600 shrink-0" />
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{feature.title}</h3>
                  <p className="text-slate-600 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 bg-gradient-to-br from-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Test Series Packages</h2>
            <p className="text-xl text-purple-100">Choose the package that fits your needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, index) => (
              <div key={pkg.name}
                className={`bg-white rounded-2xl p-6 text-slate-900 ${pkg.popular ? 'ring-4 ring-yellow-400 relative' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-slate-900 px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-3xl font-bold text-purple-600 mb-2">{pkg.price}</p>
                <p className="text-sm text-slate-500 mb-4">{pkg.tests}</p>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />{feature}
                    </li>
                  ))}
                </ul>
                <button onClick={handleWhatsApp}
                  className={`w-full py-3 rounded-xl font-semibold ${pkg.popular ? 'bg-purple-600 text-white' : 'bg-gray-100 text-slate-700 hover:bg-gray-200'}`}>
                  {pkg.popular ? 'Enroll Now' : 'Get Details'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Test Schedule</h2>
                <p className="text-slate-600 mb-6">
                  Tests are released weekly. Take them at your convenience with flexible timing options.
                </p>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-4">
                    <Clock className="w-6 h-6 text-purple-600" />
                    <div>
                      <p className="font-semibold">Offline Tests</p>
                      <p className="text-sm text-slate-500">Every Sunday, 9 AM - 12 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                    <div>
                      <p className="font-semibold">Online Tests</p>
                      <p className="text-sm text-slate-500">48-hour window, take anytime</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <MapPin className="w-6 h-6 text-purple-600" />
                    <div>
                      <p className="font-semibold">Offline Center</p>
                      <p className="text-sm text-slate-500">{CONTACT_INFO.location.gurugram.streetAddress}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={handleWhatsApp} className="animate-fadeInUp"><Button><Play className="w-4 h-4 mr-2" />Start Free Test</Button></button>
                  <a href={`tel:${CONTACT_INFO.phone.primary}`}><Button variant="outline"><Phone className="w-4 h-4 mr-2" />Call Now</Button></a>
                </div>
              </div>
              <div className="bg-purple-50 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-4">Why Our Test Series?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" />Latest NTA pattern questions</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" />Previous year questions included</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" />Detailed video solutions</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" />Compare with 1,50,000+ students</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VideoTestimonialsSection />
      <NEETToolsWidget title="Free NEET Preparation Tools" subtitle="Use our AI-powered tools to boost your preparation" />

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl overflow-hidden shadow-sm">
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full flex items-center justify-between p-6 text-left">
                  <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && <div className="px-6 pb-6"><p className="text-slate-600">{faq.answer}</p></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Pages</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link href="/neet-crash-course-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md"><h3 className="font-semibold text-teal-600">Crash Course</h3><p className="text-sm text-gray-600">45-day intensive</p></Link>
            <Link href="/neet-revision-batch-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md"><h3 className="font-semibold text-teal-600">Revision Batch</h3><p className="text-sm text-gray-600">Final revision program</p></Link>
            <Link href="/neet-dropper-batch-2026-27-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md"><h3 className="font-semibold text-teal-600">Dropper Batch</h3><p className="text-sm text-gray-600">1-year program</p></Link>
            <Link href="/neet-coaching-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md"><h3 className="font-semibold text-teal-600">NEET Coaching Hub</h3><p className="text-sm text-gray-600">All programs</p></Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Test Your Preparation?</h2>
          <p className="text-xl mb-8 opacity-90">Start with a free mock test and see where you stand</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={handleWhatsApp} className="animate-fadeInUp"><Button variant="secondary" size="xl" className="bg-white text-purple-600 hover:bg-gray-100 font-bold"><Play className="w-5 h-5 mr-2" />Start Free Test</Button></button>
            <a href={`tel:${CONTACT_INFO.phone.primary}`}><Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-purple-600"><Phone className="w-5 h-5 mr-2" />Call Now</Button></a>
          </div>
        </div>
      </section>
    </main>
  )
}
