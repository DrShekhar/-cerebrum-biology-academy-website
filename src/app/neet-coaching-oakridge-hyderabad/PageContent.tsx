'use client'
import { useEffect, useRef, useState } from 'react'
import { Trophy, Users, MessageCircle, Star, GraduationCap, Target, Shield, ArrowRight, BookOpen, CheckCircle, Building, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/Button'

function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true)
    }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return { ref, isVisible }
}

export default function PageContent() {
  const whatsappLink = 'https://wa.me/918826444334'
  const phone = '8826444334'
  const website = 'cerebrumbiologyacademy.com'

  const featureAnimation = useScrollAnimation()
  const curriculumAnimation = useScrollAnimation()
  const testimonialAnimation = useScrollAnimation()
  const faqAnimation = useScrollAnimation()

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-900 via-cyan-800 to-cyan-700 pt-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-64 h-64 bg-cyan-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-cyan-500 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-cyan-200 text-cyan-900 rounded-full text-sm font-semibold">
            <Building className="inline w-4 h-4 mr-2" />
            Oakridge International School, Hyderabad
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            NEET Coaching for Oakridge International Students
          </h1>
          <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
            Specialized NEET Biology coaching for India's only IB World School with continuous curriculum. Master NEET while pursuing international education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button variant="primary" className="px-8 py-3 text-lg">
              Book Free Demo Class
            </Button>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" className="px-8 py-3 text-lg">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp +91 88264 44334
              </Button>
            </a>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-12 text-white text-sm">
            <div><Trophy className="w-6 h-6 mx-auto mb-2 text-yellow-300" /><p>98% Success Rate</p></div>
            <div><Users className="w-6 h-6 mx-auto mb-2 text-yellow-300" /><p>Personal Batches</p></div>
            <div><Star className="w-6 h-6 mx-auto mb-2 text-yellow-300" /><p>Expert Faculty</p></div>
          </div>
        </div>
      </section>

      {/* Why Oakridge Students Choose Cerebrum */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Why Oakridge International Students Choose Cerebrum</h2>
          <div ref={featureAnimation.ref} className={`grid md:grid-cols-2 gap-8 transition-all duration-700 ${featureAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
              <Target className="w-10 h-10 text-cyan-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">IB to NEET Bridge Expertise</h3>
              <p className="text-gray-600">
                Specialized in converting IB curriculum strength to NEET excellence. We understand the unique challenges of IB students taking NEET.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
              <GraduationCap className="w-10 h-10 text-cyan-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">International Standard Teaching</h3>
              <p className="text-gray-600">
                Our coaching maintains international standards while ensuring NEET success. Respects your global education aspirations.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
              <Shield className="w-10 h-10 text-cyan-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Hyderabad NEET Expertise</h3>
              <p className="text-gray-600">
                Understand Hyderabad's competitive NEET landscape and Oakridge's unique student profile with international aspirations.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
              <BookOpen className="w-10 h-10 text-cyan-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Conceptual Inquiry Method</h3>
              <p className="text-gray-600">
                IB's inquiry-based learning aligns with NEET's deeper understanding requirements. We leverage this natural advantage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding Your Curriculum */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Understanding Your Curriculum</h2>
          <div ref={curriculumAnimation.ref} className={`bg-gradient-to-r from-cyan-50 to-cyan-100 p-10 rounded-lg transition-all duration-700 ${curriculumAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-2xl font-bold mb-6 text-gray-900">IB World School → NEET Excellence</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-lg mb-4 text-cyan-900">Your School Advantage</h4>
                <ul className="space-y-3">
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>IB curriculum offers deeper conceptual mastery</span></li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Inquiry-based learning builds critical thinking</span></li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Strong laboratory and practical experience</span></li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>International standard continuous curriculum</span></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-4 text-cyan-900">NEET Bridge Strategy</h4>
                <ul className="space-y-3">
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Map IB depth to NEET breadth and focus</span></li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Fill NEET-specific content gaps</span></li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>MCQ strategy and time management</span></li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>NEET-specific test series and mock exams</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Success Stories from Oakridge Students</h2>
          <div ref={testimonialAnimation.ref} className={`grid md:grid-cols-3 gap-8 transition-all duration-700 ${testimonialAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-cyan-600 rounded-full mr-4"></div>
                <div>
                  <p className="font-bold text-gray-900">Ananya K.</p>
                  <p className="text-sm text-gray-500">Oakridge International</p>
                </div>
              </div>
              <p className="text-yellow-500 mb-3">★★★★★</p>
              <p className="text-gray-600">
                "IB to NEET transition was smooth with Cerebrum. They understood IB's strength and mapped it perfectly to NEET. Got AIR 152!"
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-cyan-600 rounded-full mr-4"></div>
                <div>
                  <p className="font-bold text-gray-900">Rohan P.</p>
                  <p className="text-sm text-gray-500">Oakridge International</p>
                </div>
              </div>
              <p className="text-yellow-500 mb-3">★★★★★</p>
              <p className="text-gray-600">
                "Cerebrum respected my IB curriculum while adding NEET focus. The balance was perfect. Excellent international standard coaching!"
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-cyan-600 rounded-full mr-4"></div>
                <div>
                  <p className="font-bold text-gray-900">Saira M.</p>
                  <p className="text-sm text-gray-500">Oakridge International</p>
                </div>
              </div>
              <p className="text-yellow-500 mb-3">★★★★★</p>
              <p className="text-gray-600">
                "Faculty understood IB's inquiry-based approach and leveraged it for NEET. Made biology concepts crystal clear!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Frequently Asked Questions</h2>
          <div ref={faqAnimation.ref} className={`space-y-6 transition-all duration-700 ${faqAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-3">How do you bridge IB curriculum to NEET?</h3>
              <p className="text-gray-600">
                IB's depth is an asset. We map IB topics to NEET requirements, add specific NEET coverage areas, and teach MCQ strategy while preserving conceptual depth that IB builds.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Can you support students pursuing both IB and NEET?</h3>
              <p className="text-gray-600">
                Absolutely. This is our specialty. We design coaching that supports your IB curriculum while ensuring comprehensive NEET preparation.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Are there batches specifically for Oakridge students?</h3>
              <p className="text-gray-600">
                Yes, we organize Oakridge-specific batches when enrollment allows, creating a peer group with similar IB background and NEET goals.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-3">How do you handle IB's different format vs NEET MCQ?</h3>
              <p className="text-gray-600">
                IB's theoretical approach and NEET's MCQ format require different skills. We teach both, ensuring you master NEET MCQs while maintaining conceptual understanding IB builds.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-3">How can I book a free demo?</h3>
              <p className="text-gray-600">
                WhatsApp us at +91 88264 44334 or call 8826444334. Visit cerebrumbiologyacademy.com. We'll arrange a personalized demo session.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-cyan-600 to-cyan-800">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Excel in NEET from Oakridge International</h2>
          <p className="text-xl mb-8">Join Oakridge students who've achieved 98%+ success rates with Cerebrum Biology Academy.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="light" className="px-8 py-3 text-lg font-semibold">
              Start Your Free Demo <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Button>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" className="px-8 py-3 text-lg">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Now
              </Button>
            </a>
          </div>
          <div className="mt-8 text-cyan-100">
            <p className="mb-2"><MapPin className="w-4 h-4 inline mr-2" />Bachupally, Hyderabad</p>
            <p className="mb-2">Phone: {phone}</p>
            <p>Website: {website}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
