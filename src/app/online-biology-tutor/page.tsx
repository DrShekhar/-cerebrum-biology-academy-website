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
  ArrowRight,
  Laptop,
  Globe,
  Clock,
  Headphones,
  FileText,
  BarChart,
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

const onlineFeatures = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description:
      'Real-time classes with two-way communication. Ask questions instantly and get immediate answers.',
  },
  {
    icon: Laptop,
    title: 'Learn from Anywhere',
    description:
      'Study from the comfort of your home. No travel time, no commute hassle. Just focused learning.',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description:
      'Morning and evening batches available. Choose timing that suits your schedule best.',
  },
  {
    icon: Headphones,
    title: '24/7 Doubt Support',
    description:
      'WhatsApp doubt resolution, recorded lectures, and dedicated doubt clearing sessions.',
  },
  {
    icon: FileText,
    title: 'Digital Study Material',
    description:
      'Comprehensive notes, PDFs, practice questions, and NCERT solutions delivered digitally.',
  },
  {
    icon: BarChart,
    title: 'Progress Tracking',
    description:
      'AI-powered analytics to track your progress, identify weak areas, and improve systematically.',
  },
]

const coursesOffered = [
  { name: 'NEET 2026 Biology Crash Course', duration: '3 Months' },
  { name: 'NEET 2026 Dropper Course', duration: '1 Year' },
  { name: 'Class 11 Biology (NEET + Boards)', duration: '1 Year' },
  { name: 'Class 12 Biology (NEET + Boards)', duration: '1 Year' },
  { name: 'Class 9-10 Foundation', duration: '1 Year' },
  { name: 'Biology Olympiad Coaching', duration: '6 Months' },
]

const faqs = [
  {
    question: 'How do online biology classes work?',
    answer:
      'Our online classes are conducted live via Zoom/Google Meet. You join the class, interact with the teacher in real-time, ask questions, and participate in discussions. All classes are also recorded for revision.',
  },
  {
    question: 'Who teaches online biology at Cerebrum Academy?',
    answer:
      'Our online classes are led by Dr. Shekhar C Singh, AIIMS Alumnus and former Narayana Academic Head, along with a team of experienced biology educators. You get the same quality teaching online as offline.',
  },
  {
    question: 'What technology do I need for online classes?',
    answer:
      'A smartphone, tablet, or laptop with stable internet connection (minimum 2 Mbps). We recommend using a laptop for better experience. Our platform works on all devices.',
  },
  {
    question: 'Are online classes as effective as offline classes?',
    answer:
      'Absolutely! Our online students have achieved similar results to offline students. In fact, many students prefer online due to saved travel time and ability to rewatch recordings.',
  },
  {
    question: 'Do you provide study material for online students?',
    answer:
      'Yes, all online students receive comprehensive digital study material including notes, NCERT solutions, previous year papers, and practice questions via our student portal.',
  },
  {
    question: 'What is the batch size for online classes?',
    answer:
      'We maintain small batches of maximum 25 students even for online classes to ensure personalized attention and interaction with each student.',
  },
]

export default function OnlineBiologyTutorPage() {
  const heroAnim = useScrollAnimation()
  const featuresHeaderAnim = useScrollAnimation()
  const coursesHeaderAnim = useScrollAnimation()
  const whyChooseHeaderAnim = useScrollAnimation()
  const faqsHeaderAnim = useScrollAnimation()
  const ctaAnim = useScrollAnimation()

  return (
    <div className="min-h-screen">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      {/* Course Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'Online Biology Tuition',
            description:
              'Live interactive online biology classes for NEET, Class 11-12, and Board exams by AIIMS faculty',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            instructor: {
              '@type': 'Person',
              name: 'Dr. Shekhar C Singh',
              description: 'AIIMS Alumnus, Former Narayana Academic Head',
            },
            courseMode: 'online',
            educationalLevel: 'High School',
          }),
        }}
      />

      {/* Hero Section */}
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
              <Globe className="w-5 h-5 mr-2 text-yellow-400" />
              Learn from Anywhere in India
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-400">Online Biology Tutor</span> in India
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Live Interactive Classes | AIIMS Faculty | 98% Success Rate
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Learn NEET Biology from{' '}
              <strong>Dr. Shekhar C Singh, AIIMS Alumnus and former Narayana Academic Head</strong>.
              Live online classes with personalized attention, doubt resolution, and comprehensive
              study material.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Online Demo
                </Button>
              </Link>

              <Link href="/courses">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-green-900"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Online Courses
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">5000+</div>
                <div className="text-sm opacity-80">Students Trained</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">4.9/5</div>
                <div className="text-sm opacity-80">Student Rating</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Globe className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">Pan-India</div>
                <div className="text-sm opacity-80">Coverage</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm opacity-80">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Online Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={featuresHeaderAnim.ref}
            className={`text-center mb-16 transition-all duration-600 ${
              featuresHeaderAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Online Biology Tuition?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience world-class biology coaching from the comfort of your home
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {onlineFeatures.map((item, index) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow animate-fade-in-up"
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

      {/* Courses Offered */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={coursesHeaderAnim.ref}
            className={`text-center mb-16 transition-all duration-600 ${
              coursesHeaderAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Online Biology Courses
            </h2>
            <p className="text-xl text-gray-600">Choose the course that fits your needs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {coursesOffered.map((course, index) => (
              <div
                key={course.name}
                className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border-2 border-green-100 hover:border-green-300 transition-colors animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <BookOpen className="w-8 h-8 text-green-600" />
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    {course.duration}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">{course.name}</h3>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/courses">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                View All Courses <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={whyChooseHeaderAnim.ref}
            className={`text-center mb-16 transition-all duration-600 ${
              whyChooseHeaderAnim.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              The Cerebrum Advantage
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What You Get</h3>
              <ul className="space-y-4">
                {[
                  'Live interactive classes with Dr. Shekhar C Singh',
                  'AIIMS-trained faculty team',
                  'Small batch size (max 25 students)',
                  'Recorded lectures for revision',
                  'Digital study material & notes',
                  'Weekly tests with detailed analysis',
                  'WhatsApp doubt support',
                  'Parent progress updates',
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Results</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">NEET Success Rate</span>
                    <span className="text-green-600 font-bold">98%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-green-600 h-3 rounded-full" style={{ width: '98%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Student Satisfaction</span>
                    <span className="text-green-600 font-bold">4.9/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-green-600 h-3 rounded-full" style={{ width: '98%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Medical College Selections</span>
                    <span className="text-green-600 font-bold">500+</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-green-600 h-3 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Students Trained</span>
                    <span className="text-green-600 font-bold">5000+</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-green-600 h-3 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div
            ref={faqsHeaderAnim.ref}
            className={`text-center mb-16 transition-all duration-600 ${
              faqsHeaderAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-green-700 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
            ref={ctaAnim.ref}
            className={`transition-all duration-600 ${
              ctaAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Start Your Online Biology Journey Today!
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Join thousands of successful students. Book your free online demo class!
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

      {/* Related Pages */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Explore More</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/online-biology-tutor-neet"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Online NEET Biology Tutor
            </Link>
            <Link
              href="/online-biology-tutor-class-11"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 11 Online Tutor
            </Link>
            <Link
              href="/online-biology-tutor-class-12"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 12 Online Tutor
            </Link>
            <Link
              href="/neet-biology-tutor"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Biology Tutor
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
