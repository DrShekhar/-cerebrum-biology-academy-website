/**
 * HowTo Schema Configurations for Blog Posts
 * Maps blog post slugs to HowTo step-by-step structured data
 * Used for Google rich snippet eligibility on "how to prepare" queries
 */

export interface HowToStep {
  name: string
  text: string
  position: number
}

export interface HowToConfig {
  slug: string
  name: string
  description: string
  totalTime?: string
  steps: HowToStep[]
}

export const HOWTO_CONFIGS: Record<string, HowToConfig> = {
  // NEET Preparation Guide
  'neet-preparation-guide': {
    slug: 'neet-preparation-guide',
    name: 'How to Prepare for NEET Biology 2026',
    description:
      'Step-by-step guide to prepare for NEET Biology exam and score 340+ marks with proven strategies from Cerebrum Biology Academy experts.',
    totalTime: 'P6M',
    steps: [
      {
        name: 'Understand the NEET Biology Syllabus',
        text: 'Study the complete NEET Biology syllabus covering Botany and Zoology. Identify high-weightage chapters like Human Physiology, Genetics, and Ecology. Download the official NTA syllabus and create a chapter-wise study plan.',
        position: 1,
      },
      {
        name: 'Build Strong NCERT Foundation',
        text: 'Read NCERT Biology textbooks for Class 11 and 12 line by line. Highlight key definitions, diagrams, and processes. NCERT covers approximately 90% of NEET Biology questions.',
        position: 2,
      },
      {
        name: 'Create a Study Timetable',
        text: 'Allocate 4-6 hours daily for Biology preparation. Divide time between Botany and Zoology equally. Include revision slots every week and monthly full-length tests.',
        position: 3,
      },
      {
        name: 'Master High-Weightage Chapters First',
        text: 'Focus on chapters with highest NEET weightage: Human Physiology (20%), Genetics & Evolution (18%), Cell Biology (9%), Plant Physiology (6%), and Ecology (12%). Complete these before moving to lower-weightage topics.',
        position: 4,
      },
      {
        name: 'Practice Previous Year Questions',
        text: 'Solve last 10 years of NEET Biology previous year papers. Analyze patterns, identify frequently asked topics, and focus on weak areas. Aim to complete at least 5000 MCQs during preparation.',
        position: 5,
      },
      {
        name: 'Take Mock Tests Regularly',
        text: 'Attempt full-length NEET mock tests every week in the final 3 months. Analyze each test for mistakes, time management, and accuracy. Target 340+ marks in Biology section consistently.',
        position: 6,
      },
      {
        name: 'Revision Strategy',
        text: 'Use spaced repetition for revision. Create concise notes and flashcards for quick review. Revise all NCERT chapters at least 3 times before the exam. Focus on diagrams, flowcharts, and comparison tables.',
        position: 7,
      },
    ],
  },

  // NEET Biology Score 340+
  'neet-biology-score-340-plus': {
    slug: 'neet-biology-score-340-plus',
    name: 'How to Score 340+ in NEET Biology',
    description:
      'Expert strategy to score 340+ marks in NEET Biology with chapter-wise preparation tips, time management, and proven techniques.',
    totalTime: 'P4M',
    steps: [
      {
        name: 'Set Target Score Breakdown',
        text: 'Target 85+ correct answers out of 100 Biology questions. Allow maximum 5 wrong answers. Focus on accuracy over speed - each wrong answer costs 1 mark penalty.',
        position: 1,
      },
      {
        name: 'Master NCERT Thoroughly',
        text: 'Memorize all NCERT examples, diagrams, tables, and exact wordings. Most NEET questions are directly from NCERT. Pay special attention to figure captions and summary sections.',
        position: 2,
      },
      {
        name: 'Focus on Zoology for Quick Gains',
        text: 'Zoology topics like Human Physiology, Animal Kingdom, and Structural Organisation are high-scoring. These chapters have more direct questions and are easier to score in.',
        position: 3,
      },
      {
        name: 'Use Mnemonics and Visual Aids',
        text: 'Create mnemonics for classifications, hormone functions, and disease lists. Draw and redraw diagrams until you can reproduce them from memory. Visual learning improves retention by 65%.',
        position: 4,
      },
      {
        name: 'Daily Practice of 100 MCQs',
        text: 'Solve 100 Biology MCQs daily from various sources. Mix chapter-wise questions with random topic questions. Track your accuracy rate and aim for 85%+ consistently.',
        position: 5,
      },
      {
        name: 'Analyze and Eliminate Weak Areas',
        text: 'After each test, categorize mistakes: conceptual errors, silly mistakes, or time issues. Create an error log and review it weekly. Target zero conceptual errors in final month.',
        position: 6,
      },
    ],
  },

  // 12-Month Dropper Study Plan
  '12-month-neet-dropper-study-plan-complete-guide': {
    slug: '12-month-neet-dropper-study-plan-complete-guide',
    name: 'How to Prepare for NEET as a Dropper - 12 Month Strategy',
    description:
      'Complete 12-month study plan for NEET dropper students with phase-wise breakdown, subject distribution, mock test schedule, and revision strategy.',
    totalTime: 'P12M',
    steps: [
      {
        name: 'Month 1-3: Foundation Phase',
        text: 'Focus on building strong fundamentals in all three subjects. Complete Class 11 NCERT thoroughly. Biology gets 40% of time, Physics 30%, Chemistry 30%. No mock tests yet, only concept building.',
        position: 1,
      },
      {
        name: 'Month 4-6: Building Phase',
        text: 'Complete Class 12 NCERT and start practice questions. Begin with chapter-wise tests. Biology should still get 40% time. Start light mock tests from Month 5-6 to understand exam pattern.',
        position: 2,
      },
      {
        name: 'Month 7-9: Practice Phase',
        text: 'Complete all numericals and conceptual problems. Take full-length mock tests twice weekly. Analyze each test meticulously. Biology practice should include 100+ MCQs daily from different sources.',
        position: 3,
      },
      {
        name: 'Month 10: Peak Preparation Phase',
        text: 'Mock tests 3 times per week. Revision of important chapters starts. Create condensed notes and mind maps. Focus on high-weightage topics. Target minimum 600 in mock tests.',
        position: 4,
      },
      {
        name: 'Month 11: Intensive Revision',
        text: 'Solve previous 10 years papers in test format. One mock test daily. Revise error log from all previous tests. No new concepts, only consolidation. Biology full-length tests minimum 5 per week.',
        position: 5,
      },
      {
        name: 'Month 12: Final Preparation',
        text: 'Last 2 weeks: Mock tests alternate days. Last 1 week: Light reading and mental preparation. Sleep 8 hours daily. Maintain confidence. Review important formulas, mnemonics, and diagrams.',
        position: 6,
      },
    ],
  },

  // Choosing NEET Coaching
  'choosing-neet-coaching': {
    slug: 'choosing-neet-coaching',
    name: 'How to Choose the Best NEET Coaching in Delhi NCR',
    description:
      'Complete guide to selecting the right NEET coaching institute in Delhi NCR. Compare factors like faculty, results, fees, and teaching methodology.',
    totalTime: 'P1W',
    steps: [
      {
        name: 'Check Faculty Qualifications',
        text: 'Verify that faculty members have strong academic backgrounds (AIIMS/medical college graduates preferred). Look for teachers with 10+ years of NEET coaching experience and proven track record.',
        position: 1,
      },
      {
        name: 'Analyze Past Results',
        text: 'Ask for verifiable NEET results data. Check how many students scored 650+ in NEET. Look for consistent year-over-year performance, not just one-time toppers.',
        position: 2,
      },
      {
        name: 'Evaluate Batch Size',
        text: 'Smaller batch sizes (20-30 students) ensure personal attention. Avoid coaching institutes with 100+ students per batch. Check student-to-teacher ratio.',
        position: 3,
      },
      {
        name: 'Compare Fee Structure',
        text: 'Compare fees across 5-6 institutes. Look for transparent pricing without hidden charges. Check if study material, test series, and doubt sessions are included in the fee.',
        position: 4,
      },
      {
        name: 'Attend Demo Classes',
        text: 'Take free demo classes at shortlisted institutes before enrolling. Observe teaching style, classroom interaction, and how doubts are handled. Most good institutes offer free trial classes.',
        position: 5,
      },
      {
        name: 'Check Infrastructure and Technology',
        text: 'Look for institutes with modern classrooms, digital teaching aids, AI-powered testing, and online backup classes. Verify availability of library, study rooms, and practice labs.',
        position: 6,
      },
    ],
  },

  // Class 11 Biology Foundation Guide
  'class-11-biology-neet-foundation-guide': {
    slug: 'class-11-biology-neet-foundation-guide',
    name: 'How to Build NEET Biology Foundation in Class 11',
    description:
      'Comprehensive guide for Class 11 students to build strong NEET Biology foundation with chapter-wise preparation strategy and study tips.',
    totalTime: 'P10M',
    steps: [
      {
        name: 'Understand Class 11 Syllabus Distribution',
        text: 'Class 11 has 2 units: Plant Physiology (15% weightage) and Human Physiology (15% weightage). Focus on understanding basics rather than memorization. Build clarity in fundamental concepts.',
        position: 1,
      },
      {
        name: 'Master Cell Biology and Biomolecules',
        text: 'Cell Biology and Biomolecules form the foundation for all of Biology. Spend 2-3 months on these chapters. Create detailed diagrams of cell structure. Understand function of each organelle.',
        position: 2,
      },
      {
        name: 'Complete NCERT Line by Line',
        text: 'Read NCERT Class 11 Biology textbook carefully. Make handwritten notes for important definitions and concepts. Draw and label all diagrams from NCERT. Do all NCERT in-text questions.',
        position: 3,
      },
      {
        name: 'Practice Chapter-wise Questions',
        text: 'After completing each chapter, solve 50+ questions. Use reference books like Pradeep or Biology Today. Focus on understanding concepts, not rote learning. Keep accuracy above 70%.',
        position: 4,
      },
      {
        name: 'Create Concept Maps and Mnemonics',
        text: 'Create visual concept maps showing relationships between topics. Make mnemonics for classifications and lists. Review these maps monthly. This improves long-term retention.',
        position: 5,
      },
      {
        name: 'Build Consistency and Study Habits',
        text: 'Study 2-3 hours daily for Biology in Class 11. Maintain a consistency calendar. Revise weekly. Take monthly unit tests. Don\'t skip classes. Develop discipline now - it pays off in Class 12.',
        position: 6,
      },
    ],
  },
}
