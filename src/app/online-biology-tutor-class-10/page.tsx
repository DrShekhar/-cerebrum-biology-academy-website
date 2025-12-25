'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Users,
  Star,
  CheckCircle,
  BookOpen,
  Video,
  MessageCircle,
  Play,
  Headphones,
  FileText,
  BarChart,
  GraduationCap,
  Target,
  Award,
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

const class10Topics = [
  'Life Processes',
  'Control and Coordination',
  'How do Organisms Reproduce?',
  'Heredity and Evolution',
  'Our Environment',
  'Management of Natural Resources',
]

const features = [
  {
    icon: Award,
    title: 'Board Exam Excellence',
    description: 'Score 95+ in Biology with our focused Board exam preparation.',
  },
  {
    icon: Target,
    title: 'NEET Foundation',
    description: 'Build strong foundation for NEET while preparing for Boards.',
  },
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Engaging online sessions with real-time doubt resolution.',
  },
  {
    icon: FileText,
    title: 'Complete Study Material',
    description: 'Notes, important questions, and previous year papers.',
  },
  {
    icon: BarChart,
    title: 'Regular Tests',
    description: 'Chapter-wise tests and mock exams for Board preparation.',
  },
  {
    icon: Headphones,
    title: 'Doubt Support',
    description: 'WhatsApp doubt resolution and dedicated mentoring.',
  },
]

const faqs = [
  {
    question: 'Why is Class 10 Biology important?',
    answer:
      'Class 10 Biology covers Life Processes, Genetics, and Environment - all foundational for Class 11-12 and NEET. Topics like Heredity and Evolution directly connect to NEET syllabus. Strong Class 10 foundation ensures smoother transition to higher classes.',
  },
  {
    question: 'How to score 95+ in Class 10 Biology?',
    answer:
      'Focus on NCERT diagrams, understand concepts deeply, practice previous year questions, and write answers in proper format. Our online course covers all these aspects with regular practice and feedback.',
  },
  {
    question: 'Is online coaching effective for Class 10 Board exams?',
    answer:
      'Absolutely! Our online students have scored 95+ in Boards. The advantage is recorded lectures for revision, flexible timing, and personal attention in small batches.',
  },
  {
    question: 'What is the batch timing for Class 10 online classes?',
    answer:
      'We offer multiple batches - morning (before school), evening (after school), and weekend batches. Choose what suits your schedule best. Contact us for current batch timings.',
  },
]

export default function OnlineBiologyTutorClass10Page() {
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
            name: 'Class 10 Biology Online Course',
            description: 'Class 10 Biology for Board exams and NEET foundation',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
            },
            courseMode: 'online',
            educationalLevel: 'Class 10',
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
              Board Exams + NEET Foundation
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Online Biology Tutor for{' '}
              <span className="text-yellow-400">Class 10</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Board Exam Preparation | NEET Foundation | Live Classes
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Excel in Class 10 Board exams while building foundation for NEET. Our online classes
              prepare you for both with NCERT-focused teaching and systematic practice.
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

              <Link href="/courses/class-10-biology">
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
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">6</div>
                <div className="text-sm opacity-80">Chapters</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Award className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">95+</div>
                <div className="text-sm opacity-80">Avg Score</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">25</div>
                <div className="text-sm opacity-80">Max Batch</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">4.9/5</div>
                <div className="text-sm opacity-80">Rating</div>
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
              Class 10 Biology Chapters
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {class10Topics.map((topic, index) => (
              <div
                key={topic}
                className="bg-white rounded-lg p-6 shadow flex items-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CheckCircle className="w-6 h-6 text-green-600 mr-4 flex-shrink-0" />
                <span className="text-gray-800 font-medium">{topic}</span>
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
              What You Get
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
              Ace Your Board Exams!
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Score 95+ in Class 10 Biology. Book your free demo today!
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
              href="/online-biology-tutor-class-9"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 9 Online Tutor
            </Link>
            <Link
              href="/online-biology-tutor-class-11"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 11 Online Tutor
            </Link>
            <Link
              href="/online-biology-tutor"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Online Biology Tutor
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
