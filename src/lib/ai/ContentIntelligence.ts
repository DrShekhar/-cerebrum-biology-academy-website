/**
 * Content Intelligence System - AI-Powered Study Material Generation
 * Auto-generates notes, diagrams, flowcharts with multilingual support
 */

import { aiConfig } from './aiConfig'
import { AIGateway } from './gateway/AIGateway'
import { DistributedCacheManager } from '../cache/DistributedCacheManager'

export interface StudyMaterial {
  id: string
  type: 'notes' | 'summary' | 'flashcard' | 'diagram' | 'flowchart' | 'mnemonic' | 'concept_map'
  title: string
  content: string
  metadata: {
    topic: string
    subtopic: string
    curriculum: string
    grade: string
    difficulty: 'basic' | 'intermediate' | 'advanced'
    estimatedReadTime: number // minutes
    language: 'english' | 'hindi' | 'bilingual'
    visualElements: string[]
    tags: string[]
    examRelevance: number // 1-10
    createdAt: Date
    lastUpdated: Date
    version: string
  }
  structure: {
    sections: ContentSection[]
    keyPoints: string[]
    examples: string[]
    applications: string[]
    commonMistakes: string[]
  }
  multimedia: {
    diagrams: DiagramSpec[]
    animations: string[]
    videos: string[]
    interactiveElements: string[]
  }
  personalization: {
    learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading'
    adaptedFor: string[] // student IDs or profiles
    difficultyLevel: number
    prerequisites: string[]
  }
  analytics: {
    usage: number
    effectiveness: number
    studentFeedback: number
    comprehensionRate: number
  }
}

export interface ContentSection {
  id: string
  title: string
  content: string
  type: 'introduction' | 'concept' | 'example' | 'application' | 'summary'
  order: number
  estimatedTime: number
  visualAids: string[]
  interactiveElements: string[]
}

export interface DiagramSpec {
  id: string
  title: string
  type: 'structure' | 'process' | 'cycle' | 'comparison' | 'hierarchy' | 'network'
  description: string
  components: DiagramComponent[]
  labels: DiagramLabel[]
  connections: DiagramConnection[]
  style: {
    layout: 'horizontal' | 'vertical' | 'circular' | 'hierarchical'
    colorScheme: string
    complexity: 'simple' | 'detailed' | 'comprehensive'
  }
  annotations: {
    callouts: string[]
    explanations: string[]
    mnemonics: string[]
  }
}

export interface DiagramComponent {
  id: string
  name: string
  type: 'organelle' | 'molecule' | 'process' | 'organism' | 'system'
  position: { x: number; y: number }
  size: { width: number; height: number }
  properties: Record<string, any>
  description: string
}

export interface DiagramLabel {
  id: string
  text: string
  position: { x: number; y: number }
  componentId?: string
  style: {
    fontSize: number
    color: string
    fontWeight: 'normal' | 'bold'
  }
}

export interface DiagramConnection {
  id: string
  from: string
  to: string
  type: 'arrow' | 'line' | 'dashed' | 'bidirectional'
  label?: string
  description?: string
}

export interface ConceptMap {
  id: string
  title: string
  centralConcept: string
  concepts: ConceptNode[]
  relationships: ConceptRelationship[]
  levels: number
  layout: 'radial' | 'hierarchical' | 'network'
  metadata: {
    topic: string
    curriculum: string
    grade: string
    complexity: number
    createdAt: Date
  }
}

export interface ConceptNode {
  id: string
  name: string
  description: string
  level: number
  position: { x: number; y: number }
  type: 'primary' | 'secondary' | 'tertiary'
  examples: string[]
  importance: number // 1-10
}

export interface ConceptRelationship {
  id: string
  from: string
  to: string
  type: 'is_a' | 'part_of' | 'causes' | 'leads_to' | 'similar_to' | 'opposite_of'
  strength: number // 1-10
  description: string
}

export interface MnemonicDevice {
  id: string
  topic: string
  concept: string
  type: 'acronym' | 'rhyme' | 'story' | 'visual' | 'word_association' | 'memory_palace'
  content: string
  explanation: string
  effectiveness: number
  difficulty: 'easy' | 'medium' | 'hard'
  language: 'english' | 'hindi' | 'bilingual'
  usage: number
  studentRating: number
}

class ContentIntelligence {
  private static instance: ContentIntelligence
  private aiGateway: AIGateway
  private cache: DistributedCacheManager
  private generatedContent: Map<string, StudyMaterial> = new Map()
  private conceptMaps: Map<string, ConceptMap> = new Map()
  private mnemonics: Map<string, MnemonicDevice> = new Map()

  constructor() {
    this.aiGateway = new AIGateway()
    this.cache = new DistributedCacheManager()
  }

  static getInstance(): ContentIntelligence {
    if (!ContentIntelligence.instance) {
      ContentIntelligence.instance = new ContentIntelligence()
    }
    return ContentIntelligence.instance
  }

  async generateStudyNotes(params: {
    topic: string
    subtopic?: string
    curriculum: string
    grade: string
    difficulty: 'basic' | 'intermediate' | 'advanced'
    language: 'english' | 'hindi' | 'bilingual'
    learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading'
    length: 'brief' | 'detailed' | 'comprehensive'
  }): Promise<StudyMaterial> {
    const cacheKey = `notes_${JSON.stringify(params)}`
    const cached = await this.cache.get(cacheKey)

    if (cached) {
      return JSON.parse(cached as string)
    }

    try {
      const notes = await this.generateAIStudyNotes(params)

      // Cache for 7 days
      await this.cache.set(cacheKey, JSON.stringify(notes), 604800)

      // Store in memory
      this.generatedContent.set(notes.id, notes)

      return notes
    } catch (error) {
      console.error('Study notes generation failed:', error)
      throw new Error('Failed to generate study notes')
    }
  }

  private async generateAIStudyNotes(params: any): Promise<StudyMaterial> {
    const systemPrompt = `You are an expert Biology content creator specializing in ${params.curriculum} curriculum for Grade ${params.grade}.

Your expertise:
- 15+ years in Biology education
- Expert in visual learning techniques
- Multilingual content creation (English/Hindi)
- Specialized in ${params.learningStyle} learning style
- 98% student success rate

Create comprehensive study notes that are:
1. Scientifically accurate and up-to-date
2. Aligned with ${params.curriculum} syllabus
3. Appropriate for ${params.difficulty} level
4. Optimized for ${params.learningStyle} learners
5. ${params.language === 'bilingual' ? 'Include both English and Hindi terms' : `Written in ${params.language}`}
6. Exam-focused with NEET/board exam relevance

Guidelines:
- Use clear, student-friendly language
- Include memory techniques and mnemonics
- Provide real-world applications
- Highlight exam-important points
- Structure content logically
- Include visual descriptions for diagrams
`

    const userPrompt = `
Topic: ${params.topic}
${params.subtopic ? `Subtopic: ${params.subtopic}` : ''}
Curriculum: ${params.curriculum}
Grade: ${params.grade}
Difficulty: ${params.difficulty}
Length: ${params.length}
Language: ${params.language}
Learning Style: ${params.learningStyle}

Create comprehensive study notes with the following structure:

1. **Introduction & Overview**
   - Brief introduction to the topic
   - Why it's important in Biology
   - Connection to other topics

2. **Key Concepts** (Main content)
   - Clear definitions
   - Detailed explanations
   - Scientific principles
   - Important facts and figures

3. **Visual Elements**
   - Descriptions of important diagrams
   - Flowcharts and processes
   - Comparative tables
   - Mind maps

4. **Memory Techniques**
   - Mnemonics for difficult terms
   - Acronyms for processes
   - Visual memory aids
   - Story-based memorization

5. **Examples & Applications**
   - Real-world examples
   - Practical applications
   - Case studies
   - Current research relevance

6. **Exam Focus**
   - Important questions pattern
   - Marking scheme insights
   - Time management tips
   - Common mistakes to avoid

7. **Quick Revision Points**
   - Key formulae (if any)
   - Important definitions
   - Critical facts
   - Must-remember points

${
  params.language === 'bilingual'
    ? `
8. **Bilingual Terminology**
   - English-Hindi translation of key terms
   - Pronunciation guides
   - Regional variations in terminology
`
    : ''
}

Format the response as detailed, well-structured content that students can use for effective studying.
`

    const response: string = await this.aiGateway.generateResponse({
      prompt: `${systemPrompt}\n\n${userPrompt}`,
      provider: aiConfig.getBestProvider() as 'claude' | 'openai',
      model: 'default',
      temperature: 0.7,
      maxTokens: 3000,
    })

    const notes: StudyMaterial = {
      id: `notes_${Date.now()}`,
      type: 'notes',
      title: `${params.topic} - ${params.curriculum} Grade ${params.grade}`,
      content: response,
      metadata: {
        topic: params.topic,
        subtopic: params.subtopic || '',
        curriculum: params.curriculum,
        grade: params.grade,
        difficulty: params.difficulty,
        estimatedReadTime: this.calculateReadTime(response),
        language: params.language,
        visualElements: this.extractVisualElements(response),
        tags: this.generateTags(params.topic, params.subtopic),
        examRelevance: this.calculateExamRelevance(params.topic, params.curriculum),
        createdAt: new Date(),
        lastUpdated: new Date(),
        version: '1.0',
      },
      structure: {
        sections: this.parseContentSections(response),
        keyPoints: this.extractKeyPoints(response),
        examples: this.extractExamples(response),
        applications: this.extractApplications(response),
        commonMistakes: this.extractCommonMistakes(response),
      },
      multimedia: {
        diagrams: this.suggestDiagrams(params.topic),
        animations: [],
        videos: [],
        interactiveElements: [],
      },
      personalization: {
        learningStyle: params.learningStyle,
        adaptedFor: [],
        difficultyLevel: this.mapDifficultyToNumber(params.difficulty),
        prerequisites: this.identifyPrerequisites(params.topic),
      },
      analytics: {
        usage: 0,
        effectiveness: 0,
        studentFeedback: 0,
        comprehensionRate: 0,
      },
    }

    return notes
  }

  async generateDiagram(params: {
    topic: string
    diagramType: DiagramSpec['type']
    complexity: 'simple' | 'detailed' | 'comprehensive'
    curriculum: string
    grade: string
    style?: 'schematic' | 'realistic' | 'simplified'
  }): Promise<DiagramSpec> {
    const cacheKey = `diagram_${JSON.stringify(params)}`
    const cached = await this.cache.get(cacheKey)

    if (cached) {
      return JSON.parse(cached as string)
    }

    const diagramPrompt = `
Create a detailed diagram specification for Biology education.

Topic: ${params.topic}
Type: ${params.diagramType}
Complexity: ${params.complexity}
Curriculum: ${params.curriculum}
Grade: ${params.grade}
Style: ${params.style || 'schematic'}

Design a ${params.diagramType} diagram that:
1. Is scientifically accurate
2. Appropriate for Grade ${params.grade} students
3. Follows ${params.curriculum} curriculum standards
4. Uses clear, educational labeling
5. Includes proper proportions and relationships

Provide the diagram specification in JSON format:
{
  "title": "string",
  "description": "string",
  "components": [
    {
      "name": "string",
      "type": "string",
      "position": {"x": number, "y": number},
      "size": {"width": number, "height": number},
      "description": "string",
      "properties": {}
    }
  ],
  "labels": [
    {
      "text": "string",
      "position": {"x": number, "y": number},
      "componentId": "string",
      "style": {"fontSize": number, "color": "string", "fontWeight": "string"}
    }
  ],
  "connections": [
    {
      "from": "string",
      "to": "string",
      "type": "string",
      "label": "string",
      "description": "string"
    }
  ],
  "annotations": {
    "callouts": ["string"],
    "explanations": ["string"],
    "mnemonics": ["string"]
  }
}
`

    try {
      const response: string = await this.aiGateway.generateResponse({
        prompt: diagramPrompt,
        provider: aiConfig.getBestProvider() as 'claude' | 'openai',
        model: 'default',
        temperature: 0.5,
        maxTokens: 2000,
      })

      const parsed = JSON.parse(response)

      const diagram: DiagramSpec = {
        id: `diagram_${Date.now()}`,
        title: parsed.title,
        type: params.diagramType,
        description: parsed.description,
        components: parsed.components || [],
        labels: parsed.labels || [],
        connections: parsed.connections || [],
        style: {
          layout: this.inferLayout(params.diagramType),
          colorScheme: 'educational',
          complexity: params.complexity,
        },
        annotations: parsed.annotations || { callouts: [], explanations: [], mnemonics: [] },
      }

      // Cache for 30 days
      await this.cache.set(cacheKey, JSON.stringify(diagram), 2592000)

      return diagram
    } catch (error) {
      console.error('Diagram generation failed:', error)
      throw new Error('Failed to generate diagram specification')
    }
  }

  async generateMnemonic(params: {
    concept: string
    topic: string
    type: MnemonicDevice['type']
    language: 'english' | 'hindi' | 'bilingual'
    difficulty: 'easy' | 'medium' | 'hard'
  }): Promise<MnemonicDevice> {
    const mnemonicPrompt = `
Create an effective mnemonic device for Biology learning.

Concept: ${params.concept}
Topic: ${params.topic}
Type: ${params.type}
Language: ${params.language}
Difficulty: ${params.difficulty}

Guidelines:
1. Make it memorable and fun
2. Scientifically accurate
3. Age-appropriate for high school students
4. Culturally relevant for Indian students
5. Easy to recall during exams

${params.language === 'bilingual' ? 'Include both English and Hindi elements where appropriate.' : ''}

Provide a creative and effective mnemonic that helps students remember ${params.concept}.

Format as JSON:
{
  "content": "The mnemonic device",
  "explanation": "How to use it and why it works",
  "example": "Example of applying the mnemonic"
}
`

    try {
      const response: string = await this.aiGateway.generateResponse({
        prompt: mnemonicPrompt,
        provider: aiConfig.getBestProvider() as 'claude' | 'openai',
        model: 'default',
        temperature: 0.8,
        maxTokens: 800,
      })

      const parsed = JSON.parse(response)

      const mnemonic: MnemonicDevice = {
        id: `mnemonic_${Date.now()}`,
        topic: params.topic,
        concept: params.concept,
        type: params.type,
        content: parsed.content,
        explanation: parsed.explanation,
        effectiveness: 0,
        difficulty: params.difficulty,
        language: params.language,
        usage: 0,
        studentRating: 0,
      }

      this.mnemonics.set(mnemonic.id, mnemonic)

      return mnemonic
    } catch (error) {
      console.error('Mnemonic generation failed:', error)
      throw new Error('Failed to generate mnemonic device')
    }
  }

  async generateConceptMap(params: {
    centralConcept: string
    topic: string
    curriculum: string
    grade: string
    depth: number
    layout: 'radial' | 'hierarchical' | 'network'
  }): Promise<ConceptMap> {
    // Implementation for concept map generation
    const conceptMap: ConceptMap = {
      id: `concept_map_${Date.now()}`,
      title: `${params.centralConcept} - Concept Map`,
      centralConcept: params.centralConcept,
      concepts: [],
      relationships: [],
      levels: params.depth,
      layout: params.layout,
      metadata: {
        topic: params.topic,
        curriculum: params.curriculum,
        grade: params.grade,
        complexity: params.depth,
        createdAt: new Date(),
      },
    }

    this.conceptMaps.set(conceptMap.id, conceptMap)
    return conceptMap
  }

  // Helper methods
  private calculateReadTime(content: string): number {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  private extractVisualElements(content: string): string[] {
    const elements: string[] = []
    const visualKeywords = [
      'diagram',
      'flowchart',
      'table',
      'graph',
      'chart',
      'figure',
      'illustration',
    ]

    for (const keyword of visualKeywords) {
      if (content.toLowerCase().includes(keyword)) {
        elements.push(keyword)
      }
    }

    return [...new Set(elements)]
  }

  private generateTags(topic: string, subtopic?: string): string[] {
    const tags = [topic.toLowerCase().replace(/\s+/g, '-')]
    if (subtopic) {
      tags.push(subtopic.toLowerCase().replace(/\s+/g, '-'))
    }
    return tags
  }

  private calculateExamRelevance(topic: string, curriculum: string): number {
    // Implementation for calculating exam relevance score
    const relevanceMap: Record<string, Record<string, number>> = {
      NEET: {
        genetics: 10,
        'cell-biology': 9,
        ecology: 7,
        'human-physiology': 10,
      },
      CBSE: {
        genetics: 9,
        'cell-biology': 8,
        ecology: 8,
        'human-physiology': 9,
      },
    }

    return relevanceMap[curriculum]?.[topic.toLowerCase()] || 5
  }

  private parseContentSections(content: string): ContentSection[] {
    // Implementation for parsing content into sections
    return []
  }

  private extractKeyPoints(content: string): string[] {
    // Implementation for extracting key points
    return []
  }

  private extractExamples(content: string): string[] {
    // Implementation for extracting examples
    return []
  }

  private extractApplications(content: string): string[] {
    // Implementation for extracting applications
    return []
  }

  private extractCommonMistakes(content: string): string[] {
    // Implementation for extracting common mistakes
    return []
  }

  private suggestDiagrams(topic: string): DiagramSpec[] {
    // Implementation for suggesting relevant diagrams
    return []
  }

  private mapDifficultyToNumber(difficulty: string): number {
    const map = { basic: 3, intermediate: 6, advanced: 9 }
    return map[difficulty as keyof typeof map] || 5
  }

  private identifyPrerequisites(topic: string): string[] {
    // Implementation for identifying prerequisites
    return []
  }

  private inferLayout(diagramType: DiagramSpec['type']): DiagramSpec['style']['layout'] {
    const layoutMap: Record<DiagramSpec['type'], DiagramSpec['style']['layout']> = {
      structure: 'hierarchical',
      process: 'horizontal',
      cycle: 'circular',
      comparison: 'horizontal',
      hierarchy: 'hierarchical',
      network: 'hierarchical',
    }

    return layoutMap[diagramType] || 'hierarchical'
  }

  // Content management methods
  async getStudyMaterial(id: string): Promise<StudyMaterial | null> {
    return this.generatedContent.get(id) || null
  }

  async searchContent(query: {
    topic?: string
    curriculum?: string
    grade?: string
    type?: StudyMaterial['type']
    difficulty?: string
    language?: string
  }): Promise<StudyMaterial[]> {
    const materials = Array.from(this.generatedContent.values())

    return materials.filter((material) => {
      return (
        (!query.topic ||
          material.metadata.topic.toLowerCase().includes(query.topic.toLowerCase())) &&
        (!query.curriculum || material.metadata.curriculum === query.curriculum) &&
        (!query.grade || material.metadata.grade === query.grade) &&
        (!query.type || material.type === query.type) &&
        (!query.difficulty || material.metadata.difficulty === query.difficulty) &&
        (!query.language || material.metadata.language === query.language)
      )
    })
  }

  async updateContentAnalytics(
    contentId: string,
    analytics: Partial<StudyMaterial['analytics']>
  ): Promise<void> {
    const material = this.generatedContent.get(contentId)
    if (material) {
      Object.assign(material.analytics, analytics)
      this.generatedContent.set(contentId, material)
    }
  }
}

export const contentIntelligence = ContentIntelligence.getInstance()
export default contentIntelligence
