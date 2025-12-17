/**
 * Universal Diagram Scanner and Importer
 * Scans a directory for SVG/PNG files and imports them to the database
 */

import { PrismaClient, DiagramCategory, DiagramSource } from '../../src/generated/prisma'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

// Category detection patterns
const CATEGORY_PATTERNS: Record<string, DiagramCategory> = {
  'cell': 'CELL_BIOLOGY',
  'nucleus': 'CELL_BIOLOGY',
  'mitochondri': 'CELL_BIOLOGY',
  'chloroplast': 'CELL_BIOLOGY',
  'organelle': 'CELL_BIOLOGY',
  'membrane': 'CELL_BIOLOGY',
  'mitosis': 'CELL_BIOLOGY',
  'meiosis': 'CELL_BIOLOGY',

  'dna': 'MOLECULAR_BIOLOGY',
  'rna': 'MOLECULAR_BIOLOGY',
  'transcription': 'MOLECULAR_BIOLOGY',
  'translation': 'MOLECULAR_BIOLOGY',
  'replication': 'MOLECULAR_BIOLOGY',
  'protein': 'MOLECULAR_BIOLOGY',
  'gene': 'MOLECULAR_BIOLOGY',
  'operon': 'MOLECULAR_BIOLOGY',

  'heart': 'HUMAN_PHYSIOLOGY',
  'lung': 'HUMAN_PHYSIOLOGY',
  'kidney': 'HUMAN_PHYSIOLOGY',
  'nephron': 'HUMAN_PHYSIOLOGY',
  'neuron': 'HUMAN_PHYSIOLOGY',
  'brain': 'HUMAN_PHYSIOLOGY',
  'eye': 'HUMAN_PHYSIOLOGY',
  'ear': 'HUMAN_PHYSIOLOGY',
  'digest': 'HUMAN_PHYSIOLOGY',
  'respirat': 'HUMAN_PHYSIOLOGY',
  'muscle': 'HUMAN_PHYSIOLOGY',
  'sarcomere': 'HUMAN_PHYSIOLOGY',
  'synapse': 'HUMAN_PHYSIOLOGY',
  'blood': 'HUMAN_PHYSIOLOGY',

  'photosynthesis': 'PLANT_PHYSIOLOGY',
  'calvin': 'PLANT_PHYSIOLOGY',
  'krebs': 'PLANT_PHYSIOLOGY',
  'respiration': 'PLANT_PHYSIOLOGY',
  'stomata': 'PLANT_PHYSIOLOGY',
  'xylem': 'PLANT_PHYSIOLOGY',
  'phloem': 'PLANT_PHYSIOLOGY',

  'flower': 'REPRODUCTION',
  'pollen': 'REPRODUCTION',
  'embryo': 'REPRODUCTION',
  'sperm': 'REPRODUCTION',
  'ovum': 'REPRODUCTION',
  'menstrual': 'REPRODUCTION',
  'fertiliz': 'REPRODUCTION',
  'reproduct': 'REPRODUCTION',

  'ecosystem': 'ECOLOGY',
  'food-web': 'ECOLOGY',
  'food-chain': 'ECOLOGY',
  'nitrogen': 'ECOLOGY',
  'carbon-cycle': 'ECOLOGY',
  'water-cycle': 'ECOLOGY',
  'biogeochemical': 'ECOLOGY',

  'evolution': 'EVOLUTION',
  'darwin': 'EVOLUTION',
  'natural-selection': 'EVOLUTION',
  'phylogen': 'EVOLUTION',

  'pcr': 'BIOTECHNOLOGY',
  'gel-electrophoresis': 'BIOTECHNOLOGY',
  'cloning': 'BIOTECHNOLOGY',
  'plasmid': 'BIOTECHNOLOGY',
  'restriction': 'BIOTECHNOLOGY',
  'recombinant': 'BIOTECHNOLOGY',

  'bacteria': 'MICROORGANISMS',
  'virus': 'MICROORGANISMS',
  'phage': 'MICROORGANISMS',
  'prokaryot': 'MICROORGANISMS',
  'fungi': 'MICROORGANISMS',
}

function detectCategory(filename: string): DiagramCategory {
  const lower = filename.toLowerCase()
  for (const [pattern, category] of Object.entries(CATEGORY_PATTERNS)) {
    if (lower.includes(pattern)) {
      return category
    }
  }
  return 'CELL_BIOLOGY' // default
}

function generateName(filename: string): string {
  // Remove extension
  const name = path.parse(filename).name
  // Convert kebab-case or snake_case to Title Case
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
}

function generateTags(filename: string): string[] {
  const lower = path.parse(filename).name.toLowerCase()
  const tags = lower.split(/[-_\s]+/).filter(t => t.length > 2)
  return [...new Set(tags)]
}

interface ScanOptions {
  directory: string
  source: DiagramSource
  license: string
  attribution?: string
  urlPrefix: string
  dryRun?: boolean
}

async function scanAndImport(options: ScanOptions) {
  const { directory, source, license, attribution, urlPrefix, dryRun = false } = options

  console.log(`=== Scanning Directory: ${directory} ===\n`)
  console.log(`Source: ${source}`)
  console.log(`License: ${license}`)
  console.log(`URL Prefix: ${urlPrefix}`)
  console.log(`Dry Run: ${dryRun}\n`)

  if (!fs.existsSync(directory)) {
    console.error('Directory does not exist:', directory)
    return
  }

  const files = fs.readdirSync(directory)
  const imageFiles = files.filter(f =>
    f.endsWith('.svg') || f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg')
  )

  console.log(`Found ${imageFiles.length} image files\n`)

  let added = 0, skipped = 0, errors = 0

  for (const file of imageFiles) {
    const name = generateName(file)
    const category = detectCategory(file)
    const tags = generateTags(file)
    const fileUrl = `${urlPrefix}/${file}`
    const filePath = path.join(directory, file)
    const stats = fs.statSync(filePath)

    console.log(`Processing: ${file}`)
    console.log(`  Name: ${name}`)
    console.log(`  Category: ${category}`)
    console.log(`  Tags: ${tags.join(', ')}`)

    if (dryRun) {
      console.log('  [DRY RUN] Would add to database\n')
      added++
      continue
    }

    try {
      // Check if exists
      const existing = await prisma.diagram_assets.findFirst({
        where: { name }
      })

      if (existing) {
        console.log('  [SKIP] Already exists\n')
        skipped++
        continue
      }

      await prisma.diagram_assets.create({
        data: {
          name,
          category,
          source,
          license,
          attribution,
          fileUrl,
          tags,
          keywords: tags,
          fileSize: stats.size,
          qualityScore: 4.0,
          isActive: true,
          isVerified: false,
        }
      })

      console.log('  [ADDED]\n')
      added++
    } catch (err) {
      console.log('  [ERROR]', err)
      errors++
    }
  }

  console.log('\n=== SUMMARY ===')
  console.log(`Added: ${added}`)
  console.log(`Skipped: ${skipped}`)
  console.log(`Errors: ${errors}`)

  await prisma.$disconnect()
}

// Example usage for different sources
const SOURCES = {
  wikimedia: {
    directory: path.join(__dirname, '../../public/diagrams'),
    source: 'WIKIMEDIA' as DiagramSource,
    license: 'CC BY-SA 4.0',
    attribution: 'Wikimedia Commons',
    urlPrefix: '/diagrams',
  },
  servier: {
    directory: path.join(__dirname, '../../public/diagrams/servier'),
    source: 'SERVIER' as DiagramSource,
    license: 'CC BY 3.0',
    attribution: 'Servier Medical Art',
    urlPrefix: '/diagrams/servier',
  },
  bioicons: {
    directory: path.join(__dirname, '../../public/diagrams/bioicons'),
    source: 'BIOICONS' as DiagramSource,
    license: 'CC0 / MIT',
    attribution: 'Bioicons',
    urlPrefix: '/diagrams/bioicons',
  },
  custom: {
    directory: path.join(__dirname, '../../public/diagrams/custom'),
    source: 'CUSTOM_UPLOAD' as DiagramSource,
    license: 'Custom',
    attribution: 'Cerebrum Biology Academy',
    urlPrefix: '/diagrams/custom',
  },
}

// Get source from command line args
const args = process.argv.slice(2)
const sourceName = args[0] || 'wikimedia'
const dryRun = args.includes('--dry-run')

if (!(sourceName in SOURCES)) {
  console.log('Usage: npx ts-node scan-and-import.ts <source> [--dry-run]')
  console.log('Sources:', Object.keys(SOURCES).join(', '))
  process.exit(1)
}

const config = SOURCES[sourceName as keyof typeof SOURCES]
scanAndImport({ ...config, dryRun }).catch(console.error)
