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
    title: 'Cambridge to NCERT Bridge',
    description: 'Align Cambridge IGCSE concepts with NCERT chapters. Map familiar topics to Indian curriculum.',
  },
  {
    icon: Target,
    title: 'NEET MCQ Mastery',
    description: 'Transition from Cambridge extended response to NEET single correct answer format. 4000+ practice MCQs.',
  },
  {
    icon: Headphones,
    title: 'Live Doubt Sessions',
    description: '24/7 chat support + interactive doubt clearing for Cambridge-specific gaps.',
  },
  {
    icon: Play,
    title: 'Speed & Accuracy Training',
    description: 'IGCSE teaches depth; NEET demands speed. Master both with timed practice modules.',
  },
  {
    icon: Shield,
    title: 'Medical Relevance',
    description: 'IGCSE is broad-based; NEET is medical-focused. We bridge this perspective shift.',
  },
  {
    icon: Star,
    title: 'NEET Pattern Mastery',
    description: 'Learn NEET-specific question patterns, negative marking strategy, and time management.',
  },
]

const syllabusGapData = [
  {
    category: 'Cell & Genetics',
    igcseCovered: 'Cell structure, simple inheritance, DNA basics',
    neetRequired: 'Cell division (mitosis/meiosis depth), human genetics, multiple inheritance patterns',
    focusArea: 'Meiosis stages, polyploidy, linkage, genetic crosses, blood group inheritance',
  },
  {
    category: 'Respiration & Photosynthesis',
    igcseCovered: 'Basic aerobic & anaerobic respiration',
    neetRequired: 'Detailed pathway knowledge (Krebs, ETC), photosynthesis mechanisms, light reactions',
    focusArea: 'ATP production pathways, electron transport chain, Calvin cycle, C3/C4 plants',
  },
  {
    category: 'Human Physiology',
    igcseCovered: 'Organ systems overview',
    neetRequired: 'Detailed physiology - nerve impulse, muscle contraction, hormonal regulation',
    focusArea: 'Action potential, synapse, muscle physiology, endocrine system detail, feedback',
  },
  {
    category: 'Ecology & Evolution',
    igcseCovered: 'Biomes, populations, basic evolution',
    neetRequired: 'Biogeochemical cycles, succession, speciation, adaptation, Indian ecosystems',
    focusArea: 'Nitrogen & carbon cycles, ecological succession, natural selection, species interactions',
  },
]

const whoIsThisFor = [
  'IGCSE Biology students taking NEET for Indian medical colleges',
  'Cambridge curriculum students transitioning to Indian education',
  'International school students moving back to India',
  'Students seeking to leverage IGCSE foundation for NEET success',
  'IGCSE passouts looking for post-board medical entrance coaching',
]

const methodologySteps = [
  {
    number: '1',
    title: 'Curriculum Mapping',
    description: 'Map Cambridge IGCSE chapters to NEET syllabus. Identify overlaps, gaps, and depth requirements.',
  },
  {
    number: '2',
    title: 'Foundation Bridge',
    description: 'Fill gaps in topic depth. Learn NEET requirements beyond Cambridge scope.',
  },
  {
    number: '3',
    title: 'MCQ Pattern Training',
    description: 'Shift from extended response to NEET single-select MCQs. Practice with curated questions.',
  },
  {
    number: '4',
    title: 'Intensive Practice',
    description: 'Solve 4000+ MCQs, full-length tests, and previous year papers with performance analysis.',
  },
]

const faqData = [
  {
    question: 'Is IGCSE Biology sufficient for NEET?',
    answer:
      'IGCSE provides a solid foundation but requires depth addition in several areas. IGCSE is broad, conceptual, and English-medium focused. NEET requires deeper understanding of specific topics, emphasis on medical relevance, and Indian curriculum alignment. Our bridge program fills these gaps in 3-4 months.',
  },
  {
    question: 'What are major differences between Cambridge IGCSE and NEET?',
    answer:
      'IGCSE: Extended response questions, descriptive answers, broader topics, laboratory focus. NEET: Single correct answer MCQs, specific factual knowledge, medical orientation, time-bound, numerical problems. Our program trains you to think NEET-style while leveraging IGCSE conceptual strength.',
  },
  {
    question: 'How much additional preparation is needed after IGCSE?',
    answer:
      'For IGCSE passouts: 3-4 months intensive bridge coaching. For parallel IGCSE + NEET: 4-5 months with integrated curriculum. Students benefit from IGCSE conceptual foundation - you need gap filling and pattern mastery, not starting from scratch like Indian board students.',
  },
  {
    question: 'Can I score 650+ in NEET with IGCSE background?',
    answer:
      'Absolutely! hundreds of IGCSE students have achieved 650+ scores with our program. IGCSE students have strong concept clarity which helps in difficult questions. Our focus is converting this strength into NEET-specific problem-solving and speed.',
  },
  {
    question: 'Do you provide IGCSE-specific study material?',
    answer:
      'Yes. We have Cambridge-to-NEET mapping documents, IGCSE-student-specific MCQs, bridging notes for each chapter, and detailed solutions addressing IGCSE perspective. All material recognizes IGCSE background.',
  },
  {
    question: 'How do you teach NEET MCQ strategy to IGCSE students?',
    answer:
      'We train you systematically: understand question pattern, practice individually, learn time management for 4 options, negative marking strategy, educated guessing when needed. Mock tests with detailed analysis help transition from IGCSE exam style to NEET format.',
  },
]

const pricingTiers = [
  {
    name: 'Bridge Only',
    duration: '3 months',
    price: 'Contact via WhatsApp',
    features: [
      'Curriculum mapping',
      'Gap analysis & bridging',
      'Essential topics coverage',
      'Live classes 3x/week',
      'MCQ practice 1000+',
    ],
  },
  {
    name: 'Complete Program',
    duration: '4-5 months',
    price: 'Contact via WhatsApp',
    features: [
      'Full bridge curriculum',
      'Complete NEET syllabus',
      'Live classes 5x/week',
      '4000+ MCQ practice',
      'Weekly test series',
      'Performance tracking',
      'Doubt clearing',
    ],
  },
  {
    name: 'Premium + Mentoring',
    duration: '5-6 months',
    price: 'Contact via WhatsApp',
    features: [
      'All complete program features',
      'Advanced test series',
      '1-on-1 personalized guidance',
      'Weekly strategy sessions',
      'Topic-specific mentoring',
      'Answer script evaluation',
      'Guaranteed support till exam',
    ],
  },
]

export default function IGCSEToNEETContent() {
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
        className={`min-h-screen bg-gradient-to-b from-emerald-50 to-white px-4 py-20 transition-all duration-1000 ${
          heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-emerald-900 mb-6">
              IGCSE to NEET Biology Bridge
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Seamlessly transition from Cambridge curriculum to NEET excellence. Expert bridging
              program designed specifically for IGCSE students targeting top medical colleges.
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
                className="px-8 py-3 border-emerald-900 text-emerald-900 hover:bg-emerald-50"
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
            <div className="bg-emerald-100 rounded-lg p-6 text-center">
              <Trophy className="w-10 h-10 text-emerald-900 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-emerald-900">92%</h3>
              <p className="text-gray-700">Success Rate</p>
            </div>
            <div className="bg-teal-100 rounded-lg p-6 text-center">
              <Users className="w-10 h-10 text-teal-900 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-teal-900">67+</h3>
              <p className="text-gray-700">IGCSE Students Coached</p>
            </div>
            <div className="bg-cyan-100 rounded-lg p-6 text-center">
              <Star className="w-10 h-10 text-cyan-900 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-cyan-900">680+</h3>
              <p className="text-gray-700">Average Score</p>
            </div>
            <div className="bg-green-100 rounded-lg p-6 text-center">
              <GraduationCap className="w-10 h-10 text-green-900 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-green-900">150+</h3>
              <p className="text-gray-700">Medical Admissions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Syllabus Gap Analysis */}
      <section className="bg-gray-50 px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-emerald-900 mb-4">
            Cambridge to NEET: The Curriculum Gap
          </h2>
          <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
            Understanding IGCSE strengths and NEET-specific requirements
          </p>

          <div className="grid gap-6">
            {syllabusGapData.map((item, index) => (
              <div
                ref={gapAnimation.ref}
                key={index}
                className={`bg-white rounded-lg p-6 border-l-4 border-emerald-500 transition-all duration-1000 ${
                  gapAnimation.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
              >
                <h3 className="text-xl font-bold text-emerald-900 mb-4">{item.category}</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">IGCSE Covered</h4>
                    <p className="text-gray-700 text-sm">{item.igcseCovered}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">NEET Required</h4>
                    <p className="text-gray-700 text-sm">{item.neetRequired}</p>
                  </div>
                  <div className="bg-emerald-50 p-3 rounded">
                    <h4 className="font-semibold text-emerald-900 mb-2">Bridge Focus</h4>
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
          <h2 className="text-4xl font-bold text-center text-emerald-900 mb-4">
            Our 4-Step Bridge Methodology
          </h2>
          <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
            Proven process for IGCSE to NEET success
          </p>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {methodologySteps.map((step, index) => (
              <div
                ref={methodologyAnimation.ref}
                key={index}
                className={`bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-6 text-center transition-all duration-1000 hover:shadow-lg ${
                  methodologyAnimation.isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="w-12 h-12 bg-emerald-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-emerald-900 mb-3">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-emerald-900 mb-6">IGCSE Strengths We Leverage</h3>
              <ul className="space-y-4">
                {[
                  'Strong conceptual foundation across all biology topics',
                  'Comfortable with scientific language and terminology',
                  'Practical experience from lab work and experiments',
                  'Familiarity with complex scientific concepts',
                  'Independent learning and analytical thinking skills',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-emerald-900 mb-6">Bridge Program Benefits</h3>
              <ul className="space-y-4">
                {[
                  'Convert extended response thinking to NEET MCQ format',
                  'Add topic depth required for medical entrance',
                  'Master NEET-specific question patterns',
                  'Develop speed without losing accuracy',
                  'Learn medical relevance perspective',
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
                  <Icon className="w-10 h-10 text-emerald-900 mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Who Is This For */}
      <section className="bg-emerald-50 px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-emerald-900 mb-4">
            Who Should Take This Course?
          </h2>
          <p className="text-center text-gray-700 mb-12">
            This bridge program is ideal for:
          </p>

          <div className="grid gap-4">
            {whoIsThisFor.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 flex items-start gap-4 hover:shadow-md transition-all"
              >
                <CheckCircle className="w-6 h-6 text-emerald-900 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-4 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-emerald-900 mb-4">
            Pricing & Plans
          </h2>
          <p className="text-center text-gray-700 mb-12">
            Choose based on your timeline and intensity preference
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`rounded-lg overflow-hidden transition-all hover:shadow-2xl ${
                  index === 1
                    ? 'bg-emerald-900 text-white ring-2 ring-emerald-400 scale-105'
                    : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className="p-6">
                  <h3 className={`text-2xl font-bold mb-2 ${index === 1 ? 'text-white' : 'text-emerald-900'}`}>
                    {tier.name}
                  </h3>
                  <p className={`mb-4 ${index === 1 ? 'text-emerald-100' : 'text-gray-700'}`}>
                    {tier.duration}
                  </p>
                  <p className={`text-xl font-bold mb-6 ${index === 1 ? 'text-emerald-100' : 'text-gray-900'}`}>
                    {tier.price}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle
                          className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                            index === 1 ? 'text-emerald-200' : 'text-green-500'
                          }`}
                        />
                        <span className={index === 1 ? 'text-emerald-50' : 'text-gray-700'}>
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
              Custom plans available. Contact us for personalized pricing based on your timeline.
            </p>
            <Link
              href="https://wa.me/918826444334"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3">
                <MessageCircle className="w-5 h-5 mr-2" />
                Get Custom Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-emerald-900 mb-12">
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
                <h3 className="text-lg font-bold text-emerald-900 mb-3">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-emerald-900 to-emerald-800 text-white px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transition to NEET Success?</h2>
          <p className="text-xl mb-8 text-emerald-100">
            Our IGCSE-to-NEET specialists are ready to assess your background and design a custom
            bridge program for you.
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
              className="text-white border-white hover:bg-emerald-700 px-8 py-3"
            >
              Call: 8826444334
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
