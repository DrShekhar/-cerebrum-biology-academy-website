export interface LeadQualificationScore {
  overall: number
  components: {
    intent: number
    readiness: number
    fit: number
    budget: number
    timeline: number
  }
  classification: 'HOT' | 'WARM' | 'COLD' | 'NURTURE'
  recommendedAction: string
  nextQuestion?: string
}

export interface ConversationContext {
  hasSharedClass?: boolean
  hasSharedGoal?: boolean
  hasSharedBudget?: boolean
  hasSharedTimeline?: boolean
  hasAskedForDemo?: boolean
  hasAskedForCall?: boolean
  hasAskedAboutFees?: boolean
  messageCount: number
  intentSignals: string[]
  currentClass?: string
  targetExam?: string
  budgetRange?: string
  urgencyLevel?: 'immediate' | 'soon' | 'exploring' | 'unknown'
}

const INTENT_SIGNALS = {
  highIntent: [
    'enroll',
    'join',
    'start',
    'register',
    'admission',
    'seat',
    'book',
    'demo',
    'trial',
    'when can i',
    'how to join',
    'payment',
    'pay',
    'emi',
    'installment',
    'scholarship',
  ],
  mediumIntent: [
    'fee',
    'price',
    'cost',
    'batch',
    'timing',
    'schedule',
    'faculty',
    'teacher',
    'result',
    'success',
    'guarantee',
    'compare',
    'best',
    'course',
    'program',
  ],
  lowIntent: [
    'about',
    'what is',
    'tell me',
    'information',
    'details',
    'know',
    'learn',
    'general',
    'overview',
  ],
}

const READINESS_SIGNALS = {
  immediate: [
    'today',
    'now',
    'immediately',
    'asap',
    'urgent',
    'this week',
    'right away',
    'quickly',
  ],
  soon: ['next month', 'next week', 'soon', 'planning', 'looking to', 'want to', 'interested'],
  exploring: ['maybe', 'considering', 'thinking', 'exploring', 'researching', 'options', 'compare'],
}

export function calculateLeadScore(
  messages: string[],
  context: ConversationContext
): LeadQualificationScore {
  let intentScore = 0
  let readinessScore = 0
  let fitScore = 0
  let budgetScore = 0
  let timelineScore = 0

  const allText = messages.join(' ').toLowerCase()

  for (const signal of INTENT_SIGNALS.highIntent) {
    if (allText.includes(signal)) {
      intentScore += 15
      if (!context.intentSignals.includes(signal)) {
        context.intentSignals.push(signal)
      }
    }
  }
  for (const signal of INTENT_SIGNALS.mediumIntent) {
    if (allText.includes(signal)) {
      intentScore += 8
    }
  }
  for (const signal of INTENT_SIGNALS.lowIntent) {
    if (allText.includes(signal)) {
      intentScore += 3
    }
  }
  intentScore = Math.min(intentScore, 100)

  for (const signal of READINESS_SIGNALS.immediate) {
    if (allText.includes(signal)) {
      readinessScore += 25
      context.urgencyLevel = 'immediate'
    }
  }
  for (const signal of READINESS_SIGNALS.soon) {
    if (allText.includes(signal)) {
      readinessScore += 15
      if (!context.urgencyLevel || context.urgencyLevel === 'unknown') {
        context.urgencyLevel = 'soon'
      }
    }
  }
  for (const signal of READINESS_SIGNALS.exploring) {
    if (allText.includes(signal)) {
      readinessScore += 5
      if (context.urgencyLevel === 'unknown') {
        context.urgencyLevel = 'exploring'
      }
    }
  }
  readinessScore = Math.min(readinessScore, 100)

  if (context.hasSharedClass) fitScore += 25
  if (context.hasSharedGoal) fitScore += 25
  if (context.currentClass) fitScore += 15
  if (context.targetExam) fitScore += 15
  if (allText.includes('neet') || allText.includes('biology')) fitScore += 20
  fitScore = Math.min(fitScore, 100)

  if (context.hasAskedAboutFees) budgetScore += 30
  if (context.hasSharedBudget) budgetScore += 40
  if (allText.includes('emi') || allText.includes('installment')) budgetScore += 20
  if (allText.includes('scholarship')) budgetScore += 10
  budgetScore = Math.min(budgetScore, 100)

  if (context.hasAskedForDemo) timelineScore += 40
  if (context.hasAskedForCall) timelineScore += 30
  if (context.urgencyLevel === 'immediate') timelineScore += 30
  else if (context.urgencyLevel === 'soon') timelineScore += 20
  else if (context.urgencyLevel === 'exploring') timelineScore += 10
  timelineScore = Math.min(timelineScore, 100)

  const weights = {
    intent: 0.3,
    readiness: 0.25,
    fit: 0.2,
    budget: 0.15,
    timeline: 0.1,
  }

  const overall =
    intentScore * weights.intent +
    readinessScore * weights.readiness +
    fitScore * weights.fit +
    budgetScore * weights.budget +
    timelineScore * weights.timeline

  let classification: 'HOT' | 'WARM' | 'COLD' | 'NURTURE'
  let recommendedAction: string
  let nextQuestion: string | undefined

  if (overall >= 70) {
    classification = 'HOT'
    recommendedAction = 'Immediately connect with counselor or offer demo booking'
    if (!context.hasAskedForDemo) {
      nextQuestion =
        'You seem ready to take the next step! Would you like to book a free demo class to experience our teaching methodology?'
    }
  } else if (overall >= 45) {
    classification = 'WARM'
    recommendedAction = 'Nurture with more information, then push for demo'
    if (!context.hasSharedClass) {
      nextQuestion =
        'Which class are you currently in? This will help me recommend the best course for you.'
    } else if (!context.hasAskedAboutFees) {
      nextQuestion = 'Would you like to know about our course fees and flexible payment options?'
    }
  } else if (overall >= 25) {
    classification = 'NURTURE'
    recommendedAction = 'Provide educational content and build trust'
    nextQuestion = 'What specific topics or challenges in Biology would you like help with?'
  } else {
    classification = 'COLD'
    recommendedAction = 'Provide basic information and add to email nurture sequence'
    nextQuestion =
      "What brings you to Cerebrum Biology Academy today? I'd love to understand how I can help!"
  }

  return {
    overall: Math.round(overall),
    components: {
      intent: Math.round(intentScore),
      readiness: Math.round(readinessScore),
      fit: Math.round(fitScore),
      budget: Math.round(budgetScore),
      timeline: Math.round(timelineScore),
    },
    classification,
    recommendedAction,
    nextQuestion,
  }
}

export function shouldCaptureContact(
  score: LeadQualificationScore,
  context: ConversationContext
): boolean {
  if (score.classification === 'HOT') return true
  if (score.classification === 'WARM' && context.messageCount >= 3) return true
  if (context.hasAskedForDemo || context.hasAskedForCall) return true
  if (score.overall >= 50) return true
  return false
}

export function getContactCapturePrompt(score: LeadQualificationScore): string {
  if (score.classification === 'HOT') {
    return "I'd love to connect you with our counselor right away! Could you share your phone number so they can call you within 5 minutes?"
  }
  if (score.classification === 'WARM') {
    return 'You have great questions! To give you personalized information, could I get your contact number? Our team will reach out with detailed answers.'
  }
  return "Would you like me to send you more details about our courses? Just share your phone number or email, and I'll make sure you get all the information!"
}

export async function saveLeadFromChat(
  leadData: {
    phone?: string
    email?: string
    name?: string
    class?: string
    source: string
  },
  score: LeadQualificationScore,
  context: ConversationContext
): Promise<{ success: boolean; leadId?: string }> {
  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...leadData,
        qualificationScore: score.overall,
        classification: score.classification,
        scoreBreakdown: score.components,
        conversationContext: {
          messageCount: context.messageCount,
          intentSignals: context.intentSignals,
          urgencyLevel: context.urgencyLevel,
        },
        metadata: {
          capturedFrom: 'chatbot',
          capturedAt: new Date().toISOString(),
        },
      }),
    })

    const data = await response.json()
    return { success: data.success, leadId: data.leadId }
  } catch (error) {
    console.error('Failed to save lead from chat:', error)
    return { success: false }
  }
}
