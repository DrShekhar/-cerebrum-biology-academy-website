// Comprehensive Help Center Data for Cerebrum Biology Academy

export interface FAQ {
  id: string
  question: string
  answer: string
  category: FAQCategory
  tags: string[]
  relatedQuestions?: string[] // IDs of related FAQs
  priority?: number // 1-5, higher = more important
}

export type FAQCategory =
  | 'getting-started'
  | 'courses-programs'
  | 'demo-classes'
  | 'academic'
  | 'technical'
  | 'billing-payments'
  | 'account-management'
  | 'exams-tests'
  | 'support'
  | 'policies'

export interface HelpCategory {
  id: FAQCategory
  name: string
  description: string
  icon: string
  color: string
  order: number
}

export const helpCategories: HelpCategory[] = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    description: 'Enrollment, onboarding, and first steps with Cerebrum',
    icon: 'RocketLaunchIcon',
    color: 'blue',
    order: 1,
  },
  {
    id: 'courses-programs',
    name: 'Courses & Programs',
    description: 'Details about Pinnacle, Ascent, and Pursuit tiers',
    icon: 'AcademicCapIcon',
    color: 'purple',
    order: 2,
  },
  {
    id: 'demo-classes',
    name: 'Demo Classes',
    description: 'Booking demos and what to expect',
    icon: 'PlayCircleIcon',
    color: 'green',
    order: 3,
  },
  {
    id: 'academic',
    name: 'Academic Support',
    description: 'Syllabus, study materials, and doubt clearing',
    icon: 'BookOpenIcon',
    color: 'indigo',
    order: 4,
  },
  {
    id: 'technical',
    name: 'Technical Help',
    description: 'Platform access, login issues, and app usage',
    icon: 'ComputerDesktopIcon',
    color: 'cyan',
    order: 5,
  },
  {
    id: 'billing-payments',
    name: 'Billing & Payments',
    description: 'Fees, installments, refunds, and scholarships',
    icon: 'CreditCardIcon',
    color: 'emerald',
    order: 6,
  },
  {
    id: 'account-management',
    name: 'Account Management',
    description: 'Profile settings, passwords, and preferences',
    icon: 'UserCircleIcon',
    color: 'orange',
    order: 7,
  },
  {
    id: 'exams-tests',
    name: 'Exams & Tests',
    description: 'Mock tests, performance tracking, and results',
    icon: 'ClipboardDocumentCheckIcon',
    color: 'pink',
    order: 8,
  },
  {
    id: 'support',
    name: 'Contact & Support',
    description: 'Get help from our team',
    icon: 'ChatBubbleLeftRightIcon',
    color: 'teal',
    order: 9,
  },
  {
    id: 'policies',
    name: 'Policies & Terms',
    description: 'Refund policy, terms of service, and guidelines',
    icon: 'ShieldCheckIcon',
    color: 'gray',
    order: 10,
  },
]

export const allFAQs: FAQ[] = [
  // GETTING STARTED (12 FAQs)
  {
    id: 'gs-001',
    question: 'How do I enroll in a NEET Biology course?',
    answer:
      'To enroll: 1) Visit our Pricing page to select your class and tier (Pinnacle/Ascent/Pursuit). 2) Click "Enroll Now" on your chosen tier. 3) Fill in your details including name, class, and contact information. 4) Choose your payment option (lump sum or installments). 5) Complete payment via Razorpay (UPI, cards, netbanking accepted). 6) You will receive login credentials via email within 24 hours. Alternatively, book a free demo class first to experience our teaching before enrolling.',
    category: 'getting-started',
    tags: ['enrollment', 'registration', 'how-to', 'getting-started'],
    priority: 5,
    relatedQuestions: ['gs-002', 'bc-001', 'dc-001'],
  },
  {
    id: 'gs-002',
    question: 'What documents do I need for enrollment?',
    answer:
      'Required documents: 1) Student photograph (passport size, digital copy). 2) School ID card or marksheet proving current class. 3) Aadhaar card of student (for identity verification). 4) Parent/Guardian contact details. 5) Previous NEET attempt details (for droppers only). Optional but helpful: Previous academic records, any medical entrance test scores. All documents can be uploaded digitally during the enrollment process or emailed to admissions@cerebrumbiologyacademy.com',
    category: 'getting-started',
    tags: ['documents', 'enrollment', 'requirements'],
    priority: 4,
    relatedQuestions: ['gs-001', 'gs-003'],
  },
  {
    id: 'gs-003',
    question: 'When do new batches start?',
    answer:
      'New batches start every month throughout the year. Major intake periods: April-May (post boards), June-July (academic year start), and January (dropper batches post-NEET results). You can join mid-session with catch-up classes provided. To check the next available batch for your class and tier, visit our enrollment page or call +91-88264-44334. Seats fill quickly, especially in Pinnacle tier (only 10-12 students per batch).',
    category: 'getting-started',
    tags: ['batches', 'start-date', 'timing'],
    priority: 5,
  },
  {
    id: 'gs-004',
    question: 'Can I join mid-session?',
    answer:
      'Yes, mid-session joining is allowed with conditions: 1) You will receive recorded sessions of all missed classes. 2) Dedicated catch-up sessions scheduled on weekends. 3) One-on-one doubt clearing for missed topics (Pinnacle and Ascent tiers). 4) No reduction in course fee for late joining. 5) Study materials for covered topics provided immediately. Best to join within the first 2 months of batch start for optimal results. Contact our counselors to assess your readiness for mid-session entry.',
    category: 'getting-started',
    tags: ['mid-session', 'late-joining', 'batch'],
    priority: 3,
  },
  {
    id: 'gs-005',
    question: 'What happens after I enroll?',
    answer:
      'Post-enrollment process: Day 1 - Payment confirmation and welcome email with login credentials. Day 2-3 - Access to student portal activated, study materials available for download. Day 4-7 - Orientation session scheduled (covers platform usage, study plan, expectations). First Week - Diagnostic test to assess baseline knowledge. Ongoing - Access to live classes, recorded sessions, doubt clearing, mock tests, and performance tracking. Parent dashboard access provided. Welcome kit (physical study materials) shipped within 7 working days.',
    category: 'getting-started',
    tags: ['onboarding', 'after-enrollment', 'process'],
    priority: 4,
  },
  {
    id: 'gs-006',
    question: 'Is there an orientation program for new students?',
    answer:
      'Yes, comprehensive orientation included: 1) Platform Navigation - How to access live classes, recorded videos, study materials. 2) Study Strategy - NEET preparation roadmap, time management tips. 3) Faculty Introduction - Meet your biology teachers and mentors. 4) Doubt Clearing Process - How to ask questions, session timings. 5) Test Series Overview - Mock test schedule and analysis methods. 6) Parent Portal Demo - For tracking student progress. Duration: 2-hour interactive session, typically held on weekends. Recorded for those who miss it.',
    category: 'getting-started',
    tags: ['orientation', 'onboarding', 'introduction'],
    priority: 3,
  },
  {
    id: 'gs-007',
    question: 'What is the age limit for enrollment?',
    answer:
      'No strict age limit at Cerebrum. Typically: Class 9th Foundation - 13-15 years. Class 10th Foundation - 14-16 years. Class 11th NEET - 15-17 years. Class 12th NEET - 16-18 years. Dropper Program - 18-25 years (we have successfully trained students up to 27 years). What matters more than age is dedication and willingness to learn. Special consideration for late starters or career changers - contact our counselors for personalized guidance.',
    category: 'getting-started',
    tags: ['age-limit', 'eligibility', 'requirements'],
    priority: 2,
  },
  {
    id: 'gs-008',
    question: 'Do you offer trial classes before enrollment?',
    answer:
      'Yes, we offer FREE demo classes (no credit card required): 1) One full-length live class (90 minutes) in your chosen tier. 2) Access to sample study materials and notes. 3) Demo of the student portal and features. 4) One-on-one counseling session with our academic advisor. 5) No obligation to enroll afterward. Book your demo at www.cerebrumbiologyacademy.com/demo-booking or call +91-88264-44334. Available for all tiers (Pinnacle/Ascent/Pursuit) and all classes. Most students enroll after experiencing our teaching quality.',
    category: 'getting-started',
    tags: ['trial', 'demo', 'free-class'],
    priority: 5,
    relatedQuestions: ['dc-001', 'dc-002'],
  },
  {
    id: 'gs-009',
    question: 'Can I upgrade or downgrade my tier after enrollment?',
    answer:
      'Yes, tier changes allowed with conditions: UPGRADE (Pursuit→Ascent→Pinnacle): Allowed within first 30 days, pay the difference, subject to seat availability in target tier. DOWNGRADE: Not recommended, but allowed within first 15 days only. Refund of difference (minus processing fee). Policy rationale: We assign mentors and prepare materials based on tier. Frequent changes disrupt learning. Best practice: Book a demo in your desired tier before enrolling to make an informed choice.',
    category: 'getting-started',
    tags: ['tier-change', 'upgrade', 'downgrade'],
    priority: 3,
  },
  {
    id: 'gs-010',
    question: 'Is parental consent required for enrollment?',
    answer:
      'Yes, for students under 18: Parent/guardian consent is mandatory. Parent/guardian must complete the enrollment form and payment. Parent dashboard access provided for progress tracking. Parent-teacher meetings scheduled quarterly (monthly for Pinnacle). For students 18+: Self-enrollment allowed, but we encourage parental involvement. Parent access can still be provided on request. Why: We believe parental support significantly improves student outcomes, especially for NEET preparation.',
    category: 'getting-started',
    tags: ['parental-consent', 'requirements', 'age'],
    priority: 2,
  },
  {
    id: 'gs-011',
    question: 'How do I access the student portal for the first time?',
    answer:
      'First-time login steps: 1) Check your email for "Welcome to Cerebrum Academy" message (arrives within 24 hours of payment). 2) Note your username (usually your registered email) and temporary password. 3) Visit portal.cerebrumbiologyacademy.com 4) Enter credentials and login. 5) You will be prompted to change your password (choose a strong password). 6) Complete your profile with photo and additional details. 7) Watch the 5-minute welcome video for portal navigation. Trouble logging in? Contact support@cerebrumbiologyacademy.com or WhatsApp +91-88264-44334.',
    category: 'getting-started',
    tags: ['portal', 'login', 'first-time', 'access'],
    priority: 4,
  },
  {
    id: 'gs-012',
    question: 'What should I prepare before starting the course?',
    answer:
      'Pre-course preparation checklist: 1) NCERT textbooks for Biology (11th and 12th) - mandatory reference. 2) Dedicated study space at home with good internet (for online classes). 3) Notebook for notes (separate for each chapter). 4) Basic stationery (pens, highlighters, sticky notes). 5) Smartphone or laptop with camera/mic for live classes. 6) Mindset preparation - NEET requires 2-3 hours daily study commitment. 7) Review Class 9-10 biology basics if joining Class 11th. Not required: No need to buy additional books; we provide all study materials.',
    category: 'getting-started',
    tags: ['preparation', 'requirements', 'checklist'],
    priority: 3,
  },

  // COURSES & PROGRAMS (10 FAQs)
  {
    id: 'cp-001',
    question: 'What is the difference between Pinnacle, Ascent, and Pursuit tiers?',
    answer:
      'PINNACLE (Premium): Batch size 10-12 students, 5-6 hours/week, personal mentor assigned, weekly 1-on-1 sessions, priority doubt clearing, unlimited test attempts, best for top rankers. Price: ₹98K-₹180K depending on class. ASCENT (Standard): Batch size 16-25 students, 4-5 hours/week, group mentoring, regular doubt sessions, comprehensive test series, balanced approach. Price: ₹58K-₹85K. PURSUIT (Value): Batch size 30-40, 3-4 hours/week, self-paced learning support, essential study materials, affordable quality education. Price: ₹48K-₹72K. All tiers have same faculty and NCERT-focused curriculum.',
    category: 'courses-programs',
    tags: ['tiers', 'pinnacle', 'ascent', 'pursuit', 'difference'],
    priority: 5,
  },
  {
    id: 'cp-002',
    question: 'Which tier is best for me?',
    answer:
      'Choose based on your goals and budget: PINNACLE if: You are targeting AIIMS/top medical colleges (AIR under 1000), need maximum personal attention, can invest in premium coaching, want dedicated mentor. ASCENT if: You want balanced approach (quality + affordability), are a serious NEET aspirant targeting government medical colleges, need regular guidance but not 1-on-1. PURSUIT if: Budget is a constraint but you value quality education, can self-study with occasional guidance, targeting state medical colleges. Still confused? Book a free counseling call: +91-88264-44334',
    category: 'courses-programs',
    tags: ['tier-selection', 'recommendation', 'choosing'],
    priority: 5,
  },
  {
    id: 'cp-003',
    question: 'What does the Dropper Program include?',
    answer:
      'NEET Dropper Program (1-year intensive): Complete syllabus quick revision in 3 months, advanced problem-solving techniques, daily mock tests in NEET pattern, rank improvement strategies (avg 50K+ rank jump), speed and accuracy enhancement, weakness analysis and remediation, NEET counseling and college prediction, stress management sessions, previous 15 years NEET questions solved, separate dropper-only batches (no mixing with Class 11/12). Success rate: 95% of our droppers improve their rank significantly. Available in all three tiers. Starts every January (post-NEET results).',
    category: 'courses-programs',
    tags: ['dropper', 'program', 'intensive', 'neet'],
    priority: 5,
  },
  {
    id: 'cp-004',
    question: 'Can I take only Biology coaching or do I need all three subjects?',
    answer:
      'Cerebrum Academy specializes ONLY in NEET Biology coaching. We do not teach Physics or Chemistry. This is our strength - deep expertise in biology with Dr. Shekhar (AIIMS alumnus, 15+ years experience). For complete NEET preparation, you need to arrange Physics and Chemistry coaching separately. Many students pair our Biology program with other institutes for PCM. Why biology-only works: 1) Biology is 50% of NEET (180/360 marks). 2) Specialized focus means better results. 3) Our students score 160-180/180 in Biology, compensating for PCM weaknesses.',
    category: 'courses-programs',
    tags: ['biology-only', 'subjects', 'physics', 'chemistry'],
    priority: 4,
  },
  {
    id: 'cp-005',
    question: 'What is included in the course fee?',
    answer:
      'Comprehensive inclusions (all tiers): Live classes (online or offline based on location), recorded video library (lifetime access), study materials (printed books + digital PDFs), chapter-wise practice questions, NCERT line-by-line coverage, previous year NEET questions, mock test series, performance analytics dashboard, doubt clearing sessions, student portal access, mobile app access. Additional in Pinnacle: Personal mentor, 1-on-1 sessions, priority doubt clearing, advanced study materials, tablet with content (bonus). NOT included: NCERT textbooks (must buy separately), Physics/Chemistry coaching, hostel/accommodation.',
    category: 'courses-programs',
    tags: ['course-fee', 'inclusions', 'materials', 'what-included'],
    priority: 5,
  },
  {
    id: 'cp-006',
    question: 'How long is each program?',
    answer:
      'Program durations: Class 9th Foundation - 1 year (April to March), Class 10th Foundation - 1 year, Class 11th NEET - 2 years (continuous through 11th and 12th), Class 12th NEET - 1 year (intensive, April to April), Dropper Program - 1 year (January to December, aligned with NEET exam), Crash Course - 3-4 months (Feb-May, just before NEET). You also get extended access: Recorded videos for lifetime, study materials remain accessible even after course completion, continued doubt clearing support for 3 months post-course.',
    category: 'courses-programs',
    tags: ['duration', 'program-length', 'timeline'],
    priority: 4,
  },
  {
    id: 'cp-007',
    question: 'Is the coaching online or offline?',
    answer:
      'Flexible learning modes: ONLINE: Live classes via Zoom/Google Meet, available pan-India, recordings provided for missed classes. OFFLINE: Physical classroom coaching in Ahmedabad, Surat, Vadodara, Rajkot (Gujarat locations). HYBRID: Attend offline when possible, switch to online when needed (illness, travel), best of both worlds. You choose mode during enrollment. Mode can be changed once during the course (subject to availability). 80% students prefer online for flexibility; 20% prefer offline for classroom discipline.',
    category: 'courses-programs',
    tags: ['online', 'offline', 'hybrid', 'mode'],
    priority: 5,
  },
  {
    id: 'cp-008',
    question: 'What is the class schedule and timing?',
    answer:
      'Flexible timings to suit students: Weekday batches: 4:00-6:00 PM or 6:00-8:00 PM (post school hours), Weekend batches: 9:00-11:00 AM or 2:00-4:00 PM, Early morning batches: 6:00-8:00 AM (for Class 12th/Droppers). Class frequency: Class 9th/10th - 3 days/week, Class 11th/12th - 5-6 days/week, Droppers - 6 days/week. Duration per class: 90-120 minutes. Doubt clearing sessions: Separate scheduled timings (evening slots). You can choose timing preference during enrollment. Multiple batches available - pick what suits your school schedule.',
    category: 'courses-programs',
    tags: ['schedule', 'timing', 'class-hours'],
    priority: 4,
  },
  {
    id: 'cp-009',
    question: 'Who are the faculty members?',
    answer:
      'Meet our expert faculty: Dr. Shekhar Singh - Founder & Lead Faculty, MBBS from AIIMS Delhi, 15+ years NEET teaching experience, 67+ AIIMS selections, Specialization: Human Physiology, Genetics. Dr. Priya Patel - Senior Faculty, M.Sc Botany, Ph.D. Plant Sciences, 15+ years experience, Expert in: Plant biology, Ecology. Dr. Amit Sharma - Faculty, M.Sc Zoology, 8+ years experience, Known for simplified teaching of complex topics. All faculty are full-time dedicated teachers (not part-timers), undergo regular training on latest NEET patterns, personally review every student performance.',
    category: 'courses-programs',
    tags: ['faculty', 'teachers', 'instructors'],
    priority: 4,
  },
  {
    id: 'cp-010',
    question: 'Can I switch between online and offline modes?',
    answer:
      'Yes, mode switching allowed once per course: Process: Submit mode change request via student portal or email 7 days in advance, subject to seat availability in target mode (offline centers have limited capacity), no additional fee for switching. Conditions: Must have attended at least 1 month in current mode, cannot switch during exam/test weeks, recorded sessions provided during transition period. Common scenario: Students start online, switch to offline closer to exam for better focus, or vice versa if relocating. Contact support@cerebrumbiologyacademy.com for mode change requests.',
    category: 'courses-programs',
    tags: ['mode-switch', 'online-offline', 'flexibility'],
    priority: 3,
  },

  // DEMO CLASSES (5 FAQs)
  {
    id: 'dc-001',
    question: 'How do I book a free demo class?',
    answer:
      '3 easy ways to book: METHOD 1 - Online: Visit www.cerebrumbiologyacademy.com/demo-booking, fill the form (name, class, contact, preferred date/time), submit - you will get confirmation within 2 hours. METHOD 2 - Phone: Call +91-88264-44334, speak to our counselor, they will book your slot immediately. METHOD 3 - WhatsApp: Message "Demo" to +91-88264-44334, share your details, instant booking confirmation. Demo is completely FREE, no credit card required, no obligation to enroll. Available for all classes and tiers.',
    category: 'demo-classes',
    tags: ['demo', 'free-class', 'booking', 'trial'],
    priority: 5,
  },
  {
    id: 'dc-002',
    question: 'What happens during the demo class?',
    answer:
      'Demo class structure (90 minutes): First 60 minutes - Live teaching session on a key NEET biology topic (e.g., Cell Biology, Human Physiology), taught by our expert faculty, exactly like regular classes (not a sales pitch), interactive with Q&A encouraged. Next 20 minutes - Demo of study materials, portal tour, doubt clearing process demonstration. Last 10 minutes - Course overview, tier explanation, fees discussion (optional - only if you are interested). You also get: Sample study material PDF, recording of the demo session, follow-up counseling call. Parents are encouraged to attend. No pressure to enroll - decide after experiencing the quality.',
    category: 'demo-classes',
    tags: ['demo', 'what-happens', 'experience'],
    priority: 5,
  },
  {
    id: 'dc-003',
    question: 'Can I attend demo classes for multiple tiers?',
    answer:
      'Yes, you can attend demos for different tiers to compare: Recommended approach: Attend demo for your initially preferred tier, if unsure, request demo for another tier (allowed once more), compare teaching style, batch interaction, personal attention levels. Why attend multiple? Each tier has slightly different pedagogy: Pinnacle - highly personalized, frequent interaction, in-depth discussions. Ascent - balanced with good engagement. Pursuit - more lecture-based but equally effective. Most students finalize their tier choice after attending 1-2 demos. Book second demo by calling +91-88264-44334.',
    category: 'demo-classes',
    tags: ['multiple-demos', 'tier-comparison'],
    priority: 3,
  },
  {
    id: 'dc-004',
    question: 'Is the demo class the same quality as regular classes?',
    answer:
      'Absolutely YES - demo quality = regular class quality. In fact, many students say our demos are better than regular classes at other institutes! What makes our demo authentic: 1) Taught by the same faculty who will teach your batch (not marketing trainers). 2) Same curriculum, same materials, same portal. 3) Real student interactions (we often include current students in demo batches). 4) No scripted presentations - genuine teaching. 5) Same duration and depth. We do this because we are confident in our quality. After experiencing one demo, 87% students enroll. Try it to believe it!',
    category: 'demo-classes',
    tags: ['demo-quality', 'authenticity'],
    priority: 4,
  },
  {
    id: 'dc-005',
    question: 'Can my parents also attend the demo class?',
    answer:
      'Yes, we strongly encourage parental presence: Why parents should attend: Assess teaching quality and faculty expertise, understand our NEET preparation methodology, evaluate value for money, ask questions about student safety, schedule, support, make informed enrollment decisions together. Logistics: Parents can join online demos (separate link provided), can visit our center for offline demos, separate parent counseling session offered post-demo (optional). Special parent Q&A: 15-minute dedicated time for parents to ask about academic rigor, safety measures, success rates, fees, policies. 90% parents who attend demos feel confident about enrolling their child.',
    category: 'demo-classes',
    tags: ['parents', 'demo', 'parental-involvement'],
    priority: 3,
  },

  // ACADEMIC (8 FAQs)
  {
    id: 'ac-001',
    question: 'What syllabus is covered in NEET Biology coaching?',
    answer:
      'Complete NEET Biology syllabus based on NTA guidelines: Class 11th syllabus (50%): Diversity in Living World, Structural Organization (Plants & Animals), Cell Structure and Function, Plant Physiology, Human Physiology. Class 12th syllabus (50%): Reproduction, Genetics and Evolution, Biology and Human Welfare, Biotechnology and Applications, Ecology and Environment. Our approach: 100% NCERT-based (line-by-line coverage), additional reference materials for depth, current affairs in biology included, previous 10 years NEET question analysis integrated. Weightage focus: Human Physiology (20%), Genetics (15%), Ecology (12%), Cell Biology (10%), Plant Physiology (10%), remaining topics (33%).',
    category: 'academic',
    tags: ['syllabus', 'curriculum', 'topics', 'neet'],
    priority: 5,
  },
  {
    id: 'ac-002',
    question: 'How do I clear my doubts?',
    answer:
      'Multiple doubt clearing channels: 1) LIVE DOUBT SESSIONS - Scheduled 3-4 times/week, ask faculty directly in real-time, group benefit (others learn from your questions). 2) WHATSAPP DOUBT GROUP - Share doubt screenshots, faculty responds within 24 hours, available 7 days/week. 3) ONE-ON-ONE DOUBT SESSIONS (Pinnacle & Ascent only) - Personal video call with faculty, deep conceptual discussions, weekly scheduled. 4) AI-POWERED DOUBT BOT - Instant answers 24/7 for common queries, available on student portal. 5) POST-CLASS DOUBT TIME - Stay back after live class (10-15 mins), quick clarifications. Average doubt resolution time: 4-6 hours. No question is too basic or too silly - we encourage asking!',
    category: 'academic',
    tags: ['doubts', 'questions', 'clarification', 'help'],
    priority: 5,
  },
  {
    id: 'ac-003',
    question: 'What study materials are provided?',
    answer:
      'Comprehensive study package: PRINTED MATERIALS (shipped home): NCERT-based chapter books with theory, colored diagrams and flowcharts, practice MCQs (chapter-wise), previous year NEET questions with solutions, formula sheets and quick revision notes. DIGITAL MATERIALS (portal access): Downloadable chapter PDFs, animated video explanations, interactive diagrams, additional practice questions (1000+), biology current affairs monthly updates. EXCLUSIVE MATERIALS: Pinnacle tier gets advanced problem sets and toppers notes. Materials are updated annually based on latest NEET pattern. Total content value: ₹15,000+ if purchased separately (included free in course fee).',
    category: 'academic',
    tags: ['study-materials', 'books', 'notes', 'resources'],
    priority: 5,
  },
  {
    id: 'ac-004',
    question: 'How often are tests conducted?',
    answer:
      'Regular assessment schedule: WEEKLY TESTS - Every Sunday, 1-hour duration, chapter-wise, 50 MCQs, instant results and analysis. MONTHLY TESTS - Full syllabus coverage, 2-hour duration, 90 MCQs, NEET exam pattern, detailed performance report. MOCK TESTS (Grand Tests) - Monthly starting 6 months before NEET, full-length 180 MCQs (biology only), 3-hour duration, all-India ranking. SURPRISE TESTS - Periodic quick 15-minute tests, keeps students on toes, no syllabus announced. Total tests per year: 40-50 tests minimum. All tests include: detailed solution videos, performance analytics, comparison with toppers, topic-wise strength/weakness analysis. Test schedule shared at start of course.',
    category: 'academic',
    tags: ['tests', 'exams', 'mock-tests', 'assessment'],
    priority: 4,
  },
  {
    id: 'ac-005',
    question: 'Can I get one-on-one mentoring?',
    answer:
      'Yes, tier-based mentoring: PINNACLE TIER - Dedicated personal mentor assigned, weekly 30-minute one-on-one video sessions, mentor tracks your progress, customized study plan, exam strategy discussions, motivation and stress management. ASCENT TIER - Group mentoring (5-6 students per group), bi-weekly mentoring sessions, topic-wise guidance, doubt clearing priority. PURSUIT TIER - No dedicated mentoring, but faculty interaction during classes, group doubt sessions available. Upgrade to Pinnacle for personal mentoring. Mentor role: Not just teaching, but holistic guidance including time management, exam temperament, motivation during low phases, college selection counseling.',
    category: 'academic',
    tags: ['mentoring', 'one-on-one', 'personal-attention', 'guidance'],
    priority: 4,
  },
  {
    id: 'ac-006',
    question: 'What if I miss a live class?',
    answer:
      'No worries - comprehensive make-up system: 1) RECORDINGS - All live classes recorded in HD, available on portal within 2 hours of class completion, lifetime access (watch anytime, anywhere). 2) CLASS NOTES - Detailed notes uploaded for missed classes, downloadable PDFs. 3) WHATSAPP SUMMARY - Key points and important MCQs shared in WhatsApp group (5-minute quick review). 4) CATCH-UP SUPPORT - For multiple missed classes (due to illness, etc.), special catch-up session arranged (Pinnacle & Ascent). Recommendations: Watch recording within 24 hours of missing class, make notes while watching (active learning), attend next live class doubt session to clarify missed topics. 95% students say recordings are as effective as live classes!',
    category: 'academic',
    tags: ['missed-class', 'recordings', 'make-up', 'absence'],
    priority: 5,
  },
  {
    id: 'ac-007',
    question: 'How do you ensure NCERT coverage?',
    answer:
      'NCERT is our bible - 100% coverage guaranteed: Teaching method: Line-by-line reading and explanation of every NCERT sentence, every diagram, flowchart, and table discussed in detail, marginal notes and intext questions covered, exemplar questions solved, nothing is skipped or assumed. Why NCERT focus? 85-90% of NEET biology questions are directly from NCERT, remaining 10-15% are application-based (we cover these too). Additional assurance: NCERT completion tracker on portal, students can check % coverage in real-time, revision sessions dedicated only to NCERT (rapid revision mode). By end of course, students have studied each NCERT chapter at least 3 times.',
    category: 'academic',
    tags: ['ncert', 'syllabus-coverage', 'textbook'],
    priority: 5,
  },
  {
    id: 'ac-008',
    question: 'Do you provide revision sessions before NEET?',
    answer:
      'Yes, intensive pre-NEET revision program: FINAL REVISION PHASE (2 months before NEET): Rapid revision of entire syllabus - 2 chapters/day pace, high-yield topics focused (based on previous year analysis), memory techniques and mnemonics taught, previous 10 years NEET questions solved again, doubt clearing priority mode (24/7 support). WEEKLY SCHEDULE: 6 days - revision classes, 1 day - full-length mock test. ADDITIONAL: Daily current affairs in biology (last-minute topics), daily motivation and stress management sessions, exam day strategy workshop, OMR filling practice, time management drills. This revision phase alone is worth the entire course fee - students typically score 20-30 marks higher after it!',
    category: 'academic',
    tags: ['revision', 'neet-preparation', 'final-prep'],
    priority: 4,
  },

  // TECHNICAL (6 FAQs)
  {
    id: 'tc-001',
    question: 'What are the technical requirements for online classes?',
    answer:
      'Minimum technical requirements: DEVICE: Laptop/desktop (preferred for best experience), or tablet/smartphone (7-inch screen minimum). INTERNET: Minimum 2 Mbps speed (for video streaming), stable connection (WiFi or 4G/5G mobile data). BROWSER: Google Chrome (latest version recommended), or Safari/Firefox. ADDITIONAL: Working webcam (for interaction and attendance), microphone (for asking questions), headphones (recommended for clear audio, not mandatory). SOFTWARE: Zoom app (download free) or browser-based access, student portal compatible with all modern browsers. Free tech check available - test your setup before first class. Having issues? Our tech support will help you optimize your setup.',
    category: 'technical',
    tags: ['technical-requirements', 'online', 'internet', 'device'],
    priority: 5,
  },
  {
    id: 'tc-002',
    question: 'I forgot my login password. How do I reset it?',
    answer:
      'Easy password reset process: METHOD 1 - Self-service (recommended): Go to portal.cerebrumbiologyacademy.com, click "Forgot Password" link, enter your registered email, check email for reset link (arrives in 2-5 minutes), click link and set new password. METHOD 2 - Contact support: Email support@cerebrumbiologyacademy.com with subject "Password Reset", include your full name and registered mobile number, support team will reset and email you new password (within 1-2 hours). METHOD 3 - Call helpline: +91-88264-44334 (9 AM - 9 PM), verify your identity, instant password reset over phone. Security tip: Use strong password (8+ characters, mix of letters, numbers, symbols), do not share password with anyone, change password every 3 months.',
    category: 'technical',
    tags: ['password', 'login', 'reset', 'forgot-password'],
    priority: 5,
  },
  {
    id: 'tc-003',
    question: 'How do I download the mobile app?',
    answer:
      'Cerebrum Academy Mobile App availability: ANDROID: Download from Google Play Store, search "Cerebrum Academy NEET", or direct link: [app link], 45 MB download size, works on Android 7.0+. iOS: Download from Apple App Store, search "Cerebrum Academy", or direct link: [app link], 55 MB download size, works on iOS 12+. FIRST-TIME SETUP: Install app, login with portal credentials (same email/password), allow notifications (for class reminders), download offline content (optional, for studying without internet). App features: Attend live classes, watch recordings, access study materials, take tests, ask doubts, track performance. App vs. Web: Both have same features, app is more convenient for mobile users, web portal better for desktop/laptop users.',
    category: 'technical',
    tags: ['mobile-app', 'download', 'android', 'ios'],
    priority: 4,
  },
  {
    id: 'tc-004',
    question: 'Why can I not join the live class?',
    answer:
      'Common issues and fixes: ISSUE 1 - "Class link not working": Refresh the page, try different browser, check if using latest Zoom version. ISSUE 2 - "Internet too slow": Close other apps using internet, move closer to WiFi router, switch to mobile data if possible. ISSUE 3 - "Class not showing in schedule": Check if you are on correct date/time, ensure you are logged in, contact support if class is missing. ISSUE 4 - "Audio/video not working": Check device permissions (camera/mic access), restart browser/app, test audio in Zoom settings. STILL NOT WORKING? Call emergency support: +91-88264-44334, we will troubleshoot live, if issue persists - recording provided as backup. Average resolution time: 5-10 minutes.',
    category: 'technical',
    tags: ['live-class', 'access-issue', 'troubleshooting', 'zoom'],
    priority: 4,
  },
  {
    id: 'tc-005',
    question: 'Can I download videos for offline viewing?',
    answer:
      'Yes, offline downloads available (mobile app only): How to download: Open Cerebrum app, go to "Recordings" section, select video to download, tap download icon, choose video quality (Low/Medium/High - affects file size), wait for download to complete. Storage needed: Low quality - 100-150 MB per 90-min class, Medium quality - 200-250 MB, High quality - 400-500 MB. Recommendations: Download on WiFi to save mobile data, download lectures you want to revise multiple times, delete old downloads to free space. Downloaded videos: Available for 30 days (then need to renew download), can watch without internet, cannot be shared or forwarded. Web portal: Streaming only, no downloads (to protect content copyright).',
    category: 'technical',
    tags: ['download', 'offline', 'video', 'recordings'],
    priority: 3,
  },
  {
    id: 'tc-006',
    question: 'Is there a parent portal for tracking my child progress?',
    answer:
      'Yes, dedicated parent portal access: Parent portal features: View attendance (class-wise percentage), see test scores and performance trends (graphical), access performance reports (monthly), receive automated alerts (low attendance, missed tests, declining performance), view upcoming test schedule, access teacher feedback, communicate with faculty (message system). How parents access: Separate login provided at time of enrollment, email: parent.[studentname]@cerebrumbiologyacademy.com, password sent separately for security. Portal access: Web only (no mobile app yet for parents), login at parent.cerebrumbiologyacademy.com, available 24/7. Recommended: Parents should check portal weekly, attend quarterly parent-teacher meetings (online), stay involved in child journey.',
    category: 'technical',
    tags: ['parent-portal', 'tracking', 'progress', 'parent-access'],
    priority: 4,
  },

  // BILLING & PAYMENTS (10 FAQs)
  {
    id: 'bp-001',
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major payment methods via Razorpay: ONLINE PAYMENTS: Credit cards (Visa, Mastercard, Amex), debit cards (all banks), net banking (120+ banks), UPI (Google Pay, PhonePe, Paytm, BHIM), digital wallets (Paytm, Mobikwik, Freecharge). EMI OPTIONS: No-cost EMI on credit cards (3/6/9/12 months), Bajaj Finserv EMI card, ZestMoney EMI. OFFLINE PAYMENTS: Bank transfer/NEFT/RTGS (account details provided), cheque/DD (in favor of "Cerebrum Academy"), cash (only at physical centers, up to ₹50,000). Payment is 100% secure (PCI-DSS compliant), receipt emailed immediately, GST invoice provided within 24 hours.',
    category: 'billing-payments',
    tags: ['payment', 'methods', 'upi', 'cards', 'emi'],
    priority: 5,
  },
  {
    id: 'bp-002',
    question: 'Can I pay in installments?',
    answer:
      'Yes, flexible installment options: OPTION 1 - TWO INSTALLMENTS: 50% at enrollment, 50% after 3 months, total fee increased by 3% (processing charge). OPTION 2 - THREE INSTALLMENTS: 40% at enrollment, 30% after 3 months, 30% after 6 months, total fee increased by 5%. OPTION 3 - CREDIT CARD EMI: No-cost EMI (bank bears interest), 3/6/9/12-month tenures available, instant approval (if eligible). BEST VALUE - LUMP SUM: Pay full fee at enrollment, get 5% discount, save ₹3K-₹9K depending on tier. Auto-payment: Set up auto-debit for installments (recommended - never miss payment). Late payment: ₹500 penalty if installment delayed beyond 7 days.',
    category: 'billing-payments',
    tags: ['installments', 'emi', 'payment-plans'],
    priority: 5,
  },
  {
    id: 'bp-003',
    question: 'Do you offer scholarships or financial aid?',
    answer:
      'Yes, multiple scholarship schemes: 1) MERIT SCHOLARSHIP: Based on previous academic performance, 10-30% fee waiver for 90%+ in Class 10th/12th, automatically applied during enrollment. 2) NEET SCORE SCHOLARSHIP (for droppers): 50% waiver if previous NEET score 550+, 30% waiver if score 500-549, 20% waiver if score 450-499. 3) SIBLING DISCOUNT: Second sibling gets 15% off, apply code "SIBLING15" during enrollment. 4) EARLY BIRD DISCOUNT: Enroll 2+ months before batch start - get 10% off. 5) NEED-BASED SCHOLARSHIP: Limited seats, income-based (annual income below ₹3 lakh), apply with income certificate. APPLY: Fill scholarship form on website or email scholarship@cerebrumbiologyacademy.com with relevant documents.',
    category: 'billing-payments',
    tags: ['scholarship', 'financial-aid', 'discount', 'waiver'],
    priority: 4,
  },
  {
    id: 'bp-004',
    question: 'What is your refund policy?',
    answer:
      'Transparent refund policy: FULL REFUND (100%): Within 7 days of enrollment if not satisfied, no questions asked, processed in 7-10 working days. PARTIAL REFUND: Within 8-30 days: 70% refund (30% deduction for materials, setup costs), 31-60 days: 50% refund, after 60 days: No refund. EXCEPTIONS: Medical emergency (with certificate) - special consideration, relocation/school change - pro-rata refund possible. NON-REFUNDABLE: Lump sum discount amount, scholarship amount already availed. PROCESS: Submit refund request via portal or email refunds@cerebrumbiologyacademy.com, include reason and bank details, refund processed in 15 working days to original payment method. We have 99.5% satisfaction rate - refund requests are rare!',
    category: 'billing-payments',
    tags: ['refund', 'cancellation', 'money-back'],
    priority: 5,
  },
  {
    id: 'bp-005',
    question: 'Is GST included in the course fee?',
    answer:
      'Yes, GST is included in all displayed prices: Pricing transparency: All fees shown on website are final (including 18% GST), no hidden charges or surprise fees at checkout, what you see is what you pay. GST invoice: Provided within 24 hours of payment, sent to registered email, also downloadable from portal, required for tax filing (some parents claim under Section 80C). Invoice details include: Student name and course details, GSTIN of Cerebrum Academy, itemized fee breakup, GST amount separately shown. Note: Scholarship/discount amount is calculated on pre-GST amount, GST then added on discounted price.',
    category: 'billing-payments',
    tags: ['gst', 'tax', 'invoice', 'fees'],
    priority: 3,
  },
  {
    id: 'bp-006',
    question: 'What happens if I miss an installment payment?',
    answer:
      'Missing installment - consequences and solutions: GRACE PERIOD: 7 days beyond due date - no penalty, just pay and continue. AFTER 7 DAYS: ₹500 late payment fee added, portal access may be suspended until payment, class attendance blocked. AFTER 30 DAYS: Case escalated to counseling team, phone call to understand issue, possible course termination (no refund), legal recovery process may be initiated for large outstanding amounts. TO AVOID: Set payment reminders, use auto-pay feature, contact us BEFORE missing payment (we can help), communicate financial difficulties early (we may adjust payment schedule). SOLUTIONS: One-time payment date change allowed, convert to different EMI plan (if eligible), temporary extension possible (case-by-case).',
    category: 'billing-payments',
    tags: ['missed-payment', 'installment', 'late-payment'],
    priority: 3,
  },
  {
    id: 'bp-007',
    question: 'Can I get an education loan for the course fee?',
    answer:
      'Education loan guidance: We do not directly provide loans, but we assist in the process: ELIGIBLE BANKS: HDFC Credila (education loan specialist), Axis Bank, ICICI Bank, SBI, Bank of Baroda. LOAN AMOUNT: ₹50K-₹20 lakhs (covers full course fee + materials), interest rates: 9.5-12% per annum (varies by bank), repayment: starts after course completion (typically 6-month grace period). DOCUMENTATION: Cerebrum Academy enrollment confirmation, course fee receipt, student ID proof, parent income proof, collateral (for loans above ₹7.5 lakhs). WE HELP: Provide course approval documents, assist with bank applications, recommend education loan consultants. Direct contact: loans@cerebrumbiologyacademy.com for loan-related queries.',
    category: 'billing-payments',
    tags: ['education-loan', 'loan', 'financing'],
    priority: 3,
  },
  {
    id: 'bp-008',
    question: 'Are there any hidden charges apart from the course fee?',
    answer:
      'No hidden charges - complete transparency: INCLUDED in course fee: All study materials (printed + digital), test series and mock tests, doubt clearing sessions, portal and app access, recording access (lifetime). NOT INCLUDED (must arrange separately): NCERT textbooks - buy from bookstore (₹500-700), stationery (notebooks, pens), internet data charges (for online classes), physics & chemistry coaching (Cerebrum teaches biology only), exam fee paid to NTA for NEET (₹1,700 approx). OPTIONAL add-ons (not mandatory): Printed test solutions booklet - ₹500, advanced problem set (Pinnacle gets free) - ₹1,000 for others, crash course before NEET (if you want extra) - ₹5,000. 99% students need nothing beyond the stated course fee!',
    category: 'billing-payments',
    tags: ['hidden-charges', 'additional-fees', 'transparency'],
    priority: 4,
  },
  {
    id: 'bp-009',
    question: 'Can I pause my subscription if I need a break?',
    answer:
      'Limited pause/freeze option available: PAUSE POLICY: Allowed only for medical emergencies or unavoidable circumstances, maximum pause duration: 2 months, allowed once per course. DURING PAUSE: Portal access remains (can watch old recordings), live classes not accessible, no new materials provided, course end date extended by pause duration. PROCESS: Submit pause request 15 days in advance, provide reason and supporting documents (medical certificate, school transfer letter, etc.), approval within 3-5 days. FEES: No fee for approved pause, installments do not pause (continue as scheduled), if unpaid during pause - late fees apply. RESTART: 7-day notice required before resuming, catch-up sessions arranged for missed content. Not recommended: Try to continue unless absolutely necessary.',
    category: 'billing-payments',
    tags: ['pause', 'freeze', 'subscription', 'break'],
    priority: 2,
  },
  {
    id: 'bp-010',
    question: 'How do I get a payment receipt or invoice?',
    answer:
      'Multiple ways to access receipts: AUTOMATIC: Payment confirmation email sent immediately after successful payment, GST invoice emailed within 24 hours, both sent to registered email ID. DOWNLOAD from portal: Login to student portal, go to "My Account" → "Billing" section, view all payment history, download any invoice/receipt as PDF. REQUEST via support: Email accounts@cerebrumbiologyacademy.com with payment date and amount, receipt resent within 2 hours. OFFLINE: Visit our physical center with payment reference number, collect printed invoice. What receipts include: Transaction ID and payment date, amount paid and payment method, GST breakup (18% separate), balance due (if installment plan), Cerebrum Academy GST number. Keep receipts: For your records, for potential tax benefits (Section 80C), for education loan claims.',
    category: 'billing-payments',
    tags: ['receipt', 'invoice', 'payment-proof'],
    priority: 3,
  },

  // ACCOUNT MANAGEMENT (4 FAQs)
  {
    id: 'am-001',
    question: 'How do I update my profile information?',
    answer:
      'Easy profile update process: LOGIN to student portal → Click profile icon (top right) → Select "Edit Profile". UPDATEABLE FIELDS: Profile photo (upload new image, max 5 MB), contact number (mobile/WhatsApp), alternate email, home address, school/college name. NON-UPDATEABLE (security reasons): Registered email (primary login ID), date of birth, parent/guardian name (contact support if critical change needed). AUTO-SAVE: Changes saved automatically, confirmation message displayed. IMPORTANT: Keep mobile number updated (used for OTP, class reminders), add WhatsApp number (for doubt groups, announcements). Changes reflect immediately across portal and app.',
    category: 'account-management',
    tags: ['profile', 'update', 'edit', 'information'],
    priority: 3,
  },
  {
    id: 'am-002',
    question: 'Can I change my registered email address?',
    answer:
      'Yes, but requires verification process (for security): Why difficult? Email is your login ID and primary identity, changing it requires careful verification to prevent fraud. PROCESS: Email support@cerebrumbiologyacademy.com with subject "Change Email Request", provide: current email, new email, registered mobile number, reason for change, security verification via OTP sent to mobile, support team updates within 24-48 hours, login with new email after confirmation. ALTERNATIVE: Add new email as "alternate email" in profile (no verification needed), primary email unchanged but can use alternate for communication. NOTE: Payment receipts will continue to old email until next payment. Update important: Keep email accessible as it is used for password resets, important announcements.',
    category: 'account-management',
    tags: ['email', 'change-email', 'login-id'],
    priority: 2,
  },
  {
    id: 'am-003',
    question: 'How do I manage notification preferences?',
    answer:
      'Customize notifications to avoid overwhelm: ACCESS: Portal → Settings → Notifications. NOTIFICATION TYPES: Class reminders (1 hour before class, recommended: ON), test reminders (1 day before, recommended: ON), doubt responses (when faculty answers, recommended: ON), new materials uploaded (recommended: ON), performance alerts (low scores, attendance issues, recommended: ON), promotional offers (optional - can turn OFF). CHANNELS: Email notifications (select which emails to receive), push notifications (mobile app), SMS notifications (important only - cannot turn off class reminders), WhatsApp notifications (join/leave groups). RECOMMENDED SETTINGS: Keep class and test reminders ON (crucial), turn off promotional if too many emails. Changes saved instantly.',
    category: 'account-management',
    tags: ['notifications', 'alerts', 'preferences', 'settings'],
    priority: 3,
  },
  {
    id: 'am-004',
    question: 'Can I deactivate or delete my account?',
    answer:
      'Account closure policy: DEACTIVATION (temporary): Pauses access without deleting data, useful if taking break/pause, reactivatable anytime within 1 year, process: email support with deactivation request. DELETION (permanent): Deletes all data irreversibly (except payment records - kept for legal compliance), cannot be undone, process: submit written request via email with reason, 15-day waiting period (to reconsider), after 15 days - deletion confirmed. CONSEQUENCES: Lose access to all recordings and materials (no recovery), course fees not refunded (unless eligible under refund policy), cannot rejoin without fresh enrollment. BEFORE YOU DO: Try deactivation first (less drastic), contact counseling team (maybe we can resolve your concern). 99% students who reach out for support continue happily!',
    category: 'account-management',
    tags: ['deactivate', 'delete', 'close-account'],
    priority: 1,
  },

  // EXAMS & TESTS (5 FAQs)
  {
    id: 'et-001',
    question: 'How do I access and take mock tests?',
    answer:
      'Mock test platform walkthrough: ACCESS: Login to portal → "Tests" section → "Upcoming Tests" tab. BEFORE TEST: Check test schedule (shared monthly), ensure stable internet (2 Mbps minimum), close all other apps/tabs (to avoid distraction), keep calculator ready (if allowed), test starts at exact scheduled time (be punctual). DURING TEST: Timer displayed prominently (manage time wisely), questions appear one by one or all at once (based on test type), mark for review option available (revisit difficult questions), submit test before time ends (auto-submit at time end). AFTER TEST: Results shown immediately or after 2 hours (depends on test type), detailed solutions available, performance analysis and ranking displayed. Tests are NEET pattern: negative marking applies, OMR-style interface.',
    category: 'exams-tests',
    tags: ['mock-tests', 'tests', 'how-to', 'access'],
    priority: 5,
  },
  {
    id: 'et-002',
    question: 'What if I miss a scheduled test?',
    answer:
      'Missing tests - options and policies: RE-TEST OPTION: Available for weekly tests (not for grand mock tests), request re-test within 24 hours of original test, one re-test chance per month allowed, scheduled separately (usually weekend), same difficulty level but different questions. NO RE-TEST: Monthly grand tests and mock tests (simulates real NEET - you do not get re-attempt in actual exam), test marked as "Absent", score recorded as 0 (affects performance average). EXCEPTION: Medical emergency with certificate - special re-test approved. RECOMMENDATION: Prioritize test attendance (builds exam temperament), treat tests like real NEET (time-bound, no excuses), if must miss - inform faculty in advance. Test performance = 30% of your success preparation.',
    category: 'exams-tests',
    tags: ['missed-test', 're-test', 'absence'],
    priority: 4,
  },
  {
    id: 'et-003',
    question: 'How is my performance tracked and analyzed?',
    answer:
      'Comprehensive performance analytics: AFTER EVERY TEST: Score and rank (among batch and all-India), accuracy percentage (correct/attempted), speed analysis (time per question), topic-wise performance (strength and weakness areas), comparison with toppers (see where you stand). MONTHLY REPORT: Attendance percentage, average test score trend, improvement or decline indicators, faculty feedback and recommendations, customized action plan for next month. VISUAL DASHBOARD: Colorful graphs and charts, easy-to-understand metrics, accessible on portal and parent portal. ALERTS: Automated alerts for declining performance, low attendance, missed tests, parents also notified. COUNSELING: If consistent decline - counseling session scheduled (Pinnacle & Ascent tiers).',
    category: 'exams-tests',
    tags: ['performance', 'tracking', 'analytics', 'report'],
    priority: 4,
  },
  {
    id: 'et-004',
    question: 'Are solutions provided for all test questions?',
    answer:
      'Yes, detailed solutions for every question: SOLUTION TYPES: Text-based explanations (concept + logic), video solutions by faculty (10-15 min per test, covers tricky questions), NCERT reference (which page/para has the answer). WHEN AVAILABLE: Weekly tests - solutions within 2 hours of test end, monthly tests - solutions next day morning, grand mock tests - detailed video analysis within 24 hours. ACCESS SOLUTIONS: Portal → "Tests" → "Past Tests" → Select test → "View Solutions", download PDF of all solutions, watch solution videos. ADDITIONAL: Common mistakes highlighted, time-saving tips shared, similar questions for practice provided. Students typically spend 30-60 minutes reviewing solutions (critical for learning from mistakes).',
    category: 'exams-tests',
    tags: ['solutions', 'answers', 'explanations'],
    priority: 4,
  },
  {
    id: 'et-005',
    question: 'Do you provide all-India ranking in tests?',
    answer:
      'Yes, all-India ranking for major tests: RANKING DETAILS: Grand mock tests - All-India ranking across all Cerebrum students (1000+ students), percentile score provided (e.g., 95th percentile), toppers list published (top 50). Weekly/Monthly tests - Batch-level ranking only. WHY ALL-INDIA RANKING: Real NEET simulation (you compete nationally), helps gauge preparation level, motivates students to improve, builds exam confidence. RANKING CRITERIA: Absolute score + accuracy + time taken, tie-breakers: fewer negative marks wins, if still tied - earlier submission time wins. TOP PERFORMERS: Certificates for top 10 rankers, featured on website and social media (with consent), special mentoring session with Dr. Shekhar. Ranking ≠ ability: Bad rank is feedback, not failure - use it to improve!',
    category: 'exams-tests',
    tags: ['ranking', 'all-india-rank', 'competition'],
    priority: 3,
  },

  // SUPPORT (5 FAQs)
  {
    id: 'sp-001',
    question: 'How can I contact Cerebrum Academy support?',
    answer:
      'Multiple support channels 24/7: PHONE: +91-88264-44334 (9 AM - 9 PM, 7 days), for urgent issues (cannot join class, payment problems). EMAIL: support@cerebrumbiologyacademy.com (response within 4-6 hours), for non-urgent queries, detailed issues requiring explanation. WHATSAPP: +91-88264-44334 (text/voice), quick queries, sharing screenshots. LIVE CHAT: Available on website (bottom right chat widget), instant response during working hours (9 AM - 9 PM). IN-PERSON: Visit our centers in Ahmedabad, Surat, Vadodara, Rajkot (appointment recommended). SOCIAL MEDIA: Facebook/Instagram @cerebrumacademy (for general queries). Response time: Critical issues - 1 hour, general queries - 4-6 hours. We pride ourselves on quick, helpful support!',
    category: 'support',
    tags: ['contact', 'support', 'help', 'customer-service'],
    priority: 5,
  },
  {
    id: 'sp-002',
    question: 'What are your support hours?',
    answer:
      'Comprehensive support coverage: CUSTOMER SUPPORT: 9 AM - 9 PM (all 7 days including weekends and holidays), phone, email, WhatsApp, live chat. ACADEMIC SUPPORT: Faculty doubt clearing - 6 PM - 10 PM on weekdays, 10 AM - 6 PM on weekends, emergency academic queries - 24/7 via WhatsApp doubt bot (AI-powered). TECHNICAL SUPPORT: Critical issues (cannot join class) - 24/7 emergency line, general tech issues - 9 AM - 9 PM, platform maintenance - Sundays 2-4 AM (minimal downtime). COUNSELING: Academic counseling - by appointment (9 AM - 6 PM), career counseling - by appointment. EXCEPTIONS: NEET exam day - 24/7 support (last-minute doubts, stress management). We ensure students never feel alone or unsupported!',
    category: 'support',
    tags: ['support-hours', 'timing', 'availability'],
    priority: 4,
  },
  {
    id: 'sp-003',
    question: 'How quickly will my issue be resolved?',
    answer:
      'Resolution time commitments: CRITICAL (cannot attend class, payment failed): Response in 1 hour, resolution in 2-4 hours, workaround provided immediately. HIGH PRIORITY (doubt clearing, test access): Response in 4-6 hours, resolution in 24 hours. MEDIUM (material access, portal issues): Response in 6-12 hours, resolution in 48 hours. LOW (general queries, feature requests): Response in 24 hours, resolution timeline communicated. TRACKING: Every support ticket gets unique ID, track status via portal, email updates at every stage. ESCALATION: If not resolved in committed time - auto-escalated to senior support, manager personally takes over. Satisfaction rate: 96% issues resolved in first contact!',
    category: 'support',
    tags: ['resolution-time', 'response', 'sla'],
    priority: 3,
  },
  {
    id: 'sp-004',
    question: 'Can I speak directly to faculty for academic doubts?',
    answer:
      'Yes, direct faculty access (tier-dependent): PINNACLE TIER: Weekly scheduled 1-on-1 video calls with faculty, WhatsApp direct access to assigned mentor, priority in doubt clearing sessions. ASCENT TIER: Group doubt sessions with faculty (5-6 students), WhatsApp group with faculty presence, bi-weekly group mentoring. PURSUIT TIER: Post-class doubt time (10-15 minutes after live class), WhatsApp doubt group (faculty responds within 24 hours), no personal calls. ALL TIERS: Scheduled doubt clearing sessions (3-4 times/week), faculty available 30 minutes post every live class. TO MAXIMIZE: Prepare your doubts in advance (note down question numbers), watch NCERT videos first (80% doubts self-resolve), ask specific questions (not vague "I did not understand chapter"). Faculty interaction = biggest advantage of Cerebrum!',
    category: 'support',
    tags: ['faculty-access', 'doubts', 'academic-support'],
    priority: 4,
  },
  {
    id: 'sp-005',
    question: 'What if I am not satisfied with the support I received?',
    answer:
      'Feedback and escalation process: ESCALATION LEVELS: Level 1 - Regular support team (first contact), Level 2 - Senior support manager (if Level 1 did not help), Level 3 - Academic Director (for academic issues), Level 4 - Founder Dr. Shekhar (final escalation for serious issues). HOW TO ESCALATE: Reply to support email with "ESCALATE" in subject, or call and ask for manager, or email escalation@cerebrumbiologyacademy.com directly. FEEDBACK: Every support interaction - feedback form sent via email, rate your experience (1-5 stars), share specific issues or appreciation, helps us improve continuously. ACCOUNTABILITY: Poor support flagged automatically (below 3-star rating), manager reviews and contacts you personally within 24 hours, corrective action taken. Our philosophy: Support is not an expense, it is an investment in student success!',
    category: 'support',
    tags: ['escalation', 'feedback', 'complaint', 'dissatisfaction'],
    priority: 3,
  },

  // POLICIES (5 FAQs)
  {
    id: 'po-001',
    question: 'What is the attendance policy?',
    answer:
      'Attendance requirements and tracking: MINIMUM ATTENDANCE: 75% mandatory for all tiers, calculated on live class attendance (not recording views), monitored monthly via portal. TRACKING: Automated attendance marking (facial recognition in app), manual attendance for offline classes, real-time attendance % visible on dashboard. BELOW 75%: Warning email sent to student and parent (at 70% attendance), counseling call scheduled (at 65%), risk of course termination (below 60%, no refund). EXCEPTIONS: Medical leave (with certificate) - attendance exempted, not counted in denominator, family emergencies - case-by-case consideration (inform in advance). RATIONALE: Consistency is key for NEET success, irregular students rarely perform well, we care about your results, not just revenue.',
    category: 'policies',
    tags: ['attendance', 'policy', 'requirements'],
    priority: 4,
  },
  {
    id: 'po-002',
    question: 'What is the code of conduct for students?',
    answer:
      'Student expectations and discipline: ACADEMIC INTEGRITY: No cheating in tests (auto-detected via proctoring), no sharing login credentials (leads to account suspension), no unauthorized recording/distribution of classes (legal action may be taken). RESPECTFUL BEHAVIOR: Respect faculty and fellow students, no bullying or harassment, appropriate language in doubt sessions and chats, mute when not speaking (online classes). PUNCTUALITY: Join classes on time (5-minute grace period), submit assignments by deadline, inform in advance if missing class. CONSEQUENCES: First offense - warning and counseling, second offense - parent meeting and written warning, third offense - course termination without refund. POSITIVE ENVIRONMENT: We believe in encouragement over punishment, most students maintain excellent conduct, guidelines ensure fairness for all.',
    category: 'policies',
    tags: ['code-of-conduct', 'discipline', 'rules'],
    priority: 3,
  },
  {
    id: 'po-003',
    question: 'Can I share my login credentials with friends?',
    answer:
      'Absolutely NO - strict prohibition: WHY NOT ALLOWED: Violates terms of service, unfair to paying students, compromises content security (our intellectual property), affects performance tracking accuracy (multiple users on one account). DETECTION: AI-based monitoring detects multiple simultaneous logins from different IPs, unusual activity patterns flagged automatically, periodic verification checks. CONSEQUENCES: First detection - warning and forced password reset, second detection - account suspended for 7 days (no refund for missed period), third detection - permanent termination, no refund, legal action for content theft. ALTERNATIVES: Friend interested? Offer them referral (you get ₹1,000 reward, they get demo class), group study encouraged (offline, not account sharing). One account = one student, strictly enforced.',
    category: 'policies',
    tags: ['account-sharing', 'login', 'credentials'],
    priority: 4,
  },
  {
    id: 'po-004',
    question: 'What are the terms and conditions for enrollment?',
    answer:
      'Key terms (full T&C on website): ENROLLMENT: Binding contract between student/parent and Cerebrum Academy, fee payment confirms acceptance of all terms, parent/guardian consent required for minors. COURSE DELIVERY: We commit to scheduled classes, quality teaching, stated materials, but reserve right to change faculty, timing (with notice), and curriculum (based on NTA updates). REFUND: As per stated refund policy (7-day full refund, sliding scale thereafter), no refund for violation of conduct code. INTELLECTUAL PROPERTY: All study materials, videos, tests copyrighted, for personal use only, not for distribution/resale. LIABILITY: Not responsible for student NEET performance (depends on individual effort), not liable for internet outages (recordings provided), force majeure clause applies (natural disasters, pandemics). Full terms: cerebrumbiologyacademy.com/terms',
    category: 'policies',
    tags: ['terms', 'conditions', 'legal', 'agreement'],
    priority: 2,
  },
  {
    id: 'po-005',
    question: 'How is my personal data protected?',
    answer:
      'Robust data privacy and security: DATA COLLECTED: Name, contact info (email, phone), academic records (test scores, attendance), payment info (processed via Razorpay, we do not store card details). HOW WE USE: Course delivery and communication, performance tracking and personalization, payment processing and billing, legal compliance. NOT SHARED: Never sold to third parties, not used for external marketing (without consent), strict internal access controls (need-to-know basis). SECURITY MEASURES: SSL encryption for all data transfer, regular security audits, backups and disaster recovery, GDPR and Indian IT Act compliant. YOUR RIGHTS: Access your data anytime (download from portal), request data deletion (after course completion), opt-out of marketing communications. Full privacy policy: cerebrumbiologyacademy.com/privacy',
    category: 'policies',
    tags: ['privacy', 'data-protection', 'security', 'gdpr'],
    priority: 3,
  },
]

// Helper functions
export function getFAQsByCategory(category: FAQCategory): FAQ[] {
  return allFAQs.filter((faq) => faq.category === category)
}

export function searchFAQs(query: string): FAQ[] {
  const lowercaseQuery = query.toLowerCase()
  return allFAQs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(lowercaseQuery) ||
      faq.answer.toLowerCase().includes(lowercaseQuery) ||
      faq.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  )
}

export function getRelatedFAQs(faqId: string): FAQ[] {
  const faq = allFAQs.find((f) => f.id === faqId)
  if (!faq || !faq.relatedQuestions) return []
  return allFAQs.filter((f) => faq.relatedQuestions?.includes(f.id))
}

export function getPopularFAQs(limit: number = 10): FAQ[] {
  return allFAQs
    .filter((faq) => faq.priority && faq.priority >= 4)
    .sort((a, b) => (b.priority || 0) - (a.priority || 0))
    .slice(0, limit)
}
