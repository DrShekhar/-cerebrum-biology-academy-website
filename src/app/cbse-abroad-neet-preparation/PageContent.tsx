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
    title: 'Same Curriculum Advantage',
    description: 'Your CBSE foundation is perfect for NEET. We accelerate from familiarity to excellence.',
  },
  {
    icon: Target,
    title: 'Timezone-Friendly Scheduling',
    description: 'Classes scheduled for US, UK, UAE, Singapore, Australia timezones. Choose your slot.',
  },
  {
    icon: Headphones,
    title: '24/7 Doubt Support',
    description: 'Round-the-clock WhatsApp & email support. Never miss a doubt clearance opportunity.',
  },
  {
    icon: Play,
    title: 'Recorded + Live Flexibility',
    description: 'Live classes + complete recorded library. Catch up anytime, any timezone.',
  },
  {
    icon: Shield,
    title: 'NRI Expert Mentoring',
    description: 'Faculty experienced in coaching NRI students. Understand overseas study challenges.',
  },
  {
    icon: Star,
    title: 'Medical College Return',
    description: 'Specific coaching for returning to India for medical studies. All admission processes covered.',
  },
]

const whyOurApproach = [
  {
    title: 'Overseas Scheduling',
    description: 'Morning IST (US night), afternoon IST (UK morning), evening IST (UAE-Singapore morning). Pick your timezone.',
  },
  {
    title: 'Consistent Curriculum',
    description: 'CBSE + NEET alignment means you leverage existing knowledge. No new curriculum to learn.',
  },
  {
    title: 'Return-to-India Ready',
    description: 'Coaching focused on returning to India for medical college. Help with admission processes.',
  },
  {
    title: 'NRI Student Support',
    description: 'Understand visa timelines, travel arrangements, and medical college admission procedures.',
  },
]

const timeZones = [
  { region: 'USA (West)', time: '10:00 PM - 11:30 PM PST', note: 'Perfect morning study in US' },
  { region: 'USA (East)', time: '1:00 AM - 2:30 AM EST', note: 'After midnight study option' },
  { region: 'UK/Europe', time: '4:00 AM - 5:30 AM GMT', note: 'Early morning before school' },
  { region: 'UAE/Middle East', time: '8:00 AM - 9:30 AM GST', note: 'Perfect morning slot' },
  { region: 'Singapore/Hong Kong', time: '12:00 PM - 1:30 PM SGT', note: 'Afternoon slot' },
  { region: 'Australia', time: '2:30 PM - 4:00 PM AEST', note: 'Afternoon in Australia' },
]

const whoIsThisFor = [
  'CBSE-curriculum students studying abroad in US, UK, UAE, Singapore, or Australia',
  'NRI children maintaining CBSE education while preparing for NEET',
  'Students planning to return to India for medical college admission',
  'Parents seeking qualified NEET coaching from India for overseas children',
  'CBSE expatriate students targeting top Indian medical colleges',
]

const methodologySteps = [
  {
    number: '1',
    title: 'Timezone Alignment',
    description: 'Determine your timezone and optimal study hours. Schedule classes accordingly.',
  },
  {
    number: '2',
    title: 'NEET Readiness Check',
    description: 'Assess CBSE foundation gaps if any. Plan accelerated or standard track.',
  },
  {
    number: '3',
    title: 'Focused Coaching',
    description: 'Live classes + recorded sessions. Flexible learning around school/abroad schedule.',
  },
  {
    number: '4',
    title: 'Intensive Practice',
    description: 'Full practice tests, previous papers, medical college admission guidance.',
  },
]

const faqData = [
  {
    question: 'Can I prepare for NEET while studying abroad in school?',
    answer:
      'Absolutely! Many CBSE students abroad successfully prepare for NEET while continuing school. Our flexible scheduling works around school timings. Classes are recorded so you can study at your pace. Key is consistent effort - 2-3 hours daily. We provide structured guidance to manage both.',
  },
  {
    question: 'What are timezone-friendly classes? How do they work?',
    answer:
      'We offer classes across multiple timezones: US (night), UK (early morning), UAE (morning), Singapore/Australia (afternoon). You pick your timezone during enrollment. Classes happen at your preferred time. All sessions are recorded for flexibility. Live doubt clearing available in your timezone.',
  },
  {
    question: 'Is CBSE syllabus exactly NEET syllabus?',
    answer:
      'Yes! CBSE is designed considering NEET requirements. You already know 90% of NEET syllabus. We focus on depth in specific areas, speed enhancement, and competitive exam strategies. Your advantage: no new curriculum to learn, just refinement of existing knowledge.',
  },
  {
    question: 'How do I return to India for medical college after NEET?',
    answer:
      'Complete process is covered: NEET admission counselling, medical college selection, seat allocation process, hostel arrangements, and transition support. We guide parents through returning child to India for medical studies. Many of our NRI students have successfully done this.',
  },
  {
    question: 'Do you provide 24/7 support for timezones?',
    answer:
      'Yes. WhatsApp + email support available 24/7. Your doubts answered within 2-4 hours regardless of timezone. Live doubt clearing sessions scheduled in your timezone twice weekly. You never feel isolated despite being abroad.',
  },
  {
    question: 'How do I take NEET from abroad? What\'s the process?',
    answer:
      'NRI candidates can take NEET from centers in countries with Indian embassies or CBSE-affiliated schools. We guide entire process: exam center selection, registration, travel arrangements. We prepare you the same way as students taking NEET from India - no difference in curriculum or difficulty.',
  },
]

const pricingTiers = [
  {
    name: 'Essential Plan',
    duration: '6-8 months',
    price: 'Contact via WhatsApp',
    features: [
      'Timezone-appropriate classes',
      'Complete NEET syllabus',
      'Recorded lectures',
      'Live doubt clearing 2x/week',
      'Monthly tests',
    ],
  },
  {
    name: 'Premium Plan',
    duration: '8-10 months',
    price: 'Contact via WhatsApp',
    features: [
      'All essential features',
      'Live classes 4x/week',
      'Full test series',
      'Medical college return guidance',
      'Scholarship guidance',
      'Weekly performance tracking',
      '24/7 chat support',
    ],
  },
  {
    name: 'Elite NRI Program',
    duration: '10-12 months',
    price: 'Contact via WhatsApp',
    features: [
      'All premium features',
      'Personalized 1-on-1 mentoring',
      'Weekly strategy sessions',
      'Complete admission guidance',
      'Visa & travel coordination',
      'Parent consultation calls',
      'Guaranteed support till admission',
    ],
  },
]

const successStories = [
  {
    name: 'Aryan - USA',
    score: '720/720',
    college: 'AIIMS Delhi',
    story: 'Studied in California, cracked NEET with 720/720 with our timezone-friendly classes. Now in AIIMS.',
  },
  {
    name: 'Divya - UK',
    score: '710/720',
    college: 'JIPMER Puducherry',
    story: 'London-based CBSE student scored 710. Our early morning UK slots fit perfectly with school schedule.',
  },
  {
    name: 'Rohan - UAE',
    score: '705/720',
    college: 'MAULANA AZAD MEDICAL',
    story: 'Dubai resident achieved 705 with our UAE morning classes. Now pursuing medicine in India.',
  },
]

export default function CBSEAbroadContent() {
  const heroAnimation = useScrollAnimation(0.3)
  const statsAnimation = useScrollAnimation(0.3)
  const tzAnimation = useScrollAnimation(0.3)
  const methodologyAnimation = useScrollAnimation(0.3)
  const faqAnimation = useScrollAnimation(0.3)

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section
        ref={heroAnimation.ref}
        className={`min-h-screen bg-gradient-to-b from-amber-50 to-white px-4 py-20 transition-all duration-1000 ${
          heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-amber-900 mb-6">
              CBSE Abroad NEET Preparation
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Expert NEET coaching for CBSE students studying abroad. Timezone-friendly classes,
              same curriculum advantage, proven 98% success rate. Prepare from USA, UK, UAE, Singapore,
              Australia - anywhere in the world.
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
                className="px-8 py-3 border-amber-900 text-amber-900 hover:bg-amber-50"
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
            <div className="bg-amber-100 rounded-lg p-6 text-center">
              <Trophy className="w-10 h-10 text-amber-900 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-amber-900">98%</h3>
              <p className="text-gray-700">Success Rate</p>
            </div>
            <div className="bg-orange-100 rounded-lg p-6 text-center">
              <Users className="w-10 h-10 text-orange-900 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-orange-900">450+</h3>
              <p className="text-gray-700">NRI Students Coached</p>
            </div>
            <div className="bg-yellow-100 rounded-lg p-6 text-center">
              <Star className="w-10 h-10 text-yellow-900 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-yellow-900">695+</h3>
              <p className="text-gray-700">Average Score</p>
            </div>
            <div className="bg-red-100 rounded-lg p-6 text-center">
              <GraduationCap className="w-10 h-10 text-red-900 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-red-900">180+</h3>
              <p className="text-gray-700">Medical Admissions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timezone Section */}
      <section className="bg-gray-50 px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-amber-900 mb-4">
            Classes for Every Timezone
          </h2>
          <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
            Wherever you are studying abroad, we have a class slot that fits your schedule
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timeZones.map((tz, index) => (
              <div
                ref={tzAnimation.ref}
                key={index}
                className={`bg-white rounded-lg p-6 border-l-4 border-amber-500 transition-all duration-1000 hover:shadow-lg ${
                  tzAnimation.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
              >
                <h3 className="text-lg font-bold text-amber-900 mb-2">{tz.region}</h3>
                <p className="text-gray-900 font-semibold mb-2">{tz.time}</p>
                <p className="text-gray-700 text-sm">{tz.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Approach */}
      <section className="px-4 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-amber-900 mb-4">
            Why Cerebrum for NRI Students?
          </h2>
          <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
            Specialized expertise in coaching CBSE students abroad
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {whyOurApproach.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6 border border-amber-200"
              >
                <h3 className="text-xl font-bold text-amber-900 mb-3">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {bridgeFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all"
                >
                  <Icon className="w-10 h-10 text-amber-900 mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                </div>
              )
            })}
          </div>

          <div className="bg-amber-50 rounded-lg p-8 border border-amber-200">
            <h3 className="text-2xl font-bold text-amber-900 mb-6">CBSE + NEET Advantage</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-amber-900 mb-4">Your Advantage</h4>
                <ul className="space-y-3">
                  {[
                    'CBSE curriculum is NEET-focused',
                    'Same NCERT textbooks',
                    '90% syllabus overlap',
                    'Familiar learning style',
                    'No new curriculum to learn',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-amber-900 mb-4">We Provide</h4>
                <ul className="space-y-3">
                  {[
                    'Expert guidance on NEET patterns',
                    'Speed & accuracy training',
                    'Medical college admission help',
                    'Return-to-India planning',
                    'NRI-specific support',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="bg-gray-50 px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-amber-900 mb-12">
            Success Stories from NRI Students
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 border-l-4 border-green-500 hover:shadow-lg transition-all"
              >
                <h3 className="text-lg font-bold text-amber-900 mb-2">{story.name}</h3>
                <p className="text-2xl font-bold text-green-600 mb-2">{story.score}</p>
                <p className="text-amber-800 font-semibold mb-3">{story.college}</p>
                <p className="text-gray-700 italic">{story.story}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Is This For */}
      <section className="bg-amber-50 px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-amber-900 mb-4">
            Who Should Enroll?
          </h2>
          <p className="text-center text-gray-700 mb-12">
            Perfect for CBSE students in these situations
          </p>

          <div className="grid gap-4">
            {whoIsThisFor.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 flex items-start gap-4 hover:shadow-md transition-all"
              >
                <CheckCircle className="w-6 h-6 text-amber-900 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-4 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-amber-900 mb-4">
            NRI Coaching Plans
          </h2>
          <p className="text-center text-gray-700 mb-12">
            Choose based on your timeline and support needs
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`rounded-lg overflow-hidden transition-all hover:shadow-2xl ${
                  index === 1
                    ? 'bg-amber-900 text-white ring-2 ring-amber-400 scale-105'
                    : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className="p-6">
                  <h3 className={`text-2xl font-bold mb-2 ${index === 1 ? 'text-white' : 'text-amber-900'}`}>
                    {tier.name}
                  </h3>
                  <p className={`mb-4 ${index === 1 ? 'text-amber-100' : 'text-gray-700'}`}>
                    {tier.duration}
                  </p>
                  <p className={`text-xl font-bold mb-6 ${index === 1 ? 'text-amber-100' : 'text-gray-900'}`}>
                    {tier.price}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle
                          className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                            index === 1 ? 'text-amber-200' : 'text-green-500'
                          }`}
                        />
                        <span className={index === 1 ? 'text-amber-50' : 'text-gray-700'}>
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
              Custom plans available. Get personalized pricing and timezone scheduling.
            </p>
            <Link
              href="https://wa.me/918826444334"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3">
                <MessageCircle className="w-5 h-5 mr-2" />
                Discuss Your Timezone & Plan
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-amber-900 mb-12">
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
                <h3 className="text-lg font-bold text-amber-900 mb-3">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-amber-900 to-orange-800 text-white px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Crack NEET from Anywhere in the World?
          </h2>
          <p className="text-xl mb-8 text-amber-100">
            Tell us your timezone and goal. We'll design a personalized plan to help you achieve
            your medical college dreams.
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
              className="text-white border-white hover:bg-amber-700 px-8 py-3"
            >
              Call: 8826444334
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
