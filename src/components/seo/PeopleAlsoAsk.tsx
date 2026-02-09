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
  {
    question: 'What is the fee for NEET Biology coaching in Delhi?',
    answer: 'NEET Biology coaching fees at Cerebrum Biology Academy range from Rs 40,000 to Rs 1,20,000 depending on the course duration and batch type. We offer EMI options and scholarships for meritorious students.',
  },
  {
    question: 'Which topics carry the most weightage in NEET Biology?',
    answer: 'The highest weightage topics in NEET Biology are: Human Physiology (20%), Genetics and Evolution (18%), Plant Physiology (14%), Cell Biology (12%), Ecology (12%), and Biotechnology (10%). Focus on these for maximum marks.',
  },
  {
    question: 'What are the best Biology notes for NEET preparation?',
    answer: 'The best Biology notes for NEET combine NCERT textbook content with coaching class notes. At Cerebrum, we provide chapter-wise notes with diagrams, mnemonics, and previous year question analysis integrated into each topic.',
  },
  {
    question: 'Is Cerebrum Biology Academy good for NEET preparation?',
    answer: 'Yes, Cerebrum Biology Academy is rated 4.9/5 by students. With AIIMS-trained faculty, 98% success rate, and 500+ medical college selections, it is one of the top-rated NEET Biology coaching institutes in Delhi NCR.',
  },
  {
    question: 'How many students get selected from Cerebrum Biology Academy?',
    answer: 'Over 500 students from Cerebrum Biology Academy have been selected into top medical colleges including AIIMS, JIPMER, and government medical colleges. Our 2024 batch achieved a 98% success rate with an average Biology score of 340+/360.',
  },
  {
    question: 'Does Cerebrum offer online NEET Biology classes?',
    answer: 'Yes, Cerebrum offers both online and offline NEET Biology classes. Online classes include live interactive sessions, recorded lectures, digital study material, and online test series. Students from across India can join.',
  },
  {
    question: 'How many questions come from NCERT in NEET Biology?',
    answer: 'Approximately 90-95% of NEET Biology questions are directly or indirectly from NCERT textbooks. This includes line-by-line factual questions, diagram-based questions, and conceptual MCQs. The remaining 5-10% require deeper understanding beyond NCERT, which Cerebrum covers in its NCERT+ module.',
  },
  {
    question: 'Who is the best Biology teacher for NEET in Delhi?',
    answer: 'Dr. Shekhar C Singh, founder of Cerebrum Biology Academy, is widely recognized as one of the best NEET Biology teachers in Delhi. An AIIMS alumnus with 15+ years of experience, he has mentored 500+ students into top medical colleges.',
  },
  {
    question: 'What is the difference between Botany and Zoology in NEET?',
    answer: 'In NEET, Botany covers plant biology (morphology, anatomy, physiology, genetics, ecology) while Zoology covers animal biology (structural organization, human physiology, reproduction, evolution). Both carry 45 questions each totaling 180 marks.',
  },
  {
    question: 'How to score 340+ in NEET Biology?',
    answer: 'To score 340+ in NEET Biology: (1) Master NCERT line by line, (2) Practice 5000+ MCQs chapter-wise, (3) Focus on diagrams and labeling, (4) Revise regularly using spaced repetition, (5) Take weekly mock tests and analyze mistakes thoroughly.',
  },
  {
    question: 'Does Cerebrum Biology Academy have centers in Noida?',
    answer: 'Yes, Cerebrum Biology Academy has a center in Noida at B-45, Sector 62. It serves students from Noida, Greater Noida, Ghaziabad, and surrounding areas. The center offers all NEET Biology course options.',
  },
  {
    question: 'What study material does Cerebrum provide for NEET Biology?',
    answer: 'Cerebrum provides comprehensive NEET Biology study material including chapter-wise printed notes, 10,000+ practice MCQs with solutions, previous year papers (2015-2025), topic-wise test series, and digital access to recorded lectures.',
  },
  {
    question: 'Is NEET Biology coaching available on weekends?',
    answer: 'Yes, Cerebrum Biology Academy offers weekend batches for school-going students. Weekend batches run on Saturday and Sunday with 3-hour sessions covering the full NEET Biology syllabus over 12-15 months.',
  },
  {
    question: 'How to prepare Human Physiology for NEET?',
    answer: 'Human Physiology is the highest-weightage NEET Biology topic (20%). Focus on: (1) Digestive, respiratory, circulatory systems diagrams, (2) Neural control and hormonal regulation, (3) Excretory system processes, (4) Practice NCERT back questions and previous year MCQs.',
  },
  {
    question: 'What is the success rate of Cerebrum Biology Academy?',
    answer: 'Cerebrum Biology Academy has a 98% success rate in NEET Biology. In 2024, over 95% of our students scored 300+ in Biology, with the average Biology score being 340/360. Over 500 students have been selected into AIIMS, JIPMER, and top GMCs.',
  },
  {
    question: 'Can dropper students join Cerebrum for NEET Biology?',
    answer: 'Yes, Cerebrum offers dedicated dropper batches for NEET Biology. The 1-year intensive program includes daily classes, weekly tests, doubt sessions, and personalized mentoring. Many dropper students have improved their scores by 100-150 marks.',
  },
  {
    question: 'What makes Cerebrum different from other NEET coaching?',
    answer: 'Cerebrum stands out for: (1) AIIMS-trained faculty, (2) Biology-only specialization (not general coaching), (3) Small batch sizes (max 25), (4) 98% success rate, (5) 6 centers across Delhi NCR, (6) Comprehensive study material with 10,000+ MCQs.',
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
 * Delhi NCR Specific PAA Questions for Local SEO
 */
export const DELHI_NCR_PAA_QUESTIONS: PAQuestion[] = [
  {
    question: 'Which is the best NEET Biology coaching in South Delhi?',
    answer: 'Cerebrum Biology Academy in South Extension is rated the best NEET Biology coaching in South Delhi. With AIIMS-trained faculty, 98% success rate, and small batches of 15-20 students, it serves students from Greater Kailash, Defence Colony, Lajpat Nagar, and surrounding areas.',
  },
  {
    question: 'Is there NEET coaching in Rohini Delhi?',
    answer: 'Yes, Cerebrum Biology Academy has a dedicated center in Rohini at 211 Vikas Surya Tower, DC Chauk, Sector 9. It serves students from Rohini, Pitampura, Shalimar Bagh, Ashok Vihar, and North Delhi with the same expert AIIMS faculty as the flagship South Extension branch.',
  },
  {
    question: 'What is the best NEET coaching in Gurugram?',
    answer: 'Cerebrum Biology Academy in Gurugram (Unit 17, M2K Corporate Park, Sector 51) is among the top NEET Biology coaching centers. It features AIIMS faculty, digital classrooms, and serves students from DLF, Sushant Lok, Golf Course Road, Sohna Road, and Manesar.',
  },
  {
    question: 'Is NEET coaching available in Noida?',
    answer: 'Yes, Cerebrum Biology Academy has a center at B-45, Sector 62, Noida. It caters to students from Noida, Greater Noida, Ghaziabad, Indirapuram, and Vaishali. Students get the same expert AIIMS faculty and comprehensive study material as other centers.',
  },
  {
    question: 'How much does NEET Biology coaching cost in Delhi NCR?',
    answer: 'NEET Biology coaching at Cerebrum costs between ₹45,000 to ₹1,80,000 depending on the course. The Pursuit batch starts at ₹45K, Ascent at ₹60K, and Pinnacle at ₹65K. EMI options and merit scholarships are available across all 6 Delhi NCR centers.',
  },
  {
    question: 'Does Cerebrum have a center in Faridabad?',
    answer: 'Yes, Cerebrum Biology Academy has a center in Sector 17, Faridabad. It serves students from Faridabad, Palwal, Ballabgarh, NIT Faridabad, and surrounding areas. Quality NEET Biology coaching is now accessible without traveling to Delhi.',
  },
  {
    question: 'Which NEET coaching is near Green Park Metro?',
    answer: 'Cerebrum Biology Academy Green Park center is located at B 113 FF Gulmohar Park, just minutes from Green Park Metro (Yellow Line). Convenient for students from Hauz Khas, IIT Delhi area, Safdarjung, Malviya Nagar, and Saket.',
  },
  {
    question: 'Can I get NEET Biology coaching in East Delhi?',
    answer: 'Yes, Cerebrum Biology Academy serves East Delhi students through live online classes and the nearest offline centers. Students from Laxmi Nagar, Preet Vihar, Mayur Vihar, and surrounding areas can join. Free demo classes are available.',
  },
]

/**
 * Subject-Specific PAA Questions for deeper AEO coverage
 */
export const BIOLOGY_SUBJECT_PAA_QUESTIONS: PAQuestion[] = [
  {
    question: 'How to study Genetics for NEET effectively?',
    answer: 'For Genetics (8-10% weightage): Master Mendel laws and crosses, practice pedigree analysis daily, learn molecular genetics from DNA replication to protein synthesis step-by-step, solve 500+ genetics MCQs, and focus on Hardy-Weinberg and genetic disorders for extra marks.',
  },
  {
    question: 'What are the most important diagrams for NEET Biology?',
    answer: 'Must-know diagrams: heart structure (labeled), nephron, digestive system, neuron, DNA replication fork, Calvin cycle, Krebs cycle, human reproductive system, embryo development, and ecological pyramids. Practice drawing and labeling each at least 5 times.',
  },
  {
    question: 'How to prepare Ecology for NEET Biology?',
    answer: 'Ecology carries 6-8% in NEET. Focus on ecosystem components and energy flow, ecological succession, population interactions (mutualism, parasitism, competition), biodiversity hotspots, conservation strategies, and environmental issues. NCERT is 100% sufficient for Ecology.',
  },
  {
    question: 'Is Botany harder than Zoology in NEET?',
    answer: 'Botany is considered slightly harder due to plant anatomy, morphology, and biochemistry. Zoology has more to memorize (human physiology, animal diversity). Both carry equal marks (180 each). Focus more time on your weaker section for better overall scores.',
  },
  {
    question: 'What are assertion-reason questions in NEET Biology?',
    answer: 'Assertion-Reason questions present two statements where you determine if both are correct and if the Reason explains the Assertion. These test deep conceptual understanding. NEET typically has 5-8 such questions in Biology. Practice with previous year papers regularly.',
  },
  {
    question: 'How to revise entire NEET Biology in 30 days?',
    answer: 'For 30-day revision: Week 1 covers Human Physiology + Genetics (highest weightage), Week 2 covers Plant Physiology + Cell Biology, Week 3 covers Ecology + Biotechnology + Evolution, Week 4 focuses on mock tests + weak areas. Revise NCERT back questions daily.',
  },
]

/**
 * Fee and Results PAA Questions
 */
export const FEE_RESULTS_PAA_QUESTIONS: PAQuestion[] = [
  {
    question: 'What are NEET 2026 expected cutoff marks?',
    answer: 'NEET 2026 expected cutoff for General category is around 720-137 (qualifying), with top medical colleges requiring 650+ marks. For Biology, aim for 340+ out of 360 for top colleges. Cerebrum students consistently achieve these scores with structured preparation.',
  },
  {
    question: 'Is scholarship available for NEET coaching?',
    answer: 'Yes, Cerebrum Biology Academy offers merit-based scholarships up to 50% for meritorious students based on screening test and academic performance. Flexible EMI payment options are also available to make quality coaching accessible to all students.',
  },
  {
    question: 'What is the fee structure for NEET dropper batch?',
    answer: 'The NEET dropper batch fee at Cerebrum ranges from ₹60,000 to ₹1,50,000 for the 1-year intensive program. This includes daily classes, weekly tests, doubt sessions, complete study material, and personalized mentoring. EMI options available.',
  },
  {
    question: 'How long does it take to prepare for NEET Biology?',
    answer: 'Ideally 18-24 months of consistent preparation. Class 11 students should start early for a 2-year foundation. Class 12 students need 10-12 months of focused study. Droppers can prepare effectively in 8-10 months with intensive coaching at Cerebrum.',
  },
]

/**
 * Parent and Board Exam PAA Questions
 */
export const PARENT_BOARD_PAA_QUESTIONS: PAQuestion[] = [
  {
    question: 'Is NEET coaching needed along with school coaching?',
    answer: 'Yes, school covers CBSE/ICSE Board syllabus but NEET requires deeper conceptual understanding, MCQ practice, and competitive exam strategy. Most NEET toppers attend separate coaching alongside school. Cerebrum offers flexible timings including evening and weekend batches that fit school schedules.',
  },
  {
    question: 'How to balance NEET preparation with Board exams?',
    answer: 'NCERT forms the foundation for both Boards and NEET. Focus on NCERT thoroughly for 85% overlap. Use separate time for NEET-specific MCQ practice. Cerebrum aligns its syllabus with school boards so students cover both simultaneously without extra burden.',
  },
  {
    question: 'What should parents look for in NEET coaching?',
    answer: 'Parents should evaluate: (1) Faculty credentials (medical background preferred), (2) Batch size (under 25 ideal), (3) Success track record with verifiable results, (4) Regular parent-teacher communication, (5) Test and progress reports, (6) Flexible fee payment options.',
  },
  {
    question: 'At what age should NEET preparation start?',
    answer: 'Ideally from Class 9-10 for foundation building. Class 11 is the optimal time for serious NEET preparation. Starting early reduces stress and allows deeper concept understanding. Cerebrum offers Class 9-10 foundation courses that build a strong base for NEET.',
  },
  {
    question: 'Does Cerebrum provide progress reports to parents?',
    answer: 'Yes, Cerebrum provides weekly test scores, monthly progress reports, and regular parent-teacher meetings. Parents get a dedicated WhatsApp group for updates, attendance tracking, and direct communication with faculty. Bi-monthly PTMs are held at all 6 centers.',
  },
  {
    question: 'Can Biology Board exam marks help in NEET?',
    answer: 'Board marks themselves are not counted in NEET, but the NCERT concepts tested in Boards directly apply to NEET. Students scoring 90+ in Board Biology typically score 300+ in NEET Biology because the foundational knowledge is the same.',
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
