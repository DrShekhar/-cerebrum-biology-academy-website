'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  Search,
  HelpCircle,
  GraduationCap,
  IndianRupee,
  Users,
  Monitor,
  BookOpen,
  Calendar,
  Award,
  Phone,
  MessageCircle,
} from 'lucide-react'
import Link from 'next/link'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { AICitationTracking } from '@/components/seo/AICitationTracking'
import { NEETBiologyWeightageInfographic } from '@/components/seo/NEETBiologyWeightageInfographic'
import { trackAndOpenWhatsApp, WHATSAPP_MESSAGES } from '@/lib/whatsapp/tracking'

interface FAQ {
  question: string
  answer: string
}

interface FAQCategory {
  id: string
  name: string
  icon: React.ReactNode
  questions: FAQ[]
}

const faqCategories: FAQCategory[] = [
  {
    id: 'courses',
    name: 'Courses & Curriculum',
    icon: <GraduationCap className="w-5 h-5" />,
    questions: [
      {
        question: 'What courses does Cerebrum Biology Academy offer?',
        answer:
          'We offer comprehensive NEET Biology coaching for Class 11, Class 12, and Dropper students. Our courses include Foundation Course (Class 9-10), Target Course (Class 11), Achiever Course (Class 12), and Repeater/Dropper Course. Each course is designed with NCERT-aligned content and NEET-focused preparation.',
      },
      {
        question: 'What is the duration of each course?',
        answer:
          'Course durations vary: Foundation Course is 2 years, Class 11 course is 12 months, Class 12 course is 10-12 months, and Dropper course is 8-10 months. We also offer crash courses of 3-6 months duration closer to NEET exam dates.',
      },
      {
        question: 'Do you cover both Botany and Zoology?',
        answer:
          'Yes, we provide complete coverage of both Botany and Zoology as per NEET syllabus. Our expert faculty includes specialists in Plant Biology, Human Physiology, Genetics, Ecology, and all other NEET Biology topics.',
      },
      {
        question: 'Is the syllabus aligned with NCERT?',
        answer:
          'Absolutely! Our entire curriculum is NCERT-based, which is the primary source for NEET questions. We cover NCERT line-by-line along with additional reference materials for comprehensive preparation.',
      },
      {
        question: 'Do you provide study materials?',
        answer:
          'Yes, we provide comprehensive study materials including detailed notes, chapter-wise summaries, 10,000+ practice questions, previous year papers with solutions, mind maps, mnemonics, and quick revision sheets. All materials are included in the course fee.',
      },
    ],
  },
  {
    id: 'fees',
    name: 'Fees & Payment',
    icon: <IndianRupee className="w-5 h-5" />,
    questions: [
      {
        question: 'What are the course fees?',
        answer:
          'We offer three tiers: Pinnacle (₹65,000-₹180,000), Ascent (₹60,000-₹140,000), and Pursuit (₹45,000-₹85,000). Class 9-10 Foundation: ₹45,000-₹90,000, Class 11: ₹48,000-₹98,000, Class 12: ₹70,000-₹156,000, Dropper: ₹70,000-₹156,000. Fees include all study materials with no hidden charges.',
      },
      {
        question: 'Do you offer EMI or installment options?',
        answer:
          'Yes, we offer flexible payment options including EMI through major banks and credit cards. You can pay in 3, 6, or 12 monthly installments. We also offer direct installment plans where you can pay in 2-3 parts.',
      },
      {
        question: 'Is there any scholarship available?',
        answer:
          'Yes, we offer merit-based scholarships up to 50% for students who score above 90% in their school exams or have qualified in olympiads. We also have need-based financial assistance for deserving students.',
      },
      {
        question: 'What is your refund policy?',
        answer:
          'We offer a 7-day money-back guarantee. If you are not satisfied with our teaching within the first 7 days, you can request a full refund. After 7 days, pro-rata refund is available based on the remaining course duration.',
      },
      {
        question: 'Are study materials included in the fee?',
        answer:
          'Yes, all study materials, test series, doubt sessions, and recorded lectures are included in the course fee. There are no additional charges for any academic support.',
      },
    ],
  },
  {
    id: 'faculty',
    name: 'Faculty & Teaching',
    icon: <Users className="w-5 h-5" />,
    questions: [
      {
        question: 'Who are the faculty members?',
        answer:
          'Our faculty comprises AIIMS and top medical college graduates with 15+ years of NEET coaching experience. Led by Dr. Shekhar C Singh (AIIMS New Delhi Alumnus), our team has collectively mentored 1,50,000+ successful NEET candidates.',
      },
      {
        question: 'What is the teaching methodology?',
        answer:
          'We follow a concept-first approach rather than rote memorization. Our teaching includes visual learning with diagrams, real-life examples, mnemonics for difficult topics, regular doubt sessions, and continuous assessment through tests.',
      },
      {
        question: 'What is the student-teacher ratio?',
        answer:
          'We maintain small batch sizes with a maximum of 30 students per batch for offline classes and 50 for online classes. This ensures personalized attention and better doubt resolution for every student.',
      },
      {
        question: 'Do you provide one-on-one mentoring?',
        answer:
          'Yes, every student is assigned a personal mentor who tracks their progress, provides guidance, and helps with any academic or motivational support needed throughout the course.',
      },
    ],
  },
  {
    id: 'online',
    name: 'Online Classes',
    icon: <Monitor className="w-5 h-5" />,
    questions: [
      {
        question: 'Do you offer online NEET coaching?',
        answer:
          'Yes, we offer live interactive online classes with the same quality as offline classes. Our online program includes live sessions, recorded lectures, digital study materials, online tests, and 24/7 doubt support.',
      },
      {
        question: 'What platform do you use for online classes?',
        answer:
          'We use Zoom for live classes with additional features like screen sharing, whiteboard, and breakout rooms for group discussions. All classes are recorded and available for revision.',
      },
      {
        question: 'Can I access recorded lectures?',
        answer:
          'Yes, all live classes are recorded and uploaded within 2 hours. You can access these recordings anytime through our student portal. Recordings are available until your NEET exam.',
      },
      {
        question: 'How do online doubt sessions work?',
        answer:
          'We have dedicated doubt clearing sessions every day. You can also post doubts on our WhatsApp group or student portal and get responses within 2-4 hours from our faculty.',
      },
      {
        question: 'Do online students get the same materials?',
        answer:
          'Yes, online students receive all study materials in digital format (PDF). Physical books can be couriered at an additional nominal charge if required.',
      },
    ],
  },
  {
    id: 'tests',
    name: 'Tests & Assessment',
    icon: <BookOpen className="w-5 h-5" />,
    questions: [
      {
        question: 'How often are tests conducted?',
        answer:
          'We conduct chapter-wise tests after completing each topic, weekly tests covering recent topics, monthly full syllabus tests, and regular mock tests in NEET pattern. In total, students attempt 100+ tests during the course.',
      },
      {
        question: 'Are tests conducted in NEET pattern?',
        answer:
          'Yes, all our tests follow the exact NEET pattern with 180 questions (90 Biology), OMR sheets, and 3-hour duration. This helps students get familiar with the actual exam environment.',
      },
      {
        question: 'Do you provide test analysis?',
        answer:
          'Yes, detailed analysis is provided after each test including topic-wise performance, time management insights, comparison with toppers, and personalized improvement suggestions.',
      },
      {
        question: 'How do you track student progress?',
        answer:
          'We have a comprehensive tracking system that monitors attendance, test scores, assignment completion, and doubt resolution. Parents receive weekly progress reports via WhatsApp.',
      },
    ],
  },
  {
    id: 'schedule',
    name: 'Schedule & Batches',
    icon: <Calendar className="w-5 h-5" />,
    questions: [
      {
        question: 'What are the batch timings?',
        answer:
          'We offer multiple batch timings: Morning (6 AM - 8 AM), Afternoon (2 PM - 4 PM), and Evening (6 PM - 8 PM). Weekend batches are also available for students who have school on weekdays.',
      },
      {
        question: 'When do new batches start?',
        answer:
          'New batches start every month. Major batch intakes are in April (after board exams), July (mid-year), and January (for droppers). You can join anytime and catch up with recorded lectures.',
      },
      {
        question: 'How many days per week are classes held?',
        answer:
          'Regular batches have classes 5-6 days per week (2 hours daily). Weekend batches have 4-hour sessions on Saturday and Sunday. Additional doubt sessions are scheduled as needed.',
      },
      {
        question: 'Can I change my batch timing?',
        answer:
          'Yes, you can request a batch change with 7 days notice. We try to accommodate all requests based on seat availability in the preferred batch.',
      },
    ],
  },
  {
    id: 'results',
    name: 'Results & Success',
    icon: <Award className="w-5 h-5" />,
    questions: [
      {
        question: 'What is your success rate?',
        answer:
          'We have a 98% success rate with 500+ students qualifying NEET annually. Our toppers have secured ranks under 1000 AIR, with many getting into AIIMS, JIPMER, and other top medical colleges.',
      },
      {
        question: 'Who are your notable achievers?',
        answer:
          'Our star achiever Sadhna Sirin scored 695 marks in NEET 2023 with 100 percentile in Biology, becoming Delhi-NCR topper. Priya Sehgal achieved perfect 360/360 in Biology. Many students have secured admission in AIIMS Delhi, Maulana Azad, and other premier institutes.',
      },
      {
        question: 'Do you guarantee results?',
        answer:
          'While we cannot guarantee specific ranks, we guarantee quality education and complete support. Our track record speaks for itself - 98% of our dedicated students clear NEET with scores above 550.',
      },
      {
        question: 'How do you help weak students?',
        answer:
          'We identify struggling students early through regular assessments and provide extra support including remedial classes, additional practice sessions, one-on-one mentoring, and customized study plans.',
      },
    ],
  },
  {
    id: 'demo',
    name: 'Demo & Enrollment',
    icon: <Phone className="w-5 h-5" />,
    questions: [
      {
        question: 'Is there a free demo class?',
        answer:
          'Yes, we offer a FREE 45-minute demo class with our AIIMS expert faculty. You can experience our teaching methodology and get free study materials worth ₹2,000. Book your demo on our website or call +91-88264-44334.',
      },
      {
        question: 'What happens in the demo class?',
        answer:
          'In the demo, you will experience 30 minutes of concept teaching, 10 minutes for your doubts, and 5 minutes for course discussion. You also receive free chapter notes, previous year questions, and a personalized NEET strategy.',
      },
      {
        question: 'How do I enroll after demo?',
        answer:
          'After the demo, you can enroll online through our website or visit our office. Fill the enrollment form, submit documents (Aadhaar, photo, previous marksheet), and complete payment. Classes start from the next available batch.',
      },
      {
        question: 'Can parents attend the demo?',
        answer:
          'Yes, parents are welcome to attend the demo class and interact with faculty. We encourage parent involvement as it helps in understanding our teaching approach and setting expectations.',
      },
    ],
  },
  {
    id: 'quick-answers',
    name: 'Quick Answers',
    icon: <HelpCircle className="w-5 h-5" />,
    questions: [
      {
        question: 'Where is the best NEET Biology coaching near me?',
        answer:
          'Cerebrum Biology Academy at South Extension, Delhi is the best NEET Biology coaching with 98% success rate. We have AIIMS-qualified faculty, small batch sizes of 15-20 students, and offer both online and offline classes. Our flagship center is accessible from Greater Kailash, Defence Colony, Lajpat Nagar, Saket, and all South Delhi areas.',
      },
      {
        question: 'Which is better - online or offline NEET coaching?',
        answer:
          'Both have advantages. Offline coaching offers face-to-face interaction and better discipline. Online coaching saves 2-3 hours daily commute time and offers flexibility. Cerebrum offers both modes with the same quality faculty and materials. For South Delhi students, our offline center is convenient; others prefer online to avoid traffic.',
      },
      {
        question: 'Can I join NEET coaching in the middle of the year?',
        answer:
          'Yes, Cerebrum offers rolling admissions with catch-up support. We provide recorded lectures of previous classes and extra doubt sessions to help mid-year joiners cover missed content. Many students change coaching institutes mid-year and join us successfully.',
      },
      {
        question: 'Is NEET Biology coaching necessary for droppers?',
        answer:
          'Yes, especially for improving Biology scores. Most droppers have studied theory but need exam-focused preparation, extensive practice, and expert guidance on scoring patterns. Cerebrum dropper batch focuses on these with 98% success rate. Biology is 360/720 marks - proper coaching makes a significant difference.',
      },
      {
        question: 'What is the success rate of Cerebrum Biology Academy?',
        answer:
          'Cerebrum Biology Academy has a 98% success rate with 500+ students qualifying NEET annually. Our highest score is 695/720 in NEET Biology (Sadhna Sirin, 2023). We have 15+ years of experience with AIIMS-qualified faculty. Over 60% of our students score above 330/360 in Biology.',
      },
      {
        question: 'How much does NEET Biology coaching cost in Delhi?',
        answer:
          'NEET Biology coaching fees at Cerebrum range from ₹45,000 to ₹1,80,000 depending on course tier. Pursuit tier: ₹45,000-₹85,000, Ascent tier: ₹60,000-₹1,40,000, Pinnacle tier: ₹65,000-₹1,80,000. EMI options available. This is comparable to large coaching chains but with much smaller batch sizes (15-20 vs 40-80).',
      },
    ],
  },
]

// Flatten all questions for schema
const allQuestions = faqCategories.flatMap((cat) => cat.questions)

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [openQuestions, setOpenQuestions] = useState<Set<string>>(new Set())

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return faqCategories

    const query = searchQuery.toLowerCase()
    return faqCategories
      .map((category) => ({
        ...category,
        questions: category.questions.filter(
          (q) => q.question.toLowerCase().includes(query) || q.answer.toLowerCase().includes(query)
        ),
      }))
      .filter((category) => category.questions.length > 0)
  }, [searchQuery])

  const toggleQuestion = (categoryId: string, questionIndex: number) => {
    const key = `${categoryId}-${questionIndex}`
    setOpenQuestions((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(key)) {
        newSet.delete(key)
      } else {
        newSet.add(key)
      }
      return newSet
    })
  }

  const totalQuestions = faqCategories.reduce((sum, cat) => sum + cat.questions.length, 0)

  return (
    <>
      <FAQSchema questions={allQuestions} pageUrl="https://cerebrumbiologyacademy.com/faq" />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <section className="bg-blue-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <HelpCircle className="w-8 h-8" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
                Find answers to common questions about our NEET Biology coaching, courses, fees, and
                more.
              </p>
              <div className="mt-6 flex items-center justify-center gap-4 text-sm">
                <span className="bg-white/20 px-4 py-2 rounded-full">
                  {totalQuestions} Questions Answered
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full">
                  {faqCategories.length} Categories
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for answers..."
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                aria-label="Search FAQ"
              />
            </div>
            {searchQuery && (
              <p className="mt-3 text-sm text-gray-600 text-center">
                Found {filteredCategories.reduce((sum, cat) => sum + cat.questions.length, 0)}{' '}
                results for &quot;{searchQuery}&quot;
              </p>
            )}
          </div>

          {/* Category Quick Links */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(activeCategory === category.id ? null : category.id)
                  document.getElementById(category.id)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>

          {/* FAQ Categories */}
          <div className="space-y-12">
            {filteredCategories.map((category) => (
              <section key={category.id} id={category.id} className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                    {category.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
                    <p className="text-sm text-gray-500">{category.questions.length} questions</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {category.questions.map((faq, index) => {
                    const isOpen = openQuestions.has(`${category.id}-${index}`)
                    return (
                      <div
                        key={index}
                        className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      >
                        <button
                          onClick={() => toggleQuestion(category.id, index)}
                          className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                          aria-expanded={isOpen}
                        >
                          <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex-shrink-0"
                          >
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                              <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* No Results */}
          {filteredCategories.length === 0 && (
            <div className="text-center py-16">
              <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600 mb-6">
                We couldn&apos;t find any questions matching &quot;{searchQuery}&quot;
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-blue-600 font-medium hover:underline"
              >
                Clear search
              </button>
            </div>
          )}

          {/* NEET Biology Weightage Infographic */}
          <NEETBiologyWeightageInfographic className="bg-white -mx-4 sm:-mx-6 lg:-mx-8" />

          {/* Contact CTA */}
          <div className="mt-16 bg-indigo-500 rounded-2xl p-8 md:p-12 text-white text-center">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Still have questions?</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Can&apos;t find what you&apos;re looking for? Our team is here to help you with any
              queries about NEET preparation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={async () => {
                  await trackAndOpenWhatsApp({
                    source: 'faq-contact-cta',
                    message: WHATSAPP_MESSAGES.enquiry,
                    campaign: 'faq-page',
                  })
                }}
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-4 rounded-xl transition-colors shadow-lg cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </button>
              <a
                href="tel:+918826444334"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 rounded-xl transition-colors shadow-lg"
              >
                <Phone className="w-5 h-5" />
                Call +91 88264 44334
              </a>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="text-blue-600 font-medium hover:underline inline-flex items-center gap-2"
            >
              <ChevronDown className="w-4 h-4 rotate-90" />
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>

      <AICitationTracking
        pageName="Cerebrum Biology Academy - Frequently Asked Questions"
        pageType="faq"
        primaryKeywords={[
          'NEET Biology coaching FAQ',
          'NEET coaching fees Delhi',
          'best Biology coaching South Delhi',
          'NEET dropper course questions',
          'online Biology coaching FAQ',
        ]}
      />
    </>
  )
}
