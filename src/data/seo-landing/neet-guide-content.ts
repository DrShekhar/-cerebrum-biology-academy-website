// NEET Reference/Guide SEO Landing Pages Content
// 12 pages targeting NEET syllabus, eligibility, exam pattern, and preparation keywords

import { SEOLandingContent } from './types'

// Common contact buttons for NEET guide pages
const defaultContactButtons = {
  phone: '+918826444334',
  whatsapp: {
    number: '+918826444334',
    message: 'Hi Dr. Shekhar, I need guidance for NEET preparation. Please help me.',
  },
}

// NEET Syllabus 2025 Page
const neetSyllabus2025: SEOLandingContent = {
  slug: 'neet-syllabus-2025',
  classLevel: 'universal',

  title: 'NEET Syllabus 2025 | Complete Syllabus Guide',
  metaDescription:
    'Complete NEET 2025 syllabus for Physics, Chemistry & Biology. Chapter-wise weightage, important topics & prep strategy. NTA updated.',
  keywords: [
    'neet syllabus 2024',
    'neet syllabus 2025',
    'neet ka syllabus',
    'neet syllabus pdf',
    'neet ug syllabus',
    'nta neet syllabus',
    'neet syllabus class 11',
    'neet syllabus class 12',
    'neet biology syllabus',
    'neet physics chemistry syllabus',
  ],

  hero: {
    headline: 'Complete NEET 2025 Syllabus Guide',
    subheadline:
      'Master the entire NEET syllabus with chapter-wise weightage analysis, important topics, and expert preparation strategies for 700+ scores.',
    highlightedText: '2025',
    ctaText: 'Get Syllabus PDF',
    ctaLink: '/resources',
    backgroundGradient: 'from-indigo-900 to-indigo-800',
  },

  painPoints: {
    title: 'Understanding the NEET Syllabus',
    points: [
      {
        icon: 'book',
        question: 'Overwhelmed by the vast NEET syllabus?',
        solution:
          'We break down the entire syllabus into high-yield and moderate-yield topics so you know exactly where to focus your efforts.',
      },
      {
        icon: 'target',
        question: 'Not sure which chapters are most important?',
        solution:
          'Our chapter-wise weightage analysis shows you which topics appear most frequently in NEET exams based on 10+ years of papers.',
      },
      {
        icon: 'calendar',
        question: 'Struggling to cover the entire syllabus in time?',
        solution:
          'Our structured study plans help you cover all topics systematically with time allocated based on importance and difficulty.',
      },
    ],
  },

  benefits: {
    title: 'What You Will Learn Here',
    subtitle: 'Complete syllabus breakdown and strategy',
    items: [
      {
        icon: 'book',
        title: 'Complete Subject-wise Syllabus',
        description:
          'Detailed syllabus for Physics (45 questions), Chemistry (45 questions), and Biology (90 questions).',
      },
      {
        icon: 'chart',
        title: 'Chapter-wise Weightage',
        description:
          'Historical analysis showing how many questions typically come from each chapter in NEET exams.',
      },
      {
        icon: 'star',
        title: 'High-Yield Topics',
        description:
          'Identification of topics that contribute maximum marks and should be prioritized during preparation.',
      },
      {
        icon: 'link',
        title: 'NCERT Alignment',
        description:
          'Clear mapping between NEET syllabus and NCERT textbook chapters for focused study.',
      },
      {
        icon: 'lightbulb',
        title: 'Preparation Strategy',
        description:
          'Expert tips on how to approach syllabus completion based on your available time and current level.',
      },
      {
        icon: 'download',
        title: 'Downloadable Resources',
        description:
          'PDF syllabus, chapter checklists, and study planners to track your preparation progress.',
      },
    ],
  },

  stats: [
    { value: '180', label: 'Total Questions', icon: 'clipboard' },
    { value: '720', label: 'Maximum Marks', icon: 'trophy' },
    { value: '97', label: 'NCERT Chapters', icon: 'book' },
    { value: '3:20', label: 'Exam Duration (hrs)', icon: 'clock' },
  ],

  testimonials: [
    {
      name: 'Priya S.',
      achievement: 'NEET 2024 - 685/720',
      quote:
        'Understanding the syllabus weightage changed my preparation completely. I focused on high-yield topics and it paid off with 685 marks!',
      score: '685/720',
    },
    {
      name: 'Rahul M.',
      achievement: 'NEET 2024 - 650/720',
      quote:
        'The chapter-wise breakdown helped me create a realistic study plan. I knew exactly what to study and when.',
      score: '650/720',
    },
  ],

  faqs: [
    {
      question: 'What is the NEET 2025 syllabus based on?',
      answer:
        'NEET 2025 syllabus is based on Class 11 and 12 NCERT textbooks for Physics, Chemistry, and Biology. NTA follows the NCERT curriculum, making these textbooks the primary source for NEET preparation.',
    },
    {
      question: 'Has the NEET syllabus changed for 2025?',
      answer:
        'NTA typically announces any syllabus changes in the official notification. As of now, the NEET 2025 syllabus is expected to remain similar to previous years. We update this page immediately when any changes are announced.',
    },
    {
      question: 'Which subject has the highest weightage in NEET?',
      answer:
        'Biology has the highest weightage with 90 questions (360 marks) - 45 from Botany and 45 from Zoology. Physics and Chemistry have 45 questions each (180 marks each). Total: 180 questions, 720 marks.',
    },
    {
      question: 'How many chapters are there in NEET syllabus?',
      answer:
        'The complete NEET syllabus covers approximately 97 chapters from Class 11 and 12 NCERT: 38 chapters in Biology (19 Botany + 19 Zoology), 29 chapters in Physics, and 30 chapters in Chemistry.',
    },
    {
      question: 'What are the most important chapters for NEET Biology?',
      answer:
        'High-yield Biology chapters include: Human Physiology, Genetics & Evolution, Cell Biology, Plant Physiology, Ecology, and Biotechnology. These topics together contribute approximately 60-70% of Biology questions.',
    },
  ],

  courseSummary: {
    title: 'NEET Biology Mastery Course',
    duration: '12 months comprehensive',
    batchSize: 'Small batches (10-15 students)',
    features: [
      'Complete NCERT coverage',
      'Chapter-wise test series',
      'Previous year question analysis',
      'High-yield topic focus',
      'Revision modules included',
      'Doubt solving sessions',
    ],
    price: {
      original: 75000,
      discounted: 45000,
      emi: 'EMI from Rs. 3,750/month',
    },
  },

  cta: {
    title: 'Master the Complete NEET Syllabus',
    subtitle: 'Join our comprehensive program designed around the complete NEET syllabus',
    primaryButton: {
      text: 'Enroll Now',
      link: '/courses',
    },
    secondaryButton: {
      text: 'Book Free Demo',
      link: '/book-demo',
    },
    tertiaryButton: {
      text: 'Download Syllabus PDF',
      link: '/resources',
    },
  },

  relatedPages: [
    { title: 'NEET Biology Syllabus', link: '/neet-biology-syllabus-2025' },
    { title: 'NEET Exam Pattern', link: '/neet-exam-pattern-2025' },
    { title: 'NEET Preparation Guide', link: '/neet-preparation-guide' },
  ],

  contactButtons: defaultContactButtons,

  schema: {
    '@type': 'Course',
    courseName: 'NEET 2025 Syllabus Guide',
    provider: 'Cerebrum Biology Academy',
    description:
      'Complete NEET 2025 syllabus for Physics, Chemistry, and Biology with chapter-wise weightage and preparation strategies.',
    duration: '12 months',
    price: 45000,
    priceCurrency: 'INR',
  },
}

// NEET Eligibility Criteria Page
const neetEligibilityCriteria: SEOLandingContent = {
  slug: 'neet-eligibility-criteria',
  classLevel: 'universal',

  title: 'NEET Eligibility 2025 | Age & Qualification Guide',
  metaDescription:
    'Complete NEET 2025 eligibility criteria - age limit, educational qualification, number of attempts, category-wise requirements. Check if you qualify for NEET.',
  keywords: [
    'eligibility for neet',
    'eligibility for neet exam',
    'neet eligibility criteria',
    'neet age limit',
    'neet qualification',
    'neet attempts limit',
    'neet eligibility 2025',
    'who can give neet exam',
    'neet criteria',
  ],

  hero: {
    headline: 'NEET 2025 Eligibility Criteria',
    subheadline:
      'Complete guide to NEET eligibility including age limits, educational qualifications, number of attempts, and category-wise requirements.',
    highlightedText: 'Eligibility',
    ctaText: 'Check Your Eligibility',
    ctaLink: '/book-demo',
    backgroundGradient: 'from-green-900 via-green-800 to-cyan-900',
  },

  painPoints: {
    title: 'Common Eligibility Questions',
    points: [
      {
        icon: 'user',
        question: 'Am I eligible to appear for NEET?',
        solution:
          'We provide clear, updated eligibility criteria based on NTA guidelines so you know exactly if you qualify.',
      },
      {
        icon: 'calendar',
        question: 'What is the age limit for NEET 2025?',
        solution:
          'Get clarity on minimum and maximum age requirements, including relaxations for reserved categories.',
      },
      {
        icon: 'file',
        question: 'Which subjects and marks are required in Class 12?',
        solution:
          'Understand the exact educational qualifications and minimum percentage requirements for NEET eligibility.',
      },
    ],
  },

  benefits: {
    title: 'Eligibility Information Covered',
    subtitle: 'Everything you need to know',
    items: [
      {
        icon: 'calendar',
        title: 'Age Criteria',
        description:
          'Minimum 17 years as of admission year. Upper age limit has been removed by Supreme Court order.',
      },
      {
        icon: 'book',
        title: 'Educational Qualification',
        description:
          'Must have passed Class 12 with Physics, Chemistry, Biology/Biotechnology, and English from a recognized board.',
      },
      {
        icon: 'percent',
        title: 'Minimum Marks',
        description:
          'General: 50% aggregate in PCB, OBC/SC/ST: 40%, PwD: 45% in Physics, Chemistry, and Biology.',
      },
      {
        icon: 'refresh',
        title: 'Number of Attempts',
        description:
          'No limit on the number of attempts. You can appear for NEET as many times as you want.',
      },
      {
        icon: 'globe',
        title: 'Nationality',
        description:
          'Indian nationals, NRIs, OCIs, PIOs, and foreign nationals are eligible with specific conditions.',
      },
      {
        icon: 'shield',
        title: 'Category Benefits',
        description:
          'Reserved categories (SC/ST/OBC) have relaxed eligibility criteria and age limits.',
      },
    ],
  },

  stats: [
    { value: '17+', label: 'Minimum Age', icon: 'user' },
    { value: 'No', label: 'Upper Age Limit', icon: 'check' },
    { value: '50%', label: 'Min. PCB (General)', icon: 'percent' },
    { value: 'Unlimited', label: 'Attempts Allowed', icon: 'refresh' },
  ],

  testimonials: [
    {
      name: 'Amit K.',
      achievement: 'NEET 2024 Qualifier',
      quote:
        'I was confused about eligibility after appearing twice. This guide clarified that there is no attempt limit and I could keep trying!',
      score: 'Qualified',
    },
    {
      name: 'Parent of Sneha R.',
      achievement: 'NEET Aspirant',
      quote:
        'As parents, we had many questions about eligibility. The clear explanation helped us understand everything before registering.',
    },
  ],

  faqs: [
    {
      question: 'What is the minimum age to appear for NEET 2025?',
      answer:
        'Candidates must be at least 17 years old as on December 31 of the year of admission. So for NEET 2025 (admission in 2025-26), you must turn 17 by December 31, 2025.',
    },
    {
      question: 'Is there an upper age limit for NEET?',
      answer:
        'No, the Supreme Court has removed the upper age limit for NEET. There is no maximum age restriction, and candidates of any age above 17 can appear for NEET.',
    },
    {
      question: 'How many times can I attempt NEET?',
      answer:
        'There is no limit on the number of attempts for NEET. You can appear for the exam as many times as you want until you qualify and secure admission.',
    },
    {
      question: 'Can I appear for NEET if I am appearing for Class 12 exams?',
      answer:
        'Yes, students appearing for Class 12 board exams in the current year are eligible to appear for NEET. However, admission is subject to passing Class 12 with required marks.',
    },
    {
      question: 'Is Biology mandatory for NEET eligibility?',
      answer:
        'Yes, Biology/Biotechnology is mandatory. You must have studied Physics, Chemistry, and Biology/Biotechnology in Class 11 and 12 from a recognized educational board.',
    },
    {
      question: 'Can NRI students appear for NEET?',
      answer:
        'Yes, NRI students, OCIs, PIOs, and foreign nationals can appear for NEET. They need to meet the same eligibility criteria regarding age and qualifications. NRI quota seats are available in many medical colleges.',
    },
  ],

  courseSummary: {
    title: 'NEET Preparation Course',
    duration: 'Flexible (1-2 years)',
    batchSize: 'Small batches',
    features: [
      'Complete syllabus coverage',
      'Expert faculty guidance',
      'Regular mock tests',
      'Doubt clearing sessions',
      'Performance tracking',
      'Admission counseling',
    ],
    price: {
      original: 75000,
      discounted: 45000,
      emi: 'EMI from Rs. 3,750/month',
    },
  },

  cta: {
    title: 'Start Your NEET Preparation Journey',
    subtitle: 'Now that you know you are eligible, begin your preparation with expert guidance',
    primaryButton: {
      text: 'Enroll Now',
      link: '/courses',
    },
    secondaryButton: {
      text: 'Book Free Counseling',
      link: '/book-demo',
    },
    tertiaryButton: {
      text: 'Free Study Material',
      link: '/resources',
    },
  },

  relatedPages: [
    { title: 'NEET Syllabus 2025', link: '/neet-syllabus-2025' },
    { title: 'NEET Registration Guide', link: '/neet-registration-guide' },
    { title: 'NEET Exam Pattern', link: '/neet-exam-pattern-2025' },
  ],

  contactButtons: defaultContactButtons,

  schema: {
    '@type': 'Course',
    courseName: 'NEET Eligibility Guide',
    provider: 'Cerebrum Biology Academy',
    description:
      'Complete guide to NEET 2025 eligibility criteria including age limits, educational qualifications, and attempt restrictions.',
    duration: 'Reference Guide',
    price: 0,
    priceCurrency: 'INR',
  },
}

// NEET Exam Pattern 2025 Page
const neetExamPattern2025: SEOLandingContent = {
  slug: 'neet-exam-pattern-2025',
  classLevel: 'universal',

  title: 'NEET Exam Pattern 2025 | Marking & Questions',
  metaDescription:
    'NEET 2025 exam pattern - questions, marking scheme, negative marking, duration & subject distribution. Prepare smartly for NEET.',
  keywords: [
    'neet exam pattern',
    'neet question pattern',
    'neet marking scheme',
    'neet exam format',
    'neet 2025 pattern',
    'neet negative marking',
    'neet total marks',
    'neet questions',
    'neet paper pattern',
  ],

  hero: {
    headline: 'NEET 2025 Exam Pattern Decoded',
    subheadline:
      'Understand the complete exam structure - questions, marks, duration, and strategic approach to maximize your score in NEET 2025.',
    highlightedText: 'Decoded',
    ctaText: 'Get Exam Strategy',
    ctaLink: '/book-demo',
    backgroundGradient: 'from-purple-900 via-violet-900 to-indigo-900',
  },

  painPoints: {
    title: 'Master the Exam Structure',
    points: [
      {
        icon: 'clipboard',
        question: 'Confused about the new NEET pattern?',
        solution:
          'We explain the current pattern clearly - 200 questions with choice, 180 to attempt, and how to strategically select questions.',
      },
      {
        icon: 'calculator',
        question: 'Worried about negative marking?',
        solution:
          'Learn when to attempt, when to skip, and how to use the internal choice to your advantage.',
      },
      {
        icon: 'clock',
        question: 'Struggling with time management?',
        solution:
          'Get expert strategies for allocating your 3 hours 20 minutes across subjects for maximum marks.',
      },
    ],
  },

  benefits: {
    title: 'NEET 2025 Pattern Overview',
    subtitle: 'Everything you need to know',
    items: [
      {
        icon: 'file',
        title: '200 Total Questions',
        description:
          'Physics (50), Chemistry (50), Botany (50), Zoology (50) - divided into Section A and Section B.',
      },
      {
        icon: 'check',
        title: 'Answer 180 Questions',
        description:
          'Each subject: 35 mandatory (Section A) + 10 out of 15 choice (Section B) = 45 questions per subject.',
      },
      {
        icon: 'trophy',
        title: '720 Maximum Marks',
        description: '+4 for correct answer, -1 for incorrect. Unattempted questions: 0 marks.',
      },
      {
        icon: 'clock',
        title: '3 Hours 20 Minutes',
        description:
          'Total exam duration with no subject-wise time limit. Manage time strategically.',
      },
      {
        icon: 'edit',
        title: 'OMR-Based',
        description:
          'Answers marked on OMR sheet using pen. Corrections allowed with white correction fluid.',
      },
      {
        icon: 'globe',
        title: 'Multiple Languages',
        description:
          'Available in English, Hindi, and 11 regional languages based on exam center state.',
      },
    ],
  },

  stats: [
    { value: '200', label: 'Total Questions', icon: 'file' },
    { value: '180', label: 'Questions to Attempt', icon: 'check' },
    { value: '720', label: 'Maximum Marks', icon: 'trophy' },
    { value: '3h 20m', label: 'Exam Duration', icon: 'clock' },
  ],

  testimonials: [
    {
      name: 'Kavya P.',
      achievement: 'NEET 2024 - 670/720',
      quote:
        'Understanding the pattern helped me use Section B choice strategically. I skipped tough questions and scored 670!',
      score: '670/720',
    },
    {
      name: 'Rohan S.',
      achievement: 'NEET 2024 - 640/720',
      quote:
        'Time management based on the pattern was key. I allocated 50 mins to Biology, 45 each to Physics and Chemistry.',
      score: '640/720',
    },
  ],

  faqs: [
    {
      question: 'How many questions are there in NEET 2025?',
      answer:
        'NEET 2025 has 200 total questions - 50 each in Physics, Chemistry, Botany, and Zoology. Each subject is divided into Section A (35 mandatory questions) and Section B (15 questions, attempt any 10). Total questions to attempt: 180.',
    },
    {
      question: 'What is the marking scheme for NEET 2025?',
      answer:
        'Each correct answer gets +4 marks, each incorrect answer gets -1 mark (negative marking), and unattempted questions get 0 marks. Maximum possible marks: 720 (180 questions x 4 marks).',
    },
    {
      question: 'How should I manage time in NEET exam?',
      answer:
        'Total time is 3 hours 20 minutes (200 minutes). A common strategy: Biology (90 questions) - 90 minutes, Physics (45 questions) - 55 minutes, Chemistry (45 questions) - 55 minutes. Adjust based on your strengths.',
    },
    {
      question: 'What is Section A and Section B in NEET?',
      answer:
        'Section A contains 35 mandatory questions in each subject that you must attempt. Section B contains 15 questions in each subject but you only need to attempt 10 - this gives you choice to skip 5 difficult questions per subject.',
    },
    {
      question: 'Is there negative marking in NEET?',
      answer:
        'Yes, NEET has negative marking of -1 for each wrong answer. However, unattempted questions carry no penalty. Use the Section B choice strategically to avoid negative marking on unsure questions.',
    },
  ],

  courseSummary: {
    title: 'NEET Test Series',
    duration: '6 months intensive',
    batchSize: 'Unlimited (online)',
    features: [
      'NTA pattern mock tests',
      'Detailed performance analysis',
      'Section-wise strategy',
      'Time management practice',
      'All India ranking',
      'Solutions with explanation',
    ],
    price: {
      original: 15000,
      discounted: 9999,
      emi: 'EMI from Rs. 1,667/month',
    },
  },

  cta: {
    title: 'Practice with Real NEET Pattern',
    subtitle: 'Join our test series designed exactly as per NEET 2025 pattern',
    primaryButton: {
      text: 'Join Test Series',
      link: '/courses',
    },
    secondaryButton: {
      text: 'Free Mock Test',
      link: '/book-demo',
    },
    tertiaryButton: {
      text: 'Sample Papers',
      link: '/resources',
    },
  },

  relatedPages: [
    { title: 'NEET Syllabus 2025', link: '/neet-syllabus-2025' },
    { title: 'NEET Preparation Guide', link: '/neet-preparation-guide' },
    { title: 'NEET Biology Syllabus', link: '/neet-biology-syllabus-2025' },
  ],

  contactButtons: defaultContactButtons,

  schema: {
    '@type': 'Course',
    courseName: 'NEET Exam Pattern Guide',
    provider: 'Cerebrum Biology Academy',
    description:
      'Complete NEET 2025 exam pattern including number of questions, marking scheme, duration, and strategic preparation tips.',
    duration: 'Reference Guide',
    price: 0,
    priceCurrency: 'INR',
  },
}

// NEET Counselling Guide Page
const neetCounsellingGuide: SEOLandingContent = {
  slug: 'neet-counselling-guide',
  classLevel: 'universal',

  title: 'NEET Counselling 2025 | MCC & State Process',
  metaDescription:
    'Complete NEET 2025 counselling guide - MCC counselling process, state counselling, document verification, seat allotment, and admission process explained.',
  keywords: [
    'neet counselling',
    'neet counselling 2025',
    'mcc neet counselling',
    'up neet counselling',
    'neet counselling process',
    'neet seat allotment',
    'neet admission',
    'neet counselling documents',
    'state neet counselling',
  ],

  hero: {
    headline: 'Navigate NEET Counselling Successfully',
    subheadline:
      'Complete guide to MCC and state counselling processes, document requirements, choice filling, and seat allotment for MBBS/BDS admission.',
    highlightedText: 'Successfully',
    ctaText: 'Get Counselling Support',
    ctaLink: '/book-demo',
    backgroundGradient: 'from-orange-900 via-yellow-900 to-yellow-900',
  },

  painPoints: {
    title: 'Counselling Challenges We Help With',
    points: [
      {
        icon: 'layers',
        question: 'Confused by MCC vs State counselling?',
        solution:
          'We explain both processes clearly - when to apply where, and how to maximize your chances of getting your preferred college.',
      },
      {
        icon: 'file',
        question: 'Not sure which documents are needed?',
        solution:
          'Complete checklist of documents required for counselling with guidance on how to obtain each one.',
      },
      {
        icon: 'shuffle',
        question: 'Struggling with choice filling strategy?',
        solution:
          'Expert guidance on how to fill college choices based on your rank, category, and preferences for best seat allotment.',
      },
    ],
  },

  benefits: {
    title: 'Counselling Process Explained',
    subtitle: 'Step-by-step guidance',
    items: [
      {
        icon: 'building',
        title: 'MCC Counselling',
        description:
          'For All India Quota (15% seats), Central Universities, Deemed Universities, ESIC, and AFMC seats.',
      },
      {
        icon: 'map',
        title: 'State Counselling',
        description:
          'For State Quota (85% seats) in government and private medical colleges within your state.',
      },
      {
        icon: 'layers',
        title: 'Multiple Rounds',
        description:
          'Understanding Round 1, Round 2, Mop-up, and Stray Vacancy rounds for maximum opportunities.',
      },
      {
        icon: 'file',
        title: 'Document Verification',
        description: 'Complete document checklist and verification process at designated centers.',
      },
      {
        icon: 'list',
        title: 'Choice Filling',
        description:
          'Strategy for filling college preferences based on your rank and category for optimal allotment.',
      },
      {
        icon: 'check',
        title: 'Seat Acceptance',
        description: 'Fee payment, reporting to college, and joining process after seat allotment.',
      },
    ],
  },

  stats: [
    { value: '15%', label: 'All India Quota', icon: 'percent' },
    { value: '85%', label: 'State Quota', icon: 'map' },
    { value: '4+', label: 'Counselling Rounds', icon: 'refresh' },
    { value: '100K+', label: 'MBBS Seats', icon: 'building' },
  ],

  testimonials: [
    {
      name: 'Ananya M.',
      achievement: 'Got Government Medical College',
      quote:
        'The counselling guidance was invaluable. I understood the choice filling strategy and got my preferred state government college!',
      score: 'MBBS Admission',
    },
    {
      name: 'Parent of Vikram S.',
      achievement: 'AIIMS Admission',
      quote:
        'We were completely lost with MCC counselling. The step-by-step guidance helped Vikram secure AIIMS Patna admission.',
      score: 'AIIMS',
    },
  ],

  faqs: [
    {
      question: 'What is the difference between MCC and State counselling?',
      answer:
        'MCC (Medical Counselling Committee) conducts counselling for 15% All India Quota seats, Central/Deemed Universities, and ESI/AFMC. State counselling is for 85% state quota seats and is conducted by respective state authorities.',
    },
    {
      question: 'Can I participate in both MCC and State counselling?',
      answer:
        'Yes, you can register for both MCC and State counselling simultaneously to maximize your chances. However, if you accept a seat in MCC Round 1 or 2, you cannot participate in further state counselling.',
    },
    {
      question: 'What documents are required for NEET counselling?',
      answer:
        'Key documents include: NEET scorecard, Class 10 & 12 marksheets and certificates, category certificate (if applicable), domicile certificate, passport photos, ID proof, and medical fitness certificate. State counselling may require additional state-specific documents.',
    },
    {
      question: 'How does choice filling work in NEET counselling?',
      answer:
        'You fill preferences of colleges and courses in order of priority. Seats are allotted based on your rank and choices. Strategy involves balancing between preferred colleges (that you might get) and safe options (that you will definitely get).',
    },
    {
      question: 'What happens if I dont get a seat in counselling?',
      answer:
        'Multiple rounds provide opportunities. After main rounds, there are Mop-up and Stray Vacancy rounds. You can also consider private colleges, deemed universities, or prepare for next year NEET.',
    },
  ],

  courseSummary: {
    title: 'NEET Counselling Support',
    duration: 'Counselling period (2-3 months)',
    batchSize: '1-on-1 guidance',
    features: [
      'College selection guidance',
      'Choice filling strategy',
      'Document verification help',
      'Real-time updates',
      'Query resolution',
      'Round-by-round support',
    ],
    price: {
      original: 15000,
      discounted: 9999,
      emi: 'One-time fee',
    },
  },

  cta: {
    title: 'Get Expert Counselling Guidance',
    subtitle: 'Navigate NEET counselling with confidence and secure your dream college',
    primaryButton: {
      text: 'Book Counselling Session',
      link: '/book-demo',
    },
    secondaryButton: {
      text: 'Counselling Updates',
      link: '/resources',
    },
    tertiaryButton: {
      text: 'Free College Predictor',
      link: '/resources',
    },
  },

  relatedPages: [
    { title: 'NEET Result Analysis', link: '/neet-result-analysis' },
    { title: 'NEET Eligibility Criteria', link: '/neet-eligibility-criteria' },
    { title: 'NEET Official Resources', link: '/neet-official-resources' },
  ],

  contactButtons: defaultContactButtons,

  schema: {
    '@type': 'Course',
    courseName: 'NEET Counselling Guide',
    provider: 'Cerebrum Biology Academy',
    description:
      'Complete NEET counselling guide for MCC and state counselling with document requirements, choice filling, and admission process.',
    duration: '2-3 months',
    price: 9999,
    priceCurrency: 'INR',
  },
}

// NEET Biology Syllabus 2025 Page
const neetBiologySyllabus2025: SEOLandingContent = {
  slug: 'neet-biology-syllabus-2025',
  classLevel: 'universal',

  title: 'NEET Biology Syllabus 2025 | Botany & Zoology',
  metaDescription:
    'Complete NEET 2025 Biology syllabus for Botany and Zoology. Chapter-wise weightage, important topics, NCERT alignment & preparation strategy for 360 marks.',
  keywords: [
    'neet biology syllabus',
    'neet bio syllabus',
    'biology syllabus for neet',
    'neet biology chapters',
    'neet botany syllabus',
    'neet zoology syllabus',
    'neet biology topics',
    'neet biology 2025',
  ],

  hero: {
    headline: 'Complete NEET Biology Syllabus 2025',
    subheadline:
      'Master all 38 chapters of Botany and Zoology with chapter-wise weightage analysis. Biology carries 360 marks - half of NEET total!',
    highlightedText: '360 Marks',
    ctaText: 'Get Biology Roadmap',
    ctaLink: '/resources',
    backgroundGradient: 'from-green-900 via-green-800 to-green-800',
  },

  painPoints: {
    title: 'Biology Syllabus Challenges',
    points: [
      {
        icon: 'book',
        question: 'Biology syllabus seems endless?',
        solution:
          'We categorize chapters by weightage - high, moderate, low yield - so you know where to invest maximum time.',
      },
      {
        icon: 'brain',
        question: 'Too much to memorize in Biology?',
        solution:
          'Our techniques convert memorization to understanding, making retention easier and concepts application-ready.',
      },
      {
        icon: 'target',
        question: 'Not sure which chapters are NEET-important?',
        solution:
          'We analyze 10+ years of NEET papers to identify the most frequently tested topics and question patterns.',
      },
    ],
  },

  benefits: {
    title: 'Biology Syllabus Breakdown',
    subtitle: '38 chapters across Botany and Zoology',
    items: [
      {
        icon: 'leaf',
        title: 'Botany (Class 11)',
        description:
          'Plant Kingdom, Morphology, Anatomy, Cell Biology, Biomolecules, Cell Cycle - 8 chapters.',
      },
      {
        icon: 'leaf',
        title: 'Botany (Class 12)',
        description:
          'Sexual Reproduction in Plants, Genetics, Molecular Biology, Biotechnology, Ecology - 11 chapters.',
      },
      {
        icon: 'heart',
        title: 'Zoology (Class 11)',
        description:
          'Animal Kingdom, Structural Organization, Biomolecules, Digestion, Breathing, Body Fluids - 9 chapters.',
      },
      {
        icon: 'heart',
        title: 'Zoology (Class 12)',
        description:
          'Reproduction, Genetics, Evolution, Human Health, Biotechnology Applications - 10 chapters.',
      },
      {
        icon: 'star',
        title: 'High-Yield Topics',
        description:
          'Human Physiology, Genetics, Plant Physiology, Ecology, Cell Biology contribute 60%+ marks.',
      },
      {
        icon: 'chart',
        title: 'Weightage Analysis',
        description:
          'Detailed analysis of marks distribution across chapters based on previous year papers.',
      },
    ],
  },

  stats: [
    { value: '90', label: 'Biology Questions', icon: 'clipboard' },
    { value: '360', label: 'Total Marks', icon: 'trophy' },
    { value: '38', label: 'Chapters', icon: 'book' },
    { value: '50%', label: 'Of NEET Paper', icon: 'percent' },
  ],

  testimonials: [
    {
      name: 'Shreya T.',
      achievement: 'Biology: 340/360',
      quote:
        'Focusing on high-yield chapters as per the syllabus analysis helped me score 340 in Biology. The weightage insights were spot-on!',
      score: '340/360',
    },
    {
      name: 'Aditya R.',
      achievement: 'Biology: 320/360',
      quote:
        'Understanding which chapters are more important saved me time. I scored 320 in Biology with smart preparation.',
      score: '320/360',
    },
  ],

  faqs: [
    {
      question: 'How many chapters are in NEET Biology syllabus?',
      answer:
        'NEET Biology syllabus has 38 chapters total - 19 from Botany (Class 11 + 12) and 19 from Zoology (Class 11 + 12). These are distributed across 5 units in Class 11 and 5 units in Class 12 NCERT textbooks.',
    },
    {
      question: 'Which are the most important chapters in NEET Biology?',
      answer:
        'High-yield chapters include: Human Physiology (6-7 chapters, ~50 marks), Genetics & Evolution (~40 marks), Plant Physiology (~30 marks), Ecology (~25 marks), Cell Biology (~25 marks), and Biotechnology (~20 marks).',
    },
    {
      question: 'Is NCERT enough for NEET Biology?',
      answer:
        'NCERT is the primary source for NEET Biology - approximately 95% of questions are directly or conceptually from NCERT. Read NCERT thoroughly line-by-line. You can supplement with reference books for additional practice questions.',
    },
    {
      question: 'How to study Biology for NEET effectively?',
      answer:
        'Strategy: 1) Read NCERT thoroughly and make notes, 2) Focus on high-yield chapters first, 3) Practice diagrams and labeling, 4) Solve previous year questions chapter-wise, 5) Regular revision to retain facts, 6) Take mock tests for application.',
    },
    {
      question: 'What is the difference between Botany and Zoology in NEET?',
      answer:
        'Both carry equal weightage - 45 questions (180 marks) each. Botany covers plant-related topics (Plant Kingdom, Morphology, Physiology, Genetics in plants). Zoology covers animal-related topics (Animal Kingdom, Human Physiology, Reproduction, Evolution).',
    },
  ],

  courseSummary: {
    title: 'NEET Biology Mastery',
    duration: '12 months comprehensive',
    batchSize: 'Small batches (10-15)',
    features: [
      'All 38 chapters covered',
      'NCERT line-by-line study',
      'High-yield topic focus',
      'Diagram practice sessions',
      'Chapter-wise tests',
      'Previous year analysis',
    ],
    price: {
      original: 45000,
      discounted: 35000,
      emi: 'EMI from Rs. 2,917/month',
    },
  },

  cta: {
    title: 'Master NEET Biology Completely',
    subtitle: 'Join our specialized Biology course designed for 300+ marks',
    primaryButton: {
      text: 'Enroll Now',
      link: '/courses',
    },
    secondaryButton: {
      text: 'Book Free Demo',
      link: '/book-demo',
    },
    tertiaryButton: {
      text: 'Free Biology Notes',
      link: '/resources',
    },
  },

  relatedPages: [
    { title: 'NEET Botany Syllabus', link: '/neet-botany-syllabus' },
    { title: 'NEET Zoology Syllabus', link: '/neet-zoology-syllabus' },
    { title: 'NEET Syllabus 2025', link: '/neet-syllabus-2025' },
  ],

  contactButtons: defaultContactButtons,

  schema: {
    '@type': 'Course',
    courseName: 'NEET Biology Syllabus Guide',
    provider: 'Cerebrum Biology Academy',
    description:
      'Complete NEET 2025 Biology syllabus covering all 38 chapters of Botany and Zoology with chapter-wise weightage analysis.',
    duration: '12 months',
    price: 35000,
    priceCurrency: 'INR',
  },
}

// NEET Botany Syllabus Page
const neetBotanySyllabus: SEOLandingContent = {
  slug: 'neet-botany-syllabus',
  classLevel: 'universal',

  title: 'NEET Botany Syllabus 2025 | Chapters & Weightage',
  metaDescription:
    'Complete NEET Botany syllabus for 2025 with all 19 chapters, weightage analysis, important topics & preparation strategy. Score 170+ in Botany section.',
  keywords: [
    'botany syllabus for neet',
    'neet botany syllabus',
    'neet botany chapters',
    'botany for neet',
    'neet botany topics',
    'plant biology neet',
    'neet botany 2025',
    'botany weightage neet',
  ],

  hero: {
    headline: 'NEET Botany Syllabus Made Simple',
    subheadline:
      'Master all 19 Botany chapters with clear weightage analysis. From Plant Kingdom to Ecology - score 170+ in NEET Botany section.',
    highlightedText: '170+',
    ctaText: 'Get Botany Roadmap',
    ctaLink: '/resources',
    backgroundGradient: 'from-lime-900 via-green-900 to-green-800',
  },

  painPoints: {
    title: 'Botany Preparation Challenges',
    points: [
      {
        icon: 'leaf',
        question: 'Finding Botany chapters boring and forgettable?',
        solution:
          'Our visual approach with diagrams, flowcharts, and animations makes plant biology engaging and memorable.',
      },
      {
        icon: 'layers',
        question: 'Confused between similar-sounding plant terms?',
        solution:
          'Comparative tables and mnemonics help distinguish between concepts like parenchyma, collenchyma, sclerenchyma.',
      },
      {
        icon: 'target',
        question: 'Not sure which Botany chapters to prioritize?',
        solution:
          'We show you exact weightage - Plant Physiology and Genetics are high-yield; some chapters have minimal questions.',
      },
    ],
  },

  benefits: {
    title: 'Botany Chapters Overview',
    subtitle: '19 chapters from Class 11 and 12',
    items: [
      {
        icon: 'book',
        title: 'Living World & Classification',
        description:
          'Taxonomy, Biological Classification, Plant Kingdom - foundation chapters with moderate weightage.',
      },
      {
        icon: 'leaf',
        title: 'Plant Structure',
        description:
          'Morphology of Flowering Plants, Anatomy of Flowering Plants - important for diagram-based questions.',
      },
      {
        icon: 'sun',
        title: 'Plant Physiology',
        description:
          'Transport, Mineral Nutrition, Photosynthesis, Respiration, Growth - HIGH YIELD (~40 marks).',
      },
      {
        icon: 'flower',
        title: 'Plant Reproduction',
        description:
          'Sexual Reproduction in Flowering Plants - important chapter with consistent questions every year.',
      },
      {
        icon: 'dna',
        title: 'Genetics & Molecular Biology',
        description:
          'Principles of Inheritance, Molecular Basis of Inheritance - HIGH YIELD from Botany perspective.',
      },
      {
        icon: 'globe',
        title: 'Ecology',
        description:
          'Organisms & Environment, Ecosystem, Biodiversity - moderate to high yield, conceptual questions.',
      },
    ],
  },

  stats: [
    { value: '45', label: 'Botany Questions', icon: 'clipboard' },
    { value: '180', label: 'Maximum Marks', icon: 'trophy' },
    { value: '19', label: 'Chapters', icon: 'book' },
    { value: '25%', label: 'Of NEET Paper', icon: 'percent' },
  ],

  testimonials: [
    {
      name: 'Meera K.',
      achievement: 'Botany: 168/180',
      quote:
        'I used to find Botany boring. The visual learning approach changed everything. Diagrams and comparative tables helped me score 168!',
      score: '168/180',
    },
    {
      name: 'Harsh V.',
      achievement: 'Botany: 160/180',
      quote:
        'Focusing on Plant Physiology and Genetics as per weightage helped me score well in Botany without getting lost in low-yield topics.',
      score: '160/180',
    },
  ],

  faqs: [
    {
      question: 'How many chapters are in NEET Botany syllabus?',
      answer:
        'NEET Botany has 19 chapters - 8 from Class 11 (Diversity, Structure, Cell Biology, Plant Physiology) and 11 from Class 12 (Reproduction, Genetics, Biotechnology, Ecology).',
    },
    {
      question: 'Which Botany chapters are most important for NEET?',
      answer:
        'High-yield Botany chapters: Plant Physiology (Transport, Photosynthesis, Respiration - ~30 marks), Genetics & Molecular Biology (~25 marks), Ecology (~20 marks), Sexual Reproduction in Plants (~10 marks).',
    },
    {
      question: 'Is Botany easier than Zoology in NEET?',
      answer:
        'Neither is inherently easier - it depends on individual preference. Botany has more diagram-based and classification questions, while Zoology focuses on human physiology. Many students find Zoology more relatable since its about human body.',
    },
    {
      question: 'How to remember Botany for NEET?',
      answer:
        'Tips: 1) Draw and label diagrams regularly, 2) Make comparative tables (e.g., C3 vs C4 plants), 3) Use mnemonics for classifications, 4) Connect topics conceptually (photosynthesis links to ecology), 5) Revise regularly.',
    },
  ],

  courseSummary: {
    title: 'NEET Botany Special',
    duration: '6 months focused',
    batchSize: 'Small batches (10-15)',
    features: [
      'All 19 chapters covered',
      'Visual diagram training',
      'Comparative table approach',
      'Chapter-wise tests',
      'Previous year analysis',
      'Doubt solving sessions',
    ],
    price: {
      original: 25000,
      discounted: 18000,
      emi: 'EMI from Rs. 3,000/month',
    },
  },

  cta: {
    title: 'Master NEET Botany',
    subtitle: 'Join our specialized Botany course for 160+ marks',
    primaryButton: {
      text: 'Enroll Now',
      link: '/courses',
    },
    secondaryButton: {
      text: 'Book Free Demo',
      link: '/book-demo',
    },
    tertiaryButton: {
      text: 'Free Botany Notes',
      link: '/resources',
    },
  },

  relatedPages: [
    { title: 'NEET Zoology Syllabus', link: '/neet-zoology-syllabus' },
    { title: 'NEET Biology Syllabus', link: '/neet-biology-syllabus-2025' },
    { title: 'Plant Physiology Tuition', link: '/plant-physiology-class-11' },
  ],

  contactButtons: defaultContactButtons,

  schema: {
    '@type': 'Course',
    courseName: 'NEET Botany Syllabus Guide',
    provider: 'Cerebrum Biology Academy',
    description:
      'Complete NEET Botany syllabus with all 19 chapters, weightage analysis, and preparation strategies for 170+ marks.',
    duration: '6 months',
    price: 18000,
    priceCurrency: 'INR',
  },
}

// NEET Zoology Syllabus Page
const neetZoologySyllabus: SEOLandingContent = {
  slug: 'neet-zoology-syllabus',
  classLevel: 'universal',

  title: 'NEET Zoology Syllabus 2025 | Chapters & Weightage',
  metaDescription:
    'Complete NEET Zoology syllabus for 2025 with all 19 chapters, weightage analysis, Human Physiology focus & preparation strategy. Score 170+ in Zoology.',
  keywords: [
    'zoology syllabus for neet',
    'neet zoology syllabus',
    'neet zoology chapters',
    'zoology for neet',
    'neet zoology topics',
    'human physiology neet',
    'neet zoology 2025',
    'animal kingdom neet',
  ],

  hero: {
    headline: 'NEET Zoology Syllabus Simplified',
    subheadline:
      'Master all 19 Zoology chapters with Human Physiology focus. This section alone can give you 170+ marks in NEET!',
    highlightedText: '170+',
    ctaText: 'Get Zoology Roadmap',
    ctaLink: '/resources',
    backgroundGradient: 'from-red-900 via-rose-900 to-pink-900',
  },

  painPoints: {
    title: 'Zoology Preparation Challenges',
    points: [
      {
        icon: 'heart',
        question: 'Human Physiology seems overwhelming?',
        solution:
          'We break down complex organ systems into digestible chunks, using animations and diagrams for clarity.',
      },
      {
        icon: 'layers',
        question: 'Animal Kingdom classification is confusing?',
        solution:
          'Structured approach to phyla and classes with key identification features and examples you will remember.',
      },
      {
        icon: 'dna',
        question: 'Genetics problems are challenging?',
        solution:
          'Step-by-step problem-solving techniques for inheritance, pedigree analysis, and molecular genetics.',
      },
    ],
  },

  benefits: {
    title: 'Zoology Chapters Overview',
    subtitle: '19 chapters from Class 11 and 12',
    items: [
      {
        icon: 'layers',
        title: 'Animal Kingdom',
        description:
          'Classification from Porifera to Mammalia - important for identification and characteristics questions.',
      },
      {
        icon: 'body',
        title: 'Structural Organization',
        description: 'Tissues, Organ Systems - foundation for understanding Human Physiology.',
      },
      {
        icon: 'heart',
        title: 'Human Physiology',
        description:
          'Digestion, Breathing, Body Fluids, Excretion, Locomotion, Neural, Chemical Control - HIGH YIELD (~50+ marks).',
      },
      {
        icon: 'baby',
        title: 'Reproduction',
        description:
          'Human Reproduction, Reproductive Health - consistent 8-10 questions every year.',
      },
      {
        icon: 'dna',
        title: 'Genetics & Evolution',
        description:
          'Principles of Inheritance, Molecular Basis, Evolution - HIGH YIELD with numerical problems.',
      },
      {
        icon: 'shield',
        title: 'Human Health',
        description:
          'Health & Disease, Microbes in Human Welfare - moderate yield with factual questions.',
      },
    ],
  },

  stats: [
    { value: '45', label: 'Zoology Questions', icon: 'clipboard' },
    { value: '180', label: 'Maximum Marks', icon: 'trophy' },
    { value: '19', label: 'Chapters', icon: 'book' },
    { value: '50+', label: 'From Human Physiology', icon: 'heart' },
  ],

  testimonials: [
    {
      name: 'Siddharth P.',
      achievement: 'Zoology: 172/180',
      quote:
        'Human Physiology was my strong point after proper preparation. The diagrams and flowcharts helped me understand complex processes. Scored 172!',
      score: '172/180',
    },
    {
      name: 'Divya S.',
      achievement: 'Zoology: 164/180',
      quote:
        'I struggled with Genetics initially. The problem-solving sessions helped me master inheritance and scoring 164 in Zoology!',
      score: '164/180',
    },
  ],

  faqs: [
    {
      question: 'How many chapters are in NEET Zoology syllabus?',
      answer:
        'NEET Zoology has 19 chapters - 9 from Class 11 (Animal Kingdom, Structural Organization, Biomolecules, Cell, Human Physiology) and 10 from Class 12 (Reproduction, Genetics, Evolution, Human Health, Biotechnology).',
    },
    {
      question: 'Which Zoology chapters are most important for NEET?',
      answer:
        'Human Physiology is the highest yield section in entire NEET (~50+ marks from 6 chapters). Other important areas: Genetics & Evolution (~25 marks), Human Reproduction (~15 marks), Animal Kingdom (~10-12 marks).',
    },
    {
      question: 'How to study Human Physiology for NEET?',
      answer:
        'Approach: 1) Understand each organ system conceptually before memorizing, 2) Draw flowcharts for processes, 3) Connect systems (hormones affect multiple systems), 4) Practice diagram-based questions, 5) Solve previous year questions.',
    },
    {
      question: 'Is Animal Kingdom important for NEET?',
      answer:
        'Yes, Animal Kingdom gives 5-8 questions in NEET (~20-32 marks). Focus on: Classification basis, Examples of each phylum/class, Key distinguishing features, Symmetry, germ layers, coelom. Dont memorize everything - focus on important groups.',
    },
  ],

  courseSummary: {
    title: 'NEET Zoology Special',
    duration: '6 months focused',
    batchSize: 'Small batches (10-15)',
    features: [
      'All 19 chapters covered',
      'Human Physiology focus',
      'Genetics problem solving',
      'Diagram mastery',
      'Chapter-wise tests',
      'Previous year analysis',
    ],
    price: {
      original: 25000,
      discounted: 18000,
      emi: 'EMI from Rs. 3,000/month',
    },
  },

  cta: {
    title: 'Master NEET Zoology',
    subtitle: 'Join our specialized Zoology course for 160+ marks',
    primaryButton: {
      text: 'Enroll Now',
      link: '/courses',
    },
    secondaryButton: {
      text: 'Book Free Demo',
      link: '/book-demo',
    },
    tertiaryButton: {
      text: 'Free Zoology Notes',
      link: '/resources',
    },
  },

  relatedPages: [
    { title: 'NEET Botany Syllabus', link: '/neet-botany-syllabus' },
    { title: 'NEET Biology Syllabus', link: '/neet-biology-syllabus-2025' },
    { title: 'Human Physiology Tuition', link: '/human-physiology-tuition' },
  ],

  contactButtons: defaultContactButtons,

  schema: {
    '@type': 'Course',
    courseName: 'NEET Zoology Syllabus Guide',
    provider: 'Cerebrum Biology Academy',
    description:
      'Complete NEET Zoology syllabus with all 19 chapters, Human Physiology focus, and strategies for 170+ marks.',
    duration: '6 months',
    price: 18000,
    priceCurrency: 'INR',
  },
}

// NEET Preparation Guide Page
const neetPreparationGuide: SEOLandingContent = {
  slug: 'neet-preparation-guide',
  classLevel: 'universal',

  title: 'NEET Preparation Guide 2025 | Strategy & Tips',
  metaDescription:
    'Complete NEET 2025 preparation guide with study strategies, time management, subject-wise tips, and expert advice. Start your NEET prep the right way.',
  keywords: [
    'neet guide',
    'neet prep',
    'neet preparation',
    'how to prepare for neet',
    'neet preparation strategy',
    'neet study plan',
    'neet tips',
    'neet preparation tips',
    'neet 2025 preparation',
  ],

  hero: {
    headline: 'Your Complete NEET Preparation Roadmap',
    subheadline:
      'Expert strategies, study plans, and tips from toppers and faculty. Whether you are starting fresh or need a boost - this guide covers it all.',
    highlightedText: 'Complete',
    ctaText: 'Start Your Journey',
    ctaLink: '/book-demo',
    backgroundGradient: 'from-blue-900 via-cyan-900 to-green-800',
  },

  painPoints: {
    title: 'Common NEET Preparation Mistakes',
    points: [
      {
        icon: 'book',
        question: 'Using too many books and getting confused?',
        solution:
          'We recommend focused resources - NCERT as primary, one reference book per subject. Quality over quantity.',
      },
      {
        icon: 'clock',
        question: 'Studying long hours but not seeing results?',
        solution:
          'Learn smart study techniques - active recall, spaced repetition, and effective test-taking strategies.',
      },
      {
        icon: 'target',
        question: 'Not sure if your preparation is on track?',
        solution:
          'Regular assessments and benchmarking against toppers help you understand where you stand.',
      },
    ],
  },

  benefits: {
    title: 'What This Guide Covers',
    subtitle: 'Complete preparation strategy',
    items: [
      {
        icon: 'calendar',
        title: 'Study Timeline',
        description:
          'Month-by-month study plan for 1-year, 2-year, and dropper preparation with realistic targets.',
      },
      {
        icon: 'book',
        title: 'Resource Recommendations',
        description:
          'Best books, online resources, and test series for each subject. What to use and what to avoid.',
      },
      {
        icon: 'brain',
        title: 'Study Techniques',
        description:
          'Active recall, spaced repetition, Feynman technique, and other proven methods for NEET.',
      },
      {
        icon: 'clipboard',
        title: 'Subject Strategies',
        description:
          'Specific approaches for Physics, Chemistry, and Biology based on how questions are asked.',
      },
      {
        icon: 'heart',
        title: 'Stress Management',
        description:
          'Mental health tips, dealing with pressure, and maintaining balance during preparation.',
      },
      {
        icon: 'trophy',
        title: 'Topper Insights',
        description:
          'What NEET toppers did differently - their schedules, strategies, and advice for aspirants.',
      },
    ],
  },

  stats: [
    { value: '700+', label: 'Can Be Achieved', icon: 'trophy' },
    { value: '8-10', label: 'Study Hours/Day', icon: 'clock' },
    { value: '12', label: 'Months Sufficient', icon: 'calendar' },
    { value: '95%', label: 'From NCERT', icon: 'book' },
  ],

  testimonials: [
    {
      name: 'Arjun K.',
      achievement: 'NEET 2024 - 695/720',
      quote:
        'Following the structured study plan changed everything. I knew exactly what to study each day and tracked my progress weekly. Result: 695!',
      score: '695/720',
    },
    {
      name: 'Priyanka M.',
      achievement: 'NEET 2024 - 670/720',
      quote:
        'The subject-wise strategies were gold. Physics improved from my weakest to strongest subject using the recommended approach.',
      score: '670/720',
    },
  ],

  faqs: [
    {
      question: 'How many hours should I study for NEET daily?',
      answer:
        'Quality matters more than quantity. Aim for 6-8 hours of focused study for school-going students, 10-12 hours for droppers. Include breaks, revision, and test practice. Consistency is more important than marathon sessions.',
    },
    {
      question: 'Is one year enough to prepare for NEET?',
      answer:
        'Yes, one year of dedicated preparation is sufficient for most students. Start with understanding concepts, build problem-solving skills, and focus on revision and tests in the last 3-4 months. Many toppers prepared in just one year.',
    },
    {
      question: 'Which subject should I start NEET preparation with?',
      answer:
        'Start with your strongest subject to build confidence. For most, Biology is a good starting point as it carries maximum marks. However, give equal importance to Physics and Chemistry - they can make or break your rank.',
    },
    {
      question: 'How important is NCERT for NEET preparation?',
      answer:
        'Extremely important - 90-95% of NEET questions are directly or conceptually from NCERT. Read NCERT textbooks line-by-line multiple times. Biology NCERT should be memorized, while Physics and Chemistry NCERTs are for concept clarity.',
    },
    {
      question: 'Should I join a coaching institute for NEET?',
      answer:
        'Coaching provides structure and guidance, especially helpful for those who need discipline. However, self-study with good resources is equally effective if you are disciplined. Online coaching offers flexibility with expert guidance - consider it as a middle ground.',
    },
  ],

  courseSummary: {
    title: 'NEET Complete Preparation',
    duration: '12-24 months',
    batchSize: 'Small batches (10-15)',
    features: [
      'Expert faculty guidance',
      'Structured study plan',
      'All subjects covered',
      'Regular test series',
      'Doubt solving support',
      'Counselling included',
    ],
    price: {
      original: 75000,
      discounted: 45000,
      emi: 'EMI from Rs. 3,750/month',
    },
  },

  cta: {
    title: 'Start Your NEET Preparation Today',
    subtitle: 'Get expert guidance and structured preparation for NEET 2025',
    primaryButton: {
      text: 'Join Now',
      link: '/courses',
    },
    secondaryButton: {
      text: 'Book Free Counselling',
      link: '/book-demo',
    },
    tertiaryButton: {
      text: 'Free Study Resources',
      link: '/resources',
    },
  },

  relatedPages: [
    { title: 'NEET Syllabus 2025', link: '/neet-syllabus-2025' },
    { title: 'NEET Exam Pattern', link: '/neet-exam-pattern-2025' },
    { title: 'NEET Dropper Course', link: '/neet-dropper-batch-online' },
  ],

  contactButtons: defaultContactButtons,

  schema: {
    '@type': 'Course',
    courseName: 'NEET Preparation Guide',
    provider: 'Cerebrum Biology Academy',
    description:
      'Complete NEET 2025 preparation guide with study strategies, time management tips, and subject-wise expert advice.',
    duration: '12-24 months',
    price: 45000,
    priceCurrency: 'INR',
  },
}

// NEET Exam Details Page
const neetExamDetails: SEOLandingContent = {
  slug: 'neet-exam-details',
  classLevel: 'universal',

  title: 'NEET Exam Details 2025 | Complete Exam Guide',
  metaDescription:
    'Complete NEET 2025 exam details - what is NEET, conducting body, exam date, centers, languages, and everything you need to know about the NEET examination.',
  keywords: [
    'neet details',
    'neet examination',
    'neet entrance exam',
    'what is neet exam',
    'neet exam details 2025',
    'neet exam information',
    'neet full form',
    'neet exam date',
    'nta neet',
  ],

  hero: {
    headline: 'Everything About NEET Examination',
    subheadline:
      'Complete guide to NEET - Indias single largest medical entrance exam. Understand what it is, who conducts it, and all the essential details.',
    highlightedText: 'Everything',
    ctaText: 'Learn More',
    ctaLink: '/resources',
    backgroundGradient: 'bg-indigo-700',
  },

  painPoints: {
    title: 'Common Questions About NEET',
    points: [
      {
        icon: 'help',
        question: 'What exactly is NEET and who can take it?',
        solution:
          'NEET (National Eligibility cum Entrance Test) is the single medical entrance exam in India for MBBS, BDS, AYUSH, and other medical courses.',
      },
      {
        icon: 'building',
        question: 'Which colleges accept NEET scores?',
        solution:
          'All government medical colleges, private medical colleges, AIIMS, JIPMER, and deemed universities accept NEET scores for admission.',
      },
      {
        icon: 'calendar',
        question: 'When is NEET conducted and how to apply?',
        solution:
          'NEET is typically conducted once a year in May. NTA (National Testing Agency) releases notification in December/January.',
      },
    ],
  },

  benefits: {
    title: 'NEET Examination Overview',
    subtitle: 'Key information at a glance',
    items: [
      {
        icon: 'file',
        title: 'Full Form & Purpose',
        description:
          'NEET = National Eligibility cum Entrance Test. Single exam for admission to medical and dental courses in India.',
      },
      {
        icon: 'building',
        title: 'Conducting Body',
        description:
          'NTA (National Testing Agency) conducts NEET on behalf of Ministry of Health and Family Welfare.',
      },
      {
        icon: 'calendar',
        title: 'Exam Frequency',
        description:
          'NEET is conducted once a year, typically in May. Results declared within 4-6 weeks of exam.',
      },
      {
        icon: 'globe',
        title: 'Exam Centers',
        description:
          'NEET is conducted in 500+ cities across India and in few international locations (Dubai, Qatar, etc.).',
      },
      {
        icon: 'message',
        title: 'Languages',
        description:
          'Available in 13 languages: English, Hindi, Assamese, Bengali, Gujarati, Kannada, Malayalam, Marathi, Odia, Punjabi, Tamil, Telugu, Urdu.',
      },
      {
        icon: 'users',
        title: 'Competition',
        description:
          '20+ lakh students appear for approximately 1 lakh medical seats. Requires serious preparation.',
      },
    ],
  },

  stats: [
    { value: '20L+', label: 'Candidates Annually', icon: 'users' },
    { value: '1L+', label: 'Medical Seats', icon: 'building' },
    { value: '500+', label: 'Exam Centers', icon: 'map' },
    { value: '13', label: 'Languages', icon: 'message' },
  ],

  testimonials: [
    {
      name: 'First-time NEET Parent',
      achievement: 'Understanding NEET',
      quote:
        'As parents new to this process, we had no idea what NEET was. This guide explained everything clearly and helped us support our child properly.',
    },
    {
      name: 'Class 10 Student',
      achievement: 'Future NEET Aspirant',
      quote:
        'I wanted to understand what NEET is before starting preparation. This comprehensive guide gave me complete clarity about the exam.',
    },
  ],

  faqs: [
    {
      question: 'What is the full form of NEET?',
      answer:
        'NEET stands for National Eligibility cum Entrance Test. It is the single entrance examination for admission to MBBS, BDS, AYUSH (BAMS, BHMS, BUMS, BSMS), Nursing, and Veterinary courses in India.',
    },
    {
      question: 'Who conducts NEET exam?',
      answer:
        'NEET is conducted by NTA (National Testing Agency) on behalf of the Ministry of Health and Family Welfare, Government of India. NTA was established in 2017 to conduct entrance examinations for higher educational institutions.',
    },
    {
      question: 'When is NEET 2025 exam date?',
      answer:
        'NEET 2025 is expected to be conducted in the first week of May 2025 (exact date to be announced by NTA). The notification is typically released in December/January, with application window of about 1 month.',
    },
    {
      question: 'Which medical courses accept NEET scores?',
      answer:
        'NEET scores are accepted for: MBBS, BDS, AYUSH courses (BAMS, BHMS, BUMS, BSMS), B.Sc Nursing, B.V.Sc (Veterinary), and various allied health science courses. All government, private, and deemed medical colleges in India accept NEET.',
    },
    {
      question: 'Is NEET mandatory for all medical colleges?',
      answer:
        'Yes, NEET is mandatory for admission to all medical, dental, and AYUSH colleges in India (both government and private). AIIMS, JIPMER, and all deemed universities also admit through NEET. There is no separate exam anymore.',
    },
  ],

  courseSummary: {
    title: 'NEET Preparation Course',
    duration: '12-24 months',
    batchSize: 'Small batches',
    features: [
      'Complete syllabus coverage',
      'Expert faculty',
      'Test series',
      'Doubt support',
      'Performance tracking',
      'Counselling guidance',
    ],
    price: {
      original: 75000,
      discounted: 45000,
      emi: 'EMI from Rs. 3,750/month',
    },
  },

  cta: {
    title: 'Ready to Start Your NEET Journey?',
    subtitle: 'Now that you understand NEET, begin your preparation with expert guidance',
    primaryButton: {
      text: 'Start Preparation',
      link: '/courses',
    },
    secondaryButton: {
      text: 'Book Free Counselling',
      link: '/book-demo',
    },
    tertiaryButton: {
      text: 'NEET Resources',
      link: '/resources',
    },
  },

  relatedPages: [
    { title: 'NEET Eligibility Criteria', link: '/neet-eligibility-criteria' },
    { title: 'NEET Registration Guide', link: '/neet-registration-guide' },
    { title: 'NEET Syllabus 2025', link: '/neet-syllabus-2025' },
  ],

  contactButtons: defaultContactButtons,

  schema: {
    '@type': 'Course',
    courseName: 'NEET Exam Details Guide',
    provider: 'Cerebrum Biology Academy',
    description:
      'Complete guide to NEET examination including conducting body, exam details, eligibility, and all essential information.',
    duration: 'Reference Guide',
    price: 0,
    priceCurrency: 'INR',
  },
}

// NEET Registration Guide Page
const neetRegistrationGuide: SEOLandingContent = {
  slug: 'neet-registration-guide',
  classLevel: 'universal',

  title: 'NEET Registration 2025 | Apply Online Guide | Cerebrum Academy',
  metaDescription:
    'Complete NEET 2025 registration guide - how to apply online, documents required, application fee, photo specifications & step-by-step process.',
  keywords: [
    'neet registration',
    'neet apply online',
    'neet admission',
    'neet registration 2025',
    'neet application form',
    'how to apply for neet',
    'neet registration process',
    'neet application fee',
    'nta neet registration',
  ],

  hero: {
    headline: 'NEET 2025 Registration Guide',
    subheadline:
      'Step-by-step guide to apply for NEET 2025 online. Document requirements, photo specifications, fee payment, and common mistakes to avoid.',
    highlightedText: 'Step-by-step',
    ctaText: 'Get Registration Checklist',
    ctaLink: '/resources',
    backgroundGradient: 'from-sky-900 via-blue-900 to-indigo-900',
  },

  painPoints: {
    title: 'Registration Challenges We Address',
    points: [
      {
        icon: 'form',
        question: 'Confused about the online application process?',
        solution:
          'Our step-by-step guide walks you through each section of the NEET application form with screenshots.',
      },
      {
        icon: 'camera',
        question: 'Photo getting rejected multiple times?',
        solution:
          'Clear specifications for photograph and signature - size, format, background, and common rejection reasons.',
      },
      {
        icon: 'file',
        question: 'Not sure which documents are required?',
        solution:
          'Complete document checklist with specifications - Class 10 certificate, ID proof, category certificates, etc.',
      },
    ],
  },

  benefits: {
    title: 'NEET Registration Process',
    subtitle: 'Complete step-by-step guide',
    items: [
      {
        icon: 'user',
        title: 'Step 1: NTA Registration',
        description:
          'Create NTA account with valid email and mobile number. Generate Application Number and password.',
      },
      {
        icon: 'form',
        title: 'Step 2: Fill Application',
        description:
          'Personal details, academic qualifications, address, exam center preference, and other required information.',
      },
      {
        icon: 'camera',
        title: 'Step 3: Upload Documents',
        description:
          'Photograph (10-200KB, JPG), Signature (4-30KB, JPG), Class 10 certificate, Category certificate if applicable.',
      },
      {
        icon: 'credit-card',
        title: 'Step 4: Pay Fee',
        description:
          'General/OBC: Rs. 1700, SC/ST/PwD: Rs. 1000. Payment via Debit/Credit Card, Net Banking, UPI, or E-Challan.',
      },
      {
        icon: 'download',
        title: 'Step 5: Download Confirmation',
        description:
          'Print confirmation page after successful submission. Keep it safe for future reference.',
      },
      {
        icon: 'calendar',
        title: 'Step 6: Correction Window',
        description:
          'NTA provides correction window for editing details. Use it to fix any errors before deadline.',
      },
    ],
  },

  stats: [
    { value: 'Dec-Jan', label: 'Registration Period', icon: 'calendar' },
    { value: 'Rs. 1700', label: 'Application Fee (General)', icon: 'credit-card' },
    { value: '15 Days', label: 'Typical Window', icon: 'clock' },
    { value: '1', label: 'Correction Allowed', icon: 'edit' },
  ],

  testimonials: [
    {
      name: 'First-time NEET Applicant',
      achievement: 'Successful Registration',
      quote:
        'I was nervous about making mistakes in the form. The detailed guide helped me fill everything correctly. My photo was accepted first time!',
    },
    {
      name: 'Parent of NEET Aspirant',
      achievement: 'Helped Child Register',
      quote:
        'As a parent, I helped my daughter with registration. The step-by-step instructions were clear and we completed the process smoothly.',
    },
  ],

  faqs: [
    {
      question: 'When does NEET 2025 registration start?',
      answer:
        'NEET 2025 registration is expected to start in December 2024 or January 2025. NTA releases the official notification on neet.nta.nic.in. The registration window is typically 15-30 days.',
    },
    {
      question: 'What is the NEET 2025 application fee?',
      answer:
        'Application fees: General/OBC-NCL/EWS - Rs. 1700, General-EWS/OBC-NCL (Female) - Rs. 1600, SC/ST/PwD - Rs. 1000. Fee can be paid via Debit Card, Credit Card, Net Banking, UPI, or E-Challan.',
    },
    {
      question: 'What documents are required for NEET registration?',
      answer:
        'Required documents: Class 10 passing certificate (for date of birth), Passport size photograph (80% face, white background), Signature, Category certificate (SC/ST/OBC-NCL if applicable), PwD certificate (if applicable), Aadhar or any valid ID.',
    },
    {
      question: 'What are the photo specifications for NEET application?',
      answer:
        'Photo specifications: Size 10KB-200KB, Format JPG/JPEG, Dimensions 2x2 inches, Background white, 80% face visible, Taken within 3 months, Postcard paper quality. Signature: 4KB-30KB, JPG format.',
    },
    {
      question: 'Can I edit my NEET application after submission?',
      answer:
        'Yes, NTA provides a correction window (usually 3-5 days) after registration ends. You can edit most details including personal information, academic details, and exam center preference. Photo and signature can also be changed if rejected.',
    },
  ],

  courseSummary: {
    title: 'NEET Preparation Course',
    duration: '12-24 months',
    batchSize: 'Small batches',
    features: [
      'Registration assistance',
      'Complete syllabus coverage',
      'Expert faculty',
      'Test series',
      'Counselling support',
      'Doubt clearing',
    ],
    price: {
      original: 75000,
      discounted: 45000,
      emi: 'EMI from Rs. 3,750/month',
    },
  },

  cta: {
    title: 'Need Help with NEET Registration?',
    subtitle: 'We provide complete support from registration to admission',
    primaryButton: {
      text: 'Get Support',
      link: '/book-demo',
    },
    secondaryButton: {
      text: 'Registration Checklist',
      link: '/resources',
    },
    tertiaryButton: {
      text: 'Start Preparation',
      link: '/courses',
    },
  },

  relatedPages: [
    { title: 'NEET Eligibility Criteria', link: '/neet-eligibility-criteria' },
    { title: 'NEET Exam Details', link: '/neet-exam-details' },
    { title: 'NEET Official Resources', link: '/neet-official-resources' },
  ],

  contactButtons: defaultContactButtons,

  schema: {
    '@type': 'Course',
    courseName: 'NEET Registration Guide',
    provider: 'Cerebrum Biology Academy',
    description:
      'Complete NEET 2025 registration guide with step-by-step process, document requirements, and application assistance.',
    duration: 'Reference Guide',
    price: 0,
    priceCurrency: 'INR',
  },
}

// NEET Result Analysis Page
const neetResultAnalysis: SEOLandingContent = {
  slug: 'neet-result-analysis',
  classLevel: 'universal',

  title: 'NEET Result 2025 | Result Analysis & Cutoff | Cerebrum Academy',
  metaDescription:
    'NEET 2025 result analysis - cutoff marks, rank prediction, previous year analysis, and what your score means for medical college admission.',
  keywords: [
    'neet result',
    'neet ka result',
    'nta neet result',
    'neet result 2025',
    'neet cutoff',
    'neet result analysis',
    'neet rank vs marks',
    'neet college predictor',
    'neet score analysis',
  ],

  hero: {
    headline: 'NEET Result Analysis & College Prediction',
    subheadline:
      'Understand your NEET score, predict your rank, check cutoffs, and find which medical colleges you can get based on your performance.',
    highlightedText: 'Prediction',
    ctaText: 'Check College Predictor',
    ctaLink: '/resources',
    backgroundGradient: 'from-green-800 via-green-900 to-green-800',
  },

  painPoints: {
    title: 'Post-Result Questions',
    points: [
      {
        icon: 'chart',
        question: 'What rank will I get for my NEET score?',
        solution:
          'Our rank predictor analyzes previous year data to estimate your All India Rank based on your score.',
      },
      {
        icon: 'building',
        question: 'Which colleges can I get with my rank?',
        solution:
          'College predictor tool shows government and private colleges where you have admission chances.',
      },
      {
        icon: 'check',
        question: 'Did I clear the NEET cutoff?',
        solution:
          'Check qualifying cutoff (for eligibility) and admission cutoffs (for specific colleges) based on your category.',
      },
    ],
  },

  benefits: {
    title: 'Result Analysis Tools',
    subtitle: 'Everything you need post-result',
    items: [
      {
        icon: 'calculator',
        title: 'Rank Predictor',
        description:
          'Enter your score to get estimated All India Rank based on previous year score vs rank analysis.',
      },
      {
        icon: 'building',
        title: 'College Predictor',
        description:
          'Input rank and category to see government and private colleges where admission is possible.',
      },
      {
        icon: 'chart',
        title: 'Cutoff Trends',
        description: 'Year-wise cutoff trends for top government medical colleges across states.',
      },
      {
        icon: 'list',
        title: 'Category-wise Analysis',
        description:
          'Separate analysis for General, EWS, OBC, SC, ST with respective cutoffs and seat availability.',
      },
      {
        icon: 'map',
        title: 'State-wise Opportunities',
        description: 'State quota vs All India quota analysis for your domicile state.',
      },
      {
        icon: 'lightbulb',
        title: 'Next Steps Guidance',
        description:
          'What to do after result - counselling preparation, document collection, and strategy.',
      },
    ],
  },

  stats: [
    { value: '720', label: 'Maximum Marks', icon: 'trophy' },
    { value: '50%', label: 'General Cutoff', icon: 'check' },
    { value: '40%', label: 'SC/ST/OBC Cutoff', icon: 'check' },
    { value: '45%', label: 'PwD Cutoff', icon: 'check' },
  ],

  testimonials: [
    {
      name: 'Neha K.',
      achievement: 'Got GMC with 580 marks',
      quote:
        'The college predictor was accurate! I got into a government medical college in my home state exactly as predicted with my 580 score.',
      score: '580/720',
    },
    {
      name: 'Vikash S.',
      achievement: 'Made informed decision',
      quote:
        'After seeing my result, I was confused. The analysis tools helped me understand my options clearly and I chose the right counselling strategy.',
      score: '510/720',
    },
  ],

  faqs: [
    {
      question: 'When will NEET 2025 result be declared?',
      answer:
        'NEET 2025 result is expected within 4-6 weeks of the exam date. If the exam is in May, result would typically be in June. NTA announces the exact date on the official website.',
    },
    {
      question: 'What is the NEET 2025 qualifying cutoff?',
      answer:
        'Expected qualifying cutoff percentile: General - 50th percentile (~130-140 marks), SC/ST/OBC - 40th percentile (~105-110 marks), PwD - 45th percentile (~120-125 marks). Actual marks depend on paper difficulty.',
    },
    {
      question: 'How to predict rank from NEET score?',
      answer:
        'Rank prediction is based on previous year data. Example from NEET 2024: 700+ = Top 50 ranks, 650-700 = Top 5000, 600-650 = Top 30000, 550-600 = Top 75000. Use our rank predictor for more accurate estimates.',
    },
    {
      question: 'What is a good NEET score for government medical college?',
      answer:
        'For top government colleges (AIIMS, MAMC, etc.): 650+ marks needed. For good state government colleges: 580-650 marks. For any government college: 550+ marks (category-dependent). Private colleges: 450+ marks sufficient.',
    },
    {
      question: 'Can I get admission with low NEET score?',
      answer:
        'Options with lower scores: Management quota seats in private colleges (expensive), Deemed universities, AYUSH courses (BAMS, BHMS), Nursing courses, or retake NEET next year for improvement.',
    },
  ],

  courseSummary: {
    title: 'NEET Dropper Course',
    duration: '12 months intensive',
    batchSize: 'Small batches',
    features: [
      'For NEET improvement',
      'Expert faculty',
      'Intensive schedule',
      'Regular tests',
      'Weak area focus',
      'Guaranteed improvement',
    ],
    price: {
      original: 60000,
      discounted: 40000,
      emi: 'EMI from Rs. 3,333/month',
    },
  },

  cta: {
    title: 'Need to Improve Your Score?',
    subtitle: 'Join our dropper batch for guaranteed improvement in NEET 2026',
    primaryButton: {
      text: 'Join Dropper Batch',
      link: '/courses',
    },
    secondaryButton: {
      text: 'Book Counselling',
      link: '/book-demo',
    },
    tertiaryButton: {
      text: 'College Predictor',
      link: '/resources',
    },
  },

  relatedPages: [
    { title: 'NEET Counselling Guide', link: '/neet-counselling-guide' },
    { title: 'NEET Dropper Course', link: '/neet-dropper-batch-online' },
    { title: 'NEET Preparation Guide', link: '/neet-preparation-guide' },
  ],

  contactButtons: defaultContactButtons,

  schema: {
    '@type': 'Course',
    courseName: 'NEET Result Analysis',
    provider: 'Cerebrum Biology Academy',
    description:
      'NEET result analysis with rank prediction, cutoff trends, college predictor, and post-result guidance.',
    duration: 'Reference Guide',
    price: 0,
    priceCurrency: 'INR',
  },
}

// NEET Official Resources Page
const neetOfficialResources: SEOLandingContent = {
  slug: 'neet-official-resources',
  classLevel: 'universal',

  title: 'NEET Official Website & Resources | NTA Links | Cerebrum Academy',
  metaDescription:
    'All official NEET resources - NTA website links, admit card download, result checking, answer key, counselling portals, and authentic information sources.',
  keywords: [
    'neet official website',
    'neet nta nic in',
    'nta neet',
    'neet nta',
    'neet official',
    'neet gov website',
    'nta official website',
    'neet admit card',
    'neet answer key',
    'mcc counselling',
  ],

  hero: {
    headline: 'Official NEET Resources & Links',
    subheadline:
      'All authentic NTA and MCC links in one place. Avoid fake websites and stay updated with official notifications, admit cards, and results.',
    highlightedText: 'Official',
    ctaText: 'View All Links',
    ctaLink: '#official-links',
    backgroundGradient: 'from-slate-900 via-gray-900 to-zinc-900',
  },

  painPoints: {
    title: 'Why Official Sources Matter',
    points: [
      {
        icon: 'shield',
        question: 'Worried about fake NEET websites and scams?',
        solution:
          'We provide only verified official links - NTA, MCC, and state counselling websites to keep you safe.',
      },
      {
        icon: 'refresh',
        question: 'Missing important NEET notifications?',
        solution:
          'Bookmark official sources and enable notifications. We also send alerts for major updates.',
      },
      {
        icon: 'search',
        question: 'Confused which website is authentic?',
        solution:
          'Official NEET websites always end with .nic.in or .gov.in. We list only these authenticated sources.',
      },
    ],
  },

  benefits: {
    title: 'Official NEET Websites',
    subtitle: 'Verified and authenticated links',
    items: [
      {
        icon: 'globe',
        title: 'NTA NEET Website',
        description:
          'neet.nta.nic.in - Official site for registration, admit card, result, and answer key.',
      },
      {
        icon: 'building',
        title: 'NTA Official Portal',
        description:
          'nta.ac.in - Parent NTA website with all exam-related information and updates.',
      },
      {
        icon: 'users',
        title: 'MCC Counselling',
        description:
          'mcc.nic.in - Medical Counselling Committee website for All India Quota counselling.',
      },
      {
        icon: 'map',
        title: 'State Counselling Portals',
        description: 'State-wise counselling websites for 85% state quota seats admission.',
      },
      {
        icon: 'file',
        title: 'Information Bulletin',
        description:
          'Official PDF with complete exam details, syllabus, eligibility, and instructions.',
      },
      {
        icon: 'phone',
        title: 'NTA Helpline',
        description: 'Official helpline number and email for queries and grievances.',
      },
    ],
  },

  stats: [
    { value: '1', label: 'Official Exam Website', icon: 'globe' },
    { value: '36', label: 'State Counselling Sites', icon: 'map' },
    { value: '24/7', label: 'NTA Helpline', icon: 'phone' },
    { value: 'Free', label: 'All Official Resources', icon: 'check' },
  ],

  testimonials: [
    {
      name: 'NEET Aspirant Parent',
      achievement: 'Avoided scam',
      quote:
        'I almost fell for a fake NEET website that asked for payment. Thanks to this verified list, I found the real NTA site and saved money!',
    },
    {
      name: 'First-time NEET Candidate',
      achievement: 'Easy navigation',
      quote:
        'All official links in one place made it so easy. I downloaded admit card, checked answer key, and registered for counselling without confusion.',
    },
  ],

  faqs: [
    {
      question: 'What is the official NEET website?',
      answer:
        'The official NEET website is neet.nta.nic.in operated by National Testing Agency (NTA). This is the only authentic source for NEET registration, admit card, answer key, and result. Beware of fake websites with similar names.',
    },
    {
      question: 'How to download NEET admit card from official website?',
      answer:
        'Steps: 1) Visit neet.nta.nic.in, 2) Click on "Admit Card" link when available, 3) Login with Application Number and Date of Birth, 4) Download and print admit card. Keep multiple copies.',
    },
    {
      question: 'Where to check NEET result officially?',
      answer:
        'NEET result is declared on neet.nta.nic.in. You can check using Application Number and Date of Birth. Result includes marks, percentile, and All India Rank. Download and save the scorecard.',
    },
    {
      question: 'What is the official MCC counselling website?',
      answer:
        'MCC (Medical Counselling Committee) official website is mcc.nic.in. This handles All India Quota counselling, Deemed Universities, Central Universities, and ESIC counselling. State counselling has separate websites.',
    },
    {
      question: 'How to identify fake NEET websites?',
      answer:
        'Tips: 1) Official sites end with .nic.in or .gov.in, 2) Never pay on websites other than official portals, 3) NTA never asks for personal payment links, 4) Check URL carefully - scammers use similar-looking names.',
    },
  ],

  courseSummary: {
    title: 'NEET Preparation with Official Resources',
    duration: '12 months',
    batchSize: 'Small batches',
    features: [
      'Official NCERT-based teaching',
      'NTA pattern mock tests',
      'Regular updates on notifications',
      'Counselling guidance',
      'Authentic study material',
      'Expert faculty',
    ],
    price: {
      original: 75000,
      discounted: 45000,
      emi: 'EMI from Rs. 3,750/month',
    },
  },

  cta: {
    title: 'Prepare with Trusted Guidance',
    subtitle: 'Get authentic preparation with faculty who understand NTA patterns',
    primaryButton: {
      text: 'Join Our Course',
      link: '/courses',
    },
    secondaryButton: {
      text: 'Free Counselling',
      link: '/book-demo',
    },
    tertiaryButton: {
      text: 'Free Resources',
      link: '/resources',
    },
  },

  relatedPages: [
    { title: 'NEET Registration Guide', link: '/neet-registration-guide' },
    { title: 'NEET Counselling Guide', link: '/neet-counselling-guide' },
    { title: 'NEET Exam Details', link: '/neet-exam-details' },
  ],

  contactButtons: defaultContactButtons,

  schema: {
    '@type': 'Course',
    courseName: 'NEET Official Resources',
    provider: 'Cerebrum Biology Academy',
    description:
      'Complete collection of official NEET resources including NTA website, MCC counselling, and state counselling portal links.',
    duration: 'Reference Guide',
    price: 0,
    priceCurrency: 'INR',
  },
}

// NEET 2026 Syllabus Page
const neetSyllabus2026: SEOLandingContent = {
  slug: 'neet-syllabus-2026',
  classLevel: 'universal',

  title: 'NEET 2026 Syllabus | Complete Subject-wise Guide',
  metaDescription:
    'Complete NEET 2026 syllabus - Physics, Chemistry & Biology. Chapter-wise weightage, important topics & NTA updated preparation strategy.',
  keywords: [
    'neet syllabus 2026',
    'neet 2026 syllabus',
    'neet ug syllabus 2026',
    'nta neet syllabus 2026',
    'neet 2026 biology syllabus',
    'neet 2026 physics syllabus',
    'neet 2026 chemistry syllabus',
    'neet syllabus pdf 2026',
  ],

  hero: {
    headline: 'NEET 2026 Complete Syllabus Guide',
    subheadline:
      'Master the entire NEET 2026 syllabus with chapter-wise weightage analysis, important topics, and expert strategies for 700+ scores.',
    highlightedText: '2026',
    ctaText: 'Get Syllabus PDF',
    ctaLink: '/resources',
    backgroundGradient: 'from-indigo-900 to-indigo-800',
  },

  painPoints: {
    title: 'Understanding the NEET 2026 Syllabus',
    points: [
      {
        icon: 'book',
        question: 'Overwhelmed by the vast NEET 2026 syllabus?',
        solution:
          'We break down the entire syllabus into high-yield and moderate-yield topics so you know exactly where to focus.',
      },
      {
        icon: 'target',
        question: 'Not sure which chapters are most important for 2026?',
        solution:
          'Our chapter-wise weightage analysis shows topics that appear most frequently based on 10+ years of NEET papers.',
      },
      {
        icon: 'calendar',
        question: 'Struggling to cover the entire syllabus in time?',
        solution:
          'Our structured study plans help you cover all topics systematically with time allocated based on importance.',
      },
    ],
  },

  benefits: {
    title: 'NEET 2026 Syllabus Breakdown',
    subtitle: 'Complete syllabus coverage and strategy',
    items: [
      {
        icon: 'book',
        title: 'Complete Subject-wise Syllabus',
        description:
          'Detailed NEET 2026 syllabus for Physics (45 questions), Chemistry (45 questions), and Biology (90 questions).',
      },
      {
        icon: 'chart',
        title: 'Chapter-wise Weightage 2026',
        description:
          'Historical analysis showing how many questions typically come from each chapter in NEET exams.',
      },
      {
        icon: 'star',
        title: 'High-Yield Topics for 2026',
        description:
          'Identification of topics that contribute maximum marks and should be prioritized for NEET 2026.',
      },
      {
        icon: 'link',
        title: 'NCERT Alignment',
        description:
          'Clear mapping between NEET 2026 syllabus and NCERT textbook chapters for focused study.',
      },
      {
        icon: 'lightbulb',
        title: 'Preparation Strategy',
        description:
          'Expert tips on how to approach NEET 2026 syllabus completion based on available time and level.',
      },
      {
        icon: 'download',
        title: 'Downloadable Resources',
        description:
          'NEET 2026 syllabus PDF, chapter checklists, and study planners to track your preparation.',
      },
    ],
  },

  stats: [
    { value: '180', label: 'Total Questions', icon: 'clipboard' },
    { value: '720', label: 'Maximum Marks', icon: 'trophy' },
    { value: '97', label: 'NCERT Chapters', icon: 'book' },
    { value: '3:20', label: 'Exam Duration (hrs)', icon: 'clock' },
  ],

  testimonials: [
    {
      name: 'Priya S.',
      achievement: 'NEET 2025 - 685/720',
      quote:
        'Understanding the syllabus weightage changed my preparation completely. I focused on high-yield topics and scored 685!',
      score: '685/720',
    },
    {
      name: 'Rahul M.',
      achievement: 'NEET 2025 - 650/720',
      quote:
        'The chapter-wise breakdown helped me create a realistic study plan. I knew exactly what to study and when.',
      score: '650/720',
    },
  ],

  faqs: [
    {
      question: 'What is the NEET 2026 syllabus based on?',
      answer:
        'NEET 2026 syllabus is based on Class 11 and 12 NCERT textbooks for Physics, Chemistry, and Biology. NTA follows the NCERT curriculum.',
    },
    {
      question: 'Has the NEET syllabus changed for 2026?',
      answer:
        'NTA announces any syllabus changes in the official notification. We update this page immediately when any changes are announced for NEET 2026.',
    },
    {
      question: 'Which subject has the highest weightage in NEET 2026?',
      answer:
        'Biology has the highest weightage with 90 questions (360 marks) - 45 from Botany and 45 from Zoology. Physics and Chemistry have 45 questions each.',
    },
    {
      question: 'How many chapters are there in NEET 2026 syllabus?',
      answer:
        'The NEET syllabus covers approximately 97 chapters from Class 11 and 12 NCERT: 38 in Biology, 29 in Physics, and 30 in Chemistry.',
    },
    {
      question: 'What are the most important chapters for NEET 2026 Biology?',
      answer:
        'High-yield Biology chapters include: Human Physiology, Genetics & Evolution, Cell Biology, Plant Physiology, Ecology, and Biotechnology.',
    },
  ],

  courseSummary: {
    title: 'NEET 2026 Biology Mastery Course',
    duration: '12 months comprehensive',
    batchSize: 'Small batches (10-15 students)',
    features: [
      'Complete NCERT coverage for NEET 2026',
      'Chapter-wise test series',
      'Previous year question analysis',
      'High-yield topic focus',
      'Revision modules included',
      'Doubt solving sessions',
    ],
    price: {
      original: 75000,
      discounted: 45000,
      emi: 'EMI from Rs. 3,750/month',
    },
  },

  cta: {
    title: 'Master the Complete NEET 2026 Syllabus',
    subtitle: 'Join our comprehensive program designed around the complete NEET 2026 syllabus',
    primaryButton: {
      text: 'Enroll Now',
      link: '/courses',
    },
    secondaryButton: {
      text: 'Book Free Demo',
      link: '/book-demo',
    },
    tertiaryButton: {
      text: 'Download Syllabus PDF',
      link: '/resources',
    },
  },

  relatedPages: [
    { title: 'NEET 2026 Eligibility', link: '/neet-eligibility-2026' },
    { title: 'NEET 2026 Exam Date', link: '/neet-exam-date-2026' },
    { title: 'NEET Preparation Guide', link: '/neet-preparation-guide' },
  ],

  contactButtons: defaultContactButtons,

  schema: {
    '@type': 'Course',
    courseName: 'NEET 2026 Syllabus Guide',
    provider: 'Cerebrum Biology Academy',
    description:
      'Complete NEET 2026 syllabus for Physics, Chemistry, and Biology with chapter-wise weightage and preparation strategies.',
    duration: '12 months',
    price: 45000,
    priceCurrency: 'INR',
  },
}

// NEET 2026 Eligibility Page
const neetEligibility2026: SEOLandingContent = {
  slug: 'neet-eligibility-2026',
  classLevel: 'universal',

  title: 'NEET 2026 Eligibility | Age & Qualification Criteria',
  metaDescription:
    'NEET 2026 eligibility criteria - age limit, educational qualification, attempts limit. Check if you qualify for NEET UG 2026.',
  keywords: [
    'neet 2026 eligibility',
    'neet eligibility 2026',
    'neet 2026 age limit',
    'neet 2026 qualification',
    'eligibility for neet 2026',
    'neet ug 2026 eligibility',
    'who can give neet 2026',
  ],

  hero: {
    headline: 'NEET 2026 Eligibility Criteria',
    subheadline:
      'Complete guide to NEET 2026 eligibility including age limits, educational qualifications, number of attempts, and category-wise requirements.',
    highlightedText: '2026',
    ctaText: 'Check Your Eligibility',
    ctaLink: '/book-demo',
    backgroundGradient: 'from-green-900 via-green-800 to-cyan-900',
  },

  painPoints: {
    title: 'NEET 2026 Eligibility Questions',
    points: [
      {
        icon: 'user',
        question: 'Am I eligible to appear for NEET 2026?',
        solution:
          'We provide clear, updated eligibility criteria based on NTA guidelines so you know exactly if you qualify.',
      },
      {
        icon: 'calendar',
        question: 'What is the age limit for NEET 2026?',
        solution:
          'Get clarity on minimum and maximum age requirements, including relaxations for reserved categories.',
      },
      {
        icon: 'file',
        question: 'Which subjects and marks are required?',
        solution:
          'Understand the exact educational qualifications and minimum percentage requirements for NEET 2026.',
      },
    ],
  },

  benefits: {
    title: 'NEET 2026 Eligibility Information',
    subtitle: 'Everything you need to know',
    items: [
      {
        icon: 'calendar',
        title: 'Age Criteria',
        description:
          'Minimum 17 years as of admission year (December 31, 2026). No upper age limit per Supreme Court order.',
      },
      {
        icon: 'book',
        title: 'Educational Qualification',
        description:
          'Must have passed Class 12 with Physics, Chemistry, Biology/Biotechnology, and English from a recognized board.',
      },
      {
        icon: 'percent',
        title: 'Minimum Marks',
        description:
          'General: 50% aggregate in PCB, OBC/SC/ST: 40%, PwD: 45% in Physics, Chemistry, and Biology.',
      },
      {
        icon: 'refresh',
        title: 'Number of Attempts',
        description:
          'No limit on the number of attempts. You can appear for NEET 2026 as many times as needed.',
      },
      {
        icon: 'globe',
        title: 'Nationality',
        description:
          'Indian nationals, NRIs, OCIs, PIOs, and foreign nationals are eligible with specific conditions.',
      },
      {
        icon: 'shield',
        title: 'Category Benefits',
        description:
          'Reserved categories (SC/ST/OBC) have relaxed eligibility criteria and age limits.',
      },
    ],
  },

  stats: [
    { value: '17+', label: 'Minimum Age', icon: 'user' },
    { value: 'No', label: 'Upper Age Limit', icon: 'check' },
    { value: '50%', label: 'Min. PCB (General)', icon: 'percent' },
    { value: 'Unlimited', label: 'Attempts Allowed', icon: 'refresh' },
  ],

  testimonials: [
    {
      name: 'Amit K.',
      achievement: 'NEET 2025 Qualifier',
      quote:
        'I was confused about eligibility after appearing twice. This guide clarified that there is no attempt limit!',
      score: 'Qualified',
    },
    {
      name: 'Parent of Sneha R.',
      achievement: 'NEET 2026 Aspirant',
      quote:
        'As parents, we had many questions about eligibility. The clear explanation helped us understand everything.',
    },
  ],

  faqs: [
    {
      question: 'What is the minimum age to appear for NEET 2026?',
      answer:
        'Candidates must be at least 17 years old as on December 31, 2026. So for NEET 2026, you must turn 17 by December 31, 2026.',
    },
    {
      question: 'Is there an upper age limit for NEET 2026?',
      answer:
        'No, the Supreme Court has removed the upper age limit for NEET. Candidates of any age above 17 can appear for NEET 2026.',
    },
    {
      question: 'How many times can I attempt NEET 2026?',
      answer:
        'There is no limit on the number of attempts for NEET. You can appear for NEET 2026 as many times as you want.',
    },
    {
      question: 'Can Class 12 appearing students give NEET 2026?',
      answer:
        'Yes, students appearing for Class 12 board exams in 2026 are eligible for NEET 2026. Admission is subject to passing with required marks.',
    },
    {
      question: 'Is Biology mandatory for NEET 2026 eligibility?',
      answer:
        'Yes, Biology/Biotechnology is mandatory. You must have studied Physics, Chemistry, and Biology in Class 11 and 12.',
    },
  ],

  courseSummary: {
    title: 'NEET 2026 Preparation Course',
    duration: 'Flexible (1-2 years)',
    batchSize: 'Small batches',
    features: [
      'Complete syllabus coverage',
      'Expert faculty guidance',
      'Regular mock tests',
      'Doubt clearing sessions',
      'Performance tracking',
      'Admission counseling',
    ],
    price: {
      original: 75000,
      discounted: 45000,
      emi: 'EMI from Rs. 3,750/month',
    },
  },

  cta: {
    title: 'Start Your NEET 2026 Preparation',
    subtitle: 'Now that you know you are eligible, begin your preparation with expert guidance',
    primaryButton: {
      text: 'Enroll Now',
      link: '/courses',
    },
    secondaryButton: {
      text: 'Book Free Demo',
      link: '/book-demo',
    },
    tertiaryButton: {
      text: 'Free Resources',
      link: '/resources',
    },
  },

  relatedPages: [
    { title: 'NEET 2026 Syllabus', link: '/neet-syllabus-2026' },
    { title: 'NEET 2026 Exam Date', link: '/neet-exam-date-2026' },
    { title: 'NEET Application Form 2026', link: '/neet-application-form-2026' },
  ],

  contactButtons: defaultContactButtons,

  schema: {
    '@type': 'Course',
    courseName: 'NEET 2026 Eligibility Guide',
    provider: 'Cerebrum Biology Academy',
    description:
      'Complete NEET 2026 eligibility criteria including age limit, qualifications, and category requirements.',
    duration: 'Reference Guide',
    price: 0,
    priceCurrency: 'INR',
  },
}

// NEET 2026 Exam Date Page
const neetExamDate2026: SEOLandingContent = {
  slug: 'neet-exam-date-2026',
  classLevel: 'universal',

  title: 'NEET 2026 Exam Date | Schedule & Important Dates',
  metaDescription:
    'NEET 2026 exam date, application dates, admit card release, result date. Complete NEET UG 2026 schedule and important dates.',
  keywords: [
    'neet 2026 exam date',
    'neet 2026 date',
    'when is neet 2026',
    'neet ug 2026 exam date',
    'neet 2026 schedule',
    'neet 2026 important dates',
    'neet 2026 application date',
  ],

  hero: {
    headline: 'NEET 2026 Exam Date & Schedule',
    subheadline:
      'Complete NEET 2026 schedule including exam date, application window, admit card release, and result declaration dates.',
    highlightedText: 'May 2026',
    ctaText: 'Start Preparation Now',
    ctaLink: '/courses',
    backgroundGradient: 'from-orange-900 via-red-900 to-pink-900',
  },

  painPoints: {
    title: 'NEET 2026 Schedule Questions',
    points: [
      {
        icon: 'calendar',
        question: 'When is NEET 2026 exam?',
        solution:
          'NEET 2026 is expected in May 2026. We update this page immediately when NTA announces the official date.',
      },
      {
        icon: 'clock',
        question: 'When does NEET 2026 application start?',
        solution:
          'NEET 2026 application is expected to open in February 2026. Get alerts when registration begins.',
      },
      {
        icon: 'file',
        question: 'What are the important dates to remember?',
        solution:
          'Track all important dates - application, admit card, exam, answer key, and result in one place.',
      },
    ],
  },

  benefits: {
    title: 'NEET 2026 Important Dates (Expected)',
    subtitle: 'Mark your calendar',
    items: [
      {
        icon: 'calendar',
        title: 'Application Start',
        description:
          'NEET 2026 application expected to begin in February 2026. Online registration on neet.nta.nic.in.',
      },
      {
        icon: 'clock',
        title: 'Application Deadline',
        description:
          'Last date to apply expected in March 2026. Correction window usually available after deadline.',
      },
      {
        icon: 'file',
        title: 'Admit Card Release',
        description:
          'NEET 2026 admit card expected 15-20 days before exam. Download from NTA website.',
      },
      {
        icon: 'book',
        title: 'Exam Date',
        description:
          'NEET 2026 expected in first week of May 2026. Exam duration: 3 hours 20 minutes.',
      },
      {
        icon: 'check',
        title: 'Answer Key Release',
        description:
          'Provisional answer key expected within 7-10 days after exam. Objection window available.',
      },
      {
        icon: 'trophy',
        title: 'Result Declaration',
        description:
          'NEET 2026 result expected in June 2026. Check on neet.nta.nic.in and ntaresults.nic.in.',
      },
    ],
  },

  stats: [
    { value: 'May', label: 'Expected Exam Month', icon: 'calendar' },
    { value: '3:20', label: 'Exam Duration (hrs)', icon: 'clock' },
    { value: '180', label: 'Total Questions', icon: 'clipboard' },
    { value: '720', label: 'Maximum Marks', icon: 'trophy' },
  ],

  testimonials: [
    {
      name: 'Kavya R.',
      achievement: 'NEET 2025 - 670/720',
      quote:
        'Knowing the exact schedule helped me plan my preparation perfectly. I finished syllabus 2 months before the exam!',
      score: '670/720',
    },
    {
      name: 'Arjun P.',
      achievement: 'NEET 2025 - 655/720',
      quote:
        'Tracking important dates helped me not miss any deadline. The reminders were really helpful.',
      score: '655/720',
    },
  ],

  faqs: [
    {
      question: 'When is NEET 2026 exam date?',
      answer:
        'NEET 2026 is expected in the first week of May 2026. NTA will announce the official date in the notification, usually released in February.',
    },
    {
      question: 'When will NEET 2026 application form be released?',
      answer:
        'NEET 2026 application is expected to be released in February 2026 on the official NTA website neet.nta.nic.in.',
    },
    {
      question: 'When will NEET 2026 admit card be released?',
      answer:
        'NEET 2026 admit card is expected 15-20 days before the exam date. It can be downloaded from the NTA website.',
    },
    {
      question: 'When will NEET 2026 result be declared?',
      answer:
        'NEET 2026 result is expected in June 2026, typically 4-6 weeks after the exam. Results are declared on ntaresults.nic.in.',
    },
    {
      question: 'How many times is NEET conducted in a year?',
      answer:
        'NEET UG is typically conducted once a year in May. There is no second attempt in the same year.',
    },
  ],

  courseSummary: {
    title: 'NEET 2026 Preparation Course',
    duration: '12 months to exam',
    batchSize: 'Small batches (10-15 students)',
    features: [
      'Complete syllabus before exam',
      'Chapter-wise test series',
      'Full-length mock tests',
      'Answer key analysis practice',
      'Revision modules',
      'Doubt solving sessions',
    ],
    price: {
      original: 75000,
      discounted: 45000,
      emi: 'EMI from Rs. 3,750/month',
    },
  },

  cta: {
    title: 'Start Your NEET 2026 Preparation Today',
    subtitle: 'Time is precious. Begin your journey to NEET 2026 success now!',
    primaryButton: {
      text: 'Enroll Now',
      link: '/courses',
    },
    secondaryButton: {
      text: 'Book Free Demo',
      link: '/book-demo',
    },
    tertiaryButton: {
      text: 'Get Date Alerts',
      link: '/resources',
    },
  },

  relatedPages: [
    { title: 'NEET 2026 Syllabus', link: '/neet-syllabus-2026' },
    { title: 'NEET Application Form 2026', link: '/neet-application-form-2026' },
    { title: 'NEET 2026 Result', link: '/neet-result-2026' },
  ],

  contactButtons: defaultContactButtons,

  schema: {
    '@type': 'Course',
    courseName: 'NEET 2026 Schedule Guide',
    provider: 'Cerebrum Biology Academy',
    description:
      'Complete NEET 2026 exam schedule including exam date, application dates, admit card, and result dates.',
    duration: 'Reference Guide',
    price: 0,
    priceCurrency: 'INR',
  },
}

// NEET 2026 Result Page
const neetResult2026: SEOLandingContent = {
  slug: 'neet-result-2026',
  classLevel: 'universal',

  title: 'NEET 2026 Result | Check Score & Rank',
  metaDescription:
    'NEET 2026 result date, how to check result, scorecard download, cutoff marks. Complete guide to NEET UG 2026 results.',
  keywords: [
    'neet 2026 result',
    'neet result 2026',
    'neet ug 2026 result',
    'neet 2026 result date',
    'neet 2026 scorecard',
    'neet 2026 cutoff',
    'nta neet result 2026',
  ],

  hero: {
    headline: 'NEET 2026 Result & Scorecard',
    subheadline:
      'Complete guide to NEET 2026 result - expected date, how to check, scorecard download, cutoff marks, and counselling process.',
    highlightedText: 'June 2026',
    ctaText: 'Prepare for Success',
    ctaLink: '/courses',
    backgroundGradient: 'from-purple-900 via-violet-900 to-indigo-900',
  },

  painPoints: {
    title: 'NEET 2026 Result Information',
    points: [
      {
        icon: 'calendar',
        question: 'When will NEET 2026 result be declared?',
        solution:
          'NEET 2026 result is expected in June 2026. We update this page immediately when NTA announces the result.',
      },
      {
        icon: 'file',
        question: 'How to check NEET 2026 result?',
        solution:
          'Step-by-step guide to check your result on ntaresults.nic.in and download your scorecard.',
      },
      {
        icon: 'chart',
        question: 'What is the expected cutoff for NEET 2026?',
        solution:
          'Category-wise expected cutoff marks and percentile based on historical trends and difficulty analysis.',
      },
    ],
  },

  benefits: {
    title: 'NEET 2026 Result Guide',
    subtitle: 'Everything about results and next steps',
    items: [
      {
        icon: 'calendar',
        title: 'Result Date',
        description:
          'NEET 2026 result expected in June 2026, typically 4-6 weeks after the exam date.',
      },
      {
        icon: 'file',
        title: 'How to Check Result',
        description:
          'Visit ntaresults.nic.in, enter roll number and date of birth to view and download your scorecard.',
      },
      {
        icon: 'chart',
        title: 'Scorecard Details',
        description:
          'Scorecard includes subject-wise marks, total marks, percentile, and All India Rank (AIR).',
      },
      {
        icon: 'target',
        title: 'Cutoff Marks',
        description:
          'Category-wise qualifying cutoff: General 50th percentile, OBC/SC/ST 40th percentile, PwD 45th percentile.',
      },
      {
        icon: 'link',
        title: 'Counselling Process',
        description:
          'After result, register for MCC counselling (AIQ) and state counselling for seat allocation.',
      },
      {
        icon: 'trophy',
        title: 'Next Steps',
        description:
          'Guidance on counselling registration, document verification, and college selection process.',
      },
    ],
  },

  stats: [
    { value: 'June', label: 'Expected Result', icon: 'calendar' },
    { value: '720', label: 'Maximum Marks', icon: 'trophy' },
    { value: '50%', label: 'Qualifying (General)', icon: 'percent' },
    { value: 'AIR', label: 'Rank Declared', icon: 'chart' },
  ],

  testimonials: [
    {
      name: 'Sneha K.',
      achievement: 'NEET 2025 - 695/720',
      quote:
        'The counselling guidance after result was invaluable. I got into my dream medical college with proper planning!',
      score: '695/720',
    },
    {
      name: 'Vikram S.',
      achievement: 'NEET 2025 - 640/720',
      quote:
        'Understanding the cutoff trends helped me set realistic goals. I knew exactly what score I needed.',
      score: '640/720',
    },
  ],

  faqs: [
    {
      question: 'When will NEET 2026 result be declared?',
      answer:
        'NEET 2026 result is expected in June 2026, typically 4-6 weeks after the exam. NTA announces the exact date closer to the exam.',
    },
    {
      question: 'How to check NEET 2026 result?',
      answer:
        'Visit ntaresults.nic.in, click on NEET 2026 Result link, enter your roll number and date of birth to view and download your scorecard.',
    },
    {
      question: 'What is the qualifying cutoff for NEET 2026?',
      answer:
        'Based on historical trends: General - 50th percentile (~720-137 marks), OBC/SC/ST - 40th percentile, PwD - 45th percentile.',
    },
    {
      question: 'What does NEET scorecard contain?',
      answer:
        'The scorecard contains subject-wise marks for Physics, Chemistry, Biology, total marks, percentile score, and All India Rank.',
    },
    {
      question: 'What to do after NEET 2026 result?',
      answer:
        'Register for MCC counselling for central quota seats and state counselling for state quota seats. Keep documents ready for verification.',
    },
  ],

  courseSummary: {
    title: 'NEET 2026 Preparation Course',
    duration: '12 months comprehensive',
    batchSize: 'Small batches (10-15 students)',
    features: [
      'Target 650+ score preparation',
      'Mock test series with result analysis',
      'Previous year paper practice',
      'Counselling guidance included',
      'College selection assistance',
      'Document preparation help',
    ],
    price: {
      original: 75000,
      discounted: 45000,
      emi: 'EMI from Rs. 3,750/month',
    },
  },

  cta: {
    title: 'Aim for the Best NEET 2026 Result',
    subtitle: 'Join our program designed to help you achieve your target score',
    primaryButton: {
      text: 'Enroll Now',
      link: '/courses',
    },
    secondaryButton: {
      text: 'Book Free Demo',
      link: '/book-demo',
    },
    tertiaryButton: {
      text: 'Free Resources',
      link: '/resources',
    },
  },

  relatedPages: [
    { title: 'NEET 2026 Exam Date', link: '/neet-exam-date-2026' },
    { title: 'NEET Counselling Guide', link: '/neet-counselling-guide' },
    { title: 'NEET 2026 Syllabus', link: '/neet-syllabus-2026' },
  ],

  contactButtons: defaultContactButtons,

  schema: {
    '@type': 'Course',
    courseName: 'NEET 2026 Result Guide',
    provider: 'Cerebrum Biology Academy',
    description:
      'Complete guide to NEET 2026 result including expected date, how to check, scorecard, and cutoff marks.',
    duration: 'Reference Guide',
    price: 0,
    priceCurrency: 'INR',
  },
}

// NEET 2026 Application Form Page
const neetApplicationForm2026: SEOLandingContent = {
  slug: 'neet-application-form-2026',
  classLevel: 'universal',

  title: 'NEET 2026 Application Form | Registration Guide',
  metaDescription:
    'NEET 2026 application form - registration dates, how to apply, documents required, fees. Complete NEET UG 2026 application guide.',
  keywords: [
    'neet 2026 application form',
    'neet application 2026',
    'neet 2026 registration',
    'neet form 2026',
    'neet 2026 apply online',
    'neet ug 2026 application',
    'how to apply for neet 2026',
  ],

  hero: {
    headline: 'NEET 2026 Application Form Guide',
    subheadline:
      'Complete guide to NEET 2026 registration - application dates, step-by-step process, documents required, and fees.',
    highlightedText: 'Feb 2026',
    ctaText: 'Start Preparation',
    ctaLink: '/courses',
    backgroundGradient: 'from-cyan-900 via-blue-900 to-indigo-900',
  },

  painPoints: {
    title: 'NEET 2026 Application Questions',
    points: [
      {
        icon: 'calendar',
        question: 'When does NEET 2026 registration start?',
        solution:
          'NEET 2026 application is expected to start in February 2026. We update this page when NTA announces the dates.',
      },
      {
        icon: 'file',
        question: 'What documents are required for NEET 2026?',
        solution:
          'Complete checklist of documents - photo, signature, ID proof, category certificate, and other requirements.',
      },
      {
        icon: 'target',
        question: 'How to fill NEET 2026 application correctly?',
        solution:
          'Step-by-step guide to avoid common mistakes and fill the application form correctly first time.',
      },
    ],
  },

  benefits: {
    title: 'NEET 2026 Application Process',
    subtitle: 'Step-by-step registration guide',
    items: [
      {
        icon: 'user',
        title: 'Step 1: Registration',
        description:
          'Visit neet.nta.nic.in, click on New Registration, enter personal details and create login credentials.',
      },
      {
        icon: 'file',
        title: 'Step 2: Fill Application',
        description:
          'Login and fill academic details, address, exam center preferences, and other required information.',
      },
      {
        icon: 'upload',
        title: 'Step 3: Upload Documents',
        description:
          'Upload scanned photo (10-200 KB), signature (4-30 KB), and left thumb impression as per specifications.',
      },
      {
        icon: 'credit-card',
        title: 'Step 4: Pay Fee',
        description:
          'Pay application fee online: General ₹1700, OBC/EWS ₹1600, SC/ST/PwD ₹1000 (expected for 2026).',
      },
      {
        icon: 'check',
        title: 'Step 5: Confirmation',
        description: 'Download and save confirmation page. Print application for future reference.',
      },
      {
        icon: 'edit',
        title: 'Correction Window',
        description:
          'NTA provides correction window after last date. Limited corrections allowed with/without fee.',
      },
    ],
  },

  stats: [
    { value: 'Feb', label: 'Expected Start', icon: 'calendar' },
    { value: '₹1700', label: 'General Fee', icon: 'credit-card' },
    { value: 'Online', label: 'Application Mode', icon: 'globe' },
    { value: '7-10', label: 'Days to Complete', icon: 'clock' },
  ],

  testimonials: [
    {
      name: 'Priyanka M.',
      achievement: 'NEET 2025 Applicant',
      quote:
        'The step-by-step guide helped me fill the form without any errors. Photo upload specifications were especially helpful!',
    },
    {
      name: 'Parent of Rohan K.',
      achievement: 'NEET 2025 Applicant',
      quote:
        'As parents, we were confused about documents. The checklist made sure we had everything ready before the deadline.',
    },
  ],

  faqs: [
    {
      question: 'When will NEET 2026 application form be released?',
      answer:
        'NEET 2026 application is expected to be released in February 2026 on the official NTA website neet.nta.nic.in.',
    },
    {
      question: 'What is NEET 2026 application fee?',
      answer:
        'Expected fees: General category ₹1700, OBC/EWS ₹1600, SC/ST/PwD ₹1000. Payment can be made online via credit/debit card, net banking, or UPI.',
    },
    {
      question: 'What documents are required for NEET 2026 application?',
      answer:
        'Required: Passport size photo, signature, Class 10 certificate for DOB, Class 12 marksheet/certificate, category certificate (if applicable), ID proof.',
    },
    {
      question: 'Can I edit NEET 2026 application after submission?',
      answer:
        'Yes, NTA provides a correction window after the application deadline. Some details can be corrected with additional fee, others without fee.',
    },
    {
      question: 'What is the photo and signature size for NEET 2026?',
      answer:
        'Photo: 10-200 KB, JPG/JPEG format, 3.5x4.5 cm dimension. Signature: 4-30 KB, JPG/JPEG format, 3.5x1.5 cm dimension.',
    },
  ],

  courseSummary: {
    title: 'NEET 2026 Preparation Course',
    duration: '12 months comprehensive',
    batchSize: 'Small batches (10-15 students)',
    features: [
      'Complete syllabus coverage',
      'Application guidance included',
      'Document checklist provided',
      'Exam center strategy',
      'Mock tests with analysis',
      'Doubt solving sessions',
    ],
    price: {
      original: 75000,
      discounted: 45000,
      emi: 'EMI from Rs. 3,750/month',
    },
  },

  cta: {
    title: 'Prepare While You Wait for NEET 2026 Application',
    subtitle: 'Start your preparation now and be ready when registration opens',
    primaryButton: {
      text: 'Enroll Now',
      link: '/courses',
    },
    secondaryButton: {
      text: 'Book Free Demo',
      link: '/book-demo',
    },
    tertiaryButton: {
      text: 'Get Alerts',
      link: '/resources',
    },
  },

  relatedPages: [
    { title: 'NEET 2026 Eligibility', link: '/neet-eligibility-2026' },
    { title: 'NEET 2026 Exam Date', link: '/neet-exam-date-2026' },
    { title: 'NEET 2026 Syllabus', link: '/neet-syllabus-2026' },
  ],

  contactButtons: defaultContactButtons,

  schema: {
    '@type': 'Course',
    courseName: 'NEET 2026 Application Guide',
    provider: 'Cerebrum Biology Academy',
    description:
      'Complete guide to NEET 2026 application form including registration dates, documents, and step-by-step process.',
    duration: 'Reference Guide',
    price: 0,
    priceCurrency: 'INR',
  },
}

// Export all NEET guide pages
export const neetGuideSEOPages: Record<string, SEOLandingContent> = {
  // NEET 2025 pages
  'neet-syllabus-2025': neetSyllabus2025,
  'neet-eligibility-criteria': neetEligibilityCriteria,
  'neet-exam-pattern-2025': neetExamPattern2025,
  'neet-counselling-guide': neetCounsellingGuide,
  'neet-biology-syllabus-2025': neetBiologySyllabus2025,
  'neet-botany-syllabus': neetBotanySyllabus,
  'neet-zoology-syllabus': neetZoologySyllabus,
  'neet-preparation-guide': neetPreparationGuide,
  'neet-exam-details': neetExamDetails,
  'neet-registration-guide': neetRegistrationGuide,
  'neet-result-analysis': neetResultAnalysis,
  'neet-official-resources': neetOfficialResources,
  // NEET 2026 pages
  'neet-syllabus-2026': neetSyllabus2026,
  'neet-eligibility-2026': neetEligibility2026,
  'neet-exam-date-2026': neetExamDate2026,
  'neet-result-2026': neetResult2026,
  'neet-application-form-2026': neetApplicationForm2026,
}

// Helper to get all NEET guide slugs
export const getNeetGuideSlugs = (): string[] => Object.keys(neetGuideSEOPages)
