'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen, CheckCircle, Clock, ChevronRight, ChevronDown, MapPin, Phone, Play, Home,
  Award, Users, Target, Calendar, FileText, Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface FAQ { question: string; answer: string }

const courseFeatures = [
  { title: 'Complete Syllabus Revision', description: '3 comprehensive cycles covering entire NEET Biology', icon: BookOpen },
  { title: '5000+ Question Practice', description: 'Extensive question bank with detailed solutions', icon: FileText },
  { title: '30+ Mock Tests', description: 'Full-length tests in actual NEET pattern', icon: Target },
  { title: 'Daily Testing', description: 'Topic-wise tests to track daily progress', icon: Calendar },
  { title: 'Expert Faculty', description: '15+ years experience in NEET coaching', icon: Users },
  { title: 'Doubt Resolution', description: 'Dedicated doubt clearing sessions daily', icon: Zap },
]

const syllabusCycles = [
  {
    cycle: 'Cycle 1: Foundation',
    months: '4 months',
    focus: 'Concept building from scratch',
    activities: ['NCERT line-by-line', 'Basic concept clarity', 'Foundation MCQs', 'Previous mistakes correction'],
    color: 'blue',
  },
  {
    cycle: 'Cycle 2: Consolidation',
    months: '4 months',
    focus: 'Deep practice and weak area focus',
    activities: ['Advanced MCQs', 'Chapter-wise tests', 'PYQ analysis', 'Weak area intensive'],
    color: 'purple',
  },
  {
    cycle: 'Cycle 3: Revision & Mocks',
    months: '4 months',
    focus: 'Full revision and exam simulation',
    activities: ['Quick revision', '30 mock tests', 'Time management', 'Exam strategy'],
    color: 'green',
  },
]

const statistics = [
  { label: 'Average Improvement', value: '120+', unit: 'Marks' },
  { label: 'Success Rate', value: '78%', unit: 'Cleared Cutoff' },
  { label: 'Top Scorers', value: '35%', unit: 'Above 600' },
  { label: 'Question Practice', value: '5000+', unit: 'MCQs' },
]

const weeklySchedule = [
  { day: 'Monday - Friday', timing: '9 AM - 2 PM', activity: 'Regular Classes' },
  { day: 'Saturday', timing: '9 AM - 1 PM', activity: 'Weekly Test + Discussion' },
  { day: 'Evening (Daily)', timing: '4 PM - 6 PM', activity: 'Self-Study + Doubt Session' },
]

export default function OneYearDropperCourseContent({ faqs }: { faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: 'one-year-dropper-gurugram',
      message: 'Hi! I am interested in the One Year NEET Dropper Course in Gurugram. Please share complete details.',
      campaign: 'one-year-dropper-gurugram',
    })
  }

  return (
    <main className="min-h-screen bg-white">
      <nav className="bg-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center flex-wrap gap-1 text-sm">
            <li><Link href="/" className="text-gray-600 hover:text-teal-600"><Home className="w-4 h-4" /></Link></li>
            <li className="flex items-center"><ChevronRight className="w-4 h-4 text-gray-400 mx-1" /><Link href="/neet-coaching-gurugram" className="text-gray-600 hover:text-teal-600">NEET Coaching Gurugram</Link></li>
            <li className="flex items-center"><ChevronRight className="w-4 h-4 text-gray-400 mx-1" /><span className="text-teal-700 font-medium">One Year Dropper Course</span></li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-indigo-900 to-purple-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-4xl animate-fadeInUp">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              Complete Transformation Program
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              One Year NEET Dropper Course
              <span className="block text-indigo-400 mt-2">in Gurugram</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              Intensive one-year program designed for complete NEET transformation. 3 revision cycles,
              5000+ questions, 30+ mocks - everything you need to crack NEET in your next attempt.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <BookOpen className="w-5 h-5 text-indigo-400" />
                <span>3 Revision Cycles</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <FileText className="w-5 h-5 text-purple-400" />
                <span>5000+ Questions</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Target className="w-5 h-5 text-pink-400" />
                <span>30+ Mocks</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/demo-booking">
                <Button variant="secondary" size="xl" className="bg-indigo-500 text-white hover:bg-indigo-400 font-bold">
                  <Play className="w-5 h-5 mr-2" />Book Free Counseling
                </Button>
              </Link>
              <button onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-semibold border border-white/30 animate-fadeInUp">
                <Phone className="w-5 h-5" />WhatsApp: +91-88264-44334
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-12 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statistics.map((stat, index) => (
              <div key={stat.label}
                className="text-center text-white animate-fadeInUp">
                <div className="text-4xl md:text-5xl font-bold mb-1">{stat.value}</div>
                <div className="text-indigo-200 text-sm">{stat.unit}</div>
                <div className="text-white/80 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Features */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What You Get</h2>
            <p className="text-xl text-slate-600">Complete package for NEET success</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseFeatures.map((feature, index) => (
              <div key={feature.title}
                className="bg-white rounded-2xl p-6 shadow-lg animate-fadeInUp">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Cycles */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">3-Cycle Revision System</h2>
            <p className="text-xl text-slate-600">Proven methodology for dropper success</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {syllabusCycles.map((cycle, index) => (
              <div key={cycle.cycle}
                className={`rounded-2xl p-6 ${cycle.color === 'blue' ? 'bg-blue-50 border-2 border-blue-200' : cycle.color === 'purple' ? 'bg-purple-50 border-2 border-purple-200' : 'bg-green-50 border-2 border-green-200'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${cycle.color === 'blue' ? 'bg-blue-600' : cycle.color === 'purple' ? 'bg-purple-600' : 'bg-green-600'}`}>{index + 1}</span>
                  <div>
                    <h3 className="font-bold text-slate-900">{cycle.cycle}</h3>
                    <p className="text-sm text-slate-600">{cycle.months}</p>
                  </div>
                </div>
                <p className={`text-sm font-medium mb-4 ${cycle.color === 'blue' ? 'text-blue-700' : cycle.color === 'purple' ? 'text-purple-700' : 'text-green-700'}`}>{cycle.focus}</p>
                <ul className="space-y-2">
                  {cycle.activities.map((activity) => (
                    <li key={activity} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className={`w-4 h-4 ${cycle.color === 'blue' ? 'text-blue-500' : cycle.color === 'purple' ? 'text-purple-500' : 'text-green-500'}`} />{activity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Schedule */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl font-bold mb-4">Weekly Schedule</h2>
            <p className="text-indigo-100">Structured routine for maximum productivity</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {weeklySchedule.map((schedule, index) => (
              <div key={schedule.day}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center animate-fadeInUp">
                <Clock className="w-8 h-8 mx-auto mb-4 text-indigo-300" />
                <h3 className="font-bold text-lg mb-2">{schedule.day}</h3>
                <p className="text-indigo-200 text-sm mb-2">{schedule.timing}</p>
                <p className="text-white font-medium">{schedule.activity}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Details */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div
              className="bg-white rounded-2xl p-8 shadow-xl animate-fadeInUp">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Program Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b"><span className="text-slate-600">Course</span><span className="font-semibold">Dropper/Repeater Batch</span></div>
                <div className="flex justify-between py-3 border-b"><span className="text-slate-600">Duration</span><span className="font-semibold">12 Months</span></div>
                <div className="flex justify-between py-3 border-b"><span className="text-slate-600">Fee Range</span><span className="font-semibold text-indigo-600">₹90,000 - ₹1,56,000</span></div>
                <div className="flex justify-between py-3 border-b"><span className="text-slate-600">Tiers</span><span className="font-semibold">Pursuit | Ascent | Pinnacle ZA</span></div>
                <div className="flex justify-between py-3 border-b"><span className="text-slate-600">Batch Size</span><span className="font-semibold">10-40 students (by tier)</span></div>
                <div className="flex justify-between py-3 border-b"><span className="text-slate-600">Mock Tests</span><span className="font-semibold">50+ Full Tests</span></div>
                <div className="flex justify-between py-3"><span className="text-slate-600">Study Material</span><span className="font-semibold">Complete Package Included</span></div>
              </div>
              <p className="mt-4 text-sm text-slate-600 italic">Fee depends on your goal, current level, and the work needed to reliably achieve your target score.</p>
              <Link href="/demo-booking" className="block mt-6">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Book Free Counseling</Button>
              </Link>
            </div>

            <div
              className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 animate-fadeInUp">
              <div className="flex items-center mb-6">
                <MapPin className="w-8 h-8 text-indigo-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Our Gurugram Center</h2>
              </div>
              <p className="text-gray-700 mb-4"><strong>Address:</strong> {CONTACT_INFO.location.gurugram.streetAddress}, {CONTACT_INFO.location.gurugram.addressLocality}</p>
              <p className="text-gray-700 mb-4"><strong>Landmark:</strong> Same building as Allen Career Institute</p>
              <p className="text-gray-700 mb-6"><strong>Metro:</strong> Sector 55-56 Rapid Metro (5 min walk)</p>
              <div className="flex gap-4">
                <a href={`tel:${CONTACT_INFO.phone.primary}`}><Button variant="outline"><Phone className="w-4 h-4 mr-2" />Call Now</Button></a>
                <a href={CONTACT_INFO.location.gurugram.mapUrl} target="_blank" rel="noopener"><Button><MapPin className="w-4 h-4 mr-2" />Directions</Button></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VideoTestimonialsSection />
      <NEETToolsWidget title="Free NEET Preparation Tools" subtitle="Start your preparation with our AI-powered tools" />

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl overflow-hidden">
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
            <Link href="/neet-dropper-batch-2026-27-gurugram" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md"><h3 className="font-semibold text-teal-600">Dropper Batch 2026-27</h3><p className="text-sm text-gray-600">Upcoming batch</p></Link>
            <Link href="/neet-coaching-gurugram" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md"><h3 className="font-semibold text-teal-600">NEET Coaching Gurugram</h3><p className="text-sm text-gray-600">All programs</p></Link>
            <Link href="/locations/gurugram" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md"><h3 className="font-semibold text-teal-600">Gurugram Center</h3><p className="text-sm text-gray-600">Center details</p></Link>
            <Link href="/demo-booking" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md"><h3 className="font-semibold text-teal-600">Book Demo</h3><p className="text-sm text-gray-600">Free counseling</p></Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Transform Your NEET Score</h2>
          <p className="text-xl mb-8 opacity-90">Join our One Year Dropper Course and achieve your dream medical seat</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking"><Button variant="secondary" size="xl" className="bg-white text-indigo-600 hover:bg-gray-100 font-bold"><Play className="w-5 h-5 mr-2" />Book Free Counseling</Button></Link>
            <a href={`tel:${CONTACT_INFO.phone.primary}`}><Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-indigo-600"><Phone className="w-5 h-5 mr-2" />Call Now</Button></a>
          </div>
        </div>
      </section>
    </main>
  )
}
