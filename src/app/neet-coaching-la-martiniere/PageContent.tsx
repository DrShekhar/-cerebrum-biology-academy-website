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
  Crown,
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
    href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20a%20La%20Martiniere%20student%20interested%20in%20NEET%20coaching"
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

  const laMartinieraAdvantages = [
    { icon: Crown, title: 'Prestigious Colonial Heritage', description: "La Martiniere's renowned excellence tradition creates strong academic foundation for NEET success" },
    { icon: BookOpen, title: 'ISC Curriculum Excellence', description: 'ISC provides rigorous science education with depth perfect for medical entrance preparation' },
    { icon: Users, title: 'Boys & Girls Excellence', description: 'La Martiniere Kolkata (boys/girls) and Lucknow campuses develop high-achieving NEET candidates' },
    { icon: Target, title: 'ISC-to-NEET Bridge', description: 'Custom mapping of ISC curriculum to NEET requirements filling any content gaps strategically' },
    { icon: Award, title: 'Medical Success Legacy', description: 'La Martiniere has consistent history of students pursuing medicine and achieving NEET success' },
    { icon: Zap, title: 'Rigorous Academic Culture', description: 'School\'s emphasis on excellence translates directly to 650+ NEET score achievement' },
  ]

  const campuses = [
    { name: 'La Martiniere for Boys, Kolkata', heritage: '200+ years of excellence' },
    { name: 'La Martiniere for Girls, Kolkata', heritage: "Women's education pioneer" },
    { name: 'La Martiniere, Lucknow', heritage: 'Uttar Pradesh excellence hub' },
  ]

  const pricingPlans = [
    { name: 'Complete ISC-NEET Program', price: '₹37,999', description: '18-month comprehensive program bridging ISC to NEET with complete preparation' },
    { name: 'Intensive NEET Focus', price: '₹46,999', description: '12-month intensive program for La Martiniere students targeting medical entrance' },
    { name: 'Premium 1:1 Coaching', price: '₹56,999', description: "Personalized coaching for La Martiniere's high-achievers with ISC expertise" },
  ]

  const faqs = [
    {
      question: 'How does ISC prepare students for NEET differently than CBSE?',
      answer: "ISC offers excellent depth and rigor but has different chapter sequences and some content variations from NEET's NCERT basis. We provide comprehensive NCERT mapping for ISC students, leveraging your strong foundation while filling any gaps.",
    },
    {
      question: 'What advantage does La Martiniere heritage give for NEET?',
      answer: "La Martiniere's 200+ year tradition of excellence develops disciplined, high-achieving students. This academic culture, combined with ISC rigor, creates excellent NEET foundation. We amplify this with specialized entrance exam preparation.",
    },
    {
      question: 'Can La Martiniere students excel at both ISC and NEET?',
      answer: 'Yes! ISC and NEET have significant overlap in science topics. Our program ensures both ISC board excellence (90+) and NEET strength (650+) through synchronized preparation strategy.',
    },
    {
      question: 'What is the NEET success rate for La Martiniere students?',
      answer: 'La Martiniere students show 85%+ NEET qualification with 630+ average scores. The school\'s academic excellence and ISC foundation provide strong platform for medical entrance success.',
    },
    {
      question: 'Do you cover both Kolkata and Lucknow La Martiniere students?',
      answer: 'Yes! We serve La Martiniere students from all campuses - Kolkata boys, Kolkata girls, and Lucknow. Online platform ensures consistent excellence across locations.',
    },
    {
      question: "How do you address ISC's different curriculum for NEET?",
      answer: "We provide detailed ISC-to-NCERT mapping, ensuring you understand topics from both perspectives. This dual understanding deepens conceptual clarity crucial for NEET's application-based questions.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <FloatingWhatsAppButton />

      {/* Hero Section */}
      <section
        className="bg-gradient-to-br from-red-700 to-blue-900 text-white py-12 sm:py-20 animate-fadeInUp"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={heroAnim.ref} className={`text-center max-w-4xl mx-auto transition-all duration-700 ${heroAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Crown className="w-5 h-5 mr-2 text-yellow-400" />
              Colonial Heritage Excellence
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              NEET Coaching for <span className="text-yellow-300">La Martiniere</span> Students
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Expert ISC-to-NEET bridge coaching for La Martiniere students in Kolkata and Lucknow. Transform prestigious ISC foundation into 630+ NEET success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/demo-booking" className="bg-white text-red-700 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors inline-flex items-center justify-center">
                Book Free Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <a href="https://wa.me/918826444334" target="_blank" rel="noopener noreferrer" className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-700 transition-colors inline-flex items-center justify-center">
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
                <div className="text-2xl font-bold text-yellow-300">250+</div>
                <div className="text-sm opacity-80">La Martiniere Students</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-yellow-300">200+</div>
                <div className="text-sm opacity-80">Years Heritage</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campuses */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={whyAnim.ref} className={`text-center mb-12 transition-all duration-600 ${whyAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">La Martiniere Campuses We Serve</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {campuses.map((campus, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-red-600 text-center animate-fadeInUp"
              >
                <Crown className="w-10 h-10 text-red-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{campus.name}</h3>
                <p className="text-gray-600">{campus.heritage}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-12 md:py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">La Martiniere Excellence in NEET</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {laMartinieraAdvantages.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg animate-fadeInUp"
                >
                  <Icon className="w-10 h-10 text-red-600 mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">La Martiniere NEET Programs</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow animate-fadeInUp"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-red-600 mb-4">{plan.price}</div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <Link href="/admissions" className="block bg-red-600 text-white text-center py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                  Enroll Now
                </Link>
              </div>
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
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden animate-fadeInUp">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-gray-900">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-red-600 flex-shrink-0" />
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
      <section className="bg-gradient-to-r from-red-700 to-blue-900 text-white py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">La Martiniere Excellence in NEET</h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">Join 250+ La Martiniere students achieving top NEET scores</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking" className="bg-white text-red-700 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors inline-flex items-center justify-center">
              Book Free Demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <a href="tel:8826444334" className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-700 transition-colors inline-flex items-center justify-center">
              <Phone className="w-5 h-5 mr-2" />
              Call: 8826444334
            </a>
          </div>
          <div className="mt-8 pt-8 border-t border-red-400 text-sm opacity-90">
            <p>WhatsApp: +91 88264-44334 | Website: cerebrumbiologyacademy.com</p>
          </div>
        </div>
      </section>
      <PricingSection cityName="La Martiniere" />
      <CostComparisonSection cityName="La Martiniere" />
      <RelatedCityLinks currentCity="la-martiniere" variant="default" />
    </div>
  )
}
