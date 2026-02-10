'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Trophy,
  Users,
  MessageCircle,
  Play,
  Headphones,
  MapPin,
  Star,
  GraduationCap,
  Target,
  Building,
  Shield,
  ArrowRight,
  BookOpen,
  CheckCircle,
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

const bridgeFeatures = [
  {
    icon: BookOpen,
    title: 'A2 to NEET Depth',
    description: 'Your A-Level strength is depth. We channel it into NEET medical perspective.',
  },
  {
    icon: Target,
    title: 'Speed Acceleration',
    description: 'A-Level teaches thoroughness; NEET demands speed. Master both with timed modules.',
  },
  {
    icon: Headphones,
    title: '24/7 Expert Support',
    description: 'Dedicated faculty available for complex A-Level to NEET concept clarifications.',
  },
  {
    icon: Play,
    title: 'MCQ Specialization',
    description: 'Convert A-Level extended answers to NEET single-best-answer format. 5000+ MCQs.',
  },
  {
    icon: Shield,
    title: 'NEET Context Focus',
    description: 'A-Level is pure science; NEET adds medical context. We bridge this perspective.',
  },
  {
    icon: Star,
    title: 'Advanced Test Series',
    description: 'Full-length tests matching actual NEET difficulty for A-Level students.',
  },
]

const syllabusGapData = [
  {
    category: 'Cell & Genetics',
    aLevelCovered: 'Detailed cell structure, advanced genetics, molecular mechanisms',
    neetRequired: 'Cell division emphasis, human genetics focus, medical relevance angle',
    focusArea: 'Meiosis in context of gametogenesis, human genetic disorders, medical applications',
  },
  {
    category: 'Respiration & Energy',
    aLevelCovered: 'Krebs cycle mechanisms, oxidative phosphorylation, complex pathways',
    neetRequired: 'ATP yield, energy efficiency, Indian board focus, medical physiology',
    focusArea: 'ATP production in different tissues, hormonal control, metabolic diseases',
  },
  {
    category: 'Coordination & Control',
    aLevelCovered: 'Detailed nerve impulse, advanced endocrinology',
    neetRequired: 'Medical focus: nervous system in health/disease, hormone disorders',
    focusArea: 'Neuromuscular junction, hormonal disorders, reflex arcs, autonomic system',
  },
  {
    category: 'Ecology & Ecosystems',
    aLevelCovered: 'Succession, population dynamics, detailed biomes',
    neetRequired: 'Indian ecosystem focus, biogeochemical cycles, conservation',
    focusArea: 'Biogeochemical cycles detail, Indian biomes, biodiversity conservation',
  },
]

const whoIsThisFor = [
  'A-Level Biology students taking NEET for medical education in India',
  'Cambridge Advanced Level students seeking Indian medical college admission',
  'A-Level students moving back to India for medical studies',
  'Post-A-Level students preparing for competitive medical entrance',
  'Parents seeking guided A-Level to NEET transition support',
]

const methodologySteps = [
  {
    number: '1',
    title: 'Strength Assessment',
    description: 'Analyze A-Level strengths - what translates directly to NEET advantage.',
  },
  {
    number: '2',
    title: 'Gap Identification',
    description: 'Identify areas where A-Level differs from NEET in focus or depth.',
  },
  {
    number: '3',
    title: 'NEET Strategy Training',
    description: 'Learn to leverage A-Level knowledge in NEET-style questions.',
  },
  {
    number: '4',
    title: 'Intensive Practice',
    description: 'Solve 5000+ MCQs, full-length tests, previous papers with advanced analysis.',
  },
]

const faqData = [
  {
    question: 'Is A-Level Biology harder than NEET?',
    answer:
      'A-Level and NEET are different, not just harder/easier. A-Level demands depth and mechanisms. NEET emphasizes speed, medical application, and breadth. A-Level students have advantage in understanding difficult concepts but need to add speed and medical perspective. Our bridge program teaches both.',
  },
  {
    question: 'Can A-Level students score 700+ in NEET?',
    answer:
      'Absolutely! A-Level students frequently score 700+ because your deep understanding helps crack difficult questions. NEET difficult questions require exactly the kind of conceptual strength A-Level teaches. Your challenge is speed, not knowledge. We focus on converting knowledge into timed problem-solving.',
  },
  {
    question: 'How long does A-Level to NEET preparation take?',
    answer:
      'For A-Level students: 2-3 months for pure bridging (post-A-Level). For parallel A-Level + NEET: 4-5 months with integrated curriculum. A2 students can start NEET prep while finishing A-Level with our guided approach. Timeline depends on your readiness and target score.',
  },
  {
    question: 'What is the advantage of A-Level background for NEET?',
    answer:
      'Your A-Level conceptual strength is massive advantage for NEET difficult questions (70-80 hard questions in NEET 2024). You understand mechanisms, can think critically, and tackle complex scenarios. Most important advantage: confidence in challenging questions. We enhance this with NEET speed and patterns.',
  },
  {
    question: 'Do you provide A-Level-specific preparation material?',
    answer:
      'Yes. Our A-Level-to-NEET material explicitly references A-Level concepts, shows connections to NEET requirements, and provides transition notes. 5000+ MCQs include questions leveraging A-Level understanding. Study plans recognize A-Level strengths and build on them.',
  },
  {
    question: 'How do you teach A-Level students to handle negative marking?',
    answer:
      'A-Level exams reward detailed answers; NEET penalizes wrong answers. We train strategic guessing - when to attempt and when to skip. Mock tests with detailed analysis help learn this skill. A-Level students, with their confidence in understanding, often need this most.',
  },
]

const pricingTiers = [
  {
    name: 'Fast-Track Bridge',
    duration: '2-3 months',
    price: 'Contact via WhatsApp',
    features: [
      'Strength & gap analysis',
      'NEET-specific topics',
      'Live classes 4x/week',
      '2000+ MCQ practice',
      'Recorded sessions',
    ],
  },
  {
    name: 'Complete Mastery',
    duration: '4-5 months',
    price: 'Contact via WhatsApp',
    features: [
      'Full bridge curriculum',
      'Complete NEET syllabus',
      'Live classes 6x/week',
      '5000+ MCQ practice',
      'Advanced test series',
      'Weekly performance review',
      'Doubt clearing',
    ],
  },
  {
    name: 'Elite Coaching',
    duration: '5-6 months',
    price: 'Contact via WhatsApp',
    features: [
      'All mastery features',
      'Personalized coaching',
      'Weekly 1-on-1 sessions',
      'Question analysis workshop',
      'Strategy optimization',
      'Advanced mock tests',
      'Guaranteed support till exam',
    ],
  },
]

export default function ALevelToNEETContent() {
  const heroAnimation = useScrollAnimation(0.3)
  const statsAnimation = useScrollAnimation(0.3)
  const gapAnimation = useScrollAnimation(0.3)
  const methodologyAnimation = useScrollAnimation(0.3)
  const faqAnimation = useScrollAnimation(0.3)

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section
        ref={heroAnimation.ref}
        className={`min-h-screen bg-gradient-to-b from-purple-50 to-white px-4 py-20 transition-all duration-1000 ${
          heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-purple-900 mb-6">
              A-Level to NEET Biology
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Your A-Level foundation is elite. Accelerate to NEET success with expert coaching
              designed for advanced-level students targeting top medical colleges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="https://wa.me/918826444334"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Get Details on WhatsApp
                </Button>
              </Link>
              <Button
                variant="outline"
                className="px-8 py-3 border-purple-900 text-purple-900 hover:bg-purple-50"
              >
                Book Free Consultation
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div
            ref={statsAnimation.ref}
            className={`grid md:grid-cols-4 gap-6 mb-12 transition-all duration-1000 ${
              statsAnimation.isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="bg-purple-100 rounded-lg p-6 text-center">
              <Trophy className="w-10 h-10 text-purple-900 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-purple-900">96%</h3>
              <p className="text-gray-700">Success Rate</p>
            </div>
            <div className="bg-indigo-100 rounded-lg p-6 text-center">
              <Users className="w-10 h-10 text-indigo-900 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-indigo-900">280+</h3>
              <p className="text-gray-700">A-Level Students Coached</p>
            </div>
            <div className="bg-pink-100 rounded-lg p-6 text-center">
              <Star className="w-10 h-10 text-pink-900 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-pink-900">715+</h3>
              <p className="text-gray-700">Average Score</p>
            </div>
            <div className="bg-blue-100 rounded-lg p-6 text-center">
              <GraduationCap className="w-10 h-10 text-blue-900 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-blue-900">98+</h3>
              <p className="text-gray-700">Medical Admissions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Syllabus Comparison */}
      <section className="bg-gray-50 px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-purple-900 mb-4">
            A-Level vs NEET: Key Differences
          </h2>
          <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
            Understanding how to leverage your A-Level strength for NEET success
          </p>

          <div className="grid gap-6">
            {syllabusGapData.map((item, index) => (
              <div
                ref={gapAnimation.ref}
                key={index}
                className={`bg-white rounded-lg p-6 border-l-4 border-purple-500 transition-all duration-1000 ${
                  gapAnimation.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
              >
                <h3 className="text-xl font-bold text-purple-900 mb-4">{item.category}</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">A-Level Depth</h4>
                    <p className="text-gray-700 text-sm">{item.aLevelCovered}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">NEET Focus</h4>
                    <p className="text-gray-700 text-sm">{item.neetRequired}</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded">
                    <h4 className="font-semibold text-purple-900 mb-2">Bridge Strategy</h4>
                    <p className="text-gray-700 text-sm">{item.focusArea}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bridge Methodology */}
      <section className="px-4 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-purple-900 mb-4">
            Our 4-Step Bridge Methodology
          </h2>
          <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
            Proven process for A-Level to NEET acceleration
          </p>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {methodologySteps.map((step, index) => (
              <div
                ref={methodologyAnimation.ref}
                key={index}
                className={`bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 text-center transition-all duration-1000 hover:shadow-lg ${
                  methodologyAnimation.isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="w-12 h-12 bg-purple-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-3">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-purple-900 mb-6">A-Level Advantages</h3>
              <ul className="space-y-4">
                {[
                  'Deep understanding of biological mechanisms and pathways',
                  'Comfortable with complex scientific analysis and reasoning',
                  'Strong problem-solving skills for difficult questions',
                  'Confidence in tackling advanced biological concepts',
                  'Independent study skills and analytical thinking',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-purple-900 mb-6">Bridge Focuses On</h3>
              <ul className="space-y-4">
                {[
                  'Converting deep knowledge to NEET MCQ format',
                  'Developing rapid problem-solving speed',
                  'Adding medical application perspective',
                  'Mastering NEET-specific question patterns',
                  'Strategic approach to competitive exam dynamics',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {bridgeFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all"
                >
                  <Icon className="w-10 h-10 text-purple-900 mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Who Is This For */}
      <section className="bg-purple-50 px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-purple-900 mb-4">
            Who Is This Program For?
          </h2>
          <p className="text-center text-gray-700 mb-12">
            Perfect for A-Level Biology students in these situations
          </p>

          <div className="grid gap-4">
            {whoIsThisFor.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 flex items-start gap-4 hover:shadow-md transition-all"
              >
                <CheckCircle className="w-6 h-6 text-purple-900 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-4 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-purple-900 mb-4">
            Coaching Plans & Pricing
          </h2>
          <p className="text-center text-gray-700 mb-12">
            Choose the intensity level that matches your goals
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`rounded-lg overflow-hidden transition-all hover:shadow-2xl ${
                  index === 1
                    ? 'bg-purple-900 text-white ring-2 ring-purple-400 scale-105'
                    : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className="p-6">
                  <h3 className={`text-2xl font-bold mb-2 ${index === 1 ? 'text-white' : 'text-purple-900'}`}>
                    {tier.name}
                  </h3>
                  <p className={`mb-4 ${index === 1 ? 'text-purple-100' : 'text-gray-700'}`}>
                    {tier.duration}
                  </p>
                  <p className={`text-xl font-bold mb-6 ${index === 1 ? 'text-purple-100' : 'text-gray-900'}`}>
                    {tier.price}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle
                          className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                            index === 1 ? 'text-purple-200' : 'text-green-500'
                          }`}
                        />
                        <span className={index === 1 ? 'text-purple-50' : 'text-gray-700'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-700 mb-6">
              Custom plans available. Get personalized pricing matching your timeline and goals.
            </p>
            <Link
              href="https://wa.me/918826444334"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3">
                <MessageCircle className="w-5 h-5 mr-2" />
                Get Personalized Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-purple-900 mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div
                ref={faqAnimation.ref}
                key={index}
                className={`bg-white rounded-lg p-6 transition-all duration-1000 ${
                  faqAnimation.isVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <h3 className="text-lg font-bold text-purple-900 mb-3">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-900 to-purple-800 text-white px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Accelerate Your A-Level to NEET Success</h2>
          <p className="text-xl mb-8 text-purple-100">
            Our A-Level specialists will assess your strengths and design a personalized bridge
            program to achieve your medical college goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://wa.me/918826444334"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 w-full sm:w-auto">
                <MessageCircle className="w-5 h-5 mr-2" />
                Message on WhatsApp
              </Button>
            </Link>
            <Button
              variant="outline"
              className="text-white border-white hover:bg-purple-700 px-8 py-3"
            >
              Call: 8826444334
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
