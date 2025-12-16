'use client'

import { useEffect, useRef, useState } from 'react'

// PERFORMANCE: Dynamic import KaTeX only when component is used
// This saves ~850KB from the initial bundle on pages that don't use LaTeX
type KaTeXModule = typeof import('katex')
let katexModule: KaTeXModule | null = null
let katexStylesLoaded = false

async function loadKatex(): Promise<KaTeXModule> {
  if (katexModule) return katexModule

  // Load KaTeX module
  katexModule = await import('katex')

  // Load CSS only once
  if (!katexStylesLoaded && typeof document !== 'undefined') {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css'
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
    katexStylesLoaded = true
  }

  return katexModule
}

interface LatexRendererProps {
  content: string
  displayMode?: boolean
  className?: string
}

export function LatexRenderer({
  content,
  displayMode = false,
  className = '',
}: LatexRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!containerRef.current) return

    let isMounted = true

    // Parse content and render LaTeX
    const renderContent = async () => {
      const container = containerRef.current
      if (!container || !isMounted) return

      // Check if content contains any LaTeX
      const hasLatex = /\$|\\\[|\\\(/.test(content)

      if (!hasLatex) {
        // No LaTeX - render as plain text without loading KaTeX
        container.textContent = content
        setIsLoading(false)
        return
      }

      // Load KaTeX dynamically only when needed
      const katex = await loadKatex()
      if (!isMounted) return

      // Split content by LaTeX delimiters
      // Inline: $...$  or \(...\)
      // Display: $$...$$ or \[...\]
      const parts = parseLatex(content)

      container.innerHTML = ''

      parts.forEach((part) => {
        if (part.isLatex) {
          try {
            const span = document.createElement('span')
            katex.default.render(part.content, span, {
              displayMode: part.displayMode || displayMode,
              throwOnError: false,
              strict: false,
              trust: true,
              macros: {
                // Biology-specific macros
                '\\DNA': '\\text{DNA}',
                '\\RNA': '\\text{RNA}',
                '\\ATP': '\\text{ATP}',
                '\\ADP': '\\text{ADP}',
                '\\NADH': '\\text{NADH}',
                '\\NADPH': '\\text{NADPH}',
                '\\CO': '\\text{CO}_2',
                '\\HO': '\\text{H}_2\\text{O}',
                '\\glucose': '\\text{C}_6\\text{H}_{12}\\text{O}_6',
              },
            })
            container.appendChild(span)
          } catch (error) {
            console.error('KaTeX render error:', error)
            const span = document.createElement('span')
            span.className = 'text-red-500'
            span.textContent = part.content
            container.appendChild(span)
          }
        } else {
          const span = document.createElement('span')
          span.textContent = part.content
          container.appendChild(span)
        }
      })

      setIsLoading(false)
    }

    renderContent()

    return () => {
      isMounted = false
    }
  }, [content, displayMode])

  return (
    <div
      ref={containerRef}
      className={`latex-content ${displayMode ? 'text-center my-4' : 'inline'} ${className}`}
    />
  )
}

// Parse content to identify LaTeX sections
interface ContentPart {
  content: string
  isLatex: boolean
  displayMode?: boolean
}

function parseLatex(text: string): ContentPart[] {
  const parts: ContentPart[] = []
  let currentIndex = 0

  // Regex patterns for LaTeX delimiters
  const patterns = [
    { regex: /\$\$([\s\S]*?)\$\$/g, displayMode: true }, // Display math: $$...$$
    { regex: /\\\[([\s\S]*?)\\\]/g, displayMode: true }, // Display math: \[...\]
    { regex: /\$([^\$]+?)\$/g, displayMode: false }, // Inline math: $...$
    { regex: /\\\(([\s\S]*?)\\\)/g, displayMode: false }, // Inline math: \(...\)
  ]

  // Find all LaTeX matches
  const matches: Array<{
    index: number
    length: number
    content: string
    displayMode: boolean
  }> = []

  patterns.forEach(({ regex, displayMode }) => {
    const re = new RegExp(regex.source, regex.flags)
    let match

    while ((match = re.exec(text)) !== null) {
      matches.push({
        index: match.index,
        length: match[0].length,
        content: match[1],
        displayMode,
      })
    }
  })

  // Sort matches by index
  matches.sort((a, b) => a.index - b.index)

  // Build parts array
  matches.forEach((match) => {
    // Add text before LaTeX
    if (match.index > currentIndex) {
      parts.push({
        content: text.slice(currentIndex, match.index),
        isLatex: false,
      })
    }

    // Add LaTeX part
    parts.push({
      content: match.content,
      isLatex: true,
      displayMode: match.displayMode,
    })

    currentIndex = match.index + match.length
  })

  // Add remaining text
  if (currentIndex < text.length) {
    parts.push({
      content: text.slice(currentIndex),
      isLatex: false,
    })
  }

  // If no LaTeX found, return whole text as non-LaTeX
  if (parts.length === 0) {
    parts.push({
      content: text,
      isLatex: false,
    })
  }

  return parts
}

// Message renderer that handles LaTeX
export function MessageWithLatex({
  content,
  className = '',
}: {
  content: string
  className?: string
}) {
  return (
    <div className={`message-content ${className}`}>
      <LatexRenderer content={content} />
    </div>
  )
}
