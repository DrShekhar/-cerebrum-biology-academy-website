'use client'
import { useEffect, useRef, useState } from 'react'
import { Trophy, Users, MessageCircle, Play, Headphones, MapPin, Star, GraduationCap, Target, Building, Shield, ArrowRight, BookOpen, CheckCircle, Globe, Clock } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { RelatedCityLinks } from '@/components/seo/RelatedCityLinks'
import { CityBreadcrumb } from '@/components/city/CityBreadcrumb'
import { PricingSection } from '@/components/city/PricingSection'
import { CostComparisonSection } from '@/components/city/CostComparisonSection'


function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true) }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return { ref, isVisible }
}

export default function PageContent() {
  const heroSection = useScrollAnimation()
  const whyChooseSection = useScrollAnimation()
  const schoolsSection = useScrollAnimation()
  const faqSection = useScrollAnimation()

  const schools = [
    'International Indian School Jeddah',
    'Jeddah Knowledge International',
    'Al Waha International',
    'Dar Al Fikr Schools',
    'Jeddah Prep and Grammar',
    'CBSE Schools Jeddah',
    'Indian International School',
    'Manarat Jeddah School',
  ]

  const faqs = [
    {
      q: 'How does NEET coaching work for students in Jeddah?',
      a: 'Our online platform is specifically designed for Indian expat students in Jeddah. Live interactive classes with AIIMS faculty, personalized study plans, and 24/7 WhatsApp support ensure comprehensive NEET preparation.',
    },
    {
      q: 'Are the class timings suitable for Jeddah timezone?',
      a: 'Yes! We offer flexible scheduling that works perfectly for Jeddah. Classes are timed to avoid school hours and work around your daily schedule. Recorded sessions are also available for flexibility.',
    },
    {
      q: 'Which schools in Jeddah do your students come from?',
      a: 'We support students from Al Hussan International School, Jeddah Knowledge School, Indian School Jeddah, and all other CBSE-affiliated schools in Jeddah with a 98% success rate.',
    },
    {
      q: 'How does WhatsApp support help with doubt clearing?',
      a: 'Instant WhatsApp support connects you directly with AIIMS faculty. Share your doubts anytime, get answers within minutes. Video explanations are provided for complex biology and chemistry concepts.',
    },
    {
      q: 'What is the success rate for Jeddah students?',
      a: 'Our Jeddah students achieve 98% success rate in NEET with an average score of 595+. We have students scoring 680-695 marks regularly. Our personalized approach works exceptionally well for international students.',
    },
  ]

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section
        ref={heroSection.ref}
        className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 via-teal-800 to-blue-900 text-white px-4 transition-opacity duration-1000 ${
          heroSection.isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 inline-block">
            <span className="bg-emerald-200 text-emerald-900 px-6 py-2 rounded-full text-sm font-semibold">Trusted by 1,50,000+ Students</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Best NEET Coaching for Indian Students in Jeddah</h1>
          <p className="text-xl md:text-2xl mb-12 text-emerald-100">Expert AIIMS Faculty • 98% Success Rate • 695/720 Top Score • Timezone-Friendly Online Classes</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg border border-white/20">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <p className="text-sm text-emerald-200">98% Success Rate</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg border border-white/20">
              <Star className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <p className="text-sm text-emerald-200">4.9/5 Rating</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg border border-white/20">
              <Users className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <p className="text-sm text-emerald-200">1,50,000+ Students</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg border border-white/20">
              <Target className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <p className="text-sm text-emerald-200">695/720 Top Score</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="https://wa.me/918826444334?text=Hi%20Cerebrum%21%20I%20want%20to%20join%20NEET%20coaching%20in%20Jeddah" target="_blank" rel="noopener noreferrer">
              <Button className="bg-green-500 hover:bg-green-600 text-white w-full md:w-auto">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp: 918826444334
              </Button>
            </a>
            <Button className="bg-white text-emerald-900 hover:bg-emerald-50 w-full md:w-auto">
              <Play className="w-5 h-5 mr-2" />
              Book Free Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section ref={whyChooseSection.ref} className={`py-20 px-4 transition-opacity duration-1000 ${whyChooseSection.isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Why Choose Cerebrum for NEET in Jeddah?</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Specialized coaching designed for Indian expat students with unique timezone and curriculum needs</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-lg border border-emerald-200">
              <div className="flex items-start gap-4">
                <Clock className="w-12 h-12 text-emerald-600 flex-shrink-0 mt-2" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Timezone-Friendly Classes</h3>
                  <p className="text-gray-700">Classes scheduled for Saudi Arabia timezone. No clash with school hours. Live interactive sessions at convenient times for Jeddah students.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-lg border border-emerald-200">
              <div className="flex items-start gap-4">
                <GraduationCap className="w-12 h-12 text-emerald-600 flex-shrink-0 mt-2" />
                <div>
                  <h3 className="text-xl font-bold mb-2">AIIMS Faculty</h3>
                  <p className="text-gray-700">Expert faculty from top AIIMS colleges with 15+ years of NEET coaching experience. Proven track record of 695/720 top scores.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-lg border border-emerald-200">
              <div className="flex items-start gap-4">
                <Users className="w-12 h-12 text-emerald-600 flex-shrink-0 mt-2" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Personalized Attention</h3>
                  <p className="text-gray-700">Small batch sizes ensure individual focus. Each student gets personalized study plans based on strength and weakness analysis.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-lg border border-emerald-200">
              <div className="flex items-start gap-4">
                <MessageCircle className="w-12 h-12 text-emerald-600 flex-shrink-0 mt-2" />
                <div>
                  <h3 className="text-xl font-bold mb-2">WhatsApp 24/7 Support</h3>
                  <p className="text-gray-700">Instant doubt clearing on WhatsApp. Our faculty responds within minutes. Video calls available for complex topics.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schools Served Section */}
      <section ref={schoolsSection.ref} className={`py-20 px-4 bg-gray-50 transition-opacity duration-1000 ${schoolsSection.isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Schools We Support in Jeddah</h2>
          <p className="text-gray-600 text-center mb-12">Students from these schools have achieved 98% success rate in NEET</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {schools.map((school, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white p-6 rounded-lg border border-gray-200">
                <Building className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">{school}</h3>
                  <p className="text-gray-600 text-sm">CBSE-aligned NEET preparation</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-emerald-50 p-8 rounded-lg border-l-4 border-emerald-600">
            <p className="text-gray-700">
              <strong>Not from these schools?</strong> We support students from all CBSE and international schools in Jeddah. Contact us to discuss your specific curriculum and requirements.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqSection.ref} className={`py-20 px-4 transition-opacity duration-1000 ${faqSection.isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-center mb-12">Everything you need to know about NEET coaching in Jeddah</p>
          
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <details key={idx} className="bg-white border border-gray-200 rounded-lg overflow-hidden group">
                <summary className="p-6 cursor-pointer flex items-center justify-between hover:bg-gray-50">
                  <h3 className="font-semibold text-lg">{faq.q}</h3>
                  <ArrowRight className="w-5 h-5 text-gray-600 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-6 pb-6 text-gray-700 border-t border-gray-200">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-900 to-teal-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Join India's #1 NEET Coaching?</h2>
          <p className="text-xl text-emerald-100 mb-8">Get expert NEET guidance for Jeddah students. Free demo class available now.</p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="https://wa.me/918826444334?text=Hi%20Cerebrum%21%20I%20want%20to%20join%20NEET%20coaching%20in%20Jeddah" target="_blank" rel="noopener noreferrer">
              <Button className="bg-green-500 hover:bg-green-600 text-white w-full md:w-auto text-lg px-8 py-3">
                <MessageCircle className="w-6 h-6 mr-2" />
                WhatsApp: 918826444334
              </Button>
            </a>
            <Button className="bg-white text-emerald-900 hover:bg-emerald-50 w-full md:w-auto text-lg px-8 py-3">
              Call: 8826444334
            </Button>
          </div>
          
          <p className="text-emerald-200 text-sm mt-6">cerebrumbiologyacademy.com</p>
        </div>
      </section>
    </main>
  )
}
