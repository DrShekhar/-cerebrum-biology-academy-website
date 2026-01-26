// User Journey Mapping and Conversion Funnel Analytics for NEET Coaching Platform

export interface UserJourneyStage {
  id: string
  name: string
  description: string
  expectedActions: string[]
  conversionGoals: string[]
  dropOffReasons: string[]
  optimizationOpportunities: string[]
}

export interface ConversionFunnel {
  name: string
  stages: UserJourneyStage[]
  totalEntries: number
  conversionRates: Record<string, number>
  averageTimeInStage: Record<string, number>
  dropOffAnalysis: Record<string, { count: number; reasons: string[] }>
}

// NEET Student Journey Stages for Indian Market
export const NEETStudentJourney: UserJourneyStage[] = [
  {
    id: 'awareness',
    name: 'Awareness',
    description: 'Student becomes aware of Cerebrum Biology Academy through various channels',
    expectedActions: [
      'Visit website from Google search',
      'Click on Facebook/Instagram ad',
      'Receive WhatsApp message from friend',
      'See YouTube video testimonial',
      'Get referral from school/coaching center',
      'Attend offline workshop/seminar',
    ],
    conversionGoals: [
      'Spend >2 minutes on website',
      'View course information',
      'Check fee structure',
      'Read success stories',
    ],
    dropOffReasons: [
      'Website loading too slow on mobile',
      'Content not in Hindi/local language',
      'Pricing not clearly visible',
      'Lack of social proof',
      'No WhatsApp contact option',
    ],
    optimizationOpportunities: [
      'Improve mobile page speed',
      'Add Hindi content toggle',
      'Prominent WhatsApp chat button',
      'Student success videos on homepage',
      'Clear pricing table with EMI options',
    ],
  },
  {
    id: 'interest',
    name: 'Interest & Research',
    description: 'Student shows active interest and researches courses/faculty',
    expectedActions: [
      'Browse multiple course pages',
      'Check faculty profiles',
      'Read student testimonials',
      'Compare with competitors',
      'Download brochure/syllabus',
      'Check batch timings',
    ],
    conversionGoals: [
      'Download course brochure',
      'Watch faculty introduction videos',
      'Use fee calculator',
      'Check batch availability',
      'Join WhatsApp group for updates',
    ],
    dropOffReasons: [
      'Information overload',
      'Unclear course differentiation',
      'No clear batch start dates',
      'Expensive compared to local coaching',
      'Parents not convinced about online classes',
    ],
    optimizationOpportunities: [
      'Simplified course comparison table',
      'Parent-specific information section',
      'Free trial class offering',
      'Scholarship/discount information',
      'Success rate comparison with competitors',
    ],
  },
  {
    id: 'consideration',
    name: 'Active Consideration',
    description: 'Student seriously considers enrollment and seeks validation',
    expectedActions: [
      'Book demo class',
      'Ask questions via WhatsApp',
      'Discuss with parents',
      'Check reviews on Google/Facebook',
      'Compare batch timings with school schedule',
      'Inquire about payment options',
    ],
    conversionGoals: [
      'Book and attend demo class',
      'Engage in counselor call',
      'Get parent approval',
      'Understand payment plans',
      'Clear doubts about online learning',
    ],
    dropOffReasons: [
      'Demo class not impressive',
      'Counselor not responsive',
      'Parents prefer offline coaching',
      'Batch timing conflicts with school',
      'No EMI/installment options',
    ],
    optimizationOpportunities: [
      'Improve demo class quality and engagement',
      'Parent-focused counseling sessions',
      'Flexible batch timing options',
      'Multiple payment plan options',
      'Hybrid learning model introduction',
    ],
  },
  {
    id: 'intent',
    name: 'Purchase Intent',
    description: 'Student decides to enroll and initiates payment process',
    expectedActions: [
      'Click "Enroll Now" button',
      'Fill enrollment form',
      'Choose payment method',
      'Apply discount code',
      'Get parent consent for payment',
      'Complete payment process',
    ],
    conversionGoals: [
      'Complete enrollment form',
      'Successful payment processing',
      'Receive enrollment confirmation',
      'Get batch assignment',
      'Access to student portal',
    ],
    dropOffReasons: [
      'Payment gateway issues',
      'Form too long/complex',
      'Payment methods not suitable',
      'Technical errors during payment',
      'Last-minute price concerns',
    ],
    optimizationOpportunities: [
      'Streamlined enrollment form',
      'Multiple payment gateway options',
      'WhatsApp payment support',
      'Real-time payment assistance',
      'Transparent pricing with no hidden fees',
    ],
  },
  {
    id: 'onboarding',
    name: 'Student Onboarding',
    description: 'New student gets oriented with platform and begins learning',
    expectedActions: [
      'Complete profile setup',
      'Join batch WhatsApp group',
      'Download mobile app',
      'Attend orientation session',
      'Access first class/study material',
      'Set learning goals',
    ],
    conversionGoals: [
      'Attend first live class',
      'Complete profile setup',
      'Download mobile app',
      'Engage with study materials',
      'Participate in batch activities',
    ],
    dropOffReasons: [
      'Complex platform navigation',
      'Poor onboarding experience',
      'Technical difficulties with app',
      'Lack of personal attention',
      'Content not meeting expectations',
    ],
    optimizationOpportunities: [
      'Interactive platform tour',
      'Personal onboarding call',
      'Simplified app interface',
      'Welcome bonus/rewards',
      'Peer introduction in batch groups',
    ],
  },
  {
    id: 'engagement',
    name: 'Active Learning & Engagement',
    description: 'Student actively participates in classes and shows progress',
    expectedActions: [
      'Attend live classes regularly',
      'Complete assignments on time',
      'Participate in doubt sessions',
      'Take practice tests',
      'Interact with peers and faculty',
      'Track progress metrics',
    ],
    conversionGoals: [
      '>80% class attendance',
      'Regular assignment submission',
      'Improvement in test scores',
      'Active participation in discussions',
      'Consistent study streak',
    ],
    dropOffReasons: [
      'Difficulty following online format',
      'Lack of personal attention',
      'Content too advanced/basic',
      'Technical issues with platform',
      'Competing priorities (school, other subjects)',
    ],
    optimizationOpportunities: [
      'Personalized learning paths',
      'One-on-one doubt sessions',
      'Gamification elements',
      'Peer study groups',
      'Regular progress check-ins',
    ],
  },
  {
    id: 'retention',
    name: 'Long-term Retention',
    description: 'Student continues with course and considers additional services',
    expectedActions: [
      'Maintain consistent attendance',
      'Show academic improvement',
      'Refer friends to platform',
      'Enroll in additional courses',
      'Provide positive feedback',
      'Become platform advocate',
    ],
    conversionGoals: [
      'Complete full course duration',
      'Achieve target NEET score',
      'Refer new students',
      'Enroll in advanced courses',
      'Provide testimonials',
    ],
    dropOffReasons: [
      'Academic goals not being met',
      'Better opportunities elsewhere',
      'Financial constraints',
      'Changed career aspirations',
      'Platform fatigue',
    ],
    optimizationOpportunities: [
      'Regular academic counseling',
      'Scholarship opportunities for referrals',
      'Career guidance sessions',
      'Alumni network access',
      'Success celebration and recognition',
    ],
  },
]

// Conversion Funnel Analysis for NEET Coaching
export const NEETConversionFunnel: ConversionFunnel = {
  name: 'NEET Student Enrollment Funnel',
  stages: NEETStudentJourney,
  totalEntries: 10000, // Monthly visitors
  conversionRates: {
    awareness_to_interest: 25, // 25% of visitors show active interest
    interest_to_consideration: 40, // 40% of interested users consider enrollment
    consideration_to_intent: 30, // 30% of considerers show purchase intent
    intent_to_onboarding: 75, // 75% of those with intent complete enrollment
    onboarding_to_engagement: 85, // 85% of enrolled students become active
    engagement_to_retention: 70, // 70% of engaged students complete the course
  },
  averageTimeInStage: {
    awareness: 0.1, // 2.4 hours (immediate)
    interest: 2.5, // 2.5 days of research
    consideration: 7, // 1 week of consideration
    intent: 1, // 1 day to complete enrollment
    onboarding: 3, // 3 days to get started
    engagement: 180, // 6 months course duration
    retention: 365, // 1 year retention tracking
  },
  dropOffAnalysis: {
    awareness: {
      count: 7500,
      reasons: [
        'Poor mobile experience (30%)',
        'Language barrier (25%)',
        'Unclear value proposition (20%)',
        'Slow loading times (15%)',
        'No clear CTA (10%)',
      ],
    },
    interest: {
      count: 1500,
      reasons: [
        'Information overload (35%)',
        'No clear differentiation (25%)',
        'Pricing concerns (20%)',
        'Lack of trust signals (12%)',
        'Complex navigation (8%)',
      ],
    },
    consideration: {
      count: 700,
      reasons: [
        'Poor demo experience (30%)',
        'Parent disapproval (25%)',
        'Scheduling conflicts (20%)',
        'Competitor preference (15%)',
        'Technical concerns (10%)',
      ],
    },
    intent: {
      count: 157,
      reasons: [
        'Payment gateway issues (40%)',
        'Form abandonment (25%)',
        'Last-minute price concerns (20%)',
        'Technical errors (10%)',
        'Parent payment approval delay (5%)',
      ],
    },
    onboarding: {
      count: 94,
      reasons: [
        'Platform complexity (35%)',
        'Poor onboarding UX (25%)',
        'Technical difficulties (20%)',
        'Unmet expectations (15%)',
        'Immediate regret (5%)',
      ],
    },
  },
}

// Analytics Functions for Journey Optimization
export class UserJourneyAnalytics {
  static calculateFunnelMetrics(funnel: ConversionFunnel) {
    const metrics = {
      totalConversions: 0,
      overallConversionRate: 0,
      stageConversions: {} as Record<string, number>,
      revenueImpact: {} as Record<string, number>,
      optimizationPriority: [] as Array<{ stage: string; impact: number; difficulty: number }>,
    }

    let currentVolume = funnel.totalEntries

    funnel.stages.forEach((stage, index) => {
      if (index === 0) {
        metrics.stageConversions[stage.id] = currentVolume
        return
      }

      const previousStage = funnel.stages[index - 1]
      const conversionKey = `${previousStage.id}_to_${stage.id}`
      const conversionRate = funnel.conversionRates[conversionKey] || 0

      currentVolume = Math.floor(currentVolume * (conversionRate / 100))
      metrics.stageConversions[stage.id] = currentVolume
    })

    metrics.totalConversions = currentVolume
    metrics.overallConversionRate = (currentVolume / funnel.totalEntries) * 100

    return metrics
  }

  static identifyBottlenecks(funnel: ConversionFunnel) {
    const bottlenecks = []

    for (const [transitionKey, rate] of Object.entries(funnel.conversionRates)) {
      if (rate < 30) {
        // Below 30% conversion rate
        bottlenecks.push({
          transition: transitionKey,
          conversionRate: rate,
          impact: 'high',
          dropOffVolume: funnel.dropOffAnalysis[transitionKey.split('_to_')[0]]?.count || 0,
        })
      }
    }

    return bottlenecks.sort((a, b) => b.dropOffVolume - a.dropOffVolume)
  }

  static generateOptimizationRecommendations(funnel: ConversionFunnel) {
    const bottlenecks = this.identifyBottlenecks(funnel)
    const recommendations = []

    for (const bottleneck of bottlenecks) {
      const stageId = bottleneck.transition.split('_to_')[0]
      const stage = funnel.stages.find((s) => s.id === stageId)

      if (stage) {
        recommendations.push({
          stage: stage.name,
          priority: bottleneck.impact,
          currentConversionRate: bottleneck.conversionRate,
          potentialImpact: bottleneck.dropOffVolume,
          recommendations: stage.optimizationOpportunities,
          estimatedImprovement: this.calculatePotentialImprovement(bottleneck.conversionRate),
          implementationComplexity: this.assessImplementationComplexity(
            stage.optimizationOpportunities
          ),
        })
      }
    }

    return recommendations.sort(
      (a, b) =>
        b.potentialImpact * b.estimatedImprovement - a.potentialImpact * a.estimatedImprovement
    )
  }

  static calculatePotentialImprovement(currentRate: number): number {
    // Conservative improvement estimates based on industry benchmarks
    if (currentRate < 10) return 5 // 5% absolute improvement potential
    if (currentRate < 20) return 3 // 3% absolute improvement potential
    if (currentRate < 30) return 2 // 2% absolute improvement potential
    return 1 // 1% absolute improvement potential
  }

  static assessImplementationComplexity(opportunities: string[]): 'low' | 'medium' | 'high' {
    const complexityKeywords = {
      low: ['button', 'text', 'color', 'image', 'link'],
      medium: ['form', 'page', 'content', 'design', 'feature'],
      high: ['platform', 'system', 'integration', 'architecture', 'algorithm'],
    }

    let complexity = 'low'

    for (const opportunity of opportunities) {
      const lowerOpportunity = opportunity.toLowerCase()

      if (complexityKeywords.high.some((keyword) => lowerOpportunity.includes(keyword))) {
        complexity = 'high'
        break
      } else if (complexityKeywords.medium.some((keyword) => lowerOpportunity.includes(keyword))) {
        complexity = 'medium'
      }
    }

    return complexity as 'low' | 'medium' | 'high'
  }

  // WhatsApp-specific journey optimization for Indian market
  static generateWhatsAppJourneyOptimization() {
    return {
      awareness: {
        strategy: 'WhatsApp Status ads with NEET success stories',
        implementation: 'Partner with successful students for status sharing',
        expectedImpact: '15% increase in awareness conversion',
      },
      interest: {
        strategy: 'Automated WhatsApp chatbot for course information',
        implementation: 'Deploy AI chatbot for instant course queries',
        expectedImpact: '25% improvement in interest to consideration',
      },
      consideration: {
        strategy: 'WhatsApp-based demo class scheduling and reminders',
        implementation: 'Integrate WhatsApp API for booking management',
        expectedImpact: '30% increase in demo attendance',
      },
      intent: {
        strategy: 'WhatsApp payment links and support',
        implementation: 'Send payment links via WhatsApp with live support',
        expectedImpact: '20% reduction in payment abandonment',
      },
      onboarding: {
        strategy: 'WhatsApp welcome series and platform tutorial',
        implementation: 'Automated welcome message sequence with video tutorials',
        expectedImpact: '35% improvement in platform adoption',
      },
      engagement: {
        strategy: 'Daily WhatsApp motivation and study reminders',
        implementation: 'Personalized daily messages based on student progress',
        expectedImpact: '40% increase in class attendance',
      },
    }
  }

  // Mobile-first optimization for NEET students
  static generateMobileOptimization() {
    return {
      pageSpeed: {
        target: '<3 seconds on 3G networks',
        optimizations: [
          'Image compression and WebP format',
          'Critical CSS inlining',
          'JavaScript code splitting',
          'CDN implementation for Indian regions',
        ],
      },
      userExperience: {
        focus: 'One-handed mobile usage',
        optimizations: [
          'Bottom navigation for key actions',
          'Thumb-friendly button sizes (44px minimum)',
          'Swipe gestures for course browsing',
          'Offline content caching',
        ],
      },
      conversion: {
        priority: 'Reduce form friction',
        optimizations: [
          'OTP-based registration (no password)',
          'Auto-fill from Google/Facebook',
          'Progressive form completion',
          'Mobile payment optimization (UPI/PhonePe/GPay)',
        ],
      },
    }
  }
}
