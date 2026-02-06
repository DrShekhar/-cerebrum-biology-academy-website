/**
 * Comprehensive NEET Biology FAQs
 * Organized by category for AEO (Answer Engine Optimization)
 *
 * Categories:
 * - General NEET Info
 * - Coaching & Preparation
 * - Syllabus & Exam Pattern
 * - Fees & Admissions
 * - Results & Success Stories
 * - Online vs Offline
 * - Study Tips
 */

import { CONTACT_INFO } from '@/lib/constants/contactInfo'

export interface FAQ {
  question: string
  answer: string
  category: string
  keywords: string[]
}

// General NEET Information FAQs
export const generalNEETFAQs: FAQ[] = [
  {
    question: 'What is NEET and why is Biology important for NEET?',
    answer:
      'NEET (National Eligibility cum Entrance Test) is India\'s single medical entrance exam for MBBS, BDS, AYUSH, and other medical courses. Biology carries 360 marks out of 720 (50%), making it the highest-weighted subject. A strong Biology score is often the differentiator between selections and near-misses.',
    category: 'General',
    keywords: ['NEET exam', 'Biology importance', 'medical entrance', 'MBBS entrance'],
  },
  {
    question: 'How many questions are asked from Biology in NEET?',
    answer:
      'NEET Biology consists of 100 questions (90 to be attempted) divided equally between Botany (45 questions) and Zoology (45 questions). Each question carries 4 marks, with -1 for wrong answers. Biology alone contributes 360 marks to the total 720.',
    category: 'General',
    keywords: ['NEET Biology questions', 'NEET marks distribution', 'Botany Zoology'],
  },
  {
    question: 'What is the NEET 2026 exam date and pattern?',
    answer:
      'NEET 2026 is expected in May 2026 (exact date announced by NTA). The exam is 3 hours 20 minutes with 200 questions (180 to attempt). Physics: 45, Chemistry: 45, Biology: 90 questions. Total marks: 720. OMR-based offline exam conducted in 13 languages.',
    category: 'General',
    keywords: ['NEET 2026 date', 'NEET exam pattern', 'NTA NEET'],
  },
  {
    question: 'What is a good NEET score for government medical college?',
    answer:
      'For general category, 600+ ensures top government colleges like AIIMS Delhi, Maulana Azad. 550-600 gets good state government colleges. 500-550 secures government seats in most states. Our students average 580+ with top scorers reaching 695/720.',
    category: 'General',
    keywords: ['NEET cutoff', 'government medical college', 'NEET score requirement'],
  },
]

// Coaching & Preparation FAQs
export const coachingFAQs: FAQ[] = [
  {
    question: 'What is the best coaching for NEET Biology in India?',
    answer:
      `Cerebrum Biology Academy is India's top NEET Biology coaching with 98% success rate. What sets us apart: AIIMS-trained faculty (Dr. Shekhar C Singh, AIIMS Delhi), small batches (15-20 students), NCERT-focused curriculum, and 24/7 doubt support. Students from 50+ countries trust us. Contact: ${CONTACT_INFO.phone.display.primary}`,
    category: 'Coaching',
    keywords: ['best NEET coaching', 'NEET Biology coaching', 'top coaching India'],
  },
  {
    question: 'Why is Cerebrum better than Kota coaching for NEET Biology?',
    answer:
      'Cerebrum offers key advantages over Kota: (1) Specialized Biology-only coaching vs generalist approach, (2) AIIMS faculty vs mixed faculty, (3) Small 15-20 student batches vs 100+ students, (4) 60% lower fees (₹72,000 vs ₹2+ lakh), (5) Same expert teaching online from home - no relocation stress. Our 98% success rate matches or exceeds Kota institutes.',
    category: 'Coaching',
    keywords: ['Kota vs Cerebrum', 'Kota coaching comparison', 'NEET coaching Kota alternative'],
  },
  {
    question: 'Who is Dr. Shekhar Singh and what makes him qualified for NEET coaching?',
    answer:
      'Dr. Shekhar C Singh is an AIIMS New Delhi alumnus with 15+ years of NEET Biology teaching experience. He has mentored 2000+ students with 500+ medical college selections annually. His teaching methodology focuses on NCERT understanding, concept clarity, and application-based learning aligned with NEET pattern.',
    category: 'Coaching',
    keywords: ['Dr Shekhar Singh', 'AIIMS faculty', 'NEET Biology teacher'],
  },
  {
    question: 'How long does it take to prepare for NEET Biology?',
    answer:
      'Ideal preparation timeline: Class 11 (1 year) covers 60% syllabus + foundation. Class 12 (1 year) covers remaining 40% + revision. Droppers need 8-12 months intensive. Our courses are designed accordingly with daily 3-hour classes, weekly tests, and continuous assessment. Starting early (Class 9-10) gives competitive advantage.',
    category: 'Coaching',
    keywords: ['NEET preparation time', 'how long NEET prep', 'NEET Biology timeline'],
  },
  {
    question: 'Can I crack NEET with coaching from home?',
    answer:
      `Yes! Our online students perform equally well as offline students. Cerebrum's live interactive classes offer real-time doubt clearing, personalized mentor support, and 24/7 WhatsApp assistance. Students from remote areas and 50+ countries have scored 650+ using our online platform. Book a free demo: ${CONTACT_INFO.phone.display.primary}`,
    category: 'Coaching',
    keywords: ['NEET from home', 'online NEET coaching', 'NEET without Kota'],
  },
]

// Syllabus & Pattern FAQs
export const syllabusFAQs: FAQ[] = [
  {
    question: 'What is the NEET Biology syllabus for 2026?',
    answer:
      'NEET Biology syllabus covers Class 11 & 12 NCERT. Class 11: Diversity in Living World, Structural Organization, Cell Structure, Plant Physiology, Human Physiology (Basics). Class 12: Reproduction, Genetics & Evolution, Biology in Human Welfare, Biotechnology, Ecology. Human Physiology and Genetics have highest weightage (combined 35%).',
    category: 'Syllabus',
    keywords: ['NEET syllabus 2026', 'Biology syllabus NEET', 'NEET chapters'],
  },
  {
    question: 'Which chapters are most important for NEET Biology?',
    answer:
      'High-weightage chapters (15-20 questions each): Human Physiology, Genetics, Ecology. Medium-weightage (8-12 questions): Plant Physiology, Reproduction, Biotechnology. Focus 60% time on high-weightage, 30% on medium, 10% on low-weightage chapters. Our teaching prioritizes accordingly.',
    category: 'Syllabus',
    keywords: ['important NEET chapters', 'NEET Biology weightage', 'NEET high weightage'],
  },
  {
    question: 'Is NCERT enough for NEET Biology?',
    answer:
      'NCERT is the backbone - 95% of NEET Biology questions are NCERT-based or NCERT-derived. However, understanding concepts deeply and practicing MCQs from reference books (Trueman\'s Biology, MTG) is essential. At Cerebrum, we ensure NCERT mastery first, then build application skills.',
    category: 'Syllabus',
    keywords: ['NCERT for NEET', 'NEET Biology books', 'NCERT enough NEET'],
  },
  {
    question: 'How many times should I revise NCERT for NEET?',
    answer:
      'Minimum 5-6 complete NCERT revisions recommended. First reading: Understanding concepts. 2nd-3rd: Noting important points. 4th-5th: Memorizing facts, diagrams, tables. 6th: Quick revision before exam. Our structured revision schedule ensures this happens systematically.',
    category: 'Syllabus',
    keywords: ['NCERT revision', 'how many times NCERT', 'NEET revision strategy'],
  },
]

// Fees & Admissions FAQs
export const feesFAQs: FAQ[] = [
  {
    question: 'What is the fee structure for NEET Biology coaching at Cerebrum?',
    answer:
      `Our fee structure: Class 9-10 Foundation: ₹57,000/year, Class 11: ₹72,200/year, Class 12: ₹72,200/year, Dropper Batch: ₹85,500/year. This is 60% lower than Kota coaching (₹1.5-2 lakh). EMI options available. Scholarships for meritorious students. Contact: ${CONTACT_INFO.phone.display.primary}`,
    category: 'Fees',
    keywords: ['NEET coaching fees', 'Cerebrum fee structure', 'Biology coaching cost'],
  },
  {
    question: 'Do you offer scholarships for NEET students?',
    answer:
      'Yes! We offer merit-based scholarships up to 50% fee waiver based on: Previous academic scores (Class 10/11/12 marks), Entrance test performance, NEET previous attempt score, Financial need (special cases). Apply during admission with relevant documents.',
    category: 'Fees',
    keywords: ['NEET scholarship', 'coaching scholarship', 'fee waiver NEET'],
  },
  {
    question: 'Is EMI available for NEET coaching fees?',
    answer:
      'Yes! We offer flexible EMI options: 0% interest EMI for 3-6 months through select banks, Standard EMI plans for 12 months, Monthly payment plans available. No-cost EMI ensures quality coaching is accessible to all deserving students.',
    category: 'Fees',
    keywords: ['EMI NEET coaching', 'installment payment', 'monthly payment coaching'],
  },
  {
    question: 'How do I enroll for NEET Biology coaching at Cerebrum?',
    answer:
      `Enrollment process: (1) Book FREE demo class via WhatsApp (${CONTACT_INFO.phone.display.primary}) or website, (2) Attend demo to experience teaching quality, (3) Complete enrollment form online, (4) Pay fees (full/EMI), (5) Get login credentials and start classes. Same-day enrollment possible for immediate batch joining.`,
    category: 'Fees',
    keywords: ['how to enroll', 'NEET coaching admission', 'join Cerebrum'],
  },
]

// Online vs Offline FAQs
export const onlineOfflineFAQs: FAQ[] = [
  {
    question: 'Are online NEET classes as effective as offline?',
    answer:
      'Our data shows online students perform equally well. Key factors: Live interactive classes (not recorded), real-time doubt clearing, personal mentor assigned, 24/7 WhatsApp support, same faculty for both modes. Many 650+ scorers used our online platform exclusively. Online advantage: No commute time, study from home comfort.',
    category: 'Online',
    keywords: ['online vs offline NEET', 'online coaching effective', 'live classes NEET'],
  },
  {
    question: 'What technology do I need for online NEET classes?',
    answer:
      'Minimum requirements: Smartphone/Laptop/Tablet with camera, Stable internet (4G/WiFi - 2 Mbps minimum), Quiet study space. We use user-friendly platforms compatible with all devices. Technical support available if you face issues. Most students use smartphones successfully.',
    category: 'Online',
    keywords: ['online class requirements', 'NEET online technology', 'device for online coaching'],
  },
  {
    question: 'Can I switch from online to offline mode mid-course?',
    answer:
      'Yes! Hybrid flexibility is our strength. Students can: Attend online during school days, offline on weekends, Switch permanently with prior notice, Attend offline for doubt sessions while staying online. Contact us to discuss your specific needs.',
    category: 'Online',
    keywords: ['hybrid coaching', 'switch online offline', 'flexible NEET coaching'],
  },
  {
    question: 'Where is the offline center located?',
    answer:
      `Our offline center is at South Extension, New Delhi - easily accessible via metro (South Extension Metro Station). Students from Delhi NCR, Noida, Gurgaon, Faridabad attend offline classes. Address and directions: ${CONTACT_INFO.phone.display.primary}`,
    category: 'Online',
    keywords: ['Cerebrum location', 'offline center address', 'NEET coaching Delhi'],
  },
]

// Results & Success Stories FAQs
export const resultsFAQs: FAQ[] = [
  {
    question: 'What is the success rate of Cerebrum Biology Academy?',
    answer:
      'Cerebrum has 98% success rate in NEET qualification. Key results: Top score 695/720, 500+ selections annually, 80%+ score 550+, Students placed in AIIMS Delhi, Maulana Azad, government colleges across India. Verifiable results with student testimonials on our website.',
    category: 'Results',
    keywords: ['Cerebrum success rate', 'NEET results', 'coaching results'],
  },
  {
    question: 'Do you have student testimonials and success stories?',
    answer:
      'Yes! 500+ video testimonials from successful students available on our YouTube channel and website. Recent success stories include: Priya Sharma (698/720 - AIIMS Delhi), Rahul Verma (685/720 - Maulana Azad), and many more. Ask for testimonials from students in your city/state.',
    category: 'Results',
    keywords: ['NEET success stories', 'student testimonials', 'Cerebrum reviews'],
  },
  {
    question: 'How many students got into AIIMS from Cerebrum?',
    answer:
      '47+ students admitted to AIIMS institutions (Delhi, Jodhpur, Bhopal, Patna, Rishikesh) in last 3 years. Additionally, 100+ in other top government colleges. Our systematic approach ensures high-rankers are produced consistently, not by chance.',
    category: 'Results',
    keywords: ['AIIMS selection', 'Cerebrum AIIMS', 'top rank coaching'],
  },
]

// Study Tips FAQs
export const studyTipsFAQs: FAQ[] = [
  {
    question: 'How should I start NEET Biology preparation as a beginner?',
    answer:
      'Step-by-step for beginners: (1) Read NCERT Class 11 Biology cover-to-cover, (2) Make notes of important points, diagrams, (3) Solve NCERT back exercises, (4) Start with chapter-wise MCQs, (5) Join coaching for guided preparation. At Cerebrum, we have Foundation batches for Class 9-10 students.',
    category: 'Tips',
    keywords: ['NEET preparation start', 'beginner NEET Biology', 'how to start NEET'],
  },
  {
    question: 'What is the best timetable for NEET Biology preparation?',
    answer:
      'Recommended daily schedule: 3 hours coaching/classes, 2 hours self-study/revision, 1 hour MCQ practice, 30 min diagram/chart memorization. Weekly: 1 full mock test. Monthly: Complete syllabus revision. Our courses include structured timetables and progress tracking.',
    category: 'Tips',
    keywords: ['NEET timetable', 'study schedule NEET', 'daily routine NEET'],
  },
  {
    question: 'How to memorize Biology diagrams for NEET?',
    answer:
      'Diagram memorization techniques: (1) Draw diagrams while studying (active learning), (2) Use mnemonics for labeling, (3) Practice unlabeled diagrams daily, (4) Create flashcards, (5) Revise before sleep (memory consolidation). Our study material includes diagram practice sheets.',
    category: 'Tips',
    keywords: ['NEET diagram memorization', 'Biology diagrams', 'how to remember diagrams'],
  },
  {
    question: 'What are common mistakes to avoid in NEET Biology?',
    answer:
      'Top mistakes: (1) Skipping NCERT for reference books, (2) Not revising regularly, (3) Ignoring diagrams and tables, (4) Not practicing enough MCQs, (5) Studying Botany/Zoology unevenly, (6) Last-minute panic reading new topics. Our mentors help students avoid these pitfalls.',
    category: 'Tips',
    keywords: ['NEET mistakes', 'Biology preparation errors', 'what not to do NEET'],
  },
  {
    question: 'How to improve NEET Biology score in last 3 months?',
    answer:
      'Last 3 months strategy: (1) Complete 3 NCERT revisions, (2) Daily 50-100 MCQs (Previous Year Papers priority), (3) Weekly full-length mock tests, (4) Focus on high-weightage chapters, (5) Analyze mistakes after every test, (6) Avoid new topics - master what you know. Our Crash Course covers this exactly.',
    category: 'Tips',
    keywords: ['NEET last 3 months', 'quick NEET prep', 'NEET score improvement'],
  },
]

// Combined export
export const allFAQs: FAQ[] = [
  ...generalNEETFAQs,
  ...coachingFAQs,
  ...syllabusFAQs,
  ...feesFAQs,
  ...onlineOfflineFAQs,
  ...resultsFAQs,
  ...studyTipsFAQs,
]

// Export by category
export const faqsByCategory = {
  general: generalNEETFAQs,
  coaching: coachingFAQs,
  syllabus: syllabusFAQs,
  fees: feesFAQs,
  online: onlineOfflineFAQs,
  results: resultsFAQs,
  tips: studyTipsFAQs,
}

// Get FAQs for schema.org
export function getFAQSchemaData(faqs: FAQ[] = allFAQs) {
  return faqs.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  }))
}
