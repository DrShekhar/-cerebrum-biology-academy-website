'use server'

/**
 * DALL-E API Integration for AI-Generated Blog Images
 * Creates custom illustrations for biology/medical content
 * Uses OpenAI's DALL-E 3 for high-quality image generation
 */

import { BIOLOGY_PROMPT_TEMPLATES, type BiologyPromptTemplate } from './imageUtils'

export interface DalleImage {
  url: string
  revisedPrompt: string
  createdAt: Date
}

export interface DalleGenerationOptions {
  prompt: string
  size?: '1024x1024' | '1792x1024' | '1024x1792'
  quality?: 'standard' | 'hd'
  style?: 'vivid' | 'natural'
}

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const OPENAI_API_URL = 'https://api.openai.com/v1/images/generations'

const BIOLOGY_STYLE_PREFIX = `Create a professional, educational illustration suitable for a medical/biology education website. The image should be clean, scientifically accurate, and visually appealing. Style: modern educational infographic with a professional medical aesthetic. `

const BIOLOGY_STYLE_SUFFIX = ` The image should use a color palette of blues, greens, and whites typical of medical/scientific imagery. No text or labels in the image.`

/**
 * Generate a custom AI image for blog content
 */
export async function generateDalleImage(
  options: DalleGenerationOptions
): Promise<DalleImage | null> {
  if (!OPENAI_API_KEY) {
    console.warn('OpenAI API key not configured')
    return null
  }

  const { prompt, size = '1792x1024', quality = 'standard', style = 'natural' } = options

  const enhancedPrompt = `${BIOLOGY_STYLE_PREFIX}${prompt}${BIOLOGY_STYLE_SUFFIX}`

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: enhancedPrompt,
        n: 1,
        size,
        quality,
        style,
        response_format: 'url',
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('DALL-E API error:', error)
      return null
    }

    const data = await response.json()
    const imageData = data.data[0]

    return {
      url: imageData.url,
      revisedPrompt: imageData.revised_prompt,
      createdAt: new Date(),
    }
  } catch (error) {
    console.error('DALL-E generation error:', error)
    return null
  }
}

/**
 * Generate an image for a specific biology topic
 */
export async function generateBiologyTopicImage(
  topic: string,
  description?: string
): Promise<DalleImage | null> {
  const prompt = description
    ? `Illustration of ${topic}: ${description}`
    : `Educational illustration depicting ${topic} in biology/medical science`

  return generateDalleImage({
    prompt,
    size: '1792x1024',
    quality: 'standard',
    style: 'natural',
  })
}

/**
 * Generate an image for NEET exam preparation content
 */
export async function generateNeetTopicImage(
  chapter: string,
  concept: string
): Promise<DalleImage | null> {
  const prompt = `Educational diagram for NEET exam preparation showing ${concept} from the chapter "${chapter}". Clear, labeled scientific illustration suitable for medical entrance exam study material.`

  return generateDalleImage({
    prompt,
    size: '1792x1024',
    quality: 'hd',
    style: 'natural',
  })
}

/**
 * Generate a featured image for a blog post
 */
export async function generateBlogFeaturedImage(
  title: string,
  category: string,
  keywords: string[]
): Promise<DalleImage | null> {
  const keywordStr = keywords.slice(0, 3).join(', ')
  const prompt = `Featured image for a biology education blog post titled "${title}" in the ${category} category. Key concepts: ${keywordStr}. Professional, engaging, and suitable as a header image for educational content.`

  return generateDalleImage({
    prompt,
    size: '1792x1024',
    quality: 'standard',
    style: 'vivid',
  })
}

/**
 * Generate image using a specific biology template
 */
export async function generateFromTemplate(
  template: BiologyPromptTemplate,
  topic: string,
  options?: Partial<DalleGenerationOptions>
): Promise<DalleImage | null> {
  const promptGenerator = BIOLOGY_PROMPT_TEMPLATES[template]
  const prompt = promptGenerator(topic)

  return generateDalleImage({
    prompt,
    size: options?.size || '1792x1024',
    quality: options?.quality || 'standard',
    style: options?.style || 'natural',
  })
}
