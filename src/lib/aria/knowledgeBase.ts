/**
 * ARIA Sales Agent - Enhanced Knowledge Base
 * Contains all course information, pricing, objection handling, and FAQ data
 */

export const COURSE_TIERS = {
  pinnacle: {
    name: 'Pinnacle',
    tagline: "Toppers' Choice - For those aiming AIR under 1000",
    batchSize: '10-12 students',
    hoursPerWeek: '10-12 hours',
    features: [
      'Personal mentorship from Dr. Shekhar (AIIMS graduate)',
      '24/7 AI doubt resolution bot',
      'Weekly 1-on-1 counseling sessions',
      'Money-back guarantee if not satisfied',
      'Detailed performance analytics',
      'Priority doubt clearing',
      'Complete study material package',
    ],
  },
  ascent: {
    name: 'Ascent',
    tagline: 'Most Popular - Perfect balance of quality and value',
    batchSize: '16-18 students',
    hoursPerWeek: '8 hours',
    features: [
      'AIIMS faculty teaching',
      'Complete study materials',
      'Group doubt sessions',
      'Performance tracking dashboard',
      'Monthly parent-teacher meetings',
      'Test series included',
    ],
  },
  pursuit: {
    name: 'Pursuit',
    tagline: 'Affordable Excellence - Serves the purpose well',
    batchSize: '30-40 students',
    hoursPerWeek: '6 hours',
    features: [
      'AIIMS faculty teaching',
      'Essential study materials',
      'Recorded lecture access',
      'Weekly tests',
      'Online doubt forum',
    ],
  },
}

export const PRICING = {
  'Class IX Foundation': {
    pinnacle: '₹90,000',
    ascent: '₹60,000',
    pursuit: '₹45,000',
  },
  'Class X Foundation': {
    pinnacle: '₹90,000',
    ascent: '₹60,000',
    pursuit: '₹45,000',
  },
  'Class XI NEET': {
    pinnacle: '₹98,000',
    ascent: '₹76,000',
    pursuit: '₹48,000',
  },
  'Class XII NEET / Dropper (Pinnacle ZA)': {
    pinnacle: '₹1,56,000 (includes Class 11+12 simultaneous teaching, NEET Test Series, Supervised Learning, Mentorship)',
    ascent: '₹76,000 (Class XII) / ₹90,000 (Dropper)',
    pursuit: '₹70,000',
  },
  '2-Year Complete (11+12)': {
    pinnacle: '₹1,80,000',
    ascent: '₹1,40,000',
    pursuit: '₹85,000',
  },
}

export const PAYMENT_OPTIONS = {
  lumpSum: 'Best price - Full payment upfront',
  twoInstallments: '+₹2,000-8,000 depending on course',
  threeInstallments: '+₹3,000-12,000 depending on course',
}

export const ADD_ONS = {
  testSeries: {
    name: 'NEET Test Series',
    price: '₹8,000/year',
    description: '50+ full-length mock tests with detailed analysis',
  },
  mentorPlus: {
    name: 'Mentor Plus',
    price: '₹1,50,000/year',
    description: 'Weekly 1-on-1 counseling with Dr. Shekhar',
  },
  intensive: {
    name: 'Intensive Program',
    price: '₹3,60,000/year',
    description: 'Ultra-personalized program (only with Pinnacle)',
  },
}

export const BATCH_TIMINGS = {
  batch1: {
    schedule: 'Mon/Wed, 6:00 PM - 7:30 PM',
    location: 'Gurugram',
    format: 'Offline/Hybrid/Online',
  },
  batch2: {
    schedule: 'Sat/Sun, 9:30 AM - 11:00 AM',
    location: 'South Delhi (South Extension)',
    format: 'Offline/Hybrid/Online',
  },
  batch3: {
    schedule: 'Sat/Sun, 3:30 PM - 5:00 PM',
    location: 'Gurugram',
    format: 'Offline/Hybrid/Online',
  },
  batch4: {
    schedule: 'Tue/Thu, 4:15 PM - 5:45 PM',
    location: 'Rohini',
    format: 'Offline/Hybrid/Online',
  },
  batch5: {
    schedule: 'Sat/Sun, 7:30 PM - 9:00 PM',
    location: 'Gurugram',
    format: 'Offline/Hybrid/Online',
  },
  neetClass: {
    schedule: 'Wed 7:30-8:30 PM OR Sun 6:15-7:15 PM (choose one)',
    location: 'All centers',
    format: 'Weekly session',
  },
  weeklyTest: {
    schedule: 'Mon 8:30-9:30 PM',
    location: 'Online (offline/custom times available)',
    format: 'Weekly assessment',
  },
  dropperBatches: {
    schedule: 'Morning batches (first half) also available',
    location: 'All centers',
    format: 'Specially for dropper students',
  },
}

export const STUDY_MATERIALS = {
  included: [
    'NCERT-based comprehensive notes',
    'Recorded lectures (access to all live classes)',
    'Topic-wise question banks',
    'Previous year questions (2015-2024)',
    'Chapter-wise formula sheets',
    'Mind maps for quick revision',
    'Daily practice problems (DPPs)',
  ],
  optional: ['Printed hard copy notes (+₹2,500)', 'Video lecture USB drive (+₹3,000)'],
}

export const ASSESSMENT_SYSTEM = {
  included: [
    'Weekly Tests - NEET-pattern MCQ tests',
    'Monthly Tests - Full-length mock tests',
    'Biweekly Board Tests - Subjective school-level tests',
    'NEET Test Series - 50+ full-length mock tests',
    'Detailed performance analysis and reports',
    'All India rank comparison',
  ],
}

export const ADDITIONAL_PROGRAMS = {
  foundation: {
    name: 'Class 9th & 10th Foundation Course',
    description: 'NEET Biology foundation preparation for Class 9 & 10 students',
    features: [
      'Early start for NEET preparation',
      'NCERT-based curriculum',
      'Age-appropriate teaching methodology',
      'Foundation for competitive exams',
    ],
  },
  olympiads: {
    name: 'Biology Olympiad Preparation',
    description: 'Specialized preparation for IBO, NTSE, NSEB and other Biology Olympiads',
    features: [
      'IBO (International Biology Olympiad) preparation',
      'NTSE (National Talent Search Examination)',
      'NSEB (National Standard Examination in Biology)',
      'Advanced problem-solving techniques',
      'Previous year olympiad questions',
      'Expert mentorship for competitive biology',
    ],
  },
  internationalCurricula: {
    name: 'International Curricula',
    description: 'AP Biology & IB Biology preparation for international board students',
    features: [
      'AP Biology - College Board curriculum',
      'IB Biology (Standard Level & Higher Level)',
      'ICSE Biology for Class 9-12',
      'CBSE Biology for Class 9-12',
      'International exam pattern familiarity',
      'Expert faculty with international teaching experience',
    ],
  },
}

export const OBJECTION_HANDLERS = {
  tooExpensive: {
    response: `I understand budget is important. Let me share some options:

1. **Pursuit tier** (₹45,000-70,000) provides the same AIIMS faculty teaching at a more accessible price
2. **EMI options** available - spread payments over 2-3 installments
3. **Scholarships & Fee Waivers** - If your concern is genuine and you're serious about NEET, Dr. Shekhar Sir is very kind and personally helps deserving students. After a simple test, he may provide significant fee waivers for students facing financial difficulties.

Remember, this is an investment in your medical career. Our 98% success rate means your chances of cracking NEET Biology are excellent!

Would you like me to arrange a meeting with Dr. Shekhar Sir to discuss personalized options?`,
    followUp: ['Meet Dr. Shekhar Sir', 'EMI options', 'Compare with Pursuit tier'],
  },
  alreadyInCoaching: {
    response: `Perfect! That's exactly what most of our top performers do. Think about it - in those big corporate coachings with 200-300 students per batch, will your teacher even remember your name? Your face? How will they help YOU specifically get good results?

Here's why serious NEET aspirants supplement with Cerebrum - India's finest NEET Biology institute:

1. **Biology is 360 marks** - Half of NEET! You need someone who PERSONALLY cares about YOUR Biology score
2. **We remember your name** - Small batches (10-40 students). We know your strengths, weaknesses, and goals
3. **AIIMS faculty** who actually understand medical entrance exams - not just teaching as a job
4. **Personal mentorship** - Dr. Shekhar personally teaches select batches. When was the last time your Aakash/Allen/PW teacher knew your personal challenges?
5. **Flexible timings** - We work around your main coaching schedule

Do crowded corporate coachings really care about YOUR goal? Or are you just enrollment number #2847? We're not competing with them - we're giving you what they CAN'T: personal attention for Biology excellence.

Would you like to see how we can complement your preparation?`,
    followUp: ['Show batch timings', 'Book a demo', 'Tell me about personal mentorship'],
  },
  notSureAboutOnline: {
    response: `I completely understand! Online learning needs to be experienced to be appreciated. Here's what we offer:

1. **FREE demo class** - experience our teaching style firsthand
2. **Offline centers** available in Delhi NCR (Laxmi Nagar, Dwarka, Noida, Gurgaon)
3. **Hybrid option** - combine online + offline as needed
4. Our online platform has **interactive features** - live doubts, polls, recordings

Would you like to book a free demo class to experience it yourself?`,
    followUp: ['Book free demo', 'Show offline centers', 'Learn about hybrid'],
  },
  willJoinLater: {
    response: `Of course, timing is important! However, I should mention:

1. **Current batch** is closing in 2 weeks - limited seats
2. **Early bird discount** of ₹5,000 expires soon
3. Starting earlier means **more practice time** before NEET
4. You can **lock the price** now and join next month

The NEET syllabus is vast - every day counts! Would you like to secure your spot now?`,
    followUp: ['Lock early bird price', "What's the deadline?", 'Tell me more'],
  },
  needToAskParents: {
    response: `Absolutely! Parents should be involved in this decision. Here's how we can help:

1. I can arrange a **call with our counselor** to speak with your parents
2. Send you our **brochure with full pricing** to share
3. Schedule a **family demo session** where parents can attend

What works best for your family?`,
    followUp: ['Arrange parent call', 'Send brochure', 'Family demo session'],
  },
  comparingWithOthers: {
    response: `Smart approach! Here's what makes us unique:

| Feature | Cerebrum | Others |
|---------|----------|--------|
| Faculty | AIIMS doctors | Mixed |
| Batch size | 10-40 | 200+ |
| Focus | Biology only | All subjects |
| Success rate | 98% | Varies |
| Doubt support | 24/7 AI + Human | Limited |

We specialize in what we do best - NEET Biology. Would you like a side-by-side comparison?`,
    followUp: ['More comparison details', 'Why only Biology?', 'Book demo'],
  },
}

export const FAQ_DATA = {
  about: {
    question: 'What is Cerebrum Biology Academy?',
    answer:
      'Cerebrum Biology Academy was founded in 2015 by Dr. Shekhar C Singh, an AIIMS Delhi graduate who scored 680/720 in NEET Biology. We are a specialized NEET Biology coaching institute focusing exclusively on Biology - the highest-scoring subject in NEET (360 marks out of 720). We have coached 2,847+ students across nine years with a 98% NEET qualification rate.',
  },
  whyOnlyBiology: {
    question: 'Why do you focus only on Biology?',
    answer:
      "Biology is 360 marks in NEET - half the total! Yet most coachings treat it as secondary to Physics & Chemistry. We believe in specialization. Our AIIMS faculty brings real medical perspective that general coachings can't match. Biology has the highest scoring potential with proper preparation - our students average 80-100 marks improvement in Biology alone.",
  },
  faculty: {
    question: 'Who are your faculty members?',
    answer:
      'Our faculty includes Dr. Shekhar C Singh (Founder, AIIMS Delhi 2014 graduate with 15+ years teaching experience) and a team of 50-100 AIIMS/top medical college graduates. All faculty are PhD holders from premier institutes with 100+ combined years of teaching expertise. Dr. Singh personally teaches select batches to maintain quality.',
  },
  results: {
    question: 'What are your results?',
    answer:
      'Our track record: 98% NEET qualification rate, 500+ students in medical colleges, 47 AIIMS selections across seven campuses, 27 students ranked in India\'s top 1,000, 183 government medical college admissions. Star achievement: Sadhna Sirin scored 695/720 (100 percentile in Biology) on NEET 2023.',
  },
  neetExamPattern: {
    question: 'What is the NEET exam pattern for 2026?',
    answer:
      'NEET 2026 will have 200 questions total (180 compulsory). Biology has 90 questions (45 from Class 11, 45 from Class 12). Each correct answer gives +4 marks, incorrect -1 mark. The exam is held once a year (expected May 3, 2026). There is no cap on attempts - candidates aged 17+ can take NEET as many times as needed.',
  },
  neetEligibility: {
    question: 'What is the eligibility criteria for NEET 2026?',
    answer:
      'Candidates must pass 10+2 or equivalent with individual passing grades in Physics, Chemistry, Biology/Biotechnology, and English. Minimum age is 17 years. There is no upper age limit. You can take NEET as many times as you want - there is no cap on attempts.',
  },
  neetSyllabus: {
    question: 'What is the NEET Biology syllabus?',
    answer:
      'NEET Biology is based on NCERT Class 11 & 12 curriculum. High-weightage topics: Human Physiology, Genetics & Evolution, Reproduction, Plant Physiology, Ecology. NEET 2025 analysis shows Cell, Plant Kingdom, and Molecular Basis of Inheritance had maximum questions. NCERT accounts for ~70% of NEET questions.',
  },
  whenToStartPreparation: {
    question: 'When should I start NEET preparation?',
    answer:
      'Ideally start from Class 9-10 with foundation courses for early conceptual clarity. Class 11 is when serious NEET prep begins. Starting early means more practice time - the NEET syllabus is vast. We offer foundation courses for Class 9-10 (₹45K-₹90K), Class 11 comprehensive (₹48K-₹98K), and intensive Class 12/Dropper programs.',
  },
  demoClass: {
    question: 'Can I attend a demo class?',
    answer:
      'Yes! We offer a FREE 45-minute demo class (₹2,000 value) with study materials included. You can experience our teaching style, meet our faculty, and discuss your preparation strategy. Call +91 88264 44334 or WhatsApp to schedule a convenient time for your demo.',
  },
  onlineVsOffline: {
    question: 'Do you have offline classes?',
    answer:
      'Yes! We have offline centers at: Gurugram Sector-51 M2K Corporate Park, South Extension Delhi, and Rohini Sector-9 Delhi. You can choose online, offline, or hybrid mode. All formats have the same expert faculty and curriculum. Our live online classes have recordings, test analysis, and customized courses.',
  },
  studyMaterial: {
    question: 'What study materials do you provide?',
    answer:
      'We provide: NCERT-based comprehensive notes, 10,000+ practice questions, topic-wise question banks, 10 years previous year NEET questions with solutions, chapter-wise formula sheets, mind maps for quick revision, Daily Practice Problems (DPPs), recorded lectures (all live classes), and 7,000+ free MCQs (no login required). All materials are curated by AIIMS faculty.',
  },
  doubtClearing: {
    question: 'How does doubt clearing work?',
    answer:
      '24/7 WhatsApp doubt support, live doubt sessions during classes, dedicated doubt clearing slots, and direct WhatsApp access to faculty for Pinnacle students. We also have an AI doubt bot for instant answers. No doubt goes unanswered - we ensure every concept is crystal clear.',
  },
  batchSize: {
    question: 'What are your batch sizes?',
    answer:
      'We maintain small batches for personalized attention: Pinnacle (10-12 students), Ascent (16-18 students), Pursuit (30-40 students). Unlike large coachings with 200+ students per batch, our small sizes enable individual mentoring and personal guidance from faculty.',
  },
  testSeries: {
    question: 'Do you provide test series?',
    answer:
      'Yes! Included in all courses: Weekly Tests (NEET-pattern MCQs), Monthly Tests (full-length mocks), Biweekly Board Tests (subjective school-level). NEET Test Series has 50+ full-length mock tests with detailed performance analysis, All India rank comparison, and personalized weak area reports. Additional test series available for ₹8,000/year.',
  },
  coachingNecessary: {
    question: 'Is coaching necessary for NEET?',
    answer:
      'While self-study is possible, coaching provides structured guidance, expert mentorship, regular testing, and peer learning. NEET 2026 aspirants benefit from experienced faculty who understand exam patterns, common mistakes, and scoring strategies. Our 98% success rate shows the value of expert guidance. We offer a free demo to help you decide.',
  },
  alreadyInCoaching: {
    question: 'I am already in Aakash/Allen/PhysicsWallah. Should I join Cerebrum?',
    answer:
      'Absolutely YES! 70% of our top performers are already in Allen, Aakash, or PW. Here\'s the reality: In those crowded batches of 200-300 students, will your teacher remember your name? Your specific weak areas? Biology is 360 marks - HALF of NEET! You need personal attention, not just lectures. We are India\'s finest NEET Biology institute - we SUPPLEMENT your main coaching with: (1) Small batches where faculty knows YOU personally (10-40 students), (2) AIIMS faculty who actually care about your individual goals, (3) Personal mentorship from Dr. Shekhar himself, (4) Flexible timings that complement your schedule. Corporate coachings teach everyone the same way. We teach YOU the way you need. Ask yourself: Does your current coaching teacher know your Biology weak areas? We will.',
  },
  parentInvolvement: {
    question: 'How can parents support NEET preparation?',
    answer:
      'Parents should show trust over expectations. Ask "How are you feeling?" instead of "How much did you score?" - emotions matter more than marks during this demanding journey. We provide: monthly parent-teacher meetings (Pinnacle tier), transparent progress tracking, performance reports, and direct counselor access. Your belief matters more than constant checking.',
  },
}

export const CONTACT_POINTS = {
  phone: '+91 8826444334',
  phone2: '+91 9311946297',
  whatsapp: '+91 8826444334',
  email: 'admissions@cerebrumbiologyacademy.com',
  centers: [
    'Gurugram - Sector 51, M2K Corporate Park',
    'South Extension, Delhi',
    'Rohini Sector-9, Delhi',
  ],
  website: 'https://cerebrumbiologyacademy.com',
}

export const USP_POINTS = [
  '98% NEET qualification rate - students score 320+ in Biology',
  '2,847+ students coached with 500+ medical college admissions',
  'Founded by Dr. Shekhar C Singh - AIIMS Delhi graduate (680/720 in NEET Biology)',
  'AIIMS faculty - learn from doctors who cracked NEET',
  'Small batches (10-40 students) - not 200+ like big coachings',
  '47 AIIMS selections across seven campuses',
  '27 students ranked in India\'s top 1,000',
  '10,000+ practice questions and 50+ full-length mock tests',
  '24/7 doubt support - AI bot + WhatsApp + live sessions',
  'Proprietary "Concept Pyramid" method for conceptual clarity',
  'Money-back guarantee for Pinnacle tier',
  'Flexible online, offline, and hybrid options',
  'Recorded lectures + Weekly/Monthly/Biweekly tests included',
  'Free 45-minute demo class (₹2,000 value) with study materials',
]

export const SCHOLARSHIP_INFO = {
  criteria: [
    'Based on performance in our entrance test',
    'Up to 50% scholarship for exceptional students',
    'Special consideration for financial need',
    'Early bird applicants get priority',
  ],
  howToApply: 'Book a demo class and request scholarship assessment during the session.',
}

export const ACADEMY_HISTORY = {
  founded: '2015',
  founder: 'Dr. Shekhar C Singh (AIIMS Delhi 2014 graduate)',
  founderScore: '680/720 in NEET Biology',
  origin:
    'Started with 23 students in a 400 sq ft room in Rohini. Dr. Singh chose teaching over medical practice after witnessing capable students struggle with Biology despite expensive coaching.',
  growth: '2,847+ students coached across nine years',
  rating: '4.9/5 Google rating (500+ reviews)',
}

export const TEACHING_METHODOLOGY = {
  approach: 'Concept-based learning rather than rote memorization',
  strategy: 'NEET-focused strategic approach aligned with exam patterns',
  uniqueMethod: 'Proprietary "Concept Pyramid" method for conceptual clarity',
  focus: 'Small batch sizes enable personalized mentoring for individual student success',
  ncertEmphasis: 'NCERT-based preparation (accounts for ~70% of NEET questions)',
}

export const NOTABLE_ACHIEVEMENTS = {
  topScore: 'Sadhna Sirin - 695/720 (100 percentile in Biology) NEET 2023',
  successRate: '98% NEET qualification rate',
  totalAdmissions: '500+ medical college selections',
  aiimsSelections: '47 AIIMS selections across seven campuses',
  topRanks: "27 students ranked in India's top 1,000",
  govtColleges: '183 government medical college admissions',
  averageImprovement: '80-100 marks improvement in Biology',
}
