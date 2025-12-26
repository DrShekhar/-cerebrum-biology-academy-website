/**
 * AI Features Hub - Unified interface for all AI capabilities
 * Created by Agent Workflow System
 * Date: October 18, 2024
 */

import AIFeaturesHub from '@/components/ai/AIFeaturesHub'

export const metadata = {
  title: 'AI Features | Cerebrum Biology Academy',
  description:
    'AI-powered study tools including ClaudeChat, Voice Training, and study analytics for NEET Biology',
  keywords: ['AI education', 'ClaudeChat', 'AI tutoring', 'voice training', 'NEET preparation'],
}

export default function AIFeaturesPage() {
  return <AIFeaturesHub />
}
