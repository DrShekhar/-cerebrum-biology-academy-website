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
  {
    question: 'What is the success rate of Cerebrum Biology Academy?',
    answer:
      'We have a 98% success rate with 500+ students qualifying NEET annually. Our toppers have secured ranks under 1000 AIR, with many getting into AIIMS, JIPMER, and other top medical colleges. Our star achiever Sadhna Sirin scored 695 marks in NEET 2023 with 100 percentile in Biology.',
  },
  {
    question: 'What are the course fees for NEET coaching?',
    answer:
      'We offer three tiers - Pinnacle (small batch, personal mentoring), Ascent (balanced features), and Pursuit (affordable quality). Fees range from ₹45,000 to ₹180,000 based on course and tier. Class 9-10: ₹45,000-₹90,000, Class 11: ₹48,000-₹98,000, Class 12: ₹70,000-₹156,000. EMI options and scholarships up to 50% available.',
  },
  {
    question: 'Do you offer online NEET Biology coaching?',
    answer:
      'Yes, we offer live interactive online classes with the same quality as offline classes. Our online program includes live sessions, recorded lectures, digital study materials, online tests, and 24/7 doubt support through WhatsApp and our student portal.',
  },
  {
    question: 'Who are the faculty members at Cerebrum Biology Academy?',
    answer:
      'Our faculty comprises AIIMS Trained and top medical college graduates with 15+ years of NEET coaching experience. Led by Dr. Shekhar C Singh (AIIMS New Delhi Alumnus), our team has collectively mentored 1,50,000+ successful NEET candidates.',
  },
  {
    question: 'Is there a free demo class available?',
    answer:
      `Yes! We offer a FREE 45-minute demo class with our AIIMS Trained faculty. You can experience our teaching methodology and receive free study materials worth ₹2,000. Book your demo on our website or call ${CONTACT_INFO.phone.display.primary}.`,
  },
  {
    question: 'What study materials are provided?',
    answer:
      'We provide comprehensive NCERT-based study materials including detailed notes, chapter-wise summaries, 10,000+ practice questions, previous year papers with solutions, mind maps, mnemonics, and quick revision sheets - all included in the course fee.',
  },
  {
    question: 'What is the batch size at Cerebrum Biology Academy?',
    answer:
      'We maintain small batches of maximum 15 students per class to ensure personalized attention for every student. This optimal batch size allows our AIIMS Trained faculty to focus on individual learning needs, provide detailed doubt clarification, and track each student\'s progress effectively. Unlike large coaching centers with 50-100 students per batch, our intimate class environment fosters better student-teacher interaction and improved learning outcomes.',
  },
  {
    question: 'What is your NEET Biology syllabus coverage?',
    answer:
      'We cover the complete NEET Biology syllabus as per NTA guidelines, including all NCERT topics from Class 11 and 12. Botany coverage includes Diversity in Living World, Plant Physiology, Reproduction, Genetics, and Ecology. Zoology includes Human Physiology, Animal Kingdom, Evolution, Biotechnology, and Environmental Biology. Our curriculum aligns with the latest NEET pattern and includes regular updates for recent exam trends and high-weightage topics.',
  },
  {
    question: 'Do you provide test series and mock exams?',
    answer:
      'Yes, we provide a comprehensive test series with 40+ full-length NEET mock tests, 80+ chapter-wise tests, and weekly assessments throughout the year. Each test follows the exact NEET pattern with detailed solutions and performance analysis. Our AI-powered test platform identifies weak areas and provides personalized improvement suggestions. Additionally, we conduct All India Test Series (AITS) to help students benchmark their preparation against lakhs of NEET aspirants nationwide.',
  },
  {
    question: 'What are the class timings and batch options available?',
    answer:
      'We offer flexible batch timings to accommodate students from different schools and boards. Morning batches run from 7:00 AM to 9:00 AM (ideal for evening school students), afternoon batches from 2:00 PM to 4:00 PM, and evening batches from 5:00 PM to 7:00 PM (perfect for morning school students). Weekend batches are available on Saturday and Sunday from 9:00 AM to 1:00 PM. Online live classes offer additional flexibility with recorded session access for revision.',
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
          <p className="mt-3 text-sm text-gray-500">Browse 37+ questions across 8 categories</p>
        </div>
      </div>
    </section>
  )
}
