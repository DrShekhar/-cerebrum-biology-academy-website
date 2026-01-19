/**
 * Codebase Search Tool
 *
 * Semantic search across the Cerebrum codebase using grep and glob patterns.
 * In production, this could be enhanced with vector embeddings for true semantic search.
 */

import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'

const execAsync = promisify(exec)

interface SearchParams {
  query: string
  fileTypes?: string[]
  maxResults?: number
}

interface SearchResult {
  file: string
  line: number
  content: string
  context?: string
}

export async function searchCodebase(params: SearchParams) {
  const { query, fileTypes = ['.ts', '.tsx', '.js', '.jsx'], maxResults = 10 } = params

  const projectRoot = process.env.CEREBRUM_PROJECT_ROOT || path.resolve(process.cwd(), '..')

  try {
    // Build grep command with file type filters
    const includePatterns = fileTypes.map((ext) => `--include="*${ext}"`).join(' ')

    // Search for the query
    const { stdout } = await execAsync(
      `grep -rn ${includePatterns} --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=dist "${query}" ${projectRoot}/src 2>/dev/null | head -${maxResults * 2}`,
      { maxBuffer: 1024 * 1024 }
    )

    // Parse results
    const results: SearchResult[] = []
    const lines = stdout.trim().split('\n').filter(Boolean)

    for (const line of lines.slice(0, maxResults)) {
      const match = line.match(/^(.+):(\d+):(.+)$/)
      if (match) {
        results.push({
          file: match[1].replace(projectRoot, ''),
          line: parseInt(match[2], 10),
          content: match[3].trim(),
        })
      }
    }

    // Format output
    let output = `## Codebase Search Results for: "${query}"\n\n`
    output += `Found ${results.length} results:\n\n`

    for (const result of results) {
      output += `### ${result.file}:${result.line}\n`
      output += '```\n'
      output += result.content + '\n'
      output += '```\n\n'
    }

    if (results.length === 0) {
      output = `No results found for "${query}" in the codebase.\n\nTry:\n- Different keywords\n- Broader search terms\n- Check file type filters`
    }

    return {
      content: [{ type: 'text', text: output }],
    }
  } catch (error) {
    // grep returns exit code 1 when no matches found
    if (error instanceof Error && error.message.includes('exit code 1')) {
      return {
        content: [
          {
            type: 'text',
            text: `No results found for "${query}" in the codebase.`,
          },
        ],
      }
    }

    throw error
  }
}
