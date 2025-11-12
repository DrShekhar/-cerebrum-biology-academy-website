import { useState, useCallback } from 'react'
import { FeedbackData, FeedbackAnalyzer } from '../feedback/feedbackCollection'
import { HeatmapDataPoint, HeatmapAnalyzer } from '../heatmap/heatmapTracking'
import { FunnelEvent, FunnelAnalyzer } from '../analytics/conversionFunnelAnalysis'

export interface OptimizationInsight {
  id: string
  type: 'performance' | 'usability' | 'conversion' | 'content' | 'technical'
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  description: string
  evidence: {
    source: 'funnel' | 'heatmap' | 'feedback' | 'abtest' | 'analytics'
    data: any
    confidence: number // 0-1
  }[]
  impact: {
    estimated_improvement: number // percentage
    effort_required: 'low' | 'medium' | 'high'
    time_to_implement: string
  }
  recommendations: {
    action: string
    priority: 'low' | 'medium' | 'high'
    resources_needed: string[]
    success_metrics: string[]
  }[]
  affected_areas: string[]
  created_at: number
  status: 'new' | 'in_progress' | 'implemented' | 'testing' | 'dismissed'
}

export interface OptimizationCycle {
  id: string
  name: string
  start_date: number
  end_date?: number
  objectives: string[]
  insights: OptimizationInsight[]
  experiments: {
    id: string
    name: string
    hypothesis: string
    variant_a: string
    variant_b: string
    status: 'draft' | 'running' | 'completed' | 'paused'
    results?: {
      winner: 'a' | 'b' | 'inconclusive'
      confidence: number
      improvement: number
    }
  }[]
  outcomes: {
    metric: string
    baseline: number
    current: number
    improvement: number
    goal: number
  }[]
  status: 'planning' | 'active' | 'completed' | 'on_hold'
}

export interface DataSources {
  funnelEvents: FunnelEvent[]
  heatmapData: HeatmapDataPoint[]
  feedbackData: FeedbackData[]
  abTestResults?: any[]
  analyticsData?: any[]
}

class OptimizationEngine {
  private insights: OptimizationInsight[] = []
  private cycles: OptimizationCycle[] = []

  generateInsights(dataSources: DataSources): OptimizationInsight[] {
    const newInsights: OptimizationInsight[] = []

    // Analyze funnel data for conversion insights
    newInsights.push(...this.analyzeFunnelForInsights(dataSources.funnelEvents))

    // Analyze heatmap data for usability insights
    newInsights.push(...this.analyzeHeatmapForInsights(dataSources.heatmapData))

    // Analyze feedback for content and experience insights
    newInsights.push(...this.analyzeFeedbackForInsights(dataSources.feedbackData))

    // Cross-reference insights to find patterns
    newInsights.push(...this.findCrossDataPatterns(dataSources))

    // Filter out duplicate insights
    const uniqueInsights = this.deduplicateInsights(newInsights)

    // Store insights
    this.insights.push(...uniqueInsights)

    return uniqueInsights
  }

  private analyzeFunnelForInsights(funnelEvents: FunnelEvent[]): OptimizationInsight[] {
    const insights: OptimizationInsight[] = []
    const analysis = FunnelAnalyzer.calculateMetrics(funnelEvents)

    // Identify major drop-off points
    analysis.bottlenecks.forEach((bottleneck) => {
      if (bottleneck.severity === 'critical' || bottleneck.severity === 'high') {
        insights.push({
          id: `funnel_bottleneck_${bottleneck.stepId}`,
          type: 'conversion',
          severity: bottleneck.severity === 'critical' ? 'critical' : 'high',
          title: `Critical Drop-off at ${bottleneck.stepName}`,
          description: `${bottleneck.dropOffRate.toFixed(1)}% of users are dropping off at this step, significantly impacting overall conversion.`,
          evidence: [
            {
              source: 'funnel',
              data: bottleneck,
              confidence: 0.9,
            },
          ],
          impact: {
            estimated_improvement: bottleneck.dropOffRate * 0.3, // Conservative 30% improvement
            effort_required: 'medium',
            time_to_implement: '2-3 weeks',
          },
          recommendations: bottleneck.recommendations.map((rec) => ({
            action: rec,
            priority: 'high',
            resources_needed: ['UX Designer', 'Frontend Developer'],
            success_metrics: ['Conversion Rate', 'Time on Step', 'Error Rate'],
          })),
          affected_areas: [bottleneck.stepName],
          created_at: Date.now(),
          status: 'new',
        })
      }
    })

    // Identify steps with high average time
    analysis.stepMetrics.forEach((metric) => {
      if (metric.averageTimeSpent > 300) {
        // > 5 minutes
        insights.push({
          id: `funnel_time_${metric.stepId}`,
          type: 'usability',
          severity: 'medium',
          title: `Excessive Time Spent on ${metric.stepName}`,
          description: `Users are spending ${(metric.averageTimeSpent / 60).toFixed(1)} minutes on average, indicating potential usability issues.`,
          evidence: [
            {
              source: 'funnel',
              data: metric,
              confidence: 0.8,
            },
          ],
          impact: {
            estimated_improvement: 15,
            effort_required: 'low',
            time_to_implement: '1 week',
          },
          recommendations: [
            {
              action: 'Simplify form fields and improve instructions',
              priority: 'medium',
              resources_needed: ['Content Writer', 'UX Designer'],
              success_metrics: ['Average Time on Step', 'Completion Rate'],
            },
          ],
          affected_areas: [metric.stepName],
          created_at: Date.now(),
          status: 'new',
        })
      }
    })

    return insights
  }

  private analyzeHeatmapForInsights(heatmapData: HeatmapDataPoint[]): OptimizationInsight[] {
    const insights: OptimizationInsight[] = []

    // Analyze click patterns
    const clickHeatmap = HeatmapAnalyzer.generateClickHeatmap(heatmapData)
    const highClickAreas = clickHeatmap.filter((point) => point.intensity > 0.7)

    // Find heavily clicked non-interactive elements
    const nonInteractiveClicks = heatmapData.filter(
      (point) =>
        point.eventType === 'click' &&
        !['button', 'a', 'input', 'select', 'textarea'].includes(point.elementTag || '') &&
        !point.elementClass?.includes('btn') &&
        !point.elementClass?.includes('button')
    )

    if (nonInteractiveClicks.length > 10) {
      insights.push({
        id: 'heatmap_non_interactive_clicks',
        type: 'usability',
        severity: 'medium',
        title: 'Users Clicking Non-Interactive Elements',
        description: `${nonInteractiveClicks.length} clicks detected on non-interactive elements, suggesting user confusion about interface affordances.`,
        evidence: [
          {
            source: 'heatmap',
            data: { nonInteractiveClicks: nonInteractiveClicks.slice(0, 10) },
            confidence: 0.8,
          },
        ],
        impact: {
          estimated_improvement: 10,
          effort_required: 'low',
          time_to_implement: '3-5 days',
        },
        recommendations: [
          {
            action: 'Add visual cues and hover states to interactive elements',
            priority: 'medium',
            resources_needed: ['UI Designer', 'Frontend Developer'],
            success_metrics: ['Click Error Rate', 'User Satisfaction'],
          },
        ],
        affected_areas: ['UI Design', 'Interactive Elements'],
        created_at: Date.now(),
        status: 'new',
      })
    }

    // Analyze scroll behavior
    const scrollData = heatmapData.filter((point) => point.eventType === 'scroll')
    const maxScrollY = Math.max(...scrollData.map((point) => point.coordinates.y))
    const avgScrollDepth =
      scrollData.reduce((sum, point) => sum + point.coordinates.relativeY, 0) / scrollData.length

    if (avgScrollDepth < 0.5) {
      insights.push({
        id: 'heatmap_low_scroll_depth',
        type: 'content',
        severity: 'medium',
        title: 'Low Page Scroll Depth',
        description: `Average scroll depth is only ${(avgScrollDepth * 100).toFixed(1)}%, indicating users may not be seeing important content below the fold.`,
        evidence: [
          {
            source: 'heatmap',
            data: { avgScrollDepth, scrollDataCount: scrollData.length },
            confidence: 0.7,
          },
        ],
        impact: {
          estimated_improvement: 20,
          effort_required: 'medium',
          time_to_implement: '1-2 weeks',
        },
        recommendations: [
          {
            action: 'Optimize above-the-fold content and add scroll indicators',
            priority: 'medium',
            resources_needed: ['Content Strategist', 'UX Designer'],
            success_metrics: ['Scroll Depth', 'Content Engagement', 'Time on Page'],
          },
        ],
        affected_areas: ['Content Layout', 'Page Structure'],
        created_at: Date.now(),
        status: 'new',
      })
    }

    return insights
  }

  private analyzeFeedbackForInsights(feedbackData: FeedbackData[]): OptimizationInsight[] {
    const insights: OptimizationInsight[] = []
    const analysis = FeedbackAnalyzer.analyzeFeedbackData(feedbackData)

    // Low rating insights
    Object.entries(analysis.summary.avgRatings || {}).forEach(([metric, rating]) => {
      const ratingValue = Number(rating)
      if (ratingValue < 3) {
        insights.push({
          id: `feedback_low_rating_${metric}`,
          type: 'performance',
          severity: ratingValue < 2 ? 'critical' : 'high',
          title: `Poor User Rating for ${metric}`,
          description: `${metric} has an average rating of ${ratingValue.toFixed(1)}/10, indicating significant user dissatisfaction.`,
          evidence: [
            {
              source: 'feedback',
              data: { metric, rating: ratingValue, feedbackCount: feedbackData.length },
              confidence: 0.9,
            },
          ],
          impact: {
            estimated_improvement: (5 - ratingValue) * 10, // Potential improvement to reach good rating
            effort_required: 'high',
            time_to_implement: '3-4 weeks',
          },
          recommendations: [
            {
              action: `Redesign and improve ${metric} based on user feedback`,
              priority: 'high',
              resources_needed: ['Product Manager', 'UX Designer', 'Developer'],
              success_metrics: ['User Rating', 'NPS Score', 'User Satisfaction'],
            },
          ],
          affected_areas: [metric],
          created_at: Date.now(),
          status: 'new',
        })
      }
    })

    // Sentiment analysis insights
    const sentiment = analysis.sentimentAnalysis
    const negativePercentage =
      (sentiment.negative / (sentiment.positive + sentiment.neutral + sentiment.negative)) * 100

    if (negativePercentage > 30) {
      insights.push({
        id: 'feedback_negative_sentiment',
        type: 'performance',
        severity: 'high',
        title: 'High Negative Sentiment in Feedback',
        description: `${negativePercentage.toFixed(1)}% of feedback shows negative sentiment, indicating widespread user frustration.`,
        evidence: [
          {
            source: 'feedback',
            data: sentiment,
            confidence: 0.8,
          },
        ],
        impact: {
          estimated_improvement: 25,
          effort_required: 'high',
          time_to_implement: '4-6 weeks',
        },
        recommendations: [
          {
            action: 'Conduct detailed user research to identify root causes',
            priority: 'high',
            resources_needed: ['UX Researcher', 'Product Manager'],
            success_metrics: ['Sentiment Score', 'User Satisfaction', 'Retention Rate'],
          },
        ],
        affected_areas: ['Overall User Experience'],
        created_at: Date.now(),
        status: 'new',
      })
    }

    return insights
  }

  private findCrossDataPatterns(dataSources: DataSources): OptimizationInsight[] {
    const insights: OptimizationInsight[] = []

    // Find steps with both high drop-off and negative feedback
    const funnelAnalysis = FunnelAnalyzer.calculateMetrics(dataSources.funnelEvents)
    const feedbackAnalysis = FeedbackAnalyzer.analyzeFeedbackData(dataSources.feedbackData)

    funnelAnalysis.bottlenecks.forEach((bottleneck) => {
      const stepFeedback = feedbackAnalysis.stepAnalysis[bottleneck.stepId]
      if (stepFeedback && stepFeedback.ratings) {
        const avgRating =
          stepFeedback.ratings.reduce((a: number, b: number) => a + b, 0) /
          stepFeedback.ratings.length

        if (avgRating < 3 && bottleneck.dropOffRate > 30) {
          insights.push({
            id: `cross_pattern_${bottleneck.stepId}`,
            type: 'conversion',
            severity: 'critical',
            title: `Critical Issue: ${bottleneck.stepName} Shows Both High Drop-off and Poor Ratings`,
            description: `This step has ${bottleneck.dropOffRate.toFixed(1)}% drop-off rate AND average rating of ${avgRating.toFixed(1)}/5, indicating a critical user experience issue.`,
            evidence: [
              {
                source: 'funnel',
                data: bottleneck,
                confidence: 0.9,
              },
              {
                source: 'feedback',
                data: stepFeedback,
                confidence: 0.8,
              },
            ],
            impact: {
              estimated_improvement: 40,
              effort_required: 'high',
              time_to_implement: '4-6 weeks',
            },
            recommendations: [
              {
                action: 'Complete redesign of this step with user testing',
                priority: 'high',
                resources_needed: [
                  'UX Designer',
                  'UX Researcher',
                  'Frontend Developer',
                  'Product Manager',
                ],
                success_metrics: ['Drop-off Rate', 'User Rating', 'Completion Time', 'Error Rate'],
              },
            ],
            affected_areas: [bottleneck.stepName],
            created_at: Date.now(),
            status: 'new',
          })
        }
      }
    })

    return insights
  }

  private deduplicateInsights(insights: OptimizationInsight[]): OptimizationInsight[] {
    const uniqueInsights: OptimizationInsight[] = []
    const seenIds = new Set<string>()

    insights.forEach((insight) => {
      if (!seenIds.has(insight.id)) {
        seenIds.add(insight.id)
        uniqueInsights.push(insight)
      }
    })

    return uniqueInsights
  }

  createOptimizationCycle(
    name: string,
    objectives: string[],
    selectedInsights: OptimizationInsight[]
  ): OptimizationCycle {
    const cycle: OptimizationCycle = {
      id: `cycle_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      start_date: Date.now(),
      objectives,
      insights: selectedInsights,
      experiments: [],
      outcomes: [],
      status: 'planning',
    }

    this.cycles.push(cycle)
    return cycle
  }

  prioritizeInsights(insights: OptimizationInsight[]): OptimizationInsight[] {
    return insights.sort((a, b) => {
      // Priority scoring algorithm
      const getScore = (insight: OptimizationInsight) => {
        let score = 0

        // Severity weight
        const severityWeights = { critical: 40, high: 30, medium: 20, low: 10 }
        score += severityWeights[insight.severity]

        // Impact weight
        score += insight.impact.estimated_improvement * 0.5

        // Effort weight (inverse - lower effort = higher score)
        const effortWeights = { low: 20, medium: 10, high: 5 }
        score += effortWeights[insight.impact.effort_required]

        // Evidence confidence weight
        const avgConfidence =
          insight.evidence.reduce((sum, e) => sum + e.confidence, 0) / insight.evidence.length
        score += avgConfidence * 10

        return score
      }

      return getScore(b) - getScore(a)
    })
  }

  generateActionPlan(cycle: OptimizationCycle): {
    phases: {
      name: string
      duration: string
      tasks: {
        task: string
        owner: string
        dependencies: string[]
        deliverables: string[]
      }[]
    }[]
    timeline: string
    resources: string[]
    success_metrics: string[]
    risks: string[]
  } {
    const phases = [
      {
        name: 'Research & Analysis',
        duration: '1-2 weeks',
        tasks: cycle.insights
          .flatMap((insight) =>
            insight.recommendations.map((rec) => ({
              task: `Research: ${rec.action}`,
              owner: 'UX Researcher',
              dependencies: [],
              deliverables: ['Research Report', 'User Interview Insights'],
            }))
          )
          .slice(0, 5), // Limit tasks
      },
      {
        name: 'Design & Prototyping',
        duration: '2-3 weeks',
        tasks: cycle.insights
          .flatMap((insight) =>
            insight.recommendations.map((rec) => ({
              task: `Design: ${rec.action}`,
              owner: 'UX Designer',
              dependencies: ['Research Report'],
              deliverables: ['Design Mockups', 'Prototype', 'User Testing Plan'],
            }))
          )
          .slice(0, 5),
      },
      {
        name: 'Development & Testing',
        duration: '3-4 weeks',
        tasks: cycle.insights
          .flatMap((insight) =>
            insight.recommendations.map((rec) => ({
              task: `Implement: ${rec.action}`,
              owner: 'Frontend Developer',
              dependencies: ['Design Mockups'],
              deliverables: ['Implementation', 'Unit Tests', 'Integration Tests'],
            }))
          )
          .slice(0, 5),
      },
      {
        name: 'A/B Testing & Validation',
        duration: '2-3 weeks',
        tasks: [
          {
            task: 'Set up A/B tests for key changes',
            owner: 'Data Analyst',
            dependencies: ['Implementation'],
            deliverables: ['A/B Test Setup', 'Baseline Metrics', 'Test Results'],
          },
        ],
      },
    ]

    const allResources = new Set<string>()
    const allMetrics = new Set<string>()

    cycle.insights.forEach((insight) => {
      insight.recommendations.forEach((rec) => {
        rec.resources_needed.forEach((resource) => allResources.add(resource))
        rec.success_metrics.forEach((metric) => allMetrics.add(metric))
      })
    })

    const risks = [
      'Resource availability conflicts',
      'Technical implementation complexity',
      'User adoption resistance',
      'Timeline delays due to scope creep',
      'Insufficient A/B test sample size',
    ]

    return {
      phases,
      timeline: '8-12 weeks total',
      resources: Array.from(allResources),
      success_metrics: Array.from(allMetrics),
      risks,
    }
  }

  trackProgress(cycleId: string, updates: Partial<OptimizationCycle>): void {
    const cycle = this.cycles.find((c) => c.id === cycleId)
    if (cycle) {
      Object.assign(cycle, updates)
    }
  }

  generateReport(cycleId: string): any {
    const cycle = this.cycles.find((c) => c.id === cycleId)
    if (!cycle) return null

    const completedInsights = cycle.insights.filter((i) => i.status === 'implemented').length
    const totalInsights = cycle.insights.length
    const progress = (completedInsights / totalInsights) * 100

    const totalEstimatedImprovement = cycle.insights.reduce(
      (sum, insight) => sum + insight.impact.estimated_improvement,
      0
    )

    const actualImprovement = cycle.outcomes.reduce((sum, outcome) => sum + outcome.improvement, 0)

    return {
      cycle_summary: {
        name: cycle.name,
        status: cycle.status,
        progress: `${progress.toFixed(1)}%`,
        duration: cycle.end_date
          ? `${Math.ceil((cycle.end_date - cycle.start_date) / (1000 * 60 * 60 * 24))} days`
          : 'In progress',
      },
      insights_summary: {
        total: totalInsights,
        completed: completedInsights,
        in_progress: cycle.insights.filter((i) => i.status === 'in_progress').length,
        testing: cycle.insights.filter((i) => i.status === 'testing').length,
      },
      impact_summary: {
        estimated_improvement: `${totalEstimatedImprovement.toFixed(1)}%`,
        actual_improvement: `${actualImprovement.toFixed(1)}%`,
        roi: actualImprovement > 0 ? 'Positive' : 'Pending',
      },
      outcomes: cycle.outcomes,
      next_steps: this.generateNextSteps(cycle),
    }
  }

  private generateNextSteps(cycle: OptimizationCycle): string[] {
    const nextSteps: string[] = []

    const pendingInsights = cycle.insights.filter((i) => i.status === 'new')
    const inProgressInsights = cycle.insights.filter((i) => i.status === 'in_progress')
    const testingInsights = cycle.insights.filter((i) => i.status === 'testing')

    if (pendingInsights.length > 0) {
      nextSteps.push(`Begin implementation of ${pendingInsights.length} pending insights`)
    }

    if (testingInsights.length > 0) {
      nextSteps.push(`Monitor A/B test results for ${testingInsights.length} experiments`)
    }

    if (cycle.outcomes.length === 0) {
      nextSteps.push('Establish baseline metrics and measurement framework')
    }

    if (cycle.status === 'planning') {
      nextSteps.push('Finalize resource allocation and timeline')
      nextSteps.push('Begin research phase for high-priority insights')
    }

    return nextSteps
  }

  getAllInsights(): OptimizationInsight[] {
    return [...this.insights]
  }

  getAllCycles(): OptimizationCycle[] {
    return [...this.cycles]
  }
}

// React hook for optimization management
export function useOptimizationEngine() {
  const [engine] = useState(() => new OptimizationEngine())

  const generateInsights = useCallback(
    (dataSources: DataSources) => {
      return engine.generateInsights(dataSources)
    },
    [engine]
  )

  const createOptimizationCycle = useCallback(
    (name: string, objectives: string[], selectedInsights: OptimizationInsight[]) => {
      return engine.createOptimizationCycle(name, objectives, selectedInsights)
    },
    [engine]
  )

  const prioritizeInsights = useCallback(
    (insights: OptimizationInsight[]) => {
      return engine.prioritizeInsights(insights)
    },
    [engine]
  )

  const generateActionPlan = useCallback(
    (cycle: OptimizationCycle) => {
      return engine.generateActionPlan(cycle)
    },
    [engine]
  )

  const trackProgress = useCallback(
    (cycleId: string, updates: Partial<OptimizationCycle>) => {
      engine.trackProgress(cycleId, updates)
    },
    [engine]
  )

  const generateReport = useCallback(
    (cycleId: string) => {
      return engine.generateReport(cycleId)
    },
    [engine]
  )

  return {
    generateInsights,
    createOptimizationCycle,
    prioritizeInsights,
    generateActionPlan,
    trackProgress,
    generateReport,
    getAllInsights: engine.getAllInsights.bind(engine),
    getAllCycles: engine.getAllCycles.bind(engine),
  }
}
