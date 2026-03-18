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
  testimonials: [
    {
      name: 'Radhika Verma',
      achievement: 'AIR 189 | AIIMS Delhi',
      quote:
        'Cell Biology was my weakest topic until Cerebrum. The 3D cell models and organelle function maps made mitochondria, ER, and Golgi apparatus unforgettable.',
      score: '348/360 Biology',
    },
    {
      name: 'Aman Khanna',
      achievement: 'AIR 412 | MAMC Delhi',
      quote:
        'Cell structure and cell division carry 15+ marks in NEET. Cerebrum cell biology tuition covered every diagram and process until I could draw them blindfolded.',
      score: '336/360 Biology',
    },
    {
      name: 'Sonali Patil',
      achievement: 'AIR 678 | JIPMER Puducherry',
      quote:
        'The cell biology sessions connected prokaryotic vs eukaryotic cells, cell cycle phases, and membrane transport into one clear story. Best topic coverage.',
      score: '324/360 Biology',
    },
  ],
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

  deepContent: {
    paragraphs: [
      {
        heading: 'Understanding Cell Biology: The Building Block of NEET Success',
        body: 'Cell Biology is the foundational unit of NEET Biology, contributing 8-10 questions that test understanding of cellular architecture, organelle functions, and cell division mechanisms. The chapter "Cell: The Unit of Life" introduces the structural hierarchy from prokaryotic to eukaryotic cells, covering the fluid mosaic model of the plasma membrane, the endomembrane system connecting the endoplasmic reticulum to the Golgi apparatus, and the semi-autonomous nature of mitochondria and chloroplasts. NEET questions frequently test the distinguishing features of organelles: why lysosomes are called suicide bags, why mitochondria have their own DNA, and how the rough ER differs from the smooth ER. Students who build a strong visual model of cell structure find that related chapters in Physiology and Molecular Biology become significantly easier to understand.',
      },
      {
        heading: 'Mastering Cell Division for NEET: Mitosis, Meiosis, and the Cell Cycle',
        body: 'Cell division is a high-yield subtopic within Cell Biology, with questions appearing on mitotic and meiotic phases, checkpoint regulation, and the differences between the two division types. The cell cycle consists of interphase (G1, S, and G2 phases) and the M-phase, and NEET tests specific events in each phase such as DNA replication during S-phase and centriole duplication during G2. Meiosis questions often focus on crossing over during Prophase I, independent assortment, and the significance of meiosis in producing genetic variation. A common exam strategy is to present a diagram showing a cell at a specific stage and ask students to identify the phase and its characteristics. Our teaching uses annotated phase diagrams and comparison tables between mitosis and meiosis to build the instant recognition skills NEET demands.',
      },
      {
        heading: 'Connecting Cell Biology to Higher NEET Topics',
        body: 'Cell Biology is not an isolated chapter but the conceptual foundation for multiple high-weightage NEET topics. Understanding membrane transport mechanisms from cell structure directly applies to nutrient absorption in Human Physiology. Knowledge of DNA within the nucleus connects to Molecular Basis of Inheritance in Class 12. The concept of cell cycle regulation, including cyclins and CDKs, provides context for understanding cancer biology in the Human Health chapter. Prokaryotic cell structure links to Biological Classification and Microbes in Human Welfare. By teaching Cell Biology with these connections explicitly highlighted, students build an integrated understanding that allows them to answer cross-topic questions that combine cellular concepts with physiological or genetic principles, a question type that has become increasingly common in recent NEET papers.',
      },
    ],
    comparisonTable: [
      { 'Feature': 'Genetic Material', 'Prokaryotic Cell': 'Naked circular DNA in nucleoid', 'Eukaryotic Cell': 'Linear DNA with histones in nucleus' },
      { 'Feature': 'Membrane-bound Organelles', 'Prokaryotic Cell': 'Absent', 'Eukaryotic Cell': 'Present (mitochondria, ER, Golgi, etc.)' },
      { 'Feature': 'Ribosomes', 'Prokaryotic Cell': '70S (50S + 30S)', 'Eukaryotic Cell': '80S (60S + 40S)' },
      { 'Feature': 'Cell Division', 'Prokaryotic Cell': 'Binary fission', 'Eukaryotic Cell': 'Mitosis and meiosis' },
      { 'Feature': 'Cell Wall', 'Prokaryotic Cell': 'Peptidoglycan (in bacteria)', 'Eukaryotic Cell': 'Cellulose (plants) or absent (animals)' },
    ],
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
  testimonials: [
    {
      name: 'Vaibhav Soni',
      achievement: 'AIR 234 | AIIMS Delhi',
      quote:
        'Molecular biology including DNA replication, transcription, and translation was taught with step-by-step animations. I could visualise every molecular process.',
      score: '346/360 Biology',
    },
    {
      name: 'Garima Tiwari',
      achievement: 'AIR 456 | BHU Varanasi',
      quote:
        'The molecular biology tuition explained lac operon, genetic code properties, and central dogma with such clarity that these became my highest-scoring topics.',
      score: '338/360 Biology',
    },
    {
      name: 'Nitin Chaudhary',
      achievement: 'AIR 689 | KGMU Lucknow',
      quote:
        'I feared molecular biology before Cerebrum. After the tuition, DNA fingerprinting and recombinant DNA technology became topics I actually enjoyed solving.',
      score: '322/360 Biology',
    },
  ],
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

  deepContent: {
    paragraphs: [
      {
        heading: 'The Central Dogma: DNA to RNA to Protein in NEET Context',
        body: 'Molecular Biology revolves around the central dogma of molecular biology: DNA replication, transcription of DNA to mRNA, and translation of mRNA to protein. NEET tests each process in detail, expecting students to know the specific enzymes involved, the directionality of synthesis, and the differences between prokaryotic and eukaryotic mechanisms. DNA replication questions focus on the roles of helicase, primase, DNA polymerase III, and ligase, along with the distinction between the leading strand (continuous synthesis) and lagging strand (Okazaki fragments). Transcription questions test knowledge of RNA polymerase binding to the promoter, the template versus coding strand distinction, and post-transcriptional modifications like 5-prime capping and 3-prime polyadenylation in eukaryotes. A thorough understanding of these processes is non-negotiable for scoring well in this high-weightage chapter.',
      },
      {
        heading: 'Genetic Code and Gene Regulation: Conceptual Depth for NEET',
        body: 'The genetic code section tests properties such as degeneracy (multiple codons for one amino acid), universality (same code across organisms with rare exceptions), and non-overlapping nature. NEET questions may present an mRNA sequence and ask for the amino acid sequence, or ask about wobble pairing and its significance. The lac operon model of gene regulation is another NEET favourite, with questions testing the roles of the structural genes (lacZ, lacY, lacA), the regulatory gene producing the repressor protein, the operator sequence, and the role of lactose as an inducer. Students must understand both the repressed state (no lactose, repressor bound to operator) and the induced state (lactose present, repressor released). Diagram-based questions showing the operon structure with different components labelled are particularly common and require clear visual understanding.',
      },
    ],
    checklist: [
      { item: 'Memorize all enzymes involved in DNA replication with their specific roles', explanation: 'NEET frequently asks about specific enzymes like helicase, topoisomerase, and ligase.' },
      { item: 'Draw the lac operon diagram from memory with all components labelled', explanation: 'Diagram-based operon questions appear in most NEET papers.' },
      { item: 'Practice codon reading exercises with sample mRNA sequences', explanation: 'Translation of mRNA to amino acid sequence is a commonly tested skill.' },
      { item: 'Create a comparison table of prokaryotic vs eukaryotic transcription', explanation: 'Differences in RNA polymerase types and post-transcriptional modifications are frequently tested.' },
    ],
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
  testimonials: [
    {
      name: 'Aditya Prakash',
      achievement: 'AIR 167 | AIIMS Delhi',
      quote:
        'Genetics is the highest-weightage NEET chapter and Cerebrum genetics tuition made Mendelian crosses, pedigree analysis, and chromosomal disorders crystal clear.',
      score: '352/360 Biology',
    },
    {
      name: 'Shweta Mishra',
      achievement: 'AIR 378 | Lady Hardinge Medical College',
      quote:
        'The genetics tuition covered dihybrid crosses, incomplete dominance, and sex-linked inheritance with practice problems. I solved every genetics PYQ correctly in NEET.',
      score: '340/360 Biology',
    },
    {
      name: 'Raj Kumar',
      achievement: 'AIR 612 | AIIMS Jodhpur',
      quote:
        'Genetics was my most feared topic. After Cerebrum tuition with Punnett square drills and probability shortcuts, it became my most confident chapter.',
      score: '328/360 Biology',
    },
  ],
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

  deepContent: {
    paragraphs: [
      {
        heading: 'Mendelian Genetics: Building Problem-Solving Skills for NEET',
        body: 'Genetics is the highest-weightage chapter in NEET Biology, and Mendelian genetics forms its core. Mendel\'s three laws, the law of dominance, the law of segregation, and the law of independent assortment, govern inheritance patterns tested extensively in NEET. Problem-solving in genetics requires a systematic approach: identify the cross type (monohybrid or dihybrid), determine the genotypes of parents, construct a Punnett square, and calculate phenotypic and genotypic ratios. Beyond simple Mendelian crosses, NEET tests extensions including incomplete dominance (1:2:1 ratio), codominance (both alleles expressed), multiple allelism (ABO blood groups with three alleles), and epistasis. The ability to quickly recognise which inheritance pattern is being described in a question stem and apply the correct ratio is the key skill that separates high scorers from average students in genetics.',
      },
      {
        heading: 'Pedigree Analysis and Sex-Linked Inheritance in NEET',
        body: 'Pedigree analysis questions appear in almost every NEET paper and test the ability to determine the mode of inheritance from a family tree diagram. The systematic approach involves checking whether the trait is dominant or recessive (affected individuals with unaffected parents indicate recessive), then determining if it is autosomal or sex-linked (affected females with unaffected fathers rule out X-linked recessive). Common disorders tested include haemophilia and colour blindness for X-linked recessive, and sickle cell anaemia and cystic fibrosis for autosomal recessive. Sex determination mechanisms in humans (XX-XY), birds (ZW-ZZ), and insects (XX-XO in grasshoppers) are also important. Our genetics course includes dedicated pedigree analysis sessions with 50+ practice pedigrees covering all inheritance patterns, ensuring students can solve any pedigree question within 60 seconds during the exam.',
      },
      {
        heading: 'Chromosomal Basis of Inheritance and Genetic Disorders',
        body: 'The chromosomal theory of inheritance, linking and crossing over, and chromosomal disorders form the third pillar of NEET genetics. Thomas Hunt Morgan\'s work with Drosophila established sex-linked inheritance and gene linkage, concepts tested through questions about recombination frequency and genetic mapping. Crossing over during meiosis produces recombinant offspring, and the frequency of recombination is proportional to the distance between genes on a chromosome. Chromosomal disorders tested in NEET include Down syndrome (trisomy 21), Turner syndrome (45,X), and Klinefelter syndrome (47,XXY). Students must know the chromosomal basis, symptoms, and karyotype notation for each disorder. Our teaching connects these disorders to the meiotic errors that cause them, creating a deeper understanding that helps answer application-based questions rather than relying on rote memorization of symptoms alone.',
      },
    ],
    comparisonTable: [
      { 'Disorder': 'Down Syndrome', 'Chromosomal Basis': 'Trisomy 21 (47 chromosomes)', 'Key Features': 'Intellectual disability, short stature, broad palm' },
      { 'Disorder': 'Turner Syndrome', 'Chromosomal Basis': 'Monosomy X (45,X)', 'Key Features': 'Female, short stature, webbed neck, sterile' },
      { 'Disorder': 'Klinefelter Syndrome', 'Chromosomal Basis': 'XXY (47 chromosomes)', 'Key Features': 'Male, gynaecomastia, tall, sterile' },
      { 'Disorder': 'Colour Blindness', 'Chromosomal Basis': 'X-linked recessive', 'Key Features': 'Cannot distinguish red-green colours' },
      { 'Disorder': 'Haemophilia', 'Chromosomal Basis': 'X-linked recessive', 'Key Features': 'Impaired blood clotting, excessive bleeding' },
    ],
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
  testimonials: [
    {
      name: 'Pranali Deshmukh',
      achievement: 'AIR 245 | AIIMS Delhi',
      quote:
        'Evolution is often neglected by students but carries guaranteed NEET marks. Cerebrum taught Darwin, Lamarck, and Hardy-Weinberg with real exam focus.',
      score: '344/360 Biology',
    },
    {
      name: 'Kunal Mehta',
      achievement: 'AIR 489 | MAMC Delhi',
      quote:
        'The evolution chapter teaching connected natural selection, speciation, and human evolution into a logical story. I scored full marks in all evolution questions.',
      score: '336/360 Biology',
    },
    {
      name: 'Divya Nayak',
      achievement: 'AIR 723 | JIPMER Puducherry',
      quote:
        'Evolution was confusing from textbooks alone. Cerebrum Class 12 evolution sessions made homologous organs, analogous organs, and adaptive radiation simple.',
      score: '320/360 Biology',
    },
  ],
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
    backgroundGradient: 'from-yellow-900 via-orange-900 to-red-900',
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

  deepContent: {
    paragraphs: [
      {
        heading: 'Origin of Life and Chemical Evolution for NEET',
        body: 'The Evolution chapter begins with the origin of life, covering theories from abiogenesis to the Oparin-Haldane hypothesis of chemical evolution. NEET tests the understanding that life originated from non-living matter through a gradual chemical process: simple inorganic molecules formed organic compounds in the reducing atmosphere of early Earth, which assembled into protocells capable of self-replication. Miller and Urey\'s 1953 experiment, which simulated early Earth conditions and produced amino acids from methane, ammonia, hydrogen, and water vapour, is a frequently tested experiment. Students must know the specific conditions used (electric discharge simulating lightning) and the products obtained (amino acids, sugars, and nitrogenous bases). The distinction between biogenesis (life from life) and abiogenesis (spontaneous generation) is another common question topic, with Pasteur\'s swan-neck flask experiment serving as the definitive disproof of spontaneous generation.',
      },
      {
        heading: 'Darwinism, Natural Selection, and Hardy-Weinberg Equilibrium',
        body: 'Darwin\'s theory of evolution by natural selection remains the central concept in this chapter. NEET questions test the understanding of natural selection types: stabilising selection (reduces variation, favours intermediate forms), directional selection (shifts the mean towards one extreme), and disruptive selection (favours both extremes). Industrial melanism in peppered moths (Biston betularia) is the classic example of directional selection. The Hardy-Weinberg principle provides the mathematical foundation for population genetics: in the absence of evolutionary forces, allele frequencies remain constant across generations. The equation p-squared plus 2pq plus q-squared equals 1 allows calculation of genotype frequencies from allele frequencies. NEET numerical problems typically provide one frequency and ask students to calculate others. Five factors can disturb Hardy-Weinberg equilibrium: gene flow, genetic drift, mutation, natural selection, and non-random mating, each representing a mechanism of evolution.',
      },
    ],
    checklist: [
      { item: 'Memorise the Miller-Urey experiment setup and products', explanation: 'Direct questions about experimental conditions and results appear frequently in NEET.' },
      { item: 'Practice Hardy-Weinberg numerical problems with varied given values', explanation: 'Being comfortable calculating p, q, and genotype frequencies saves time in the exam.' },
      { item: 'Know the human evolution timeline with key ancestor features', explanation: 'Brain volume, posture, and tool use for each ancestor species are commonly tested.' },
    ],
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
  testimonials: [
    {
      name: 'Ankita Joshi',
      achievement: 'AIR 198 | AIIMS Delhi',
      quote:
        'Biodiversity and Conservation seems easy but NEET asks tricky questions. Cerebrum teaching on species-area relationship and IUCN categories was exam-focused.',
      score: '350/360 Biology',
    },
    {
      name: 'Rohit Pillai',
      achievement: 'AIR 423 | BHU Varanasi',
      quote:
        'The biodiversity chapter at Cerebrum covered hotspots, sacred groves, and in-situ vs ex-situ conservation with real Indian examples that made NEET questions easy.',
      score: '338/360 Biology',
    },
    {
      name: 'Megha Singhania',
      achievement: 'AIR 656 | KGMU Lucknow',
      quote:
        'I used to confuse alpha, beta, and gamma diversity. After Cerebrum conservation biology sessions, I could differentiate all diversity types with examples.',
      score: '326/360 Biology',
    },
  ],
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

  deepContent: {
    paragraphs: [
      {
        heading: 'Understanding the Three Levels of Biodiversity for NEET',
        body: 'Biodiversity exists at three hierarchical levels that NEET tests with specific examples and quantitative data. Genetic diversity refers to the variety of genes within a species, exemplified by the thousands of rice varieties in India each with distinct genetic makeup. Species diversity measures the number of different species in a given area, and India with approximately 45,000 plant species and 91,000 animal species is one of the 12 mega-diversity nations. Ecosystem diversity encompasses the variety of habitats within a region, from tropical rainforests to coral reefs to desert ecosystems. The species-area relationship described by Alexander von Humboldt follows the equation log S equals log C plus Z times log A, where Z typically ranges from 0.1 to 0.2 for smaller areas within a continent. The Rivet Popper hypothesis by Paul Ehrlich compares species loss to removing rivets from an airplane wing, illustrating how each species contributes to ecosystem stability.',
      },
      {
        heading: 'Conservation Strategies and Biodiversity Hotspots: NEET Key Points',
        body: 'Conservation strategies are divided into in-situ (within natural habitat) and ex-situ (outside natural habitat) approaches. In-situ conservation includes National Parks (106 in India), Wildlife Sanctuaries (551 in India), and Biosphere Reserves (18 in India). Ex-situ conservation includes zoological parks, botanical gardens, seed banks, and cryopreservation facilities. India has four biodiversity hotspots: the Western Ghats, the Eastern Himalayas, the Indo-Burma region, and Sundaland. Each hotspot must meet two criteria: contain at least 1,500 endemic plant species and have lost at least 70 percent of its original habitat. NEET questions frequently test specific examples of endemic species in Indian hotspots, the HIPPO framework for biodiversity threats (Habitat loss, Invasive species, Pollution, Population growth, Over-exploitation), and IUCN Red List categories from Least Concern to Extinct.',
      },
    ],
    comparisonTable: [
      { 'Strategy': 'National Parks', 'Type': 'In-situ', 'Number in India': '106', 'Key Feature': 'Strictest protection, no human activity' },
      { 'Strategy': 'Wildlife Sanctuaries', 'Type': 'In-situ', 'Number in India': '551', 'Key Feature': 'Some human activities permitted' },
      { 'Strategy': 'Biosphere Reserves', 'Type': 'In-situ', 'Number in India': '18', 'Key Feature': 'Multiple zones including human settlement' },
      { 'Strategy': 'Zoological Parks', 'Type': 'Ex-situ', 'Number in India': '60+', 'Key Feature': 'Captive breeding programs' },
      { 'Strategy': 'Seed Banks', 'Type': 'Ex-situ', 'Number in India': 'Multiple', 'Key Feature': 'Preservation of plant genetic material' },
    ],
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
  testimonials: [
    {
      name: 'Siddhi Sharma',
      achievement: 'Currently Class 11 | School Science Topper',
      quote:
        'Animal tissues was my favourite topic at Cerebrum. The comparison tables for epithelial, connective, muscular, and nervous tissues made classification effortless.',
      score: '98% in Science',
    },
    {
      name: 'Aryan Mishra',
      achievement: 'Currently Class 11 | Foundation Batch Topper',
      quote:
        'Learning animal tissues in Class 9 with Cerebrum meant I already knew histology basics when Class 11 started. My classmates were shocked at my knowledge.',
      score: 'Batch Rank 1',
    },
    {
      name: "Tanya's Mother (Mrs. Gupta)",
      achievement: 'Parent of Class 9 Student',
      quote:
        'The tissue diagrams and microscopy images in Cerebrum classes made biology visual and exciting for my daughter. She now draws tissue types for fun!',
      score: 'Top 5 in batch',
    },
  ],
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

  deepContent: {
    paragraphs: [
      {
        heading: 'The Four Animal Tissue Types: Foundation for NEET Anatomy',
        body: 'Animal tissues are classified into four fundamental types, each with distinct structure-function relationships that form the basis for Class 11-12 anatomy and physiology. Epithelial tissue covers body surfaces and lines internal organs, with subtypes including squamous (flat, found in blood vessels), cuboidal (cube-shaped, found in kidney tubules), columnar (pillar-shaped, found in intestinal lining), and glandular (secretory, forming endocrine and exocrine glands). Connective tissue provides structural support and includes blood (a fluid connective tissue with plasma and cells), bone (mineralised matrix with osteocytes), cartilage (flexible matrix with chondrocytes), and adipose tissue (fat storage with lipid-filled cells). Understanding these tissue types in Class 9 creates a foundation for Class 11 chapters on Structural Organisation in Animals and Plants, where the same concepts are tested at NEET level.',
      },
      {
        heading: 'Building NEET Foundation Through Tissue Biology in Class 9',
        body: 'Starting NEET preparation in Class 9 provides a two-year head start that compounds into significant advantages by the time formal NEET preparation begins in Class 11. The Tissues chapter is particularly valuable because it directly maps to NEET syllabus content. Muscular tissue concepts from Class 9, including the distinction between voluntary striated muscle, involuntary smooth muscle, and cardiac muscle with intercalated discs, appear in Class 11 anatomy questions with additional physiological detail. Nervous tissue basics covering neuron structure with dendrites, cell body, and axon reappear in the Neural Control chapter of Class 12. Students who learn these fundamentals thoroughly in Class 9 spend less time re-learning in Class 11 and can focus on deeper NEET-level understanding, giving them an edge in competitive preparation.',
      },
    ],
    checklist: [
      { item: 'Draw and label all four tissue types from memory', explanation: 'Diagram-based identification questions test visual recall of tissue structures.' },
      { item: 'Create a comparison table of the three muscle types', explanation: 'Distinguishing striated, smooth, and cardiac muscle is a frequent NEET question pattern.' },
      { item: 'Learn the location of each tissue type in the human body', explanation: 'NEET questions often provide a location and ask which tissue type is found there.' },
    ],
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
  testimonials: [
    {
      name: 'Snehal Kulkarni',
      achievement: 'AIR 278 | AIIMS Delhi',
      quote:
        'Plant Physiology is the most underrated NEET unit. Cerebrum teaching on transpiration, photosynthesis, and mineral nutrition made this my highest-scoring unit.',
      score: '346/360 Biology',
    },
    {
      name: 'Anand Rathi',
      achievement: 'AIR 512 | JIPMER Puducherry',
      quote:
        'The plant physiology sessions covered C3, C4, and CAM pathways with clear diagrams. I got 3 questions from this unit alone correct in NEET.',
      score: '332/360 Biology',
    },
    {
      name: 'Priya Jain',
      achievement: 'AIR 734 | MAMC Delhi',
      quote:
        'Most students skip plant physiology for human physiology. Cerebrum made both equally interesting. My plant biology preparation gave me easy marks in NEET.',
      score: '320/360 Biology',
    },
  ],
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

  deepContent: {
    paragraphs: [
      {
        heading: 'Photosynthesis and Respiration: The Twin Pillars of Plant Physiology',
        body: 'Plant Physiology is a high-weightage unit contributing 15-18 marks to NEET, with Photosynthesis in Higher Plants and Respiration in Plants as the most frequently tested chapters. Photosynthesis questions cover the light reactions (cyclic and non-cyclic photophosphorylation occurring in thylakoid membranes), the Calvin cycle (carbon fixation by RuBisCO in the stroma), and the comparative biochemistry of C3, C4, and CAM pathways. C4 plants like maize use Kranz anatomy with bundle sheath cells to concentrate CO2 and avoid photorespiration, while CAM plants like cacti fix CO2 at night using PEP carboxylase. Respiration questions focus on glycolysis (occurring in the cytoplasm), the Krebs cycle (in the mitochondrial matrix), and the electron transport chain (on the inner mitochondrial membrane). The net ATP yield of 36-38 molecules per glucose molecule through aerobic respiration versus 2 ATP through anaerobic fermentation is a standard calculation tested in NEET.',
      },
      {
        heading: 'Transport in Plants and Mineral Nutrition: Essential Concepts',
        body: 'Transport mechanisms in plants include water absorption by roots through osmosis, ascent of sap through the xylem driven by transpiration pull (cohesion-tension theory), and translocation of sugars through the phloem via the pressure flow hypothesis proposed by Munch. NEET questions test the understanding of root pressure, guttation, and the role of aquaporins in water movement. Mineral Nutrition covers the classification of essential elements into macronutrients (C, H, O, N, P, K, Ca, Mg, S) and micronutrients (Fe, Mn, Cu, Mo, Zn, B, Cl, Ni), with deficiency symptoms that follow specific patterns. For example, nitrogen deficiency causes chlorosis in older leaves first because nitrogen is mobile and translocated to younger leaves. Nitrogen metabolism, including biological nitrogen fixation by Rhizobium through the nitrogenase enzyme complex, is another important topic where specific bacterial associations with leguminous plants are tested.',
      },
    ],
    comparisonTable: [
      { 'Feature': 'CO2 Fixation Enzyme', 'C3 Plants': 'RuBisCO only', 'C4 Plants': 'PEP carboxylase + RuBisCO', 'CAM Plants': 'PEP carboxylase (night) + RuBisCO (day)' },
      { 'Feature': 'Kranz Anatomy', 'C3 Plants': 'Absent', 'C4 Plants': 'Present', 'CAM Plants': 'Absent' },
      { 'Feature': 'Photorespiration', 'C3 Plants': 'High', 'C4 Plants': 'Negligible', 'CAM Plants': 'Low' },
      { 'Feature': 'Example', 'C3 Plants': 'Wheat, Rice', 'C4 Plants': 'Maize, Sugarcane', 'CAM Plants': 'Cactus, Pineapple' },
    ],
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
  testimonials: [
    {
      name: 'Sameer Bhat',
      achievement: 'AIR 234 | AIIMS Delhi',
      quote:
        'The Living World is the first chapter of Class 11 and sets the tone for NEET biology. Cerebrum covered taxonomy, nomenclature, and classification with exam depth.',
      score: '344/360 Biology',
    },
    {
      name: 'Anamika Singh',
      achievement: 'AIR 467 | BHU Varanasi',
      quote:
        'Living World NCERT teaching at Cerebrum included all taxonomic categories, species concept, and herbarium details. Got 2 direct questions from this chapter in NEET.',
      score: '334/360 Biology',
    },
    {
      name: 'Rishi Verma',
      achievement: 'AIR 689 | KGMU Lucknow',
      quote:
        'Most coaching centres rush through The Living World. Cerebrum spent proper time on it because NEET always has 1-2 questions from this chapter.',
      score: '322/360 Biology',
    },
  ],
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

  deepContent: {
    paragraphs: [
      {
        heading: 'The Living World: Classification and Taxonomy Fundamentals',
        body: 'The Living World is the opening chapter of NCERT Biology Class 11 and introduces the foundational concepts of taxonomy, systematics, and biological classification that underpin all subsequent chapters. NEET tests the understanding of taxonomic hierarchy (Kingdom, Phylum, Class, Order, Family, Genus, Species), binomial nomenclature rules established by Carolus Linnaeus, and the distinction between taxonomy (classification science) and systematics (evolutionary relationships). Key terms like species (a group of organisms capable of interbreeding and producing fertile offspring), taxon (a group at any level of classification), and type specimen (the reference specimen for a species) are frequently tested. The chapter also covers taxonomic aids including herbarium (dried plant specimens), botanical gardens (live plant collections), museums (preserved specimens), and zoological parks (live animal collections), each with specific examples tested in NEET.',
      },
      {
        heading: 'Biodiversity and Characteristics of Living Organisms',
        body: 'This chapter establishes what defines a living organism through characteristics such as growth (both intrinsic increase in mass and extrinsic cell division), reproduction (not a defining feature since mules and worker bees do not reproduce), metabolism (the most inclusive characteristic present in all living organisms), cellular organisation, consciousness, and homeostasis. NEET questions test nuanced understanding: growth alone does not define life because non-living things like crystals also grow, and reproduction is not universal since many organisms do not reproduce yet are alive. The concept of biodiversity introduced here connects to the Class 12 Biodiversity and Conservation chapter. Students who understand the philosophical distinction between living and non-living from this chapter develop the conceptual maturity that helps with application-based questions throughout NEET Biology.',
      },
    ],
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
  testimonials: [
    {
      name: 'Kirti Agarwal',
      achievement: 'AIR 178 | AIIMS Delhi',
      quote:
        'DNA replication, repair, and recombination are NEET favourites. Cerebrum DNA biology tuition covered Meselson-Stahl experiment and semi-conservative replication perfectly.',
      score: '350/360 Biology',
    },
    {
      name: 'Mayank Saxena',
      achievement: 'AIR 389 | MAMC Delhi',
      quote:
        'The DNA tuition sessions explained Watson-Crick model, Hershey-Chase experiment, and Griffith experiment with exam-oriented diagrams. I never confused these again.',
      score: '338/360 Biology',
    },
    {
      name: 'Simran Sethi',
      achievement: 'AIR 623 | AIIMS Bhopal',
      quote:
        'DNA structure, packaging, and the genetic code were taught with 3D models at Cerebrum. These visual aids made molecular biology my strongest area in NEET.',
      score: '326/360 Biology',
    },
  ],
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

  deepContent: {
    paragraphs: [
      {
        heading: 'DNA Structure and Function: The Molecular Blueprint of Life',
        body: 'DNA (deoxyribonucleic acid) is the hereditary material in most organisms, and understanding its structure is fundamental to scoring well in NEET Molecular Biology. Watson and Crick proposed the double helix model in 1953, building on X-ray crystallography data from Rosalind Franklin and Maurice Wilkins. The double helix consists of two antiparallel polynucleotide chains held together by hydrogen bonds between complementary base pairs: adenine with thymine (two hydrogen bonds) and guanine with cytosine (three hydrogen bonds). This base pairing rule, known as Chargaff\'s rule, means the amount of adenine equals thymine and guanine equals cytosine in any DNA molecule. NEET questions test structural details including the major and minor grooves, the sugar-phosphate backbone, 3-prime to 5-prime directionality, and the concept of DNA packaging through histones forming nucleosomes, which further coil into chromatin fibers and eventually condense into visible chromosomes during cell division.',
      },
      {
        heading: 'DNA Replication and Its Significance for NEET',
        body: 'DNA replication is a semi-conservative process, as demonstrated by the Meselson and Stahl experiment using heavy nitrogen (N-15) and light nitrogen (N-14) with E. coli. NEET frequently tests both the experiment design and the conclusion that each daughter DNA molecule contains one parental and one newly synthesised strand. The replication machinery involves multiple enzymes: helicase unwinds the double helix, single-strand binding proteins stabilise the unwound strands, primase synthesises RNA primers, DNA polymerase III extends the primer with new nucleotides in the 5-prime to 3-prime direction, DNA polymerase I removes RNA primers and fills gaps, and ligase seals the remaining nicks. The asymmetry of replication, with the leading strand synthesised continuously and the lagging strand synthesised discontinuously as Okazaki fragments, is a high-frequency question topic that tests both factual knowledge and conceptual understanding of enzyme function.',
      },
    ],
    checklist: [
      { item: 'Draw the DNA double helix with all structural features labelled', explanation: 'NEET tests structural details like antiparallel strands, base pairing, and groove types.' },
      { item: 'Know all enzymes of replication with their specific functions', explanation: 'Enzyme-function matching questions are among the most common in molecular biology.' },
      { item: 'Understand the Meselson-Stahl experiment step by step', explanation: 'This experiment proving semi-conservative replication is a NEET favourite.' },
    ],
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
  testimonials: [
    {
      name: 'Tarun Reddy',
      achievement: 'AIR 212 | AIIMS Delhi',
      quote:
        'Cerebrum balanced botany and zoology perfectly. Most students are strong in one and weak in the other. The equal focus approach got me 350 in NEET biology.',
      score: '350/360 Biology',
    },
    {
      name: 'Nisha Agarwal',
      achievement: 'AIR 434 | Lady Hardinge Medical College',
      quote:
        'I hated botany before Cerebrum. The tuition made Plant Kingdom, Morphology, and Plant Physiology as interesting as the zoology chapters.',
      score: '336/360 Biology',
    },
    {
      name: 'Rahul Dubey',
      achievement: 'AIR 667 | JIPMER Puducherry',
      quote:
        'The botany and zoology tuition covered both sections with comparative teaching. Comparing plant and animal tissues side by side was brilliant for retention.',
      score: '324/360 Biology',
    },
  ],
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

  deepContent: {
    paragraphs: [
      {
        heading: 'Botany in NEET: High-Weightage Plant Science Topics',
        body: 'Botany contributes approximately 45-50 percent of NEET Biology questions, covering Plant Diversity, Plant Anatomy, Plant Physiology, and Plant Reproduction. The most scoring Botany topics include Photosynthesis (comparing C3, C4, and CAM pathways), Plant Morphology and Anatomy (root, stem, leaf structure with tissue types), and Sexual Reproduction in Flowering Plants (flower structure, double fertilisation, and embryo development). Plant Kingdom classification testing the progression from algae through bryophytes, pteridophytes, gymnosperms, to angiosperms is factual and rewards direct NCERT reading. Anatomy of Flowering Plants tests internal structure identification from transverse sections of monocot and dicot roots, stems, and leaves. Students who find Botany challenging typically struggle because they approach it as pure memorisation rather than understanding the functional logic behind plant structures and processes.',
      },
      {
        heading: 'Zoology in NEET: Understanding Animal Biology for Maximum Marks',
        body: 'Zoology covers Animal Diversity, Animal Anatomy and Physiology, Human Reproduction, Genetics, Evolution, and Ecology. Human Physiology alone contributes 25-30 marks, making it the single highest-weightage unit in NEET Biology. The six Human Physiology chapters cover Digestion and Absorption, Breathing and Gas Exchange, Body Fluids and Circulation, Excretory Products and Their Elimination, Locomotion and Movement, and Neural Control and Chemical Coordination. Animal Kingdom classification requires knowing characteristics and examples for all phyla from Porifera to Chordata. The integrated study of Botany and Zoology helps students understand biological principles that apply across kingdoms, such as transport mechanisms, hormonal regulation, and reproductive strategies, enabling them to answer cross-topic questions that test these universal principles.',
      },
    ],
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
  testimonials: [
    {
      name: 'Aditi Bhargava',
      achievement: 'AIR 156 | AIIMS Delhi',
      quote:
        'Ecology is the easiest high-scoring unit in NEET if taught well. Cerebrum ecology tuition covered all 4 chapters with population graphs, food webs, and ecosystem diagrams.',
      score: '352/360 Biology',
    },
    {
      name: 'Saurav Pandey',
      achievement: 'AIR 345 | BHU Varanasi',
      quote:
        'The ecology tuition at Cerebrum taught ecological succession, nutrient cycling, and environmental issues with real-world examples. Scored full in ecology section.',
      score: '342/360 Biology',
    },
    {
      name: 'Lakshmi Nair',
      achievement: 'AIR 578 | KGMU Lucknow',
      quote:
        'Ecology carries 12-14 marks in NEET and is the most scorable. Cerebrum ecology sessions ensured I got every single ecology question right.',
      score: '330/360 Biology',
    },
  ],
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
  deepContent: {
    paragraphs: [
      {
        heading: 'Ecology for NEET: The Easiest Route to 12-15 Marks',
        body: 'Ecology is widely considered the most scoring unit in NEET Biology because questions are predominantly direct from NCERT with minimal calculation or interpretation required. The four ecology chapters, Organisms and Populations, Ecosystem, Biodiversity and Conservation, and Environmental Issues, together contribute 12-15 marks. Organisms and Populations covers population attributes (birth rate, death rate, sex ratio, age distribution), population growth models (exponential J-curve with unlimited resources versus logistic S-curve with carrying capacity K), and species interactions (mutualism, competition, predation, parasitism, commensalism, and amensalism). Each interaction type has specific NCERT examples that are tested directly: mycorrhiza for mutualism, Cuscuta for parasitism, and barnacles on whales for commensalism. Mastering these examples with their interaction categories is one of the most efficient uses of study time in NEET preparation.',
      },
      {
        heading: 'Ecosystem Processes and Environmental Issues',
        body: 'The Ecosystem chapter tests understanding of energy flow (unidirectional, following the 10 percent rule through trophic levels), ecological pyramids (of number, biomass, and energy), productivity concepts (GPP, NPP, and secondary productivity), and nutrient cycling (carbon, nitrogen, and phosphorus cycles with specific bacterial roles). Ecological succession from pioneer community to climax community, including the distinction between primary succession (on bare rock starting with lichen) and secondary succession (on disturbed land), is another frequently tested topic. Environmental Issues covers pollution types, their causes and effects, greenhouse gases and global warming, ozone depletion by chlorofluorocarbons, and waste management including biodegradable and non-biodegradable waste categories. These topics increasingly appear as application-based questions connecting scientific concepts to current environmental challenges.',
      },
    ],
    checklist: [
      { item: 'Memorise all species interaction types with NCERT examples', explanation: 'Direct questions matching interaction types to examples appear in most NEET papers.' },
      { item: 'Understand the 10 percent energy transfer rule with calculations', explanation: 'Numerical questions on energy available at different trophic levels are common.' },
      { item: 'Know the steps of carbon and nitrogen cycles with bacterial roles', explanation: 'Nitrification, denitrification, and ammonification bacteria are frequently tested.' },
    ],
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
  testimonials: [
    {
      name: 'Neeraj Chopra',
      achievement: 'AIR 189 | AIIMS Delhi',
      quote:
        'Human Physiology is the heaviest NEET unit with 25-30 marks. Cerebrum covered all 6 chapters with organ system diagrams and clinical correlations.',
      score: '348/360 Biology',
    },
    {
      name: 'Renu Sharma',
      achievement: 'AIR 401 | MAMC Delhi',
      quote:
        'The human physiology tuition taught cardiac cycle, nephron function, and neural transmission with such clarity that I could draw each diagram from memory in NEET.',
      score: '340/360 Biology',
    },
    {
      name: 'Ajay Thakur',
      achievement: 'AIR 645 | AIIMS Jodhpur',
      quote:
        'I struggled with Body Fluids, Excretion, and Locomotion chapters. Cerebrum human physiology sessions with animated organ functions made everything click.',
      score: '326/360 Biology',
    },
  ],
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
  deepContent: {
    paragraphs: [
      {
        heading: 'Human Physiology: Scoring 25-30 Marks in NEET Biology',
        body: 'Human Physiology is the highest-scoring unit in NEET Biology, comprising six chapters that together contribute 25-30 marks. Body Fluids and Circulation covers blood composition, blood groups (ABO and Rh), the cardiac cycle with systole and diastole phases, the electrical conduction system generating the ECG waveform, and double circulation. The ECG components (P wave for atrial depolarisation, QRS complex for ventricular depolarisation, T wave for ventricular repolarisation) are tested with diagram-based questions. Excretory Products and Their Elimination covers nephron structure and function, the countercurrent mechanism in the loop of Henle, and the role of ADH and aldosterone in regulating urine concentration. Each organ system follows a structure-function-regulation pattern that, once understood, makes the content logical rather than requiring pure memorisation.',
      },
      {
        heading: 'Neural Control, Digestion, and Locomotion: Key NEET Concepts',
        body: 'Neural Control and Chemical Coordination is one of the most complex but rewarding chapters, covering neuron structure, nerve impulse transmission (resting potential, action potential, saltatory conduction), synapse types, and the structure of the brain with specific functions of the cerebrum, cerebellum, hypothalamus, and medulla oblongata. The eye and ear structures with their mechanisms of vision and hearing are diagram-heavy topics. Digestion and Absorption tests GI tract anatomy, digestive enzyme specificity (pepsin in stomach, trypsin in duodenum, lipase for fats), absorption mechanisms in the small intestine, and the role of the liver in bile production. Locomotion and Movement covers the sliding filament theory of muscle contraction involving actin, myosin, troponin, and tropomyosin, along with skeletal system basics. Understanding these systems as integrated physiological processes rather than isolated facts is the key to scoring 25+ marks from this unit.',
      },
    ],
    comparisonTable: [
      { 'System': 'Circulation', 'NEET Questions': '5-6', 'Key Topics': 'ECG, cardiac cycle, blood groups, double circulation' },
      { 'System': 'Excretion', 'NEET Questions': '3-4', 'Key Topics': 'Nephron function, urine formation, hormonal regulation' },
      { 'System': 'Neural Control', 'NEET Questions': '4-5', 'Key Topics': 'Nerve impulse, brain structure, eye and ear' },
      { 'System': 'Digestion', 'NEET Questions': '3-4', 'Key Topics': 'Enzyme specificity, absorption, GI tract anatomy' },
      { 'System': 'Locomotion', 'NEET Questions': '2-3', 'Key Topics': 'Sliding filament theory, skeletal system' },
    ],
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
  testimonials: [
    {
      name: 'Payal Bhatt',
      achievement: 'AIR 267 | AIIMS Delhi',
      quote:
        'Biomolecules is where chemistry meets biology. Cerebrum teaching on enzyme kinetics, protein structure, and nucleic acids made this chapter scoring in NEET.',
      score: '344/360 Biology',
    },
    {
      name: 'Suresh Yadav',
      achievement: 'AIR 489 | JIPMER Puducherry',
      quote:
        'The biomolecules Class 11 sessions at Cerebrum used molecular models and reaction diagrams. I understood amino acid classification and enzyme specificity thoroughly.',
      score: '334/360 Biology',
    },
    {
      name: 'Meenakshi Iyer',
      achievement: 'AIR 712 | BHU Varanasi',
      quote:
        'Biomolecules was confusing until Cerebrum broke it into carbohydrates, proteins, lipids, and nucleic acids with comparison tables. Simple and effective teaching.',
      score: '322/360 Biology',
    },
  ],
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
    backgroundGradient: 'from-yellow-900 via-yellow-900 to-orange-900',
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
  deepContent: {
    paragraphs: [
      {
        heading: 'Biomolecules: Understanding the Chemistry of Life for NEET',
        body: 'The Biomolecules chapter bridges chemistry and biology, covering the four major classes of biological macromolecules: carbohydrates, proteins, lipids, and nucleic acids. Carbohydrates are classified as monosaccharides (glucose, fructose, ribose), disaccharides (sucrose, lactose, maltose), and polysaccharides (starch, glycogen, cellulose, chitin). NEET tests specific structural details such as the glycosidic bond types linking sugar units and the distinction between reducing and non-reducing sugars. Proteins are polymers of amino acids linked by peptide bonds, with four structural levels: primary (amino acid sequence), secondary (alpha-helix and beta-pleated sheet), tertiary (3D folding), and quaternary (multi-subunit assembly). Lipids include fats (esters of glycerol and fatty acids), phospholipids (forming cell membranes), and steroids (cholesterol, hormones). Nucleic acids, DNA and RNA, are polymers of nucleotides, and understanding their structural differences is essential for the Molecular Biology chapter in Class 12.',
      },
      {
        heading: 'Enzymes: Biological Catalysts and Their Properties for NEET',
        body: 'Enzymes constitute a significant portion of NEET questions from the Biomolecules chapter. Key concepts include the lock-and-key model versus the induced fit model of enzyme-substrate interaction, factors affecting enzyme activity (temperature, pH, substrate concentration, and enzyme concentration), and the distinction between competitive and non-competitive inhibition. The Michaelis-Menten constant (Km) represents the substrate concentration at which the reaction velocity is half of Vmax, and a low Km indicates high enzyme-substrate affinity. NEET also tests knowledge of enzyme classification into six categories: oxidoreductases, transferases, hydrolases, lyases, isomerases, and ligases. Cofactors including prosthetic groups (tightly bound), coenzymes (loosely bound organic molecules like NAD+ and FAD), and metal ions (Zn2+ in carboxypeptidase) are frequently tested. Understanding enzyme kinetics provides the foundation for comprehending metabolic pathways in photosynthesis and respiration.',
      },
    ],
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
  testimonials: [
    {
      name: 'Chitra Narayan',
      achievement: 'AIR 223 | AIIMS Delhi',
      quote:
        'Plant Kingdom with algae, bryophytes, pteridophytes, and gymnosperms was taught with lifecycle diagrams at Cerebrum. Every alternation of generation became clear.',
      score: '346/360 Biology',
    },
    {
      name: 'Mohit Garg',
      achievement: 'AIR 456 | KGMU Lucknow',
      quote:
        'The Plant Kingdom Class 11 teaching covered Spirogyra, Funaria, and Pinus lifecycles in detail. NEET loves lifecycle questions and I was fully prepared.',
      score: '334/360 Biology',
    },
    {
      name: 'Aparna Reddy',
      achievement: 'AIR 678 | MAMC Delhi',
      quote:
        'Plant Kingdom classification was a memorisation nightmare before Cerebrum. The comparison tables and mnemonic devices made it systematic and retainable.',
      score: '324/360 Biology',
    },
  ],
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
  deepContent: {
    paragraphs: [
      {
        heading: 'Plant Kingdom Classification: From Algae to Angiosperms',
        body: 'The Plant Kingdom chapter covers the classification of the kingdom Plantae into five major groups based on progressive structural complexity: Algae (thallophytes), Bryophytes (amphibians of the plant world), Pteridophytes (first vascular plants), Gymnosperms (naked-seeded plants), and Angiosperms (enclosed-seeded flowering plants). NEET tests the distinguishing characteristics of each group: algae lack true roots, stems, and leaves; bryophytes have the gametophyte as the dominant generation; pteridophytes are the first plants with a vascular system (xylem and phloem); gymnosperms have exposed ovules on megasporophylls; and angiosperms have ovules enclosed in ovaries that develop into fruits. Algae are further classified into Chlorophyceae (green, e.g., Chlamydomonas, Spirogyra), Phaeophyceae (brown, e.g., Fucus, Sargassum), and Rhodophyceae (red, e.g., Polysiphonia, Gracilaria) based on pigment types and storage products.',
      },
      {
        heading: 'Life Cycles and Alternation of Generations in Plants',
        body: 'Understanding the alternation of generations is crucial for NEET Plant Kingdom questions. All plants exhibit alternation between a haploid gametophyte generation (produces gametes by mitosis) and a diploid sporophyte generation (produces spores by meiosis). The relative dominance of each generation varies across plant groups. In bryophytes, the gametophyte is dominant and independent while the sporophyte is dependent and attached to the gametophyte. In pteridophytes and higher plants, the sporophyte becomes dominant. NEET questions test life cycle patterns: haplontic (dominant gametophyte, as in most algae), diplontic (dominant sporophyte, as in all seed plants), and haplo-diplontic (both generations are multicellular and free-living, as in bryophytes and some algae like Ectocarpus). Specific life cycle diagrams of Funaria (moss) showing the protonema, gametophore, and sporophyte stages are frequently tested in NEET.',
      },
    ],
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
  testimonials: [
    {
      name: 'Karan Malhotra',
      achievement: 'AIR 201 | AIIMS Delhi',
      quote:
        'Animal Kingdom classification from Porifera to Chordata was taught with phylum-wise comparison charts at Cerebrum. I could classify any organism instantly in NEET.',
      score: '348/360 Biology',
    },
    {
      name: 'Sneha Batra',
      achievement: 'AIR 434 | Lady Hardinge Medical College',
      quote:
        'The Animal Kingdom Class 11 sessions used example organisms for each phylum. Sycon, Aurelia, Nereis, and Balanoglossus became permanent memories.',
      score: '336/360 Biology',
    },
    {
      name: 'Abhishek Tiwari',
      achievement: 'AIR 667 | AIIMS Rishikesh',
      quote:
        'Animal Kingdom carries 3-4 NEET questions. Cerebrum phylum comparison tables with body plan, symmetry, and coelom type made this chapter a guaranteed scorer.',
      score: '324/360 Biology',
    },
  ],
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
  deepContent: {
    paragraphs: [
      {
        heading: 'Animal Kingdom Classification: Systematic Approach for NEET',
        body: 'The Animal Kingdom chapter requires students to classify animals across eleven phyla using a hierarchy of features: levels of organisation (cellular, tissue, organ, organ-system), symmetry (asymmetrical, radial, bilateral), germ layers (diploblastic versus triploblastic), coelom type (acoelomate, pseudocoelomate, coelomate), and segmentation. NEET questions typically provide a set of characteristics and ask students to identify the phylum or provide an organism and ask for its classification. Key phyla include Porifera (sponges with canal system and spongocoel), Cnidaria (with cnidoblasts, e.g., Obelia, Aurelia), Platyhelminthes (flatworms, e.g., Taenia, Fasciola), Nematoda (roundworms, e.g., Ascaris, Wuchereria), Annelida (segmented worms with true coelom, e.g., Nereis, Earthworm), and Arthropoda (the largest phylum with jointed appendages and chitinous exoskeleton, e.g., Cockroach, Prawn). Each phylum has 2-3 specific examples that appear repeatedly in NEET papers.',
      },
      {
        heading: 'Chordata Classification: From Fishes to Mammals',
        body: 'Phylum Chordata is divided into Protochordata (Urochordata and Cephalochordata, notochord present in larva or throughout life) and Vertebrata (notochord replaced by vertebral column). The vertebrate classes progress from Cyclostomata (jawless fish like lamprey) through Chondrichthyes (cartilaginous fish like sharks and rays), Osteichthyes (bony fish like Rohu and Catla), Amphibia (dual life, e.g., Frog, Salamander), Reptilia (creeping animals with scales, e.g., Crocodile, Turtle), Aves (birds with feathers and flight adaptations), to Mammalia (hair, mammary glands, four-chambered heart). NEET tests distinguishing features between adjacent classes: Chondrichthyes have cartilaginous endoskeleton while Osteichthyes have bony endoskeleton; Reptilia have three-chambered heart (except Crocodile with four chambers) while birds and mammals have four-chambered hearts. Maintaining organised comparison tables with key features, heart type, respiration mode, and representative examples for each class is the most efficient study strategy for this content-heavy chapter.',
      },
    ],
    comparisonTable: [
      { 'Class': 'Chondrichthyes', 'Skeleton': 'Cartilaginous', 'Heart': '2-chambered', 'Respiration': 'Gills (5-7 pairs)', 'Example': 'Scoliodon (Shark)' },
      { 'Class': 'Osteichthyes', 'Skeleton': 'Bony', 'Heart': '2-chambered', 'Respiration': 'Gills (4 pairs with operculum)', 'Example': 'Labeo (Rohu)' },
      { 'Class': 'Amphibia', 'Skeleton': 'Bony', 'Heart': '3-chambered', 'Respiration': 'Lungs + skin', 'Example': 'Rana (Frog)' },
      { 'Class': 'Reptilia', 'Skeleton': 'Bony', 'Heart': '3-chambered (incomplete septum)', 'Respiration': 'Lungs', 'Example': 'Hemidactylus (Gecko)' },
      { 'Class': 'Mammalia', 'Skeleton': 'Bony', 'Heart': '4-chambered', 'Respiration': 'Lungs', 'Example': 'Homo sapiens' },
    ],
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
