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
      subtitle: 'Join 1,50,000+ students who scored 330+ in NEET Biology with our guidance',
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

  // HIGH PRIORITY SEO PAGES - Keyword Gap Analysis (Added Jan 2025)

  'neet-human-physiology-guide': {
    slug: 'neet-human-physiology-guide',
    classLevel: 'universal',
    title: 'NEET Human Physiology Complete Guide 2025 | 12-15% Weightage Topics',
    metaDescription:
      'Master NEET Human Physiology with our comprehensive guide. Covers Digestion, Breathing, Excretion, Neural Control & more. 12-15% weightage, high-scoring chapters.',
    keywords: [
      'neet human physiology guide',
      'human physiology for neet',
      'neet human physiology important questions',
      'human physiology notes for neet',
      'neet human physiology weightage',
      'how to study human physiology for neet',
      'human physiology mcq for neet',
    ],
    hero: {
      headline: 'NEET Human Physiology Complete Guide',
      subheadline:
        'Human Physiology contributes 12-15% of NEET Biology marks. Master all 7 chapters with our comprehensive preparation strategy and score 50+ marks from this section alone.',
      highlightedText: '12-15% Weightage',
      ctaText: 'Start Learning Free',
      ctaLink: '/tools/neet-mcq?chapter=human-physiology',
    },
    painPoints: {
      title: 'Why Students Struggle with Human Physiology',
      points: [
        {
          icon: '🧠',
          question: 'Too many organs and systems to remember?',
          solution: 'Our chapter-wise breakdown makes complex systems digestible',
        },
        {
          icon: '📊',
          question: 'Confusing hormones and their functions?',
          solution: 'Visual flowcharts and comparison tables for quick recall',
        },
        {
          icon: '🔬',
          question: "Can't connect concepts across chapters?",
          solution: 'Integration approach linking Digestion → Breathing → Circulation',
        },
      ],
    },
    benefits: {
      title: 'Complete Human Physiology Coverage',
      subtitle: '7 Chapters | 50+ Expected Questions',
      items: [
        {
          icon: '🫀',
          title: 'Digestion & Absorption',
          description: 'Complete digestive system with enzyme actions and absorption mechanisms',
        },
        {
          icon: '🫁',
          title: 'Breathing & Gas Exchange',
          description: 'Respiratory volumes, oxygen dissociation curve, respiratory disorders',
        },
        {
          icon: '💪',
          title: 'Body Fluids & Circulation',
          description: 'Blood composition, cardiac cycle, ECG interpretation',
        },
        {
          icon: '🧪',
          title: 'Excretory Products',
          description: 'Nephron structure, urine formation, kidney disorders',
        },
      ],
    },
    stats: [
      { value: '7', label: 'Chapters', icon: '📚' },
      { value: '12-15%', label: 'NEET Weightage', icon: '📊' },
      { value: '50+', label: 'Expected Marks', icon: '🎯' },
      { value: 'High', label: 'Scoring Potential', icon: '⭐' },
    ],
    testimonials: [
      {
        name: 'Ananya Krishnan',
        achievement: 'NEET 2024 - 695/720',
        quote:
          'Human Physiology was my strongest section. Following this systematic approach helped me score 55/60 in these chapters!',
        score: '695/720',
      },
      {
        name: 'Rohan Sharma',
        achievement: 'NEET 2024 - 670/720',
        quote:
          'The flowcharts for hormone regulation and the cardiac cycle diagrams made everything click. Highly recommend!',
        score: '670/720',
      },
    ],
    faqs: [
      {
        question: 'How many questions come from Human Physiology in NEET?',
        answer:
          'NEET typically has 10-12 questions directly from Human Physiology chapters, contributing approximately 40-48 marks. This makes it one of the highest-weightage topics in Biology.',
      },
      {
        question: 'Which Human Physiology chapters are most important for NEET?',
        answer:
          'Body Fluids & Circulation, Neural Control & Coordination, and Chemical Coordination are the top 3 chapters. Together they account for 6-8 questions annually.',
      },
      {
        question: 'Is NCERT enough for Human Physiology in NEET?',
        answer:
          'Yes, NCERT is the primary source. About 90% of questions are directly from NCERT. However, understanding diagrams and practicing MCQs from previous years is equally important.',
      },
      {
        question: 'How to memorize all the enzymes and hormones?',
        answer:
          'Create comparison charts grouping enzymes by organ (salivary, gastric, pancreatic) and hormones by gland. Use mnemonics and practice with MCQs for long-term retention.',
      },
    ],
    courseSummary: {
      title: 'Master Human Physiology in 6 Weeks',
      duration: '6 weeks intensive',
      batchSize: '10-12 students',
      features: [
        '7 chapters with in-depth coverage',
        'NCERT-aligned visual notes',
        'Chapter-wise MCQ practice (500+ questions)',
        'Weekly tests with detailed analysis',
      ],
      price: {
        original: 15000,
        discounted: 9999,
        emi: '₹3,333/month',
      },
    },
    cta: {
      title: 'Score 50+ in Human Physiology',
      subtitle: '12-15% of your Biology score in 7 chapters',
      primaryButton: {
        text: 'Practice MCQs Free',
        link: '/tools/neet-mcq?chapter=human-physiology',
      },
      secondaryButton: {
        text: 'Join Full Course',
        link: '/courses',
      },
    },
    toolsCTA: resourceToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'NEET Chapter Weightage', link: '/neet-biology-chapter-weightage' },
      { title: 'Human Physiology Notes', link: '/human-physiology-notes-neet' },
      { title: 'NEET Biology Important Questions', link: '/neet-biology-important-questions' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'NEET Human Physiology Guide',
      provider: 'Cerebrum Biology Academy',
      description:
        'Complete Human Physiology preparation guide for NEET with 12-15% weightage coverage',
      duration: '6 weeks',
      price: 9999,
      priceCurrency: 'INR',
    },
  },

  'neet-genetics-preparation': {
    slug: 'neet-genetics-preparation',
    classLevel: 'universal',
    title: 'NEET Genetics Preparation Guide 2025 | Master Inheritance & Molecular Biology',
    metaDescription:
      'Complete NEET Genetics preparation strategy. Cover Mendelian genetics, molecular biology, biotechnology & evolution. 15-18% weightage with problem-solving approach.',
    keywords: [
      'neet genetics preparation',
      'genetics for neet',
      'neet genetics important questions',
      'genetics mcq for neet',
      'neet genetics weightage',
      'molecular biology neet',
      'how to solve genetics problems neet',
      'genetics and evolution neet',
    ],
    hero: {
      headline: 'Master NEET Genetics & Molecular Biology',
      subheadline:
        'Genetics, Molecular Biology & Evolution together contribute 15-18% of NEET marks. Learn our problem-solving approach to crack these conceptual chapters.',
      highlightedText: '15-18% Weightage',
      ctaText: 'Practice Genetics MCQs',
      ctaLink: '/tools/neet-mcq?chapter=genetics',
    },
    painPoints: {
      title: 'Why Genetics Feels Difficult',
      points: [
        {
          icon: '🧬',
          question: 'Confused by genetic cross problems?',
          solution: 'Step-by-step problem-solving framework for any cross type',
        },
        {
          icon: '🔢',
          question: "Can't apply Hardy-Weinberg equation?",
          solution: 'Simple 3-step approach with solved examples',
        },
        {
          icon: '📖',
          question: 'Molecular genetics feels abstract?',
          solution: 'Visual diagrams of replication, transcription, translation',
        },
      ],
    },
    benefits: {
      title: 'Complete Genetics Coverage',
      subtitle: '4 Major Units | 60+ Expected Marks',
      items: [
        {
          icon: '🧬',
          title: 'Mendelian Genetics',
          description: 'Inheritance patterns, crosses, pedigree analysis, genetic disorders',
        },
        {
          icon: '🔬',
          title: 'Molecular Basis of Inheritance',
          description: 'DNA structure, replication, transcription, translation, lac operon',
        },
        {
          icon: '🧪',
          title: 'Biotechnology',
          description: 'rDNA technology, PCR, gene cloning, applications',
        },
        {
          icon: '🦎',
          title: 'Evolution',
          description: 'Origin of life, evidences, mechanisms, Hardy-Weinberg',
        },
      ],
    },
    stats: [
      { value: '15-18%', label: 'NEET Weightage', icon: '📊' },
      { value: '14-16', label: 'Questions/Year', icon: '❓' },
      { value: '56-64', label: 'Marks Available', icon: '🎯' },
      { value: 'Must', label: 'For 600+ Score', icon: '⭐' },
    ],
    testimonials: [
      {
        name: 'Prateek Jain',
        achievement: 'NEET 2024 - 705/720',
        quote:
          'Genetics was my weakest subject initially. The problem-solving approach taught here helped me solve even the trickiest crosses confidently.',
        score: '705/720',
      },
      {
        name: 'Meera Patel',
        achievement: 'NEET 2024 - 685/720',
        quote:
          'Understanding the molecular mechanisms visually made biotechnology so much easier. I scored 14/16 in genetics section!',
        score: '685/720',
      },
    ],
    faqs: [
      {
        question: 'How to solve genetics problems in NEET?',
        answer:
          'Follow our 4-step approach: (1) Identify the type of cross, (2) Write parent genotypes, (3) Create Punnett square, (4) Calculate ratios. Practice with 100+ problems for mastery.',
      },
      {
        question: 'Is Biotechnology important for NEET?',
        answer:
          'Yes! Biotechnology Principles and Applications together contribute 3-4 questions (12-16 marks) annually. Its a high-scoring chapter with direct NCERT questions.',
      },
      {
        question: 'Which genetics topics are most asked in NEET?',
        answer:
          'Molecular Basis of Inheritance (DNA replication, lac operon) and Principles of Inheritance (Mendelian genetics, linkage) are the most frequently asked topics.',
      },
      {
        question: 'How to prepare Evolution for NEET?',
        answer:
          'Focus on origin of life theories, evidences of evolution, Hardy-Weinberg principle, and human evolution timeline. Questions are mostly factual and NCERT-based.',
      },
    ],
    courseSummary: {
      title: 'Genetics Mastery Program',
      duration: '8 weeks intensive',
      batchSize: '10-12 students',
      features: [
        '4 units with conceptual clarity',
        'Problem-solving workshop (200+ problems)',
        'Molecular biology visual guides',
        'Weekly genetics tests',
      ],
      price: {
        original: 18000,
        discounted: 12999,
        emi: '₹4,333/month',
      },
    },
    cta: {
      title: 'Crack Genetics with Confidence',
      subtitle: 'From fear to 50+ marks in genetics',
      primaryButton: {
        text: 'Practice Genetics MCQs',
        link: '/tools/neet-mcq?chapter=genetics',
      },
      secondaryButton: {
        text: 'Join Full Course',
        link: '/courses',
      },
    },
    toolsCTA: resourceToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'NEET Chapter Weightage', link: '/neet-biology-chapter-weightage' },
      { title: 'Genetics Notes', link: '/genetics-notes-neet' },
      { title: 'NEET Biology Important Questions', link: '/neet-biology-important-questions' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'NEET Genetics Preparation',
      provider: 'Cerebrum Biology Academy',
      description:
        'Complete genetics preparation for NEET including Mendelian genetics, molecular biology, biotechnology and evolution',
      duration: '8 weeks',
      price: 12999,
      priceCurrency: 'INR',
    },
  },

  'neet-ecology-important-questions': {
    slug: 'neet-ecology-important-questions',
    classLevel: 'universal',
    title: 'NEET Ecology Important Questions 2025 | High-Scoring Topics & PYQs',
    metaDescription:
      'Practice NEET Ecology important questions with solutions. Covers Organisms & Environment, Ecosystem, Biodiversity & Environmental Issues. 12-15 questions, easy marks!',
    keywords: [
      'neet ecology important questions',
      'ecology questions for neet',
      'neet ecology mcq',
      'ecology pyq neet',
      'ecosystem questions neet',
      'biodiversity questions neet',
      'environmental issues neet',
      'most asked ecology questions neet',
    ],
    hero: {
      headline: 'NEET Ecology Important Questions',
      subheadline:
        'Ecology is the easiest high-weightage section in NEET Biology! 12-15 questions, mostly factual. Master these important questions and score 45+ marks effortlessly.',
      highlightedText: 'Easy 45+ Marks',
      ctaText: 'Practice Ecology MCQs',
      ctaLink: '/tools/neet-mcq?chapter=ecology',
    },
    painPoints: {
      title: 'Why Students Miss Easy Ecology Marks',
      points: [
        {
          icon: '📚',
          question: 'Treating ecology as low priority?',
          solution: 'Its 12-15% of Biology! More than Cell Biology or Biomolecules',
        },
        {
          icon: '🌿',
          question: 'Too many environmental facts to remember?',
          solution: 'Focused notes on NEET-relevant facts only',
        },
        {
          icon: '📊',
          question: 'Confusing ecosystem energy calculations?',
          solution: 'Simple formulas and shortcuts for productivity questions',
        },
      ],
    },
    benefits: {
      title: 'Complete Ecology Question Bank',
      subtitle: '4 Chapters | 45+ Easy Marks',
      items: [
        {
          icon: '🌍',
          title: 'Organisms & Populations',
          description: 'Population interactions, growth models, adaptations',
        },
        {
          icon: '🌳',
          title: 'Ecosystem',
          description: 'Energy flow, productivity, decomposition, nutrient cycling',
        },
        {
          icon: '🦋',
          title: 'Biodiversity & Conservation',
          description: 'Diversity patterns, hotspots, conservation strategies',
        },
        {
          icon: '🌡️',
          title: 'Environmental Issues',
          description: 'Pollution types, greenhouse effect, ozone depletion',
        },
      ],
    },
    stats: [
      { value: '12-15', label: 'Questions/Year', icon: '❓' },
      { value: '48-60', label: 'Marks Available', icon: '🎯' },
      { value: '95%', label: 'From NCERT', icon: '📖' },
      { value: 'Easiest', label: 'Section in Bio', icon: '⭐' },
    ],
    testimonials: [
      {
        name: 'Kavya Singh',
        achievement: 'NEET 2024 - 688/720',
        quote:
          'I used to skip ecology thinking it was boring. These practice questions made me realize how easy and scoring it is. Got 58/60 in ecology!',
        score: '688/720',
      },
      {
        name: 'Arjun Nair',
        achievement: 'NEET 2024 - 672/720',
        quote:
          'The PYQ analysis showed me exactly which topics repeat. Environmental Issues alone gave me 3 easy questions!',
        score: '672/720',
      },
    ],
    faqs: [
      {
        question: 'How many questions come from Ecology in NEET?',
        answer:
          'NEET typically has 12-15 questions from Ecology chapters (Organisms & Populations, Ecosystem, Biodiversity, Environmental Issues), contributing 48-60 marks. Its one of the most predictable sections.',
      },
      {
        question: 'Is Ecology easy for NEET?',
        answer:
          'Yes! Ecology is considered the easiest section in NEET Biology. Questions are mostly factual, directly from NCERT, with minimal application-based problems.',
      },
      {
        question: 'Which Ecology topics are most important for NEET 2025?',
        answer:
          'Population interactions, ecosystem productivity (GPP, NPP), biodiversity hotspots, and environmental pollution are most frequently asked. Focus on graphs and numerical values in NCERT.',
      },
      {
        question: 'Should I read Ecology from reference books?',
        answer:
          'No! NCERT is 100% sufficient for Ecology. In fact, questions are often word-to-word from NCERT. Focus on examples, diagrams, and numerical values mentioned in the textbook.',
      },
    ],
    courseSummary: {
      title: 'Ecology Mastery in 3 Weeks',
      duration: '3 weeks intensive',
      batchSize: '15-20 students',
      features: [
        'All 4 ecology chapters covered',
        '500+ practice MCQs with solutions',
        '10-year PYQ analysis',
        'Quick revision notes',
      ],
      price: {
        original: 8000,
        discounted: 4999,
        emi: '₹1,666/month',
      },
    },
    cta: {
      title: 'Grab These Easy Ecology Marks',
      subtitle: "Don't leave 45+ marks on the table",
      primaryButton: {
        text: 'Practice Ecology MCQs',
        link: '/tools/neet-mcq?chapter=ecology',
      },
      secondaryButton: {
        text: 'View Ecology Notes',
        link: '/ecology-notes-neet',
      },
    },
    toolsCTA: resourceToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'NEET Chapter Weightage', link: '/neet-biology-chapter-weightage' },
      { title: 'Ecology Notes', link: '/ecology-notes-neet' },
      { title: 'NEET Biology Important Questions', link: '/neet-biology-important-questions' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'NEET Ecology Important Questions',
      provider: 'Cerebrum Biology Academy',
      description: 'Important ecology questions for NEET covering all 4 chapters with PYQ analysis',
      duration: '3 weeks',
      price: 4999,
      priceCurrency: 'INR',
    },
  },

  'neet-repeater-success-stories': {
    slug: 'neet-repeater-success-stories',
    classLevel: 'dropper',
    title: 'NEET Repeater Success Stories 2025 | Dropper to Doctor Journeys',
    metaDescription:
      'Real NEET dropper success stories from Cerebrum Academy. See how students improved 100-200 marks in their second attempt. Get inspired & join our repeater batch.',
    keywords: [
      'neet repeater success stories',
      'neet dropper success stories',
      'neet dropper to doctor',
      'neet second attempt success',
      'neet score improvement stories',
      'neet 450 to 650 improvement',
      'neet repeater journey',
      'neet dropper motivation',
    ],
    hero: {
      headline: 'From NEET Dropout to Doctor Dreams',
      subheadline:
        'Real success stories of students who improved 100-200 marks in their second attempt. 78% of our droppers secure government MBBS seats. Your comeback starts here.',
      highlightedText: '78% Success Rate',
      ctaText: 'Join Dropper Batch 2025',
      ctaLink: '/courses/neet-dropper',
    },
    painPoints: {
      title: 'What NEET Droppers Face',
      points: [
        {
          icon: '😔',
          question: 'Feeling like a failure after first attempt?',
          solution: 'Join 1000s who turned failure into fuel. Your story awaits.',
        },
        {
          icon: '👨‍👩‍👧',
          question: 'Family pressure and self-doubt?',
          solution: 'Our counselors and peer support make the journey easier',
        },
        {
          icon: '📉',
          question: 'Scared of another disappointment?',
          solution: 'Proven strategy that has helped 500+ droppers succeed',
        },
      ],
    },
    benefits: {
      title: 'Why Droppers Succeed at Cerebrum',
      subtitle: '500+ Successful Repeaters',
      items: [
        {
          icon: '📊',
          title: 'Gap Analysis',
          description: 'We identify exactly where you lost marks last time',
        },
        {
          icon: '🎯',
          title: 'Focused Preparation',
          description: 'Target weak areas while maintaining strengths',
        },
        {
          icon: '🧠',
          title: 'Mental Wellness',
          description: 'Regular counseling and motivation sessions',
        },
        {
          icon: '👥',
          title: 'Peer Community',
          description: 'Study with fellow droppers who understand your journey',
        },
      ],
    },
    stats: [
      { value: '78%', label: 'Govt Seat Rate', icon: '🏥' },
      { value: '150+', label: 'Avg Mark Improvement', icon: '📈' },
      { value: '500+', label: 'Success Stories', icon: '⭐' },
      { value: '12', label: 'Month Program', icon: '📅' },
    ],
    testimonials: [
      {
        name: 'Aditya Verma',
        achievement: 'NEET 2024 - 685/720 (from 495)',
        quote:
          'First attempt: 495. Second attempt: 685. The 190 mark improvement changed my life. I am now at AIIMS Delhi. Never give up!',
        score: '190 marks improved',
      },
      {
        name: 'Sneha Reddy',
        achievement: 'NEET 2024 - 645/720 (from 520)',
        quote:
          'After failing to get any seat in first attempt, I joined Cerebrum. The systematic approach and emotional support helped me score 645. Government MBBS achieved!',
        score: '125 marks improved',
      },
      {
        name: 'Rahul Gupta',
        achievement: 'NEET 2024 - 612/720 (from 410)',
        quote:
          'From 410 to 612 - a jump of 202 marks! The small batch size meant every doubt got cleared. Best decision of my life.',
        score: '202 marks improved',
      },
    ],
    faqs: [
      {
        question: 'What is the success rate for NEET droppers?',
        answer:
          'At Cerebrum, 78% of our dropper students secure government MBBS seats. The average improvement is 150+ marks. With focused preparation, droppers often outperform first-timers.',
      },
      {
        question: 'Is it worth taking a drop year for NEET?',
        answer:
          'Yes, if youre committed. Statistics show that 40-50% of NEET qualifiers are droppers. One extra year of preparation can mean the difference between no seat and a government MBBS.',
      },
      {
        question: 'How to improve 100+ marks in second attempt?',
        answer:
          'Analyze your first attempt thoroughly, identify weak areas, join a structured coaching program, focus on NCERT, practice regularly, and maintain mental wellness. Most droppers can improve 100-200 marks with the right strategy.',
      },
      {
        question: 'What makes Cerebrum different for droppers?',
        answer:
          'Small batches (10-12 students), personalized attention, gap analysis from first attempt, mental wellness support, and a community of fellow droppers. Our faculty has helped 500+ droppers succeed.',
      },
    ],
    courseSummary: {
      title: 'NEET Dropper Success Program',
      duration: '12 months intensive',
      batchSize: '10-12 students only',
      features: [
        'First attempt gap analysis',
        'Personalized study plan',
        'Daily doubt clearing',
        'Mental wellness counseling',
        'Peer study groups',
      ],
      price: {
        original: 85000,
        discounted: 65000,
        emi: '₹5,417/month',
      },
    },
    cta: {
      title: 'Start Your Comeback Story',
      subtitle: 'Join 500+ successful droppers who proved everyone wrong',
      primaryButton: {
        text: 'Join Dropper Batch 2025',
        link: '/courses/neet-dropper',
      },
      secondaryButton: {
        text: 'Talk to Counselor',
        link: '/book-demo?type=dropper',
      },
    },
    toolsCTA: resourceToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'NEET Dropper Course', link: '/courses/neet-dropper' },
      { title: 'Best Coaching for Droppers', link: '/best-coaching-neet-droppers' },
      { title: 'NEET Preparation Guide', link: '/neet-preparation-guide' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'NEET Dropper Success Program',
      provider: 'Cerebrum Biology Academy',
      description:
        'Comprehensive NEET preparation program for droppers with 78% government seat success rate',
      duration: '12 months',
      price: 65000,
      priceCurrency: 'INR',
    },
  },

  // ONLINE COACHING SEO PAGES - High Volume Keywords (90K+ monthly)
  'live-online-neet-classes': {
    slug: 'live-online-neet-classes',
    classLevel: 'universal',
    title: 'Live Online NEET Classes 2025-26 | Interactive Biology Sessions | Cerebrum Academy',
    metaDescription:
      'Join live online NEET classes with real-time doubt clearing. Interactive biology sessions by AIIMS faculty. Live online NEET biology coaching with personal attention. Free demo available!',
    keywords: [
      'live online neet classes',
      'live online biology classes',
      'live neet classes online',
      'live online neet coaching',
      'live interactive neet classes',
      'real-time neet classes',
      'live online biology classes for neet',
      'live neet biology coaching',
      'online live classes for neet 2025',
      'online live classes for neet 2026',
    ],
    hero: {
      headline: 'Live Online NEET Classes',
      subheadline:
        'Real-time interactive biology sessions with AIIMS faculty. Ask questions, get instant answers.',
      highlightedText: 'Live & Interactive',
      ctaText: 'Join Free Live Demo',
      ctaLink: '/book-demo?type=live-online',
    },
    painPoints: {
      title: 'Why Choose Live Over Recorded?',
      points: [
        {
          icon: 'confused',
          question: 'Recorded videos feel one-way?',
          solution:
            'Live classes allow real-time interaction - ask doubts instantly, get immediate feedback.',
        },
        {
          icon: 'stuck',
          question: 'Cant ask questions while watching?',
          solution:
            'Raise your hand virtually, type in chat, or unmute to speak directly with faculty.',
        },
        {
          icon: 'overwhelmed',
          question: 'No accountability with self-study?',
          solution:
            'Scheduled live classes create discipline. Daily attendance tracking keeps you on track.',
        },
        {
          icon: 'isolated',
          question: 'Missing classroom feel online?',
          solution: 'See classmates, participate in discussions, compete in live quizzes together.',
        },
      ],
    },
    benefits: {
      title: 'Live Class Advantages',
      subtitle: 'Experience the next best thing to physical classroom',
      items: [
        {
          icon: 'video',
          title: 'Real-Time Interaction',
          description: 'Two-way video/audio communication. See and be seen by your teacher.',
        },
        {
          icon: 'chat',
          title: 'Instant Doubt Resolution',
          description: 'Ask questions during class via chat or voice. Get answers immediately.',
        },
        {
          icon: 'quiz',
          title: 'Live Quizzes & Polls',
          description: 'Interactive assessments during class to check understanding in real-time.',
        },
        {
          icon: 'recording',
          title: 'Recordings Available',
          description: 'Missed a class? Recordings available within 2 hours for revision.',
        },
        {
          icon: 'group',
          title: 'Peer Learning',
          description:
            'Learn with classmates, see their questions, benefit from group discussions.',
        },
        {
          icon: 'schedule',
          title: 'Structured Schedule',
          description:
            'Fixed class timings create discipline and routine for consistent preparation.',
        },
      ],
    },
    stats: [
      { value: '3+', label: 'Live Hours Daily' },
      { value: '95%', label: 'Live Attendance' },
      { value: '< 30 sec', label: 'Doubt Response' },
      { value: '4.9/5', label: 'Student Rating' },
    ],
    testimonials: [
      {
        name: 'Riya Sharma',
        achievement: 'NEET 2024 - 680/720',
        quote:
          'Live classes felt like being in a real classroom. I could ask doubts immediately and the teacher knew my name!',
        score: '680/720',
      },
      {
        name: 'Aditya Verma',
        achievement: 'NEET 2024 - 645/720',
        quote:
          'The live quizzes during class kept me engaged. Much better than passively watching recorded videos.',
        score: '645/720',
      },
      {
        name: 'Sneha Patel',
        achievement: 'From Tier 3 City',
        quote:
          'Living in a small town, live online classes gave me access to Delhi-level coaching.',
      },
    ],
    faqs: [
      {
        question: 'What platform do you use for live classes?',
        answer:
          'We use a custom-built platform optimized for education with features like virtual hand-raise, breakout rooms for doubt sessions, and integrated whiteboard.',
      },
      {
        question: 'What if I miss a live class?',
        answer:
          'Recordings are available within 2 hours of class completion. However, we encourage attending live for maximum benefit.',
      },
      {
        question: 'How many students in a live batch?',
        answer:
          'We limit batches to 30 students to ensure everyone can interact and get their doubts resolved.',
      },
      {
        question: 'What internet speed do I need?',
        answer:
          'Minimum 2 Mbps for smooth streaming. Our platform adapts to lower bandwidth but 5+ Mbps is recommended.',
      },
    ],
    courseSummary: {
      title: 'Live Online NEET Program',
      duration: '12 months',
      batchSize: '30 students per batch',
      features: [
        '3+ hours live classes daily',
        'Real-time doubt clearing',
        'Live quizzes & assessments',
        'Class recordings for revision',
        'WhatsApp support group',
      ],
      price: {
        original: 75000,
        discounted: 55000,
        emi: '₹4,583/month',
      },
    },
    cta: {
      title: 'Experience Live Learning',
      subtitle: 'Join a free live demo class and feel the difference',
      primaryButton: {
        text: 'Book Free Live Demo',
        link: '/book-demo?type=live-online',
      },
      secondaryButton: {
        text: 'View Class Schedule',
        link: '/timetable',
      },
    },
    toolsCTA: resourceToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'Online NEET Coaching', link: '/online-neet-coaching' },
      { title: 'Online Test Series', link: '/online-neet-test-series' },
      { title: 'NEET 2026 Preparation', link: '/neet-2026-preparation' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'Live Online NEET Biology Classes',
      provider: 'Cerebrum Biology Academy',
      description: 'Interactive live online NEET biology classes with real-time doubt resolution',
      duration: '12 months',
      price: 55000,
      priceCurrency: 'INR',
    },
  },

  'online-neet-test-series': {
    slug: 'online-neet-test-series',
    classLevel: 'universal',
    title: 'Online NEET Test Series 2025-26 | Mock Tests & Practice | Cerebrum Academy',
    metaDescription:
      'Comprehensive online NEET test series with 200+ mock tests. NEET pattern online tests with detailed analysis, rank prediction & improvement suggestions. Start free trial!',
    keywords: [
      'online neet test series',
      'neet online test series',
      'neet mock test online',
      'online neet mock test',
      'neet practice test online',
      'free neet test series online',
      'best online neet test series',
      'neet test series 2025',
      'neet test series 2026',
      'online neet practice papers',
    ],
    hero: {
      headline: 'Online NEET Test Series 2025-26',
      subheadline:
        '200+ mock tests designed by AIIMS faculty. Real NEET experience with AI-powered analysis.',
      highlightedText: '200+ Tests',
      ctaText: 'Start Free Trial',
      ctaLink: '/tools/neet-mcq',
    },
    painPoints: {
      title: 'Why Test Series Matters',
      points: [
        {
          icon: 'exam',
          question: 'Not sure if youre ready for NEET?',
          solution: 'Our tests simulate exact NEET pattern. Know exactly where you stand.',
        },
        {
          icon: 'time',
          question: 'Struggling with time management?',
          solution: 'Timed tests train you to solve 200 questions in 200 minutes.',
        },
        {
          icon: 'analysis',
          question: 'Dont know your weak areas?',
          solution: 'Detailed analytics show chapter-wise, topic-wise performance breakdown.',
        },
        {
          icon: 'rank',
          question: 'No idea about your All India Rank?',
          solution: 'Compare with 50,000+ students. Get realistic rank prediction.',
        },
      ],
    },
    benefits: {
      title: 'Test Series Features',
      subtitle: 'Everything you need to perfect your exam temperament',
      items: [
        {
          icon: 'tests',
          title: '200+ Mock Tests',
          description: 'Chapter tests, part tests, full syllabus tests - progressive difficulty.',
        },
        {
          icon: 'pattern',
          title: 'Exact NEET Pattern',
          description: '200 questions, 200 minutes, negative marking, OMR interface.',
        },
        {
          icon: 'analysis',
          title: 'AI-Powered Analysis',
          description: 'Detailed performance report with improvement suggestions.',
        },
        {
          icon: 'rank',
          title: 'All India Ranking',
          description: 'Compare with 50,000+ students across India.',
        },
        {
          icon: 'solutions',
          title: 'Video Solutions',
          description: 'Detailed video explanations for all questions by expert faculty.',
        },
        {
          icon: 'mobile',
          title: 'Mobile Friendly',
          description: 'Practice on mobile, tablet, or laptop anytime, anywhere.',
        },
      ],
    },
    stats: [
      { value: '200+', label: 'Mock Tests' },
      { value: '50K+', label: 'Students' },
      { value: '15K+', label: 'Questions' },
      { value: '92%', label: 'Accuracy' },
    ],
    testimonials: [
      {
        name: 'Priya Singh',
        achievement: 'NEET 2024 - 695/720',
        quote:
          'The test series predicted my rank within 500 positions. The analysis helped me identify weak chapters I had ignored.',
        score: '695/720',
      },
      {
        name: 'Rahul Kumar',
        achievement: 'Improved 120 marks',
        quote: 'Regular tests improved my speed and accuracy. From 480 to 600 in 4 months!',
      },
      {
        name: 'Ananya Reddy',
        achievement: 'NEET 2024 - 660/720',
        quote:
          'Video solutions were game-changer. Understood every mistake and never repeated them.',
        score: '660/720',
      },
    ],
    faqs: [
      {
        question: 'How many tests are included?',
        answer:
          '200+ tests including 40 chapter tests (Botany + Zoology), 20 part tests, 30 full syllabus tests, and 100+ topic-wise tests.',
      },
      {
        question: 'Is there negative marking?',
        answer: 'Yes, exactly like NEET. +4 for correct, -1 for incorrect, 0 for unattempted.',
      },
      {
        question: 'Can I reattempt tests?',
        answer: 'Yes, unlimited reattempts for all tests. Track your improvement over time.',
      },
      {
        question: 'Are previous year questions included?',
        answer: 'Yes, we have 10 years of NEET/AIPMT PYQs as separate test sets.',
      },
    ],
    courseSummary: {
      title: 'Complete NEET Test Series',
      duration: '12 months access',
      batchSize: 'Unlimited attempts',
      features: [
        '200+ mock tests',
        'Detailed analytics',
        'All India ranking',
        'Video solutions',
        'PYQ test sets',
      ],
      price: {
        original: 4999,
        discounted: 2999,
        emi: '₹500/month',
      },
    },
    cta: {
      title: 'Start Testing Your Preparation',
      subtitle: 'First 5 tests absolutely FREE - no card required',
      primaryButton: {
        text: 'Start Free Trial',
        link: '/tools/neet-mcq',
      },
      secondaryButton: {
        text: 'View Test Schedule',
        link: '/test-series-schedule',
      },
    },
    toolsCTA: resourceToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'NEET MCQ Practice', link: '/tools/neet-mcq' },
      { title: 'Online NEET Coaching', link: '/online-neet-coaching' },
      { title: 'NEET Rank Predictor', link: '/tools/rank-predictor' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'Online NEET Test Series 2025-26',
      provider: 'Cerebrum Biology Academy',
      description:
        'Comprehensive online NEET test series with 200+ mock tests and AI-powered analysis',
      duration: '12 months',
      price: 2999,
      priceCurrency: 'INR',
    },
  },

  // NEET Online Classes - High Priority Service Page
  'neet-online-classes': {
    slug: 'neet-online-classes',
    classLevel: 'universal',
    title: 'NEET Online Classes 2025-26 | Live Biology Classes',
    metaDescription:
      'Join NEET online classes with AIIMS faculty. Live interactive biology classes, small batches, 24/7 doubt support. 2500+ selections.',
    keywords: [
      'neet online classes',
      'online classes for neet',
      'neet biology online classes',
      'live neet classes online',
      'neet preparation classes online',
      'online neet biology classes',
      'neet coaching online classes',
      'best online classes for neet',
    ],
    hero: {
      headline: 'NEET Online Classes 2025-26',
      subheadline:
        'Live interactive biology classes with AIIMS faculty. Join from anywhere in India and get personal attention in small batches.',
      ctaText: 'Book Free Demo Class',
      ctaLink: '/book-demo',
      backgroundGradient: 'from-blue-900 to-indigo-800',
    },
    painPoints: {
      title: 'Why Students Choose Our Online Classes',
      points: [
        {
          icon: 'location',
          question: 'No good coaching in your city?',
          solution:
            "Access AIIMS faculty teaching directly online. India's best biology coaching at your fingertips.",
        },
        {
          icon: 'clock',
          question: 'Wasting hours in commute?',
          solution: 'Save 2-3 hours daily. Use saved time for self-study and revision.',
        },
        {
          icon: 'wallet',
          question: 'Offline coaching too expensive?',
          solution: 'Save 60-70% on total costs. No hostel, food, or travel expenses.',
        },
        {
          icon: 'repeat',
          question: 'Miss topics in crowded classes?',
          solution: 'Small batches of 10-15 students + recorded backup of every class.',
        },
      ],
    },
    benefits: {
      title: 'What Our Online Classes Include',
      subtitle: 'Complete NEET biology preparation at your home',
      items: [
        {
          icon: 'video',
          title: 'Live Interactive Classes',
          description:
            'Not pre-recorded. Real-time classes with two-way interaction, questions, and discussions.',
        },
        {
          icon: 'user',
          title: 'AIIMS Faculty Teaching',
          description:
            'Dr. Shekhar Singh (AIIMS) teaches directly. 15+ years of NEET coaching experience.',
        },
        {
          icon: 'users',
          title: 'Small Batches (10-15)',
          description:
            'Personal attention guaranteed. Know every student by name, track individual progress.',
        },
        {
          icon: 'message',
          title: '24/7 Doubt Support',
          description: 'WhatsApp support with 2-hour response time. Weekly live doubt sessions.',
        },
        {
          icon: 'repeat',
          title: 'Recorded Backup',
          description:
            'Missed a class? No problem. All live sessions recorded for unlimited revision.',
        },
        {
          icon: 'book',
          title: 'Complete Study Material',
          description:
            'NCERT-based notes, 5000+ MCQs, PYQ analysis, and chapter summaries included.',
        },
      ],
    },
    stats: [
      { value: '2500+', label: 'Students' },
      { value: '4.9/5', label: 'Rating' },
      { value: '500+', label: 'Hours' },
      { value: '85%', label: 'Selection Rate' },
    ],
    testimonials: [
      {
        name: 'Priya Sharma',
        achievement: 'NEET 2024 - 685/720',
        quote:
          'Online classes gave me access to AIIMS-level teaching from my hometown. The small batch meant teacher knew my weak areas.',
        score: '685/720',
      },
      {
        name: 'Arjun Verma',
        achievement: 'NEET 2024 - 650/720',
        quote:
          'Saved 3 hours daily on commute. Used that time for self-study. Best decision for my NEET preparation.',
        score: '650/720',
      },
      {
        name: 'Sneha Patel',
        achievement: 'Government College',
        quote:
          'As a dropper, online classes helped me prepare without leaving home. Got into a government medical college!',
      },
    ],
    faqs: [
      {
        question: 'What is the timing of NEET online classes?',
        answer:
          'We offer multiple batches: Morning (6-8 AM), Afternoon (4-6 PM), Evening (7-9 PM), and Weekend batches. Choose what suits your schedule. All timings are IST.',
      },
      {
        question: 'Can I watch recorded classes if I miss live?',
        answer:
          'Yes, all live classes are recorded and uploaded within 2 hours. You get lifetime access to recordings. Watch anytime, unlimited times.',
      },
      {
        question: 'How are doubts resolved in online classes?',
        answer:
          'Multiple channels: (1) Ask during live class, (2) WhatsApp support 24/7 with 2-hour response, (3) Weekly dedicated doubt sessions on Sunday. Most doubts resolved same day.',
      },
      {
        question: 'What is the batch size for online classes?',
        answer:
          'Strictly 10-15 students per batch. This ensures teacher knows every student, tracks progress individually, and provides personal attention during class.',
      },
      {
        question: 'Is there a demo class available?',
        answer:
          'Yes! Book a free demo class to experience our teaching style, platform, and interaction. No payment required. Decide after trying.',
      },
      {
        question: 'What technology do I need for online classes?',
        answer:
          'Laptop/tablet/smartphone with internet connection (minimum 2 Mbps). We use Zoom for classes. Works on any device. Technical support available.',
      },
    ],
    courseSummary: {
      title: 'NEET Online Class Packages',
      duration: '12-month comprehensive program',
      batchSize: '10-15 students per batch',
      features: [
        '500+ hours of live classes',
        'Complete NEET biology syllabus',
        'AIIMS faculty teaching',
        'Recorded backup of all classes',
        '24/7 WhatsApp doubt support',
        'Weekly tests + 10 mock tests',
        'Complete study material (PDF)',
        '7-day refund policy',
      ],
      price: {
        original: 45000,
        discounted: 35000,
        emi: '₹5,833/month',
      },
    },
    cta: {
      title: 'Experience Our Online Classes Free',
      subtitle: 'Book a free demo class. No payment needed. Decide after trying.',
      primaryButton: {
        text: 'Book Free Demo',
        link: '/book-demo',
      },
      secondaryButton: {
        text: 'View Class Schedule',
        link: '/batch-schedule',
      },
    },
    toolsCTA: resourceToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'Live Online Classes', link: '/live-online-neet-classes' },
      { title: 'Online Test Series', link: '/online-neet-test-series' },
      { title: 'Best Online Coaching', link: '/best-online-coaching-neet-biology' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'NEET Online Classes 2025-26',
      provider: 'Cerebrum Biology Academy',
      description: 'Live interactive NEET biology classes with AIIMS faculty',
      duration: '12 months',
      price: 35000,
      priceCurrency: 'INR',
    },
  },

  // Online Biology Tuition for NEET
  'online-biology-tuition-neet': {
    slug: 'online-biology-tuition-neet',
    classLevel: 'universal',
    title: 'Online Biology Tuition for NEET | Personal Coaching',
    metaDescription:
      'Online biology tuition for NEET with AIIMS faculty. 1-on-1 and small batch options. Personalized attention, flexible timing.',
    keywords: [
      'online biology tuition',
      'online biology tuition for neet',
      'biology tuition online',
      'biology private tuition online',
      'online biology coaching',
      'personal biology tutor online',
      'biology home tutor online',
      'neet biology tuition online',
    ],
    hero: {
      headline: 'Online Biology Tuition for NEET',
      subheadline:
        'Personalized 1-on-1 and small batch biology tuition by AIIMS faculty. Learn at your pace.',
      ctaText: 'Start Free Trial',
      ctaLink: '/book-demo',
      backgroundGradient: 'from-teal-900 to-teal-800',
    },
    painPoints: {
      title: 'Why Online Biology Tuition Works',
      points: [
        {
          icon: 'user',
          question: 'Need individual attention?',
          solution: '1-on-1 tuition option with fully customized pace and syllabus coverage.',
        },
        {
          icon: 'clock',
          question: 'Fixed coaching timing not suitable?',
          solution:
            'Flexible scheduling. Choose your preferred time slots. Reschedule when needed.',
        },
        {
          icon: 'location',
          question: 'No good biology tutor nearby?',
          solution: 'Access AIIMS faculty online. Better than any local tutor at lower cost.',
        },
        {
          icon: 'question',
          question: 'Embarrassed to ask doubts in class?',
          solution: 'Personal tuition means ask unlimited questions without hesitation.',
        },
      ],
    },
    benefits: {
      title: 'Online Tuition Options',
      subtitle: 'Choose what works best for you',
      items: [
        {
          icon: 'user',
          title: '1-on-1 Private Tuition',
          description:
            'Fully personalized pace. Custom syllabus coverage based on your needs. Maximum flexibility.',
        },
        {
          icon: 'users',
          title: 'Small Batch (5-8 students)',
          description: 'Peer learning benefits with personal attention. Cost-effective option.',
        },
        {
          icon: 'video',
          title: 'Visual Learning',
          description: 'HD video explanations with diagrams and animations. Biology made visual.',
        },
        {
          icon: 'book',
          title: 'NCERT Focus',
          description: 'Screen sharing for NCERT discussions. Every line covered systematically.',
        },
        {
          icon: 'repeat',
          title: 'Session Recordings',
          description: 'All tuition sessions recorded. Revise concepts anytime.',
        },
        {
          icon: 'calendar',
          title: 'Flexible Scheduling',
          description: 'Morning, afternoon, evening, or weekend slots. You choose.',
        },
      ],
    },
    stats: [
      { value: '1-on-1', label: 'Personal Attention' },
      { value: '4.9/5', label: 'Student Rating' },
      { value: 'Flexible', label: 'Timing' },
      { value: '85%', label: 'Success Rate' },
    ],
    testimonials: [
      {
        name: 'Riya Singh',
        achievement: 'NEET 2024 - 670/720',
        quote:
          '1-on-1 tuition helped me cover weak chapters at my pace. Teacher understood my learning style perfectly.',
        score: '670/720',
      },
      {
        name: 'Karan Mehta',
        achievement: 'Improved 200 marks',
        quote:
          'Moved from group coaching to personal tuition. My score jumped from 450 to 650 in 6 months!',
      },
      {
        name: 'Ananya Reddy',
        achievement: 'NEET 2024 - 655/720',
        quote:
          'Small batch tuition gave me confidence to ask any doubt. No hesitation, no judgement.',
        score: '655/720',
      },
    ],
    faqs: [
      {
        question: 'Is online biology tuition effective?',
        answer:
          'Very effective for biology because: (1) High-quality diagrams on screen, (2) NCERT shown during explanation, (3) Screen sharing for doubt clarification, (4) Recording for revision. Many students find biology clearer online.',
      },
      {
        question: 'What is the fee for online biology tuition?',
        answer:
          '1-on-1 tuition: ₹50,000-75,000/year, Small batch (5-8): ₹35,000/year, Regular batch (10-15): ₹25,000/year. EMI options available.',
      },
      {
        question: 'How long is each tuition session?',
        answer:
          'Standard sessions are 1.5-2 hours. For 1-on-1, you can customize session length. Breaks included in longer sessions.',
      },
      {
        question: 'Can I choose my preferred time slot?',
        answer:
          'Yes, especially for 1-on-1 and small batch. Discuss your availability and we match you to suitable slot.',
      },
      {
        question: 'What if I need extra help with specific topics?',
        answer:
          'In 1-on-1, we customize based on your weak areas. In batches, additional doubt sessions available. No extra charge for reasonable requests.',
      },
    ],
    courseSummary: {
      title: 'Online Biology Tuition Packages',
      duration: '12-month program',
      batchSize: 'Multiple options',
      features: [
        '1-on-1, small batch, or regular batch',
        'AIIMS faculty teaching',
        'Flexible timing',
        'Session recordings',
        'Complete NCERT coverage',
        'Regular assessments',
        'Doubt support included',
      ],
      price: {
        original: 45000,
        discounted: 35000,
        emi: '₹5,833/month',
      },
    },
    cta: {
      title: 'Try Biology Tuition Free',
      subtitle: 'Experience a free demo session. Find your perfect learning style.',
      primaryButton: {
        text: 'Book Free Demo',
        link: '/book-demo',
      },
      secondaryButton: {
        text: 'Compare Options',
        link: '/courses',
      },
    },
    toolsCTA: resourceToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'NEET Online Classes', link: '/neet-online-classes' },
      { title: 'Best Online Coaching', link: '/best-online-coaching-neet-biology' },
      { title: 'Biology Class 11 Tuition', link: '/class-11-biology-tuition-online' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'Online Biology Tuition for NEET',
      provider: 'Cerebrum Biology Academy',
      description: 'Personalized online biology tuition with AIIMS faculty',
      duration: '12 months',
      price: 35000,
      priceCurrency: 'INR',
    },
  },

  // NEET Preparation Timetable
  'neet-preparation-timetable': {
    slug: 'neet-preparation-timetable',
    classLevel: 'universal',
    title: 'NEET Preparation Timetable 2025 | Daily Study Schedule',
    metaDescription:
      'NEET preparation timetable for Class 11, 12, and droppers. Download free study schedule PDF. Expert-designed daily routine.',
    keywords: [
      'neet preparation timetable',
      'neet study schedule',
      'neet daily timetable for class 11 12',
      'neet preparation time table dropper',
      'best timetable for neet preparation',
      'neet study plan pdf',
      'neet daily routine',
      'how to make neet study timetable',
    ],
    hero: {
      headline: 'NEET Preparation Timetable 2025',
      subheadline:
        'Proven study schedules for Class 11, 12, and Droppers. Download free PDF or generate custom timetable.',
      ctaText: 'Download Free Timetable',
      ctaLink: '/resources',
      backgroundGradient: 'from-purple-900 to-purple-800',
    },
    painPoints: {
      title: 'Timetable Problems Solved',
      points: [
        {
          icon: 'question',
          question: "Don't know how to plan study hours?",
          solution: 'Ready-made day-wise schedules based on your class level and target.',
        },
        {
          icon: 'book',
          question: 'Struggling to balance school + NEET?',
          solution: 'Integrated Board + NEET timetables for Class 11 and 12 students.',
        },
        {
          icon: 'clock',
          question: 'Procrastinating without structure?',
          solution: 'Scientifically designed routines with built-in breaks and revision slots.',
        },
        {
          icon: 'target',
          question: 'Not sure if your plan is effective?',
          solution: 'These timetables created by NEET toppers and expert faculty.',
        },
      ],
    },
    benefits: {
      title: 'Timetables for Every Situation',
      subtitle: 'Choose based on your category',
      items: [
        {
          icon: 'calendar',
          title: 'Class 11 NEET Timetable',
          description:
            'Early start advantage. Build strong foundation while managing school. 4-5 hours daily for NEET.',
        },
        {
          icon: 'calendar',
          title: 'Class 12 Board + NEET',
          description:
            'Balanced schedule for both exams. Strategic overlap of syllabus. 6-7 hours daily.',
        },
        {
          icon: 'calendar',
          title: 'Dropper Intensive',
          description: 'Full-time NEET focus. 10-12 hours daily with structured revision cycles.',
        },
        {
          icon: 'calendar',
          title: 'Last 6 Month Schedule',
          description:
            'Revision-focused. Complete 2 rounds of syllabus with mock test integration.',
        },
        {
          icon: 'calendar',
          title: 'Last 3 Month Sprint',
          description: 'High-intensity revision. Focus on weak areas and maximum practice.',
        },
        {
          icon: 'calendar',
          title: 'Last 30 Days Plan',
          description: 'Final revision + mock tests. Maintain confidence and peak performance.',
        },
      ],
    },
    stats: [
      { value: '10K+', label: 'Students Guided', icon: 'users' },
      { value: '6', label: 'Timetable Types', icon: 'calendar' },
      { value: '95%', label: 'Completion Rate', icon: 'chart' },
      { value: 'FREE', label: 'Download', icon: 'download' },
    ],
    testimonials: [
      {
        name: 'Sneha P.',
        achievement: 'NEET 2024 - 665/720',
        quote:
          'The Class 12 timetable helped me balance boards and NEET perfectly. Following the schedule consistently made all the difference!',
        score: '665/720',
      },
      {
        name: 'Varun M.',
        achievement: 'NEET 2024 - 640/720 (Dropper)',
        quote:
          'As a dropper, I was lost. The intensive timetable gave me structure and accountability. Best decision I made.',
        score: '640/720',
      },
      {
        name: 'Ananya R.',
        achievement: 'NEET 2024 - 680/720',
        quote:
          'The last 3-month sprint schedule was intense but exactly what I needed. High-yield topic focus really worked.',
        score: '680/720',
      },
    ],
    faqs: [
      {
        question: 'How many hours should I study for NEET daily?',
        answer:
          'Class 11: 4-5 hours, Class 12: 6-8 hours, Dropper: 10-12 hours. Quality matters more than quantity. Include breaks every 45-50 minutes.',
      },
      {
        question: 'Best time to study for NEET - morning or night?',
        answer:
          'Depends on your natural rhythm. Generally, early morning (5-7 AM) is great for new concepts. Evening for practice. Night for light revision. Consistency matters more than timing.',
      },
      {
        question: 'How to balance NEET and board preparation?',
        answer:
          '70% syllabus overlaps. Use NCERT for both. Dedicate 30% extra time for board-specific topics. Our Class 12 timetable handles this balance.',
      },
      {
        question: 'Ideal timetable for NEET dropper?',
        answer:
          '6 AM wake up, 6:30-12:30 study block 1 (with breaks), 2-6 PM block 2, 7-10 PM block 3. Sunday half-day for mock tests. Weekly off for rest.',
      },
      {
        question: 'Should I take breaks while studying?',
        answer:
          'Essential! Study 45-50 minutes, break 10-15 minutes. Longer break (30 min) every 2-3 hours. No screens during breaks - walk, stretch, snack.',
      },
    ],
    courseSummary: {
      title: 'Get Personalized Study Schedule',
      duration: 'Custom timeline',
      batchSize: 'Individual planning',
      features: [
        'Free downloadable timetables',
        'Class 11, 12, Dropper versions',
        'Last 6/3/1 month schedules',
        'Subject-wise time allocation',
        'Built-in revision cycles',
        'Practice slot integration',
      ],
      price: {
        original: 0,
        discounted: 0,
        emi: 'FREE',
      },
    },
    cta: {
      title: 'Download Your Timetable Now',
      subtitle: 'Free PDF download. Start following from today.',
      primaryButton: {
        text: 'Download Free PDF',
        link: '/resources',
      },
      secondaryButton: {
        text: 'Generate Custom Plan',
        link: '/tools/study-plan',
      },
    },
    toolsCTA: resourceToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'NEET Tips & Strategy', link: '/neet-tips-strategy' },
      { title: 'Study Plan Generator', link: '/tools/study-plan' },
      { title: 'NEET Preparation Guide', link: '/neet-preparation-guide' },
    ],
    schema: {
      '@type': 'Article',
      courseName: 'NEET Preparation Timetable 2025',
      provider: 'Cerebrum Biology Academy',
      description: 'Expert-designed study schedules for NEET preparation',
      duration: 'Self-paced',
      price: 0,
      priceCurrency: 'INR',
    },
  },

  // NEET Biology Important Diagrams PDF
  'neet-biology-important-diagrams-pdf': {
    slug: 'neet-biology-important-diagrams-pdf',
    classLevel: 'universal',
    title: 'NEET Biology Important Diagrams PDF | 500+ Labeled Diagrams',
    metaDescription:
      'Download NEET biology diagrams PDF free. 500+ NCERT-based labeled diagrams for Class 11 & 12. Essential for NEET 2025.',
    keywords: [
      'neet biology diagrams pdf',
      'important diagrams for neet biology',
      'neet biology diagram pdf free download',
      'biology diagrams for neet class 11 12',
      'labeled diagrams biology neet',
      'neet biology diagram book',
      'ncert biology diagrams',
      'botany zoology diagrams neet',
    ],
    hero: {
      headline: 'NEET Biology Important Diagrams PDF',
      subheadline:
        '500+ NCERT-based labeled diagrams essential for NEET 2025. Free download for Class 11 & 12.',
      ctaText: 'Download Free Diagrams',
      ctaLink: '/resources',
      backgroundGradient: 'from-green-900 to-green-800',
    },
    painPoints: {
      title: 'Diagram Challenges Solved',
      points: [
        {
          icon: 'pencil',
          question: "Can't draw diagrams in exam?",
          solution: 'Pre-labeled quick-reference diagrams. Memorize structure, not drawing skills.',
        },
        {
          icon: 'clock',
          question: 'Spending too much time on diagrams?',
          solution: 'Ready-to-memorize visual sheets. Focus on concepts, not artistic ability.',
        },
        {
          icon: 'question',
          question: 'Missing labels in diagram questions?',
          solution: 'Complete NCERT-aligned labeling. Every important part marked clearly.',
        },
        {
          icon: 'book',
          question: 'Scattered diagram resources?',
          solution: 'All 500+ diagrams in one organized PDF. Chapter-wise arrangement.',
        },
      ],
    },
    benefits: {
      title: 'What This Diagram Collection Includes',
      subtitle: 'Complete visual resource for NEET Biology',
      items: [
        {
          icon: 'book',
          title: 'Chapter-wise Organization',
          description: 'All 38 chapters covered. Botany + Zoology complete. Easy to navigate.',
        },
        {
          icon: 'target',
          title: 'NCERT-Based Accuracy',
          description: 'Every diagram matches NCERT exactly. No confusion with exam pattern.',
        },
        {
          icon: 'star',
          title: 'High-Resolution Quality',
          description: 'Printable quality. Clear labels even when printed. Study anywhere.',
        },
        {
          icon: 'checkmark',
          title: 'Exam-Important Marked',
          description: 'Frequently asked diagrams highlighted. Know what to prioritize.',
        },
        {
          icon: 'lightbulb',
          title: 'Memory Tips Included',
          description: 'Mnemonics and shortcuts for complex diagrams. Easier memorization.',
        },
        {
          icon: 'repeat',
          title: 'Updated for NEET 2025',
          description: 'Latest syllabus coverage. Includes recent exam trends.',
        },
      ],
    },
    stats: [
      { value: '500+', label: 'Diagrams', icon: 'image' },
      { value: '38', label: 'Chapters', icon: 'book' },
      { value: '35-45', label: 'Marks Coverage', icon: 'trophy' },
      { value: 'FREE', label: 'Download', icon: 'download' },
    ],
    testimonials: [
      {
        name: 'Kavya S.',
        achievement: 'NEET 2024 - 670/720',
        quote:
          'The diagram PDF was my revision companion. Before every test, I would go through the diagrams. Saved me 15+ marks in the actual exam!',
        score: '670/720',
      },
      {
        name: 'Rohan K.',
        achievement: 'NEET 2024 - 655/720',
        quote:
          'I was terrible at diagrams. This organized collection made memorization easy. The exam-important marking helped prioritize.',
        score: '655/720',
      },
      {
        name: 'Meera N.',
        achievement: 'NEET 2024 - 690/720',
        quote:
          'Best resource for last-minute revision. I could quickly scan through all diagrams in one sitting. Highly recommended!',
        score: '690/720',
      },
    ],
    faqs: [
      {
        question: 'Which diagrams are most important for NEET?',
        answer:
          'Top priority: Cell structure, Plant anatomy (cross-sections), Human body systems (heart, brain, kidney, eye, ear), DNA/RNA structure, Digestive system, Respiratory system, Reproductive organs. These appear almost every year.',
      },
      {
        question: 'How many diagram-based questions come in NEET?',
        answer:
          '15-20 questions directly involve diagrams. Another 20-25 questions test concepts that require understanding diagrams. Total 35-45 marks depend on diagram knowledge.',
      },
      {
        question: 'Should I draw or just label diagrams in NEET?',
        answer:
          'In NEET MCQ, you only identify parts - no drawing required. But understanding the diagram helps answer questions. Our PDF focuses on labeling and part identification.',
      },
      {
        question: 'Are these diagrams based on NCERT?',
        answer:
          'Yes, 100% NCERT-based. NEET uses NCERT diagrams. We match every detail - colors, labels, orientations - exactly as in textbook.',
      },
      {
        question: 'How to memorize diagrams quickly?',
        answer:
          'Tips: (1) Understand function, not just structure, (2) Use mnemonics for parts, (3) Draw rough sketches while studying, (4) Revise using our PDF before sleep, (5) Self-test with unlabeled versions.',
      },
    ],
    courseSummary: {
      title: 'Complete Diagram Package',
      duration: 'Instant access',
      batchSize: 'Self-paced study',
      features: [
        '500+ labeled diagrams',
        'All 38 chapters covered',
        'Class 11 + 12 complete',
        'NCERT-exact accuracy',
        'Printable PDF quality',
        'Chapter-wise organized',
        'Exam-important marked',
      ],
      price: {
        original: 499,
        discounted: 0,
        emi: 'FREE',
      },
    },
    cta: {
      title: 'Download Diagrams PDF Free',
      subtitle: 'Instant download. No registration required.',
      primaryButton: {
        text: 'Download Free PDF',
        link: '/resources',
      },
      secondaryButton: {
        text: 'View Sample Diagrams',
        link: '/blog/neet-biology-diagrams',
      },
    },
    toolsCTA: resourceToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'NEET Biology Notes PDF', link: '/neet-biology-notes-pdf' },
      { title: 'NEET Biology Revision Notes', link: '/neet-biology-revision-notes' },
      { title: 'NCERT Biology Solutions', link: '/ncert-biology-solutions' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'NEET Biology Diagrams Collection',
      provider: 'Cerebrum Biology Academy',
      description: '500+ NCERT-based labeled diagrams for NEET biology preparation',
      duration: 'Self-paced',
      price: 0,
      priceCurrency: 'INR',
    },
  },

  // Free NEET Biology Lectures Hub
  'free-neet-biology-lectures': {
    slug: 'free-neet-biology-lectures',
    classLevel: 'universal',
    title: 'Free NEET Biology Video Lectures | 50+ Hours Free',
    metaDescription:
      'Free NEET biology video lectures by Dr. Shekhar Singh (AIIMS). 50+ hours of concept lectures covering all chapters.',
    keywords: [
      'free neet biology lectures',
      'free biology video lectures neet',
      'neet biology free classes',
      'free online neet coaching',
      'neet biology youtube lectures',
      'free neet biology classes',
      'neet biology free video',
      'free neet preparation',
    ],
    hero: {
      headline: 'Free NEET Biology Video Lectures',
      subheadline:
        '50+ hours of free concept lectures by Dr. Shekhar Singh (AIIMS). Start learning free today.',
      ctaText: 'Start Learning Free',
      ctaLink: '/video-lectures',
      backgroundGradient: 'from-orange-800 to-red-800',
    },
    painPoints: {
      title: 'Why Free Lectures?',
      points: [
        {
          icon: 'wallet',
          question: "Can't afford paid coaching right now?",
          solution:
            'Start with 50+ hours of free content. Quality learning without financial barrier.',
        },
        {
          icon: 'question',
          question: 'Not sure if online coaching works for you?',
          solution: "Try free lectures first. Experience Dr. Shekhar's teaching before deciding.",
        },
        {
          icon: 'book',
          question: 'Need help with specific topics?',
          solution: 'Free chapter lectures available. Learn exactly what you need.',
        },
        {
          icon: 'shield',
          question: 'Worried about content quality?',
          solution: 'Same AIIMS faculty, same quality as paid courses. Just limited chapters free.',
        },
      ],
    },
    benefits: {
      title: 'Free Lecture Categories',
      subtitle: 'Quality content at zero cost',
      items: [
        {
          icon: 'video',
          title: 'Class 11 Botany',
          description:
            'Free chapters: Living World, Biological Classification, Plant Kingdom, Morphology of Flowering Plants.',
        },
        {
          icon: 'video',
          title: 'Class 11 Zoology',
          description: 'Free chapters: Animal Kingdom, Structural Organisation in Animals basics.',
        },
        {
          icon: 'video',
          title: 'Class 12 Botany',
          description: 'Free chapters: Reproduction in Plants preview, Genetics introduction.',
        },
        {
          icon: 'video',
          title: 'Class 12 Zoology',
          description: 'Free chapters: Human Physiology basics - Digestion, Breathing preview.',
        },
        {
          icon: 'star',
          title: 'Featured: Photosynthesis',
          description:
            'Complete 1.5-hour lecture covering Light, Dark reactions, C3-C4-CAM plants.',
        },
        {
          icon: 'star',
          title: 'Featured: Genetics Basics',
          description: '2-hour genetics foundation lecture. Mendelian inheritance complete.',
        },
      ],
    },
    stats: [
      { value: '50+', label: 'Free Hours' },
      { value: '100K+', label: 'Views' },
      { value: '4.8/5', label: 'Rating' },
      { value: 'FREE', label: 'Forever' },
    ],
    testimonials: [
      {
        name: 'Rahul Kumar',
        achievement: 'Started with Free, Now NEET 2024 - 640/720',
        quote:
          'Free lectures convinced me to join full course. Same teacher, same quality. Best decision!',
        score: '640/720',
      },
      {
        name: 'Meera Joshi',
        achievement: 'Tier 3 City Student',
        quote:
          "Couldn't afford coaching initially. Free lectures kept me on track until I could join the paid course.",
      },
      {
        name: 'Vikram Patel',
        achievement: 'NEET 2024 - 615/720',
        quote:
          'Dr. Shekhar explains so clearly even in free content. Photosynthesis lecture was life-changing!',
        score: '615/720',
      },
    ],
    faqs: [
      {
        question: 'Are these lectures really free?',
        answer:
          'Yes, completely free. No hidden charges, no credit card needed. Just register with email and start watching. We offer free content to help all students access quality education.',
      },
      {
        question: 'Do free lectures cover full syllabus?',
        answer:
          'Free lectures cover approximately 30% of syllabus - foundational chapters and selected high-yield topics. Full syllabus coverage is in paid courses.',
      },
      {
        question: "What's the difference between free and paid?",
        answer:
          'Free: Limited chapters, no doubt support, no tests, self-study. Paid: Full syllabus, live classes, doubt support, tests, study material, personal mentoring.',
      },
      {
        question: 'Can I download these lectures?',
        answer:
          'Currently streaming only for copyright protection. But you can bookmark and watch unlimited times. Mobile app coming soon with offline feature.',
      },
      {
        question: 'How to get doubt support for free lectures?',
        answer:
          'Free lectures have comment section for general questions. For personalized doubt resolution, consider our paid programs or join free Sunday doubt sessions (limited slots).',
      },
    ],
    courseSummary: {
      title: 'Free Learning Resources',
      duration: '50+ hours available',
      batchSize: 'Self-paced',
      features: [
        '50+ hours of video content',
        'AIIMS faculty teaching',
        'HD quality videos',
        'Chapter-wise organized',
        'Watch unlimited times',
        'No registration fee',
        'Mobile compatible',
      ],
      price: {
        original: 0,
        discounted: 0,
        emi: 'FREE',
      },
    },
    cta: {
      title: 'Start Free Learning Today',
      subtitle: 'No payment, no commitment. Just quality biology education.',
      primaryButton: {
        text: 'Watch Free Lectures',
        link: '/video-lectures',
      },
      secondaryButton: {
        text: 'Explore Full Courses',
        link: '/courses',
      },
    },
    toolsCTA: resourceToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'Video Lectures', link: '/video-lectures' },
      { title: 'Free MCQ Practice', link: '/tools/neet-mcq' },
      { title: 'Free Mock Tests', link: '/neet-mock-test-free' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'Free NEET Biology Video Lectures',
      provider: 'Cerebrum Biology Academy',
      description: '50+ hours of free NEET biology video lectures by AIIMS faculty',
      duration: '50+ hours',
      price: 0,
      priceCurrency: 'INR',
    },
  },

  // NEET Success Stories Page
  'neet-success-stories': {
    slug: 'neet-success-stories',
    classLevel: 'universal',
    title: 'NEET Success Stories 2024-25 | Student Results',
    metaDescription:
      'NEET success stories from Cerebrum Biology Academy. 1,50,000+ students selected. Read topper interviews, score improvements, and college placements.',
    keywords: [
      'neet success stories',
      'neet biology topper interviews',
      'neet achievers',
      'cerebrum biology academy results',
      'neet 2024 toppers',
      'neet success story',
      'neet preparation success',
      'neet coaching results',
    ],
    hero: {
      headline: 'NEET Success Stories 2024-25',
      subheadline:
        '1,50,000+ students selected in NEET through Cerebrum Biology Academy. Read their inspiring journeys.',
      ctaText: 'Start Your Success Story',
      ctaLink: '/book-demo',
      backgroundGradient: 'from-yellow-800 to-orange-800',
    },
    painPoints: {
      title: 'Success From All Backgrounds',
      points: [
        {
          icon: 'user',
          question: 'Think toppers are always genius?',
          solution:
            'Many of our success stories were average students who improved 200+ marks with right guidance.',
        },
        {
          icon: 'repeat',
          question: 'Worried as a dropper?',
          solution: '40% of our selections are droppers. Second chance often becomes best chance.',
        },
        {
          icon: 'location',
          question: 'Small town, big dreams?',
          solution:
            'Students from 100+ cities succeeded with online coaching. Location no barrier.',
        },
        {
          icon: 'target',
          question: 'Aiming for government college?',
          solution: '70% of our selections got government medical colleges. Dreams achievable.',
        },
      ],
    },
    benefits: {
      title: 'Success Categories',
      subtitle: 'Stories that inspire',
      items: [
        {
          icon: 'star',
          title: 'Toppers (680+ Scores)',
          description: 'Students who scored 680+ with our guidance. All India top ranks achieved.',
        },
        {
          icon: 'checkmark',
          title: 'First Attempt Success',
          description:
            'Class 12 students who cleared NEET in first attempt. Fresh success stories.',
        },
        {
          icon: 'repeat',
          title: 'Dropper Success',
          description:
            'Students who failed first time but succeeded with determination. Comeback stories.',
        },
        {
          icon: 'chart',
          title: 'Improvement Stories',
          description: 'From 300 to 600+. Dramatic score improvements with right strategy.',
        },
        {
          icon: 'building',
          title: 'Government College Selections',
          description: 'Students now in AIIMS, JIPMER, government medical colleges across India.',
        },
        {
          icon: 'globe',
          title: 'Online Success',
          description: 'Students who succeeded purely through online coaching. Proof it works.',
        },
      ],
    },
    stats: [
      { value: '2500+', label: 'Students Selected' },
      { value: '85%', label: 'Selection Rate' },
      { value: '70%', label: 'Govt College' },
      { value: '680+', label: 'Top Scores' },
    ],
    testimonials: [
      {
        name: 'Aditya Sharma',
        achievement: 'NEET 2024 - 695/720, AIIMS Delhi',
        quote:
          'From a small village to AIIMS Delhi. Dr. Shekhar sir believed in me when I doubted myself.',
        score: '695/720',
      },
      {
        name: 'Priya Gupta',
        achievement: 'Dropper - NEET 2024 - 665/720',
        quote:
          'Failed first attempt with 380. Second attempt 665. Online coaching gave me a second chance.',
        score: '665/720',
      },
      {
        name: 'Mohammed Asif',
        achievement: 'NEET 2024 - 640/720, JIPMER',
        quote:
          'Government college was a dream. Now studying at JIPMER. All thanks to Cerebrum guidance.',
        score: '640/720',
      },
    ],
    faqs: [
      {
        question: 'How many students qualify NEET from Cerebrum?',
        answer:
          '1,50,000+ students selected over 5 years. 85% of our students clear NEET cutoff. 70% get government college seats. Results verified with actual names and colleges.',
      },
      {
        question: 'What is the average score improvement?',
        answer:
          'Average improvement is 150-180 marks from baseline test to final NEET. Top improvers have jumped 250+ marks with consistent effort.',
      },
      {
        question: 'Do droppers really succeed with online coaching?',
        answer:
          'Yes! 40% of our selections are droppers. Online coaching actually suits droppers - more study hours, no relocation, focused preparation. Many droppers score 600+.',
      },
      {
        question: 'Which colleges have Cerebrum students joined?',
        answer:
          'AIIMS Delhi, JIPMER, Maulana Azad, KGMC Lucknow, Grant Medical, and 100+ government medical colleges. Private colleges like Manipal, Kasturba, SRMS etc.',
      },
      {
        question: 'Can I talk to successful students?',
        answer:
          'Yes! We connect prospective students with alumni for genuine conversations. Ask during counseling call and we arrange student interaction.',
      },
    ],
    courseSummary: {
      title: 'Join Our Success Legacy',
      duration: '12-month program',
      batchSize: '10-15 students',
      features: [
        '2,500+ success stories',
        '85% selection rate',
        'AIIMS faculty guidance',
        'Proven methodology',
        'Personal mentoring',
        'Complete support system',
      ],
      price: {
        original: 45000,
        discounted: 35000,
        emi: '₹5,833/month',
      },
    },
    cta: {
      title: 'Be Our Next Success Story',
      subtitle: 'Every success story started with a decision. Make yours today.',
      primaryButton: {
        text: 'Start Your Journey',
        link: '/book-demo',
      },
      secondaryButton: {
        text: 'View More Results',
        link: '/results',
      },
    },
    toolsCTA: resourceToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'Results Page', link: '/results' },
      { title: 'Dropper Success', link: '/neet-repeater-success-stories' },
      { title: 'Join Coaching', link: '/courses' },
    ],
    schema: {
      '@type': 'Article',
      courseName: 'NEET Success Stories 2024-25',
      provider: 'Cerebrum Biology Academy',
      description: 'Success stories and results from Cerebrum Biology Academy students',
      duration: 'Varies',
      price: 0,
      priceCurrency: 'INR',
    },
  },
}
