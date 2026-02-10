/**
 * NEET Biology Key Terms and Definitions
 * Optimized for AEO (Answer Engine Optimization) - featured snippets, voice search, AI answer boxes
 */

export interface BiologyTerm {
  term: string
  definition: string
  description?: string
  category: string
  weightage?: string
  relatedTerms?: string[]
  source?: string
  neetRelevance?: string
}

// High-weightage NEET Biology terms (answers common voice queries)
export const NEET_BIOLOGY_TERMS: BiologyTerm[] = [
  // Botany - Plant Physiology (High Weightage)
  {
    term: 'Photosynthesis',
    definition:
      'Photosynthesis is the process by which green plants use sunlight, water, and carbon dioxide to produce glucose and oxygen, serving as the primary energy conversion mechanism on Earth.',
    description:
      'Light-dependent and light-independent reactions occur in chloroplasts. Light reactions occur in thylakoid membranes producing ATP and NADPH. Calvin cycle (light-independent reactions) occur in the stroma producing glucose.',
    category: 'Plant Physiology',
    weightage: '6-8%',
    relatedTerms: ['Chlorophyll', 'Photosystem', 'Calvin Cycle', 'Light Reactions'],
    neetRelevance: 'Very High - Core concept tested in 8-12 questions yearly',
  },
  {
    term: 'Photosystem',
    definition:
      'Photosystems are functional units in the thylakoid membrane containing chlorophyll and associated proteins that absorb light and initiate photosynthesis.',
    description: 'PSII (680 nm) is in grana and initiates electron transport. PSI (700 nm) in stroma is the final step producing NADPH.',
    category: 'Plant Physiology',
    weightage: '4-5%',
    relatedTerms: ['Photosynthesis', 'Light Reactions', 'Electron Transport'],
    neetRelevance: 'High - Tested in assertion-reason and diagram-based questions',
  },
  {
    term: 'Respiration',
    definition:
      'Respiration is the metabolic process by which organisms oxidize glucose to release energy in the form of ATP, using oxygen (aerobic) or without oxygen (anaerobic).',
    description:
      'Aerobic respiration produces 38 ATP per glucose through glycolysis (2 ATP), Krebs cycle (2 ATP), and electron transport (32-34 ATP). Anaerobic respiration produces 2 ATP.',
    category: 'Plant Physiology',
    weightage: '6-8%',
    relatedTerms: ['Glycolysis', 'Krebs Cycle', 'Electron Transport Chain', 'ATP'],
    neetRelevance: 'Very High - Core metabolic process with 10+ questions yearly',
  },
  {
    term: 'Glycolysis',
    definition:
      'Glycolysis is the anaerobic metabolic pathway in the cytoplasm that converts glucose into pyruvate, producing 2 ATP and 2 NADH molecules.',
    description:
      'Ten-step process without requiring oxygen. Produces 2 net ATP and 2 NADH. Occurs in all living cells. First stage of cellular respiration.',
    category: 'Plant Physiology',
    weightage: '4-5%',
    relatedTerms: ['Respiration', 'Pyruvate', 'ATP', 'NADH'],
    neetRelevance: 'High - Tested in multiple format questions',
  },
  {
    term: 'Krebs Cycle',
    definition:
      'Also known as the Citric Acid Cycle, the Krebs Cycle is a series of chemical reactions occurring in the mitochondrial matrix that oxidizes acetyl-CoA to produce NADH, FADH2, and GTP.',
    description:
      'Eight-step cycle producing 3 NADH, 1 FADH2, 1 GTP/ATP per acetyl-CoA. Each glucose produces 2 acetyl-CoA (since one glucose yields 2 pyruvates). Occurs in mitochondrial matrix.',
    category: 'Plant Physiology',
    weightage: '4-5%',
    relatedTerms: ['Respiration', 'Mitochondria', 'Electron Transport', 'ATP'],
    neetRelevance: 'High - Tested in MCQ and numerical questions',
  },

  // Zoology - Human Physiology (Highest Weightage)
  {
    term: 'Homeostasis',
    definition:
      'Homeostasis is the physiological process by which organisms maintain a stable internal environment despite external changes, through negative feedback mechanisms.',
    description:
      'Examples: Blood glucose regulation by insulin, body temperature regulation by hypothalamus, pH regulation by kidneys. Critical for survival and health.',
    category: 'Human Physiology',
    weightage: '8-10%',
    relatedTerms: ['Negative Feedback', 'Hormone Regulation', 'Nervous System', 'Kidney Function'],
    neetRelevance: 'Very High - Fundamental concept tested in 10-15 questions',
  },
  {
    term: 'Neuron',
    definition:
      'A neuron is the basic structural and functional unit of the nervous system, consisting of a cell body (soma), dendrites, and an axon that transmits electrical and chemical signals.',
    description:
      'Sensory neurons carry signals from receptors to CNS. Motor neurons carry signals from CNS to effectors. Interneurons connect neurons to each other. Synapses are points of communication between neurons.',
    category: 'Human Physiology',
    weightage: '6-8%',
    relatedTerms: ['Synapse', 'Neurotransmitter', 'Action Potential', 'Nervous System'],
    neetRelevance: 'Very High - Diagram-based and structural questions',
  },
  {
    term: 'Action Potential',
    definition:
      'An action potential is a rapid change in membrane potential where depolarization followed by repolarization allows neurons and muscle cells to generate and transmit electrical signals.',
    description:
      'Resting potential is -70mV. Threshold is -55mV. Depolarization phase: Na+ influx makes inside positive. Repolarization phase: K+ efflux restores negative charge. Hyperpolarization (undershoot) before returning to resting potential.',
    category: 'Human Physiology',
    weightage: '5-6%',
    relatedTerms: ['Resting Potential', 'Synapse', 'Neurotransmitter', 'Myelin Sheath'],
    neetRelevance: 'High - Tested in mechanism-based questions',
  },
  {
    term: 'Digestion',
    definition:
      'Digestion is the process of breaking down food into smaller molecules through mechanical and chemical action in the digestive system, allowing absorption of nutrients.',
    description:
      'Mouth: Mechanical breakdown and starch digestion by salivary amylase. Stomach: Protein digestion by pepsin in acidic environment. Small intestine: Carbohydrate, protein, fat digestion by pancreatic enzymes and bile salts. Absorption of nutrients in small intestine.',
    category: 'Human Physiology',
    weightage: '8-10%',
    relatedTerms: ['Digestive Enzymes', 'Peristalsis', 'Absorption', 'Nutrition'],
    neetRelevance: 'Very High - System diagram and process questions',
  },
  {
    term: 'Photoreceptor',
    definition:
      'Photoreceptors are specialized nerve cells in the retina that convert light energy into electrical signals, consisting of rods (for dim light) and cones (for color vision).',
    description:
      'Rods are more sensitive, contain rhodopsin, responsible for night vision. Cones need bright light, contain three types (red, green, blue), responsible for color vision. Process: Light → Rhodopsin breakdown → Hyperpolarization → Action potential to brain.',
    category: 'Human Physiology',
    weightage: '5-6%',
    relatedTerms: ['Vision', 'Light', 'Eye Anatomy', 'Nervous System'],
    neetRelevance: 'High - Tested in mechanism and structure questions',
  },

  // Genetics (High Weightage)
  {
    term: 'DNA Replication',
    definition:
      'DNA replication is the process by which DNA makes an exact copy of itself, occurring during S phase of interphase, ensuring each daughter cell receives identical genetic information.',
    description:
      'Semi-conservative replication: Original DNA strands separate, each serving as template for new strand. DNA polymerase III synthesizes new strand 5\'→3\'. Leading strand synthesized continuously, lagging strand synthesized in Okazaki fragments.',
    category: 'Molecular Biology',
    weightage: '6-8%',
    relatedTerms: ['DNA', 'Chromosome', 'Cell Division', 'Protein Synthesis'],
    neetRelevance: 'Very High - Core mechanism tested 8-12 times yearly',
  },
  {
    term: 'Gene Expression',
    definition:
      'Gene expression is the process by which information from a gene is used to synthesize functional gene products (proteins), involving transcription and translation.',
    description:
      'Transcription: DNA → mRNA in nucleus using RNA polymerase. Translation: mRNA → Protein in ribosome. Promoter region initiates transcription. Codons on mRNA specify amino acids. Stop codon terminates translation.',
    category: 'Molecular Biology',
    weightage: '8-10%',
    relatedTerms: ['Transcription', 'Translation', 'mRNA', 'Protein Synthesis', 'Central Dogma'],
    neetRelevance: 'Very High - Fundamental genetic concept',
  },
  {
    term: 'Mendelian Inheritance',
    definition:
      'Mendelian inheritance describes how traits are passed from parents to offspring through discrete hereditary units (genes) following predictable patterns based on dominant and recessive alleles.',
    description:
      'Law of Segregation: Alleles separate during gamete formation. Law of Independent Assortment: Traits inherited independently. Law of Dominance: Dominant alleles mask recessive alleles. Monohybrid cross ratio 3:1, dihybrid 9:3:3:1.',
    category: 'Genetics',
    weightage: '8-10%',
    relatedTerms: ['Allele', 'Dominant', 'Recessive', 'Pedigree Analysis', 'Genetic Disorders'],
    neetRelevance: 'Very High - 12-15 questions yearly on inheritance patterns',
  },
  {
    term: 'Pedigree Analysis',
    definition:
      'Pedigree analysis is the study of inheritance patterns within families by tracing traits through multiple generations, used to identify genetic disorders and inheritance modes.',
    description:
      'Autosomal dominant: Affected individuals in every generation, appears in both sexes equally. Autosomal recessive: Appears when both parents are carriers (unaffected), more common in consanguineous marriages. X-linked: More common in males, affected mothers pass to all sons.',
    category: 'Genetics',
    weightage: '6-8%',
    relatedTerms: ['Mendelian Inheritance', 'Genetic Disorders', 'Carrier', 'Mutation'],
    neetRelevance: 'High - Tested in interpretation and application questions',
  },

  // Ecology (Moderate Weightage)
  {
    term: 'Ecosystem',
    definition:
      'An ecosystem is a biological system consisting of all living organisms (biotic) and their physical environment (abiotic) interacting together, cycling nutrients and energy.',
    description:
      'Components: Producers (plants), consumers (herbivores, carnivores), decomposers. Energy flow: 10% transferred between trophic levels. Nutrient cycling: Carbon, nitrogen, phosphorus, water cycles.',
    category: 'Ecology',
    weightage: '6-8%',
    relatedTerms: ['Food Chain', 'Food Web', 'Energy Pyramid', 'Biodiversity', 'Succession'],
    neetRelevance: 'High - System understanding and numerical questions',
  },
  {
    term: 'Population',
    definition:
      'A population is a group of individuals of the same species living in the same geographic area at the same time, capable of interbreeding.',
    description:
      'Population growth: Exponential (J-shaped) in ideal conditions, Logistic (S-shaped) with limiting factors. Carrying capacity: Maximum population size environment can sustain. Growth rate affected by birth rate, death rate, immigration, emigration.',
    category: 'Ecology',
    weightage: '4-5%',
    relatedTerms: ['Community', 'Carrying Capacity', 'Hardy-Weinberg', 'Population Growth'],
    neetRelevance: 'Moderate - Tested in MCQ and graph interpretation',
  },
  {
    term: 'Biodiversity',
    definition:
      'Biodiversity is the variety of all living organisms and their genetic variations within a geographic area, essential for ecosystem stability and resilience.',
    description:
      'Three levels: Genetic diversity (variation within species), Species diversity (number of different species), Ecosystem diversity (variety of habitats). India is megadiverse country. Hotspots: Western Ghats, Northeast India, Andaman Nicobar.',
    category: 'Ecology',
    weightage: '5-6%',
    relatedTerms: ['Conservation', 'Endangered Species', 'Habitat Loss', 'Ecosystem'],
    neetRelevance: 'Moderate - Knowledge-based questions with some application',
  },

  // Cell Biology (Important)
  {
    term: 'Mitosis',
    definition:
      'Mitosis is the process of cell division that produces two identical daughter cells, each with the same number of chromosomes as the parent cell, essential for growth and repair.',
    description:
      'Four stages: Prophase (chromatin condenses to chromosomes, spindle forms), Metaphase (chromosomes align at metaphase plate), Anaphase (sister chromatids separate), Telophase (spindle disappears, nuclear envelope reforms). Cytokinesis follows producing two daughter cells.',
    category: 'Cell Biology',
    weightage: '5-6%',
    relatedTerms: ['Cell Cycle', 'Interphase', 'Meiosis', 'Chromosome'],
    neetRelevance: 'High - Diagram-based and stage identification questions',
  },
  {
    term: 'Meiosis',
    definition:
      'Meiosis is a specialized form of cell division that produces four non-identical daughter cells (gametes) with half the chromosome number of the parent cell, essential for sexual reproduction.',
    description:
      'Two divisions: Meiosis I (separates homologous chromosomes), Meiosis II (separates sister chromatids). Produces haploid gametes (sperm/egg with n chromosomes). Crossing over during prophase I increases genetic variation. Reduces chromosome number by half.',
    category: 'Cell Biology',
    weightage: '6-8%',
    relatedTerms: ['Mitosis', 'Gamete', 'Chromosome', 'Genetic Variation', 'Sexual Reproduction'],
    neetRelevance: 'Very High - Process understanding and comparison questions',
  },
  {
    term: 'Enzyme',
    definition:
      'An enzyme is a biological catalyst, usually a protein, that speeds up biochemical reactions by lowering activation energy without being consumed in the reaction.',
    description:
      'Lock and key model: Substrate fits into enzyme\'s active site. Forms enzyme-substrate complex. Product released. Factors affecting enzyme activity: pH (optimal 7-8), temperature (optimal 37°C), substrate concentration, cofactors/coenzymes.',
    category: 'Cell Biology',
    weightage: '4-5%',
    relatedTerms: ['Metabolism', 'Protein', 'Catalysis', 'Biochemistry'],
    neetRelevance: 'High - Mechanism and application questions',
  },

  // Evolution
  {
    term: 'Evolution',
    definition:
      'Evolution is the process of change in heritable traits of biological populations over successive generations, driven by natural selection, mutation, and genetic drift.',
    description:
      'Evidence: Fossil records, homologous structures, vestigial organs, DNA similarity between species. Natural selection: Beneficial traits increase, harmful traits decrease. Speciation: Reproductive isolation leads to new species formation.',
    category: 'Evolution',
    weightage: '6-8%',
    relatedTerms: ['Natural Selection', 'Speciation', 'Adaptation', 'Darwin', 'Lamarckism'],
    neetRelevance: 'High - Conceptual and application-based questions',
  },
  {
    term: 'Natural Selection',
    definition:
      'Natural selection is the mechanism of evolution whereby organisms better adapted to their environment survive and reproduce more successfully, passing advantageous traits to offspring.',
    description:
      'Differential survival and reproduction. Variations in population due to mutations. Environmental pressures select beneficial traits. Example: Peppered moths in Industrial Revolution. Types: Directional, stabilizing, disruptive.',
    category: 'Evolution',
    weightage: '5-6%',
    relatedTerms: ['Evolution', 'Adaptation', 'Mutation', 'Fitness', 'Speciation'],
    neetRelevance: 'High - Tested in examples and mechanism questions',
  },
]

// Export for use in components
export const BIOLOGY_CATEGORIES = [
  'Plant Physiology',
  'Animal Physiology',
  'Human Physiology',
  'Molecular Biology',
  'Genetics',
  'Cell Biology',
  'Ecology',
  'Evolution',
  'Botany',
  'Zoology',
]

// Get terms by category for voice search optimization
export function getTermsByCategory(category: string): BiologyTerm[] {
  return NEET_BIOLOGY_TERMS.filter((term) => term.category === category)
}

// Get high-weightage terms (most important for voice search)
export function getHighWeightagTerms(): BiologyTerm[] {
  return NEET_BIOLOGY_TERMS.filter((term) => {
    const weightage = term.weightage
    if (!weightage) return false
    const percentage = parseInt(weightage.split('-')[1])
    return percentage >= 8
  })
}
