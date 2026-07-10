'use client'

/**
 * Client wrapper for the biology-notes reader (a server component). Server
 * components can't pass function-valued `components` across the client boundary
 * to <MarkdownWithDiagrams>, so the note's markdown styling lives here and the
 * page just renders <BiologyNotesContent content={topic.content} />. Adds
 * ```mermaid / ```svg diagram support to notes for free.
 */

import type { Components } from 'react-markdown'
import { MarkdownWithDiagrams } from './MarkdownWithDiagrams'

const components: Components = {
  h2: ({ children }) => (
    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-8 mb-4">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-6 mb-3">{children}</h3>
  ),
  p: ({ children }) => <p className="text-gray-700 leading-relaxed mb-4">{children}</p>,
  ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
  strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
}

export function BiologyNotesContent({ content }: { content: string }) {
  return <MarkdownWithDiagrams components={components}>{content}</MarkdownWithDiagrams>
}
