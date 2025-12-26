'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  MessageCircle,
  Clock,
  Users,
  Video,
  CheckCircle,
  Star,
  ArrowRight,
  BookOpen,
  Brain,
  Zap,
  Phone,
  MessageSquare,
  HelpCircle,
  Sparkles,
  Target,
  Award,
  Lightbulb,
} from 'lucide-react'
import { Footer } from '@/components/layout/Footer'

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'How quickly can I get my doubts resolved?',
    answer:
      'Most doubts are resolved within 2-4 hours during active hours (8 AM - 10 PM IST). Complex questions requiring detailed explanations may take up to 24 hours. Live sessions offer real-time doubt clearing.',
  },
  {
    question: 'Can I ask doubts about any biology topic?',
    answer:
      'Yes! Our faculty covers all NEET Biology topics including Botany, Zoology, Human Physiology, Genetics, Ecology, and more. We also help with NCERT textbook problems and previous year questions.',
  },
  {
    question: 'Is there a limit on the number of doubts I can ask?',
    answer:
      'Free users can ask up to 5 doubts per month. Enrolled students have unlimited doubt resolution access through WhatsApp, live sessions, and our dedicated doubt portal.',
  },
  {
    question: 'Who resolves the doubts?',
    answer:
      'All doubts are resolved by Dr. Shekhar C Singh (AIIMS graduate) and our team of expert faculty members. Each faculty member has extensive NEET teaching experience.',
  },
  {
    question: 'Can I get video explanations for complex topics?',
    answer:
      'Yes! Our faculty members provide video explanations for complex topics. Premium students also get access to weekly live doubt-clearing sessions with screen sharing.',
  },
]

const doubtChannels = [
  {
    icon: MessageSquare,
    title: 'WhatsApp Doubt Support',
    description: 'Send your doubts directly on WhatsApp with images of the question',
    response: '2-4 hours',
    features: ['Image support', 'Voice notes', 'Quick responses'],
    cta: 'Chat Now',
    href: 'https://wa.me/918826444334?text=Hi%2C%20I%20have%20a%20biology%20doubt',
    highlight: true,
  },
  {
    icon: Video,
    title: 'Live Doubt Sessions',
    description: 'Join weekly live sessions with Dr. Shekhar for real-time doubt clearing',
    response: 'Real-time',
    features: ['Screen sharing', 'Interactive Q&A', 'Recorded sessions'],
    cta: 'View Schedule',
    href: '/demo-booking',
    highlight: false,
  },
  {
    icon: MessageCircle,
    title: 'AI-Powered Quick Help',
    description: 'Get instant answers to common NEET biology questions using our AI assistant',
    response: 'Instant',
    features: ['24/7 available', 'NCERT aligned', 'Practice questions'],
    cta: 'Ask AI',
    href: '/ai-tutor',
    highlight: false,
  },
]

const stats = [
  { value: '50,000+', label: 'Doubts Resolved' },
  { value: '< 4 hrs', label: 'Avg Response Time' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '24/7', label: 'AI Support' },
]

const subjectCategories = [
  {
    name: 'Botany',
    topics: [
      'Plant Morphology',
      'Plant Anatomy',
      'Cell Biology',
      'Plant Physiology',
      'Plant Reproduction',
    ],
    icon: '🌱',
  },
  {
    name: 'Zoology',
    topics: [
      'Animal Kingdom',
      'Structural Organization',
      'Animal Physiology',
      'Animal Reproduction',
      'Evolution',
    ],
    icon: '🦋',
  },
  {
    name: 'Human Physiology',
    topics: [
      'Digestion',
      'Breathing',
      'Body Fluids',
      'Excretion',
      'Neural Control',
      'Chemical Coordination',
    ],
    icon: '🫀',
  },
  {
    name: 'Genetics & Biotechnology',
    topics: [
      'Molecular Basis of Inheritance',
      'Principles of Inheritance',
      'Biotechnology',
      'Human Health',
    ],
    icon: '🧬',
  },
  {
    name: 'Ecology & Environment',
    topics: ['Organisms & Populations', 'Ecosystem', 'Biodiversity', 'Environmental Issues'],
    icon: '🌍',
  },
]

export default function DoubtResolutionPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 mr-2 text-yellow-300" />
              <span className="text-sm font-medium">Expert Faculty Available Now</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Get Your Biology
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Doubts Resolved
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Stuck on a concept? Our expert faculty led by Dr. Shekhar C Singh (AIIMS graduate)
              provides personalized doubt resolution to help you master NEET Biology.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a
                href="https://wa.me/918826444334?text=Hi%2C%20I%20have%20a%20biology%20doubt"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-green-600 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Ask on WhatsApp
              </a>
              <Link
                href="/demo-booking"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-full font-bold text-lg transition-all border border-white/30"
              >
                <Video className="w-5 h-5 mr-2" />
                Join Live Session
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6">
                  <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Doubt Resolution Channels */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Multiple Ways to Get Help
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the doubt resolution method that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {doubtChannels.map((channel, index) => (
              <div
                key={index}
                className={`relative rounded-2xl p-8 transition-all hover:shadow-xl ${
                  channel.highlight
                    ? 'bg-green-50 border-2 border-green-200'
                    : 'bg-gray-50 border border-gray-100'
                }`}
              >
                {channel.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                    channel.highlight ? 'bg-green-600 text-white' : 'bg-blue-100 text-blue-600'
                  }`}
                >
                  <channel.icon className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{channel.title}</h3>
                <p className="text-gray-600 mb-4">{channel.description}</p>

                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Clock className="w-4 h-4 mr-2" />
                  Response: <span className="font-semibold ml-1">{channel.response}</span>
                </div>

                <ul className="space-y-2 mb-6">
                  {channel.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={channel.href}
                  target={channel.href.startsWith('http') ? '_blank' : '_self'}
                  rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all ${
                    channel.highlight
                      ? 'bg-green-600 hover:bg-green-600 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {channel.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subject Categories */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Topics We Cover</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get expert help on any NEET Biology topic from Class 11 and 12
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjectCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer"
                onClick={() =>
                  setSelectedSubject(selectedSubject === category.name ? null : category.name)
                }
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-3xl mr-3">{category.icon}</span>
                    <h3 className="text-lg font-bold text-gray-900">{category.name}</h3>
                  </div>
                  <ArrowRight
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      selectedSubject === category.name ? 'rotate-90' : ''
                    }`}
                  />
                </div>

                {selectedSubject === category.name && (
                  <div className="pt-4 border-t border-gray-100">
                    <ul className="space-y-2">
                      {category.topics.map((topic, i) => (
                        <li
                          key={i}
                          className="flex items-center text-sm text-gray-600 hover:text-blue-600"
                        >
                          <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={`https://wa.me/918826444334?text=Hi%2C%20I%20have%20a%20doubt%20in%20${encodeURIComponent(category.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center text-sm font-semibold text-green-600 hover:text-green-700"
                    >
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Ask Doubt in {category.name}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get your doubts resolved in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: HelpCircle,
                title: 'Ask Your Doubt',
                description:
                  'Send your doubt via WhatsApp with an image of the question or describe your confusion clearly.',
              },
              {
                step: '02',
                icon: Brain,
                title: 'Expert Analysis',
                description:
                  'Our faculty analyzes your doubt and prepares a comprehensive, easy-to-understand explanation.',
              },
              {
                step: '03',
                icon: Lightbulb,
                title: 'Get Solution',
                description:
                  'Receive detailed solution with concepts, diagrams, and related practice questions.',
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-gray-100 absolute -top-4 left-0">
                  {item.step}
                </div>
                <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 pt-12 border border-gray-100">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>

                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Faculty */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Learn From the Best
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Your doubts are resolved by Dr. Shekhar C Singh, AIIMS graduate with 14+ years of
                NEET teaching experience. Our faculty team includes experts from top medical
                colleges.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  'AIIMS & JIPMER qualified faculty',
                  'Personalized explanations with diagrams',
                  'Focus on conceptual clarity',
                  'PYQ pattern-based solutions',
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/about/dr-shekhar"
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700"
              >
                Know more about Dr. Shekhar
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  DS
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900">Dr. Shekhar C Singh</h3>
                  <p className="text-gray-600">MBBS, AIIMS New Delhi</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-semibold text-gray-900">14+ Years</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Students Taught</span>
                  <span className="font-semibold text-gray-900">10,000+</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">NEET Selections</span>
                  <span className="font-semibold text-gray-900">1,500+</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-semibold text-gray-900 ml-1">4.9/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about doubt resolution
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100"
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                  <span
                    className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  >
                    <ArrowRight className="w-4 h-4 rotate-90" />
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <MessageCircle className="w-16 h-16 text-white/80 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Still Have Questions?</h2>
          <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
            Don't let doubts hold you back. Send your question now and get expert help from our
            faculty team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/918826444334?text=Hi%2C%20I%20have%20a%20biology%20doubt"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-50 transition-all"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              WhatsApp Now
            </a>
            <a
              href="tel:+918826444334"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call: +91 88264-44334
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
