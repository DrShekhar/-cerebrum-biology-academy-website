'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PremiumCard, PremiumButton, PremiumProgress } from '@/components/ui/PremiumDesignSystem'
import {
  FlaskConical,
  BookOpen,
  GraduationCap,
  BarChart2,
  Sparkles,
  Clock,
  Trophy,
  Settings,
  Globe,
  Lightbulb,
  Play,
} from 'lucide-react'

interface BiologyModule {
  id: string
  title: string
  description: string
  difficulty: 'Foundation' | 'Intermediate' | 'Advanced' | 'Research-Level'
  duration: string
  topics: number
  completionRate: number
  neetWeight: number
  aimsWeight: number
  researchBased: boolean
  icon: React.ComponentType<{ className?: string }>
}

interface HarvardLevelContentProps {
  className?: string
}

export function HarvardLevelContent({ className = '' }: HarvardLevelContentProps) {
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'overview' | 'detailed' | 'research'>('overview')

  const biologyModules: BiologyModule[] = [
    {
      id: 'molecular-biology',
      title: 'Molecular Biology & Genetics',
      description:
        'Advanced molecular mechanisms, gene regulation, and biotechnology applications with research-grade depth.',
      difficulty: 'Research-Level',
      duration: '12 weeks',
      topics: 47,
      completionRate: 94.2,
      neetWeight: 25,
      aimsWeight: 30,
      researchBased: true,
      icon: FlaskConical,
    },
    {
      id: 'cell-biology',
      title: 'Cell Biology & Biochemistry',
      description:
        'Comprehensive cellular processes, organelle functions, and metabolic pathways with Nobel Prize-winning research insights.',
      difficulty: 'Advanced',
      duration: '10 weeks',
      topics: 38,
      completionRate: 96.1,
      neetWeight: 20,
      aimsWeight: 25,
      researchBased: true,
      icon: Settings,
    },
    {
      id: 'physiology',
      title: 'Human Physiology',
      description:
        'Integrated organ systems, homeostasis, and clinical correlations with Harvard Medical School case studies.',
      difficulty: 'Advanced',
      duration: '14 weeks',
      topics: 52,
      completionRate: 93.8,
      neetWeight: 30,
      aimsWeight: 25,
      researchBased: true,
      icon: GraduationCap,
    },
    {
      id: 'ecology',
      title: 'Ecology & Environment',
      description:
        'Population dynamics, ecosystem analysis, and conservation biology with current research applications.',
      difficulty: 'Intermediate',
      duration: '8 weeks',
      topics: 28,
      completionRate: 97.5,
      neetWeight: 15,
      aimsWeight: 10,
      researchBased: true,
      icon: Globe,
    },
    {
      id: 'evolution',
      title: 'Evolution & Diversity',
      description:
        'Phylogenetic analysis, evolutionary mechanisms, and biodiversity studies with cutting-edge molecular evidence.',
      difficulty: 'Advanced',
      duration: '9 weeks',
      topics: 34,
      completionRate: 95.3,
      neetWeight: 10,
      aimsWeight: 10,
      researchBased: true,
      icon: Lightbulb,
    },
  ]

  const researchHighlights = [
    {
      title: 'CRISPR-Cas9 Applications',
      description: 'Latest gene editing techniques and their clinical applications',
      journal: 'Nature Biotechnology',
      year: '2024',
    },
    {
      title: 'Cancer Immunotherapy',
      description: 'Revolutionary CAR-T cell therapy mechanisms and outcomes',
      journal: 'Cell',
      year: '2024',
    },
    {
      title: 'Neuroplasticity Research',
      description: 'Recent discoveries in synaptic plasticity and memory formation',
      journal: 'Nature Neuroscience',
      year: '2024',
    },
  ]

  const difficultyColors = {
    Foundation: 'bg-green-100 text-green-800 border-green-200',
    Intermediate: 'bg-blue-100 text-blue-800 border-blue-200',
    Advanced: 'bg-purple-100 text-purple-800 border-purple-200',
    'Research-Level': 'bg-red-100 text-red-800 border-red-200',
  }

  return (
    <div className={`py-20 bg-gradient-to-br from-slate-50 to-blue-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-indigo-100 border border-blue-200 rounded-full px-6 py-3 mb-6">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <span className="font-semibold text-blue-800">Harvard-Stanford Caliber Curriculum</span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              World-Class Biology Education
            </span>
          </h2>

          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Experience the same depth and rigor as Ivy League institutions. Our curriculum
            integrates
            <span className="font-semibold text-blue-700"> cutting-edge research </span>
            from Harvard, MIT, and Stanford with
            <span className="font-semibold text-green-700"> NEET-focused preparation</span>.
          </p>

          {/* View Mode Toggle */}
          <div className="mt-8 flex justify-center">
            <div className="bg-white rounded-xl p-1 shadow-lg border">
              {(['overview', 'detailed', 'research'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 capitalize ${
                    viewMode === mode
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {mode} View
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Biology Modules Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {biologyModules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedModule(selectedModule === module.id ? null : module.id)}
            >
              <PremiumCard
                variant="hover"
                size="lg"
                className={`h-full cursor-pointer transition-all duration-300 ${
                  selectedModule === module.id ? 'ring-2 ring-blue-500 shadow-xl' : ''
                }`}
              >
                <div className="space-y-6">
                  {/* Module Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-indigo-500 rounded-xl text-white">
                        <module.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{module.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full border ${difficultyColors[module.difficulty]}`}
                          >
                            {module.difficulty}
                          </span>
                          {module.researchBased && (
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200">
                              Research-Based
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Module Description */}
                  <p className="text-gray-700 leading-relaxed">{module.description}</p>

                  {/* Module Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Duration</span>
                        <span className="font-medium">{module.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Topics</span>
                        <span className="font-medium">{module.topics}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">NEET Weight</span>
                        <span className="font-medium">{module.neetWeight}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">AIIMS Weight</span>
                        <span className="font-medium">{module.aimsWeight}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Completion Rate */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Student Success Rate</span>
                      <span className="text-sm font-bold text-green-600">
                        {module.completionRate}%
                      </span>
                    </div>
                    <PremiumProgress value={module.completionRate} variant="linear" size="sm" />
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {selectedModule === module.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t pt-6 space-y-4"
                      >
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Key Learning Outcomes
                          </h4>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Master fundamental concepts with research-grade depth</li>
                            <li>• Analyze current scientific literature and methodologies</li>
                            <li>• Apply knowledge to NEET and AIIMS question patterns</li>
                            <li>• Develop critical thinking for medical entrance success</li>
                          </ul>
                        </div>

                        <PremiumButton variant="medical" size="md" className="w-full">
                          <Play className="h-5 w-5 mr-2" />
                          Start Learning Journey
                        </PremiumButton>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </PremiumCard>
            </motion.div>
          ))}
        </div>

        {/* Research Integration Section */}
        {viewMode === 'research' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <PremiumCard variant="luxury" size="xl">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Latest Research Integration
                </h3>
                <p className="text-lg text-gray-700">
                  Stay ahead with cutting-edge discoveries from top-tier journals
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {researchHighlights.map((research, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-lg border hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium text-blue-600">{research.journal}</span>
                      <span className="text-sm text-gray-500">{research.year}</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{research.title}</h4>
                    <p className="text-sm text-gray-700">{research.description}</p>
                  </motion.div>
                ))}
              </div>
            </PremiumCard>
          </motion.div>
        )}

        {/* Faculty Excellence Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <PremiumCard
            variant="premium"
            size="xl"
            className="bg-gray-50"
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Learn from Elite Faculty</h3>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Our curriculum is designed by AIIMS graduates and reviewed by international
                  experts to ensure you receive the same quality of education as world's top
                  universities.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">AIIMS Faculty</h4>
                  <p className="text-sm text-gray-700">
                    Direct teaching from India's premier medical institution graduates
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Research Integration</h4>
                  <p className="text-sm text-gray-700">
                    Latest findings from Harvard, MIT, and Stanford incorporated
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Proven Results</h4>
                  <p className="text-sm text-gray-700">
                    94.2% success rate with 500+ AIIMS selections
                  </p>
                </div>
              </div>

              <div className="pt-8">
                <PremiumButton variant="luxury" size="lg" className="mx-auto">
                  <GraduationCap className="h-6 w-6 mr-2" />
                  Experience Harvard-Level Education
                </PremiumButton>
              </div>
            </div>
          </PremiumCard>
        </motion.div>
      </div>
    </div>
  )
}
