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
    title: 'NCERT + IB Alignment',
    description: 'Map IB HL/SL concepts to NCERT and identify gaps in Indian medical curriculum focus areas.',
  },
  {
    icon: Target,
    title: 'HL to NEET Depth',
    description: 'Convert IB HL understanding into NEET speed. Master NCERT depth at medical school level.',
  },
  {
    icon: Headphones,
    title: 'Doubt Clearing Sessions',
    description: '24/7 chat support + weekly live doubt clearing sessions for IB-specific conceptual gaps.',
  },
  {
    icon: Play,
    title: 'NEET MCQ Mastery',
    description: 'Master NEET-style MCQs with 4000+ curated questions from IB student perspective.',
  },
  {
    icon: Shield,
    title: 'Medical Context',
    description: 'Focus on applied medical biology relevant to NEET, not just theoretical IB concepts.',
  },
  {
    icon: Star,
    title: 'Fast-Track Module',
    description: 'Accelerated bridging in 3-4 months for IB students starting NEET prep late.',
  },
]

const syllabusGapData = [
  {
    category: 'Cell Biology',
    ibCovered: 'Cell structure, organelles, transport mechanisms',
    neetRequired: 'Indian medical focus on cell divisions (mitosis, meiosis), enzyme kinetics, photosynthesis',
    focusArea: 'Meiosis & gametogenesis, photosynthesis depth, enzyme inhibition',
  },
  {
    category: 'Genetics',
    ibCovered: 'Mendelian genetics, pedigree analysis, molecular basis',
    neetRequired: 'NCERT human genetics emphasis, blood groups, genetic disorders, mutations',
    focusArea: 'Blood group genetics, human hereditary disorders, mutation types',
  },
  {
    category: 'Physiology',
    ibCovered: 'Systems approach with biochemical understanding',
    neetRequired: 'Detailed Indian physiology curriculum, nerve conduction, muscle contraction',
    focusArea: 'Action potential, neuromuscular junction, hormonal regulation depth',
  },
  {
    category: 'Ecology',
    ibCovered: 'Energy flow, biomes, population dynamics',
    neetRequired: 'Indian ecosystem focus, biogeochemical cycles, succession',
    focusArea: 'Biogeochemical cycles detail, ecological succession, species interactions',
  },
]

const whoIsThisFor = [
  'IB Biology HL students targeting top medical colleges',
  'IB HL/SL students taking NEET as competitive medical entrance',
  'Students with strong conceptual IB foundation needing NEET-specific strategy',
  'International school IB students moving back to India for medical education',
  'Parents seeking guided transition from IB to Indian medical curriculum',
]

const methodologySteps = [
  {
    number: '1',
    title: 'Gap Analysis',
    description: 'Comprehensive assessment of IB topics vs NEET syllabus. Identify your strong areas and gaps.',
  },
  {
    number: '2',
    title: 'NCERT Mapping',
    description: 'Align IB concepts with NCERT chapters. Learn medical school perspective on familiar topics.',
  },
  {
    number: '3',
    title: 'Intensive Coaching',
    description: 'Expert-led sessions on NEET-specific topics missing from IB curriculum.',
  },
  {
    number: '4',
    title: 'Practice & Tests',
    description: 'Solve 4000+ NEET MCQs with IB-to-NEET difficulty progression.',
  },
]

const faqData = [
  {
    question: 'How is IB Biology different from NEET syllabus?',
    answer:
      'IB Biology is conceptually deeper with broader scope (evolution, ecology, plant physiology). NEET focuses on Indian medical entrance specifics - human anatomy, medical relevance, NCERT patterns. IB HL covers similar depth but with different emphasis. SL students need more foundational work.',
  },
  {
    question: 'Can I prepare for NEET after completing IB?',
    answer:
      'Absolutely! Your IB foundation is strong. With targeted 3-4 month bridging, IB students achieve excellent NEET results. Your conceptual strength gives you advantage in difficult questions. We bridge the curriculum gap and teach NEET patterns.',
  },
  {
    question: 'How long does IB to NEET bridge preparation take?',
    answer:
      'For IB HL students: 2-3 months (gap filling + practice). For IB SL students: 3-4 months. Timeline depends on your readiness. We offer accelerated modules for late starters. Full parallel preparation: 6 months while completing IB.',
  },
  {
    question: 'What is your success rate with IB students?',
    answer:
      '95% of IB students achieve 650+ scores with our bridge program. Top performers score 700+. IB students inherently strong in concepts do well in NEET difficult questions. Our focus is translating conceptual strength to NEET-style problem solving.',
  },
  {
    question: 'Do you provide study material aligned with NEET?',
    answer:
      'Yes. Our IB-to-NEET material directly addresses the gap. NCERT summaries, IB-NEET comparison charts, 4000+ MCQs, previous year papers, and IB student-specific test series. All material targets IB background students.',
  },
  {
    question: 'How do you handle IB HL vs SL difference?',
    answer:
      'SL and HL students get different pacing. HL students focus on NEET-specific additions and practice. SL students get foundational bridging + NEET additions. Separate study plans ensure both groups reach same NEET readiness level.',
  },
]

const pricingTiers = [
  {
    name: 'Quick Bridge',
    duration: '3 months',
    price: 'Contact via WhatsApp',
    features: [
      'Gap analysis & NCERT mapping',
      'Essential topics only',
      'Live classes 3x/week',
      'Recorded lectures',
      'Doubt clearing',
    ],
  },
  {
    name: 'Complete Bridge',
    duration: '4-5 months',
    price: 'Contact via WhatsApp',
    features: [
      'Full syllabus coverage',
      'All gap topics + NEET patterns',
      'Live classes 5x/week',
      '4000+ MCQ practice',
      'Weekly test series',
      'Doubt clearing + mentoring',
    ],
  },
  {
    name: 'Parallel + NEET',
    duration: '6 months',
    price: 'Contact via WhatsApp',
    features: [
      'Complete IB exam prep + NEET',
      'Integrated curriculum',
      'All premium features',
      'Advanced test series',
      'Personal mentoring',
      '1-on-1 guidance',
    ],
  },
]

export default function IBToNEETContent() {
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
        className={`min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-20 transition-all duration-1000 ${
          heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6">
              IB to NEET Biology Bridge
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Convert your strong IB foundation into NEET success. Expert bridging for IB HL/SL students
              targeting India's top medical colleges.
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
                className="px-8 py-3 border-blue-900 text-blue-900 hover:bg-blue-50"
              >
                Schedule Free Consultation
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
            <div className="bg-blue-100 rounded-lg p-6 text-center">
              <Trophy className="w-10 h-10 text-blue-900 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-blue-900">95%</h3>
              <p className="text-gray-700">Conversion Rate</p>
            </div>
            <div className="bg-purple-100 rounded-lg p-6 text-center">
              <Users className="w-10 h-10 text-purple-900 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-purple-900">320+</h3>
              <p className="text-gray-700">IB Students Coached</p>
            </div>
            <div className="bg-green-100 rounded-lg p-6 text-center">
              <Star className="w-10 h-10 text-green-900 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-green-900">700+</h3>
              <p className="text-gray-700">Average Score</p>
            </div>
            <div className="bg-orange-100 rounded-lg p-6 text-center">
              <GraduationCap className="w-10 h-10 text-orange-900 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-orange-900">85+</h3>
              <p className="text-gray-700">Medical Admissions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Syllabus Gap Analysis */}
      <section className="bg-gray-50 px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-4">
            Syllabus Gap Analysis
          </h2>
          <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
            Understanding what IB covers vs what NEET requires is crucial for your success
          </p>

          <div className="grid gap-6">
            {syllabusGapData.map((item, index) => (
              <div
                ref={gapAnimation.ref}
                key={index}
                className={`bg-white rounded-lg p-6 border-l-4 border-blue-500 transition-all duration-1000 ${
                  gapAnimation.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
              >
                <h3 className="text-xl font-bold text-blue-900 mb-4">{item.category}</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">IB Covered</h4>
                    <p className="text-gray-700 text-sm">{item.ibCovered}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">NEET Required</h4>
                    <p className="text-gray-700 text-sm">{item.neetRequired}</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded">
                    <h4 className="font-semibold text-blue-900 mb-2">Our Bridge Focus</h4>
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
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-4">
            Our Bridge Methodology
          </h2>
          <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
            Proven 4-step process for seamless IB to NEET transition
          </p>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {methodologySteps.map((step, index) => (
              <div
                ref={methodologyAnimation.ref}
                key={index}
                className={`bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center transition-all duration-1000 hover:shadow-lg ${
                  methodologyAnimation.isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="w-12 h-12 bg-blue-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-blue-900 mb-6">Why IB Students Excel in NEET</h3>
              <ul className="space-y-4">
                {[
                  'Strong conceptual foundation from IB curriculum',
                  'Used to analyzing complex biological systems',
                  'Better preparation for difficult NEET questions',
                  'IB practical experience adds advantage',
                  'Scientific writing skills transfer well',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-900 mb-6">Bridge Course Advantages</h3>
              <ul className="space-y-4">
                {[
                  'Learn NEET-specific question patterns',
                  'Master NCERT content with medical focus',
                  'Develop speed without losing accuracy',
                  'Targeted practice for common IB gaps',
                  'Personalized study plan based on gap analysis',
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
                  <Icon className="w-10 h-10 text-blue-900 mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Who Is This For */}
      <section className="bg-blue-50 px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-4">
            Who Is This Bridge Course For?
          </h2>
          <p className="text-center text-gray-700 mb-12">
            Perfect for IB students in these situations
          </p>

          <div className="grid gap-4">
            {whoIsThisFor.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 flex items-start gap-4 hover:shadow-md transition-all"
              >
                <CheckCircle className="w-6 h-6 text-blue-900 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-4 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-4">
            Flexible Pricing Plans
          </h2>
          <p className="text-center text-gray-700 mb-12">
            Choose the plan that fits your timeline and goals
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`rounded-lg overflow-hidden transition-all hover:shadow-2xl ${
                  index === 1
                    ? 'bg-blue-900 text-white ring-2 ring-blue-400 scale-105'
                    : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className="p-6">
                  <h3 className={`text-2xl font-bold mb-2 ${index === 1 ? 'text-white' : 'text-blue-900'}`}>
                    {tier.name}
                  </h3>
                  <p className={`mb-4 ${index === 1 ? 'text-blue-100' : 'text-gray-700'}`}>
                    {tier.duration}
                  </p>
                  <p className={`text-xl font-bold mb-6 ${index === 1 ? 'text-blue-100' : 'text-gray-900'}`}>
                    {tier.price}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle
                          className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                            index === 1 ? 'text-blue-200' : 'text-green-500'
                          }`}
                        />
                        <span className={index === 1 ? 'text-blue-50' : 'text-gray-700'}>
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
              Prices vary based on duration and intensity. Get personalized quote matching your timeline.
            </p>
            <Link
              href="https://wa.me/918826444334"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3">
                <MessageCircle className="w-5 h-5 mr-2" />
                Ask About Pricing on WhatsApp
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-12">
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
                <h3 className="text-lg font-bold text-blue-900 mb-3">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Bridge Your IB to NEET Success?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Connect with our expert counselors to discuss your IB background and NEET goals.
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
              className="text-white border-white hover:bg-blue-700 px-8 py-3"
            >
              Call: 8826444334
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
