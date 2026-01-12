// Phase 3A: Free Resources Hub SEO Pages
import { SEOLandingContent } from './types'

// Common tools CTA for resource pages
const resourceToolsCTA = {
  title: 'Boost Your NEET Prep with Free Tools',
  tools: [
    {
      name: 'NEET MCQ Practice',
      description: 'Practice NCERT-based MCQs with instant feedback',
      link: '/tools/neet-mcq',
      icon: 'mcq' as const,
    },
    {
      name: 'NEET Rank Predictor',
      description: 'Predict your NEET rank based on expected score',
      link: '/tools/rank-predictor',
      icon: 'rank' as const,
    },
    {
      name: 'College Predictor',
      description: 'Find colleges based on your NEET score',
      link: '/tools/college-predictor',
      icon: 'college' as const,
    },
  ],
}

// Common contact buttons
const defaultContactButtons = {
  whatsapp: {
    number: '918826444334',
    message: 'Hi, I want to know more about NEET Biology coaching at Cerebrum Biology Academy',
  },
  phone: '+918826444334',
}

export const resourcesSEOPages: Record<string, SEOLandingContent> = {
  'neet-biology-notes-pdf': {
    slug: 'neet-biology-notes-pdf',
    classLevel: 'universal',
    title: 'NEET Biology Notes PDF Free Download | Chapter-Wise Study Material',
    metaDescription:
      'Download free NEET Biology notes PDF for all chapters. Comprehensive study material covering Botany & Zoology with diagrams, flowcharts & quick revision notes.',
    keywords: [
      'neet biology notes pdf',
      'neet biology notes pdf free download',
      'biology notes for neet pdf',
      'neet biology chapter wise notes pdf',
      'neet biology study material pdf',
    ],
    hero: {
      headline: 'NEET Biology Notes PDF',
      subheadline:
        'Download comprehensive chapter-wise biology notes created by AIIMS-trained faculty. Includes diagrams, flowcharts, and quick revision points.',
      highlightedText: 'Free Download',
      ctaText: 'Access Free Notes',
      ctaLink: '/resources/biology-notes',
    },
    painPoints: {
      title: 'Struggling with NEET Biology Preparation?',
      points: [
        {
          icon: '📚',
          question: 'Overwhelmed by the vast NCERT syllabus?',
          solution: 'Our concise notes cover all 38 chapters in easy-to-digest format',
        },
        {
          icon: '🎯',
          question: 'Finding it hard to remember complex diagrams?',
          solution: 'Visual notes with labeled diagrams and flowcharts for better retention',
        },
        {
          icon: '⏰',
          question: 'No time for lengthy textbook reading?',
          solution: 'Quick revision notes designed for efficient last-minute preparation',
        },
      ],
    },
    benefits: {
      title: 'Why Our NEET Biology Notes?',
      subtitle: 'Trusted by 10,000+ NEET aspirants',
      items: [
        {
          icon: '✅',
          title: 'NCERT-Aligned Content',
          description: 'Notes strictly follow NCERT textbooks, the primary source for NEET',
        },
        {
          icon: '📊',
          title: 'Chapter Weightage Based',
          description: 'More focus on high-weightage chapters like Genetics & Human Physiology',
        },
        {
          icon: '🖼️',
          title: 'Visual Learning',
          description: 'Diagrams, flowcharts, and comparison tables for complex topics',
        },
        {
          icon: '🔄',
          title: 'Regular Updates',
          description: 'Notes updated based on latest NEET exam pattern and NTA guidelines',
        },
      ],
    },
    stats: [
      { value: '38+', label: 'Chapters Covered', icon: '📖' },
      { value: '500+', label: 'Diagrams', icon: '🖼️' },
      { value: '10K+', label: 'Downloads', icon: '📥' },
      { value: '4.8★', label: 'Student Rating', icon: '⭐' },
    ],
    testimonials: [
      {
        name: 'Priya Sharma',
        achievement: 'NEET 2024 - 680/720',
        quote:
          'These notes helped me revise the entire biology syllabus in just 2 weeks before NEET. The diagrams are exactly what NEET expects!',
        score: '680/720',
      },
      {
        name: 'Rahul Verma',
        achievement: 'NEET 2024 - 660/720',
        quote:
          'Best free biology notes I found online. The chapter summaries saved me countless hours of reading.',
        score: '660/720',
      },
    ],
    faqs: [
      {
        question: 'Are these NEET biology notes free to download?',
        answer:
          'Yes, our basic chapter-wise notes are completely free. Premium notes with PYQ solutions and practice questions are available for enrolled students.',
      },
      {
        question: 'Do these notes cover both Class 11 and Class 12 Biology?',
        answer:
          'Yes, our notes cover the complete NEET Biology syllabus including all chapters from Class 11 (Botany + Zoology) and Class 12.',
      },
      {
        question: 'Are diagrams included in the notes PDF?',
        answer:
          'Absolutely! All important diagrams with proper labeling are included. These are essential for NEET as many questions are diagram-based.',
      },
      {
        question: 'How often are the notes updated?',
        answer:
          'We update our notes after every NEET exam based on the latest question patterns and any syllabus changes by NTA.',
      },
    ],
    courseSummary: {
      title: 'Want Complete NEET Biology Preparation?',
      duration: '12 months',
      batchSize: '10-12 students',
      features: [
        'Complete chapter-wise notes with PYQ analysis',
        'Live doubt solving sessions',
        '500+ practice MCQs per chapter',
        'Weekly tests with detailed solutions',
      ],
      price: {
        original: 45000,
        discounted: 35000,
        emi: '₹2,917/month',
      },
    },
    cta: {
      title: 'Ready to Ace NEET Biology?',
      subtitle: 'Join 2,500+ students who scored 330+ in NEET Biology with our guidance',
      primaryButton: {
        text: 'Enroll Now',
        link: '/courses',
      },
      secondaryButton: {
        text: 'Book Free Demo',
        link: '/book-demo',
      },
      tertiaryButton: {
        text: 'Download Free Notes',
        link: '/resources/biology-notes',
      },
    },
    toolsCTA: resourceToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'NEET Biology Coaching', link: '/neet-biology-online-coaching' },
      { title: 'NCERT Biology Class 11', link: '/ncert-biology-notes-class-11' },
      { title: 'NCERT Biology Class 12', link: '/ncert-biology-notes-class-12' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'NEET Biology Notes & Study Material',
      provider: 'Cerebrum Biology Academy',
      description: 'Free NEET Biology notes PDF with chapter-wise study material',
      duration: 'Self-paced',
      price: 0,
      priceCurrency: 'INR',
    },
  },

  'neet-biology-pyq-chapter-wise': {
    slug: 'neet-biology-pyq-chapter-wise',
    classLevel: 'universal',
    title: 'NEET Biology PYQ Chapter-Wise | Previous Year Questions with Solutions',
    metaDescription:
      'Practice NEET Biology previous year questions chapter-wise with detailed solutions. 10+ years of PYQs organized by topic for systematic preparation.',
    keywords: [
      'neet biology pyq',
      'neet biology previous year questions',
      'neet pyq chapter wise biology',
      'neet biology pyq with solutions',
      'neet biology question bank',
    ],
    hero: {
      headline: 'NEET Biology PYQ Chapter-Wise',
      subheadline:
        'Master NEET with 10+ years of previous year questions organized by chapter. Understand the exam pattern and ace your preparation.',
      highlightedText: 'With Solutions',
      ctaText: 'Start Practicing',
      ctaLink: '/tools/neet-mcq',
    },
    painPoints: {
      title: 'Common Mistakes in NEET PYQ Practice',
      points: [
        {
          icon: '❌',
          question: 'Practicing PYQs without understanding concepts?',
          solution: 'Our solutions explain the concept behind each answer, not just the answer',
        },
        {
          icon: '🔀',
          question: 'Random practice without topic focus?',
          solution: 'Chapter-wise organization helps you strengthen weak areas systematically',
        },
        {
          icon: '📉',
          question: 'Not analyzing your mistakes?',
          solution: 'Detailed explanations help you learn from every wrong answer',
        },
      ],
    },
    benefits: {
      title: 'Why Practice with Our PYQ Collection?',
      subtitle: 'The smartest way to prepare for NEET Biology',
      items: [
        {
          icon: '📅',
          title: '10+ Years Coverage',
          description: 'PYQs from 2013-2024 covering all exam patterns and question types',
        },
        {
          icon: '📊',
          title: 'Chapter Weightage Analysis',
          description: 'Know which chapters have highest question frequency in NEET',
        },
        {
          icon: '✍️',
          title: 'Detailed Solutions',
          description: 'Step-by-step explanations with NCERT references',
        },
        {
          icon: '🎯',
          title: 'Difficulty Marking',
          description: 'Questions marked as Easy, Medium, Hard for targeted practice',
        },
      ],
    },
    stats: [
      { value: '2000+', label: 'PYQs', icon: '❓' },
      { value: '38', label: 'Chapters', icon: '📚' },
      { value: '10+', label: 'Years', icon: '📅' },
      { value: '100%', label: 'Solutions', icon: '✅' },
    ],
    testimonials: [
      {
        name: 'Ankit Kumar',
        achievement: 'NEET 2024 - 650/720',
        quote:
          'Practicing PYQs chapter-wise helped me identify my weak chapters. I focused more on Genetics and Human Physiology after analyzing my performance.',
        score: '650/720',
      },
      {
        name: 'Sneha Patel',
        achievement: 'NEET 2024 - 640/720',
        quote:
          '70% of my NEET questions were similar to PYQs I practiced. This collection is a goldmine for serious aspirants!',
        score: '640/720',
      },
    ],
    faqs: [
      {
        question: 'How many years of NEET PYQs are included?',
        answer:
          'We include PYQs from 2013 to 2024, covering over 10 years of NEET and AIPMT exams. This gives you comprehensive coverage of all question patterns.',
      },
      {
        question: 'Are solutions provided for all PYQs?',
        answer:
          'Yes, every question comes with a detailed solution explaining the concept, NCERT reference, and common mistakes to avoid.',
      },
      {
        question: 'How is the chapter-wise organization helpful?',
        answer:
          'It helps you focus on one topic at a time, identify your weak areas, and track your progress systematically. This is more effective than random practice.',
      },
      {
        question: 'Can I practice these PYQs in test format?',
        answer:
          'Yes! Our NEET MCQ Practice tool allows you to take chapter-wise and full-length mock tests using these PYQs.',
      },
    ],
    courseSummary: {
      title: 'Complete NEET Biology Preparation',
      duration: '12 months',
      batchSize: '10-12 students',
      features: [
        'All PYQs with video solutions',
        'Live discussion of important PYQs',
        'Weekly PYQ-based tests',
        'Performance analytics and weak area identification',
      ],
      price: {
        original: 45000,
        discounted: 35000,
        emi: '₹2,917/month',
      },
    },
    cta: {
      title: 'Master NEET Biology with Expert Guidance',
      subtitle: 'Learn the right approach to solve any NEET question',
      primaryButton: {
        text: 'Join Our Course',
        link: '/courses',
      },
      secondaryButton: {
        text: 'Book Free Demo',
        link: '/book-demo',
      },
      tertiaryButton: {
        text: 'Practice PYQs Now',
        link: '/tools/neet-mcq',
      },
    },
    toolsCTA: resourceToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'NEET Mock Test Free', link: '/neet-mock-test-free' },
      { title: 'NEET Biology MCQ Practice', link: '/neet-biology-mcq-practice' },
      { title: 'NEET Biology Notes', link: '/neet-biology-notes-pdf' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'NEET Biology PYQ Practice',
      provider: 'Cerebrum Biology Academy',
      description: 'Chapter-wise NEET Biology previous year questions with solutions',
      duration: 'Self-paced',
      price: 0,
      priceCurrency: 'INR',
    },
  },

  'neet-biology-mcq-practice': {
    slug: 'neet-biology-mcq-practice',
    classLevel: 'universal',
    title: 'NEET Biology MCQ Practice | Free Online Question Bank',
    metaDescription:
      'Practice 5000+ NEET Biology MCQs online free. NCERT-based questions with instant feedback, detailed solutions & performance tracking.',
    keywords: [
      'neet biology mcq',
      'neet biology mcq practice',
      'biology mcq for neet',
      'neet biology online test',
      'neet biology question bank',
    ],
    hero: {
      headline: 'NEET Biology MCQ Practice',
      subheadline:
        'Practice 5000+ MCQs designed to match NEET difficulty level. Get instant feedback and track your progress.',
      highlightedText: 'Free Online',
      ctaText: 'Start Practice',
      ctaLink: '/tools/neet-mcq',
    },
    painPoints: {
      title: 'Why MCQ Practice is Crucial for NEET?',
      points: [
        {
          icon: '⏱️',
          question: 'Struggling with time management in NEET?',
          solution: 'Regular MCQ practice builds speed and accuracy for the 3-hour exam',
        },
        {
          icon: '🎯',
          question: 'Making silly mistakes in easy questions?',
          solution: 'Practice helps you identify common traps and avoid negative marking',
        },
        {
          icon: '📊',
          question: 'Not sure which topics need more practice?',
          solution: 'Performance analytics show your strengths and weaknesses clearly',
        },
      ],
    },
    benefits: {
      title: 'Features of Our MCQ Practice Platform',
      subtitle: 'The most comprehensive NEET Biology question bank',
      items: [
        {
          icon: '📱',
          title: 'Practice Anytime, Anywhere',
          description: 'Mobile-friendly platform for practice on the go',
        },
        {
          icon: '⚡',
          title: 'Instant Feedback',
          description: 'Know immediately if your answer is correct with explanations',
        },
        {
          icon: '📈',
          title: 'Progress Tracking',
          description: 'Detailed analytics of your performance over time',
        },
        {
          icon: '🔄',
          title: 'Daily New Questions',
          description: 'Fresh questions added regularly to keep your practice updated',
        },
      ],
    },
    stats: [
      { value: '5000+', label: 'MCQs', icon: '❓' },
      { value: '38', label: 'Chapters', icon: '📚' },
      { value: '3', label: 'Difficulty Levels', icon: '📊' },
      { value: '100%', label: 'Free Access', icon: '🆓' },
    ],
    testimonials: [
      {
        name: 'Vikram Singh',
        achievement: 'NEET 2024 - 670/720',
        quote:
          'Practicing 100 MCQs daily on this platform improved my accuracy from 65% to 90% in just 2 months!',
        score: '670/720',
      },
      {
        name: 'Kavya Reddy',
        achievement: 'NEET 2024 - 655/720',
        quote:
          'The detailed explanations helped me understand where I was going wrong. Best free resource for NEET Biology!',
        score: '655/720',
      },
    ],
    faqs: [
      {
        question: 'Is the MCQ practice completely free?',
        answer:
          'Yes, basic MCQ practice with 2000+ questions is completely free. Premium features like unlimited practice, detailed analytics, and mock tests are available for enrolled students.',
      },
      {
        question: 'Are these MCQs based on NCERT?',
        answer:
          'Absolutely! All MCQs are designed based on NCERT textbooks, which is the primary source for NEET. We also include questions based on NCERT Exemplar.',
      },
      {
        question: 'Can I practice chapter-wise?',
        answer:
          'Yes, you can select specific chapters or topics to practice. This helps in focused preparation of individual chapters.',
      },
      {
        question: 'How is my progress tracked?',
        answer:
          'Our platform tracks your accuracy, time per question, chapter-wise performance, and improvement over time. This data helps you focus on weak areas.',
      },
    ],
    courseSummary: {
      title: 'Want Guided NEET Biology Preparation?',
      duration: '12 months',
      batchSize: '10-12 students',
      features: [
        'Unlimited MCQ access with analytics',
        'Live doubt solving sessions',
        'Personalized weak area identification',
        'Mock tests with AIR prediction',
      ],
      price: {
        original: 45000,
        discounted: 35000,
        emi: '₹2,917/month',
      },
    },
    cta: {
      title: 'Start Your NEET Biology Practice Now',
      subtitle: 'Join thousands of aspirants already practicing on our platform',
      primaryButton: {
        text: 'Practice MCQs Free',
        link: '/tools/neet-mcq',
      },
      secondaryButton: {
        text: 'Join Full Course',
        link: '/courses',
      },
    },
    toolsCTA: resourceToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'NEET Mock Test Free', link: '/neet-mock-test-free' },
      { title: 'NEET Biology PYQ', link: '/neet-biology-pyq-chapter-wise' },
      { title: 'NEET Important Questions', link: '/neet-biology-important-questions' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'NEET Biology MCQ Practice',
      provider: 'Cerebrum Biology Academy',
      description: 'Free online NEET Biology MCQ practice platform',
      duration: 'Self-paced',
      price: 0,
      priceCurrency: 'INR',
    },
  },

  'neet-mock-test-free': {
    slug: 'neet-mock-test-free',
    classLevel: 'universal',
    title: 'NEET Mock Test Free Online | Full-Length Practice Tests 2025',
    metaDescription:
      'Take free NEET mock tests online. Full-length practice tests with real exam interface, instant results & detailed analysis. Prepare like the actual NEET exam.',
    keywords: [
      'neet mock test free',
      'neet mock test online free',
      'free neet test series',
      'neet practice test',
      'neet mock exam',
    ],
    hero: {
      headline: 'Free NEET Mock Tests Online',
      subheadline:
        'Experience the real NEET exam environment with our full-length mock tests. Get instant results and detailed performance analysis.',
      highlightedText: 'Start Free',
      ctaText: 'Take Mock Test',
      ctaLink: '/tools/neet-mcq?mode=mock',
    },
    painPoints: {
      title: 'Why Mock Tests are Essential for NEET?',
      points: [
        {
          icon: '😰',
          question: 'Feeling anxious about the actual exam?',
          solution: 'Mock tests help you experience the exam pressure and build confidence',
        },
        {
          icon: '⏰',
          question: 'Worried about completing 180 questions in 3 hours?',
          solution: 'Regular mock practice improves your time management skills',
        },
        {
          icon: '📉',
          question: 'Losing marks due to negative marking?',
          solution: 'Learn when to attempt and when to skip through practice',
        },
      ],
    },
    benefits: {
      title: 'Features of Our Mock Tests',
      subtitle: 'Closest simulation to actual NEET exam',
      items: [
        {
          icon: '🖥️',
          title: 'Real Exam Interface',
          description: 'Same layout and navigation as NTA NEET computer-based test',
        },
        {
          icon: '📊',
          title: 'Instant Detailed Analysis',
          description: 'Subject-wise, chapter-wise, and question-wise performance breakdown',
        },
        {
          icon: '🏆',
          title: 'All India Rank Prediction',
          description: 'Know your expected rank based on mock test performance',
        },
        {
          icon: '📈',
          title: 'Improvement Tracking',
          description: 'Compare your performance across multiple mock tests',
        },
      ],
    },
    stats: [
      { value: '20+', label: 'Mock Tests', icon: '📝' },
      { value: '180', label: 'Questions/Test', icon: '❓' },
      { value: '3 hrs', label: 'Duration', icon: '⏱️' },
      { value: 'Free', label: 'Access', icon: '🆓' },
    ],
    testimonials: [
      {
        name: 'Arjun Nair',
        achievement: 'NEET 2024 - 685/720',
        quote:
          'I took 15 mock tests before NEET. The interface was exactly like the real exam, so I had zero surprises on D-day!',
        score: '685/720',
      },
      {
        name: 'Ishita Gupta',
        achievement: 'NEET 2024 - 665/720',
        quote:
          'The detailed analysis after each mock helped me improve from 550 to 665 in 3 months. Highly recommended!',
        score: '665/720',
      },
    ],
    faqs: [
      {
        question: 'Are the mock tests really free?',
        answer:
          'Yes, we offer 5 full-length mock tests completely free. Additional mock tests and advanced analytics are available for enrolled students.',
      },
      {
        question: 'How similar are these to the actual NEET exam?',
        answer:
          'Our mock tests closely simulate the real NEET experience - same number of questions (180), same time limit (3 hours), same marking scheme (+4/-1), and similar interface.',
      },
      {
        question: 'Can I review my answers after the test?',
        answer:
          'Yes, you get a complete review with correct answers, explanations, and your selections. This helps you learn from mistakes.',
      },
      {
        question: 'How accurate is the rank prediction?',
        answer:
          'Our rank prediction is based on historical NEET data and thousands of student performances. It gives a fairly accurate range of expected rank.',
      },
    ],
    courseSummary: {
      title: 'Complete NEET Preparation with Mock Tests',
      duration: '12 months',
      batchSize: '10-12 students',
      features: [
        'Unlimited mock tests with detailed analysis',
        'Live test discussion sessions',
        'Personalized improvement plan',
        'Monthly progress reports',
      ],
      price: {
        original: 45000,
        discounted: 35000,
        emi: '₹2,917/month',
      },
    },
    cta: {
      title: 'Take Your First Mock Test Now',
      subtitle: 'Experience the real NEET exam before the actual day',
      primaryButton: {
        text: 'Start Free Mock Test',
        link: '/tools/neet-mcq?mode=mock',
      },
      secondaryButton: {
        text: 'Join Full Course',
        link: '/courses',
      },
    },
    toolsCTA: resourceToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'NEET MCQ Practice', link: '/neet-biology-mcq-practice' },
      { title: 'NEET Rank Predictor', link: '/tools/rank-predictor' },
      { title: 'NEET Preparation Guide', link: '/neet-preparation-guide' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'NEET Mock Test Series',
      provider: 'Cerebrum Biology Academy',
      description: 'Free online NEET mock tests with detailed analysis',
      duration: 'Self-paced',
      price: 0,
      priceCurrency: 'INR',
    },
  },

  'neet-biology-important-questions': {
    slug: 'neet-biology-important-questions',
    classLevel: 'universal',
    title: 'NEET Biology Important Questions | Most Asked Topics 2025',
    metaDescription:
      'Get NEET Biology most important questions for 2025. Chapter-wise high-frequency questions with solutions based on PYQ analysis. Score 300+ in Biology!',
    keywords: [
      'neet biology important questions',
      'important questions for neet biology',
      'neet biology most asked questions',
      'neet biology high weightage topics',
      'neet biology important chapters',
    ],
    hero: {
      headline: 'NEET Biology Important Questions 2025',
      subheadline:
        'Focus on questions that matter most. Based on 10+ years of PYQ analysis to help you score maximum marks.',
      highlightedText: 'Score 300+',
      ctaText: 'Get Important Questions',
      ctaLink: '/resources/important-questions',
    },
    painPoints: {
      title: 'Smart Preparation vs Random Study',
      points: [
        {
          icon: '📚',
          question: 'Trying to study everything equally?',
          solution: 'Some chapters contribute 40% of marks - focus on them first',
        },
        {
          icon: '🎯',
          question: 'Not sure which topics are most important?',
          solution: 'Our PYQ analysis reveals the most repeated question patterns',
        },
        {
          icon: '⏰',
          question: 'Running out of time before NEET?',
          solution: 'Strategic preparation covers 80% syllabus with 50% effort',
        },
      ],
    },
    benefits: {
      title: 'What Makes These Questions Important?',
      subtitle: 'Data-driven question selection',
      items: [
        {
          icon: '📊',
          title: 'PYQ Frequency Analysis',
          description: 'Questions based on topics that appear most frequently in NEET',
        },
        {
          icon: '🎯',
          title: 'High-Weightage Chapters',
          description: 'Focus on chapters like Genetics, Human Physiology, Ecology',
        },
        {
          icon: '🔮',
          title: 'Predicted Questions',
          description: 'Expected questions for NEET 2025 based on pattern analysis',
        },
        {
          icon: '✅',
          title: 'Verified Solutions',
          description: 'All solutions verified by AIIMS-trained faculty',
        },
      ],
    },
    stats: [
      { value: '500+', label: 'Important MCQs', icon: '❓' },
      { value: '38', label: 'Chapters', icon: '📚' },
      { value: '85%', label: 'PYQ Match Rate', icon: '🎯' },
      { value: '300+', label: 'Target Score', icon: '🏆' },
    ],
    testimonials: [
      {
        name: 'Rohan Sharma',
        achievement: 'NEET 2024 - 675/720',
        quote:
          'I focused on the important questions list in the last 2 months. 60% of my NEET Biology paper had similar questions!',
        score: '675/720',
      },
      {
        name: 'Pooja Mehta',
        achievement: 'NEET 2024 - 658/720',
        quote:
          'This list helped me prioritize my revision. Instead of random studying, I knew exactly what to focus on.',
        score: '658/720',
      },
    ],
    faqs: [
      {
        question: 'How are these important questions selected?',
        answer:
          'We analyze 10+ years of NEET PYQs to identify topics and question types that appear most frequently. We also consider NCERT emphasis and recent exam trends.',
      },
      {
        question: 'Can I rely only on these important questions?',
        answer:
          'These questions cover 80% of typical NEET Biology paper. However, for 300+ score, we recommend completing NCERT thoroughly and using these for focused revision.',
      },
      {
        question: 'Are chapter weightages included?',
        answer:
          'Yes, we provide chapter-wise weightage analysis so you know how many questions to expect from each chapter in NEET.',
      },
      {
        question: 'Do you update the list for NEET 2025?',
        answer:
          'Yes, we update the important questions list after analyzing NEET 2024 and incorporating any syllabus or pattern changes announced by NTA.',
      },
    ],
    courseSummary: {
      title: 'Score 330+ in NEET Biology',
      duration: '12 months',
      batchSize: '10-12 students',
      features: [
        'Important questions with video explanations',
        'Chapter weightage analysis',
        'Expected questions for NEET 2025',
        'Regular updates based on latest patterns',
      ],
      price: {
        original: 45000,
        discounted: 35000,
        emi: '₹2,917/month',
      },
    },
    cta: {
      title: 'Get Your Important Questions List',
      subtitle: 'Focus on what matters and maximize your NEET score',
      primaryButton: {
        text: 'Access Important Questions',
        link: '/resources/important-questions',
      },
      secondaryButton: {
        text: 'Join Full Course',
        link: '/courses',
      },
    },
    toolsCTA: resourceToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'NEET Biology Notes PDF', link: '/neet-biology-notes-pdf' },
      { title: 'NEET Biology PYQ', link: '/neet-biology-pyq-chapter-wise' },
      { title: 'NEET Chapter Weightage', link: '/neet-biology-chapter-weightage' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'NEET Biology Important Questions',
      provider: 'Cerebrum Biology Academy',
      description: 'Most important NEET Biology questions based on PYQ analysis',
      duration: 'Self-paced',
      price: 0,
      priceCurrency: 'INR',
    },
  },

  'ncert-based-neet-questions': {
    slug: 'ncert-based-neet-questions',
    classLevel: 'universal',
    title: 'NCERT Based NEET Questions | Biology MCQs from NCERT',
    metaDescription:
      'Practice NCERT-based NEET Biology questions. MCQs directly from NCERT textbook with line-by-line coverage. Essential for NEET 2025 preparation.',
    keywords: [
      'ncert based neet questions',
      'ncert questions for neet',
      'ncert exemplar neet',
      'neet questions from ncert',
      'ncert mcq for neet biology',
    ],
    hero: {
      headline: 'NCERT Based NEET Biology Questions',
      subheadline:
        'NCERT is the Bible of NEET. Practice MCQs covering every line of NCERT textbooks to ensure zero gaps in your preparation.',
      highlightedText: 'Direct from NCERT',
      ctaText: 'Practice NCERT MCQs',
      ctaLink: '/tools/neet-mcq?source=ncert',
    },
    painPoints: {
      title: 'Why NCERT is Non-Negotiable for NEET?',
      points: [
        {
          icon: '📖',
          question: 'Using too many reference books?',
          solution: '95% of NEET Biology comes directly from NCERT - focus there first',
        },
        {
          icon: '🔍',
          question: 'Missing questions from NCERT examples?',
          solution: 'We cover examples, diagrams, and even NCERT activities',
        },
        {
          icon: '📝',
          question: 'Not covering NCERT Exemplar?',
          solution: 'Our collection includes NCERT Exemplar questions too',
        },
      ],
    },
    benefits: {
      title: 'Complete NCERT Coverage',
      subtitle: 'Line-by-line NCERT based questions',
      items: [
        {
          icon: '📖',
          title: 'NCERT Text Questions',
          description: 'MCQs from every paragraph of NCERT Biology textbook',
        },
        {
          icon: '🖼️',
          title: 'Diagram-Based MCQs',
          description: 'Questions based on all NCERT diagrams and figures',
        },
        {
          icon: '📚',
          title: 'NCERT Exemplar',
          description: 'All MCQs from NCERT Exemplar books included',
        },
        {
          icon: '✅',
          title: 'Intext Questions',
          description: 'Even intext examples and activities are covered',
        },
      ],
    },
    stats: [
      { value: '3000+', label: 'NCERT MCQs', icon: '❓' },
      { value: '100%', label: 'NCERT Coverage', icon: '📖' },
      { value: '500+', label: 'Diagram MCQs', icon: '🖼️' },
      { value: '95%', label: 'NEET Relevance', icon: '🎯' },
    ],
    testimonials: [
      {
        name: 'Aditya Prakash',
        achievement: 'NEET 2024 - 688/720',
        quote:
          'I scored 340/360 in Biology by just focusing on NCERT. These questions covered every corner of the textbook!',
        score: '688/720',
      },
      {
        name: 'Meera Iyer',
        achievement: 'NEET 2024 - 670/720',
        quote:
          'The NCERT Exemplar questions were game-changers. Many NEET questions were direct variations of Exemplar.',
        score: '670/720',
      },
    ],
    faqs: [
      {
        question: 'Is NCERT enough for NEET Biology?',
        answer:
          'For 95% of NEET Biology, yes. NCERT textbooks (Class 11 and 12) are the primary source. We recommend NCERT thoroughly before any reference books.',
      },
      {
        question: 'Are NCERT Exemplar questions included?',
        answer:
          'Yes, all MCQs from NCERT Exemplar Biology books for Class 11 and 12 are included in our question bank.',
      },
      {
        question: 'How do you ensure complete NCERT coverage?',
        answer:
          'Our team has created questions from every chapter, covering main text, examples, diagrams, tables, and even small notes in NCERT.',
      },
      {
        question: 'Should I memorize NCERT lines?',
        answer:
          'Understanding is more important than memorization. However, for some topics like definitions and examples, knowing exact NCERT language helps in NEET.',
      },
    ],
    courseSummary: {
      title: 'Master NCERT for NEET Biology',
      duration: '12 months',
      batchSize: '10-12 students',
      features: [
        'Complete NCERT coverage with MCQs',
        'Line-by-line NCERT explanation videos',
        'NCERT Exemplar solutions',
        'NCERT-based mock tests',
      ],
      price: {
        original: 45000,
        discounted: 35000,
        emi: '₹2,917/month',
      },
    },
    cta: {
      title: 'Master NCERT for NEET Success',
      subtitle: 'Complete your NCERT preparation with our comprehensive MCQ bank',
      primaryButton: {
        text: 'Start NCERT MCQs',
        link: '/tools/neet-mcq?source=ncert',
      },
      secondaryButton: {
        text: 'Join Full Course',
        link: '/courses',
      },
    },
    toolsCTA: resourceToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'NCERT Exemplar Biology', link: '/ncert-exemplar-biology' },
      { title: 'NCERT Biology Class 11', link: '/ncert-biology-notes-class-11' },
      { title: 'NCERT Biology Class 12', link: '/ncert-biology-notes-class-12' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'NCERT Based NEET Biology',
      provider: 'Cerebrum Biology Academy',
      description: 'NCERT-based MCQs for complete NEET Biology preparation',
      duration: 'Self-paced',
      price: 0,
      priceCurrency: 'INR',
    },
  },

  'neet-biology-revision-notes': {
    slug: 'neet-biology-revision-notes',
    classLevel: 'universal',
    title: 'NEET Biology Revision Notes | Quick Revision One Day Before Exam',
    metaDescription:
      'Quick revision notes for NEET Biology. Concise summary of all 38 chapters for last-minute revision. Perfect for one day before exam!',
    keywords: [
      'neet biology revision notes',
      'neet biology quick revision',
      'one day revision biology neet',
      'neet biology last minute tips',
      'neet biology summary notes',
    ],
    hero: {
      headline: 'NEET Biology Quick Revision Notes',
      subheadline:
        'Revise all 38 chapters in one day! Ultra-concise notes covering key points, mnemonics, and must-remember facts.',
      highlightedText: 'Last Minute Prep',
      ctaText: 'Get Revision Notes',
      ctaLink: '/resources/revision-notes',
    },
    painPoints: {
      title: 'Last-Minute Revision Challenges',
      points: [
        {
          icon: '⏰',
          question: 'Only 1-2 days left before NEET?',
          solution: 'Our condensed notes cover everything essential in minimum time',
        },
        {
          icon: '🧠',
          question: 'Forgetting what you studied months ago?',
          solution: 'Key points and mnemonics for quick memory refresh',
        },
        {
          icon: '😰',
          question: 'Overwhelmed by the vast syllabus?',
          solution: 'Chapter-wise bullet points make revision systematic',
        },
      ],
    },
    benefits: {
      title: 'Features of Quick Revision Notes',
      subtitle: 'Designed for last-minute success',
      items: [
        {
          icon: '📝',
          title: 'Bullet Points',
          description: 'No paragraphs - just key points in bullets for quick reading',
        },
        {
          icon: '🔤',
          title: 'Mnemonics',
          description: 'Memory tricks for complex topics like taxonomy, diseases, hormones',
        },
        {
          icon: '📊',
          title: 'Comparison Tables',
          description: 'Quick comparisons for commonly confused topics',
        },
        {
          icon: '⚡',
          title: '5-Minute Chapters',
          description: 'Each chapter condensed to 5-minute reading',
        },
      ],
    },
    stats: [
      { value: '38', label: 'Chapters', icon: '📚' },
      { value: '5 min', label: 'Per Chapter', icon: '⏱️' },
      { value: '100+', label: 'Mnemonics', icon: '🔤' },
      { value: '3 hrs', label: 'Total Revision', icon: '⏰' },
    ],
    testimonials: [
      {
        name: 'Tanvi Agarwal',
        achievement: 'NEET 2024 - 662/720',
        quote:
          'Used these notes the night before NEET. The mnemonics saved me in at least 10 questions I would have forgotten!',
        score: '662/720',
      },
      {
        name: 'Harsh Vardhan',
        achievement: 'NEET 2024 - 645/720',
        quote:
          'Perfect for last-minute revision. Covered the entire Biology syllabus in 4 hours before the exam.',
        score: '645/720',
      },
    ],
    faqs: [
      {
        question: 'Can I use these notes for complete preparation?',
        answer:
          'These are revision notes, not study notes. Use them after completing NCERT thoroughly. They are designed to refresh memory, not build concepts.',
      },
      {
        question: 'How long does it take to revise all chapters?',
        answer:
          'With focused reading, you can cover all 38 chapters in 3-4 hours. Each chapter takes approximately 5-7 minutes.',
      },
      {
        question: 'Are diagrams included in revision notes?',
        answer:
          'Yes, simplified diagrams of must-remember structures are included. These are the diagrams most likely to appear in NEET.',
      },
      {
        question: 'When should I use these revision notes?',
        answer:
          'Ideally, use them 2-3 days before NEET for quick revision. Also useful before mock tests and for monthly revision during preparation.',
      },
    ],
    courseSummary: {
      title: 'Complete NEET Biology with Revision',
      duration: '12 months',
      batchSize: '10-12 students',
      features: [
        'Quick revision notes for all chapters',
        'Video revision before each test',
        'Mnemonic library for all topics',
        'Last-month revision sessions',
      ],
      price: {
        original: 45000,
        discounted: 35000,
        emi: '₹2,917/month',
      },
    },
    cta: {
      title: 'Get Your Quick Revision Notes',
      subtitle: 'Be exam-ready with our concise revision material',
      primaryButton: {
        text: 'Download Revision Notes',
        link: '/resources/revision-notes',
      },
      secondaryButton: {
        text: 'Join Full Course',
        link: '/courses',
      },
    },
    toolsCTA: resourceToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'NEET Biology Notes PDF', link: '/neet-biology-notes-pdf' },
      { title: 'NEET Last Minute Prep', link: '/neet-last-minute-preparation' },
      { title: 'NEET Important Questions', link: '/neet-biology-important-questions' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'NEET Biology Quick Revision',
      provider: 'Cerebrum Biology Academy',
      description: 'Quick revision notes for NEET Biology last-minute preparation',
      duration: 'Self-paced',
      price: 0,
      priceCurrency: 'INR',
    },
  },

  'neet-biology-diagrams': {
    slug: 'neet-biology-diagrams',
    classLevel: 'universal',
    title: 'NEET Biology Diagrams | Labeled Diagrams for NEET 2025',
    metaDescription:
      'Download NEET Biology diagrams with proper labeling. All important diagrams from NCERT for Botany & Zoology. Visual guide for NEET preparation.',
    keywords: [
      'neet biology diagrams',
      'biology diagrams for neet',
      'neet labeled diagrams',
      'ncert biology diagrams',
      'neet biology diagram pdf',
    ],
    hero: {
      headline: 'NEET Biology Diagrams Collection',
      subheadline:
        'Master all important diagrams from NCERT. Properly labeled diagrams for quick understanding and better retention.',
      highlightedText: 'Visual Learning',
      ctaText: 'Access Diagrams',
      ctaLink: '/resources/diagrams',
    },
    painPoints: {
      title: 'Why Diagrams are Crucial for NEET?',
      points: [
        {
          icon: '🖼️',
          question: 'Struggling to remember complex structures?',
          solution: 'Visual learning helps retain information 60% better than text',
        },
        {
          icon: '❓',
          question: '10-15 NEET questions are diagram-based?',
          solution: 'Our diagrams are designed exactly as NEET expects them',
        },
        {
          icon: '📝',
          question: 'Confused about proper labeling?',
          solution: 'All diagrams have NCERT-accurate labeling with key points',
        },
      ],
    },
    benefits: {
      title: 'Complete Diagram Collection',
      subtitle: 'Every diagram you need for NEET Biology',
      items: [
        {
          icon: '🌱',
          title: 'Botany Diagrams',
          description: 'Cell structures, plant anatomy, morphology, reproduction',
        },
        {
          icon: '🦴',
          title: 'Zoology Diagrams',
          description: 'Human physiology, animal tissues, reproductive systems',
        },
        {
          icon: '🧬',
          title: 'Genetics Diagrams',
          description: 'DNA structure, replication, pedigree charts, crosses',
        },
        {
          icon: '🌍',
          title: 'Ecology Diagrams',
          description: 'Food webs, nutrient cycles, ecosystems',
        },
      ],
    },
    stats: [
      { value: '300+', label: 'Diagrams', icon: '🖼️' },
      { value: '38', label: 'Chapters', icon: '📚' },
      { value: 'NCERT', label: 'Accurate', icon: '✅' },
      { value: 'HD', label: 'Quality', icon: '📷' },
    ],
    testimonials: [
      {
        name: 'Neha Sharma',
        achievement: 'NEET 2024 - 668/720',
        quote:
          'I used these diagrams for revision before NEET. All 12 diagram-based questions in my paper were from this collection!',
        score: '668/720',
      },
      {
        name: 'Ravi Kumar',
        achievement: 'NEET 2024 - 652/720',
        quote:
          'Visual learning worked best for me. These diagrams made complex topics like nervous system super easy to remember.',
        score: '652/720',
      },
    ],
    faqs: [
      {
        question: 'Are these diagrams from NCERT?',
        answer:
          'Yes, all diagrams are based on NCERT textbooks with proper labeling as per NCERT. We also include enhanced versions for better clarity.',
      },
      {
        question: 'How many diagrams are important for NEET?',
        answer:
          'Approximately 150-200 diagrams are frequently tested in NEET. Our collection of 300+ covers all these plus additional ones for complete preparation.',
      },
      {
        question: 'Can I download these diagrams?',
        answer:
          'Yes, all diagrams are available for download in high resolution. You can print them for offline revision.',
      },
      {
        question: 'Are diagrams organized chapter-wise?',
        answer:
          'Yes, diagrams are organized by chapter and topic. You can easily find diagrams for specific chapters you are revising.',
      },
    ],
    courseSummary: {
      title: 'Master Biology with Visual Learning',
      duration: '12 months',
      batchSize: '10-12 students',
      features: [
        'All NCERT diagrams with explanations',
        '3D animations for complex topics',
        'Interactive diagram quizzes',
        'Diagram drawing tips for theory exams',
      ],
      price: {
        original: 45000,
        discounted: 35000,
        emi: '₹2,917/month',
      },
    },
    cta: {
      title: 'Download Your Diagram Collection',
      subtitle: 'Visual learning for NEET success',
      primaryButton: {
        text: 'Access Diagrams Free',
        link: '/resources/diagrams',
      },
      secondaryButton: {
        text: 'Join Full Course',
        link: '/courses',
      },
    },
    toolsCTA: resourceToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'NEET Biology Notes PDF', link: '/neet-biology-notes-pdf' },
      { title: 'NCERT Biology Class 11', link: '/ncert-biology-notes-class-11' },
      { title: 'NEET Important Questions', link: '/neet-biology-important-questions' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'NEET Biology Diagrams',
      provider: 'Cerebrum Biology Academy',
      description: 'Complete collection of NEET Biology diagrams with labeling',
      duration: 'Self-paced',
      price: 0,
      priceCurrency: 'INR',
    },
  },

  'neet-biology-formulas': {
    slug: 'neet-biology-formulas',
    classLevel: 'universal',
    title: 'NEET Biology Formulas & Important Terms | Quick Reference',
    metaDescription:
      'All important NEET Biology formulas, definitions & terms in one place. Quick reference guide for genetics calculations, ecology indices & more.',
    keywords: [
      'neet biology formulas',
      'biology formulas for neet',
      'neet biology important terms',
      'neet biology definitions',
      'genetics formulas neet',
    ],
    hero: {
      headline: 'NEET Biology Formulas & Terms',
      subheadline:
        'Quick reference for all formulas, calculations, and important definitions. Essential for Genetics, Ecology, and Biotechnology questions.',
      highlightedText: 'Quick Reference',
      ctaText: 'Get Formula Sheet',
      ctaLink: '/resources/formulas',
    },
    painPoints: {
      title: 'Why You Need a Formula Sheet',
      points: [
        {
          icon: '🧬',
          question: 'Forgetting genetics calculations?',
          solution: 'All Mendelian ratios, Hardy-Weinberg equations at one place',
        },
        {
          icon: '📊',
          question: 'Confused about ecology indices?',
          solution: 'Simpson index, Shannon-Wiener index formulas explained',
        },
        {
          icon: '📝',
          question: 'Mixing up definitions?',
          solution: 'NCERT-accurate definitions for all important terms',
        },
      ],
    },
    benefits: {
      title: 'Complete Formula Reference',
      subtitle: 'Everything you need to memorize',
      items: [
        {
          icon: '🧬',
          title: 'Genetics Formulas',
          description: 'Monohybrid, dihybrid ratios, gene frequency calculations',
        },
        {
          icon: '🌍',
          title: 'Ecology Formulas',
          description: 'Diversity indices, productivity calculations, population growth',
        },
        {
          icon: '🧪',
          title: 'Biotechnology',
          description: 'Enzyme calculations, DNA fingerprinting concepts',
        },
        {
          icon: '📖',
          title: 'Key Definitions',
          description: '500+ important terms with NCERT definitions',
        },
      ],
    },
    stats: [
      { value: '50+', label: 'Formulas', icon: '📊' },
      { value: '500+', label: 'Terms', icon: '📝' },
      { value: '1-click', label: 'Access', icon: '⚡' },
      { value: '100%', label: 'NCERT Based', icon: '📖' },
    ],
    testimonials: [
      {
        name: 'Amit Patel',
        achievement: 'NEET 2024 - 672/720',
        quote:
          'The Hardy-Weinberg formula was directly asked in my NEET. This sheet helped me solve it in seconds!',
        score: '672/720',
      },
      {
        name: 'Divya Gupta',
        achievement: 'NEET 2024 - 648/720',
        quote:
          'Genetics calculations become easy when you have all formulas at fingertips. Great for quick revision!',
        score: '648/720',
      },
    ],
    faqs: [
      {
        question: 'Does Biology have formulas?',
        answer:
          'Yes! Genetics has monohybrid/dihybrid ratios, Hardy-Weinberg equations. Ecology has diversity indices, productivity formulas. Biotechnology has enzyme kinetics basics.',
      },
      {
        question: 'How important are definitions in NEET?',
        answer:
          'Very important. Many NEET questions directly test definitions. Using exact NCERT language can help you score in statement-based questions.',
      },
      {
        question: 'Are calculation-based questions common in NEET?',
        answer:
          'Yes, 5-10 questions in Biology section require calculations. Genetics and Ecology chapters have the most calculation-based questions.',
      },
      {
        question: 'Is this formula sheet enough for NEET?',
        answer:
          'This is a quick reference sheet. Use it alongside thorough NCERT preparation for best results.',
      },
    ],
    courseSummary: {
      title: 'Complete NEET Biology Preparation',
      duration: '12 months',
      batchSize: '10-12 students',
      features: [
        'Formula sheet with video explanations',
        'Genetics problem-solving sessions',
        'Definition memory techniques',
        'Calculation practice worksheets',
      ],
      price: {
        original: 45000,
        discounted: 35000,
        emi: '₹2,917/month',
      },
    },
    cta: {
      title: 'Get Your Formula Sheet',
      subtitle: 'Quick reference for all NEET Biology calculations',
      primaryButton: {
        text: 'Download Free',
        link: '/resources/formulas',
      },
      secondaryButton: {
        text: 'Join Full Course',
        link: '/courses',
      },
    },
    toolsCTA: resourceToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'Genetics for NEET', link: '/genetics-notes-neet' },
      { title: 'Ecology Notes NEET', link: '/ecology-notes-neet' },
      { title: 'NEET Biology Important Questions', link: '/neet-biology-important-questions' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'NEET Biology Formulas',
      provider: 'Cerebrum Biology Academy',
      description: 'NEET Biology formulas and important terms reference',
      duration: 'Self-paced',
      price: 0,
      priceCurrency: 'INR',
    },
  },

  'neet-biology-chapter-weightage': {
    slug: 'neet-biology-chapter-weightage',
    classLevel: 'universal',
    title: 'NEET Biology Chapter Weightage 2025 | Important Chapters Analysis',
    metaDescription:
      'Complete NEET Biology chapter-wise weightage for 2025. Know which chapters are most important based on 10-year PYQ analysis. Strategic preparation guide.',
    keywords: [
      'neet biology chapter weightage',
      'important chapters for neet biology',
      'neet biology high weightage topics',
      'neet biology marks distribution',
      'neet biology chapter wise questions',
    ],
    hero: {
      headline: 'NEET Biology Chapter Weightage 2025',
      subheadline:
        'Smart preparation starts with knowing where the marks are. Get detailed chapter-wise analysis based on 10+ years of NEET papers.',
      highlightedText: 'Strategic Prep',
      ctaText: 'View Weightage Analysis',
      ctaLink: '/resources/chapter-weightage',
    },
    painPoints: {
      title: 'Why Chapter Weightage Matters',
      points: [
        {
          icon: '📊',
          question: 'Studying all chapters equally?',
          solution: 'Some chapters have 10% weightage, others have 2%. Prioritize wisely!',
        },
        {
          icon: '⏰',
          question: 'Limited time before NEET?',
          solution: 'Focus on high-weightage chapters first for maximum marks',
        },
        {
          icon: '🎯',
          question: 'Not sure where to start revision?',
          solution: 'Start with chapters that give you most marks per hour studied',
        },
      ],
    },
    benefits: {
      title: 'Complete Weightage Analysis',
      subtitle: 'Based on 10 years of NEET PYQs',
      items: [
        {
          icon: '📈',
          title: 'Chapter-Wise Marks',
          description: 'Exact number of questions from each chapter historically',
        },
        {
          icon: '📊',
          title: 'Trend Analysis',
          description: 'How weightage has changed over the years',
        },
        {
          icon: '🎯',
          title: 'Priority Ranking',
          description: 'Chapters ranked by importance for NEET 2025',
        },
        {
          icon: '📅',
          title: 'Study Schedule',
          description: 'Time allocation suggestions based on weightage',
        },
      ],
    },
    stats: [
      { value: '38', label: 'Chapters Analyzed', icon: '📚' },
      { value: '10+', label: 'Years Data', icon: '📅' },
      { value: 'Top 10', label: 'Cover 60% Marks', icon: '🎯' },
      { value: 'Free', label: 'Analysis', icon: '🆓' },
    ],
    testimonials: [
      {
        name: 'Shreya Joshi',
        achievement: 'NEET 2024 - 680/720',
        quote:
          'I focused 70% of my time on top 15 chapters based on this analysis. It paid off with 340+ in Biology!',
        score: '680/720',
      },
      {
        name: 'Varun Reddy',
        achievement: 'NEET 2024 - 655/720',
        quote:
          'Understanding chapter weightage helped me create a realistic study plan. I knew exactly where to spend my time.',
        score: '655/720',
      },
    ],
    faqs: [
      {
        question: 'Which are the most important chapters for NEET Biology?',
        answer:
          'Human Physiology, Genetics, Ecology, Plant Physiology, and Cell Biology together contribute about 50% of NEET Biology marks. These should be your top priority.',
      },
      {
        question: 'Should I skip low-weightage chapters?',
        answer:
          "No, but study them strategically. Complete high-weightage chapters thoroughly first, then cover low-weightage chapters at a basic level. Don't leave anything completely.",
      },
      {
        question: 'Does weightage change every year?',
        answer:
          'The overall pattern remains similar, but there can be slight variations. We update our analysis after each NEET to provide the latest trends.',
      },
      {
        question: 'How should I use this weightage for revision?',
        answer:
          'Allocate revision time proportional to weightage. If a chapter has 8% weightage, spend roughly 8% of your Biology revision time on it.',
      },
    ],
    courseSummary: {
      title: 'Strategic NEET Biology Preparation',
      duration: '12 months',
      batchSize: '10-12 students',
      features: [
        'Weightage-based study plan',
        'Chapter priority guidance',
        'Time management coaching',
        'Focus on high-yield topics',
      ],
      price: {
        original: 45000,
        discounted: 35000,
        emi: '₹2,917/month',
      },
    },
    cta: {
      title: 'Get Complete Chapter Weightage Analysis',
      subtitle: 'Study smart, not just hard',
      primaryButton: {
        text: 'View Weightage Free',
        link: '/resources/chapter-weightage',
      },
      secondaryButton: {
        text: 'Join Full Course',
        link: '/courses',
      },
    },
    toolsCTA: resourceToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'NEET Important Questions', link: '/neet-biology-important-questions' },
      { title: 'NEET Preparation Guide', link: '/neet-preparation-guide' },
      { title: 'NEET Biology Syllabus', link: '/neet-biology-syllabus-2025' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'NEET Biology Chapter Weightage',
      provider: 'Cerebrum Biology Academy',
      description: 'NEET Biology chapter-wise weightage analysis for strategic preparation',
      duration: 'Self-paced',
      price: 0,
      priceCurrency: 'INR',
    },
  },
}
