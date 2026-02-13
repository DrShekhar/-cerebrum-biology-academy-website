'use client'
import { useState } from 'react'
import Link from 'next/link'
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
  Microscope,
  Shield,
  MapPin,
} from 'lucide-react'

const FloatingWhatsAppButton = () => (
  <a
    href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20interested%20in%20Rajasthan%20Board%20Biology%20coaching%20for%20NEET"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all z-50"
  >
    <MessageCircle className="w-6 h-6" />
  </a>
)

export default function PageContent() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

  const syllabusCoverage = [
    { title: 'Cell & Molecular Biology', topics: ['Cell Structure', 'Cell Division', 'Photosynthesis & Respiration', 'Genetic Material'] },
    { title: 'Genetics & Evolution', topics: ['Heredity & Variation', 'Molecular Biology', 'Evolution Concepts', 'Natural Selection'] },
    { title: 'Human Physiology', topics: ['Nutrition & Digestion', 'Blood Circulation', 'Respiration', 'Nervous & Hormonal Coordination'] },
    { title: 'Ecology & Biodiversity', topics: ['Organisms & Environment', 'Population Dynamics', 'Ecosystem', 'Biodiversity Conservation'] },
  ]

  const rajasthanAreas = [
    { city: 'Kota', strength: 'NEET preparation hub', distance: 'Zero km from coaching centers' },
    { city: 'Jaipur', strength: 'Educational capital', distance: 'Well-connected metro city' },
    { city: 'Jodhpur', strength: 'Growing coaching centers', distance: 'Premium residential area' },
    { city: 'Bikaner', strength: 'Emerging NEET hub', distance: 'Quality education focus' },
    { city: 'Udaipur', strength: 'Tourism hub', distance: 'Student-friendly city' },
    { city: 'Ajmer', strength: 'Education center', distance: 'Historical significance' },
  ]

  const whyChooseUs = [
    { icon: BookOpen, title: 'RBSE Syllabus Expertise', description: 'Complete mastery of Rajasthan Board (RBSE) biology curriculum with chapter-wise depth' },
    { icon: Target, title: 'NEET Bridge Content', description: 'Strategic filling of gaps between RBSE and NEET with focused advanced modules' },
    { icon: MapPin, title: 'Rajasthan-Wide Coverage', description: 'Expert coaching for students from Kota, Jaipur, Jodhpur and all Rajasthan regions' },
    { icon: Award, title: 'Dual Success Focus', description: 'Ensure 90+ in board exams while building 650+ NEET score potential' },
    { icon: Users, title: 'Experienced RBSE Faculty', description: 'Teachers with deep understanding of RBSE patterns and successful NEET conversion' },
    { icon: Microscope, title: 'Lab-to-Theory Bridge', description: 'Connect RBSE practical experience with NEET theoretical excellence' },
  ]

  const pricingPlans = [
    { name: '1:1 Coaching', price: '₹44,999', description: 'Personalized sessions with RBSE board + NEET integration from start to finish' },
    { name: 'Complete Program', price: '₹33,999', description: 'Full 2-year program covering RBSE syllabus and NEET preparation with materials' },
    { name: 'Group Batch', price: '₹23,999', description: 'Small group classes perfect for Rajasthan students with personalized attention' },
  ]

  const faqs = [
    {
      question: 'How is RBSE biology different from CBSE for NEET?',
      answer: 'RBSE has unique phrasing and depth variations. We specifically map RBSE topics to NEET requirements, prevent over-study of non-NEET content, and fill critical NEET-specific gaps in areas where RBSE is lighter.',
    },
    {
      question: 'Is Kota known specifically for NEET coaching?',
      answer: 'Absolutely! Kota is India\'s premier NEET coaching hub. Students from across India come to Kota for specialized NEET preparation. Our online platform brings this Kota excellence to your city.',
    },
    {
      question: 'What is the NEET success rate for Rajasthan board students?',
      answer: 'Rajasthan board students show 80%+ NEET qualification rate when properly guided. With our RBSE-to-NEET bridge, students average 640+ scores with many exceeding 680.',
    },
    {
      question: 'Can I maintain RBSE board marks while preparing for NEET?',
      answer: 'Yes! We specifically design programs to ensure RBSE board excellence (90+) alongside NEET depth. The programs are complementary when properly structured.',
    },
    {
      question: 'How long does NEET prep take after RBSE completion?',
      answer: 'With early start in Class 11, RBSE students need 6-8 months of intensive NEET focus post-board exams. Starting our dual program earlier maximizes preparation depth.',
    },
    {
      question: 'Do you provide city-specific or online coaching?',
      answer: 'Our model offers premium online live classes accessible from Rajasthan. This combines flexibility for board exams with structured NEET preparation, perfect for Rajasthan students.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <FloatingWhatsAppButton />

      {/* Hero Section */}
      <section
        className="bg-gradient-to-br from-amber-700 to-orange-700 text-white py-12 sm:py-20 animate-fadeInUp"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="animate-fadeInUp">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                Rajasthan RBSE to NEET Success
              </h1>
              <p className="text-lg sm:text-xl text-amber-100 mb-8">
                Master Rajasthan Board Biology with seamless NEET integration. Expert coaching for students across Rajasthan - Kota, Jaipur, Jodhpur and beyond.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/admissions"
                  className="bg-white text-amber-700 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors inline-flex items-center justify-center"
                >
                  Enroll for RBSE-NEET
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <a
                  href="https://wa.me/918826444334"
                  className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-amber-700 transition-colors inline-flex items-center justify-center"
                >
                  WhatsApp Us
                  <MessageCircle className="w-5 h-5 ml-2" />
                </a>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 animate-fadeInUp">
              <h3 className="text-2xl font-bold mb-6">RBSE-NEET Highlights</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 mr-3 text-yellow-300" />
                  <span>100% RBSE Coverage</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 mr-3 text-yellow-300" />
                  <span>Kota-Quality Coaching</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 mr-3 text-yellow-300" />
                  <span>640+ NEET Average</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 mr-3 text-yellow-300" />
                  <span>All Rajasthan Cities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rajasthan Coverage */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Rajasthan-Wide Coverage
            </h2>
            <p className="text-gray-600 text-lg">Serving students from major cities across Rajasthan</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rajasthanAreas.map((area, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-amber-600 animate-fadeInUp"
              >
                <div className="flex items-center mb-3">
                  <MapPin className="w-6 h-6 text-amber-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">{area.city}</h3>
                </div>
                <p className="text-gray-600 mb-2">{area.strength}</p>
                <p className="text-sm text-gray-500">{area.distance}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Syllabus Coverage */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              RBSE Biology Syllabus Coverage
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {syllabusCoverage.map((module, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg animate-fadeInUp"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <BookOpen className="w-6 h-6 text-amber-600 mr-3" />
                  {module.title}
                </h3>
                <div className="space-y-2">
                  {module.topics.map((topic, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <span className="text-gray-700">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Cerebrum for Rajasthan Board
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow animate-fadeInUp"
                >
                  <Icon className="w-8 h-8 text-amber-600 mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              RBSE-NEET Coaching Plans
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow animate-fadeInUp"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-amber-600 mb-4">{plan.price}</div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <Link
                  href="/admissions"
                  className="block bg-amber-600 text-white text-center py-2 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
                >
                  Enroll Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
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
                    <ChevronUp className="w-5 h-5 text-amber-600 flex-shrink-0" />
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

      {/* CTA Section */}
      <section
        className="bg-gradient-to-r from-amber-700 to-orange-700 text-white py-12 sm:py-16 md:py-20 animate-fadeInUp"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            Master RBSE & Excel in NEET
          </h2>
          <p className="text-lg sm:text-xl mb-8 text-amber-100">
            Join Rajasthan students achieving 640+ NEET scores with RBSE excellence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admissions"
              className="bg-white text-amber-700 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors inline-flex items-center justify-center"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <a
              href="tel:8826444334"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-amber-700 transition-colors inline-flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call: 8826444334
            </a>
          </div>
          <div className="mt-8 pt-8 border-t border-amber-600 text-sm opacity-90">
            <p>WhatsApp: +91 88264-44334 | Website: cerebrumbiologyacademy.com</p>
          </div>
        </div>
      </section>
    </div>
  )
}
