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

  const whatsappLink = 'https://wa.me/918826444334?text=I%20am%20interested%20in%20Gujarat%20HSC%20Biology%20coaching%20with%20NEET%20and%20GUJCET%20preparation.'

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
            <div className="inline-flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full mb-6">
              <Microscope className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-600">Gujarat HSC Biology</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Gujarat HSC Biology + NEET + GUJCET Coaching
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-3xl mx-auto">
              Complete GSEB Gujarat HSC Biology coaching with NEET and GUJCET integration. Gujarati and English medium support available. Master state board curriculum with entrance exam strategy.
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
              <div className="text-3xl font-bold text-yellow-600 mb-2">1900+</div>
              <p className="text-sm text-slate-600">Gujarat Students</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <div className="text-3xl font-bold text-green-600 mb-2">93%</div>
              <p className="text-sm text-slate-600">Board Success Rate</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <div className="text-3xl font-bold text-purple-600 mb-2">650+</div>
              <p className="text-sm text-slate-600">NEET + GUJCET Qualifiers</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
              <p className="text-sm text-slate-600">Years Gujarat Focus</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gujarat HSC Syllabus Overview */}
      <section
        ref={syllabusAnimation.ref}
        className={`px-6 py-16 bg-white transition-all duration-1000 ${
          syllabusAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Gujarat HSC Biology Syllabus (GSEB)</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-8 border border-green-200">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-green-600" />
                <h3 className="text-2xl font-bold text-slate-900">Botany Section</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Cell Biology & Organization</span>
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
                <h3 className="text-2xl font-bold text-slate-900">Zoology Section</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Animal Physiology & Systems</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Digestion & Circulation</span>
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

      {/* Board + NEET + GUJCET Dual Prep */}
      <section
        ref={dualPrepAnimation.ref}
        className={`px-6 py-16 transition-all duration-1000 ${
          dualPrepAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Triple Exam Preparation: Board + NEET + GUJCET</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-8 border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">GSEB Board Focus</h3>
              <p className="text-slate-600">
                Expert GSEB curriculum coverage with board-specific emphasis. Understand exam patterns, chapter weightage, and marking schemes for guaranteed board success.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">GUJCET Overlap</h3>
              <p className="text-slate-600">
                GSEB syllabus strategically mapped with GUJCET high-weightage topics. Simultaneous preparation for Gujarat state engineering entrance exam with board curriculum.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">NEET Integration</h3>
              <p className="text-slate-600">
                Complete NEET preparation integrated with board curriculum. Exhaustive coverage of high-frequency NEET topics within GSEB syllabus framework.
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
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Key Chapters & Topics (GSEB HSC)</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                Botany High-Weightage Topics
              </h3>
              <ul className="space-y-3">
                {[
                  'Cell Structure & Organization',
                  'Cell Division & Reproduction',
                  'Photosynthesis & Respiration',
                  'Plant Growth & Development',
                  'Plant Hormones & Responses',
                  'Reproduction in Plants',
                  'Genetics & Heredity',
                  'Ecology & Population',
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
                  'Animal Tissue Organization',
                  'Digestion & Absorption',
                  'Respiration & Gas Exchange',
                  'Circulation & Lymphatic System',
                  'Nervous System & Reflex',
                  'Reproduction & Development',
                  'Genetics & Inheritance',
                  'Evolution & Ecology',
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
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Why Choose Cerebrum for Gujarat HSC Biology?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-8 border border-yellow-200">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">GSEB Experts</h3>
                  <p className="text-slate-700">
                    15+ years specialization in GSEB curriculum. Deep expertise in board exam patterns, chapter-wise weightage, and Gujarati education system.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-8 border border-green-200">
              <div className="flex items-start gap-4">
                <Trophy className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Proven Success Rate</h3>
                  <p className="text-slate-700">
                    1900+ Gujarat students coached with 93% board success. 650+ simultaneous NEET + GUJCET qualifiers in last 5 years.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-8 border border-purple-200">
              <div className="flex items-start gap-4">
                <Target className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">GUJCET Alignment</h3>
                  <p className="text-slate-700">
                    GSEB curriculum strategically mapped with GUJCET topics. Maximize your engineering entrance exam performance while securing board excellence.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 border border-blue-200">
              <div className="flex items-start gap-4">
                <Users className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Bilingual Support</h3>
                  <p className="text-slate-700">
                    Gujarati and English medium coaching available. Master biology concepts in your preferred language for comprehensive understanding and retention.
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
                q: 'How does GSEB curriculum differ from NCERT, and how does it affect NEET preparation?',
                a: 'GSEB has some variations from NCERT in chapter organization and emphasis. Our coaching covers GSEB board requirements thoroughly while ensuring complete NEET alignment. We teach all board chapters in-depth with special attention to NEET high-frequency topics.',
              },
              {
                q: 'Is Gujarati medium coaching available for HSC Biology?',
                a: 'Yes! We offer comprehensive Gujarati and English medium coaching for Gujarat HSC Biology. Choose the medium you are comfortable with for better conceptual clarity and faster learning.',
              },
              {
                q: 'What is the GUJCET overlap with GSEB curriculum?',
                a: 'GUJCET and GSEB have significant overlap in biology topics. Our coaching strategically maps GSEB chapters with GUJCET high-weightage topics, enabling simultaneous preparation for both board and engineering entrance exams.',
              },
              {
                q: 'What is the success rate in Gujarat HSC board exams?',
                a: 'Our success rate is 93% with average scores of 85+ out of 100. This is achieved through rigorous preparation aligned with GSEB exam patterns, regular assessments, and personalized guidance.',
              },
              {
                q: 'Can I focus on GUJCET while maintaining board standards?',
                a: 'Absolutely! Our integrated approach ensures board success while focusing on GUJCET preparation. GUJCET topics are taught at the depth required for the exam while fulfilling all board requirements.',
              },
            ].map((faq, idx) => (
              <details key={idx} className="group bg-white rounded-lg border border-slate-200 p-6 cursor-pointer hover:border-yellow-300 transition-colors">
                <summary className="flex items-start justify-between font-semibold text-slate-900 group-open:text-yellow-600">
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
      <section className="px-6 py-16 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Master Gujarat HSC Biology + NEET + GUJCET</h2>
          <p className="text-lg text-yellow-100 mb-8">
            Join 1900+ Gujarat students who achieved board excellence and competitive exam success with Cerebrum. Gujarati and English medium available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href={whatsappLink}
              target="_blank"
              className="bg-white text-yellow-600 hover:bg-yellow-50 font-semibold flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp: 918826444334
            </Button>
            <Button
              href="tel:8826444334"
              className="bg-yellow-500 text-white hover:bg-yellow-400 font-semibold flex items-center justify-center gap-2"
            >
              <Trophy className="w-5 h-5" />
              Call: 8826444334
            </Button>
          </div>
          <p className="text-yellow-100 mt-6 text-sm">
            Website: cerebrumbiologyacademy.com
          </p>
        </div>
      </section>
    </div>
  )
}
