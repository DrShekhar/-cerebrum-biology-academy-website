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
    'Lahore Grammar School',
    'Aitchison College',
    'Beaconhouse School System',
    'City School Lahore',
    'Lahore American School',
    'International School Lahore',
    'Crescent Model School',
    'Divisional Public School',
  ]

  const faqs = [
    {
      q: 'Can I prepare for both NEET and MDCAT together?',
      a: 'Yes! Both exams have similar biology and chemistry concepts. Our specialized dual curriculum helps students prepare for both NEET and MDCAT simultaneously. Many successful students have scored high in both exams.',
    },
    {
      q: 'What is the MDCAT to NEET difference?',
      a: 'MDCAT is Pakistan\'s medical entrance exam, NEET is India\'s. Both require strong biology knowledge. Our faculty covers both exam patterns, emphasis differences, and helps students choose their best exam.',
    },
    {
      q: 'How does timezone work for Lahore students?',
      a: 'Lahore is 30 minutes behind India timezone. Classes are scheduled perfectly for evening hours in Lahore. Morning sessions work for Lahore morning. Recorded classes available for flexibility.',
    },
    {
      q: 'Which schools in Lahore send students to NEET coaching?',
      a: 'We support students from Lahore Grammar School, Aitchison College, Beacon House School, and other international schools. Many Pakistani students studying in Indian curriculum schools also join.',
    },
    {
      q: 'What is your success rate for MDCAT students?',
      a: 'While we specialize in NEET with 98% success rate, our MDCAT students also achieve excellent results. Students who prepare for both typically score well on NEET. Direct MDCAT focus available upon request.',
    },
  ]

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section
        ref={heroSection.ref}
        className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-teal-800 to-blue-900 text-white px-4 transition-opacity duration-1000 ${
          heroSection.isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 inline-block">
            <span className="bg-green-200 text-green-900 px-6 py-2 rounded-full text-sm font-semibold">Trusted by 500+ Students</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Best NEET & MDCAT Coaching in Lahore</h1>
          <p className="text-xl md:text-2xl mb-12 text-green-100">Dual Exam Prep • 98% NEET Success • 695/720 Top Score • Pakistan-Friendly Timing</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg border border-white/20">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <p className="text-sm text-green-200">98% Success Rate</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg border border-white/20">
              <Star className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <p className="text-sm text-green-200">4.9/5 Rating</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg border border-white/20">
              <Users className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <p className="text-sm text-green-200">500+ Students</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg border border-white/20">
              <Target className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <p className="text-sm text-green-200">695/720 Top Score</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="https://wa.me/918826444334?text=Hi%20Cerebrum%21%20I%20want%20to%20join%20NEET%20coaching%20in%20Lahore" target="_blank" rel="noopener noreferrer">
              <Button className="bg-green-500 hover:bg-green-600 text-white w-full md:w-auto">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp: 918826444334
              </Button>
            </a>
            <Button className="bg-white text-green-900 hover:bg-green-50 w-full md:w-auto">
              <Play className="w-5 h-5 mr-2" />
              Book Free Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section ref={whyChooseSection.ref} className={`py-20 px-4 transition-opacity duration-1000 ${whyChooseSection.isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Why Choose Cerebrum for NEET in Lahore?</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Specialized dual exam coaching for students considering both NEET and MDCAT</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-lg border border-green-200">
              <div className="flex items-start gap-4">
                <Clock className="w-12 h-12 text-green-600 flex-shrink-0 mt-2" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Pakistan Timezone Friendly</h3>
                  <p className="text-gray-700">Only 30 minutes behind India timezone. Classes fit perfectly with Lahore schedule. No early mornings or late nights. Flexible options for working professionals.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-lg border border-green-200">
              <div className="flex items-start gap-4">
                <GraduationCap className="w-12 h-12 text-green-600 flex-shrink-0 mt-2" />
                <div>
                  <h3 className="text-xl font-bold mb-2">AIIMS Faculty</h3>
                  <p className="text-gray-700">Expert faculty from top AIIMS colleges with 15+ years of NEET coaching experience. Proven track record of 695/720 top scores and medical college admissions.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-lg border border-green-200">
              <div className="flex items-start gap-4">
                <BookOpen className="w-12 h-12 text-green-600 flex-shrink-0 mt-2" />
                <div>
                  <h3 className="text-xl font-bold mb-2">NEET & MDCAT Dual Prep</h3>
                  <p className="text-gray-700">Specialized curriculum covering both NEET and MDCAT. Students learn exam differences, emphasis areas. Ideal for students considering admission in India or Pakistan.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-lg border border-green-200">
              <div className="flex items-start gap-4">
                <MessageCircle className="w-12 h-12 text-green-600 flex-shrink-0 mt-2" />
                <div>
                  <h3 className="text-xl font-bold mb-2">WhatsApp 24/7 Support</h3>
                  <p className="text-gray-700">Instant doubt clearing on WhatsApp. No international charges. Faculty responds within minutes. Video calls for complex biology and chemistry topics.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schools Served Section */}
      <section ref={schoolsSection.ref} className={`py-20 px-4 bg-gray-50 transition-opacity duration-1000 ${schoolsSection.isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Schools We Support in Lahore</h2>
          <p className="text-gray-600 text-center mb-12">Students from these schools have achieved 98% success rate in NEET</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {schools.map((school, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white p-6 rounded-lg border border-gray-200">
                <Building className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">{school}</h3>
                  <p className="text-gray-600 text-sm">NEET & MDCAT focused prep</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-green-50 p-8 rounded-lg border-l-4 border-green-600">
            <p className="text-gray-700">
              <strong>From another school?</strong> We support students from all international schools in Lahore and Pakistani schools following Indian curriculum. Special focus on students considering medical admission in either India or Pakistan.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqSection.ref} className={`py-20 px-4 transition-opacity duration-1000 ${faqSection.isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-center mb-12">Everything you need to know about NEET and MDCAT coaching in Lahore</p>
          
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
      <section className="py-20 px-4 bg-gradient-to-r from-green-900 to-teal-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Join India's #1 NEET Coaching?</h2>
          <p className="text-xl text-green-100 mb-8">Get expert NEET and MDCAT guidance for Lahore students. Free demo class available now.</p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="https://wa.me/918826444334?text=Hi%20Cerebrum%21%20I%20want%20to%20join%20NEET%20coaching%20in%20Lahore" target="_blank" rel="noopener noreferrer">
              <Button className="bg-green-500 hover:bg-green-600 text-white w-full md:w-auto text-lg px-8 py-3">
                <MessageCircle className="w-6 h-6 mr-2" />
                WhatsApp: 918826444334
              </Button>
            </a>
            <Button className="bg-white text-green-900 hover:bg-green-50 w-full md:w-auto text-lg px-8 py-3">
              Call: 8826444334
            </Button>
          </div>
          
          <p className="text-green-200 text-sm mt-6">cerebrumbiologyacademy.com</p>
        </div>
      </section>
    </main>
  )
}
