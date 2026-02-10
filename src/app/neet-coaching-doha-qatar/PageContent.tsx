'use client'
import { useEffect, useRef, useState } from 'react'
import { Trophy, Users, MessageCircle, Play, Headphones, MapPin, Star, GraduationCap, Target, Building, Shield, ArrowRight, BookOpen, CheckCircle, Globe, Clock } from 'lucide-react'
import { Button } from '@/components/ui/Button'

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
    'Delhi Public School Doha',
    'Birla Public School Doha',
    'MES Indian School Doha',
    'CBSE Schools in Qatar',
  ]

  const faqs = [
    {
      q: 'Which schools in Doha do your students come from?',
      a: 'We primarily serve Delhi Public School Doha, Birla Public School Doha, and MES Indian School Doha. These schools have the largest Indian expat communities. We also support students from other CBSE schools in Doha.',
    },
    {
      q: 'What is the timezone benefit for Doha students?',
      a: 'Doha is 3.5 hours ahead of India. We schedule classes in morning hours (India evening/night) which work perfectly for Doha afternoon classes. Recorded sessions available for maximum flexibility.',
    },
    {
      q: 'Is online NEET coaching suitable for Doha distance?',
      a: 'Absolutely! Online coaching is ideal for students in Doha. Our platform supports high-quality video streaming, interactive whiteboard, and real-time doubt solving. 98% of our students are from international locations like Doha.',
    },
    {
      q: 'What support is available for DPS Doha students specifically?',
      a: 'DPS Doha students are our core audience. We understand their curriculum, exam patterns, and school schedule. Many DPS Doha parents and students have recommended us. Specialized batches for DPS students available.',
    },
    {
      q: 'How does WhatsApp support work for Qatar?',
      a: 'Complete WhatsApp support available with no international charges within Qatar. Faculty responds within minutes to doubts. Video explanations for complex biology concepts. Regular progress tracking through WhatsApp.',
    },
  ]

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section
        ref={heroSection.ref}
        className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 text-white px-4 transition-opacity duration-1000 ${
          heroSection.isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 inline-block">
            <span className="bg-purple-200 text-purple-900 px-6 py-2 rounded-full text-sm font-semibold">Trusted by 500+ Indian Students</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Best NEET Coaching for Indian Students in Doha</h1>
          <p className="text-xl md:text-2xl mb-12 text-purple-100">Expert AIIMS Faculty • 98% Success Rate • 695/720 Top Score • Serving DPS Doha & International Schools</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg border border-white/20">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <p className="text-sm text-purple-200">98% Success Rate</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg border border-white/20">
              <Star className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <p className="text-sm text-purple-200">4.9/5 Rating</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg border border-white/20">
              <Users className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <p className="text-sm text-purple-200">500+ Students</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg border border-white/20">
              <Target className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <p className="text-sm text-purple-200">695/720 Top Score</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="https://wa.me/918826444334?text=Hi%20Cerebrum%21%20I%20want%20to%20join%20NEET%20coaching%20in%20Doha" target="_blank" rel="noopener noreferrer">
              <Button className="bg-green-500 hover:bg-green-600 text-white w-full md:w-auto">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp: 918826444334
              </Button>
            </a>
            <Button className="bg-white text-purple-900 hover:bg-purple-50 w-full md:w-auto">
              <Play className="w-5 h-5 mr-2" />
              Book Free Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section ref={whyChooseSection.ref} className={`py-20 px-4 transition-opacity duration-1000 ${whyChooseSection.isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Why Choose Cerebrum for NEET in Doha?</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Specialized coaching for DPS Doha and international school students with proven success</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-lg border border-purple-200">
              <div className="flex items-start gap-4">
                <Clock className="w-12 h-12 text-purple-600 flex-shrink-0 mt-2" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Qatar Timezone Optimized</h3>
                  <p className="text-gray-700">Doha is 3.5 hours ahead, making afternoon classes in Doha coincide with evening in India. Morning India classes = afternoon Doha. Perfect fit for school schedules.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-lg border border-purple-200">
              <div className="flex items-start gap-4">
                <GraduationCap className="w-12 h-12 text-purple-600 flex-shrink-0 mt-2" />
                <div>
                  <h3 className="text-xl font-bold mb-2">AIIMS Faculty</h3>
                  <p className="text-gray-700">Expert faculty from top AIIMS colleges with 15+ years of NEET coaching experience. Proven track record of 695/720 top scores and medical college admissions.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-lg border border-purple-200">
              <div className="flex items-start gap-4">
                <Users className="w-12 h-12 text-purple-600 flex-shrink-0 mt-2" />
                <div>
                  <h3 className="text-xl font-bold mb-2">DPS Doha Specialists</h3>
                  <p className="text-gray-700">Deep expertise with DPS Doha curriculum and students. Understand school schedule and exam patterns. Many DPS Doha parent recommendations. Specialized batches available.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-lg border border-purple-200">
              <div className="flex items-start gap-4">
                <MessageCircle className="w-12 h-12 text-purple-600 flex-shrink-0 mt-2" />
                <div>
                  <h3 className="text-xl font-bold mb-2">WhatsApp 24/7 Support</h3>
                  <p className="text-gray-700">Instant doubt clearing on WhatsApp. No international charges. Faculty responds within minutes. Video calls available for complex biology and chemistry topics.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schools Served Section */}
      <section ref={schoolsSection.ref} className={`py-20 px-4 bg-gray-50 transition-opacity duration-1000 ${schoolsSection.isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Schools We Support in Doha</h2>
          <p className="text-gray-600 text-center mb-12">Students from these schools have achieved 98% success rate in NEET</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {schools.map((school, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white p-6 rounded-lg border border-gray-200">
                <Building className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">{school}</h3>
                  <p className="text-gray-600 text-sm">CBSE-aligned NEET preparation</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-purple-50 p-8 rounded-lg border-l-4 border-purple-600">
            <p className="text-gray-700">
              <strong>From another school?</strong> We support students from all CBSE and international schools in Doha. DPS Doha students form our core audience with proven success track record.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqSection.ref} className={`py-20 px-4 transition-opacity duration-1000 ${faqSection.isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-center mb-12">Everything you need to know about NEET coaching in Doha</p>
          
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
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900 to-pink-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Join India's #1 NEET Coaching?</h2>
          <p className="text-xl text-purple-100 mb-8">Get expert NEET guidance for Doha students. Perfect timezone fit for DPS students. Free demo available now.</p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="https://wa.me/918826444334?text=Hi%20Cerebrum%21%20I%20want%20to%20join%20NEET%20coaching%20in%20Doha" target="_blank" rel="noopener noreferrer">
              <Button className="bg-green-500 hover:bg-green-600 text-white w-full md:w-auto text-lg px-8 py-3">
                <MessageCircle className="w-6 h-6 mr-2" />
                WhatsApp: 918826444334
              </Button>
            </a>
            <Button className="bg-white text-purple-900 hover:bg-purple-50 w-full md:w-auto text-lg px-8 py-3">
              Call: 8826444334
            </Button>
          </div>
          
          <p className="text-purple-200 text-sm mt-6">cerebrumbiologyacademy.com</p>
        </div>
      </section>
    </main>
  )
}
