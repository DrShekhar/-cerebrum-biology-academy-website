'use client'

import React, { useState, useEffect, useMemo } from 'react'
import {
  OptimizationInsight,
  OptimizationCycle,
  DataSources,
  useOptimizationEngine,
} from '../../lib/optimization/iterativeImprovement'

interface OptimizationDashboardProps {
  dataSources: DataSources
  className?: string
}

export function OptimizationDashboard({ dataSources, className = '' }: OptimizationDashboardProps) {
  const {
    generateInsights,
    createOptimizationCycle,
    prioritizeInsights,
    generateActionPlan,
    getAllInsights,
    getAllCycles,
    generateReport,
  } = useOptimizationEngine()

  const [insights, setInsights] = useState<OptimizationInsight[]>([])
  const [cycles, setCycles] = useState<OptimizationCycle[]>([])
  const [selectedInsights, setSelectedInsights] = useState<Set<string>>(new Set())
  const [activeTab, setActiveTab] = useState<'insights' | 'cycles' | 'reports'>('insights')
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false)

  // Generate insights when data sources change
  useEffect(() => {
    if (
      dataSources.funnelEvents.length > 0 ||
      dataSources.heatmapData.length > 0 ||
      dataSources.feedbackData.length > 0
    ) {
      setIsGeneratingInsights(true)
      const newInsights = generateInsights(dataSources)
      const prioritizedInsights = prioritizeInsights(newInsights)
      setInsights(prioritizedInsights)
      setIsGeneratingInsights(false)
    }
  }, [dataSources, generateInsights, prioritizeInsights])

  // Load existing cycles
  useEffect(() => {
    setCycles(getAllCycles())
  }, [getAllCycles])

  const handleInsightSelection = (insightId: string) => {
    const newSelection = new Set(selectedInsights)
    if (newSelection.has(insightId)) {
      newSelection.delete(insightId)
    } else {
      newSelection.add(insightId)
    }
    setSelectedInsights(newSelection)
  }

  const handleCreateCycle = () => {
    const selectedInsightObjects = insights.filter((insight) => selectedInsights.has(insight.id))
    if (selectedInsightObjects.length === 0) return

    const cycleName = `Optimization Cycle ${cycles.length + 1}`
    const objectives = [
      'Improve conversion rate',
      'Enhance user experience',
      'Reduce drop-off rates',
    ]

    const newCycle = createOptimizationCycle(cycleName, objectives, selectedInsightObjects)
    setCycles([...cycles, newCycle])
    setSelectedInsights(new Set())
  }

  const criticalInsights = insights.filter((i) => i.severity === 'critical')
  const highInsights = insights.filter((i) => i.severity === 'high')
  const mediumInsights = insights.filter((i) => i.severity === 'medium')

  return (
    <div className={`optimization-dashboard ${className}`}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Optimization Dashboard</h1>
            <p className="text-gray-600 mt-1">Data-driven insights and improvement cycles</p>
          </div>
          <div className="flex space-x-4">
            <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</div>
            {selectedInsights.size > 0 && (
              <button
                onClick={handleCreateCycle}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Create Cycle ({selectedInsights.size} insights)
              </button>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-red-700">{criticalInsights.length}</div>
            <div className="text-sm text-red-600">Critical Issues</div>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-orange-700">{highInsights.length}</div>
            <div className="text-sm text-orange-600">High Priority</div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-700">{mediumInsights.length}</div>
            <div className="text-sm text-yellow-600">Medium Priority</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-700">
              {cycles.filter((c) => c.status === 'active').length}
            </div>
            <div className="text-sm text-green-600">Active Cycles</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-50 border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {[
            { key: 'insights', label: 'Insights', count: insights.length },
            { key: 'cycles', label: 'Optimization Cycles', count: cycles.length },
            {
              key: 'reports',
              label: 'Reports',
              count: cycles.filter((c) => c.status === 'completed').length,
            },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'insights' && (
          <InsightsView
            insights={insights}
            selectedInsights={selectedInsights}
            onInsightSelection={handleInsightSelection}
            isLoading={isGeneratingInsights}
          />
        )}

        {activeTab === 'cycles' && (
          <CyclesView
            cycles={cycles}
            onCycleUpdate={(cycleId, updates) => {
              setCycles(cycles.map((c) => (c.id === cycleId ? { ...c, ...updates } : c)))
            }}
            generateActionPlan={generateActionPlan}
          />
        )}

        {activeTab === 'reports' && (
          <ReportsView
            cycles={cycles.filter((c) => c.status === 'completed')}
            generateReport={generateReport}
          />
        )}
      </div>
    </div>
  )
}

interface InsightsViewProps {
  insights: OptimizationInsight[]
  selectedInsights: Set<string>
  onInsightSelection: (id: string) => void
  isLoading: boolean
}

function InsightsView({
  insights,
  selectedInsights,
  onInsightSelection,
  isLoading,
}: InsightsViewProps) {
  const [filterSeverity, setFilterSeverity] = useState<string>('all')
  const [filterType, setFilterType] = useState<string>('all')

  const filteredInsights = useMemo(() => {
    return insights.filter((insight) => {
      if (filterSeverity !== 'all' && insight.severity !== filterSeverity) return false
      if (filterType !== 'all' && insight.type !== filterType) return false
      return true
    })
  }, [insights, filterSeverity, filterType])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Analyzing data for optimization insights...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Filters */}
      <div className="flex space-x-4 mb-6">
        <select
          value={filterSeverity}
          onChange={(e) => setFilterSeverity(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2"
        >
          <option value="all">All Severities</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2"
        >
          <option value="all">All Types</option>
          <option value="performance">Performance</option>
          <option value="usability">Usability</option>
          <option value="conversion">Conversion</option>
          <option value="content">Content</option>
          <option value="technical">Technical</option>
        </select>
      </div>

      {/* Insights List */}
      <div className="space-y-4">
        {filteredInsights.map((insight) => (
          <InsightCard
            key={insight.id}
            insight={insight}
            isSelected={selectedInsights.has(insight.id)}
            onSelect={() => onInsightSelection(insight.id)}
          />
        ))}

        {filteredInsights.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">No insights found</div>
            <p className="text-gray-500 mt-2">
              Try adjusting your filters or generate new insights
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

interface InsightCardProps {
  insight: OptimizationInsight
  isSelected: boolean
  onSelect: () => void
}

function InsightCard({ insight, isSelected, onSelect }: InsightCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'performance':
        return '⚡'
      case 'usability':
        return '👤'
      case 'conversion':
        return '📈'
      case 'content':
        return '📝'
      case 'technical':
        return '🔧'
      default:
        return '💡'
    }
  }

  return (
    <div
      className={`border rounded-lg p-4 transition-all ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={onSelect}
              className="w-4 h-4 text-blue-500 border-gray-300 rounded"
            />
            <span className="text-lg">{getTypeIcon(insight.type)}</span>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(insight.severity)}`}
            >
              {insight.severity.toUpperCase()}
            </span>
            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
              {insight.type}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">{insight.title}</h3>
          <p className="text-gray-600 mb-3">{insight.description}</p>

          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
            <span>Impact: +{insight.impact.estimated_improvement}%</span>
            <span>Effort: {insight.impact.effort_required}</span>
            <span>Time: {insight.impact.time_to_implement}</span>
          </div>

          {isExpanded && (
            <div className="mt-4 space-y-4">
              {/* Evidence */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Evidence Sources</h4>
                <div className="space-y-2">
                  {insight.evidence.map((evidence, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                        {evidence.source}
                      </span>
                      <span className="text-gray-600">
                        Confidence: {(evidence.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Recommendations</h4>
                <div className="space-y-2">
                  {insight.recommendations.map((rec, index) => (
                    <div key={index} className="border border-gray-200 rounded p-3">
                      <div className="font-medium text-gray-900">{rec.action}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Priority: {rec.priority} | Resources: {rec.resources_needed.join(', ')}
                      </div>
                      <div className="text-sm text-gray-600">
                        Success Metrics: {rec.success_metrics.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-gray-600 ml-4"
        >
          <svg
            className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

interface CyclesViewProps {
  cycles: OptimizationCycle[]
  onCycleUpdate: (cycleId: string, updates: Partial<OptimizationCycle>) => void
  generateActionPlan: (cycle: OptimizationCycle) => any
}

function CyclesView({ cycles, onCycleUpdate, generateActionPlan }: CyclesViewProps) {
  const [selectedCycle, setSelectedCycle] = useState<OptimizationCycle | null>(null)

  if (cycles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg">No optimization cycles yet</div>
        <p className="text-gray-500 mt-2">
          Select insights to create your first optimization cycle
        </p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cycles List */}
        <div className="lg:col-span-2 space-y-4">
          {cycles.map((cycle) => (
            <div
              key={cycle.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedCycle?.id === cycle.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedCycle(cycle)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{cycle.name}</h3>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    cycle.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : cycle.status === 'completed'
                        ? 'bg-blue-100 text-blue-800'
                        : cycle.status === 'planning'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {cycle.status}
                </span>
              </div>

              <div className="text-sm text-gray-600 mb-3">
                {cycle.insights.length} insights • Started{' '}
                {new Date(cycle.start_date).toLocaleDateString()}
              </div>

              <div className="flex flex-wrap gap-1">
                {cycle.objectives.slice(0, 3).map((objective, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {objective}
                  </span>
                ))}
                {cycle.objectives.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    +{cycle.objectives.length - 3} more
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Cycle Details */}
        <div className="lg:col-span-1">
          {selectedCycle ? (
            <CycleDetailsPanel
              cycle={selectedCycle}
              onUpdate={(updates) => onCycleUpdate(selectedCycle.id, updates)}
              generateActionPlan={generateActionPlan}
            />
          ) : (
            <div className="border border-gray-200 rounded-lg p-6 text-center text-gray-500">
              Select a cycle to view details
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface CycleDetailsPanelProps {
  cycle: OptimizationCycle
  onUpdate: (updates: Partial<OptimizationCycle>) => void
  generateActionPlan: (cycle: OptimizationCycle) => any
}

function CycleDetailsPanel({ cycle, onUpdate, generateActionPlan }: CycleDetailsPanelProps) {
  const [showActionPlan, setShowActionPlan] = useState(false)
  const actionPlan = useMemo(() => generateActionPlan(cycle), [cycle, generateActionPlan])

  const handleStatusChange = (newStatus: OptimizationCycle['status']) => {
    onUpdate({ status: newStatus })
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-4">
      <div>
        <h3 className="font-semibold text-lg mb-2">{cycle.name}</h3>
        <select
          value={cycle.status}
          onChange={(e) => handleStatusChange(e.target.value as OptimizationCycle['status'])}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="planning">Planning</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="on_hold">On Hold</option>
        </select>
      </div>

      <div>
        <h4 className="font-medium mb-2">Objectives</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          {cycle.objectives.map((objective, index) => (
            <li key={index}>• {objective}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-medium mb-2">Insights ({cycle.insights.length})</h4>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {cycle.insights.map((insight) => (
            <div key={insight.id} className="text-sm p-2 bg-gray-50 rounded">
              <div className="font-medium">{insight.title}</div>
              <div className="text-gray-600">
                {insight.severity} • {insight.type}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => setShowActionPlan(!showActionPlan)}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        {showActionPlan ? 'Hide' : 'Show'} Action Plan
      </button>

      {showActionPlan && (
        <div className="space-y-3">
          <div>
            <h4 className="font-medium mb-2">Timeline</h4>
            <p className="text-sm text-gray-600">{actionPlan.timeline}</p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Phases</h4>
            <div className="space-y-2">
              {actionPlan.phases.map((phase: any, index: number) => (
                <div key={index} className="text-sm border border-gray-200 rounded p-2">
                  <div className="font-medium">{phase.name}</div>
                  <div className="text-gray-600">{phase.duration}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Resources Needed</h4>
            <div className="flex flex-wrap gap-1">
              {actionPlan.resources.map((resource: string, index: number) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  {resource}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

interface ReportsViewProps {
  cycles: OptimizationCycle[]
  generateReport: (cycleId: string) => any
}

function ReportsView({ cycles, generateReport }: ReportsViewProps) {
  if (cycles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg">No completed cycles yet</div>
        <p className="text-gray-500 mt-2">Complete optimization cycles to see reports</p>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {cycles.map((cycle) => {
        const report = generateReport(cycle.id)
        return (
          <div key={cycle.id} className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">{cycle.name} - Final Report</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-700">
                  {report.cycle_summary.progress}
                </div>
                <div className="text-sm text-blue-600">Progress</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-700">
                  {report.impact_summary.actual_improvement}
                </div>
                <div className="text-sm text-green-600">Actual Improvement</div>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-700">
                  {report.cycle_summary.duration}
                </div>
                <div className="text-sm text-purple-600">Duration</div>
              </div>
            </div>

            {report.outcomes.length > 0 && (
              <div>
                <h4 className="font-medium mb-3">Outcomes</h4>
                <div className="space-y-2">
                  {report.outcomes.map((outcome: any, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded"
                    >
                      <span>{outcome.metric}</span>
                      <span
                        className={`font-medium ${
                          outcome.improvement > 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {outcome.improvement > 0 ? '+' : ''}
                        {outcome.improvement.toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
