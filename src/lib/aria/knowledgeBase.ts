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
  weekday: {
    morning: '6:00 AM - 9:00 AM',
    afternoon: '2:00 PM - 5:00 PM',
    evening: '6:00 PM - 9:00 PM',
  },
  weekend: {
    morning: '8:00 AM - 12:00 PM',
    afternoon: '2:00 PM - 6:00 PM',
  },
}

export const STUDY_MATERIALS = {
  included: [
    'NCERT-based comprehensive notes',
    'Topic-wise question banks',
    'Previous year questions (2015-2024)',
    'Chapter-wise formula sheets',
    'Mind maps for quick revision',
    'Daily practice problems (DPPs)',
  ],
  optional: ['Printed hard copy notes (+₹2,500)', 'Video lecture USB drive (+₹3,000)'],
}

export const OBJECTION_HANDLERS = {
  tooExpensive: {
    response: `I understand budget is important. Let me share some options:

1. **Pursuit tier** (₹45,000-70,000) provides the same AIIMS faculty teaching at a more accessible price
2. **EMI options** available - spread payments over 2-3 installments
3. **Scholarships** for deserving students - based on entrance test performance

Remember, this is an investment in your medical career. Our 98% success rate means your chances of cracking NEET Biology are excellent!

Would you like to know more about our scholarship program?`,
    followUp: ['Tell me about scholarships', 'EMI options', 'Compare with Pursuit tier'],
  },
  alreadyInCoaching: {
    response: `That's actually perfect! Most of our top performers are already enrolled in major coaching institutes. Here's why they choose us:

1. We **supplement** your main coaching - focus only on Biology (360 marks in NEET!)
2. Our **AIIMS faculty** brings real medical perspective
3. **Small batches** (10-40 students) vs 200+ in big coachings
4. **Flexible timings** that don't clash with your current schedule

Would you like to see how our batch timings can fit your schedule?`,
    followUp: ['Show batch timings', 'How is this different?', 'Book a demo'],
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
      'Cerebrum Biology Academy is a specialized NEET Biology coaching institute founded by AIIMS faculty members. We focus exclusively on Biology - the highest-scoring subject in NEET (360 marks out of 720). Our unique approach helps students supplement their existing coaching with expert biology guidance.',
  },
  whyOnlyBiology: {
    question: 'Why do you focus only on Biology?',
    answer:
      "Biology is 360 marks in NEET - half the total! Yet most coachings treat it as secondary to Physics & Chemistry. We believe in specialization. Our AIIMS faculty brings real medical perspective that general coachings can't match. Plus, Biology has the highest scoring potential with proper preparation.",
  },
  faculty: {
    question: 'Who are your faculty members?',
    answer:
      'Our faculty includes Dr. Shekhar (Founder, AIIMS graduate with 10+ years teaching experience) and a team of AIIMS/JIPMER doctors passionate about teaching. All our faculty members have personally scored 600+ in NEET and understand the exam from both sides.',
  },
  results: {
    question: 'What are your results?',
    answer:
      'Our track record: 98% of students score 320+ in Biology, 500+ students selected in top medical colleges, average improvement of 80-100 marks in Biology, and multiple AIR under 1000 selections.',
  },
  demoClass: {
    question: 'Can I attend a demo class?',
    answer:
      'Absolutely! We offer a FREE demo class so you can experience our teaching style. Our counselor will call you to schedule a convenient time. The demo includes a live class, Q&A session, and discussion about your preparation strategy.',
  },
  onlineVsOffline: {
    question: 'Do you have offline classes?',
    answer:
      'Yes! We have centers in Delhi NCR - Laxmi Nagar, Dwarka, Noida, and Gurgaon. You can choose online, offline, or hybrid mode based on your convenience. All modes have the same curriculum and faculty.',
  },
  studyMaterial: {
    question: 'What study materials do you provide?',
    answer:
      "We provide NCERT-based comprehensive notes, topic-wise question banks, 10 years of previous year questions with solutions, formula sheets, mind maps, and daily practice problems. All materials are curated by our AIIMS faculty and aligned with the latest NEET pattern.",
  },
  doubtClearing: {
    question: 'How does doubt clearing work?',
    answer:
      "We have a 24/7 AI doubt bot for instant answers, live doubt sessions during classes, dedicated doubt clearing slots, and direct WhatsApp access to faculty for Pinnacle students. No doubt goes unanswered!",
  },
}

export const CONTACT_POINTS = {
  phone: '+91 88264 44334',
  whatsapp: '+91 88264 44334',
  email: 'admissions@cerebrumbiologyacademy.com',
  centers: ['Laxmi Nagar, Delhi', 'Dwarka, Delhi', 'Noida', 'Gurgaon'],
  website: 'https://cerebrumbiologyacademy.com',
}

export const USP_POINTS = [
  '98% success rate - students score 320+ in Biology',
  '500+ medical college selections',
  'AIIMS faculty - learn from doctors who cracked NEET',
  'Small batches (10-40 students) for personal attention',
  '24/7 doubt support - AI + Human',
  'Money-back guarantee for Pinnacle tier',
  'Flexible online, offline, and hybrid options',
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
