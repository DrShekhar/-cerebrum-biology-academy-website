'use client'
import { useEffect, useRef, useState } from 'react'
import { Trophy, Users, MessageCircle, Play, Headphones, MapPin, Star, GraduationCap, Target, Building, Shield, ArrowRight, BookOpen, CheckCircle } from 'lucide-react'
import Button from '@/components/ui/Button'

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
  const stats = useScrollAnimation()
  const features = useScrollAnimation()
  const areas = useScrollAnimation()
  const faq = useScrollAnimation()

  return (
    <div className="w-full">
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8 inline-block">
            <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-full">Medical Hub - Best NEET Coaching in Mangalore</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
            Best NEET Coaching<br className="hidden sm:block" /> in <span className="text-blue-600">Mangalore</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto font-light">
            Top NEET coaching in India's medical hub. AIIMS faculty. 98% success rate. 695/720 top score. Karnataka PUC alignment.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="https://wa.me/918826444334" target="_blank" rel="noopener noreferrer">
              <Button className="w-full sm:w-auto bg-green-500 hover:bg-green-600">
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat on WhatsApp
              </Button>
            </a>
            <Button variant="outline" className="w-full sm:w-auto">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo Class
            </Button>
          </div>
          
          <div ref={stats.ref} className={`grid grid-cols-1 md:grid-cols-3 gap-8 bg-white/60 backdrop-blur-lg rounded-2xl p-8 transition-opacity duration-1000 ${stats.isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Trophy className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900">98%</h3>
              <p className="text-gray-600 mt-1">Success Rate</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Users className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900">500+</h3>
              <p className="text-gray-600 mt-1">Students Trained</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Star className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900">695/720</h3>
              <p className="text-gray-600 mt-1">Top Score Achieved</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center text-gray-900 mb-16">Why Choose Cerebrum for NEET in Mangalore?</h2>
          
          <div ref={features.ref} className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-opacity duration-1000 ${features.isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-600">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Medical College Town Advantage</h3>
                  <p className="text-gray-600">Mentors from Kasturba Medical College & AIIMS. Perfect for aspiring NEET takers in medical hub.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-green-600">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Karnataka PUC Integration</h3>
                  <p className="text-gray-600">Aligned with PUC curriculum. Board exam + NEET combined strategy for maximum scores.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-purple-600">
                    <Headphones className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Hybrid Learning Model</h3>
                  <p className="text-gray-600">Online + offline batches. Interactive doubt solving. Personalized mentoring available.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-orange-600">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Complete Study Package</h3>
                  <p className="text-gray-600">NCERT + advanced notes, 100+ chapter tests, 12 full-length mocks, career guidance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center text-gray-900 mb-4">NEET Coaching in Mangalore Areas</h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">Coaching centers across prime localities in Mangalore, Karnataka</p>
          
          <div ref={areas.ref} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-opacity duration-1000 ${areas.isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {['Bejai', 'Kadri', 'Hampankatta', 'Balmatta', 'Pandeshwar', 'Barke', 'Kottara', 'Urva'].map((area) => (
              <div key={area} className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center text-gray-900 mb-16">Frequently Asked Questions</h2>
          
          <div ref={faq.ref} className={`space-y-6 transition-opacity duration-1000 ${faq.isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {[
              {
                q: 'Do you have mentors from Kasturba Medical College?',
                a: 'Yes! Faculty network includes KMC Mangalore alumni and AIIMS doctors. Advantage of medical hub location.'
              },
              {
                q: 'How is the PUC curriculum integrated?',
                a: 'Perfect balance - board exam preparation + NEET focus. Students excel in both without choosing one over other.'
              },
              {
                q: 'Do you have center in Bejai/Hampankatta area?',
                a: 'Our center is centrally located in Hampankatta with easy accessibility. Online batches available too.'
              },
              {
                q: 'What is the unique advantage of coaching in Mangalore?',
                a: 'Medical college proximity = exposure to medicine field early. NEET mentorship + medical environment synergy.'
              },
              {
                q: 'How are mock tests conducted?',
                a: 'Monthly full-length NEET mocks with detailed analysis, percentile tracking, and personalized feedback.'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{item.q}</h3>
                    <p className="text-gray-600">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Crack NEET in Mangalore!</h2>
          <p className="text-xl text-blue-100 mb-8">Join Mangalore's premier NEET coaching. Medical hub advantage. Limited batch seats.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/918826444334" target="_blank" rel="noopener noreferrer">
              <Button className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100 font-bold">
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat Now: 918826444334
              </Button>
            </a>
            <Button className="w-full sm:w-auto bg-blue-700 text-white hover:bg-blue-800 border-2 border-white font-bold">
              Call: 8826444334
            </Button>
          </div>
          
          <p className="text-blue-100 mt-8 text-sm">Website: cerebrumbiologyacademy.com</p>
        </div>
      </section>
    </div>
  )
}
