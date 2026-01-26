#!/usr/bin/env npx tsx
/**
 * SEO Marketing Machine - Lead Magnet PDF Generator
 *
 * Creates downloadable PDF content (cheat sheets, notes, revision guides).
 *
 * Usage:
 *   npm run seo:lead-magnet --topic "Genetics Revision Notes" --type cheat-sheet
 *   npm run seo:lead-magnet --topic "Cell Cycle" --type chapter-notes --pages 10
 *   npm run seo:lead-magnet --chapter "Human Reproduction" --type pyq-analysis
 *
 * Output: JSON structure ready for PDF generation or direct HTML rendering.
 */

import * as fs from 'fs'
import * as path from 'path'
import { randomUUID } from 'crypto'
import {
  LeadMagnetDraft,
  LeadMagnetType,
  LeadMagnetContent,
  LeadMagnetGenerationInput,
  DownloadGateConfig,
  DEFAULT_CONFIG,
} from '../../../src/lib/seo-marketing/types'

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
}

function log(message: string, color: keyof typeof colors = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function logHeader(title: string) {
  console.log('')
  log('═'.repeat(60), 'cyan')
  log(`  ${title}`, 'bright')
  log('═'.repeat(60), 'cyan')
  console.log('')
}

function generateId(): string {
  return `lead-${Date.now()}-${randomUUID().substring(0, 8)}`
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 60)
}

function ensureDraftDir(): string {
  const draftDir = path.join(process.cwd(), DEFAULT_CONFIG.draftsDir, 'leads')
  if (!fs.existsSync(draftDir)) {
    fs.mkdirSync(draftDir, { recursive: true })
  }
  return draftDir
}

function saveDraft(id: string, content: object): string {
  const draftDir = ensureDraftDir()
  const filePath = path.join(draftDir, `${id}.json`)
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2))
  return filePath
}

// Parse command line arguments
function parseArgs(): Record<string, string | boolean> {
  const args: Record<string, string | boolean> = {}
  const argv = process.argv.slice(2)

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg.startsWith('--')) {
      const key = arg.substring(2)
      const nextArg = argv[i + 1]
      if (nextArg && !nextArg.startsWith('--')) {
        args[key] = nextArg
        i++
      } else {
        args[key] = true
      }
    } else if (!args.positional) {
      args.positional = arg
    }
  }

  return args
}

// ============================================
// LEAD MAGNET TEMPLATES
// ============================================

const MAGNET_TEMPLATES: Record<
  LeadMagnetType,
  {
    titleTemplate: string
    description: string
    defaultPages: number
    sectionStructure: string[]
  }
> = {
  'cheat-sheet': {
    titleTemplate: '{topic} - Quick Revision Cheat Sheet',
    description: 'One-page summary with all key formulas, facts, and diagrams',
    defaultPages: 2,
    sectionStructure: [
      'Key Definitions',
      'Important Formulas',
      'Diagram Summary',
      'Quick Facts',
      'Common Mistakes',
      'NEET Tips',
    ],
  },
  'chapter-notes': {
    titleTemplate: '{topic} - Complete Chapter Notes',
    description: 'Detailed notes covering the entire chapter with NCERT alignment',
    defaultPages: 15,
    sectionStructure: [
      'Introduction',
      'Key Concepts',
      'Detailed Explanation',
      'Important Diagrams',
      'NCERT Points',
      'Previous Year Questions',
      'Summary',
    ],
  },
  'pyq-analysis': {
    titleTemplate: '{topic} - PYQ Analysis (2019-2024)',
    description: 'Analysis of previous year questions with patterns and solutions',
    defaultPages: 10,
    sectionStructure: [
      'Topic Weightage',
      'Question Pattern Analysis',
      'Year-wise Question Distribution',
      'Most Asked Concepts',
      'Solved Examples',
      'Practice Questions',
      'Expected Questions',
    ],
  },
  'revision-guide': {
    titleTemplate: '{topic} - Last Minute Revision Guide',
    description: 'Condensed revision notes for quick last-minute preparation',
    defaultPages: 5,
    sectionStructure: [
      'Mind Map',
      'Key Points Summary',
      '50 Must-Know Facts',
      'Diagram Bank',
      'Formula Sheet',
      'Quick Recall Questions',
    ],
  },
  'formula-sheet': {
    titleTemplate: '{topic} - Formula & Fact Sheet',
    description: 'All formulas, equations, and numerical facts in one place',
    defaultPages: 3,
    sectionStructure: [
      'Formulas with Derivations',
      'Numerical Values',
      'Units & Conversions',
      'Important Constants',
      'Exceptions & Special Cases',
    ],
  },
  'mind-map': {
    titleTemplate: '{topic} - Visual Mind Map Collection',
    description: 'Visual mind maps and flowcharts for conceptual clarity',
    defaultPages: 8,
    sectionStructure: [
      'Main Concept Map',
      'Sub-topic Flowcharts',
      'Process Diagrams',
      'Comparison Tables',
      'Classification Charts',
    ],
  },
  'question-bank': {
    titleTemplate: '{topic} - 100+ MCQ Question Bank',
    description: 'Comprehensive question bank with varying difficulty levels',
    defaultPages: 20,
    sectionStructure: [
      'Easy Questions (30)',
      'Medium Questions (40)',
      'Hard Questions (30)',
      'Answer Key',
      'Detailed Solutions',
    ],
  },
}

// ============================================
// CONTENT GENERATORS
// ============================================

function generateLeadMagnetContent(input: LeadMagnetGenerationInput): LeadMagnetContent {
  const template = MAGNET_TEMPLATES[input.magnetType]
  const title = template.titleTemplate.replace('{topic}', input.topic)

  const sections = template.sectionStructure.map((heading, index) => {
    // Generate placeholder content based on section type
    let content = ''
    let type: 'text' | 'table' | 'diagram' | 'list' | 'formula' = 'text'

    if (heading.toLowerCase().includes('formula') || heading.toLowerCase().includes('equation')) {
      type = 'formula'
      content = `[CLAUDE: Generate relevant formulas for ${input.topic}]`
    } else if (
      heading.toLowerCase().includes('table') ||
      heading.toLowerCase().includes('comparison')
    ) {
      type = 'table'
      content = `[CLAUDE: Create comparison table for ${input.topic}]`
    } else if (
      heading.toLowerCase().includes('diagram') ||
      heading.toLowerCase().includes('chart') ||
      heading.toLowerCase().includes('map')
    ) {
      type = 'diagram'
      content = `[CLAUDE: Describe diagram for ${input.topic}]`
    } else if (
      heading.toLowerCase().includes('facts') ||
      heading.toLowerCase().includes('points') ||
      heading.toLowerCase().includes('question')
    ) {
      type = 'list'
      content = `[CLAUDE: Generate list for ${heading} about ${input.topic}]`
    } else {
      type = 'text'
      content = `[CLAUDE: Write detailed content for ${heading} about ${input.topic}]`
    }

    return { heading, content, type }
  })

  return {
    title,
    subtitle: `NEET 2026 Biology | ${input.targetChapter || input.topic}`,
    sections,
    footer: `© ${new Date().getFullYear()} Cerebrum Biology Academy | WhatsApp: ${DEFAULT_CONFIG.whatsappNumber}`,
  }
}

function generateDownloadGateConfig(magnetType: LeadMagnetType): DownloadGateConfig {
  return {
    requiredFields: ['name', 'phone', 'class'],
    whatsappOptIn: true,
    emailOptIn: false,
    thankYouMessage: `🎉 Your ${magnetType.replace('-', ' ')} is ready! Check your WhatsApp for the download link and exclusive study tips.`,
    redirectUrl: '/resources/thank-you',
  }
}

function generateClaudePrompt(input: LeadMagnetGenerationInput): string {
  const template = MAGNET_TEMPLATES[input.magnetType]

  return `
## LEAD MAGNET GENERATION
Type: ${input.magnetType.toUpperCase().replace('-', ' ')}
Topic: **${input.topic}**
Chapter: ${input.targetChapter || 'General'}
Target Pages: ${input.pageCount || template.defaultPages}

### Purpose:
${template.description}

### Required Sections:
${template.sectionStructure.map((s, i) => `${i + 1}. ${s}`).join('\n')}

### Content Requirements:
- NCERT-aligned for NEET 2026
- Include diagrams descriptions where applicable
- Use tables for comparisons
- Include formulas with explanations
- Add PYQ references where relevant
- Keep language student-friendly

### Format:
For each section, provide:
1. Section heading
2. Content (text/list/table/formula)
3. Any diagram suggestions with descriptions

### Special Instructions:
${input.includeFormulas ? '✓ Include all relevant formulas' : ''}
${input.includeDiagrams ? '✓ Include detailed diagram descriptions' : ''}

---
[GENERATE CONTENT FOR EACH SECTION BELOW]
`
}

// ============================================
// MAIN GENERATOR
// ============================================

async function generateLeadMagnet(input: LeadMagnetGenerationInput): Promise<LeadMagnetDraft> {
  const id = generateId()
  const now = new Date().toISOString()
  const template = MAGNET_TEMPLATES[input.magnetType]
  const title = template.titleTemplate.replace('{topic}', input.topic)

  const draft: LeadMagnetDraft = {
    id,
    type: 'LEAD_MAGNET',
    status: 'draft',
    priority: 'normal',
    createdAt: now,
    updatedAt: now,
    generatedBy: 'claude',
    magnetType: input.magnetType,
    title,
    description: template.description,
    targetKeywords: [
      input.topic,
      `${input.topic} notes`,
      `${input.topic} PDF`,
      `NEET ${input.topic}`,
      `${input.magnetType.replace('-', ' ')} ${input.topic}`,
    ],
    content: generateLeadMagnetContent(input),
    estimatedPages: input.pageCount || template.defaultPages,
    downloadGate: generateDownloadGateConfig(input.magnetType),
  }

  return draft
}

// ============================================
// CLI HANDLER
// ============================================

async function main() {
  const args = parseArgs()

  logHeader('Lead Magnet PDF Generator')

  // Get topic
  const topic = (args.topic as string) || (args.chapter as string) || (args.positional as string)

  if (!topic) {
    log('Error: Topic is required', 'red')
    log('Usage: npm run seo:lead-magnet --topic "Cell Division" --type cheat-sheet', 'yellow')
    process.exit(1)
  }

  // Get magnet type
  const magnetType = (args.type as LeadMagnetType) || 'cheat-sheet'
  const validTypes: LeadMagnetType[] = [
    'cheat-sheet',
    'chapter-notes',
    'pyq-analysis',
    'revision-guide',
    'formula-sheet',
    'mind-map',
    'question-bank',
  ]

  if (!validTypes.includes(magnetType)) {
    log(`Error: Invalid type "${magnetType}"`, 'red')
    log(`Valid types: ${validTypes.join(', ')}`, 'yellow')
    process.exit(1)
  }

  const pageCount = args.pages ? parseInt(args.pages as string) : undefined

  log(`Topic: ${topic}`, 'blue')
  log(`Type: ${magnetType}`, 'blue')
  log(`Pages: ${pageCount || MAGNET_TEMPLATES[magnetType].defaultPages} (estimated)`, 'blue')
  console.log('')

  try {
    const input: LeadMagnetGenerationInput = {
      topic,
      magnetType,
      targetChapter: args.chapter as string,
      pageCount,
      includeFormulas: Boolean(args.formulas),
      includeDiagrams: Boolean(args.diagrams),
    }

    const draft = await generateLeadMagnet(input)
    const filePath = saveDraft(draft.id, draft)

    log('✅ Lead magnet draft created!', 'green')
    console.log('')

    log(`📄 ${draft.title}`, 'bright')
    log(`   ID: ${draft.id}`, 'cyan')
    log(`   Type: ${draft.magnetType}`, 'cyan')
    log(`   Pages: ~${draft.estimatedPages}`, 'cyan')
    log(`   File: ${filePath}`, 'cyan')
    console.log('')

    log('📋 Sections:', 'blue')
    draft.content.sections.forEach((section, i) => {
      const typeIcon: Record<string, string> = {
        text: '📝',
        table: '📊',
        diagram: '🖼️',
        list: '📋',
        formula: '🔢',
      }
      log(`   ${i + 1}. ${typeIcon[section.type] || '•'} ${section.heading}`, 'cyan')
    })
    console.log('')

    log('🔐 Download Gate:', 'blue')
    log(`   Required: ${draft.downloadGate.requiredFields.join(', ')}`, 'cyan')
    log(`   WhatsApp Opt-in: ${draft.downloadGate.whatsappOptIn ? 'Yes' : 'No'}`, 'cyan')
    console.log('')

    log('═'.repeat(60), 'yellow')
    log('  NEXT STEPS', 'bright')
    log('═'.repeat(60), 'yellow')
    console.log('')
    log('1. Copy the prompt below and paste to Claude', 'blue')
    log('2. Claude will generate the content for each section', 'blue')
    log('3. Update the draft file with generated content', 'blue')
    log('4. Convert to PDF using your preferred tool', 'blue')
    log('5. Upload and create download page', 'blue')
    console.log('')

    log('═'.repeat(60), 'magenta')
    log('  PROMPT FOR CLAUDE', 'bright')
    log('═'.repeat(60), 'magenta')
    console.log('')
    console.log(generateClaudePrompt(input))
    console.log('')

    log('═'.repeat(60), 'green')
    log('  SEO KEYWORDS', 'bright')
    log('═'.repeat(60), 'green')
    console.log('')
    draft.targetKeywords.forEach((kw) => log(`   • ${kw}`, 'cyan'))
    console.log('')
  } catch (error) {
    log(`Error: ${error}`, 'red')
    process.exit(1)
  }
}

// Show help if no arguments
if (process.argv.length <= 2) {
  logHeader('Lead Magnet PDF Generator - Help')
  console.log(`
${colors.bright}CREATE LEAD MAGNETS${colors.reset}
  npm run seo:lead-magnet --topic "Cell Division" --type cheat-sheet
  npm run seo:lead-magnet --topic "Genetics" --type chapter-notes
  npm run seo:lead-magnet --chapter "Human Reproduction" --type pyq-analysis

${colors.bright}AVAILABLE TYPES${colors.reset}
  ${colors.cyan}cheat-sheet${colors.reset}      2-page quick revision summary
  ${colors.cyan}chapter-notes${colors.reset}    15-page detailed chapter notes
  ${colors.cyan}pyq-analysis${colors.reset}     10-page previous year question analysis
  ${colors.cyan}revision-guide${colors.reset}   5-page last-minute revision guide
  ${colors.cyan}formula-sheet${colors.reset}    3-page formulas and facts
  ${colors.cyan}mind-map${colors.reset}         8-page visual concept maps
  ${colors.cyan}question-bank${colors.reset}    20-page MCQ collection

${colors.bright}OPTIONS${colors.reset}
  --topic       Main topic for the lead magnet
  --chapter     NEET chapter name
  --type        Lead magnet type (see above)
  --pages       Custom page count estimate
  --formulas    Include formula emphasis
  --diagrams    Include diagram descriptions

${colors.bright}WORKFLOW${colors.reset}
  1. Generate draft with this CLI
  2. Copy prompt and paste to Claude
  3. Claude generates section content
  4. Update draft file
  5. Convert to PDF (Canva, Google Docs, etc.)
  6. Create download gate page
  7. Capture leads via WhatsApp

${colors.bright}LEAD CAPTURE${colors.reset}
  Generated magnets include download gate config:
  - Required fields: name, phone, class
  - WhatsApp opt-in enabled
  - Thank you message included

${colors.bright}EXAMPLE: NEET Genetics Cheat Sheet${colors.reset}
  npm run seo:lead-magnet --topic "Genetics" --type cheat-sheet --formulas
`)
  process.exit(0)
}

main().catch(console.error)
