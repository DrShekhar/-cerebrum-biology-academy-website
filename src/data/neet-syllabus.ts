export interface NEETChapter {
  id: string
  name: string
  topics: string[]
  ncertPages: string
  difficulty: 'easy' | 'medium' | 'hard'
  pyqFrequency: number
  importantDiagrams?: string[]
}

export interface NEETUnit {
  id: string
  name: string
  weightage: number
  chapters: NEETChapter[]
}

export interface NEETSyllabus {
  class11: {
    units: NEETUnit[]
  }
  class12: {
    units: NEETUnit[]
  }
}

export const neetSyllabus: NEETSyllabus = {
  class11: {
    units: [
      {
        id: 'unit-11-1',
        name: 'Diversity in Living World',
        weightage: 18, // NEET marks (out of 360 total)
        chapters: [
          {
            id: 'ch-11-1',
            name: 'The Living World',
            topics: [
              'What is living?',
              'Biodiversity',
              'Need for classification',
              'Taxonomy and systematics',
              'Nomenclature',
              'Taxonomic categories',
              'Taxonomic aids',
            ],
            ncertPages: 'Ch 1: Pages 1-12',
            difficulty: 'easy',
            pyqFrequency: 1.2,
            importantDiagrams: ['Taxonomic hierarchy'],
          },
          {
            id: 'ch-11-2',
            name: 'Biological Classification',
            topics: [
              'Five kingdom classification',
              'Kingdom Monera',
              'Kingdom Protista',
              'Kingdom Fungi',
              'Kingdom Plantae',
              'Kingdom Animalia',
              'Viruses, Viroids, Prions',
              'Lichens',
            ],
            ncertPages: 'Ch 2: Pages 13-32',
            difficulty: 'medium',
            pyqFrequency: 2.1,
            importantDiagrams: ['Five kingdom system', 'Bacteria types', 'Fungi structure'],
          },
          {
            id: 'ch-11-3',
            name: 'Plant Kingdom',
            topics: [
              'Algae',
              'Bryophytes',
              'Pteridophytes',
              'Gymnosperms',
              'Angiosperms',
              'Plant life cycles',
              'Alternation of generations',
            ],
            ncertPages: 'Ch 3: Pages 33-60',
            difficulty: 'medium',
            pyqFrequency: 2.8,
            importantDiagrams: ['Plant classification', 'Life cycles', 'Flower structure'],
          },
          {
            id: 'ch-11-4',
            name: 'Animal Kingdom',
            topics: [
              'Basis of classification',
              'Porifera',
              'Cnidaria',
              'Platyhelminthes',
              'Nematoda',
              'Annelida',
              'Arthropoda',
              'Mollusca',
              'Echinodermata',
              'Chordata',
            ],
            ncertPages: 'Ch 4: Pages 61-88',
            difficulty: 'hard',
            pyqFrequency: 3.5,
            importantDiagrams: ['Phylum characteristics', 'Animal classification chart'],
          },
        ],
      },
      {
        id: 'unit-11-2',
        name: 'Structural Organization in Animals and Plants',
        weightage: 24, // NEET marks
        chapters: [
          {
            id: 'ch-11-5',
            name: 'Morphology of Flowering Plants',
            topics: [
              'Root system',
              'Shoot system',
              'Leaf structure',
              'Inflorescence',
              'Flower parts',
              'Fruit and seed',
              'Floral diagrams and formulas',
              'Semi-technical description',
            ],
            ncertPages: 'Ch 5: Pages 89-112',
            difficulty: 'medium',
            pyqFrequency: 2.3,
            importantDiagrams: ['Root types', 'Leaf venation', 'Flower diagram'],
          },
          {
            id: 'ch-11-6',
            name: 'Anatomy of Flowering Plants',
            topics: [
              'Tissue systems',
              'Anatomy of dicot and monocot roots',
              'Anatomy of dicot and monocot stems',
              'Anatomy of dicot and monocot leaves',
              'Secondary growth',
              'Vascular bundles',
            ],
            ncertPages: 'Ch 6: Pages 113-132',
            difficulty: 'hard',
            pyqFrequency: 3.2,
            importantDiagrams: ['T.S. of root', 'T.S. of stem', 'T.S. of leaf'],
          },
          {
            id: 'ch-11-7',
            name: 'Structural Organisation in Animals',
            topics: [
              'Animal tissues',
              'Epithelial tissue',
              'Connective tissue',
              'Muscular tissue',
              'Neural tissue',
              'Organ systems',
              'Frog anatomy',
            ],
            ncertPages: 'Ch 7: Pages 133-152',
            difficulty: 'medium',
            pyqFrequency: 2.0,
            importantDiagrams: ['Tissue types', 'Frog anatomy'],
          },
        ],
      },
      {
        id: 'unit-11-3',
        name: 'Cell Structure and Function',
        weightage: 46, // NEET marks
        chapters: [
          {
            id: 'ch-11-8',
            name: 'Cell: The Unit of Life',
            topics: [
              'Cell theory',
              'Prokaryotic vs Eukaryotic cells',
              'Cell membrane',
              'Cell wall',
              'Cell organelles - ER, Golgi, Lysosomes, Mitochondria, Plastids',
              'Nucleus',
              'Microbodies',
            ],
            ncertPages: 'Ch 8: Pages 153-172',
            difficulty: 'hard',
            pyqFrequency: 4.5,
            importantDiagrams: ['Cell structure', 'Organelles', 'Nucleus'],
          },
          {
            id: 'ch-11-9',
            name: 'Biomolecules',
            topics: [
              'Carbohydrates',
              'Proteins',
              'Amino acids',
              'Lipids',
              'Nucleic acids',
              'Enzymes - classification, mechanism',
              'Enzyme kinetics',
              'Vitamins',
            ],
            ncertPages: 'Ch 9: Pages 173-194',
            difficulty: 'hard',
            pyqFrequency: 4.8,
            importantDiagrams: ['Biomolecule structure', 'Enzyme action', 'DNA structure'],
          },
          {
            id: 'ch-11-10',
            name: 'Cell Cycle and Cell Division',
            topics: ['Cell cycle', 'Mitosis', 'Meiosis', 'Significance of mitosis and meiosis'],
            ncertPages: 'Ch 10: Pages 195-210',
            difficulty: 'medium',
            pyqFrequency: 3.8,
            importantDiagrams: ['Cell cycle', 'Mitosis stages', 'Meiosis stages'],
          },
        ],
      },
      {
        id: 'unit-11-4',
        name: 'Plant Physiology',
        weightage: 32, // NEET marks
        chapters: [
          {
            id: 'ch-11-11',
            name: 'Transport in Plants',
            topics: [
              'Means of transport',
              'Diffusion, facilitated diffusion, osmosis',
              'Water potential',
              'Plasmolysis',
              'Imbibition',
              'Long distance transport of water',
              'Transpiration',
              'Uptake and translocation of mineral nutrients',
              'Phloem transport',
            ],
            ncertPages: 'Ch 11: Pages 211-230',
            difficulty: 'medium',
            pyqFrequency: 2.5,
            importantDiagrams: ['Water transport', 'Stomata', 'Root pressure'],
          },
          {
            id: 'ch-11-12',
            name: 'Mineral Nutrition',
            topics: [
              'Essential mineral elements',
              'Macro and micronutrients',
              'Mineral deficiencies',
              'Role of essential elements',
              'Nitrogen metabolism',
              'Nitrogen cycle',
              'Biological nitrogen fixation',
            ],
            ncertPages: 'Ch 12: Pages 231-248',
            difficulty: 'medium',
            pyqFrequency: 2.2,
            importantDiagrams: ['Nitrogen cycle', 'Deficiency symptoms'],
          },
          {
            id: 'ch-11-13',
            name: 'Photosynthesis in Higher Plants',
            topics: [
              'Photosynthesis as means of autotrophic nutrition',
              'Site of photosynthesis',
              'Pigments involved',
              'Light reactions',
              'Photophosphorylation',
              'Dark reactions - Calvin cycle',
              'C4 pathway',
              'CAM pathway',
              'Photorespiration',
              'Factors affecting photosynthesis',
            ],
            ncertPages: 'Ch 13: Pages 249-272',
            difficulty: 'hard',
            pyqFrequency: 4.2,
            importantDiagrams: ['Chloroplast structure', 'Light reactions', 'Calvin cycle'],
          },
          {
            id: 'ch-11-14',
            name: 'Respiration in Plants',
            topics: [
              'Glycolysis',
              'Fermentation',
              'Aerobic respiration',
              'Krebs cycle',
              'Electron transport system',
              'Oxidative phosphorylation',
              'Respiratory quotient',
              'Amphibolic pathway',
            ],
            ncertPages: 'Ch 14: Pages 273-292',
            difficulty: 'hard',
            pyqFrequency: 3.5,
            importantDiagrams: ['Glycolysis', 'Krebs cycle', 'ETS'],
          },
          {
            id: 'ch-11-15',
            name: 'Plant Growth and Development',
            topics: [
              'Growth',
              'Differentiation, dedifferentiation, redifferentiation',
              'Plant growth regulators - Auxins, Gibberellins, Cytokinins, ABA, Ethylene',
              'Photoperiodism',
              'Vernalization',
              'Seed dormancy',
            ],
            ncertPages: 'Ch 15: Pages 293-316',
            difficulty: 'medium',
            pyqFrequency: 2.8,
            importantDiagrams: ['Growth curves', 'Hormone actions'],
          },
        ],
      },
      {
        id: 'unit-11-5',
        name: 'Human Physiology',
        weightage: 36, // NEET marks
        chapters: [
          {
            id: 'ch-11-16',
            name: 'Digestion and Absorption',
            topics: [
              'Alimentary canal',
              'Digestive glands',
              'Role of digestive enzymes',
              'Absorption and assimilation',
              'Caloric value of proteins, carbohydrates, fats',
              'Disorders - PEM, indigestion, constipation, vomiting, jaundice, diarrhoea',
            ],
            ncertPages: 'Ch 16: Pages 317-334',
            difficulty: 'medium',
            pyqFrequency: 2.8,
            importantDiagrams: ['Digestive system', 'Enzyme action'],
          },
          {
            id: 'ch-11-17',
            name: 'Breathing and Exchange of Gases',
            topics: [
              'Respiratory organs',
              'Mechanism of breathing',
              'Exchange of gases',
              'Transport of gases',
              'Regulation of respiration',
              'Respiratory volumes',
              'Disorders - Asthma, emphysema, occupational respiratory disorders',
            ],
            ncertPages: 'Ch 17: Pages 335-354',
            difficulty: 'hard',
            pyqFrequency: 3.8,
            importantDiagrams: ['Respiratory system', 'Gas exchange', 'Hemoglobin'],
          },
          {
            id: 'ch-11-18',
            name: 'Body Fluids and Circulation',
            topics: [
              'Blood composition',
              'Blood groups',
              'Coagulation',
              'Lymph',
              'Human circulatory system',
              'Cardiac cycle',
              'ECG',
              'Double circulation',
              'Regulation of cardiac activity',
              'Disorders - Hypertension, coronary artery disease, angina, heart failure',
            ],
            ncertPages: 'Ch 18: Pages 355-376',
            difficulty: 'hard',
            pyqFrequency: 4.2,
            importantDiagrams: ['Heart structure', 'Cardiac cycle', 'Blood circulation'],
          },
          {
            id: 'ch-11-19',
            name: 'Excretory Products and their Elimination',
            topics: [
              'Modes of excretion',
              'Human excretory system',
              'Urine formation',
              'Regulation of kidney function',
              'Role of kidney',
              'Disorders - Uremia, renal failure, renal calculi, nephritis',
              'Dialysis and artificial kidney',
            ],
            ncertPages: 'Ch 19: Pages 377-394',
            difficulty: 'hard',
            pyqFrequency: 3.5,
            importantDiagrams: ['Excretory system', 'Nephron', 'Urine formation'],
          },
          {
            id: 'ch-11-20',
            name: 'Locomotion and Movement',
            topics: [
              'Types of movement',
              'Skeletal system',
              'Joints',
              'Muscular system',
              'Muscle contraction',
              'Skeletal muscle',
              'Disorders - Myasthenia gravis, tetany, muscular dystrophy, arthritis, osteoporosis, gout',
            ],
            ncertPages: 'Ch 20: Pages 395-412',
            difficulty: 'medium',
            pyqFrequency: 2.5,
            importantDiagrams: ['Skeletal system', 'Muscle structure', 'Joint types'],
          },
          {
            id: 'ch-11-21',
            name: 'Neural Control and Coordination',
            topics: [
              'Neuron structure',
              'Nerve impulse',
              'Synapse',
              'Central nervous system',
              'Peripheral nervous system',
              'Reflex action',
              'Sensory reception',
              'Elementary structure and functions of eye and ear',
            ],
            ncertPages: 'Ch 21: Pages 413-438',
            difficulty: 'hard',
            pyqFrequency: 4.5,
            importantDiagrams: ['Neuron', 'Brain', 'Eye structure', 'Ear structure'],
          },
          {
            id: 'ch-11-22',
            name: 'Chemical Coordination and Integration',
            topics: [
              'Endocrine glands and hormones',
              'Hypothalamus',
              'Pituitary',
              'Pineal',
              'Thyroid',
              'Parathyroid',
              'Adrenal',
              'Pancreas',
              'Gonads',
              'Thymus',
              'Mechanism of hormone action',
              'Hypo and hyperactivity disorders',
            ],
            ncertPages: 'Ch 22: Pages 439-460',
            difficulty: 'hard',
            pyqFrequency: 3.8,
            importantDiagrams: ['Endocrine system', 'Hormone pathways'],
          },
        ],
      },
    ],
  },
  class12: {
    units: [
      {
        id: 'unit-12-1',
        name: 'Reproduction',
        weightage: 44, // NEET marks
        chapters: [
          {
            id: 'ch-12-1',
            name: 'Reproduction in Organisms',
            topics: [
              'Asexual reproduction',
              'Binary fission',
              'Budding',
              'Sporulation',
              'Vegetative propagation',
              'Sexual reproduction',
              'Gamete formation',
              'Pre-fertilization, fertilization, post-fertilization events',
            ],
            ncertPages: 'Ch 1: Pages 1-16',
            difficulty: 'easy',
            pyqFrequency: 2.0,
            importantDiagrams: ['Reproduction types', 'Life cycles'],
          },
          {
            id: 'ch-12-2',
            name: 'Sexual Reproduction in Flowering Plants',
            topics: [
              'Flower structure',
              'Microsporogenesis',
              'Megasporogenesis',
              'Pollination - types and agents',
              'Outbreeding devices',
              'Pollen-pistil interaction',
              'Double fertilization',
              'Endosperm development',
              'Embryogenesis',
              'Seed development and maturation',
              'Apomixis and polyembryony',
            ],
            ncertPages: 'Ch 2: Pages 17-42',
            difficulty: 'hard',
            pyqFrequency: 4.8,
            importantDiagrams: ['Flower structure', 'Embryo sac', 'Double fertilization'],
          },
          {
            id: 'ch-12-3',
            name: 'Human Reproduction',
            topics: [
              'Male reproductive system',
              'Female reproductive system',
              'Gametogenesis - Spermatogenesis and Oogenesis',
              'Menstrual cycle',
              'Fertilization',
              'Implantation',
              'Pregnancy and embryonic development',
              'Parturition',
              'Lactation',
            ],
            ncertPages: 'Ch 3: Pages 43-68',
            difficulty: 'hard',
            pyqFrequency: 5.2,
            importantDiagrams: ['Reproductive systems', 'Gametogenesis', 'Menstrual cycle'],
          },
          {
            id: 'ch-12-4',
            name: 'Reproductive Health',
            topics: [
              'Need for reproductive health',
              'RCH programs',
              'Medical termination of pregnancy',
              'Contraception methods',
              'Amniocentesis',
              'Sexually transmitted infections',
              'Infertility and assisted reproductive technologies - IVF, ZIFT, GIFT',
            ],
            ncertPages: 'Ch 4: Pages 69-84',
            difficulty: 'medium',
            pyqFrequency: 2.5,
            importantDiagrams: ['Contraceptive methods'],
          },
        ],
      },
      {
        id: 'unit-12-2',
        name: 'Genetics and Evolution',
        weightage: 60, // NEET marks (highest weightage unit)
        chapters: [
          {
            id: 'ch-12-5',
            name: 'Principles of Inheritance and Variation',
            topics: [
              'Heredity and variation',
              'Mendels laws of inheritance',
              'Monohybrid cross',
              'Dihybrid cross',
              'Incomplete dominance',
              'Co-dominance',
              'Multiple alleles',
              'Blood groups inheritance',
              'Pleiotropy',
              'Chromosomal theory of inheritance',
              'Linkage and crossing over',
              'Sex determination',
              'Sex-linked inheritance',
              'Pedigree analysis',
              'Genetic disorders - Mendelian and chromosomal',
            ],
            ncertPages: 'Ch 5: Pages 85-112',
            difficulty: 'hard',
            pyqFrequency: 6.5,
            importantDiagrams: ['Punnett squares', 'Pedigree charts', 'Sex determination'],
          },
          {
            id: 'ch-12-6',
            name: 'Molecular Basis of Inheritance',
            topics: [
              'Search for genetic material',
              'DNA structure - Watson and Crick model',
              'DNA packaging',
              'DNA replication',
              'Central dogma',
              'Transcription',
              'Genetic code',
              'Translation',
              'Gene expression and regulation - Lac operon',
              'Genome',
              'Human genome project',
              'DNA fingerprinting',
            ],
            ncertPages: 'Ch 6: Pages 113-146',
            difficulty: 'hard',
            pyqFrequency: 6.8,
            importantDiagrams: ['DNA structure', 'Replication', 'Transcription', 'Translation'],
          },
          {
            id: 'ch-12-7',
            name: 'Evolution',
            topics: [
              'Origin of life',
              'Evolution of life forms',
              'Evidences for evolution',
              'Darwins theory of evolution',
              'Modern synthetic theory',
              'Hardy-Weinberg principle',
              'Types of natural selection',
              'Gene flow and genetic drift',
              'Mutation',
              'Speciation',
              'Human evolution',
            ],
            ncertPages: 'Ch 7: Pages 147-172',
            difficulty: 'medium',
            pyqFrequency: 3.8,
            importantDiagrams: ['Evolution timeline', 'Natural selection', 'Human evolution'],
          },
        ],
      },
      {
        id: 'unit-12-3',
        name: 'Biology and Human Welfare',
        weightage: 30, // NEET marks
        chapters: [
          {
            id: 'ch-12-8',
            name: 'Human Health and Disease',
            topics: [
              'Common diseases',
              'Immunity - innate and acquired',
              'Vaccines and immunization',
              'Allergies',
              'Auto-immunity',
              'AIDS',
              'Cancer',
              'Drugs and alcohol abuse',
            ],
            ncertPages: 'Ch 8: Pages 173-194',
            difficulty: 'medium',
            pyqFrequency: 3.2,
            importantDiagrams: ['Immune system', 'Antibody structure'],
          },
          {
            id: 'ch-12-9',
            name: 'Strategies for Enhancement in Food Production',
            topics: [
              'Animal husbandry',
              'Plant breeding',
              'Single cell protein',
              'Tissue culture',
              'Biofortification',
            ],
            ncertPages: 'Ch 9: Pages 195-212',
            difficulty: 'easy',
            pyqFrequency: 1.8,
            importantDiagrams: ['Tissue culture', 'Plant breeding methods'],
          },
          {
            id: 'ch-12-10',
            name: 'Microbes in Human Welfare',
            topics: [
              'Microbes in household products',
              'Microbes in industrial products',
              'Microbes in sewage treatment',
              'Microbes in biogas production',
              'Microbes as biocontrol agents',
              'Microbes as biofertilizers',
            ],
            ncertPages: 'Ch 10: Pages 213-230',
            difficulty: 'easy',
            pyqFrequency: 2.0,
            importantDiagrams: ['Sewage treatment', 'Biogas plant'],
          },
        ],
      },
      {
        id: 'unit-12-4',
        name: 'Biotechnology and Its Applications',
        weightage: 38, // NEET marks
        chapters: [
          {
            id: 'ch-12-11',
            name: 'Biotechnology: Principles and Processes',
            topics: [
              'Principles of biotechnology',
              'Genetic engineering',
              'Recombinant DNA technology',
              'Tools of recombinant DNA technology - Restriction enzymes, Vectors, Host organisms',
              'Competent host',
              'Processes - Isolation of DNA, Cutting, Amplification, Insertion, Selection',
            ],
            ncertPages: 'Ch 11: Pages 231-250',
            difficulty: 'hard',
            pyqFrequency: 4.5,
            importantDiagrams: ['rDNA technology', 'PCR', 'Gel electrophoresis'],
          },
          {
            id: 'ch-12-12',
            name: 'Biotechnology and its Applications',
            topics: [
              'Applications in agriculture - Bt crops',
              'Applications in medicine - Insulin, Gene therapy',
              'Transgenic animals',
              'Ethical issues',
              'Biopiracy and patents',
            ],
            ncertPages: 'Ch 12: Pages 251-268',
            difficulty: 'medium',
            pyqFrequency: 3.5,
            importantDiagrams: ['Bt cotton', 'Gene therapy'],
          },
        ],
      },
      {
        id: 'unit-12-5',
        name: 'Ecology and Environment',
        weightage: 32, // NEET marks
        chapters: [
          {
            id: 'ch-12-13',
            name: 'Organisms and Populations',
            topics: [
              'Organism and environment',
              'Population attributes',
              'Population interactions',
              'Population growth',
            ],
            ncertPages: 'Ch 13: Pages 269-290',
            difficulty: 'medium',
            pyqFrequency: 2.8,
            importantDiagrams: ['Population growth curves'],
          },
          {
            id: 'ch-12-14',
            name: 'Ecosystem',
            topics: [
              'Ecosystem structure and function',
              'Productivity',
              'Energy flow',
              'Ecological pyramids',
              'Nutrient cycling - Carbon, Nitrogen',
              'Ecological succession',
              'Ecosystem services',
            ],
            ncertPages: 'Ch 14: Pages 291-314',
            difficulty: 'medium',
            pyqFrequency: 3.5,
            importantDiagrams: ['Energy flow', 'Ecological pyramids', 'Nutrient cycles'],
          },
          {
            id: 'ch-12-15',
            name: 'Biodiversity and Conservation',
            topics: [
              'Biodiversity',
              'Biodiversity levels',
              'Biodiversity patterns',
              'Importance of biodiversity',
              'Biodiversity loss',
              'Biodiversity conservation',
              'Red data book',
              'Sacred groves',
              'In-situ and ex-situ conservation',
            ],
            ncertPages: 'Ch 15: Pages 315-334',
            difficulty: 'easy',
            pyqFrequency: 2.2,
            importantDiagrams: ['Conservation methods'],
          },
          {
            id: 'ch-12-16',
            name: 'Environmental Issues',
            topics: [
              'Air pollution',
              'Water pollution',
              'Solid waste management',
              'Agro-chemicals and their effects',
              'Radioactive wastes',
              'Greenhouse effect and global warming',
              'Ozone depletion',
              'Deforestation',
              'Case studies',
            ],
            ncertPages: 'Ch 16: Pages 335-356',
            difficulty: 'easy',
            pyqFrequency: 1.8,
            importantDiagrams: ['Greenhouse effect', 'Ozone layer'],
          },
        ],
      },
    ],
  },
}

export const getAllUnits = (): NEETUnit[] => {
  return [...neetSyllabus.class11.units, ...neetSyllabus.class12.units]
}

export const getUnitById = (unitId: string): NEETUnit | undefined => {
  const allUnits = getAllUnits()
  return allUnits.find((unit) => unit.id === unitId)
}

export const getChapterById = (chapterId: string): NEETChapter | undefined => {
  const allUnits = getAllUnits()
  for (const unit of allUnits) {
    const chapter = unit.chapters.find((ch) => ch.id === chapterId)
    if (chapter) return chapter
  }
  return undefined
}

export const getTotalWeightage = (standard: 'class11' | 'class12'): number => {
  return neetSyllabus[standard].units.reduce((total, unit) => total + unit.weightage, 0)
}

export const getHighFrequencyChapters = (minFrequency: number = 3.0): NEETChapter[] => {
  const allUnits = getAllUnits()
  const allChapters = allUnits.flatMap((unit) => unit.chapters)
  return allChapters.filter((chapter) => chapter.pyqFrequency >= minFrequency)
}

export const getChaptersByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): NEETChapter[] => {
  const allUnits = getAllUnits()
  const allChapters = allUnits.flatMap((unit) => unit.chapters)
  return allChapters.filter((chapter) => chapter.difficulty === difficulty)
}
