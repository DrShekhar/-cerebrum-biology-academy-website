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

  const whatsappLink = 'https://wa.me/918826444334?text=I%20am%20interested%20in%20Telangana%20Intermediate%20Biology%20coaching%20with%20NEET%20preparation.'

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
            <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-6">
              <Microscope className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Telangana BIE Biology</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Telangana Intermediate Biology + NEET Coaching
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-3xl mx-auto">
              Master BIE Telangana syllabus with integrated NEET preparation. Expert coaching covering Botany Paper-I & Zoology Paper-II with EAMCET overlap strategy.
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
              <div className="text-3xl font-bold text-blue-600 mb-2">2000+</div>
              <p className="text-sm text-slate-600">Students Coached</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
              <p className="text-sm text-slate-600">Board Success Rate</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <div className="text-3xl font-bold text-purple-600 mb-2">850+</div>
              <p className="text-sm text-slate-600">NEET Selections</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <div className="text-3xl font-bold text-orange-600 mb-2">12+</div>
              <p className="text-sm text-slate-600">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Telangana BIE Syllabus Overview */}
      <section
        ref={syllabusAnimation.ref}
        className={`px-6 py-16 bg-white transition-all duration-1000 ${
          syllabusAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Telangana BIE Syllabus Overview</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-8 border border-green-200">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-green-600" />
                <h3 className="text-2xl font-bold text-slate-900">Botany Paper-I</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Plant Physiology & Metabolism</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Growth & Development</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Reproduction in Plants</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Genetics & Molecular Biology</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Evolution & Ecology</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-8 border border-blue-200">
              <div className="flex items-center gap-3 mb-6">
                <Microscope className="w-6 h-6 text-blue-600" />
                <h3 className="text-2xl font-bold text-slate-900">Zoology Paper-II</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Animal Physiology & Homeostasis</span>
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
                  <span className="text-slate-700">Inheritance & Variation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Ecology & Environmental Biology</span>
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
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Board + NEET Dual Preparation Strategy</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-8 border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Integrated Curriculum</h3>
              <p className="text-slate-600">
                BIE Telangana content aligned with NEET pattern. Complete coverage of board chapters with emphasis on NEET high-weightage topics.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">EAMCET Overlap</h3>
              <p className="text-slate-600">
                Strategic coverage of Telangana EAMCET overlapping topics. Boost your entrance exam performance while securing board excellence.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Dual Success</h3>
              <p className="text-slate-600">
                Achieve top board scores and NEET qualification simultaneously. Optimized study plan eliminating redundant topics.
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
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Key Chapters & Topics Covered</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                Botany High-Weightage Topics
              </h3>
              <ul className="space-y-3">
                {[
                  'Photosynthesis & C3, C4, CAM Pathways',
                  'Plant Hormones & Growth Regulators',
                  'Flower Structure & Reproduction',
                  'Double Fertilization & Embryogeny',
                  'Mendelian Genetics & Extensions',
                  'Linkage & Gene Mapping',
                  'DNA Replication & Protein Synthesis',
                  'Population Genetics & Evolution',
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
                Zoology High-Weightage Topics
              </h3>
              <ul className="space-y-3">
                {[
                  'Human Digestive & Circulatory System',
                  'Nervous System & Reflex Arc',
                  'Hormones & Endocrine Regulation',
                  'Reproduction & Gametogenesis',
                  'Embryonic Development & Fetal Membranes',
                  'Genetics & Hereditary Patterns',
                  'Variation & Evolution',
                  'Ecology & Population Dynamics',
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
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Why Choose Cerebrum for Telangana Intermediate?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 border border-blue-200">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">BIE Syllabus Experts</h3>
                  <p className="text-slate-700">
                    Specialized coaching for Telangana BIE curriculum. Our instructors deeply understand board exam patterns, weightage, and marking schemes.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-8 border border-green-200">
              <div className="flex items-start gap-4">
                <Trophy className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Proven Track Record</h3>
                  <p className="text-slate-700">
                    2000+ students coached with 95% board success rate. 850+ NEET selections from Telangana region in last 5 years.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-8 border border-purple-200">
              <div className="flex items-start gap-4">
                <Target className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">EAMCET + NEET Integration</h3>
                  <p className="text-slate-700">
                    Strategic approach covering Telangana EAMCET overlaps with NEET requirements. Maximize your entrance exam performance.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-8 border border-orange-200">
              <div className="flex items-start gap-4">
                <Users className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Personalized Guidance</h3>
                  <p className="text-slate-700">
                    One-on-one doubt clarification and personalized study plans. Track your progress with regular assessments and feedback.
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
                q: 'How is Cerebrum coaching different for Telangana BIE board compared to NCERT?',
                a: 'Our curriculum is specifically designed for BIE Telangana. We follow the exact BIE syllabus structure with emphasis on board exam patterns. While NEET follows NCERT, we bridge the gap by teaching BIE content in a way that aligns with NEET requirements, ensuring you excel in both.',
              },
              {
                q: 'Does Cerebrum cover EAMCET topics for Telangana students?',
                a: 'Yes! We have identified overlaps between BIE, NEET, and Telangana EAMCET syllabi. Our integrated approach ensures you prepare for all three exams simultaneously without redundant studying. This is especially valuable for Telangana students.',
              },
              {
                q: 'What is the duration of the Telangana Intermediate Biology coaching program?',
                a: 'Our program spans 2 years covering Intermediate I & II. Each year has structured modules covering all BIE chapters with regular assessments, board exam preparation phases, and mock tests aligned with actual board exam patterns.',
              },
              {
                q: 'Are there online classes available for Telangana Intermediate Biology?',
                a: 'Yes, we offer flexible online coaching with live interactive sessions, recorded lectures, and doubt clarification. Choose between live batch classes or self-paced learning with personal guidance from our expert instructors.',
              },
              {
                q: 'How does Cerebrum ensure I score well in board exams while preparing for NEET?',
                a: 'We have a dual-focused approach: Phase 1 (First year) builds strong fundamentals covering board syllabus. Phase 2 (Second year) deepens conceptual knowledge for NEET while finalizing board exam preparation with mock tests and answer writing practice.',
              },
            ].map((faq, idx) => (
              <details key={idx} className="group bg-white rounded-lg border border-slate-200 p-6 cursor-pointer hover:border-blue-300 transition-colors">
                <summary className="flex items-start justify-between font-semibold text-slate-900 group-open:text-blue-600">
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
      <section className="px-6 py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Master Telangana Intermediate Biology + NEET?</h2>
          <p className="text-lg text-blue-100 mb-8">
            Join 2000+ successful students who achieved both board excellence and NEET success with Cerebrum.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href={whatsappLink}
              target="_blank"
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp: 918826444334
            </Button>
            <Button
              href="tel:8826444334"
              className="bg-blue-500 text-white hover:bg-blue-400 font-semibold flex items-center justify-center gap-2"
            >
              <Trophy className="w-5 h-5" />
              Call: 8826444334
            </Button>
          </div>
          <p className="text-blue-100 mt-6 text-sm">
            Website: cerebrumbiologyacademy.com
          </p>
        </div>
      </section>
    </div>
  )
}
