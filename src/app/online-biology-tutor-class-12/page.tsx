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
  Laptop,
  Clock,
  Headphones,
  FileText,
  BarChart,
  GraduationCap,
  Target,
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

const class12Topics = [
  'Reproduction in Organisms',
  'Sexual Reproduction in Flowering Plants',
  'Human Reproduction',
  'Reproductive Health',
  'Principles of Inheritance and Variation',
  'Molecular Basis of Inheritance',
  'Evolution',
  'Human Health and Disease',
  'Strategies for Enhancement in Food Production',
  'Microbes in Human Welfare',
  'Biotechnology: Principles and Processes',
  'Biotechnology and its Applications',
  'Organisms and Populations',
  'Ecosystem',
  'Biodiversity and Conservation',
  'Environmental Issues',
]

const features = [
  {
    icon: Target,
    title: 'NEET 2026 Focused',
    description: 'Intensive preparation for NEET 2026 with pattern-based teaching.',
  },
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Real-time online classes with instant doubt resolution.',
  },
  {
    icon: BookOpen,
    title: 'Board + NEET Coverage',
    description: 'Simultaneous preparation for Board exams and NEET.',
  },
  {
    icon: FileText,
    title: 'Complete Study Material',
    description: 'Digital notes, PYQs, and chapter-wise practice papers.',
  },
  {
    icon: BarChart,
    title: 'Mock Tests',
    description: 'NEET pattern mock tests with detailed analysis.',
  },
  {
    icon: Headphones,
    title: 'Doubt Support',
    description: '24/7 WhatsApp doubt resolution and revision sessions.',
  },
]

const faqs = [
  {
    question: 'How much of NEET syllabus is from Class 12?',
    answer:
      'Approximately 50% of NEET Biology questions come from Class 12. Topics like Genetics, Biotechnology, and Ecology are heavily tested. Our teaching ensures thorough coverage of all high-weightage chapters.',
  },
  {
    question: 'Can I prepare for Boards and NEET together online?',
    answer:
      'Yes! Our Class 12 online course is designed for dual preparation. We cover NCERT thoroughly (essential for Boards) while adding NEET-level practice and concepts. Most students score 90+ in Boards while preparing for NEET.',
  },
  {
    question: 'What is the course duration for Class 12 Biology?',
    answer:
      'Our Class 12 Biology course is typically 10-12 months. We recommend joining early (April-June) for complete coverage. For late joiners, we have crash courses with accelerated schedules.',
  },
  {
    question: 'Are recorded lectures available for revision?',
    answer:
      'Yes! All live classes are recorded and available for unlimited revision. This is especially helpful during Board and NEET exam preparation when you need to revise specific topics.',
  },
]

export default function OnlineBiologyTutorClass12Page() {
  const heroAnim = useScrollAnimation()
  const topicsHeaderAnim = useScrollAnimation()
  const featuresHeaderAnim = useScrollAnimation()
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
            name: 'Class 12 Biology Online Course',
            description: 'Complete Class 12 Biology for NEET 2026 & Board exams',
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
            educationalLevel: 'Class 12',
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
              <GraduationCap className="w-5 h-5 mr-2 text-yellow-400" />
              NEET 2026 + Board Exams
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Online Biology Tutor for{' '}
              <span className="text-yellow-400">Class 12</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Board Exams + NEET 2026 | Live Classes | AIIMS Faculty
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Ace Class 12 Biology with{' '}
              <strong>Dr. Shekhar C Singh, AIIMS Alumnus and former Narayana Academic Head</strong>.
              Dual preparation for Board exams and NEET 2026 in one comprehensive online course.
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

              <Link href="/courses/class-12-biology">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-green-900"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Course Details
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">16</div>
                <div className="text-sm opacity-80">Chapters</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Target className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">50%</div>
                <div className="text-sm opacity-80">NEET Weightage</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">90+</div>
                <div className="text-sm opacity-80">Avg Board Score</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm opacity-80">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={topicsHeaderAnim.ref}
            className={`text-center mb-16 transition-all duration-600 ${
              topicsHeaderAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Class 12 Biology Syllabus
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete NCERT coverage with NEET-level practice
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {class12Topics.map((topic, index) => (
              <div
                key={topic}
                className="bg-white rounded-lg p-4 shadow flex items-center animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={featuresHeaderAnim.ref}
            className={`text-center mb-16 transition-all duration-600 ${
              featuresHeaderAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Course Features
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((item, index) => (
              <div
                key={item.title}
                className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 border border-green-100 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <item.icon className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
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
              Ace Your Boards & NEET 2026!
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Join Class 12 Biology online course. Book your free demo today!
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
              href="/online-biology-tutor-class-11"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 11 Online Tutor
            </Link>
            <Link
              href="/online-biology-tutor-neet"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Online Tutor
            </Link>
            <Link
              href="/online-biology-tutor-droppers"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Dropper Course
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
