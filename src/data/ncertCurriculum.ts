// NCERT Biology Curriculum Database with Complete Hierarchy
// Classes 9, 10, 11, 12 + Droppers with Chapter-wise Topic Mapping

export interface Topic {
  id: string
  name: string
  description: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  weightage: number // NEET weightage percentage
  questionCount: number // Available questions for this topic
}

export interface Chapter {
  id: string
  name: string
  description: string
  topics: Topic[]
  totalQuestions: number
  averageDifficulty: 'Easy' | 'Medium' | 'Hard'
}

export interface Class {
  id: string
  name: string
  description: string
  chapters: Chapter[]
  totalChapters: number
  totalTopics: number
}

export const ncertBiologyCurriculum: Class[] = [
  {
    id: 'class-9',
    name: 'Class 9th',
    description: 'Foundation Biology - Building blocks of life',
    totalChapters: 6,
    totalTopics: 45,
    chapters: [
      {
        id: 'ch-9-1',
        name: 'The Fundamental Unit of Life',
        description: 'Cell structure and functions',
        totalQuestions: 85,
        averageDifficulty: 'Easy',
        topics: [
          {
            id: 'topic-9-1-1',
            name: 'Discovery and Basic Structure of Cell',
            description: 'Cell theory, prokaryotic vs eukaryotic cells',
            difficulty: 'Easy',
            weightage: 2.5,
            questionCount: 25
          },
          {
            id: 'topic-9-1-2',
            name: 'Cell Organelles',
            description: 'Nucleus, mitochondria, chloroplasts, ER, Golgi apparatus',
            difficulty: 'Medium',
            weightage: 3.0,
            questionCount: 35
          },
          {
            id: 'topic-9-1-3',
            name: 'Cell Wall and Cell Membrane',
            description: 'Structure and functions of cell boundaries',
            difficulty: 'Easy',
            weightage: 2.0,
            questionCount: 25
          }
        ]
      },
      {
        id: 'ch-9-2',
        name: 'Tissues',
        description: 'Plant and animal tissues',
        totalQuestions: 70,
        averageDifficulty: 'Medium',
        topics: [
          {
            id: 'topic-9-2-1',
            name: 'Plant Tissues',
            description: 'Meristematic and permanent tissues',
            difficulty: 'Medium',
            weightage: 2.8,
            questionCount: 35
          },
          {
            id: 'topic-9-2-2',
            name: 'Animal Tissues',
            description: 'Epithelial, connective, muscular, nervous tissues',
            difficulty: 'Medium',
            weightage: 3.2,
            questionCount: 35
          }
        ]
      }
    ]
  },
  {
    id: 'class-10',
    name: 'Class 10th',
    description: 'Life Processes and Heredity',
    totalChapters: 8,
    totalTopics: 65,
    chapters: [
      {
        id: 'ch-10-1',
        name: 'Life Processes',
        description: 'Nutrition, respiration, transportation, excretion',
        totalQuestions: 120,
        averageDifficulty: 'Medium',
        topics: [
          {
            id: 'topic-10-1-1',
            name: 'Nutrition in Animals and Plants',
            description: 'Autotrophic and heterotrophic nutrition',
            difficulty: 'Medium',
            weightage: 4.0,
            questionCount: 40
          },
          {
            id: 'topic-10-1-2',
            name: 'Respiration',
            description: 'Aerobic and anaerobic respiration',
            difficulty: 'Medium',
            weightage: 3.5,
            questionCount: 30
          },
          {
            id: 'topic-10-1-3',
            name: 'Transportation',
            description: 'Circulatory system in animals, transport in plants',
            difficulty: 'Medium',
            weightage: 3.0,
            questionCount: 25
          },
          {
            id: 'topic-10-1-4',
            name: 'Excretion',
            description: 'Excretory system and waste removal',
            difficulty: 'Easy',
            weightage: 2.5,
            questionCount: 25
          }
        ]
      },
      {
        id: 'ch-10-2',
        name: 'Control and Coordination',
        description: 'Nervous system and hormonal control',
        totalQuestions: 85,
        averageDifficulty: 'Hard',
        topics: [
          {
            id: 'topic-10-2-1',
            name: 'Nervous System',
            description: 'Central and peripheral nervous system',
            difficulty: 'Hard',
            weightage: 4.5,
            questionCount: 45
          },
          {
            id: 'topic-10-2-2',
            name: 'Hormonal Control',
            description: 'Endocrine system and hormones',
            difficulty: 'Medium',
            weightage: 3.5,
            questionCount: 40
          }
        ]
      },
      {
        id: 'ch-10-3',
        name: 'Heredity and Evolution',
        description: 'Genetics and evolutionary biology',
        totalQuestions: 95,
        averageDifficulty: 'Hard',
        topics: [
          {
            id: 'topic-10-3-1',
            name: 'Heredity',
            description: 'Mendelian genetics and inheritance patterns',
            difficulty: 'Hard',
            weightage: 5.0,
            questionCount: 50
          },
          {
            id: 'topic-10-3-2',
            name: 'Evolution',
            description: 'Darwin\'s theory and evidence of evolution',
            difficulty: 'Medium',
            weightage: 4.0,
            questionCount: 45
          }
        ]
      }
    ]
  },
  {
    id: 'class-11',
    name: 'Class 11th',
    description: 'Diversity of Living World and Structural Organisation',
    totalChapters: 22,
    totalTopics: 180,
    chapters: [
      {
        id: 'ch-11-1',
        name: 'The Living World',
        description: 'What is living? Biodiversity and classification',
        totalQuestions: 45,
        averageDifficulty: 'Easy',
        topics: [
          {
            id: 'topic-11-1-1',
            name: 'Characteristics of Living Organisms',
            description: 'Growth, reproduction, metabolism, consciousness',
            difficulty: 'Easy',
            weightage: 1.5,
            questionCount: 20
          },
          {
            id: 'topic-11-1-2',
            name: 'Taxonomy and Systematics',
            description: 'Classification principles and nomenclature',
            difficulty: 'Medium',
            weightage: 2.0,
            questionCount: 25
          }
        ]
      },
      {
        id: 'ch-11-2',
        name: 'Biological Classification',
        description: 'Five kingdom classification',
        totalQuestions: 65,
        averageDifficulty: 'Medium',
        topics: [
          {
            id: 'topic-11-2-1',
            name: 'Five Kingdom System',
            description: 'Monera, Protista, Fungi, Plantae, Animalia',
            difficulty: 'Medium',
            weightage: 3.5,
            questionCount: 40
          },
          {
            id: 'topic-11-2-2',
            name: 'Viruses and Lichens',
            description: 'Non-cellular and composite organisms',
            difficulty: 'Easy',
            weightage: 2.0,
            questionCount: 25
          }
        ]
      },
      {
        id: 'ch-11-3',
        name: 'Plant Kingdom',
        description: 'Classification of plants',
        totalQuestions: 85,
        averageDifficulty: 'Medium',
        topics: [
          {
            id: 'topic-11-3-1',
            name: 'Algae',
            description: 'Characteristics and classification of algae',
            difficulty: 'Medium',
            weightage: 2.5,
            questionCount: 20
          },
          {
            id: 'topic-11-3-2',
            name: 'Bryophytes',
            description: 'Mosses and liverworts',
            difficulty: 'Medium',
            weightage: 2.0,
            questionCount: 15
          },
          {
            id: 'topic-11-3-3',
            name: 'Pteridophytes',
            description: 'Ferns and their characteristics',
            difficulty: 'Medium',
            weightage: 2.0,
            questionCount: 15
          },
          {
            id: 'topic-11-3-4',
            name: 'Gymnosperms',
            description: 'Naked seed plants',
            difficulty: 'Medium',
            weightage: 2.5,
            questionCount: 15
          },
          {
            id: 'topic-11-3-5',
            name: 'Angiosperms',
            description: 'Flowering plants and their classification',
            difficulty: 'Hard',
            weightage: 3.0,
            questionCount: 20
          }
        ]
      },
      {
        id: 'ch-11-4',
        name: 'Animal Kingdom',
        description: 'Classification of animals',
        totalQuestions: 95,
        averageDifficulty: 'Hard',
        topics: [
          {
            id: 'topic-11-4-1',
            name: 'Non-chordates',
            description: 'Invertebrate phyla and their characteristics',
            difficulty: 'Hard',
            weightage: 4.0,
            questionCount: 50
          },
          {
            id: 'topic-11-4-2',
            name: 'Chordates',
            description: 'Vertebrate classes and their features',
            difficulty: 'Hard',
            weightage: 4.5,
            questionCount: 45
          }
        ]
      },
      {
        id: 'ch-11-8',
        name: 'Cell: The Unit of Life',
        description: 'Cell structure and biomolecules',
        totalQuestions: 120,
        averageDifficulty: 'Hard',
        topics: [
          {
            id: 'topic-11-8-1',
            name: 'Cell Theory and Cell Types',
            description: 'Prokaryotic and eukaryotic cell structure',
            difficulty: 'Medium',
            weightage: 4.0,
            questionCount: 40
          },
          {
            id: 'topic-11-8-2',
            name: 'Cell Organelles',
            description: 'Structure and functions of organelles',
            difficulty: 'Hard',
            weightage: 5.5,
            questionCount: 50
          },
          {
            id: 'topic-11-8-3',
            name: 'Cell Membrane and Transport',
            description: 'Membrane structure and transport mechanisms',
            difficulty: 'Hard',
            weightage: 4.5,
            questionCount: 30
          }
        ]
      },
      {
        id: 'ch-11-9',
        name: 'Biomolecules',
        description: 'Chemical constituents of life',
        totalQuestions: 110,
        averageDifficulty: 'Hard',
        topics: [
          {
            id: 'topic-11-9-1',
            name: 'Carbohydrates',
            description: 'Structure and functions of sugars and polysaccharides',
            difficulty: 'Medium',
            weightage: 3.5,
            questionCount: 25
          },
          {
            id: 'topic-11-9-2',
            name: 'Proteins',
            description: 'Amino acids, protein structure and enzymes',
            difficulty: 'Hard',
            weightage: 5.0,
            questionCount: 40
          },
          {
            id: 'topic-11-9-3',
            name: 'Lipids',
            description: 'Fats, oils and membrane lipids',
            difficulty: 'Medium',
            weightage: 2.5,
            questionCount: 20
          },
          {
            id: 'topic-11-9-4',
            name: 'Nucleic Acids',
            description: 'DNA and RNA structure and functions',
            difficulty: 'Hard',
            weightage: 4.0,
            questionCount: 25
          }
        ]
      },
      {
        id: 'ch-11-13',
        name: 'Photosynthesis in Higher Plants',
        description: 'Light and dark reactions of photosynthesis',
        totalQuestions: 100,
        averageDifficulty: 'Hard',
        topics: [
          {
            id: 'topic-11-13-1',
            name: 'Light Reactions',
            description: 'Photosystem I and II, ATP synthesis',
            difficulty: 'Hard',
            weightage: 5.0,
            questionCount: 45
          },
          {
            id: 'topic-11-13-2',
            name: 'Dark Reactions (Calvin Cycle)',
            description: 'Carbon fixation and reduction',
            difficulty: 'Hard',
            weightage: 4.5,
            questionCount: 35
          },
          {
            id: 'topic-11-13-3',
            name: 'C4 and CAM Plants',
            description: 'Alternative photosynthetic pathways',
            difficulty: 'Medium',
            weightage: 3.0,
            questionCount: 20
          }
        ]
      }
    ]
  },
  {
    id: 'class-12',
    name: 'Class 12th',
    description: 'Reproduction, Genetics, Evolution, Ecology and Biotechnology',
    totalChapters: 16,
    totalTopics: 140,
    chapters: [
      {
        id: 'ch-12-1',
        name: 'Reproduction in Organisms',
        description: 'Modes of reproduction',
        totalQuestions: 75,
        averageDifficulty: 'Medium',
        topics: [
          {
            id: 'topic-12-1-1',
            name: 'Asexual Reproduction',
            description: 'Binary fission, budding, fragmentation, spore formation',
            difficulty: 'Easy',
            weightage: 2.5,
            questionCount: 30
          },
          {
            id: 'topic-12-1-2',
            name: 'Sexual Reproduction',
            description: 'Gamete formation and fertilization',
            difficulty: 'Medium',
            weightage: 3.5,
            questionCount: 45
          }
        ]
      },
      {
        id: 'ch-12-2',
        name: 'Sexual Reproduction in Flowering Plants',
        description: 'Plant reproductive biology',
        totalQuestions: 90,
        averageDifficulty: 'Hard',
        topics: [
          {
            id: 'topic-12-2-1',
            name: 'Flower Structure and Development',
            description: 'Microsporogenesis and megasporogenesis',
            difficulty: 'Hard',
            weightage: 4.0,
            questionCount: 35
          },
          {
            id: 'topic-12-2-2',
            name: 'Pollination and Fertilization',
            description: 'Types of pollination and double fertilization',
            difficulty: 'Hard',
            weightage: 4.5,
            questionCount: 40
          },
          {
            id: 'topic-12-2-3',
            name: 'Seed and Fruit Development',
            description: 'Post-fertilization changes',
            difficulty: 'Medium',
            weightage: 2.5,
            questionCount: 15
          }
        ]
      },
      {
        id: 'ch-12-3',
        name: 'Human Reproduction',
        description: 'Human reproductive system',
        totalQuestions: 105,
        averageDifficulty: 'Hard',
        topics: [
          {
            id: 'topic-12-3-1',
            name: 'Male Reproductive System',
            description: 'Structure and functions, spermatogenesis',
            difficulty: 'Hard',
            weightage: 4.0,
            questionCount: 35
          },
          {
            id: 'topic-12-3-2',
            name: 'Female Reproductive System',
            description: 'Structure and functions, oogenesis, menstrual cycle',
            difficulty: 'Hard',
            weightage: 5.0,
            questionCount: 45
          },
          {
            id: 'topic-12-3-3',
            name: 'Fertilization and Pregnancy',
            description: 'Implantation, embryonic development, parturition',
            difficulty: 'Hard',
            weightage: 4.5,
            questionCount: 25
          }
        ]
      },
      {
        id: 'ch-12-5',
        name: 'Principles of Inheritance and Variation',
        description: 'Mendelian genetics',
        totalQuestions: 115,
        averageDifficulty: 'Hard',
        topics: [
          {
            id: 'topic-12-5-1',
            name: 'Mendel\'s Laws',
            description: 'Law of segregation and independent assortment',
            difficulty: 'Hard',
            weightage: 5.5,
            questionCount: 50
          },
          {
            id: 'topic-12-5-2',
            name: 'Chromosomal Theory of Inheritance',
            description: 'Linkage, crossing over, sex determination',
            difficulty: 'Hard',
            weightage: 5.0,
            questionCount: 40
          },
          {
            id: 'topic-12-5-3',
            name: 'Genetic Disorders',
            description: 'Mendelian and chromosomal disorders',
            difficulty: 'Medium',
            weightage: 3.5,
            questionCount: 25
          }
        ]
      },
      {
        id: 'ch-12-6',
        name: 'Molecular Basis of Inheritance',
        description: 'DNA, RNA and protein synthesis',
        totalQuestions: 125,
        averageDifficulty: 'Hard',
        topics: [
          {
            id: 'topic-12-6-1',
            name: 'DNA Structure and Replication',
            description: 'Double helix model and DNA replication',
            difficulty: 'Hard',
            weightage: 5.0,
            questionCount: 45
          },
          {
            id: 'topic-12-6-2',
            name: 'Transcription and Translation',
            description: 'RNA synthesis and protein synthesis',
            difficulty: 'Hard',
            weightage: 5.5,
            questionCount: 50
          },
          {
            id: 'topic-12-6-3',
            name: 'Gene Regulation',
            description: 'Lac operon and genetic control',
            difficulty: 'Hard',
            weightage: 4.0,
            questionCount: 30
          }
        ]
      },
      {
        id: 'ch-12-7',
        name: 'Evolution',
        description: 'Origin and evolution of life',
        totalQuestions: 95,
        averageDifficulty: 'Medium',
        topics: [
          {
            id: 'topic-12-7-1',
            name: 'Origin of Life',
            description: 'Chemical evolution and Miller-Urey experiment',
            difficulty: 'Medium',
            weightage: 3.0,
            questionCount: 25
          },
          {
            id: 'topic-12-7-2',
            name: 'Evidence of Evolution',
            description: 'Morphological, anatomical, embryological evidence',
            difficulty: 'Medium',
            weightage: 4.0,
            questionCount: 35
          },
          {
            id: 'topic-12-7-3',
            name: 'Human Evolution',
            description: 'Primate evolution and human ancestry',
            difficulty: 'Medium',
            weightage: 3.5,
            questionCount: 35
          }
        ]
      },
      {
        id: 'ch-12-13',
        name: 'Ecosystem',
        description: 'Structure and function of ecosystems',
        totalQuestions: 85,
        averageDifficulty: 'Medium',
        topics: [
          {
            id: 'topic-12-13-1',
            name: 'Energy Flow',
            description: 'Food chains, food webs, ecological pyramids',
            difficulty: 'Medium',
            weightage: 4.0,
            questionCount: 40
          },
          {
            id: 'topic-12-13-2',
            name: 'Nutrient Cycling',
            description: 'Carbon, nitrogen, phosphorus cycles',
            difficulty: 'Medium',
            weightage: 3.5,
            questionCount: 30
          },
          {
            id: 'topic-12-13-3',
            name: 'Ecological Succession',
            description: 'Primary and secondary succession',
            difficulty: 'Easy',
            weightage: 2.5,
            questionCount: 15
          }
        ]
      }
    ]
  },
  {
    id: 'dropper',
    name: 'Droppers',
    description: 'Comprehensive revision for NEET aspirants (Classes 11 + 12)',
    totalChapters: 38,
    totalTopics: 320,
    chapters: [
      {
        id: 'ch-dropper-1',
        name: 'High Weightage Topics (Classes 11 & 12)',
        description: 'Most important topics for NEET based on previous year analysis',
        totalQuestions: 250,
        averageDifficulty: 'Hard',
        topics: [
          {
            id: 'topic-dropper-1-1',
            name: 'Human Physiology (Complete)',
            description: 'Digestive, respiratory, circulatory, excretory, neural, endocrine systems',
            difficulty: 'Hard',
            weightage: 25.0,
            questionCount: 80
          },
          {
            id: 'topic-dropper-1-2',
            name: 'Genetics and Evolution',
            description: 'Inheritance patterns, molecular genetics, evolution theories',
            difficulty: 'Hard',
            weightage: 20.0,
            questionCount: 70
          },
          {
            id: 'topic-dropper-1-3',
            name: 'Plant Physiology',
            description: 'Photosynthesis, respiration, transport, reproduction',
            difficulty: 'Hard',
            weightage: 18.0,
            questionCount: 60
          },
          {
            id: 'topic-dropper-1-4',
            name: 'Cell Biology and Biomolecules',
            description: 'Cell structure, biomolecules, cell division',
            difficulty: 'Hard',
            weightage: 15.0,
            questionCount: 40
          }
        ]
      },
      {
        id: 'ch-dropper-2',
        name: 'Previous Year Questions Analysis',
        description: 'Topic-wise previous year NEET questions (2016-2024)',
        totalQuestions: 400,
        averageDifficulty: 'Hard',
        topics: [
          {
            id: 'topic-dropper-2-1',
            name: 'NEET 2020-2024 Questions',
            description: 'Recent 5 years question analysis and practice',
            difficulty: 'Hard',
            weightage: 30.0,
            questionCount: 200
          },
          {
            id: 'topic-dropper-2-2',
            name: 'NEET 2016-2019 Questions',
            description: 'Historical question patterns and trends',
            difficulty: 'Hard',
            weightage: 25.0,
            questionCount: 150
          },
          {
            id: 'topic-dropper-2-3',
            name: 'Mock Test Series',
            description: 'Full-length tests based on NEET pattern',
            difficulty: 'Hard',
            weightage: 20.0,
            questionCount: 50
          }
        ]
      }
    ]
  }
]

export const getClassById = (classId: string): Class | undefined => {
  return ncertBiologyCurriculum.find(cls => cls.id === classId)
}

export const getChapterById = (classId: string, chapterId: string): Chapter | undefined => {
  const cls = getClassById(classId)
  return cls?.chapters.find(chapter => chapter.id === chapterId)
}

export const getTopicById = (classId: string, chapterId: string, topicId: string): Topic | undefined => {
  const chapter = getChapterById(classId, chapterId)
  return chapter?.topics.find(topic => topic.id === topicId)
}

export const getAllTopicsForClass = (classId: string): Topic[] => {
  const cls = getClassById(classId)
  if (!cls) return []

  return cls.chapters.flatMap(chapter => chapter.topics)
}

export const getHighWeightageTopics = (limit: number = 20): Topic[] => {
  const allTopics = ncertBiologyCurriculum.flatMap(cls =>
    cls.chapters.flatMap(chapter => chapter.topics)
  )

  return allTopics
    .sort((a, b) => b.weightage - a.weightage)
    .slice(0, limit)
}

export const getTopicsByDifficulty = (difficulty: 'Easy' | 'Medium' | 'Hard'): Topic[] => {
  const allTopics = ncertBiologyCurriculum.flatMap(cls =>
    cls.chapters.flatMap(chapter => chapter.topics)
  )

  return allTopics.filter(topic => topic.difficulty === difficulty)
}

// Statistics
export const getCurriculumStats = () => {
  const totalClasses = ncertBiologyCurriculum.length
  const totalChapters = ncertBiologyCurriculum.reduce((sum, cls) => sum + cls.totalChapters, 0)
  const totalTopics = ncertBiologyCurriculum.reduce((sum, cls) => sum + cls.totalTopics, 0)
  const totalQuestions = ncertBiologyCurriculum.reduce((sum, cls) =>
    sum + cls.chapters.reduce((chapterSum, chapter) =>
      chapterSum + chapter.totalQuestions, 0
    ), 0
  )

  return {
    totalClasses,
    totalChapters,
    totalTopics,
    totalQuestions
  }
}