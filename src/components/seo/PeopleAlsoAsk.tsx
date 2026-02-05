'use client'

import { useState } from 'react'
import { ChevronDown, Search, HelpCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export interface PAQuestion {
  question: string
  answer: string
  relatedQuestions?: string[]
}

interface PeopleAlsoAskProps {
  questions: PAQuestion[]
  title?: string
  className?: string
  showSchema?: boolean
  topicKeyword?: string
}

/**
 * PeopleAlsoAsk Component
 *
 * Mimics Google's "People Also Ask" feature for AEO (Answer Engine Optimization).
 * Targets featured snippet and PAA box positions in Google SERP.
 *
 * Best practices:
 * - Questions should be based on actual Google SERP analysis
 * - Answers should be concise (40-60 words for featured snippet potential)
 * - Include the question keyword in the first sentence of the answer
 * - Use natural language that voice assistants can read
 */
export function PeopleAlsoAsk({
  questions,
  title = 'People Also Ask',
  className = '',
  showSchema = true,
  topicKeyword,
}: PeopleAlsoAskProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [expandedQuestions, setExpandedQuestions] = useState<PAQuestion[]>(questions)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)

    // Load related questions when opening (mimics Google PAA behavior)
    if (openIndex !== index && questions[index]?.relatedQuestions) {
      const newQuestions = [...expandedQuestions]
      // Add related questions after the current one
      questions[index].relatedQuestions?.forEach((relQ) => {
        const existing = questions.find(q => q.question === relQ)
        if (existing && !expandedQuestions.find(eq => eq.question === relQ)) {
          newQuestions.push(existing)
        }
      })
      setExpandedQuestions(newQuestions)
    }
  }

  if (!questions || questions.length === 0) {
    return null
  }

  // Schema for FAQ structured data (helps with PAA ranking)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
    ...(topicKeyword && {
      about: {
        '@type': 'Thing',
        name: topicKeyword,
      },
    }),
  }

  return (
    <section className={`py-8 ${className}`} aria-labelledby="paa-title">
      {/* Schema markup */}
      {showSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <HelpCircle className="w-5 h-5 text-blue-600" />
        </div>
        <h2 id="paa-title" className="text-xl font-bold text-gray-900">
          {title}
        </h2>
      </div>

      {/* Questions List */}
      <div className="space-y-2">
        {expandedQuestions.slice(0, 8).map((item, index) => {
          const isOpen = openIndex === index
          return (
            <div
              key={`paa-${index}-${item.question.slice(0, 20)}`}
              className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-sm transition-shadow"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                aria-expanded={isOpen}
                aria-controls={`paa-answer-${index}`}
              >
                <span className="font-medium text-gray-900 pr-4 text-sm md:text-base">
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    id={`paa-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                  >
                    <div className="px-4 pb-4 text-gray-600 text-sm md:text-base leading-relaxed border-t border-gray-100 pt-3">
                      {/* Speakable class for voice search */}
                      <p className="speakable-answer">{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* Related Searches Hint */}
      {topicKeyword && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <Search className="w-4 h-4" />
            Related to: <span className="font-medium text-gray-700">{topicKeyword}</span>
          </p>
        </div>
      )}
    </section>
  )
}

/**
 * NEET Biology PAA Questions
 * Based on Google SERP analysis for NEET-related queries
 */
export const NEET_BIOLOGY_PAA_QUESTIONS: PAQuestion[] = [
  {
    question: 'Is Biology enough to crack NEET?',
    answer: 'Yes, Biology is crucial for NEET success as it carries 360 out of 720 marks (50%). Scoring above 340 in Biology can significantly boost your overall NEET score. However, you also need minimum qualifying marks in Physics and Chemistry. At Cerebrum Biology Academy, we help students maximize their Biology score while maintaining balance.',
  },
  {
    question: 'How many hours should I study Biology for NEET?',
    answer: 'For NEET Biology preparation, dedicate 3-4 hours daily. This should include 2 hours for new concepts and NCERT reading, 1 hour for revision, and 1 hour for practice questions. Consistency matters more than marathon sessions. Our NEET toppers typically follow this structured approach.',
  },
  {
    question: 'Which chapters are most important for NEET Biology?',
    answer: 'The high-weightage chapters in NEET Biology are: Human Physiology (8-10%), Genetics and Evolution (8-10%), Plant Physiology (6-8%), Ecology (6-8%), Cell Biology (5-7%), and Biomolecules (4-5%). Together, these account for nearly 50% of Biology questions in NEET.',
  },
  {
    question: 'Can I score 360/360 in NEET Biology?',
    answer: 'Yes, scoring 360/360 in NEET Biology is achievable with proper preparation. Our student Priya Sehgal achieved this perfect score in 2023. Key strategies include: NCERT line-by-line reading, 10,000+ MCQ practice, understanding diagrams, and regular mock tests. Cerebrum has a proven track record of producing 340+ Biology scorers.',
  },
  {
    question: 'Is NCERT enough for NEET Biology?',
    answer: 'NCERT is the primary source for NEET Biology, covering 95% of questions. However, for a competitive edge, supplement with previous year papers, assertion-reason practice, and diagram-based questions. At Cerebrum, we provide NCERT+ notes that cover the remaining 5% for perfect preparation.',
  },
  {
    question: 'What is the best time to start NEET Biology preparation?',
    answer: 'The ideal time to start NEET Biology preparation is Class 11. Early preparation allows thorough NCERT coverage and extensive practice. However, Class 12 students can still succeed with intensive preparation. Droppers should start immediately after NEET results. Cerebrum offers courses for all stages.',
  },
  {
    question: 'How to memorize Biology for NEET effectively?',
    answer: 'Effective Biology memorization for NEET includes: visual learning with diagrams and flowcharts, creating mnemonics for complex processes, spaced repetition technique, teaching concepts to others, and connecting topics to real-life examples. Our faculty at Cerebrum shares proven memory techniques from AIIMS preparation.',
  },
  {
    question: 'Is coaching necessary for NEET Biology?',
    answer: 'While self-study is possible, coaching significantly improves NEET Biology scores through structured learning, expert guidance, regular testing, and peer motivation. Statistics show 85% of NEET toppers attend coaching. Cerebrum offers specialized Biology coaching with AIIMS faculty and 98% success rate.',
  },
]

/**
 * NEET Coaching PAA Questions
 */
export const NEET_COACHING_PAA_QUESTIONS: PAQuestion[] = [
  {
    question: 'Which coaching is best for NEET preparation?',
    answer: 'The best NEET coaching depends on your needs. For Biology-focused preparation, specialized institutes like Cerebrum Biology Academy offer small batches (15-20 students) and AIIMS faculty. For comprehensive PCB, larger institutes work well. Key factors: faculty credentials, batch size, success rate, and fee structure.',
  },
  {
    question: 'How much does NEET coaching cost in Delhi?',
    answer: 'NEET coaching fees in Delhi range from ₹45,000 to ₹2,50,000 annually. Large institutes charge ₹1.5-2.5 lakhs for all subjects. Specialized Biology coaching like Cerebrum costs ₹45,000-₹1,80,000, offering better value for Biology-focused students. EMI options are available at most institutes.',
  },
  {
    question: 'Is online NEET coaching effective?',
    answer: 'Yes, online NEET coaching is effective when it includes live interactive classes, doubt-clearing sessions, and regular tests. Benefits include flexibility, no commute time, and recorded lectures for revision. Cerebrum online students achieve similar results to offline, with 24/7 doubt support and digital materials.',
  },
  {
    question: 'Can I crack NEET without coaching?',
    answer: 'Cracking NEET without coaching is possible but challenging. Only 15% of successful candidates are self-taught. You need exceptional self-discipline, quality study materials, and mock test access. Most toppers recommend at least subject-specific coaching for weaker areas, especially Biology which carries 50% marks.',
  },
  {
    question: 'What is the success rate of NEET coaching institutes?',
    answer: 'Success rates vary significantly: top institutes claim 80-95%, but actual qualified student percentage is 30-50%. Cerebrum Biology Academy has a verified 98% success rate (students scoring 550+) with small batches ensuring personalized attention. Always verify success claims with student testimonials.',
  },
  {
    question: 'Is joining NEET coaching in Class 11 or 12 better?',
    answer: 'Joining in Class 11 is ideal for thorough preparation and stress-free learning. Class 12 joining works but requires intensive study. Class 11 students have 2 years to build concepts and practice extensively. However, late joiners can succeed with crash courses and dedicated preparation.',
  },
]

/**
 * Location-based PAA Questions Generator
 */
export function generateLocationPAAQuestions(location: string): PAQuestion[] {
  return [
    {
      question: `Which is the best NEET coaching in ${location}?`,
      answer: `Cerebrum Biology Academy is the top-rated NEET Biology coaching in ${location} with 98% success rate and AIIMS faculty. We offer small batch sizes (15-20 students), personalized mentoring, and both online and offline classes. Our ${location} students consistently score above 340 in Biology.`,
    },
    {
      question: `What are NEET coaching fees in ${location}?`,
      answer: `NEET coaching fees in ${location} range from ₹45,000 to ₹2,00,000 annually. Cerebrum Biology Academy offers competitive pricing: Pursuit (₹45K-₹85K), Ascent (₹60K-₹1.4L), and Pinnacle (₹65K-₹1.8L). All courses include study materials, tests, and doubt sessions with EMI options available.`,
    },
    {
      question: `Is there good NEET Biology coaching near ${location}?`,
      answer: `Yes, Cerebrum Biology Academy serves ${location} students with specialized NEET Biology coaching. We offer both offline classes at our center and live online classes. Our AIIMS alumnus faculty, Dr. Shekhar C Singh, personally teaches Biology concepts with 15+ years of experience coaching successful NEET candidates.`,
    },
    {
      question: `How to prepare for NEET in ${location}?`,
      answer: `To prepare for NEET in ${location}: (1) Join quality coaching for structured learning, (2) Focus on NCERT for Biology, (3) Practice 100+ questions daily, (4) Take weekly mock tests, (5) Join study groups. Cerebrum Biology Academy in ${location} offers comprehensive preparation with proven results.`,
    },
  ]
}
