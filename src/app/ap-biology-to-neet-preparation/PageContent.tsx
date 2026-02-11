'use client'

import { useEffect, useRef, useState } from 'react'
import { Trophy, Users, Star, BookOpen, Target, Headphones, Play, Shield, CheckCircle, ArrowRight } from 'lucide-react'
import { SmartWhatsAppCTA } from '@/components/conversion/SmartWhatsAppCTA'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'

function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      { threshold }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

const bridgeFeatures = [
  { icon: BookOpen, title: 'Curriculum Alignment', description: 'Map board concepts to NCERT and identify gaps in Indian medical curriculum.' },
  { icon: Target, title: 'NEET-Specific Strategy', description: 'Convert understanding into NEET speed and pattern mastery.' },
  { icon: Headphones, title: 'Doubt Clearing', description: '24/7 chat support + weekly live doubt clearing sessions.' },
  { icon: Play, title: 'MCQ Mastery', description: 'Master NEET-style MCQs with 4000+ curated questions.' },
  { icon: Shield, title: 'Medical Context', description: 'Focus on applied medical biology relevant to NEET.' },
  { icon: Star, title: 'Fast-Track Module', description: 'Accelerated bridging option for students starting late.' },
]

const whoIsThisFor = [
  'Board biology students targeting top medical colleges',
  'Students transitioning to Indian medical system',
  'Students with strong conceptual foundation',
  'International school students',
  'Students aiming for 650+ NEET score',
]

const methodologySteps = [
  { number: '1', title: 'Gap Analysis', description: 'Comprehensive assessment of board topics vs NEET syllabus.' },
  { number: '2', title: 'NCERT Mapping', description: 'Align board concepts with NCERT chapters.' },
  { number: '3', title: 'Intensive Coaching', description: 'Expert-led sessions on gap topics.' },
  { number: '4', title: 'Practice & Tests', description: 'Solve 4000+ MCQs with progression.' },
  { number: '5', title: 'Mentoring & Support', description: 'Weekly mentoring with NEET experts.' },
  { number: '6', title: 'Final Polish', description: 'Advanced test series and readiness sessions.' },
]

const faqData = [
  { question: 'How different is board biology from NEET?', answer: 'Board focuses on broad conceptual understanding. NEET requires Indian medical focus, faster pace, and NCERT-specific patterns. We bridge this gap effectively with targeted coaching.' },
  { question: 'Can I prepare for NEET after board?', answer: 'Yes! With 5-8 months of focused bridging, board students achieve excellent NEET results. Your conceptual foundation is a strong advantage.' },
  { question: 'What is your success rate?', answer: '98% of students achieve 650+ scores with our program. Top performers consistently score 700+. Board students with strong fundamentals excel in conceptual questions.' },
  { question: 'How long does preparation take?', answer: 'Typically 5-8 months depending on your background. We offer accelerated 3-month gap filling modules or complete 8-month programs.' },
  { question: 'Do you provide study material?', answer: 'Yes. NCERT summaries, board-NEET comparison charts, 4000+ MCQs, previous year papers, and board-specific test series.' },
  { question: 'What is the cost?', answer: 'Bridge programs start from Rs 32000. Complete programs up to Rs 75000. All include personalized plans and 24/7 doubt support. EMI options available.' },
]

const pricingTiers = [
  { name: 'Bridge Course', duration: '3 months', price: '₹35,000', features: ['Gap analysis', 'Essential topics', '3x/week classes', 'Doubt clearing'] },
  { name: 'Complete Program', duration: '5 months', price: '₹55,000', features: ['Full coverage', 'All gap topics', '5x/week classes', '4000+ MCQs', 'Weekly tests'] },
  { name: 'Premium Program', duration: '6-8 months', price: '₹75,000', features: ['Complete mastery', 'Personal mentoring', 'Daily classes', 'Advanced tests', 'Guarantee support'] },
]

export default function PageContent() {
  const heroSection = useScrollAnimation()
  const featuresSection = useScrollAnimation()
  const methodologySection = useScrollAnimation()
  const faqSection = useScrollAnimation()
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-white">
      <section ref={heroSection.ref} className={"opacity-100 transition-all duration-1000 " + (heroSection.isVisible ? "" : "opacity-0 translate-y-8")}>
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Board to NEET Bridge</h1>
                <p className="text-xl mb-8 text-blue-100">Specialized coaching for board students preparing for NEET. Expert faculty, comprehensive gap analysis, 98% conversion rate.</p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3"><Trophy className="w-6 h-6" /><span className="text-lg">98% Success Rate</span></div>
                  <div className="flex items-center gap-3"><Users className="w-6 h-6" /><span className="text-lg">500+ Students Prepared</span></div>
                  <div className="flex items-center gap-3"><Star className="w-6 h-6" /><span className="text-lg">650+ Average Score</span></div>
                </div>
                <SmartWhatsAppCTA phoneNumber="918826444334" text="Schedule Free Consultation" variant="light" size="lg" />
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-8 border border-white/20">
                <div className="space-y-6">
                  <div className="bg-white/10 rounded p-4">
                    <p className="text-sm opacity-90">Curriculum Coverage</p>
                    <p className="text-3xl font-bold mt-2">55%+</p>
                    <p className="text-xs opacity-75 mt-1">of NEET syllabus</p>
                  </div>
                  <div className="bg-white/10 rounded p-4">
                    <p className="text-sm opacity-90">Bridge Duration</p>
                    <p className="text-2xl font-bold mt-2">5-8 months</p>
                    <p className="text-xs opacity-75 mt-1">Flexible learning pace</p>
                  </div>
                  <div className="bg-white/10 rounded p-4">
                    <p className="text-sm opacity-90">Expert Faculty</p>
                    <p className="text-2xl font-bold mt-2">Dr. Shekhar C Singh</p>
                    <p className="text-xs opacity-75 mt-1">Medical education specialist</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={featuresSection.ref} className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Bridge Program Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bridgeFeatures.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div key={idx} className={"p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all " + (featuresSection.isVisible ? "opacity-100" : "opacity-0")} style={{ transitionDelay: `${idx * 100}ms` }}>
                  <Icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">Who Is This For?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {whoIsThisFor.map((item, idx) => (
              <div key={idx} className="flex gap-4"><CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" /><p className="text-lg text-gray-700">{item}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section ref={methodologySection.ref} className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Our 6-Step Methodology</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {methodologySteps.map((step, idx) => (
              <div key={idx} className={"p-6 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 " + (methodologySection.isVisible ? "opacity-100" : "opacity-0")} style={{ transitionDelay: `${idx * 100}ms` }}>
                <div className="text-3xl font-bold text-blue-600 mb-4">{step.number}</div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Pricing Plans</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, idx) => (
              <div key={idx} className={"p-8 rounded-lg border-2 transition-all " + (idx === 1 ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white")}>
                {idx === 1 && <div className="text-center mb-4"><span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span></div>}
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="text-gray-600 mb-4">{tier.duration} | {tier.price}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((f, fidx) => (
                    <li key={fidx} className="flex gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span>{f}</span></li>
                  ))}
                </ul>
                <SmartWhatsAppCTA phoneNumber="918826444334" text={"Get " + tier.name} variant={idx === 1 ? "primary" : "outline"} fullWidth />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8">
        <VideoTestimonialsSection
          title="Success Stories from Board Students"
          subtitle="See how board students achieved their NEET dreams"
          testimonials={[
            { name: "Arjun Sharma", score: "720", school: "DPS Delhi", videoId: "dQw4w9WgXcQ", quote: "Bridge program helped me transition seamlessly to NEET style." },
            { name: "Priya Gupta", score: "698", school: "Cathedral School, Mumbai", videoId: "dQw4w9WgXcQ", quote: "Structured approach made the learning efficient and effective." },
            { name: "Rohit Verma", score: "685", school: "DPS, Bangalore", videoId: "dQw4w9WgXcQ", quote: "Expert guidance elevated my preparation significantly." },
          ]}
        />
      </section>

      <section ref={faqSection.ref} className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqData.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                <button onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)} className="w-full p-6 flex justify-between items-start hover:bg-gray-50 transition-colors">
                  <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                  <ArrowRight className={"w-5 h-5 text-blue-600 transition-transform " + (expandedFaq === idx ? "rotate-90" : "")} />
                </button>
                {expandedFaq === idx && (
                  <div className="px-6 pb-6 border-t border-gray-200 text-gray-700">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Bridge Board and NEET?</h2>
          <p className="text-xl mb-8 text-blue-100">Join 98% of students who successfully transitioned from board to NEET. Schedule your free consultation today.</p>
          <SmartWhatsAppCTA phoneNumber="918826444334" text="Get Your Free Consultation" variant="light" size="lg" />
          <p className="text-blue-100 mt-6">Call: <a href="tel:+918826444334" className="underline font-semibold">+918826444334</a> | WhatsApp: 918826444334</p>
          <p className="text-blue-100 text-sm mt-4">Coached by: Dr. Shekhar C Singh and NEET Expert Faculty</p>
        </div>
      </section>
    </div>
  )
}
