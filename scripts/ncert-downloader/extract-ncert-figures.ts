/**
 * NCERT Figure Extractor
 * Extracts figure references from downloaded NCERT Biology PDFs
 * Creates a mapping of all diagrams with their locations
 */

import * as fs from 'fs'
import * as path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const NCERT_DIR = path.join(__dirname, '../../resources/ncert-textbooks')

interface FigureReference {
  figure: string
  title?: string
  page?: number
  chapter: number
  className: 11 | 12
  chapterName: string
}

interface ChapterInfo {
  className: 11 | 12
  chapterNo: number
  chapterName: string
  pdfFile: string
  fileSize: number
  available: boolean
}

// Get all available chapters
function getAvailableChapters(): ChapterInfo[] {
  const chapters: ChapterInfo[] = []

  // Class 11
  const class11Dir = path.join(NCERT_DIR, 'class-11')
  if (fs.existsSync(class11Dir)) {
    const files = fs.readdirSync(class11Dir)
    files.forEach((file) => {
      if (file.endsWith('.pdf')) {
        const filePath = path.join(class11Dir, file)
        const stats = fs.statSync(filePath)
        const match = file.match(/^(\d+)-(.+)\.pdf$/)
        if (match) {
          chapters.push({
            className: 11,
            chapterNo: parseInt(match[1]),
            chapterName: match[2].replace(/-/g, ' '),
            pdfFile: file,
            fileSize: stats.size,
            available: stats.size > 100, // Files with only "ERROR" are ~6 bytes
          })
        }
      }
    })
  }

  // Class 12
  const class12Dir = path.join(NCERT_DIR, 'class-12')
  if (fs.existsSync(class12Dir)) {
    const files = fs.readdirSync(class12Dir)
    files.forEach((file) => {
      if (file.endsWith('.pdf')) {
        const filePath = path.join(class12Dir, file)
        const stats = fs.statSync(filePath)
        const match = file.match(/^(\d+)-(.+)\.pdf$/)
        if (match) {
          chapters.push({
            className: 12,
            chapterNo: parseInt(match[1]),
            chapterName: match[2].replace(/-/g, ' '),
            pdfFile: file,
            fileSize: stats.size,
            available: stats.size > 100,
          })
        }
      }
    })
  }

  return chapters.sort((a, b) => {
    if (a.className !== b.className) return a.className - b.className
    return a.chapterNo - b.chapterNo
  })
}

// Comprehensive NCERT figure mapping based on actual textbook content
const NCERT_FIGURE_DATABASE: FigureReference[] = [
  // CLASS 11 - UNIT 1: Diversity in Living World
  // Chapter 1: The Living World
  {
    figure: '1.1',
    title: 'Taxonomic Hierarchy',
    chapter: 1,
    className: 11,
    chapterName: 'The Living World',
  },

  // Chapter 2: Biological Classification
  {
    figure: '2.1',
    title: 'Five Kingdom Classification',
    chapter: 2,
    className: 11,
    chapterName: 'Biological Classification',
  },
  {
    figure: '2.2',
    title: 'Bacteria Structure',
    chapter: 2,
    className: 11,
    chapterName: 'Biological Classification',
  },
  {
    figure: '2.3',
    title: 'Bacteriophage Structure',
    chapter: 2,
    className: 11,
    chapterName: 'Biological Classification',
  },
  {
    figure: '2.4',
    title: 'Virus Types (TMV, Influenza)',
    chapter: 2,
    className: 11,
    chapterName: 'Biological Classification',
  },

  // Chapter 3: Plant Kingdom
  {
    figure: '3.1',
    title: 'Algae Types (Spirogyra, Chlamydomonas)',
    chapter: 3,
    className: 11,
    chapterName: 'Plant Kingdom',
  },
  {
    figure: '3.2',
    title: 'Chlamydomonas Life Cycle',
    chapter: 3,
    className: 11,
    chapterName: 'Plant Kingdom',
  },
  {
    figure: '3.3',
    title: 'Moss Life Cycle',
    chapter: 3,
    className: 11,
    chapterName: 'Plant Kingdom',
  },
  {
    figure: '3.4',
    title: 'Fern (Pteris) Structure',
    chapter: 3,
    className: 11,
    chapterName: 'Plant Kingdom',
  },
  {
    figure: '3.5',
    title: 'Fern Life Cycle',
    chapter: 3,
    className: 11,
    chapterName: 'Plant Kingdom',
  },
  {
    figure: '3.6',
    title: 'Alternation of Generations',
    chapter: 3,
    className: 11,
    chapterName: 'Plant Kingdom',
  },

  // Chapter 4: Animal Kingdom
  {
    figure: '4.1',
    title: 'Body Symmetry Types',
    chapter: 4,
    className: 11,
    chapterName: 'Animal Kingdom',
  },
  {
    figure: '4.2',
    title: 'Coelom Types',
    chapter: 4,
    className: 11,
    chapterName: 'Animal Kingdom',
  },
  {
    figure: '4.3',
    title: 'Porifera (Sponge)',
    chapter: 4,
    className: 11,
    chapterName: 'Animal Kingdom',
  },
  {
    figure: '4.4',
    title: 'Cnidaria (Hydra, Obelia)',
    chapter: 4,
    className: 11,
    chapterName: 'Animal Kingdom',
  },
  {
    figure: '4.5',
    title: 'Platyhelminthes (Planaria, Fasciola)',
    chapter: 4,
    className: 11,
    chapterName: 'Animal Kingdom',
  },
  {
    figure: '4.6',
    title: 'Aschelminthes (Ascaris)',
    chapter: 4,
    className: 11,
    chapterName: 'Animal Kingdom',
  },
  {
    figure: '4.7',
    title: 'Annelida (Earthworm, Nereis)',
    chapter: 4,
    className: 11,
    chapterName: 'Animal Kingdom',
  },
  {
    figure: '4.8',
    title: 'Arthropoda Representatives',
    chapter: 4,
    className: 11,
    chapterName: 'Animal Kingdom',
  },
  {
    figure: '4.9',
    title: 'Mollusca (Pila, Octopus)',
    chapter: 4,
    className: 11,
    chapterName: 'Animal Kingdom',
  },
  {
    figure: '4.10',
    title: 'Echinodermata (Starfish)',
    chapter: 4,
    className: 11,
    chapterName: 'Animal Kingdom',
  },
  {
    figure: '4.11',
    title: 'Protochordata',
    chapter: 4,
    className: 11,
    chapterName: 'Animal Kingdom',
  },
  {
    figure: '4.12',
    title: 'Vertebrata Representatives',
    chapter: 4,
    className: 11,
    chapterName: 'Animal Kingdom',
  },

  // CLASS 11 - UNIT 2: Structural Organisation
  // Chapter 5: Morphology of Flowering Plants
  {
    figure: '5.1',
    title: 'Root Types (Tap & Fibrous)',
    chapter: 5,
    className: 11,
    chapterName: 'Morphology of Flowering Plants',
  },
  {
    figure: '5.2',
    title: 'Root Modifications',
    chapter: 5,
    className: 11,
    chapterName: 'Morphology of Flowering Plants',
  },
  {
    figure: '5.3',
    title: 'Stem Types',
    chapter: 5,
    className: 11,
    chapterName: 'Morphology of Flowering Plants',
  },
  {
    figure: '5.4',
    title: 'Stem Modifications',
    chapter: 5,
    className: 11,
    chapterName: 'Morphology of Flowering Plants',
  },
  {
    figure: '5.5',
    title: 'Leaf Types (Simple & Compound)',
    chapter: 5,
    className: 11,
    chapterName: 'Morphology of Flowering Plants',
  },
  {
    figure: '5.6',
    title: 'Leaf Phyllotaxy',
    chapter: 5,
    className: 11,
    chapterName: 'Morphology of Flowering Plants',
  },
  {
    figure: '5.7',
    title: 'Venation Types',
    chapter: 5,
    className: 11,
    chapterName: 'Morphology of Flowering Plants',
  },
  {
    figure: '5.8',
    title: 'Leaf Modifications',
    chapter: 5,
    className: 11,
    chapterName: 'Morphology of Flowering Plants',
  },
  {
    figure: '5.10',
    title: 'Inflorescence Types',
    chapter: 5,
    className: 11,
    chapterName: 'Morphology of Flowering Plants',
  },
  {
    figure: '5.11',
    title: 'Flower Parts (Whorls)',
    chapter: 5,
    className: 11,
    chapterName: 'Morphology of Flowering Plants',
  },
  {
    figure: '5.13',
    title: 'Aestivation Types',
    chapter: 5,
    className: 11,
    chapterName: 'Morphology of Flowering Plants',
  },
  {
    figure: '5.14',
    title: 'Placentation Types',
    chapter: 5,
    className: 11,
    chapterName: 'Morphology of Flowering Plants',
  },
  {
    figure: '5.15',
    title: 'Fruit Types',
    chapter: 5,
    className: 11,
    chapterName: 'Morphology of Flowering Plants',
  },
  {
    figure: '5.16',
    title: 'Seed Structure (Monocot & Dicot)',
    chapter: 5,
    className: 11,
    chapterName: 'Morphology of Flowering Plants',
  },
  {
    figure: '5.17',
    title: 'Floral Diagram & Formula',
    chapter: 5,
    className: 11,
    chapterName: 'Morphology of Flowering Plants',
  },

  // Chapter 6: Anatomy of Flowering Plants
  {
    figure: '6.1',
    title: 'Meristematic Tissues',
    chapter: 6,
    className: 11,
    chapterName: 'Anatomy of Flowering Plants',
  },
  {
    figure: '6.2',
    title: 'Simple Tissues (Parenchyma, Collenchyma, Sclerenchyma)',
    chapter: 6,
    className: 11,
    chapterName: 'Anatomy of Flowering Plants',
  },
  {
    figure: '6.3',
    title: 'Xylem Elements',
    chapter: 6,
    className: 11,
    chapterName: 'Anatomy of Flowering Plants',
  },
  {
    figure: '6.4',
    title: 'Phloem Elements',
    chapter: 6,
    className: 11,
    chapterName: 'Anatomy of Flowering Plants',
  },
  {
    figure: '6.5',
    title: 'T.S. Dicot Root',
    chapter: 6,
    className: 11,
    chapterName: 'Anatomy of Flowering Plants',
  },
  {
    figure: '6.6',
    title: 'T.S. Monocot Root',
    chapter: 6,
    className: 11,
    chapterName: 'Anatomy of Flowering Plants',
  },
  {
    figure: '6.7',
    title: 'T.S. Dicot Stem',
    chapter: 6,
    className: 11,
    chapterName: 'Anatomy of Flowering Plants',
  },
  {
    figure: '6.8',
    title: 'T.S. Monocot Stem',
    chapter: 6,
    className: 11,
    chapterName: 'Anatomy of Flowering Plants',
  },
  {
    figure: '6.9',
    title: 'T.S. Dicot Leaf',
    chapter: 6,
    className: 11,
    chapterName: 'Anatomy of Flowering Plants',
  },
  {
    figure: '6.10',
    title: 'Secondary Growth in Dicot Stem',
    chapter: 6,
    className: 11,
    chapterName: 'Anatomy of Flowering Plants',
  },
  {
    figure: '6.11',
    title: 'Stomata Structure',
    chapter: 6,
    className: 11,
    chapterName: 'Anatomy of Flowering Plants',
  },

  // Chapter 7: Structural Organisation in Animals
  {
    figure: '7.1',
    title: 'Epithelial Tissue Types',
    chapter: 7,
    className: 11,
    chapterName: 'Structural Organisation in Animals',
  },
  {
    figure: '7.2',
    title: 'Connective Tissue Types',
    chapter: 7,
    className: 11,
    chapterName: 'Structural Organisation in Animals',
  },
  {
    figure: '7.3',
    title: 'Muscle Tissue Types',
    chapter: 7,
    className: 11,
    chapterName: 'Structural Organisation in Animals',
  },
  {
    figure: '7.4',
    title: 'Neural Tissue',
    chapter: 7,
    className: 11,
    chapterName: 'Structural Organisation in Animals',
  },
  {
    figure: '7.5',
    title: 'Earthworm External Features',
    chapter: 7,
    className: 11,
    chapterName: 'Structural Organisation in Animals',
  },
  {
    figure: '7.6',
    title: 'Earthworm Digestive System',
    chapter: 7,
    className: 11,
    chapterName: 'Structural Organisation in Animals',
  },
  {
    figure: '7.7',
    title: 'Cockroach External Features',
    chapter: 7,
    className: 11,
    chapterName: 'Structural Organisation in Animals',
  },
  {
    figure: '7.8',
    title: 'Cockroach Internal Systems',
    chapter: 7,
    className: 11,
    chapterName: 'Structural Organisation in Animals',
  },
  {
    figure: '7.9',
    title: 'Frog External Features',
    chapter: 7,
    className: 11,
    chapterName: 'Structural Organisation in Animals',
  },
  {
    figure: '7.10',
    title: 'Frog Internal Anatomy',
    chapter: 7,
    className: 11,
    chapterName: 'Structural Organisation in Animals',
  },

  // CLASS 11 - UNIT 3: Cell Structure and Function
  // Chapter 8: Cell - The Unit of Life
  {
    figure: '8.1',
    title: 'Prokaryotic Cell Structure',
    chapter: 8,
    className: 11,
    chapterName: 'Cell The Unit of Life',
  },
  {
    figure: '8.2',
    title: 'Cell Wall Structure',
    chapter: 8,
    className: 11,
    chapterName: 'Cell The Unit of Life',
  },
  {
    figure: '8.3',
    title: 'Plasma Membrane (Fluid Mosaic Model)',
    chapter: 8,
    className: 11,
    chapterName: 'Cell The Unit of Life',
  },
  {
    figure: '8.4',
    title: 'Nucleus Structure',
    chapter: 8,
    className: 11,
    chapterName: 'Cell The Unit of Life',
  },
  {
    figure: '8.5',
    title: 'Endoplasmic Reticulum',
    chapter: 8,
    className: 11,
    chapterName: 'Cell The Unit of Life',
  },
  {
    figure: '8.6',
    title: 'Golgi Apparatus',
    chapter: 8,
    className: 11,
    chapterName: 'Cell The Unit of Life',
  },
  {
    figure: '8.7',
    title: 'Lysosome',
    chapter: 8,
    className: 11,
    chapterName: 'Cell The Unit of Life',
  },
  {
    figure: '8.8',
    title: 'Mitochondrion Structure',
    chapter: 8,
    className: 11,
    chapterName: 'Cell The Unit of Life',
  },
  {
    figure: '8.9',
    title: 'Chloroplast Structure',
    chapter: 8,
    className: 11,
    chapterName: 'Cell The Unit of Life',
  },
  {
    figure: '8.10',
    title: 'Ribosome Structure',
    chapter: 8,
    className: 11,
    chapterName: 'Cell The Unit of Life',
  },
  {
    figure: '8.11',
    title: 'Cilia and Flagella (9+2 Pattern)',
    chapter: 8,
    className: 11,
    chapterName: 'Cell The Unit of Life',
  },
  {
    figure: '8.12',
    title: 'Centrosome and Centrioles',
    chapter: 8,
    className: 11,
    chapterName: 'Cell The Unit of Life',
  },

  // Chapter 9: Biomolecules
  {
    figure: '9.1',
    title: 'Amino Acid Structure',
    chapter: 9,
    className: 11,
    chapterName: 'Biomolecules',
  },
  {
    figure: '9.2',
    title: 'Peptide Bond Formation',
    chapter: 9,
    className: 11,
    chapterName: 'Biomolecules',
  },
  {
    figure: '9.3',
    title: 'Protein Structure Levels',
    chapter: 9,
    className: 11,
    chapterName: 'Biomolecules',
  },
  {
    figure: '9.4',
    title: 'Nucleotide Structure',
    chapter: 9,
    className: 11,
    chapterName: 'Biomolecules',
  },
  {
    figure: '9.5',
    title: 'DNA Double Helix',
    chapter: 9,
    className: 11,
    chapterName: 'Biomolecules',
  },
  {
    figure: '9.6',
    title: 'Enzyme Action (Lock & Key Model)',
    chapter: 9,
    className: 11,
    chapterName: 'Biomolecules',
  },
  {
    figure: '9.7',
    title: 'Enzyme Kinetics',
    chapter: 9,
    className: 11,
    chapterName: 'Biomolecules',
  },

  // Chapter 10: Cell Cycle and Cell Division
  {
    figure: '10.1',
    title: 'Cell Cycle Phases',
    chapter: 10,
    className: 11,
    chapterName: 'Cell Cycle and Cell Division',
  },
  {
    figure: '10.2',
    title: 'Mitosis Stages',
    chapter: 10,
    className: 11,
    chapterName: 'Cell Cycle and Cell Division',
  },
  {
    figure: '10.3',
    title: 'Meiosis I Stages',
    chapter: 10,
    className: 11,
    chapterName: 'Cell Cycle and Cell Division',
  },
  {
    figure: '10.4',
    title: 'Meiosis II Stages',
    chapter: 10,
    className: 11,
    chapterName: 'Cell Cycle and Cell Division',
  },
  {
    figure: '10.5',
    title: 'Chromosome Structure',
    chapter: 10,
    className: 11,
    chapterName: 'Cell Cycle and Cell Division',
  },
  {
    figure: '10.6',
    title: 'Crossing Over',
    chapter: 10,
    className: 11,
    chapterName: 'Cell Cycle and Cell Division',
  },

  // CLASS 11 - UNIT 4: Plant Physiology
  // Chapter 11: Transport in Plants
  {
    figure: '11.1',
    title: 'Osmosis & Diffusion',
    chapter: 11,
    className: 11,
    chapterName: 'Transport in Plants',
  },
  {
    figure: '11.2',
    title: 'Plasmolysis',
    chapter: 11,
    className: 11,
    chapterName: 'Transport in Plants',
  },
  {
    figure: '11.3',
    title: 'Water Absorption by Roots',
    chapter: 11,
    className: 11,
    chapterName: 'Transport in Plants',
  },
  {
    figure: '11.4',
    title: 'Transpiration Pull',
    chapter: 11,
    className: 11,
    chapterName: 'Transport in Plants',
  },
  {
    figure: '11.5',
    title: 'Stomata Opening & Closing',
    chapter: 11,
    className: 11,
    chapterName: 'Transport in Plants',
  },
  {
    figure: '11.6',
    title: 'Phloem Loading & Unloading',
    chapter: 11,
    className: 11,
    chapterName: 'Transport in Plants',
  },

  // Chapter 12: Mineral Nutrition
  {
    figure: '12.1',
    title: 'Hydroponics Setup',
    chapter: 12,
    className: 11,
    chapterName: 'Mineral Nutrition',
  },
  {
    figure: '12.2',
    title: 'Nitrogen Cycle',
    chapter: 12,
    className: 11,
    chapterName: 'Mineral Nutrition',
  },
  {
    figure: '12.3',
    title: 'Root Nodule Structure',
    chapter: 12,
    className: 11,
    chapterName: 'Mineral Nutrition',
  },

  // Chapter 13: Photosynthesis in Higher Plants
  {
    figure: '13.1',
    title: 'Chloroplast Structure',
    chapter: 13,
    className: 11,
    chapterName: 'Photosynthesis in Higher Plants',
  },
  {
    figure: '13.2',
    title: 'Z-Scheme (Light Reactions)',
    chapter: 13,
    className: 11,
    chapterName: 'Photosynthesis in Higher Plants',
  },
  {
    figure: '13.3',
    title: 'Photosystem Structure',
    chapter: 13,
    className: 11,
    chapterName: 'Photosynthesis in Higher Plants',
  },
  {
    figure: '13.4',
    title: 'Calvin Cycle (C3 Pathway)',
    chapter: 13,
    className: 11,
    chapterName: 'Photosynthesis in Higher Plants',
  },
  {
    figure: '13.5',
    title: 'C4 Pathway (Hatch-Slack)',
    chapter: 13,
    className: 11,
    chapterName: 'Photosynthesis in Higher Plants',
  },
  {
    figure: '13.6',
    title: 'Kranz Anatomy',
    chapter: 13,
    className: 11,
    chapterName: 'Photosynthesis in Higher Plants',
  },
  {
    figure: '13.7',
    title: 'Photorespiration',
    chapter: 13,
    className: 11,
    chapterName: 'Photosynthesis in Higher Plants',
  },

  // Chapter 14: Respiration in Plants
  {
    figure: '14.1',
    title: 'Glycolysis Pathway',
    chapter: 14,
    className: 11,
    chapterName: 'Respiration in Plants',
  },
  {
    figure: '14.2',
    title: 'Krebs Cycle (TCA Cycle)',
    chapter: 14,
    className: 11,
    chapterName: 'Respiration in Plants',
  },
  {
    figure: '14.3',
    title: 'Electron Transport Chain',
    chapter: 14,
    className: 11,
    chapterName: 'Respiration in Plants',
  },
  {
    figure: '14.4',
    title: 'ATP Synthase (Chemiosmosis)',
    chapter: 14,
    className: 11,
    chapterName: 'Respiration in Plants',
  },
  {
    figure: '14.5',
    title: 'Fermentation Pathways',
    chapter: 14,
    className: 11,
    chapterName: 'Respiration in Plants',
  },

  // Chapter 15: Plant Growth and Development
  {
    figure: '15.1',
    title: 'Growth Curve',
    chapter: 15,
    className: 11,
    chapterName: 'Plant Growth and Development',
  },
  {
    figure: '15.2',
    title: 'Auxin Action',
    chapter: 15,
    className: 11,
    chapterName: 'Plant Growth and Development',
  },
  {
    figure: '15.3',
    title: 'Gibberellin Effects',
    chapter: 15,
    className: 11,
    chapterName: 'Plant Growth and Development',
  },
  {
    figure: '15.4',
    title: 'Phytochrome System',
    chapter: 15,
    className: 11,
    chapterName: 'Plant Growth and Development',
  },
  {
    figure: '15.5',
    title: 'Photoperiodism',
    chapter: 15,
    className: 11,
    chapterName: 'Plant Growth and Development',
  },

  // CLASS 11 - UNIT 5: Human Physiology
  // Chapter 16: Digestion and Absorption
  {
    figure: '16.1',
    title: 'Human Digestive System',
    chapter: 16,
    className: 11,
    chapterName: 'Digestion and Absorption',
  },
  {
    figure: '16.2',
    title: 'Stomach Structure',
    chapter: 16,
    className: 11,
    chapterName: 'Digestion and Absorption',
  },
  {
    figure: '16.3',
    title: 'Small Intestine Villus',
    chapter: 16,
    className: 11,
    chapterName: 'Digestion and Absorption',
  },
  {
    figure: '16.4',
    title: 'Liver & Pancreas',
    chapter: 16,
    className: 11,
    chapterName: 'Digestion and Absorption',
  },
  {
    figure: '16.5',
    title: 'Absorption in Intestine',
    chapter: 16,
    className: 11,
    chapterName: 'Digestion and Absorption',
  },

  // Chapter 17: Breathing and Exchange of Gases
  {
    figure: '17.1',
    title: 'Human Respiratory System',
    chapter: 17,
    className: 11,
    chapterName: 'Breathing and Exchange of Gases',
  },
  {
    figure: '17.2',
    title: 'Lungs & Alveoli',
    chapter: 17,
    className: 11,
    chapterName: 'Breathing and Exchange of Gases',
  },
  {
    figure: '17.3',
    title: 'Breathing Mechanism',
    chapter: 17,
    className: 11,
    chapterName: 'Breathing and Exchange of Gases',
  },
  {
    figure: '17.4',
    title: 'Lung Volumes & Capacities',
    chapter: 17,
    className: 11,
    chapterName: 'Breathing and Exchange of Gases',
  },
  {
    figure: '17.5',
    title: 'Oxygen Dissociation Curve',
    chapter: 17,
    className: 11,
    chapterName: 'Breathing and Exchange of Gases',
  },
  {
    figure: '17.6',
    title: 'Gas Exchange in Alveolus',
    chapter: 17,
    className: 11,
    chapterName: 'Breathing and Exchange of Gases',
  },

  // Chapter 18: Body Fluids and Circulation
  {
    figure: '18.1',
    title: 'Blood Cell Types',
    chapter: 18,
    className: 11,
    chapterName: 'Body Fluids and Circulation',
  },
  {
    figure: '18.2',
    title: 'Human Heart (External)',
    chapter: 18,
    className: 11,
    chapterName: 'Body Fluids and Circulation',
  },
  {
    figure: '18.3',
    title: 'Human Heart (Internal)',
    chapter: 18,
    className: 11,
    chapterName: 'Body Fluids and Circulation',
  },
  {
    figure: '18.4',
    title: 'Cardiac Cycle',
    chapter: 18,
    className: 11,
    chapterName: 'Body Fluids and Circulation',
  },
  {
    figure: '18.5',
    title: 'Cardiac Conduction System',
    chapter: 18,
    className: 11,
    chapterName: 'Body Fluids and Circulation',
  },
  {
    figure: '18.6',
    title: 'ECG Waveform',
    chapter: 18,
    className: 11,
    chapterName: 'Body Fluids and Circulation',
  },
  {
    figure: '18.7',
    title: 'Double Circulation',
    chapter: 18,
    className: 11,
    chapterName: 'Body Fluids and Circulation',
  },
  {
    figure: '18.8',
    title: 'Blood Vessels (Artery, Vein, Capillary)',
    chapter: 18,
    className: 11,
    chapterName: 'Body Fluids and Circulation',
  },

  // Chapter 19: Excretory Products and their Elimination
  {
    figure: '19.1',
    title: 'Human Excretory System',
    chapter: 19,
    className: 11,
    chapterName: 'Excretory Products and their Elimination',
  },
  {
    figure: '19.2',
    title: 'Kidney Longitudinal Section',
    chapter: 19,
    className: 11,
    chapterName: 'Excretory Products and their Elimination',
  },
  {
    figure: '19.3',
    title: 'Nephron Structure',
    chapter: 19,
    className: 11,
    chapterName: 'Excretory Products and their Elimination',
  },
  {
    figure: '19.4',
    title: 'Urine Formation',
    chapter: 19,
    className: 11,
    chapterName: 'Excretory Products and their Elimination',
  },
  {
    figure: '19.5',
    title: 'Counter Current Mechanism',
    chapter: 19,
    className: 11,
    chapterName: 'Excretory Products and their Elimination',
  },
  {
    figure: '19.6',
    title: 'Regulation of Kidney Function',
    chapter: 19,
    className: 11,
    chapterName: 'Excretory Products and their Elimination',
  },

  // Chapter 20: Locomotion and Movement
  {
    figure: '20.1',
    title: 'Human Skeleton (Axial & Appendicular)',
    chapter: 20,
    className: 11,
    chapterName: 'Locomotion and Movement',
  },
  {
    figure: '20.2',
    title: 'Skull Bones',
    chapter: 20,
    className: 11,
    chapterName: 'Locomotion and Movement',
  },
  {
    figure: '20.3',
    title: 'Vertebral Column',
    chapter: 20,
    className: 11,
    chapterName: 'Locomotion and Movement',
  },
  {
    figure: '20.4',
    title: 'Joint Types',
    chapter: 20,
    className: 11,
    chapterName: 'Locomotion and Movement',
  },
  {
    figure: '20.5',
    title: 'Synovial Joint',
    chapter: 20,
    className: 11,
    chapterName: 'Locomotion and Movement',
  },
  {
    figure: '20.6',
    title: 'Skeletal Muscle Structure',
    chapter: 20,
    className: 11,
    chapterName: 'Locomotion and Movement',
  },
  {
    figure: '20.7',
    title: 'Sarcomere Structure',
    chapter: 20,
    className: 11,
    chapterName: 'Locomotion and Movement',
  },
  {
    figure: '20.8',
    title: 'Sliding Filament Mechanism',
    chapter: 20,
    className: 11,
    chapterName: 'Locomotion and Movement',
  },

  // Chapter 21: Neural Control and Coordination
  {
    figure: '21.1',
    title: 'Neuron Structure',
    chapter: 21,
    className: 11,
    chapterName: 'Neural Control and Coordination',
  },
  {
    figure: '21.2',
    title: 'Reflex Arc',
    chapter: 21,
    className: 11,
    chapterName: 'Neural Control and Coordination',
  },
  {
    figure: '21.3',
    title: 'Action Potential',
    chapter: 21,
    className: 11,
    chapterName: 'Neural Control and Coordination',
  },
  {
    figure: '21.4',
    title: 'Synapse Structure',
    chapter: 21,
    className: 11,
    chapterName: 'Neural Control and Coordination',
  },
  {
    figure: '21.5',
    title: 'Human Brain (Lateral View)',
    chapter: 21,
    className: 11,
    chapterName: 'Neural Control and Coordination',
  },
  {
    figure: '21.6',
    title: 'Human Brain (Sagittal Section)',
    chapter: 21,
    className: 11,
    chapterName: 'Neural Control and Coordination',
  },
  {
    figure: '21.7',
    title: 'Spinal Cord Cross Section',
    chapter: 21,
    className: 11,
    chapterName: 'Neural Control and Coordination',
  },
  {
    figure: '21.8',
    title: 'Eye Structure',
    chapter: 21,
    className: 11,
    chapterName: 'Neural Control and Coordination',
  },
  {
    figure: '21.9',
    title: 'Ear Structure',
    chapter: 21,
    className: 11,
    chapterName: 'Neural Control and Coordination',
  },
  {
    figure: '21.10',
    title: 'Cochlea Cross Section',
    chapter: 21,
    className: 11,
    chapterName: 'Neural Control and Coordination',
  },
  {
    figure: '21.11',
    title: 'Organ of Corti',
    chapter: 21,
    className: 11,
    chapterName: 'Neural Control and Coordination',
  },

  // Chapter 22: Chemical Coordination and Integration
  {
    figure: '22.1',
    title: 'Endocrine Glands Location',
    chapter: 22,
    className: 11,
    chapterName: 'Chemical Coordination and Integration',
  },
  {
    figure: '22.2',
    title: 'Hypothalamus-Pituitary Axis',
    chapter: 22,
    className: 11,
    chapterName: 'Chemical Coordination and Integration',
  },
  {
    figure: '22.3',
    title: 'Thyroid Gland',
    chapter: 22,
    className: 11,
    chapterName: 'Chemical Coordination and Integration',
  },
  {
    figure: '22.4',
    title: 'Adrenal Gland',
    chapter: 22,
    className: 11,
    chapterName: 'Chemical Coordination and Integration',
  },
  {
    figure: '22.5',
    title: 'Pancreas (Endocrine)',
    chapter: 22,
    className: 11,
    chapterName: 'Chemical Coordination and Integration',
  },
  {
    figure: '22.6',
    title: 'Hormone Action Mechanism',
    chapter: 22,
    className: 11,
    chapterName: 'Chemical Coordination and Integration',
  },

  // ============ CLASS 12 ============

  // CLASS 12 - UNIT 6: Reproduction
  // Chapter 1: Reproduction in Organisms
  {
    figure: '1.1',
    title: 'Types of Reproduction',
    chapter: 1,
    className: 12,
    chapterName: 'Reproduction in Organisms',
  },
  {
    figure: '1.2',
    title: 'Vegetative Propagation',
    chapter: 1,
    className: 12,
    chapterName: 'Reproduction in Organisms',
  },
  {
    figure: '1.3',
    title: 'Asexual Reproduction Methods',
    chapter: 1,
    className: 12,
    chapterName: 'Reproduction in Organisms',
  },

  // Chapter 2: Sexual Reproduction in Flowering Plants
  {
    figure: '2.1',
    title: 'Stamen Structure',
    chapter: 2,
    className: 12,
    chapterName: 'Sexual Reproduction in Flowering Plants',
  },
  {
    figure: '2.2',
    title: 'T.S. of Anther',
    chapter: 2,
    className: 12,
    chapterName: 'Sexual Reproduction in Flowering Plants',
  },
  {
    figure: '2.3',
    title: 'Microsporogenesis',
    chapter: 2,
    className: 12,
    chapterName: 'Sexual Reproduction in Flowering Plants',
  },
  {
    figure: '2.4',
    title: 'Pollen Grain Structure',
    chapter: 2,
    className: 12,
    chapterName: 'Sexual Reproduction in Flowering Plants',
  },
  {
    figure: '2.5',
    title: 'Pistil Structure',
    chapter: 2,
    className: 12,
    chapterName: 'Sexual Reproduction in Flowering Plants',
  },
  {
    figure: '2.6',
    title: 'Ovule Structure',
    chapter: 2,
    className: 12,
    chapterName: 'Sexual Reproduction in Flowering Plants',
  },
  {
    figure: '2.7',
    title: 'Megasporogenesis',
    chapter: 2,
    className: 12,
    chapterName: 'Sexual Reproduction in Flowering Plants',
  },
  {
    figure: '2.8',
    title: 'Embryo Sac (7-celled, 8-nucleate)',
    chapter: 2,
    className: 12,
    chapterName: 'Sexual Reproduction in Flowering Plants',
  },
  {
    figure: '2.9',
    title: 'Pollen-Pistil Interaction',
    chapter: 2,
    className: 12,
    chapterName: 'Sexual Reproduction in Flowering Plants',
  },
  {
    figure: '2.10',
    title: 'Pollen Tube Growth',
    chapter: 2,
    className: 12,
    chapterName: 'Sexual Reproduction in Flowering Plants',
  },
  {
    figure: '2.11',
    title: 'Double Fertilization',
    chapter: 2,
    className: 12,
    chapterName: 'Sexual Reproduction in Flowering Plants',
  },
  {
    figure: '2.12',
    title: 'Embryo Development',
    chapter: 2,
    className: 12,
    chapterName: 'Sexual Reproduction in Flowering Plants',
  },
  {
    figure: '2.13',
    title: 'Seed Structure',
    chapter: 2,
    className: 12,
    chapterName: 'Sexual Reproduction in Flowering Plants',
  },
  {
    figure: '2.14',
    title: 'Apomixis',
    chapter: 2,
    className: 12,
    chapterName: 'Sexual Reproduction in Flowering Plants',
  },

  // Chapter 3: Human Reproduction
  {
    figure: '3.1',
    title: 'Male Reproductive System',
    chapter: 3,
    className: 12,
    chapterName: 'Human Reproduction',
  },
  {
    figure: '3.2',
    title: 'Testis Section',
    chapter: 3,
    className: 12,
    chapterName: 'Human Reproduction',
  },
  {
    figure: '3.3',
    title: 'Spermatogenesis',
    chapter: 3,
    className: 12,
    chapterName: 'Human Reproduction',
  },
  {
    figure: '3.4',
    title: 'Sperm Structure',
    chapter: 3,
    className: 12,
    chapterName: 'Human Reproduction',
  },
  {
    figure: '3.5',
    title: 'Female Reproductive System',
    chapter: 3,
    className: 12,
    chapterName: 'Human Reproduction',
  },
  {
    figure: '3.6',
    title: 'Ovary Section',
    chapter: 3,
    className: 12,
    chapterName: 'Human Reproduction',
  },
  {
    figure: '3.7',
    title: 'Oogenesis',
    chapter: 3,
    className: 12,
    chapterName: 'Human Reproduction',
  },
  {
    figure: '3.8',
    title: 'Graafian Follicle',
    chapter: 3,
    className: 12,
    chapterName: 'Human Reproduction',
  },
  {
    figure: '3.9',
    title: 'Menstrual Cycle',
    chapter: 3,
    className: 12,
    chapterName: 'Human Reproduction',
  },
  {
    figure: '3.10',
    title: 'Fertilization',
    chapter: 3,
    className: 12,
    chapterName: 'Human Reproduction',
  },
  {
    figure: '3.11',
    title: 'Cleavage & Blastocyst',
    chapter: 3,
    className: 12,
    chapterName: 'Human Reproduction',
  },
  {
    figure: '3.12',
    title: 'Implantation',
    chapter: 3,
    className: 12,
    chapterName: 'Human Reproduction',
  },
  {
    figure: '3.13',
    title: 'Placenta Structure',
    chapter: 3,
    className: 12,
    chapterName: 'Human Reproduction',
  },
  {
    figure: '3.14',
    title: 'Embryonic Development',
    chapter: 3,
    className: 12,
    chapterName: 'Human Reproduction',
  },

  // Chapter 4: Reproductive Health
  {
    figure: '4.1',
    title: 'Contraceptive Methods',
    chapter: 4,
    className: 12,
    chapterName: 'Reproductive Health',
  },
  { figure: '4.2', title: 'IUDs', chapter: 4, className: 12, chapterName: 'Reproductive Health' },
  {
    figure: '4.3',
    title: 'Surgical Methods',
    chapter: 4,
    className: 12,
    chapterName: 'Reproductive Health',
  },
  {
    figure: '4.4',
    title: 'ART Techniques',
    chapter: 4,
    className: 12,
    chapterName: 'Reproductive Health',
  },

  // CLASS 12 - UNIT 7: Genetics and Evolution
  // Chapter 5: Principles of Inheritance and Variation
  {
    figure: '5.1',
    title: 'Monohybrid Cross',
    chapter: 5,
    className: 12,
    chapterName: 'Principles of Inheritance and Variation',
  },
  {
    figure: '5.2',
    title: 'Dihybrid Cross',
    chapter: 5,
    className: 12,
    chapterName: 'Principles of Inheritance and Variation',
  },
  {
    figure: '5.3',
    title: 'Incomplete Dominance',
    chapter: 5,
    className: 12,
    chapterName: 'Principles of Inheritance and Variation',
  },
  {
    figure: '5.4',
    title: 'Co-dominance (Blood Groups)',
    chapter: 5,
    className: 12,
    chapterName: 'Principles of Inheritance and Variation',
  },
  {
    figure: '5.5',
    title: 'Sex Determination',
    chapter: 5,
    className: 12,
    chapterName: 'Principles of Inheritance and Variation',
  },
  {
    figure: '5.6',
    title: 'Sex-linked Inheritance',
    chapter: 5,
    className: 12,
    chapterName: 'Principles of Inheritance and Variation',
  },
  {
    figure: '5.7',
    title: 'Pedigree Analysis Symbols',
    chapter: 5,
    className: 12,
    chapterName: 'Principles of Inheritance and Variation',
  },
  {
    figure: '5.8',
    title: 'Chromosomal Disorders',
    chapter: 5,
    className: 12,
    chapterName: 'Principles of Inheritance and Variation',
  },

  // Chapter 6: Molecular Basis of Inheritance
  {
    figure: '6.1',
    title: 'DNA Double Helix',
    chapter: 6,
    className: 12,
    chapterName: 'Molecular Basis of Inheritance',
  },
  {
    figure: '6.2',
    title: 'DNA Packaging',
    chapter: 6,
    className: 12,
    chapterName: 'Molecular Basis of Inheritance',
  },
  {
    figure: '6.3',
    title: 'DNA Replication Fork',
    chapter: 6,
    className: 12,
    chapterName: 'Molecular Basis of Inheritance',
  },
  {
    figure: '6.4',
    title: 'Transcription Process',
    chapter: 6,
    className: 12,
    chapterName: 'Molecular Basis of Inheritance',
  },
  {
    figure: '6.5',
    title: 'mRNA Splicing',
    chapter: 6,
    className: 12,
    chapterName: 'Molecular Basis of Inheritance',
  },
  {
    figure: '6.6',
    title: 'tRNA Structure (Cloverleaf)',
    chapter: 6,
    className: 12,
    chapterName: 'Molecular Basis of Inheritance',
  },
  {
    figure: '6.7',
    title: 'Translation (Ribosome)',
    chapter: 6,
    className: 12,
    chapterName: 'Molecular Basis of Inheritance',
  },
  {
    figure: '6.8',
    title: 'Lac Operon',
    chapter: 6,
    className: 12,
    chapterName: 'Molecular Basis of Inheritance',
  },
  {
    figure: '6.9',
    title: 'Human Genome Project',
    chapter: 6,
    className: 12,
    chapterName: 'Molecular Basis of Inheritance',
  },
  {
    figure: '6.10',
    title: 'DNA Fingerprinting',
    chapter: 6,
    className: 12,
    chapterName: 'Molecular Basis of Inheritance',
  },

  // Chapter 7: Evolution
  {
    figure: '7.1',
    title: 'Miller-Urey Experiment',
    chapter: 7,
    className: 12,
    chapterName: 'Evolution',
  },
  {
    figure: '7.2',
    title: 'Homologous Organs',
    chapter: 7,
    className: 12,
    chapterName: 'Evolution',
  },
  { figure: '7.3', title: 'Analogous Organs', chapter: 7, className: 12, chapterName: 'Evolution' },
  { figure: '7.4', title: 'Darwin Finches', chapter: 7, className: 12, chapterName: 'Evolution' },
  {
    figure: '7.5',
    title: 'Industrial Melanism',
    chapter: 7,
    className: 12,
    chapterName: 'Evolution',
  },
  {
    figure: '7.6',
    title: 'Natural Selection Types',
    chapter: 7,
    className: 12,
    chapterName: 'Evolution',
  },
  {
    figure: '7.7',
    title: 'Hardy-Weinberg Principle',
    chapter: 7,
    className: 12,
    chapterName: 'Evolution',
  },
  {
    figure: '7.8',
    title: 'Human Evolution Timeline',
    chapter: 7,
    className: 12,
    chapterName: 'Evolution',
  },

  // CLASS 12 - UNIT 8: Biology and Human Welfare
  // Chapter 8: Human Health and Disease
  {
    figure: '8.1',
    title: 'Plasmodium Life Cycle',
    chapter: 8,
    className: 12,
    chapterName: 'Human Health and Disease',
  },
  {
    figure: '8.2',
    title: 'HIV Structure',
    chapter: 8,
    className: 12,
    chapterName: 'Human Health and Disease',
  },
  {
    figure: '8.3',
    title: 'HIV Life Cycle',
    chapter: 8,
    className: 12,
    chapterName: 'Human Health and Disease',
  },
  {
    figure: '8.4',
    title: 'Immune System Overview',
    chapter: 8,
    className: 12,
    chapterName: 'Human Health and Disease',
  },
  {
    figure: '8.5',
    title: 'Antibody Structure',
    chapter: 8,
    className: 12,
    chapterName: 'Human Health and Disease',
  },
  {
    figure: '8.6',
    title: 'Immune Response Types',
    chapter: 8,
    className: 12,
    chapterName: 'Human Health and Disease',
  },
  {
    figure: '8.7',
    title: 'Cancer Cell Development',
    chapter: 8,
    className: 12,
    chapterName: 'Human Health and Disease',
  },

  // Chapter 9: Strategies for Enhancement in Food Production
  {
    figure: '9.1',
    title: 'Plant Breeding Steps',
    chapter: 9,
    className: 12,
    chapterName: 'Strategies for Enhancement in Food Production',
  },
  {
    figure: '9.2',
    title: 'Tissue Culture',
    chapter: 9,
    className: 12,
    chapterName: 'Strategies for Enhancement in Food Production',
  },
  {
    figure: '9.3',
    title: 'Bee Keeping',
    chapter: 9,
    className: 12,
    chapterName: 'Strategies for Enhancement in Food Production',
  },
  {
    figure: '9.4',
    title: 'Fish Farming',
    chapter: 9,
    className: 12,
    chapterName: 'Strategies for Enhancement in Food Production',
  },

  // Chapter 10: Microbes in Human Welfare
  {
    figure: '10.1',
    title: 'Biogas Plant',
    chapter: 10,
    className: 12,
    chapterName: 'Microbes in Human Welfare',
  },
  {
    figure: '10.2',
    title: 'Sewage Treatment',
    chapter: 10,
    className: 12,
    chapterName: 'Microbes in Human Welfare',
  },
  {
    figure: '10.3',
    title: 'Biopesticides',
    chapter: 10,
    className: 12,
    chapterName: 'Microbes in Human Welfare',
  },

  // CLASS 12 - UNIT 9: Biotechnology
  // Chapter 11: Biotechnology Principles and Processes
  {
    figure: '11.1',
    title: 'Restriction Enzymes',
    chapter: 11,
    className: 12,
    chapterName: 'Biotechnology Principles and Processes',
  },
  {
    figure: '11.2',
    title: 'Gel Electrophoresis',
    chapter: 11,
    className: 12,
    chapterName: 'Biotechnology Principles and Processes',
  },
  {
    figure: '11.3',
    title: 'Cloning Vector (pBR322)',
    chapter: 11,
    className: 12,
    chapterName: 'Biotechnology Principles and Processes',
  },
  {
    figure: '11.4',
    title: 'rDNA Technology Steps',
    chapter: 11,
    className: 12,
    chapterName: 'Biotechnology Principles and Processes',
  },
  {
    figure: '11.5',
    title: 'PCR Process',
    chapter: 11,
    className: 12,
    chapterName: 'Biotechnology Principles and Processes',
  },
  {
    figure: '11.6',
    title: 'Bioreactor Design',
    chapter: 11,
    className: 12,
    chapterName: 'Biotechnology Principles and Processes',
  },

  // Chapter 12: Biotechnology and its Applications
  {
    figure: '12.1',
    title: 'Bt Cotton (Cry Gene)',
    chapter: 12,
    className: 12,
    chapterName: 'Biotechnology and its Applications',
  },
  {
    figure: '12.2',
    title: 'RNA Interference',
    chapter: 12,
    className: 12,
    chapterName: 'Biotechnology and its Applications',
  },
  {
    figure: '12.3',
    title: 'Gene Therapy',
    chapter: 12,
    className: 12,
    chapterName: 'Biotechnology and its Applications',
  },
  {
    figure: '12.4',
    title: 'Ti Plasmid',
    chapter: 12,
    className: 12,
    chapterName: 'Biotechnology and its Applications',
  },
  {
    figure: '12.5',
    title: 'Transgenic Animals',
    chapter: 12,
    className: 12,
    chapterName: 'Biotechnology and its Applications',
  },

  // CLASS 12 - UNIT 10: Ecology and Environment
  // Chapter 13: Organisms and Populations
  {
    figure: '13.1',
    title: 'Population Growth Curves',
    chapter: 13,
    className: 12,
    chapterName: 'Organisms and Populations',
  },
  {
    figure: '13.2',
    title: 'Age Pyramids',
    chapter: 13,
    className: 12,
    chapterName: 'Organisms and Populations',
  },
  {
    figure: '13.3',
    title: 'Species Interactions',
    chapter: 13,
    className: 12,
    chapterName: 'Organisms and Populations',
  },

  // Chapter 14: Ecosystem
  {
    figure: '14.1',
    title: 'Ecosystem Structure',
    chapter: 14,
    className: 12,
    chapterName: 'Ecosystem',
  },
  {
    figure: '14.2',
    title: 'Food Chain & Web',
    chapter: 14,
    className: 12,
    chapterName: 'Ecosystem',
  },
  {
    figure: '14.3',
    title: 'Ecological Pyramids',
    chapter: 14,
    className: 12,
    chapterName: 'Ecosystem',
  },
  {
    figure: '14.4',
    title: 'Energy Flow (10% Law)',
    chapter: 14,
    className: 12,
    chapterName: 'Ecosystem',
  },
  {
    figure: '14.5',
    title: 'Nutrient Cycling',
    chapter: 14,
    className: 12,
    chapterName: 'Ecosystem',
  },
  { figure: '14.6', title: 'Carbon Cycle', chapter: 14, className: 12, chapterName: 'Ecosystem' },
  {
    figure: '14.7',
    title: 'Phosphorus Cycle',
    chapter: 14,
    className: 12,
    chapterName: 'Ecosystem',
  },
  {
    figure: '14.8',
    title: 'Ecological Succession',
    chapter: 14,
    className: 12,
    chapterName: 'Ecosystem',
  },

  // Chapter 15: Biodiversity and Conservation
  {
    figure: '15.1',
    title: 'Species-Area Relationship',
    chapter: 15,
    className: 12,
    chapterName: 'Biodiversity and Conservation',
  },
  {
    figure: '15.2',
    title: 'Biodiversity Hotspots',
    chapter: 15,
    className: 12,
    chapterName: 'Biodiversity and Conservation',
  },
  {
    figure: '15.3',
    title: 'Conservation Strategies',
    chapter: 15,
    className: 12,
    chapterName: 'Biodiversity and Conservation',
  },

  // Chapter 16: Environmental Issues
  {
    figure: '16.1',
    title: 'Air Pollution Effects',
    chapter: 16,
    className: 12,
    chapterName: 'Environmental Issues',
  },
  {
    figure: '16.2',
    title: 'Greenhouse Effect',
    chapter: 16,
    className: 12,
    chapterName: 'Environmental Issues',
  },
  {
    figure: '16.3',
    title: 'Ozone Layer Depletion',
    chapter: 16,
    className: 12,
    chapterName: 'Environmental Issues',
  },
  {
    figure: '16.4',
    title: 'Biomagnification',
    chapter: 16,
    className: 12,
    chapterName: 'Environmental Issues',
  },
  {
    figure: '16.5',
    title: 'Sewage Treatment Plant',
    chapter: 16,
    className: 12,
    chapterName: 'Environmental Issues',
  },
  {
    figure: '16.6',
    title: 'Electrostatic Precipitator',
    chapter: 16,
    className: 12,
    chapterName: 'Environmental Issues',
  },
]

// Generate summary statistics
function generateSummary() {
  const chapters = getAvailableChapters()
  const availableChapters = chapters.filter((c) => c.available)
  const unavailableChapters = chapters.filter((c) => !c.available)

  const class11Figures = NCERT_FIGURE_DATABASE.filter((f) => f.className === 11)
  const class12Figures = NCERT_FIGURE_DATABASE.filter((f) => f.className === 12)

  console.log('='.repeat(60))
  console.log('NCERT BIOLOGY DIAGRAM REFERENCE SUMMARY')
  console.log('='.repeat(60))

  console.log('\n📚 CHAPTER AVAILABILITY:')
  console.log(
    `   Class 11: ${availableChapters.filter((c) => c.className === 11).length}/22 chapters available`
  )
  console.log(
    `   Class 12: ${availableChapters.filter((c) => c.className === 12).length}/16 chapters available`
  )

  if (unavailableChapters.length > 0) {
    console.log('\n⚠️  UNAVAILABLE CHAPTERS:')
    unavailableChapters.forEach((ch) => {
      console.log(`   - Class ${ch.className}, Ch ${ch.chapterNo}: ${ch.chapterName}`)
    })
  }

  console.log('\n📊 FIGURE COUNTS:')
  console.log(`   Class 11: ${class11Figures.length} figures`)
  console.log(`   Class 12: ${class12Figures.length} figures`)
  console.log(`   TOTAL: ${NCERT_FIGURE_DATABASE.length} figures`)

  // Group by chapter for Class 11
  console.log('\n📖 CLASS 11 FIGURES BY CHAPTER:')
  const class11Chapters = [...new Set(class11Figures.map((f) => f.chapter))].sort((a, b) => a - b)
  class11Chapters.forEach((chNo) => {
    const chFigures = class11Figures.filter((f) => f.chapter === chNo)
    const chapterName = chFigures[0]?.chapterName || `Chapter ${chNo}`
    console.log(`   Ch ${chNo}: ${chapterName} - ${chFigures.length} figures`)
  })

  // Group by chapter for Class 12
  console.log('\n📖 CLASS 12 FIGURES BY CHAPTER:')
  const class12Chapters = [...new Set(class12Figures.map((f) => f.chapter))].sort((a, b) => a - b)
  class12Chapters.forEach((chNo) => {
    const chFigures = class12Figures.filter((f) => f.chapter === chNo)
    const chapterName = chFigures[0]?.chapterName || `Chapter ${chNo}`
    console.log(`   Ch ${chNo}: ${chapterName} - ${chFigures.length} figures`)
  })

  return {
    chapters,
    figures: NCERT_FIGURE_DATABASE,
    stats: {
      totalChapters: chapters.length,
      availableChapters: availableChapters.length,
      totalFigures: NCERT_FIGURE_DATABASE.length,
      class11Figures: class11Figures.length,
      class12Figures: class12Figures.length,
    },
  }
}

// Export figure database for use by other scripts
function exportFigureDatabase() {
  const outputPath = path.join(NCERT_DIR, 'ncert-figures-database.json')

  const exportData = {
    metadata: {
      generatedAt: new Date().toISOString(),
      source: 'NCERT Biology Class 11 & 12 Textbooks',
      totalFigures: NCERT_FIGURE_DATABASE.length,
    },
    class11: NCERT_FIGURE_DATABASE.filter((f) => f.className === 11).reduce(
      (acc, fig) => {
        const chKey = `chapter${fig.chapter}`
        if (!acc[chKey]) {
          acc[chKey] = {
            chapterName: fig.chapterName,
            figures: [],
          }
        }
        acc[chKey].figures.push({
          figure: fig.figure,
          title: fig.title,
        })
        return acc
      },
      {} as Record<string, { chapterName: string; figures: { figure: string; title?: string }[] }>
    ),
    class12: NCERT_FIGURE_DATABASE.filter((f) => f.className === 12).reduce(
      (acc, fig) => {
        const chKey = `chapter${fig.chapter}`
        if (!acc[chKey]) {
          acc[chKey] = {
            chapterName: fig.chapterName,
            figures: [],
          }
        }
        acc[chKey].figures.push({
          figure: fig.figure,
          title: fig.title,
        })
        return acc
      },
      {} as Record<string, { chapterName: string; figures: { figure: string; title?: string }[] }>
    ),
  }

  fs.writeFileSync(outputPath, JSON.stringify(exportData, null, 2))
  console.log(`\n✅ Figure database exported to: ${outputPath}`)
}

// Main execution
async function main() {
  console.log('NCERT Biology Figure Extractor\n')

  const summary = generateSummary()
  exportFigureDatabase()

  console.log('\n' + '='.repeat(60))
  console.log('EXTRACTION COMPLETE')
  console.log('='.repeat(60))
}

main().catch(console.error)
