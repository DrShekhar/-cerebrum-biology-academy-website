import type { ClassLevel, CourseType, TierLevel } from '@/data/pricing'

export type NeetClassOption = 'class-11' | 'class-12' | 'dropper'
export type FocusOption = 'board-only' | 'neet' | 'board-neet'
export type TierOption = 'pinnacle' | 'ascent' | 'intensive' | 'pursuit'
export type BatchOption = 'weekday' | 'weekend'
export type ModeOption = 'online' | 'offline'
export type LocationOption = 'south-extension' | 'gurugram' | 'rohini' | 'faridabad'

export interface ClassSelector {
  id: NeetClassOption
  label: string
  description: string
  duration: string
  classLevel: ClassLevel
}

export interface FocusSelector {
  id: FocusOption
  label: string
  description: string
  courseType: CourseType
}

export interface TierSelector {
  id: TierOption
  label: string
  batchSize: string
  hours: string
  priceRange: string
  badge?: string
  tierLevel?: TierLevel
  isHidden?: boolean
}

export interface BatchSelector {
  id: BatchOption
  label: string
  schedule: string
}

export interface ModeSelector {
  id: ModeOption
  label: string
  description: string
}

export interface LocationSelector {
  id: LocationOption
  label: string
  address: string
}

export interface SubjectCard {
  name: string
  color: string
  bgColor: string
  weightage: string
  questions: number
  description: string
  topics: string[]
  whyItMatters: string
}

export interface FAQItem {
  question: string
  answer: string
}

export const classOptions: ClassSelector[] = [
  {
    id: 'class-11',
    label: 'Class 11',
    description: 'Start early, build a strong foundation for NEET 2027',
    duration: '1 Year',
    classLevel: 'class-11',
  },
  {
    id: 'class-12',
    label: 'Class 12',
    description: 'Intensive NEET + Board preparation for 2026',
    duration: '1 Year',
    classLevel: 'class-12',
  },
  {
    id: 'dropper',
    label: 'Dropper',
    description: 'Focused retake preparation with complete 11th + 12th revision',
    duration: '1 Year',
    classLevel: 'dropper',
  },
]

export const focusOptions: FocusSelector[] = [
  {
    id: 'board-only',
    label: 'Board Only',
    description: 'Focus on Board exams with strong NCERT coverage',
    courseType: 'board-only',
  },
  {
    id: 'neet',
    label: 'NEET Only',
    description: 'Dedicated NEET preparation with competitive exam focus',
    courseType: 'neet',
  },
  {
    id: 'board-neet',
    label: 'Board + NEET',
    description: 'Complete preparation for both Board exams and NEET',
    courseType: 'board-neet',
  },
]

export const tierOptions: TierSelector[] = [
  {
    id: 'pinnacle',
    label: 'Pinnacle',
    batchSize: '10-12 students',
    hours: '10-12 hrs/week',
    priceRange: '98,000 - 1,56,000',
    badge: 'Premium',
    tierLevel: 'pinnacle',
  },
  {
    id: 'ascent',
    label: 'Ascent',
    batchSize: '16-18 students',
    hours: '8 hrs/week',
    priceRange: '76,000 - 90,000',
    badge: 'Most Popular',
    tierLevel: 'ascent',
  },
  {
    id: 'intensive',
    label: 'Intensive',
    batchSize: '8-10 students',
    hours: 'Personalized',
    priceRange: '3,60,000',
    badge: 'Elite',
    isHidden: true,
  },
  {
    id: 'pursuit',
    label: 'Pursuit',
    batchSize: '30-40 students',
    hours: '6 hrs/week',
    priceRange: '48,000 - 75,000',
    tierLevel: 'pursuit',
  },
]

export const batchOptions: BatchSelector[] = [
  {
    id: 'weekday',
    label: 'Weekday',
    schedule: 'Mon-Fri classes, ideal for regular school students',
  },
  {
    id: 'weekend',
    label: 'Weekend',
    schedule: 'Sat-Sun intensive sessions for busy schedules',
  },
]

export const modeOptions: ModeSelector[] = [
  {
    id: 'online',
    label: 'Online',
    description: 'Live interactive classes from anywhere in India',
  },
  {
    id: 'offline',
    label: 'Offline',
    description: 'In-person classes at our centers in Delhi-NCR',
  },
]

export const locationOptions: LocationSelector[] = [
  {
    id: 'south-extension',
    label: 'South Extension',
    address: 'Block D, South Extension Part 2, New Delhi - 110049',
  },
  {
    id: 'gurugram',
    label: 'Gurugram',
    address: 'Unit 17, M2K Corporate Park, Sector 51, Gurugram - 122018',
  },
  {
    id: 'rohini',
    label: 'Rohini',
    address: '211 Vikas Surya Tower, DC Chowk, Sector 9, Rohini - 110085',
  },
  {
    id: 'faridabad',
    label: 'Faridabad',
    address: 'Sector 17, Faridabad, Haryana - 121002',
  },
]

export const subjects: SubjectCard[] = [
  {
    name: 'Biology',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    weightage: '50%',
    questions: 90,
    description:
      'Biology carries the highest weightage in NEET — 90 out of 180 questions. Our curriculum covers Botany and Zoology comprehensively with NCERT-first approach, AIIMS PYQs, and diagram-based learning that ensures conceptual clarity and exam-readiness.',
    topics: [
      'Cell Biology',
      'Genetics & Evolution',
      'Human Physiology',
      'Plant Physiology',
      'Ecology & Environment',
      'Biotechnology',
      'Animal Kingdom',
      'Plant Kingdom',
    ],
    whyItMatters:
      'Scoring 340+ in Biology alone can secure a government medical seat. Our AIIMS & IITians faculties ensure you master every chapter.',
  },
  {
    name: 'Physics',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    weightage: '25%',
    questions: 45,
    description:
      'Physics in NEET tests conceptual understanding and numerical problem-solving. Our teaching focuses on building strong fundamentals in Mechanics, Optics, and Modern Physics — the three most tested areas — with 5,000+ practice problems and shortcut techniques.',
    topics: [
      'Mechanics',
      'Thermodynamics',
      'Optics',
      'Modern Physics',
      'Electrostatics',
      'Current Electricity',
      'Magnetism',
      'Waves',
    ],
    whyItMatters:
      'Physics is the differentiator between 600+ and 680+ scores. Our structured problem-solving approach makes Physics scoring.',
  },
  {
    name: 'Chemistry',
    color: 'text-purple-700',
    bgColor: 'bg-purple-50',
    weightage: '25%',
    questions: 45,
    description:
      'NEET Chemistry spans Physical, Organic, and Inorganic — all three equally important. Our methodology combines reaction mechanisms, numerical practice, and smart memorization techniques to help students score 160+ in Chemistry consistently.',
    topics: [
      'Organic Chemistry',
      'Inorganic Chemistry',
      'Physical Chemistry',
      'Chemical Bonding',
      'Coordination Compounds',
      'Electrochemistry',
      'Biomolecules',
      'Polymers',
    ],
    whyItMatters:
      'Chemistry is the easiest to score in NEET if prepared strategically. Our chapter-wise approach ensures no topic is left behind.',
  },
]

export const successStats = [
  { label: 'Students Coached', value: '2000+', color: 'text-yellow-400' },
  { label: 'Success Rate', value: '98%', color: 'text-green-400' },
  { label: 'Top NEET Score', value: '695/720', color: 'text-blue-400' },
  { label: 'Google Rating', value: '4.9/5', color: 'text-orange-400' },
]

export const comparisonData = {
  headers: ['Feature', 'Cerebrum', 'Allen', 'Aakash'],
  rows: [
    ['Batch Size', '10-18 students', '80-150 students', '60-120 students'],
    ['Price/Month', 'From Rs 4,000', 'Rs 8,000-15,000', 'Rs 7,000-12,000'],
    ['Faculty', 'AIIMS & IITians', 'Mixed', 'Mixed'],
    ['Success Rate', '98%', '~60%', '~55%'],
    ['Personal Attention', 'Guaranteed', 'Limited', 'Limited'],
    ['Doubt Resolution', 'Same Day', '2-3 Days', '2-3 Days'],
    ['Parent Updates', 'Weekly', 'Monthly', 'Monthly'],
    ['Study Material', 'NCERT + PYQs + Custom', 'Module Based', 'Module Based'],
  ],
}

export const faqs: FAQItem[] = [
  {
    question: 'What are the fees for NEET coaching at Cerebrum Biology Academy?',
    answer:
      'Our fees range from Rs 48,000 to Rs 1,56,000 per year depending on the course tier. Pursuit (Rs 48,000-75,000) offers quality coaching at affordable prices, Ascent (Rs 76,000-90,000) is our most popular tier with 16-18 student batches, and Pinnacle (Rs 98,000-1,56,000) provides premium 10-12 student batches with personal mentorship. EMI options are available.',
  },
  {
    question: 'What is the difference between Pinnacle, Ascent, and Pursuit tiers?',
    answer:
      'The tiers differ in batch size and features. Pinnacle (10-12 students) includes personal mentorship from Dr. Shekhar, 1-on-1 doubt sessions, and money-back guarantee. Ascent (16-18 students) offers small-group learning with regular doubt sessions. Pursuit (30-40 students) provides quality teaching by AIIMS & IITians faculties at affordable prices. All tiers cover the complete NEET syllabus.',
  },
  {
    question: 'Do you have a special batch for NEET droppers/repeaters?',
    answer:
      'Yes! Our Dropper Batch is specifically designed for NEET repeaters with complete 11th + 12th revision in one year. It includes intensive daily classes, 50+ mock tests, personal mentorship, and exam psychology sessions. The batch focuses exclusively on NEET preparation without board exam distractions.',
  },
  {
    question: 'Is online coaching as effective as offline?',
    answer:
      'Our online classes are live and interactive — not recorded. Students can ask questions in real-time, participate in live polls, and get the same faculty as offline batches. We use advanced tools for whiteboard-style teaching, and all sessions are recorded for revision. Many of our toppers have been online students.',
  },
  {
    question: 'Can I attend a free demo class before enrolling?',
    answer:
      'Absolutely! We offer a free demo class with no commitment. You can experience our teaching methodology, interact with faculty, and understand the course structure. Book a demo through WhatsApp or our website, and we will schedule it within 24-48 hours.',
  },
  {
    question: 'What results has Cerebrum achieved in NEET?',
    answer:
      'Our top student scored 695/720 in NEET (100th percentile). We have a 98% success rate with 2000+ students coached. Multiple students have secured seats in AIIMS Delhi, LHMC, Maulana Azad, and other top government medical colleges. Visit our Success Stories page for detailed results.',
  },
  {
    question: 'Do you offer EMI or installment payment options?',
    answer:
      'Yes, we offer flexible payment options. You can pay in lump sum (best price), 2 installments, or 3 installments. The installment plans have a nominal additional charge. Contact us for details on specific tier pricing with installments.',
  },
  {
    question: 'Is there a refund policy?',
    answer:
      'Our Pinnacle tier comes with a money-back guarantee. For other tiers, we offer a refund within the first 7 days if you are not satisfied with the teaching quality. We are confident in our methodology and encourage students to try the demo class before deciding.',
  },
  {
    question: 'What subjects do you cover for NEET coaching?',
    answer:
      'We cover all three NEET subjects: Biology (Botany + Zoology), Physics, and Chemistry. Biology gets special emphasis as it carries 50% weightage (90 out of 180 questions). Each subject is taught by specialized AIIMS & IITians faculties with subject-specific strategies.',
  },
  {
    question: 'Where are your offline coaching centers located?',
    answer:
      'We have 4 centers in Delhi-NCR: South Extension (Flagship), Rohini, Gurugram (Sector 51), and Faridabad (Sector 17). All centers are well-connected by metro and have modern classroom facilities. Online classes are available for students across India.',
  },
  {
    question: 'What is the Intensive Program?',
    answer:
      'The Cerebrum Intensive Program (Rs 3,60,000) is our elite offering with ultra-personalized coaching for 8-10 students. It includes daily progress tracking, weekly strategy sessions with Dr. Shekhar, dedicated mentor assignment, and a task management system. This tier is available after a demo class to ensure the right fit.',
  },
  {
    question: 'How do I enroll or get more information?',
    answer:
      'The easiest way is to message us on WhatsApp at +91 88264 44334. You can also call us directly, book a free demo class through our website, or visit any of our centers. Our counselors are available 7 days a week to help you choose the right course.',
  },
]

export function buildWhatsAppMessage(selections: {
  classLabel: string
  focusLabel: string
  tierLabel: string
  tierBatchSize: string
  batchLabel: string
  modeLabel: string
  locationLabel?: string
}): string {
  const lines = [
    'Hi! I am interested in NEET Coaching at Cerebrum Biology Academy.',
    '',
    'My selections:',
    `- Class: ${selections.classLabel}`,
    `- Focus: ${selections.focusLabel}`,
    `- Course Tier: ${selections.tierLabel} (${selections.tierBatchSize})`,
    `- Batch: ${selections.batchLabel}`,
    `- Mode: ${selections.modeLabel}`,
  ]

  if (selections.locationLabel) {
    lines.push(`- Location: ${selections.locationLabel}`)
  }

  lines.push('', 'Please share course details, batch timings, and fee structure.')

  return lines.join('\n')
}

export function getAvailableFocusOptions(classId: NeetClassOption): FocusOption[] {
  if (classId === 'dropper') return ['neet']
  if (classId === 'class-11') return ['neet', 'board-neet']
  return ['board-only', 'neet', 'board-neet']
}

export function mapClassToLevel(classId: NeetClassOption): ClassLevel {
  const map: Record<NeetClassOption, ClassLevel> = {
    'class-11': 'class-11',
    'class-12': 'class-12',
    dropper: 'dropper',
  }
  return map[classId]
}

export function mapFocusToCourseType(focusId: FocusOption): CourseType {
  const map: Record<FocusOption, CourseType> = {
    'board-only': 'board-only',
    neet: 'neet',
    'board-neet': 'board-neet',
  }
  return map[focusId]
}
