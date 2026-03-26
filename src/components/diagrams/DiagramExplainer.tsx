'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnyDiagramData } from '@/types/interactive-diagram'
import { InteractiveDiagramRenderer } from './InteractiveDiagramRenderer'
import { getTopicDiagramConfig, DEMO_DIAGRAM_TOPICS } from '@/config/topic-diagrams'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

interface DiagramExplainerProps {
  topic: string
  classLevel?: '11' | '12' | 'neet'
  defaultExpanded?: boolean
  compact?: boolean
  className?: string
}

type LoadState = 'idle' | 'loading' | 'loaded' | 'error'

export function DiagramExplainer({
  topic,
  classLevel,
  defaultExpanded = false,
  compact = false,
  className = '',
}: DiagramExplainerProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const [loadState, setLoadState] = useState<LoadState>('idle')
  const [diagram, setDiagram] = useState<AnyDiagramData | null>(null)

  const config = getTopicDiagramConfig(topic)

  const loadDiagram = useCallback(async () => {
    if (loadState === 'loading' || loadState === 'loaded') return

    setLoadState('loading')

    try {
      const demoLoader = DEMO_DIAGRAM_TOPICS[topic]
      if (demoLoader) {
        const data = await demoLoader()
        setDiagram(data)
        setLoadState('loaded')
        return
      }

      if (!config) {
        setLoadState('error')
        return
      }

      const res = await fetch('/api/ai/generate-diagram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: config.aiPromptHint,
          classLevel: classLevel || 'neet',
          diagramType: config.diagramType,
        }),
      })

      if (!res.ok) {
        setLoadState('error')
        return
      }

      const json = await res.json()
      if (json.success && json.data) {
        setDiagram(json.data)
        setLoadState('loaded')
      } else {
        setLoadState('error')
      }
    } catch {
      setLoadState('error')
    }
  }, [topic, classLevel, config, loadState])

  useEffect(() => {
    if (expanded && loadState === 'idle') {
      loadDiagram()
    }
  }, [expanded, loadState, loadDiagram])

  if (!config && !DEMO_DIAGRAM_TOPICS[topic]) return null

  if (compact) {
    return (
      <div className={className}>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          {expanded ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          {expanded ? 'Hide Diagram' : 'View Concept Diagram'}
        </button>

        {expanded && (
          <div className="mt-2">
            {loadState === 'loading' && <DiagramSkeleton />}
            {loadState === 'error' && (
              <p className="text-xs text-stone-500 py-2">Diagram not available for this topic.</p>
            )}
            {loadState === 'loaded' && diagram && (
              <InteractiveDiagramRenderer diagram={diagram} height={compact ? 350 : undefined} />
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={`rounded-xl border border-indigo-200 bg-indigo-50/50 overflow-hidden ${className}`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-indigo-100/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-indigo-100 rounded-lg flex items-center justify-center">
            <Eye className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-indigo-900">Interactive Concept Diagram</p>
            <p className="text-xs text-indigo-600">{topic}</p>
          </div>
        </div>
        <span className="text-xs text-indigo-500">{expanded ? 'Collapse' : 'Expand'}</span>
      </button>

      {expanded && (
        <div className="px-4 pb-4">
          {loadState === 'loading' && <DiagramSkeleton />}
          {loadState === 'error' && (
            <div className="py-4 text-center">
              <p className="text-sm text-stone-500">Could not load diagram for this topic.</p>
              <button
                onClick={() => {
                  setLoadState('idle')
                  loadDiagram()
                }}
                className="mt-2 text-xs text-indigo-600 hover:underline"
              >
                Try again
              </button>
            </div>
          )}
          {loadState === 'loaded' && diagram && <InteractiveDiagramRenderer diagram={diagram} />}
        </div>
      )}
    </div>
  )
}

function DiagramSkeleton() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="flex items-center gap-2 text-indigo-500">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span className="text-sm">Generating diagram...</span>
      </div>
    </div>
  )
}
