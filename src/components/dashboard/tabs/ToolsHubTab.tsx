'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Calculator,
  Building2,
  FileQuestion,
  ClipboardList,
  Brain,
  Flame,
  BookOpen,
  NotebookPen,
  FlaskConical,
  Calendar,
  Timer,
  Leaf,
  Bug,
  TrendingUp,
  Award,
  ClipboardCheck,
  Swords,
  History,
  ArrowRight,
  Users,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import {
  neetToolsRegistry,
  toolCategories,
  type ToolCategory,
  type NEETTool,
} from '@/data/neet-tools-registry'

const iconMap: Record<string, LucideIcon> = {
  Calculator,
  Building2,
  FileQuestion,
  ClipboardList,
  Brain,
  Flame,
  BookOpen,
  NotebookPen,
  FlaskConical,
  Calendar,
  Timer,
  Leaf,
  Bug,
  TrendingUp,
  Award,
  ClipboardCheck,
  Swords,
  History,
  Users,
}

function ToolCard({ tool }: { tool: NEETTool }) {
  const IconComponent = iconMap[tool.icon] || BookOpen

  return (
    <Link
      href={tool.href}
      className="group bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-5 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex flex-col min-h-[48px]"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
              {tool.title}
            </h3>
            {tool.isNew && (
              <span className="flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-medium flex-shrink-0">
                <Sparkles className="w-2.5 h-2.5" />
                New
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">{tool.description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <Users className="w-3 h-3" />
          {tool.userCount}
        </span>
        <span className="flex items-center gap-1 text-xs font-medium text-blue-600 group-hover:gap-2 transition-all">
          Open <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </Link>
  )
}

export function ToolsHubTab() {
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'ALL'>('ALL')

  const filteredTools =
    activeCategory === 'ALL'
      ? neetToolsRegistry
      : neetToolsRegistry.filter((t) => t.category === activeCategory)

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex overflow-x-auto scrollbar-hide gap-2 pb-1 -mx-1 px-1">
        {toolCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors min-h-[36px] flex-shrink-0 ${
              activeCategory === cat.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No tools in this category yet.</p>
        </div>
      )}
    </div>
  )
}
