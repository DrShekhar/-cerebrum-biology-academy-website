// Phase 3B: Chapter-Wise Notes SEO Pages
import { SEOLandingContent } from './types'

// Common tools CTA for chapter notes pages
const chapterNotesToolsCTA = {
  title: 'Practice What You Learn',
  tools: [
    {
      name: 'NEET MCQ Practice',
      description: 'Test your knowledge with chapter-specific MCQs',
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
    number: '919876543210',
    message: 'Hi, I want to know more about NEET Biology coaching at Cerebrum Biology Academy',
  },
  phone: '+919876543210',
}

export const chapterNotesSEOPages: Record<string, SEOLandingContent> = {
  'genetics-notes-neet': {
    slug: 'genetics-notes-neet',
    classLevel: 'class-12',
    title: 'Genetics Notes for NEET | Principles of Inheritance & Variation PDF',
    metaDescription:
      'Complete Genetics notes for NEET covering Mendelian inheritance, molecular genetics, DNA replication, transcription & translation. Free PDF download.',
    keywords: [
      'genetics notes for neet',
      'genetics neet pdf',
      'principles of inheritance and variation notes',
      'mendelian genetics neet',
      'molecular genetics neet',
    ],
    hero: {
      headline: 'Genetics Notes for NEET',
      subheadline:
        'Master the highest-weightage chapter in NEET Biology. Comprehensive notes covering Mendelian genetics, molecular biology, and genetic disorders.',
      highlightedText: '12-15 Marks',
      ctaText: 'Get Genetics Notes',
      ctaLink: '/resources/genetics-notes',
    },
    painPoints: {
      title: 'Why Genetics is Challenging',
      points: [
        {
          icon: '🧬',
          question: 'Confused by genetic crosses and ratios?',
          solution: 'Step-by-step approach to solve any genetic cross problem',
        },
        {
          icon: '🔬',
          question: 'Struggling with molecular genetics concepts?',
          solution: 'Visual explanations of DNA replication, transcription & translation',
        },
        {
          icon: '📊',
          question: "Can't remember inheritance patterns?",
          solution: 'Comparison tables and mnemonics for all inheritance types',
        },
      ],
    },
    benefits: {
      title: 'What Our Genetics Notes Cover',
      subtitle: 'Complete NEET Genetics syllabus',
      items: [
        {
          icon: '🧬',
          title: 'Mendelian Genetics',
          description: 'Laws of inheritance, monohybrid & dihybrid crosses with solved examples',
        },
        {
          icon: '🔗',
          title: 'Linkage & Crossing Over',
          description: 'Sex linkage, chromosomal theory, genetic mapping concepts',
        },
        {
          icon: '🧪',
          title: 'Molecular Basis of Inheritance',
          description: 'DNA structure, replication, transcription, translation, genetic code',
        },
        {
          icon: '🏥',
          title: 'Genetic Disorders',
          description: 'Chromosomal abnormalities, pedigree analysis, genetic counseling',
        },
      ],
    },
    stats: [
      { value: '12-15', label: 'NEET Marks', icon: '📊' },
      { value: '6', label: 'Sub-Topics', icon: '📚' },
      { value: '50+', label: 'Solved Problems', icon: '✅' },
      { value: '#1', label: 'Weightage Chapter', icon: '🏆' },
    ],
    testimonials: [
      {
        name: 'Arun Kumar',
        achievement: 'NEET 2024 - 690/720',
        quote:
          'Got 14/16 marks in Genetics in NEET. These notes made complex crosses super easy to solve!',
        score: '690/720',
      },
      {
        name: 'Priya Menon',
        achievement: 'NEET 2024 - 668/720',
        quote:
          'The molecular genetics section with diagrams helped me visualize DNA processes clearly.',
        score: '668/720',
      },
    ],
    faqs: [
      {
        question: 'How many questions come from Genetics in NEET?',
        answer:
          'Genetics is the highest-weightage chapter in NEET Biology. Typically 12-15 marks (3-4 questions) come from Principles of Inheritance & Variation and Molecular Basis of Inheritance combined.',
      },
      {
        question: 'Should I focus on Mendelian or Molecular genetics?',
        answer:
          'Both are equally important. Mendelian genetics has more calculation-based questions while molecular genetics tests conceptual understanding. Master both for maximum marks.',
      },
      {
        question: 'Are pedigree analysis questions common in NEET?',
        answer:
          'Yes, 1-2 questions on pedigree analysis appear almost every year. Practice identifying inheritance patterns from pedigree charts.',
      },
      {
        question: 'How to remember all genetic crosses and ratios?',
        answer:
          'Understand the logic rather than memorizing. Our notes include shortcut methods and patterns to quickly determine ratios for any cross.',
      },
    ],
    courseSummary: {
      title: 'Master Genetics with Expert Guidance',
      duration: '12 months',
      batchSize: '10-12 students',
      features: [
        'Genetics masterclass with 50+ solved problems',
        'Pedigree analysis special sessions',
        'Molecular genetics animations',
        'Previous year questions analysis',
      ],
      price: {
        original: 45000,
        discounted: 35000,
        emi: '₹2,917/month',
      },
    },
    cta: {
      title: 'Master Genetics for NEET',
      subtitle: 'Score 12+ marks in the highest-weightage chapter',
      primaryButton: {
        text: 'Get Genetics Notes',
        link: '/resources/genetics-notes',
      },
      secondaryButton: {
        text: 'Join Full Course',
        link: '/courses',
      },
    },
    toolsCTA: chapterNotesToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'Biotechnology Notes NEET', link: '/biotechnology-notes-neet' },
      { title: 'Evolution Notes NEET', link: '/evolution-notes-neet' },
      { title: 'NEET Biology Important Questions', link: '/neet-biology-important-questions' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'Genetics for NEET',
      provider: 'Cerebrum Biology Academy',
      description: 'Complete genetics notes for NEET preparation',
      duration: 'Self-paced',
      price: 0,
      priceCurrency: 'INR',
    },
  },

  'human-physiology-notes-neet': {
    slug: 'human-physiology-notes-neet',
    classLevel: 'class-12',
    title: 'Human Physiology Notes for NEET | All Systems Covered PDF',
    metaDescription:
      'Complete Human Physiology notes for NEET covering all 6 systems - Digestion, Respiration, Circulation, Excretion, Locomotion & Neural Control. Free download.',
    keywords: [
      'human physiology notes neet',
      'human physiology for neet',
      'physiology neet notes pdf',
      'neet human physiology',
      'body fluids and circulation neet',
    ],
    hero: {
      headline: 'Human Physiology Notes for NEET',
      subheadline:
        'The most scoring unit in NEET Biology! Comprehensive notes covering all 6 systems with diagrams, flowcharts, and important points.',
      highlightedText: '25-30 Marks',
      ctaText: 'Get Physiology Notes',
      ctaLink: '/resources/human-physiology-notes',
    },
    painPoints: {
      title: 'Human Physiology Challenges',
      points: [
        {
          icon: '🫀',
          question: 'Overwhelmed by 6 different systems?',
          solution: 'Organized notes with clear structure for each system',
        },
        {
          icon: '🔄',
          question: 'Mixing up processes and mechanisms?',
          solution: 'Flowcharts and step-by-step explanations for all processes',
        },
        {
          icon: '📝',
          question: 'Forgetting hormones and their functions?',
          solution: 'Quick reference tables with all hormones organized by gland',
        },
      ],
    },
    benefits: {
      title: 'Complete Human Physiology Coverage',
      subtitle: 'All 6 systems in one comprehensive resource',
      items: [
        {
          icon: '🍽️',
          title: 'Digestion & Absorption',
          description: 'GI tract anatomy, enzymes, absorption mechanisms',
        },
        {
          icon: '🫁',
          title: 'Breathing & Gas Exchange',
          description: 'Respiratory system, transport of gases, disorders',
        },
        {
          icon: '🫀',
          title: 'Body Fluids & Circulation',
          description: 'Blood, heart, ECG, circulatory pathways',
        },
        {
          icon: '🧪',
          title: 'Excretion & Osmoregulation',
          description: 'Nephron function, urine formation, kidney disorders',
        },
      ],
    },
    stats: [
      { value: '25-30', label: 'NEET Marks', icon: '📊' },
      { value: '6', label: 'Systems', icon: '🫀' },
      { value: '100+', label: 'Diagrams', icon: '🖼️' },
      { value: '#1', label: 'Scoring Unit', icon: '🏆' },
    ],
    testimonials: [
      {
        name: 'Sanjay Gupta',
        achievement: 'NEET 2024 - 682/720',
        quote:
          'Human Physiology gave me 28 marks in NEET! The organ system diagrams in these notes are exactly what NEET tests.',
        score: '682/720',
      },
      {
        name: 'Kavitha Rajan',
        achievement: 'NEET 2024 - 665/720',
        quote:
          'The hormone tables saved me so much revision time. All hormones with their sources and functions at one place!',
        score: '665/720',
      },
    ],
    faqs: [
      {
        question: 'How important is Human Physiology for NEET?',
        answer:
          'Human Physiology is the highest-scoring unit in NEET Biology, contributing 25-30 marks. It covers 6 chapters from Class 12 and is considered the most scoring section.',
      },
      {
        question: 'Which system is most important in Human Physiology?',
        answer:
          'All systems are important, but Body Fluids & Circulation and Excretory System typically have more questions. Neural Control and Chemical Coordination also carry significant weightage.',
      },
      {
        question: 'Are diagrams important in Human Physiology?',
        answer:
          'Extremely important! Many NEET questions are diagram-based. You must know heart structure, nephron, eye, ear, and other anatomical diagrams with proper labeling.',
      },
      {
        question: 'How to remember so many processes in Physiology?',
        answer:
          'Use flowcharts and understand the logic. Our notes break down each process into simple steps with visual aids for easy memorization.',
      },
    ],
    courseSummary: {
      title: 'Score Maximum in Human Physiology',
      duration: '12 months',
      batchSize: '10-12 students',
      features: [
        'System-wise detailed lectures',
        '3D animations of physiological processes',
        'Case-based learning approach',
        'Weekly physiology tests',
      ],
      price: {
        original: 45000,
        discounted: 35000,
        emi: '₹2,917/month',
      },
    },
    cta: {
      title: 'Master Human Physiology',
      subtitle: 'Score 25+ marks in the highest-scoring unit',
      primaryButton: {
        text: 'Get Physiology Notes',
        link: '/resources/human-physiology-notes',
      },
      secondaryButton: {
        text: 'Join Full Course',
        link: '/courses',
      },
    },
    toolsCTA: chapterNotesToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'Reproduction Notes NEET', link: '/reproduction-notes-neet' },
      { title: 'NEET Biology Diagrams', link: '/neet-biology-diagrams' },
      { title: 'NEET Chapter Weightage', link: '/neet-biology-chapter-weightage' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'Human Physiology for NEET',
      provider: 'Cerebrum Biology Academy',
      description: 'Complete human physiology notes for NEET',
      duration: 'Self-paced',
      price: 0,
      priceCurrency: 'INR',
    },
  },

  'ecology-notes-neet': {
    slug: 'ecology-notes-neet',
    classLevel: 'class-12',
    title: 'Ecology Notes for NEET | Organisms & Populations, Ecosystem PDF',
    metaDescription:
      'Complete Ecology notes for NEET covering Organisms & Populations, Ecosystem, Biodiversity & Conservation. Easy-to-understand notes with diagrams.',
    keywords: [
      'ecology notes for neet',
      'ecology neet pdf',
      'ecosystem neet notes',
      'biodiversity and conservation neet',
      'environmental issues neet',
    ],
    hero: {
      headline: 'Ecology Notes for NEET',
      subheadline:
        'High-scoring and easiest unit in NEET Biology! Clear notes covering all 4 ecology chapters with diagrams and important concepts.',
      highlightedText: '12-15 Marks',
      ctaText: 'Get Ecology Notes',
      ctaLink: '/resources/ecology-notes',
    },
    painPoints: {
      title: 'Why Students Love Ecology',
      points: [
        {
          icon: '🌿',
          question: 'Looking for easy marks in NEET Biology?',
          solution: 'Ecology is the most scoring section with direct NCERT questions',
        },
        {
          icon: '📊',
          question: 'Confused by ecological indices and formulas?',
          solution: 'Clear explanations of all formulas with solved examples',
        },
        {
          icon: '🌍',
          question: 'Too many terms to remember?',
          solution: 'Organized lists and comparison tables for quick revision',
        },
      ],
    },
    benefits: {
      title: 'Complete Ecology Coverage',
      subtitle: 'All 4 chapters thoroughly covered',
      items: [
        {
          icon: '🦎',
          title: 'Organisms & Populations',
          description: 'Adaptations, population attributes, growth models',
        },
        {
          icon: '🌳',
          title: 'Ecosystem',
          description: 'Energy flow, productivity, nutrient cycling, ecological succession',
        },
        {
          icon: '🦋',
          title: 'Biodiversity & Conservation',
          description: 'Types of biodiversity, threats, conservation strategies',
        },
        {
          icon: '🏭',
          title: 'Environmental Issues',
          description: 'Pollution, global warming, ozone depletion, waste management',
        },
      ],
    },
    stats: [
      { value: '12-15', label: 'NEET Marks', icon: '📊' },
      { value: '4', label: 'Chapters', icon: '📚' },
      { value: 'Easy', label: 'Difficulty', icon: '✅' },
      { value: 'Direct', label: 'NCERT Questions', icon: '📖' },
    ],
    testimonials: [
      {
        name: 'Rahul Sharma',
        achievement: 'NEET 2024 - 675/720',
        quote:
          "Ecology gave me full 16 marks! It's the easiest section if you read NCERT carefully. These notes highlighted all important points.",
        score: '675/720',
      },
      {
        name: 'Ananya Singh',
        achievement: 'NEET 2024 - 658/720',
        quote:
          'The nutrient cycle diagrams and succession stages notes were perfect. Exactly what NEET asks!',
        score: '658/720',
      },
    ],
    faqs: [
      {
        question: 'Is Ecology easy for NEET?',
        answer:
          'Yes, Ecology is considered the easiest and most scoring section in NEET Biology. Questions are mostly direct from NCERT and require minimal calculation.',
      },
      {
        question: 'Which ecology chapters are most important?',
        answer:
          'Ecosystem and Biodiversity & Conservation have the highest weightage. Environmental Issues chapter also has guaranteed questions every year.',
      },
      {
        question: 'Are there calculation questions in Ecology?',
        answer:
          'Few questions involve calculations like productivity, diversity indices, or population growth. Our notes cover all formulas with examples.',
      },
      {
        question: 'Should I focus on diagrams in Ecology?',
        answer:
          'Yes, diagrams of food webs, nutrient cycles (carbon, nitrogen, phosphorus), and ecological pyramids are commonly asked.',
      },
    ],
    courseSummary: {
      title: 'Score Full Marks in Ecology',
      duration: '12 months',
      batchSize: '10-12 students',
      features: [
        'Complete ecology with case studies',
        'Environmental issues current affairs',
        'Diagram practice sessions',
        'Formula sheets and quick revision',
      ],
      price: {
        original: 45000,
        discounted: 35000,
        emi: '₹2,917/month',
      },
    },
    cta: {
      title: 'Score 15/15 in Ecology',
      subtitle: 'The easiest way to boost your NEET score',
      primaryButton: {
        text: 'Get Ecology Notes',
        link: '/resources/ecology-notes',
      },
      secondaryButton: {
        text: 'Join Full Course',
        link: '/courses',
      },
    },
    toolsCTA: chapterNotesToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'Biodiversity Notes NEET', link: '/biodiversity-notes-neet' },
      { title: 'NEET Biology Notes PDF', link: '/neet-biology-notes-pdf' },
      { title: 'NEET Important Questions', link: '/neet-biology-important-questions' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'Ecology for NEET',
      provider: 'Cerebrum Biology Academy',
      description: 'Complete ecology notes for NEET preparation',
      duration: 'Self-paced',
      price: 0,
      priceCurrency: 'INR',
    },
  },

  'cell-biology-notes-neet': {
    slug: 'cell-biology-notes-neet',
    classLevel: 'class-11',
    title: 'Cell Biology Notes for NEET | Cell Structure & Function PDF',
    metaDescription:
      'Complete Cell Biology notes for NEET covering cell theory, cell organelles, cell cycle, and biomolecules. Detailed diagrams and explanations.',
    keywords: [
      'cell biology notes neet',
      'cell structure neet',
      'cell cycle neet notes',
      'cell organelles neet',
      'cell the unit of life neet',
    ],
    hero: {
      headline: 'Cell Biology Notes for NEET',
      subheadline:
        'Master the foundation of Biology! Comprehensive notes on cell structure, organelles, cell cycle, and cell division with detailed diagrams.',
      highlightedText: '10-12 Marks',
      ctaText: 'Get Cell Biology Notes',
      ctaLink: '/resources/cell-biology-notes',
    },
    painPoints: {
      title: 'Cell Biology Challenges',
      points: [
        {
          icon: '🔬',
          question: 'Confusing cell organelle structures?',
          solution: 'Clear diagrams with functions and differences tables',
        },
        {
          icon: '🔄',
          question: "Can't remember cell cycle phases?",
          solution: 'Step-by-step explanation with checkpoints and regulation',
        },
        {
          icon: '📊',
          question: 'Prokaryote vs Eukaryote confusion?',
          solution: 'Comprehensive comparison tables for quick revision',
        },
      ],
    },
    benefits: {
      title: 'Complete Cell Biology Coverage',
      subtitle: 'From basic to advanced concepts',
      items: [
        {
          icon: '🧫',
          title: 'Cell Structure',
          description: 'Cell theory, prokaryotic & eukaryotic cells, cell membrane',
        },
        {
          icon: '🏛️',
          title: 'Cell Organelles',
          description: 'Nucleus, mitochondria, ER, Golgi, lysosomes, ribosomes',
        },
        {
          icon: '🔄',
          title: 'Cell Cycle',
          description: 'Interphase, mitosis, meiosis with detailed diagrams',
        },
        {
          icon: '🧬',
          title: 'Biomolecules',
          description: 'Carbohydrates, proteins, lipids, nucleic acids, enzymes',
        },
      ],
    },
    stats: [
      { value: '10-12', label: 'NEET Marks', icon: '📊' },
      { value: '4', label: 'Chapters', icon: '📚' },
      { value: '30+', label: 'Diagrams', icon: '🖼️' },
      { value: 'Class 11', label: 'Foundation', icon: '📖' },
    ],
    testimonials: [
      {
        name: 'Vikram Patel',
        achievement: 'NEET 2024 - 670/720',
        quote:
          'Cell biology questions are very diagram-based. These notes have every organelle perfectly illustrated!',
        score: '670/720',
      },
      {
        name: 'Deepika Nair',
        achievement: 'NEET 2024 - 655/720',
        quote:
          'The mitosis-meiosis comparison table saved me. I never confused them again after reading these notes.',
        score: '655/720',
      },
    ],
    faqs: [
      {
        question: 'How important is Cell Biology for NEET?',
        answer:
          'Cell Biology forms the foundation and contributes 10-12 marks. Questions come from Cell Structure (Cell: Unit of Life), Biomolecules, Cell Cycle, and Cell Division.',
      },
      {
        question: 'Which diagrams are must-know in Cell Biology?',
        answer:
          'Cell organelles (mitochondria, chloroplast, nucleus), fluid mosaic model, cell cycle stages, mitosis and meiosis phases are frequently asked.',
      },
      {
        question: 'Is biomolecules part of Cell Biology?',
        answer:
          'Yes, Biomolecules chapter is often grouped with Cell Biology. It covers carbohydrates, proteins, lipids, nucleic acids, and enzymes.',
      },
      {
        question: 'Should I memorize all organelle functions?',
        answer:
          'Yes, you must know structure and function of all organelles. Our notes provide comparison tables for easy memorization.',
      },
    ],
    courseSummary: {
      title: 'Build Strong Cell Biology Foundation',
      duration: '12 months',
      batchSize: '10-12 students',
      features: [
        'Cell biology fundamentals with animations',
        'Organelle structure in 3D',
        'Cell cycle virtual lab',
        'Biomolecules problem solving',
      ],
      price: {
        original: 45000,
        discounted: 35000,
        emi: '₹2,917/month',
      },
    },
    cta: {
      title: 'Master Cell Biology Fundamentals',
      subtitle: 'Build a strong foundation for NEET Biology',
      primaryButton: {
        text: 'Get Cell Biology Notes',
        link: '/resources/cell-biology-notes',
      },
      secondaryButton: {
        text: 'Join Full Course',
        link: '/courses',
      },
    },
    toolsCTA: chapterNotesToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'Biomolecules Notes NEET', link: '/biomolecules-notes-neet' },
      { title: 'NEET Biology Diagrams', link: '/neet-biology-diagrams' },
      { title: 'NCERT Biology Class 11', link: '/ncert-biology-notes-class-11' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'Cell Biology for NEET',
      provider: 'Cerebrum Biology Academy',
      description: 'Complete cell biology notes for NEET',
      duration: 'Self-paced',
      price: 0,
      priceCurrency: 'INR',
    },
  },

  'plant-physiology-notes-neet': {
    slug: 'plant-physiology-notes-neet',
    classLevel: 'class-11',
    title: 'Plant Physiology Notes for NEET | Transport, Mineral Nutrition PDF',
    metaDescription:
      'Complete Plant Physiology notes for NEET covering Transport in Plants, Mineral Nutrition, Photosynthesis & Respiration. Detailed NCERT-based notes.',
    keywords: [
      'plant physiology notes neet',
      'plant physiology for neet',
      'photosynthesis neet notes',
      'transport in plants neet',
      'mineral nutrition neet',
    ],
    hero: {
      headline: 'Plant Physiology Notes for NEET',
      subheadline:
        'Master all plant processes! Comprehensive notes covering transport, nutrition, photosynthesis, respiration, and plant growth.',
      highlightedText: '15-18 Marks',
      ctaText: 'Get Plant Physiology Notes',
      ctaLink: '/resources/plant-physiology-notes',
    },
    painPoints: {
      title: 'Plant Physiology Challenges',
      points: [
        {
          icon: '🌱',
          question: 'Mixing up C3, C4, and CAM pathways?',
          solution: 'Clear comparison tables with step-by-step explanations',
        },
        {
          icon: '💧',
          question: 'Confused by transport mechanisms?',
          solution: 'Visual flowcharts for water, mineral, and food transport',
        },
        {
          icon: '🧪',
          question: "Can't remember mineral deficiency symptoms?",
          solution: 'Organized tables with element roles and deficiency signs',
        },
      ],
    },
    benefits: {
      title: 'Complete Plant Physiology Coverage',
      subtitle: 'All 5 chapters covered in depth',
      items: [
        {
          icon: '💧',
          title: 'Transport in Plants',
          description: 'Water, minerals, food transport, transpiration, opening/closing of stomata',
        },
        {
          icon: '🥗',
          title: 'Mineral Nutrition',
          description: 'Essential elements, deficiency symptoms, nitrogen metabolism',
        },
        {
          icon: '☀️',
          title: 'Photosynthesis',
          description: 'Light & dark reactions, C3, C4, CAM pathways, photorespiration',
        },
        {
          icon: '🔥',
          title: 'Respiration',
          description: 'Glycolysis, Krebs cycle, ETC, fermentation',
        },
      ],
    },
    stats: [
      { value: '15-18', label: 'NEET Marks', icon: '📊' },
      { value: '5', label: 'Chapters', icon: '📚' },
      { value: '40+', label: 'Diagrams', icon: '🖼️' },
      { value: 'High', label: 'Weightage', icon: '⬆️' },
    ],
    testimonials: [
      {
        name: 'Sneha Reddy',
        achievement: 'NEET 2024 - 665/720',
        quote:
          'Photosynthesis can be confusing but these notes made C3, C4, CAM pathways crystal clear!',
        score: '665/720',
      },
      {
        name: 'Arjun Sharma',
        achievement: 'NEET 2024 - 672/720',
        quote:
          'The mineral nutrition table with all deficiency symptoms was a lifesaver during revision.',
        score: '672/720',
      },
    ],
    faqs: [
      {
        question: 'How important is Plant Physiology for NEET?',
        answer:
          'Plant Physiology contributes 15-18 marks and is crucial for Class 11 biology. Photosynthesis and Respiration are especially high-weightage chapters.',
      },
      {
        question: 'Which Plant Physiology chapters are most important?',
        answer:
          'Photosynthesis has the highest weightage, followed by Respiration in Plants. Transport in Plants and Mineral Nutrition also have guaranteed questions.',
      },
      {
        question: 'Are diagrams important in Plant Physiology?',
        answer:
          'Yes! Z-scheme of photosynthesis, Calvin cycle, Krebs cycle, and ETC diagrams are frequently tested in NEET.',
      },
      {
        question: 'Should I focus on reactions or concepts?',
        answer:
          'Both are important. NEET tests conceptual understanding as well as specific steps of photosynthesis and respiration.',
      },
    ],
    courseSummary: {
      title: 'Master Plant Physiology',
      duration: '12 months',
      batchSize: '10-12 students',
      features: [
        'Complete plant physiology with animations',
        'Photosynthesis & respiration visual guides',
        'Mineral nutrition case studies',
        'Chapter-wise practice tests',
      ],
      price: {
        original: 45000,
        discounted: 35000,
        emi: '₹2,917/month',
      },
    },
    cta: {
      title: 'Master Plant Physiology',
      subtitle: 'Ace the Class 11 high-weightage chapters',
      primaryButton: {
        text: 'Get Plant Physiology Notes',
        link: '/resources/plant-physiology-notes',
      },
      secondaryButton: {
        text: 'Join Full Course',
        link: '/courses',
      },
    },
    toolsCTA: chapterNotesToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'Plant Kingdom Notes NEET', link: '/plant-kingdom-notes-neet' },
      { title: 'NCERT Biology Class 11', link: '/ncert-biology-notes-class-11' },
      { title: 'NEET Biology Notes PDF', link: '/neet-biology-notes-pdf' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'Plant Physiology for NEET',
      provider: 'Cerebrum Biology Academy',
      description: 'Complete plant physiology notes for NEET',
      duration: 'Self-paced',
      price: 0,
      priceCurrency: 'INR',
    },
  },

  'reproduction-notes-neet': {
    slug: 'reproduction-notes-neet',
    classLevel: 'class-12',
    title: 'Reproduction Notes for NEET | Human & Plant Reproduction PDF',
    metaDescription:
      'Complete Reproduction notes for NEET covering Human Reproductive System, Reproductive Health, and Sexual Reproduction in Plants. Detailed diagrams.',
    keywords: [
      'reproduction notes neet',
      'human reproduction neet',
      'reproductive health neet',
      'sexual reproduction in plants neet',
      'neet reproduction chapter',
    ],
    hero: {
      headline: 'Reproduction Notes for NEET',
      subheadline:
        'High-weightage and interesting! Complete notes on human reproduction, reproductive health, and plant reproduction with detailed diagrams.',
      highlightedText: '12-15 Marks',
      ctaText: 'Get Reproduction Notes',
      ctaLink: '/resources/reproduction-notes',
    },
    painPoints: {
      title: 'Reproduction Chapter Challenges',
      points: [
        {
          icon: '🧬',
          question: 'Confused by gametogenesis stages?',
          solution: 'Step-by-step spermatogenesis & oogenesis with diagrams',
        },
        {
          icon: '🌸',
          question: "Can't remember flower parts and functions?",
          solution: 'Labeled diagrams with comparison tables',
        },
        {
          icon: '👶',
          question: 'Embryo development stages overwhelming?',
          solution: 'Timeline approach from fertilization to birth',
        },
      ],
    },
    benefits: {
      title: 'Complete Reproduction Coverage',
      subtitle: 'Both animal and plant reproduction',
      items: [
        {
          icon: '🚹',
          title: 'Male Reproductive System',
          description: 'Anatomy, spermatogenesis, hormonal control',
        },
        {
          icon: '🚺',
          title: 'Female Reproductive System',
          description: 'Anatomy, oogenesis, menstrual cycle, pregnancy',
        },
        {
          icon: '🌼',
          title: 'Plant Reproduction',
          description: 'Flower structure, pollination, fertilization, seed formation',
        },
        {
          icon: '🏥',
          title: 'Reproductive Health',
          description: 'Contraception, STDs, infertility, ART',
        },
      ],
    },
    stats: [
      { value: '12-15', label: 'NEET Marks', icon: '📊' },
      { value: '4', label: 'Chapters', icon: '📚' },
      { value: '35+', label: 'Diagrams', icon: '🖼️' },
      { value: 'High', label: 'Diagram Questions', icon: '🖼️' },
    ],
    testimonials: [
      {
        name: 'Meera Krishnan',
        achievement: 'NEET 2024 - 678/720',
        quote:
          'The reproductive system diagrams with all labels were exactly what NEET tested. Got full marks!',
        score: '678/720',
      },
      {
        name: 'Aditya Verma',
        achievement: 'NEET 2024 - 662/720',
        quote:
          'The menstrual cycle and hormone regulation flowchart finally made sense after reading these notes.',
        score: '662/720',
      },
    ],
    faqs: [
      {
        question: 'How important is Reproduction for NEET?',
        answer:
          'Reproduction is a high-weightage unit contributing 12-15 marks. Human Reproduction and Reproductive Health are especially important chapters.',
      },
      {
        question: 'Are diagram questions common from Reproduction?',
        answer:
          'Yes, very common! Male & female reproductive system, flower parts, embryo development diagrams are frequently tested.',
      },
      {
        question: 'Should I study plant and human reproduction equally?',
        answer:
          'Human Reproduction has slightly higher weightage, but Plant Reproduction is equally important and often has direct NCERT questions.',
      },
      {
        question: 'What about Reproductive Health chapter?',
        answer:
          'Reproductive Health has guaranteed 2-3 questions every year. Contraception methods, STDs, and ART are commonly asked topics.',
      },
    ],
    courseSummary: {
      title: 'Master Reproduction for NEET',
      duration: '12 months',
      batchSize: '10-12 students',
      features: [
        'Complete reproduction with 3D models',
        'Gametogenesis visual guide',
        'Menstrual cycle animated explanation',
        'Reproductive health case studies',
      ],
      price: {
        original: 45000,
        discounted: 35000,
        emi: '₹2,917/month',
      },
    },
    cta: {
      title: 'Master Reproduction Chapter',
      subtitle: 'Score 12+ marks in this high-weightage unit',
      primaryButton: {
        text: 'Get Reproduction Notes',
        link: '/resources/reproduction-notes',
      },
      secondaryButton: {
        text: 'Join Full Course',
        link: '/courses',
      },
    },
    toolsCTA: chapterNotesToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'Human Physiology Notes NEET', link: '/human-physiology-notes-neet' },
      { title: 'NEET Biology Diagrams', link: '/neet-biology-diagrams' },
      { title: 'NCERT Biology Class 12', link: '/ncert-biology-notes-class-12' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'Reproduction for NEET',
      provider: 'Cerebrum Biology Academy',
      description: 'Complete reproduction notes for NEET',
      duration: 'Self-paced',
      price: 0,
      priceCurrency: 'INR',
    },
  },

  'evolution-notes-neet': {
    slug: 'evolution-notes-neet',
    classLevel: 'class-12',
    title: 'Evolution Notes for NEET | Origin of Life & Evolution PDF',
    metaDescription:
      'Complete Evolution notes for NEET covering Origin of Life, theories of evolution, evidences, and human evolution. Easy-to-understand notes.',
    keywords: [
      'evolution notes for neet',
      'evolution neet pdf',
      'origin of life neet',
      'darwinism neet',
      'human evolution neet',
    ],
    hero: {
      headline: 'Evolution Notes for NEET',
      subheadline:
        'Fascinating and scoring chapter! Clear notes on origin of life, evolution theories, evidences of evolution, and human evolution.',
      highlightedText: '4-6 Marks',
      ctaText: 'Get Evolution Notes',
      ctaLink: '/resources/evolution-notes',
    },
    painPoints: {
      title: 'Evolution Chapter Challenges',
      points: [
        {
          icon: '🦕',
          question: 'Confused by evolution theories?',
          solution: 'Clear comparison of Lamarckism, Darwinism, and Modern Synthesis',
        },
        {
          icon: '🧬',
          question: 'Hardy-Weinberg equation seems difficult?',
          solution: 'Step-by-step explanation with solved numerical problems',
        },
        {
          icon: '👤',
          question: "Can't remember human evolution timeline?",
          solution: 'Visual timeline with key features of each human ancestor',
        },
      ],
    },
    benefits: {
      title: 'Complete Evolution Coverage',
      subtitle: 'Origin to modern humans',
      items: [
        {
          icon: '🌍',
          title: 'Origin of Life',
          description: 'Abiogenesis, Oparin-Haldane hypothesis, Miller-Urey experiment',
        },
        {
          icon: '📜',
          title: 'Evolution Theories',
          description: 'Lamarckism, Darwinism, Modern Synthetic Theory',
        },
        {
          icon: '🔍',
          title: 'Evidences of Evolution',
          description: 'Fossils, comparative anatomy, molecular evidences',
        },
        {
          icon: '👤',
          title: 'Human Evolution',
          description: 'Primate evolution, human ancestors, timeline',
        },
      ],
    },
    stats: [
      { value: '4-6', label: 'NEET Marks', icon: '📊' },
      { value: '1', label: 'Chapter', icon: '📚' },
      { value: 'Moderate', label: 'Difficulty', icon: '📈' },
      { value: 'Interesting', label: 'Content', icon: '🌟' },
    ],
    testimonials: [
      {
        name: 'Rohan Gupta',
        achievement: 'NEET 2024 - 668/720',
        quote:
          'Evolution is actually easy if you understand the concepts. These notes made theories and evidences clear.',
        score: '668/720',
      },
      {
        name: 'Priyanka Das',
        achievement: 'NEET 2024 - 655/720',
        quote:
          'The human evolution timeline with skull diagrams was exactly what I needed for quick revision!',
        score: '655/720',
      },
    ],
    faqs: [
      {
        question: 'How many questions come from Evolution in NEET?',
        answer:
          "Evolution contributes 4-6 marks (1-2 questions). While not the highest weightage, it's an easy chapter to score full marks.",
      },
      {
        question: 'Is Hardy-Weinberg equation important?',
        answer:
          'Yes, numerical problems on Hardy-Weinberg equilibrium are common. Understanding the equation and conditions is important.',
      },
      {
        question: 'Should I remember all human ancestor names?',
        answer:
          'Yes, key ancestors like Australopithecus, Homo habilis, Homo erectus, and Homo sapiens with their features should be memorized.',
      },
      {
        question: 'Are diagrams important in Evolution?',
        answer:
          'Comparative anatomy diagrams (homologous/analogous organs) and human skull evolution diagrams are sometimes asked.',
      },
    ],
    courseSummary: {
      title: 'Master Evolution for NEET',
      duration: '12 months',
      batchSize: '10-12 students',
      features: [
        'Evolution concepts with animations',
        'Human evolution timeline video',
        'Hardy-Weinberg problem solving',
        'Evolution evidences visual guide',
      ],
      price: {
        original: 45000,
        discounted: 35000,
        emi: '₹2,917/month',
      },
    },
    cta: {
      title: 'Master Evolution Chapter',
      subtitle: 'Easy marks with the right approach',
      primaryButton: {
        text: 'Get Evolution Notes',
        link: '/resources/evolution-notes',
      },
      secondaryButton: {
        text: 'Join Full Course',
        link: '/courses',
      },
    },
    toolsCTA: chapterNotesToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'Genetics Notes NEET', link: '/genetics-notes-neet' },
      { title: 'Ecology Notes NEET', link: '/ecology-notes-neet' },
      { title: 'NEET Biology Notes PDF', link: '/neet-biology-notes-pdf' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'Evolution for NEET',
      provider: 'Cerebrum Biology Academy',
      description: 'Complete evolution notes for NEET',
      duration: 'Self-paced',
      price: 0,
      priceCurrency: 'INR',
    },
  },

  'biotechnology-notes-neet': {
    slug: 'biotechnology-notes-neet',
    classLevel: 'class-12',
    title: 'Biotechnology Notes for NEET | Principles & Applications PDF',
    metaDescription:
      'Complete Biotechnology notes for NEET covering rDNA technology, PCR, gel electrophoresis, and applications. Easy-to-understand with diagrams.',
    keywords: [
      'biotechnology notes neet',
      'biotechnology for neet',
      'recombinant dna technology neet',
      'pcr neet notes',
      'genetic engineering neet',
    ],
    hero: {
      headline: 'Biotechnology Notes for NEET',
      subheadline:
        'Modern and application-based! Complete notes on recombinant DNA technology, genetic engineering tools, and biotechnology applications.',
      highlightedText: '8-10 Marks',
      ctaText: 'Get Biotechnology Notes',
      ctaLink: '/resources/biotechnology-notes',
    },
    painPoints: {
      title: 'Biotechnology Challenges',
      points: [
        {
          icon: '🧬',
          question: 'rDNA technology steps confusing?',
          solution: 'Flowcharts with each step explained clearly',
        },
        {
          icon: '🔧',
          question: 'Too many tools and techniques to remember?',
          solution: 'Organized tables with tools, uses, and examples',
        },
        {
          icon: '🌾',
          question: 'Applications seem overwhelming?',
          solution: 'Category-wise applications with real examples',
        },
      ],
    },
    benefits: {
      title: 'Complete Biotechnology Coverage',
      subtitle: 'Principles and applications',
      items: [
        {
          icon: '🧰',
          title: 'Tools of rDNA Technology',
          description: 'Restriction enzymes, vectors, host organisms',
        },
        {
          icon: '🔬',
          title: 'Techniques',
          description: 'PCR, gel electrophoresis, DNA fingerprinting, gene cloning',
        },
        {
          icon: '🏥',
          title: 'Medical Applications',
          description: 'Gene therapy, vaccines, transgenic animals, insulin production',
        },
        {
          icon: '🌾',
          title: 'Agricultural Applications',
          description: 'Bt crops, Golden Rice, pest-resistant plants',
        },
      ],
    },
    stats: [
      { value: '8-10', label: 'NEET Marks', icon: '📊' },
      { value: '2', label: 'Chapters', icon: '📚' },
      { value: 'Moderate', label: 'Difficulty', icon: '📈' },
      { value: 'Application', label: 'Based', icon: '💡' },
    ],
    testimonials: [
      {
        name: 'Akash Kumar',
        achievement: 'NEET 2024 - 675/720',
        quote:
          'The rDNA technology flowchart and vector comparison table were perfect for quick revision!',
        score: '675/720',
      },
      {
        name: 'Shreya Menon',
        achievement: 'NEET 2024 - 660/720',
        quote:
          'Biotechnology applications are so interesting. These notes made it easy to remember all transgenic examples.',
        score: '660/720',
      },
    ],
    faqs: [
      {
        question: 'How important is Biotechnology for NEET?',
        answer:
          'Biotechnology contributes 8-10 marks from 2 chapters: Biotechnology Principles & Processes and Biotechnology & Its Applications.',
      },
      {
        question: 'Are diagrams important in Biotechnology?',
        answer:
          'Yes, diagrams of restriction enzyme action, cloning vectors (pBR322, Ti plasmid), and PCR steps are commonly asked.',
      },
      {
        question: 'Should I know specific examples of transgenic organisms?',
        answer:
          'Yes, examples like Bt cotton, Bt brinjal, Golden Rice, transgenic mice, and Rosie the cow are frequently tested.',
      },
      {
        question: 'Is gene therapy topic important?',
        answer:
          'Yes, gene therapy for ADA deficiency and the concept of molecular diagnosis are important for NEET.',
      },
    ],
    courseSummary: {
      title: 'Master Biotechnology for NEET',
      duration: '12 months',
      batchSize: '10-12 students',
      features: [
        'Biotechnology with lab simulations',
        'rDNA technology animated guide',
        'Current biotechnology advances',
        'Application-based problem solving',
      ],
      price: {
        original: 45000,
        discounted: 35000,
        emi: '₹2,917/month',
      },
    },
    cta: {
      title: 'Master Biotechnology',
      subtitle: 'Understand the future of biology',
      primaryButton: {
        text: 'Get Biotechnology Notes',
        link: '/resources/biotechnology-notes',
      },
      secondaryButton: {
        text: 'Join Full Course',
        link: '/courses',
      },
    },
    toolsCTA: chapterNotesToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'Genetics Notes NEET', link: '/genetics-notes-neet' },
      { title: 'NEET Biology Notes PDF', link: '/neet-biology-notes-pdf' },
      { title: 'NEET Important Questions', link: '/neet-biology-important-questions' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'Biotechnology for NEET',
      provider: 'Cerebrum Biology Academy',
      description: 'Complete biotechnology notes for NEET',
      duration: 'Self-paced',
      price: 0,
      priceCurrency: 'INR',
    },
  },

  'biodiversity-notes-neet': {
    slug: 'biodiversity-notes-neet',
    classLevel: 'class-12',
    title: 'Biodiversity Notes for NEET | Conservation & Types PDF',
    metaDescription:
      'Complete Biodiversity and Conservation notes for NEET. Types of biodiversity, threats, conservation strategies, and hotspots covered with examples.',
    keywords: [
      'biodiversity notes neet',
      'biodiversity and conservation neet',
      'conservation strategies neet',
      'biodiversity hotspots neet',
      'endangered species neet',
    ],
    hero: {
      headline: 'Biodiversity & Conservation Notes',
      subheadline:
        'Easy and interesting chapter! Complete notes on types of biodiversity, threats, conservation strategies, and biodiversity hotspots.',
      highlightedText: '4-6 Marks',
      ctaText: 'Get Biodiversity Notes',
      ctaLink: '/resources/biodiversity-notes',
    },
    painPoints: {
      title: 'Biodiversity Chapter Simplified',
      points: [
        {
          icon: '🌍',
          question: "Can't remember all hotspots and examples?",
          solution: 'Organized lists with Indian and global hotspots',
        },
        {
          icon: '🦏',
          question: 'Conservation terms confusing?',
          solution: 'Clear definitions with examples of each strategy',
        },
        {
          icon: '📊',
          question: 'Diversity indices formulas?',
          solution: 'Simple explanations with solved examples',
        },
      ],
    },
    benefits: {
      title: 'Complete Biodiversity Coverage',
      subtitle: 'From concepts to conservation',
      items: [
        {
          icon: '🌈',
          title: 'Types of Biodiversity',
          description: 'Genetic, species, and ecosystem diversity',
        },
        {
          icon: '📉',
          title: 'Threats to Biodiversity',
          description: 'HIPPO factors, habitat loss, overexploitation',
        },
        {
          icon: '🛡️',
          title: 'Conservation Strategies',
          description: 'In-situ, ex-situ conservation, protected areas',
        },
        {
          icon: '🗺️',
          title: 'Biodiversity Hotspots',
          description: 'Global hotspots, Indian hotspots, endemic species',
        },
      ],
    },
    stats: [
      { value: '4-6', label: 'NEET Marks', icon: '📊' },
      { value: '1', label: 'Chapter', icon: '📚' },
      { value: 'Easy', label: 'Difficulty', icon: '✅' },
      { value: 'NCERT', label: 'Based', icon: '📖' },
    ],
    testimonials: [
      {
        name: 'Karthik Iyer',
        achievement: 'NEET 2024 - 662/720',
        quote:
          'Biodiversity is the easiest chapter in Class 12! These notes covered everything from NCERT perfectly.',
        score: '662/720',
      },
      {
        name: 'Riya Sharma',
        achievement: 'NEET 2024 - 655/720',
        quote:
          'The conservation strategies comparison table helped me answer all questions correctly!',
        score: '655/720',
      },
    ],
    faqs: [
      {
        question: 'How important is Biodiversity for NEET?',
        answer:
          "Biodiversity & Conservation contributes 4-6 marks (1-2 questions). It's part of the easy ecology unit and questions are mostly direct from NCERT.",
      },
      {
        question: 'Should I memorize all biodiversity hotspots?',
        answer:
          'Yes, knowing the 4 Indian biodiversity hotspots and their endemic species is important. Global hotspots are less frequently asked.',
      },
      {
        question: 'Are formulas important in this chapter?',
        answer:
          'Shannon-Wiener and Simpson indices are occasionally asked. Understanding the concept is more important than memorizing formulas.',
      },
      {
        question: 'What about endangered species?',
        answer:
          'Know key examples of endangered species in India, Red List categories, and conservation success stories.',
      },
    ],
    courseSummary: {
      title: 'Master Biodiversity for NEET',
      duration: '12 months',
      batchSize: '10-12 students',
      features: [
        'Biodiversity with case studies',
        'Indian wildlife documentary analysis',
        'Conservation current affairs',
        'Ecological ethics discussions',
      ],
      price: {
        original: 45000,
        discounted: 35000,
        emi: '₹2,917/month',
      },
    },
    cta: {
      title: 'Master Biodiversity Chapter',
      subtitle: 'Easy marks from ecology unit',
      primaryButton: {
        text: 'Get Biodiversity Notes',
        link: '/resources/biodiversity-notes',
      },
      secondaryButton: {
        text: 'Join Full Course',
        link: '/courses',
      },
    },
    toolsCTA: chapterNotesToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'Ecology Notes NEET', link: '/ecology-notes-neet' },
      { title: 'Environmental Issues NEET', link: '/environmental-issues-notes-neet' },
      { title: 'NEET Biology Notes PDF', link: '/neet-biology-notes-pdf' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'Biodiversity for NEET',
      provider: 'Cerebrum Biology Academy',
      description: 'Complete biodiversity and conservation notes for NEET',
      duration: 'Self-paced',
      price: 0,
      priceCurrency: 'INR',
    },
  },

  'animal-kingdom-notes-neet': {
    slug: 'animal-kingdom-notes-neet',
    classLevel: 'class-11',
    title: 'Animal Kingdom Notes for NEET | Classification of Animals PDF',
    metaDescription:
      'Complete Animal Kingdom notes for NEET covering all phyla from Porifera to Chordata. Classification, characteristics, and examples with diagrams.',
    keywords: [
      'animal kingdom notes neet',
      'animal kingdom class 11',
      'animalia classification neet',
      'phylum chordata neet',
      'invertebrates neet notes',
    ],
    hero: {
      headline: 'Animal Kingdom Notes for NEET',
      subheadline:
        'Master animal classification from Porifera to Mammalia! Comprehensive notes covering all phyla with characteristics, examples, and diagrams.',
      highlightedText: '8-10 Marks',
      ctaText: 'Get Animal Kingdom Notes',
      ctaLink: '/resources/animal-kingdom-notes',
    },
    painPoints: {
      title: 'Animal Kingdom Challenges',
      points: [
        {
          icon: '🦠',
          question: 'Too many phyla to remember?',
          solution: 'Organized tables with key characteristics for each phylum',
        },
        {
          icon: '🔬',
          question: 'Confusing classification terminology?',
          solution: 'Clear definitions with examples and memory tricks',
        },
        {
          icon: '📋',
          question: "Can't remember animal examples?",
          solution: 'Lists of important examples for each class and order',
        },
      ],
    },
    benefits: {
      title: 'Complete Animal Kingdom Coverage',
      subtitle: 'All phyla systematically covered',
      items: [
        {
          icon: '🧽',
          title: 'Non-Chordates',
          description: 'Porifera, Cnidaria, Platyhelminthes, Nematoda, Annelida',
        },
        {
          icon: '🦐',
          title: 'Arthropoda & Mollusca',
          description: 'Largest phyla with all classes and examples',
        },
        {
          icon: '⭐',
          title: 'Echinodermata & Hemichordata',
          description: 'Characteristics, examples, and evolutionary importance',
        },
        {
          icon: '🐟',
          title: 'Chordata',
          description: 'All classes from fish to mammals with examples',
        },
      ],
    },
    stats: [
      { value: '8-10', label: 'NEET Marks', icon: '📊' },
      { value: '11', label: 'Phyla', icon: '📚' },
      { value: '50+', label: 'Examples', icon: '🦋' },
      { value: 'Class 11', label: 'Foundation', icon: '📖' },
    ],
    testimonials: [
      {
        name: 'Varun Reddy',
        achievement: 'NEET 2024 - 672/720',
        quote:
          'Animal Kingdom tables with all phyla characteristics saved me hours of revision time!',
        score: '672/720',
      },
      {
        name: 'Anita Sharma',
        achievement: 'NEET 2024 - 658/720',
        quote: 'The chordata classification with all vertebrate classes was perfectly organized.',
        score: '658/720',
      },
    ],
    faqs: [
      {
        question: 'How important is Animal Kingdom for NEET?',
        answer:
          'Animal Kingdom contributes 8-10 marks and is a crucial chapter. Questions test classification, characteristics of phyla, and specific examples.',
      },
      {
        question: 'Should I memorize all animal examples?',
        answer:
          'Focus on important examples for each phylum and class. Our notes highlight the most commonly asked examples in NEET.',
      },
      {
        question: 'Are diagrams important in Animal Kingdom?',
        answer:
          'Yes, diagrams of representative organisms from each phylum are important. Water vascular system in echinoderms is frequently asked.',
      },
      {
        question: 'How to remember so many phyla characteristics?',
        answer:
          'Use comparison tables and mnemonics. Our notes provide memory tricks and organized tables for easy revision.',
      },
    ],
    courseSummary: {
      title: 'Master Animal Kingdom Classification',
      duration: '12 months',
      batchSize: '10-12 students',
      features: [
        'Complete animal diversity coverage',
        'Virtual zoo tours for classification',
        'Diagram-based learning',
        'Phylum comparison charts',
      ],
      price: {
        original: 45000,
        discounted: 35000,
        emi: '₹2,917/month',
      },
    },
    cta: {
      title: 'Master Animal Classification',
      subtitle: 'Score 8+ marks in Animal Kingdom',
      primaryButton: {
        text: 'Get Animal Kingdom Notes',
        link: '/resources/animal-kingdom-notes',
      },
      secondaryButton: {
        text: 'Join Full Course',
        link: '/courses',
      },
    },
    toolsCTA: chapterNotesToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'Plant Kingdom Notes NEET', link: '/plant-kingdom-notes-neet' },
      { title: 'Biological Classification Notes', link: '/biological-classification-notes-neet' },
      { title: 'NCERT Biology Class 11', link: '/ncert-biology-notes-class-11' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'Animal Kingdom for NEET',
      provider: 'Cerebrum Biology Academy',
      description: 'Complete animal kingdom notes for NEET',
      duration: 'Self-paced',
      price: 0,
      priceCurrency: 'INR',
    },
  },

  'plant-kingdom-notes-neet': {
    slug: 'plant-kingdom-notes-neet',
    classLevel: 'class-11',
    title: 'Plant Kingdom Notes for NEET | Classification of Plants PDF',
    metaDescription:
      'Complete Plant Kingdom notes for NEET covering Algae, Bryophytes, Pteridophytes, Gymnosperms & Angiosperms. Classification with examples and diagrams.',
    keywords: [
      'plant kingdom notes neet',
      'plant kingdom class 11',
      'plantae classification neet',
      'algae bryophytes pteridophytes neet',
      'angiosperms gymnosperms neet',
    ],
    hero: {
      headline: 'Plant Kingdom Notes for NEET',
      subheadline:
        'Master plant diversity! Comprehensive notes on Algae, Bryophytes, Pteridophytes, Gymnosperms, and Angiosperms with life cycles and diagrams.',
      highlightedText: '6-8 Marks',
      ctaText: 'Get Plant Kingdom Notes',
      ctaLink: '/resources/plant-kingdom-notes',
    },
    painPoints: {
      title: 'Plant Kingdom Challenges',
      points: [
        {
          icon: '🌿',
          question: 'Life cycles seem complex?',
          solution: 'Step-by-step life cycle diagrams for each group',
        },
        {
          icon: '🔄',
          question: 'Alternation of generations confusing?',
          solution: 'Clear visual explanations with examples',
        },
        {
          icon: '📊',
          question: "Can't differentiate plant groups?",
          solution: 'Comprehensive comparison tables',
        },
      ],
    },
    benefits: {
      title: 'Complete Plant Kingdom Coverage',
      subtitle: 'From algae to angiosperms',
      items: [
        {
          icon: '🌊',
          title: 'Algae',
          description: 'Chlorophyceae, Phaeophyceae, Rhodophyceae with examples',
        },
        {
          icon: '🌱',
          title: 'Bryophytes',
          description: 'Liverworts, mosses, hornworts - life cycles explained',
        },
        {
          icon: '🌿',
          title: 'Pteridophytes',
          description: 'Ferns, horsetails - vascular cryptogams',
        },
        {
          icon: '🌲',
          title: 'Gymnosperms & Angiosperms',
          description: 'Seed plants - naked vs covered seeds',
        },
      ],
    },
    stats: [
      { value: '6-8', label: 'NEET Marks', icon: '📊' },
      { value: '5', label: 'Plant Groups', icon: '🌿' },
      { value: '25+', label: 'Examples', icon: '🌸' },
      { value: 'Class 11', label: 'Foundation', icon: '📖' },
    ],
    testimonials: [
      {
        name: 'Siddharth Kumar',
        achievement: 'NEET 2024 - 665/720',
        quote:
          'The life cycle diagrams for each plant group made understanding alternation of generations so easy!',
        score: '665/720',
      },
      {
        name: 'Meghana Rao',
        achievement: 'NEET 2024 - 652/720',
        quote: 'Plant Kingdom comparison tables were perfect for last-minute revision before NEET.',
        score: '652/720',
      },
    ],
    faqs: [
      {
        question: 'How important is Plant Kingdom for NEET?',
        answer:
          'Plant Kingdom contributes 6-8 marks. Life cycles and characteristics of each group are commonly tested.',
      },
      {
        question: 'Should I learn all life cycles?',
        answer:
          'Yes, life cycles of Funaria (moss), Marchantia (liverwort), and ferns are important. Our notes have detailed diagrams.',
      },
      {
        question: 'Are algae examples important?',
        answer:
          'Yes, examples like Chlamydomonas, Volvox, Ulothrix, Spirogyra, Laminaria, Fucus, Porphyra are commonly asked.',
      },
      {
        question: 'What about economic importance?',
        answer:
          'Economic importance of algae (agar, carrageenan), bryophytes (sphagnum), and ferns is occasionally asked.',
      },
    ],
    courseSummary: {
      title: 'Master Plant Kingdom',
      duration: '12 months',
      batchSize: '10-12 students',
      features: [
        'Complete plant diversity coverage',
        'Life cycle animations',
        'Herbarium virtual tours',
        'Comparison-based learning',
      ],
      price: {
        original: 45000,
        discounted: 35000,
        emi: '₹2,917/month',
      },
    },
    cta: {
      title: 'Master Plant Classification',
      subtitle: 'Understand plant evolution and diversity',
      primaryButton: {
        text: 'Get Plant Kingdom Notes',
        link: '/resources/plant-kingdom-notes',
      },
      secondaryButton: {
        text: 'Join Full Course',
        link: '/courses',
      },
    },
    toolsCTA: chapterNotesToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'Animal Kingdom Notes NEET', link: '/animal-kingdom-notes-neet' },
      { title: 'Plant Physiology Notes', link: '/plant-physiology-notes-neet' },
      { title: 'NCERT Biology Class 11', link: '/ncert-biology-notes-class-11' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'Plant Kingdom for NEET',
      provider: 'Cerebrum Biology Academy',
      description: 'Complete plant kingdom notes for NEET',
      duration: 'Self-paced',
      price: 0,
      priceCurrency: 'INR',
    },
  },

  'biomolecules-notes-neet': {
    slug: 'biomolecules-notes-neet',
    classLevel: 'class-11',
    title: 'Biomolecules Notes for NEET | Carbohydrates, Proteins, Lipids PDF',
    metaDescription:
      'Complete Biomolecules notes for NEET covering Carbohydrates, Proteins, Lipids, Nucleic Acids & Enzymes. Structure, function, and classification.',
    keywords: [
      'biomolecules notes neet',
      'biomolecules class 11',
      'carbohydrates proteins lipids neet',
      'enzymes neet notes',
      'nucleic acids neet',
    ],
    hero: {
      headline: 'Biomolecules Notes for NEET',
      subheadline:
        'Foundation of life chemistry! Complete notes on Carbohydrates, Proteins, Lipids, Nucleic Acids, and Enzymes with structures and functions.',
      highlightedText: '6-8 Marks',
      ctaText: 'Get Biomolecules Notes',
      ctaLink: '/resources/biomolecules-notes',
    },
    painPoints: {
      title: 'Biomolecules Challenges',
      points: [
        {
          icon: '🍬',
          question: 'Carbohydrate classification confusing?',
          solution: 'Clear classification with structures and examples',
        },
        {
          icon: '🧬',
          question: 'Protein structure levels hard to remember?',
          solution: 'Visual guide to primary, secondary, tertiary, quaternary',
        },
        {
          icon: '⚙️',
          question: 'Enzyme kinetics overwhelming?',
          solution: 'Simple explanations with graphs and examples',
        },
      ],
    },
    benefits: {
      title: 'Complete Biomolecules Coverage',
      subtitle: 'All life molecules explained',
      items: [
        {
          icon: '🍞',
          title: 'Carbohydrates',
          description: 'Monosaccharides, disaccharides, polysaccharides',
        },
        {
          icon: '🥩',
          title: 'Proteins',
          description: 'Amino acids, peptide bonds, protein structures',
        },
        {
          icon: '🧈',
          title: 'Lipids',
          description: 'Fatty acids, phospholipids, steroids',
        },
        {
          icon: '🧪',
          title: 'Enzymes',
          description: 'Classification, mechanism, factors affecting activity',
        },
      ],
    },
    stats: [
      { value: '6-8', label: 'NEET Marks', icon: '📊' },
      { value: '5', label: 'Topics', icon: '📚' },
      { value: '20+', label: 'Structures', icon: '🔬' },
      { value: 'Class 11', label: 'Foundation', icon: '📖' },
    ],
    testimonials: [
      {
        name: 'Rohit Mehta',
        achievement: 'NEET 2024 - 668/720',
        quote: 'The enzyme kinetics section with Michaelis-Menten explanation was crystal clear!',
        score: '668/720',
      },
      {
        name: 'Divya Patel',
        achievement: 'NEET 2024 - 655/720',
        quote:
          'Biomolecules structures and comparison tables helped me answer all questions correctly.',
        score: '655/720',
      },
    ],
    faqs: [
      {
        question: 'How important is Biomolecules for NEET?',
        answer:
          'Biomolecules contributes 6-8 marks. Questions focus on classification, structures, and enzyme properties.',
      },
      {
        question: 'Should I learn all amino acid structures?',
        answer:
          'Focus on classification (essential/non-essential, polar/non-polar) and R-group properties rather than memorizing all structures.',
      },
      {
        question: 'Are enzyme graphs important?',
        answer:
          'Yes, effect of temperature, pH, and substrate concentration on enzyme activity graphs are commonly tested.',
      },
      {
        question: 'What about nucleic acid structure?',
        answer:
          'DNA and RNA structure, differences, and nucleotide components are important. This overlaps with molecular biology.',
      },
    ],
    courseSummary: {
      title: 'Master Biomolecules',
      duration: '12 months',
      batchSize: '10-12 students',
      features: [
        'Complete biomolecules with 3D models',
        'Enzyme kinetics simulations',
        'Structure-function correlations',
        'Biochemistry problem solving',
      ],
      price: {
        original: 45000,
        discounted: 35000,
        emi: '₹2,917/month',
      },
    },
    cta: {
      title: 'Master Biomolecules',
      subtitle: 'Understand the chemistry of life',
      primaryButton: {
        text: 'Get Biomolecules Notes',
        link: '/resources/biomolecules-notes',
      },
      secondaryButton: {
        text: 'Join Full Course',
        link: '/courses',
      },
    },
    toolsCTA: chapterNotesToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'Cell Biology Notes NEET', link: '/cell-biology-notes-neet' },
      { title: 'Genetics Notes NEET', link: '/genetics-notes-neet' },
      { title: 'NCERT Biology Class 11', link: '/ncert-biology-notes-class-11' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'Biomolecules for NEET',
      provider: 'Cerebrum Biology Academy',
      description: 'Complete biomolecules notes for NEET',
      duration: 'Self-paced',
      price: 0,
      priceCurrency: 'INR',
    },
  },

  'morphology-flowering-plants-notes-neet': {
    slug: 'morphology-flowering-plants-notes-neet',
    classLevel: 'class-11',
    title: 'Morphology of Flowering Plants Notes for NEET | Root, Stem, Leaf PDF',
    metaDescription:
      'Complete Morphology of Flowering Plants notes for NEET covering Root, Stem, Leaf, Flower, Fruit & Seed. Modifications and diagrams included.',
    keywords: [
      'morphology of flowering plants neet',
      'morphology notes class 11',
      'root stem leaf modifications neet',
      'flower structure neet',
      'fruit and seed neet',
    ],
    hero: {
      headline: 'Morphology of Flowering Plants Notes',
      subheadline:
        'Visual and diagram-heavy chapter! Complete notes on plant external features - root, stem, leaf, flower, fruit, and seed with modifications.',
      highlightedText: '4-6 Marks',
      ctaText: 'Get Morphology Notes',
      ctaLink: '/resources/morphology-notes',
    },
    painPoints: {
      title: 'Morphology Chapter Challenges',
      points: [
        {
          icon: '🌱',
          question: 'Too many modifications to remember?',
          solution: 'Categorized tables with examples and diagrams',
        },
        {
          icon: '🌸',
          question: 'Flower diagrams confusing?',
          solution: 'Labeled diagrams with floral formulas explained',
        },
        {
          icon: '📝',
          question: 'Technical terminology overwhelming?',
          solution: 'Glossary with definitions and examples',
        },
      ],
    },
    benefits: {
      title: 'Complete Morphology Coverage',
      subtitle: 'All plant parts systematically covered',
      items: [
        {
          icon: '🌱',
          title: 'Root System',
          description: 'Types, regions, modifications with examples',
        },
        {
          icon: '🌿',
          title: 'Stem & Leaf',
          description: 'Structure, modifications, phyllotaxy, venation',
        },
        {
          icon: '🌸',
          title: 'Flower',
          description: 'Parts, types, floral formula, floral diagrams',
        },
        {
          icon: '🍎',
          title: 'Fruit & Seed',
          description: 'Types of fruits, seed structure, germination',
        },
      ],
    },
    stats: [
      { value: '4-6', label: 'NEET Marks', icon: '📊' },
      { value: '6', label: 'Topics', icon: '📚' },
      { value: '40+', label: 'Diagrams', icon: '🖼️' },
      { value: 'Diagram', label: 'Based', icon: '🎨' },
    ],
    testimonials: [
      {
        name: 'Aakash Verma',
        achievement: 'NEET 2024 - 660/720',
        quote:
          'The modification tables with diagrams for root, stem, and leaf were incredibly helpful!',
        score: '660/720',
      },
      {
        name: 'Snehal Patil',
        achievement: 'NEET 2024 - 648/720',
        quote: 'Floral diagrams and formulas finally made sense after reading these notes.',
        score: '648/720',
      },
    ],
    faqs: [
      {
        question: 'How important is Morphology for NEET?',
        answer:
          'Morphology contributes 4-6 marks. Questions are usually diagram-based testing modifications and flower structure.',
      },
      {
        question: 'Should I learn all modifications?',
        answer:
          'Focus on commonly asked modifications like pneumatophores, prop roots, thorns, tendrils. Our notes highlight important ones.',
      },
      {
        question: 'Are floral formulas important?',
        answer:
          'Yes, understanding how to read and write floral formulas for common plant families is important.',
      },
      {
        question: 'What about family characteristics?',
        answer:
          'Characteristics of Fabaceae, Solanaceae, and Liliaceae families with examples are commonly asked.',
      },
    ],
    courseSummary: {
      title: 'Master Plant Morphology',
      duration: '12 months',
      batchSize: '10-12 students',
      features: [
        'Complete morphology with specimens',
        'Virtual plant tours',
        'Diagram practice sessions',
        'Family identification practice',
      ],
      price: {
        original: 45000,
        discounted: 35000,
        emi: '₹2,917/month',
      },
    },
    cta: {
      title: 'Master Plant Morphology',
      subtitle: 'Learn plant external features thoroughly',
      primaryButton: {
        text: 'Get Morphology Notes',
        link: '/resources/morphology-notes',
      },
      secondaryButton: {
        text: 'Join Full Course',
        link: '/courses',
      },
    },
    toolsCTA: chapterNotesToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'Anatomy Flowering Plants Notes', link: '/anatomy-flowering-plants-notes-neet' },
      { title: 'Plant Kingdom Notes', link: '/plant-kingdom-notes-neet' },
      { title: 'NCERT Biology Class 11', link: '/ncert-biology-notes-class-11' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'Morphology of Flowering Plants for NEET',
      provider: 'Cerebrum Biology Academy',
      description: 'Complete morphology notes for NEET',
      duration: 'Self-paced',
      price: 0,
      priceCurrency: 'INR',
    },
  },

  'anatomy-flowering-plants-notes-neet': {
    slug: 'anatomy-flowering-plants-notes-neet',
    classLevel: 'class-11',
    title: 'Anatomy of Flowering Plants Notes for NEET | Tissue Systems PDF',
    metaDescription:
      'Complete Anatomy of Flowering Plants notes for NEET covering Tissue Systems, Root, Stem & Leaf Anatomy. Detailed diagrams and comparisons.',
    keywords: [
      'anatomy of flowering plants neet',
      'plant anatomy notes class 11',
      'tissue systems neet',
      'dicot monocot anatomy neet',
      'plant tissues neet',
    ],
    hero: {
      headline: 'Anatomy of Flowering Plants Notes',
      subheadline:
        'Internal plant structure explained! Complete notes on plant tissues, tissue systems, and internal anatomy of root, stem, and leaf.',
      highlightedText: '4-6 Marks',
      ctaText: 'Get Anatomy Notes',
      ctaLink: '/resources/anatomy-notes',
    },
    painPoints: {
      title: 'Plant Anatomy Challenges',
      points: [
        {
          icon: '🔬',
          question: 'Dicot vs monocot diagrams confusing?',
          solution: 'Side-by-side comparison diagrams with labels',
        },
        {
          icon: '🧫',
          question: "Can't differentiate tissue types?",
          solution: 'Clear classification with characteristics and locations',
        },
        {
          icon: '📊',
          question: 'Secondary growth complex?',
          solution: 'Step-by-step explanation with annual ring formation',
        },
      ],
    },
    benefits: {
      title: 'Complete Plant Anatomy Coverage',
      subtitle: 'Internal structure simplified',
      items: [
        {
          icon: '🧫',
          title: 'Tissue Types',
          description: 'Meristematic, permanent, simple, complex tissues',
        },
        {
          icon: '🏗️',
          title: 'Tissue Systems',
          description: 'Epidermal, ground, vascular tissue systems',
        },
        {
          icon: '🔍',
          title: 'Organ Anatomy',
          description: 'Root, stem, leaf - dicot vs monocot differences',
        },
        {
          icon: '📈',
          title: 'Secondary Growth',
          description: 'Vascular cambium, cork cambium, annual rings',
        },
      ],
    },
    stats: [
      { value: '4-6', label: 'NEET Marks', icon: '📊' },
      { value: '4', label: 'Topics', icon: '📚' },
      { value: '30+', label: 'Diagrams', icon: '🖼️' },
      { value: 'Diagram', label: 'Based', icon: '🎨' },
    ],
    testimonials: [
      {
        name: 'Prakash Reddy',
        achievement: 'NEET 2024 - 662/720',
        quote:
          'The dicot-monocot comparison diagrams for root, stem, and leaf were exactly what NEET tests!',
        score: '662/720',
      },
      {
        name: 'Neha Gupta',
        achievement: 'NEET 2024 - 650/720',
        quote:
          'Secondary growth explanation with diagrams made this complex topic easy to understand.',
        score: '650/720',
      },
    ],
    faqs: [
      {
        question: 'How important is Plant Anatomy for NEET?',
        answer:
          'Plant Anatomy contributes 4-6 marks. Questions are diagram-based, testing dicot-monocot differences and tissue identification.',
      },
      {
        question: 'Which diagrams are must-know?',
        answer:
          'TS of dicot root, monocot root, dicot stem, monocot stem, and dorsiventral leaf are commonly asked.',
      },
      {
        question: 'Is secondary growth important?',
        answer:
          'Yes, understanding how vascular cambium and cork cambium cause secondary growth is important for NEET.',
      },
      {
        question: 'Should I know all tissue types?',
        answer:
          'Yes, characteristics and functions of all simple and complex tissues (xylem, phloem) are tested.',
      },
    ],
    courseSummary: {
      title: 'Master Plant Anatomy',
      duration: '12 months',
      batchSize: '10-12 students',
      features: [
        'Complete anatomy with microscope work',
        'Tissue identification practice',
        'Diagram drawing techniques',
        'Dicot-monocot comparisons',
      ],
      price: {
        original: 45000,
        discounted: 35000,
        emi: '₹2,917/month',
      },
    },
    cta: {
      title: 'Master Plant Anatomy',
      subtitle: 'Understand internal plant structure',
      primaryButton: {
        text: 'Get Anatomy Notes',
        link: '/resources/anatomy-notes',
      },
      secondaryButton: {
        text: 'Join Full Course',
        link: '/courses',
      },
    },
    toolsCTA: chapterNotesToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      {
        title: 'Morphology Flowering Plants Notes',
        link: '/morphology-flowering-plants-notes-neet',
      },
      { title: 'Plant Physiology Notes', link: '/plant-physiology-notes-neet' },
      { title: 'NCERT Biology Class 11', link: '/ncert-biology-notes-class-11' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'Anatomy of Flowering Plants for NEET',
      provider: 'Cerebrum Biology Academy',
      description: 'Complete plant anatomy notes for NEET',
      duration: 'Self-paced',
      price: 0,
      priceCurrency: 'INR',
    },
  },

  'structural-organisation-animals-notes-neet': {
    slug: 'structural-organisation-animals-notes-neet',
    classLevel: 'class-11',
    title: 'Structural Organisation in Animals Notes for NEET | Tissues PDF',
    metaDescription:
      'Complete Structural Organisation in Animals notes for NEET covering Animal Tissues, Organs & Organ Systems. Epithelial, connective, muscular, nervous tissues.',
    keywords: [
      'structural organisation in animals neet',
      'animal tissues neet notes',
      'epithelial tissue neet',
      'connective tissue neet',
      'organ systems neet',
    ],
    hero: {
      headline: 'Structural Organisation in Animals Notes',
      subheadline:
        'Animal tissue biology! Complete notes on epithelial, connective, muscular, and nervous tissues with organ system case studies.',
      highlightedText: '4-6 Marks',
      ctaText: 'Get Animal Tissue Notes',
      ctaLink: '/resources/animal-tissue-notes',
    },
    painPoints: {
      title: 'Animal Tissue Challenges',
      points: [
        {
          icon: '🧫',
          question: 'Too many tissue types to remember?',
          solution: 'Organized tables with types, locations, and functions',
        },
        {
          icon: '🔬',
          question: "Can't identify tissues from diagrams?",
          solution: 'Clear diagrams with identification features',
        },
        {
          icon: '🦴',
          question: 'Connective tissue subtypes confusing?',
          solution: 'Hierarchical classification with examples',
        },
      ],
    },
    benefits: {
      title: 'Complete Animal Tissue Coverage',
      subtitle: 'All four tissue types',
      items: [
        {
          icon: '🧱',
          title: 'Epithelial Tissue',
          description: 'Simple, stratified, squamous, cuboidal, columnar',
        },
        {
          icon: '🔗',
          title: 'Connective Tissue',
          description: 'Loose, dense, adipose, cartilage, bone, blood',
        },
        {
          icon: '💪',
          title: 'Muscular Tissue',
          description: 'Skeletal, smooth, cardiac muscle differences',
        },
        {
          icon: '🧠',
          title: 'Nervous Tissue',
          description: 'Neurons, neuroglia, synapse structure',
        },
      ],
    },
    stats: [
      { value: '4-6', label: 'NEET Marks', icon: '📊' },
      { value: '4', label: 'Tissue Types', icon: '🧫' },
      { value: '25+', label: 'Diagrams', icon: '🖼️' },
      { value: 'Class 11', label: 'Foundation', icon: '📖' },
    ],
    testimonials: [
      {
        name: 'Amit Sharma',
        achievement: 'NEET 2024 - 658/720',
        quote: 'The tissue comparison tables and location charts were perfect for quick revision!',
        score: '658/720',
      },
      {
        name: 'Priya Nair',
        achievement: 'NEET 2024 - 645/720',
        quote:
          'Understanding connective tissue classification became easy with these organized notes.',
        score: '645/720',
      },
    ],
    faqs: [
      {
        question: 'How important is this chapter for NEET?',
        answer:
          'Structural Organisation in Animals contributes 4-6 marks. Tissue identification and characteristics are commonly tested.',
      },
      {
        question: 'Which tissue type is most important?',
        answer:
          'All four tissue types are important. Connective tissue with its subtypes and epithelial tissue classification are frequently asked.',
      },
      {
        question: 'Is Cockroach/Frog morphology asked?',
        answer:
          'Yes, the comparative anatomy of cockroach or frog (depending on NCERT syllabus) is sometimes asked. Know key organ systems.',
      },
      {
        question: 'Should I draw tissue diagrams?',
        answer:
          'Focus on identification features rather than drawing. Know how to identify tissues from given diagrams.',
      },
    ],
    courseSummary: {
      title: 'Master Animal Tissues',
      duration: '12 months',
      batchSize: '10-12 students',
      features: [
        'Complete tissue biology with slides',
        'Histology virtual lab',
        'Tissue identification practice',
        'Comparative tissue tables',
      ],
      price: {
        original: 45000,
        discounted: 35000,
        emi: '₹2,917/month',
      },
    },
    cta: {
      title: 'Master Animal Tissues',
      subtitle: 'Understand tissue organization',
      primaryButton: {
        text: 'Get Animal Tissue Notes',
        link: '/resources/animal-tissue-notes',
      },
      secondaryButton: {
        text: 'Join Full Course',
        link: '/courses',
      },
    },
    toolsCTA: chapterNotesToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'Animal Kingdom Notes NEET', link: '/animal-kingdom-notes-neet' },
      { title: 'Human Physiology Notes', link: '/human-physiology-notes-neet' },
      { title: 'NCERT Biology Class 11', link: '/ncert-biology-notes-class-11' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'Structural Organisation in Animals for NEET',
      provider: 'Cerebrum Biology Academy',
      description: 'Complete animal tissue notes for NEET',
      duration: 'Self-paced',
      price: 0,
      priceCurrency: 'INR',
    },
  },

  'biological-classification-notes-neet': {
    slug: 'biological-classification-notes-neet',
    classLevel: 'class-11',
    title: 'Biological Classification Notes for NEET | Five Kingdom PDF',
    metaDescription:
      'Complete Biological Classification notes for NEET covering Five Kingdom Classification, Monera, Protista, Fungi, Plantae & Animalia. Characteristics and examples.',
    keywords: [
      'biological classification neet',
      'five kingdom classification neet',
      'kingdom monera protista fungi neet',
      'biological classification class 11',
      'whittaker classification neet',
    ],
    hero: {
      headline: 'Biological Classification Notes',
      subheadline:
        'Foundation of taxonomy! Complete notes on Five Kingdom Classification by Whittaker - Monera, Protista, Fungi, Plantae, and Animalia.',
      highlightedText: '6-8 Marks',
      ctaText: 'Get Classification Notes',
      ctaLink: '/resources/classification-notes',
    },
    painPoints: {
      title: 'Classification Challenges',
      points: [
        {
          icon: '🦠',
          question: 'Five kingdoms confusing?',
          solution: 'Clear comparison tables with all characteristics',
        },
        {
          icon: '🍄',
          question: "Can't remember all examples?",
          solution: 'Organized lists with commonly asked examples',
        },
        {
          icon: '📊',
          question: 'Overlapping characteristics confusing?',
          solution: 'Venn diagrams and comparison charts',
        },
      ],
    },
    benefits: {
      title: 'Complete Classification Coverage',
      subtitle: 'All five kingdoms explained',
      items: [
        {
          icon: '🦠',
          title: 'Kingdom Monera',
          description: 'Bacteria, cyanobacteria, archaebacteria, mycoplasma',
        },
        {
          icon: '🔬',
          title: 'Kingdom Protista',
          description: 'Chrysophytes, dinoflagellates, euglenoids, protozoans',
        },
        {
          icon: '🍄',
          title: 'Kingdom Fungi',
          description: 'Phycomycetes, Ascomycetes, Basidiomycetes, Deuteromycetes',
        },
        {
          icon: '🧬',
          title: 'Viruses & Viroids',
          description: 'Structure, characteristics, diseases caused',
        },
      ],
    },
    stats: [
      { value: '6-8', label: 'NEET Marks', icon: '📊' },
      { value: '5', label: 'Kingdoms', icon: '👑' },
      { value: '40+', label: 'Examples', icon: '📋' },
      { value: 'Class 11', label: 'Foundation', icon: '📖' },
    ],
    testimonials: [
      {
        name: 'Ravi Kumar',
        achievement: 'NEET 2024 - 665/720',
        quote:
          'The five kingdom comparison table was the best revision material. All characteristics at one place!',
        score: '665/720',
      },
      {
        name: 'Lakshmi Menon',
        achievement: 'NEET 2024 - 652/720',
        quote:
          'Fungi classification with examples for each class made this chapter scoring for me.',
        score: '652/720',
      },
    ],
    faqs: [
      {
        question: 'How important is Biological Classification for NEET?',
        answer:
          'Biological Classification contributes 6-8 marks. Questions test kingdom characteristics, examples, and basis of classification.',
      },
      {
        question: 'Are viruses part of Five Kingdom Classification?',
        answer:
          'No, viruses are not placed in any kingdom as they are non-cellular. But virus structure and types are important for NEET.',
      },
      {
        question: 'Which kingdom is most important?',
        answer:
          'Kingdom Monera and Kingdom Fungi are frequently tested. Know bacterial types, cyanobacteria, and fungal classes well.',
      },
      {
        question: 'Should I know all protist examples?',
        answer:
          'Focus on important examples like Amoeba, Paramecium, Euglena, Plasmodium, and their characteristics.',
      },
    ],
    courseSummary: {
      title: 'Master Biological Classification',
      duration: '12 months',
      batchSize: '10-12 students',
      features: [
        'Complete taxonomy with examples',
        'Microscopic organism identification',
        'Classification comparison charts',
        'Virus and prion case studies',
      ],
      price: {
        original: 45000,
        discounted: 35000,
        emi: '₹2,917/month',
      },
    },
    cta: {
      title: 'Master Biological Classification',
      subtitle: "Understand life's diversity",
      primaryButton: {
        text: 'Get Classification Notes',
        link: '/resources/classification-notes',
      },
      secondaryButton: {
        text: 'Join Full Course',
        link: '/courses',
      },
    },
    toolsCTA: chapterNotesToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'Animal Kingdom Notes NEET', link: '/animal-kingdom-notes-neet' },
      { title: 'Plant Kingdom Notes NEET', link: '/plant-kingdom-notes-neet' },
      { title: 'NCERT Biology Class 11', link: '/ncert-biology-notes-class-11' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'Biological Classification for NEET',
      provider: 'Cerebrum Biology Academy',
      description: 'Complete biological classification notes for NEET',
      duration: 'Self-paced',
      price: 0,
      priceCurrency: 'INR',
    },
  },
}
