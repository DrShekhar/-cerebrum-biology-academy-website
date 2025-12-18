/**
 * Extract PDF Text Script
 *
 * Extracts text content from NCERT Biology PDFs and saves as .txt files
 * for use by the MCQ generation pipeline.
 */

import * as dotenv from 'dotenv'
dotenv.config()

import * as fs from 'fs'
import * as path from 'path'

// Use require for CommonJS module compatibility
const { PDFParse } = require('pdf-parse')

const RESOURCES_PATH = path.join(process.cwd(), 'resources', 'ncert-textbooks')

interface ExtractionResult {
  class: number
  chapter: number
  name: string
  pages: number
  textLength: number
  success: boolean
  error?: string
}

/**
 * Extract text from a single PDF file
 */
async function extractPdfText(pdfPath: string): Promise<string> {
  const dataBuffer = fs.readFileSync(pdfPath)
  // Convert Buffer to Uint8Array
  const uint8Array = new Uint8Array(dataBuffer.buffer, dataBuffer.byteOffset, dataBuffer.byteLength)
  const parser = new PDFParse(uint8Array)
  await parser.load()
  const text = await parser.getText()
  return text
}

/**
 * Extract all PDFs for a class
 */
async function extractClassPdfs(classNum: 11 | 12): Promise<ExtractionResult[]> {
  const classDir = path.join(RESOURCES_PATH, `class-${classNum}`)
  const results: ExtractionResult[] = []

  if (!fs.existsSync(classDir)) {
    console.log(`Directory not found: ${classDir}`)
    return results
  }

  const files = fs.readdirSync(classDir).filter((f) => f.endsWith('.pdf'))
  console.log(`Found ${files.length} PDFs in class-${classNum}`)

  for (const file of files) {
    const pdfPath = path.join(classDir, file)

    // Extract chapter number from filename (e.g., "08-Cell-The-Unit-of-Life.pdf")
    const match = file.match(/^(\d+)-(.+)\.pdf$/)
    if (!match) {
      console.log(`  Skipping: ${file} (doesn't match pattern)`)
      continue
    }

    const chapterNum = parseInt(match[1], 10)
    const chapterName = match[2].replace(/-/g, ' ')

    // Check file size - skip if too small (likely placeholder)
    const stats = fs.statSync(pdfPath)
    if (stats.size < 1000) {
      console.log(`  Skipping: ${file} (file too small - ${stats.size} bytes)`)
      results.push({
        class: classNum,
        chapter: chapterNum,
        name: chapterName,
        pages: 0,
        textLength: 0,
        success: false,
        error: 'File too small (placeholder)',
      })
      continue
    }

    try {
      console.log(`  Extracting: ${file}...`)
      const text = await extractPdfText(pdfPath)

      // Save as text file
      const txtPath = path.join(classDir, `chapter-${chapterNum}.txt`)
      fs.writeFileSync(txtPath, text, 'utf-8')

      // Count approximate pages (NCERT pages have ~400-500 words)
      const wordCount = text.split(/\s+/).length
      const approxPages = Math.ceil(wordCount / 450)

      results.push({
        class: classNum,
        chapter: chapterNum,
        name: chapterName,
        pages: approxPages,
        textLength: text.length,
        success: true,
      })

      console.log(`    ✓ Saved: chapter-${chapterNum}.txt (${text.length} chars, ~${approxPages} pages)`)
    } catch (error) {
      console.log(`    ✗ Failed: ${error}`)
      results.push({
        class: classNum,
        chapter: chapterNum,
        name: chapterName,
        pages: 0,
        textLength: 0,
        success: false,
        error: String(error),
      })
    }
  }

  return results
}

/**
 * Main extraction function
 */
async function extractAllPdfs(): Promise<void> {
  console.log('\n' + '='.repeat(70))
  console.log('NCERT PDF Text Extraction')
  console.log('='.repeat(70))

  const results: ExtractionResult[] = []

  console.log('\n--- Class 11 ---')
  const class11Results = await extractClassPdfs(11)
  results.push(...class11Results)

  console.log('\n--- Class 12 ---')
  const class12Results = await extractClassPdfs(12)
  results.push(...class12Results)

  // Summary
  console.log('\n' + '='.repeat(70))
  console.log('EXTRACTION SUMMARY')
  console.log('='.repeat(70))

  const successful = results.filter((r) => r.success)
  const failed = results.filter((r) => !r.success)

  console.log(`\nSuccessful: ${successful.length}`)
  console.log(`Failed: ${failed.length}`)

  if (successful.length > 0) {
    const totalChars = successful.reduce((sum, r) => sum + r.textLength, 0)
    const totalPages = successful.reduce((sum, r) => sum + r.pages, 0)
    console.log(`Total characters: ${totalChars.toLocaleString()}`)
    console.log(`Approximate pages: ${totalPages}`)
  }

  if (failed.length > 0) {
    console.log('\nFailed extractions:')
    for (const f of failed) {
      console.log(`  - Class ${f.class} Ch.${f.chapter}: ${f.error}`)
    }
  }

  // Save extraction report
  const reportPath = path.join(RESOURCES_PATH, 'extraction-report.json')
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2))
  console.log(`\nReport saved to: ${reportPath}`)
}

// Run if called directly
if (require.main === module) {
  extractAllPdfs().catch(console.error)
}

export { extractAllPdfs, extractPdfText }
