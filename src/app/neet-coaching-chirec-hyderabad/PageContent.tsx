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
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-900 via-orange-800 to-orange-700 pt-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-64 h-64 bg-orange-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-orange-500 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-orange-200 text-orange-900 rounded-full text-sm font-semibold">
            <Building className="inline w-4 h-4 mr-2" />
            CHIREC International, Hyderabad
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            NEET Coaching for CHIREC Students
          </h1>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Specialized NEET Biology coaching for CHIREC's dual curriculum students. Master NEET while balancing CBSE and Cambridge.
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

      {/* Why CHIREC Students Choose Cerebrum */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Why CHIREC Students Choose Cerebrum</h2>
          <div ref={featureAnimation.ref} className={`grid md:grid-cols-2 gap-8 transition-all duration-700 ${featureAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
              <Target className="w-10 h-10 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Dual Curriculum Expertise</h3>
              <p className="text-gray-600">
                CHIREC's dual CBSE/Cambridge option requires tailored NEET approach. We specialize in both curriculum paths to NEET success.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
              <GraduationCap className="w-10 h-10 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Customized Strategy</h3>
              <p className="text-gray-600">
                Whether CBSE or Cambridge, we create personalized NEET coaching strategy based on your specific curriculum path.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
              <Shield className="w-10 h-10 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Flexible Learning</h3>
              <p className="text-gray-600">
                Understand the complexity of dual curriculum. Offer flexible timing and customized content coverage for NEET.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
              <BookOpen className="w-10 h-10 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Focused NEET Preparation</h3>
              <p className="text-gray-600">
                Despite dual curriculum, our NEET focus is sharp. Strategic preparation that's efficient and result-oriented.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding Your Curriculum */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Understanding Your Curriculum</h2>
          <div ref={curriculumAnimation.ref} className={`bg-gradient-to-r from-orange-50 to-orange-100 p-10 rounded-lg transition-all duration-700 ${curriculumAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-2xl font-bold mb-6 text-gray-900">CBSE/Cambridge Dual Path → NEET Excellence</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-lg mb-4 text-orange-900">Your School Advantage</h4>
                <ul className="space-y-3">
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Flexibility of choosing CBSE or Cambridge track</span></li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Strong CBSE foundation compatible with NEET</span></li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Cambridge curriculum builds deeper understanding</span></li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Excellent lab facilities and practical experience</span></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-4 text-orange-900">NEET Bridge Strategy</h4>
                <ul className="space-y-3">
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Tailor approach to your specific curriculum choice</span></li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Bridge CBSE/Cambridge to NEET requirements</span></li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>High-yield NEET topics with depth focus</span></li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>MCQ strategy and comprehensive NEET testing</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Success Stories from CHIREC Students</h2>
          <div ref={testimonialAnimation.ref} className={`grid md:grid-cols-3 gap-8 transition-all duration-700 ${testimonialAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-600 rounded-full mr-4"></div>
                <div>
                  <p className="font-bold text-gray-900">Devesh K.</p>
                  <p className="text-sm text-gray-500">CHIREC International</p>
                </div>
              </div>
              <p className="text-yellow-500 mb-3">★★★★★</p>
              <p className="text-gray-600">
                "CHIREC's dual curriculum was challenging for NEET prep. Cerebrum created a customized strategy. Got AIR 178!"
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-600 rounded-full mr-4"></div>
                <div>
                  <p className="font-bold text-gray-900">Neha G.</p>
                  <p className="text-sm text-gray-500">CHIREC International</p>
                </div>
              </div>
              <p className="text-yellow-500 mb-3">★★★★★</p>
              <p className="text-gray-600">
                "Cerebrum understood CHIREC's unique dual curriculum situation. Perfect customization for my CBSE track and NEET goals!"
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-600 rounded-full mr-4"></div>
                <div>
                  <p className="font-bold text-gray-900">Aryan S.</p>
                  <p className="text-sm text-gray-500">CHIREC International</p>
                </div>
              </div>
              <p className="text-yellow-500 mb-3">★★★★★</p>
              <p className="text-gray-600">
                "Faculty understood my Cambridge curriculum and mapped it efficiently to NEET. Excellent coaching approach!"
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
              <h3 className="text-lg font-bold text-gray-900 mb-3">How do you customize NEET prep for dual curriculum students?</h3>
              <p className="text-gray-600">
                We assess your specific curriculum choice (CBSE or Cambridge) and create a tailored NEET strategy. Both paths have distinct strengths we leverage for NEET success.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Can you support Cambridge students for NEET?</h3>
              <p className="text-gray-600">
                Absolutely. Cambridge curriculum builds deep understanding. We map Cambridge to NEET requirements, fill gaps, and ensure NEET success alongside Cambridge studies.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Are there CHIREC-specific batches?</h3>
              <p className="text-gray-600">
                Yes, we create dedicated CHIREC batches when enrollment allows. This creates peer groups with similar dual curriculum challenges and NEET goals.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-3">What's the time commitment for dual curriculum students?</h3>
              <p className="text-gray-600">
                We design efficient NEET prep (12-15 hours/week) that synergizes with your school curriculum. Strategic approach ensures no redundant studying.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-3">How can I book a free demo class?</h3>
              <p className="text-gray-600">
                WhatsApp us at +91 88264 44334 or call 8826444334. Visit cerebrumbiologyacademy.com. We'll arrange a personalized demo session.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-orange-600 to-orange-800">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Master NEET Despite Dual Curriculum Complexity</h2>
          <p className="text-xl mb-8">Join CHIREC students who've achieved 98%+ success rates with Cerebrum Biology Academy.</p>
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
          <div className="mt-8 text-orange-100">
            <p className="mb-2"><MapPin className="w-4 h-4 inline mr-2" />Kondapur, Hyderabad</p>
            <p className="mb-2">Phone: {phone}</p>
            <p>Website: {website}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
