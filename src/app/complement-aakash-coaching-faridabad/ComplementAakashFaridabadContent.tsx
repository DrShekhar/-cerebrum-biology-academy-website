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
  Monitor,
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
    title: 'Digital + Personal',
    description:
      "Keep Aakash's digital resources while adding personal teaching from AIIMS faculty.",
    icon: Monitor,
  },
  {
    title: 'Flexible Scheduling',
    description: 'Weekend intensives or evening sessions. Choose what fits your Aakash schedule.',
    icon: Calendar,
  },
  {
    title: 'Biology Deep-Dive',
    description:
      'While Aakash covers breadth, we focus on depth. Master concepts that matter for NEET.',
    icon: BookOpen,
  },
  {
    title: 'Personal Attention',
    description: "10-20 students vs Aakash's 60-80. Your doubts get answered properly.",
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
    name: 'Arjun P.',
    score: '625/720',
    combo: 'Aakash + Cerebrum',
    quote:
      'Continued Aakash for their test series but joined Cerebrum for Biology concepts. The combination worked perfectly for me.',
  },
  {
    name: 'Priya M.',
    score: '638/720',
    combo: 'Aakash + Cerebrum Weekend',
    quote:
      "Aakash's digital resources are good, but Biology needs personal teaching. Cerebrum weekend batch gave me exactly that.",
  },
  {
    name: 'Ravi S.',
    score: '608/720',
    combo: 'Aakash + Cerebrum Evening',
    quote:
      'My Biology score improved by 60 marks after joining Cerebrum evening sessions. The doubt clearing is so much better than app-based.',
  },
]

const successStats = [
  { stat: '50-60', label: 'Average marks improvement in Biology' },
  { stat: '82%', label: 'Score 310+ in Biology' },
  { stat: '150+', label: 'Aakash students enrolled with us' },
  { stat: '4.8/5', label: 'Student satisfaction rating' },
]

export default function ComplementAakashFaridabadContent({ faqs }: { faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: 'complement-aakash-coaching-faridabad',
      message:
        'Hi! I am an Aakash student in Faridabad and want to join Cerebrum for extra Biology coaching. Please share the schedule and fees.',
      campaign: 'complement-aakash-faridabad',
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
              <Link href="/neet-coaching-faridabad" className="text-gray-600 hover:text-teal-600">
                NEET Coaching Faridabad
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <span className="text-teal-700 font-medium">Complement Aakash Coaching</span>
            </li>
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
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              For Aakash Students Only
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Keep Aakash. Add
              <span className="block text-yellow-400 mt-2">Expert Biology Coaching</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              Don't leave Aakash. Just boost your Biology with focused coaching from AIIMS faculty.
              Keep using digital resources, add personal teaching.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Monitor className="w-5 h-5 text-yellow-400" />
                <span>Digital + Personal Teaching</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Calendar className="w-5 h-5 text-yellow-400" />
                <span>Weekend & Evening Batches</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span>50-60 Marks Improvement</span>
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
                Get Schedule for Aakash Students
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
                <p className="text-3xl md:text-4xl font-bold text-purple-600">{item.stat}</p>
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
              Why Aakash Students Add Cerebrum
            </h2>
            <p className="text-xl text-slate-600">Get the best of both worlds</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white rounded-2xl p-6 shadow-lg animate-fadeInUp"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-purple-600" />
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
              Flexible Batches for Aakash Students
            </h2>
            <p className="text-xl text-slate-600">Choose what fits your schedule</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {scheduleOptions.map((option) => (
              <div
                key={option.name}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-purple-100 animate-fadeInUp"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-2">{option.name}</h3>
                <div className="flex items-center gap-2 text-purple-600 mb-3">
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
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold animate-fadeInUp"
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
              Aakash + Cerebrum Success Stories
            </h2>
            <p className="text-xl text-slate-600">Real results from students who combined both</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-lg animate-fadeInUp">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold text-lg">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{t.name}</p>
                    <p className="text-sm text-purple-600">{t.combo}</p>
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

      {/* Best of Both Worlds */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInUp">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Best of Both Worlds</h2>
              <p className="text-xl text-indigo-100 mb-6">
                Aakash's digital platform is good for practice and tests. But Biology needs personal
                teaching and doubt clearing that apps cannot provide. Cerebrum adds the human
                element.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Use Aakash test series + Cerebrum concepts
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Digital resources + Personal doubt clearing
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  App-based practice + Classroom teaching
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Video lectures + AIIMS faculty interaction
                </li>
              </ul>
              <Link href="/demo-booking">
                <Button className="bg-white text-indigo-600 hover:bg-indigo-50">
                  <Play className="w-4 h-4 mr-2" />
                  Try a Free Class
                </Button>
              </Link>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 animate-fadeInUp">
              <h3 className="text-2xl font-bold mb-6">Special Package for Aakash Students</h3>
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
              <p className="text-sm text-indigo-200 mt-4">
                *Fee depends on batch type and intensity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  Conveniently Located in Sector 17
                </h2>
                <p className="text-slate-600 mb-6">
                  Our center is at <strong>Sector 17, Faridabad</strong> - easily accessible from
                  Bata Chowk Metro.
                </p>
                <div className="space-y-3 mb-6">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-purple-600" />
                    {CONTACT_INFO.location.faridabad.streetAddress}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-600" />
                    Near Bata Chowk Metro (5 min walk)
                  </p>
                </div>
                <div className="flex gap-4">
                  <a href={`tel:${CONTACT_INFO.phone.primary}`}>
                    <Button variant="outline">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                  </a>
                  <a href={CONTACT_INFO.location.faridabad.mapUrl} target="_blank" rel="noopener">
                    <Button>
                      <MapPin className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                  </a>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-lg mb-4">Why Students Choose Us</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span>AIIMS Faculty</span>
                    <span className="text-green-600 font-semibold">Dr. Shekhar</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span>Flexible Timings</span>
                    <span className="text-green-600 font-semibold">Yes</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span>Trial Class</span>
                    <span className="text-green-600 font-semibold">7 Days Free</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span>Refund Policy</span>
                    <span className="text-green-600 font-semibold">Money-Back Guarantee</span>
                  </div>
                </div>
              </div>
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
              href="/aakash-alternative-faridabad"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">Aakash Alternative</h3>
              <p className="text-sm text-gray-600">Full switch from Aakash</p>
            </Link>
            <Link
              href="/complement-allen-coaching-faridabad"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">Complement Allen</h3>
              <p className="text-sm text-gray-600">For Allen students</p>
            </Link>
            <Link
              href="/neet-foundation-class-11-faridabad"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">Class 11 Foundation</h3>
              <p className="text-sm text-gray-600">Start early preparation</p>
            </Link>
            <Link
              href="/neet-coaching-faridabad"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">NEET Coaching Hub</h3>
              <p className="text-sm text-gray-600">All programs</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Boost Your Biology Score?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join 150+ Aakash students who complement their coaching with Cerebrum
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking">
              <Button
                variant="secondary"
                size="xl"
                className="bg-white text-indigo-600 hover:bg-gray-100 font-bold"
              >
                <Play className="w-5 h-5 mr-2" />
                Book Free Trial
              </Button>
            </Link>
            <a href={`tel:${CONTACT_INFO.phone.primary}`}>
              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-indigo-600"
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
