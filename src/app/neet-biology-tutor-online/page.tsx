'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Trophy,
  Users,
  CheckCircle,
  BookOpen,
  Video,
  MessageCircle,
  Play,
  Headphones,
  FileText,
  Laptop,
  Clock,
  Globe,
  Wifi,
  Download,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      { threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

const onlineAdvantages = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Real-time sessions with instant doubt clearing, not pre-recorded videos.',
  },
  {
    icon: Download,
    title: 'Recorded Lectures',
    description: 'Access all class recordings anytime for revision. Never miss a lecture.',
  },
  {
    icon: Globe,
    title: 'Learn from Anywhere',
    description: 'Join from any city in India. All you need is a stable internet connection.',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Multiple batch options - morning, evening, and weekend batches available.',
  },
  {
    icon: FileText,
    title: 'Digital Study Material',
    description: 'Complete notes, PYQs, and practice tests delivered digitally.',
  },
  {
    icon: Headphones,
    title: '24/7 Doubt Support',
    description: 'Dedicated WhatsApp group for instant doubt resolution anytime.',
  },
]

const techRequirements = [
  'Laptop/Desktop or Tablet (10" recommended)',
  'Stable Internet Connection (5 Mbps+)',
  'Headphones with Microphone',
  'Zoom App Installed',
  'Notebook for Hand-written Notes',
]

const faqs = [
  {
    question: 'How do online NEET Biology classes work?',
    answer:
      'Our online classes are conducted live via Zoom. You join at the scheduled time, see the teacher and whiteboard, ask questions in real-time, and participate in discussions. All sessions are recorded for later revision. We also provide digital notes, DPPs, and regular tests.',
  },
  {
    question: 'Are online classes as effective as offline coaching?',
    answer:
      'Yes! Our online students perform equally well or better than offline students. Online learning offers advantages like recorded lectures, flexible timing, saved commute time, and personalized attention in small batches. Many of our NEET top scorers studied online.',
  },
  {
    question: 'What if I miss a live class?',
    answer:
      'No worries! All live classes are recorded and available within 2 hours. You can watch at your convenience and catch up. If you have doubts after watching, post them in the WhatsApp group for resolution.',
  },
  {
    question: 'How is doubt clearing done in online classes?',
    answer:
      'Multiple channels: (1) Ask during live class, (2) Post in dedicated WhatsApp doubt group, (3) Weekly doubt clearing sessions, (4) One-on-one sessions for complex topics. Our average doubt resolution time is under 30 minutes.',
  },
  {
    question: 'Do you provide study material for online students?',
    answer:
      'Yes! Complete digital study material including chapter-wise notes, DPPs, previous year questions (10 years), mock tests, and quick revision notes. All accessible through our student portal.',
  },
]

export default function NEETBiologyTutorOnlinePage() {
  const heroAnim = useScrollAnimation()
  const advantagesHeaderAnim = useScrollAnimation()
  const requirementsHeaderAnim = useScrollAnimation()
  const faqsHeaderAnim = useScrollAnimation()
  const ctaAnim = useScrollAnimation()

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'NEET Biology Online Course',
            description: 'Live online NEET Biology coaching by AIIMS Faculty',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
            },
            instructor: {
              '@type': 'Person',
              name: 'Dr. Shekhar C Singh',
              description: 'AIIMS Alumnus, Former Narayana Academic Head',
            },
            courseMode: 'online',
            educationalLevel: 'NEET UG',
            deliveryMethod: 'LiveOnlineClass',
          }),
        }}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div
            ref={heroAnim.ref}
            className={`text-center max-w-4xl mx-auto transition-all duration-700 ${
              heroAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Laptop className="w-5 h-5 mr-2 text-yellow-400" />
              Live Online NEET Classes
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              NEET Biology Tutor <span className="text-yellow-400">Online</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Live Interactive Classes | AIIMS Faculty | Join from Anywhere
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Get world-class NEET Biology coaching online with{' '}
              <strong>Dr. Shekhar C Singh, AIIMS Alumnus</strong>. Live interactive classes
              accessible from any city in India with the same quality as premier offline coaching.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo
                </Button>
              </Link>

              <Link href="/courses/intensive-neet-biology">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-green-900"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Course Details
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Video className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">Live</div>
                <div className="text-sm opacity-80">Interactive</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Globe className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">100+</div>
                <div className="text-sm opacity-80">Cities</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">25</div>
                <div className="text-sm opacity-80">Max Batch</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm opacity-80">Success</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Online Advantages */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={advantagesHeaderAnim.ref}
            className={`text-center mb-16 transition-all duration-600 ${
              advantagesHeaderAnim.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Online Classes?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              All the benefits of premium coaching, accessible from your home
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {onlineAdvantages.map((item, index) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Requirements */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={requirementsHeaderAnim.ref}
            className={`text-center mb-16 transition-all duration-600 ${
              requirementsHeaderAnim.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">What You Need</h2>
            <p className="text-xl text-gray-600">Simple setup for seamless learning</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 border border-green-100">
              <div className="flex items-center mb-6">
                <Wifi className="w-10 h-10 text-green-600 mr-4" />
                <h3 className="text-xl font-bold text-gray-900">Technical Requirements</h3>
              </div>
              <ul className="space-y-4">
                {techRequirements.map((req, index) => (
                  <li
                    key={req}
                    className="flex items-center animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div
            ref={faqsHeaderAnim.ref}
            className={`text-center mb-16 transition-all duration-600 ${
              faqsHeaderAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">FAQs</h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="bg-white rounded-xl p-8 shadow-lg animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageCircle className="w-6 h-6 mr-3 text-green-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-green-700 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
            ref={ctaAnim.ref}
            className={`transition-all duration-600 ${
              ctaAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Start Learning Online Today!</h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Join from anywhere in India. Book your free demo class!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo
                </Button>
              </Link>

              <a href="tel:+918826444334">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-green-700"
                >
                  <Headphones className="w-5 h-5 mr-2" />
                  Call: +91-88264-44334
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Explore More</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/neet-biology-tutor"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Biology Tutor
            </Link>
            <Link
              href="/online-biology-tutor-neet"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Online Biology Tutor NEET
            </Link>
            <Link
              href="/best-online-biology-tutor-india"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Best Online Tutor India
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
