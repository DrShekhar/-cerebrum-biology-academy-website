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
  Globe,
  Zap,
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
    href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20a%20Pathways%20School%20student%20interested%20in%20NEET%20coaching"
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

  const pathwaysAdvantages = [
    { icon: Globe, title: "IB World School Excellence", description: "Pathways provides world-class international education - we bridge this to NEET's Indian medical entrance requirements" },
    { icon: Target, title: 'Curriculum Bridge Program', description: 'Custom IB-to-NEET mapping ensuring international curriculum foundation translates to NEET success' },
    { icon: BookOpen, title: 'International Perspective', description: 'Unique coaching that respects IB rigor while building NEET-specific knowledge and exam strategies' },
    { icon: Users, title: 'Pathways Student Community', description: 'Specialized coaching for Pathways Noida and Gurgaon students who balance international curriculum with Indian medical entrance' },
    { icon: Award, title: 'Exam Strategy Expertise', description: 'Expert guidance on IB exam timing and NEET preparation coordination for maximum time management' },
    { icon: Star, title: 'Top Scorer Track Record', description: 'History of Pathways School students achieving 640+ NEET scores while excelling in IB examinations' },
  ]

  const whyPathwaysStudents = [
    { point: 'IB offers strong scientific foundation with emphasis on critical thinking', benefit: 'Excellent conceptual base for NEET\'s application-based questions' },
    { point: 'International curriculum develops English proficiency and analytical skills', benefit: 'Advantage in NEET comprehension questions and concept analysis' },
    { point: 'Pathways\' peer group is highly motivated and achievement-oriented', benefit: 'Creates competitive environment conducive to NEET success' },
    { point: 'Noida/Gurgaon location offers proximity to premier coaching expertise', benefit: 'Access to best NEET preparation without geographical constraints' },
  ]

  const pricingPlans = [
    { name: 'IB-NEET Bridge Program', price: '₹49,999', description: '12-month program designed specifically for IB to NEET transition with complete curriculum mapping' },
    { name: 'Complete NEET Mastery', price: '₹39,999', description: '18-month comprehensive program integrating IB studies with NEET preparation from foundation to advanced' },
    { name: '1:1 Expert Guidance', price: '₹59,999', description: 'Personalized one-on-one coaching specifically tailored to your IB subjects and NEET goals' },
  ]

  const faqs = [
    {
      question: "How does IB curriculum differ from CBSE for NEET preparation?",
      answer: "IB emphasizes conceptual understanding and critical thinking, which is excellent for NEET. However, IB doesn't follow NCERT. We provide comprehensive NCERT content mapping for IB students, filling any knowledge gaps while leveraging your strong IB foundation.",
    },
    {
      question: 'Can I prepare for NEET while managing IB workload?',
      answer: 'Yes! Many Pathways students successfully manage both. Our program is designed with IB timeline consideration - we coordinate around IB assessment periods and exams. Strategic planning allows simultaneous IB and NEET excellence.',
    },
    {
      question: "What's the NEET success rate for IB World School students?",
      answer: "IB students show strong NEET performance with 85%+ qualification rate and 640+ average scores. The rigorous IB foundation translates exceptionally well to NEET when complemented with NEET-specific preparation.",
    },
    {
      question: 'Do you teach NCERT since IB students don\'t follow it?',
      answer: 'Yes! We provide comprehensive NCERT coverage for NEET with IB-to-NCERT mapping. This ensures you understand topics from both perspectives - leveraging your IB depth while learning NEET\'s specific requirements.',
    },
    {
      question: 'How do you handle the IB exam schedule with NEET prep?',
      answer: 'We coordinate around your IB examination schedule. Before IB exams, we focus on IB preparation with NEET concepts integrated. After IB exams, we intensify NEET preparation. This synchronized approach ensures excellence in both.',
    },
    {
      question: 'Will international school background help or hurt my NEET preparation?',
      answer: 'International background is a significant advantage! IB\'s emphasis on conceptual clarity, research skills, and critical thinking are exactly what NEET requires. We simply translate this strength into NEET\'s specific requirements and exam format.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <FloatingWhatsAppButton />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-br from-blue-700 to-indigo-800 text-white py-12 sm:py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={heroAnim.ref} className={`text-center max-w-4xl mx-auto transition-all duration-700 ${heroAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Globe className="w-5 h-5 mr-2 text-yellow-400" />
              IB World School to NEET Excellence
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              NEET Coaching for <span className="text-yellow-300">Pathways School</span> Students
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Expert IB-to-NEET bridge program for Pathways School students in Noida and Gurgaon. Leverage your international curriculum foundation for medical entrance excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/demo-booking" className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center justify-center">
                Book Free Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <a href="https://wa.me/918826444334" target="_blank" rel="noopener noreferrer" className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition-colors inline-flex items-center justify-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Now
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-yellow-300">85%+</div>
                <div className="text-sm opacity-80">IB Students Qualify</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-yellow-300">640+</div>
                <div className="text-sm opacity-80">Average Score</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-yellow-300">200+</div>
                <div className="text-sm opacity-80">IB Students Coached</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-yellow-300">100%</div>
                <div className="text-sm opacity-80">IB-NEET Bridge</div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Why Pathways Students Excel */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={whyAnim.ref} className={`text-center mb-12 transition-all duration-600 ${whyAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Why Pathways Students Excel in NEET</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">IB curriculum provides unique advantages for medical entrance success</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {whyPathwaysStudents.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-blue-600"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.point}</h3>
                <p className="text-gray-600 flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <span>{item.benefit}</span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pathways Advantages */}
      <section className="py-12 md:py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Our Pathways School Program</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pathwaysAdvantages.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg text-center"
                >
                  <Icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
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
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Pathways School NEET Programs</h2>
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
                <div className="text-3xl font-bold text-blue-600 mb-4">{plan.price}</div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <Link href="/admissions" className="block bg-blue-600 text-white text-center py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
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
                    <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
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
      <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Pathways to NEET Success</h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">Join Pathways School students achieving top NEET scores</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking" className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center justify-center">
              Book Free Demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <a href="tel:8826444334" className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition-colors inline-flex items-center justify-center">
              <Phone className="w-5 h-5 mr-2" />
              Call: 8826444334
            </a>
          </div>
          <div className="mt-8 pt-8 border-t border-blue-400 text-sm opacity-90">
            <p>WhatsApp: +91 88264-44334 | Website: cerebrumbiologyacademy.com</p>
          </div>
        </div>
      </section>
      <PricingSection cityName="Pathways School" />
      <CostComparisonSection cityName="Pathways School" />
      <RelatedCityLinks currentCity="pathways-school" variant="default" />
    </div>
  )
}
