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
  Target,
  Clock,
  Zap,
  Medal,
  Rocket,
  Brain,
  TrendingUp,
  Microscope,
  Dna,
  Leaf,
  Heart,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const class10Syllabus = [
  {
    unit: 'Unit 1',
    title: 'Life Processes',
    chapters: ['Nutrition', 'Respiration', 'Transportation', 'Excretion'],
    neetRelevance: 'Direct match with Human Physiology (20% NEET)',
    weightage: '25%',
    icon: Heart,
  },
  {
    unit: 'Unit 2',
    title: 'Control and Coordination',
    chapters: ['Nervous System', 'Hormonal Control', 'Reflex Actions', 'Plant Hormones'],
    neetRelevance: 'Base for Neural Control & Chemical Coordination',
    weightage: '20%',
    icon: Brain,
  },
  {
    unit: 'Unit 3',
    title: 'Reproduction',
    chapters: ['Asexual Reproduction', 'Sexual Reproduction', 'Human Reproduction'],
    neetRelevance: 'Foundation for Reproduction chapter (12% NEET)',
    weightage: '18%',
    icon: Dna,
  },
  {
    unit: 'Unit 4',
    title: 'Heredity and Evolution',
    chapters: ['Mendels Laws', 'Sex Determination', 'Evolution', 'Speciation'],
    neetRelevance: 'Direct link to Genetics & Evolution (18% NEET)',
    weightage: '22%',
    icon: Microscope,
  },
  {
    unit: 'Unit 5',
    title: 'Our Environment',
    chapters: ['Ecosystem', 'Food Chains', 'Ozone Depletion', 'Waste Management'],
    neetRelevance: 'Foundation for Ecology chapter (12% NEET)',
    weightage: '15%',
    icon: Leaf,
  },
]

const advantages = [
  {
    icon: Clock,
    title: '2 Years Head Start',
    description: 'Start in Class 10, enter Class 11 with strong foundation already built.',
  },
  {
    icon: Target,
    title: 'Board + NEET Together',
    description: 'Class 10 boards and NEET foundation go hand in hand. Excel in both.',
  },
  {
    icon: Zap,
    title: '40% NEET Concepts',
    description: 'Class 10 covers nearly 40% of NEET Biology concepts directly.',
  },
  {
    icon: Medal,
    title: 'Score 95+ in Boards',
    description: 'Our NEET approach actually helps score higher in board exams.',
  },
]

const features = [
  {
    icon: Rocket,
    title: '2-Year Advantage',
    description: 'Begin NEET preparation while peers are still exploring options.',
  },
  {
    icon: Brain,
    title: 'Dual Focus Approach',
    description: 'Prepare for both Class 10 boards and build NEET foundation simultaneously.',
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description: 'Learn from Dr. Shekhar Singh and faculty from premier medical institutions.',
  },
  {
    icon: BookOpen,
    title: 'NCERT Mastery',
    description: 'Complete NCERT with NEET depth. Score in boards, prepare for NEET.',
  },
  {
    icon: Users,
    title: 'Small Batches',
    description: '10-15 students per batch. Individual attention for board and NEET prep.',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Regular board-style and NEET-style tests. Track improvement continuously.',
  },
]

const faqs = [
  {
    question: 'Why start NEET Foundation from Class 10?',
    answer:
      'Class 10 is crucial because 40% of NEET Biology concepts are covered. Topics like Life Processes, Heredity, and Reproduction directly appear in NEET. Starting now gives you a 2-year head start and makes Class 11-12 much easier.',
  },
  {
    question: 'Will NEET coaching help with Class 10 board exams?',
    answer:
      'Absolutely! Our NEET Foundation approach actually helps you score higher in boards. We cover NCERT thoroughly with deeper conceptual understanding. Students typically score 90-95+ in Biology in their boards.',
  },
  {
    question: 'What Class 10 Biology topics appear in NEET?',
    answer:
      'Life Processes (Human Physiology - 20% NEET), Control & Coordination (Neural Control), Reproduction (12% NEET), Heredity & Evolution (Genetics - 18% NEET), and Environment (Ecology - 12% NEET). Almost every Class 10 topic has NEET relevance.',
  },
  {
    question: 'Is online coaching available for Class 10 NEET Foundation?',
    answer:
      'Yes! We offer both offline classes at our 4 Delhi NCR centers and live online classes for students across India. Same faculty, same quality, same results.',
  },
  {
    question: 'What is the fee structure for Class 10 NEET Foundation?',
    answer:
      'Our Class 10 NEET Foundation fees start from Rs 24,000 per year. This includes board preparation, NEET foundation, study materials, and regular tests. Scholarships available for merit students.',
  },
]

export default function NEETFoundationClass10Page() {
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
      <section className="relative bg-gradient-to-br from-fuchsia-900 via-pink-800 to-purple-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div
            className="text-center max-w-4xl mx-auto animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Rocket className="w-5 h-5 mr-2 text-pink-300" />
              NEET Foundation for Class 10
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-pink-300">NEET Foundation</span> Class 10
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              2-Year Head Start | Board + NEET Together | Score 95+ in Boards
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Class 10 is the perfect time to begin NEET preparation. Master board exams while
              building NEET foundation. 40% of NEET Biology is covered in Class 10 - start now!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-pink-400 text-black hover:bg-pink-300"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/neet-foundation-course">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-fuchsia-900"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Foundation Course
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-pink-300" />
                <div className="text-2xl font-bold">2 Years</div>
                <div className="text-sm opacity-80">Head Start</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-pink-300" />
                <div className="text-2xl font-bold">95+</div>
                <div className="text-sm opacity-80">Board Score</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-pink-300" />
                <div className="text-2xl font-bold">40%</div>
                <div className="text-sm opacity-80">NEET Concepts</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Star className="w-8 h-8 mx-auto mb-2 text-pink-300" />
                <div className="text-2xl font-bold">10-15</div>
                <div className="text-sm opacity-80">Students/Batch</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              The Class 10 Advantage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Why Class 10 is the perfect time to begin NEET preparation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => (
              <div
                key={advantage.title}
                className="bg-gradient-to-br from-fuchsia-50 to-pink-50 rounded-xl p-6 border border-pink-100 animate-fadeInUp"
              >
                <advantage.icon className="w-12 h-12 text-fuchsia-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{advantage.title}</h3>
                <p className="text-gray-600">{advantage.description}</p>
              </div>
            ))}
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
              Class 10 Biology with NEET Connection
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every Class 10 topic directly connects to high-weightage NEET chapters
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {class10Syllabus.map((unit, index) => (
              <div
                key={unit.unit}
                className="bg-white rounded-xl p-6 shadow-lg animate-fadeInUp"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-fuchsia-100 rounded-full flex items-center justify-center">
                    <unit.icon className="w-6 h-6 text-fuchsia-600" />
                  </div>
                  <span className="bg-fuchsia-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {unit.weightage} Boards
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{unit.unit}</h3>
                <p className="text-fuchsia-600 font-medium mb-2">{unit.title}</p>
                <p className="text-sm text-green-600 font-medium mb-3 bg-green-50 px-2 py-1 rounded">
                  {unit.neetRelevance}
                </p>
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
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              What You Get in NEET Foundation Class 10
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-gray-50 rounded-xl p-8 animate-fadeInUp"
              >
                <feature.icon className="w-12 h-12 text-fuchsia-600 mb-4" />
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
                  <MessageCircle className="w-6 h-6 mr-3 text-fuchsia-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
           className="animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ace Boards + Build NEET Foundation Together
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Class 10 is your launchpad. Start today!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-pink-400 text-black hover:bg-pink-300"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo
                </Button>
              </Link>

              <Link href="/enrollment">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-fuchsia-600"
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
              href="/neet-foundation-course"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Foundation Course
            </Link>
            <Link
              href="/neet-foundation-class-9"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Foundation Class 9
            </Link>
            <Link
              href="/biology-tutor-class-10"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 10 Biology Tutor
            </Link>
            <Link
              href="/biology-tutor"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Tutor
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
