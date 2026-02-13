'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
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
  Building,
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
    href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20a%20Modern%20School%20student%20interested%20in%20NEET%20coaching"
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

  const modernTradition = [
    { icon: Award, title: "Premium Excellence Heritage", description: "Modern School's strong science tradition provides exceptional NEET foundation for medical aspirants" },
    { icon: BookOpen, title: "CBSE Science Mastery", description: "Modern School emphasizes rigorous CBSE science education - perfect alignment with NEET requirements" },
    { icon: Users, title: "Peer Excellence Culture", description: "High-achieving peer group at Modern School creates competitive excellence environment for NEET" },
    { icon: Target, title: "Proven Medical Success", description: "Modern School has consistent history of students pursuing medical education and NEET success" },
    { icon: Zap, title: "Academic Rigor", description: "Modern School's rigorous curriculum develops the conceptual depth required for NEET excellence" },
    { icon: Building, title: "Delhi's Prestigious Institution", description: "Modern School's reputation and facilities support comprehensive NEET preparation alongside school" },
  ]

  const pricingPlans = [
    { name: "Complete NEET Mastery", price: "₹35,999", description: "18-month comprehensive program leveraging Modern School CBSE foundation for NEET" },
    { name: "Intensive NEET Focus", price: "₹45,999", description: "12-month intensive program for Modern School students targeting 650+ NEET scores" },
    { name: "Premium 1:1 Coaching", price: "₹55,999", description: "Personalized one-on-one coaching designed for Modern School's high-achievers" },
  ]

  const faqs = [
    {
      question: 'How does Modern School CBSE prepare students for NEET?',
      answer: "Modern School's rigorous CBSE curriculum and emphasis on science excellence create a strong foundation for NEET. Combined with our specialized NEET coaching, students achieve 650+ scores while maintaining board excellence.",
    },
    {
      question: 'What makes Modern School students successful in NEET?',
      answer: 'Modern School students benefit from excellent teaching, peer motivation, and rigorous curriculum. These advantages translate directly to NEET success when complemented with our specialized entrance exam preparation.',
    },
    {
      question: 'Can I prepare for board exams and NEET simultaneously?',
      answer: 'Yes! Modern School CBSE and NEET have significant overlap. Our program ensures both board excellence (90+) and NEET strength (650+) through synchronized, efficient preparation.',
    },
    {
      question: 'What is the NEET success rate for Modern School students?',
      answer: "Modern School students show 90%+ NEET qualification with 640+ average scores. The school's academic culture and CBSE alignment provide excellent foundation for medical entrance success.",
    },
    {
      question: 'How do Modern School teachers and coaching work together?',
      answer: 'We complement Modern School\'s excellent teaching by adding NEET-specific strategies and deeper conceptual coverage. The combination ensures comprehensive excellence in both board and entrance exams.',
    },
    {
      question: 'Is NEET coaching necessary for Modern School students?',
      answer: "While Modern School provides excellent foundation, specialized NEET coaching bridges the gap between board exams and medical entrance. We help convert excellent CBSE understanding into 650+ NEET scores.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <FloatingWhatsAppButton />

      {/* Hero Section */}
      <section
        className="bg-gradient-to-br from-indigo-700 to-blue-800 text-white py-12 sm:py-20 animate-fadeInUp"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={heroAnim.ref} className={`text-center max-w-4xl mx-auto transition-all duration-700 ${heroAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Building className="w-5 h-5 mr-2 text-yellow-400" />
              Delhi&apos;s Prestigious Science Excellence
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              NEET Coaching for <span className="text-yellow-300">Modern School, Delhi</span>
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Expert NEET preparation for Modern School students at Barakhamba Road and beyond. Transform prestigious CBSE foundation into 650+ NEET success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/demo-booking" className="bg-white text-indigo-700 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors inline-flex items-center justify-center">
                Book Free Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <a href="https://wa.me/918826444334" target="_blank" rel="noopener noreferrer" className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-700 transition-colors inline-flex items-center justify-center">
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
                <div className="text-2xl font-bold text-yellow-300">640+</div>
                <div className="text-sm opacity-80">Average Score</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-yellow-300">300+</div>
                <div className="text-sm opacity-80">Modern School Students</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-yellow-300">1947+</div>
                <div className="text-sm opacity-80">School Est. Year</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Modern School Excellence */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={whyAnim.ref} className={`text-center mb-12 transition-all duration-600 ${whyAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Modern School Excellence in NEET</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Leverage prestigious school foundation for medical entrance success</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modernTradition.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg animate-fadeInUp"
                >
                  <Icon className="w-10 h-10 text-indigo-600 mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 md:py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Modern School NEET Programs</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow animate-fadeInUp"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-indigo-600 mb-4">{plan.price}</div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <Link href="/admissions" className="block bg-indigo-600 text-white text-center py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                  Enroll Now
                </Link>
              </div>
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
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden animate-fadeInUp">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-gray-900">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
{expandedFAQ === index && (
                    <div
                      className="border-t border-gray-200 bg-gray-50 animate-fadeInUp"
                    >
                      <p className="p-6 text-gray-700">{faq.answer}</p>
                    </div>
                  )}
</div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-indigo-700 to-blue-800 text-white py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Modern School Excellence in NEET</h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">Join 300+ Modern School students achieving top NEET scores</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking" className="bg-white text-indigo-700 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors inline-flex items-center justify-center">
              Book Free Demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <a href="tel:8826444334" className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-700 transition-colors inline-flex items-center justify-center">
              <Phone className="w-5 h-5 mr-2" />
              Call: 8826444334
            </a>
          </div>
          <div className="mt-8 pt-8 border-t border-indigo-400 text-sm opacity-90">
            <p>WhatsApp: +91 88264-44334 | Website: cerebrumbiologyacademy.com</p>
          </div>
        </div>
      </section>
      <PricingSection cityName="Modern School" />
      <CostComparisonSection cityName="Modern School" />
      <RelatedCityLinks currentCity="modern-school-delhi" variant="default" />
    </div>
  )
}
