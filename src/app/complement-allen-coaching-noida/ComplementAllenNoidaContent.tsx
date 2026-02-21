'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  CheckCircle,
  ChevronRight,
  ChevronDown,
  MapPin,
  Phone,
  Play,
  Home,
  Users,
  Clock,
  BookOpen,
  Zap,
  Calendar,
  TrendingUp,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface FAQ {
  question: string
  answer: string
}

const benefits = [
  {
    title: 'Convenient Location',
    description:
      'Cerebrum Sector 62, Noida is centrally located near Sector 62 Metro Station (Blue Line). Easy access for Allen students across Noida, Indirapuram, Vaishali, and Greater Noida West.',
    icon: MapPin,
  },
  {
    title: 'Flexible Scheduling',
    description: 'Weekend intensives or evening sessions. Choose what fits your Allen schedule.',
    icon: Calendar,
  },
  {
    title: 'Biology Deep-Dive',
    description:
      'While Allen covers breadth, we focus on depth. Master concepts that matter for NEET.',
    icon: BookOpen,
  },
  {
    title: 'Personal Attention',
    description: "10-20 students vs Allen's 100+. Your doubts get answered properly.",
    icon: Users,
  },
]

const scheduleOptions = [
  {
    name: 'Weekend Intensive',
    timing: 'Sat-Sun, 9 AM - 1 PM',
    focus: 'Complete syllabus coverage',
    ideal: 'Students who want comprehensive Biology',
  },
  {
    name: 'Evening Boost',
    timing: 'Mon-Fri, 6-8 PM',
    focus: 'Doubt clearing + weak areas',
    ideal: 'Students with specific topic gaps',
  },
  {
    name: 'Sunday Special',
    timing: 'Sunday, 9 AM - 5 PM',
    focus: 'Intensive practice + tests',
    ideal: 'Test-focused preparation',
  },
  {
    name: 'Online Flex',
    timing: 'Flexible timing',
    focus: 'Recorded + live sessions',
    ideal: 'Those who need maximum flexibility',
  },
]

const testimonials = [
  {
    name: 'Rohit M.',
    score: '615/720',
    combo: 'Allen + Cerebrum',
    quote:
      'Continued Allen for Physics/Chemistry but joined Cerebrum for Biology. Best decision - Biology became my strongest subject with 340/360.',
  },
  {
    name: 'Ananya S.',
    score: '642/720',
    combo: 'Allen + Cerebrum Weekend',
    quote:
      'The weekend batch at Cerebrum perfectly complemented my Allen weekday classes. Sector 62 Noida location is very convenient.',
  },
  {
    name: 'Vikram R.',
    score: '598/720',
    combo: 'Allen + Cerebrum Evening',
    quote:
      'My Biology score jumped from 260 to 310 after joining Cerebrum evening sessions. The personal attention made all the difference.',
  },
]

const successStats = [
  { stat: '50-70', label: 'Average marks improvement in Biology' },
  { stat: '85%', label: 'Score 320+ in Biology' },
  { stat: '200+', label: 'Allen students enrolled with us' },
  { stat: '4.9/5', label: 'Student satisfaction rating' },
]

export default function ComplementAllenNoidaContent({ faqs }: { faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: 'complement-allen-coaching-noida',
      message:
        'Hi! I am an Allen student in Noida and want to join Cerebrum for extra Biology coaching. Please share the schedule and fees.',
      campaign: 'complement-allen-noida',
    })
  }

  return (
    <main className="min-h-screen bg-white">
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
              <Link href="/neet-coaching-noida" className="text-gray-600 hover:text-teal-600">
                NEET Coaching Noida
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <span className="text-teal-700 font-medium">Complement Allen Coaching</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-blue-900 to-teal-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-4xl animate-fadeInUp">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              For Allen Students Only
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Keep Allen. Add
              <span className="block text-yellow-400 mt-2">Expert Biology Coaching</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              Don&apos;t leave Allen. Just boost your Biology with focused coaching from AIIMS
              faculty. Flexible timing, guaranteed improvement.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <MapPin className="w-5 h-5 text-yellow-400" />
                <span>Near Sector 62 Metro</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Calendar className="w-5 h-5 text-yellow-400" />
                <span>Weekend & Evening Batches</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span>50-70 Marks Improvement</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-slate-900 hover:bg-yellow-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Trial Class
                </Button>
              </Link>
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-semibold border border-white/30 animate-fadeInUp"
              >
                <Phone className="w-5 h-5" />
                Get Schedule for Allen Students
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {successStats.map((item) => (
              <div key={item.label} className="text-center animate-fadeInUp">
                <p className="text-3xl md:text-4xl font-bold text-teal-600">{item.stat}</p>
                <p className="text-sm text-slate-600 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Complement */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Allen Students Add Cerebrum
            </h2>
            <p className="text-xl text-slate-600">Get the best of both worlds</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white rounded-2xl p-6 shadow-lg animate-fadeInUp"
              >
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h3>
                <p className="text-slate-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Options */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Flexible Batches for Allen Students
            </h2>
            <p className="text-xl text-slate-600">Choose what fits your schedule</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {scheduleOptions.map((option) => (
              <div
                key={option.name}
                className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-6 border border-teal-100 animate-fadeInUp"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-2">{option.name}</h3>
                <div className="flex items-center gap-2 text-teal-600 mb-3">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">{option.timing}</span>
                </div>
                <p className="text-slate-700 font-medium mb-2">{option.focus}</p>
                <p className="text-sm text-slate-500">{option.ideal}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={handleWhatsApp}
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-semibold animate-fadeInUp"
            >
              <Phone className="w-5 h-5" />
              Get Full Schedule & Fees
            </button>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Allen + Cerebrum Success Stories
            </h2>
            <p className="text-xl text-slate-600">Real results from students who combined both</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-lg animate-fadeInUp">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold text-lg">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{t.name}</p>
                    <p className="text-sm text-teal-600">{t.combo}</p>
                  </div>
                  <div className="ml-auto bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                    {t.score}
                  </div>
                </div>
                <p className="text-slate-600 italic">&ldquo;{t.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Advantage */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInUp">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Central Noida Location</h2>
              <p className="text-xl text-blue-100 mb-6">
                Cerebrum is located at <strong>B-45, Sector 62, Noida</strong> - near Sector 62
                Metro Station (Blue Line). Easily accessible from Sector 18, Sector 44, Sector 50,
                Sector 76, Indirapuram, Vaishali, and Greater Noida West.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Finish Allen class, start Cerebrum session
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Near Sector 62 Metro Station (Blue Line)
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Study room access between classes
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Accessible from Indirapuram, Vaishali, Greater Noida West
                </li>
              </ul>
              <a href={CONTACT_INFO.location.noida.mapUrl} target="_blank" rel="noopener">
                <Button className="bg-white text-blue-600 hover:bg-blue-50">
                  <MapPin className="w-4 h-4 mr-2" />
                  See Location on Map
                </Button>
              </a>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 animate-fadeInUp">
              <h3 className="text-2xl font-bold mb-6">Special Package for Allen Students</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-white/20">
                  <span>Weekend Only</span>
                  <span className="font-semibold">From ₹30,000/year</span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/20">
                  <span>Evening Sessions</span>
                  <span className="font-semibold">From ₹35,000/year</span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/20">
                  <span>Full Supplementary</span>
                  <span className="font-semibold">₹45,000-90,000/year</span>
                </div>
                <div className="flex justify-between py-3">
                  <span>Trial Period</span>
                  <span className="font-semibold text-green-400">7 Days Free</span>
                </div>
              </div>
              <p className="text-sm text-blue-200 mt-4">
                *Fee depends on batch type and intensity. Discounts for Allen referrals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <VideoTestimonialsSection />
      <NEETToolsWidget
        title="Free NEET Preparation Tools"
        subtitle="Use our AI-powered tools to boost your preparation"
      />

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
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

      {/* Related */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Pages</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link
              href="/allen-alternative-noida"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">Allen Alternative</h3>
              <p className="text-sm text-gray-600">Full switch from Allen</p>
            </Link>
            <Link
              href="/complement-aakash-coaching-noida"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">Complement Aakash</h3>
              <p className="text-sm text-gray-600">For Aakash students</p>
            </Link>
            <Link
              href="/neet-foundation-class-11-noida"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">Class 11 Foundation</h3>
              <p className="text-sm text-gray-600">Start early preparation</p>
            </Link>
            <Link
              href="/neet-coaching-noida"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">NEET Coaching Hub</h3>
              <p className="text-sm text-gray-600">All programs</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Boost Your Biology Score?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join 200+ Allen students who complement their coaching with Cerebrum
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking">
              <Button
                variant="secondary"
                size="xl"
                className="bg-white text-blue-600 hover:bg-gray-100 font-bold"
              >
                <Play className="w-5 h-5 mr-2" />
                Book Free Trial
              </Button>
            </Link>
            <a href={`tel:${CONTACT_INFO.phone.primary}`}>
              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-blue-600"
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
