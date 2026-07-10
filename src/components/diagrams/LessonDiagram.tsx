'use client'

/**
 * LessonDiagram — reusable renderer for AI-generated diagram code embedded in
 * LMS lessons. Supports two kinds:
 *   - "mermaid": flowcharts, cycles, sequence/class diagrams, mindmaps, ER, etc.
 *     (great for Krebs/nitrogen cycles, gene-expression flow, taxonomy trees,
 *     physics processes). Mermaid is dynamically imported so it never bloats the
 *     main bundle and only loads when a diagram is on the page.
 *   - "svg": raw inline <svg> markup (e.g. RDKit chemistry structures, physics
 *     ray/circuit diagrams), sanitized with DOMPurify before render.
 *
 * Author-facing usage lives in fenced markdown code blocks (```mermaid / ```svg)
 * via MarkdownWithDiagrams — drop AI-generated code straight into contentBody.
 * Theme-aware (light/dark), with graceful loading + error fallbacks that reveal
 * the source so a broken diagram never blanks a lesson.
 */

import { useEffect, useRef, useState } from 'react'
import DOMPurify from 'dompurify'
import { AlertTriangle, Code2 } from 'lucide-react'

export type DiagramKind = 'mermaid' | 'svg'

interface LessonDiagramProps {
  code: string
  kind: DiagramKind
  caption?: string
  className?: string
}

/** Track the viewer's light/dark preference (matches the site's theming signals). */
function useIsDark() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    const root = document.documentElement
    const compute = () => {
      const attr = root.getAttribute('data-theme')
      if (attr === 'dark') return true
      if (attr === 'light') return false
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    setDark(compute())
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => setDark(compute())
    mq.addEventListener('change', onChange)
    const obs = new MutationObserver(onChange)
    obs.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
    return () => {
      mq.removeEventListener('change', onChange)
      obs.disconnect()
    }
  }, [])
  return dark
}

let mermaidIdSeq = 0

export function LessonDiagram({ code, kind, caption, className }: LessonDiagramProps) {
  const isDark = useIsDark()
  const [svg, setSvg] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showSource, setShowSource] = useState(false)
  const idRef = useRef(`lesson-diagram-${++mermaidIdSeq}`)

  useEffect(() => {
    let cancelled = false
    const source = (code || '').trim()

    if (!source) {
      setSvg(null)
      setError(null)
      return
    }

    // Raw SVG path — sanitize and render, no external dep.
    if (kind === 'svg') {
      try {
        const clean = DOMPurify.sanitize(source, {
          USE_PROFILES: { svg: true, svgFilters: true },
        })
        setSvg(clean)
        setError(null)
      } catch {
        setError('Could not render this diagram')
      }
      return
    }

    // Mermaid path — lazy-load the library, then render to SVG.
    async function renderMermaid() {
      try {
        const mermaid = (await import('mermaid')).default
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: isDark ? 'dark' : 'default',
          themeVariables: {
            primaryColor: '#f0f9f3',
            primaryBorderColor: '#17924f',
            primaryTextColor: isDark ? '#e5e7eb' : '#111827',
            lineColor: '#17924f',
            fontFamily: 'inherit',
          },
        })
        // Unique id per render avoids mermaid's internal cache collisions.
        const renderId = `${idRef.current}-${isDark ? 'd' : 'l'}`
        const { svg: out } = await mermaid.render(renderId, source)
        if (!cancelled) {
          setSvg(out)
          setError(null)
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Diagram failed to render')
          setSvg(null)
        }
      }
    }
    renderMermaid()

    return () => {
      cancelled = true
    }
  }, [code, kind, isDark])

  if (error) {
    return (
      <figure
        className={`not-prose my-6 overflow-hidden rounded-2xl border border-amber-200 bg-amber-50 dark:border-amber-500/30 dark:bg-amber-500/10 ${className ?? ''}`}
      >
        <div className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-amber-800 dark:text-amber-300">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          This diagram couldn&apos;t be drawn.
        </div>
        <pre className="max-h-64 overflow-auto border-t border-amber-200 bg-white/60 px-4 py-3 text-xs text-gray-600 dark:border-amber-500/30 dark:bg-black/20 dark:text-gray-300">
          {code}
        </pre>
      </figure>
    )
  }

  return (
    <figure
      className={`not-prose my-6 overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 ${className ?? ''}`}
    >
      {svg === null ? (
        <div className="flex h-40 animate-pulse items-center justify-center text-sm text-gray-400">
          Rendering diagram…
        </div>
      ) : (
        <div
          // `!max-w-full` overrides Mermaid's inline `max-width:<px>` so wide
          // diagrams scale DOWN to fit the reading column instead of forcing a
          // horizontal scroll; overflow-x-auto stays as a fallback for the rare
          // diagram that can't shrink further.
          className="flex justify-center overflow-x-auto p-4 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-h-[70vh] [&_svg]:!max-w-full"
          // Mermaid output and DOMPurify-sanitized SVG are both safe to inject.
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      )}
      <figcaption className="flex items-center justify-between gap-3 border-t border-gray-100 px-4 py-2 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
        <span className="truncate">{caption || (kind === 'mermaid' ? 'Diagram' : 'Figure')}</span>
        <button
          type="button"
          onClick={() => setShowSource((s) => !s)}
          className="inline-flex shrink-0 items-center gap-1 font-medium text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          <Code2 className="h-3.5 w-3.5" /> {showSource ? 'Hide' : 'Source'}
        </button>
      </figcaption>
      {showSource && (
        <pre className="max-h-64 overflow-auto border-t border-gray-100 bg-gray-50 px-4 py-3 text-xs text-gray-600 dark:border-gray-800 dark:bg-black/30 dark:text-gray-300">
          {code}
        </pre>
      )}
    </figure>
  )
}
