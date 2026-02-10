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
import Button from '@/components/ui/Button'

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

  const whatsappLink = 'https://wa.me/918826444334?text=I%20am%20interested%20in%20West%20Bengal%20HS%20Biology%20coaching%20with%20NEET%20and%20WBJEE%20preparation.'

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
            <div className="inline-flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-full mb-6">
              <Microscope className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-600">West Bengal HS Biology</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              West Bengal HS Biology + NEET + WBJEE Coaching
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-3xl mx-auto">
              Complete West Bengal Higher Secondary (WBCHSE) Biology coaching with WBJEE overlap coverage and NEET integration. Master unique WB topics with expert Kolkata-based guidance.
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
              <div className="text-3xl font-bold text-amber-600 mb-2">1600+</div>
              <p className="text-sm text-slate-600">West Bengal Students</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <div className="text-3xl font-bold text-green-600 mb-2">94%</div>
              <p className="text-sm text-slate-600">Board Success Rate</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <div className="text-3xl font-bold text-purple-600 mb-2">580+</div>
              <p className="text-sm text-slate-600">NEET + WBJEE Qualifiers</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">9+</div>
              <p className="text-sm text-slate-600">Years WB Expertise</p>
            </div>
          </div>
        </div>
      </section>

      {/* West Bengal HS Syllabus Overview */}
      <section
        ref={syllabusAnimation.ref}
        className={`px-6 py-16 bg-white transition-all duration-1000 ${
          syllabusAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">West Bengal WBCHSE HS Biology Syllabus</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-8 border border-green-200">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-green-600" />
                <h3 className="text-2xl font-bold text-slate-900">Botany</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Cell Structure & Organization</span>
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
                  <span className="text-slate-700">Genetics & Heredity</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Ecology & Biodiversity</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-8 border border-blue-200">
              <div className="flex items-center gap-3 mb-6">
                <Microscope className="w-6 h-6 text-blue-600" />
                <h3 className="text-2xl font-bold text-slate-900">Zoology</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Animal Physiology & Systems</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Human Biology & Systems</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Reproduction & Development</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Genetics & Evolution</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Ecology & Conservation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Board + NEET + WBJEE Dual Prep */}
      <section
        ref={dualPrepAnimation.ref}
        className={`px-6 py-16 transition-all duration-1000 ${
          dualPrepAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Triple Exam Integration: Board + NEET + WBJEE</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-8 border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">WBCHSE Board Mastery</h3>
              <p className="text-slate-600">
                Specialized coaching for West Bengal HS curriculum. Deep understanding of WBCHSE exam patterns, marking schemes, and WB-specific topics.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">WBJEE Alignment</h3>
              <p className="text-slate-600">
                Board curriculum mapped with WBJEE high-weightage topics. Kolkata-based competitive coaching insights for WB engineering entrance exam.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">NEET Preparation</h3>
              <p className="text-slate-600">
                Complete NEET integration with WB board curriculum. Comprehensive coverage of high-frequency NEET topics with exhaustive practice.
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
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Key Chapters & Unique WB Topics</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                Botany High-Priority Topics
              </h3>
              <ul className="space-y-3">
                {[
                  'Plant Cell Structure (WB-specific focus)',
                  'Photosynthesis & Light Reactions',
                  'Respiration & Energy Metabolism',
                  'Plant Growth & Development',
                  'Flower Structure & Pollination',
                  'Mendelian Genetics & Extensions',
                  'DNA & Protein Synthesis',
                  'Ecology & Plant Communities',
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
                Zoology High-Priority Topics
              </h3>
              <ul className="space-y-3">
                {[
                  'Animal Tissue Organization (WB-specific)',
                  'Digestive System & Absorption',
                  'Respiration & Gas Exchange',
                  'Circulation & Blood Pressure',
                  'Nervous System & Reflex',
                  'Hormones & Reproduction',
                  'Gametogenesis & Embryogeny',
                  'Human Genetics & Evolution',
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
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Why Choose Cerebrum for West Bengal HS?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-8 border border-amber-200">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">WB Board Experts</h3>
                  <p className="text-slate-700">
                    9+ years specialization in WBCHSE curriculum. Deep expertise in board exam patterns, WB-specific topics, and Kolkata competitive coaching dynamics.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-8 border border-green-200">
              <div className="flex items-start gap-4">
                <Trophy className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Proven Success</h3>
                  <p className="text-slate-700">
                    1600+ West Bengal students coached with 94% board success. 580+ simultaneous NEET + WBJEE qualifiers in last 5 years.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-8 border border-purple-200">
              <div className="flex items-start gap-4">
                <Target className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Unique WB Topics</h3>
                  <p className="text-slate-700">
                    Specialized coverage of WB-specific topics and exam patterns. Our understanding of Kolkata coaching competition ensures you stay ahead.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 border border-blue-200">
              <div className="flex items-start gap-4">
                <Users className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Personalized Mentoring</h3>
                  <p className="text-slate-700">
                    One-on-one doubt clarification and personalized guidance. Regular mock tests aligned with WBCHSE patterns and entrance exams.
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
                q: 'What makes West Bengal HS biology different from other state board curricula?',
                a: 'West Bengal HS has unique topics and emphasis areas not found in other boards. Our coaching specifically addresses WBCHSE patterns, cell structure emphasis, and ecology focus. We ensure you understand WB-specific content while maintaining NEET readiness.',
              },
              {
                q: 'How does Cerebrum help with WBJEE (West Bengal JEE) preparation?',
                a: 'We have mapped WBCHSE curriculum with WBJEE high-weightage topics. Our instructors understand the overlap between board and engineering entrance exams specific to West Bengal, ensuring you prepare for both simultaneously.',
              },
              {
                q: 'What is the success rate in West Bengal board exams?',
                a: 'Our success rate is 94% with students averaging 85+ scores. This is achieved through rigorous preparation aligned with WBCHSE patterns, regular assessments, and personalized guidance addressing unique WB topics.',
              },
              {
                q: 'Are there separate coaching tracks for NEET vs WBJEE vs Board exams?',
                a: 'No, we use an integrated approach where one curriculum addresses all requirements. Topics are taught in depth to satisfy board, WBJEE, and NEET expectations simultaneously, eliminating redundancy.',
              },
              {
                q: 'How do you account for Kolkata coaching competition in your curriculum?',
                a: 'Our instructors have extensive experience in Kolkata coaching landscape. We continuously update our methods based on competitive trends, ensuring our students have cutting-edge preparation surpassing local competition.',
              },
            ].map((faq, idx) => (
              <details key={idx} className="group bg-white rounded-lg border border-slate-200 p-6 cursor-pointer hover:border-amber-300 transition-colors">
                <summary className="flex items-start justify-between font-semibold text-slate-900 group-open:text-amber-600">
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
      <section className="px-6 py-16 bg-gradient-to-r from-amber-600 to-amber-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Master West Bengal HS Biology + NEET + WBJEE</h2>
          <p className="text-lg text-amber-100 mb-8">
            Join 1600+ West Bengal students who achieved board excellence and competitive exam success with Cerebrum.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href={whatsappLink}
              target="_blank"
              className="bg-white text-amber-600 hover:bg-amber-50 font-semibold flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp: 918826444334
            </Button>
            <Button
              href="tel:8826444334"
              className="bg-amber-500 text-white hover:bg-amber-400 font-semibold flex items-center justify-center gap-2"
            >
              <Trophy className="w-5 h-5" />
              Call: 8826444334
            </Button>
          </div>
          <p className="text-amber-100 mt-6 text-sm">
            Website: cerebrumbiologyacademy.com
          </p>
        </div>
      </section>
    </div>
  )
}
