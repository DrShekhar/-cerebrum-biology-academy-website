export type ChapterData = {
  name: string
  unit: string
  class: '11' | '12'
  weightage: string
  questionsPerYear: string
  description: string
  keyTopics: string[]
  importantConcepts: string[]
  neetTips: string[]
  relatedChapters: { name: string; slug: string }[]
}

export const chapterData: Record<string, ChapterData> = {
  'the-living-world': {
    name: 'The Living World',
    unit: 'Diversity in Living World',
    class: '11',
    weightage: '2%',
    questionsPerYear: '1-2',
    description:
      'Introduction to biology, characteristics of living organisms, taxonomic categories, and nomenclature.',
    keyTopics: [
      'What is Living?',
      'Biodiversity',
      'Taxonomy and Systematics',
      'Taxonomic Categories',
      'Taxonomic Aids',
    ],
    importantConcepts: [
      'Species concept',
      'Binomial nomenclature',
      'Herbarium',
      'Botanical gardens',
      'Museums',
      'Zoological parks',
    ],
    neetTips: [
      'Focus on taxonomic hierarchy',
      'Remember ICBN and ICZN rules',
      'Practice MCQs on nomenclature',
    ],
    relatedChapters: [
      { name: 'Biological Classification', slug: 'biological-classification' },
      { name: 'Plant Kingdom', slug: 'plant-kingdom' },
    ],
  },
  'biological-classification': {
    name: 'Biological Classification',
    unit: 'Diversity in Living World',
    class: '11',
    weightage: '4%',
    questionsPerYear: '3-4',
    description:
      'Classification systems, five kingdom classification, characteristics of each kingdom.',
    keyTopics: [
      'Five Kingdom Classification',
      'Kingdom Monera',
      'Kingdom Protista',
      'Kingdom Fungi',
      'Kingdom Plantae',
      'Kingdom Animalia',
      'Viruses, Viroids and Lichens',
    ],
    importantConcepts: [
      'Whittaker classification criteria',
      'Archaebacteria vs Eubacteria',
      'Mycorrhiza',
      'Lichens',
      'Virus structure',
    ],
    neetTips: [
      'Compare characteristics of all five kingdoms',
      'Focus on economic importance',
      'Learn about diseases caused by microorganisms',
    ],
    relatedChapters: [
      { name: 'The Living World', slug: 'the-living-world' },
      { name: 'Plant Kingdom', slug: 'plant-kingdom' },
      { name: 'Animal Kingdom', slug: 'animal-kingdom' },
    ],
  },
  'plant-kingdom': {
    name: 'Plant Kingdom',
    unit: 'Diversity in Living World',
    class: '11',
    weightage: '3%',
    questionsPerYear: '2-3',
    description:
      'Classification of plants, algae, bryophytes, pteridophytes, gymnosperms, and angiosperms.',
    keyTopics: [
      'Algae',
      'Bryophytes',
      'Pteridophytes',
      'Gymnosperms',
      'Angiosperms',
      'Plant Life Cycles',
      'Alternation of Generations',
    ],
    importantConcepts: [
      'Heterospory',
      'Seed formation',
      'Double fertilization',
      'Life cycles',
      'Economic importance',
    ],
    neetTips: [
      'Learn life cycles thoroughly',
      'Compare characteristics of different plant groups',
      'Focus on evolutionary trends',
    ],
    relatedChapters: [
      { name: 'Biological Classification', slug: 'biological-classification' },
      { name: 'Morphology of Flowering Plants', slug: 'morphology-of-flowering-plants' },
    ],
  },
  'animal-kingdom': {
    name: 'Animal Kingdom',
    unit: 'Diversity in Living World',
    class: '11',
    weightage: '5%',
    questionsPerYear: '4-5',
    description:
      'Classification of animals, basis of classification, and characteristics of major animal phyla.',
    keyTopics: [
      'Basis of Classification',
      'Classification of Animals',
      'Porifera to Hemichordata',
      'Phylum Chordata',
    ],
    importantConcepts: [
      'Levels of organization',
      'Body symmetry',
      'Coelom types',
      'Segmentation',
      'Notochord',
    ],
    neetTips: [
      'Memorize phyla characteristics',
      'Focus on examples from each phylum',
      'Understand evolutionary relationships',
    ],
    relatedChapters: [
      { name: 'Biological Classification', slug: 'biological-classification' },
      { name: 'Structural Organisation in Animals', slug: 'structural-organisation-in-animals' },
    ],
  },
  'cell-the-unit-of-life': {
    name: 'Cell: The Unit of Life',
    unit: 'Cell Structure and Function',
    class: '11',
    weightage: '4%',
    questionsPerYear: '3-4',
    description:
      'Cell theory, prokaryotic and eukaryotic cells, cell organelles and their functions.',
    keyTopics: [
      'Cell Theory',
      'Prokaryotic Cells',
      'Eukaryotic Cells',
      'Cell Membrane',
      'Cell Organelles',
      'Nucleus',
    ],
    importantConcepts: [
      'Fluid mosaic model',
      'Endomembrane system',
      'Mitochondria',
      'Chloroplast',
      'Ribosomes',
      'Cytoskeleton',
    ],
    neetTips: [
      'Understand structure-function relationships',
      'Compare prokaryotic and eukaryotic cells',
      'Learn organelle functions',
    ],
    relatedChapters: [
      { name: 'Biomolecules', slug: 'biomolecules' },
      { name: 'Cell Cycle and Cell Division', slug: 'cell-cycle-and-cell-division' },
    ],
  },
  biomolecules: {
    name: 'Biomolecules',
    unit: 'Cell Structure and Function',
    class: '11',
    weightage: '4%',
    questionsPerYear: '3-4',
    description:
      'Chemical composition of living cells, carbohydrates, proteins, lipids, nucleic acids, and enzymes.',
    keyTopics: [
      'How to Analyze Chemical Composition',
      'Amino Acids',
      'Proteins',
      'Carbohydrates',
      'Lipids',
      'Nucleic Acids',
      'Enzymes',
    ],
    importantConcepts: [
      'Primary to quaternary structure of proteins',
      'Enzyme kinetics',
      'Factors affecting enzyme activity',
      'Co-factors and co-enzymes',
    ],
    neetTips: [
      'Focus on enzyme kinetics graphs',
      'Learn amino acid structures',
      'Understand protein structure levels',
    ],
    relatedChapters: [
      { name: 'Cell: The Unit of Life', slug: 'cell-the-unit-of-life' },
      { name: 'Molecular Basis of Inheritance', slug: 'molecular-basis-of-inheritance' },
    ],
  },
  'principles-of-inheritance-and-variation': {
    name: 'Principles of Inheritance and Variation',
    unit: 'Genetics and Evolution',
    class: '12',
    weightage: '5%',
    questionsPerYear: '4-5',
    description:
      'Mendelian genetics, chromosomal theory, linkage, crossing over, sex determination, and genetic disorders.',
    keyTopics: [
      'Mendel Laws',
      'Inheritance Patterns',
      'Chromosomal Theory',
      'Linkage and Crossing Over',
      'Sex Determination',
      'Genetic Disorders',
    ],
    importantConcepts: [
      'Monohybrid and dihybrid crosses',
      'Pedigree analysis',
      'Blood groups',
      'Sex-linked inheritance',
      'Chromosomal disorders',
    ],
    neetTips: [
      'Practice genetic problems daily',
      'Master pedigree analysis',
      'Learn all genetic disorders thoroughly',
    ],
    relatedChapters: [
      { name: 'Molecular Basis of Inheritance', slug: 'molecular-basis-of-inheritance' },
      { name: 'Evolution', slug: 'evolution' },
    ],
  },
  'molecular-basis-of-inheritance': {
    name: 'Molecular Basis of Inheritance',
    unit: 'Genetics and Evolution',
    class: '12',
    weightage: '5%',
    questionsPerYear: '4-5',
    description:
      'DNA structure, replication, transcription, translation, regulation of gene expression, and Human Genome Project.',
    keyTopics: [
      'DNA Structure',
      'DNA Replication',
      'Transcription',
      'Translation',
      'Regulation of Gene Expression',
      'Human Genome Project',
      'DNA Fingerprinting',
    ],
    importantConcepts: [
      'Central dogma',
      'Lac operon',
      'DNA polymerase',
      'RNA polymerase',
      'Genetic code',
      'VNTR',
    ],
    neetTips: [
      'Understand all enzymes in replication and transcription',
      'Focus on lac operon regulation',
      'Learn genetic code properties',
    ],
    relatedChapters: [
      {
        name: 'Principles of Inheritance and Variation',
        slug: 'principles-of-inheritance-and-variation',
      },
      {
        name: 'Biotechnology: Principles and Processes',
        slug: 'biotechnology-principles-and-processes',
      },
    ],
  },
  'human-reproduction': {
    name: 'Human Reproduction',
    unit: 'Reproduction',
    class: '12',
    weightage: '4%',
    questionsPerYear: '3-4',
    description:
      'Male and female reproductive systems, gametogenesis, menstrual cycle, fertilization, pregnancy, and parturition.',
    keyTopics: [
      'Male Reproductive System',
      'Female Reproductive System',
      'Gametogenesis',
      'Menstrual Cycle',
      'Fertilization',
      'Embryo Development',
      'Parturition',
      'Lactation',
    ],
    importantConcepts: [
      'Spermatogenesis vs Oogenesis',
      'Hormonal control',
      'Implantation',
      'Placenta formation',
      'Parturition hormones',
    ],
    neetTips: [
      'Understand hormonal regulation thoroughly',
      'Learn stages of gametogenesis',
      'Focus on embryo development stages',
    ],
    relatedChapters: [
      { name: 'Reproductive Health', slug: 'reproductive-health' },
      {
        name: 'Sexual Reproduction in Flowering Plants',
        slug: 'sexual-reproduction-in-flowering-plants',
      },
    ],
  },
  ecosystem: {
    name: 'Ecosystem',
    unit: 'Ecology and Environment',
    class: '12',
    weightage: '3%',
    questionsPerYear: '2-3',
    description:
      'Ecosystem structure and function, productivity, decomposition, energy flow, ecological pyramids, and nutrient cycling.',
    keyTopics: [
      'Ecosystem Structure',
      'Productivity',
      'Decomposition',
      'Energy Flow',
      'Ecological Pyramids',
      'Nutrient Cycling',
      'Ecological Succession',
    ],
    importantConcepts: [
      'Food chain and food web',
      'Trophic levels',
      '10% law',
      'Biogeochemical cycles',
      'Primary and secondary succession',
    ],
    neetTips: [
      'Learn all types of ecological pyramids',
      'Understand energy flow calculations',
      'Focus on nutrient cycles',
    ],
    relatedChapters: [
      { name: 'Organisms and Populations', slug: 'organisms-and-populations' },
      { name: 'Biodiversity and Conservation', slug: 'biodiversity-and-conservation' },
    ],
  },
}

export function getAllChapterSlugs(): string[] {
  return Object.keys(chapterData)
}

export function getChapterBySlug(slug: string): ChapterData | undefined {
  return chapterData[slug]
}
