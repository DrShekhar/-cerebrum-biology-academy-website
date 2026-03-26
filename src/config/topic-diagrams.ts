import type { InteractiveDiagramData, ComparisonDiagramData } from '@/types/interactive-diagram'

export type DiagramTypeHint =
  | 'cycle'
  | 'flowchart'
  | 'labeled-diagram'
  | 'comparison'
  | 'hierarchy'
  | 'sequence'

export interface TopicDiagramConfig {
  diagramType: DiagramTypeHint
  aiPromptHint: string
}

export const TOPIC_DIAGRAM_MAP: Record<string, TopicDiagramConfig> = {
  'Cell: The Unit of Life': {
    diagramType: 'labeled-diagram',
    aiPromptHint: 'Animal cell structure with all organelles labeled',
  },
  'Cell Cycle and Cell Division': {
    diagramType: 'comparison',
    aiPromptHint: 'Mitosis vs Meiosis comparison',
  },
  Biomolecules: {
    diagramType: 'hierarchy',
    aiPromptHint: 'Classification of biomolecules: carbohydrates, proteins, lipids, nucleic acids',
  },
  'Photosynthesis in Higher Plants': {
    diagramType: 'flowchart',
    aiPromptHint: 'Light reactions and Calvin cycle flowchart',
  },
  'Respiration in Plants': {
    diagramType: 'cycle',
    aiPromptHint: 'Krebs cycle / TCA cycle with all intermediates and products',
  },
  'Plant Kingdom': {
    diagramType: 'hierarchy',
    aiPromptHint:
      'Classification of Plant Kingdom: Algae, Bryophyta, Pteridophyta, Gymnospermae, Angiospermae',
  },
  'Animal Kingdom': {
    diagramType: 'hierarchy',
    aiPromptHint: 'Animal Kingdom classification: Porifera to Chordata phyla',
  },
  'Morphology of Flowering Plants': {
    diagramType: 'labeled-diagram',
    aiPromptHint: 'Parts of a flowering plant with root, stem, leaf, flower labeled',
  },
  'Anatomy of Flowering Plants': {
    diagramType: 'comparison',
    aiPromptHint: 'Dicot vs Monocot stem cross-section comparison',
  },
  'Structural Organisation in Animals': {
    diagramType: 'labeled-diagram',
    aiPromptHint: 'Types of animal tissues: epithelial, connective, muscular, nervous',
  },
  'Digestion and Absorption': {
    diagramType: 'flowchart',
    aiPromptHint: 'Human digestive system: organs and enzymes at each stage',
  },
  'Breathing and Exchange of Gases': {
    diagramType: 'flowchart',
    aiPromptHint: 'Mechanism of breathing: inspiration and expiration steps',
  },
  'Body Fluids and Circulation': {
    diagramType: 'cycle',
    aiPromptHint: 'Cardiac cycle: systole, diastole, blood flow through heart chambers',
  },
  'Excretory Products and their Elimination': {
    diagramType: 'flowchart',
    aiPromptHint: 'Urine formation: glomerular filtration, reabsorption, secretion',
  },
  'Neural Control and Coordination': {
    diagramType: 'flowchart',
    aiPromptHint: 'Nerve impulse transmission: resting potential, action potential, synapse',
  },
  'Chemical Coordination and Integration': {
    diagramType: 'hierarchy',
    aiPromptHint: 'Endocrine glands and their hormones hierarchy',
  },
  'Reproduction in Organisms': {
    diagramType: 'comparison',
    aiPromptHint: 'Asexual vs Sexual reproduction comparison',
  },
  'Sexual Reproduction in Flowering Plants': {
    diagramType: 'flowchart',
    aiPromptHint: 'Double fertilization process in angiosperms step-by-step',
  },
  'Human Reproduction': {
    diagramType: 'flowchart',
    aiPromptHint: 'Gametogenesis: spermatogenesis and oogenesis stages',
  },
  'Reproductive Health': {
    diagramType: 'flowchart',
    aiPromptHint: 'Contraceptive methods classification and mechanisms',
  },
  'Principles of Inheritance and Variation': {
    diagramType: 'flowchart',
    aiPromptHint: 'Mendelian genetics: monohybrid cross with Punnett square',
  },
  'Molecular Basis of Inheritance': {
    diagramType: 'flowchart',
    aiPromptHint: 'Central dogma: DNA replication, transcription, translation',
  },
  Evolution: {
    diagramType: 'hierarchy',
    aiPromptHint: 'Evidence of evolution: homologous/analogous organs, fossils, embryology',
  },
  'Human Health and Disease': {
    diagramType: 'flowchart',
    aiPromptHint: 'Immune response: innate and adaptive immunity pathway',
  },
  'Strategies for Enhancement in Food Production': {
    diagramType: 'flowchart',
    aiPromptHint: 'Plant breeding steps and animal husbandry methods',
  },
  'Microbes in Human Welfare': {
    diagramType: 'hierarchy',
    aiPromptHint: 'Microbes in food, industry, sewage treatment, biogas classification',
  },
  'Biotechnology: Principles and Processes': {
    diagramType: 'flowchart',
    aiPromptHint: 'Recombinant DNA technology steps: restriction enzymes, vectors, transformation',
  },
  'Biotechnology and its Applications': {
    diagramType: 'flowchart',
    aiPromptHint: 'Applications: Bt cotton, gene therapy, transgenic animals',
  },
  'Organisms and Populations': {
    diagramType: 'flowchart',
    aiPromptHint: 'Population interactions: mutualism, competition, predation, parasitism',
  },
  Ecosystem: {
    diagramType: 'cycle',
    aiPromptHint: 'Nutrient cycling: carbon cycle and nitrogen cycle',
  },
  'Biodiversity and Conservation': {
    diagramType: 'hierarchy',
    aiPromptHint: 'Biodiversity levels: genetic, species, ecosystem diversity with threats',
  },
  'Environmental Issues': {
    diagramType: 'flowchart',
    aiPromptHint: 'Pollution types, greenhouse effect, ozone depletion causes and solutions',
  },
}

export function getTopicDiagramConfig(topic: string): TopicDiagramConfig | null {
  if (TOPIC_DIAGRAM_MAP[topic]) return TOPIC_DIAGRAM_MAP[topic]

  const normalized = topic.toLowerCase()
  for (const [key, config] of Object.entries(TOPIC_DIAGRAM_MAP)) {
    if (key.toLowerCase().includes(normalized) || normalized.includes(key.toLowerCase())) {
      return config
    }
  }

  return null
}

export const DEMO_DIAGRAM_TOPICS: Record<
  string,
  () => Promise<InteractiveDiagramData | ComparisonDiagramData>
> = {
  'Respiration in Plants': () =>
    import('@/data/demo-diagrams/krebs-cycle').then((m) => m.krebsCycleDiagram),
  'Photosynthesis in Higher Plants': () =>
    import('@/data/demo-diagrams/krebs-cycle').then((m) => m.photosynthesisFlowchart),
  'Cell Cycle and Cell Division': () =>
    import('@/data/demo-diagrams/krebs-cycle').then((m) => m.mitosisVsMeiosisComparison),
  'Cell: The Unit of Life': () =>
    import('@/data/demo-diagrams/krebs-cycle').then((m) => m.animalCellDiagram),
}
