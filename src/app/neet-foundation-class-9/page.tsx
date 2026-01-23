'use client'

import { motion } from 'framer-motion'
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

const class9Syllabus = [
  {
    unit: 'Unit 1',
    title: 'The Fundamental Unit of Life',
    chapters: ['Cell Structure', 'Cell Organelles', 'Cell Division Basics'],
    neetRelevance: 'Forms base for Cell Biology (9% NEET)',
    weightage: '15%',
    icon: Microscope,
  },
  {
    unit: 'Unit 2',
    title: 'Tissues',
    chapters: ['Plant Tissues', 'Animal Tissues', 'Meristematic Tissues'],
    neetRelevance: 'Foundation for Structural Organisation',
    weightage: '12%',
    icon: Dna,
  },
  {
    unit: 'Unit 3',
    title: 'Diversity in Living Organisms',
    chapters: ['Classification', 'Five Kingdom', 'Plant & Animal Kingdom'],
    neetRelevance: 'Direct link to Diversity chapter (14% NEET)',
    weightage: '18%',
    icon: Leaf,
  },
  {
    unit: 'Unit 4',
    title: 'Why Do We Fall Ill',
    chapters: ['Disease Types', 'Immunity Basics', 'Prevention'],
    neetRelevance: 'Foundation for Human Health chapter',
    weightage: '10%',
    icon: Heart,
  },
  {
    unit: 'Unit 5',
    title: 'Natural Resources',
    chapters: ['Biogeochemical Cycles', 'Environment', 'Ecology Basics'],
    neetRelevance: 'Base for Ecology & Environment (12% NEET)',
    weightage: '10%',
    icon: Leaf,
  },
  {
    unit: 'Unit 6',
    title: 'Food Resources',
    chapters: ['Plant Breeding', 'Animal Husbandry', 'Improvement Methods'],
    neetRelevance: 'Foundation for Biotechnology chapter',
    weightage: '8%',
    icon: Leaf,
  },
]

const advantages = [
  {
    icon: Clock,
    title: '4 Years to Master',
    description: 'Start in Class 9, master by Class 12. No rushing, no cramming.',
  },
  {
    icon: Target,
    title: 'Stress-Free Preparation',
    description: 'Spread learning over 4 years. Enjoy the journey, not just the destination.',
  },
  {
    icon: Zap,
    title: '50-70 Extra Marks',
    description: 'Early starters consistently score 50-70 marks more than late joiners.',
  },
  {
    icon: Medal,
    title: 'Scholarship Advantage',
    description: 'Clear NTSE, Olympiads in Class 9-10. Build an impressive profile.',
  },
]

const features = [
  {
    icon: Rocket,
    title: 'Early Start Advantage',
    description: 'Begin NEET journey 4 years before exam. Build concepts layer by layer.',
  },
  {
    icon: Brain,
    title: 'Conceptual Foundation',
    description: 'Focus on understanding, not memorization. Strong base for Class 11-12.',
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description: 'Learn from Dr. Shekhar Singh and faculty from premier medical institutions.',
  },
  {
    icon: BookOpen,
    title: 'NCERT + NEET Approach',
    description: 'Master NCERT with competitive exam orientation from day one.',
  },
  {
    icon: Users,
    title: 'Small Batches',
    description: '10-15 students per batch. Individual attention and doubt resolution.',
  },
  {
    icon: TrendingUp,
    title: 'Track Progress',
    description: 'Regular assessments, NEET-style tests, and performance analytics.',
  },
]

const faqs = [
  {
    question: 'Why should I start NEET Foundation from Class 9?',
    answer:
      'Starting from Class 9 gives you 4 years to prepare instead of 2. About 30% of NEET Biology concepts are introduced in Class 9. Early starters have time to build strong conceptual foundation, clear competitive exams like NTSE and Olympiads, and develop scientific thinking gradually.',
  },
  {
    question: 'Will NEET Foundation affect my school performance?',
    answer:
      'Not at all! Our NEET Foundation program is designed to complement school studies. We cover the same NCERT syllabus with added depth. Students actually perform better in school because of stronger conceptual clarity.',
  },
  {
    question: 'What Class 9 topics are important for NEET?',
    answer:
      'Cell Biology (forms base for 9% NEET questions), Diversity in Living Organisms (14% NEET), Natural Resources/Ecology (12% NEET), and Human Health basics. These Class 9 topics directly connect to high-weightage NEET chapters.',
  },
  {
    question: 'Is the teaching pace suitable for Class 9 students?',
    answer:
      'Yes! We understand Class 9 students are young. Our pace is comfortable - we focus on building interest and understanding. No pressure, no cramming. The goal is to make students fall in love with Biology.',
  },
  {
    question: 'Can students join mid-session?',
    answer:
      'Yes, students can join any time. We provide catch-up sessions and recorded lectures to help new joiners get up to speed. Our small batch size ensures no one is left behind.',
  },
]

export default function NEETFoundationClass9Page() {
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
      <section className="relative bg-gradient-to-br from-purple-900 via-violet-800 to-fuchsia-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Rocket className="w-5 h-5 mr-2 text-violet-300" />
              NEET Foundation for Class 9
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-violet-300">NEET Foundation</span> Class 9
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              4-Year Head Start | Build Strong Foundation | Stress-Free NEET Prep
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Why wait for Class 11? Start your NEET journey from Class 9 and get a 4-year head
              start. Build unshakeable conceptual foundation while your peers are still deciding
              their career paths.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-violet-400 text-black hover:bg-violet-300"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/neet-foundation-course">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-purple-900"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Foundation Course
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-violet-300" />
                <div className="text-2xl font-bold">4 Years</div>
                <div className="text-sm opacity-80">Head Start</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-violet-300" />
                <div className="text-2xl font-bold">10-15</div>
                <div className="text-sm opacity-80">Students/Batch</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-violet-300" />
                <div className="text-2xl font-bold">30%</div>
                <div className="text-sm opacity-80">NEET Concepts</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Star className="w-8 h-8 mx-auto mb-2 text-violet-300" />
                <div className="text-2xl font-bold">50-70</div>
                <div className="text-sm opacity-80">Extra Marks</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4-Year Advantage Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              The 4-Year Advantage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Why early starters consistently outperform those who begin in Class 11
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-100"
              >
                <advantage.icon className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{advantage.title}</h3>
                <p className="text-gray-600">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Syllabus Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Class 9 Topics with NEET Relevance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how Class 9 concepts directly connect to NEET syllabus
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {class9Syllabus.map((unit, index) => (
              <motion.div
                key={unit.unit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <unit.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {unit.weightage} Class 9
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{unit.unit}</h3>
                <p className="text-purple-600 font-medium mb-2">{unit.title}</p>
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              What You Get in NEET Foundation Class 9
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-8"
              >
                <feature.icon className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageCircle className="w-6 h-6 mr-3 text-purple-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Start Your 4-Year NEET Journey Today
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              The earlier you start, the stronger your foundation!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-violet-400 text-black hover:bg-violet-300"
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
          </motion.div>
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
              href="/neet-foundation-class-10"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Foundation Class 10
            </Link>
            <Link
              href="/biology-tutor-class-9"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 9 Biology Tutor
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
