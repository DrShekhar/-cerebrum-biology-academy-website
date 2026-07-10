'use client'

/**
 * MarkdownWithDiagrams — drop-in replacement for <ReactMarkdown> in LMS lessons
 * that additionally renders diagram code blocks. Any fenced block tagged
 * ```mermaid or ```svg is routed to <LessonDiagram>; every other block renders
 * as normal markdown. This lets authors (or the AI course generator) paste
 * diagram code straight into a lesson's markdown body:
 *
 *   ```mermaid
 *   graph TD; Glucose-->Pyruvate-->AcetylCoA-->Krebs;
 *   ```
 *
 *   ```svg
 *   <svg viewBox="0 0 100 100">…</svg>
 *   ```
 */

import { Children, isValidElement, type ReactNode } from 'react'
import ReactMarkdown, { type Components } from 'react-markdown'
import { LessonDiagram, type DiagramKind } from './LessonDiagram'

/** Collapse a React markdown code child (string | string[] | nodes) to raw text. */
function toText(node: ReactNode): string {
  if (node == null || node === false) return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(toText).join('')
  if (isValidElement(node)) return toText((node.props as { children?: ReactNode }).children)
  return ''
}

const DIAGRAM_LANGS: Record<string, DiagramKind> = {
  mermaid: 'mermaid',
  svg: 'svg',
}

const components: Components = {
  // Intercept fenced blocks at the <pre> level so we can replace the whole block
  // (returning a block element from `code` would nest invalidly inside <pre>).
  pre(props) {
    const child = Children.toArray(props.children).find(isValidElement) as
      | { props: { className?: string; children?: ReactNode } }
      | undefined
    const className = child?.props?.className ?? ''
    const lang = /language-(\w+)/.exec(className)?.[1]?.toLowerCase()
    const kind = lang ? DIAGRAM_LANGS[lang] : undefined

    if (kind) {
      return <LessonDiagram code={toText(child?.props?.children)} kind={kind} />
    }
    return <pre {...props} />
  },
}

export function MarkdownWithDiagrams({ children }: { children: string }) {
  return <ReactMarkdown components={components}>{children}</ReactMarkdown>
}
