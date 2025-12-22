// International Curriculum SEO Landing Pages Content
// 10 pages targeting GCSE, IGCSE, IB, A-Level, and AP Biology keywords

import { SEOLandingContent } from './types'

// Common contact buttons for international curriculum pages
const defaultContactButtons = {
  phone: '+919871018875',
  whatsapp: {
    number: '+919871018875',
    message:
      'Hi Dr. Shekhar, I am interested in Biology tuition for international curriculum. Please guide me.',
  },
}

// GCSE Biology Tuition Page
const gcseBiologyTuition: SEOLandingContent = {
  slug: 'gcse-biology-tuition',
  classLevel: 'universal',

  title: 'GCSE Biology Tuition Online | Expert UK Tutors',
  metaDescription:
    'Get expert GCSE Biology tuition online from experienced UK curriculum tutors. Master all topics with personalized lessons, past paper practice & guaranteed grade improvement.',
  keywords: [
    'gcse biology tuition',
    'gcse biology tutor near me',
    'gcse biology online tuition',
    'biology tuition gcse',
    'gcse biology classes',
    'gcse biology help',
    'gcse biology revision',
    'aqa gcse biology',
    'edexcel gcse biology',
    'ocr gcse biology',
  ],

  hero: {
    headline: 'GCSE Biology Tuition That Gets You Grade 9',
    subheadline:
      'Expert online tutoring covering AQA, Edexcel & OCR exam boards. Join 500+ UK students who achieved top grades with our proven methodology.',
    highlightedText: 'Grade 9',
    ctaText: 'Start Your Free Trial',
    ctaLink: '/book-demo',
    backgroundGradient: 'from-blue-900 via-purple-900 to-indigo-900',
  },

  painPoints: {
    title: 'Struggling with GCSE Biology?',
    points: [
      {
        icon: 'brain',
        question: 'Finding it hard to memorize complex biological processes?',
        solution:
          'Our visual learning approach uses animations and diagrams to make even photosynthesis and respiration stick in your memory.',
      },
      {
        icon: 'clipboard',
        question: 'Confused by different exam board requirements?',
        solution:
          'We specialize in AQA, Edexcel, and OCR specifications. Your tutor knows exactly what examiners are looking for.',
      },
      {
        icon: 'target',
        question: 'Struggling with 6-mark questions and required practicals?',
        solution:
          'Master extended writing techniques and practical skills with our exam-focused approach that covers all 8 required practicals.',
      },
    ],
  },

  benefits: {
    title: 'Why Choose Us for GCSE Biology',
    subtitle: 'Tailored support for UK curriculum success',
    items: [
      {
        icon: 'book',
        title: 'Exam Board Specialists',
        description:
          'Tutors trained in AQA, Edexcel, and OCR specifications with access to mark schemes and examiner reports.',
      },
      {
        icon: 'video',
        title: 'Interactive Online Lessons',
        description:
          'Live 1-on-1 sessions with shared whiteboard, diagrams, and instant feedback on your understanding.',
      },
      {
        icon: 'clipboard',
        title: 'Past Paper Mastery',
        description:
          'Extensive practice with actual GCSE papers, marked with detailed feedback to improve exam technique.',
      },
      {
        icon: 'users',
        title: 'Required Practicals Covered',
        description:
          'Complete coverage of all 8 required practicals with virtual demonstrations and theory explanations.',
      },
      {
        icon: 'clock',
        title: 'Flexible UK Scheduling',
        description:
          'Book sessions at times that work around your school schedule - evenings and weekends available.',
      },
      {
        icon: 'star',
        title: 'Grade Guarantee',
        description:
          'We are confident in our methods. Students typically improve by 2+ grades within 3 months of regular tutoring.',
      },
    ],
  },

  stats: [
    { value: '95%', label: 'Grade 7+ Achievement', icon: 'trophy' },
    { value: '500+', label: 'UK Students Tutored', icon: 'users' },
    { value: '2+', label: 'Average Grade Improvement', icon: 'trending-up' },
    { value: '4.9/5', label: 'Student Rating', icon: 'star' },
  ],

  testimonials: [
    {
      name: 'Sophie T.',
      achievement: 'Grade 4 → Grade 9',
      quote:
        'I was really struggling with GCSE Biology and predicted a 4. After 4 months of tutoring, I got a 9 in my actual exam! The past paper practice was invaluable.',
      score: 'Grade 9',
    },
    {
      name: 'James M.',
      achievement: 'AQA Triple Science',
      quote:
        'My tutor explained the required practicals so clearly. I finally understood enzyme experiments and could write proper conclusions.',
      score: 'Grade 8',
    },
    {
      name: 'Parent of Emily R.',
      achievement: 'Edexcel Combined Science',
      quote:
        'Emily went from dreading biology to actually enjoying it. The improvement in her confidence and grades has been remarkable.',
      score: 'Grade 7',
    },
  ],

  faqs: [
    {
      question: 'Which GCSE exam boards do you cover?',
      answer:
        'We cover all major UK exam boards including AQA, Edexcel, OCR Gateway, and OCR 21st Century. Your tutor will be matched based on your specific exam board and will have access to relevant past papers and mark schemes.',
    },
    {
      question: 'How quickly can I improve my GCSE Biology grade?',
      answer:
        'Most students see a 1-2 grade improvement within 2-3 months of weekly tutoring. This depends on your starting point, commitment to homework, and session frequency. We provide a realistic improvement plan in your first session.',
    },
    {
      question: 'Do you cover the required practicals for GCSE Biology?',
      answer:
        'Yes, we thoroughly cover all 8 required practicals including food tests, enzymes, osmosis, photosynthesis, reaction time, field investigations, decay, and heart rate. We use virtual demonstrations and ensure you understand the theory behind each practical.',
    },
    {
      question: 'Is online GCSE tutoring as effective as in-person?',
      answer:
        'Research shows online tutoring can be equally or more effective than in-person. Our platform includes interactive whiteboards, diagram tools, and screen sharing. Students often prefer the convenience and focused nature of online sessions.',
    },
    {
      question: 'How much does GCSE Biology tuition cost?',
      answer:
        'Our GCSE Biology tuition packages start from £35/hour for group sessions and £55/hour for 1-on-1 tutoring. We offer discounted packages for multiple sessions per week. Book a free trial to discuss pricing options.',
    },
  ],

  courseSummary: {
    title: 'GCSE Biology Tutoring Package',
    duration: 'Flexible (weekly sessions)',
    batchSize: '1-on-1 or small groups (max 4)',
    features: [
      'All exam boards covered (AQA, Edexcel, OCR)',
      'Past paper practice with marking',
      'Required practicals explained',
      'Revision materials included',
      '24/7 doubt support via chat',
      'Progress reports for parents',
    ],
    price: {
      original: 55,
      discounted: 45,
      emi: 'Packages from £180/month',
    },
  },

  cta: {
    title: 'Ready to Achieve Your Target Grade?',
    subtitle: 'Book a free 30-minute trial lesson with a GCSE Biology specialist',
    primaryButton: {
      text: 'Book Free Trial',
      link: '/book-demo',
    },
    secondaryButton: {
      text: 'View Pricing',
      link: '/courses',
    },
    tertiaryButton: {
      text: 'Free GCSE Resources',
      link: '/resources',
    },
  },

  relatedPages: [
    { title: 'A-Level Biology Tuition', link: '/a-level-biology-tuition' },
    { title: 'IGCSE Biology Tuition', link: '/igcse-biology-tuition' },
    { title: 'Online Biology Classes', link: '/online-biology-tuition-india' },
  ],

  contactButtons: defaultContactButtons,

  schema: {
    courseName: 'GCSE Biology Online Tuition',
    provider: 'Cerebrum Biology Academy',
    description:
      'Expert online GCSE Biology tuition covering AQA, Edexcel, and OCR exam boards with past paper practice and grade guarantee.',
    duration: 'Flexible',
    price: 45,
    priceCurrency: 'GBP',
  },
}

// GCSE Biology Tutor Online Page
const gcseBiologyTutorOnline: SEOLandingContent = {
  slug: 'gcse-biology-tutor-online',
  classLevel: 'universal',

  title: 'GCSE Biology Tutor Online | Expert 1-on-1 Tutoring | Cerebrum Academy',
  metaDescription:
    'Find expert GCSE Biology tutors online. Personalized 1-on-1 lessons for AQA, Edexcel & OCR. Improve grades with experienced UK curriculum specialists.',
  keywords: [
    'gcse biology tutor',
    'gcse biology tutor online',
    'online biology tutor gcse',
    'gcse biology teacher',
    'biology tutor for gcse',
    'find gcse biology tutor',
    'gcse science tutor',
    'gcse biology private tutor',
  ],

  hero: {
    headline: 'Find Your Perfect GCSE Biology Tutor',
    subheadline:
      'Expert online tutors matched to your exam board and learning style. 1-on-1 personalized lessons designed for your success.',
    highlightedText: 'Perfect',
    ctaText: 'Get Matched with a Tutor',
    ctaLink: '/book-demo',
    backgroundGradient: 'from-green-900 via-teal-900 to-blue-900',
  },

  painPoints: {
    title: 'Why Students Choose Our Tutors',
    points: [
      {
        icon: 'search',
        question: "Can't find a tutor who understands your exam board?",
        solution:
          'All our tutors are exam board specialists - matched to AQA, Edexcel, or OCR based on your needs.',
      },
      {
        icon: 'clock',
        question: 'Need flexibility around school and activities?',
        solution:
          'Online tutoring means no travel time. Book sessions when it suits you, including evenings and weekends.',
      },
      {
        icon: 'user',
        question: 'Want personalized attention, not generic lessons?',
        solution:
          'Your tutor creates a custom learning plan targeting your weak areas and building on your strengths.',
      },
    ],
  },

  benefits: {
    title: 'What Makes Our Tutors Different',
    subtitle: 'Carefully vetted, trained, and matched',
    items: [
      {
        icon: 'award',
        title: 'Qualified & Experienced',
        description:
          'All tutors hold biology degrees and have experience teaching the UK curriculum. Many are former examiners.',
      },
      {
        icon: 'target',
        title: 'Exam Board Matched',
        description:
          'We match you with a tutor who specializes in your specific exam board (AQA, Edexcel, or OCR).',
      },
      {
        icon: 'refresh',
        title: 'Free Tutor Switching',
        description:
          "If your tutor isn't the right fit, switch to another at no extra cost until you find your perfect match.",
      },
      {
        icon: 'message',
        title: 'Between-Session Support',
        description:
          'Quick questions between sessions? Your tutor is available via our messaging platform for clarifications.',
      },
      {
        icon: 'file',
        title: 'Detailed Progress Reports',
        description:
          'Parents receive regular updates on progress, areas of improvement, and recommended next steps.',
      },
      {
        icon: 'shield',
        title: 'DBS Checked & Safe',
        description:
          'All tutors are DBS checked with safeguarding training. Your safety is our priority.',
      },
    ],
  },

  stats: [
    { value: '50+', label: 'Expert Biology Tutors', icon: 'users' },
    { value: '100%', label: 'DBS Checked', icon: 'shield' },
    { value: '4.9/5', label: 'Average Tutor Rating', icon: 'star' },
    { value: '24hr', label: 'Tutor Matching', icon: 'clock' },
  ],

  testimonials: [
    {
      name: 'Oliver W.',
      achievement: 'Found perfect tutor match',
      quote:
        'I tried two tutors before but they just didnt click. Cerebrum matched me with Mr. Patel who explains things exactly how I understand. My grades jumped from 5 to 8!',
      score: 'Grade 8',
    },
    {
      name: 'Parent of Amelia K.',
      achievement: 'AQA GCSE Biology',
      quote:
        'The progress reports are excellent - we know exactly what Amelia is working on. Her tutor is patient and really understands how to motivate teenagers.',
      score: 'Grade 9',
    },
  ],

  faqs: [
    {
      question: 'How are GCSE Biology tutors selected and vetted?',
      answer:
        'All tutors must hold a biology degree (minimum 2:1), have at least 2 years teaching experience, pass a subject knowledge test, and complete DBS checks. We also collect student feedback after every session to maintain quality.',
    },
    {
      question: 'Can I switch tutors if my current one isnt right?',
      answer:
        'Absolutely! We understand that tutor-student fit is crucial. You can switch tutors for free at any time until you find the perfect match for your learning style.',
    },
    {
      question: 'How do you match students with tutors?',
      answer:
        'We consider your exam board, areas of difficulty, learning style preferences, schedule, and personality. After your free trial, we refine the match based on feedback.',
    },
    {
      question: 'What qualifications do your GCSE Biology tutors have?',
      answer:
        'Our tutors hold degrees in biology, biochemistry, or related sciences from UK universities. Many have teaching qualifications (PGCE) and some are current or former GCSE examiners.',
    },
  ],

  courseSummary: {
    title: 'Personal GCSE Biology Tutor',
    duration: 'Ongoing (flexible scheduling)',
    batchSize: '1-on-1 only',
    features: [
      'Matched to your exam board',
      'Custom learning plan',
      'Flexible scheduling',
      'Progress tracking dashboard',
      'Free tutor switching',
      'DBS checked tutors',
    ],
    price: {
      original: 60,
      discounted: 50,
      emi: 'From £200/month (4 sessions)',
    },
  },

  cta: {
    title: 'Get Matched with Your Ideal Tutor',
    subtitle: 'Free consultation to understand your needs and find the perfect fit',
    primaryButton: {
      text: 'Start Free Matching',
      link: '/book-demo',
    },
    secondaryButton: {
      text: 'Meet Our Tutors',
      link: '/about',
    },
    tertiaryButton: {
      text: 'Free Study Tips',
      link: '/resources',
    },
  },

  relatedPages: [
    { title: 'GCSE Biology Tuition', link: '/gcse-biology-tuition' },
    { title: 'A-Level Biology Tutor', link: '/a-level-biology-tutor' },
    { title: 'IGCSE Biology Tutor', link: '/igcse-biology-tutor' },
  ],

  contactButtons: defaultContactButtons,

  schema: {
    courseName: 'GCSE Biology Online Tutoring',
    provider: 'Cerebrum Biology Academy',
    description:
      'Expert 1-on-1 GCSE Biology tutors online, matched to your exam board and learning style for personalized grade improvement.',
    duration: 'Flexible',
    price: 50,
    priceCurrency: 'GBP',
  },
}

// IGCSE Biology Tuition Page
const igcseBiologyTuition: SEOLandingContent = {
  slug: 'igcse-biology-tuition',
  classLevel: 'universal',

  title: 'IGCSE Biology Tuition Online | Cambridge CIE Specialists',
  metaDescription:
    'Expert IGCSE Biology tuition for Cambridge International. Master all topics with experienced tutors, past paper practice & achieve A* grades.',
  keywords: [
    'igcse biology tuition',
    'cambridge igcse biology',
    'igcse biology online tuition',
    'igcse biology classes',
    'cie biology tuition',
    'cambridge biology tuition',
    'igcse biology help',
    'igcse biology 0610',
    'igcse biology 0970',
  ],

  hero: {
    headline: 'Master Cambridge IGCSE Biology',
    subheadline:
      'Expert tutoring for IGCSE Biology 0610 & 0970. Join students from 40+ countries achieving A* grades with our proven methodology.',
    highlightedText: 'A*',
    ctaText: 'Book Free Trial',
    ctaLink: '/book-demo',
    backgroundGradient: 'from-purple-900 via-indigo-900 to-blue-900',
  },

  painPoints: {
    title: 'IGCSE Biology Challenges We Solve',
    points: [
      {
        icon: 'globe',
        question: 'Studying at an international school with limited biology support?',
        solution:
          'Our tutors specialize in Cambridge International curriculum and provide the expert guidance your school may lack.',
      },
      {
        icon: 'file',
        question: 'Struggling with Paper 6 practical questions?',
        solution:
          'We focus heavily on Alternative to Practical skills, teaching you how to analyze experiments and draw conclusions.',
      },
      {
        icon: 'calculator',
        question: 'Finding the extended curriculum content challenging?',
        solution:
          'Our tutors break down complex topics like genetic engineering and homeostasis into digestible, memorable chunks.',
      },
    ],
  },

  benefits: {
    title: 'Why Choose Us for IGCSE Biology',
    subtitle: 'Cambridge International expertise you can trust',
    items: [
      {
        icon: 'book',
        title: 'CIE Syllabus Specialists',
        description:
          'Tutors trained specifically in Cambridge IGCSE Biology (0610/0970) with deep understanding of assessment objectives.',
      },
      {
        icon: 'globe',
        title: 'Global Time Zone Coverage',
        description:
          'Teaching students in UAE, Singapore, Hong Kong, and worldwide with sessions scheduled for your local time.',
      },
      {
        icon: 'clipboard',
        title: 'Paper-Specific Preparation',
        description:
          'Targeted practice for Paper 2, Paper 4, and Paper 6 with focus on command words and mark allocation.',
      },
      {
        icon: 'lightbulb',
        title: 'Extended Curriculum Ready',
        description:
          'Full preparation for A* including all extended topics not covered in core curriculum.',
      },
      {
        icon: 'file',
        title: 'Past Paper Bank',
        description:
          'Access to 10+ years of Cambridge past papers with worked solutions and examiner insights.',
      },
      {
        icon: 'video',
        title: 'Recorded Revision',
        description: 'All sessions are recorded so you can rewatch explanations before exams.',
      },
    ],
  },

  stats: [
    { value: '92%', label: 'A*/A Achievement', icon: 'trophy' },
    { value: '40+', label: 'Countries Served', icon: 'globe' },
    { value: '1000+', label: 'IGCSE Students', icon: 'users' },
    { value: '10+', label: 'Years Past Papers', icon: 'file' },
  ],

  testimonials: [
    {
      name: 'Arjun S.',
      achievement: 'Dubai International School',
      quote:
        'Living in Dubai, I couldnt find good biology tutors locally. Cerebrum tutors understand IGCSE perfectly and helped me get an A* in both Core and Extended.',
      score: 'A* Grade',
    },
    {
      name: 'Parent of Wei L.',
      achievement: 'Singapore Student',
      quote:
        'The time difference was handled perfectly - sessions at 7pm Singapore time. Wei improved from a C to an A in one term.',
      score: 'A Grade',
    },
    {
      name: 'Fatima A.',
      achievement: 'Paper 6 Success',
      quote:
        'Paper 6 practical questions always confused me. My tutor taught me a systematic approach and I scored full marks in my final exam!',
      score: 'A* Grade',
    },
  ],

  faqs: [
    {
      question: 'Do you cover both IGCSE Biology 0610 and 0970?',
      answer:
        'Yes, we cover both the standard IGCSE Biology (0610) and the newer 9-1 graded syllabus (0970). Our tutors are updated on the latest syllabus changes and assessment criteria for both.',
    },
    {
      question: 'How do you prepare students for Paper 6 (Alternative to Practical)?',
      answer:
        'Paper 6 requires specific skills: designing experiments, analyzing data, and evaluating methods. We use past paper questions, virtual labs, and structured frameworks to build these skills systematically.',
    },
    {
      question: 'What time zones can you accommodate for IGCSE tutoring?',
      answer:
        'We have tutors available from 6am to 11pm GMT, covering students in Middle East, Asia, Africa, and Europe. Popular slots in Dubai (7-9pm GST), Singapore (7-9pm SGT), and UK (4-8pm GMT) are available.',
    },
    {
      question: 'Do you provide resources aligned with Cambridge textbooks?',
      answer:
        'Yes, we work alongside popular IGCSE textbooks including Mary Jones (Cambridge) and D G Mackean. We supplement with our own notes, past paper compilations, and revision guides.',
    },
  ],

  courseSummary: {
    title: 'IGCSE Biology Complete Package',
    duration: 'Full academic year or intensive',
    batchSize: '1-on-1 or small groups (max 3)',
    features: [
      'Core + Extended curriculum',
      'Paper 2, 4, and 6 preparation',
      'Past papers with solutions',
      'Session recordings included',
      'Flexible global scheduling',
      'WhatsApp doubt support',
    ],
    price: {
      original: 50,
      discounted: 40,
      emi: 'Packages from $150/month',
    },
  },

  cta: {
    title: 'Achieve A* in Cambridge IGCSE Biology',
    subtitle: 'Start with a free assessment to identify your current level and improvement areas',
    primaryButton: {
      text: 'Book Free Assessment',
      link: '/book-demo',
    },
    secondaryButton: {
      text: 'View Packages',
      link: '/courses',
    },
    tertiaryButton: {
      text: 'Free IGCSE Notes',
      link: '/resources',
    },
  },

  relatedPages: [
    { title: 'IGCSE Biology Tutor', link: '/igcse-biology-tutor' },
    { title: 'A-Level Biology Tuition', link: '/a-level-biology-tuition' },
    { title: 'GCSE Biology Tuition', link: '/gcse-biology-tuition' },
  ],

  contactButtons: defaultContactButtons,

  schema: {
    courseName: 'Cambridge IGCSE Biology Tuition',
    provider: 'Cerebrum Biology Academy',
    description:
      'Expert online IGCSE Biology tuition for Cambridge International students worldwide, covering 0610 and 0970 syllabi.',
    duration: 'Flexible',
    price: 40,
    priceCurrency: 'USD',
  },
}

// IGCSE Biology Tutor Page
const igcseBiologyTutor: SEOLandingContent = {
  slug: 'igcse-biology-tutor',
  classLevel: 'universal',

  title: 'IGCSE Biology Tutor | Cambridge Expert Tutors Online',
  metaDescription:
    'Find expert IGCSE Biology tutors online. Cambridge trained specialists for 0610 & 0970 syllabus. Personalized 1-on-1 tutoring for A* grades.',
  keywords: [
    'igcse biology tutor',
    'igcse biology tutor online',
    'cambridge igcse biology tutor',
    'igcse biology coursebook',
    'igcse biology teacher',
    'find igcse tutor',
    'online igcse tutor',
    'cie biology tutor',
  ],

  hero: {
    headline: 'Expert IGCSE Biology Tutors at Your Fingertips',
    subheadline:
      'Cambridge-trained specialists who know exactly what examiners want. Get matched with your ideal tutor in 24 hours.',
    highlightedText: 'Expert',
    ctaText: 'Find Your Tutor',
    ctaLink: '/book-demo',
    backgroundGradient: 'from-teal-900 via-cyan-900 to-blue-900',
  },

  painPoints: {
    title: 'Finding the Right IGCSE Tutor',
    points: [
      {
        icon: 'search',
        question: "Can't find tutors who know Cambridge curriculum?",
        solution:
          'Every tutor in our network is trained specifically in Cambridge IGCSE requirements and assessment criteria.',
      },
      {
        icon: 'globe',
        question: 'Living abroad with limited access to quality tutors?',
        solution:
          'Online tutoring connects you with the best IGCSE specialists regardless of your location.',
      },
      {
        icon: 'target',
        question: 'Need help with specific papers or topics?',
        solution:
          'Our tutors can focus on your exact needs - whether Paper 6 practicals or specific syllabus points.',
      },
    ],
  },

  benefits: {
    title: 'Our IGCSE Biology Tutors',
    subtitle: 'Carefully selected Cambridge specialists',
    items: [
      {
        icon: 'award',
        title: 'Cambridge Trained',
        description:
          'Tutors with experience teaching Cambridge curriculum in international schools or as private educators.',
      },
      {
        icon: 'check',
        title: 'Syllabus Expertise',
        description:
          'Deep understanding of 0610/0970 learning objectives, assessment criteria, and command words.',
      },
      {
        icon: 'globe',
        title: 'International Experience',
        description:
          'Many tutors have taught in international schools across UAE, Singapore, India, and Europe.',
      },
      {
        icon: 'message',
        title: 'Responsive Support',
        description: 'Quick responses to questions between sessions via our messaging platform.',
      },
      {
        icon: 'file',
        title: 'Resource Rich',
        description:
          'Access to past papers, mark schemes, examiner reports, and custom revision materials.',
      },
      {
        icon: 'refresh',
        title: 'Free Trial & Switching',
        description: 'Try before you commit. Switch tutors anytime if the match is not right.',
      },
    ],
  },

  stats: [
    { value: '30+', label: 'IGCSE Specialists', icon: 'users' },
    { value: '90%', label: 'Student Satisfaction', icon: 'heart' },
    { value: '24hr', label: 'Tutor Matching', icon: 'clock' },
    { value: 'A*', label: 'Average Result', icon: 'star' },
  ],

  testimonials: [
    {
      name: 'Priya M.',
      achievement: 'GEMS School Dubai',
      quote:
        'My tutor understood exactly what Cambridge wants. She taught me how to answer questions properly and I went from B to A* in one year.',
      score: 'A* Grade',
    },
    {
      name: 'Tom H.',
      achievement: 'British School Manila',
      quote:
        'Finding a quality IGCSE tutor in Manila was impossible. Online tutoring with Cerebrum solved everything - great tutor, flexible times.',
      score: 'A Grade',
    },
  ],

  faqs: [
    {
      question: 'What qualifications do your IGCSE Biology tutors have?',
      answer:
        'Our tutors hold degrees in biological sciences, have experience teaching IGCSE curriculum, and complete our Cambridge-specific training program covering assessment objectives, mark schemes, and examiner expectations.',
    },
    {
      question: 'Can tutors help with the coursebook and textbook exercises?',
      answer:
        'Absolutely. Our tutors are familiar with popular IGCSE textbooks including Cambridge Coursebook and can help with exercises, end-of-chapter questions, and relate textbook content to exam requirements.',
    },
    {
      question: 'How do online IGCSE tutoring sessions work?',
      answer:
        'Sessions are conducted via video call with a shared digital whiteboard. Your tutor can draw diagrams, annotate past papers, and you can work through problems together in real-time. Sessions are recorded for revision.',
    },
    {
      question: 'Do you offer group tutoring for IGCSE Biology?',
      answer:
        'Yes, we offer small group sessions (2-3 students) at reduced rates. This works well for friends studying together or classmates wanting to share costs while getting quality instruction.',
    },
  ],

  courseSummary: {
    title: 'IGCSE Biology Tutoring',
    duration: 'Flexible scheduling',
    batchSize: '1-on-1 or pairs',
    features: [
      'Cambridge trained tutors',
      'All papers covered',
      'Past paper practice',
      'Session recordings',
      'Progress tracking',
      'Free tutor matching',
    ],
    price: {
      original: 45,
      discounted: 38,
      emi: 'From $150/month',
    },
  },

  cta: {
    title: 'Find Your IGCSE Biology Expert',
    subtitle: 'Free matching call to understand your needs and find the perfect tutor',
    primaryButton: {
      text: 'Get Matched Free',
      link: '/book-demo',
    },
    secondaryButton: {
      text: 'View Tutor Profiles',
      link: '/about',
    },
    tertiaryButton: {
      text: 'IGCSE Resources',
      link: '/resources',
    },
  },

  relatedPages: [
    { title: 'IGCSE Biology Tuition', link: '/igcse-biology-tuition' },
    { title: 'A-Level Biology Tutor', link: '/a-level-biology-tutor' },
    { title: 'IB Biology Tutor', link: '/ib-biology-tutor-online' },
  ],

  contactButtons: defaultContactButtons,

  schema: {
    courseName: 'IGCSE Biology Tutoring',
    provider: 'Cerebrum Biology Academy',
    description:
      'Expert IGCSE Biology tutors online, specialized in Cambridge International curriculum for students worldwide.',
    duration: 'Flexible',
    price: 38,
    priceCurrency: 'USD',
  },
}

// IB Biology Tuition Page
const ibBiologyTuition: SEOLandingContent = {
  slug: 'ib-biology-tuition',
  classLevel: 'universal',

  title: 'IB Biology Tuition Online | HL & SL Expert Tutors | Cerebrum Academy',
  metaDescription:
    'Expert IB Biology tuition for Higher and Standard Level. Master all topics, IA support & exam prep with experienced IB tutors. Achieve 7 in IB Biology.',
  keywords: [
    'ib biology tuition',
    'ib biology tutor',
    'ib biology hl',
    'ib biology sl',
    'biology ib tutor',
    'ib biology classes',
    'ib biology help',
    'international baccalaureate biology',
    'ib biology ia help',
    'ib biology exam prep',
  ],

  hero: {
    headline: 'Score 7 in IB Biology HL & SL',
    subheadline:
      'Expert IB tutoring covering all topics, Internal Assessment support, and exam preparation. Join 300+ IB students who achieved top scores.',
    highlightedText: '7',
    ctaText: 'Start Your IB Journey',
    ctaLink: '/book-demo',
    backgroundGradient: 'from-indigo-900 via-blue-900 to-purple-900',
  },

  painPoints: {
    title: 'IB Biology Challenges We Solve',
    points: [
      {
        icon: 'layers',
        question: 'Overwhelmed by the depth of IB Biology content?',
        solution:
          'We break down complex topics like molecular biology and genetics into clear, connected concepts you can actually understand.',
      },
      {
        icon: 'file',
        question: 'Stressed about your Internal Assessment?',
        solution:
          'Get expert guidance on choosing topics, designing experiments, data analysis, and scientific writing for top IA marks.',
      },
      {
        icon: 'target',
        question: 'Struggling with Paper 2 and 3 long-answer questions?',
        solution:
          'Learn the exact structure and content IB examiners want using real mark schemes and examiner reports.',
      },
    ],
  },

  benefits: {
    title: 'Why Choose Us for IB Biology',
    subtitle: 'Comprehensive IB Diploma support',
    items: [
      {
        icon: 'book',
        title: 'HL & SL Expertise',
        description:
          'Tutors experienced in both Higher and Standard Level, understanding the different depth and breadth requirements.',
      },
      {
        icon: 'clipboard',
        title: 'IA Specialist Support',
        description:
          'Dedicated guidance for your Internal Assessment from topic selection through to final submission.',
      },
      {
        icon: 'file',
        title: 'All Papers Covered',
        description:
          'Comprehensive preparation for Paper 1 (MCQ), Paper 2 (data questions), and Paper 3 (extended response).',
      },
      {
        icon: 'layers',
        title: 'Option Topics',
        description:
          'Full coverage of all HL options including Human Physiology, Biotechnology, Ecology, and Neurobiology.',
      },
      {
        icon: 'flask',
        title: 'Practical Skills',
        description:
          'Develop lab skills and data analysis techniques essential for IB Biology success.',
      },
      {
        icon: 'calendar',
        title: 'Exam Timeline Support',
        description:
          'Structured revision plans aligned with your exam schedule and school deadlines.',
      },
    ],
  },

  stats: [
    { value: '85%', label: 'Score 6 or 7', icon: 'trophy' },
    { value: '300+', label: 'IB Students', icon: 'users' },
    { value: '6.2', label: 'Average Score', icon: 'star' },
    { value: '95%', label: 'IA Success Rate', icon: 'file' },
  ],

  testimonials: [
    {
      name: 'Maya R.',
      achievement: 'IB Biology HL',
      quote:
        'I was struggling with molecular biology and genetics. My tutor made these topics click and I went from predicted 4 to final score 7!',
      score: '7/7',
    },
    {
      name: 'Lucas D.',
      achievement: 'IA Support',
      quote:
        'The IA guidance was incredible. My tutor helped me design a proper experiment and write it up scientifically. I got 23/24 on my IA!',
      score: '23/24 IA',
    },
    {
      name: 'Parent of Ana K.',
      achievement: 'IB Biology SL',
      quote:
        'Ana was overwhelmed with the IB workload. The structured approach and weekly sessions helped her manage biology alongside other subjects.',
      score: '6/7',
    },
  ],

  faqs: [
    {
      question: 'Do you help with the IB Biology Internal Assessment?',
      answer:
        'Yes, IA support is a major focus. We help with topic selection, experimental design, data collection guidance, statistical analysis, and scientific writing. We ensure your IA meets all IB criteria while maintaining academic integrity.',
    },
    {
      question: 'What is the difference between IB Biology HL and SL tutoring?',
      answer:
        'HL requires deeper understanding of core topics plus an option topic (Neurobiology, Human Physiology, etc.). Our tutoring adapts to your level - SL focuses on core mastery, while HL includes extension material and option preparation.',
    },
    {
      question: 'How do you prepare students for IB Biology Paper 3?',
      answer:
        'Paper 3 tests your option topic and data-based questions. We practice with past papers, teach you to analyze unfamiliar data, and ensure you know your chosen option thoroughly. Many students find Paper 3 their highest scoring paper after our preparation.',
    },
    {
      question: 'Can you help if my predicted grade is low?',
      answer:
        'Absolutely. Many students come to us with low predicted grades and significantly improve. We identify specific gaps, build understanding systematically, and use targeted past paper practice to boost exam performance.',
    },
  ],

  courseSummary: {
    title: 'IB Biology Complete Support',
    duration: 'Year 1 & Year 2 IB',
    batchSize: '1-on-1 focused',
    features: [
      'HL and SL coverage',
      'Internal Assessment support',
      'All paper types practiced',
      'Option topic preparation',
      'Past paper bank access',
      'Revision material provided',
    ],
    price: {
      original: 60,
      discounted: 50,
      emi: 'From $200/month',
    },
  },

  cta: {
    title: 'Achieve Your Target IB Biology Score',
    subtitle: 'Book a free consultation to discuss your current level and goals',
    primaryButton: {
      text: 'Book Free Consultation',
      link: '/book-demo',
    },
    secondaryButton: {
      text: 'See Pricing Plans',
      link: '/courses',
    },
    tertiaryButton: {
      text: 'Free IB Resources',
      link: '/resources',
    },
  },

  relatedPages: [
    { title: 'IB Biology Tutor Online', link: '/ib-biology-tutor-online' },
    { title: 'A-Level Biology Tuition', link: '/a-level-biology-tuition' },
    { title: 'IGCSE Biology Tuition', link: '/igcse-biology-tuition' },
  ],

  contactButtons: defaultContactButtons,

  schema: {
    courseName: 'IB Biology Tuition',
    provider: 'Cerebrum Biology Academy',
    description:
      'Expert online IB Biology tuition for Higher and Standard Level students, including IA support and exam preparation.',
    duration: '2 years (IB Diploma)',
    price: 50,
    priceCurrency: 'USD',
  },
}

// IB Biology Tutor Online Page
const ibBiologyTutorOnline: SEOLandingContent = {
  slug: 'ib-biology-tutor-online',
  classLevel: 'universal',

  title: 'IB Biology Tutor Online | Expert HL & SL Tutors | Cerebrum Academy',
  metaDescription:
    'Find expert IB Biology tutors online. Specialists in HL & SL curriculum, IA guidance & exam prep. Personalized 1-on-1 tutoring for IB success.',
  keywords: [
    'ib biology tutor',
    'ib biology tutor online',
    'biology ib tutor',
    'ib biology online tutor',
    'ib biology teacher',
    'find ib biology tutor',
    'ib diploma biology tutor',
    'ib biology hl tutor',
  ],

  hero: {
    headline: 'Find Your Perfect IB Biology Tutor',
    subheadline:
      'Expert IB specialists who understand the Diploma Program. Get matched with a tutor who fits your learning style and goals.',
    highlightedText: 'Perfect',
    ctaText: 'Get Matched Now',
    ctaLink: '/book-demo',
    backgroundGradient: 'from-violet-900 via-purple-900 to-fuchsia-900',
  },

  painPoints: {
    title: 'Why IB Students Choose Our Tutors',
    points: [
      {
        icon: 'search',
        question: "Can't find tutors who truly understand IB?",
        solution:
          'Our tutors have taught IB Biology in IB World Schools and understand the unique demands of the Diploma Program.',
      },
      {
        icon: 'clock',
        question: 'Juggling multiple IB subjects with limited time?',
        solution:
          'Efficient, focused sessions that maximize learning. We respect your time and other commitments.',
      },
      {
        icon: 'award',
        question: 'Need IA guidance that maintains academic integrity?',
        solution:
          'We guide without doing the work for you - teaching you to think like a scientist while meeting all IB criteria.',
      },
    ],
  },

  benefits: {
    title: 'What Makes Our IB Tutors Special',
    subtitle: 'Experienced IB educators',
    items: [
      {
        icon: 'award',
        title: 'IB World School Experience',
        description:
          'Tutors who have taught in IB schools understand the culture, expectations, and challenges of the Diploma.',
      },
      {
        icon: 'file',
        title: 'IA Expertise',
        description:
          'Guidance on all aspects of Internal Assessment while maintaining strict academic integrity standards.',
      },
      {
        icon: 'target',
        title: 'Assessment Focus',
        description:
          'Deep understanding of IB assessment criteria, command terms, and what examiners look for.',
      },
      {
        icon: 'layers',
        title: 'Option Specialists',
        description:
          'Tutors available for all HL options: Neurobiology, Human Physiology, Biotechnology, and Ecology.',
      },
      {
        icon: 'globe',
        title: 'Global Availability',
        description:
          'IB students worldwide from Americas to Asia - we have tutors in suitable time zones.',
      },
      {
        icon: 'heart',
        title: 'IB Student Wellbeing',
        description:
          'We understand IB stress. Our tutors are supportive mentors, not just teachers.',
      },
    ],
  },

  stats: [
    { value: '25+', label: 'IB Specialist Tutors', icon: 'users' },
    { value: '6+', label: 'Average Student Score', icon: 'star' },
    { value: '100%', label: 'IA Guidance Success', icon: 'check' },
    { value: '4.9/5', label: 'Tutor Rating', icon: 'heart' },
  ],

  testimonials: [
    {
      name: 'Sophie C.',
      achievement: 'IB Biology HL',
      quote:
        'My tutor was an ex-IB teacher and examiner. She knew exactly how to answer questions for maximum marks. I scored a 7!',
      score: '7/7',
    },
    {
      name: 'Raj P.',
      achievement: 'IB Biology SL',
      quote:
        'Biology was my weakest subject. My tutor helped me understand concepts I had struggled with for months in just a few sessions.',
      score: '6/7',
    },
  ],

  faqs: [
    {
      question: 'Do your tutors have IB teaching experience?',
      answer:
        'Yes, all our IB Biology tutors have experience teaching in IB World Schools or as IB examiners. They understand the IB philosophy, assessment criteria, and what the Diploma Program demands of students.',
    },
    {
      question: 'Can tutors help with Extended Essay in Biology?',
      answer:
        'While our primary focus is on the Biology course, some tutors can provide guidance on Biology-focused Extended Essays. This includes research question refinement, methodology advice, and scientific writing.',
    },
    {
      question: 'How do you match students with IB tutors?',
      answer:
        'We consider your level (HL/SL), specific topics of difficulty, option topic, timezone, learning style, and personality. After a free trial, we refine the match based on feedback.',
    },
    {
      question: 'What if I need help with a specific IB Biology topic?',
      answer:
        'Absolutely fine! Many students come for help with specific challenging topics like molecular biology, genetics, or ecology. We can focus sessions entirely on your problem areas.',
    },
  ],

  courseSummary: {
    title: 'IB Biology Tutoring',
    duration: 'Flexible (ongoing support)',
    batchSize: '1-on-1 personalized',
    features: [
      'IB specialist tutors',
      'HL and SL expertise',
      'IA guidance included',
      'All options available',
      'Flexible scheduling',
      'Trial session free',
    ],
    price: {
      original: 55,
      discounted: 48,
      emi: 'From $190/month',
    },
  },

  cta: {
    title: 'Connect with an IB Biology Expert',
    subtitle: 'Free matching session to find your ideal tutor',
    primaryButton: {
      text: 'Start Free Matching',
      link: '/book-demo',
    },
    secondaryButton: {
      text: 'Our IB Tutors',
      link: '/about',
    },
    tertiaryButton: {
      text: 'IB Study Tips',
      link: '/resources',
    },
  },

  relatedPages: [
    { title: 'IB Biology Tuition', link: '/ib-biology-tuition' },
    { title: 'A-Level Biology Tutor', link: '/a-level-biology-tutor' },
    { title: 'IGCSE Biology Tutor', link: '/igcse-biology-tutor' },
  ],

  contactButtons: defaultContactButtons,

  schema: {
    courseName: 'IB Biology Online Tutoring',
    provider: 'Cerebrum Biology Academy',
    description:
      'Expert IB Biology tutors online for Higher and Standard Level students, with specialized IA support and exam preparation.',
    duration: 'Flexible',
    price: 48,
    priceCurrency: 'USD',
  },
}

// A-Level Biology Tutor Page
const aLevelBiologyTutor: SEOLandingContent = {
  slug: 'a-level-biology-tutor',
  classLevel: 'universal',

  title: 'A-Level Biology Tutor Online | AQA, OCR, Edexcel Experts',
  metaDescription:
    'Find expert A-Level Biology tutors online. Specialists in AQA, OCR & Edexcel. Personalized 1-on-1 tutoring for A* grades. Book your free trial today.',
  keywords: [
    'a level biology tutor online',
    'alevel biology tutor',
    'a-level biology tutor',
    'a level biology teacher',
    'as level biology tutor',
    'a2 biology tutor',
    'online a level biology tutor',
    'find a level biology tutor',
    'private a level biology tutor',
  ],

  hero: {
    headline: 'A-Level Biology Tutors Who Deliver A*s',
    subheadline:
      'Expert tutors for AQA, OCR, and Edexcel A-Level Biology. Get matched with a specialist who knows your exam board inside out.',
    highlightedText: 'A*s',
    ctaText: 'Find Your Tutor',
    ctaLink: '/book-demo',
    backgroundGradient: 'from-emerald-900 via-teal-900 to-cyan-900',
  },

  painPoints: {
    title: 'Why A-Level Students Need Expert Tutors',
    points: [
      {
        icon: 'brain',
        question: 'A-Level content is a huge jump from GCSE?',
        solution:
          'Our tutors bridge the gap, building on your GCSE knowledge while introducing A-Level depth and complexity at the right pace.',
      },
      {
        icon: 'file',
        question: 'Struggling with 6-mark and 9-mark questions?',
        solution:
          'Learn exactly what examiners want with structured answer techniques using real mark schemes and examiner reports.',
      },
      {
        icon: 'flask',
        question: 'Practical endorsement causing stress?',
        solution:
          'Full preparation for required practicals and CPAC skills assessment with clear explanations and virtual demonstrations.',
      },
    ],
  },

  benefits: {
    title: 'Our A-Level Biology Tutors',
    subtitle: 'The expertise you need for top grades',
    items: [
      {
        icon: 'book',
        title: 'Exam Board Specialists',
        description:
          'Tutors matched to your exact exam board - AQA, OCR A, OCR B (Salters-Nuffield), Edexcel, or WJEC.',
      },
      {
        icon: 'award',
        title: 'Qualified Experts',
        description:
          'Degree-qualified biologists, many with teaching qualifications and examiner experience.',
      },
      {
        icon: 'target',
        title: 'Exam Technique Focus',
        description:
          'Master the art of answering A-Level questions - from MCQs to extended response.',
      },
      {
        icon: 'flask',
        title: 'Practical Skills',
        description:
          'Full coverage of required practicals and preparation for practical endorsement.',
      },
      {
        icon: 'calendar',
        title: 'Synoptic Preparation',
        description:
          'Expert help connecting topics across the two-year course for synoptic assessment.',
      },
      {
        icon: 'message',
        title: 'Beyond Sessions',
        description: 'Quick question support between sessions so you are never stuck for long.',
      },
    ],
  },

  stats: [
    { value: '40+', label: 'A-Level Tutors', icon: 'users' },
    { value: '90%', label: 'A*/A Achievement', icon: 'trophy' },
    { value: '5+', label: 'Exam Boards Covered', icon: 'book' },
    { value: '4.9/5', label: 'Student Rating', icon: 'star' },
  ],

  testimonials: [
    {
      name: 'Emma B.',
      achievement: 'AQA A-Level Biology',
      quote:
        'My tutor knew AQA inside out. She predicted which topics would come up and taught me exactly how examiners mark. I got an A*!',
      score: 'A* Grade',
    },
    {
      name: 'Daniel K.',
      achievement: 'OCR A Biology',
      quote:
        'The jump from GCSE was terrifying. My tutor helped me develop university-level thinking while keeping content manageable. A in the end!',
      score: 'A Grade',
    },
    {
      name: 'Parent of Lily M.',
      achievement: 'Edexcel A-Level',
      quote:
        'Lily found a tutor who not only knew the content but genuinely cared about her success. The confidence boost was as valuable as the grades.',
      score: 'A Grade',
    },
  ],

  faqs: [
    {
      question: 'Which A-Level Biology exam boards do your tutors cover?',
      answer:
        'We have specialist tutors for all major exam boards: AQA, OCR A, OCR B (Salters-Nuffield), Edexcel (Pearson), and WJEC. You will be matched with a tutor who knows your specific specification.',
    },
    {
      question: 'Can tutors help with A-Level Biology practicals?',
      answer:
        'Yes, we cover all required practicals (12 for AQA, 12 for OCR, etc.). While you will complete practicals in school, we ensure you understand the theory, can analyze data, and are prepared for practical-based exam questions.',
    },
    {
      question: 'Do you offer AS Level Biology tutoring?',
      answer:
        'Absolutely. Whether you are taking AS as a standalone qualification or as Year 1 of A-Level, we have tutors who can help with the specific content and assessment style.',
    },
    {
      question: 'How do A-Level tutoring sessions work?',
      answer:
        'Sessions are conducted online via video call with a shared digital whiteboard. Your tutor can explain concepts, work through questions with you, and provide instant feedback. Sessions are recorded for your revision.',
    },
  ],

  courseSummary: {
    title: 'A-Level Biology Tutoring',
    duration: 'Year 12 & 13 support',
    batchSize: '1-on-1 focused',
    features: [
      'All exam boards covered',
      'AS and A2 content',
      'Practical endorsement prep',
      'Past paper practice',
      'Session recordings',
      'Between-session support',
    ],
    price: {
      original: 55,
      discounted: 45,
      emi: 'From £180/month',
    },
  },

  cta: {
    title: 'Find Your A-Level Biology Expert',
    subtitle: 'Free trial session to experience our tutoring firsthand',
    primaryButton: {
      text: 'Book Free Trial',
      link: '/book-demo',
    },
    secondaryButton: {
      text: 'Meet Our Tutors',
      link: '/about',
    },
    tertiaryButton: {
      text: 'Free A-Level Resources',
      link: '/resources',
    },
  },

  relatedPages: [
    { title: 'A-Level Biology Tuition', link: '/a-level-biology-tuition' },
    { title: 'GCSE Biology Tutor', link: '/gcse-biology-tutor-online' },
    { title: 'IB Biology Tutor', link: '/ib-biology-tutor-online' },
  ],

  contactButtons: defaultContactButtons,

  schema: {
    courseName: 'A-Level Biology Tutoring',
    provider: 'Cerebrum Biology Academy',
    description:
      'Expert A-Level Biology tutors online for AQA, OCR, and Edexcel, providing personalized 1-on-1 tutoring for A* grades.',
    duration: '2 years',
    price: 45,
    priceCurrency: 'GBP',
  },
}

// A-Level Biology Tuition Page
const aLevelBiologyTuition: SEOLandingContent = {
  slug: 'a-level-biology-tuition',
  classLevel: 'universal',

  title: 'A-Level Biology Tuition Online | Expert UK Tutors',
  metaDescription:
    'Expert A-Level Biology tuition online for AQA, OCR & Edexcel. Comprehensive coverage of all topics, practicals & exam prep. Achieve A* with our proven methods.',
  keywords: [
    'a level biology tuition',
    'as level biology',
    'a level biology online',
    'a level biology classes',
    'a level biology course',
    'a level biology help',
    'a2 biology tuition',
    'advanced level biology',
    'sixth form biology tuition',
  ],

  hero: {
    headline: 'A-Level Biology Tuition for A* Success',
    subheadline:
      'Comprehensive online tuition covering all exam boards. From cell biology to ecology, master every topic with expert guidance.',
    highlightedText: 'A*',
    ctaText: 'Start Learning Today',
    ctaLink: '/book-demo',
    backgroundGradient: 'from-green-900 via-emerald-900 to-teal-900',
  },

  painPoints: {
    title: 'A-Level Biology Challenges We Solve',
    points: [
      {
        icon: 'layers',
        question: 'Overwhelmed by the sheer volume of content?',
        solution:
          'Our structured approach breaks down the syllabus into manageable chunks with clear learning objectives for each session.',
      },
      {
        icon: 'link',
        question: 'Struggling to connect topics for synoptic questions?',
        solution:
          'We teach you to see the bigger picture, linking concepts across modules for those challenging synoptic assessments.',
      },
      {
        icon: 'edit',
        question: 'Getting marks but not the grades you deserve?',
        solution:
          'Learn exam technique - how to structure answers, use key terminology, and give examiners exactly what they want.',
      },
    ],
  },

  benefits: {
    title: 'Why Our A-Level Biology Tuition Works',
    subtitle: 'Proven methods for top grades',
    items: [
      {
        icon: 'book',
        title: 'Complete Syllabus Coverage',
        description:
          'Every topic covered systematically from Year 12 foundations to Year 13 advanced content.',
      },
      {
        icon: 'target',
        title: 'Exam-Focused Approach',
        description:
          'Regular past paper practice with detailed marking and feedback using actual mark schemes.',
      },
      {
        icon: 'flask',
        title: 'Practical Excellence',
        description:
          'Full preparation for required practicals including theory, data analysis, and practical exam questions.',
      },
      {
        icon: 'lightbulb',
        title: 'Deep Understanding',
        description:
          'Move beyond memorization to genuine understanding that enables you to tackle any question.',
      },
      {
        icon: 'calendar',
        title: 'Revision Planning',
        description:
          'Structured revision schedules aligned with your exam dates to maximize retention.',
      },
      {
        icon: 'users',
        title: 'Small Group Option',
        description:
          'Learn with 2-3 peers at reduced cost while still getting personalized attention.',
      },
    ],
  },

  stats: [
    { value: '92%', label: 'A*/A/B Grades', icon: 'trophy' },
    { value: '800+', label: 'A-Level Students', icon: 'users' },
    { value: '2+', label: 'Grade Improvement', icon: 'trending-up' },
    { value: '100%', label: 'Syllabus Coverage', icon: 'check' },
  ],

  testimonials: [
    {
      name: 'Charlotte H.',
      achievement: 'AQA A-Level Biology',
      quote:
        'I struggled with A-Level Biology in Year 12 and got a D in my mock. After a year of tutoring, I achieved an A* in my final exams!',
      score: 'A* Grade',
    },
    {
      name: 'Ahmed S.',
      achievement: 'OCR A Biology',
      quote:
        'The synoptic question practice was invaluable. My tutor helped me connect all the topics together, which made a huge difference.',
      score: 'A Grade',
    },
    {
      name: 'Parent of Jessica T.',
      achievement: 'Edexcel Biology',
      quote:
        'Jessica needed the A* for her medicine application. The focused tutoring got her there. We cannot thank Cerebrum enough.',
      score: 'A* Grade',
    },
  ],

  faqs: [
    {
      question: 'What topics are covered in A-Level Biology tuition?',
      answer:
        'We cover the complete A-Level syllabus including: biological molecules, cells, organisms exchange substances, genetic information, energy transfers, organisms respond to their environment, genetics, populations, ecosystems, and gene expression. The exact topics vary slightly by exam board.',
    },
    {
      question: 'How long does it take to see improvement?',
      answer:
        'Most students see noticeable improvement within 4-6 weeks of regular (weekly) tutoring. This includes better understanding of concepts, improved confidence, and higher marks in school assessments. Significant grade improvement typically takes 3-6 months.',
    },
    {
      question: 'Do you offer intensive A-Level Biology revision courses?',
      answer:
        'Yes, we offer intensive revision packages before exam periods including Easter and summer courses. These focus on consolidating knowledge, exam technique, and extensive past paper practice.',
    },
    {
      question: 'Is A-Level Biology tuition suitable for medicine applicants?',
      answer:
        'Absolutely. Many of our students are applying for Medicine, Dentistry, or Veterinary Science. We understand the importance of achieving A* and tailor our approach to meet these high standards. We also offer interview preparation for MMI.',
    },
  ],

  courseSummary: {
    title: 'A-Level Biology Complete Course',
    duration: '2 years (or intensive options)',
    batchSize: '1-on-1 or small groups',
    features: [
      'Full syllabus coverage',
      'All exam boards (AQA, OCR, Edexcel)',
      'Required practicals explained',
      'Past paper bank access',
      'Revision materials included',
      'Progress tracking for parents',
    ],
    price: {
      original: 50,
      discounted: 42,
      emi: 'From £170/month',
    },
  },

  cta: {
    title: 'Start Your Journey to A*',
    subtitle: 'Book a free assessment to identify your current level and create a learning plan',
    primaryButton: {
      text: 'Book Free Assessment',
      link: '/book-demo',
    },
    secondaryButton: {
      text: 'View Packages',
      link: '/courses',
    },
    tertiaryButton: {
      text: 'Free A-Level Notes',
      link: '/resources',
    },
  },

  relatedPages: [
    { title: 'A-Level Biology Tutor', link: '/a-level-biology-tutor' },
    { title: 'GCSE Biology Tuition', link: '/gcse-biology-tuition' },
    { title: 'IB Biology Tuition', link: '/ib-biology-tuition' },
  ],

  contactButtons: defaultContactButtons,

  schema: {
    courseName: 'A-Level Biology Online Tuition',
    provider: 'Cerebrum Biology Academy',
    description:
      'Comprehensive A-Level Biology tuition online for AQA, OCR, and Edexcel exam boards with complete syllabus coverage and exam preparation.',
    duration: '2 years',
    price: 42,
    priceCurrency: 'GBP',
  },
}

// AP Biology Tutor Page
const apBiologyTutor: SEOLandingContent = {
  slug: 'ap-biology-tutor',
  classLevel: 'universal',

  title: 'AP Biology Tutor Online | Expert College Board Prep | Cerebrum Academy',
  metaDescription:
    'Find expert AP Biology tutors online. Comprehensive preparation for AP exam including labs, FRQs & College Board curriculum. Achieve 4-5 scores.',
  keywords: [
    'ap biology tutor near me',
    'ap biology tuition',
    'ap biology tutor online',
    'ap biology help',
    'ap biology teacher',
    'ap bio tutor',
    'college board ap biology',
    'ap biology exam prep',
    'ap biology frq help',
  ],

  hero: {
    headline: 'AP Biology Tutors for 4-5 Scores',
    subheadline:
      'Expert preparation for College Board AP Biology exam. Master all units, labs, and FRQ techniques with experienced tutors.',
    highlightedText: '4-5',
    ctaText: 'Start AP Prep Today',
    ctaLink: '/book-demo',
    backgroundGradient: 'from-red-900 via-rose-900 to-pink-900',
  },

  painPoints: {
    title: 'AP Biology Challenges We Solve',
    points: [
      {
        icon: 'book',
        question: 'Struggling with the breadth of AP Biology content?',
        solution:
          'We break down all 8 units into manageable pieces, focusing on the Big Ideas and essential knowledge that the exam tests.',
      },
      {
        icon: 'edit',
        question: 'Losing points on Free Response Questions?',
        solution:
          'Learn the exact rubric criteria for FRQs and practice the data analysis, experimental design, and argumentation skills required.',
      },
      {
        icon: 'flask',
        question: 'Confused by the lab investigations?',
        solution:
          'Understand all 13 AP Biology labs thoroughly - the concepts, procedures, and how they appear in exam questions.',
      },
    ],
  },

  benefits: {
    title: 'Why Our AP Biology Tutoring Works',
    subtitle: 'College Board curriculum experts',
    items: [
      {
        icon: 'target',
        title: 'All 8 Units Covered',
        description:
          'Comprehensive coverage from Chemistry of Life to Ecology, aligned with College Board curriculum framework.',
      },
      {
        icon: 'edit',
        title: 'FRQ Mastery',
        description:
          'Extensive practice with past FRQs, learning rubric-based scoring and answer structure.',
      },
      {
        icon: 'flask',
        title: '13 Labs Explained',
        description:
          'Deep understanding of all AP Biology lab investigations and their exam applications.',
      },
      {
        icon: 'calculator',
        title: 'Math Skills Integrated',
        description:
          'Master the quantitative skills - chi-square, Hardy-Weinberg, rate calculations, and more.',
      },
      {
        icon: 'clock',
        title: 'Time Management',
        description:
          'Learn to pace yourself through MCQs and allocate time effectively for each FRQ.',
      },
      {
        icon: 'star',
        title: 'Score Prediction',
        description:
          'Regular practice exams with scoring to predict your likely AP score and target weak areas.',
      },
    ],
  },

  stats: [
    { value: '88%', label: 'Score 4 or 5', icon: 'trophy' },
    { value: '4.3', label: 'Average AP Score', icon: 'star' },
    { value: '200+', label: 'AP Students', icon: 'users' },
    { value: '100%', label: 'Curriculum Coverage', icon: 'check' },
  ],

  testimonials: [
    {
      name: 'Michael S.',
      achievement: 'AP Biology Score 5',
      quote:
        'AP Bio seemed impossible at first. My tutor broke it down unit by unit and taught me how to tackle FRQs. I got a 5 and college credit!',
      score: '5/5',
    },
    {
      name: 'Sarah L.',
      achievement: 'AP Biology Score 5',
      quote:
        'The FRQ practice was incredible. I learned exactly what graders look for and how to maximize points even when unsure of answers.',
      score: '5/5',
    },
    {
      name: 'Parent of Kevin R.',
      achievement: 'AP Biology Score 4',
      quote:
        'Kevin was overwhelmed by AP Biology at school. The tutor helped him organize the material and build confidence. Very happy with his 4!',
      score: '4/5',
    },
  ],

  faqs: [
    {
      question: 'When should I start AP Biology tutoring?',
      answer:
        'Ideally, start early in the school year (September/October) for consistent support. However, we also offer intensive spring preparation starting in February/March for students who need focused exam prep.',
    },
    {
      question: 'How do you prepare students for AP Biology FRQs?',
      answer:
        'We use actual past AP exam FRQs, teach you how scoring rubrics work, and practice structuring answers for maximum points. Skills like experimental design, data analysis, and scientific argumentation are developed through targeted practice.',
    },
    {
      question: 'Do you cover the AP Biology lab investigations?',
      answer:
        'Yes, we thoroughly cover all 13 AP Biology lab investigations. While you will do hands-on labs at school, we ensure you understand the concepts, can interpret data, and are ready for lab-based exam questions.',
    },
    {
      question: 'What AP Biology score can I realistically achieve?',
      answer:
        'This depends on your starting point and commitment. Most students who engage fully with weekly tutoring improve by 1-2 score points. Students starting with a predicted 3 often achieve 4-5 with dedicated preparation.',
    },
  ],

  courseSummary: {
    title: 'AP Biology Complete Prep',
    duration: 'Full year or intensive spring',
    batchSize: '1-on-1 or small group',
    features: [
      'All 8 units covered',
      'FRQ practice with scoring',
      '13 labs explained',
      'Math skills integration',
      'Practice exams included',
      'Score prediction assessments',
    ],
    price: {
      original: 55,
      discounted: 48,
      emi: 'From $190/month',
    },
  },

  cta: {
    title: 'Achieve Your Target AP Score',
    subtitle: 'Free consultation to assess your current level and create a study plan',
    primaryButton: {
      text: 'Book Free Consultation',
      link: '/book-demo',
    },
    secondaryButton: {
      text: 'View AP Packages',
      link: '/courses',
    },
    tertiaryButton: {
      text: 'Free AP Resources',
      link: '/resources',
    },
  },

  relatedPages: [
    { title: 'A-Level Biology Tuition', link: '/a-level-biology-tuition' },
    { title: 'IB Biology Tuition', link: '/ib-biology-tuition' },
    { title: 'International Biology Tutor', link: '/international-biology-tutor' },
  ],

  contactButtons: defaultContactButtons,

  schema: {
    courseName: 'AP Biology Tutoring',
    provider: 'Cerebrum Biology Academy',
    description:
      'Expert AP Biology tutoring online with comprehensive College Board curriculum preparation, FRQ practice, and lab investigation coverage.',
    duration: '1 academic year',
    price: 48,
    priceCurrency: 'USD',
  },
}

// International Biology Tutor Page
const internationalBiologyTutor: SEOLandingContent = {
  slug: 'international-biology-tutor',
  classLevel: 'universal',

  title: 'International Biology Tutor Online | All Curricula | Cerebrum Academy',
  metaDescription:
    'Expert biology tutors for all international curricula - GCSE, IGCSE, IB, A-Level, AP, O-Level & more. Find your perfect tutor for any biology course worldwide.',
  keywords: [
    'international biology tutor',
    'o level biology',
    'biology tutor international',
    'online biology tutor worldwide',
    'biology tutor for international students',
    'cambridge biology tutor',
    'pearson biology tutor',
    'edexcel international biology',
  ],

  hero: {
    headline: 'Biology Tutors for Every Curriculum',
    subheadline:
      'Whether you are studying GCSE, IGCSE, IB, A-Level, AP, O-Level, or any other curriculum - we have expert tutors ready to help you succeed.',
    highlightedText: 'Every',
    ctaText: 'Find Your Tutor',
    ctaLink: '/book-demo',
    backgroundGradient: 'from-amber-900 via-orange-900 to-red-900',
  },

  painPoints: {
    title: 'Biology Students Everywhere Face Challenges',
    points: [
      {
        icon: 'globe',
        question: 'Studying an international curriculum in a non-English country?',
        solution:
          'Our tutors teach in English with clear explanations, helping you overcome language barriers while mastering biology.',
      },
      {
        icon: 'search',
        question: 'Cannot find a tutor who knows your specific curriculum?',
        solution:
          'We have specialists for every major curriculum - from Cambridge to College Board, IB to national systems.',
      },
      {
        icon: 'clock',
        question: 'Time zone challenges making tutoring impossible?',
        solution:
          'With tutors across the globe, we can match you with experts available in your local time zone.',
      },
    ],
  },

  benefits: {
    title: 'Curricula We Support',
    subtitle: 'Expert tutors for every system',
    items: [
      {
        icon: 'book',
        title: 'UK Curricula',
        description:
          'GCSE, A-Level (AQA, OCR, Edexcel, WJEC), Scottish Highers, and Welsh Baccalaureate.',
      },
      {
        icon: 'globe',
        title: 'Cambridge International',
        description: 'IGCSE, O-Level, AS & A-Level, Cambridge Pre-U Biology.',
      },
      {
        icon: 'award',
        title: 'International Baccalaureate',
        description: 'IB Biology HL and SL, including IA support and exam preparation.',
      },
      {
        icon: 'flag',
        title: 'American Systems',
        description: 'AP Biology, SAT Subject Tests, and various state curricula.',
      },
      {
        icon: 'layers',
        title: 'Pearson Edexcel',
        description: 'Edexcel International GCSE, International A-Level, and BTEC.',
      },
      {
        icon: 'star',
        title: 'Other Systems',
        description: 'Australian HSC, Indian CBSE/ISC, and many national curricula.',
      },
    ],
  },

  stats: [
    { value: '15+', label: 'Curricula Covered', icon: 'book' },
    { value: '50+', label: 'Countries Served', icon: 'globe' },
    { value: '100+', label: 'Expert Tutors', icon: 'users' },
    { value: '4.9/5', label: 'Global Rating', icon: 'star' },
  ],

  testimonials: [
    {
      name: 'Yuki T.',
      achievement: 'Tokyo International School',
      quote:
        'Studying IB Biology in Japan was challenging. My Cerebrum tutor understood both the IB system and how to explain concepts clearly. Got a 7!',
      score: '7/7 IB',
    },
    {
      name: 'Parent of Carlos M.',
      achievement: 'IGCSE in Mexico',
      quote:
        'Finding a Cambridge-qualified tutor in Mexico was impossible. Online tutoring with Cerebrum was the perfect solution. Carlos got an A*.',
      score: 'A* IGCSE',
    },
    {
      name: 'Aisha K.',
      achievement: 'O-Level in Pakistan',
      quote:
        'My school did not cover the syllabus well. My tutor went through every topic systematically and I improved from C to A in my O-Levels.',
      score: 'A Grade',
    },
  ],

  faqs: [
    {
      question: 'Which biology curricula do you support?',
      answer:
        'We support virtually all major international curricula including GCSE, IGCSE, O-Level, A-Level (all UK boards), IB (HL/SL), AP Biology, Australian HSC, Indian CBSE/ISC, and many national systems. If you have a specific curriculum, ask us - we likely have a tutor for it.',
    },
    {
      question: 'Can you help with biology in non-English speaking countries?',
      answer:
        'Yes, we teach international curricula that are delivered in English, even if you are in a non-English speaking country. Our tutors are experienced in helping students for whom English is a second language.',
    },
    {
      question: 'How do you match students with international biology tutors?',
      answer:
        'We consider your specific curriculum, exam board, time zone, areas of difficulty, and learning preferences. After a free trial, we refine the match to ensure you have the perfect tutor for your needs.',
    },
    {
      question: 'What time zones do your tutors cover?',
      answer:
        'We have tutors available across all major time zones - from Americas to Asia-Pacific. Whether you are in Dubai, Singapore, Tokyo, São Paulo, or anywhere else, we can find suitable session times.',
    },
  ],

  courseSummary: {
    title: 'International Biology Tutoring',
    duration: 'Flexible based on curriculum',
    batchSize: '1-on-1 personalized',
    features: [
      'All major curricula',
      'Global time zone coverage',
      'Curriculum-specific materials',
      'Exam board specialists',
      'Session recordings',
      'Multi-language support',
    ],
    price: {
      original: 50,
      discounted: 42,
      emi: 'From $170/month',
    },
  },

  cta: {
    title: 'Biology Help for Students Worldwide',
    subtitle: 'Tell us your curriculum and we will match you with the perfect tutor',
    primaryButton: {
      text: 'Get Matched Free',
      link: '/book-demo',
    },
    secondaryButton: {
      text: 'View All Curricula',
      link: '/courses',
    },
    tertiaryButton: {
      text: 'Free Study Resources',
      link: '/resources',
    },
  },

  relatedPages: [
    { title: 'IGCSE Biology Tuition', link: '/igcse-biology-tuition' },
    { title: 'IB Biology Tuition', link: '/ib-biology-tuition' },
    { title: 'A-Level Biology Tuition', link: '/a-level-biology-tuition' },
  ],

  contactButtons: defaultContactButtons,

  schema: {
    courseName: 'International Biology Tutoring',
    provider: 'Cerebrum Biology Academy',
    description:
      'Expert biology tutoring for all international curricula including GCSE, IGCSE, IB, A-Level, AP, O-Level and more, serving students worldwide.',
    duration: 'Flexible',
    price: 42,
    priceCurrency: 'USD',
  },
}

// Export all international curriculum pages
export const internationalSEOPages: Record<string, SEOLandingContent> = {
  'gcse-biology-tuition': gcseBiologyTuition,
  'gcse-biology-tutor-online': gcseBiologyTutorOnline,
  'igcse-biology-tuition': igcseBiologyTuition,
  'igcse-biology-tutor': igcseBiologyTutor,
  'ib-biology-tuition': ibBiologyTuition,
  'ib-biology-tutor-online': ibBiologyTutorOnline,
  'a-level-biology-tutor': aLevelBiologyTutor,
  'a-level-biology-tuition': aLevelBiologyTuition,
  'ap-biology-tutor': apBiologyTutor,
  'international-biology-tutor': internationalBiologyTutor,
}

// Helper to get all international slugs
export const getInternationalSlugs = (): string[] => Object.keys(internationalSEOPages)
