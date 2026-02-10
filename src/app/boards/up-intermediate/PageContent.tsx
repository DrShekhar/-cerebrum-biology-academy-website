'use client'
import { useEffect, useRef, useState } from 'react'
import {
  Trophy,
  Users,
  MessageCircle,
  Star,
  GraduationCap,
  Target,
  Shield,
  ArrowRight,
  BookOpen,
  CheckCircle,
  FileText,
  Microscope,
} from 'lucide-react'
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
  const heroAnimation = useScrollAnimation()
  const syllabusAnimation = useScrollAnimation()
  const dualPrepAnimation = useScrollAnimation()
  const chaptersAnimation = useScrollAnimation()
  const featuresAnimation = useScrollAnimation()
  const faqAnimation = useScrollAnimation()

  const whatsappLink = 'https://wa.me/918826444334?text=I%20am%20interested%20in%20UP%20Board%20Intermediate%20Biology%20coaching%20with%20NEET%20preparation.'

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section
        ref={heroAnimation.ref}
        className={`px-6 py-20 md:py-28 transition-all duration-1000 ${
          heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-pink-50 px-4 py-2 rounded-full mb-6">
              <Microscope className="w-4 h-4 text-pink-600" />
              <span className="text-sm font-medium text-pink-600">UP Board Intermediate Biology</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              UP Board Intermediate Biology + NEET Coaching
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-3xl mx-auto">
              Complete UP Board Intermediate Biology coaching with NEET integration. Hindi and English medium support available. Expert guidance for large student base with NEET state quota focus.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href={whatsappLink} target="_blank" variant="primary" className="flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Start Your Journey
              </Button>
              <Button href="tel:8826444334" variant="secondary" className="flex items-center justify-center gap-2">
                <Trophy className="w-5 h-5" />
                Call: 8826444334
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <div className="text-3xl font-bold text-pink-600 mb-2">2500+</div>
              <p className="text-sm text-slate-600">UP Students Trained</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <div className="text-3xl font-bold text-green-600 mb-2">92%</div>
              <p className="text-sm text-slate-600">Board Success Rate</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <div className="text-3xl font-bold text-purple-600 mb-2">1100+</div>
              <p className="text-sm text-slate-600">NEET Qualifiers</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">13+</div>
              <p className="text-sm text-slate-600">Years UP Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* UP Board Syllabus Overview */}
      <section
        ref={syllabusAnimation.ref}
        className={`px-6 py-16 bg-white transition-all duration-1000 ${
          syllabusAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">UP Board Intermediate Biology Syllabus</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-8 border border-green-200">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-green-600" />
                <h3 className="text-2xl font-bold text-slate-900">Biology (11th - Intermediate I)</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Cell Structure & Function</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Plant Physiology & Metabolism</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Reproduction in Plants</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Animal Physiology Basics</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Ecology & Environment</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-8 border border-blue-200">
              <div className="flex items-center gap-3 mb-6">
                <Microscope className="w-6 h-6 text-blue-600" />
                <h3 className="text-2xl font-bold text-slate-900">Biology (12th - Intermediate II)</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Genetics & Heredity</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Human Reproduction & Development</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Nervous & Endocrine Systems</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Molecular Biology & Evolution</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Biotechnology Applications</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Board + NEET Dual Prep */}
      <section
        ref={dualPrepAnimation.ref}
        className={`px-6 py-16 transition-all duration-1000 ${
          dualPrepAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Board + NEET Dual Preparation</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-8 border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">NCERT Aligned</h3>
              <p className="text-slate-600">
                UP Board curriculum closely follows NCERT. Complete NCERT coverage with board-specific emphasis ensures dual preparation efficiency.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">State Quota Benefits</h3>
              <p className="text-slate-600">
                Specialized focus on NEET UP state quota preparation. Understand quota requirements and optimize your strategy for UP competitive advantage.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Bilingual Support</h3>
              <p className="text-slate-600">
                Hindi and English medium coaching available. Master biology concepts in your preferred language for better understanding and retention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Chapters & Topics */}
      <section
        ref={chaptersAnimation.ref}
        className={`px-6 py-16 bg-slate-50 transition-all duration-1000 ${
          chaptersAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Key Chapters & NEET Alignment</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                Intermediate I (Class 11th) Focus
              </h3>
              <ul className="space-y-3">
                {[
                  'Structural Organization of Plants',
                  'Cell Structure & Cell Division',
                  'Photosynthesis & Respiration',
                  'Plant Hormones & Growth',
                  'Transport in Plants',
                  'Reproduction in Plants',
                  'Introduction to Animal Body',
                  'Digestion & Absorption',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-700">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-600 mb-6 flex items-center gap-2">
                <Microscope className="w-6 h-6" />
                Intermediate II (Class 12th) Focus
              </h3>
              <ul className="space-y-3">
                {[
                  'Respiration & Energy (ATP)',
                  'Plant Growth & Hormones',
                  'Genetics & Mendelism',
                  'Molecular Biology',
                  'Reproduction & Gametogenesis',
                  'Human Reproduction System',
                  'Nervous System & Reflexes',
                  'Endocrine & Hormones',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-700">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Cerebrum */}
      <section
        ref={featuresAnimation.ref}
        className={`px-6 py-16 transition-all duration-1000 ${
          featuresAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Why Choose Cerebrum for UP Intermediate Biology?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-8 border border-pink-200">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-pink-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">UP Board Specialists</h3>
                  <p className="text-slate-700">
                    13+ years expertise in UP Board curriculum. Deep understanding of board exam patterns and NCERT-aligned content delivery.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-8 border border-green-200">
              <div className="flex items-start gap-4">
                <Trophy className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Large Student Base Success</h3>
                  <p className="text-slate-700">
                    2500+ UP students trained with 92% board success. 1100+ NEET qualifiers with special focus on UP state quota.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-8 border border-purple-200">
              <div className="flex items-start gap-4">
                <Target className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Bilingual Mastery</h3>
                  <p className="text-slate-700">
                    Hindi and English medium coaching available. Choose your learning language and master biology concepts comprehensively.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 border border-blue-200">
              <div className="flex items-start gap-4">
                <Users className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">State Quota Strategy</h3>
                  <p className="text-slate-700">
                    Specialized NEET UP state quota preparation. Understand eligibility, optimization strategies, and state-specific advantages.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        ref={faqAnimation.ref}
        className={`px-6 py-16 bg-slate-50 transition-all duration-1000 ${
          faqAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'How is UP Board Biology different from NCERT?',
                a: 'UP Board curriculum is based on NCERT with some additional topics and variations. Our coaching covers both UP board-specific content and complete NCERT, ensuring you excel in both. This close alignment makes dual preparation very efficient.',
              },
              {
                q: 'Is Hindi medium coaching available for UP Board Biology?',
                a: 'Yes! We offer comprehensive Hindi and English medium coaching for UP Board Biology. Choose the medium that suits you best for better conceptual clarity and faster learning.',
              },
              {
                q: 'What is the success rate for UP board exams at Cerebrum?',
                a: 'Our success rate is 92% with average scores of 85+ out of 100. This is achieved through rigorous preparation aligned with UP board exam patterns and regular assessments.',
              },
              {
                q: 'How does NEET UP state quota work, and how can I maximize it?',
                a: 'NEET provides state quota seats for candidates from that state. Our specialized coaching includes state quota strategy, eligibility understanding, and optimization tips to maximize your chances of securing a seat in UP institutes.',
              },
              {
                q: 'Can I prepare for both UP board and NEET with the same study plan?',
                a: 'Absolutely! UP Board closely follows NCERT, which is the basis of NEET. Our integrated approach teaches content that satisfies both board and NEET requirements simultaneously, eliminating redundancy and maximizing efficiency.',
              },
            ].map((faq, idx) => (
              <details key={idx} className="group bg-white rounded-lg border border-slate-200 p-6 cursor-pointer hover:border-pink-300 transition-colors">
                <summary className="flex items-start justify-between font-semibold text-slate-900 group-open:text-pink-600">
                  <span>{faq.q}</span>
                  <ArrowRight className="w-5 h-5 flex-shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-4 text-slate-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 bg-gradient-to-r from-pink-600 to-pink-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Master UP Board Biology + NEET Today</h2>
          <p className="text-lg text-pink-100 mb-8">
            Join 2500+ UP students who achieved board excellence and NEET success with Cerebrum. Hindi and English medium available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href={whatsappLink}
              target="_blank"
              className="bg-white text-pink-600 hover:bg-pink-50 font-semibold flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp: 918826444334
            </Button>
            <Button
              href="tel:8826444334"
              className="bg-pink-500 text-white hover:bg-pink-400 font-semibold flex items-center justify-center gap-2"
            >
              <Trophy className="w-5 h-5" />
              Call: 8826444334
            </Button>
          </div>
          <p className="text-pink-100 mt-6 text-sm">
            Website: cerebrumbiologyacademy.com
          </p>
        </div>
      </section>
    </div>
  )
}
