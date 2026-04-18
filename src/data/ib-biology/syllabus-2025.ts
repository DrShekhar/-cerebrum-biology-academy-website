/**
 * IB Biology 2025 syllabus structure — first assessment May 2025.
 *
 * Organised around four themes (A, B, C, D) rather than the legacy
 * topic-numbered structure. Each theme has subtopics marked SL/HL with
 * "AHL" indicating Higher-Level-only additional content.
 *
 * References:
 *  - IB Biology Guide 2025 (official)
 *  - IBDP Biology Teacher Support Material (2025)
 */

export type SyllabusLevel = 'SL' | 'AHL'

export interface SyllabusSubtopic {
  code: string
  title: string
  level: SyllabusLevel
  summary: string
}

export interface SyllabusTheme {
  code: 'A' | 'B' | 'C' | 'D'
  name: string
  tagline: string
  subtopics: SyllabusSubtopic[]
}

export const syllabusThemes: SyllabusTheme[] = [
  {
    code: 'A',
    name: 'Unity and Diversity',
    tagline:
      'Shared molecular basis of life across taxa: water, nucleic acids, classification, and biodiversity.',
    subtopics: [
      {
        code: 'A1.1',
        title: 'Water',
        level: 'SL',
        summary:
          'Polar molecular structure, hydrogen bonding, cohesion, adhesion, specific heat — explaining how water behaves as a solvent and a temperature buffer.',
      },
      {
        code: 'A1.2',
        title: 'Nucleic acids',
        level: 'SL',
        summary:
          'DNA and RNA structure, base pairing, antiparallel strands, and the conservation of nucleic acids across all life.',
      },
      {
        code: 'A2.1',
        title: 'Origins of cells (HL only)',
        level: 'AHL',
        summary:
          'Abiotic synthesis, RNA world hypothesis, endosymbiotic theory — the molecular bridge from chemistry to cellular life.',
      },
      {
        code: 'A2.2',
        title: 'Cell structure',
        level: 'SL',
        summary:
          'Prokaryote vs eukaryote architecture, organelle function, and the compartmentalisation that enables cellular specialisation.',
      },
      {
        code: 'A2.3',
        title: 'Viruses (HL only)',
        level: 'AHL',
        summary:
          'Viral structure, replication cycles, and their role in evolution via horizontal gene transfer.',
      },
      {
        code: 'A3.1',
        title: 'Diversity of organisms',
        level: 'SL',
        summary:
          'Species concepts, genetic diversity within species, and the three-domain classification.',
      },
      {
        code: 'A3.2',
        title: 'Classification and cladistics',
        level: 'SL',
        summary:
          'Hierarchical taxonomy, cladograms, molecular clock data, and evidence-based reconstruction of evolutionary relationships.',
      },
      {
        code: 'A4.1',
        title: 'Evolution and speciation',
        level: 'SL',
        summary:
          'Variation, natural selection, allopatric and sympatric speciation — with case studies from Galápagos finches and modern antibiotic resistance.',
      },
      {
        code: 'A4.2',
        title: 'Conservation of biodiversity',
        level: 'SL',
        summary:
          'Ecosystem and species-level extinction pressures, Simpson and Shannon indices, ex-situ vs in-situ conservation.',
      },
    ],
  },
  {
    code: 'B',
    name: 'Form and Function',
    tagline:
      'Structure predicts function at every scale — from enzyme active sites to body-plan physiology.',
    subtopics: [
      {
        code: 'B1.1',
        title: 'Carbohydrates and lipids',
        level: 'SL',
        summary:
          'Monomer-polymer logic, condensation and hydrolysis reactions, triglycerides and phospholipids, energy storage vs structural roles.',
      },
      {
        code: 'B1.2',
        title: 'Proteins',
        level: 'SL',
        summary:
          'Primary, secondary, tertiary, quaternary structure; how sequence determines shape and shape determines function.',
      },
      {
        code: 'B2.1',
        title: 'Membranes and membrane transport',
        level: 'SL',
        summary:
          'Fluid mosaic model, simple and facilitated diffusion, osmosis, active transport, endocytosis and exocytosis.',
      },
      {
        code: 'B2.2',
        title: 'Organelles and compartmentalisation',
        level: 'SL',
        summary:
          'The endomembrane system, protein targeting, and how compartmentalisation enables incompatible biochemistry.',
      },
      {
        code: 'B2.3',
        title: 'Cell specialisation (HL only)',
        level: 'AHL',
        summary:
          'Stem cells, differentiation, and the regulatory networks that maintain tissue identity.',
      },
      {
        code: 'B3.1',
        title: 'Gas exchange',
        level: 'SL',
        summary:
          'Surface-area-to-volume constraint, alveolar architecture, ventilation and perfusion matching, plant stomatal gas exchange.',
      },
      {
        code: 'B3.2',
        title: 'Transport',
        level: 'SL',
        summary:
          'Xylem and phloem transport, mass flow in animals (circulation), oxygen dissociation curves, and lymphatic return.',
      },
      {
        code: 'B3.3',
        title: 'Muscle and motility (HL only)',
        level: 'AHL',
        summary:
          'Sliding filament theory, neuromuscular junction signalling, motor unit recruitment, and skeletal biomechanics.',
      },
      {
        code: 'B4.1',
        title: 'Adaptation to environment',
        level: 'SL',
        summary:
          'Ecological niches, coevolution, convergent evolution, and how form tracks environmental pressures.',
      },
      {
        code: 'B4.2',
        title: 'Ecological niches',
        level: 'SL',
        summary:
          'Fundamental vs realised niche, resource partitioning, and competitive exclusion as a predictor of community structure.',
      },
    ],
  },
  {
    code: 'C',
    name: 'Interaction and Interdependence',
    tagline:
      'Living systems are networks — molecular signalling, homeostasis, ecosystems, and global biogeochemical cycles.',
    subtopics: [
      {
        code: 'C1.1',
        title: 'Enzymes and metabolism',
        level: 'SL',
        summary:
          'Enzyme kinetics, activation energy, Michaelis-Menten behaviour, and metabolic pathways as regulated networks.',
      },
      {
        code: 'C1.2',
        title: 'Cell respiration',
        level: 'SL',
        summary:
          'Glycolysis, Krebs cycle, electron transport chain, ATP yield comparisons across aerobic and anaerobic pathways.',
      },
      {
        code: 'C1.3',
        title: 'Photosynthesis',
        level: 'SL',
        summary:
          'Light-dependent and light-independent reactions, chlorophyll absorption spectrum, limiting factors — irradiance, CO₂, temperature.',
      },
      {
        code: 'C1.4',
        title: 'Chemiosmosis (HL only)',
        level: 'AHL',
        summary:
          'Proton gradients, ATP synthase mechanism, and the shared chemiosmotic logic of respiration and photosynthesis.',
      },
      {
        code: 'C2.1',
        title: 'Chemical signalling (HL only)',
        level: 'AHL',
        summary:
          'Receptor types, second-messenger pathways, signal amplification, and disruption in pharmacology.',
      },
      {
        code: 'C2.2',
        title: 'Neural signalling',
        level: 'SL',
        summary:
          'Resting and action potentials, saltatory conduction, synaptic transmission, and neurotransmitter classes.',
      },
      {
        code: 'C3.1',
        title: 'Integration of body systems',
        level: 'SL',
        summary:
          'Homeostatic loops, nervous vs endocrine timescales, negative and positive feedback examples.',
      },
      {
        code: 'C3.2',
        title: 'Defence against disease (HL only)',
        level: 'AHL',
        summary:
          'Innate and adaptive immunity, antibody structure, vaccination, and mechanisms of allergy and autoimmunity.',
      },
      {
        code: 'C4.1',
        title: 'Populations and communities',
        level: 'SL',
        summary:
          'Predation, competition, mutualism, population dynamics (exponential vs logistic growth), and carrying capacity.',
      },
      {
        code: 'C4.2',
        title: 'Transfer of energy and matter',
        level: 'SL',
        summary:
          'Food webs, trophic efficiency, biogeochemical cycles (C, N, P), and the ecological costs of energy loss.',
      },
    ],
  },
  {
    code: 'D',
    name: 'Continuity and Change',
    tagline:
      'Information is inherited, expressed, and changes — genetics, development, evolution, and the climate-era population.',
    subtopics: [
      {
        code: 'D1.1',
        title: 'DNA replication',
        level: 'SL',
        summary:
          'Semiconservative replication, leading and lagging strands, proofreading, and the origins of replication fidelity.',
      },
      {
        code: 'D1.2',
        title: 'Protein synthesis',
        level: 'SL',
        summary:
          'Transcription, RNA processing, translation, the genetic code, and its near-universal conservation.',
      },
      {
        code: 'D1.3',
        title: 'Mutation and gene editing (HL only)',
        level: 'AHL',
        summary:
          'Point mutations, frameshift mutations, CRISPR-Cas9, and the ethical frontier of germline editing.',
      },
      {
        code: 'D2.1',
        title: 'Cell and nuclear division',
        level: 'SL',
        summary:
          'Mitosis and meiosis, crossing over and independent assortment as sources of genetic variation, and the cell cycle checkpoints.',
      },
      {
        code: 'D2.2',
        title: 'Gene expression (HL only)',
        level: 'AHL',
        summary:
          'Transcription factors, enhancers, epigenetic regulation, and how cell identity is maintained through division.',
      },
      {
        code: 'D2.3',
        title: 'Water potential',
        level: 'SL',
        summary:
          'Water potential components, plasmolysis and turgor, with quantitative links to the osmotic IA you probably just wrote.',
      },
      {
        code: 'D3.1',
        title: 'Reproduction',
        level: 'SL',
        summary:
          'Sexual vs asexual strategies, pollination in angiosperms, menstrual cycle control, and IVF as applied reproductive biology.',
      },
      {
        code: 'D3.2',
        title: 'Inheritance',
        level: 'SL',
        summary:
          'Mendelian genetics, sex linkage, codominance, pedigree analysis, and Hardy-Weinberg equilibrium.',
      },
      {
        code: 'D3.3',
        title: 'Homeostasis',
        level: 'SL',
        summary:
          'Blood glucose, osmoregulation, thermoregulation — systems-level view of how multicellular organisms maintain internal state.',
      },
      {
        code: 'D4.1',
        title: 'Natural selection',
        level: 'SL',
        summary:
          'Variation, heritability, differential fitness, and the feedback loop that drives adaptation.',
      },
      {
        code: 'D4.2',
        title: 'Stability and change',
        level: 'SL',
        summary:
          'Anthropogenic climate change, tipping points in biological systems, and conservation biology in a changing world.',
      },
      {
        code: 'D4.3',
        title: 'Climate change',
        level: 'SL',
        summary:
          'Carbon cycle disruption, ocean acidification, shifting phenology, and evidence-based mitigation strategies.',
      },
    ],
  },
]

export const syllabusMeta = {
  firstAssessment: 'May 2025',
  slHours: 150,
  hlHours: 240,
  ahlHours: 90,
  papers: 2,
  paperRemoved: 'Paper 3 (options)',
  iaWeight: '20%',
} as const

export function themeByCode(code: 'A' | 'B' | 'C' | 'D'): SyllabusTheme {
  const t = syllabusThemes.find((x) => x.code === code)
  if (!t) throw new Error(`Unknown theme code: ${code}`)
  return t
}
