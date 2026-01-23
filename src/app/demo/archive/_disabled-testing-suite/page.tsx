'use client'

import React, { useState, useEffect } from 'react'
import { ConversionFunnelChart } from '../../../../components/analytics/ConversionFunnelChart'
import {
  HeatmapVisualization,
  HeatmapStats,
} from '../../../../components/analytics/HeatmapVisualization'
import { FeedbackModal, QuickFeedbackWidget } from '../../../../components/feedback/FeedbackModal'
import { OptimizationDashboard } from '../../../../components/optimization/OptimizationDashboard'
import { useFeedbackCollection } from '../../../../lib/feedback/feedbackCollection'
import { useHeatmapTracking } from '../../../../lib/heatmap/heatmapTracking'
import { useFunnelAnalytics } from '../../../../hooks/useFunnelAnalytics'

// Demo data generators
import {
  generateDemoFunnelData,
  generateDemoHeatmapData,
  generateDemoFeedbackData,
  generateFunnelMetrics,
} from '../../../../lib/demo/demoDataGenerators'

export default function TestingSuiteDemoPage() {
  const [activeDemo, setActiveDemo] = useState<
    'funnel' | 'heatmap' | 'feedback' | 'optimization' | 'overview'
  >('overview')
  const [userId] = useState(() => `demo_user_${Date.now()}`)
  const [currentStep, setCurrentStep] = useState(0)

  // Initialize tracking hooks
  const { trackStepEntry, trackStepCompletion } = useFunnelAnalytics(userId)
  const { isTracking } = useHeatmapTracking(userId, true)
  const { activeSurvey, submitSurveyResponse, submitQuickFeedback, dismissSurvey } =
    useFeedbackCollection(userId, currentStep)

  // Demo data
  const [demoData, setDemoData] = useState(() => {
    const funnelEvents = generateDemoFunnelData(100)
    const funnelMetrics = generateFunnelMetrics(funnelEvents)
    return {
      funnelEvents,
      funnelMetrics,
      heatmapData: generateDemoHeatmapData(500),
      feedbackData: generateDemoFeedbackData(50),
    }
  })

  // Simulate step progression for demo
  useEffect(() => {
    trackStepEntry('landing_page_view')
  }, [trackStepEntry])

  const handleStepChange = (step: number) => {
    if (currentStep !== step) {
      trackStepCompletion(`step_${currentStep}`)
      setCurrentStep(step)
      trackStepEntry(`step_${step}`)
    }
  }

  const demoSections = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'funnel', name: 'Conversion Funnel', icon: '🔄' },
    { id: 'heatmap', name: 'Heatmap Analytics', icon: '🔥' },
    { id: 'feedback', name: 'Feedback Collection', icon: '💬' },
    { id: 'optimization', name: 'Optimization Dashboard', icon: '🚀' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Testing & Analytics Suite Demo</h1>
              <p className="text-gray-600 mt-2">
                Comprehensive testing and optimization tools for Cerebrum Biology Academy
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Tracking Status:{' '}
                <span className={`font-medium ${isTracking ? 'text-green-600' : 'text-red-600'}`}>
                  {isTracking ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                Demo User: <code className="bg-gray-100 px-2 py-1 rounded">{userId}</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {demoSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveDemo(section.id as any)}
                className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeDemo === section.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{section.icon}</span>
                <span>{section.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeDemo === 'overview' && <OverviewDemo demoData={demoData} />}
        {activeDemo === 'funnel' && <FunnelDemo demoData={demoData} />}
        {activeDemo === 'heatmap' && <HeatmapDemo demoData={demoData} />}
        {activeDemo === 'feedback' && (
          <FeedbackDemo currentStep={currentStep} onStepChange={handleStepChange} />
        )}
        {activeDemo === 'optimization' && <OptimizationDemo demoData={demoData} />}
      </div>

      {/* Feedback Modal */}
      {activeSurvey && (
        <FeedbackModal
          survey={activeSurvey}
          isOpen={!!activeSurvey}
          onSubmit={submitSurveyResponse}
          onDismiss={dismissSurvey}
        />
      )}

      {/* Quick Feedback Widget */}
      <QuickFeedbackWidget onSubmit={submitQuickFeedback} />
    </div>
  )
}

function OverviewDemo({ demoData }: { demoData: any }) {
  const stats = {
    totalEvents: demoData.funnelEvents.length + demoData.heatmapData.length,
    totalFeedback: demoData.feedbackData.length,
    conversionRate: 23.4,
    avgSessionTime: 8.5,
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Testing & Analytics Suite Overview
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          This demo showcases the comprehensive testing and optimization framework built for the
          NEET course selector. Each component works together to provide data-driven insights for
          continuous improvement.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-blue-600">
            {stats.totalEvents.toLocaleString()}
          </div>
          <div className="text-gray-600 mt-2">Total Events Tracked</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-green-600">{stats.totalFeedback}</div>
          <div className="text-gray-600 mt-2">Feedback Responses</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-purple-600">{stats.conversionRate}%</div>
          <div className="text-gray-600 mt-2">Conversion Rate</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-orange-600">{stats.avgSessionTime}m</div>
          <div className="text-gray-600 mt-2">Avg Session Time</div>
        </div>
      </div>

      {/* Features Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard
          icon="🔄"
          title="Conversion Funnel Analysis"
          description="Track user journey through 17 defined steps with real-time drop-off analysis and bottleneck identification."
          features={[
            '17-step funnel tracking',
            'Real-time analytics',
            'Bottleneck identification',
            'Cohort analysis',
          ]}
        />
        <FeatureCard
          icon="🔥"
          title="Heatmap & Behavior Tracking"
          description="Comprehensive user interaction tracking with click patterns, scroll behavior, and element engagement analysis."
          features={['Click heatmaps', 'Scroll tracking', 'Mouse movement', 'Form interactions']}
        />
        <FeatureCard
          icon="💬"
          title="Feedback Collection"
          description="Smart feedback collection with contextual surveys, NPS scoring, and critical issue alerts."
          features={['5 survey types', 'Smart triggering', 'Sentiment analysis', 'Critical alerts']}
        />
        <FeatureCard
          icon="🧪"
          title="A/B Testing Framework"
          description="Statistical A/B testing with 20+ pre-configured variants for key decision points."
          features={[
            '20+ test variants',
            'Statistical significance',
            'Automated analysis',
            'Winner detection',
          ]}
        />
        <FeatureCard
          icon="👥"
          title="User Testing Scenarios"
          description="5 detailed personas with comprehensive testing scenarios for systematic user validation."
          features={['5 NEET personas', '20+ test scenarios', 'Result tracking', 'Success metrics']}
        />
        <FeatureCard
          icon="🚀"
          title="Optimization Engine"
          description="AI-powered insight generation with actionable recommendations and improvement cycles."
          features={['AI insights', 'Action plans', 'ROI tracking', 'Progress monitoring']}
        />
      </div>

      {/* Implementation Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Implementation Status</h3>
        <div className="space-y-3">
          {[
            { name: 'User Testing Scenarios', status: 'complete' },
            { name: 'A/B Testing Variants', status: 'complete' },
            { name: 'Conversion Funnel Analysis', status: 'complete' },
            { name: 'Heatmap Integration', status: 'complete' },
            { name: 'Feedback Collection', status: 'complete' },
            { name: 'Optimization Framework', status: 'complete' },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="font-medium">{item.name}</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                ✓ Complete
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  features,
}: {
  icon: string
  title: string
  description: string
  features: string[]
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <ul className="space-y-1">
        {features.map((feature, index) => (
          <li key={index} className="text-sm text-gray-500 flex items-center">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}

function FunnelDemo({ demoData }: { demoData: any }) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Conversion Funnel Analysis</h2>
        <p className="text-gray-600">
          Track user progression through the complete course selection journey with detailed
          analytics.
        </p>
      </div>

      <ConversionFunnelChart
        metrics={demoData.funnelMetrics || []}
        height={600}
        showLabels={true}
        showPercentages={true}
        colorScheme="gradient"
      />
    </div>
  )
}

function HeatmapDemo({ demoData }: { demoData: any }) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Heatmap & Behavior Analytics</h2>
        <p className="text-gray-600">
          Visualize user interactions, click patterns, and engagement across the interface.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Click Heatmap</h3>
          <div className="relative h-64 bg-gray-100 rounded">
            <HeatmapVisualization
              dataPoints={demoData.heatmapData}
              width={400}
              height={256}
              type="click"
              overlay={false}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Interaction Statistics</h3>
          <HeatmapStats dataPoints={demoData.heatmapData} />
        </div>
      </div>
    </div>
  )
}

function FeedbackDemo({
  currentStep,
  onStepChange,
}: {
  currentStep: number
  onStepChange: (step: number) => void
}) {
  const [showDemo, setShowDemo] = useState(false)

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Feedback Collection System</h2>
        <p className="text-gray-600">
          Smart feedback collection with contextual surveys and real-time user insights.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Step Simulation</h3>
        <p className="text-gray-600 mb-4">
          Navigate through different steps to see how feedback collection triggers work:
        </p>

        <div className="flex space-x-2 mb-6">
          {Array.from({ length: 8 }, (_, i) => (
            <button
              key={i}
              onClick={() => onStepChange(i)}
              className={`px-4 py-2 rounded ${
                currentStep === i
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Step {i + 1}
            </button>
          ))}
        </div>

        <div className="text-sm text-gray-600 mb-4">
          Current Step: <span className="font-medium">Step {currentStep + 1}</span>
        </div>

        <button
          onClick={() => setShowDemo(true)}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          Trigger Demo Feedback Survey
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Survey Types Available</h3>
          <div className="space-y-3">
            {[
              { name: 'Step Completion Feedback', trigger: 'After completing each step' },
              { name: 'Course Recommendation Feedback', trigger: 'On recommendations page' },
              { name: 'Exit Intent Survey', trigger: 'When user attempts to leave' },
              { name: 'NPS Survey', trigger: 'After final selection' },
              { name: 'Technical Issue Report', trigger: 'On error occurrence' },
            ].map((survey, index) => (
              <div key={index} className="border border-gray-200 rounded p-3">
                <div className="font-medium text-gray-900">{survey.name}</div>
                <div className="text-sm text-gray-600">{survey.trigger}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Question Types</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>Rating Scales (1-5, 1-10)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              <span>Text Responses</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span>Multiple Choice</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>Checkbox Lists</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span>Emoji Reactions</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span>Net Promoter Score</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function OptimizationDemo({ demoData }: { demoData: any }) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Optimization Dashboard</h2>
        <p className="text-gray-600">
          AI-powered insights and systematic improvement cycles based on comprehensive data
          analysis.
        </p>
      </div>

      <OptimizationDashboard
        dataSources={{
          funnelEvents: demoData.funnelEvents,
          heatmapData: demoData.heatmapData,
          feedbackData: demoData.feedbackData,
        }}
      />
    </div>
  )
}
