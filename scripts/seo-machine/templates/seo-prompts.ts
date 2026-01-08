// SEO Landing Page Generation Prompts for Claude
// Generates data-driven landing pages for location and keyword targeting

import { PromptTemplate } from '../../../src/lib/seo-marketing/types'

export const SEO_LANDING_SYSTEM_PROMPT = `You are an SEO landing page specialist for Cerebrum Biology Academy. You create high-converting landing pages targeting specific keywords and locations.

## Landing Page Goals
1. Rank for target keyword
2. Convert visitors to WhatsApp inquiries
3. Build trust with testimonials and stats
4. Answer common questions (FAQ schema)

## Content Guidelines
- Lead with pain points the student/parent feels
- Present Cerebrum as the solution
- Use social proof (stats, testimonials)
- Clear, single CTA focus (WhatsApp inquiry)
- Include local relevance for location pages

## SEO Requirements
- Exact match keyword in H1, meta title, first paragraph
- LSI keywords throughout content
- FAQ section for featured snippets
- Schema markup data for Course type
- Internal links to related pages`

export const SEO_LANDING_USER_PROMPT_TEMPLATE = `Generate an SEO landing page for the following target:

## Target Keyword
{{keyword}}

## Page Configuration
- Class Level: {{classLevel}}
- Location (if any): {{location}}
- Focus Area: {{focusArea}}

## Requirements
Generate a JSON object with the following structure:
1. slug - URL-friendly page identifier
2. title - SEO title (50-60 chars)
3. metaDescription - compelling description (150-160 chars)
4. keywords - array of related keywords
5. hero - headline, subheadline, CTA
6. painPoints - 4 student struggles with solutions
7. benefits - 4-6 key benefits of joining
8. stats - 4 trust-building statistics
9. faqs - 5-6 keyword-rich Q&As
10. testimonials - 2-3 student success stories

## Output Format
Return valid JSON matching the SEOLandingPageData interface.
Make content compelling, locally relevant (if location provided), and conversion-focused.`

export const seoLandingTemplate: PromptTemplate = {
  name: 'seo-landing-generator',
  description: 'Generates SEO landing page data for keyword/location targeting',
  systemPrompt: SEO_LANDING_SYSTEM_PROMPT,
  userPromptTemplate: SEO_LANDING_USER_PROMPT_TEMPLATE,
  outputFormat: 'json',
  requiredVariables: ['keyword'],
  optionalVariables: ['classLevel', 'location', 'focusArea']
}

// Pre-defined keyword patterns for batch generation
export const keywordPatterns = {
  location: [
    'biology tuition {{location}}',
    'biology coaching {{location}}',
    'neet coaching {{location}}',
    'biology tutor near {{location}}',
    'best biology teacher {{location}}',
    'neet biology classes {{location}}'
  ],
  chapter: [
    '{{chapter}} notes for neet',
    '{{chapter}} mcq for neet',
    '{{chapter}} neet questions',
    '{{chapter}} class 11 neet',
    '{{chapter}} class 12 neet'
  ],
  classLevel: [
    'class {{class}} biology tuition',
    'class {{class}} neet preparation',
    'class {{class}} biology coaching online'
  ],
  general: [
    'online biology coaching for neet',
    'best biology coaching for neet 2026',
    'neet biology crash course',
    'biology doubt solving neet'
  ]
}

// Delhi NCR locations for batch generation
export const delhiNCRLocations = [
  'Rohini', 'Dwarka', 'Pitampura', 'Janakpuri', 'Laxmi Nagar',
  'Preet Vihar', 'Vikaspuri', 'Rajouri Garden', 'Paschim Vihar',
  'Vasant Kunj', 'Saket', 'Greater Kailash', 'Noida', 'Gurgaon',
  'Ghaziabad', 'Faridabad', 'South Delhi', 'North Delhi', 'West Delhi',
  'East Delhi', 'Central Delhi', 'Karol Bagh', 'Connaught Place',
  'Model Town', 'Civil Lines', 'Ashok Vihar', 'Shalimar Bagh',
  'Mayur Vihar', 'IP Extension', 'Kalkaji', 'Defence Colony'
]

// NEET Biology chapters for batch generation
export const neetChapters = [
  'Cell Structure and Function',
  'Biomolecules',
  'Cell Division',
  'Plant Kingdom',
  'Animal Kingdom',
  'Morphology of Flowering Plants',
  'Anatomy of Flowering Plants',
  'Structural Organisation in Animals',
  'Digestion and Absorption',
  'Breathing and Exchange of Gases',
  'Body Fluids and Circulation',
  'Excretory Products and Their Elimination',
  'Locomotion and Movement',
  'Neural Control and Coordination',
  'Chemical Coordination and Integration',
  'Reproduction in Organisms',
  'Sexual Reproduction in Flowering Plants',
  'Human Reproduction',
  'Reproductive Health',
  'Principles of Inheritance and Variation',
  'Molecular Basis of Inheritance',
  'Evolution',
  'Human Health and Disease',
  'Microbes in Human Welfare',
  'Biotechnology Principles and Processes',
  'Biotechnology and Its Applications',
  'Organisms and Populations',
  'Ecosystem',
  'Biodiversity and Conservation',
  'Environmental Issues'
]

// Sample testimonials for landing pages
export const sampleTestimonials = [
  {
    name: 'Priya Sharma',
    achievement: 'NEET 2024 - AIR 342',
    quote: 'Dr. Shekhar\'s teaching made complex biology concepts so easy to understand.'
  },
  {
    name: 'Rahul Verma',
    achievement: 'AIIMS Delhi - MBBS',
    quote: 'The doubt-solving sessions were game-changers for my preparation.'
  },
  {
    name: 'Anjali Singh',
    achievement: '680/720 in NEET',
    quote: 'Best biology coaching I could have asked for. Scored 360/360 in Biology!'
  },
  {
    name: 'Vikram Patel',
    achievement: 'NEET 2024 - Top 1000',
    quote: 'The NCERT-focused approach and regular tests helped me score consistently.'
  }
]

// Trust statistics for landing pages
export const trustStats = [
  { value: '500+', label: 'Students Coached' },
  { value: '95%', label: 'Success Rate' },
  { value: '340+', label: 'Avg Biology Score' },
  { value: '15+', label: 'Years Experience' },
  { value: '50+', label: 'AIIMS Selections' },
  { value: '4.9/5', label: 'Student Rating' }
]
