'use client'

import React from 'react'
import Link from 'next/link'
import {
  Flame,
  FileQuestion,
  ClipboardList,
  Brain,
  Award,
  History,
  Sparkles,
  ArrowRight,
  Target,
} from 'lucide-react'

const quickPracticeItems = [
  {
    title: 'MCQ Practice',
    description: 'Chapter-wise Biology MCQs',
    href: '/neet-biology-mcq',
    icon: FileQuestion,
    bg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    title: 'Mock Tests',
    description: 'Full-length NEET pattern',
    href: '/neet-biology-mcq',
    icon: ClipboardList,
    bg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  {
    title: 'Adaptive Testing',
    description: 'AI adjusts to your level',
    href: '/neet-biology-mcq',
    icon: Brain,
    bg: 'bg-teal-100',
    iconColor: 'text-teal-600',
  },
  {
    title: 'Free Mock Test',
    description: 'Take a full test for free',
    href: '/neet-biology-mcq',
    icon: Award,
    bg: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    title: 'PYQ 2024',
    description: 'Previous year questions',
    href: '/neet-biology-mcq/pyq-2024',
    icon: History,
    bg: 'bg-yellow-100',
    iconColor: 'text-yellow-700',
  },
  {
    title: 'Online Test Series',
    description: 'Scheduled test series',
    href: '/neet-biology-mcq',
    icon: Target,
    bg: 'bg-red-100',
    iconColor: 'text-red-600',
  },
]

const mcqTopics = [
  { label: 'Cell Biology', slug: 'cell-unit-of-life' },
  { label: 'Biomolecules', slug: 'biomolecules' },
  { label: 'Genetics', slug: 'genetics-evolution' },
  { label: 'Ecology', slug: 'ecology' },
  { label: 'Human Physiology', slug: 'human-physiology' },
  { label: 'Plant Kingdom', slug: 'plant-kingdom' },
  { label: 'Animal Kingdom', slug: 'animal-kingdom' },
  { label: 'Reproduction', slug: 'reproduction' },
  { label: 'Human Reproduction', slug: 'human-reproduction' },
  { label: 'Molecular Inheritance', slug: 'molecular-inheritance' },
  { label: 'Principles of Inheritance', slug: 'principles-inheritance' },
  { label: 'Biological Classification', slug: 'biological-classification' },
  { label: 'Biotechnology', slug: 'biotechnology-principles' },
  { label: 'Human Health & Disease', slug: 'human-health-disease' },
]

export function PracticeTab() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Daily Challenge - Featured */}
      <Link
        href="/neet-biology-mcq/daily-challenge"
        className="block bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-xl p-5 sm:p-6 text-white hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="text-lg sm:text-xl font-bold">Daily Challenge</h3>
                <span className="flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded-full bg-white/20 font-medium">
                  <Sparkles className="w-2.5 h-2.5" />
                  Today
                </span>
              </div>
              <p className="text-sm text-white/80">
                Solve today&apos;s Biology challenge and build your streak
              </p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 flex-shrink-0" />
        </div>
      </Link>

      {/* Quick Practice Grid */}
      <div>
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">Quick Practice</h3>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {quickPracticeItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group bg-white rounded-xl shadow-lg border border-slate-200 p-4 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 min-h-[48px]"
            >
              <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center mb-3`}>
                <item.icon className={`w-5 h-5 ${item.iconColor}`} />
              </div>
              <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-0.5 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-gray-500">{item.description}</p>
              <div className="flex items-center gap-1 mt-2 text-xs font-medium text-blue-600 group-hover:gap-2 transition-all">
                Start <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Topic-wise Quick Links */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
          Topic-wise MCQ Practice
        </h3>
        <div className="flex flex-wrap gap-2">
          {mcqTopics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/neet-biology-mcq/${topic.slug}`}
              className="px-3 py-2 bg-gradient-to-br from-blue-50 to-purple-50 text-blue-700 rounded-lg text-xs sm:text-sm font-medium hover:from-blue-100 hover:to-purple-100 transition-colors border border-blue-200 min-h-[36px] flex items-center"
            >
              {topic.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
