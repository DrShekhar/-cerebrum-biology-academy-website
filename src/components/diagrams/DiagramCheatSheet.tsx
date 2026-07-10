'use client'

/**
 * DiagramCheatSheet — a collapsible helper shown next to lesson/article body
 * editors so authors know how to embed diagrams. It documents the two fenced
 * code blocks MarkdownWithDiagrams understands (```mermaid and ```svg), with
 * copy-ready snippets for the common Biology / Chemistry / Physics cases, plus
 * a nudge to paste AI-generated diagram code straight in.
 */

import { useState } from 'react'
import { ChevronDown, Copy, Check, ShapesIcon } from 'lucide-react'

interface Snippet {
  label: string
  code: string
}

const SNIPPETS: Snippet[] = [
  {
    label: 'Flow / cycle (Mermaid)',
    code: `\`\`\`mermaid Cellular respiration
graph LR
  Glucose --> Glycolysis --> Pyruvate
  Pyruvate --> AcetylCoA --> Krebs["Krebs Cycle"] --> ETC["Electron Transport Chain"]
\`\`\``,
  },
  {
    label: 'Tree / classification (Mermaid)',
    code: `\`\`\`mermaid Taxonomy
graph TD
  Kingdom --> Phylum --> Class --> Order --> Family --> Genus --> Species
\`\`\``,
  },
  {
    label: 'Figure / structure (inline SVG)',
    code: `\`\`\`svg Water molecule
<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
  <line x1="60" y1="40" x2="30" y2="20" stroke="#111827" stroke-width="3"/>
  <line x1="60" y1="40" x2="90" y2="20" stroke="#111827" stroke-width="3"/>
  <circle cx="60" cy="40" r="12" fill="#f0f9f3" stroke="#17924f"/>
  <text x="60" y="45" text-anchor="middle" font-size="12">O</text>
</svg>
\`\`\``,
  },
]

function SnippetRow({ snippet }: { snippet: Snippet }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard blocked — author can select manually */
    }
  }
  return (
    <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-center justify-between px-3 py-1.5">
        <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
          {snippet.label}
        </span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1 text-xs font-medium text-green-700 hover:text-green-800 dark:text-green-400"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto border-t border-gray-100 px-3 py-2 text-[11px] leading-relaxed text-gray-600 dark:border-gray-800 dark:text-gray-300">
        {snippet.code}
      </pre>
    </div>
  )
}

export function DiagramCheatSheet({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/40 ${className ?? ''}`}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-3 py-2 text-left"
      >
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
          <ShapesIcon className="h-4 w-4 text-green-700 dark:text-green-400" />
          Add a diagram
        </span>
        <ChevronDown
          className={`h-4 w-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="space-y-3 px-3 pb-3">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Paste diagram code into the body inside a fenced block. Text after the language becomes
            the figure caption. Ask any AI for “a Mermaid diagram of …” or “an SVG of …” and drop it
            straight in — it renders in the preview and for students.
          </p>
          {SNIPPETS.map((s) => (
            <SnippetRow key={s.label} snippet={s} />
          ))}
        </div>
      )}
    </div>
  )
}
