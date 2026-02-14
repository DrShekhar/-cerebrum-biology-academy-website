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
  Microscope,
  Dna,
  Leaf,
  Heart,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const class9Syllabus = [
  {
    unit: 'Unit 1',
    title: 'Plant Physiology',
    chapters: [
      'Photosynthesis',
      'Transpiration',
      'Mineral Nutrition',
      'Plant Hormones',
      'Tropic Movements',
    ],
    weightage: '22%',
    icon: Leaf,
  },
  {
    unit: 'Unit 2',
    title: 'Human Physiology',
    chapters: [
      'Digestive System',
      'Respiratory System',
      'Circulatory System',
      'Excretory System',
      'Nervous System',
      'Endocrine System',
    ],
    weightage: '28%',
    icon: Heart,
  },
  {
    unit: 'Unit 3',
    title: 'Genetics and Evolution',
    chapters: [
      'Cell Division',
      'Heredity',
      'Mendelian Genetics',
      'DNA and RNA',
      'Evolution Basics',
    ],
    weightage: '20%',
    icon: Dna,
  },
  {
    unit: 'Unit 4',
    title: 'Diversity in Living Organisms',
    chapters: [
      'Five Kingdom Classification',
      'Plant Kingdom',
      'Animal Kingdom',
      'Binomial Nomenclature',
    ],
    weightage: '18%',
    icon: Microscope,
  },
  {
    unit: 'Unit 5',
    title: 'Environment and Ecology',
    chapters: ['Pollution', 'Global Warming', 'Ozone Depletion', 'Conservation', 'Ecosystems'],
    weightage: '12%',
    icon: Leaf,
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
    icon: BookOpen,
    title: 'ICSE + NCERT Coverage',
    description: 'Complete ICSE syllabus with NCERT alignment for competitive exam readiness.',
  },
  {
    icon: Users,
    title: 'Small Batches',
    description: '10-15 students per batch for personalized attention and detailed answers.',
  },
  {
    icon: Target,
    title: 'Diagram Excellence',
    description:
      'Special focus on biological diagrams - essential for ICSE scoring. Practice sessions included.',
  },
  {
    icon: Video,
    title: 'Live Classes',
    description: 'Interactive live sessions with practical demonstrations and microscope work.',
  },
  {
    icon: MessageCircle,
    title: '24/7 Support',
    description: 'WhatsApp doubt support anytime. Help with practicals and diagrams.',
  },
]

const faqs = [
  {
    question: 'What topics are covered in ICSE Class 9 Biology?',
    answer:
      'ICSE Class 9 Biology covers Plant Physiology (photosynthesis, transpiration), Human Physiology (all body systems), Genetics basics, Diversity in Living Organisms, and Environment. The curriculum is more detailed than CBSE and requires thorough understanding.',
  },
  {
    question: 'How is ICSE Biology different from CBSE Biology for Class 9?',
    answer:
      'ICSE Biology is more comprehensive and detailed. It covers topics in greater depth, requires better diagram drawing skills, and expects detailed descriptive answers. ICSE also includes more practical applications and microscope work.',
  },
  {
    question: 'Do you provide help with Biology practicals for ICSE Class 9?',
    answer:
      'Yes! We provide complete practical guidance including microscope techniques, specimen study, diagram drawing, and practical record maintenance. Our offline centers have lab facilities for hands-on experience.',
  },
  {
    question: 'Is Class 9 ICSE Biology important for future competitive exams?',
    answer:
      'Absolutely! ICSE provides a strong foundation. Topics like Human Physiology and Genetics are directly relevant for NEET. The detailed approach of ICSE prepares students well for competitive exams.',
  },
  {
    question: 'What is the fee structure for Class 9 ICSE Biology coaching?',
    answer:
      'Our Class 9 ICSE biology coaching fees start from Rs 20,000 per year. This includes theory classes, practical guidance, and study materials. Contact us for scholarships and payment plans.',
  },
]

export default function BiologyTutorClass9ICSEPage() {
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
      <section className="relative bg-gradient-to-br from-cyan-900 via-green-800 to-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-5 h-5 mr-2 text-blue-300" />
              Class 9 ICSE Biology
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-blue-300">Class 9 ICSE</span> Biology Tutor
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Comprehensive ICSE Biology | Diagrams & Practicals Focus
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              ICSE Biology requires detailed understanding and excellent diagram skills. Our
              coaching covers complete ICSE syllabus with practical training and prepares you for
              competitive exams from Class 9.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-blue-400 text-black hover:bg-blue-300"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/courses/class-9-foundation">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-cyan-900"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Class 9 Course
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-blue-300" />
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm opacity-80">Board Results</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-blue-300" />
                <div className="text-2xl font-bold">10-15</div>
                <div className="text-sm opacity-80">Students/Batch</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-300" />
                <div className="text-2xl font-bold">ICSE+NCERT</div>
                <div className="text-sm opacity-80">Dual Coverage</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Star className="w-8 h-8 mx-auto mb-2 text-blue-300" />
                <div className="text-2xl font-bold">5 Units</div>
                <div className="text-sm opacity-80">Complete Syllabus</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Syllabus Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Class 9 ICSE Biology Syllabus
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive ICSE coverage with diagram practice and practicals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {class9Syllabus.map((unit, index) => (
              <div key={unit.unit} className="bg-white rounded-xl p-6 shadow-lg animate-fadeInUp">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                    <unit.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {unit.weightage} ICSE
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{unit.unit}</h3>
                <p className="text-blue-600 font-medium mb-3">{unit.title}</p>
                <ul className="space-y-1">
                  {unit.chapters.map((chapter) => (
                    <li key={chapter} className="text-sm text-gray-600 flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
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
          <div className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              What You Get in ICSE Class 9 Coaching
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={feature.title} className="bg-gray-50 rounded-xl p-8 animate-fadeInUp">
                <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
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
          <div className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={faq.question} className="bg-white rounded-xl p-8 shadow-lg animate-fadeInUp">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageCircle className="w-6 h-6 mr-3 text-blue-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Excel in ICSE Biology from Class 9
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Master diagrams, understand concepts, ace your exams!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-blue-400 text-black hover:bg-blue-300"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo
                </Button>
              </Link>

              <Link href="/enrollment">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
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
              href="/biology-tuition-class-9-10"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 9 Biology Tutor
            </Link>
            <Link
              href="/biology-tutor-class-9-cbse"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 9 CBSE Biology
            </Link>
            <Link
              href="/biology-tuition-class-9-10"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 10 ICSE Biology
            </Link>
            <Link
              href="/courses/class-9-foundation"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 9 Course Details
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
