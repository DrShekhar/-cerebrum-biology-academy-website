'use client'

import {
  Trophy,
  Users,
  Star,
  CheckCircle,
  Award,
  BookOpen,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  Target,
  Dna,
  Leaf,
  Heart,
  Sparkles,
  Calendar,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const class12Syllabus = [
  {
    unit: 'Unit 6',
    title: 'Reproduction',
    chapters: [
      'Reproduction in Organisms',
      'Sexual Reproduction in Flowering Plants',
      'Human Reproduction',
      'Reproductive Health',
    ],
    weightage: '12%',
    icon: Heart,
    highlight: true,
  },
  {
    unit: 'Unit 7',
    title: 'Genetics and Evolution',
    chapters: ['Principles of Inheritance', 'Molecular Basis of Inheritance', 'Evolution'],
    weightage: '18%',
    icon: Dna,
    highlight: true,
  },
  {
    unit: 'Unit 8',
    title: 'Biology in Human Welfare',
    chapters: ['Human Health and Disease', 'Microbes in Human Welfare'],
    weightage: '9%',
    icon: Sparkles,
    highlight: false,
  },
  {
    unit: 'Unit 9',
    title: 'Biotechnology',
    chapters: ['Biotechnology: Principles and Processes', 'Biotechnology and Its Applications'],
    weightage: '11%',
    icon: Dna,
    highlight: true,
  },
  {
    unit: 'Unit 10',
    title: 'Ecology',
    chapters: [
      'Organisms and Populations',
      'Ecosystem',
      'Biodiversity and Conservation',
      'Environmental Issues',
    ],
    weightage: '6%',
    icon: Leaf,
    highlight: false,
  },
]

const features = [
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description:
      'Learn from Dr. Shekhar Singh and faculty trained at premier medical institutions.',
  },
  {
    icon: Target,
    title: 'Board + NEET Focus',
    description: 'Dual preparation strategy for both board exams and NEET entrance.',
  },
  {
    icon: Users,
    title: 'Small Batches',
    description: '10-15 students per batch for personalized attention and peer learning.',
  },
  {
    icon: Calendar,
    title: 'Strategic Timeline',
    description: 'Carefully planned schedule covering syllabus with revision time for both exams.',
  },
  {
    icon: Video,
    title: 'Live Classes',
    description: 'Interactive live sessions with instant doubt resolution.',
  },
  {
    icon: MessageCircle,
    title: '24/7 Support',
    description: 'WhatsApp doubt support anytime, especially crucial during exam season.',
  },
]

const faqs = [
  {
    question: 'How important is Class 12 Biology for NEET?',
    answer:
      'Class 12 Biology contributes about 40% to NEET syllabus. Topics like Genetics, Molecular Biology, Biotechnology, and Human Reproduction are high-weightage. A strong Class 12 performance is crucial for NEET success.',
  },
  {
    question: 'Can I prepare for both board exams and NEET simultaneously?',
    answer:
      'Absolutely! Our coaching is designed for dual preparation. Since NEET Biology is largely based on NCERT, thorough board preparation automatically builds your NEET foundation. We add competitive MCQ practice alongside board preparation.',
  },
  {
    question: 'Which Class 12 chapters are most important for NEET?',
    answer:
      'Genetics and Evolution (18% weightage) and Reproduction (12% weightage) are the highest scoring Class 12 chapters. Biotechnology (11%) is also crucial. Our coaching gives extra focus to these high-yield topics.',
  },
  {
    question: 'What study material do you provide for Class 12?',
    answer:
      'We provide comprehensive NCERT-based notes, chapter-wise MCQ banks, previous year board and NEET questions, topic-wise mock tests, and full-length papers for both exams.',
  },
  {
    question: 'When should I start Class 12 biology coaching?',
    answer:
      'Start as early as possible - ideally from the beginning of Class 12. This gives adequate time for thorough preparation, revision, and mock tests before both board exams and NEET.',
  },
]

export default function BiologyTutorClass12CBSEPage() {
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

      {/* Hero Section */}
      <section className="relative bg-indigo-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div
            className="text-center max-w-4xl mx-auto animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-5 h-5 mr-2 text-yellow-300" />
              Class 12 CBSE Biology
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-yellow-300">Class 12 CBSE</span> Biology Tutor
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Board Exams + NEET Preparation | 40% NEET Syllabus
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Class 12 is the crucial year - boards and NEET both matter. Our coaching prepares you
              for both with AIIMS-trained faculty, proven strategies, and comprehensive study
              material.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/courses/class-12">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-purple-900"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Class 12 Course
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm opacity-80">Success Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Target className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">Dual</div>
                <div className="text-sm opacity-80">Board + NEET</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm opacity-80">NCERT Coverage</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">40%</div>
                <div className="text-sm opacity-80">NEET Weightage</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Syllabus Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Class 12 CBSE Biology Syllabus
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete NCERT coverage with NEET-oriented approach. High-yield chapters highlighted.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {class12Syllabus.map((unit, index) => (
              <div
                key={unit.unit}
                className={`rounded-xl p-6 shadow-lg ${
                  unit.highlight ? 'bg-purple-50 border-2 border-purple-200' : 'bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      unit.highlight ? 'bg-purple-200' : 'bg-gray-100'
                    }`}
                  >
                    <unit.icon
                      className={`w-6 h-6 ${unit.highlight ? 'text-purple-600' : 'text-gray-600'}`}
                    />
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      unit.highlight ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {unit.weightage} NEET
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{unit.unit}</h3>
                <p
                  className={`font-medium mb-3 ${unit.highlight ? 'text-purple-600' : 'text-gray-600'}`}
                >
                  {unit.title}
                </p>
                <ul className="space-y-1">
                  {unit.chapters.map((chapter) => (
                    <li key={chapter} className="text-sm text-gray-600 flex items-start">
                      <CheckCircle
                        className={`w-4 h-4 mr-2 flex-shrink-0 mt-0.5 ${
                          unit.highlight ? 'text-purple-500' : 'text-green-600'
                        }`}
                      />
                      {chapter}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              What You Get in Class 12 Coaching
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-gray-50 rounded-xl p-8 animate-fadeInUp"
              >
                <feature.icon className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="bg-white rounded-xl p-8 shadow-lg animate-fadeInUp"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageCircle className="w-6 h-6 mr-3 text-purple-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
           className="animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ace Both Boards and NEET</h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Expert coaching for Class 12 Biology. Start now for the best results!
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

              <Link href="/enrollment">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-purple-600"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
              </Link>
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
              href="/biology-tutor-class-11-cbse"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 11 CBSE Biology
            </Link>
            <Link
              href="/biology-tutor-class-12-icse"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 12 ICSE Biology
            </Link>
            <Link
              href="/biology-tutor"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Tutor
            </Link>
            <Link
              href="/courses/class-12"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 12 Course Details
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
