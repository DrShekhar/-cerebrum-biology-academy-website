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
  Clock,
  Headphones,
  FileText,
  BarChart,
  GraduationCap,
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

const class11Topics = [
  'The Living World & Biological Classification',
  'Plant Kingdom & Animal Kingdom',
  'Morphology of Flowering Plants',
  'Anatomy of Flowering Plants',
  'Structural Organisation in Animals',
  'Cell: The Unit of Life',
  'Biomolecules',
  'Cell Cycle and Cell Division',
  'Transport in Plants',
  'Mineral Nutrition & Photosynthesis',
  'Respiration in Plants',
  'Plant Growth and Development',
  'Digestion and Absorption',
  'Breathing and Exchange of Gases',
  'Body Fluids and Circulation',
  'Excretory Products and Elimination',
  'Locomotion and Movement',
  'Neural Control and Coordination',
  'Chemical Coordination and Integration',
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Real-time online classes with instant doubt resolution and discussion.',
  },
  {
    icon: BookOpen,
    title: 'NCERT + NEET Focus',
    description: 'Complete NCERT coverage with NEET-oriented teaching from Day 1.',
  },
  {
    icon: FileText,
    title: 'Digital Notes',
    description: 'Comprehensive chapter-wise notes and practice questions delivered online.',
  },
  {
    icon: BarChart,
    title: 'Weekly Tests',
    description: 'Regular assessments with detailed performance analysis and feedback.',
  },
  {
    icon: Clock,
    title: 'Recorded Lectures',
    description: 'Access recorded classes anytime for revision and missed sessions.',
  },
  {
    icon: Headphones,
    title: 'Doubt Support',
    description: '24/7 WhatsApp doubt resolution with dedicated mentors.',
  },
]

const faqs = [
  {
    question: 'What is covered in Class 11 Biology online classes?',
    answer:
      'Complete Class 11 NCERT Biology syllabus including all chapters from Unit 1 (Diversity) to Unit 5 (Human Physiology). Our teaching is aligned for both Board exams and NEET preparation from the beginning.',
  },
  {
    question: 'How are online classes for Class 11 different from offline?',
    answer:
      'Our online classes maintain the same quality with live interaction, but add benefits like recorded lectures, flexible timing, and digital study material. Many students find online learning more efficient due to saved travel time.',
  },
  {
    question: 'Is Class 11 important for NEET?',
    answer:
      'Absolutely! Nearly 50% of NEET Biology questions come from Class 11 syllabus. Topics like Cell Biology, Plant Physiology, and Human Physiology are heavily tested. Strong Class 11 foundation is crucial for NEET success.',
  },
  {
    question: 'What is the batch size for online classes?',
    answer:
      'We maintain small batches of maximum 25 students even for online classes to ensure personalized attention. Each student gets individual doubt resolution and performance tracking.',
  },
]

export default function OnlineBiologyTutorClass11Page() {
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
            name: 'Class 11 Biology Online Course',
            description: 'Complete Class 11 Biology for NEET & Board exams',
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
            educationalLevel: 'Class 11',
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
              Class 11 Foundation for NEET
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Online Biology Tutor for <span className="text-yellow-400">Class 11</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              NCERT + NEET Focused | Live Classes | Expert Faculty
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Build a strong Class 11 Biology foundation with{' '}
              <strong>Dr. Shekhar C Singh, AIIMS Alumnus</strong>. Our online classes prepare you
              for both Board exams and NEET from Day 1.
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

              <Link href="/courses/class-11-biology">
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
                <div className="text-2xl font-bold">19</div>
                <div className="text-sm opacity-80">Chapters</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Video className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">Live</div>
                <div className="text-sm opacity-80">Interactive</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">25</div>
                <div className="text-sm opacity-80">Max Batch Size</div>
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

      {/* Topics Covered */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={topicsHeaderAnim.ref}
            className={`text-center mb-16 transition-all duration-600 ${
              topicsHeaderAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Class 11 Biology Syllabus Covered
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete NCERT coverage with NEET-oriented teaching
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {class11Topics.map((topic, index) => (
              <div
                key={topic}
                className="bg-white rounded-lg p-4 shadow flex items-center animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{topic}</span>
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
              What You Get in Online Classes
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
              Start Your Class 11 Biology Journey!
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Build strong foundation for NEET. Book your free demo today!
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
              href="/online-biology-tutor-class-12"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 12 Online Tutor
            </Link>
            <Link
              href="/online-biology-tutor-neet"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Online Tutor
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
