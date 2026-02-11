'use client'
import { useEffect, useRef, useState } from 'react'
import { Trophy, Users, MessageCircle, Star, GraduationCap, Target, Shield, ArrowRight, BookOpen, CheckCircle, Building, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { CityBreadcrumb } from '@/components/city/CityBreadcrumb'
import { PricingSection } from '@/components/city/PricingSection'
import { CostComparisonSection } from '@/components/city/CostComparisonSection'
import { RelatedCityLinks } from '@/components/seo/RelatedCityLinks'

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
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-900 via-violet-800 to-violet-700 pt-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-64 h-64 bg-violet-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-violet-500 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-violet-200 text-violet-900 rounded-full text-sm font-semibold">
            <Building className="inline w-4 h-4 mr-2" />
            Delhi Public School, Bangalore (North & South)
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            NEET Coaching for DPS Bangalore Students
          </h1>
          <p className="text-xl text-violet-100 mb-8 max-w-2xl mx-auto">
            Premium competitive NEET coaching for Bangalore's leading DPS campuses. Competitive batches, proven NEET success, elite student community.
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

      {/* Why DPS Bangalore Students Choose Cerebrum */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Why DPS Bangalore Students Choose Cerebrum</h2>
          <div ref={featureAnimation.ref} className={`grid md:grid-cols-2 gap-8 transition-all duration-700 ${featureAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
              <Target className="w-10 h-10 text-violet-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Bangalore NEET Excellence</h3>
              <p className="text-gray-600">
                Bangalore's NEET environment is highly competitive. Our coaching thrives in this competitive landscape with proven success.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
              <GraduationCap className="w-10 h-10 text-violet-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">DPS Network Advantage</h3>
              <p className="text-gray-600">
                DPS's network and standards are globally recognized. We provide coaching matching DPS's premium excellence standards.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
              <Shield className="w-10 h-10 text-violet-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">North & South Campus Support</h3>
              <p className="text-gray-600">
                Support for both DPS Bangalore campuses with flexible locations and batch options for convenience.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
              <BookOpen className="w-10 h-10 text-violet-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Competitive Peer Groups</h3>
              <p className="text-gray-600">
                Learn with Bangalore's most ambitious DPS students. Batches that inspire and drive excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding Your Curriculum */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Understanding Your Curriculum</h2>
          <div ref={curriculumAnimation.ref} className={`bg-gradient-to-r from-violet-50 to-violet-100 p-10 rounded-lg transition-all duration-700 ${curriculumAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-2xl font-bold mb-6 text-gray-900">DPS CBSE Excellence → NEET Dominance</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-lg mb-4 text-violet-900">Your School Advantage</h4>
                <ul className="space-y-3">
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Strong CBSE curriculum with premium teaching</span></li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Highly competitive NEET-focused peer group</span></li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Excellent infrastructure and lab facilities</span></li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Bangalore's top CBSE school with proven results</span></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-4 text-violet-900">NEET Bridge Strategy</h4>
                <ul className="space-y-3">
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Leverage CBSE strength for NEET depth</span></li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Focused high-yield NEET topics</span></li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Speed optimization and MCQ mastery</span></li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Comprehensive test series and mock exams</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Success Stories from DPS Bangalore Students</h2>
          <div ref={testimonialAnimation.ref} className={`grid md:grid-cols-3 gap-8 transition-all duration-700 ${testimonialAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-violet-600 rounded-full mr-4"></div>
                <div>
                  <p className="font-bold text-gray-900">Aditya N.</p>
                  <p className="text-sm text-gray-500">DPS Bangalore</p>
                </div>
              </div>
              <p className="text-yellow-500 mb-3">★★★★★</p>
              <p className="text-gray-600">
                "Bangalore's competitive NEET environment is intense. Cerebrum's coaching gave me the edge. Got AIR 121!"
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-violet-600 rounded-full mr-4"></div>
                <div>
                  <p className="font-bold text-gray-900">Shreya M.</p>
                  <p className="text-sm text-gray-500">DPS Bangalore North</p>
                </div>
              </div>
              <p className="text-yellow-500 mb-3">★★★★★</p>
              <p className="text-gray-600">
                "DPS peers in Cerebrum batch motivated me constantly. Learning from ambitious students like me was transformative!"
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-violet-600 rounded-full mr-4"></div>
                <div>
                  <p className="font-bold text-gray-900">Vedant L.</p>
                  <p className="text-sm text-gray-500">DPS Bangalore South</p>
                </div>
              </div>
              <p className="text-yellow-500 mb-3">★★★★★</p>
              <p className="text-gray-600">
                "Faculty understood DPS's academic excellence standards. Coaching matched our school's premium quality. Excellent results!"
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
              <h3 className="text-lg font-bold text-gray-900 mb-3">How do you support both DPS North and South campuses?</h3>
              <p className="text-gray-600">
                We have coaching centers and batch options convenient for both campuses. Flexible scheduling and location options for your campus.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Are there dedicated batches for DPS students?</h3>
              <p className="text-gray-600">
                Yes, we create DPS-specific batches with peers from your school. Competitive peer group with similar CBSE background and NEET aspirations.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-3">How do you leverage DPS's CBSE strength for NEET?</h3>
              <p className="text-gray-600">
                DPS provides excellent CBSE foundation. We focus on NEET-specific angles, high-yield topics, and MCQ strategies while maintaining conceptual depth.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-3">What about timing and school commitments?</h3>
              <p className="text-gray-600">
                Flexible timing options including after-school classes and weekend batches. We work around your school activities and commitments.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-3">How do I enroll and book a demo?</h3>
              <p className="text-gray-600">
                WhatsApp us at +91 88264 44334 or call 8826444334. Visit cerebrumbiologyacademy.com. We'll arrange a personalized demo session.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-violet-600 to-violet-800">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Achieve NEET Excellence at DPS Bangalore</h2>
          <p className="text-xl mb-8">Join DPS Bangalore students who've achieved 98%+ success rates with Cerebrum Biology Academy.</p>
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
          <div className="mt-8 text-violet-100">
            <p className="mb-2"><MapPin className="w-4 h-4 inline mr-2" />DPS North & South, Bangalore</p>
            <p className="mb-2">Phone: {phone}</p>
            <p>Website: {website}</p>
          </div>
        </div>
      </section>
      <PricingSection cityName="Dps" />
      <CostComparisonSection cityName="Dps" />
      <RelatedCityLinks currentCity="dps-bangalore" variant="default" />

