/**
 * Agent Configuration - AI Agent Settings & Capabilities
 * Central configuration for all educational AI agents
 * Performance tuning and capability definitions
 */

import {
  AgentType,
  AgentCapability,
} from '../types'

export interface AgentConfigProfile {
  id: string
  name: string
  type: AgentType
  capabilities: AgentCapability[]
  isEnabled: boolean
  priority: number // 1-10, higher = more priority
  maxConcurrentRequests: number
  responseTimeTarget: number // milliseconds
  confidenceThreshold: number // 0-1
  configuration: AgentSpecificConfig
  resources: AgentResources
  performance: PerformanceSettings
}

interface AgentSpecificConfig {
  modelSettings: ModelSettings
  promptTemplates: Record<string, string>
  behaviorSettings: BehaviorSettings
  integrationSettings: IntegrationSettings
}

interface ModelSettings {
  model: string
  maxTokens: number
  temperature: number
  topP: number
  systemPrompt: string
  contextWindow: number
}

interface BehaviorSettings {
  personality: 'professional' | 'friendly' | 'enthusiastic' | 'supportive'
  responseStyle: 'concise' | 'detailed' | 'adaptive'
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'adaptive'
  errorHandling: 'graceful' | 'informative' | 'retry'
}

interface IntegrationSettings {
  enableCaching: boolean
  cacheExpiryMinutes: number
  enableAnalytics: boolean
  enablePersonalization: boolean
  enableMultilingual: boolean
  supportedLanguages: string[]
}

interface AgentResources {
  memoryLimit: number // MB
  cpuPriority: 'low' | 'medium' | 'high'
  concurrencyLimit: number
  rateLimitPerMinute: number
  quotaPerDay: number
}

interface PerformanceSettings {
  targetResponseTime: number // milliseconds
  maxRetries: number
  timeoutSeconds: number
  enableLoadBalancing: boolean
  scalingThresholds: ScalingThresholds
}

interface ScalingThresholds {
  scaleUpAt: number // percentage of capacity
  scaleDownAt: number
  minInstances: number
  maxInstances: number
}

/**
 * Central configuration for all AI agents in the Cerebrum MCP server
 */
export class AgentConfig {
  private static instance: AgentConfig
  private agentProfiles: Map<AgentType, AgentConfigProfile> = new Map()

  private constructor() {
    this.initializeAgentProfiles()
  }

  public static getInstance(): AgentConfig {
    if (!AgentConfig.instance) {
      AgentConfig.instance = new AgentConfig()
    }
    return AgentConfig.instance
  }

  /**
   * Get configuration for a specific agent type
   */
  getAgentConfig(agentType: AgentType): AgentConfigProfile | undefined {
    return this.agentProfiles.get(agentType)
  }

  /**
   * Get all enabled agent configurations
   */
  getEnabledAgents(): AgentConfigProfile[] {
    return Array.from(this.agentProfiles.values()).filter((profile) => profile.isEnabled)
  }

  /**
   * Update agent configuration
   */
  updateAgentConfig(agentType: AgentType, updates: Partial<AgentConfigProfile>): boolean {
    const existing = this.agentProfiles.get(agentType)
    if (!existing) return false

    const updated = { ...existing, ...updates }
    this.agentProfiles.set(agentType, updated)
    return true
  }

  /**
   * Enable or disable an agent
   */
  setAgentEnabled(agentType: AgentType, enabled: boolean): boolean {
    const config = this.agentProfiles.get(agentType)
    if (!config) return false

    config.isEnabled = enabled
    return true
  }

  /**
   * Get agents sorted by priority
   */
  getAgentsByPriority(): AgentConfigProfile[] {
    return Array.from(this.agentProfiles.values())
      .filter((profile) => profile.isEnabled)
      .sort((a, b) => b.priority - a.priority)
  }

  /**
   * Get agents with specific capability
   */
  getAgentsWithCapability(capability: AgentCapability): AgentConfigProfile[] {
    return Array.from(this.agentProfiles.values()).filter(
      (profile) => profile.isEnabled && profile.capabilities.includes(capability)
    )
  }

  /**
   * Initialize default agent configurations
   */
  private initializeAgentProfiles(): void {
    // Student Support Agent Configuration
    this.agentProfiles.set(AgentType.STUDENT_SUPPORT, {
      id: 'student-support-agent',
      name: 'Cerebrum AI Tutor',
      type: AgentType.STUDENT_SUPPORT,
      capabilities: [
        AgentCapability.DOUBT_RESOLUTION,
        AgentCapability.REAL_TIME_CHAT,
        AgentCapability.CURRICULUM_MAPPING,
      ],
      isEnabled: true,
      priority: 10, // Highest priority
      maxConcurrentRequests: 100,
      responseTimeTarget: 2000, // 2 seconds
      confidenceThreshold: 0.85,
      configuration: {
        modelSettings: {
          model: 'claude-3-5-sonnet-20241022',
          maxTokens: 2000,
          temperature: 0.7,
          topP: 0.9,
          systemPrompt: this.getStudentSupportSystemPrompt(),
          contextWindow: 8000,
        },
        promptTemplates: {
          doubt_resolution: this.getDoubtResolutionTemplate(),
          concept_explanation: this.getConceptExplanationTemplate(),
          motivation: this.getMotivationalTemplate(),
          exam_tips: this.getExamTipsTemplate(),
        },
        behaviorSettings: {
          personality: 'supportive',
          responseStyle: 'adaptive',
          learningStyle: 'adaptive',
          errorHandling: 'graceful',
        },
        integrationSettings: {
          enableCaching: true,
          cacheExpiryMinutes: 30,
          enableAnalytics: true,
          enablePersonalization: true,
          enableMultilingual: true,
          supportedLanguages: ['en', 'hi', 'ta', 'te', 'bn'],
        },
      },
      resources: {
        memoryLimit: 512,
        cpuPriority: 'high',
        concurrencyLimit: 50,
        rateLimitPerMinute: 300,
        quotaPerDay: 10000,
      },
      performance: {
        targetResponseTime: 2000,
        maxRetries: 3,
        timeoutSeconds: 30,
        enableLoadBalancing: true,
        scalingThresholds: {
          scaleUpAt: 80,
          scaleDownAt: 30,
          minInstances: 2,
          maxInstances: 10,
        },
      },
    })

    // Content Generator Agent Configuration
    this.agentProfiles.set(AgentType.CONTENT_GENERATOR, {
      id: 'content-generator-agent',
      name: 'Cerebrum Content Generator',
      type: AgentType.CONTENT_GENERATOR,
      capabilities: [
        AgentCapability.QUESTION_GENERATION,
        AgentCapability.CURRICULUM_MAPPING,
        AgentCapability.PERSONALIZATION,
      ],
      isEnabled: true,
      priority: 8,
      maxConcurrentRequests: 50,
      responseTimeTarget: 5000, // 5 seconds for content generation
      confidenceThreshold: 0.9,
      configuration: {
        modelSettings: {
          model: 'claude-3-5-sonnet-20241022',
          maxTokens: 3000,
          temperature: 0.8,
          topP: 0.9,
          systemPrompt: this.getContentGeneratorSystemPrompt(),
          contextWindow: 10000,
        },
        promptTemplates: {
          mcq_generation: this.getMCQGenerationTemplate(),
          explanation_generation: this.getExplanationTemplate(),
          summary_generation: this.getSummaryTemplate(),
          mnemonic_generation: this.getMnemonicTemplate(),
        },
        behaviorSettings: {
          personality: 'professional',
          responseStyle: 'detailed',
          learningStyle: 'visual',
          errorHandling: 'informative',
        },
        integrationSettings: {
          enableCaching: true,
          cacheExpiryMinutes: 60,
          enableAnalytics: true,
          enablePersonalization: true,
          enableMultilingual: false,
          supportedLanguages: ['en'],
        },
      },
      resources: {
        memoryLimit: 1024,
        cpuPriority: 'medium',
        concurrencyLimit: 25,
        rateLimitPerMinute: 120,
        quotaPerDay: 5000,
      },
      performance: {
        targetResponseTime: 5000,
        maxRetries: 2,
        timeoutSeconds: 60,
        enableLoadBalancing: true,
        scalingThresholds: {
          scaleUpAt: 70,
          scaleDownAt: 20,
          minInstances: 1,
          maxInstances: 5,
        },
      },
    })

    // Analytics Agent Configuration
    this.agentProfiles.set(AgentType.ANALYTICS, {
      id: 'analytics-agent',
      name: 'Cerebrum Analytics Engine',
      type: AgentType.ANALYTICS,
      capabilities: [
        AgentCapability.PROGRESS_TRACKING,
        AgentCapability.PERFORMANCE_ANALYTICS,
        AgentCapability.PERSONALIZATION,
      ],
      isEnabled: true,
      priority: 7,
      maxConcurrentRequests: 30,
      responseTimeTarget: 3000,
      confidenceThreshold: 0.95,
      configuration: {
        modelSettings: {
          model: 'claude-3-5-sonnet-20241022',
          maxTokens: 2500,
          temperature: 0.3, // Lower temperature for analytical tasks
          topP: 0.8,
          systemPrompt: this.getAnalyticsSystemPrompt(),
          contextWindow: 12000,
        },
        promptTemplates: {
          performance_analysis: this.getPerformanceAnalysisTemplate(),
          prediction_modeling: this.getPredictionTemplate(),
          insight_generation: this.getInsightTemplate(),
          recommendation: this.getRecommendationTemplate(),
        },
        behaviorSettings: {
          personality: 'professional',
          responseStyle: 'detailed',
          learningStyle: 'visual',
          errorHandling: 'informative',
        },
        integrationSettings: {
          enableCaching: true,
          cacheExpiryMinutes: 15,
          enableAnalytics: true,
          enablePersonalization: true,
          enableMultilingual: false,
          supportedLanguages: ['en'],
        },
      },
      resources: {
        memoryLimit: 768,
        cpuPriority: 'medium',
        concurrencyLimit: 20,
        rateLimitPerMinute: 100,
        quotaPerDay: 3000,
      },
      performance: {
        targetResponseTime: 3000,
        maxRetries: 2,
        timeoutSeconds: 45,
        enableLoadBalancing: true,
        scalingThresholds: {
          scaleUpAt: 75,
          scaleDownAt: 25,
          minInstances: 1,
          maxInstances: 4,
        },
      },
    })

    // Communication Agent Configuration
    this.agentProfiles.set(AgentType.COMMUNICATION, {
      id: 'communication-agent',
      name: 'Cerebrum Communication Hub',
      type: AgentType.COMMUNICATION,
      capabilities: [AgentCapability.PARENT_COMMUNICATION, AgentCapability.REAL_TIME_CHAT],
      isEnabled: true,
      priority: 6,
      maxConcurrentRequests: 40,
      responseTimeTarget: 1500,
      confidenceThreshold: 0.88,
      configuration: {
        modelSettings: {
          model: 'claude-3-5-sonnet-20241022',
          maxTokens: 1500,
          temperature: 0.6,
          topP: 0.9,
          systemPrompt: this.getCommunicationSystemPrompt(),
          contextWindow: 6000,
        },
        promptTemplates: {
          parent_notification: this.getParentNotificationTemplate(),
          progress_report: this.getProgressReportTemplate(),
          alert_message: this.getAlertMessageTemplate(),
          reminder: this.getReminderTemplate(),
        },
        behaviorSettings: {
          personality: 'friendly',
          responseStyle: 'concise',
          learningStyle: 'adaptive',
          errorHandling: 'graceful',
        },
        integrationSettings: {
          enableCaching: false, // Real-time communications shouldn't be cached
          cacheExpiryMinutes: 0,
          enableAnalytics: true,
          enablePersonalization: true,
          enableMultilingual: true,
          supportedLanguages: ['en', 'hi', 'ta', 'te', 'bn', 'mr', 'gu'],
        },
      },
      resources: {
        memoryLimit: 256,
        cpuPriority: 'high',
        concurrencyLimit: 30,
        rateLimitPerMinute: 200,
        quotaPerDay: 8000,
      },
      performance: {
        targetResponseTime: 1500,
        maxRetries: 3,
        timeoutSeconds: 20,
        enableLoadBalancing: true,
        scalingThresholds: {
          scaleUpAt: 85,
          scaleDownAt: 35,
          minInstances: 2,
          maxInstances: 8,
        },
      },
    })

    // Adaptive Learning Agent Configuration (for future implementation)
    this.agentProfiles.set(AgentType.ADAPTIVE_LEARNING, {
      id: 'adaptive-learning-agent',
      name: 'Cerebrum Adaptive Learning Engine',
      type: AgentType.ADAPTIVE_LEARNING,
      capabilities: [
        AgentCapability.PERSONALIZATION,
        AgentCapability.PROGRESS_TRACKING,
        AgentCapability.CURRICULUM_MAPPING,
      ],
      isEnabled: false, // Will be enabled in future phase
      priority: 9,
      maxConcurrentRequests: 20,
      responseTimeTarget: 4000,
      confidenceThreshold: 0.92,
      configuration: {
        modelSettings: {
          model: 'claude-3-5-sonnet-20241022',
          maxTokens: 2500,
          temperature: 0.5,
          topP: 0.8,
          systemPrompt: this.getAdaptiveLearningSystemPrompt(),
          contextWindow: 15000,
        },
        promptTemplates: {
          learning_path: this.getLearningPathTemplate(),
          difficulty_adaptation: this.getDifficultyAdaptationTemplate(),
          personalization: this.getPersonalizationTemplate(),
          recommendation: this.getAdaptiveRecommendationTemplate(),
        },
        behaviorSettings: {
          personality: 'enthusiastic',
          responseStyle: 'adaptive',
          learningStyle: 'adaptive',
          errorHandling: 'informative',
        },
        integrationSettings: {
          enableCaching: true,
          cacheExpiryMinutes: 45,
          enableAnalytics: true,
          enablePersonalization: true,
          enableMultilingual: true,
          supportedLanguages: ['en', 'hi'],
        },
      },
      resources: {
        memoryLimit: 1024,
        cpuPriority: 'medium',
        concurrencyLimit: 15,
        rateLimitPerMinute: 80,
        quotaPerDay: 2000,
      },
      performance: {
        targetResponseTime: 4000,
        maxRetries: 2,
        timeoutSeconds: 60,
        enableLoadBalancing: true,
        scalingThresholds: {
          scaleUpAt: 70,
          scaleDownAt: 20,
          minInstances: 1,
          maxInstances: 3,
        },
      },
    })
  }

  // System prompt templates

  private getStudentSupportSystemPrompt(): string {
    return `You are Cerebrum AI Tutor, an expert Biology teacher specializing in NEET preparation. Your role is to provide 24/7 doubt resolution and educational support to students.

Key Responsibilities:
- Resolve Biology doubts with clear, step-by-step explanations
- Provide concept clarifications using simple language
- Offer motivational support and study guidance
- Connect concepts to NEET exam patterns
- Maintain encouraging and supportive tone

Guidelines:
- Always prioritize student understanding over showing expertise
- Use examples and analogies to explain complex concepts
- Provide memory tricks and mnemonics when helpful
- Reference NEET exam patterns and weightage
- Be patient and encouraging, especially with struggling students
- Suggest practice questions and next steps for learning

Response Style:
- Clear and concise explanations
- Structured with headings and bullet points
- Include relevant examples and applications
- End with encouragement and next learning steps`
  }

  private getContentGeneratorSystemPrompt(): string {
    return `You are Cerebrum Content Generator, an AI system specialized in creating high-quality Biology educational content for NEET preparation.

Content Creation Focus:
- Generate NEET-standard multiple choice questions
- Create detailed concept explanations
- Develop topic summaries and revision notes
- Design memory aids and mnemonics
- Produce practice questions with varying difficulty

Quality Standards:
- All content must be scientifically accurate
- Questions should follow NEET exam patterns
- Explanations must be clear and comprehensive
- Include proper difficulty progression
- Cover all Biology units proportionally

Content Types:
- MCQ questions with 4 options and detailed explanations
- Concept explanations with examples
- Topic summaries for quick revision
- Memory techniques and mnemonics
- Practice question sets

Always ensure content is engaging, educational, and aligned with NEET syllabus requirements.`
  }

  private getAnalyticsSystemPrompt(): string {
    return `You are Cerebrum Analytics Engine, an AI system specialized in analyzing student performance data and generating actionable insights for Biology/NEET preparation.

Analysis Focus:
- Student performance patterns and trends
- Learning velocity and consistency metrics
- Strength and weakness identification
- Predictive modeling for NEET scores
- Personalized recommendation generation

Data Processing:
- Analyze accuracy trends over time
- Identify topic-wise performance gaps
- Calculate improvement rates and trajectories
- Compare against benchmarks and peers
- Generate predictive insights

Output Requirements:
- Data-driven insights with specific metrics
- Clear explanations of performance patterns
- Actionable recommendations for improvement
- Visual data summaries when applicable
- Confidence levels for predictions

Maintain objectivity while being encouraging about student potential and growth opportunities.`
  }

  private getCommunicationSystemPrompt(): string {
    return `You are Cerebrum Communication Hub, responsible for generating personalized communications between the academy, students, and parents.

Communication Objectives:
- Keep parents informed about student progress
- Send timely alerts and notifications
- Generate comprehensive progress reports
- Maintain positive, professional tone
- Provide actionable insights and recommendations

Message Types:
- Progress updates and achievements
- Areas needing attention
- Motivational messages
- Exam preparation guidance
- Administrative notifications

Communication Style:
- Professional yet warm and encouraging
- Specific and data-driven
- Include concrete examples and achievements
- Provide clear next steps and recommendations
- Respect cultural sensitivities and preferences

Always personalize messages with student-specific data and maintain confidentiality of sensitive information.`
  }

  private getAdaptiveLearningSystemPrompt(): string {
    return `You are Cerebrum Adaptive Learning Engine, designed to create personalized learning experiences based on individual student performance and learning patterns.

Adaptive Features:
- Personalized learning path creation
- Dynamic difficulty adjustment
- Learning style accommodation
- Progress-based content recommendation
- Individual pace optimization

Learning Personalization:
- Analyze learning patterns and preferences
- Adapt content difficulty in real-time
- Recommend optimal study sequences
- Identify best learning modalities
- Suggest intervention strategies

Goal:
Create truly personalized learning experiences that maximize each student's potential for NEET success while maintaining engagement and motivation.`
  }

  // Prompt templates (simplified for brevity)

  private getDoubtResolutionTemplate(): string {
    return `Student Doubt: {doubt}
Context: {context}
Please provide a clear, step-by-step resolution with examples and practice suggestions.`
  }

  private getConceptExplanationTemplate(): string {
    return `Concept: {concept}
Student Level: {level}
Provide a comprehensive explanation with examples, applications, and memory aids.`
  }

  private getMotivationalTemplate(): string {
    return `Student expressing: {concern}
Provide encouragement, perspective, and actionable motivation strategies.`
  }

  private getExamTipsTemplate(): string {
    return `Exam Type: {exam_type}
Topic: {topic}
Provide specific exam strategies and tips for maximum score.`
  }

  private getMCQGenerationTemplate(): string {
    return `Topic: {topic}
Difficulty: {difficulty}
Count: {count}
Generate NEET-style MCQs with explanations.`
  }

  private getExplanationTemplate(): string {
    return `Topic: {topic}
Create detailed explanation suitable for {student_level} with examples.`
  }

  private getSummaryTemplate(): string {
    return `Topic: {topic}
Create concise summary for quick revision covering all key points.`
  }

  private getMnemonicTemplate(): string {
    return `Content: {content}
Create memorable mnemonics and memory aids.`
  }

  private getPerformanceAnalysisTemplate(): string {
    return `Student Data: {data}
Analyze performance patterns and provide insights.`
  }

  private getPredictionTemplate(): string {
    return `Historical Data: {data}
Generate predictions for NEET performance.`
  }

  private getInsightTemplate(): string {
    return `Performance Data: {data}
Generate actionable insights for improvement.`
  }

  private getRecommendationTemplate(): string {
    return `Analysis: {analysis}
Provide specific, actionable recommendations.`
  }

  private getParentNotificationTemplate(): string {
    return `Student: {student_name}
Update Type: {type}
Data: {data}
Create personalized parent notification.`
  }

  private getProgressReportTemplate(): string {
    return `Student: {student_name}
Period: {period}
Data: {performance_data}
Generate comprehensive progress report.`
  }

  private getAlertMessageTemplate(): string {
    return `Alert Type: {type}
Student: {student_name}
Issue: {issue}
Create appropriate alert message.`
  }

  private getReminderTemplate(): string {
    return `Reminder Type: {type}
Details: {details}
Create effective reminder message.`
  }

  private getLearningPathTemplate(): string {
    return `Student Profile: {profile}
Current Progress: {progress}
Create personalized learning path.`
  }

  private getDifficultyAdaptationTemplate(): string {
    return `Performance: {performance}
Current Difficulty: {difficulty}
Suggest appropriate difficulty adjustments.`
  }

  private getPersonalizationTemplate(): string {
    return `Learning Style: {style}
Performance Data: {data}
Create personalized recommendations.`
  }

  private getAdaptiveRecommendationTemplate(): string {
    return `Learning Patterns: {patterns}
Goals: {goals}
Generate adaptive learning recommendations.`
  }
}
