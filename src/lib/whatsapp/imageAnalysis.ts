/**
 * Image Analysis Service for Biology Diagrams
 * Analyzes WhatsApp images to identify biological structures and concepts
 */

import OpenAI from 'openai'
import { Anthropic } from '@anthropic-ai/sdk'

let openai: OpenAI | null = null
let anthropic: Anthropic | null = null

function getOpenAI(): OpenAI {
  if (!openai && process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  }
  if (!openai) {
    throw new Error('OpenAI API key not configured')
  }
  return openai
}

function getClaude(): Anthropic {
  if (!anthropic && process.env.ANTHROPIC_API_KEY) {
    anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })
  }
  if (!anthropic) {
    throw new Error('Anthropic API key not configured')
  }
  return anthropic
}

interface BiologyImageAnalysis {
  topic: string
  subtopic: string
  identifiedStructures: string[]
  confidence: number
  difficulty: 'basic' | 'intermediate' | 'advanced'
  neetRelevance: string
  suggestedQuestions: string[]
  detectedText?: string
  analysisMethod: 'gpt-vision' | 'claude-vision' | 'hybrid'
}

export class ImageAnalysisService {
  /**
   * Analyze biology diagram or image sent via WhatsApp
   */
  async analyzeBiologyDiagram(imageUrl: string, caption?: string): Promise<BiologyImageAnalysis> {
    try {
      console.log('📸 Starting biology image analysis...')

      // Try multiple AI models for robust analysis
      const gptAnalysis = await this.analyzeWithGPTVision(imageUrl, caption)
      const claudeAnalysis = await this.analyzeWithClaudeVision(imageUrl, caption)

      // Combine insights from both models
      const hybridAnalysis = this.combineAnalyses(gptAnalysis, claudeAnalysis, caption)

      console.log(
        `✅ Image analysis completed: ${hybridAnalysis.topic} (${hybridAnalysis.confidence}% confidence)`
      )
      return hybridAnalysis
    } catch (error) {
      console.error('❌ Image analysis failed:', error)

      // Fallback analysis based on caption
      if (caption) {
        return this.fallbackAnalysisFromCaption(caption)
      }

      throw new Error('Failed to analyze biology image')
    }
  }

  private async analyzeWithGPTVision(
    imageUrl: string,
    caption?: string
  ): Promise<Partial<BiologyImageAnalysis>> {
    try {
      const response = await getOpenAI().chat.completions.create({
        model: 'gpt-4-vision-preview',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `You are an expert biology teacher analyzing a student's image for NEET preparation.

                ${caption ? `Student's caption: "${caption}"` : 'No caption provided'}

                Analyze this biology image and provide detailed information in JSON format:
                {
                  "topic": "main biology topic",
                  "subtopic": "specific subtopic",
                  "identifiedStructures": ["structure1", "structure2", "structure3"],
                  "confidence": 0.0-1.0,
                  "difficulty": "basic/intermediate/advanced",
                  "neetRelevance": "specific NEET importance and marks",
                  "suggestedQuestions": ["question1", "question2", "question3"],
                  "detectedText": "any text visible in image"
                }

                Focus on:
                - Identifying biological structures, organs, cells, or processes
                - Determining NEET Biology relevance
                - Suggesting educational questions about the image
                - Reading any text/labels in the diagram`,
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageUrl,
                },
              },
            ],
          },
        ],
        max_tokens: 1000,
      })

      const content = response.choices[0]?.message?.content
      if (content) {
        return JSON.parse(content)
      }

      throw new Error('No response from GPT Vision')
    } catch (error) {
      console.error('GPT Vision analysis failed:', error)
      return {}
    }
  }

  private async analyzeWithClaudeVision(
    imageUrl: string,
    caption?: string
  ): Promise<Partial<BiologyImageAnalysis>> {
    try {
      // Download image and convert to base64 for Claude
      const imageBase64 = await this.downloadAndEncodeImage(imageUrl)

      const response = await getClaude().messages.create({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: 'image/jpeg',
                  data: imageBase64,
                },
              },
              {
                type: 'text',
                text: `You are Shekhar Sir, expert NEET Biology teacher. Analyze this student's biology image.

                ${caption ? `Student wrote: "${caption}"` : 'No caption provided'}

                Provide analysis in JSON format:
                {
                  "topic": "main biology topic (e.g., Cell Biology, Plant Physiology)",
                  "subtopic": "specific area (e.g., Mitochondrial Structure)",
                  "identifiedStructures": ["list", "of", "biological", "structures"],
                  "confidence": 0.0-1.0,
                  "difficulty": "basic/intermediate/advanced",
                  "neetRelevance": "How important for NEET exam with marks info",
                  "suggestedQuestions": ["What questions should student ask?"],
                  "detectedText": "any visible text/labels"
                }

                Focus on NEET Biology syllabus relevance and educational value.`,
              },
            ],
          },
        ],
      })

      const content = response.content[0]
      if (content.type === 'text') {
        return JSON.parse(content.text)
      }

      throw new Error('No response from Claude Vision')
    } catch (error) {
      console.error('Claude Vision analysis failed:', error)
      return {}
    }
  }

  private async downloadAndEncodeImage(imageUrl: string): Promise<string> {
    try {
      const response = await fetch(imageUrl, {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          'User-Agent': 'Cerebrum-Biology-Academy/1.0',
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to download image: ${response.status}`)
      }

      const arrayBuffer = await response.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      return buffer.toString('base64')
    } catch (error) {
      console.error('Image download/encoding failed:', error)
      throw error
    }
  }

  private combineAnalyses(
    gptAnalysis: Partial<BiologyImageAnalysis>,
    claudeAnalysis: Partial<BiologyImageAnalysis>,
    caption?: string
  ): BiologyImageAnalysis {
    // Prefer the analysis with higher confidence, fallback to GPT if equal
    const primaryAnalysis =
      (claudeAnalysis.confidence || 0) > (gptAnalysis.confidence || 0)
        ? claudeAnalysis
        : gptAnalysis

    const secondaryAnalysis = primaryAnalysis === gptAnalysis ? claudeAnalysis : gptAnalysis

    // Combine structures from both analyses
    const combinedStructures = [
      ...(primaryAnalysis.identifiedStructures || []),
      ...(secondaryAnalysis.identifiedStructures || []),
    ]

    // Remove duplicates and limit to top 6
    const uniqueStructures = [...new Set(combinedStructures)].slice(0, 6)

    // Combine suggested questions
    const combinedQuestions = [
      ...(primaryAnalysis.suggestedQuestions || []),
      ...(secondaryAnalysis.suggestedQuestions || []),
    ]

    const uniqueQuestions = [...new Set(combinedQuestions)].slice(0, 5)

    return {
      topic: primaryAnalysis.topic || secondaryAnalysis.topic || 'General Biology',
      subtopic: primaryAnalysis.subtopic || secondaryAnalysis.subtopic || 'Diagram Analysis',
      identifiedStructures: uniqueStructures,
      confidence: Math.max(primaryAnalysis.confidence || 0.6, secondaryAnalysis.confidence || 0.6),
      difficulty: primaryAnalysis.difficulty || secondaryAnalysis.difficulty || 'intermediate',
      neetRelevance:
        primaryAnalysis.neetRelevance ||
        secondaryAnalysis.neetRelevance ||
        'Relevant for NEET Biology preparation',
      suggestedQuestions: uniqueQuestions,
      detectedText: primaryAnalysis.detectedText || secondaryAnalysis.detectedText,
      analysisMethod: 'hybrid',
    }
  }

  private fallbackAnalysisFromCaption(caption: string): BiologyImageAnalysis {
    // Extract biology keywords from caption
    const biologyKeywords = {
      cell: { topic: 'Cell Biology', subtopic: 'Cell Structure' },
      plant: { topic: 'Plant Biology', subtopic: 'Plant Structure' },
      animal: { topic: 'Animal Biology', subtopic: 'Animal Structure' },
      human: { topic: 'Human Biology', subtopic: 'Human Anatomy' },
      heart: { topic: 'Human Biology', subtopic: 'Circulatory System' },
      brain: { topic: 'Human Biology', subtopic: 'Nervous System' },
      leaf: { topic: 'Plant Biology', subtopic: 'Leaf Structure' },
      flower: { topic: 'Plant Biology', subtopic: 'Reproductive System' },
      dna: { topic: 'Genetics', subtopic: 'DNA Structure' },
      chromosome: { topic: 'Genetics', subtopic: 'Chromosomal Structure' },
      mitochondria: { topic: 'Cell Biology', subtopic: 'Cell Organelles' },
      chloroplast: { topic: 'Plant Biology', subtopic: 'Photosynthesis' },
    }

    const lowerCaption = caption.toLowerCase()
    let detectedTopic = { topic: 'General Biology', subtopic: 'Diagram Analysis' }

    for (const [keyword, topicInfo] of Object.entries(biologyKeywords)) {
      if (lowerCaption.includes(keyword)) {
        detectedTopic = topicInfo
        break
      }
    }

    return {
      topic: detectedTopic.topic,
      subtopic: detectedTopic.subtopic,
      identifiedStructures: this.extractStructuresFromCaption(caption),
      confidence: 0.4, // Lower confidence for caption-only analysis
      difficulty: 'intermediate',
      neetRelevance: 'This topic appears in NEET Biology syllabus',
      suggestedQuestions: [
        `Can you explain the structures visible in this ${detectedTopic.topic.toLowerCase()} diagram?`,
        'What is the function of each labeled part?',
        'How is this relevant for NEET preparation?',
      ],
      detectedText: caption,
      analysisMethod: 'claude-vision',
    }
  }

  private extractStructuresFromCaption(caption: string): string[] {
    const commonStructures = [
      'nucleus',
      'cytoplasm',
      'membrane',
      'mitochondria',
      'chloroplast',
      'ribosome',
      'endoplasmic reticulum',
      'golgi apparatus',
      'lysosome',
      'cell wall',
      'vacuole',
      'stomata',
      'xylem',
      'phloem',
      'epidermis',
      'root',
      'stem',
      'leaf',
      'flower',
      'petal',
      'sepal',
      'stamen',
      'pistil',
      'heart',
      'artery',
      'vein',
      'capillary',
      'ventricle',
      'atrium',
      'neuron',
      'dendrite',
      'axon',
      'synapse',
      'brain',
      'spinal cord',
    ]

    const lowerCaption = caption.toLowerCase()
    return commonStructures
      .filter((structure) => lowerCaption.includes(structure.toLowerCase()))
      .slice(0, 5)
  }

  /**
   * Validate if image analysis makes sense for biology education
   */
  private validateBiologyRelevance(analysis: BiologyImageAnalysis): boolean {
    const biologyTopics = [
      'cell biology',
      'plant biology',
      'animal biology',
      'human biology',
      'genetics',
      'ecology',
      'evolution',
      'molecular biology',
      'biochemistry',
      'physiology',
      'anatomy',
      'botany',
      'zoology',
      'microbiology',
    ]

    const topic = analysis.topic.toLowerCase()
    return biologyTopics.some((validTopic) => topic.includes(validTopic))
  }

  /**
   * Enhanced analysis with validation and quality scoring
   */
  async analyzeWithQualityCheck(
    imageUrl: string,
    caption?: string
  ): Promise<{
    analysis: BiologyImageAnalysis
    qualityScore: number
    isValidBiology: boolean
    recommendations: string[]
  }> {
    try {
      const analysis = await this.analyzeBiologyDiagram(imageUrl, caption)
      const isValidBiology = this.validateBiologyRelevance(analysis)

      // Calculate quality score
      let qualityScore = analysis.confidence

      if (analysis.identifiedStructures.length > 3) qualityScore += 0.1
      if (analysis.detectedText) qualityScore += 0.1
      if (isValidBiology) qualityScore += 0.2
      if (analysis.difficulty !== 'basic') qualityScore += 0.1

      qualityScore = Math.min(1.0, qualityScore)

      // Generate recommendations
      const recommendations = []
      if (qualityScore < 0.6) {
        recommendations.push('Consider sending a clearer image with better lighting')
      }
      if (!analysis.detectedText) {
        recommendations.push('Add a caption describing what you want to know about the diagram')
      }
      if (analysis.identifiedStructures.length < 2) {
        recommendations.push('Try sending an image with more visible biological structures')
      }

      return {
        analysis,
        qualityScore,
        isValidBiology,
        recommendations,
      }
    } catch (error) {
      console.error('Quality check analysis failed:', error)
      throw error
    }
  }
}
