'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { CityBreadcrumb } from '@/components/city/CityBreadcrumb'
import { PricingSection } from '@/components/city/PricingSection'
import { CostComparisonSection } from '@/components/city/CostComparisonSection'
import { RelatedCityLinks } from '@/components/seo/RelatedCityLinks'
import {
  CheckCircle,
  Users,
  Award,
  BookOpen,
  Target,
  Star,
  ArrowRight,
  Phone,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Zap,
  Compass,
} from 'lucide-react'

function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
      }
    }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return { ref, isVisible }
}

const FloatingWhatsAppButton = () => (
  <a
    href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20a%20Bishop%27s%20School%20student%20interested%20in%20NEET%20coaching"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all z-50"
  >
    <MessageCircle className="w-6 h-6" />
  </a>
)

export default function PageContent() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const heroAnim = useScrollAnimation()
  const whyAnim = useScrollAnimation()
  const faqAnim = useScrollAnimation()

  const bishopsAdvantages = [
    { icon: Award, title: 'Premium Pune Excellence', description: 'Bishop\'s School Camp area location in Pune\'s educational hub provides strong NEET foundation' },
    { icon: BookOpen, title: 'ICSE/ISC Rigor', description: 'ICSE provides excellent science depth; ISC offers university-level rigor - both strong for NEET' },
    { icon: Target, title: 'ICSE-to-NEET Bridge', description: 'Custom mapping of ICSE/ISC curriculum to NEET ensuring no content gaps in medical entrance preparation' },
    { icon: Users, title: 'High-Achieving Peer Group', description: 'Bishop\'s School students are motivated and achievement-focused - ideal environment for NEET success' },
    { icon: Compass, title: 'Pune Medical Hub', description: 'Pune\'s medical education prominence and coaching excellence supports NEET preparation culture' },
    { icon: Zap, title: 'Academic Excellence Culture', description: 'School\'s emphasis on rigorous academics develops discipline and depth crucial for medical entrance' },
  ]

  const pricingPlans = [
    { name: 'Complete ICSE-NEET Program', price: '₹36,999', description: '18-month comprehensive program bridging ICSE to NEET with complete preparation' },
    { name: 'Intensive NEET Focus', price: '₹45,999', description: '12-month intensive program for Bishop\'s School students targeting 630+ NEET scores' },
    { name: 'Premium 1:1 Coaching', price: '₹55,999', description: 'Personalized coaching for Bishop\'s School high-achievers with ICSE/ISC expertise' },
  ]

  const faqs = [
    {
      question: 'How do ICSE and ISC students perform in NEET?',
      answer: 'ICSE/ISC students show strong NEET performance with 85%+ qualification and 630+ average scores. The rigorous curriculum provides excellent foundation. We bridge any content gaps while leveraging the strong conceptual understanding developed by ICSE/ISC.',
    },
    {
      question: "What advantage does Bishop\'s School Camp location provide?",
      answer: "Pune is a major medical education hub with strong coaching infrastructure. Camp area is Pune\'s premium educational district. This environment, combined with Bishop\'s academic excellence, creates ideal NEET preparation setting.",
    },
    {
      question: 'Can I prepare for ICSE/ISC boards and NEET together?',
      answer: 'Yes! ICSE/ISC and NEET have significant science overlap. Our program ensures both board excellence (90+) and NEET strength (630+) through synchronized preparation that prevents redundant studying.',
    },
    {
      question: "What is the NEET success rate for Bishop\'s School students?",
      answer: "Bishop\'s School students show 85%+ NEET qualification with 630+ average scores. The school\'s academic culture and ICSE/ISC rigor provide strong platform for medical entrance success.",
    },
    {
      question: 'How do you handle ICSE vs ISC differences for NEET?',
      answer: 'Both ICSE (Class 10) and ISC (Class 11-12) contribute to NEET. We provide integrated coaching covering both levels, ensuring complete science foundation without repetition while building NEET depth.',
    },
    {
      question: 'Is Pune location good for NEET preparation?',
      answer: "Pune is excellent for NEET preparation with strong coaching centers, medical colleges, and educational infrastructure. Bishop\'s School location in premium Camp area provides access to best resources while maintaining school focus.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <FloatingWhatsAppButton />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-br from-amber-700 to-orange-800 text-white py-12 sm:py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={heroAnim.ref} className={`text-center max-w-4xl mx-auto transition-all duration-700 ${heroAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Compass className="w-5 h-5 mr-2 text-yellow-400" />
              Pune Medical Education Excellence
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              NEET Coaching for <span className="text-yellow-300">Bishop&apos;s School, Pune</span>
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Expert ICSE/ISC-to-NEET bridge coaching for Bishop&apos;s School students in Pune. Transform premium school foundation into 630+ NEET success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/demo-booking" className="bg-white text-amber-700 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors inline-flex items-center justify-center">
                Book Free Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <a href="https://wa.me/918826444334" target="_blank" rel="noopener noreferrer" className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-amber-700 transition-colors inline-flex items-center justify-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Now
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-yellow-300">85%+</div>
                <div className="text-sm opacity-80">Qualification Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-yellow-300">630+</div>
                <div className="text-sm opacity-80">Average Score</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-yellow-300">280+</div>
                <div className="text-sm opacity-80">Bishop&apos;s Students</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-yellow-300">Pune Hub</div>
                <div className="text-sm opacity-80">Medical City</div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Bishop&apos;s Advantages */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={whyAnim.ref} className={`text-center mb-12 transition-all duration-600 ${whyAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Bishop&apos;s School Excellence in NEET</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Premium school advantage for medical entrance success</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bishopsAdvantages.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <Icon className="w-10 h-10 text-amber-600 mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 md:py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Bishop&apos;s School NEET Programs</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-amber-600 mb-4">{plan.price}</div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <Link href="/admissions" className="block bg-amber-600 text-white text-center py-2 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
                  Enroll Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={faqAnim.ref} className={`text-center mb-12 transition-all duration-600 ${faqAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">FAQs</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-gray-900">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {expandedFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-gray-200 bg-gray-50"
                    >
                      <p className="p-6 text-gray-700">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-amber-700 to-orange-800 text-white py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Bishop&apos;s School Excellence in NEET</h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">Join 280+ Bishop&apos;s School students achieving top NEET scores</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking" className="bg-white text-amber-700 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors inline-flex items-center justify-center">
              Book Free Demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <a href="tel:8826444334" className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-amber-700 transition-colors inline-flex items-center justify-center">
              <Phone className="w-5 h-5 mr-2" />
              Call: 8826444334
            </a>
          </div>
          <div className="mt-8 pt-8 border-t border-amber-600 text-sm opacity-90">
            <p>WhatsApp: +91 88264-44334 | Website: cerebrumbiologyacademy.com</p>
          </div>
        </div>
      </section>
      <PricingSection cityName="Bishops School" />
      <CostComparisonSection cityName="Bishops School" />
      <RelatedCityLinks currentCity="bishops-school-pune" variant="default" />
    </div>
  )
}
