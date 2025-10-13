// PDF Processing for Biology Textbook Knowledge Base
import { PDFExtract } from 'pdf.js-extract'

export interface BiologyContent {
  id: string
  title: string
  chapter: string
  section: string
  content: string
  topics: string[]
  difficulty: 'basic' | 'intermediate' | 'advanced'
  neetRelevance: number // 0-100 score
  pageNumber: number
  embeddings?: number[]
}

export class BiologyPDFProcessor {
  private pdfExtract: PDFExtract

  constructor() {
    this.pdfExtract = new PDFExtract()
  }

  /**
   * Process biology textbook PDF and extract structured content
   */
  async processPDF(pdfPath: string): Promise<BiologyContent[]> {
    try {
      const data = await this.pdfExtract.extract(pdfPath)
      const content: BiologyContent[] = []

      let currentChapter = ''
      let currentSection = ''
      let textBuffer = ''

      for (const page of data.pages) {
        for (const item of page.content) {
          if (item.hasOwnProperty('str')) {
            const text = item.str.trim()

            // Detect chapter headings
            if (this.isChapterHeading(text)) {
              if (textBuffer.trim()) {
                content.push(this.createContentBlock(
                  textBuffer,
                  currentChapter,
                  currentSection,
                  page.pageInfo.num
                ))
                textBuffer = ''
              }
              currentChapter = text
              currentSection = ''
            }
            // Detect section headings
            else if (this.isSectionHeading(text)) {
              if (textBuffer.trim()) {
                content.push(this.createContentBlock(
                  textBuffer,
                  currentChapter,
                  currentSection,
                  page.pageInfo.num
                ))
                textBuffer = ''
              }
              currentSection = text
            }
            // Accumulate content
            else {
              textBuffer += text + ' '
            }
          }
        }
      }

      // Process final buffer
      if (textBuffer.trim()) {
        content.push(this.createContentBlock(
          textBuffer,
          currentChapter,
          currentSection,
          data.pages[data.pages.length - 1].pageInfo.num
        ))
      }

      return content
    } catch (error) {
      console.error('PDF processing error:', error)
      throw new Error('Failed to process PDF')
    }
  }

  private isChapterHeading(text: string): boolean {
    return /^Chapter\s+\d+|^CHAPTER\s+\d+|^\d+\.\s+[A-Z]/.test(text)
  }

  private isSectionHeading(text: string): boolean {
    return /^\d+\.\d+\s+|^[A-Z][a-z]+\s+[A-Z]/.test(text) && text.length < 100
  }

  private createContentBlock(
    text: string,
    chapter: string,
    section: string,
    pageNumber: number
  ): BiologyContent {
    const topics = this.extractBiologyTopics(text)
    const difficulty = this.assessDifficulty(text, topics)
    const neetRelevance = this.calculateNEETRelevance(topics, text)

    return {
      id: `content_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      title: section || chapter || 'General Content',
      chapter,
      section,
      content: text.trim(),
      topics,
      difficulty,
      neetRelevance,
      pageNumber
    }
  }

  private extractBiologyTopics(text: string): string[] {
    const biologyKeywords = [
      // Cell Biology
      'cell', 'nucleus', 'mitochondria', 'ribosome', 'endoplasmic reticulum',
      'golgi apparatus', 'lysosome', 'cytoplasm', 'membrane', 'organelle',

      // Genetics
      'DNA', 'RNA', 'gene', 'chromosome', 'allele', 'genotype', 'phenotype',
      'mutation', 'heredity', 'meiosis', 'mitosis', 'transcription', 'translation',

      // Ecology
      'ecosystem', 'biodiversity', 'food chain', 'food web', 'population',
      'community', 'habitat', 'niche', 'succession', 'conservation',

      // Plant Biology
      'photosynthesis', 'chlorophyll', 'stomata', 'xylem', 'phloem',
      'transpiration', 'respiration', 'flower', 'fruit', 'seed',

      // Animal Biology
      'digestive system', 'respiratory system', 'circulatory system',
      'nervous system', 'reproductive system', 'excretory system',

      // Biochemistry
      'enzyme', 'protein', 'carbohydrate', 'lipid', 'amino acid',
      'metabolism', 'ATP', 'hormone', 'vitamin'
    ]

    const foundTopics = biologyKeywords.filter(keyword =>
      text.toLowerCase().includes(keyword.toLowerCase())
    )

    return [...new Set(foundTopics)]
  }

  private assessDifficulty(text: string, topics: string[]): 'basic' | 'intermediate' | 'advanced' {
    const advancedTopics = ['transcription', 'translation', 'enzyme kinetics', 'genetics', 'molecular biology']
    const intermediateTopics = ['photosynthesis', 'respiration', 'circulation', 'reproduction']

    if (topics.some(topic => advancedTopics.includes(topic.toLowerCase()))) {
      return 'advanced'
    } else if (topics.some(topic => intermediateTopics.includes(topic.toLowerCase()))) {
      return 'intermediate'
    }
    return 'basic'
  }

  private calculateNEETRelevance(topics: string[], text: string): number {
    // NEET Biology high-priority topics
    const neetTopics = [
      'cell biology', 'genetics', 'evolution', 'plant physiology',
      'animal physiology', 'reproduction', 'ecology', 'biotechnology'
    ]

    const matches = neetTopics.filter(neetTopic =>
      topics.some(topic => topic.toLowerCase().includes(neetTopic.toLowerCase())) ||
      text.toLowerCase().includes(neetTopic.toLowerCase())
    )

    return Math.min(100, matches.length * 20 + topics.length * 5)
  }

  /**
   * Generate embeddings for content (requires OpenAI API)
   */
  async generateEmbeddings(content: BiologyContent[]): Promise<BiologyContent[]> {
    const enrichedContent: BiologyContent[] = []

    for (const item of content) {
      try {
        const response = await fetch('https://api.openai.com/v1/embeddings', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'text-embedding-ada-002',
            input: `${item.title}\n${item.content}`.substring(0, 8000)
          })
        })

        if (response.ok) {
          const result = await response.json()
          enrichedContent.push({
            ...item,
            embeddings: result.data[0].embedding
          })
        } else {
          enrichedContent.push(item)
        }
      } catch (error) {
        console.error('Embedding generation error for item:', item.id, error)
        enrichedContent.push(item)
      }
    }

    return enrichedContent
  }
}

// Usage example
export async function processBiologyTextbook(pdfPath: string) {
  const processor = new BiologyPDFProcessor()

  // Step 1: Extract content from PDF
  const content = await processor.processPDF(pdfPath)

  // Step 2: Generate embeddings
  const enrichedContent = await processor.generateEmbeddings(content)

  // Step 3: Store in database (implement based on your choice)
  // await storeToPinecone(enrichedContent)
  // or
  // await storeToPostgreSQL(enrichedContent)

  return enrichedContent
}