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

  const whatsappLink = 'https://wa.me/918826444334?text=I%20am%20interested%20in%20Maharashtra%20HSC%20Biology%20coaching%20with%20NEET%20and%20MHT-CET%20preparation.'

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
            <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full mb-6">
              <Microscope className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-red-600">Maharashtra HSC Biology</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Maharashtra HSC Biology + NEET + MHT-CET Coaching
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-3xl mx-auto">
              Complete Maharashtra State Board (Std XII) Biology coaching with integrated NEET and MHT-CET preparation. Master chapter-wise weightage and crack all three exams simultaneously.
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
              <div className="text-3xl font-bold text-red-600 mb-2">2200+</div>
              <p className="text-sm text-slate-600">Maharashtra Students</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <div className="text-3xl font-bold text-green-600 mb-2">97%</div>
              <p className="text-sm text-slate-600">Board Success Rate</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <div className="text-3xl font-bold text-purple-600 mb-2">890+</div>
              <p className="text-sm text-slate-600">NEET + MHT Qualifiers</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">11+</div>
              <p className="text-sm text-slate-600">Years Maharashtra Focus</p>
            </div>
          </div>
        </div>
      </section>

      {/* Maharashtra HSC Syllabus Overview */}
      <section
        ref={syllabusAnimation.ref}
        className={`px-6 py-16 bg-white transition-all duration-1000 ${
          syllabusAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Maharashtra HSC Biology Syllabus (Std XII)</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-8 border border-green-200">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-green-600" />
                <h3 className="text-2xl font-bold text-slate-900">Botany Section</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Plant Structure & Physiology</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Photosynthesis & Growth</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Reproduction in Plants</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Genetics & Mutation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Ecology & Biotechnology</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-8 border border-blue-200">
              <div className="flex items-center gap-3 mb-6">
                <Microscope className="w-6 h-6 text-blue-600" />
                <h3 className="text-2xl font-bold text-slate-900">Zoology Section</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Animal Structure & Physiology</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Human Systems & Homeostasis</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Reproduction & Development</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Genetics & Inheritance</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Evolution & Ecology</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Board + NEET + MHT-CET Dual Prep */}
      <section
        ref={dualPrepAnimation.ref}
        className={`px-6 py-16 transition-all duration-1000 ${
          dualPrepAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Triple Exam Strategy: Board + NEET + MHT-CET</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-8 border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Board Excellence</h3>
              <p className="text-slate-600">
                Master Maharashtra HSC curriculum with chapter-wise weightage analysis. Achieve 90+ board scores with focused preparation tailored to board exam patterns.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">MHT-CET Overlap</h3>
              <p className="text-slate-600">
                Strategic mapping of board chapters with MHT-CET high-weightage topics. Maximize entrance exam performance while fulfilling board requirements.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">NEET Readiness</h3>
              <p className="text-slate-600">
                Comprehensive NEET preparation integrated with board curriculum. Complete coverage of high-frequency NEET topics with exhaustive practice.
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
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Chapter-Wise Weightage & Key Topics</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                Botany - High Weightage Chapters
              </h3>
              <ul className="space-y-3">
                {[
                  'Photosynthesis (15% board + NEET)',
                  'Respiration & Fermentation (12% weight)',
                  'Reproduction in Plants (15% weight)',
                  'Genetics & Heredity (20% weight)',
                  'Plant Hormones & Stress (10% weight)',
                  'Molecular Biology & DNA (12% weight)',
                  'Ecology & Biodiversity (10% weight)',
                  'Biotechnology & Tissue Culture (6% weight)',
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
                Zoology - High Weightage Chapters
              </h3>
              <ul className="space-y-3">
                {[
                  'Digestion & Nutrition (12% weight)',
                  'Respiration & Gas Exchange (12% weight)',
                  'Circulation & Lymphatic System (10% weight)',
                  'Reproduction & Gametogenesis (18% weight)',
                  'Nervous System & Reflexes (15% weight)',
                  'Endocrine System (10% weight)',
                  'Genetics & Human Genetics (15% weight)',
                  'Evolution & Ecology (8% weight)',
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
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Why Choose Cerebrum for Maharashtra HSC?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-8 border border-red-200">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Maharashtra Experts</h3>
                  <p className="text-slate-700">
                    11+ years specialized coaching for Maharashtra HSC. Deep expertise in chapter-wise weightage, board exam patterns, and MHT-CET overlap strategy.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-8 border border-green-200">
              <div className="flex items-start gap-4">
                <Trophy className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Triple Success Rate</h3>
                  <p className="text-slate-700">
                    2200+ students coached with 97% board success. 890+ simultaneous NEET + MHT-CET qualifiers in last 5 years.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-8 border border-purple-200">
              <div className="flex items-start gap-4">
                <Target className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Integrated Triple Prep</h3>
                  <p className="text-slate-700">
                    Single study plan for board + NEET + MHT-CET. No redundancy, maximum efficiency. Achieve excellence in all three exams simultaneously.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 border border-blue-200">
              <div className="flex items-start gap-4">
                <Users className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Personalized Guidance</h3>
                  <p className="text-slate-700">
                    One-on-one mentoring with doubt clarification. Regular mock tests, answer evaluation, and personalized improvement strategies based on performance.
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
                q: 'How does Cerebrum manage preparation for three exams (Board + NEET + MHT-CET) simultaneously?',
                a: 'We use an integrated curriculum approach where one study plan addresses all three exams. Maharashtra board, NEET, and MHT-CET topics significantly overlap. We identify these overlaps and teach content that fulfills all three exam requirements simultaneously, eliminating redundancy.',
              },
              {
                q: 'What is the chapter-wise weightage analysis for Maharashtra HSC?',
                a: 'We provide detailed weightage analysis for each chapter in both Botany and Zoology based on historical board exam trends. High-weightage chapters receive 2-3 times more attention than low-weightage chapters, ensuring strategic preparation.',
              },
              {
                q: 'How is MHT-CET overlap covered in our curriculum?',
                a: 'We have mapped all Maharashtra HSC chapters with MHT-CET high-weightage topics. Topics appearing in both exams are taught with MHT-CET level depth, ensuring you are well-prepared for the entrance exam while securing board requirements.',
              },
              {
                q: 'What is the success rate of Cerebrum students in Maharashtra board exams?',
                a: 'Our success rate is 97% with students averaging 90+ scores in board exams. This is achieved through rigorous preparation, regular assessments aligned with board patterns, and personalized guidance.',
              },
              {
                q: 'Can I focus primarily on NEET or MHT-CET while maintaining board standards?',
                a: 'Yes! Our curriculum is flexible. While all three exams are covered, we can adjust the focus based on your priority. However, our integrated approach ensures board success is never compromised while focusing on entrance exams.',
              },
            ].map((faq, idx) => (
              <details key={idx} className="group bg-white rounded-lg border border-slate-200 p-6 cursor-pointer hover:border-red-300 transition-colors">
                <summary className="flex items-start justify-between font-semibold text-slate-900 group-open:text-red-600">
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
      <section className="px-6 py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Master Maharashtra HSC + NEET + MHT-CET</h2>
          <p className="text-lg text-red-100 mb-8">
            Join 2200+ Maharashtra students who achieved board excellence and simultaneous NEET + MHT-CET success with Cerebrum.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href={whatsappLink}
              target="_blank"
              className="bg-white text-red-600 hover:bg-red-50 font-semibold flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp: 918826444334
            </Button>
            <Button
              href="tel:8826444334"
              className="bg-red-500 text-white hover:bg-red-400 font-semibold flex items-center justify-center gap-2"
            >
              <Trophy className="w-5 h-5" />
              Call: 8826444334
            </Button>
          </div>
          <p className="text-red-100 mt-6 text-sm">
            Website: cerebrumbiologyacademy.com
          </p>
        </div>
      </section>
    </div>
  )
}
