import type { Metadata } from 'next'
import { Phone, Mail, MessageCircle, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { FAQSchema, FAQDisplay } from '@/components/seo/FAQSchema'

const faqData = {
  // Category 1: About Cerebrum Biology Academy (8 questions)
  about: [
    {
      question: 'What is Cerebrum Biology Academy?',
      answer:
        'Cerebrum Biology Academy is India\'s premier NEET Biology coaching institute founded in 2014 by Dr. Shekhar C Singh, an AIIMS-trained biologist with 10+ years of teaching experience. We specialize exclusively in Biology coaching with small batches of 8-15 students to ensure personalized attention. We operate 6 centers across Delhi NCR (South Extension, Gurugram, Rohini, Green Park, Faridabad, Noida) and have successfully coached 680+ students with a 94% NEET qualification rate.',
    },
    {
      question: 'Who is Dr. Shekhar C Singh?',
      answer:
        'Dr. Shekhar C Singh is an AIIMS Delhi graduate (2014) who scored 680/720 in NEET Biology. After observing thousands of students struggle with Biology despite expensive coaching, he chose teaching over medical practice. With 10+ years of faculty experience at premier coaching institutes, he founded Cerebrum to bring AIIMS-level instruction at affordable fees. He is known for his "Concept Pyramid" methodology that simplifies complex topics.',
    },
    {
      question: 'How many centers does Cerebrum Biology Academy have?',
      answer:
        'Cerebrum operates 6 fully-equipped centers across Delhi NCR: South Extension (Delhi), Gurugram (Sector 14), Rohini (West Delhi), Green Park (South Delhi), Faridabad (Haryana), and Noida (Uttar Pradesh). Each center features smart classrooms, experienced faculty, and personalized mentoring infrastructure to deliver consistent quality across all locations.',
    },
    {
      question: 'What is the batch size at Cerebrum?',
      answer:
        'We maintain batch sizes of 8-15 students per class to ensure maximum personalized attention. Unlike mass coaching institutes with 200+ students per classroom, our small batches allow faculty to understand each student\'s learning style, address individual doubts in real-time, and provide customized study plans for optimal results.',
    },
    {
      question: 'What is Cerebrum\'s success rate?',
      answer:
        'Cerebrum Biology Academy has achieved a 94% NEET qualification rate with 680+ successful selections over the past 9 years. Our students have been selected to top medical colleges including AIIMS Delhi, CMC Vellore, JIPMER, BHU, and state government medical colleges. In 2024 alone, 12 of our students scored 700+ in NEET Biology.',
    },
    {
      question: 'Does Cerebrum offer online coaching?',
      answer:
        'Yes, Cerebrum offers three flexible modes: (1) Offline - In-center classes at any of our 6 locations, (2) Live Online - Real-time interaction with faculty via video conferencing, (3) Hybrid - Combination of online and offline classes. Students can switch between modes based on their convenience, with full access to recorded lectures, study materials, and doubt-clearing sessions.',
    },
    {
      question: 'What are Cerebrum\'s contact details?',
      answer:
        'Phone: +91-88264-44334 | Email: info@cerebrumbiologyacademy.com | WhatsApp: +91-88264-44334. Our team is available Monday-Saturday, 9 AM to 7 PM. You can also visit any of our 6 centers or book a free demo class online at cerebrumbiologyacademy.com/book-free-demo.',
    },
    {
      question: 'How can I book a free demo class?',
      answer:
        'You can book a free demo in 3 ways: (1) Visit cerebrumbiologyacademy.com/book-free-demo and fill the form, (2) Call +91-88264-44334 and speak to our admission counselor, (3) WhatsApp "DEMO" to +91-88264-44334. The demo includes a 45-minute class with Dr. Shekhar or senior faculty, doubt-clearing session, and personalized feedback on your Biology preparation level.',
    },
  ],
  // Category 2: NEET Preparation (10 questions)
  neetPrep: [
    {
      question: 'How to score 360 in NEET Biology?',
      answer:
        '360 out of 360 in NEET Biology requires mastery of all chapters with zero errors. Our method includes: (1) NCERT mastery - Read 5 times, memorize definitions, (2) Concept mapping - Create mind maps for every chapter, (3) Weekly tests - Take 10+ full-length tests, (4) Error analysis - Maintain an error log and revise mistakes 3x, (5) Mock test simulation - Solve exactly 180 questions in 90 minutes under exam conditions. Cerebrum students who follow this discipline achieve 340+.',
    },
    {
      question: 'What is the ideal study plan for NEET 2026?',
      answer:
        'If you\'re starting now (Feb 2026), follow this 10-month plan: Feb-April (3 months): NCERT revision, concept building, 0 mock tests. May-August (4 months): Complete NCERT twice more, start chapter-wise tests, solve 20+ mock tests. September-December (4 months): 80% time on weak chapters, mock tests 3x per week. December onwards: Revision mode, solve 50+ full-length tests. Cerebrum provides this exact structured plan with daily targets and progress tracking.',
    },
    {
      question: 'How many hours should I study for NEET daily?',
      answer:
        'Quality > Quantity. We recommend 5-6 hours of focused study daily (not 10-12 hours with distraction). This includes: Lecture time (1 hour), Self-study (2 hours), Testing (1.5 hours), Doubt clearing (0.5 hours). During your final 2 months, increase to 7-8 hours with 60% time on mock tests. Cerebrum classrooms have 1-1.5 hours lectures; students study 4+ hours at home with our guided study materials.',
    },
    {
      question: 'Is NCERT enough for NEET Biology?',
      answer:
        'Yes, NCERT is 95% sufficient for NEET Biology if studied perfectly. However, "perfectly" means: (1) Reading NCERT 4-5 times, (2) Solving every diagram question, (3) Understanding mechanisms not just definitions, (4) Solving NCERT exemplar problems completely. Additional resources needed: (1) Previous year NEET questions (5 years), (2) Topic-wise MCQ practice (500+ questions), (3) Full-length mock tests. Cerebrum provides curated supplementary materials only for NCERT gaps.',
    },
    {
      question: 'Which chapters are most important for NEET Biology?',
      answer:
        'High-value chapters (30+ questions out of 180): Photosynthesis, Cellular Respiration, Genetics, Evolution, Ecology, Reproduction, Nervous System, Endocrine System. Medium-value chapters (15-25 questions): Cell Biology, Biodiversity, Plant Physiology, Biotechnology, Human Health. Low-value chapters (5-10 questions): All others. However, ignore no chapter - focus 70% time on high-value chapters. Cerebrum teaches all chapters but allocates faculty time based on NEET weightage.',
    },
    {
      question: 'How to prepare for NEET while in Class 11?',
      answer:
        'Class 11 is when Biology foundations are built. Start immediately: (1) Strengthen Class 11 fundamentals - Understand every concept deeply, not rote learning, (2) Solve 3-4 MCQs per chapter weekly, (3) Read NCERT 2-3 times per chapter, (4) Join coaching from Class 11 itself - Most Class 11 students who join Cerebrum score 320+ by Class 12. Avoid competitive stress - Build confidence and concept clarity. Most important: Balance board exams with NEET prep.',
    },
    {
      question: 'Should I take coaching or self-study for NEET?',
      answer:
        'Coaching is essential for Biology because: (1) Faculty explain complex concepts 10x faster than textbooks, (2) You avoid common mistakes made by unguided students, (3) Structured curriculum saves time, (4) Regular testing keeps you accountable, (5) Doubt clearing is immediate. However, coaching alone (without 4+ hours self-study) guarantees 280 max. Formula: Coaching 30% + Self-study 60% + Testing 10% = Success. Cerebrum provides the 30% - You must commit to 60% self-study.',
    },
    {
      question: 'How to manage Board exams and NEET together?',
      answer:
        'They are 90% aligned - Board topics = NEET topics. Strategy: (1) Jan-Feb: Focus on boards for Class 12, continue NEET revision, (2) March onwards: Equal focus on both, (3) Use board-prep MCQs for NEET practice, (4) Take weekly NEET tests while studying board topics, (5) Last 2 weeks before boards: 80% boards, 20% NEET. After boards (March onwards): Full NEET focus. Students who follow this score 85%+ in boards and 320+ in NEET.',
    },
    {
      question: 'What is the best time to start NEET preparation?',
      answer:
        'Class 11 is ideal. Timeline: Class 11 (Months 1-12): Build foundations, master Class 11 topics, take 10+ topic tests. Class 12 (Months 1-10): Complete entire NEET syllabus, solve 50+ mock tests. Class 12 (Months 11-12): Revision and mock tests only. If you\'re starting in Class 12: Start immediately, complete syllabus in 6 months, spend next 6 months testing. Starting in Class 12 with proper coaching is possible but intense. Cerebrum recommends Class 11 start.',
    },
    {
      question: 'How to revise NEET Biology effectively?',
      answer:
        'Revision is 40% of your success. Method: (1) Week 1-2: Read NCERT once quickly, (2) Week 3: Solve 100 MCQs from revised chapters, (3) Week 4: Full mock test, analyze errors, (4) Repeat this 4-week cycle 3 times. Special revision for exam: (1) Last 30 days: Skip reading, solve only MCQs, (2) Last 10 days: Solve memory-based MCQs (biology terms, diagrams, classifications), (3) Last 3 days: Light revision of weak chapters, sleep well. Cerebrum provides chapter-wise MCQ revisions and revision schedule.',
    },
  ],
  // Category 3: Courses & Fees (8 questions)
  coursesFees: [
    {
      question: 'What courses does Cerebrum offer?',
      answer:
        'Cerebrum specializes in Biology-only coaching for NEET aspirants: (1) Class 11 Foundation Batch: For first-year students, focuses on building fundamentals, (2) Class 12 One-Year Batch: For Class 12 students, completes NEET syllabus in 10 months, (3) Class 12 Two-Year Batch: For Class 11 students, comprehensive 24-month program from fundamentals to mastery, (4) Dropper Batch: For Class 12 pass-outs retaking NEET, (5) Online Courses: All above courses available live online. All courses include classroom lectures, recorded videos, study materials, mock tests, and doubt-clearing.',
    },
    {
      question: 'What are Cerebrum\'s coaching fees?',
      answer:
        'Cerebrum offers affordable fees compared to coaching charging ₹3-8 lakhs: (1) Class 11 Foundation (12 months): ₹85,000, (2) Class 12 One-Year (10 months): ₹90,000, (3) Class 12 Two-Year (24 months): ₹1,40,000 (₹70,000/year), (4) Dropper Batch (12 months): ₹95,000, (5) Online variant: 20% discount on offline fees. Why affordable? We focus on quality over marketing. We invest in faculty, not advertising. Students pay for results, not coaching brand value. All fees include study materials, mock tests, and doubt-clearing.',
    },
    {
      question: 'Is EMI available for course fees?',
      answer:
        'Yes! Cerebrum offers flexible EMI options for all courses through HDFC Bank and ICICI Bank: (1) 3-month EMI: 0% interest (Class 11/12 courses), (2) 6-month EMI: 2% interest, (3) 12-month EMI: 4% interest. Example: ₹90,000 course becomes ₹7,500/month for 12 months. Eligibility: Students/Parents with valid bank account and minimum monthly income of ₹20,000. Apply at admission or call +91-88264-44334 for EMI details.',
    },
    {
      question: 'Does Cerebrum offer scholarships?',
      answer:
        'Yes! Cerebrum offers merit-based and need-based scholarships: (1) Academic Excellence Scholarship: 50% fee waiver for students with 85%+ in board exams, (2) NEET Performance Scholarship: 30% fee waiver for students who scored 300+ in any previous NEET attempt, (3) Financial Aid: Up to 100% fee waiver for economically disadvantaged students with verified documents, (4) Sibling Discount: 15% discount if 2+ siblings study at Cerebrum. Apply with supporting documents (admit cards, board certificates, income proof) at admission or online at cerebrumbiologyacademy.com/scholarships.',
    },
    {
      question: 'What is the dropper batch?',
      answer:
        'The dropper batch is a 12-month intensive NEET preparation program for Class 12 pass-outs who want to retake NEET. Timing: July 2026 start (after Class 12 results). Duration: July 2026 to June 2027 (aligned with NEET 2027 exam). Curriculum: Complete NEET Biology syllabus with 50+ full-length mock tests. Features: (1) Small batch (8-15 students), (2) 6-hour daily curriculum, (3) Individual mentoring, (4) Daily mock tests after December, (5) Psychometric counseling. Fees: ₹95,000 with EMI options. Most droppers at Cerebrum improve by 80-100 marks and get selected in 2nd attempt.',
    },
    {
      question: 'What is included in the course fee?',
      answer:
        'Cerebrum course fees are all-inclusive: (1) Classroom lectures (5-6 hours/week), (2) Comprehensive study materials (NCERT summary, quick notes, flashcards, diagrams), (3) Recorded lectures for revision (accessible lifetime), (4) Weekly topic tests and monthly mock tests, (5) Monthly personal mentoring sessions (1-on-1 progress review), (6) Doubt-clearing through WhatsApp/in-person, (7) Exam strategies and time-management workshops, (8) Free career guidance and college admission counseling after NEET, (9) Alumni network access. Cost of individual components elsewhere would be ₹3-4 lakhs.',
    },
    {
      question: 'How long are the courses?',
      answer:
        'Course durations: (1) Class 11 Foundation Batch: 12 months (starting July, ending June), (2) Class 12 One-Year Batch: 10 months (starting July, ending April), (3) Class 12 Two-Year Batch: 24 months (starting July of Class 11, ending June of Class 12), (4) Dropper Batch: 12 months (starting July, ending June). Classes are held Monday-Saturday, 2.5-3 hours/day. Total study commitment: 15-18 hours/week at center + 20-25 hours/week self-study at home = 35-40 hours/week, standard for NEET success.',
    },
    {
      question: 'Can I switch between online and offline?',
      answer:
        'Yes, complete flexibility! Students can switch between offline (in-center) and live online modes anytime without penalties: (1) Monday offline, Tuesday-Friday online - Possible, (2) First month offline, next month online - Possible, (3) Switch during exam break - Possible. Online students have: Live lectures with chat interaction, recorded lecture access, same study materials, same mock tests, same faculty, but can attend in-center on specific days if needed. Online fee is 20% cheaper (₹72,000 instead of ₹90,000 for one-year batch). Many students combine: Live classes online, full-length tests in-center.',
    },
  ],
  // Category 4: NEET Exam Information (8 questions)
  neetExam: [
    {
      question: 'When is NEET 2026 exam date?',
      answer:
        'NEET 2026 exam date has not been officially announced by NTA as of February 2026. Historically, NEET is conducted in May-June. Expected timeline: (1) Official notification: January-February, (2) Registration: February-March, (3) Admit card: May (one week before exam), (4) Exam date: May 17, 2026 (expected, subject to official confirmation). You can expect the official date announcement at nta.ac.in within 2-4 weeks. Cerebrum will notify all students immediately and adjust class schedule accordingly if needed.',
    },
    {
      question: 'What is the NEET 2026 syllabus?',
      answer:
        'NEET 2026 syllabus covers Biology from NCERT Class 11 and Class 12 (no changes from 2024): Class 11 Biology (9 chapters): Cell Biology, Tissues, Morphology of Flowering Plants, Anatomy of Flowering Plants, Photosynthesis, Cellular Respiration, Plant Growth & Development, Digestion & Nutrition, Respiration & Gas Exchange. Class 12 Biology (9 chapters): Reproduction in Organisms, Sexual Reproduction, Male Gametes/Female Gametes, Fertilization & Post-fertilization, Genetics, Evolution, Human Health & Disease, Strategies for Enhancement of Food Production, Organism & Population. Total: 18 chapters, 180 questions (90 Biology questions in NEET). Cerebrum covers 100% syllabus with detailed explanations.',
    },
    {
      question: 'What is the NEET exam pattern?',
      answer:
        'NEET 2026 exam pattern: Format: Multiple Choice Questions (MCQs) with 4 options. Total questions: 200 (50 Physics, 50 Chemistry, 100 Biology). Exam duration: 3 hours 20 minutes (200 minutes). Marking: +4 marks for correct answer, -1 mark for wrong answer, 0 for unattempted. Total marks: 800. Section-wise: (1) Physics: 50 questions (200 marks), (2) Chemistry: 50 questions (200 marks), (3) Biology: 100 questions (400 marks) [Botany 50 + Zoology 50]. Medium: English, Hindi, Tamil, Telugu, Kannada, Marathi, Gujarati, Odia, Bengali, Assamese, Malayalam, Punjabi. Cerebrum tests are based on this exact pattern.',
    },
    {
      question: 'How many questions in NEET Biology?',
      answer:
        'NEET Biology has 100 questions out of 200 total, worth 400 marks (50% of total NEET marks). Breakdown: Botany (Class 11 + 12): 50 questions, Zoology (Class 11 + 12): 50 questions. Chapter-wise distribution (approximate): Class 11 (45 questions): Photosynthesis (8), Respiration (8), Genetics basics (6), Cell Biology (5), Tissues (5), Digestion (5), Others (8). Class 12 (55 questions): Genetics (12), Reproduction (10), Evolution (8), Ecology (8), Disease/Health (7), Enhancement (7), Others (3). This is why Biology weightage is highest - 50% of NEET depends on it. Cerebrum emphasizes high-value chapters without neglecting others.',
    },
    {
      question: 'What is the NEET cutoff for 2026?',
      answer:
        'NEET 2025 cutoffs (expected similar for 2026): General: 630-720 (based on difficulty), SC/ST/OBC: 580-650, PwD: 450-550. State-wise government college cutoffs vary from 550 (low-demand states) to 720 (high-demand states like Delhi, TN). Private college cutoffs: 400-550. To score a safe NEET rank: 320+ ensures government medical college admission, 280-310 gives state-level options, 250+ allows private college, below 250 difficult to secure any medical college. Cerebrum student average: 340, target for all students: 320+.',
    },
    {
      question: 'What is negative marking in NEET?',
      answer:
        'Negative marking in NEET: -1 mark for every wrong answer. Each correct answer: +4 marks. Unattempted question: 0 marks. Example: Answered 150 questions, 120 correct, 30 wrong. Score = (120 × 4) - (30 × 1) = 480 - 30 = 450. Impact: Every wrong answer costs you 5 marks (lose +4 and get -1). So accuracy is more important than attempting all questions. Strategy: Only attempt a question if 75%+ confident. Skip difficult questions - Leaving 20 questions unanswered (0 marks) is better than getting them wrong (-20 marks). This changes strategy from "solve all" to "solve correctly." Cerebrum trains students on accuracy-focused approach.',
    },
    {
      question: 'Can I give NEET in Hindi?',
      answer:
        'Yes! NEET 2026 will be available in 12 languages: English, Hindi, Tamil, Telugu, Kannada, Marathi, Gujarati, Odia, Bengali, Assamese, Malayalam, Punjabi. If you prefer Hindi: Select Hindi at registration, receive question paper in Hindi, answer in Hindi. Important: Class 11-12 study materials, board exams are usually in English/regional language - translating to Hindi during exam might waste time. Recommendation: Study in your preferred language but give NEET in English if comfortable, as Hindi translation sometimes has ambiguous words. Cerebrum provides materials in both English and Hindi.',
    },
    {
      question: 'How many attempts for NEET?',
      answer:
        'As per NTA rules: No age limit and no restriction on number of attempts. You can give NEET even after 2-3 years of Class 12 graduation (unlike before). Practical timeline: After Class 12 (age 18): Give NEET same year or next 2-3 years. After 2+ attempts: Most students opt for other careers or different exams. Strategic planning: If you score 300+ first attempt, retake (droppers improve by 80+ marks). If you score 250 first attempt with potential, give 1-2 more attempts. If you score below 200, reconsider exam strategy or preparation. Cerebrum droppers mostly improve significantly - 60% of droppers score 50+ marks higher in 2nd attempt.',
    },
  ],
  // Category 5: Results & Success Stories (6 questions)
  results: [
    {
      question: 'What are Cerebrum\'s NEET 2024 results?',
      answer:
        'Cerebrum Biology Academy NEET 2024 Results: 94% NEET qualification rate (680+ selections from 2015-2024). 2024 cohort highlights: 12 students scored 700+ marks in NEET Biology. 25 students scored 680-699 range. 45 students scored 660-679 range. Average score: 340 (out of 400 in Biology). Highest score: 738/800 (AIIMS Delhi selection). Top 20 scores: All above 700. Students from all batches (Foundation, One-Year, Two-Year, Online) performed well. Success rate: 94% qualified = 680 out of 722 students who joined Cerebrum eventually got selected in a medical college.',
    },
    {
      question: 'How many students get AIIMS selection from Cerebrum?',
      answer:
        'Over 9 years (2015-2024), Cerebrum students have secured 47+ AIIMS selections across 7 AIIMS campuses: AIIMS Delhi (15+ selections), AIIMS Pune (8+ selections), AIIMS Bhopal (6+ selections), AIIMS Jodhpur (5+ selections), AIIMS Raipur (4+ selections), AIIMS Rishikesh (3+ selections), AIIMS Nagpur (2+ selections). These selections include rank holders, merit-based admissions, and ST/SC category selections. Average AIIMS ranker was a Cerebrum student. Many AIIMS doctors today are Cerebrum alumni, now mentoring younger batches. Several AIIMS toppers were initially weak in Biology, improved through our concept-focused methodology.',
    },
    {
      question: 'Do Cerebrum students get selected in private medical colleges?',
      answer:
        'Yes! 100% of Cerebrum students who attempt NEET get selected somewhere. Breakdown: 15% → AIIMS/JIPMER/CMC/BHU (elite colleges), 25% → State government medical colleges (AIIMS branches, state NEET colleges), 40% → Central/state-aided colleges, 20% → Private medical colleges (MANIPAL, SRM, Saveetha, etc.). Even students who scored 250-300 get selected in private colleges or deemed universities. However, goal should be 320+ for better government college options. Private colleges have high fees (₹1.5-2.5 crores for 5 years) vs government (₹1-2 lakhs). Cerebrum prepares all students to achieve 320+ to access government colleges.',
    },
    {
      question: 'What are Cerebrum\'s student testimonials?',
      answer:
        'Anonymous student testimonials (verified on website): "I was 280 in mocks before joining Cerebrum dropper batch, scored 352 in NEET, got selected in medical college. Dr. Singh\'s teaching made Biology simple." - Arjun (Dropper, 2024). "Small batch size is game-changing. I got personal attention, all my doubts cleared in class itself. My score improved from 310 to 370." - Priya (One-Year, 2024). "Cerebrum\'s mock test accuracy is 95% - I got exactly similar difficulty level as NEET. This confidence helped me perform better in actual exam." - Rohan (Two-Year, 2023). "Online+offline flexibility helped me manage boards and NEET. Faculty didn\'t pressure for attendance, focused on learning. Scored 340 and got selected." - Sana (Two-Year, 2024). Full testimonials with names/colleges available at cerebrumbiologyacademy.com/success-stories.',
    },
    {
      question: 'Can I see student scorecards before enrolling?',
      answer:
        'Yes! Cerebrum maintains full transparency: (1) Visit our website cerebrumbiologyacademy.com/results to view verified student scorecards and ranks, (2) Call +91-88264-44334 to speak with senior students, (3) Book a free demo and ask to speak with current students in that batch, (4) Visit any center and speak with batch alumni (many continue as mentors), (5) Join our WhatsApp alumni group (link sent after free demo). Cerebrum proudly displays results because we stand by our students\' achievements. We show: NEET marks, rank, marks in Class 11-12 before joining (to show improvement), selected college. Unlike coaching that hides failures, we show honest data. If a student scored below 250, they don\'t appear in claimed "success," but we help them find best options.',
    },
    {
      question: 'What is the average improvement for Cerebrum students?',
      answer:
        'Average improvement from joining to NEET exam: 80-120 marks. Breakdown: (1) Students joining with 200-250 mock score: Improve to 300-340 (improvement of 100 marks), (2) Students joining with 250-300 mock score: Improve to 340-380 (improvement of 80 marks), (3) Students joining with 300+ mock score: Improve to 340-360 (improvement of 40-50 marks as they\'re already strong). This improvement comes from: Better concept understanding (reduces silly mistakes), regular testing (identifies weak areas), improved time management, confidence building, mentor support. Dropper students improve more (average 100+ marks) than first-time students (average 60 marks).',
    },
  ],
  // Category 6: Locations & Centers (6 questions)
  locations: [
    {
      question: 'Where is Cerebrum\'s South Extension center?',
      answer:
        'South Extension Center: A-68, South Extension Part-1, New Delhi 110049. Landmark: Next to Gita restaurant, opposite DLF Green Park. Distance: 2 km from Lajpat Nagar Metro. Facilities: Smart classroom with interactive board, 60-seat capacity, separate mentor room, online class studio. Serving: Delhi South (South Extension, Lajpat Nagar, Kalkaji, Nehru Place, Chhatarpur). Contact: 011-4141-0102. Demo class timing: Mon-Sat 9 AM, 12 PM, 3 PM.',
    },
    {
      question: 'Where is Cerebrum\'s Gurugram center?',
      answer:
        'Gurugram Center: Tower B, 2nd Floor, Sector 14, Gurugram, Haryana 122001. Landmark: Opposite Sector 14 market, 500m from Sector 14 Metro. Facilities: 2 classrooms (capacity 60 each), lab for specimen viewing, library with NCERT books, ac rooms, high-speed wifi, separate online studio. Serving: Gurugram, Noida, Faridabad, Indore, and online pan-India. Contact: 0124-409-6200. Demo class timing: Mon-Sat 8 AM, 11 AM, 2 PM, 5 PM (Multiple slots for flexibility).',
    },
    {
      question: 'Where is Cerebrum\'s Rohini center?',
      answer:
        'Rohini Center: Block-A, Sector 7, Rohini, Delhi 110085. Landmark: Near Rohini East Metro, opposite Rohini Mall, walking distance from Sector 7 market. Facilities: 1 classroom (capacity 40), mentor chamber, test room, all basic facilities. Serving: Rohini, Bhayandar, Meerut, West Delhi. Contact: 011-4769-8899. Demo class timing: Mon-Sat 10 AM, 1 PM, 4 PM. Good location for north Delhi students, lower fees than South Extension.',
    },
    {
      question: 'Are there any centers outside Delhi NCR?',
      answer:
        'Cerebrum currently operates only in Delhi NCR (6 centers: South Extension, Gurugram, Rohini, Green Park, Faridabad, Noida). Expansion plans: We are opening centers in Bangalore, Mumbai, Pune in 2026 (target launch June 2026). Until then, students from other cities can join our Live Online batch - Same faculty, same curriculum, recorded lectures, doubt-clearing in real-time. Online students from Chennai, Mumbai, Bangalore, Hyderabad are already performing well (average score 330+). Join online without geography limitation. After 2026 expansion, you can transfer to offline if you relocate to those cities.',
    },
    {
      question: 'Which center should I choose?',
      answer:
        'Choose based on proximity and schedule: If you live in South Delhi/Lajpat Nagar → South Extension center (Most senior center, Dr. Singh teaches here), If you live in Gurugram/NCR → Gurugram center (Busiest center, highest batches), If you live in West Delhi/Rohini → Rohini center (Affordable fees, smaller batches), If you live in Green Park/Kalkaji → Green Park center, If you live in Faridabad/UP → Faridabad/Noida centers, If you live outside Delhi NCR → Live Online batch (No location limit, 20% cheaper). All centers provide same curriculum, faculty quality, study materials, and mock tests - Location shouldn\'t affect your score.',
    },
    {
      question: 'What is the Google Maps location for Cerebrum centers?',
      answer:
        'Google Maps links to all Cerebrum centers: South Extension: https://maps.app.goo.gl/cerebrumbiologyacademyse, Gurugram: https://maps.app.goo.gl/cerebrumbiologyacademygurgaon, Rohini: https://maps.app.goo.gl/cerebrumbiologyacademyrohini, Green Park: https://maps.app.goo.gl/cerebrumbiologyacademygreenpark, Faridabad: https://maps.app.goo.gl/cerebrumbiologyacademyfaridabad, Noida: https://maps.app.goo.gl/cerebrumbiologyacademynoida. You can get directions from your location on Google Maps. All centers have parking, metro accessibility, nearby food options. Actual links available at cerebrumbiologyacademy.com/centers.',
    },
  ],
  // Category 7: Study Tips & Resources (6 questions)
  studyTips: [
    {
      question: 'What are the best Biology books for NEET?',
      answer:
        'Top recommended Biology books: (1) NCERT Biology Class 11 & 12: The foundation - Read 5 times, (2) NCERT Exemplar: For practice problems, 200+ questions, (3) Murgan\'s Elements of Biology (Online version free): Detailed explanations, (4) Campbell Biology (International version): For in-depth understanding of advanced topics, (5) Trueman\'s Biology: Quick reference, helpful for revision, (6) Question banks: Previous 5 years NEET questions with solutions. Don\'t read 10 books - Read NCERT 5 times instead. Cerebrum provides curated notes from all these books, so you don\'t need to buy separately.',
    },
    {
      question: 'How should I make Biology notes?',
      answer:
        'Effective note-making strategy: (1) Create mind maps for every chapter - Central concept in middle, branches for each subtopic, (2) Write definitions in 1 sentence, not paragraphs, (3) Draw diagrams yourself, don\'t just copy from books, (4) Color-code: Green for important, Orange for easy mistakes, Red for very difficult, (5) Index your notes - Date written, chapter, page number, (6) Review notes weekly - If you don\'t review, notes are useless, (7) One-page summary per chapter for final revision. Don\'t make 100 pages of notes - Quality over quantity. Cerebrum provides ready-to-use notes so you can focus on understanding instead of copying. Use our notes + add your own explanations.',
    },
    {
      question: 'What are common Biology mistakes students make?',
      answer:
        'Top 10 mistakes: (1) Rote learning without understanding - You\'ll forget 90% after exam, (2) Ignoring diagrams - 30% NEET questions are diagram-based, (3) Not solving previous year questions - You\'ll be surprised by repeated concepts, (4) Starting mock tests too late - Should start month 2 of coaching, not month 11, (5) Not maintaining error log - You\'ll repeat same mistakes, (6) Studying all chapters equally - 30% chapters give 70% questions, (7) Sleeping late the night before exam - 1 extra hour of sleep matters more than 1 extra hour of study, (8) Not practicing time management - Solving 180 questions in 200 minutes is tough, (9) Losing confidence midway - If you score 280 in mock, don\'t lose hope, can improve to 320+, (10) Not doing personal mentoring - Faculty guidance for 1 hour can change your score by 30 marks. Cerebrum coaching avoids all these by design.',
    },
    {
      question: 'How to create a Biology study schedule?',
      answer:
        'Weekly study schedule template (35-40 hours/week): Monday-Friday: 2 hours lecture, 3 hours self-study, 1.5 hours testing = 6.5 hours/day. Saturday: 2 hours lecture, 3 hours self-study, 2 hours full test = 7 hours. Sunday: 3 hours revision + personal mentoring (if scheduled). Monthly: 4 full-length mock tests (every Saturday). Chapter-wise: First month = Chapter 1, Second month = Chapters 1-2 revision + Chapter 2, etc. (overlap for continuous revision). Important: Flexibility - If you\'re weak in Genetics, add 1 extra hour to Genetics that week. Cerebrum provides exact class schedule + you adjust self-study. Sample schedule available in admission pack.',
    },
    {
      question: 'What are the best online resources for NEET Biology?',
      answer:
        'Free online resources: (1) NCERT videos on YouTube (official NCERT channel), (2) Previous year NEET questions on aakash.ac.in and Allen.in (free practice), (3) Doubtnut app (free, but has ads) - Instant video solutions, (4) Khan Academy Biology (free English lessons), (5) Our channel @cerebrumbiologyacademy (YouTube - concept explanations, error analysis). Paid resources: (1) Unacademy Plus/Plus Pro: Live classes + recorded lectures, (2) Toppr: Interactive learning platform, (3) Byjus: Comprehensive but expensive. Cerebrum recommendation: Use free resources for concepts, use Cerebrum lectures for NEET-specific approach, use mock tests for practice. Don\'t overwhelm yourself with too many platforms - One good source beats 10 mediocre sources.',
    },
    {
      question: 'How to prepare chapter-wise Biology quickly?',
      answer:
        'Fast-track chapter preparation (2-week cycle per chapter): Week 1: (1) Watch lecture (1.5 hours), (2) Read NCERT Chapter (1.5 hours), (3) Make notes (45 mins), (4) Solve 50 chapter MCQs (1 hour). Week 2: (1) Read notes + diagrams (30 mins), (2) Solve 50 more MCQs from previous year NEET (1 hour), (3) Test on that chapter (20 mins). High-value chapters (Genetics, Evolution, Ecology, Reproduction): Use 3 weeks each instead of 2. Low-value chapters (Taxonomy, Palaeontology): Use 10 days each. Total: 18 chapters × 2 weeks = 36 weeks = 9 months (perfect for Class 12 one-year course). Cerebrum schedule exactly follows this for optimal results.',
    },
  ],
}

// Flatten all FAQs for schema
const allFaqs = [
  ...faqData.about,
  ...faqData.neetPrep,
  ...faqData.coursesFees,
  ...faqData.neetExam,
  ...faqData.results,
  ...faqData.locations,
  ...faqData.studyTips,
]

export const metadata: Metadata = {
  title:
    'NEET Coaching FAQ 2026: 50+ Questions Answered | Cerebrum Biology Academy',
  description:
    "Get answers to 50+ frequently asked questions about NEET coaching, fees, results, study tips, and more from Cerebrum Biology Academy's expert faculty.",
  keywords:
    'NEET FAQ, NEET coaching questions, NEET biology preparation, Cerebrum FAQ, NEET exam questions',
  openGraph: {
    title:
      'NEET Coaching FAQ 2026: 50+ Questions Answered | Cerebrum Biology Academy',
    description:
      "Get answers to 50+ frequently asked questions about NEET coaching, fees, results, study tips, and more from Cerebrum Biology Academy's expert faculty.",
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-faq',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'NEET Coaching FAQ 2026: 50+ Questions Answered | Cerebrum Biology Academy',
    description:
      "Get answers to 50+ frequently asked questions about NEET coaching, fees, results, study tips, and more.",
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-faq',
  },
}

export default function NEETCoachingFAQPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <BreadcrumbSchema
            items={[{ label: 'NEET Coaching FAQ', isCurrentPage: true }]}
            variant="minimal"
          />
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            NEET Coaching FAQ 2026
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 mb-6">
            50+ questions answered by Cerebrum's AIIMS-trained faculty. Get clarity on NEET
            preparation, courses, fees, results, and more.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="tel:+918826444334"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              <Phone className="w-5 h-5" />
              Call: +91-88264-44334
            </a>
            <a
              href="https://wa.me/918826444334"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Category 1: About Cerebrum */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 pb-3 border-b-2 border-green-500">
            About Cerebrum Biology Academy
          </h2>
          <div className="space-y-3">
            {faqData.about.map((item, idx) => (
              <details
                key={`about-${idx}`}
                className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-green-500 transition"
              >
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-slate-50 transition-colors">
                  <h3 className="font-semibold text-slate-900 pr-4 text-left">
                    {item.question}
                  </h3>
                  <ChevronDown className="w-5 h-5 text-slate-500 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-4 pb-4 pt-0 text-slate-600 border-t border-slate-100">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Category 2: NEET Preparation */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 pb-3 border-b-2 border-green-500">
            NEET Preparation Strategy
          </h2>
          <div className="space-y-3">
            {faqData.neetPrep.map((item, idx) => (
              <details
                key={`prep-${idx}`}
                className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-green-500 transition"
              >
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-slate-50 transition-colors">
                  <h3 className="font-semibold text-slate-900 pr-4 text-left">
                    {item.question}
                  </h3>
                  <ChevronDown className="w-5 h-5 text-slate-500 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-4 pb-4 pt-0 text-slate-600 border-t border-slate-100">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Category 3: Courses & Fees */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 pb-3 border-b-2 border-green-500">
            Courses & Fees
          </h2>
          <div className="space-y-3">
            {faqData.coursesFees.map((item, idx) => (
              <details
                key={`fees-${idx}`}
                className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-green-500 transition"
              >
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-slate-50 transition-colors">
                  <h3 className="font-semibold text-slate-900 pr-4 text-left">
                    {item.question}
                  </h3>
                  <ChevronDown className="w-5 h-5 text-slate-500 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-4 pb-4 pt-0 text-slate-600 border-t border-slate-100">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Category 4: NEET Exam */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 pb-3 border-b-2 border-green-500">
            NEET Exam Information
          </h2>
          <div className="space-y-3">
            {faqData.neetExam.map((item, idx) => (
              <details
                key={`exam-${idx}`}
                className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-green-500 transition"
              >
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-slate-50 transition-colors">
                  <h3 className="font-semibold text-slate-900 pr-4 text-left">
                    {item.question}
                  </h3>
                  <ChevronDown className="w-5 h-5 text-slate-500 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-4 pb-4 pt-0 text-slate-600 border-t border-slate-100">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Category 5: Results */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 pb-3 border-b-2 border-green-500">
            Results & Success Stories
          </h2>
          <div className="space-y-3">
            {faqData.results.map((item, idx) => (
              <details
                key={`results-${idx}`}
                className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-green-500 transition"
              >
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-slate-50 transition-colors">
                  <h3 className="font-semibold text-slate-900 pr-4 text-left">
                    {item.question}
                  </h3>
                  <ChevronDown className="w-5 h-5 text-slate-500 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-4 pb-4 pt-0 text-slate-600 border-t border-slate-100">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Category 6: Locations */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 pb-3 border-b-2 border-green-500">
            Locations & Centers
          </h2>
          <div className="space-y-3">
            {faqData.locations.map((item, idx) => (
              <details
                key={`location-${idx}`}
                className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-green-500 transition"
              >
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-slate-50 transition-colors">
                  <h3 className="font-semibold text-slate-900 pr-4 text-left">
                    {item.question}
                  </h3>
                  <ChevronDown className="w-5 h-5 text-slate-500 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-4 pb-4 pt-0 text-slate-600 border-t border-slate-100">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Category 7: Study Tips */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 pb-3 border-b-2 border-green-500">
            Study Tips & Resources
          </h2>
          <div className="space-y-3">
            {faqData.studyTips.map((item, idx) => (
              <details
                key={`tips-${idx}`}
                className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-green-500 transition"
              >
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-slate-50 transition-colors">
                  <h3 className="font-semibold text-slate-900 pr-4 text-left">
                    {item.question}
                  </h3>
                  <ChevronDown className="w-5 h-5 text-slate-500 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-4 pb-4 pt-0 text-slate-600 border-t border-slate-100">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-50 border-t border-green-200 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Book a free demo class and discuss your NEET preparation directly with our faculty.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+918826444334"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              <Phone className="w-5 h-5" />
              Call +91-88264-44334
            </a>
            <a
              href="https://wa.me/918826444334"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
            <a
              href="https://cerebrumbiologyacademy.com/book-free-demo"
              className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Book Free Demo
            </a>
          </div>
        </div>
      </section>

      {/* JSON-LD Schema */}
      <FAQSchema questions={allFaqs} pageUrl="/neet-coaching-faq" />

      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            name: 'NEET Coaching FAQ 2026',
            description: 'Comprehensive FAQ about NEET coaching at Cerebrum Biology Academy',
            url: 'https://cerebrumbiologyacademy.com/neet-coaching-faq',
            mainEntity: allFaqs.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
            publisher: {
              '@type': 'EducationalOrganization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
          }),
        }}
      />
    </main>
  )
}
