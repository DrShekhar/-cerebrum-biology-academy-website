/**
 * Comprehensive Database Updater for all downloaded diagrams
 * Maps NCERT chapters and adds proper metadata
 */

import { PrismaClient, DiagramCategory, DiagramSource } from '../../src/generated/prisma'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

interface DiagramMeta {
  file: string
  name: string
  category: DiagramCategory
  subcategory: string
  ncertClass: number
  ncertChapter: number
  tags: string[]
  importance: 'HIGH' | 'MEDIUM' | 'LOW'
}

// Comprehensive mapping of all downloaded diagrams
const DIAGRAM_METADATA: DiagramMeta[] = [
  // ============ EXISTING WIKIMEDIA DIAGRAMS ============
  { file: 'animal-cell.svg', name: 'Animal Cell Structure', category: 'CELL_BIOLOGY', subcategory: 'cell-structure', ncertClass: 11, ncertChapter: 8, tags: ['animal-cell', 'organelles', 'eukaryotic'], importance: 'HIGH' },
  { file: 'plant-cell.svg', name: 'Plant Cell Structure', category: 'CELL_BIOLOGY', subcategory: 'cell-structure', ncertClass: 11, ncertChapter: 8, tags: ['plant-cell', 'cell-wall', 'vacuole'], importance: 'HIGH' },
  { file: 'mitochondria.svg', name: 'Mitochondrion Structure', category: 'CELL_BIOLOGY', subcategory: 'organelles', ncertClass: 11, ncertChapter: 8, tags: ['mitochondria', 'cristae', 'atp'], importance: 'HIGH' },
  { file: 'chloroplast.svg', name: 'Chloroplast Structure', category: 'CELL_BIOLOGY', subcategory: 'organelles', ncertClass: 11, ncertChapter: 8, tags: ['chloroplast', 'thylakoid', 'stroma'], importance: 'HIGH' },
  { file: 'cell-membrane.svg', name: 'Cell Membrane - Fluid Mosaic Model', category: 'CELL_BIOLOGY', subcategory: 'cell-membrane', ncertClass: 11, ncertChapter: 8, tags: ['plasma-membrane', 'phospholipid', 'fluid-mosaic'], importance: 'HIGH' },
  { file: 'mitosis.svg', name: 'Mitosis Stages', category: 'CELL_BIOLOGY', subcategory: 'cell-division', ncertClass: 11, ncertChapter: 10, tags: ['mitosis', 'prophase', 'metaphase', 'anaphase'], importance: 'HIGH' },
  { file: 'meiosis.svg', name: 'Meiosis Overview', category: 'CELL_BIOLOGY', subcategory: 'cell-division', ncertClass: 11, ncertChapter: 10, tags: ['meiosis', 'crossing-over', 'reduction-division'], importance: 'HIGH' },
  { file: 'heart.svg', name: 'Human Heart Structure', category: 'HUMAN_PHYSIOLOGY', subcategory: 'circulatory-system', ncertClass: 11, ncertChapter: 18, tags: ['heart', 'cardiac', 'ventricle', 'atrium'], importance: 'HIGH' },
  { file: 'nephron.png', name: 'Nephron Structure', category: 'HUMAN_PHYSIOLOGY', subcategory: 'excretory-system', ncertClass: 11, ncertChapter: 19, tags: ['nephron', 'kidney', 'glomerulus'], importance: 'HIGH' },
  { file: 'neuron.svg', name: 'Neuron Structure', category: 'HUMAN_PHYSIOLOGY', subcategory: 'nervous-system', ncertClass: 11, ncertChapter: 21, tags: ['neuron', 'axon', 'dendrite'], importance: 'HIGH' },
  { file: 'brain.svg', name: 'Human Brain Sagittal Section', category: 'HUMAN_PHYSIOLOGY', subcategory: 'nervous-system', ncertClass: 11, ncertChapter: 21, tags: ['brain', 'cerebrum', 'cerebellum'], importance: 'HIGH' },
  { file: 'synapse.svg', name: 'Synapse Structure', category: 'HUMAN_PHYSIOLOGY', subcategory: 'nervous-system', ncertClass: 11, ncertChapter: 21, tags: ['synapse', 'neurotransmitter'], importance: 'HIGH' },
  { file: 'eye.svg', name: 'Human Eye Anatomy', category: 'HUMAN_PHYSIOLOGY', subcategory: 'sensory-organs', ncertClass: 11, ncertChapter: 21, tags: ['eye', 'retina', 'lens'], importance: 'HIGH' },
  { file: 'ear.svg', name: 'Human Ear Anatomy', category: 'HUMAN_PHYSIOLOGY', subcategory: 'sensory-organs', ncertClass: 11, ncertChapter: 21, tags: ['ear', 'cochlea', 'ossicles'], importance: 'HIGH' },
  { file: 'digestive-system.svg', name: 'Human Digestive System', category: 'HUMAN_PHYSIOLOGY', subcategory: 'digestive-system', ncertClass: 11, ncertChapter: 16, tags: ['digestion', 'stomach', 'intestine'], importance: 'HIGH' },
  { file: 'respiratory-system.svg', name: 'Human Respiratory System', category: 'HUMAN_PHYSIOLOGY', subcategory: 'respiratory-system', ncertClass: 11, ncertChapter: 17, tags: ['lungs', 'trachea', 'bronchi'], importance: 'HIGH' },
  { file: 'sarcomere.svg', name: 'Sarcomere Structure', category: 'HUMAN_PHYSIOLOGY', subcategory: 'muscular-system', ncertClass: 11, ncertChapter: 20, tags: ['sarcomere', 'actin', 'myosin'], importance: 'HIGH' },
  { file: 'dna-replication.svg', name: 'DNA Replication', category: 'MOLECULAR_BIOLOGY', subcategory: 'dna-replication', ncertClass: 12, ncertChapter: 6, tags: ['replication', 'helicase', 'polymerase'], importance: 'HIGH' },
  { file: 'translation.svg', name: 'Protein Synthesis - Translation', category: 'MOLECULAR_BIOLOGY', subcategory: 'gene-expression', ncertClass: 12, ncertChapter: 6, tags: ['translation', 'ribosome', 'trna'], importance: 'HIGH' },
  { file: 'calvin-cycle.svg', name: 'Calvin Cycle', category: 'PLANT_PHYSIOLOGY', subcategory: 'photosynthesis', ncertClass: 11, ncertChapter: 13, tags: ['calvin-cycle', 'dark-reaction', 'rubisco'], importance: 'HIGH' },
  { file: 'krebs-cycle.svg', name: 'Krebs Cycle (TCA)', category: 'PLANT_PHYSIOLOGY', subcategory: 'respiration', ncertClass: 11, ncertChapter: 14, tags: ['krebs-cycle', 'tca', 'citric-acid'], importance: 'HIGH' },
  { file: 'flower-structure.svg', name: 'Flower Structure', category: 'REPRODUCTION', subcategory: 'plant-reproduction', ncertClass: 12, ncertChapter: 2, tags: ['flower', 'stamen', 'pistil'], importance: 'HIGH' },
  { file: 'menstrual-cycle.svg', name: 'Menstrual Cycle', category: 'REPRODUCTION', subcategory: 'human-reproduction', ncertClass: 12, ncertChapter: 3, tags: ['menstrual-cycle', 'ovulation', 'hormones'], importance: 'HIGH' },
  { file: 'food-web.svg', name: 'Food Web', category: 'ECOLOGY', subcategory: 'ecosystem', ncertClass: 12, ncertChapter: 14, tags: ['food-web', 'food-chain', 'trophic-levels'], importance: 'HIGH' },
  { file: 'nitrogen-cycle.svg', name: 'Nitrogen Cycle', category: 'ECOLOGY', subcategory: 'biogeochemical-cycles', ncertClass: 11, ncertChapter: 12, tags: ['nitrogen-cycle', 'nitrogen-fixation'], importance: 'HIGH' },
  { file: 'carbon-cycle.svg', name: 'Carbon Cycle', category: 'ECOLOGY', subcategory: 'biogeochemical-cycles', ncertClass: 12, ncertChapter: 14, tags: ['carbon-cycle', 'co2'], importance: 'HIGH' },
  { file: 'pcr.svg', name: 'PCR - Polymerase Chain Reaction', category: 'BIOTECHNOLOGY', subcategory: 'techniques', ncertClass: 12, ncertChapter: 11, tags: ['pcr', 'amplification', 'primers'], importance: 'HIGH' },
  { file: 'bacteria.svg', name: 'Prokaryotic Cell (Bacteria)', category: 'MICROORGANISMS', subcategory: 'bacteria', ncertClass: 11, ncertChapter: 2, tags: ['bacteria', 'prokaryote', 'cell-wall'], importance: 'HIGH' },
  { file: 'bacteriophage.svg', name: 'Bacteriophage Structure', category: 'MICROORGANISMS', subcategory: 'virus', ncertClass: 11, ncertChapter: 2, tags: ['virus', 'bacteriophage', 'capsid'], importance: 'HIGH' },

  // ============ NEW VERIFIED DIAGRAMS ============
  // Cell Biology
  { file: 'chromosome-structure.svg', name: 'Chromosome Structure', category: 'CELL_BIOLOGY', subcategory: 'cell-division', ncertClass: 11, ncertChapter: 10, tags: ['chromosome', 'chromatin', 'centromere'], importance: 'HIGH' },
  { file: 'cilia-9plus2.svg', name: 'Cilia and Flagella (9+2 Arrangement)', category: 'CELL_BIOLOGY', subcategory: 'cell-structure', ncertClass: 11, ncertChapter: 8, tags: ['cilia', 'flagella', '9+2', 'microtubules'], importance: 'HIGH' },

  // Biomolecules
  { file: 'amino-acid-general.svg', name: 'Amino Acid Structure', category: 'MOLECULAR_BIOLOGY', subcategory: 'biomolecules', ncertClass: 11, ncertChapter: 9, tags: ['amino-acid', 'protein', 'r-group'], importance: 'HIGH' },
  { file: 'protein-primary-secondary.png', name: 'Protein Structure Levels', category: 'MOLECULAR_BIOLOGY', subcategory: 'biomolecules', ncertClass: 11, ncertChapter: 9, tags: ['protein', 'primary', 'secondary', 'tertiary'], importance: 'HIGH' },
  { file: 'enzyme-substrate.svg', name: 'Enzyme-Substrate Interaction (Induced Fit)', category: 'MOLECULAR_BIOLOGY', subcategory: 'biomolecules', ncertClass: 11, ncertChapter: 9, tags: ['enzyme', 'substrate', 'induced-fit'], importance: 'HIGH' },

  // Plant Anatomy
  { file: 'leaf-cross-section.svg', name: 'Leaf Cross Section (Dicot)', category: 'PLANT_PHYSIOLOGY', subcategory: 'plant-anatomy', ncertClass: 11, ncertChapter: 6, tags: ['leaf', 'mesophyll', 'stomata'], importance: 'HIGH' },

  // Human Physiology
  { file: 'blood-cell-types.png', name: 'Blood Cell Types', category: 'HUMAN_PHYSIOLOGY', subcategory: 'circulatory-system', ncertClass: 11, ncertChapter: 18, tags: ['blood-cells', 'rbc', 'wbc', 'platelets'], importance: 'HIGH' },
  { file: 'heart-section.svg', name: 'Human Heart (Internal Structure)', category: 'HUMAN_PHYSIOLOGY', subcategory: 'circulatory-system', ncertClass: 11, ncertChapter: 18, tags: ['heart', 'ventricle', 'atrium', 'valves'], importance: 'HIGH' },
  { file: 'cardiac-conduction.png', name: 'Cardiac Conduction System', category: 'HUMAN_PHYSIOLOGY', subcategory: 'circulatory-system', ncertClass: 11, ncertChapter: 18, tags: ['sa-node', 'av-node', 'bundle-of-his'], importance: 'HIGH' },
  { file: 'ecg-complex.svg', name: 'ECG Waveform (PQRST Complex)', category: 'HUMAN_PHYSIOLOGY', subcategory: 'circulatory-system', ncertClass: 11, ncertChapter: 18, tags: ['ecg', 'electrocardiogram', 'pqrst'], importance: 'HIGH' },
  { file: 'alveolus-structure.svg', name: 'Alveolus Structure', category: 'HUMAN_PHYSIOLOGY', subcategory: 'respiratory-system', ncertClass: 11, ncertChapter: 17, tags: ['alveolus', 'gas-exchange', 'lungs'], importance: 'HIGH' },
  { file: 'muscle-fiber.jpg', name: 'Skeletal Muscle Fiber', category: 'HUMAN_PHYSIOLOGY', subcategory: 'muscular-system', ncertClass: 11, ncertChapter: 20, tags: ['muscle', 'fiber', 'myofibril'], importance: 'HIGH' },
  { file: 'sarcomere-detail.svg', name: 'Sarcomere Detailed Structure', category: 'HUMAN_PHYSIOLOGY', subcategory: 'muscular-system', ncertClass: 11, ncertChapter: 20, tags: ['sarcomere', 'actin', 'myosin', 'z-line'], importance: 'HIGH' },
  { file: 'reflex-arc.svg', name: 'Reflex Arc', category: 'HUMAN_PHYSIOLOGY', subcategory: 'nervous-system', ncertClass: 11, ncertChapter: 21, tags: ['reflex-arc', 'sensory', 'motor'], importance: 'HIGH' },
  { file: 'action-potential-graph.svg', name: 'Action Potential Graph', category: 'HUMAN_PHYSIOLOGY', subcategory: 'nervous-system', ncertClass: 11, ncertChapter: 21, tags: ['action-potential', 'depolarization', 'repolarization'], importance: 'HIGH' },
  { file: 'synapse-detailed.jpg', name: 'Synapse Detailed View', category: 'HUMAN_PHYSIOLOGY', subcategory: 'nervous-system', ncertClass: 11, ncertChapter: 21, tags: ['synapse', 'vesicles', 'neurotransmitter'], importance: 'HIGH' },
  { file: 'cochlea-section.svg', name: 'Cochlea Cross Section', category: 'HUMAN_PHYSIOLOGY', subcategory: 'sensory-organs', ncertClass: 11, ncertChapter: 21, tags: ['cochlea', 'organ-of-corti', 'ear'], importance: 'HIGH' },
  { file: 'human-skeleton-labeled.svg', name: 'Human Skeleton (Labeled)', category: 'HUMAN_PHYSIOLOGY', subcategory: 'skeletal-system', ncertClass: 11, ncertChapter: 20, tags: ['skeleton', 'bones', 'axial', 'appendicular'], importance: 'HIGH' },
  { file: 'synovial-joint-detail.svg', name: 'Synovial Joint Structure', category: 'HUMAN_PHYSIOLOGY', subcategory: 'skeletal-system', ncertClass: 11, ncertChapter: 20, tags: ['joint', 'synovial', 'cartilage'], importance: 'HIGH' },
  { file: 'endocrine-system.svg', name: 'Endocrine System Overview', category: 'HUMAN_PHYSIOLOGY', subcategory: 'endocrine-system', ncertClass: 11, ncertChapter: 22, tags: ['endocrine', 'glands', 'hormones'], importance: 'HIGH' },
  { file: 'lung-volumes.svg', name: 'Lung Volumes and Capacities', category: 'HUMAN_PHYSIOLOGY', subcategory: 'respiratory-system', ncertClass: 11, ncertChapter: 17, tags: ['lung-volumes', 'tidal-volume', 'vital-capacity'], importance: 'HIGH' },
  { file: 'excretory-system.svg', name: 'Human Excretory System', category: 'HUMAN_PHYSIOLOGY', subcategory: 'excretory-system', ncertClass: 11, ncertChapter: 19, tags: ['excretory', 'kidney', 'ureter', 'bladder'], importance: 'HIGH' },
  { file: 'stomach-structure.svg', name: 'Stomach Structure', category: 'HUMAN_PHYSIOLOGY', subcategory: 'digestive-system', ncertClass: 11, ncertChapter: 16, tags: ['stomach', 'gastric', 'pylorus'], importance: 'HIGH' },

  // Reproduction
  { file: 'sperm-detailed.svg', name: 'Sperm Structure (Detailed)', category: 'REPRODUCTION', subcategory: 'human-reproduction', ncertClass: 12, ncertChapter: 3, tags: ['sperm', 'acrosome', 'flagellum'], importance: 'HIGH' },
  { file: 'menstrual-hormones.svg', name: 'Menstrual Cycle Hormones', category: 'REPRODUCTION', subcategory: 'human-reproduction', ncertClass: 12, ncertChapter: 3, tags: ['menstrual', 'fsh', 'lh', 'estrogen'], importance: 'HIGH' },
  { file: 'placenta.svg', name: 'Placenta Structure', category: 'REPRODUCTION', subcategory: 'human-reproduction', ncertClass: 12, ncertChapter: 3, tags: ['placenta', 'umbilical', 'fetus'], importance: 'HIGH' },
  { file: 'double-fertilisation.svg', name: 'Double Fertilization in Plants', category: 'REPRODUCTION', subcategory: 'plant-reproduction', ncertClass: 12, ncertChapter: 2, tags: ['double-fertilization', 'zygote', 'endosperm'], importance: 'HIGH' },

  // Genetics
  { file: 'dna-replication-fork.svg', name: 'DNA Replication Fork', category: 'MOLECULAR_BIOLOGY', subcategory: 'dna-replication', ncertClass: 12, ncertChapter: 6, tags: ['replication-fork', 'leading', 'lagging'], importance: 'HIGH' },
  { file: 'transcription-process.svg', name: 'Transcription Process', category: 'MOLECULAR_BIOLOGY', subcategory: 'gene-expression', ncertClass: 12, ncertChapter: 6, tags: ['transcription', 'rna-polymerase', 'mrna'], importance: 'HIGH' },
  { file: 'translation-ribosome.svg', name: 'Translation at Ribosome', category: 'MOLECULAR_BIOLOGY', subcategory: 'gene-expression', ncertClass: 12, ncertChapter: 6, tags: ['translation', 'ribosome', 'polypeptide'], importance: 'HIGH' },
  { file: 'trna-cloverleaf.svg', name: 'tRNA Cloverleaf Structure', category: 'MOLECULAR_BIOLOGY', subcategory: 'gene-expression', ncertClass: 12, ncertChapter: 6, tags: ['trna', 'anticodon', 'amino-acid'], importance: 'HIGH' },
  { file: 'chromatin-packing.png', name: 'Chromatin Packing (DNA to Chromosome)', category: 'MOLECULAR_BIOLOGY', subcategory: 'genetics', ncertClass: 12, ncertChapter: 6, tags: ['chromatin', 'nucleosome', 'histone'], importance: 'HIGH' },
  { file: 'karyotype.png', name: 'Human Karyotype', category: 'GENETICS', subcategory: 'chromosomes', ncertClass: 12, ncertChapter: 5, tags: ['karyotype', 'chromosomes', 'homologous'], importance: 'HIGH' },
  { file: 'pedigree-chart.svg', name: 'Pedigree Analysis Symbols', category: 'GENETICS', subcategory: 'inheritance', ncertClass: 12, ncertChapter: 5, tags: ['pedigree', 'inheritance', 'genetic-disorders'], importance: 'HIGH' },
  { file: 'monohybrid-punnet.svg', name: 'Monohybrid Cross (Punnett Square)', category: 'GENETICS', subcategory: 'inheritance', ncertClass: 12, ncertChapter: 5, tags: ['monohybrid', 'punnett', 'mendelian'], importance: 'HIGH' },
  { file: 'dihybrid-cross.svg', name: 'Dihybrid Cross', category: 'GENETICS', subcategory: 'inheritance', ncertClass: 12, ncertChapter: 5, tags: ['dihybrid', 'independent-assortment'], importance: 'HIGH' },

  // Evolution
  { file: 'miller-urey-apparatus.svg', name: 'Miller-Urey Experiment', category: 'EVOLUTION', subcategory: 'origin-of-life', ncertClass: 12, ncertChapter: 7, tags: ['miller-urey', 'abiogenesis', 'origin-of-life'], importance: 'HIGH' },
  { file: 'homologous-limbs.svg', name: 'Homologous Organs (Vertebrate Limbs)', category: 'EVOLUTION', subcategory: 'evidences', ncertClass: 12, ncertChapter: 7, tags: ['homologous', 'divergent-evolution', 'comparative-anatomy'], importance: 'HIGH' },
  { file: 'human-evolution-skulls.png', name: 'Human Evolution Timeline', category: 'EVOLUTION', subcategory: 'human-evolution', ncertClass: 12, ncertChapter: 7, tags: ['human-evolution', 'hominids', 'fossils'], importance: 'HIGH' },
  { file: 'natural-selection-types.svg', name: 'Types of Natural Selection', category: 'EVOLUTION', subcategory: 'natural-selection', ncertClass: 12, ncertChapter: 7, tags: ['natural-selection', 'stabilizing', 'directional', 'disruptive'], importance: 'HIGH' },

  // Biotechnology
  { file: 'plasmid-vector.svg', name: 'Plasmid Cloning Vector', category: 'BIOTECHNOLOGY', subcategory: 'techniques', ncertClass: 12, ncertChapter: 11, tags: ['plasmid', 'vector', 'cloning'], importance: 'HIGH' },
  { file: 'pcr-steps.svg', name: 'PCR Steps', category: 'BIOTECHNOLOGY', subcategory: 'techniques', ncertClass: 12, ncertChapter: 11, tags: ['pcr', 'denaturation', 'annealing', 'extension'], importance: 'HIGH' },
  { file: 'gel-electrophoresis-results.jpg', name: 'Gel Electrophoresis Results', category: 'BIOTECHNOLOGY', subcategory: 'techniques', ncertClass: 12, ncertChapter: 11, tags: ['gel-electrophoresis', 'dna-bands'], importance: 'HIGH' },
  { file: 'hiv-lifecycle.svg', name: 'HIV Replication Cycle', category: 'MICROORGANISMS', subcategory: 'virus', ncertClass: 12, ncertChapter: 8, tags: ['hiv', 'retrovirus', 'reverse-transcriptase'], importance: 'HIGH' },
  { file: 'antibody-structure.svg', name: 'Antibody Structure (Immunoglobulin)', category: 'HUMAN_PHYSIOLOGY', subcategory: 'immune-system', ncertClass: 12, ncertChapter: 8, tags: ['antibody', 'immunoglobulin', 'antigen'], importance: 'HIGH' },

  // Ecology
  { file: 'food-pyramid.svg', name: 'Ecological Pyramid', category: 'ECOLOGY', subcategory: 'ecosystem', ncertClass: 12, ncertChapter: 14, tags: ['ecological-pyramid', 'biomass', 'energy'], importance: 'HIGH' },
  { file: 'population-growth-curves.svg', name: 'Population Growth Curves (J & S)', category: 'ECOLOGY', subcategory: 'population', ncertClass: 12, ncertChapter: 13, tags: ['population-growth', 'j-curve', 's-curve', 'carrying-capacity'], importance: 'HIGH' },
  { file: 'age-pyramids.svg', name: 'Age Pyramids (Expanding, Stable, Declining)', category: 'ECOLOGY', subcategory: 'population', ncertClass: 12, ncertChapter: 13, tags: ['age-pyramid', 'demographics', 'population-structure'], importance: 'HIGH' },
  { file: 'ozone-layer.svg', name: 'Ozone Cycle and Depletion', category: 'ECOLOGY', subcategory: 'environmental-issues', ncertClass: 12, ncertChapter: 16, tags: ['ozone', 'uv', 'cfc', 'depletion'], importance: 'HIGH' },

  // Plant Physiology
  { file: 'photosystem-diagram.svg', name: 'Photosystem I and II (Thylakoid)', category: 'PLANT_PHYSIOLOGY', subcategory: 'photosynthesis', ncertClass: 11, ncertChapter: 13, tags: ['photosystem', 'light-reactions', 'thylakoid'], importance: 'HIGH' },
  { file: 'krebs-cycle-detailed.svg', name: 'Krebs Cycle Detailed', category: 'PLANT_PHYSIOLOGY', subcategory: 'respiration', ncertClass: 11, ncertChapter: 14, tags: ['krebs-cycle', 'tca', 'atp'], importance: 'HIGH' },
  { file: 'electron-transport.svg', name: 'Electron Transport Chain (Mitochondria)', category: 'PLANT_PHYSIOLOGY', subcategory: 'respiration', ncertClass: 11, ncertChapter: 14, tags: ['etc', 'electron-transport', 'oxidative-phosphorylation'], importance: 'HIGH' },
  { file: 'chemiosmosis-atp.svg', name: 'ATP Synthase (Chemiosmosis)', category: 'PLANT_PHYSIOLOGY', subcategory: 'respiration', ncertClass: 11, ncertChapter: 14, tags: ['atp-synthase', 'chemiosmosis', 'proton-gradient'], importance: 'HIGH' },
  { file: 'glycolysis.svg', name: 'Glycolysis Pathway', category: 'PLANT_PHYSIOLOGY', subcategory: 'respiration', ncertClass: 11, ncertChapter: 14, tags: ['glycolysis', 'glucose', 'pyruvate'], importance: 'HIGH' },

  // Microorganisms
  { file: 'paramecium.svg', name: 'Paramecium Structure', category: 'MICROORGANISMS', subcategory: 'protista', ncertClass: 11, ncertChapter: 2, tags: ['paramecium', 'cilia', 'protist'], importance: 'MEDIUM' },
  { file: 'moss-life-cycle.svg', name: 'Moss Life Cycle (Funaria)', category: 'PLANT_KINGDOM', subcategory: 'bryophytes', ncertClass: 11, ncertChapter: 3, tags: ['moss', 'bryophyte', 'alternation-of-generations'], importance: 'HIGH' },
  { file: 'moss-lifecycle.svg', name: 'Moss Lifecycle Diagram', category: 'PLANT_KINGDOM', subcategory: 'bryophytes', ncertClass: 11, ncertChapter: 3, tags: ['moss', 'gametophyte', 'sporophyte'], importance: 'HIGH' },

  // Additional from earlier downloads
  { file: 'peptide-bond.svg', name: 'Peptide Bond Formation', category: 'MOLECULAR_BIOLOGY', subcategory: 'biomolecules', ncertClass: 11, ncertChapter: 9, tags: ['peptide-bond', 'dehydration', 'amino-acids'], importance: 'HIGH' },
  { file: 'atp-structure.svg', name: 'ATP Structure', category: 'MOLECULAR_BIOLOGY', subcategory: 'biomolecules', ncertClass: 11, ncertChapter: 9, tags: ['atp', 'adenosine', 'phosphate', 'energy'], importance: 'HIGH' },
  { file: 'cell-cycle.svg', name: 'Cell Cycle Phases', category: 'CELL_BIOLOGY', subcategory: 'cell-division', ncertClass: 11, ncertChapter: 10, tags: ['cell-cycle', 'g1', 's-phase', 'g2', 'mitosis'], importance: 'HIGH' },
  { file: 'etc-chain.svg', name: 'Electron Transport Chain', category: 'PLANT_PHYSIOLOGY', subcategory: 'respiration', ncertClass: 11, ncertChapter: 14, tags: ['etc', 'complexes', 'cytochrome'], importance: 'HIGH' },
  { file: 'chemiosmosis.svg', name: 'Chemiosmosis Diagram', category: 'PLANT_PHYSIOLOGY', subcategory: 'respiration', ncertClass: 11, ncertChapter: 14, tags: ['chemiosmosis', 'proton-motive-force'], importance: 'HIGH' },
]

async function updateDatabase() {
  console.log('=== Comprehensive Database Update ===\n')

  const diagramsDir = path.join(__dirname, '../../public/diagrams')
  let added = 0, updated = 0, skipped = 0, notFound = 0

  for (const item of DIAGRAM_METADATA) {
    const filePath = path.join(diagramsDir, item.file)

    if (!fs.existsSync(filePath)) {
      notFound++
      continue
    }

    const stats = fs.statSync(filePath)
    const fileUrl = '/diagrams/' + item.file

    // Check existing
    const existing = await prisma.diagram_assets.findFirst({
      where: { name: item.name }
    })

    if (existing) {
      // Update with complete metadata
      const needsUpdate = !existing.ncertClass || !existing.ncertChapter || !existing.fileUrl
      if (needsUpdate) {
        await prisma.diagram_assets.update({
          where: { id: existing.id },
          data: {
            fileUrl,
            ncertClass: item.ncertClass,
            ncertChapter: item.ncertChapter,
            subcategory: item.subcategory,
            tags: item.tags,
            keywords: item.tags,
          }
        })
        updated++
        console.log('[UPDATE] ' + item.name)
      } else {
        skipped++
      }
      continue
    }

    // Create new
    await prisma.diagram_assets.create({
      data: {
        name: item.name,
        category: item.category,
        subcategory: item.subcategory,
        source: 'WIKIMEDIA' as DiagramSource,
        license: 'CC BY-SA 4.0',
        attribution: 'Wikimedia Commons',
        fileUrl,
        qualityScore: item.importance === 'HIGH' ? 4.5 : 4.0,
        ncertClass: item.ncertClass,
        ncertChapter: item.ncertChapter,
        tags: item.tags,
        keywords: item.tags,
        fileSize: stats.size,
        isActive: true,
        isVerified: true,
      }
    })

    console.log('[ADDED] ' + item.name)
    added++
  }

  console.log('\n=== SUMMARY ===')
  console.log('Added:', added)
  console.log('Updated:', updated)
  console.log('Skipped:', skipped)
  console.log('Files not found:', notFound)

  // Final stats
  const total = await prisma.diagram_assets.count()
  const byCategory = await prisma.diagram_assets.groupBy({
    by: ['category'],
    _count: { category: true }
  })
  const withNcert = await prisma.diagram_assets.count({
    where: { ncertClass: { not: null } }
  })

  console.log('\n=== DATABASE STATS ===')
  console.log('Total diagrams:', total)
  console.log('With NCERT mapping:', withNcert)
  console.log('\nBy Category:')
  byCategory.forEach(c => console.log('  ' + c.category + ': ' + c._count.category))

  await prisma.$disconnect()
}

updateDatabase().catch(console.error)
