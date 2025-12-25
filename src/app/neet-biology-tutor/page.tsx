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
  FileText,
  BarChart,
  GraduationCap,
  Target,
  Award,
  Brain,
  Microscope,
  Dna,
  FlaskConical,
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

const neetSyllabus = [
  { unit: 'Diversity in Living World', chapters: 4, weightage: '14%' },
  { unit: 'Structural Organisation', chapters: 4, weightage: '5%' },
  { unit: 'Cell Structure & Function', chapters: 4, weightage: '9%' },
  { unit: 'Plant Physiology', chapters: 5, weightage: '6%' },
  { unit: 'Human Physiology', chapters: 7, weightage: '20%' },
  { unit: 'Reproduction', chapters: 4, weightage: '9%' },
  { unit: 'Genetics & Evolution', chapters: 4, weightage: '18%' },
  { unit: 'Biology in Human Welfare', chapters: 3, weightage: '9%' },
  { unit: 'Biotechnology', chapters: 2, weightage: '4%' },
  { unit: 'Ecology & Environment', chapters: 4, weightage: '6%' },
]

const whyChoose = [
  {
    icon: GraduationCap,
    title: 'AIIMS Faculty',
    description: 'Learn from Dr. Shekhar C Singh, AIIMS Alumnus with 15+ years of NEET expertise.',
  },
  {
    icon: Trophy,
    title: '98% Success Rate',
    description: '5000+ students trained with consistent top results in NEET Biology.',
  },
  {
    icon: Target,
    title: 'NEET-Focused Teaching',
    description: 'Pattern-based approach with focus on high-weightage topics and MCQ strategy.',
  },
  {
    icon: Brain,
    title: 'Conceptual Clarity',
    description: 'Deep understanding of concepts, not rote memorization. Learn the "why" behind facts.',
  },
  {
    icon: BarChart,
    title: 'Regular Assessment',
    description: 'Weekly tests, full-length mocks, and detailed performance analysis.',
  },
  {
    icon: Headphones,
    title: '24/7 Doubt Support',
    description: 'Dedicated WhatsApp group for instant doubt resolution anytime.',
  },
]

const faqs = [
  {
    question: 'What makes a good NEET Biology tutor?',
    answer:
      'A good NEET Biology tutor should have: (1) Deep subject knowledge with medical background, (2) Understanding of NEET exam pattern and weightage, (3) Ability to explain complex concepts simply, (4) Regular testing and feedback system, and (5) Proven track record of results. Dr. Shekhar Singh, AIIMS Alumnus, brings all these qualities with 15+ years of experience.',
  },
  {
    question: 'How important is Biology in NEET?',
    answer:
      'Biology is the most important subject in NEET with 90 questions (360 marks out of 720). It includes Botany (45 questions) and Zoology (45 questions). A strong Biology score is essential for NEET success as it carries 50% weightage.',
  },
  {
    question: 'What is the NEET Biology syllabus?',
    answer:
      'NEET Biology syllabus covers Class 11 and 12 NCERT - 10 units including Diversity, Cell Biology, Plant & Human Physiology, Reproduction, Genetics, Evolution, Biotechnology, and Ecology. High-weightage topics include Human Physiology (20%), Genetics (18%), and Diversity (14%).',
  },
  {
    question: 'How to score 350+ in NEET Biology?',
    answer:
      'To score 350+ in NEET Biology: (1) Master NCERT thoroughly including diagrams, (2) Focus on high-weightage chapters, (3) Practice 5000+ MCQs, (4) Solve previous year questions (10 years), (5) Take regular mock tests, and (6) Get expert guidance for doubt resolution.',
  },
  {
    question: 'Do you offer both online and offline NEET Biology coaching?',
    answer:
      'Yes! We offer both online and offline coaching. Online classes have live interactive sessions with recorded lectures for revision. Offline classes are available at our center in Greater Noida. Both formats include the same quality teaching and study material.',
  },
]

export default function NEETBiologyTutorPage() {
  const heroAnim = useScrollAnimation()
  const syllabusHeaderAnim = useScrollAnimation()
  const whyChooseHeaderAnim = useScrollAnimation()
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
            name: 'NEET Biology Coaching',
            description: 'Expert NEET Biology coaching by AIIMS Faculty',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
            },
            instructor: {
              '@type': 'Person',
              name: 'Dr. Shekhar C Singh',
              description: 'AIIMS Alumnus, Former Narayana Academic Head',
              alumniOf: 'AIIMS',
            },
            educationalLevel: 'NEET UG',
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: ['online', 'onsite'],
            },
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
              <Microscope className="w-5 h-5 mr-2 text-yellow-400" />
              Expert NEET Biology Coaching
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              NEET Biology <span className="text-yellow-400">Tutor</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              AIIMS Faculty | 98% Success Rate | 5000+ Students Trained
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Master NEET Biology with{' '}
              <strong>Dr. Shekhar C Singh, AIIMS Alumnus and former Narayana Academic Head</strong>.
              Comprehensive coaching covering all 38 NCERT chapters with expert guidance.
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

              <Link href="/courses/neet-biology">
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
                <Dna className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">90</div>
                <div className="text-sm opacity-80">Questions</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Target className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">360</div>
                <div className="text-sm opacity-80">Marks</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm opacity-80">Success</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">5000+</div>
                <div className="text-sm opacity-80">Students</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Syllabus */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={syllabusHeaderAnim.ref}
            className={`text-center mb-16 transition-all duration-600 ${
              syllabusHeaderAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              NEET Biology Syllabus & Weightage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete coverage of all 10 units with focus on high-weightage topics
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {neetSyllabus.map((unit, index) => (
              <div
                key={unit.unit}
                className="bg-white rounded-lg p-5 shadow-md animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
                    {unit.weightage}
                  </span>
                  <span className="text-gray-400 text-sm">{unit.chapters} ch</span>
                </div>
                <h3 className="text-sm font-semibold text-gray-900">{unit.unit}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={whyChooseHeaderAnim.ref}
            className={`text-center mb-16 transition-all duration-600 ${
              whyChooseHeaderAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Our NEET Biology Coaching
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChoose.map((item, index) => (
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
              Start Your NEET Journey Today!
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Learn from AIIMS Faculty. Score 350+ in NEET Biology!
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
              href="/neet-biology-tutor-online"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Online Tutor
            </Link>
            <Link
              href="/best-neet-biology-tutor-delhi-ncr"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Tutor Delhi NCR
            </Link>
            <Link
              href="/neet-biology-tutor-for-droppers"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Tutor for Droppers
            </Link>
            <Link
              href="/courses/neet-biology"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
