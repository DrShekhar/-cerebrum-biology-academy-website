'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

// Lightweight scroll animation hook (replaces framer-motion)
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

interface FAQ {
  question: string
  answer: string
}

const homepageFAQs: FAQ[] = [
  // About Cerebrum & Success Rate (5 questions)
  {
    question: 'What is the success rate of Cerebrum Biology Academy?',
    answer:
      'We have a 98% success rate with 500+ students qualifying NEET annually. Our toppers have secured ranks under 1000 AIR, with many getting into AIIMS, JIPMER, and other top medical colleges. Our star achiever Sadhna Sirin scored 695 marks in NEET 2023 with 100 percentile in Biology.',
  },
  {
    question: 'Who are the faculty members at Cerebrum Biology Academy?',
    answer:
      'Our faculty comprises AIIMS Trained and top medical college graduates with 15+ years of NEET coaching experience. Led by Dr. Shekhar C Singh (AIIMS New Delhi Alumnus), our team has collectively mentored 1,50,000+ successful NEET candidates.',
  },
  {
    question: 'How is Cerebrum different from other NEET coaching institutes?',
    answer:
      'Cerebrum specializes exclusively in NEET Biology with AIIMS-trained faculty. Our USPs include: 1) Small batch sizes (max 15 students) for personal attention, 2) 98% success rate proven over 10+ years, 3) Complete NCERT-focused approach aligned with NEET pattern, 4) 24/7 doubt support via WhatsApp, 5) Affordable fees with EMI options, and 6) Both online and offline options with same quality.',
  },
  {
    question: 'Where are Cerebrum Biology Academy centers located?',
    answer: `We have physical centers in Delhi NCR including Rohini, Gurugram, and South Delhi. We also offer pan-India online classes with the same faculty and curriculum. Contact ${CONTACT_INFO.phone.display.primary} to find the center nearest to you.`,
  },
  {
    question: 'Is Cerebrum Biology Academy affiliated with any board or university?',
    answer:
      'Cerebrum Biology Academy is an independent NEET coaching institute focused on medical entrance preparation. We are not affiliated with any university but our curriculum is fully aligned with NTA (National Testing Agency) NEET syllabus and NCERT standards.',
  },

  // Fees & Payment (5 questions)
  {
    question: 'What are the course fees for NEET coaching?',
    answer:
      'We offer three tiers - Pinnacle (small batch, personal mentoring), Ascent (balanced features), and Pursuit (affordable quality). Fees range from ₹45,000 to ₹180,000 based on course and tier. Class 9-10: ₹45,000-₹90,000, Class 11: ₹48,000-₹98,000, Class 12: ₹70,000-₹156,000. EMI options and scholarships up to 50% available.',
  },
  {
    question: 'Do you offer EMI or installment payment options?',
    answer:
      'Yes! We offer flexible EMI options starting from ₹3,750/month with 0% interest for select courses. You can pay in 3, 6, or 12 monthly installments. We also accept one-time payment with additional discount. Credit/debit cards, UPI, net banking, and cheque payments are accepted.',
  },
  {
    question: 'Are there any scholarships available?',
    answer:
      'Yes, we offer merit-based scholarships up to 50% based on your performance in our scholarship test. Additional scholarships are available for: 1) Single parent families, 2) Economically weaker sections, 3) Siblings enrolling together (10% off), 4) Early bird enrollment (additional 10% off). Contact us for scholarship test dates.',
  },
  {
    question: 'Is there a refund policy if I want to discontinue?',
    answer:
      'Yes, we offer a 15-day money-back guarantee. If you are not satisfied with the course quality within the first 15 days, we provide a full refund (minus non-refundable registration fee of ₹2,000). After 15 days, pro-rata refund is available based on the remaining course duration.',
  },
  {
    question: 'What is included in the course fee?',
    answer:
      'The course fee is all-inclusive: study materials, test series (40+ mock tests), doubt sessions, parent-teacher meetings, and access to our student portal. There are NO hidden charges for registration, admission, or study material. The only optional add-on is the Pinnacle tier which includes 1:1 mentoring.',
  },

  // Courses & Batches (5 questions)
  {
    question: 'What courses do you offer for NEET preparation?',
    answer:
      'We offer courses for all stages: 1) Foundation Course (Class 9-10) for early starters, 2) Target Course (Class 11) for building strong basics, 3) Advanced Course (Class 12) for exam-focused preparation, 4) Dropper/Repeater Course for those taking another attempt, and 5) Crash Course (3-6 months) for quick revision before NEET.',
  },
  {
    question: 'What is the batch size at Cerebrum Biology Academy?',
    answer:
      "We maintain small batches of maximum 15 students per class to ensure personalized attention for every student. This optimal batch size allows our AIIMS Trained faculty to focus on individual learning needs, provide detailed doubt clarification, and track each student's progress effectively. Unlike large coaching centers with 50-100 students per batch, our intimate class environment fosters better student-teacher interaction and improved learning outcomes.",
  },
  {
    question: 'What are the class timings and batch options available?',
    answer:
      'We offer flexible batch timings to accommodate students from different schools and boards. Morning batches run from 7:00 AM to 9:00 AM (ideal for evening school students), afternoon batches from 2:00 PM to 4:00 PM, and evening batches from 5:00 PM to 7:00 PM (perfect for morning school students). Weekend batches are available on Saturday and Sunday from 9:00 AM to 1:00 PM. Online live classes offer additional flexibility with recorded session access for revision.',
  },
  {
    question: 'When do new batches start?',
    answer:
      'New batches start every month for Class 11, 12, and Dropper courses. Foundation batches (Class 9-10) typically start in April (new academic year) and October. Crash courses run based on NEET exam dates. Contact us for the next batch start date - we can also arrange for you to join an ongoing batch with catch-up support.',
  },
  {
    question: 'Can I switch between online and offline modes?',
    answer:
      'Yes! Our hybrid model allows complete flexibility. You can attend online when convenient and offline when possible. Many students use online mode on busy school days and attend offline on weekends. The study material, tests, and faculty are the same across both modes.',
  },

  // Online Classes (4 questions)
  {
    question: 'Do you offer online NEET Biology coaching?',
    answer:
      'Yes, we offer live interactive online classes with the same quality as offline classes. Our online program includes live sessions, recorded lectures, digital study materials, online tests, and 24/7 doubt support through WhatsApp and our student portal.',
  },
  {
    question: 'What technology do I need for online classes?',
    answer:
      'You need a smartphone or laptop with a stable internet connection (minimum 2 Mbps). Classes are conducted on Zoom/Google Meet. Our student portal works on any modern browser. All recorded lectures and study materials are accessible on mobile. We provide technical support if you face any issues.',
  },
  {
    question: 'Are online classes as effective as offline?',
    answer:
      'Our online classes are equally effective for disciplined students. The same AIIMS-trained faculty teaches both modes. We ensure interactivity through live Q&A, screen sharing for doubt resolution, pop quizzes, and camera-on sessions. Many online students have scored 600+ in NEET. However, if you need more supervision, we recommend the offline mode.',
  },
  {
    question: 'Can I access recorded lectures if I miss a class?',
    answer:
      'Yes, all live classes are recorded and uploaded within 2 hours. You get unlimited access to recordings throughout your course duration. The recordings remain accessible even after the course ends for revision purposes. This is included in your course fee at no extra cost.',
  },

  // Study Material & Tests (4 questions)
  {
    question: 'What study materials are provided?',
    answer:
      'We provide comprehensive NCERT-based study materials including detailed notes, chapter-wise summaries, 10,000+ practice questions, previous year papers with solutions, mind maps, mnemonics, and quick revision sheets - all included in the course fee.',
  },
  {
    question: 'Do you provide test series and mock exams?',
    answer:
      'Yes, we provide a comprehensive test series with 40+ full-length NEET mock tests, 80+ chapter-wise tests, and weekly assessments throughout the year. Each test follows the exact NEET pattern with detailed solutions and performance analysis. Our AI-powered test platform identifies weak areas and provides personalized improvement suggestions. Additionally, we conduct All India Test Series (AITS) to help students benchmark their preparation against lakhs of NEET aspirants nationwide.',
  },
  {
    question: 'Is the test series available separately without joining the full course?',
    answer:
      'Yes, we offer a standalone NEET Test Series for students who only need practice tests. It includes 40+ mock tests, chapter-wise tests, detailed analytics, and rank prediction. Price: ₹4,999 for full test series. This is ideal for students in other coaching institutes who want additional practice.',
  },
  {
    question: 'What is your NEET Biology syllabus coverage?',
    answer:
      'We cover the complete NEET Biology syllabus as per NTA guidelines, including all NCERT topics from Class 11 and 12. Botany coverage includes Diversity in Living World, Plant Physiology, Reproduction, Genetics, and Ecology. Zoology includes Human Physiology, Animal Kingdom, Evolution, Biotechnology, and Environmental Biology. Our curriculum aligns with the latest NEET pattern and includes regular updates for recent exam trends and high-weightage topics.',
  },

  // Demo & Enrollment (4 questions)
  {
    question: 'Is there a free demo class available?',
    answer: `Yes! We offer a FREE 45-minute demo class with our AIIMS Trained faculty. You can experience our teaching methodology and receive free study materials worth ₹2,000. Book your demo on our website or call ${CONTACT_INFO.phone.display.primary}.`,
  },
  {
    question: 'How do I enroll for a course?',
    answer: `Enrollment is simple: 1) Book a free demo class to experience our teaching, 2) Choose your course and tier (Pinnacle/Ascent/Pursuit), 3) Complete payment (full or EMI), 4) Get access to student portal and batch. You can enroll online or visit our center. Call ${CONTACT_INFO.phone.display.primary} for assistance.`,
  },
  {
    question: 'Can I join mid-session or do I need to wait for a new batch?',
    answer:
      'You can join mid-session! We provide recorded lectures of previous classes so you can catch up. Our faculty also offers extra doubt sessions for late joiners. However, joining at the start of a batch is recommended for the best learning experience.',
  },
  {
    question: 'What documents are required for enrollment?',
    answer:
      'For enrollment, you need: 1) Recent passport-size photograph, 2) Class 10 or 11 mark sheet (as applicable), 3) Valid ID proof (Aadhaar preferred), 4) Parent/guardian contact details. For online students, no physical documents are needed - soft copies work.',
  },

  // Support & Communication (3 questions)
  {
    question: 'How can I clear my doubts outside class hours?',
    answer:
      'We offer 24/7 doubt support through WhatsApp. Simply send your question with a photo of the problem, and our faculty responds within 2-4 hours. For complex doubts, we schedule short video calls. Additionally, weekly doubt marathon sessions are conducted where students can ask unlimited questions.',
  },
  {
    question: 'How do you keep parents informed about student progress?',
    answer:
      "We send monthly progress reports to parents via WhatsApp and email, including test scores, attendance, and faculty remarks. Parent-teacher meetings are conducted quarterly. Parents also get access to our portal to track their child's test performance and attendance in real-time.",
  },
  {
    question: 'What if my child is not performing well in the course?',
    answer:
      'If a student is struggling, we: 1) Identify weak areas through test analysis, 2) Provide additional doubt sessions, 3) Assign a peer mentor from toppers, 4) Schedule parent-teacher meeting to create an improvement plan, 5) Offer supplementary practice material. Our goal is to ensure every student succeeds, and we take extra efforts for struggling students.',
  },
]

export function HomeFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // Scroll animation hooks
  const headerAnim = useScrollAnimation()
  const ctaAnim = useScrollAnimation()

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <FAQSchema questions={homepageFAQs} pageUrl="https://cerebrumbiologyacademy.com" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={headerAnim.ref}
          className={`text-center mb-12 transition-all duration-600 ${
            headerAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <div className="inline-flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4 mr-2" />
            FAQs
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get answers to the most common questions about our NEET Biology coaching programs
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {homepageFAQs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                  <div
                    className={`flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                  >
                    <ChevronDown className="w-5 h-5 text-blue-500" />
                  </div>
                </button>

                {/* CSS-only accordion animation using grid trick */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* View All FAQs Link */}
        <div
          ref={ctaAnim.ref}
          className={`text-center mt-10 transition-all duration-600 delay-500 ${
            ctaAnim.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors shadow-lg hover:shadow-xl"
          >
            View All FAQs
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-3 text-sm text-gray-500">Browse 50+ questions across 8 categories</p>
        </div>
      </div>
    </section>
  )
}
