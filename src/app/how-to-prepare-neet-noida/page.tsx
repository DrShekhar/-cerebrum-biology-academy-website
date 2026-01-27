import { Metadata } from 'next'
import Link from 'next/link'
import {
  BookOpen,
  GraduationCap,
  Target,
  Clock,
  CheckCircle,
  Phone,
  ArrowRight,
  Star,
  Users,
  Award,
  Brain,
  FileText,
  Calendar,
} from 'lucide-react'
import {
  NoidaPageSchemas,
  NoidaHowToSchema,
  DEFAULT_NEET_HOWTO_STEPS,
  NOIDA_COMPREHENSIVE_FAQS,
} from '@/components/seo/NoidaSchemas'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

export const metadata: Metadata = {
  title: 'How to Prepare for NEET in Noida | Step-by-Step Guide 2026 | Cerebrum',
  description:
    'Complete guide on how to prepare for NEET from Noida. 5-step strategy by AIIMS faculty Dr. Shekhar Singh. Score 650+ with our proven methodology. Free demo class available.',
  keywords: [
    'how to prepare for neet in noida',
    'neet preparation strategy noida',
    'neet study plan noida',
    'neet tips noida',
    'how to crack neet from noida',
    'neet 2026 preparation noida',
    'best way to prepare for neet noida',
    'neet biology preparation noida',
    'neet coaching tips noida',
    'how to score 650 in neet noida',
  ],
  openGraph: {
    title: 'How to Prepare for NEET in Noida | Complete Guide',
    description:
      'Step-by-step NEET preparation guide for Noida students by AIIMS faculty. Proven strategy to score 650+.',
    url: 'https://cerebrumbiologyacademy.com/how-to-prepare-neet-noida',
    type: 'article',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/how-to-prepare-neet-noida',
  },
}

const preparationSteps = [
  {
    step: 1,
    title: 'Master NCERT Biology Completely',
    duration: '3-4 months',
    icon: BookOpen,
    description:
      '60% of NEET Biology questions come directly from NCERT. This is your foundation.',
    tasks: [
      'Read NCERT Class 11 & 12 Biology cover-to-cover (3 times minimum)',
      'Highlight key diagrams, flowcharts, and definitions',
      'Make chapter-wise notes in your own words',
      'Memorize all NCERT diagrams - they appear directly in NEET',
      'Solve NCERT exemplar problems for each chapter',
    ],
    tip: 'Pro Tip: At Cerebrum, we provide NCERT-aligned notes that highlight exactly what NEET asks.',
  },
  {
    step: 2,
    title: 'Join Expert NEET Coaching',
    duration: '12 months',
    icon: GraduationCap,
    description:
      'Self-study is good, but expert guidance accelerates your preparation by 2x.',
    tasks: [
      'Choose coaching with small batches (10-40 students max)',
      'Verify faculty credentials - AIIMS/top medical college background',
      'Check success rate and recent selections',
      'Ensure doubt-solving support is available daily',
      'Look for mock test series with detailed analysis',
    ],
    tip: 'Cerebrum offers AIIMS faculty (Dr. Shekhar Singh), 98% success rate, and batches of just 10-40 students.',
  },
  {
    step: 3,
    title: 'Practice 100+ MCQs Daily',
    duration: 'Daily habit',
    icon: Target,
    description:
      'NEET is an MCQ exam. More practice = more accuracy = higher score.',
    tasks: [
      'Solve 50 MCQs from the topic you studied that day',
      'Solve 30 MCQs from previous topics (revision)',
      'Solve 20 previous year NEET questions',
      'Analyze wrong answers - understand WHY you got it wrong',
      'Maintain an error log for common mistakes',
    ],
    tip: 'Our 10,000+ MCQ bank is categorized by difficulty. Start with easy, graduate to NEET-level.',
  },
  {
    step: 4,
    title: 'Take Weekly Full-Length Mock Tests',
    duration: 'Every Sunday',
    icon: Clock,
    description:
      'Mock tests build exam temperament and time management skills.',
    tasks: [
      'Attempt one full NEET mock test every week',
      'Simulate real exam conditions (3 hours, no breaks)',
      'Analyze results within 24 hours',
      'Focus on accuracy first, then speed',
      'Target: 340+ in Biology section by December',
    ],
    tip: 'Cerebrum students get 50+ mock tests with AI-powered analysis showing weak areas.',
  },
  {
    step: 5,
    title: 'Strategic Revision in Final 3 Months',
    duration: 'Feb-April',
    icon: Brain,
    description: 'Last 3 months are crucial. Focus on revision and test-taking.',
    tasks: [
      'Complete 3 full syllabus revisions (one per month)',
      'Solve 10 years of previous NEET papers',
      'Focus on high-weightage chapters: Human Physiology, Genetics, Ecology',
      'Revise diagrams and flowcharts daily',
      'Maintain health: 7 hours sleep, light exercise, proper nutrition',
    ],
    tip: 'Our crash course in Feb-April focuses on 100 most-repeated NEET questions.',
  },
]

const monthlyPlan = [
  { month: 'April-May', focus: 'Class 11 Foundation - Cell Biology, Biomolecules', hours: '4-5 hrs/day' },
  { month: 'June-July', focus: 'Plant Physiology, Human Physiology basics', hours: '5-6 hrs/day' },
  { month: 'Aug-Sept', focus: 'Class 12 - Genetics, Evolution, Biotechnology', hours: '6 hrs/day' },
  { month: 'Oct-Nov', focus: 'Ecology, Human Health, Complete Class 12', hours: '6-7 hrs/day' },
  { month: 'Dec-Jan', focus: 'Revision Round 1 + Mock Tests', hours: '8 hrs/day' },
  { month: 'Feb-March', focus: 'Revision Round 2 + Previous Years', hours: '8-10 hrs/day' },
  { month: 'April', focus: 'Final Revision + Light Practice', hours: '6 hrs/day' },
]

const faqs = [
  ...NOIDA_COMPREHENSIVE_FAQS.voice,
  {
    question: 'How many hours should I study for NEET daily?',
    answer:
      'For NEET preparation from Noida: Class 11 students: 4-5 hours/day. Class 12 students: 6-8 hours/day. Droppers: 8-10 hours/day. Quality matters more than quantity - focused study with breaks is better than marathon sessions.',
  },
  {
    question: 'Can I crack NEET without coaching from Noida?',
    answer:
      'While self-study is possible, coaching significantly improves chances. 95% of NEET toppers had coaching. Coaching provides: structured syllabus, doubt solving, mock tests, and motivation. Online coaching from Noida offers same benefits at lower cost.',
  },
  {
    question: 'What is the best time to start NEET preparation?',
    answer:
      'Ideal: Start in Class 11 (2 years preparation). Good: Start in Class 12 (1 year intensive). Possible: Start as dropper (focused 1 year). The earlier you start, the better. But consistent effort matters most.',
  },
]

export default function HowToPrepareNEETNoida() {
  return (
    <>
      <NoidaPageSchemas
        area="Noida"
        pageName="How to Prepare for NEET in Noida"
        pageDescription="Complete step-by-step guide on how to prepare for NEET from Noida by AIIMS faculty Dr. Shekhar Singh."
        pageUrl="https://cerebrumbiologyacademy.com/how-to-prepare-neet-noida"
        breadcrumbs={[
          { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
          { name: 'Noida', url: 'https://cerebrumbiologyacademy.com/neet-coaching-noida' },
          {
            name: 'How to Prepare',
            url: 'https://cerebrumbiologyacademy.com/how-to-prepare-neet-noida',
          },
        ]}
        includeHowTo={true}
        howToSteps={DEFAULT_NEET_HOWTO_STEPS}
        shortAnswer="To prepare for NEET in Noida: 1) Master NCERT Biology completely, 2) Join expert coaching like Cerebrum with AIIMS faculty, 3) Practice 100+ MCQs daily, 4) Take weekly mock tests, 5) Strategic revision in final 3 months. Expected cost: Rs 48,000-98,000/year."
        customFAQs={faqs}
      />
      <NoidaHowToSchema
        title="How to Prepare for NEET in Noida"
        description="Complete step-by-step guide to crack NEET from Noida with Cerebrum Biology Academy's proven 5-step methodology. Learn from AIIMS faculty Dr. Shekhar Singh."
        steps={DEFAULT_NEET_HOWTO_STEPS}
        totalTime="P12M"
        estimatedCost="48000"
      />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 text-yellow-400 mb-4">
              <Star className="h-5 w-5 fill-current" />
              <span className="text-sm font-medium">By AIIMS Faculty Dr. Shekhar Singh</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6" data-speakable="true">
              How to Prepare for NEET in Noida
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl hero-description" data-speakable="true">
              Complete 5-step guide to crack NEET from Noida. This proven strategy has helped 500+
              students score 650+ in NEET. Follow this roadmap for guaranteed success.
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-400" />
                <span>12 Month Plan</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-400" />
                <span>98% Success Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-400" />
                <span>1,200+ Noida Students</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Answer for Voice Search */}
        <section className="bg-green-50 border-l-4 border-green-500 py-6 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-bold text-lg text-green-800 mb-2">Quick Answer</h2>
            <p className="text-gray-700 speakable-content" data-speakable="true">
              <strong>To prepare for NEET in Noida:</strong> 1) Master NCERT Biology (60% questions
              from NCERT), 2) Join Cerebrum coaching with AIIMS faculty, 3) Practice 100+ MCQs
              daily, 4) Take weekly mock tests, 5) Strategic revision in final 3 months. Cost: Rs
              48,000-98,000/year. Success rate: 98%.
            </p>
          </div>
        </section>

        {/* 5-Step Guide */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              5-Step NEET Preparation Strategy
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Follow this exact roadmap used by 500+ Cerebrum students who scored 650+ in NEET
            </p>

            <div className="space-y-8">
              {preparationSteps.map((step) => {
                const Icon = step.icon
                return (
                  <div
                    key={step.step}
                    className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                  >
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-white/20 rounded-full p-3">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <span className="text-sm text-blue-100">Step {step.step}</span>
                          <h3 className="text-xl font-bold">{step.title}</h3>
                        </div>
                      </div>
                      <div className="bg-white/20 rounded-lg px-3 py-1 text-sm">
                        {step.duration}
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-700 mb-4 faq-answer">{step.description}</p>
                      <ul className="space-y-2 mb-4">
                        {step.tasks.map((task, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{task}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-yellow-800 text-sm">
                          <strong>💡 {step.tip}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Monthly Study Plan */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              Month-by-Month NEET Study Plan
            </h2>
            <p className="text-gray-600 text-center mb-12">
              12-month preparation schedule for Noida students
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {monthlyPlan.map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span className="font-bold text-gray-800">{item.month}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{item.focus}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{item.hours}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold key-stat" data-speakable="true">98%</div>
                <div className="text-blue-100">Success Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold key-stat">500+</div>
                <div className="text-blue-100">AIIMS Selections</div>
              </div>
              <div>
                <div className="text-4xl font-bold key-stat">1,200+</div>
                <div className="text-blue-100">Noida Students</div>
              </div>
              <div>
                <div className="text-4xl font-bold key-stat">650+</div>
                <div className="text-blue-100">Avg NEET Score</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
                  <h3 className="font-bold text-lg text-gray-800 mb-2 faq-question">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 faq-answer" data-speakable="true">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your NEET Journey?</h2>
            <p className="text-gray-300 mb-8">
              Join 1,200+ Noida students preparing with AIIMS faculty. Book your FREE demo class
              today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/${CONTACT_INFO.phone.whatsapp}?text=Hi, I want to know about NEET preparation from Noida`}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
              >
                <Phone className="h-5 w-5" />
                WhatsApp Us
              </a>
              <Link
                href="/demo-booking"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
              >
                Book Free Demo
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <p className="mt-6 text-gray-400 text-sm contact-info" data-speakable="true">
              Call: {CONTACT_INFO.phone.display.primary} | Available 7 AM - 9 PM
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
