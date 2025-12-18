/**
 * NCERT Content Reader
 *
 * Reads and parses NCERT Biology textbook content from PDF files
 * stored in /resources/ncert-textbooks/. Extracts page content,
 * key terms, figures, and important statements for question generation.
 */

import * as fs from 'fs'
import * as path from 'path'

export interface NCERTPage {
  chapter: number
  chapterName: string
  pageNumber: number
  ncertClass: 11 | 12
  content: string
  figures: string[]
  keyTerms: string[]
  importantStatements: string[]
  tables?: string[]
}

export interface NCERTChapter {
  number: number
  name: string
  ncertClass: 11 | 12
  startPage: number
  endPage: number
  totalPages: number
  keyDiagrams: string[]
  neetWeightage: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH'
  topicsCovered: string[]
  pdfAvailable: boolean
}

// Raw structure from JSON file
interface RawNCERTUnit {
  unitNo: number
  name: string
  chapters: {
    chapterNo: number
    name: string
    pdfFile: string
    status: string
    keyDiagrams: { figure: string; title: string; page: number | string }[]
    topics: string[]
    neetWeightage: string
    pageRange?: { start: number; end: number }
  }[]
}

interface RawNCERTClass {
  subject: string
  bookCode: string
  totalChapters: number
  units: RawNCERTUnit[]
}

interface RawNCERTIndex {
  class11: RawNCERTClass
  class12: RawNCERTClass
}

export interface NCERTIndex {
  class11: {
    totalChapters: number
    chapters: NCERTChapter[]
  }
  class12: {
    totalChapters: number
    chapters: NCERTChapter[]
  }
}

const RESOURCES_PATH = path.join(process.cwd(), 'resources', 'ncert-textbooks')

// Key biological terms to identify in content
const KEY_TERM_PATTERNS = [
  /\b([A-Z][a-z]+(?:\s+[a-z]+)?)\s+is\s+defined\s+as/g,
  /\bThe\s+term\s+"([^"]+)"/g,
  /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s+refers\s+to/g,
  /\bis\s+called\s+([a-z]+(?:\s+[a-z]+)?)/gi,
  /\b([A-Z][a-z]+(?:[-][a-z]+)?)\s+cycle/gi,
  /\b([A-Z][a-z]+)\s+effect/gi,
  /\b([A-Z][a-z]+)['']s\s+(law|theory|principle|hypothesis)/gi,
]

// Patterns to identify important NCERT statements
const IMPORTANT_STATEMENT_PATTERNS = [
  /^[A-Z][^.!?]*(?:is|are|was|were)\s+(?:the\s+)?(?:first|only|main|primary|most|largest|smallest)[^.!?]*[.!?]/gm,
  /^[A-Z][^.!?]*(?:discovered|proposed|coined|introduced)\s+(?:by|in)[^.!?]*[.!?]/gm,
  /^[A-Z][^.!?]*(?:consists of|contains|comprises|includes)[^.!?]*[.!?]/gm,
  /^The\s+(?:process|mechanism|function|role|structure)\s+of[^.!?]*[.!?]/gm,
]

// Figure reference patterns
const FIGURE_PATTERNS = [
  /Fig(?:ure)?\.?\s*(\d+\.?\d*[a-z]?)/gi,
  /\(see\s+fig(?:ure)?\.?\s*(\d+\.?\d*)\)/gi,
  /as\s+shown\s+in\s+fig(?:ure)?\.?\s*(\d+\.?\d*)/gi,
]

export class NCERTContentReader {
  private indexPath: string
  private index: NCERTIndex | null = null

  constructor() {
    this.indexPath = path.join(RESOURCES_PATH, 'ncert-biology-index.json')
  }

  /**
   * Convert raw chapter data from JSON to NCERTChapter format
   */
  private convertRawChapter(rawCh: RawNCERTUnit['chapters'][0], ncertClass: 11 | 12): NCERTChapter {
    const pageRange = rawCh.pageRange || { start: 1, end: 20 }
    return {
      number: rawCh.chapterNo,
      name: rawCh.name,
      ncertClass,
      startPage: pageRange.start,
      endPage: pageRange.end,
      totalPages: pageRange.end - pageRange.start + 1,
      keyDiagrams: rawCh.keyDiagrams.map((d) => d.figure),
      neetWeightage: rawCh.neetWeightage as NCERTChapter['neetWeightage'],
      topicsCovered: rawCh.topics,
      pdfAvailable: rawCh.status === 'available',
    }
  }

  /**
   * Flatten units structure into single chapters array
   */
  private flattenChapters(classData: RawNCERTClass, ncertClass: 11 | 12): NCERTChapter[] {
    const chapters: NCERTChapter[] = []
    for (const unit of classData.units) {
      for (const rawCh of unit.chapters) {
        chapters.push(this.convertRawChapter(rawCh, ncertClass))
      }
    }
    return chapters.sort((a, b) => a.number - b.number)
  }

  /**
   * Load the NCERT chapter index
   */
  async loadIndex(): Promise<NCERTIndex> {
    if (this.index) return this.index

    try {
      const indexContent = fs.readFileSync(this.indexPath, 'utf-8')
      const rawIndex = JSON.parse(indexContent) as RawNCERTIndex

      // Convert raw structure to flattened chapters
      this.index = {
        class11: {
          totalChapters: rawIndex.class11.totalChapters,
          chapters: this.flattenChapters(rawIndex.class11, 11),
        },
        class12: {
          totalChapters: rawIndex.class12.totalChapters,
          chapters: this.flattenChapters(rawIndex.class12, 12),
        },
      }

      return this.index
    } catch (error) {
      console.error('Failed to load NCERT index:', error)
      throw new Error('NCERT index not found. Please ensure ncert-biology-index.json exists.')
    }
  }

  /**
   * Get chapter metadata
   */
  async getChapter(ncertClass: 11 | 12, chapterNumber: number): Promise<NCERTChapter | null> {
    const index = await this.loadIndex()
    const classData = ncertClass === 11 ? index.class11 : index.class12
    return classData.chapters.find((ch) => ch.number === chapterNumber) || null
  }

  /**
   * Get all chapters for a class
   */
  async getChaptersForClass(ncertClass: 11 | 12): Promise<NCERTChapter[]> {
    const index = await this.loadIndex()
    return ncertClass === 11 ? index.class11.chapters : index.class12.chapters
  }

  /**
   * Read chapter content from text file
   */
  async readChapterContent(ncertClass: 11 | 12, chapterNumber: number): Promise<string | null> {
    const chapter = await this.getChapter(ncertClass, chapterNumber)
    if (!chapter || !chapter.pdfAvailable) {
      console.log(`Chapter ${chapterNumber} (Class ${ncertClass}) not available`)
      return null
    }

    // Try to find the text content file
    const possiblePaths = [
      path.join(RESOURCES_PATH, `class${ncertClass}`, `chapter${chapterNumber}.txt`),
      path.join(RESOURCES_PATH, `class${ncertClass}`, `ch${chapterNumber}.txt`),
      path.join(RESOURCES_PATH, `class-${ncertClass}`, `chapter-${chapterNumber}.txt`),
      path.join(RESOURCES_PATH, `ncert-class${ncertClass}-chapter${chapterNumber}.txt`),
    ]

    for (const filePath of possiblePaths) {
      if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, 'utf-8')
      }
    }

    console.log(`Text file not found for Chapter ${chapterNumber} (Class ${ncertClass})`)
    return null
  }

  /**
   * Split chapter content into pages (approximate based on word count)
   */
  splitIntoPages(content: string, chapter: NCERTChapter): NCERTPage[] {
    const pages: NCERTPage[] = []
    const totalPages = chapter.endPage - chapter.startPage + 1

    // Approximate words per NCERT page (around 400-500 words)
    const wordsPerPage = 450
    const words = content.split(/\s+/)
    const wordsPerSegment = Math.ceil(words.length / totalPages)

    for (let i = 0; i < totalPages; i++) {
      const startWord = i * wordsPerSegment
      const endWord = Math.min((i + 1) * wordsPerSegment, words.length)
      const pageContent = words.slice(startWord, endWord).join(' ')

      pages.push({
        chapter: chapter.number,
        chapterName: chapter.name,
        pageNumber: chapter.startPage + i,
        ncertClass: chapter.ncertClass,
        content: pageContent,
        figures: this.extractFigures(pageContent),
        keyTerms: this.extractKeyTerms(pageContent),
        importantStatements: this.extractImportantStatements(pageContent),
      })
    }

    return pages
  }

  /**
   * Extract figure references from content
   */
  extractFigures(content: string): string[] {
    const figures: Set<string> = new Set()

    for (const pattern of FIGURE_PATTERNS) {
      const matches = content.matchAll(pattern)
      for (const match of matches) {
        figures.add(`Fig ${match[1]}`)
      }
    }

    return Array.from(figures)
  }

  /**
   * Extract key biological terms from content
   */
  extractKeyTerms(content: string): string[] {
    const terms: Set<string> = new Set()

    for (const pattern of KEY_TERM_PATTERNS) {
      const matches = content.matchAll(pattern)
      for (const match of matches) {
        if (match[1] && match[1].length > 3 && match[1].length < 50) {
          terms.add(match[1].trim())
        }
      }
    }

    // Also extract capitalized terms that appear multiple times
    const capitalizedTerms = content.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?\b/g) || []
    const termCounts = new Map<string, number>()
    for (const term of capitalizedTerms) {
      termCounts.set(term, (termCounts.get(term) || 0) + 1)
    }

    for (const [term, count] of termCounts) {
      if (count >= 3 && term.length > 4) {
        terms.add(term)
      }
    }

    return Array.from(terms).slice(0, 20) // Limit to 20 key terms per page
  }

  /**
   * Extract important statements (definitions, facts)
   */
  extractImportantStatements(content: string): string[] {
    const statements: string[] = []

    for (const pattern of IMPORTANT_STATEMENT_PATTERNS) {
      const matches = content.matchAll(pattern)
      for (const match of matches) {
        const statement = match[0].trim()
        if (statement.length > 20 && statement.length < 300) {
          statements.push(statement)
        }
      }
    }

    // Also find sentences with "is defined as", "refers to", etc.
    const definitionSentences =
      content.match(/[A-Z][^.!?]*(?:is defined as|refers to|is called|known as)[^.!?]*[.!?]/g) || []
    for (const sentence of definitionSentences) {
      if (sentence.length > 20 && sentence.length < 300 && !statements.includes(sentence)) {
        statements.push(sentence.trim())
      }
    }

    return statements.slice(0, 10) // Limit to 10 important statements per page
  }

  /**
   * Get all pages for a chapter with extracted content
   */
  async getChapterPages(ncertClass: 11 | 12, chapterNumber: number): Promise<NCERTPage[]> {
    const chapter = await this.getChapter(ncertClass, chapterNumber)
    if (!chapter) {
      throw new Error(`Chapter ${chapterNumber} not found for Class ${ncertClass}`)
    }

    const content = await this.readChapterContent(ncertClass, chapterNumber)
    if (!content) {
      // Return empty pages with metadata if content not available
      const emptyPages: NCERTPage[] = []
      for (let i = chapter.startPage; i <= chapter.endPage; i++) {
        emptyPages.push({
          chapter: chapter.number,
          chapterName: chapter.name,
          pageNumber: i,
          ncertClass: chapter.ncertClass,
          content: '',
          figures: [],
          keyTerms: [],
          importantStatements: [],
        })
      }
      return emptyPages
    }

    return this.splitIntoPages(content, chapter)
  }

  /**
   * Get summary statistics for all chapters
   */
  async getSummaryStats(): Promise<{
    totalChapters: number
    totalPages: number
    availableChapters: number
    class11Stats: { chapters: number; pages: number }
    class12Stats: { chapters: number; pages: number }
  }> {
    const index = await this.loadIndex()

    let totalPages11 = 0
    let totalPages12 = 0
    let available11 = 0
    let available12 = 0

    for (const ch of index.class11.chapters) {
      totalPages11 += ch.endPage - ch.startPage + 1
      if (ch.pdfAvailable) available11++
    }

    for (const ch of index.class12.chapters) {
      totalPages12 += ch.endPage - ch.startPage + 1
      if (ch.pdfAvailable) available12++
    }

    return {
      totalChapters: index.class11.totalChapters + index.class12.totalChapters,
      totalPages: totalPages11 + totalPages12,
      availableChapters: available11 + available12,
      class11Stats: { chapters: index.class11.totalChapters, pages: totalPages11 },
      class12Stats: { chapters: index.class12.totalChapters, pages: totalPages12 },
    }
  }

  /**
   * Get high-weightage chapters for priority generation
   */
  async getHighWeightageChapters(): Promise<NCERTChapter[]> {
    const index = await this.loadIndex()
    const allChapters = [...index.class11.chapters, ...index.class12.chapters]
    return allChapters.filter(
      (ch) => ch.neetWeightage === 'VERY_HIGH' || ch.neetWeightage === 'HIGH'
    )
  }
}

// Export singleton instance
export const ncertReader = new NCERTContentReader()
