// Blog Post Generation Prompts for Claude
// These prompts are designed to generate NEET Biology-focused blog content

import { PromptTemplate, PromptContext } from '../../../src/lib/seo-marketing/types'

export const BLOG_SYSTEM_PROMPT = `You are an expert NEET Biology content writer for Cerebrum Biology Academy. You create comprehensive, SEO-optimized blog posts that help students prepare for NEET 2026.

## Brand Voice
- Professional yet approachable
- Authoritative (backed by AIIMS-level expertise)
- Encouraging and motivational
- Data-driven with specific numbers and statistics

## Content Guidelines
1. Always align with NCERT syllabus and NEET pattern
2. Include practical study tips and mnemonics
3. Add relevant PYQ references where applicable
4. Use bullet points and tables for easy scanning
5. Include key takeaways at the beginning
6. End with a CTA for coaching/WhatsApp inquiry

## SEO Requirements
- Include primary keyword in H1, first paragraph, and throughout content
- Use related keywords naturally
- Write compelling meta descriptions (150-160 chars)
- Structure with proper H2, H3 headings
- Aim for 1500-3000 words for comprehensive guides`

export const BLOG_USER_PROMPT_TEMPLATE = `Generate a comprehensive NEET Biology blog post with the following specifications:

## Topic
{{topic}}

## Target Details
- Difficulty Level: {{difficulty}}
- Target Audience: {{targetAudience}}
- NEET Chapter: {{neetChapter}}
- Primary Keywords: {{keywords}}

## Requirements
1. Generate complete MDX frontmatter in YAML format
2. Write engaging, comprehensive content (2000-3000 words)
3. Include 5-7 key takeaways
4. Add 3-5 relevant internal link suggestions
5. Include NEET-specific tips and PYQ insights

## Output Format
Return the complete MDX file with:
1. Frontmatter between --- markers
2. Full blog content in markdown
3. Tables, bullet points, and proper headings
4. CTA section at the end

{{additionalContext}}`

export const blogPostTemplate: PromptTemplate = {
  name: 'blog-post-generator',
  description: 'Generates comprehensive NEET Biology blog posts in MDX format',
  systemPrompt: BLOG_SYSTEM_PROMPT,
  userPromptTemplate: BLOG_USER_PROMPT_TEMPLATE,
  outputFormat: 'mdx',
  requiredVariables: ['topic'],
  optionalVariables: ['difficulty', 'targetAudience', 'neetChapter', 'keywords', 'additionalContext']
}

export const BLOG_OUTLINE_PROMPT = `Create a detailed outline for a NEET Biology blog post on: {{topic}}

Include:
1. Suggested title (SEO-optimized)
2. 5-7 key takeaways
3. Main sections with subsections
4. Suggested tables/diagrams
5. PYQ topics to cover
6. Related internal link opportunities

Format as JSON with clear structure.`

export const blogOutlineTemplate: PromptTemplate = {
  name: 'blog-outline-generator',
  description: 'Generates blog post outline before full content creation',
  systemPrompt: BLOG_SYSTEM_PROMPT,
  userPromptTemplate: BLOG_OUTLINE_PROMPT,
  outputFormat: 'json',
  requiredVariables: ['topic'],
  optionalVariables: []
}

// Default context for Cerebrum Biology Academy
export const cerebrumBrandContext: PromptContext = {
  brand: {
    name: 'Cerebrum Biology Academy',
    tagline: 'Expert NEET Biology Coaching by AIIMS Faculty',
    tone: 'professional, encouraging, authoritative',
    targetAudience: ['NEET aspirants', 'Class 11-12 students', 'Droppers', 'Parents']
  },
  seo: {
    primaryKeywords: [
      'NEET Biology',
      'NEET 2026',
      'Biology coaching',
      'NEET preparation'
    ],
    secondaryKeywords: [
      'NCERT Biology',
      'NEET notes',
      'Biology MCQ',
      'Medical entrance'
    ],
    competitorKeywords: [
      'Allen Biology',
      'Aakash Biology',
      'PW Biology'
    ]
  },
  content: {}
}

// Helper function to fill template variables
export function fillPromptTemplate(
  template: string,
  variables: Record<string, string | string[]>
): string {
  let filled = template

  for (const [key, value] of Object.entries(variables)) {
    const placeholder = `{{${key}}}`
    const replacement = Array.isArray(value) ? value.join(', ') : value
    filled = filled.replace(new RegExp(placeholder, 'g'), replacement || '')
  }

  // Remove any unfilled optional placeholders
  filled = filled.replace(/\{\{[^}]+\}\}/g, '')

  return filled.trim()
}

// Blog categories with SEO focus
export const blogCategoryPrompts: Record<string, { focus: string; keywords: string[] }> = {
  'neet-preparation': {
    focus: 'Overall NEET exam strategy and preparation tips',
    keywords: ['NEET preparation', 'NEET strategy', 'NEET tips', 'NEET 2026']
  },
  'chapter-guides': {
    focus: 'Detailed chapter-wise notes and study guides',
    keywords: ['NEET notes', 'Biology chapter', 'NCERT', 'study guide']
  },
  'medical-colleges': {
    focus: 'Information about medical colleges and admission',
    keywords: ['medical college', 'MBBS admission', 'college cutoff', 'campus life']
  },
  'neet-news': {
    focus: 'Latest updates from NTA and exam announcements',
    keywords: ['NEET news', 'NTA update', 'exam date', 'notification']
  },
  'study-tips': {
    focus: 'Study techniques, time management, and productivity',
    keywords: ['study tips', 'time management', 'memory techniques', 'revision']
  },
  'success-stories': {
    focus: 'Student testimonials and achievement stories',
    keywords: ['NEET success', 'toppers', 'student review', 'AIIMS']
  },
  'biology-concepts': {
    focus: 'Deep dives into complex biology concepts',
    keywords: ['biology concept', 'mechanism', 'process', 'diagram']
  },
  'exam-updates': {
    focus: 'Exam patterns, syllabus changes, and important dates',
    keywords: ['NEET syllabus', 'exam pattern', 'important dates', 'changes']
  }
}
