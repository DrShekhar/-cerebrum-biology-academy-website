import { SEOLandingContent } from './types'

// Base content for Topic-specific pages
const topicBaseContent = {
  stats: [
    { value: '98%', label: 'Success Rate', icon: 'trophy' },
    { value: '5,000+', label: 'Students Trained', icon: 'users' },
    { value: '330+', label: 'Avg Biology Score', icon: 'award' },
    { value: '15+', label: 'Years Experience', icon: 'clock' },
  ],
  testimonials: [
    {
      name: 'Dr. Priya Sharma',
      achievement: 'AIIMS Delhi | AIR 267',
      quote:
        'Topic-wise teaching made complex concepts simple. Each chapter was covered with depth and clarity!',
      score: '340/360 Biology',
    },
    {
      name: 'Aditya Kumar',
      achievement: 'MAMC Delhi | AIR 445',
      quote:
        'The focused topic approach helped me master difficult chapters. Best teaching methodology!',
      score: '332/360 Biology',
    },
    {
      name: 'Dr. Meera Reddy',
      achievement: 'JIPMER | AIR 312',
      quote:
        'Every topic was taught from basics to NEET level. Perfect for building strong foundation!',
      score: '345/360 Biology',
    },
  ],
  relatedPages: [
    { title: 'Class 11 Biology', link: '/class-11' },
    { title: 'Class 12 Biology', link: '/class-12' },
    { title: 'All Courses', link: '/courses' },
    { title: 'Study Resources', link: '/resources' },
  ],
}

// Page 1: /cell-biology-tuition/
export const cellBiologyTuition: SEOLandingContent = {
  ...topicBaseContent,
  slug: 'cell-biology-tuition',
  classLevel: 'universal',

  title: 'Cell Biology Tuition | Online Classes for NEET',
  metaDescription:
    'Expert cell biology tuition for NEET. Cell structure, organelles, cell division - complete coverage. Join the best cell and molecular biology classes!',
  keywords: [
    'cell biology tuition',
    'cell biology',
    'cell and molecular biology',
    'cell biology classes',
    'cell structure tuition',
    'cell biology for neet',
  ],

  hero: {
    headline: 'Cell Biology - The Foundation of NEET Biology',
    subheadline:
      'Master cell structure, organelles, cell cycle, and cell division. 8-10 questions from this topic alone!',
    highlightedText: 'Cell = The Unit of Life = Unit of Marks',
    ctaText: 'Master Cell Biology',
    ctaLink: '/courses',
    backgroundGradient: 'from-green-800 via-cyan-900 to-blue-900',
  },

  painPoints: {
    title: 'Struggling with Cell Biology?',
    points: [
      {
        icon: 'circle',
        question: 'Too many organelles to remember?',
        solution: 'Our visual approach with mnemonics makes every organelle memorable.',
      },
      {
        icon: 'layers',
        question: 'Cell cycle phases confusing?',
        solution: 'Step-by-step teaching with diagrams. Never confuse phases again.',
      },
      {
        icon: 'target',
        question: 'Cant differentiate plant and animal cells?',
        solution: 'Comparison tables and tricks for instant recall in exams.',
      },
      {
        icon: 'book',
        question: 'Prokaryotic vs Eukaryotic confusion?',
        solution: 'Clear distinctions with examples. Perfect understanding guaranteed.',
      },
    ],
  },

  benefits: {
    title: 'Cell Biology Mastery',
    subtitle: 'Complete NEET coverage',
    items: [
      {
        icon: 'circle',
        title: 'Cell Structure',
        description: 'Plasma membrane, cell wall, organelles - complete coverage.',
      },
      {
        icon: 'layers',
        title: 'Cell Organelles',
        description: 'Nucleus, mitochondria, ER, Golgi - structure and function.',
      },
      {
        icon: 'repeat',
        title: 'Cell Division',
        description: 'Mitosis, meiosis - phases, diagrams, and differences.',
      },
      {
        icon: 'zap',
        title: 'Cell Cycle',
        description: 'Interphase, M-phase, checkpoints - detailed understanding.',
      },
      {
        icon: 'image',
        title: 'Diagram Practice',
        description: 'Every important diagram for cell biology NEET questions.',
      },
      {
        icon: 'clipboard',
        title: 'MCQ Practice',
        description: '500+ cell biology MCQs for complete preparation.',
      },
    ],
  },

  courseSummary: {
    title: 'Cell Biology Course',
    duration: 'Part of Full Course',
    batchSize: '10-12 Students',
    features: [
      'Complete cell structure and organelles',
      'Cell division - mitosis and meiosis',
      'Cell cycle and its regulation',
      'Diagram-based teaching',
      '500+ topic-specific MCQs',
      'Previous year questions analysis',
    ],
    price: {
      original: 75000,
      discounted: 67500,
      emi: '₹3,200/month',
    },
  },

  faqs: [
    {
      question: 'How many NEET questions come from Cell Biology?',
      answer:
        'Cell Biology is extremely high-yield! Typically 8-10 questions come from Cell Structure (The Unit of Life) and Cell Division chapters. This includes organelle functions, cell cycle, mitosis, and meiosis questions.',
    },
    {
      question: 'Which cell biology topics are most important for NEET?',
      answer:
        'Priority topics: 1) Cell organelles and their functions, 2) Plasma membrane structure (fluid mosaic model), 3) Mitosis and meiosis phases, 4) Cell cycle checkpoints, 5) Differences between plant and animal cells. We cover all with NEET focus.',
    },
    {
      question: 'Do you cover cell and molecular biology together?',
      answer:
        'Yes! Our cell biology teaching integrates molecular aspects like DNA replication connection to S-phase, membrane proteins, and enzyme functions. This gives complete understanding required for NEET.',
    },
    {
      question: 'How do you teach cell organelles for better retention?',
      answer:
        'We use: 1) Visual diagrams for each organelle, 2) Mnemonics for functions, 3) Comparison tables, 4) Real examples (why mitochondria is powerhouse), 5) MCQ practice for active recall. Multi-modal approach ensures retention.',
    },
    {
      question: 'Is cell biology part of Class 11 or 12?',
      answer:
        'Cell Biology (Cell Structure and Functions) is primarily a Class 11 topic. However, molecular biology concepts in Class 12 build on cell biology foundation. Our teaching ensures seamless connection between both.',
    },
    {
      question: 'Do you provide cell biology diagrams for practice?',
      answer:
        'Yes! We provide: 1) Cell structure diagrams, 2) Organelle diagrams, 3) Mitosis and meiosis stage diagrams, 4) Cell cycle diagrams. Each with labeling practice and NEET-type questions.',
    },
  ],

  cta: {
    title: 'Master Cell Biology for NEET',
    subtitle: 'Score 8-10 marks from this topic alone.',
    primaryButton: {
      text: 'Enroll Now',
      link: '/courses',
    },
    secondaryButton: {
      text: 'Book Free Demo',
      link: '/book-demo',
    },
    tertiaryButton: {
      text: 'Free Cell Biology Notes',
      link: '/resources',
    },
  },

  schema: {
    '@type': 'Course',
    courseName: 'Cell Biology Tuition for NEET',
    provider: 'Cerebrum Biology Academy',
    description:
      'Expert cell biology teaching for NEET covering cell structure, organelles, and cell division.',
    duration: 'P1Y',
    price: 67500,
    priceCurrency: 'INR',
  },
}

// Page 2: /molecular-biology-tuition/
export const molecularBiologyTuition: SEOLandingContent = {
  ...topicBaseContent,
  slug: 'molecular-biology-tuition',
  classLevel: 'universal',

  title: 'Molecular Biology Tuition | DNA RNA Protein Synthesis Classes',
  metaDescription:
    'Expert molecular biology tuition for NEET. DNA replication, transcription, translation - complete coverage. Master molecular basis of inheritance!',
  keywords: [
    'molecular biology tuition',
    'molecular biology',
    'molecular biology classes',
    'dna rna tuition',
    'molecular biology for neet',
    'genetics molecular biology',
  ],

  hero: {
    headline: 'Molecular Biology - From DNA to Protein',
    subheadline:
      'Master DNA structure, replication, transcription, and translation. High-scoring topic with 8-10 NEET questions!',
    highlightedText: 'Central Dogma = Central to NEET Scoring',
    ctaText: 'Master Molecular Biology',
    ctaLink: '/courses',
    backgroundGradient: 'from-purple-900 via-violet-900 to-indigo-900',
  },

  painPoints: {
    title: 'Molecular Biology Challenges?',
    points: [
      {
        icon: 'dna',
        question: 'DNA structure and replication confusing?',
        solution: 'Step-by-step teaching with animations. Understand every enzyme role.',
      },
      {
        icon: 'shuffle',
        question: 'Mixing up transcription and translation?',
        solution: 'Clear distinctions with process flowcharts. Never confuse again.',
      },
      {
        icon: 'layers',
        question: 'Too many enzymes to remember?',
        solution: 'Enzyme mnemonics and function charts. Easy systematic memory.',
      },
      {
        icon: 'code',
        question: 'Genetic code seems abstract?',
        solution: 'Practical examples and pattern recognition. Code becomes simple.',
      },
    ],
  },

  benefits: {
    title: 'Molecular Biology Excellence',
    subtitle: 'Complete central dogma mastery',
    items: [
      {
        icon: 'dna',
        title: 'DNA Structure',
        description: 'Double helix, base pairing, DNA packaging - complete understanding.',
      },
      {
        icon: 'copy',
        title: 'DNA Replication',
        description: 'Enzymes, steps, leading vs lagging strand - detailed coverage.',
      },
      {
        icon: 'file-text',
        title: 'Transcription',
        description: 'RNA synthesis, promoters, termination - prokaryotic and eukaryotic.',
      },
      {
        icon: 'settings',
        title: 'Translation',
        description: 'Ribosomes, tRNA, protein synthesis - step-by-step process.',
      },
      {
        icon: 'code',
        title: 'Genetic Code',
        description: 'Codons, degeneracy, wobble hypothesis - complete coverage.',
      },
      {
        icon: 'edit-3',
        title: 'Gene Regulation',
        description: 'Lac operon, gene expression control - NEET important topics.',
      },
    ],
  },

  courseSummary: {
    title: 'Molecular Biology Course',
    duration: 'Part of Full Course',
    batchSize: '10-12 Students',
    features: [
      'DNA structure and replication',
      'Transcription in detail',
      'Translation step-by-step',
      'Genetic code and mutations',
      'Gene regulation (Lac operon)',
      '600+ molecular biology MCQs',
    ],
    price: {
      original: 75000,
      discounted: 67500,
      emi: '₹3,200/month',
    },
  },

  faqs: [
    {
      question: 'How important is Molecular Biology for NEET?',
      answer:
        'Extremely important! Molecular Basis of Inheritance is one of the highest-weightage chapters with 8-10 questions. Topics like DNA replication, transcription, translation, and lac operon are NEET favorites.',
    },
    {
      question: 'Is Molecular Biology in Class 11 or 12?',
      answer:
        'Molecular Biology is primarily covered in Class 12 NCERT under "Molecular Basis of Inheritance" chapter. Some basic concepts are introduced in Class 11 Biomolecules. Both are covered in our course.',
    },
    {
      question: 'How do you simplify DNA replication for students?',
      answer:
        'We use: 1) Animated step-by-step process, 2) Enzyme role flowcharts, 3) Leading vs lagging strand diagrams, 4) Comparison tables, 5) Memory tricks for enzymes. Complex process made simple!',
    },
    {
      question: 'Do you cover genetic code in detail?',
      answer:
        'Yes! We cover: codon table, degeneracy, wobble hypothesis, start and stop codons, universality exceptions. Also practice questions on reading mRNA and finding amino acid sequences.',
    },
    {
      question: 'Is Lac operon important for NEET?',
      answer:
        'Very important! Lac operon questions appear frequently. We cover: operon structure, inducible system, negative regulation, role of each gene. Diagram-based teaching for complete understanding.',
    },
    {
      question: 'How many questions come from this chapter in NEET?',
      answer:
        'Molecular Basis of Inheritance typically contributes 8-10 questions to NEET. Combined with Class 11 nucleic acids, this topic can give 10-12 marks. High-yield for serious aspirants!',
    },
  ],

  cta: {
    title: 'Master Molecular Biology',
    subtitle: 'DNA to Protein - complete understanding for NEET.',
    primaryButton: {
      text: 'Enroll Now',
      link: '/courses',
    },
    secondaryButton: {
      text: 'Book Free Demo',
      link: '/book-demo',
    },
    tertiaryButton: {
      text: 'Free Study Material',
      link: '/resources',
    },
  },

  schema: {
    '@type': 'Course',
    courseName: 'Molecular Biology Tuition for NEET',
    provider: 'Cerebrum Biology Academy',
    description:
      'Complete molecular biology tuition covering DNA, RNA, protein synthesis, and gene regulation for NEET.',
    duration: 'P1Y',
    price: 67500,
    priceCurrency: 'INR',
  },
}

// Page 3: /genetics-biology-tuition/
export const geneticsBiologyTuition: SEOLandingContent = {
  ...topicBaseContent,
  slug: 'genetics-biology-tuition',
  classLevel: 'universal',

  title: 'Genetics Biology Tuition | Complete Heredity Classes for NEET',
  metaDescription:
    'Expert genetics biology tuition for NEET. Mendelian genetics, inheritance patterns, pedigree analysis. Join the best genetics classes online!',
  keywords: [
    'genetics biology tuition',
    'genetics biology',
    'bio genetics',
    'genetics classes',
    'genetics tuition for neet',
    'heredity classes',
  ],

  hero: {
    headline: 'Genetics - Score 15+ Marks in NEET',
    subheadline:
      'From Mendels laws to molecular genetics. Complete genetics mastery with problem-solving practice!',
    highlightedText: 'Genetics = Highest Weightage Chapter',
    ctaText: 'Master Genetics',
    ctaLink: '/courses',
    backgroundGradient: 'from-green-900 via-green-800 to-green-800',
  },

  painPoints: {
    title: 'Genetics Giving You Trouble?',
    points: [
      {
        icon: 'git-branch',
        question: 'Inheritance patterns confusing?',
        solution: 'Systematic approach to every inheritance type. Pattern recognition made easy.',
      },
      {
        icon: 'users',
        question: 'Pedigree analysis seems complex?',
        solution: 'Step-by-step pedigree solving method. Any pedigree, any question.',
      },
      {
        icon: 'help-circle',
        question: 'Genetics problems taking too long?',
        solution: 'Quick calculation tricks. Solve genetics MCQs in 30 seconds.',
      },
      {
        icon: 'link',
        question: 'Linkage and crossing over unclear?',
        solution: 'Visual explanations with map distance calculations made simple.',
      },
    ],
  },

  benefits: {
    title: 'Genetics Excellence',
    subtitle: 'From Mendel to modern genetics',
    items: [
      {
        icon: 'git-branch',
        title: 'Mendelian Genetics',
        description: 'Laws of inheritance, monohybrid, dihybrid crosses with practice.',
      },
      {
        icon: 'shuffle',
        title: 'Inheritance Patterns',
        description: 'Incomplete dominance, codominance, multiple alleles, polygenic.',
      },
      {
        icon: 'link',
        title: 'Linkage & Crossing Over',
        description: 'Chromosome mapping, recombination frequency calculations.',
      },
      {
        icon: 'users',
        title: 'Pedigree Analysis',
        description: 'Autosomal, sex-linked - systematic approach for any pedigree.',
      },
      {
        icon: 'alert-triangle',
        title: 'Genetic Disorders',
        description: 'Chromosomal and Mendelian disorders - complete coverage.',
      },
      {
        icon: 'x-circle',
        title: 'Sex Determination',
        description: 'Human, birds, insects - different mechanisms explained.',
      },
    ],
  },

  courseSummary: {
    title: 'Genetics Course',
    duration: 'Part of Full Course',
    batchSize: '10-12 Students',
    features: [
      'Complete Mendelian genetics',
      'All inheritance patterns',
      'Pedigree analysis practice',
      'Linkage and mapping',
      'Genetic disorders coverage',
      '800+ genetics problems',
    ],
    price: {
      original: 75000,
      discounted: 67500,
      emi: '₹3,200/month',
    },
  },

  faqs: [
    {
      question: 'How many NEET questions come from Genetics?',
      answer:
        'Genetics is the HIGHEST weightage chapter! Typically 10-15 questions come from Principles of Inheritance and Variation. Add Molecular Genetics and you can score 15-20 marks from genetics alone!',
    },
    {
      question: 'How do you teach genetics problem solving?',
      answer:
        'Our approach: 1) Concept clarity first, 2) Simple problems, 3) Complex scenarios, 4) Shortcut methods, 5) Extensive practice. We solve 800+ genetics problems in the course. Speed and accuracy guaranteed!',
    },
    {
      question: 'Is genetics in Class 11 or Class 12?',
      answer:
        'Genetics is primarily Class 12 (Principles of Inheritance). However, cell division in Class 11 lays the foundation. Our teaching connects both classes seamlessly for complete understanding.',
    },
    {
      question: 'How to master pedigree analysis?',
      answer:
        'We teach a 5-step systematic approach: 1) Identify pattern type, 2) Check dominant/recessive, 3) Check autosomal/sex-linked, 4) Assign genotypes, 5) Calculate probabilities. Works for any pedigree!',
    },
    {
      question: 'Do you cover human genetic disorders?',
      answer:
        'Yes! Complete coverage of chromosomal disorders (Down, Turner, Klinefelter) and Mendelian disorders (color blindness, hemophilia, sickle cell). Pedigrees for each disorder practiced.',
    },
    {
      question: 'How long to complete genetics portion?',
      answer:
        'Thorough genetics coverage: 1.5-2 months including problem practice. We ensure you can solve any genetics question NEET throws at you. Quality over speed!',
    },
  ],

  cta: {
    title: 'Master Genetics for NEET',
    subtitle: 'Score 15+ marks from genetics alone.',
    primaryButton: {
      text: 'Enroll Now',
      link: '/courses',
    },
    secondaryButton: {
      text: 'Book Free Demo',
      link: '/book-demo',
    },
    tertiaryButton: {
      text: 'Free Genetics Problems',
      link: '/resources',
    },
  },

  schema: {
    '@type': 'Course',
    courseName: 'Genetics Biology Tuition',
    provider: 'Cerebrum Biology Academy',
    description:
      'Complete genetics course for NEET covering Mendelian genetics, inheritance patterns, and pedigree analysis.',
    duration: 'P1Y',
    price: 67500,
    priceCurrency: 'INR',
  },
}

// Page 4: /evolution-class-12/
export const evolutionClass12: SEOLandingContent = {
  ...topicBaseContent,
  slug: 'evolution-class-12',
  classLevel: 'class-12',

  title: 'Evolution Class 12 | Complete NEET Preparation',
  metaDescription:
    'Master Evolution Class 12 for NEET. Origin of life, Darwinism, natural selection, human evolution. Expert teaching for Biology evolution!',
  keywords: [
    'evolution class 12',
    'evolution biology',
    'evolution definition biology',
    'class 12 evolution',
    'evolution for neet',
    'theory of evolution class 12',
  ],

  hero: {
    headline: 'Evolution - Theory to Human Origins',
    subheadline:
      'From origin of life to human evolution. Conceptual understanding with NEET-focused teaching.',
    highlightedText: '4-5 Questions from Evolution Every Year',
    ctaText: 'Master Evolution',
    ctaLink: '/courses?class=class-12',
    backgroundGradient: 'from-amber-900 via-orange-900 to-red-900',
  },

  painPoints: {
    title: 'Evolution Seems Abstract?',
    points: [
      {
        icon: 'globe',
        question: 'Theories of evolution confusing?',
        solution: 'Clear comparison of Lamarck, Darwin, and modern synthesis. No confusion.',
      },
      {
        icon: 'clock',
        question: 'Too many names and timelines?',
        solution: 'Memory techniques for geological time scale and human ancestors.',
      },
      {
        icon: 'target',
        question: 'Hardy-Weinberg seems mathematical?',
        solution: 'Simple problem-solving approach. Mathematical evolution made easy.',
      },
      {
        icon: 'users',
        question: 'Human evolution overwhelming?',
        solution: 'Timeline approach with key features of each ancestor. Easy memory.',
      },
    ],
  },

  benefits: {
    title: 'Evolution Chapter Mastery',
    subtitle: 'Complete NCERT + NEET coverage',
    items: [
      {
        icon: 'globe',
        title: 'Origin of Life',
        description: 'Chemical evolution, Oparin-Haldane hypothesis, Millers experiment.',
      },
      {
        icon: 'trending-up',
        title: 'Theories of Evolution',
        description: 'Lamarckism, Darwinism, Modern Synthesis - clear understanding.',
      },
      {
        icon: 'shuffle',
        title: 'Natural Selection',
        description: 'Types, examples, industrial melanism - concept clarity.',
      },
      {
        icon: 'bar-chart',
        title: 'Hardy-Weinberg',
        description: 'Equilibrium, factors, problem-solving techniques.',
      },
      {
        icon: 'users',
        title: 'Human Evolution',
        description: 'Ancestor timeline, features, brain evolution - complete coverage.',
      },
      {
        icon: 'award',
        title: 'Evidence of Evolution',
        description: 'Fossils, homology, embryology - all types explained.',
      },
    ],
  },

  courseSummary: {
    title: 'Evolution Chapter',
    duration: 'Part of Class 12 Course',
    batchSize: '10-12 Students',
    features: [
      'Origin of life theories',
      'Darwinism and natural selection',
      'Hardy-Weinberg equilibrium',
      'Human evolution timeline',
      'Evidence of evolution',
      '200+ evolution MCQs',
    ],
    price: {
      original: 75000,
      discounted: 67500,
      emi: '₹3,200/month',
    },
  },

  faqs: [
    {
      question: 'How many NEET questions come from Evolution?',
      answer:
        'Evolution typically contributes 4-5 questions to NEET. While not as high as genetics, its a conceptual chapter where understanding guarantees marks. No numerical complexity - pure concept questions.',
    },
    {
      question: 'Is Evolution easy or difficult for NEET?',
      answer:
        'Evolution is conceptually easy but fact-heavy. Theory understanding is simple, but remembering human ancestor names, geological eras, and evidence types needs systematic study. Our approach makes it manageable.',
    },
    {
      question: 'How do you teach Hardy-Weinberg equilibrium?',
      answer:
        'Step-by-step approach: 1) Understand the equation, 2) Learn the 5 conditions, 3) Practice allele frequency calculations, 4) Understand factors disturbing equilibrium. Numerical problems practiced thoroughly.',
    },
    {
      question: 'Is human evolution important for NEET?',
      answer:
        'Yes! 1-2 questions typically come from human evolution. Key ancestors like Australopithecus, Homo erectus, Homo sapiens, brain volume, and timeline are NEET favorites.',
    },
    {
      question: 'How to remember geological time scale?',
      answer:
        'We provide mnemonics and timeline charts. Key is linking eras with major evolutionary events (Cambrian explosion, dinosaur extinction, mammal rise). Visualization helps memory.',
    },
    {
      question: 'Do you cover both NCERT and additional content for evolution?',
      answer:
        'Our focus is NCERT as 95% questions are from textbook. Additional points only for clarity. We ensure complete NCERT evolution coverage with NEET-focused teaching.',
    },
  ],

  cta: {
    title: 'Master Evolution for NEET',
    subtitle: 'From origins to human evolution - complete understanding.',
    primaryButton: {
      text: 'Enroll in Class 12',
      link: '/courses?class=class-12',
    },
    secondaryButton: {
      text: 'Book Free Demo',
      link: '/book-demo',
    },
    tertiaryButton: {
      text: 'Free Evolution Notes',
      link: '/resources',
    },
  },

  schema: {
    '@type': 'Course',
    courseName: 'Evolution Class 12 for NEET',
    provider: 'Cerebrum Biology Academy',
    description:
      'Complete Evolution chapter coverage for Class 12 NEET including Darwinism, natural selection, and human evolution.',
    duration: 'P6M',
    price: 67500,
    priceCurrency: 'INR',
  },
}

// Page 5: /biodiversity-conservation-class-12/
export const biodiversityConservationClass12: SEOLandingContent = {
  ...topicBaseContent,
  slug: 'biodiversity-conservation-class-12',
  classLevel: 'class-12',

  title: 'Biodiversity and Conservation Class 12 | NEET Biology',
  metaDescription:
    'Master Biodiversity and Conservation Class 12 for NEET. Species diversity, hotspots, conservation strategies. Complete ecology chapter coverage!',
  keywords: [
    'biodiversity and conservation class 12',
    'biodiversity class 12',
    'conservation biology',
    'biodiversity conservation',
    'ecology class 12',
    'biodiversity for neet',
  ],

  hero: {
    headline: 'Biodiversity & Conservation - Score Full Marks',
    subheadline:
      'Types of biodiversity, hotspots, extinction, conservation strategies. Fact-based scoring chapter!',
    highlightedText: '3-4 Direct Questions Every NEET',
    ctaText: 'Master Biodiversity',
    ctaLink: '/courses?class=class-12',
    backgroundGradient: 'from-green-900 via-green-800 to-lime-900',
  },

  painPoints: {
    title: 'Too Many Facts to Remember?',
    points: [
      {
        icon: 'list',
        question: 'Biodiversity types confusing?',
        solution: 'Clear categorization - genetic, species, ecosystem. Examples for each.',
      },
      {
        icon: 'map-pin',
        question: 'Hotspots difficult to remember?',
        solution: 'India hotspots with key species. Memory tricks for global hotspots.',
      },
      {
        icon: 'shield',
        question: 'Conservation strategies overwhelming?',
        solution: 'In-situ vs ex-situ organized approach. Key examples memorized.',
      },
      {
        icon: 'alert-triangle',
        question: 'Extinction causes and effects unclear?',
        solution: 'HIPPO framework for causes. Clear understanding of each threat.',
      },
    ],
  },

  benefits: {
    title: 'Biodiversity Chapter Coverage',
    subtitle: 'Complete NCERT with NEET focus',
    items: [
      {
        icon: 'layers',
        title: 'Types of Biodiversity',
        description: 'Genetic, species, ecosystem diversity with examples.',
      },
      {
        icon: 'bar-chart',
        title: 'Species Diversity',
        description: 'Latitudinal patterns, species-area relationship, Rivet popper.',
      },
      {
        icon: 'map-pin',
        title: 'Biodiversity Hotspots',
        description: 'Global and Indian hotspots, endemic species, key features.',
      },
      {
        icon: 'x-circle',
        title: 'Biodiversity Loss',
        description: 'Causes (HIPPO), extinction rates, conservation urgency.',
      },
      {
        icon: 'shield',
        title: 'Conservation',
        description: 'In-situ, ex-situ strategies, national parks, sanctuaries.',
      },
      {
        icon: 'globe',
        title: 'International Efforts',
        description: 'Earth Summit, biodiversity conventions, global initiatives.',
      },
    ],
  },

  courseSummary: {
    title: 'Biodiversity & Conservation',
    duration: 'Part of Class 12 Course',
    batchSize: '10-12 Students',
    features: [
      'Three levels of biodiversity',
      'Species diversity patterns',
      'Hotspots of biodiversity',
      'Conservation strategies',
      'Protected areas in India',
      '150+ chapter-specific MCQs',
    ],
    price: {
      original: 75000,
      discounted: 67500,
      emi: '₹3,200/month',
    },
  },

  faqs: [
    {
      question: 'How many NEET questions come from Biodiversity and Conservation?',
      answer:
        'Typically 3-4 questions come from this chapter. Combined with other ecology chapters, ecology unit gives 10-12 questions. Factual chapter with direct questions - easy scoring for prepared students.',
    },
    {
      question: 'Which biodiversity hotspots should I remember for NEET?',
      answer:
        'Focus on: 1) Four Indian hotspots (Western Ghats, Eastern Himalayas, Indo-Burma, Sundaland), 2) Madagascar, 3) Western Ghats species (especially endemic ones). Hotspot criteria also important.',
    },
    {
      question: 'How to remember conservation strategies?',
      answer:
        'We organize as: IN-SITU (National Parks, Wildlife Sanctuaries, Biosphere Reserves) vs EX-SITU (Zoos, Seed Banks, Botanical Gardens). Key examples for each type. Comparison table helps memory.',
    },
    {
      question: 'Is Biodiversity chapter linked to other ecology chapters?',
      answer:
        'Yes! Biodiversity connects with Ecosystem (productivity, energy flow) and Environment Issues (pollution, climate change). We teach ecology as integrated unit for better understanding.',
    },
    {
      question: 'What are key facts to remember from this chapter?',
      answer:
        'Key facts: 1) Number of species globally and in India, 2) Four Indian hotspots, 3) IUCN Red List categories, 4) National parks examples, 5) Species-area relationship formula. We provide fact sheets.',
    },
    {
      question: 'How do you make ecology chapters interesting?',
      answer:
        'We use real-world examples, current environmental issues, and connecting theory to observable phenomena. Makes factual content relatable and memorable rather than boring lists.',
    },
  ],

  cta: {
    title: 'Master Biodiversity & Conservation',
    subtitle: 'Score full marks from this factual chapter.',
    primaryButton: {
      text: 'Enroll in Class 12',
      link: '/courses?class=class-12',
    },
    secondaryButton: {
      text: 'Book Free Demo',
      link: '/book-demo',
    },
    tertiaryButton: {
      text: 'Free Ecology Notes',
      link: '/resources',
    },
  },

  schema: {
    '@type': 'Course',
    courseName: 'Biodiversity and Conservation Class 12',
    provider: 'Cerebrum Biology Academy',
    description: 'Complete Biodiversity and Conservation chapter for Class 12 NEET preparation.',
    duration: 'P6M',
    price: 67500,
    priceCurrency: 'INR',
  },
}

// Page 6: /animal-tissues-class-9/
export const animalTissuesClass9: SEOLandingContent = {
  ...topicBaseContent,
  slug: 'animal-tissues-class-9',
  classLevel: 'class-9',

  title: 'Animal Tissues Class 9 | Foundation for NEET Biology',
  metaDescription:
    'Learn Animal Tissues Class 9 for NEET foundation. Epithelial, connective, muscular, nervous tissues. Build your biology basics strong!',
  keywords: [
    'animal tissues class 9',
    'tissues class 9',
    'class 9 tissues',
    'animal tissue types',
    'tissue class 9 science',
    'tissues chapter class 9',
  ],

  hero: {
    headline: 'Animal Tissues - Your NEET Foundation Starts Here',
    subheadline:
      'Epithelial, connective, muscular, nervous - all four tissue types explained with diagrams and examples.',
    highlightedText: 'Class 9 Tissues = Class 11 Anatomy Foundation',
    ctaText: 'Start Foundation Course',
    ctaLink: '/courses?class=foundation-9',
    backgroundGradient: 'from-blue-900 via-indigo-900 to-violet-900',
  },

  painPoints: {
    title: 'Tissues Chapter Confusing?',
    points: [
      {
        icon: 'layers',
        question: 'Too many tissue types to remember?',
        solution: 'Systematic classification with memory techniques. All types organized.',
      },
      {
        icon: 'image',
        question: 'Cant visualize tissue structures?',
        solution: 'Diagram-based teaching with drawing practice. See and remember.',
      },
      {
        icon: 'link',
        question: 'Functions not clear?',
        solution: 'Structure-function correlation. Understand why tissues look how they look.',
      },
      {
        icon: 'book',
        question: 'Dont see NEET connection?',
        solution: 'We show how Class 9 tissues connect to Class 11-12 anatomy chapters.',
      },
    ],
  },

  benefits: {
    title: 'Tissue Types Mastery',
    subtitle: 'Foundation for higher classes',
    items: [
      {
        icon: 'layers',
        title: 'Epithelial Tissues',
        description: 'Simple, stratified, glandular - types, locations, functions.',
      },
      {
        icon: 'shield',
        title: 'Connective Tissues',
        description: 'Blood, bone, cartilage, adipose - complete classification.',
      },
      {
        icon: 'zap',
        title: 'Muscular Tissues',
        description: 'Skeletal, smooth, cardiac - structure and function comparison.',
      },
      {
        icon: 'cpu',
        title: 'Nervous Tissue',
        description: 'Neurons, types of neurons, nerve transmission basics.',
      },
      {
        icon: 'image',
        title: 'Diagrams',
        description: 'Draw and label each tissue type for board and NEET.',
      },
      {
        icon: 'git-branch',
        title: 'NEET Connection',
        description: 'Foundation for Class 11-12 anatomy and physiology.',
      },
    ],
  },

  courseSummary: {
    title: 'Tissues Chapter - Class 9',
    duration: 'Part of Foundation Course',
    batchSize: '10-12 Students',
    features: [
      'All four tissue types',
      'Sub-classification of each',
      'Diagram drawing practice',
      'Board exam preparation',
      'NEET foundation concepts',
      'Chapter practice questions',
    ],
    price: {
      original: 32000,
      discounted: 28000,
      emi: '₹2,400/month',
    },
  },

  faqs: [
    {
      question: 'How is Class 9 Tissues chapter important for NEET?',
      answer:
        'Class 9 Tissues builds foundation for Class 11 Structural Organisation chapter (5-6 NEET questions). Understanding tissue types here makes anatomy chapters much easier. Early foundation = later advantage.',
    },
    {
      question: 'What are the four types of animal tissues?',
      answer:
        'Four types: 1) Epithelial (covering/lining), 2) Connective (support/binding), 3) Muscular (movement), 4) Nervous (control/coordination). Each has subtypes which we cover systematically.',
    },
    {
      question: 'How do you teach tissue diagrams?',
      answer:
        'Our approach: 1) Show actual tissue images, 2) Simplified labeled diagrams, 3) Step-by-step drawing, 4) Practice sessions, 5) Quick diagram tests. You will be able to draw any tissue diagram.',
    },
    {
      question: 'Is Class 9 Biology enough to start NEET preparation?',
      answer:
        'Class 9 lays foundation! While NEET syllabus is Class 11-12, concepts in Class 9 (cells, tissues, diversity) make Class 11-12 learning faster. Smart students start early.',
    },
    {
      question: 'Do you cover plant tissues also?',
      answer:
        'Yes! Plant tissues (meristematic, permanent) are also covered in our Class 9 foundation course. Both plant and animal tissues are important for complete understanding.',
    },
    {
      question: 'What is the best age to start NEET foundation?',
      answer:
        'Class 9 is ideal starting point. Early foundation means: 1) Stronger basics, 2) More time for Class 11-12 depth, 3) Less stress in final years. Start early, score high!',
    },
  ],

  cta: {
    title: 'Build Your Biology Foundation',
    subtitle: 'Start early, prepare right for NEET.',
    primaryButton: {
      text: 'Join Class 9 Foundation',
      link: '/courses?class=foundation-9',
    },
    secondaryButton: {
      text: 'Book Free Demo',
      link: '/book-demo',
    },
    tertiaryButton: {
      text: 'Free Foundation Material',
      link: '/resources',
    },
  },

  schema: {
    '@type': 'Course',
    courseName: 'Animal Tissues Class 9',
    provider: 'Cerebrum Biology Academy',
    description: 'Class 9 Animal Tissues chapter for NEET foundation preparation.',
    duration: 'P1Y',
    price: 28000,
    priceCurrency: 'INR',
  },
}

// Page 7: /plant-physiology-class-11/
export const plantPhysiologyClass11: SEOLandingContent = {
  ...topicBaseContent,
  slug: 'plant-physiology-class-11',
  classLevel: 'class-11',

  title: 'Plant Physiology Class 11 | Complete NEET Preparation',
  metaDescription:
    'Master Plant Physiology Class 11 for NEET. Photosynthesis, respiration, plant hormones, mineral nutrition. Expert teaching for 15+ marks!',
  keywords: [
    'plant physiology class 11',
    'plant biology',
    'plant physiology for neet',
    'photosynthesis class 11',
    'plant respiration',
    'plant hormones neet',
  ],

  hero: {
    headline: 'Plant Physiology - The High-Scoring Unit',
    subheadline:
      'Photosynthesis, respiration, nutrition, growth - master the entire Plant Physiology unit. 15+ NEET marks await!',
    highlightedText: 'Unit V = Most Questions from Class 11',
    ctaText: 'Master Plant Physiology',
    ctaLink: '/courses?class=class-11',
    backgroundGradient: 'from-green-900 via-lime-900 to-green-800',
  },

  painPoints: {
    title: 'Plant Physiology Challenges?',
    points: [
      {
        icon: 'sun',
        question: 'Photosynthesis reactions confusing?',
        solution: 'Light and dark reactions explained step-by-step with diagrams.',
      },
      {
        icon: 'droplet',
        question: 'Water transport mechanisms unclear?',
        solution: 'Root pressure, transpiration pull - visual explanations.',
      },
      {
        icon: 'flask',
        question: 'Too many pathways to remember?',
        solution: 'C3, C4, CAM, respiration - organized approach with comparisons.',
      },
      {
        icon: 'trending-up',
        question: 'Plant hormones overwhelming?',
        solution: 'Hormone-by-hormone approach with effects and applications.',
      },
    ],
  },

  benefits: {
    title: 'Plant Physiology Excellence',
    subtitle: 'Complete Unit V coverage',
    items: [
      {
        icon: 'droplet',
        title: 'Water Relations',
        description: 'Transport in plants, absorption, transpiration - complete coverage.',
      },
      {
        icon: 'cloud',
        title: 'Mineral Nutrition',
        description: 'Essential elements, deficiency symptoms, nitrogen cycle.',
      },
      {
        icon: 'sun',
        title: 'Photosynthesis',
        description: 'Light reactions, Calvin cycle, C4, CAM pathways - detailed.',
      },
      {
        icon: 'zap',
        title: 'Respiration',
        description: 'Glycolysis, Krebs cycle, ETS - step-by-step teaching.',
      },
      {
        icon: 'trending-up',
        title: 'Plant Growth',
        description: 'Growth phases, differentiation, development concepts.',
      },
      {
        icon: 'flask',
        title: 'Plant Hormones',
        description: 'Auxins, gibberellins, cytokinins - functions and applications.',
      },
    ],
  },

  courseSummary: {
    title: 'Plant Physiology Unit',
    duration: 'Part of Class 11 Course',
    batchSize: '10-12 Students',
    features: [
      'Complete Unit V coverage',
      'All chapters with NEET focus',
      'Pathway diagrams practice',
      'Hormone effects memorization',
      'Previous year analysis',
      '600+ plant physiology MCQs',
    ],
    price: {
      original: 75000,
      discounted: 67500,
      emi: '₹3,200/month',
    },
  },

  faqs: [
    {
      question: 'How many NEET questions come from Plant Physiology?',
      answer:
        'Plant Physiology (Unit V) is the highest-weightage Class 11 unit with 12-15 questions! Chapters covered: Transport, Mineral Nutrition, Photosynthesis, Respiration, Plant Growth. Must-score unit!',
    },
    {
      question: 'Which Plant Physiology chapter is most important?',
      answer:
        'Photosynthesis is most important (4-5 questions). Followed by Respiration (3-4), Plant Growth & Hormones (3-4), Mineral Nutrition (2-3), Transport (2-3). We give proportional time to each.',
    },
    {
      question: 'How do you simplify photosynthesis reactions?',
      answer:
        'Our approach: 1) Light reactions first with PS I & II, 2) Electron flow diagrams, 3) Calvin cycle step-by-step, 4) C4 and CAM comparisons, 5) Multiple diagram practice. Reactions become logical, not memorized.',
    },
    {
      question: 'Are plant hormones important for NEET?',
      answer:
        'Yes! 2-3 questions from hormones. Key topics: hormone discovery experiments, physiological effects, applications in agriculture. We cover all five major hormones with mnemonics.',
    },
    {
      question: 'How long to complete Plant Physiology unit?',
      answer:
        'Thorough coverage: 2-2.5 months for Unit V. This includes all 5 chapters, diagram practice, MCQs, and revision. Quality teaching ensures lasting understanding.',
    },
    {
      question: 'Do you cover experiments from Plant Physiology?',
      answer:
        'Yes! NEET asks about experiments: photosynthesis experiments, hormone experiments, mineral deficiency studies. We cover classic experiments and their conclusions.',
    },
  ],

  cta: {
    title: 'Master Plant Physiology',
    subtitle: 'Score 15+ marks from this high-yield unit.',
    primaryButton: {
      text: 'Enroll in Class 11',
      link: '/courses?class=class-11',
    },
    secondaryButton: {
      text: 'Book Free Demo',
      link: '/book-demo',
    },
    tertiaryButton: {
      text: 'Free Plant Physiology Notes',
      link: '/resources',
    },
  },

  schema: {
    '@type': 'Course',
    courseName: 'Plant Physiology Class 11',
    provider: 'Cerebrum Biology Academy',
    description:
      'Complete Plant Physiology unit for Class 11 NEET covering photosynthesis, respiration, hormones.',
    duration: 'P6M',
    price: 67500,
    priceCurrency: 'INR',
  },
}

// Page 8: /living-world-ncert/
export const livingWorldNcert: SEOLandingContent = {
  ...topicBaseContent,
  slug: 'living-world-ncert',
  classLevel: 'class-11',

  title: 'Living World NCERT | Class 11 Biology Chapter 1',
  metaDescription:
    'Master The Living World NCERT Class 11 for NEET. Taxonomy, classification, nomenclature. Start your NEET biology journey with Chapter 1!',
  keywords: [
    'living world ncert',
    'living world class 11',
    'the living world',
    'class 11 biology chapter 1',
    'taxonomy class 11',
    'living world neet',
  ],

  hero: {
    headline: 'The Living World - Where NEET Biology Begins',
    subheadline:
      'Chapter 1 of Class 11 NCERT. Taxonomy, classification hierarchy, nomenclature rules. Start strong!',
    highlightedText: 'Foundation Chapter for Diversity Units',
    ctaText: 'Start with Basics',
    ctaLink: '/courses?class=class-11',
    backgroundGradient: 'from-green-800 via-cyan-900 to-sky-900',
  },

  painPoints: {
    title: 'First Chapter Challenges?',
    points: [
      {
        icon: 'list',
        question: 'Taxonomic hierarchy confusing?',
        solution: 'Kingdom to species - systematic approach with memory tricks.',
      },
      {
        icon: 'tag',
        question: 'Nomenclature rules complex?',
        solution: 'Binomial nomenclature simplified with examples and practice.',
      },
      {
        icon: 'users',
        question: 'Scientists names hard to remember?',
        solution: 'Key scientists and their contributions organized logically.',
      },
      {
        icon: 'book',
        question: 'Seems too theoretical?',
        solution: 'Connect theory to NEET questions. See the relevance.',
      },
    ],
  },

  benefits: {
    title: 'Living World Mastery',
    subtitle: 'Complete Chapter 1 coverage',
    items: [
      {
        icon: 'eye',
        title: 'What is Living',
        description: 'Characteristics of life, metabolism, growth, reproduction.',
      },
      {
        icon: 'layers',
        title: 'Biodiversity',
        description: 'Species count, need for classification, taxonomic studies.',
      },
      {
        icon: 'git-branch',
        title: 'Taxonomy',
        description: 'Characterization, identification, classification, nomenclature.',
      },
      {
        icon: 'list',
        title: 'Taxonomic Categories',
        description: 'Species to kingdom - hierarchy with examples.',
      },
      {
        icon: 'book',
        title: 'Taxonomical Aids',
        description: 'Herbarium, botanical gardens, museums, keys.',
      },
      {
        icon: 'users',
        title: 'Key Scientists',
        description: 'Linnaeus, Whittaker and their contributions.',
      },
    ],
  },

  courseSummary: {
    title: 'The Living World Chapter',
    duration: 'Part of Class 11 Course',
    batchSize: '10-12 Students',
    features: [
      'Complete NCERT coverage',
      'Taxonomic hierarchy mastery',
      'Nomenclature rules',
      'Key definitions',
      'Previous year questions',
      'Foundation for diversity unit',
    ],
    price: {
      original: 75000,
      discounted: 67500,
      emi: '₹3,200/month',
    },
  },

  faqs: [
    {
      question: 'How many NEET questions come from The Living World?',
      answer:
        'Typically 1-2 questions from this chapter. While not high-weightage individually, it builds foundation for entire Diversity unit (8-10 questions). Understanding taxonomy makes later chapters easier.',
    },
    {
      question: 'What are the key topics from Living World for NEET?',
      answer:
        'Focus on: 1) Characteristics of living organisms, 2) Taxonomic categories with examples, 3) Binomial nomenclature rules, 4) Species concept, 5) Taxonomical aids. These are NEET favorites.',
    },
    {
      question: 'How to remember taxonomic hierarchy?',
      answer:
        'Use mnemonic: "King Philip Came Over For Good Soup" = Kingdom, Phylum, Class, Order, Family, Genus, Species. We provide mnemonics and examples for each level.',
    },
    {
      question: 'Is Living World chapter easy or difficult?',
      answer:
        'Conceptually easy, but terminologies need memorization. Its a foundation chapter - understand well now, benefit in later chapters. We make definitions and concepts crystal clear.',
    },
    {
      question: 'Should I start NEET preparation with this chapter?',
      answer:
        'Yes! Living World is the logical starting point. Its Chapter 1 of Class 11 NCERT. Understanding taxonomy here helps with all classification chapters. Start right, finish strong!',
    },
    {
      question: 'Do you cover all taxonomical aids?',
      answer:
        'Yes! Herbarium, botanical gardens, zoological parks, museums, keys - all covered with their purpose and examples. These are commonly asked in NEET.',
    },
  ],

  cta: {
    title: 'Start Your NEET Journey',
    subtitle: 'Begin with The Living World - the foundation chapter.',
    primaryButton: {
      text: 'Enroll in Class 11',
      link: '/courses?class=class-11',
    },
    secondaryButton: {
      text: 'Book Free Demo',
      link: '/book-demo',
    },
    tertiaryButton: {
      text: 'Free Chapter Notes',
      link: '/resources',
    },
  },

  schema: {
    '@type': 'Course',
    courseName: 'The Living World NCERT',
    provider: 'Cerebrum Biology Academy',
    description: 'Complete Living World chapter from Class 11 NCERT for NEET preparation.',
    duration: 'P6M',
    price: 67500,
    priceCurrency: 'INR',
  },
}

// Additional topic pages (9-15) follow similar pattern...
// Page 9: /dna-biology-tuition/
export const dnaBiologyTuition: SEOLandingContent = {
  ...topicBaseContent,
  slug: 'dna-biology-tuition',
  classLevel: 'universal',

  title: 'DNA Biology Tuition | Genetics DNA Classes for NEET',
  metaDescription:
    'Expert DNA biology tuition for NEET. DNA structure, replication, gene expression. Master genetics DNA with expert guidance!',
  keywords: [
    'dna biology',
    'dna classes',
    'genetics dna',
    'dna tuition',
    'dna structure for neet',
    'dna replication classes',
  ],

  hero: {
    headline: 'DNA - The Blueprint of Life',
    subheadline: 'From double helix to gene expression. Master DNA for 10+ NEET marks!',
    highlightedText: 'DNA Questions = Sure-Shot Marks',
    ctaText: 'Master DNA Biology',
    ctaLink: '/courses',
    backgroundGradient: 'bg-indigo-700',
  },

  painPoints: {
    title: 'DNA Concepts Unclear?',
    points: [
      {
        icon: 'dna',
        question: 'DNA structure confusing?',
        solution: 'Visual teaching with 3D models. See and understand.',
      },
      {
        icon: 'copy',
        question: 'Replication enzymes hard to remember?',
        solution: 'Enzyme role flowcharts with mnemonics.',
      },
      {
        icon: 'shuffle',
        question: 'Mixing DNA and RNA concepts?',
        solution: 'Clear comparison tables. No more confusion.',
      },
      {
        icon: 'settings',
        question: 'Gene expression complex?',
        solution: 'Step-by-step from DNA to protein.',
      },
    ],
  },

  benefits: {
    title: 'DNA Biology Excellence',
    subtitle: 'From structure to expression',
    items: [
      {
        icon: 'dna',
        title: 'DNA Structure',
        description: 'Double helix, base pairing, packaging - complete.',
      },
      {
        icon: 'copy',
        title: 'Replication',
        description: 'Enzymes, steps, leading and lagging strands.',
      },
      {
        icon: 'file-text',
        title: 'Transcription',
        description: 'DNA to RNA process explained clearly.',
      },
      {
        icon: 'settings',
        title: 'Translation',
        description: 'Protein synthesis step-by-step.',
      },
      {
        icon: 'edit-3',
        title: 'Gene Regulation',
        description: 'Lac operon and gene expression control.',
      },
      {
        icon: 'alert-triangle',
        title: 'Mutations',
        description: 'Types of mutations and their effects.',
      },
    ],
  },

  courseSummary: {
    title: 'DNA Biology Course',
    duration: 'Part of Full Course',
    batchSize: '10-12 Students',
    features: [
      'Complete DNA structure',
      'Replication in detail',
      'Central dogma',
      'Gene regulation',
      'Mutations coverage',
      '500+ DNA MCQs',
    ],
    price: {
      original: 75000,
      discounted: 67500,
      emi: '₹3,200/month',
    },
  },

  faqs: [
    {
      question: 'How important is DNA for NEET?',
      answer:
        'DNA topics are extremely important! Questions come from DNA structure (Class 11 Biomolecules), DNA replication (Class 12), and related molecular biology. Combined, you can score 10+ marks.',
    },
    {
      question: 'Is DNA in Class 11 or 12 NCERT?',
      answer:
        'Both! Class 11 covers DNA structure in Biomolecules. Class 12 covers DNA replication, transcription, translation in Molecular Basis of Inheritance. We integrate both for complete understanding.',
    },
    {
      question: 'How do you teach DNA replication simply?',
      answer:
        'Our method: 1) Origin of replication concept, 2) Enzyme-by-enzyme role explanation, 3) Leading vs lagging strand visualization, 4) Practice diagrams, 5) MCQ application. Complex made simple!',
    },
    {
      question: 'Do you cover DNA fingerprinting?',
      answer:
        'Yes! DNA fingerprinting, its applications, VNTRs, and forensic uses are covered. This topic is part of Biotechnology chapter and is NEET relevant.',
    },
    {
      question: 'What is the connection between DNA and genetics?',
      answer:
        'DNA is the molecular basis of genetics! Understanding DNA structure and replication is essential for genetics chapters. We teach this connection explicitly.',
    },
    {
      question: 'Are diagrams important for DNA topics?',
      answer:
        'Very important! DNA structure, replication fork, transcription, translation - all need diagram understanding. We practice drawing and labeling all key diagrams.',
    },
  ],

  cta: {
    title: 'Master DNA Biology',
    subtitle: 'From structure to expression - complete DNA coverage.',
    primaryButton: {
      text: 'Enroll Now',
      link: '/courses',
    },
    secondaryButton: {
      text: 'Book Free Demo',
      link: '/book-demo',
    },
    tertiaryButton: {
      text: 'Free DNA Notes',
      link: '/resources',
    },
  },

  schema: {
    '@type': 'Course',
    courseName: 'DNA Biology Tuition',
    provider: 'Cerebrum Biology Academy',
    description:
      'Complete DNA biology course for NEET covering structure, replication, and gene expression.',
    duration: 'P1Y',
    price: 67500,
    priceCurrency: 'INR',
  },
}

// Page 10: /botany-zoology-tuition/
export const botanyZoologyTuition: SEOLandingContent = {
  ...topicBaseContent,
  slug: 'botany-zoology-tuition',
  classLevel: 'universal',

  title: 'Botany and Zoology Tuition | Complete Biology for NEET',
  metaDescription:
    'Expert botany and zoology tuition for NEET. Complete plant and animal biology. Master both sections for 360/360 in Biology!',
  keywords: [
    'botany and zoology',
    'botany zoology',
    'botany classes',
    'zoology classes',
    'botany tuition',
    'zoology tuition for neet',
  ],

  hero: {
    headline: 'Botany + Zoology = Complete NEET Biology',
    subheadline:
      'Master both sections for maximum marks. Expert teaching in plant and animal biology!',
    highlightedText: '180 Botany + 180 Zoology = 360 Biology',
    ctaText: 'Master Both Sections',
    ctaLink: '/courses',
    backgroundGradient: 'from-green-900 via-green-800 to-cyan-900',
  },

  painPoints: {
    title: 'Struggling with Biology Sections?',
    points: [
      {
        icon: 'leaf',
        question: 'Botany seems boring?',
        solution: 'Our teaching makes plant biology interesting and scorable.',
      },
      {
        icon: 'bug',
        question: 'Too many organisms in zoology?',
        solution: 'Systematic classification with memory techniques.',
      },
      {
        icon: 'bar-chart',
        question: 'Weak in one section?',
        solution: 'Balanced teaching ensures strength in both.',
      },
      {
        icon: 'target',
        question: 'Dont know which to prioritize?',
        solution: 'Both are equally important. We cover both completely.',
      },
    ],
  },

  benefits: {
    title: 'Complete Biology Coverage',
    subtitle: 'Plant and animal biology mastery',
    items: [
      {
        icon: 'leaf',
        title: 'Plant Diversity',
        description: 'Algae to angiosperms - complete classification.',
      },
      {
        icon: 'flower',
        title: 'Plant Anatomy',
        description: 'Tissues, organs, secondary growth.',
      },
      {
        icon: 'sun',
        title: 'Plant Physiology',
        description: 'Photosynthesis, respiration, hormones.',
      },
      {
        icon: 'bug',
        title: 'Animal Diversity',
        description: 'Invertebrates to vertebrates.',
      },
      {
        icon: 'heart',
        title: 'Human Physiology',
        description: 'All organ systems covered.',
      },
      {
        icon: 'baby',
        title: 'Reproduction',
        description: 'Plant and animal reproduction.',
      },
    ],
  },

  courseSummary: {
    title: 'Complete Biology Course',
    duration: '1 Year Program',
    batchSize: '10-12 Students',
    features: [
      'Complete botany coverage',
      'Complete zoology coverage',
      'Balanced section preparation',
      'Section-wise test series',
      'Previous year analysis',
      '10,000+ MCQs both sections',
    ],
    price: {
      original: 85000,
      discounted: 75000,
      emi: '₹3,500/month',
    },
  },

  faqs: [
    {
      question: 'How is NEET Biology divided between Botany and Zoology?',
      answer:
        'NEET Biology has 90 questions in two sections: Section A (35 Botany + 35 Zoology = 70) and Section B (15 Botany + 15 Zoology, attempt 10 each). Total 180 marks each section.',
    },
    {
      question: 'Which section is easier - Botany or Zoology?',
      answer:
        'Neither is inherently easier! Botany has more factual content, Zoology has more application. We ensure you excel in both. Complete preparation leaves no weak spots.',
    },
    {
      question: 'Do you cover both sections with equal focus?',
      answer:
        'Absolutely! Our course gives equal time and attention to both Botany and Zoology. We track your progress section-wise and ensure balanced preparation.',
    },
    {
      question: 'Which Botany chapters are most important?',
      answer:
        'High-yield Botany: Plant Diversity, Plant Anatomy, Photosynthesis, Genetics, Biotechnology. Each contributes 3-5 questions. We cover all with NEET focus.',
    },
    {
      question: 'Which Zoology chapters are most important?',
      answer:
        'High-yield Zoology: Animal Diversity, Human Physiology (all systems), Human Reproduction, Evolution. These cover majority of zoology questions.',
    },
    {
      question: 'Can I score 360/360 in Biology?',
      answer:
        'Challenging but possible! Our toppers have scored 350+. Complete NCERT mastery, extensive MCQ practice, and systematic revision can get you there. We provide the roadmap!',
    },
  ],

  cta: {
    title: 'Master Complete Biology',
    subtitle: 'Botany + Zoology - balanced preparation for maximum marks.',
    primaryButton: {
      text: 'Enroll Now',
      link: '/courses',
    },
    secondaryButton: {
      text: 'Book Free Demo',
      link: '/book-demo',
    },
    tertiaryButton: {
      text: 'Free Study Material',
      link: '/resources',
    },
  },

  schema: {
    '@type': 'Course',
    courseName: 'Botany and Zoology Tuition',
    provider: 'Cerebrum Biology Academy',
    description:
      'Complete botany and zoology course for NEET covering all plant and animal biology.',
    duration: 'P1Y',
    price: 75000,
    priceCurrency: 'INR',
  },
}

// Page 11-15: Additional topic pages
export const ecologyBiologyTuition: SEOLandingContent = {
  ...topicBaseContent,
  slug: 'ecology-biology-tuition',
  classLevel: 'universal',
  title: 'Ecology Biology Tuition | Environmental Biology for NEET',
  metaDescription:
    'Expert ecology biology tuition for NEET. Population, ecosystem, biodiversity, environmental issues. Score 10+ marks from ecology!',
  keywords: [
    'ecology biology',
    'ecology and evolutionary biology',
    'ecology tuition',
    'ecosystem class 12',
    'environmental biology',
  ],
  hero: {
    headline: 'Ecology - The Scoring Unit of Class 12',
    subheadline:
      'Population, ecosystem, biodiversity, environment - complete ecology mastery for 10+ NEET marks!',
    highlightedText: 'Ecology Unit = 10-12 Questions',
    ctaText: 'Master Ecology',
    ctaLink: '/courses',
    backgroundGradient: 'from-lime-900 via-green-900 to-green-800',
  },
  painPoints: {
    title: 'Ecology Too Factual?',
    points: [
      {
        icon: 'globe',
        question: 'Too many terms in ecology?',
        solution: 'Organized approach with clear definitions and examples.',
      },
      {
        icon: 'bar-chart',
        question: 'Energy flow confusing?',
        solution: 'Visual diagrams for food chains, webs, pyramids.',
      },
      {
        icon: 'users',
        question: 'Population ecology overwhelming?',
        solution: 'Mathematical concepts simplified with practice.',
      },
      {
        icon: 'alert-triangle',
        question: 'Environmental issues scattered?',
        solution: 'Categorized coverage of all pollution and issues.',
      },
    ],
  },
  benefits: {
    title: 'Complete Ecology Coverage',
    subtitle: 'All four chapters mastered',
    items: [
      {
        icon: 'users',
        title: 'Population Ecology',
        description: 'Growth, interactions, age structure.',
      },
      {
        icon: 'globe',
        title: 'Ecosystem',
        description: 'Energy flow, nutrient cycling, productivity.',
      },
      {
        icon: 'layers',
        title: 'Biodiversity',
        description: 'Types, patterns, hotspots, conservation.',
      },
      {
        icon: 'alert-triangle',
        title: 'Environment',
        description: 'Pollution types, ozone, global warming.',
      },
      {
        icon: 'bar-chart',
        title: 'Ecological Pyramids',
        description: 'Energy, biomass, numbers - all types.',
      },
      { icon: 'award', title: 'Scoring Tips', description: 'Factual shortcuts for quick marks.' },
    ],
  },
  courseSummary: {
    title: 'Ecology Unit',
    duration: 'Part of Class 12 Course',
    batchSize: '10-12 Students',
    features: [
      'All ecology chapters',
      'Environmental issues',
      'Diagram-based learning',
      'Factual revision sheets',
      'Previous year focus',
      '400+ ecology MCQs',
    ],
    price: { original: 75000, discounted: 67500, emi: '₹3,200/month' },
  },
  faqs: [
    {
      question: 'How many NEET questions from Ecology?',
      answer:
        'Ecology unit gives 10-12 questions. Includes: Organisms and Populations (3-4), Ecosystem (3-4), Biodiversity (2-3), Environmental Issues (2-3). High-scoring factual unit!',
    },
    {
      question: 'Is Ecology easy for NEET?',
      answer:
        'Factually heavy but conceptually simple. Memory work is key. Our organized notes and revision techniques make ecology scoring accessible.',
    },
    {
      question: 'Which ecology chapter is most important?',
      answer:
        'Ecosystem is most important with concepts like energy flow, productivity, nutrient cycles. Population ecology follows with mathematical concepts.',
    },
    {
      question: 'Do you cover environmental issues?',
      answer:
        'Yes! Air, water, soil pollution, ozone depletion, climate change, solid waste - all covered with examples and solutions.',
    },
    {
      question: 'How to remember ecology facts?',
      answer:
        'We provide: categorized notes, fact sheets, mnemonics, revision quizzes. Active recall methods ensure facts stick for exam day.',
    },
    {
      question: 'Are ecological pyramids important?',
      answer:
        'Yes! Energy, biomass, and number pyramids with examples of inverted pyramids are NEET favorites. We practice all types.',
    },
  ],
  cta: {
    title: 'Master Ecology for NEET',
    subtitle: 'Score 10+ marks from this factual unit.',
    primaryButton: { text: 'Enroll Now', link: '/courses' },
    secondaryButton: { text: 'Book Free Demo', link: '/book-demo' },
    tertiaryButton: { text: 'Free Ecology Notes', link: '/resources' },
  },
  schema: {
    '@type': 'Course',
    courseName: 'Ecology Biology Tuition',
    provider: 'Cerebrum Biology Academy',
    description:
      'Complete ecology course for NEET covering population, ecosystem, biodiversity, and environment.',
    duration: 'P1Y',
    price: 67500,
    priceCurrency: 'INR',
  },
}

export const humanPhysiologyTuition: SEOLandingContent = {
  ...topicBaseContent,
  slug: 'human-physiology-tuition',
  classLevel: 'class-12',
  title: 'Human Physiology Tuition | Class 11-12 for NEET',
  metaDescription:
    'Expert human physiology tuition for NEET. All organ systems - digestion, respiration, circulation, excretion, nervous. 20+ NEET marks!',
  keywords: [
    'human physiology class 12',
    'physiology tuition',
    'human physiology for neet',
    'body systems biology',
    'physiology classes',
  ],
  hero: {
    headline: 'Human Physiology - Score 20+ Marks',
    subheadline:
      'All organ systems mastered. Digestion to neural control - complete human physiology for NEET!',
    highlightedText: 'Human Physiology = Highest Weightage',
    ctaText: 'Master Physiology',
    ctaLink: '/courses',
    backgroundGradient: 'from-red-900 via-rose-900 to-pink-900',
  },
  painPoints: {
    title: 'Physiology Overwhelming?',
    points: [
      {
        icon: 'heart',
        question: 'Too many systems to remember?',
        solution: 'System-by-system approach with clear organization.',
      },
      {
        icon: 'droplet',
        question: 'Processes and pathways complex?',
        solution: 'Step-by-step teaching with diagrams.',
      },
      {
        icon: 'brain',
        question: 'Neural system confusing?',
        solution: 'Visual explanations of nerve transmission.',
      },
      {
        icon: 'activity',
        question: 'Diagrams hard to draw?',
        solution: 'Drawing practice for each organ system.',
      },
    ],
  },
  benefits: {
    title: 'Complete Physiology Coverage',
    subtitle: 'All organ systems',
    items: [
      {
        icon: 'coffee',
        title: 'Digestion',
        description: 'Complete alimentary canal and digestion.',
      },
      {
        icon: 'wind',
        title: 'Respiration',
        description: 'Breathing, exchange, transport of gases.',
      },
      { icon: 'heart', title: 'Circulation', description: 'Heart, blood vessels, cardiac cycle.' },
      { icon: 'droplet', title: 'Excretion', description: 'Kidney structure, urine formation.' },
      { icon: 'zap', title: 'Movement', description: 'Muscles, skeleton, joints.' },
      { icon: 'brain', title: 'Neural', description: 'Neurons, CNS, reflex arc.' },
    ],
  },
  courseSummary: {
    title: 'Human Physiology',
    duration: 'Part of Full Course',
    batchSize: '10-12 Students',
    features: [
      'All organ systems',
      'Diagram practice',
      'Process flowcharts',
      'System comparisons',
      'Previous year focus',
      '1000+ physiology MCQs',
    ],
    price: { original: 75000, discounted: 67500, emi: '₹3,200/month' },
  },
  faqs: [
    {
      question: 'How many NEET questions from Human Physiology?',
      answer:
        'Human Physiology gives 18-22 questions! Includes all Class 11 (Unit IV) and some Class 12 physiology. Highest weightage area in NEET Biology.',
    },
    {
      question: 'Which physiology chapters are most important?',
      answer:
        'All are important but priority: 1) Digestion (4-5), 2) Breathing (3-4), 3) Body Fluids/Circulation (4-5), 4) Excretion (3-4), 5) Neural (3-4). We cover all thoroughly.',
    },
    {
      question: 'Is Human Physiology in Class 11 or 12?',
      answer:
        'Majority is Class 11 (Unit IV - 6 chapters). Some physiology aspects in Class 12 (Reproduction, Neural control). Both covered in our course.',
    },
    {
      question: 'How do you simplify complex processes?',
      answer:
        'We use: 1) Step-by-step breakdown, 2) Flowcharts for processes, 3) Organ diagrams, 4) Function tables, 5) Clinical connections for interest. Complex made simple!',
    },
    {
      question: 'Are diagrams important in physiology?',
      answer:
        'Very important! Heart, nephron, digestive system, respiratory system, brain - all need diagram skills. We practice drawing and labeling each.',
    },
    {
      question: 'How long to complete physiology?',
      answer:
        'Thorough coverage: 3-4 months for all systems. This includes concepts, diagrams, MCQs, and revision. Quality over speed!',
    },
  ],
  cta: {
    title: 'Master Human Physiology',
    subtitle: 'Score 20+ marks from physiology sections.',
    primaryButton: { text: 'Enroll Now', link: '/courses' },
    secondaryButton: { text: 'Book Free Demo', link: '/book-demo' },
    tertiaryButton: { text: 'Free Physiology Notes', link: '/resources' },
  },
  schema: {
    '@type': 'Course',
    courseName: 'Human Physiology Tuition',
    provider: 'Cerebrum Biology Academy',
    description: 'Complete human physiology for NEET covering all organ systems.',
    duration: 'P1Y',
    price: 67500,
    priceCurrency: 'INR',
  },
}

export const biomoleculesClass11: SEOLandingContent = {
  ...topicBaseContent,
  slug: 'biomolecules-class-11',
  classLevel: 'class-11',
  title: 'Biomolecules Class 11 | Complete NEET Preparation',
  metaDescription:
    'Master Biomolecules Class 11 for NEET. Carbohydrates, proteins, lipids, nucleic acids, enzymes. Complete biochemistry foundation!',
  keywords: [
    'biomolecules class 11',
    'biomolecules biology',
    'biomolecules for neet',
    'biochemistry class 11',
    'class 11 biomolecules',
  ],
  hero: {
    headline: 'Biomolecules - Chemistry of Life',
    subheadline:
      'Carbohydrates, proteins, lipids, nucleic acids - master the molecules that make life. 4-5 NEET questions!',
    highlightedText: 'Foundation for Molecular Biology',
    ctaText: 'Master Biomolecules',
    ctaLink: '/courses?class=class-11',
    backgroundGradient: 'from-yellow-900 via-amber-900 to-orange-900',
  },
  painPoints: {
    title: 'Biomolecules Confusing?',
    points: [
      {
        icon: 'box',
        question: 'Carbohydrate structures complex?',
        solution: 'Classification with structures explained simply.',
      },
      {
        icon: 'layers',
        question: 'Protein levels confusing?',
        solution: 'Primary to quaternary - clear explanation with examples.',
      },
      {
        icon: 'zap',
        question: 'Enzyme kinetics difficult?',
        solution: 'Simple graphical approach to understand kinetics.',
      },
      {
        icon: 'dna',
        question: 'Nucleic acid structures overwhelming?',
        solution: 'DNA, RNA structure comparison with diagrams.',
      },
    ],
  },
  benefits: {
    title: 'Biomolecules Mastery',
    subtitle: 'All molecules covered',
    items: [
      {
        icon: 'box',
        title: 'Carbohydrates',
        description: 'Mono, di, polysaccharides with structures.',
      },
      {
        icon: 'layers',
        title: 'Proteins',
        description: 'Amino acids, structure levels, functions.',
      },
      { icon: 'droplet', title: 'Lipids', description: 'Types, structures, biological roles.' },
      { icon: 'dna', title: 'Nucleic Acids', description: 'DNA, RNA structure and types.' },
      { icon: 'zap', title: 'Enzymes', description: 'Classification, mechanism, kinetics.' },
      { icon: 'flask', title: 'Metabolism', description: 'Anabolic and catabolic pathways.' },
    ],
  },
  courseSummary: {
    title: 'Biomolecules Chapter',
    duration: 'Part of Class 11 Course',
    batchSize: '10-12 Students',
    features: [
      'All biomolecule types',
      'Enzyme kinetics',
      'Structure diagrams',
      'Metabolic pathways',
      'NEET focus questions',
      '300+ biomolecule MCQs',
    ],
    price: { original: 75000, discounted: 67500, emi: '₹3,200/month' },
  },
  faqs: [
    {
      question: 'How many NEET questions from Biomolecules?',
      answer:
        'Typically 4-5 questions from Biomolecules chapter. Topics include carbohydrates, proteins, enzymes, and nucleic acids. Foundation for Class 12 molecular biology.',
    },
    {
      question: 'Is Biomolecules chapter chemistry or biology?',
      answer:
        'Its biochemistry - overlap of both! NEET asks biological aspects. We focus on structures, functions, and biological importance rather than chemical reactions.',
    },
    {
      question: 'How to remember amino acids?',
      answer:
        'We provide mnemonics for essential, non-essential, and aromatic amino acids. Structure patterns are taught for quick identification. Practice questions reinforce memory.',
    },
    {
      question: 'Is enzyme kinetics important?',
      answer:
        'Yes! Michaelis-Menten kinetics, enzyme inhibition types, factors affecting enzyme activity are NEET favorites. We simplify with graphs and examples.',
    },
    {
      question: 'How is Biomolecules connected to other chapters?',
      answer:
        'Biomolecules foundation helps in: 1) Photosynthesis (carbs), 2) Respiration (energy), 3) Molecular Biology (DNA, RNA), 4) Genetics. Very important chapter!',
    },
    {
      question: 'Do you cover all types of carbohydrates?',
      answer:
        'Yes! Monosaccharides (glucose, fructose), disaccharides (sucrose, lactose), polysaccharides (starch, cellulose, glycogen) - all with structures and functions.',
    },
  ],
  cta: {
    title: 'Master Biomolecules',
    subtitle: 'Foundation chapter for molecular biology success.',
    primaryButton: { text: 'Enroll in Class 11', link: '/courses?class=class-11' },
    secondaryButton: { text: 'Book Free Demo', link: '/book-demo' },
    tertiaryButton: { text: 'Free Notes', link: '/resources' },
  },
  schema: {
    '@type': 'Course',
    courseName: 'Biomolecules Class 11',
    provider: 'Cerebrum Biology Academy',
    description: 'Complete Biomolecules chapter for Class 11 NEET.',
    duration: 'P6M',
    price: 67500,
    priceCurrency: 'INR',
  },
}

export const plantKingdomClass11: SEOLandingContent = {
  ...topicBaseContent,
  slug: 'plant-kingdom-class-11',
  classLevel: 'class-11',
  title: 'Plant Kingdom Class 11 | Plantae for NEET',
  metaDescription:
    'Master Plant Kingdom Class 11 for NEET. Algae, bryophytes, pteridophytes, gymnosperms, angiosperms. Complete plant diversity!',
  keywords: [
    'plant kingdom class 11',
    'plantae',
    'plant kingdom for neet',
    'plant diversity class 11',
    'plant classification',
  ],
  hero: {
    headline: 'Plant Kingdom - Complete Plant Diversity',
    subheadline:
      'From algae to angiosperms. Classification, life cycles, and characteristics of all plant groups!',
    highlightedText: 'Plant Diversity = 4-5 NEET Questions',
    ctaText: 'Master Plant Kingdom',
    ctaLink: '/courses?class=class-11',
    backgroundGradient: 'from-green-900 via-lime-900 to-yellow-900',
  },
  painPoints: {
    title: 'Too Many Plants to Remember?',
    points: [
      {
        icon: 'leaf',
        question: 'Plant groups confusing?',
        solution: 'Systematic classification with key differences.',
      },
      {
        icon: 'repeat',
        question: 'Life cycles complex?',
        solution: 'Visual life cycle diagrams for each group.',
      },
      {
        icon: 'list',
        question: 'Examples hard to remember?',
        solution: 'Key examples with mnemonics for each group.',
      },
      {
        icon: 'eye',
        question: 'Cant distinguish groups?',
        solution: 'Character-based identification approach.',
      },
    ],
  },
  benefits: {
    title: 'Plant Kingdom Coverage',
    subtitle: 'All plant groups mastered',
    items: [
      {
        icon: 'droplet',
        title: 'Algae',
        description: 'Types, characteristics, economic importance.',
      },
      {
        icon: 'cloud',
        title: 'Bryophytes',
        description: 'Mosses, liverworts - amphibians of plants.',
      },
      {
        icon: 'feather',
        title: 'Pteridophytes',
        description: 'Ferns and allies - vascular cryptogams.',
      },
      { icon: 'tree', title: 'Gymnosperms', description: 'Conifers and cycads - naked seeds.' },
      { icon: 'flower', title: 'Angiosperms', description: 'Flowering plants - enclosed seeds.' },
      {
        icon: 'repeat',
        title: 'Life Cycles',
        description: 'Alternation of generations explained.',
      },
    ],
  },
  courseSummary: {
    title: 'Plant Kingdom Chapter',
    duration: 'Part of Class 11 Course',
    batchSize: '10-12 Students',
    features: [
      'All plant groups',
      'Life cycle diagrams',
      'Comparison tables',
      'Example organisms',
      'NEET previous years',
      '200+ plant diversity MCQs',
    ],
    price: { original: 75000, discounted: 67500, emi: '₹3,200/month' },
  },
  faqs: [
    {
      question: 'How many NEET questions from Plant Kingdom?',
      answer:
        'Plant Kingdom gives 3-5 questions. Combined with Biological Classification, plant diversity gives 5-7 questions. Important for comprehensive biology score.',
    },
    {
      question: 'Which plant groups are most important?',
      answer:
        'All groups asked equally! Focus on: 1) Algae types (Chlorophyceae, Phaeophyceae, Rhodophyceae), 2) Bryophyte features, 3) Pteridophyte characteristics, 4) Gymnosperm and Angiosperm differences.',
    },
    {
      question: 'How to remember plant examples?',
      answer:
        'We provide group-wise example lists with mnemonics. Key examples for each group (Chlamydomonas, Funaria, Pteris, Pinus, etc.) are taught with their special features.',
    },
    {
      question: 'Are life cycles important for NEET?',
      answer:
        'Yes! Alternation of generations, dominant gametophyte vs sporophyte in different groups is frequently asked. We teach life cycles visually.',
    },
    {
      question: 'Is Plant Kingdom connected to other chapters?',
      answer:
        'Yes! Plant Kingdom connects with: Plant Anatomy (tissue types), Plant Physiology (photosynthesis, reproduction), and helps understand evolutionary progression.',
    },
    {
      question: 'How long to complete Plant Kingdom?',
      answer:
        'Thorough coverage: 2-3 weeks including examples, life cycles, and MCQ practice. Its a moderately content-heavy chapter.',
    },
  ],
  cta: {
    title: 'Master Plant Kingdom',
    subtitle: 'Complete plant diversity for NEET.',
    primaryButton: { text: 'Enroll in Class 11', link: '/courses?class=class-11' },
    secondaryButton: { text: 'Book Free Demo', link: '/book-demo' },
    tertiaryButton: { text: 'Free Plant Notes', link: '/resources' },
  },
  schema: {
    '@type': 'Course',
    courseName: 'Plant Kingdom Class 11',
    provider: 'Cerebrum Biology Academy',
    description: 'Complete Plant Kingdom for Class 11 NEET.',
    duration: 'P6M',
    price: 67500,
    priceCurrency: 'INR',
  },
}

export const animalKingdomClass11: SEOLandingContent = {
  ...topicBaseContent,
  slug: 'animal-kingdom-class-11',
  classLevel: 'class-11',
  title: 'Animal Kingdom Class 11 | Animalia for NEET',
  metaDescription:
    'Master Animal Kingdom Class 11 for NEET. From Porifera to Chordata - complete animal classification with examples and characteristics!',
  keywords: [
    'animal kingdom class 11',
    'animalia',
    'animal kingdom for neet',
    'animal classification',
    'animal diversity class 11',
  ],
  hero: {
    headline: 'Animal Kingdom - Complete Animal Diversity',
    subheadline:
      'Porifera to Chordata - all phyla covered with classification basis, characteristics, and examples!',
    highlightedText: 'Animal Diversity = 5-6 NEET Questions',
    ctaText: 'Master Animal Kingdom',
    ctaLink: '/courses?class=class-11',
    backgroundGradient: 'from-orange-900 via-red-900 to-rose-900',
  },
  painPoints: {
    title: 'Too Many Animals to Remember?',
    points: [
      {
        icon: 'bug',
        question: 'Phyla differences confusing?',
        solution: 'Key characteristic-based approach to each phylum.',
      },
      {
        icon: 'list',
        question: 'Too many examples?',
        solution: 'Important examples with phylum-specific features.',
      },
      {
        icon: 'layers',
        question: 'Classification basis unclear?',
        solution: 'Symmetry, germ layers, coelom - clear explanation.',
      },
      {
        icon: 'git-branch',
        question: 'Chordata subdivision complex?',
        solution: 'Systematic approach to classes with examples.',
      },
    ],
  },
  benefits: {
    title: 'Animal Kingdom Coverage',
    subtitle: 'All phyla mastered',
    items: [
      {
        icon: 'circle',
        title: 'Non-Chordates',
        description: 'Porifera to Hemichordata - all phyla.',
      },
      {
        icon: 'git-branch',
        title: 'Chordata',
        description: 'Subphyla and classes systematically.',
      },
      {
        icon: 'layers',
        title: 'Classification Basis',
        description: 'Body plan, symmetry, coelom types.',
      },
      { icon: 'list', title: 'Key Examples', description: 'Important organisms for each group.' },
      {
        icon: 'check-circle',
        title: 'Characteristics',
        description: 'Defining features of each phylum.',
      },
      { icon: 'star', title: 'NEET Focus', description: 'High-yield points highlighted.' },
    ],
  },
  courseSummary: {
    title: 'Animal Kingdom Chapter',
    duration: 'Part of Class 11 Course',
    batchSize: '10-12 Students',
    features: [
      'All 11 phyla',
      'Chordata classes',
      'Comparison tables',
      'Example organisms',
      'Diagram identification',
      '300+ animal diversity MCQs',
    ],
    price: { original: 75000, discounted: 67500, emi: '₹3,200/month' },
  },
  faqs: [
    {
      question: 'How many NEET questions from Animal Kingdom?',
      answer:
        'Animal Kingdom gives 5-6 questions consistently. One of the highest-weightage Class 11 chapters. Phylum characteristics and examples are favorites.',
    },
    {
      question: 'How to remember all phyla?',
      answer:
        'Mnemonic for phyla order: "Poor Man Can Afford Nothing And Eats Absolutely Horrible Eggless Cakes Happily" = Porifera to Hemichordata. We provide such tricks!',
    },
    {
      question: 'Which phyla are most important?',
      answer:
        'All are asked but frequent: 1) Arthropoda (largest phylum), 2) Chordata (most complex), 3) Mollusca, 4) Cnidaria. Vertebrate classes also important.',
    },
    {
      question: 'How to remember examples?',
      answer:
        'We teach 3-4 key examples per phylum with their special features. Focused approach rather than memorizing long lists. Quality over quantity.',
    },
    {
      question: 'Is classification basis important?',
      answer:
        'Very important! Symmetry (radial/bilateral), germ layers (diploblastic/triploblastic), coelom (acoelomate/pseudocoelomate/coelomate) are frequently asked.',
    },
    {
      question: 'How long to complete Animal Kingdom?',
      answer:
        'Thorough coverage: 3-4 weeks including all phyla, Chordata classes, examples, and MCQ practice. Content-heavy but systematic approach works.',
    },
  ],
  cta: {
    title: 'Master Animal Kingdom',
    subtitle: 'Complete animal diversity for NEET.',
    primaryButton: { text: 'Enroll in Class 11', link: '/courses?class=class-11' },
    secondaryButton: { text: 'Book Free Demo', link: '/book-demo' },
    tertiaryButton: { text: 'Free Animal Notes', link: '/resources' },
  },
  schema: {
    '@type': 'Course',
    courseName: 'Animal Kingdom Class 11',
    provider: 'Cerebrum Biology Academy',
    description: 'Complete Animal Kingdom for Class 11 NEET.',
    duration: 'P6M',
    price: 67500,
    priceCurrency: 'INR',
  },
}

// Export all topic pages
export const topicsSEOPages: Record<string, SEOLandingContent> = {
  'cell-biology-tuition': cellBiologyTuition,
  'molecular-biology-tuition': molecularBiologyTuition,
  'genetics-biology-tuition': geneticsBiologyTuition,
  'evolution-class-12': evolutionClass12,
  'biodiversity-conservation-class-12': biodiversityConservationClass12,
  'animal-tissues-class-9': animalTissuesClass9,
  'plant-physiology-class-11': plantPhysiologyClass11,
  'living-world-ncert': livingWorldNcert,
  'dna-biology-tuition': dnaBiologyTuition,
  'botany-zoology-tuition': botanyZoologyTuition,
  'ecology-biology-tuition': ecologyBiologyTuition,
  'human-physiology-tuition': humanPhysiologyTuition,
  'biomolecules-class-11': biomoleculesClass11,
  'plant-kingdom-class-11': plantKingdomClass11,
  'animal-kingdom-class-11': animalKingdomClass11,
}
