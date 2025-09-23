/**
 * NCERT Reference Service
 * Provides accurate NCERT textbook references for biology topics
 */

interface NCERTReference {
  class: '11' | '12'
  book: string
  chapter: number
  chapterTitle: string
  pageNumbers?: string
  section?: string
  url?: string
}

interface TopicMapping {
  topic: string
  subtopic?: string
  references: NCERTReference[]
  additionalNotes?: string
}

export class NCERTReferenceService {
  private topicDatabase: Map<string, TopicMapping> = new Map()

  constructor() {
    this.initializeDatabase()
  }

  /**
   * Find NCERT reference for a biology topic
   */
  async findReference(topic: string, subtopic?: string): Promise<string> {
    try {
      const normalizedTopic = this.normalizeTopicName(topic)
      const mapping = this.topicDatabase.get(normalizedTopic)

      if (mapping) {
        const references = this.filterReferences(mapping.references, subtopic)
        return this.formatReferences(references, mapping.additionalNotes)
      }

      // Fallback: search by keywords
      const fallbackReference = this.searchByKeywords(topic, subtopic)
      return fallbackReference || 'Refer to your NCERT Biology textbooks for detailed information.'
    } catch (error) {
      console.error('❌ NCERT reference lookup failed:', error)
      return 'Please check your NCERT Biology textbooks for this topic.'
    }
  }

  /**
   * Initialize the NCERT topic database
   */
  private initializeDatabase(): void {
    // Class 11 NCERT Biology topics
    this.addTopic('Cell Biology', 'Cell Structure', [
      {
        class: '11',
        book: 'Biology Textbook for Class XI',
        chapter: 8,
        chapterTitle: 'Cell: The Unit of Life',
        pageNumbers: 'Pages 130-165',
        section: 'Cell Theory, Prokaryotic and Eukaryotic Cells',
        url: 'https://ncert.nic.in/textbook/pdf/kebo108.pdf',
      },
    ])

    this.addTopic('Cell Biology', 'Cell Division', [
      {
        class: '11',
        book: 'Biology Textbook for Class XI',
        chapter: 10,
        chapterTitle: 'Cell Cycle and Cell Division',
        pageNumbers: 'Pages 180-195',
        section: 'Mitosis, Meiosis, Significance of Cell Division',
      },
    ])

    this.addTopic('Plant Biology', 'Photosynthesis', [
      {
        class: '11',
        book: 'Biology Textbook for Class XI',
        chapter: 13,
        chapterTitle: 'Photosynthesis in Higher Plants',
        pageNumbers: 'Pages 220-240',
        section: 'Light and Dark Reactions, C3 and C4 Pathways',
      },
    ])

    this.addTopic('Plant Biology', 'Respiration', [
      {
        class: '11',
        book: 'Biology Textbook for Class XI',
        chapter: 14,
        chapterTitle: 'Respiration in Plants',
        pageNumbers: 'Pages 242-258',
        section: 'Glycolysis, Krebs Cycle, Electron Transport Chain',
      },
    ])

    this.addTopic('Human Biology', 'Digestion', [
      {
        class: '11',
        book: 'Biology Textbook for Class XI',
        chapter: 16,
        chapterTitle: 'Digestion and Absorption',
        pageNumbers: 'Pages 280-295',
        section: 'Human Digestive System, Digestive Enzymes',
      },
    ])

    this.addTopic('Human Biology', 'Circulation', [
      {
        class: '11',
        book: 'Biology Textbook for Class XI',
        chapter: 18,
        chapterTitle: 'Body Fluids and Circulation',
        pageNumbers: 'Pages 300-315',
        section: 'Human Circulatory System, Heart Structure',
      },
    ])

    this.addTopic('Human Biology', 'Excretion', [
      {
        class: '11',
        book: 'Biology Textbook for Class XI',
        chapter: 19,
        chapterTitle: 'Excretory Products and their Elimination',
        pageNumbers: 'Pages 320-335',
        section: 'Human Excretory System, Kidney Function',
      },
    ])

    this.addTopic('Human Biology', 'Neural Control', [
      {
        class: '11',
        book: 'Biology Textbook for Class XI',
        chapter: 21,
        chapterTitle: 'Neural Control and Coordination',
        pageNumbers: 'Pages 350-370',
        section: 'Human Nervous System, Neuron Structure',
      },
    ])

    // Class 12 NCERT Biology topics
    this.addTopic('Genetics', 'Principles of Inheritance', [
      {
        class: '12',
        book: 'Biology Textbook for Class XII',
        chapter: 5,
        chapterTitle: 'Principles of Inheritance and Variation',
        pageNumbers: 'Pages 80-105',
        section: "Mendel's Laws, Chromosomal Theory",
      },
    ])

    this.addTopic('Genetics', 'Molecular Basis', [
      {
        class: '12',
        book: 'Biology Textbook for Class XII',
        chapter: 6,
        chapterTitle: 'Molecular Basis of Inheritance',
        pageNumbers: 'Pages 110-140',
        section: 'DNA Structure, Replication, Transcription, Translation',
      },
    ])

    this.addTopic('Evolution', 'Origin and Evolution', [
      {
        class: '12',
        book: 'Biology Textbook for Class XII',
        chapter: 7,
        chapterTitle: 'Evolution',
        pageNumbers: 'Pages 145-175',
        section: 'Origin of Life, Evidence of Evolution, Natural Selection',
      },
    ])

    this.addTopic('Human Biology', 'Human Health', [
      {
        class: '12',
        book: 'Biology Textbook for Class XII',
        chapter: 8,
        chapterTitle: 'Human Health and Disease',
        pageNumbers: 'Pages 180-205',
        section: 'Pathogens, Immunity, Cancer, AIDS',
      },
    ])

    this.addTopic('Reproduction', 'Sexual Reproduction', [
      {
        class: '12',
        book: 'Biology Textbook for Class XII',
        chapter: 2,
        chapterTitle: 'Sexual Reproduction in Flowering Plants',
        pageNumbers: 'Pages 25-50',
        section: 'Flower Structure, Pollination, Fertilization',
      },
    ])

    this.addTopic('Reproduction', 'Human Reproduction', [
      {
        class: '12',
        book: 'Biology Textbook for Class XII',
        chapter: 3,
        chapterTitle: 'Human Reproduction',
        pageNumbers: 'Pages 55-80',
        section: 'Male and Female Reproductive Systems',
      },
    ])

    this.addTopic('Ecology', 'Ecosystems', [
      {
        class: '12',
        book: 'Biology Textbook for Class XII',
        chapter: 14,
        chapterTitle: 'Ecosystem',
        pageNumbers: 'Pages 240-260',
        section: 'Energy Flow, Nutrient Cycling, Ecological Pyramids',
      },
    ])

    this.addTopic('Ecology', 'Biodiversity', [
      {
        class: '12',
        book: 'Biology Textbook for Class XII',
        chapter: 15,
        chapterTitle: 'Biodiversity and Conservation',
        pageNumbers: 'Pages 265-285',
        section: 'Biodiversity Patterns, Conservation Strategies',
      },
    ])

    this.addTopic('Biotechnology', 'Principles and Processes', [
      {
        class: '12',
        book: 'Biology Textbook for Class XII',
        chapter: 11,
        chapterTitle: 'Biotechnology: Principles and Processes',
        pageNumbers: 'Pages 200-220',
        section: 'Recombinant DNA Technology, PCR, Cloning',
      },
    ])

    this.addTopic('Biotechnology', 'Applications', [
      {
        class: '12',
        book: 'Biology Textbook for Class XII',
        chapter: 12,
        chapterTitle: 'Biotechnology and its Applications',
        pageNumbers: 'Pages 225-240',
        section: 'Medical Applications, Agricultural Applications',
      },
    ])

    console.log(`📚 Initialized NCERT database with ${this.topicDatabase.size} topics`)
  }

  private addTopic(
    topic: string,
    subtopic: string,
    references: NCERTReference[],
    additionalNotes?: string
  ): void {
    const key = this.normalizeTopicName(topic)
    const existing = this.topicDatabase.get(key)

    if (existing) {
      existing.references.push(...references)
    } else {
      this.topicDatabase.set(key, {
        topic,
        subtopic,
        references,
        additionalNotes,
      })
    }
  }

  private normalizeTopicName(topic: string): string {
    return topic
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
  }

  private filterReferences(references: NCERTReference[], subtopic?: string): NCERTReference[] {
    if (!subtopic) return references

    const normalizedSubtopic = this.normalizeTopicName(subtopic)

    return references.filter((ref) => {
      const refSection = this.normalizeTopicName(ref.section || '')
      const refTitle = this.normalizeTopicName(ref.chapterTitle)

      return (
        refSection.includes(normalizedSubtopic) ||
        refTitle.includes(normalizedSubtopic) ||
        normalizedSubtopic.includes(refTitle.split(' ')[0])
      )
    })
  }

  private formatReferences(references: NCERTReference[], additionalNotes?: string): string {
    if (references.length === 0) {
      return 'Refer to your NCERT Biology textbooks for detailed information.'
    }

    let formatted = '📚 **NCERT References:**\n\n'

    references.forEach((ref, index) => {
      formatted += `${index + 1}. **Class ${ref.class} Biology**\n`
      formatted += `   📖 Chapter ${ref.chapter}: ${ref.chapterTitle}\n`

      if (ref.pageNumbers) {
        formatted += `   📄 ${ref.pageNumbers}\n`
      }

      if (ref.section) {
        formatted += `   📌 Focus: ${ref.section}\n`
      }

      if (ref.url) {
        formatted += `   🔗 [PDF Link](${ref.url})\n`
      }

      formatted += '\n'
    })

    if (additionalNotes) {
      formatted += `💡 **Additional Notes:** ${additionalNotes}\n\n`
    }

    formatted += '🎯 **NEET Tip:** These chapters are frequently tested in NEET Biology!'

    return formatted
  }

  private searchByKeywords(topic: string, subtopic?: string): string | null {
    const searchTerms = [topic, subtopic].filter(Boolean).join(' ').toLowerCase()

    // Common keyword mappings
    const keywordMappings: Record<string, string> = {
      mitochondria: 'Cell Biology',
      chloroplast: 'Plant Biology',
      dna: 'Genetics',
      heart: 'Human Biology',
      kidney: 'Human Biology',
      flower: 'Reproduction',
      ecosystem: 'Ecology',
      enzyme: 'Biochemistry',
      hormone: 'Chemical Coordination',
      'nervous system': 'Neural Control',
      immunity: 'Human Health',
      cancer: 'Human Health',
      biotechnology: 'Biotechnology',
      evolution: 'Evolution',
    }

    for (const [keyword, mappedTopic] of Object.entries(keywordMappings)) {
      if (searchTerms.includes(keyword)) {
        const normalizedTopic = this.normalizeTopicName(mappedTopic)
        const mapping = this.topicDatabase.get(normalizedTopic)

        if (mapping) {
          return this.formatReferences(mapping.references, mapping.additionalNotes)
        }
      }
    }

    return null
  }

  /**
   * Get all available topics with their references
   */
  getAllTopics(): Array<{ topic: string; subtopics: string[]; classLevel: string[] }> {
    const topics: Array<{ topic: string; subtopics: string[]; classLevel: string[] }> = []

    for (const mapping of this.topicDatabase.values()) {
      const existing = topics.find((t) => t.topic === mapping.topic)
      const classLevels = mapping.references.map((ref) => `Class ${ref.class}`)

      if (existing) {
        if (mapping.subtopic && !existing.subtopics.includes(mapping.subtopic)) {
          existing.subtopics.push(mapping.subtopic)
        }
        classLevels.forEach((level) => {
          if (!existing.classLevel.includes(level)) {
            existing.classLevel.push(level)
          }
        })
      } else {
        topics.push({
          topic: mapping.topic,
          subtopics: mapping.subtopic ? [mapping.subtopic] : [],
          classLevel: classLevels,
        })
      }
    }

    return topics.sort((a, b) => a.topic.localeCompare(b.topic))
  }

  /**
   * Get study schedule based on NCERT curriculum
   */
  getStudySchedule(neetYear: string): Array<{
    month: string
    topics: string[]
    chapters: string[]
    priority: 'high' | 'medium' | 'low'
  }> {
    const currentDate = new Date()
    const targetYear = parseInt(neetYear)
    const monthsToNeet =
      (targetYear - currentDate.getFullYear()) * 12 + (5 - currentDate.getMonth()) // NEET is in May

    if (monthsToNeet <= 0) {
      return this.getRevisionSchedule()
    }

    return this.getFullSchedule(monthsToNeet)
  }

  private getRevisionSchedule(): Array<{
    month: string
    topics: string[]
    chapters: string[]
    priority: 'high' | 'medium' | 'low'
  }> {
    return [
      {
        month: 'Revision Phase',
        topics: ['High Weightage Topics', 'Previous Year Questions', 'Mock Tests'],
        chapters: ['All important chapters from Class 11 & 12'],
        priority: 'high',
      },
    ]
  }

  private getFullSchedule(monthsAvailable: number): Array<{
    month: string
    topics: string[]
    chapters: string[]
    priority: 'high' | 'medium' | 'low'
  }> {
    // This is a simplified schedule - in practice, you'd have a more detailed curriculum
    const schedule = [
      {
        month: 'Month 1-2',
        topics: ['Cell Biology', 'Biomolecules'],
        chapters: ['Ch 8: Cell - Unit of Life', 'Ch 9: Biomolecules'],
        priority: 'high' as const,
      },
      {
        month: 'Month 3-4',
        topics: ['Plant Physiology', 'Human Physiology'],
        chapters: ['Ch 13-15: Plant processes', 'Ch 16-22: Human processes'],
        priority: 'high' as const,
      },
      {
        month: 'Month 5-6',
        topics: ['Reproduction', 'Genetics'],
        chapters: ['Ch 1-4: Reproduction', 'Ch 5-6: Inheritance'],
        priority: 'high' as const,
      },
      {
        month: 'Month 7-8',
        topics: ['Evolution', 'Human Health'],
        chapters: ['Ch 7: Evolution', 'Ch 8: Health and Disease'],
        priority: 'medium' as const,
      },
      {
        month: 'Month 9-10',
        topics: ['Ecology', 'Biotechnology'],
        chapters: ['Ch 13-16: Environmental Biology', 'Ch 11-12: Biotechnology'],
        priority: 'medium' as const,
      },
    ]

    return schedule.slice(0, Math.min(monthsAvailable, schedule.length))
  }
}
