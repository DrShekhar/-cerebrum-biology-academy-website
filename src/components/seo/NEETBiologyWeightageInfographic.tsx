'use client'

import { motion } from 'framer-motion'
import { TrendingUp, BookOpen, Star, Target } from 'lucide-react'

interface ChapterWeightage {
  chapter: string
  questions: number
  marks: number
  priority: 'high' | 'medium' | 'low'
  class: '11' | '12'
}

const botanyChapters: ChapterWeightage[] = [
  { chapter: 'Plant Kingdom', questions: 3, marks: 12, priority: 'high', class: '11' },
  { chapter: 'Morphology of Plants', questions: 3, marks: 12, priority: 'high', class: '11' },
  { chapter: 'Cell: Structure & Function', questions: 4, marks: 16, priority: 'high', class: '11' },
  { chapter: 'Plant Physiology', questions: 5, marks: 20, priority: 'high', class: '11' },
  { chapter: 'Biomolecules', questions: 3, marks: 12, priority: 'high', class: '11' },
  { chapter: 'Reproduction in Plants', questions: 3, marks: 12, priority: 'high', class: '12' },
  { chapter: 'Genetics', questions: 6, marks: 24, priority: 'high', class: '12' },
  { chapter: 'Molecular Biology', questions: 4, marks: 16, priority: 'high', class: '12' },
  { chapter: 'Biotechnology', questions: 4, marks: 16, priority: 'medium', class: '12' },
  { chapter: 'Ecology', questions: 5, marks: 20, priority: 'high', class: '12' },
]

const zoologyChapters: ChapterWeightage[] = [
  { chapter: 'Animal Kingdom', questions: 4, marks: 16, priority: 'high', class: '11' },
  { chapter: 'Structural Organization', questions: 2, marks: 8, priority: 'medium', class: '11' },
  { chapter: 'Human Physiology', questions: 8, marks: 32, priority: 'high', class: '11' },
  { chapter: 'Digestion & Absorption', questions: 2, marks: 8, priority: 'medium', class: '11' },
  { chapter: 'Breathing & Exchange', questions: 2, marks: 8, priority: 'medium', class: '11' },
  { chapter: 'Human Reproduction', questions: 4, marks: 16, priority: 'high', class: '12' },
  { chapter: 'Reproductive Health', questions: 2, marks: 8, priority: 'medium', class: '12' },
  { chapter: 'Evolution', questions: 3, marks: 12, priority: 'medium', class: '12' },
  { chapter: 'Human Health & Disease', questions: 4, marks: 16, priority: 'high', class: '12' },
  { chapter: 'Microbes in Human Welfare', questions: 2, marks: 8, priority: 'low', class: '12' },
]

const highYieldFacts = [
  'Human Physiology alone = 32 marks (8 questions)',
  'Genetics + Molecular Biology = 40 marks',
  'Class 12 chapters = 60% of paper',
  'NCERT covers 95% of questions',
  'Diagrams carry 15-20 marks directly',
]

interface NEETBiologyWeightageInfographicProps {
  className?: string
}

export function NEETBiologyWeightageInfographic({ className = '' }: NEETBiologyWeightageInfographicProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-700 border-green-200'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getBarWidth = (marks: number) => `${(marks / 32) * 100}%`

  return (
    <section className={`py-12 md:py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            Chapter Analysis
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            NEET Biology Chapter-wise Weightage 2025
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Focus on high-weightage chapters for maximum marks. Based on analysis of last 10 years NEET papers.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 mb-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-4 px-6">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-6 h-6" />
                  <div>
                    <h3 className="font-bold text-lg">Botany</h3>
                    <p className="text-sm opacity-90">~180 marks (45 questions)</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {botanyChapters.map((ch, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-28 text-sm text-gray-700 truncate" title={ch.chapter}>
                        {ch.chapter}
                      </div>
                      <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            ch.priority === 'high' ? 'bg-red-500' :
                            ch.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: getBarWidth(ch.marks) }}
                        />
                      </div>
                      <div className="w-12 text-right text-sm font-medium">{ch.marks}m</div>
                      <span className={`text-xs px-2 py-0.5 rounded border ${getPriorityColor(ch.priority)}`}>
                        {ch.class === '11' ? 'XI' : 'XII'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-4 px-6">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-6 h-6" />
                  <div>
                    <h3 className="font-bold text-lg">Zoology</h3>
                    <p className="text-sm opacity-90">~180 marks (45 questions)</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {zoologyChapters.map((ch, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-28 text-sm text-gray-700 truncate" title={ch.chapter}>
                        {ch.chapter}
                      </div>
                      <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            ch.priority === 'high' ? 'bg-red-500' :
                            ch.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: getBarWidth(ch.marks) }}
                        />
                      </div>
                      <div className="w-12 text-right text-sm font-medium">{ch.marks}m</div>
                      <span className={`text-xs px-2 py-0.5 rounded border ${getPriorityColor(ch.priority)}`}>
                        {ch.class === '11' ? 'XI' : 'XII'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 md:p-8 border border-amber-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-white">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-gray-900">High-Yield Facts</h3>
                <p className="text-gray-600 text-sm">Key insights for smart preparation</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {highYieldFacts.map((fact, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm"
                >
                  <Target className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{fact}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-amber-200">
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="font-medium text-gray-700">Priority Legend:</span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500" /> High (Focus First)
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-yellow-500" /> Medium
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500" /> Low (Quick Revision)
                </span>
              </div>
            </div>
          </motion.div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Analysis based on NEET 2015-2024 papers. Updated for NEET 2025 by Cerebrum Biology Academy.
            </p>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'DataSet',
            name: 'NEET Biology Chapter-wise Weightage 2025',
            description: 'Comprehensive analysis of NEET Biology chapter weightage based on previous 10 years papers.',
            creator: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            dateModified: new Date().toISOString().split('T')[0],
            keywords: ['NEET Biology', 'chapter weightage', 'NEET 2025', 'Biology marks distribution'],
          }),
        }}
      />
    </section>
  )
}
