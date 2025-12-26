'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Trophy,
  Users,
  Star,
  CheckCircle,
  BookOpen,
  Video,
  MessageCircle,
  Play,
  Headphones,
  Target,
  GraduationCap,
  Zap,
  RefreshCw,
  TrendingUp,
  Clock,
  Brain,
  Heart,
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

const dropperAdvantages = [
  {
    icon: Target,
    title: 'Gap Analysis',
    description: 'We analyze your previous attempt to identify weak areas and create a personalized improvement plan.',
  },
  {
    icon: Brain,
    title: 'Concept Rebuilding',
    description: 'Complete re-teaching of concepts, not just revision. Build stronger foundations this time.',
  },
  {
    icon: Clock,
    title: 'Intensive Schedule',
    description: '5-6 hours daily with focused study. Make the most of your gap year.',
  },
  {
    icon: TrendingUp,
    title: '100+ Score Improvement',
    description: 'Our droppers consistently improve 100-150 marks from previous attempt.',
  },
  {
    icon: Heart,
    title: 'Emotional Support',
    description: 'Dedicated counseling and motivation. We understand the pressure of a second attempt.',
  },
  {
    icon: RefreshCw,
    title: 'Fresh Start Approach',
    description: 'Don\'t carry old mistakes. Learn the right way with expert guidance.',
  },
]

const scheduleFeatures = [
  'Classes 5-6 days/week, 4-5 hours daily',
  'Complete syllabus revision in 6 months',
  '4 months intensive mock test practice',
  '2 months final revision and polishing',
  'Weekly full-length mock tests',
  'Daily Practice Problems (DPPs)',
  'One-on-one doubt sessions',
  'Performance tracking dashboard',
]

const faqs = [
  {
    question: 'Is it worth taking a drop year for NEET?',
    answer:
      'If you\'re serious about becoming a doctor and didn\'t get your desired result, a focused drop year can make a huge difference. Many of our toppers were droppers who improved 100-200 marks with proper guidance. The key is finding the right mentor and staying disciplined.',
  },
  {
    question: 'How is dropper batch different from regular batch?',
    answer:
      'Our dropper batch is designed specifically for repeaters: (1) We start with gap analysis, (2) Focus on concept rebuilding, not just revision, (3) More intensive schedule (5-6 hours/day), (4) Extra mock tests, (5) Psychological support and motivation, (6) Smaller batch size for personalized attention.',
  },
  {
    question: 'What if I scored below 400 in my previous attempt?',
    answer:
      'No problem! We\'ve helped students improve from 300 to 550+ and from 400 to 600+. The key is identifying why you scored low and fixing those issues. Our gap analysis and personalized approach works for all score ranges.',
  },
  {
    question: 'How to stay motivated during drop year?',
    answer:
      'Drop year can be mentally challenging. We provide: (1) Regular counseling sessions, (2) Peer group of motivated droppers, (3) Weekly progress reviews to show improvement, (4) Parent-teacher meetings, (5) Success stories of previous droppers for inspiration.',
  },
  {
    question: 'What is the success rate for droppers?',
    answer:
      'Our dropper batch has a 95%+ success rate in NEET qualification. More importantly, 70%+ of our droppers secure government medical college seats. The key is consistent effort over 10-12 months with proper guidance.',
  },
]

export default function NEETBiologyTutorDroppersPage() {
  const heroAnim = useScrollAnimation()
  const advantagesHeaderAnim = useScrollAnimation()
  const scheduleHeaderAnim = useScrollAnimation()
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
            name: 'NEET Biology Dropper Course',
            description: 'Intensive NEET Biology coaching for droppers/repeaters',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
            },
            instructor: {
              '@type': 'Person',
              name: 'Dr. Shekhar C Singh',
              description: 'AIIMS Alumnus, Former Narayana Academic Head',
            },
            educationalLevel: 'NEET UG Repeater',
            timeRequired: 'P12M',
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
              <RefreshCw className="w-5 h-5 mr-2 text-yellow-400" />
              Second Chance, Better Result
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              NEET Biology Tutor for{' '}
              <span className="text-yellow-400">Droppers</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Intensive 1-Year Course | 100+ Score Improvement | Personal Mentoring
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Transform your NEET result with{' '}
              <strong>Dr. Shekhar C Singh, AIIMS Alumnus</strong>. Our dropper program
              has helped hundreds of students bounce back and secure medical seats.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Counseling
                </Button>
              </Link>

              <Link href="/courses/neet-dropper">
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
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">100+</div>
                <div className="text-sm opacity-80">Score Jump</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm opacity-80">Success Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">20</div>
                <div className="text-sm opacity-80">Max Batch</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Clock className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm opacity-80">Months</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={advantagesHeaderAnim.ref}
            className={`text-center mb-16 transition-all duration-600 ${
              advantagesHeaderAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Our Dropper Program Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Designed specifically for NEET repeaters with a fresh approach
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dropperAdvantages.map((item, index) => (
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

      {/* Schedule */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={scheduleHeaderAnim.ref}
            className={`text-center mb-16 transition-all duration-600 ${
              scheduleHeaderAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              12-Month Intensive Program
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 border border-green-100">
              <div className="flex items-center mb-6">
                <Zap className="w-10 h-10 text-green-600 mr-4" />
                <h3 className="text-xl font-bold text-gray-900">Program Features</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {scheduleFeatures.map((feature, index) => (
                  <div
                    key={feature}
                    className="flex items-center animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
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
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Your Second Chance Starts Here!
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Join our dropper batch. Transform your NEET result!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Free Counseling
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
              href="/online-biology-tutor-droppers"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Online Dropper Course
            </Link>
            <Link
              href="/courses/neet-dropper"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Course Details
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
