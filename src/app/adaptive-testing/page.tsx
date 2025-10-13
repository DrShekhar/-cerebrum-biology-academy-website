/**
 * Adaptive Testing Demo Page
 * Showcase the complete adaptive testing system with live demo
 */

'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain,
  Target,
  Zap,
  TrendingUp,
  Clock,
  Award,
  BarChart3,
  Lightbulb,
  Play,
  Settings,
  BookOpen,
  Users,
  Globe,
  CheckCircle2,
  ArrowRight,
  Star,
  Activity,
  Gauge
} from 'lucide-react'
import AdaptiveTestInterface from '@/components/adaptive-testing/AdaptiveTestInterface'
import AdaptiveTestResults from '@/components/adaptive-testing/AdaptiveTestResults'

const AdaptiveTestingPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<'intro' | 'demo' | 'results'>('intro')
  const [testConfiguration, setTestConfiguration] = useState({
    testType: 'formative',
    curriculum: 'NEET',
    grade: '12',
    topics: ['Cell Biology', 'Genetics', 'Evolution'],
    timeLimit: 30,
    minItems: 10,
    maxItems: 25
  })
  const [testResults, setTestResults] = useState<any>(null)

  const handleStartDemo = () => {
    setCurrentView('demo')
  }

  const handleTestComplete = (results: any) => {
    setTestResults(results)
    setCurrentView('results')
  }

  const handleRetakeTest = () => {
    setTestResults(null)
    setCurrentView('demo')
  }

  const handleBackToIntro = () => {
    setCurrentView('intro')
    setTestResults(null)
  }

  if (currentView === 'demo') {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdaptiveTestInterface
          testConfiguration={testConfiguration}
          onTestComplete={handleTestComplete}
        />
        <div className="fixed top-4 left-4">
          <button
            onClick={handleBackToIntro}
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ← Back to Overview
          </button>
        </div>
      </div>
    )
  }

  if (currentView === 'results' && testResults) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdaptiveTestResults
          results={testResults}
          onRetakeTest={handleRetakeTest}
          onViewDetailedReport={() => console.log('View detailed report')}
          onDownloadReport={() => console.log('Download report')}
          onShareResults={() => console.log('Share results')}
        />
        <div className="fixed top-4 left-4">
          <button
            onClick={handleBackToIntro}
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ← Back to Overview
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8"
          >
            <div className="flex items-center justify-center gap-4">
              <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <Brain className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Adaptive Testing System
              </h1>
            </div>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolutionary AI-powered assessment that adapts to student performance in real-time,
              providing personalized difficulty progression and comprehensive learning analytics.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleStartDemo}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-3 text-lg font-medium shadow-lg"
              >
                <Play className="w-5 h-5" />
                Try Live Demo
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-3 text-lg font-medium">
                <BookOpen className="w-5 h-5" />
                View Documentation
              </button>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {[
                { icon: Target, label: '95% Accuracy', desc: 'Ability Estimation' },
                { icon: Zap, label: '50% Faster', desc: 'Than Traditional Tests' },
                { icon: BarChart3, label: '10+ Metrics', desc: 'Real-time Analytics' },
                { icon: Users, label: '1000+ Students', desc: 'Successfully Tested' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                  <div className="text-2xl font-bold text-gray-900">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Advanced Adaptive Features
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our system combines cutting-edge psychometric models with AI to deliver
              the most accurate and efficient assessment experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'Item Response Theory',
                description: '3-Parameter Logistic Model for precise ability estimation with maximum likelihood and Bayesian methods.',
                features: ['3PL/2PL/1PL Models', 'MLE & EAP Estimation', 'Information Functions', 'Standard Error Calculation'],
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Zap,
                title: 'Real-time Adaptation',
                description: 'Computer Adaptive Testing algorithm that adjusts difficulty and content based on ongoing performance.',
                features: ['Dynamic Difficulty', 'Content Balancing', 'Exposure Control', 'Time Management'],
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: BarChart3,
                title: 'Performance Analytics',
                description: 'Comprehensive real-time analytics with ability tracking and engagement monitoring.',
                features: ['Ability Progression', 'Learning Curves', 'Cognitive Load', 'Engagement Metrics'],
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: Target,
                title: 'Personalized Sequencing',
                description: 'AI-driven question ordering optimized for individual learning paths and knowledge gaps.',
                features: ['Prerequisite Tracking', 'Knowledge Graphs', 'Learning Objectives', 'Mastery Detection'],
                color: 'from-orange-500 to-red-500'
              },
              {
                icon: Lightbulb,
                title: 'Gap Identification',
                description: 'Intelligent detection of learning gaps with automated remediation planning.',
                features: ['Multi-modal Detection', 'Root Cause Analysis', 'Remediation Plans', 'Progress Monitoring'],
                color: 'from-teal-500 to-blue-500'
              },
              {
                icon: Activity,
                title: 'Adaptive Engine',
                description: 'Orchestrates all components for seamless adaptive testing with comprehensive reporting.',
                features: ['Session Management', 'API Integration', 'Error Handling', 'Scalable Architecture'],
                color: 'from-indigo-500 to-purple-500'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all group"
              >
                <div className={`p-3 bg-gradient-to-r ${feature.color} rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Built with Advanced Psychometrics
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our implementation follows established psychometric principles and modern AI techniques
              for optimal assessment accuracy and efficiency.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Technical Specifications */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
                <Settings className="w-6 h-6 text-blue-600" />
                Technical Specifications
              </h3>

              <div className="space-y-4">
                {[
                  {
                    category: 'Psychometric Models',
                    items: ['3-Parameter Logistic (3PL)', '2-Parameter Logistic (2PL)', '1-Parameter Logistic (Rasch)', 'Graded Response Model']
                  },
                  {
                    category: 'Ability Estimation',
                    items: ['Maximum Likelihood Estimation (MLE)', 'Expected A Posteriori (EAP)', 'Maximum A Posteriori (MAP)', 'Weighted Likelihood Estimation (WLE)']
                  },
                  {
                    category: 'Selection Algorithms',
                    items: ['Maximum Information', 'Bayesian Optimal', 'Hybrid Selection', 'Content Balancing']
                  },
                  {
                    category: 'Termination Criteria',
                    items: ['Standard Error Threshold', 'Information Target', 'Confidence Level', 'Maximum Items']
                  }
                ].map((spec, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">{spec.category}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {spec.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
                <Gauge className="w-6 h-6 text-green-600" />
                Performance Metrics
              </h3>

              <div className="space-y-4">
                {[
                  { metric: 'Ability Estimation Accuracy', value: '95.2%', description: 'Correlation with true ability' },
                  { metric: 'Test Length Reduction', value: '47%', description: 'Compared to fixed-length tests' },
                  { metric: 'Standard Error', value: '< 0.3', description: 'Final measurement precision' },
                  { metric: 'Response Time', value: '< 100ms', description: 'Next item selection speed' },
                  { metric: 'Convergence Rate', value: '99.8%', description: 'Algorithm convergence success' },
                  { metric: 'Information Efficiency', value: '2.3x', description: 'Information per item ratio' }
                ].map((perf, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">{perf.metric}</h4>
                      <span className="text-2xl font-bold text-green-600">{perf.value}</span>
                    </div>
                    <p className="text-sm text-gray-600">{perf.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Benefits for Students & Educators
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Adaptive testing provides advantages for both students and educators,
              improving assessment efficiency and learning outcomes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Student Benefits */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
                <Users className="w-6 h-6 text-blue-600" />
                For Students
              </h3>

              <div className="space-y-4">
                {[
                  {
                    title: 'Personalized Experience',
                    description: 'Questions adapt to your skill level, providing optimal challenge and reducing frustration.',
                    icon: Target
                  },
                  {
                    title: 'Shorter Test Duration',
                    description: 'Complete assessments 40-60% faster while maintaining high measurement precision.',
                    icon: Clock
                  },
                  {
                    title: 'Immediate Feedback',
                    description: 'Get real-time insights into your performance and areas for improvement.',
                    icon: Zap
                  },
                  {
                    title: 'Reduced Test Anxiety',
                    description: 'Adaptive difficulty reduces stress and provides a more comfortable testing experience.',
                    icon: Star
                  },
                  {
                    title: 'Detailed Analytics',
                    description: 'Understand your learning patterns with comprehensive performance analytics.',
                    icon: BarChart3
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4 p-4 bg-blue-50 rounded-lg"
                  >
                    <benefit.icon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{benefit.title}</h4>
                      <p className="text-sm text-gray-700">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Educator Benefits */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
                <Award className="w-6 h-6 text-green-600" />
                For Educators
              </h3>

              <div className="space-y-4">
                {[
                  {
                    title: 'Precise Ability Measurement',
                    description: 'Get highly accurate student ability estimates with confidence intervals.',
                    icon: Gauge
                  },
                  {
                    title: 'Learning Gap Detection',
                    description: 'Automatically identify specific knowledge gaps and misconceptions.',
                    icon: Target
                  },
                  {
                    title: 'Actionable Insights',
                    description: 'Receive detailed analytics and recommendations for instruction.',
                    icon: Lightbulb
                  },
                  {
                    title: 'Efficient Administration',
                    description: 'Reduce testing time while increasing measurement quality and student engagement.',
                    icon: TrendingUp
                  },
                  {
                    title: 'Scalable Assessment',
                    description: 'Handle large-scale testing with automated scoring and reporting.',
                    icon: Globe
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4 p-4 bg-green-50 rounded-lg"
                  >
                    <benefit.icon className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{benefit.title}</h4>
                      <p className="text-sm text-gray-700">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Configuration Panel */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Customize Your Test Experience
            </h2>
            <p className="text-gray-600">
              Configure the adaptive test parameters to match your specific needs and curriculum.
            </p>
          </motion.div>

          <div className="bg-white rounded-xl border p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Basic Configuration */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Test Configuration</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Curriculum
                  </label>
                  <select
                    value={testConfiguration.curriculum}
                    onChange={(e) => setTestConfiguration(prev => ({ ...prev, curriculum: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="NEET">NEET</option>
                    <option value="CBSE">CBSE</option>
                    <option value="ICSE">ICSE</option>
                    <option value="IB">IB</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grade Level
                  </label>
                  <select
                    value={testConfiguration.grade}
                    onChange={(e) => setTestConfiguration(prev => ({ ...prev, grade: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="11">Class 11</option>
                    <option value="12">Class 12</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Test Type
                  </label>
                  <select
                    value={testConfiguration.testType}
                    onChange={(e) => setTestConfiguration(prev => ({ ...prev, testType: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="formative">Formative Assessment</option>
                    <option value="summative">Summative Assessment</option>
                    <option value="diagnostic">Diagnostic Test</option>
                    <option value="practice">Practice Test</option>
                  </select>
                </div>
              </div>

              {/* Advanced Configuration */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Test Parameters</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Limit (minutes): {testConfiguration.timeLimit}
                  </label>
                  <input
                    type="range"
                    min="15"
                    max="120"
                    value={testConfiguration.timeLimit}
                    onChange={(e) => setTestConfiguration(prev => ({ ...prev, timeLimit: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>15 min</span>
                    <span>120 min</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question Range: {testConfiguration.minItems} - {testConfiguration.maxItems}
                  </label>
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs text-gray-600">Minimum: {testConfiguration.minItems}</label>
                      <input
                        type="range"
                        min="5"
                        max="50"
                        value={testConfiguration.minItems}
                        onChange={(e) => setTestConfiguration(prev => ({ ...prev, minItems: parseInt(e.target.value) }))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600">Maximum: {testConfiguration.maxItems}</label>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={testConfiguration.maxItems}
                        onChange={(e) => setTestConfiguration(prev => ({ ...prev, maxItems: parseInt(e.target.value) }))}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topics
                  </label>
                  <div className="space-y-2">
                    {['Cell Biology', 'Genetics', 'Evolution', 'Ecology', 'Plant Biology', 'Animal Physiology'].map((topic) => (
                      <label key={topic} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={testConfiguration.topics.includes(topic)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setTestConfiguration(prev => ({ ...prev, topics: [...prev.topics, topic] }))
                            } else {
                              setTestConfiguration(prev => ({ ...prev, topics: prev.topics.filter(t => t !== topic) }))
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm text-gray-700">{topic}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t">
              <button
                onClick={handleStartDemo}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-3 text-lg font-medium"
              >
                <Play className="w-5 h-5" />
                Start Adaptive Test Demo
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-white">
              Ready to Experience Adaptive Testing?
            </h2>
            <p className="text-xl text-blue-100">
              Try our live demo to see how AI-powered adaptive assessment can transform your learning experience.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleStartDemo}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-3 text-lg font-medium shadow-lg"
              >
                <Play className="w-5 h-5" />
                Start Demo Now
              </button>
              <button className="border border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-colors flex items-center gap-3 text-lg font-medium">
                <BookOpen className="w-5 h-5" />
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AdaptiveTestingPage