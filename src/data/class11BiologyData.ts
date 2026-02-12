// Enhanced Class 11th Biology Course Data for Cerebrum Biology Academy

import { CourseProgram, CurriculumModule, FAQ, CourseTestimonial } from '@/types/courseSystem'
import { courseTiers } from './courseSystemData'

// Helper function to calculate payment options
const calculatePaymentOptions = (amount: number) => ({
  oneTime: {
    amount: amount,
    discount: 5,
    discountedAmount: amount * 0.95,
  },
  installment: {
    totalAmount: amount,
    installments: [
      { amount: amount * 0.3, dueDate: 'At enrollment', description: 'Enrollment fee' },
      {
        amount: amount * 0.35,
        dueDate: '2 months after enrollment',
        description: 'Second installment',
      },
      {
        amount: amount * 0.35,
        dueDate: '4 months after enrollment',
        description: 'Final installment',
      },
    ],
    processingFee: 1000,
  },
})

// Detailed Class 11th Biology Curriculum Modules
const class11BiologyModules: CurriculumModule[] = [
  {
    id: 'mod-1',
    title: 'The Living World',
    description:
      'Introduction to diversity in the living world and basic principles of classification',
    duration: 32,
    topics: [
      'What is living?',
      'Diversity in the living world',
      'Taxonomic categories',
      'Taxonomical aids',
      'System of classification',
    ],
    learningObjectives: [
      'Understand characteristics of living organisms',
      'Master taxonomic hierarchy and nomenclature',
      'Learn about biodiversity and its importance',
      'Develop classification skills',
    ],
    practicalWork: [
      'Observation of living specimens',
      'Herbarium preparation techniques',
      'Museum specimen study',
      'Classification exercises',
    ],
    assignments: [
      'Prepare a herbarium of 20 local plants',
      'Write scientific names following binomial nomenclature',
      'Create a taxonomy chart for given organisms',
    ],
    assessments: [
      'Weekly objective tests',
      'Practical identification tests',
      'Assignment evaluations',
    ],
  },
  {
    id: 'mod-2',
    title: 'Biological Classification',
    description: 'Comprehensive study of the five-kingdom classification system',
    duration: 40,
    topics: [
      'Kingdom Monera',
      'Kingdom Protista',
      'Kingdom Fungi',
      'Kingdom Plantae',
      'Kingdom Animalia',
      'Viruses, Viroids, Prions, and Lichens',
    ],
    learningObjectives: [
      'Master five-kingdom classification system',
      'Understand characteristics of each kingdom',
      'Learn about evolutionary relationships',
      'Identify organisms based on characteristics',
    ],
    practicalWork: [
      'Microscopic study of bacteria',
      'Observation of protozoa',
      'Fungal slide preparation',
      'Lichen identification',
    ],
    assignments: [
      'Comparative study of different kingdoms',
      'Research project on local fungi',
      'Create identification keys',
    ],
  },
  {
    id: 'mod-3',
    title: 'Plant Kingdom',
    description: 'Detailed study of plant classification, from algae to flowering plants',
    duration: 45,
    topics: [
      'Algae',
      'Bryophytes',
      'Pteridophytes',
      'Gymnosperms',
      'Angiosperms',
      'Plant life cycles',
    ],
    learningObjectives: [
      'Understand plant evolution and classification',
      'Master alternation of generations concept',
      'Learn adaptive features of different plant groups',
      'Analyze economic importance of plants',
    ],
    practicalWork: [
      'Study of algae specimens',
      'Moss and fern observation',
      'Flower dissection and analysis',
      'Pollen grain study',
    ],
  },
  {
    id: 'mod-4',
    title: 'Animal Kingdom',
    description: 'Classification and characteristics of major animal phyla',
    duration: 50,
    topics: [
      'Basis of classification',
      'Porifera to Hemichordata',
      'Phylum Chordata',
      'Comparative anatomy',
      'Evolution of animal forms',
    ],
    learningObjectives: [
      'Master animal classification system',
      'Understand evolutionary trends in animals',
      'Learn comparative anatomy concepts',
      'Develop identification skills',
    ],
    practicalWork: [
      'Dissection of cockroach/earthworm',
      'Microscopic study of animal tissues',
      'Comparative study of vertebrate features',
      'Museum specimen identification',
    ],
  },
  {
    id: 'mod-5',
    title: 'Morphology of Flowering Plants',
    description: 'Detailed study of flowering plant structure and modifications',
    duration: 42,
    topics: [
      'Root system modifications',
      'Stem modifications',
      'Leaf morphology and modifications',
      'Inflorescence types',
      'Flower structure and families',
      'Fruit and seed morphology',
    ],
    learningObjectives: [
      'Master plant morphology terminology',
      'Understand structural adaptations',
      'Learn floral formula and diagram preparation',
      'Develop botanical drawing skills',
    ],
    practicalWork: [
      'Root, stem, and leaf modifications study',
      'Flower dissection and diagrammatic representation',
      'Preparation of floral formulae',
      'Herbarium sheet preparation',
    ],
  },
  {
    id: 'mod-6',
    title: 'Anatomy of Flowering Plants',
    description: 'Internal structure and tissue organization in flowering plants',
    duration: 38,
    topics: [
      'Tissue systems in plants',
      'Anatomy of root, stem, and leaf',
      'Secondary growth in dicots',
      'Adaptations in anatomy',
    ],
    learningObjectives: [
      'Understand tissue organization in plants',
      'Master anatomical differences between monocots and dicots',
      'Learn secondary growth processes',
      'Correlate structure with function',
    ],
    practicalWork: [
      'Microscopic study of plant tissues',
      'T.S. of root, stem, and leaf preparation',
      'Study of annual rings',
      'Anatomical drawings and labeling',
    ],
  },
  {
    id: 'mod-7',
    title: 'Structural Organization in Animals',
    description: 'Animal tissue organization and organ system development',
    duration: 40,
    topics: [
      'Animal tissues - Epithelial, Connective, Muscle, Neural',
      'Organ systems in animals',
      'Comparative anatomy',
      'Tissue culture techniques',
    ],
    learningObjectives: [
      'Master animal tissue classification',
      'Understand organ system organization',
      'Learn tissue-function relationships',
      'Develop microscopic identification skills',
    ],
    practicalWork: [
      'Microscopic study of animal tissues',
      'Comparative study of organ systems',
      'Histological slide preparation',
      'Tissue identification tests',
    ],
  },
  {
    id: 'mod-8',
    title: 'Cell - The Unit of Life',
    description: 'Comprehensive study of cell structure and organelles',
    duration: 45,
    topics: [
      'Cell theory and cell discovery',
      'Prokaryotic vs Eukaryotic cells',
      'Cell membrane and transport',
      'Cell organelles and their functions',
      'Cell inclusions and cell wall',
    ],
    learningObjectives: [
      'Master cell theory and its significance',
      'Understand cellular organization',
      'Learn organelle structure and function',
      'Develop cellular concept clarity',
    ],
    practicalWork: [
      'Observation of plant and animal cells',
      'Study of plasmolysis and deplasmolysis',
      'Osmosis demonstration',
      'Cell organelle identification',
    ],
  },
  {
    id: 'mod-9',
    title: 'Biomolecules',
    description: 'Chemical composition and structure of biological molecules',
    duration: 48,
    topics: [
      'Carbohydrates - structure and classification',
      'Proteins - amino acids, peptides, and protein structure',
      'Lipids - types and functions',
      'Nucleic acids - DNA and RNA structure',
      'Enzymes - structure, function, and regulation',
    ],
    learningObjectives: [
      'Master biomolecule structures and functions',
      'Understand enzyme kinetics and regulation',
      'Learn metabolic pathways connections',
      'Develop biochemical analysis skills',
    ],
    practicalWork: [
      'Tests for carbohydrates, proteins, and lipids',
      'Enzyme activity demonstrations',
      'pH effect on enzyme activity',
      'Qualitative analysis of biomolecules',
    ],
  },
  {
    id: 'mod-10',
    title: 'Cell Cycle and Cell Division',
    description: 'Detailed study of cell division processes and regulation',
    duration: 35,
    topics: [
      'Cell cycle phases and regulation',
      'Mitosis - mechanism and significance',
      'Meiosis - process and genetic significance',
      'Chromosomal aberrations',
    ],
    learningObjectives: [
      'Master cell cycle regulation mechanisms',
      'Understand mitosis and meiosis differences',
      'Learn genetic significance of cell division',
      'Analyze chromosomal behavior',
    ],
    practicalWork: [
      'Mitosis observation in onion root tips',
      'Meiosis study in pollen mother cells',
      'Chromosome squash preparation',
      'Cell cycle phase identification',
    ],
  },
  {
    id: 'mod-11',
    title: 'Transport in Plants',
    description: 'Water and nutrient transport mechanisms in plants',
    duration: 40,
    topics: [
      'Water absorption and transport',
      'Transpiration and its regulation',
      'Mineral nutrition and uptake',
      'Phloem transport and translocation',
    ],
    learningObjectives: [
      'Understand plant transport mechanisms',
      'Master transpiration regulation',
      'Learn mineral nutrition concepts',
      'Analyze transport efficiency factors',
    ],
    practicalWork: [
      'Demonstration of transpiration',
      'Water potential measurements',
      'Mineral deficiency studies',
      'Translocation experiments',
    ],
  },
  {
    id: 'mod-12',
    title: 'Mineral Nutrition',
    description: 'Essential minerals and their roles in plant nutrition',
    duration: 30,
    topics: [
      'Essential and non-essential elements',
      'Macro and micronutrients',
      'Deficiency symptoms',
      'Nitrogen cycle and nitrogen fixation',
    ],
    learningObjectives: [
      'Master essential mineral requirements',
      'Understand deficiency symptoms',
      'Learn nitrogen fixation mechanisms',
      'Develop nutrition problem-solving skills',
    ],
    practicalWork: [
      'Hydroponics demonstrations',
      'Deficiency symptom identification',
      'Nitrogen fixation studies',
      'Mineral deficiency experiments',
    ],
  },
  {
    id: 'mod-13',
    title: 'Photosynthesis in Higher Plants',
    description: 'Light and dark reactions of photosynthesis',
    duration: 42,
    topics: [
      'Light reactions - photophosphorylation',
      'Calvin cycle - CO2 fixation',
      'C3, C4, and CAM plants',
      'Factors affecting photosynthesis',
    ],
    learningObjectives: [
      'Master photosynthesis mechanisms',
      'Understand C3, C4, and CAM differences',
      'Learn environmental factor effects',
      'Develop experimental analysis skills',
    ],
    practicalWork: [
      'Oxygen evolution demonstration',
      'Chlorophyll extraction and separation',
      'Starch test in leaves',
      'Photosynthesis rate measurements',
    ],
  },
  {
    id: 'mod-14',
    title: 'Respiration in Plants',
    description: 'Cellular respiration and energy release mechanisms',
    duration: 35,
    topics: [
      'Glycolysis pathway',
      'Krebs cycle',
      'Electron transport chain',
      'Fermentation processes',
    ],
    learningObjectives: [
      'Master cellular respiration pathways',
      'Understand ATP synthesis mechanisms',
      'Learn anaerobic respiration processes',
      'Calculate energy yields from respiration',
    ],
    practicalWork: [
      'CO2 evolution in respiration',
      'Anaerobic respiration demonstration',
      'Respiratory quotient calculations',
      'Enzyme activity in respiration',
    ],
  },
  {
    id: 'mod-15',
    title: 'Plant Growth and Development',
    description: 'Plant hormones and growth regulation mechanisms',
    duration: 38,
    topics: [
      'Plant growth regulators - auxins, gibberellins, cytokinins',
      'Growth inhibitors - ABA, ethylene',
      'Photoperiodism and vernalization',
      'Seed germination and dormancy',
    ],
    learningObjectives: [
      'Master plant hormone functions',
      'Understand growth regulation mechanisms',
      'Learn environmental control of development',
      'Develop hormone experiment skills',
    ],
    practicalWork: [
      'Hormone effect demonstrations',
      'Geotropism and phototropism studies',
      'Seed germination experiments',
      'Growth measurement techniques',
    ],
  },
]

// Comprehensive FAQ for Class 11th Biology
const class11BiologyFAQ: FAQ[] = [
  {
    id: 'faq-1',
    question: 'What makes Class 11th Biology crucial for NEET preparation?',
    answer:
      'Class 11th Biology forms 50% of the NEET syllabus and establishes fundamental concepts. Topics like Cell Biology, Plant Physiology, and Biological Classification are heavily weighted in NEET. Mastering these concepts early provides a strong foundation for Class 12th topics and competitive exam success.',
    category: 'general',
    order: 1,
  },
  {
    id: 'faq-2',
    question: 'How does your Class 11th course balance board exam and NEET preparation?',
    answer:
      'Our integrated approach covers the complete NCERT syllabus while adding NEET-specific depth and practice. We provide board exam pattern questions alongside NEET-style MCQs, ensuring students excel in both areas without additional burden.',
    category: 'curriculum',
    order: 2,
  },
  {
    id: 'faq-3',
    question: 'What is the difference between Pinnacle, Ascent, and Pursuit series?',
    answer:
      'Pinnacle (12 students): Premium tier with personal mentoring, unlimited doubt sessions, and IIT/AIIMS alumni guidance. Ascent (20 students): Balanced features with comprehensive test series and regular faculty interaction. Pursuit (25 students): Value tier covering essential curriculum with self-paced learning support.',
    category: 'program',
    order: 3,
  },
  {
    id: 'faq-4',
    question: 'How much time should I dedicate to Biology daily in Class 11th?',
    answer:
      'We recommend 2-3 hours daily: 1 hour for concept understanding, 1 hour for NCERT reading and diagrams, and 30 minutes for practice questions. Our course structure supports this with recorded lectures for flexible learning and doubt sessions for clarification.',
    category: 'general',
    order: 4,
  },
  {
    id: 'faq-5',
    question: 'What practical and laboratory work is included in the course?',
    answer:
      'Our course includes 120+ hours of practical work covering all NCERT-prescribed experiments, microscopy sessions, dissections, field studies, and additional NEET-relevant practicals. Virtual labs supplement physical practicals for comprehensive learning.',
    category: 'curriculum',
    order: 5,
  },
  {
    id: 'faq-6',
    question: 'Can I join mid-session if I missed the course start?',
    answer:
      "Yes, we offer flexible joining with catch-up support. You'll receive recorded lectures for missed topics, personalized doubt sessions, and accelerated coverage plans. Our faculty ensures you're brought up to speed quickly without compromising learning quality.",
    category: 'admission',
    order: 6,
  },
  {
    id: 'faq-7',
    question: 'How do you ensure conceptual clarity in complex topics like Cell Biology?',
    answer:
      'We use multi-modal teaching: 3D animations for molecular processes, microscopic demonstrations, interactive models, step-by-step mechanism explanations, and extensive practice with varied question types. Each concept is reinforced through practical applications.',
    category: 'curriculum',
    order: 7,
  },
  {
    id: 'faq-8',
    question: 'What study materials are provided with the course?',
    answer:
      'Complete package includes: Custom-designed textbooks aligned with NCERT, chapter-wise practice sheets, previous year NEET questions (topic-wise), practical lab manuals, quick revision notes, and access to digital content library with videos and interactive exercises.',
    category: 'program',
    order: 8,
  },
  {
    id: 'faq-9',
    question: 'How frequently are tests conducted and how do they help?',
    answer:
      'Weekly chapter tests, monthly comprehensive tests, quarterly NEET mock tests, and annual full syllabus tests. Each test includes detailed analysis, rank comparison, topic-wise performance insights, and personalized improvement strategies.',
    category: 'performance',
    order: 9,
  },
  {
    id: 'faq-10',
    question: 'What support is available for weak students or those changing from other streams?',
    answer:
      'Dedicated foundation modules, one-on-one mentoring sessions, basic concept reinforcement classes, peer study groups, parental counseling, and continuous progress monitoring. We ensure every student achieves their potential regardless of starting point.',
    category: 'support',
    order: 10,
  },
]

// Success Stories specific to Class 11th students
const class11BiologyTestimonials: CourseTestimonial[] = [
  {
    id: 'test-1',
    studentName: 'Priya Sharma',
    course: 'Class 11th NEET Comprehensive - Pinnacle',
    year: '2023-24',
    rank: 'NEET AIR 147',
    previousRank: 'Class 10th: 78% in Science',
    improvement: 'From average student to NEET topper',
    college: 'AIIMS Delhi',
    feedback:
      "The Class 11th foundation at Cerebrum was game-changing. Dr. Meena Patel's teaching made complex topics like Cell Biology and Plant Physiology crystal clear. The personal mentoring helped me develop strong study habits that continued through Class 12th. The practical sessions were exceptional - I could visualize every cellular process.",
    rating: 5,
  },
  {
    id: 'test-2',
    studentName: 'Arjun Kumar',
    course: 'Class 11th NEET Comprehensive - Ascent',
    year: '2023-24',
    rank: 'NEET AIR 523',
    previousRank: 'Struggled with Biology basics',
    improvement: 'From Biology fear to subject strength',
    college: 'JIPMER Puducherry',
    feedback:
      'I was weak in Biology when I joined in Class 11th. The systematic approach and excellent faculty support transformed my understanding. The test series helped me identify weak areas early, and the doubt clearing sessions were incredibly helpful. Biology became my strongest subject by Class 12th.',
    rating: 5,
  },
  {
    id: 'test-3',
    studentName: 'Sneha Patel',
    course: 'Class 11th NEET Comprehensive - Pinnacle',
    year: '2022-23',
    rank: 'NEET AIR 289',
    college: 'AFMC Pune',
    feedback:
      "Starting NEET preparation from Class 11th at Cerebrum gave me a significant advantage. The comprehensive curriculum covered every detail, and the practical knowledge helped immensely in understanding complex processes. The faculty's expertise and personalized attention made all the difference.",
    rating: 5,
  },
  {
    id: 'test-4',
    studentName: 'Rajesh Singh',
    course: 'Class 11th NEET Comprehensive - Ascent',
    year: '2023-24',
    rank: 'NEET AIR 1,247',
    previousRank: 'Average performer in Class 10th',
    college: 'Government Medical College, Mumbai',
    feedback:
      'The two-year journey starting from Class 11th was perfectly planned. Each topic was covered with NEET perspective while ensuring board exam preparation. The biology practicals and regular assessments kept me consistently prepared. Highly recommend starting early with Cerebrum.',
    rating: 5,
  },
]

// Main Class 11th Biology Course Data
export const class11BiologyData: CourseProgram = {
  id: 'class-11-neet-comprehensive',
  name: 'Class 11th NEET Biology Comprehensive',
  description:
    'Complete 2-year NEET Biology preparation starting from Class 11th. Foundation building + competitive exam readiness with integrated board preparation. Perfect launchpad for medical aspirations.',
  targetClass: '11th',
  duration: '2 years',
  teachingHours: 12,
  learningMode: ['Online', 'Offline', 'Hybrid'],
  tiers: {
    pinnacle: {
      price: 180000,
      batchSize: 12,
      features: courseTiers[0].features,
      payment: calculatePaymentOptions(180000),
      additionalBenefits: [
        'Elite AIIMS/IIT faculty access',
        'Personal academic mentor assignment',
        'Weekly one-on-one progress sessions',
        'Premium study material with latest updates',
        'Unlimited doubt clearing sessions',
        'Research project guidance',
        'Medical college campus visits',
        'Parent counseling and progress reports',
      ],
      enrollmentBonus: [
        'iPad with preloaded educational content',
        'Premium biology laboratory access',
        'Medical entrance preparation book library',
        'Online simulation software access',
        'Priority seating in all sessions',
      ],
    },
    ascent: {
      price: 76000,
      batchSize: 20,
      features: courseTiers[1].features,
      payment: calculatePaymentOptions(76000),
      additionalBenefits: [
        'Experienced faculty with proven track record',
        'Comprehensive test series and analysis',
        'Regular faculty-student interaction sessions',
        'Digital learning resources and videos',
        'Peer study group formation',
        'Performance tracking and analytics',
        'Revision workshops before exams',
        'Career guidance and counseling',
      ],
    },
    pursuit: {
      price: 88000,
      batchSize: 25,
      features: courseTiers[2].features,
      payment: calculatePaymentOptions(88000),
      additionalBenefits: [
        'Core curriculum with essential topics focus',
        'Regular testing and performance evaluation',
        'Basic practical laboratory access',
        'Standard study materials and notes',
        'Group doubt clearing sessions',
        'Exam strategy workshops',
      ],
    },
  },
  curriculum: {
    totalModules: 15,
    totalHours: 580,
    practicalHours: 150,
    testCount: 75,
    modules: class11BiologyModules,
  },
  schedule: {
    daysPerWeek: 6,
    hoursPerDay: 2.5,
    timing: [
      'Morning Batch: 8:00 AM - 10:30 AM',
      'Evening Batch: 4:00 PM - 6:30 PM',
      'Weekend Intensive: 9:00 AM - 12:00 PM',
    ],
    flexibility: 'Multiple batch timings with makeup class facility',
    makeupClasses: true,
    holidaySchedule: 'Intensive revision and practice sessions during holidays',
  },
  faculty: [
    {
      id: 'fac-003',
      name: 'Dr. Meena Patel',
      qualification: [
        'M.Sc Botany (Gold Medalist)',
        'Ph.D Plant Taxonomy',
        'CSIR-NET (JRF)',
        'GATE Qualified',
      ],
      experience: '15+ years',
      specialization: [
        'Plant Biology',
        'Cell Biology',
        'Taxonomy',
        'NEET Biology Coaching',
        'Research Methodology',
      ],
      rating: 4.95,
      teachingExperience: '15 years in NEET coaching with 67+ AIIMS selections',
      achievementHighlights: [
        '1,50,000+ students trained',
        'AIIMS toppers mentor (12 students)',
        '15+ research publications in plant biology',
        'Expert in foundation building',
        '98% student satisfaction rate',
      ],
    },
    {
      id: 'fac-011',
      name: 'Dr. Rajesh Verma',
      qualification: ['M.Sc Zoology', 'Ph.D Animal Physiology', 'Post-Doc (Cell Biology)'],
      experience: '15+ years',
      specialization: [
        'Animal Biology',
        'Cell Biology',
        'Genetics',
        'Evolution',
        'Medical Entrance Coaching',
      ],
      rating: 4.88,
      teachingExperience: '15+ years with focus on Class 11th foundation',
      achievementHighlights: [
        '300+ NEET selections',
        'Specialist in difficult concept explanation',
        'Interactive teaching methodology',
        'Strong practical demonstration skills',
      ],
    },
  ],
  prerequisites: [
    'Class 10th completion with minimum 60% in Science',
    'Basic understanding of science concepts',
    'Strong commitment to 2-year preparation',
    'Interest in medical field career',
  ],
  learningOutcomes: [
    'Complete mastery of Class 11th Biology syllabus',
    'Strong foundation for Class 12th Biology',
    'NEET exam readiness with competitive edge',
    'Excellent board exam performance capability',
    'Scientific thinking and analytical skills development',
    'Laboratory and practical skills mastery',
    'Medical entrance exam strategy and time management',
    'Research aptitude and curiosity cultivation',
  ],
  testimonials: class11BiologyTestimonials,
  faq: class11BiologyFAQ,
  isPopular: true,
  isFeatured: true,
  specialBadge: 'Foundation Builder',
  seoTitle: 'Class 11th NEET Biology Course | 2-Year Comprehensive Program',
  seoDescription:
    'Start your NEET journey right with our Class 11th Biology comprehensive course. Expert faculty, complete curriculum coverage, practical training, and proven results. Enroll now for 2025-26 batch.',
}
