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
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 pt-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-blue-200 text-blue-900 rounded-full text-sm font-semibold">
            <Building className="inline w-4 h-4 mr-2" />
            Vasant Valley School, New Delhi
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            NEET Coaching for Vasant Valley School Students
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Elite CBSE + enriched curriculum support for Vasant Kunj's most accomplished students. Master NEET Biology while excelling in school academics.
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

      {/* Why Vasant Valley Students Choose Cerebrum */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Why Vasant Valley Students Choose Cerebrum</h2>
          <div ref={featureAnimation.ref} className={`grid md:grid-cols-2 gap-8 transition-all duration-700 ${featureAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
              <Target className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">School + NEET Balance</h3>
              <p className="text-gray-600">
                Understand how your enriched CBSE curriculum directly supports NEET preparation. Our faculty knows Vasant Valley's curriculum depth.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
              <GraduationCap className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Elite Student Community</h3>
              <p className="text-gray-600">
                Batch with peers from your school who share similar academic rigor. Competitive yet collaborative learning environment.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
              <Shield className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Flexible Timing</h3>
              <p className="text-gray-600">
                Classes scheduled around your school activities, sports, and other enrichment programs at Vasant Valley.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
              <BookOpen className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Personalized Learning</h3>
              <p className="text-gray-600">
                Small batch sizes ensure individual attention. Track progress with regular assessments and one-on-one mentoring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding Your Curriculum */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Understanding Your Curriculum</h2>
          <div ref={curriculumAnimation.ref} className={`bg-gradient-to-r from-blue-50 to-blue-100 p-10 rounded-lg transition-all duration-700 ${curriculumAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-2xl font-bold mb-6 text-gray-900">CBSE + Enriched Curriculum → NEET Success</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-lg mb-4 text-blue-900">Your School Advantage</h4>
                <ul className="space-y-3">
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Rigorous CBSE foundation with enriched content</span></li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Strong lab work and practical understanding</span></li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Holistic education approach supports critical thinking</span></li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Strong English proficiency for question comprehension</span></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-4 text-blue-900">NEET Bridge Strategy</h4>
                <ul className="space-y-3">
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Map enriched curriculum to NEET requirements</span></li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Focus on high-yield NEET topics within your syllabus</span></li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>NEET-style MCQ practice with explanation depth</span></li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Structured NEET-specific test series</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Success Stories from Vasant Valley Students</h2>
          <div ref={testimonialAnimation.ref} className={`grid md:grid-cols-3 gap-8 transition-all duration-700 ${testimonialAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full mr-4"></div>
                <div>
                  <p className="font-bold text-gray-900">Arjun K.</p>
                  <p className="text-sm text-gray-500">Vasant Valley School</p>
                </div>
              </div>
              <p className="text-yellow-500 mb-3">★★★★★</p>
              <p className="text-gray-600">
                "Cerebrum helped me score 720/720 in NEET Biology while maintaining excellent school grades. The personalized attention made all the difference."
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full mr-4"></div>
                <div>
                  <p className="font-bold text-gray-900">Isha M.</p>
                  <p className="text-sm text-gray-500">Vasant Valley School</p>
                </div>
              </div>
              <p className="text-yellow-500 mb-3">★★★★★</p>
              <p className="text-gray-600">
                "The faculty understood our school's curriculum and showed how it connects to NEET. Classes were flexible around my sports commitments."
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full mr-4"></div>
                <div>
                  <p className="font-bold text-gray-900">Vikram S.</p>
                  <p className="text-sm text-gray-500">Vasant Valley School</p>
                </div>
              </div>
              <p className="text-yellow-500 mb-3">★★★★★</p>
              <p className="text-gray-600">
                "Studying with peers from my school who had similar academic levels motivated me. Got AIR 187 in NEET. Highly recommend!"
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
              <h3 className="text-lg font-bold text-gray-900 mb-3">How does Cerebrum coordinate with Vasant Valley's curriculum?</h3>
              <p className="text-gray-600">
                We understand the CBSE + enriched curriculum at Vasant Valley. Our faculty aligns NEET preparation with your school's teaching progression, ensuring no conflicts and maximum synergy between school studies and NEET prep.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Can classes work around school activities and sports?</h3>
              <p className="text-gray-600">
                Absolutely. We offer flexible timing options including weekend batches and after-school classes. We work with your schedule to accommodate school activities, sports, and other commitments at Vasant Valley.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Are there dedicated batches for Vasant Valley students?</h3>
              <p className="text-gray-600">
                Yes, we create batches with Vasant Valley students when possible, creating a peer group with similar academic levels and school background. This builds a supportive community while maintaining healthy competition.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-3">What if I'm balancing school academics with NEET prep?</h3>
              <p className="text-gray-600">
                This is exactly what we specialize in for Vasant Valley students. We focus on high-yield NEET topics and teach concepts that directly support your CBSE curriculum. The integrated approach means less time studying the same content twice.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-3">How can we schedule a free demo class?</h3>
              <p className="text-gray-600">
                Simply WhatsApp us at +91 88264 44334 or call 8826444334. Visit cerebrumbiologyacademy.com to explore more. We'll arrange a session at a time convenient for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Excel in NEET?</h2>
          <p className="text-xl mb-8">Join Vasant Valley students who've achieved 98%+ success rates with Cerebrum Biology Academy.</p>
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
          <div className="mt-8 text-blue-100">
            <p className="mb-2"><MapPin className="w-4 h-4 inline mr-2" />Vasant Kunj, New Delhi</p>
            <p className="mb-2">Phone: {phone}</p>
            <p>Website: {website}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
