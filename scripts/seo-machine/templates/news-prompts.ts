// News Article Generation Prompts for Claude
// Designed for time-sensitive NEET/NTA announcements

import { PromptTemplate } from '../../../src/lib/seo-marketing/types'

export const NEWS_SYSTEM_PROMPT = `You are a NEET education news reporter for Cerebrum Biology Academy. You create accurate, timely news articles about NTA announcements, government updates, and medical education news.

## News Writing Guidelines
1. Lead with the most important information (inverted pyramid)
2. Be factual and accurate - cite sources
3. Include "What students should do next" section
4. Add relevant context for NEET aspirants
5. Keep sentences clear and concise
6. Include official links when available

## SEO for News
- Use exact announcement terms in title
- Include date/year in title (e.g., "NEET 2026")
- Write urgent, newsworthy meta descriptions
- Structure for featured snippets

## Tone
- Urgent but calm
- Informative and helpful
- Student-focused impact analysis`

export const NEWS_USER_PROMPT_TEMPLATE = `Generate a news article about the following announcement:

## Headline
{{headline}}

## Source Information
{{sourceUrl}}
{{sourceSummary}}

## Announcement Type
{{announcementType}}

## Requirements
1. Generate MDX frontmatter with news-specific fields
2. Write a clear, informative article (800-1500 words)
3. Include:
   - Key updates in bullet points
   - Impact on students section
   - What to do next (actionable steps)
   - Timeline if applicable
   - Related links section
4. Add "Breaking News" badge if urgent

## Output Format
Return complete MDX with:
- News-specific frontmatter
- Article content with clear sections
- Source citations
- CTA for more updates (WhatsApp subscription)`

export const newsArticleTemplate: PromptTemplate = {
  name: 'news-article-generator',
  description: 'Generates time-sensitive NEET/NTA news articles',
  systemPrompt: NEWS_SYSTEM_PROMPT,
  userPromptTemplate: NEWS_USER_PROMPT_TEMPLATE,
  outputFormat: 'mdx',
  requiredVariables: ['headline'],
  optionalVariables: ['sourceUrl', 'sourceSummary', 'announcementType'],
}

// Quick news templates for common announcement types
export const quickNewsTemplates = {
  examDate: `NEET {{year}} Exam Date Announced: {{date}}

NTA has officially announced the NEET {{year}} exam date. Here's everything you need to know:

## Key Dates
- **Exam Date:** {{date}}
- **Application Start:** {{applicationStart}}
- **Application End:** {{applicationEnd}}
- **Admit Card:** {{admitCard}}

## What Students Should Do Now
1. Mark the exam date on your calendar
2. Prepare documents for application
3. Intensify revision schedule
4. Join our WhatsApp group for updates`,

  applicationOpen: `NEET {{year}} Application Form Released - Apply Now

NTA has opened the NEET {{year}} application portal. Don't miss the deadline!

## Application Details
- **Portal:** neet.nta.nic.in
- **Last Date:** {{lastDate}}
- **Application Fee:** ₹{{fee}}

## Step-by-Step Application Guide
1. Visit official NTA website
2. Register with valid email and mobile
3. Fill application form carefully
4. Upload documents (photo, signature)
5. Pay fee online

## Important Tips
- Use recent passport photo
- Double-check all details before submission
- Save application number`,

  resultDeclared: `NEET {{year}} Results Declared - Check Your Score Now

NTA has released NEET {{year}} results. Here's how to check:

## How to Check Results
1. Visit neet.nta.nic.in
2. Login with credentials
3. Download scorecard

## Key Statistics
- Total Candidates: {{totalCandidates}}
- Qualified: {{qualified}}
- Toppers Cutoff: {{topperScore}}

## Next Steps
- Download scorecard immediately
- Start counseling preparation
- Check expected cutoffs`,
}

// News categories with SEO metadata
export const newsCategories = {
  nta: {
    name: 'NTA Announcements',
    keywords: ['NTA', 'NEET notification', 'official announcement'],
    priority: 'urgent',
  },
  government: {
    name: 'Government Updates',
    keywords: ['medical education', 'policy change', 'MBBS seats'],
    priority: 'high',
  },
  'medical-college': {
    name: 'Medical College News',
    keywords: ['medical college', 'admission', 'cutoff'],
    priority: 'normal',
  },
  general: {
    name: 'Education News',
    keywords: ['education', 'exam', 'students'],
    priority: 'normal',
  },
}
