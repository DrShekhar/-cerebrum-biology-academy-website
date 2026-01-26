/**
 * Automated Wikimedia Commons Diagram Fetcher v2
 * Uses known good SVG file names from Wikimedia Commons
 */

import { PrismaClient, DiagramCategory, DiagramSource } from '../../src/generated/prisma'
import * as fs from 'fs'
import * as path from 'path'
import * as https from 'https'

const prisma = new PrismaClient()

// Known good SVG files from Wikimedia Commons (verified to exist)
const KNOWN_DIAGRAMS = [
  // Cell Biology
  {
    file: 'File:Plant_cell_structure_svg.svg',
    name: 'Plant Cell Structure',
    category: 'CELL_BIOLOGY',
    subcategory: 'cell-structure',
    ncertClass: 11,
    ncertChapter: 8,
    tags: ['plant-cell', 'cell-wall', 'vacuole', 'chloroplast'],
  },
  {
    file: 'File:Animal_cell_structure_en.svg',
    name: 'Animal Cell Structure',
    category: 'CELL_BIOLOGY',
    subcategory: 'cell-structure',
    ncertClass: 11,
    ncertChapter: 8,
    tags: ['animal-cell', 'organelles', 'nucleus'],
  },
  {
    file: 'File:Mitochondrion_structure.svg',
    name: 'Mitochondrion Structure',
    category: 'CELL_BIOLOGY',
    subcategory: 'organelles',
    ncertClass: 11,
    ncertChapter: 8,
    tags: ['mitochondria', 'cristae', 'matrix', 'atp'],
  },
  {
    file: 'File:Chloroplast_II.svg',
    name: 'Chloroplast Structure',
    category: 'CELL_BIOLOGY',
    subcategory: 'organelles',
    ncertClass: 11,
    ncertChapter: 8,
    tags: ['chloroplast', 'thylakoid', 'grana', 'stroma'],
  },
  {
    file: 'File:Cell_membrane_detailed_diagram_en.svg',
    name: 'Cell Membrane - Fluid Mosaic Model',
    category: 'CELL_BIOLOGY',
    subcategory: 'cell-membrane',
    ncertClass: 11,
    ncertChapter: 8,
    tags: ['plasma-membrane', 'phospholipid', 'fluid-mosaic'],
  },
  {
    file: 'File:Endomembrane_system_diagram_en.svg',
    name: 'Endomembrane System',
    category: 'CELL_BIOLOGY',
    subcategory: 'organelles',
    ncertClass: 11,
    ncertChapter: 8,
    tags: ['er', 'golgi', 'vesicles'],
  },
  {
    file: 'File:Nucleus_ER_golgi.svg',
    name: 'Nucleus ER Golgi',
    category: 'CELL_BIOLOGY',
    subcategory: 'organelles',
    ncertClass: 11,
    ncertChapter: 8,
    tags: ['nucleus', 'er', 'golgi'],
  },

  // Cell Division
  {
    file: 'File:Mitosis_diagram.svg',
    name: 'Mitosis Stages',
    category: 'CELL_BIOLOGY',
    subcategory: 'cell-division',
    ncertClass: 11,
    ncertChapter: 10,
    tags: ['mitosis', 'prophase', 'metaphase', 'anaphase', 'telophase'],
  },
  {
    file: 'File:Meiosis_Overview_new.svg',
    name: 'Meiosis Overview',
    category: 'CELL_BIOLOGY',
    subcategory: 'cell-division',
    ncertClass: 11,
    ncertChapter: 10,
    tags: ['meiosis', 'meiosis-i', 'meiosis-ii'],
  },
  {
    file: 'File:Cell_Cycle_2-2.svg',
    name: 'Cell Cycle',
    category: 'CELL_BIOLOGY',
    subcategory: 'cell-division',
    ncertClass: 11,
    ncertChapter: 10,
    tags: ['cell-cycle', 'interphase', 'g1', 's-phase', 'g2'],
  },

  // Human Physiology - Heart
  {
    file: 'File:Diagram_of_the_human_heart_(cropped).svg',
    name: 'Human Heart Diagram',
    category: 'HUMAN_PHYSIOLOGY',
    subcategory: 'circulatory-system',
    ncertClass: 11,
    ncertChapter: 18,
    tags: ['heart', 'cardiac', 'ventricle', 'atrium'],
  },
  {
    file: 'File:Heart_diagram-en.svg',
    name: 'Heart Internal Structure',
    category: 'HUMAN_PHYSIOLOGY',
    subcategory: 'circulatory-system',
    ncertClass: 11,
    ncertChapter: 18,
    tags: ['heart', 'valves', 'aorta'],
  },

  // Nephron & Kidney
  {
    file: 'File:Kidney_Nephron.svg',
    name: 'Nephron Structure',
    category: 'HUMAN_PHYSIOLOGY',
    subcategory: 'excretory-system',
    ncertClass: 11,
    ncertChapter: 19,
    tags: ['nephron', 'kidney', 'glomerulus', 'tubule'],
  },
  {
    file: 'File:Physiology_of_Nephron.svg',
    name: 'Nephron Physiology',
    category: 'HUMAN_PHYSIOLOGY',
    subcategory: 'excretory-system',
    ncertClass: 11,
    ncertChapter: 19,
    tags: ['nephron', 'filtration', 'reabsorption'],
  },

  // Nervous System
  {
    file: 'File:Complete_neuron_cell_diagram_en.svg',
    name: 'Neuron Structure',
    category: 'HUMAN_PHYSIOLOGY',
    subcategory: 'nervous-system',
    ncertClass: 11,
    ncertChapter: 21,
    tags: ['neuron', 'axon', 'dendrite', 'myelin'],
  },
  {
    file: 'File:Brain_human_sagittal_section.svg',
    name: 'Human Brain Sagittal Section',
    category: 'HUMAN_PHYSIOLOGY',
    subcategory: 'nervous-system',
    ncertClass: 11,
    ncertChapter: 21,
    tags: ['brain', 'cerebrum', 'cerebellum', 'brainstem'],
  },
  {
    file: 'File:Synapse_diag1.svg',
    name: 'Synapse Structure',
    category: 'HUMAN_PHYSIOLOGY',
    subcategory: 'nervous-system',
    ncertClass: 11,
    ncertChapter: 21,
    tags: ['synapse', 'neurotransmitter', 'vesicles'],
  },

  // Eye & Ear
  {
    file: 'File:Schematic_diagram_of_the_human_eye_en.svg',
    name: 'Human Eye Anatomy',
    category: 'HUMAN_PHYSIOLOGY',
    subcategory: 'sensory-organs',
    ncertClass: 11,
    ncertChapter: 21,
    tags: ['eye', 'retina', 'lens', 'cornea'],
  },
  {
    file: 'File:Anatomy_of_the_Human_Ear_en.svg',
    name: 'Human Ear Anatomy',
    category: 'HUMAN_PHYSIOLOGY',
    subcategory: 'sensory-organs',
    ncertClass: 11,
    ncertChapter: 21,
    tags: ['ear', 'cochlea', 'ossicles'],
  },

  // Digestive & Respiratory
  {
    file: 'File:Digestive_system_diagram_en.svg',
    name: 'Human Digestive System',
    category: 'HUMAN_PHYSIOLOGY',
    subcategory: 'digestive-system',
    ncertClass: 11,
    ncertChapter: 16,
    tags: ['digestion', 'stomach', 'intestine'],
  },
  {
    file: 'File:Respiratory_system_complete_en.svg',
    name: 'Human Respiratory System',
    category: 'HUMAN_PHYSIOLOGY',
    subcategory: 'respiratory-system',
    ncertClass: 11,
    ncertChapter: 17,
    tags: ['lungs', 'trachea', 'bronchi'],
  },
  {
    file: 'File:Alveolus_diagram.svg',
    name: 'Alveolus Structure',
    category: 'HUMAN_PHYSIOLOGY',
    subcategory: 'respiratory-system',
    ncertClass: 11,
    ncertChapter: 17,
    tags: ['alveoli', 'gas-exchange'],
  },

  // Muscle
  {
    file: 'File:Sarcomere.svg',
    name: 'Sarcomere Structure',
    category: 'HUMAN_PHYSIOLOGY',
    subcategory: 'muscular-system',
    ncertClass: 11,
    ncertChapter: 20,
    tags: ['sarcomere', 'actin', 'myosin', 'z-line'],
  },

  // DNA & Genetics
  {
    file: 'File:DNA_Structure%2BKey%2BLabelled.pn_NoBB.svg',
    name: 'DNA Double Helix',
    category: 'MOLECULAR_BIOLOGY',
    subcategory: 'nucleic-acids',
    ncertClass: 12,
    ncertChapter: 6,
    tags: ['dna', 'double-helix', 'base-pairs'],
  },
  {
    file: 'File:DNA_replication_en.svg',
    name: 'DNA Replication',
    category: 'MOLECULAR_BIOLOGY',
    subcategory: 'dna-replication',
    ncertClass: 12,
    ncertChapter: 6,
    tags: ['replication', 'helicase', 'polymerase'],
  },
  {
    file: 'File:Protein_synthesis.svg',
    name: 'Protein Synthesis',
    category: 'MOLECULAR_BIOLOGY',
    subcategory: 'gene-expression',
    ncertClass: 12,
    ncertChapter: 6,
    tags: ['transcription', 'translation', 'ribosome'],
  },
  {
    file: 'File:Lac_operon.svg',
    name: 'Lac Operon',
    category: 'MOLECULAR_BIOLOGY',
    subcategory: 'gene-regulation',
    ncertClass: 12,
    ncertChapter: 6,
    tags: ['lac-operon', 'repressor', 'operator'],
  },

  // Plant Anatomy
  {
    file: 'File:Root_tip_cross_section.svg',
    name: 'Root Cross Section',
    category: 'PLANT_PHYSIOLOGY',
    subcategory: 'plant-anatomy',
    ncertClass: 11,
    ncertChapter: 6,
    tags: ['root', 'xylem', 'phloem', 'epidermis'],
  },
  {
    file: 'File:Stem_cross-section.svg',
    name: 'Stem Cross Section',
    category: 'PLANT_PHYSIOLOGY',
    subcategory: 'plant-anatomy',
    ncertClass: 11,
    ncertChapter: 6,
    tags: ['stem', 'vascular-bundle'],
  },
  {
    file: 'File:Leaf_Tissue_Structure.svg',
    name: 'Leaf Structure',
    category: 'PLANT_PHYSIOLOGY',
    subcategory: 'plant-anatomy',
    ncertClass: 11,
    ncertChapter: 6,
    tags: ['leaf', 'mesophyll', 'stomata'],
  },

  // Photosynthesis & Respiration
  {
    file: 'File:Thylakoid_membrane_3.svg',
    name: 'Light Reaction - Z Scheme',
    category: 'PLANT_PHYSIOLOGY',
    subcategory: 'photosynthesis',
    ncertClass: 11,
    ncertChapter: 13,
    tags: ['photosynthesis', 'light-reaction', 'photosystem'],
  },
  {
    file: 'File:Calvin-cycle4.svg',
    name: 'Calvin Cycle',
    category: 'PLANT_PHYSIOLOGY',
    subcategory: 'photosynthesis',
    ncertClass: 11,
    ncertChapter: 13,
    tags: ['calvin-cycle', 'dark-reaction', 'rubisco'],
  },
  {
    file: 'File:CellRespiration.svg',
    name: 'Cellular Respiration',
    category: 'PLANT_PHYSIOLOGY',
    subcategory: 'respiration',
    ncertClass: 11,
    ncertChapter: 14,
    tags: ['glycolysis', 'krebs', 'etc'],
  },
  {
    file: 'File:Citric_acid_cycle_with_aconitate_2.svg',
    name: 'Krebs Cycle',
    category: 'PLANT_PHYSIOLOGY',
    subcategory: 'respiration',
    ncertClass: 11,
    ncertChapter: 14,
    tags: ['krebs-cycle', 'tca', 'citric-acid'],
  },

  // Reproduction
  {
    file: 'File:Mature_flower_diagram.svg',
    name: 'Flower Structure',
    category: 'REPRODUCTION',
    subcategory: 'plant-reproduction',
    ncertClass: 12,
    ncertChapter: 2,
    tags: ['flower', 'stamen', 'pistil', 'petal'],
  },
  {
    file: 'File:Human_spermatozoa.svg',
    name: 'Human Sperm',
    category: 'REPRODUCTION',
    subcategory: 'human-reproduction',
    ncertClass: 12,
    ncertChapter: 3,
    tags: ['sperm', 'acrosome', 'flagellum'],
  },
  {
    file: 'File:MenstrualCycle2_en.svg',
    name: 'Menstrual Cycle',
    category: 'REPRODUCTION',
    subcategory: 'human-reproduction',
    ncertClass: 12,
    ncertChapter: 3,
    tags: ['menstrual-cycle', 'ovulation', 'hormones'],
  },

  // Ecology
  {
    file: 'File:FoodWeb.svg',
    name: 'Food Web',
    category: 'ECOLOGY',
    subcategory: 'ecosystem',
    ncertClass: 12,
    ncertChapter: 14,
    tags: ['food-web', 'food-chain', 'trophic-levels'],
  },
  {
    file: 'File:Nitrogen_Cycle.svg',
    name: 'Nitrogen Cycle',
    category: 'ECOLOGY',
    subcategory: 'biogeochemical-cycles',
    ncertClass: 11,
    ncertChapter: 12,
    tags: ['nitrogen-cycle', 'nitrogen-fixation', 'denitrification'],
  },
  {
    file: 'File:Carbon_cycle.svg',
    name: 'Carbon Cycle',
    category: 'ECOLOGY',
    subcategory: 'biogeochemical-cycles',
    ncertClass: 12,
    ncertChapter: 14,
    tags: ['carbon-cycle', 'co2'],
  },

  // Biotechnology
  {
    file: 'File:Polymerase_chain_reaction.svg',
    name: 'PCR Process',
    category: 'BIOTECHNOLOGY',
    subcategory: 'techniques',
    ncertClass: 12,
    ncertChapter: 11,
    tags: ['pcr', 'amplification', 'primers', 'taq'],
  },
  {
    file: 'File:Gel_electrophoresis_apparatus.svg',
    name: 'Gel Electrophoresis',
    category: 'BIOTECHNOLOGY',
    subcategory: 'techniques',
    ncertClass: 12,
    ncertChapter: 11,
    tags: ['gel-electrophoresis', 'dna-separation'],
  },
  {
    file: 'File:Molecular_cloning_diagram_en.svg',
    name: 'Gene Cloning',
    category: 'BIOTECHNOLOGY',
    subcategory: 'genetic-engineering',
    ncertClass: 12,
    ncertChapter: 11,
    tags: ['cloning', 'vector', 'plasmid'],
  },

  // Microorganisms
  {
    file: 'File:Average_prokaryote_cell-_en.svg',
    name: 'Prokaryotic Cell',
    category: 'MICROORGANISMS',
    subcategory: 'bacteria',
    ncertClass: 11,
    ncertChapter: 2,
    tags: ['bacteria', 'prokaryote', 'cell-wall'],
  },
  {
    file: 'File:PhageExterworren.svg',
    name: 'Bacteriophage Structure',
    category: 'MICROORGANISMS',
    subcategory: 'virus',
    ncertClass: 11,
    ncertChapter: 2,
    tags: ['virus', 'bacteriophage', 'capsid'],
  },
  {
    file: 'File:Plasmodium_lifecycle_PHIL_3405_lores.svg',
    name: 'Plasmodium Life Cycle',
    category: 'MICROORGANISMS',
    subcategory: 'parasites',
    ncertClass: 12,
    ncertChapter: 8,
    tags: ['plasmodium', 'malaria', 'life-cycle'],
  },
]

function encodeQuery(query: string): string {
  return encodeURIComponent(query)
}

async function getImageInfo(title: string): Promise<any> {
  return new Promise((resolve) => {
    const encodedTitle = encodeQuery(title)
    const infoUrl =
      'https://commons.wikimedia.org/w/api.php?action=query&titles=' +
      encodedTitle +
      '&prop=imageinfo&iiprop=url|size|mime|extmetadata&format=json'

    https
      .get(infoUrl, (res) => {
        let data = ''
        res.on('data', (chunk) => (data += chunk))
        res.on('end', () => {
          try {
            const json = JSON.parse(data)
            const pages = json.query?.pages || {}
            const page = Object.values(pages)[0] as any
            resolve(page?.imageinfo?.[0] || null)
          } catch {
            resolve(null)
          }
        })
      })
      .on('error', () => resolve(null))
  })
}

async function downloadFile(url: string, destPath: string): Promise<boolean> {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(destPath)

    const download = (downloadUrl: string) => {
      https
        .get(downloadUrl, (response) => {
          if (response.statusCode === 301 || response.statusCode === 302) {
            const redirectUrl = response.headers.location
            if (redirectUrl) download(redirectUrl)
            else resolve(false)
          } else {
            response.pipe(file)
            file.on('finish', () => {
              file.close()
              resolve(true)
            })
          }
        })
        .on('error', () => resolve(false))
    }

    download(url)
  })
}

function sanitizeFilename(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 60)
}

async function fetchDiagrams() {
  console.log('=== Wikimedia Commons Diagram Fetcher v2 ===')
  console.log('Fetching ' + KNOWN_DIAGRAMS.length + ' known biology diagrams\n')

  const diagramsDir = path.join(__dirname, '../../public/diagrams')
  if (!fs.existsSync(diagramsDir)) fs.mkdirSync(diagramsDir, { recursive: true })

  let fetched = 0,
    skipped = 0,
    failed = 0

  for (const item of KNOWN_DIAGRAMS) {
    console.log('Fetching: ' + item.name)

    const imageInfo = await getImageInfo(item.file)

    if (!imageInfo) {
      console.log('  [FAILED] Could not get info for: ' + item.file)
      failed++
      continue
    }

    // Check if already exists
    const existing = await prisma.diagram_assets.findFirst({
      where: { OR: [{ sourceUrl: imageInfo.url }, { name: item.name }] },
    })

    if (existing) {
      console.log('  [SKIP] Already exists in database')
      skipped++
      continue
    }

    const filename = sanitizeFilename(item.name) + '.svg'
    const localPath = path.join(diagramsDir, filename)

    // Download
    console.log('  Downloading...')
    const downloaded = await downloadFile(imageInfo.url, localPath)

    if (!downloaded) {
      console.log('  [FAILED] Download failed')
      failed++
      continue
    }

    // Save to database
    const metadata = imageInfo.extmetadata || {}
    await prisma.diagram_assets.create({
      data: {
        name: item.name,
        description:
          metadata.ImageDescription?.value?.replace(/<[^>]*>/g, '').substring(0, 500) || null,
        category: item.category as DiagramCategory,
        subcategory: item.subcategory,
        source: 'WIKIMEDIA' as DiagramSource,
        sourceUrl: imageInfo.url,
        license: metadata.LicenseShortName?.value || 'CC BY-SA',
        attribution: (
          metadata.Artist?.value?.replace(/<[^>]*>/g, '') || 'Wikimedia Commons'
        ).substring(0, 200),
        fileUrl: '/diagrams/' + filename,
        qualityScore: 4.0,
        ncertClass: item.ncertClass,
        ncertChapter: item.ncertChapter,
        tags: item.tags,
        keywords: item.tags,
        width: imageInfo.width,
        height: imageInfo.height,
        isActive: true,
        isVerified: false,
      },
    })

    console.log('  [OK] Saved: ' + filename)
    fetched++

    // Rate limiting
    await new Promise((r) => setTimeout(r, 300))
  }

  console.log('\n=== SUMMARY ===')
  console.log('Fetched: ' + fetched)
  console.log('Skipped: ' + skipped)
  console.log('Failed: ' + failed)

  const total = await prisma.diagram_assets.count()
  console.log('\nTotal diagrams in database: ' + total)

  await prisma.$disconnect()
}

fetchDiagrams().catch(console.error)
