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
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 pt-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-64 h-64 bg-indigo-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-indigo-500 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-indigo-200 text-indigo-900 rounded-full text-sm font-semibold">
            <Building className="inline w-4 h-4 mr-2" />
            Heritage Xperiential Learning School, Gurgaon
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            NEET Coaching for Heritage Xperiential Students
          </h1>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Specialized NEET preparation for experiential learners. CBSE/IB bridge coaching with hands-on understanding. Master biology concepts through application.
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

      {/* Why Heritage Xperiential Students Choose Cerebrum */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Why Heritage Xperiential Students Choose Cerebrum</h2>
          <div ref={featureAnimation.ref} className={`grid md:grid-cols-2 gap-8 transition-all duration-700 ${featureAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
              <Target className="w-10 h-10 text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Application-Based Learning</h3>
              <p className="text-gray-600">
                Your experiential learning approach is perfect for biology. We teach through applications and real-world connections alongside NEET concepts.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
              <GraduationCap className="w-10 h-10 text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">CBSE/IB Flexibility</h3>
              <p className="text-gray-600">
                Whether you're following CBSE or IB track, we bridge both curricula to NEET. Customized approach for your specific path.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
              <Shield className="w-10 h-10 text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Practical Understanding Focus</h3>
              <p className="text-gray-600">
                Beyond memorization, we emphasize deep conceptual understanding through practical examples and case studies.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
              <BookOpen className="w-10 h-10 text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Holistic Biology Mastery</h3>
              <p className="text-gray-600">
                Combining experiential learning with NEET rigor creates complete biology mastery for medical entrance excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding Your Curriculum */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Understanding Your Curriculum</h2>
          <div ref={curriculumAnimation.ref} className={`bg-gradient-to-r from-indigo-50 to-indigo-100 p-10 rounded-lg transition-all duration-700 ${curriculumAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-2xl font-bold mb-6 text-gray-900">CBSE/IB Experiential Learning → NEET Success</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-lg mb-4 text-indigo-900">Your School Advantage</h4>
                <ul className="space-y-3">
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Experiential learning builds deep conceptual understanding</span></li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Strong practical lab experience</span></li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Critical thinking through hands-on approach</span></li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Flexibility between CBSE and IB curriculum</span></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-4 text-indigo-900">NEET Bridge Strategy</h4>
                <ul className="space-y-3">
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Apply experiential understanding to NEET topics</span></li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Bridge CBSE/IB curriculum gaps for NEET</span></li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>High-yield topics with practical connections</span></li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>NEET MCQ strategy and test series</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Success Stories from Heritage Xperiential Students</h2>
          <div ref={testimonialAnimation.ref} className={`grid md:grid-cols-3 gap-8 transition-all duration-700 ${testimonialAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-full mr-4"></div>
                <div>
                  <p className="font-bold text-gray-900">Anjali K.</p>
                  <p className="text-sm text-gray-500">Heritage Xperiential</p>
                </div>
              </div>
              <p className="text-yellow-500 mb-3">★★★★★</p>
              <p className="text-gray-600">
                "Cerebrum understood my experiential learning style. The practical approach to NEET prep made concepts stick. Got AIR 189!"
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-full mr-4"></div>
                <div>
                  <p className="font-bold text-gray-900">Raghav P.</p>
                  <p className="text-sm text-gray-500">Heritage Xperiential</p>
                </div>
              </div>
              <p className="text-yellow-500 mb-3">★★★★★</p>
              <p className="text-gray-600">
                "Transitioning from experiential learning to NEET format was seamless with Cerebrum. They bridged the gap perfectly."
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-full mr-4"></div>
                <div>
                  <p className="font-bold text-gray-900">Meera T.</p>
                  <p className="text-sm text-gray-500">Heritage Xperiential</p>
                </div>
              </div>
              <p className="text-yellow-500 mb-3">★★★★★</p>
              <p className="text-gray-600">
                "The application-based teaching approach aligned perfectly with Heritage's style. Made NEET biology relevant and engaging!"
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
              <h3 className="text-lg font-bold text-gray-900 mb-3">How do you align experiential learning with NEET requirements?</h3>
              <p className="text-gray-600">
                Your experiential learning approach is a strength. We connect hands-on understanding to NEET concepts through applications and real-world examples that make biology relevant and memorable.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Do you support both CBSE and IB curriculum students?</h3>
              <p className="text-gray-600">
                Absolutely. We provide customized coaching for both CBSE and IB tracks, bridging either curriculum to NEET requirements. Your specific path determines our strategy.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Can you help with the transition from experiential to NEET MCQ format?</h3>
              <p className="text-gray-600">
                Yes, this is a key transition we specialize in. We teach MCQ strategy while maintaining the conceptual depth that experiential learning builds.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Are there specific batches for Heritage Xperiential students?</h3>
              <p className="text-gray-600">
                We organize dedicated batches when enrollment allows, creating a peer group that understands your school's learning approach and NEET goals.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-3">How can I schedule a demo class?</h3>
              <p className="text-gray-600">
                WhatsApp us at +91 88264 44334 or call 8826444334. Visit cerebrumbiologyacademy.com. We'll arrange a demo that matches your learning style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-indigo-600 to-indigo-800">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Master NEET Through Experiential Excellence</h2>
          <p className="text-xl mb-8">Join Heritage Xperiential students who've achieved 98%+ success rates with Cerebrum Biology Academy.</p>
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
          <div className="mt-8 text-indigo-100">
            <p className="mb-2"><MapPin className="w-4 h-4 inline mr-2" />Gurgaon, Haryana</p>
            <p className="mb-2">Phone: {phone}</p>
            <p>Website: {website}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
