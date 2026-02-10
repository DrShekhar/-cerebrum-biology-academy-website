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
    'International Indian School Riyadh',
    'Indian School Riyadh',
    'Indian Embassy School',
    'DPS Riyadh',
    'Riyadh Schools CBSE',
    'Modern Indian School',
    'Al Yasmin International',
    'International Schools Group',
  ]

  const faqs = [
    {
      q: 'Is online NEET coaching effective for students in Riyadh?',
      a: 'Yes! Our online NEET coaching is specifically designed for Indian expat students. With 98% success rate and timezone-friendly classes, students in Riyadh achieve excellent results. Live interactive sessions with AIIMS faculty ensure personalized attention.',
    },
    {
      q: 'What are the class timings for Riyadh students?',
      a: 'We offer flexible timezone-friendly classes. Classes are scheduled considering Saudi Arabia timezone to ensure students can attend live sessions comfortably without conflicts with school hours.',
    },
    {
      q: 'Do you provide WhatsApp support for doubt clearing?',
      a: 'Absolutely! Instant WhatsApp support is available 24/7. Our faculty team responds within minutes to help clarify any biology or chemistry doubts. Video calls are also available for complex topics.',
    },
    {
      q: 'Which schools in Riyadh do you support?',
      a: 'We support students from all major CBSE schools in Riyadh including International Indian School Riyadh, Indian School Riyadh, Indian Embassy School, and other CBSE-affiliated institutions.',
    },
    {
      q: 'What makes Cerebrum different from other NEET coaching centers?',
      a: 'We specialize in coaching Indian expat students. Our AIIMS faculty combined with personalized attention, 695/720 top score achievement, and 4.9-star rating ensures the best preparation for NEET.',
    },
  ]

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section
        ref={heroSection.ref}
        className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white px-4 transition-opacity duration-1000 ${
          heroSection.isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 inline-block">
            <span className="bg-blue-200 text-blue-900 px-6 py-2 rounded-full text-sm font-semibold">Trusted by 500+ Indian Students</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Best NEET Coaching for Indian Students in Riyadh</h1>
          <p className="text-xl md:text-2xl mb-12 text-blue-100">Expert AIIMS Faculty • 98% Success Rate • 695/720 Top Score • Timezone-Friendly Online Classes</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg border border-white/20">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <p className="text-sm text-blue-200">98% Success Rate</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg border border-white/20">
              <Star className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <p className="text-sm text-blue-200">4.9/5 Rating</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg border border-white/20">
              <Users className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <p className="text-sm text-blue-200">500+ Students</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg border border-white/20">
              <Target className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <p className="text-sm text-blue-200">695/720 Top Score</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="https://wa.me/918826444334?text=Hi%20Cerebrum%21%20I%20want%20to%20join%20NEET%20coaching%20in%20Riyadh" target="_blank" rel="noopener noreferrer">
              <Button className="bg-green-500 hover:bg-green-600 text-white w-full md:w-auto">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp: 918826444334
              </Button>
            </a>
            <Button className="bg-white text-blue-900 hover:bg-blue-50 w-full md:w-auto">
              <Play className="w-5 h-5 mr-2" />
              Book Free Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section ref={whyChooseSection.ref} className={`py-20 px-4 transition-opacity duration-1000 ${whyChooseSection.isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Why Choose Cerebrum for NEET in Riyadh?</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Specialized coaching designed for Indian expat students with unique timezone and curriculum needs</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-lg border border-blue-200">
              <div className="flex items-start gap-4">
                <Clock className="w-12 h-12 text-blue-600 flex-shrink-0 mt-2" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Timezone-Friendly Classes</h3>
                  <p className="text-gray-700">Classes scheduled for Saudi Arabia timezone. No clash with school hours. Live interactive sessions at convenient times for Riyadh students.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-lg border border-blue-200">
              <div className="flex items-start gap-4">
                <GraduationCap className="w-12 h-12 text-blue-600 flex-shrink-0 mt-2" />
                <div>
                  <h3 className="text-xl font-bold mb-2">AIIMS Faculty</h3>
                  <p className="text-gray-700">Expert faculty from top AIIMS colleges with 15+ years of NEET coaching experience. Proven track record of 695/720 top scores.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-lg border border-blue-200">
              <div className="flex items-start gap-4">
                <Users className="w-12 h-12 text-blue-600 flex-shrink-0 mt-2" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Personalized Attention</h3>
                  <p className="text-gray-700">Small batch sizes ensure individual focus. Each student gets personalized study plans based on strength and weakness analysis.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-lg border border-blue-200">
              <div className="flex items-start gap-4">
                <MessageCircle className="w-12 h-12 text-blue-600 flex-shrink-0 mt-2" />
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
          <h2 className="text-4xl font-bold text-center mb-4">Schools We Support in Riyadh</h2>
          <p className="text-gray-600 text-center mb-12">Students from these schools have achieved 98% success rate in NEET</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {schools.map((school, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white p-6 rounded-lg border border-gray-200">
                <Building className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">{school}</h3>
                  <p className="text-gray-600 text-sm">CBSE-aligned NEET preparation</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-blue-50 p-8 rounded-lg border-l-4 border-blue-600">
            <p className="text-gray-700">
              <strong>Not from these schools?</strong> We support students from all CBSE and international schools in Riyadh. Contact us to discuss your specific curriculum and requirements.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqSection.ref} className={`py-20 px-4 transition-opacity duration-1000 ${faqSection.isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-center mb-12">Everything you need to know about NEET coaching in Riyadh</p>
          
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
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Join India's #1 NEET Coaching?</h2>
          <p className="text-xl text-blue-100 mb-8">Get expert NEET guidance for Riyadh students. Free demo class available now.</p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="https://wa.me/918826444334?text=Hi%20Cerebrum%21%20I%20want%20to%20join%20NEET%20coaching%20in%20Riyadh" target="_blank" rel="noopener noreferrer">
              <Button className="bg-green-500 hover:bg-green-600 text-white w-full md:w-auto text-lg px-8 py-3">
                <MessageCircle className="w-6 h-6 mr-2" />
                WhatsApp: 918826444334
              </Button>
            </a>
            <Button className="bg-white text-blue-900 hover:bg-blue-50 w-full md:w-auto text-lg px-8 py-3">
              Call: 8826444334
            </Button>
          </div>
          
          <p className="text-blue-200 text-sm mt-6">cerebrumbiologyacademy.com</p>
        </div>
      </section>
    </main>
  )
}
