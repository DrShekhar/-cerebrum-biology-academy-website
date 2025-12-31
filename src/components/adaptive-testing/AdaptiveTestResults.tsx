/**
 * Adaptive Test Results Component
 * Comprehensive results display with detailed analytics and recommendations
 */

'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Award,
  TrendingUp,
  Target,
  Brain,
  Clock,
  Zap,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  Download,
  Share2,
  RefreshCw,
  BookOpen,
  Lightbulb,
  Activity,
  Eye,
  ArrowRight,
  Star,
  Calendar,
  Users,
  Gauge
} from 'lucide-react'

interface AdaptiveTestResults {
  sessionId: string
  results: {
    finalScore: number
    percentileRank: number
    masteryLevel: string
    abilityEstimate: {
      theta: number
      standardError: number
      confidence: number
    }
    topicScores: Record<string, number>
  }
  performance: {
    itemsCompleted: number
    totalTime: number
    averageItemTime: number
    accuracy: number
    efficiency: number
  }
  adaptations: {
    totalAdjustments: number
    adaptationTypes: string[]
    interventions: string[]
    personalizations: string[]
  }
  gaps: {
    identifiedGaps: string[]
    criticalGaps: string[]
    recommendations: string[]
    hasRemediationPlan: boolean
  }
  predictions: {
    futurePerformance: number
    readinessLevel: string
    riskFactors: string[]
    strengths: string[]
  }
  diagnostics: {
    algorithmPerformance: {
      convergence: boolean
      iterations: number
      finalSE: number
    }
    adaptationEffectiveness: number
    systemMetrics: {
      sessionDuration: number
      responseRate: number
      systemAdaptations: number
    }
  }
}

interface AdaptiveTestResultsProps {
  results: AdaptiveTestResults
  onRetakeTest?: () => void
  onViewDetailedReport?: () => void
  onDownloadReport?: () => void
  onShareResults?: () => void
}

const AdaptiveTestResults: React.FC<AdaptiveTestResultsProps> = ({
  results,
  onRetakeTest,
  onViewDetailedReport,
  onDownloadReport,
  onShareResults
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'adaptations' | 'gaps' | 'recommendations'>('overview')
  const [showDiagnostics, setShowDiagnostics] = useState(false)

  const getScoreColor = (score: number): string => {
    if (score >= 85) return 'text-green-600'
    if (score >= 70) return 'text-blue-600'
    if (score >= 55) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreGrade = (score: number): string => {
    if (score >= 90) return 'A+'
    if (score >= 85) return 'A'
    if (score >= 80) return 'A-'
    if (score >= 75) return 'B+'
    if (score >= 70) return 'B'
    if (score >= 65) return 'B-'
    if (score >= 60) return 'C+'
    if (score >= 55) return 'C'
    if (score >= 50) return 'C-'
    return 'D'
  }

  const getMasteryColor = (level: string): string => {
    switch (level.toLowerCase()) {
      case 'advanced': return 'bg-green-600'
      case 'proficient': return 'from-blue-500 to-blue-500'
      case 'developing': return 'from-yellow-500 to-orange-500'
      case 'beginning': return 'bg-orange-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const formatTime = (minutes: number): string => {
    const hrs = Math.floor(minutes / 60)
    const mins = Math.round(minutes % 60)
    if (hrs > 0) {
      return `${hrs}h ${mins}m`
    }
    return `${mins}m`
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-3">
          <div className={`p-4 bg-gradient-to-r ${getMasteryColor(results.results.masteryLevel)} rounded-xl`}>
            <Award className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Test Complete!</h1>
            <p className="text-gray-600">Your adaptive assessment results are ready</p>
          </div>
        </div>
      </motion.div>

      {/* Score Overview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl border-2 border-gray-200 p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Score */}
          <div className="text-center">
            <div className={`text-6xl font-bold ${getScoreColor(results.results.finalScore)} mb-2`}>
              {results.results.finalScore}
            </div>
            <div className="text-2xl font-semibold text-gray-700 mb-1">
              {getScoreGrade(results.results.finalScore)}
            </div>
            <div className="text-gray-600">Final Score</div>
            <div className="mt-2 text-sm text-gray-500">
              {results.results.percentileRank}th percentile
            </div>
          </div>

          {/* Mastery Level */}
          <div className="text-center">
            <div className={`inline-block px-6 py-3 rounded-xl bg-gradient-to-r ${getMasteryColor(results.results.masteryLevel)} text-white text-xl font-bold mb-2`}>
              {results.results.masteryLevel}
            </div>
            <div className="text-gray-600 mb-2">Mastery Level</div>
            <div className="text-sm text-gray-500">
              Ability: {results.results.abilityEstimate.theta.toFixed(2)} ± {results.results.abilityEstimate.standardError.toFixed(2)}
            </div>
            <div className="text-sm text-gray-500">
              Confidence: {Math.round(results.results.abilityEstimate.confidence * 100)}%
            </div>
          </div>

          {/* Performance Summary */}
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {results.performance.accuracy}%
            </div>
            <div className="text-gray-600 mb-2">Accuracy</div>
            <div className="space-y-1 text-sm text-gray-500">
              <div>{results.performance.itemsCompleted} questions</div>
              <div>{formatTime(results.performance.totalTime)} total time</div>
              <div>{Math.round(results.performance.averageItemTime)} min/question</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={onViewDetailedReport}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Eye className="w-4 h-4" />
          View Detailed Report
        </button>
        <button
          onClick={onDownloadReport}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download Report
        </button>
        <button
          onClick={onShareResults}
          className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Share2 className="w-4 h-4" />
          Share Results
        </button>
        {onRetakeTest && (
          <button
            onClick={onRetakeTest}
            className="flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Retake Test
          </button>
        )}
      </div>

      {/* Detailed Results Tabs */}
      <div className="bg-white rounded-xl border">
        {/* Tab Navigation */}
        <div className="border-b">
          <div className="flex flex-wrap">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'performance', label: 'Performance', icon: TrendingUp },
              { id: 'adaptations', label: 'Adaptations', icon: Zap },
              { id: 'gaps', label: 'Learning Gaps', icon: AlertTriangle },
              { id: 'recommendations', label: 'Recommendations', icon: Lightbulb }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Topic Scores */}
                {Object.keys(results.results.topicScores).length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      Topic Performance
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(results.results.topicScores).map(([topic, score]) => (
                        <div key={topic} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <div className="font-medium text-gray-900">{topic}</div>
                            <div className={`font-bold ${getScoreColor(score)}`}>
                              {Math.round(score)}%
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full bg-gradient-to-r ${
                                score >= 80 ? 'from-green-400 to-green-600' :
                                score >= 60 ? 'from-blue-400 to-blue-600' :
                                score >= 40 ? 'from-yellow-400 to-yellow-600' :
                                'from-red-400 to-red-600'
                              }`}
                              style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Strengths and Areas for Improvement */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Strengths */}
                  {results.predictions.strengths.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Star className="w-5 h-5 text-green-600" />
                        Strengths
                      </h3>
                      <div className="space-y-2">
                        {results.predictions.strengths.map((strength, index) => (
                          <div key={index} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-green-800">{strength}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Risk Factors */}
                  {results.predictions.riskFactors.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-orange-600" />
                        Areas for Focus
                      </h3>
                      <div className="space-y-2">
                        {results.predictions.riskFactors.map((risk, index) => (
                          <div key={index} className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg">
                            <AlertTriangle className="w-4 h-4 text-orange-600 flex-shrink-0" />
                            <span className="text-orange-800">{risk}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'performance' && (
              <motion.div
                key="performance"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Performance Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{results.performance.itemsCompleted}</div>
                    <div className="text-sm text-gray-600">Questions Completed</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{formatTime(results.performance.totalTime)}</div>
                    <div className="text-sm text-gray-600">Total Time</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{Math.round(results.performance.averageItemTime)}m</div>
                    <div className="text-sm text-gray-600">Avg per Question</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{results.performance.efficiency}%</div>
                    <div className="text-sm text-gray-600">Efficiency</div>
                  </div>
                </div>

                {/* Readiness Assessment */}
                <div className="p-6 bg-gray-50 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Gauge className="w-5 h-5 text-blue-600" />
                    Readiness Assessment
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm text-gray-600 mb-2">Current Readiness Level</div>
                      <div className="text-2xl font-bold text-blue-600 mb-2">{results.predictions.readinessLevel}</div>
                      <div className="text-sm text-gray-700">
                        Based on your performance patterns and ability estimate
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-2">Predicted Future Performance</div>
                      <div className="text-2xl font-bold text-green-600 mb-2">{results.predictions.futurePerformance}%</div>
                      <div className="text-sm text-gray-700">
                        Expected performance on similar assessments
                      </div>
                    </div>
                  </div>
                </div>

                {/* Algorithm Performance */}
                <div className="p-6 bg-gray-50 rounded-lg">
                  <button
                    onClick={() => setShowDiagnostics(!showDiagnostics)}
                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    <Activity className="w-5 h-5" />
                    <span className="font-medium">Algorithm Diagnostics</span>
                    <ArrowRight className={`w-4 h-4 transition-transform ${showDiagnostics ? 'rotate-90' : ''}`} />
                  </button>

                  {showDiagnostics && (
                    <div className="mt-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-white rounded">
                          <div className="text-lg font-bold text-gray-900">
                            {results.diagnostics.algorithmPerformance.convergence ? 'Yes' : 'No'}
                          </div>
                          <div className="text-sm text-gray-600">Convergence</div>
                        </div>
                        <div className="text-center p-3 bg-white rounded">
                          <div className="text-lg font-bold text-gray-900">
                            {results.diagnostics.algorithmPerformance.iterations}
                          </div>
                          <div className="text-sm text-gray-600">Iterations</div>
                        </div>
                        <div className="text-center p-3 bg-white rounded">
                          <div className="text-lg font-bold text-gray-900">
                            {results.diagnostics.algorithmPerformance.finalSE}
                          </div>
                          <div className="text-sm text-gray-600">Final Standard Error</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        The adaptive algorithm successfully {results.diagnostics.algorithmPerformance.convergence ? 'converged' : 'processed'} your ability estimate
                        in {results.diagnostics.algorithmPerformance.iterations} iterations with a final standard error of {results.diagnostics.algorithmPerformance.finalSE}.
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'adaptations' && (
              <motion.div
                key="adaptations"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Adaptation Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {results.adaptations.totalAdjustments}
                    </div>
                    <div className="text-gray-600">Total Adaptations</div>
                  </div>
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {results.diagnostics.adaptationEffectiveness}%
                    </div>
                    <div className="text-gray-600">Effectiveness</div>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {results.adaptations.adaptationTypes.length}
                    </div>
                    <div className="text-gray-600">Adaptation Types</div>
                  </div>
                </div>

                {/* Adaptation Details */}
                <div className="space-y-4">
                  {results.adaptations.interventions.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-purple-600" />
                        AI Interventions Applied
                      </h3>
                      <div className="space-y-2">
                        {results.adaptations.interventions.map((intervention, index) => (
                          <div key={index} className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                            <div className="flex items-center gap-2">
                              <Zap className="w-4 h-4 text-purple-600 flex-shrink-0" />
                              <span className="text-purple-800">{intervention}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {results.adaptations.personalizations.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-600" />
                        Personalizations
                      </h3>
                      <div className="space-y-2">
                        {results.adaptations.personalizations.map((personalization, index) => (
                          <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-blue-600 flex-shrink-0" />
                              <span className="text-blue-800">{personalization}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* System Metrics */}
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-gray-600" />
                    System Performance
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900">
                        {results.diagnostics.systemMetrics.sessionDuration}m
                      </div>
                      <div className="text-sm text-gray-600">Session Duration</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900">
                        {results.diagnostics.systemMetrics.responseRate}
                      </div>
                      <div className="text-sm text-gray-600">Response Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900">
                        {results.diagnostics.systemMetrics.systemAdaptations}
                      </div>
                      <div className="text-sm text-gray-600">System Adaptations</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'gaps' && (
              <motion.div
                key="gaps"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Gap Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-orange-50 rounded-lg">
                    <div className="text-3xl font-bold text-orange-600 mb-2">
                      {results.gaps.identifiedGaps.length}
                    </div>
                    <div className="text-gray-600">Learning Gaps Identified</div>
                  </div>
                  <div className="text-center p-6 bg-red-50 rounded-lg">
                    <div className="text-3xl font-bold text-red-600 mb-2">
                      {results.gaps.criticalGaps.length}
                    </div>
                    <div className="text-gray-600">Critical Gaps</div>
                  </div>
                </div>

                {/* Identified Gaps */}
                {results.gaps.identifiedGaps.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-orange-600" />
                      Identified Learning Gaps
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {results.gaps.identifiedGaps.map((gap, index) => (
                        <div key={index} className={`p-4 rounded-lg border ${
                          results.gaps.criticalGaps.includes(gap)
                            ? 'bg-red-50 border-red-200'
                            : 'bg-orange-50 border-orange-200'
                        }`}>
                          <div className="flex items-center gap-2">
                            <AlertTriangle className={`w-4 h-4 ${
                              results.gaps.criticalGaps.includes(gap) ? 'text-red-600' : 'text-orange-600'
                            }`} />
                            <span className={`font-medium ${
                              results.gaps.criticalGaps.includes(gap) ? 'text-red-800' : 'text-orange-800'
                            }`}>
                              {gap}
                            </span>
                            {results.gaps.criticalGaps.includes(gap) && (
                              <span className="px-2 py-1 bg-red-200 text-red-800 text-xs rounded">
                                Critical
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Remediation Plan */}
                {results.gaps.hasRemediationPlan && (
                  <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      Personalized Remediation Plan Available
                    </h3>
                    <p className="text-blue-800 mb-4">
                      A customized learning plan has been generated to address your specific gaps.
                      This plan includes targeted practice, concept review, and skill-building activities.
                    </p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      View Remediation Plan
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'recommendations' && (
              <motion.div
                key="recommendations"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Immediate Recommendations */}
                {results.gaps.recommendations.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-yellow-600" />
                      Immediate Action Items
                    </h3>
                    <div className="space-y-3">
                      {results.gaps.recommendations.map((recommendation, index) => (
                        <div key={index} className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-medium text-yellow-800">{recommendation}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Study Plan */}
                <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-green-600" />
                    Recommended Study Plan
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-white rounded-lg">
                        <div className="font-medium text-gray-900 mb-2">Short Term (1-2 weeks)</div>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Focus on critical gaps</li>
                          <li>• Daily practice sessions</li>
                          <li>• Concept clarification</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-white rounded-lg">
                        <div className="font-medium text-gray-900 mb-2">Medium Term (3-4 weeks)</div>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Strengthen foundations</li>
                          <li>• Practice problem-solving</li>
                          <li>• Mock assessments</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-white rounded-lg">
                        <div className="font-medium text-gray-900 mb-2">Long Term (1-2 months)</div>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Advanced practice</li>
                          <li>• Integration skills</li>
                          <li>• Performance optimization</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-blue-600" />
                    Next Steps
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      <span>Review your detailed performance report</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      <span>Start with the remediation plan for critical gaps</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      <span>Schedule regular practice sessions</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      <span>Retake the adaptive test in 2-3 weeks to track progress</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default AdaptiveTestResults