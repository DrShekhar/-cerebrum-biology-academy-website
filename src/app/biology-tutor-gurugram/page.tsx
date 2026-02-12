'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Trophy,
  Users,
  MessageCircle,
  Play,
  Phone,
  MapPin,
  Star,
  GraduationCap,
  Target,
  Train,
  Laptop,
  Calculator,
  BookOpen,
  TrendingUp,
  CheckCircle,
  Clock,
  ArrowRight,
  Send,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import Image from 'next/image'

// WhatsApp contact constants
const WHATSAPP_PHONE = '918826444334'
const WHATSAPP_MSG = encodeURIComponent(
  "Hi, I'm from Gurugram and interested in NEET Biology coaching"
)
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${WHATSAPP_MSG}`
const WHATSAPP_URL_SIMPLE = `https://wa.me/${WHATSAPP_PHONE}`

// Single hook to manage multiple scroll animations with one IntersectionObserver
function useScrollAnimations<T extends string>(keys: T[], threshold = 0.1) {
  const refs = useRef<Map<T, HTMLDivElement | null>>(new Map())
  const [visibility, setVisibility] = useState<Record<T, boolean>>(
    () => Object.fromEntries(keys.map((k) => [k, false])) as Record<T, boolean>
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = Array.from(refs.current.entries()).find(
              ([, el]) => el === entry.target
            )?.[0]
            if (key) {
              setVisibility((prev) => ({ ...prev, [key]: true }))
              observer.unobserve(entry.target)
            }
          }
        })
      },
      { threshold }
    )

    refs.current.forEach((element) => {
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [threshold])

  const setRef = (key: T) => (el: HTMLDivElement | null) => {
    refs.current.set(key, el)
  }

  return { setRef, isVisible: (key: T) => visibility[key] }
}

const gurugramAreas = [
  { name: 'DLF Phase 1-5', distance: '35 km', metro: 'Rapid Metro', landmark: 'Cyber Hub' },
  {
    name: 'Golf Course Road',
    distance: '38 km',
    metro: 'HUDA City Centre',
    landmark: 'DLF Golf Course',
  },
  { name: 'Sohna Road', distance: '30 km', metro: 'HUDA City Centre', landmark: 'Subhash Chowk' },
  { name: 'MG Road', distance: '40 km', metro: 'MG Road Metro', landmark: 'Sahara Mall' },
  { name: 'Sector 14', distance: '42 km', metro: 'HUDA City Centre', landmark: 'Old Gurgaon' },
  {
    name: 'Sector 56-57',
    distance: '35 km',
    metro: 'HUDA City Centre',
    landmark: 'Golf Course Ext',
  },
  { name: 'Sector 82-84', distance: '28 km', metro: 'Dwarka Expressway', landmark: 'New Gurugram' },
  { name: 'Manesar', distance: '25 km', metro: 'NH-48', landmark: 'Industrial Hub' },
]

const whyChooseUs = [
  {
    icon: Laptop,
    title: 'Online Classes Ideal',
    description: 'Best option for Gurugram students - high-quality online learning from home.',
  },
  {
    icon: GraduationCap,
    title: 'AIIMS Faculty',
    description: 'Learn from Dr. Shekhar C Singh, AIIMS Alumnus with 15+ years experience.',
  },
  {
    icon: Target,
    title: '67+ AIIMS Selections',
    description: 'Proven track record with students from across NCR including Gurugram.',
  },
  {
    icon: Star,
    title: 'Flexible Schedule',
    description: 'Weekend batches and recorded lectures for busy Gurugram families.',
  },
]

const freeTools = [
  {
    icon: BookOpen,
    title: 'MCQ Practice Tool',
    description: 'Practice 10,000+ NEET Biology MCQs with detailed explanations',
    href: '/neet-tools/mcq',
    color: 'bg-teal-600',
  },
  {
    icon: Calculator,
    title: 'College Predictor',
    description: 'Find the best medical colleges based on your expected NEET score',
    href: '/neet-college-predictor',
    color: 'bg-purple-700',
  },
  {
    icon: TrendingUp,
    title: 'Rank Predictor',
    description: 'Predict your NEET rank and get insights on admission chances',
    href: '/neet-rank-predictor',
    color: 'bg-blue-600',
  },
]

const faqs = [
  {
    question: 'Is your center accessible from Gurugram?',
    answer:
      'While our center in Greater Noida is 30-40 km from Gurugram, we strongly recommend our online classes for Gurugram students. Our online platform offers the same quality with live interactive sessions, recorded lectures, and practice tests.',
  },
  {
    question: 'Why should Gurugram students choose online classes?',
    answer:
      'Online classes save 2-3 hours of daily commute time. You get the same AIIMS faculty teaching, live doubt sessions, and comprehensive study material. Many of our top performers are online students from Gurugram.',
  },
  {
    question: 'Do you have students from Gurugram?',
    answer:
      'Yes! We have many students from DLF, Golf Course Road, Sohna Road, and other Gurugram areas. They prefer our online classes for the quality and convenience. Weekend offline batches are also available for those who can travel.',
  },
  {
    question: 'What about weekend classes for Gurugram students?',
    answer:
      'We offer weekend intensive batches where students can travel once a week for offline sessions. This is combined with online classes during weekdays, giving you the best of both worlds.',
  },
]

export default function BiologyTutorGurugramPage() {
  const { setRef, isVisible } = useScrollAnimations([
    'hero',
    'areas',
    'why',
    'tools',
    'faqs',
    'cta',
    'contact',
  ] as const)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    area: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formError, setFormError] = useState('')

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormError('')

    // Validate phone number (10-digit Indian mobile)
    const cleanPhone = formData.phone.replace(/\D/g, '')
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setFormError('Please enter a valid 10-digit mobile number')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: cleanPhone,
          email: formData.email || undefined,
          area: formData.area || undefined,
          message: formData.message || undefined,
          source: 'biology-tutor-gurugram',
          pageUrl: window.location.href,
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setFormSuccess(true)
        setFormData({ name: '', phone: '', email: '', area: '', message: '' })
      } else {
        setFormError(result.error || 'Failed to submit. Please try again.')
      }
    } catch {
      setFormError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Sticky CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 p-3 z-50 md:hidden">
        <div className="flex gap-2 max-w-lg mx-auto">
          <a href="tel:+918826444334" className="flex-1">
            <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold">
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button className="w-full bg-[#166534] hover:bg-[#14532d] text-white font-bold">
              <Image
                src="/icons/whatsapp.svg"
                alt="WhatsApp"
                width={18}
                height={18}
                className="mr-2"
              />
              WhatsApp
            </Button>
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div
            ref={setRef('hero')}
            className={`text-center max-w-4xl mx-auto transition-all duration-700 ${
              isVisible('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <div className="inline-flex items-center bg-teal-600/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6 border border-teal-500/30">
              <Laptop className="w-5 h-5 mr-2 text-teal-400" />
              <span className="text-teal-300">Online Classes Recommended for Gurugram</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best Biology Tutor in <span className="text-yellow-400">Gurugram</span>
            </h1>

            <h2 className="text-xl md:text-2xl text-gray-300 mb-4">
              NEET & Board Preparation | Online + Weekend Batches | AIIMS Faculty
            </h2>

            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
              Expert Biology coaching for Gurugram students via online classes. Learn from{' '}
              <strong className="text-white">Dr. Shekhar C Singh, AIIMS Alumnus</strong>.
            </p>

            {/* Primary CTAs - Call & WhatsApp */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <a href="tel:+918826444334">
                <Button
                  size="xl"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold shadow-lg shadow-green-500/30 w-full sm:w-auto"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: +91-88264-44334
                </Button>
              </a>

              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button
                  size="xl"
                  className="bg-[#166534] hover:bg-[#14532d] text-white font-bold shadow-lg shadow-green-500/20 w-full sm:w-auto"
                >
                  <Image
                    src="/icons/whatsapp.svg"
                    alt="WhatsApp"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  WhatsApp Us
                </Button>
              </a>
            </div>

            {/* Secondary CTAs - Book Demo */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-slate-900"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <a href="#contact-form">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Enquiry
                </Button>
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/10">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">67+</div>
                <div className="text-sm text-gray-400">NEET Selections</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/10">
                <Users className="w-8 h-8 mx-auto mb-2 text-teal-400" />
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm text-gray-400">Years Experience</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/10">
                <Star className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                <div className="text-2xl font-bold">4.9</div>
                <div className="text-sm text-gray-400">Rating</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/10">
                <Laptop className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                <div className="text-2xl font-bold">Live</div>
                <div className="text-sm text-gray-400">Online Classes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Strip */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-700 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-white">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span className="font-medium">Quick Response Within 30 Minutes</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-white/30" />
            <div className="flex items-center gap-4">
              <a
                href="tel:+918826444334"
                className="flex items-center hover:text-yellow-300 transition"
              >
                <Phone className="w-5 h-5 mr-2" />
                <span className="font-bold">+91-88264-44334</span>
              </a>
              <a
                href={WHATSAPP_URL_SIMPLE}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-yellow-300 transition"
              >
                <Image
                  src="/icons/whatsapp.svg"
                  alt="WhatsApp"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                <span className="font-bold">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={setRef('tools')}
            className={`text-center mb-12 transition-all duration-600 ${
              isVisible('tools') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <div className="inline-flex items-center bg-purple-100 px-4 py-2 rounded-full text-purple-700 text-sm font-medium mb-4">
              <Target className="w-4 h-4 mr-2" />
              FREE NEET Tools
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Our Free NEET Tools
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start your NEET preparation with our free tools - no registration required
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {freeTools.map((tool, index) => (
              <Link
                key={tool.title}
                href={tool.href}
                className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-14 h-14 ${tool.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <tool.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-gray-600 mb-4">{tool.description}</p>
                <div className="flex items-center text-teal-600 font-medium">
                  Try Now Free
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              ref={setRef('contact')}
              className={`transition-all duration-600 ${
                isVisible('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              <div className="inline-flex items-center bg-teal-100 px-4 py-2 rounded-full text-teal-700 text-sm font-medium mb-4">
                <Send className="w-4 h-4 mr-2" />
                Get In Touch
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Send Us Your Enquiry
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Fill the form and our counselor will call you back within 30 minutes to discuss the
                best options for your NEET preparation.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Free Counseling Session</p>
                    <p className="text-gray-600 text-sm">
                      Get personalized guidance for your NEET preparation
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Demo Class Access</p>
                    <p className="text-gray-600 text-sm">
                      Experience our teaching methodology before enrolling
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Study Material Sample</p>
                    <p className="text-gray-600 text-sm">
                      Get free sample notes and practice questions
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-2">Prefer to talk directly?</p>
                <div className="flex flex-wrap gap-3">
                  <a href="tel:+918826444334">
                    <Button className="bg-green-500 hover:bg-green-600 text-white">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                  </a>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-[#166534] hover:bg-[#14532d] text-white">
                      <Image
                        src="/icons/whatsapp.svg"
                        alt="WhatsApp"
                        width={16}
                        height={16}
                        className="mr-2"
                      />
                      WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-6 md:p-8 shadow-xl border border-gray-200">
              {formSuccess ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600 mb-6">
                    Our counselor will call you within 30 minutes.
                  </p>
                  <Button onClick={() => setFormSuccess(false)} variant="outline">
                    Send Another Enquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Student Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                      placeholder="Enter student name"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
                      Area in Gurugram *
                    </label>
                    <select
                      id="area"
                      required
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-white"
                    >
                      <option value="">Select your area</option>
                      {gurugramAreas.map((area) => (
                        <option key={area.name} value={area.name}>
                          {area.name}
                        </option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message (Optional)
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition resize-none"
                      placeholder="Any specific questions or requirements..."
                    />
                  </div>

                  {formError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                      {formError}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4"
                  >
                    {isSubmitting ? (
                      'Submitting...'
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Enquiry
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting, you agree to be contacted by our team.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Areas Covered */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={setRef('areas')}
            className={`text-center mb-12 transition-all duration-600 ${
              isVisible('areas') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Gurugram Areas We Serve
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Online classes available for all Gurugram localities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gurugramAreas.map((area, index) => (
              <div
                key={area.name}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 animate-fade-in-up hover:shadow-xl transition-shadow"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <MapPin className="w-8 h-8 text-teal-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{area.name}</h3>
                <p className="text-sm text-gray-500 mb-1">{area.distance} from center</p>
                <div className="flex items-center text-sm text-blue-600 mb-1">
                  <Train className="w-4 h-4 mr-1" />
                  {area.metro}
                </div>
                <p className="text-sm text-gray-400">{area.landmark}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-8 text-center border border-teal-100">
            <Laptop className="w-12 h-12 mx-auto mb-4 text-teal-600" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Online Classes Recommended for Gurugram
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Save 2-3 hours of daily commute. Our online platform offers live interactive sessions,
              recorded lectures, doubt-clearing sessions, and the same quality teaching from AIIMS
              faculty.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:+918826444334">
                <Button className="bg-green-500 hover:bg-green-600 text-white">
                  <Phone className="w-4 h-4 mr-2" />
                  Call to Know More
                </Button>
              </a>
              <a href={WHATSAPP_URL_SIMPLE} target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#166534] hover:bg-[#14532d] text-white">
                  <Image
                    src="/icons/whatsapp.svg"
                    alt="WhatsApp"
                    width={16}
                    height={16}
                    className="mr-2"
                  />
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={setRef('why')}
            className={`text-center mb-12 transition-all duration-600 ${
              isVisible('why') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Gurugram Students Choose Us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div
                key={item.title}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div
            ref={setRef('faqs')}
            className={`text-center mb-12 transition-all duration-600 ${
              isVisible('faqs') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="bg-white rounded-xl p-6 md:p-8 shadow-lg animate-fade-in-up border border-gray-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageCircle className="w-6 h-6 mr-3 text-teal-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
            ref={setRef('cta')}
            className={`transition-all duration-600 ${
              isVisible('cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Gurugram Students, Join Us <span className="text-yellow-400">Today!</span>
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Quality NEET coaching from the comfort of your home
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a href="tel:+918826444334">
                <Button
                  size="xl"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold shadow-lg w-full sm:w-auto"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: +91-88264-44334
                </Button>
              </a>

              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button
                  size="xl"
                  className="bg-[#166534] hover:bg-[#14532d] text-white font-bold shadow-lg w-full sm:w-auto"
                >
                  <Image
                    src="/icons/whatsapp.svg"
                    alt="WhatsApp"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  WhatsApp Now
                </Button>
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-slate-900"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo
                </Button>
              </Link>

              <a href="#contact-form">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-slate-900"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Enquiry
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Explore More</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/neet-biology-tutor-online"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition font-medium text-gray-700 hover:text-teal-600"
            >
              Online Classes
            </Link>
            <Link
              href="/biology-tutor-south-delhi"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition font-medium text-gray-700 hover:text-teal-600"
            >
              South Delhi
            </Link>
            <Link
              href="/biology-tutor-faridabad"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition font-medium text-gray-700 hover:text-teal-600"
            >
              Faridabad
            </Link>
            <Link
              href="/biology-tutor-noida"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition font-medium text-gray-700 hover:text-teal-600"
            >
              Noida
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom padding for mobile sticky bar */}
      <div className="h-20 md:hidden" />
    </div>
  )
}
