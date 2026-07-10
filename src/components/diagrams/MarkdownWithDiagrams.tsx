'use client'

/**
 * MarkdownWithDiagrams — drop-in replacement for <ReactMarkdown> in lessons and
 * notes that additionally renders diagram code blocks. Any fenced block tagged
 * ```mermaid or ```svg is routed to <LessonDiagram>; every other block renders
 * as normal markdown. This lets authors (or the AI course generator) paste
 * diagram code straight into a lesson's markdown body:
 *
 *   ```mermaid Cellular respiration
 *   graph TD; Glucose-->Pyruvate-->AcetylCoA-->Krebs;
 *   ```
 *
 *   ```svg Ethylene (C₂H₄)
 *   <svg viewBox="0 0 100 100">…</svg>
 *   ```
 *
 * The text after the language on the fence line (the "info string" / meta) is
 * used as the figure caption. Callers can pass their own `components` map to
 * style headings/paragraphs etc.; the diagram-aware `pre` handler is merged in
 * (a caller-supplied `pre` still wins for non-diagram blocks).
 */

import { Children, isValidElement, type ComponentProps, type ReactNode } from 'react'
import ReactMarkdown, { type Components } from 'react-markdown'
import { LessonDiagram, type DiagramKind } from './LessonDiagram'

type ReactMarkdownProps = ComponentProps<typeof ReactMarkdown>

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

/** Read the fenced-block meta (info string after the language) as a caption. */
function metaFromNode(node: unknown): string | undefined {
  const codeChild = (node as { children?: Array<{ data?: { meta?: string } }> })?.children?.find(
    (c) => (c as { tagName?: string })?.tagName === 'code'
  )
  const meta = codeChild?.data?.meta
  return meta && meta.trim() ? meta.trim() : undefined
}

function buildComponents(extra?: Components): Components {
  return {
    ...extra,
    // Intercept fenced blocks at the <pre> level so we can replace the whole
    // block (returning a block element from `code` would nest invalidly).
    pre(props) {
      const child = Children.toArray(props.children).find(isValidElement) as
        | { props: { className?: string; children?: ReactNode } }
        | undefined
      const className = child?.props?.className ?? ''
      const lang = /language-(\w+)/.exec(className)?.[1]?.toLowerCase()
      const kind = lang ? DIAGRAM_LANGS[lang] : undefined

      if (kind) {
        return (
          <LessonDiagram
            code={toText(child?.props?.children)}
            kind={kind}
            caption={metaFromNode((props as { node?: unknown }).node)}
          />
        )
      }
      // Defer to a caller-supplied `pre` for ordinary code blocks, else default.
      const ExtraPre = extra?.pre
      return ExtraPre ? <ExtraPre {...props} /> : <pre {...props} />
    },
  }
}

export function MarkdownWithDiagrams({
  children,
  components,
  remarkPlugins,
  rehypePlugins,
}: {
  children: string
  components?: Components
  remarkPlugins?: ReactMarkdownProps['remarkPlugins']
  rehypePlugins?: ReactMarkdownProps['rehypePlugins']
}) {
  return (
    <ReactMarkdown
      components={buildComponents(components)}
      remarkPlugins={remarkPlugins}
      rehypePlugins={rehypePlugins}
    >
      {children}
    </ReactMarkdown>
  )
}
