'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  CheckCircle, ChevronRight, ChevronDown, Phone, Play, Home, Star, Monitor, Video, MessageCircle, Wifi,
  Download, Calendar, FileText, Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { UrgencyBanner } from '@/components/landing-pages/UrgencyBanner'

interface FAQ { question: string; answer: string }

const onlineFeatures = [
  { title: 'Live Interactive Classes', description: 'Real-time sessions with Dr. Shekhar. Ask questions, participate in discussions.', icon: Video },
  { title: 'HD Recorded Lectures', description: '500+ hours of content. Watch anytime, unlimited replays for 1 year.', icon: Download },
  { title: 'Instant Doubt Support', description: 'WhatsApp group with 4-hour response. Weekly live doubt sessions.', icon: MessageCircle },
  { title: 'Digital Study Material', description: 'Complete PDF notes, diagrams, and MCQ banks. Print or study on device.', icon: FileText },
  { title: 'Online Test Series', description: '100+ mock tests with instant results. All India Rank comparison.', icon: Monitor },
  { title: 'Flexible Schedule', description: 'Morning, evening, and weekend batches. Switch between modes anytime.', icon: Calendar },
]

const successStats = [
  { stat: '300+', label: 'Online Students' },
  { stat: '4.8/5', label: 'Student Rating' },
  { stat: '500+', label: 'Hours of Content' },
  { stat: '95%', label: 'Attendance Rate' },
]

const pricingPlans = [
  {
    name: 'Online Only',
    price: '45,000',
    duration: 'per year',
    features: ['Live classes (all sessions)', 'Recorded lectures access', 'Digital study material', 'Online test series (50+)', 'WhatsApp doubt support', 'Weekly doubt sessions'],
    popular: false,
  },
  {
    name: 'Hybrid (Recommended)',
    price: '55,000',
    duration: 'per year',
    features: ['Everything in Online Only', '2 days/week offline classes', 'Physical study material', 'One-on-one mentoring', 'Offline test series', 'Priority doubt support'],
    popular: true,
  },
  {
    name: 'Premium Online',
    price: '65,000',
    duration: 'per year',
    features: ['Everything in Hybrid', 'Personal mentor assigned', 'Daily doubt clearing calls', 'Parent progress updates', 'Performance analytics', 'Scholarship for next year'],
    popular: false,
  },
]

const techRequirements = [
  { item: 'Device', detail: 'Laptop, tablet, or smartphone with camera' },
  { item: 'Internet', detail: 'Stable connection (5 Mbps minimum)' },
  { item: 'Audio', detail: 'Headphones/earphones recommended' },
  { item: 'Software', detail: 'Zoom/Google Meet (free), our app' },
]

export default function OnlineNEETClassesContent({ faqs }: { faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: 'online-neet-classes-gurugram',
      message: 'Hi! I am interested in online NEET classes from Gurugram. Please share details about live classes, timings, and fees.',
      campaign: 'online-classes-gurugram',
    })
  }

  return (
    <main className="min-h-screen bg-white">
      <nav className="bg-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center flex-wrap gap-1 text-sm">
            <li><Link href="/" className="text-gray-600 hover:text-teal-600"><Home className="w-4 h-4" /></Link></li>
            <li className="flex items-center"><ChevronRight className="w-4 h-4 text-gray-400 mx-1" /><Link href="/neet-coaching-gurugram" className="text-gray-600 hover:text-teal-600">NEET Coaching Gurugram</Link></li>
            <li className="flex items-center"><ChevronRight className="w-4 h-4 text-gray-400 mx-1" /><span className="text-blue-700 font-medium">Online Classes</span></li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-blue-700 to-indigo-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-4xl animate-fadeInUp">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Wifi className="w-4 h-4" />
              Live Interactive Classes
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Online NEET Classes
              <span className="block text-yellow-400 mt-2">for Gurugram Students</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              Get the same quality AIIMS faculty teaching from the comfort of your home.
              Live classes, recorded lectures, and unlimited doubt support.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Video className="w-5 h-5 text-yellow-400" />
                <span>Live + Recorded</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>Same AIIMS Faculty</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Zap className="w-5 h-5 text-green-400" />
                <span>Starting ₹45,000/year</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/demo-booking">
                <Button variant="secondary" size="xl" className="bg-yellow-500 text-slate-900 hover:bg-yellow-400 font-bold">
                  <Play className="w-5 h-5 mr-2" />Try Free Online Demo
                </Button>
              </Link>
              <button onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-semibold border border-white/30 animate-fadeInUp">
                <Phone className="w-5 h-5" />Get Online Class Details
              </button>
            </div>

            {/* Urgency Banner */}
            <UrgencyBanner batchStartDate="Feb 10, 2026" seatsTotal={25} seatsFilled={19} showCountdown={true} />
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
                <p className="text-3xl md:text-4xl font-bold text-blue-600">{item.stat}</p>
                <p className="text-sm text-slate-600 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What You Get with Online Classes</h2>
            <p className="text-xl text-slate-600">Complete NEET preparation from your home</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {onlineFeatures.map((feature, index) => (
              <div key={feature.title}
                className="bg-white rounded-2xl p-6 shadow-lg animate-fadeInUp">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Online Class Packages</h2>
            <p className="text-xl text-slate-600">Choose the plan that works for you</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div key={plan.name}
                className={`rounded-2xl p-8 ${plan.popular ? 'bg-blue-50 border-2 border-blue-500 relative' : 'bg-gray-50 border-2 border-gray-200'}`}>
                {plan.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</div>}
                <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-4xl font-bold text-blue-600 mb-1">₹{plan.price}</p>
                <p className="text-sm text-slate-500 mb-6">{plan.duration}</p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />{feature}
                    </li>
                  ))}
                </ul>
                <Button className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`} onClick={handleWhatsApp}>
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Requirements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Technical Requirements</h2>
            <p className="text-xl text-slate-600">Simple setup, no fancy equipment needed</p>
          </div>

          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-lg">
            <div className="space-y-4">
              {techRequirements.map((req, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                  <span className="font-semibold text-slate-900">{req.item}</span>
                  <span className="text-slate-600">{req.detail}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-500 mt-4 text-center">
              Dont have a device? We provide tablets on deposit basis for eligible students.
            </p>
          </div>
        </div>
      </section>

      {/* Online vs Offline Comparison */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInUp">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Same Quality, More Flexibility</h2>
              <p className="text-xl text-blue-100 mb-6">
                Our online classes deliver the same results as offline. The only difference
                is you save commute time and can study from anywhere.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-400" />Same Dr. Shekhar teaching live</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-400" />Same study material (digital format)</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-400" />Same test series with rank comparison</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-400" />Better doubt clearing (recorded + live)</li>
              </ul>
              <Link href="/demo-booking">
                <Button className="bg-white text-blue-600 hover:bg-blue-50">
                  <Play className="w-4 h-4 mr-2" />Try Free Online Demo
                </Button>
              </Link>
            </div>
            <div
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 animate-fadeInUp">
              <h3 className="text-2xl font-bold mb-6">Online Student Results 2024</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-white/20"><span>Average NEET Biology</span><span className="font-semibold">315/360</span></div>
                <div className="flex justify-between py-3 border-b border-white/20"><span>Class Attendance</span><span className="font-semibold">95%</span></div>
                <div className="flex justify-between py-3 border-b border-white/20"><span>Student Satisfaction</span><span className="font-semibold">4.8/5</span></div>
                <div className="flex justify-between py-3"><span>NEET Qualified</span><span className="font-semibold text-green-400">86%</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VideoTestimonialsSection />
      <NEETToolsWidget title="Free NEET Preparation Tools" subtitle="Use our AI-powered tools to boost your online preparation" />

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
            <Link href="/neet-coaching-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md"><h3 className="font-semibold text-teal-600">Offline Coaching</h3><p className="text-sm text-gray-600">In-person classes</p></Link>
            <Link href="/neet-test-series-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md"><h3 className="font-semibold text-teal-600">Test Series</h3><p className="text-sm text-gray-600">Online mock tests</p></Link>
            <Link href="/neet-study-material-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md"><h3 className="font-semibold text-teal-600">Study Material</h3><p className="text-sm text-gray-600">Digital resources</p></Link>
            <Link href="/affordable-neet-coaching-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md"><h3 className="font-semibold text-teal-600">Affordable Options</h3><p className="text-sm text-gray-600">Budget-friendly plans</p></Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Online Classes?</h2>
          <p className="text-xl mb-8 opacity-90">Join 300+ Gurugram students learning online with us</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking"><Button variant="secondary" size="xl" className="bg-white text-blue-600 hover:bg-gray-100 font-bold"><Play className="w-5 h-5 mr-2" />Book Free Online Demo</Button></Link>
            <a href={`tel:${CONTACT_INFO.phone.primary}`}><Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-blue-600"><Phone className="w-5 h-5 mr-2" />Call Now</Button></a>
          </div>
        </div>
      </section>
    </main>
  )
}
