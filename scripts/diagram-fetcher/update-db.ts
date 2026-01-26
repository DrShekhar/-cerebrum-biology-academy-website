/**
 * Update database with downloaded Wikimedia diagrams
 */

import { PrismaClient, DiagramCategory, DiagramSource } from '../../src/generated/prisma'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

const DIAGRAM_METADATA = [
  {
    file: 'animal-cell.svg',
    name: 'Animal Cell Structure',
    category: 'CELL_BIOLOGY',
    subcategory: 'cell-structure',
    ncertClass: 11,
    ncertChapter: 8,
    tags: ['animal-cell', 'organelles', 'nucleus', 'mitochondria'],
  },
  {
    file: 'plant-cell.svg',
    name: 'Plant Cell Structure',
    category: 'CELL_BIOLOGY',
    subcategory: 'cell-structure',
    ncertClass: 11,
    ncertChapter: 8,
    tags: ['plant-cell', 'cell-wall', 'vacuole', 'chloroplast'],
  },
  {
    file: 'mitochondria.svg',
    name: 'Mitochondrion Structure',
    category: 'CELL_BIOLOGY',
    subcategory: 'organelles',
    ncertClass: 11,
    ncertChapter: 8,
    tags: ['mitochondria', 'cristae', 'matrix', 'atp'],
  },
  {
    file: 'chloroplast.svg',
    name: 'Chloroplast Structure',
    category: 'CELL_BIOLOGY',
    subcategory: 'organelles',
    ncertClass: 11,
    ncertChapter: 8,
    tags: ['chloroplast', 'thylakoid', 'grana', 'stroma'],
  },
  {
    file: 'cell-membrane.svg',
    name: 'Cell Membrane - Fluid Mosaic Model',
    category: 'CELL_BIOLOGY',
    subcategory: 'cell-membrane',
    ncertClass: 11,
    ncertChapter: 8,
    tags: ['plasma-membrane', 'phospholipid', 'fluid-mosaic'],
  },
  {
    file: 'mitosis.svg',
    name: 'Mitosis Stages',
    category: 'CELL_BIOLOGY',
    subcategory: 'cell-division',
    ncertClass: 11,
    ncertChapter: 10,
    tags: ['mitosis', 'prophase', 'metaphase', 'anaphase', 'telophase'],
  },
  {
    file: 'meiosis.svg',
    name: 'Meiosis Overview',
    category: 'CELL_BIOLOGY',
    subcategory: 'cell-division',
    ncertClass: 11,
    ncertChapter: 10,
    tags: ['meiosis', 'meiosis-i', 'meiosis-ii', 'crossing-over'],
  },
  {
    file: 'heart.svg',
    name: 'Human Heart Structure',
    category: 'HUMAN_PHYSIOLOGY',
    subcategory: 'circulatory-system',
    ncertClass: 11,
    ncertChapter: 18,
    tags: ['heart', 'cardiac', 'ventricle', 'atrium'],
  },
  {
    file: 'nephron.png',
    name: 'Nephron Structure',
    category: 'HUMAN_PHYSIOLOGY',
    subcategory: 'excretory-system',
    ncertClass: 11,
    ncertChapter: 19,
    tags: ['nephron', 'kidney', 'glomerulus', 'tubule'],
  },
  {
    file: 'neuron.svg',
    name: 'Neuron Structure',
    category: 'HUMAN_PHYSIOLOGY',
    subcategory: 'nervous-system',
    ncertClass: 11,
    ncertChapter: 21,
    tags: ['neuron', 'axon', 'dendrite', 'myelin'],
  },
  {
    file: 'brain.svg',
    name: 'Human Brain Sagittal Section',
    category: 'HUMAN_PHYSIOLOGY',
    subcategory: 'nervous-system',
    ncertClass: 11,
    ncertChapter: 21,
    tags: ['brain', 'cerebrum', 'cerebellum', 'brainstem'],
  },
  {
    file: 'synapse.svg',
    name: 'Synapse Structure',
    category: 'HUMAN_PHYSIOLOGY',
    subcategory: 'nervous-system',
    ncertClass: 11,
    ncertChapter: 21,
    tags: ['synapse', 'neurotransmitter', 'vesicles'],
  },
  {
    file: 'eye.svg',
    name: 'Human Eye Anatomy',
    category: 'HUMAN_PHYSIOLOGY',
    subcategory: 'sensory-organs',
    ncertClass: 11,
    ncertChapter: 21,
    tags: ['eye', 'retina', 'lens', 'cornea'],
  },
  {
    file: 'ear.svg',
    name: 'Human Ear Anatomy',
    category: 'HUMAN_PHYSIOLOGY',
    subcategory: 'sensory-organs',
    ncertClass: 11,
    ncertChapter: 21,
    tags: ['ear', 'cochlea', 'ossicles'],
  },
  {
    file: 'digestive-system.svg',
    name: 'Human Digestive System',
    category: 'HUMAN_PHYSIOLOGY',
    subcategory: 'digestive-system',
    ncertClass: 11,
    ncertChapter: 16,
    tags: ['digestion', 'stomach', 'intestine'],
  },
  {
    file: 'respiratory-system.svg',
    name: 'Human Respiratory System',
    category: 'HUMAN_PHYSIOLOGY',
    subcategory: 'respiratory-system',
    ncertClass: 11,
    ncertChapter: 17,
    tags: ['lungs', 'trachea', 'bronchi'],
  },
  {
    file: 'sarcomere.svg',
    name: 'Sarcomere Structure',
    category: 'HUMAN_PHYSIOLOGY',
    subcategory: 'muscular-system',
    ncertClass: 11,
    ncertChapter: 20,
    tags: ['sarcomere', 'actin', 'myosin', 'z-line'],
  },
  {
    file: 'dna-replication.svg',
    name: 'DNA Replication',
    category: 'MOLECULAR_BIOLOGY',
    subcategory: 'dna-replication',
    ncertClass: 12,
    ncertChapter: 6,
    tags: ['replication', 'helicase', 'polymerase'],
  },
  {
    file: 'translation.svg',
    name: 'Protein Synthesis - Translation',
    category: 'MOLECULAR_BIOLOGY',
    subcategory: 'gene-expression',
    ncertClass: 12,
    ncertChapter: 6,
    tags: ['translation', 'ribosome', 'trna', 'mrna'],
  },
  {
    file: 'calvin-cycle.svg',
    name: 'Calvin Cycle',
    category: 'PLANT_PHYSIOLOGY',
    subcategory: 'photosynthesis',
    ncertClass: 11,
    ncertChapter: 13,
    tags: ['calvin-cycle', 'dark-reaction', 'rubisco'],
  },
  {
    file: 'krebs-cycle.svg',
    name: 'Krebs Cycle (TCA)',
    category: 'PLANT_PHYSIOLOGY',
    subcategory: 'respiration',
    ncertClass: 11,
    ncertChapter: 14,
    tags: ['krebs-cycle', 'tca', 'citric-acid'],
  },
  {
    file: 'flower-structure.svg',
    name: 'Flower Structure',
    category: 'REPRODUCTION',
    subcategory: 'plant-reproduction',
    ncertClass: 12,
    ncertChapter: 2,
    tags: ['flower', 'stamen', 'pistil', 'petal'],
  },
  {
    file: 'menstrual-cycle.svg',
    name: 'Menstrual Cycle',
    category: 'REPRODUCTION',
    subcategory: 'human-reproduction',
    ncertClass: 12,
    ncertChapter: 3,
    tags: ['menstrual-cycle', 'ovulation', 'hormones'],
  },
  {
    file: 'food-web.svg',
    name: 'Food Web',
    category: 'ECOLOGY',
    subcategory: 'ecosystem',
    ncertClass: 12,
    ncertChapter: 14,
    tags: ['food-web', 'food-chain', 'trophic-levels'],
  },
  {
    file: 'nitrogen-cycle.svg',
    name: 'Nitrogen Cycle',
    category: 'ECOLOGY',
    subcategory: 'biogeochemical-cycles',
    ncertClass: 11,
    ncertChapter: 12,
    tags: ['nitrogen-cycle', 'nitrogen-fixation'],
  },
  {
    file: 'carbon-cycle.svg',
    name: 'Carbon Cycle',
    category: 'ECOLOGY',
    subcategory: 'biogeochemical-cycles',
    ncertClass: 12,
    ncertChapter: 14,
    tags: ['carbon-cycle', 'co2'],
  },
  {
    file: 'pcr.svg',
    name: 'PCR - Polymerase Chain Reaction',
    category: 'BIOTECHNOLOGY',
    subcategory: 'techniques',
    ncertClass: 12,
    ncertChapter: 11,
    tags: ['pcr', 'amplification', 'primers'],
  },
  {
    file: 'bacteria.svg',
    name: 'Prokaryotic Cell (Bacteria)',
    category: 'MICROORGANISMS',
    subcategory: 'bacteria',
    ncertClass: 11,
    ncertChapter: 2,
    tags: ['bacteria', 'prokaryote', 'cell-wall'],
  },
  {
    file: 'bacteriophage.svg',
    name: 'Bacteriophage Structure',
    category: 'MICROORGANISMS',
    subcategory: 'virus',
    ncertClass: 11,
    ncertChapter: 2,
    tags: ['virus', 'bacteriophage', 'capsid'],
  },
]

async function updateDatabase() {
  console.log('=== Updating Database with Downloaded Diagrams ===\n')

  const diagramsDir = path.join(__dirname, '../../public/diagrams')
  let added = 0,
    skipped = 0,
    notFound = 0

  for (const item of DIAGRAM_METADATA) {
    const filePath = path.join(diagramsDir, item.file)

    if (!fs.existsSync(filePath)) {
      console.log('[SKIP] File not found: ' + item.file)
      notFound++
      continue
    }

    // Check if already exists
    const existing = await prisma.diagram_assets.findFirst({
      where: { name: item.name },
    })

    if (existing) {
      // Update file URL if missing
      if (!existing.fileUrl) {
        await prisma.diagram_assets.update({
          where: { id: existing.id },
          data: { fileUrl: '/diagrams/' + item.file },
        })
        console.log('[UPDATE] ' + item.name)
      } else {
        console.log('[SKIP] Already exists: ' + item.name)
      }
      skipped++
      continue
    }

    // Get file stats
    const stats = fs.statSync(filePath)

    // Create new entry
    await prisma.diagram_assets.create({
      data: {
        name: item.name,
        category: item.category as DiagramCategory,
        subcategory: item.subcategory,
        source: 'WIKIMEDIA' as DiagramSource,
        license: 'CC BY-SA 4.0',
        attribution: 'Wikimedia Commons',
        fileUrl: '/diagrams/' + item.file,
        qualityScore: 4.0,
        ncertClass: item.ncertClass,
        ncertChapter: item.ncertChapter,
        tags: item.tags,
        keywords: item.tags,
        fileSize: stats.size,
        isActive: true,
        isVerified: true,
      },
    })

    console.log('[ADDED] ' + item.name)
    added++
  }

  console.log('\n=== SUMMARY ===')
  console.log('Added: ' + added)
  console.log('Skipped: ' + skipped)
  console.log('Not Found: ' + notFound)

  const total = await prisma.diagram_assets.count()
  console.log('\nTotal diagrams in database: ' + total)

  // Show breakdown by category
  const byCategory = await prisma.diagram_assets.groupBy({
    by: ['category'],
    _count: { category: true },
  })

  console.log('\nBy Category:')
  byCategory.forEach((c) => {
    console.log('  ' + c.category + ': ' + c._count.category)
  })

  await prisma.$disconnect()
}

updateDatabase().catch(console.error)
