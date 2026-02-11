'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
import { CityBreadcrumb } from '@/components/city/CityBreadcrumb'
import { PricingSection } from '@/components/city/PricingSection'
import { CostComparisonSection } from '@/components/city/CostComparisonSection'
import { RelatedCityLinks } from '@/components/seo/RelatedCityLinks'
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
  Trophy,
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
    href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20an%20Amity%20International%20School%20student%20interested%20in%20NEET%20coaching"
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
  const campusAnim = useScrollAnimation()
  const faqAnim = useScrollAnimation()

  const campuses = [
    { name: 'Delhi Campus', strength: 'Academic excellence hub' },
    { name: 'Noida Campus', strength: 'Large student body' },
    { name: 'Gurgaon Campus', strength: 'Premium infrastructure' },
    { name: 'Bangalore Campus', strength: 'Growing excellence' },
    { name: 'Mumbai Campus', strength: 'Metropolitan strength' },
    { name: 'Other Campuses', strength: 'Pan-India presence' },
  ]

  const amityAdvantages = [
    { icon: Trophy, title: 'Competitive Environment', description: 'Amity students are highly motivated. Coaching leverages this competitive spirit for NEET excellence.' },
    { icon: Users, title: 'Large Student Community', description: 'Connect with fellow Amity students preparing for NEET. Peer learning accelerates preparation.' },
    { icon: BookOpen, title: 'CBSE Mastery', description: 'Amity follows CBSE - perfect alignment with NEET. We build NEET depth from strong CBSE foundation.' },
    { icon: Target, title: 'Proven NEET Track Record', description: 'Strong history of Amity students achieving 650+ NEET scores with our specialized coaching.' },
    { icon: Award, title: 'Pan-India Coverage', description: 'Coaching available for Amity students across all campuses with localized support.' },
    { icon: Zap, title: 'Intensive Preparation', description: 'Competitive Amity environment demands best coaching - we deliver NEET excellence.' },
  ]

  const pricingPlans = [
    { name: 'Complete NEET Program', price: '₹34,999', description: '18-month comprehensive program from CBSE foundation to NEET advanced preparation' },
    { name: 'Intensive NEET Focus', price: '₹44,999', description: '12-month intensive program designed for Amity students with competitive goal' },
    { name: '1:1 Expert Coaching', price: '₹54,999', description: 'Personalized one-on-one NEET coaching tailored to your Amity curriculum and goals' },
  ]

  const faqs = [
    {
      question: 'How does Amity CBSE compare to other board students for NEET?',
      answer: "Amity CBSE students have strong advantage - CBSE is perfectly aligned with NEET. Combined with Amity\'s competitive environment, students are well-positioned for 650+ NEET scores with proper coaching.",
    },
    {
      question: 'Can I manage both Amity studies and NEET preparation?',
      answer: "Yes! Amity\'s CBSE curriculum and NEET have significant overlap. Our program coordinates with your Amity schedule, ensuring both board excellence and NEET success without over-stress.",
    },
    {
      question: 'What is the NEET success rate for Amity students?',
      answer: 'Amity students show 90%+ NEET qualification with 650+ average scores. The competitive Amity culture combined with our specialized coaching creates ideal NEET preparation environment.',
    },
    {
      question: 'Do you provide campus-specific support?',
      answer: 'Yes! We serve Amity students across all campuses - Delhi, Noida, Gurgaon, Bangalore, Mumbai and others. Localized support adapted to your campus while maintaining consistent excellence standards.',
    },
    {
      question: "How does Amity\'s competitive environment help NEET?",
      answer: 'Amity students are inherently competitive and achievement-focused. This culture accelerates NEET preparation. Our coaching channels this competitive spirit into focused NEET excellence.',
    },
    {
      question: 'Are group batches available for Amity students?',
      answer: 'Yes! We offer group batches specifically for Amity students, creating peer learning environment. These batches leverage the Amity competitive culture while building strong NEET foundation.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <FloatingWhatsAppButton />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-br from-purple-700 to-blue-800 text-white py-12 sm:py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={heroAnim.ref} className={`text-center max-w-4xl mx-auto transition-all duration-700 ${heroAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
              NEET Coaching for Competitive Achievers
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              NEET Coaching for <span className="text-yellow-300">Amity International School</span> Students
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Expert NEET preparation for Amity students across all campuses. Harness competitive environment and CBSE foundation for 650+ NEET success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/demo-booking" className="bg-white text-purple-700 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors inline-flex items-center justify-center">
                Book Free Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <a href="https://wa.me/918826444334" target="_blank" rel="noopener noreferrer" className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-700 transition-colors inline-flex items-center justify-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Now
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-yellow-300">90%+</div>
                <div className="text-sm opacity-80">Qualification Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-yellow-300">650+</div>
                <div className="text-sm opacity-80">Average Score</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-yellow-300">500+</div>
                <div className="text-sm opacity-80">Amity Students Coached</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-yellow-300">Pan-India</div>
                <div className="text-sm opacity-80">Campus Coverage</div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Amity Campuses */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={campusAnim.ref} className={`text-center mb-12 transition-all duration-600 ${campusAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Amity Campuses We Serve</h2>
            <p className="text-xl text-gray-600">Expert NEET coaching for Amity students nationwide</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campuses.map((campus, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-purple-600 text-center"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{campus.name}</h3>
                <p className="text-gray-600">{campus.strength}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Amity Advantages */}
      <section className="py-12 md:py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Why Choose Us for Amity</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {amityAdvantages.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <Icon className="w-10 h-10 text-purple-600 mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Amity NEET Programs</h2>
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
                <div className="text-3xl font-bold text-purple-600 mb-4">{plan.price}</div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <Link href="/admissions" className="block bg-purple-600 text-white text-center py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                  Enroll Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-20 bg-gray-100">
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
                    <ChevronUp className="w-5 h-5 text-purple-600 flex-shrink-0" />
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
      <section className="bg-gradient-to-r from-purple-700 to-blue-800 text-white py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Amity Excellence in NEET</h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">Join 500+ Amity students achieving top NEET scores</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking" className="bg-white text-purple-700 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors inline-flex items-center justify-center">
              Book Free Demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <a href="tel:8826444334" className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-700 transition-colors inline-flex items-center justify-center">
              <Phone className="w-5 h-5 mr-2" />
              Call: 8826444334
            </a>
          </div>
          <div className="mt-8 pt-8 border-t border-purple-400 text-sm opacity-90">
            <p>WhatsApp: +91 88264-44334 | Website: cerebrumbiologyacademy.com</p>
          </div>
        </div>
      </section>
      <PricingSection cityName="Amity International" />
      <CostComparisonSection cityName="Amity International" />
      <RelatedCityLinks currentCity="amity-international" variant="default" />

