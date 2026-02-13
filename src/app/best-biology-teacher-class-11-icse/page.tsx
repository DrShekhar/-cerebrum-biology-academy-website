'use client'

import {
  Trophy,
  Users,
  Star,
  CheckCircle,
  Award,
  BookOpen,
  MessageCircle,
  Play,
  ArrowRight,
  Leaf,
  Bug,
  Microscope,
  Target,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const iscSyllabus = [
  {
    unit: 'Section A',
    title: 'Diversity of Life',
    topics: [
      'Classification of Living Organisms',
      'Kingdom Monera, Protista, Fungi',
      'Kingdom Plantae & Animalia',
      'Viruses & Lichens',
    ],
    icon: Bug,
  },
  {
    unit: 'Section B',
    title: 'Plant Life',
    topics: ['Plant Morphology', 'Plant Anatomy', 'Plant Physiology', 'Plant Reproduction'],
    icon: Leaf,
  },
  {
    unit: 'Section C',
    title: 'Animal Life',
    topics: [
      'Animal Tissues',
      'Structural Organisation',
      'Cockroach Anatomy',
      'Human Systems Overview',
    ],
    icon: Bug,
  },
  {
    unit: 'Section D',
    title: 'Cell Biology',
    topics: ['Cell Structure', 'Cell Organelles', 'Biomolecules', 'Cell Division'],
    icon: Microscope,
  },
]

const faqs = [
  {
    question: 'Is ISC Biology different from CBSE?',
    answer:
      'ISC Biology is slightly more detailed than CBSE in certain areas, with additional topics. However, both boards follow similar core concepts. For NEET, ISC students need to additionally study NCERT thoroughly. Our teaching covers both ISC board requirements and NCERT for comprehensive preparation.',
  },
  {
    question: 'Can ISC students prepare for NEET effectively?',
    answer:
      'Absolutely! ISC students actually have an advantage as ISC covers topics in more depth. The key is to supplement ISC preparation with NCERT reading. Our integrated approach ensures ISC students are NEET-ready from Class 11 itself.',
  },
  {
    question: 'Do you provide ISC-specific study materials?',
    answer:
      'Yes, we provide ISC-aligned study materials along with NCERT integration. Our notes cover ISC board pattern questions and NEET-style MCQs for complete preparation.',
  },
  {
    question: 'What is the advantage of starting NEET prep in Class 11?',
    answer:
      'Starting in Class 11 gives you 2 years of preparation time. Class 11 covers 60% of NEET syllabus. Students who start early have significantly higher success rates - our data shows 2x better NEET performance.',
  },
]

export default function BestBiologyTeacherClass11ICSEPage() {
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
      <section className="relative bg-gradient-to-br from-green-800 via-cyan-800 to-green-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div
            className="text-center max-w-4xl mx-auto animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-5 h-5 mr-2 text-yellow-300" />
              ICSE/ISC Class 11 Biology
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">Biology Teacher</span> for Class 11 ICSE
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Complete ISC Coverage | NCERT Integration | NEET Foundation
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              ISC students need specialized guidance that covers ISC syllabus while building NEET
              foundation with NCERT. Our expert faculty ensures you excel in both ISC boards and
              competitive exams.
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

              <Link href="/courses/class-11">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-green-800"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Course Details
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Target className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">ISC+NCERT</div>
                <div className="text-sm opacity-80">Dual Coverage</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">4</div>
                <div className="text-sm opacity-80">Sections</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm opacity-80">Success Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">10-15</div>
                <div className="text-sm opacity-80">Per Batch</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ISC Syllabus Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Class 11 ISC Biology Syllabus
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete ISC coverage with NCERT integration for NEET preparation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {iscSyllabus.map((section, index) => (
              <div
                key={section.unit}
                className="bg-white rounded-xl p-8 shadow-lg animate-fadeInUp"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                    <section.icon className="w-7 h-7 text-green-600" />
                  </div>
                  <div>
                    <span className="text-sm text-green-600 font-semibold">{section.unit}</span>
                    <h3 className="text-xl font-bold text-gray-900">{section.title}</h3>
                  </div>
                </div>
                <ul className="space-y-2">
                  {section.topics.map((topic) => (
                    <li key={topic} className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ISC vs CBSE Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              ISC Students: Your NEET Advantage
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              className="space-y-6 animate-fadeInUp"
            >
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900">Deeper Conceptual Coverage</h3>
                  <p className="text-gray-600">
                    ISC syllabus covers topics in more depth, giving you stronger foundations
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900">NCERT Supplement</h3>
                  <p className="text-gray-600">
                    We add NCERT content alongside ISC to ensure complete NEET coverage
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900">Practical Application</h3>
                  <p className="text-gray-600">
                    ISC&apos;s application-based approach helps in NEET problem-solving
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900">Language Skills</h3>
                  <p className="text-gray-600">
                    Strong English foundation from ISC helps in comprehending NEET questions
                  </p>
                </div>
              </div>
            </div>

            <div
              className="bg-green-50 rounded-2xl p-8 animate-fadeInUp"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our ISC-Specific Approach</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-green-600" />
                  <span>Complete ISC syllabus coverage</span>
                </li>
                <li className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-green-600" />
                  <span>NCERT integration for NEET</span>
                </li>
                <li className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-green-600" />
                  <span>ISC-pattern question practice</span>
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  <span>Specialized ISC doubt sessions</span>
                </li>
                <li className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-green-600" />
                  <span>Board + NEET dual preparation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">FAQs</h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="bg-white rounded-xl p-8 shadow-lg animate-fadeInUp"
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
      <section className="py-20 bg-gradient-to-r from-green-600 via-blue-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
           className="animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Excel in ISC Boards and NEET</h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Expert ISC Biology teaching with NEET integration. Book your demo!
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
                  className="border-white text-white hover:bg-white hover:text-green-600"
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
              href="/best-biology-teacher-class-12-icse"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 12 ICSE Biology
            </Link>
            <Link
              href="/best-biology-teacher-class-11-cbse"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 11 CBSE Biology
            </Link>
            <Link
              href="/biology-teacher"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Teacher
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
