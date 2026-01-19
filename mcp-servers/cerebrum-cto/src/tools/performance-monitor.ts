/**
 * Performance Monitor Tool
 *
 * Runs performance analysis using Lighthouse and bundle analysis.
 */

import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'
import fs from 'fs/promises'

const execAsync = promisify(exec)

interface PerformanceParams {
  url?: string
  type?: 'lighthouse' | 'bundle' | 'both'
}

export async function checkPerformance(params: PerformanceParams) {
  const { url = 'https://cerebrumbiologyacademy.com', type = 'both' } = params

  const projectRoot = process.env.CEREBRUM_PROJECT_ROOT || process.cwd()

  let output = '## Performance Analysis Report\n\n'
  output += `**URL**: ${url}\n`
  output += `**Date**: ${new Date().toISOString()}\n\n`

  // Bundle Analysis
  if (type === 'bundle' || type === 'both') {
    output += '### 📦 Bundle Analysis\n\n'

    try {
      // Check if .next/analyze exists (from ANALYZE=true build)
      const analyzePath = path.join(projectRoot, '.next/analyze')

      try {
        await fs.access(analyzePath)
        output += '✅ Bundle analysis available at `.next/analyze/`\n\n'
      } catch {
        output += '⚠️ No bundle analysis found. Run `ANALYZE=true npm run build` to generate.\n\n'
      }

      // Check build manifest for size info
      const buildManifestPath = path.join(projectRoot, '.next/build-manifest.json')

      try {
        const manifest = JSON.parse(await fs.readFile(buildManifestPath, 'utf-8'))
        const pages = Object.keys(manifest.pages || {})

        output += `**Pages in build**: ${pages.length}\n\n`

        // List largest pages by chunk count
        const pageChunks = Object.entries(manifest.pages || {})
          .map(([page, chunks]) => ({
            page,
            chunkCount: (chunks as string[]).length,
          }))
          .sort((a, b) => b.chunkCount - a.chunkCount)
          .slice(0, 10)

        output += '**Top pages by chunk count:**\n'
        for (const { page, chunkCount } of pageChunks) {
          output += `- \`${page}\`: ${chunkCount} chunks\n`
        }
        output += '\n'
      } catch {
        output += '⚠️ Build manifest not found. Run `npm run build` first.\n\n'
      }

      // Check for large files in .next/static
      try {
        const { stdout } = await execAsync(
          `find .next/static -name "*.js" -size +100k -exec ls -lh {} \\; 2>/dev/null | head -10`,
          { cwd: projectRoot }
        )

        if (stdout.trim()) {
          output += '**Large JS bundles (>100KB):**\n```\n'
          output += stdout
          output += '```\n\n'
        } else {
          output += '✅ No JS bundles over 100KB\n\n'
        }
      } catch {
        // Ignore errors
      }
    } catch (error) {
      output += '⚠️ Bundle analysis failed\n\n'
    }
  }

  // Lighthouse (simplified - just show command since actual run requires Chrome)
  if (type === 'lighthouse' || type === 'both') {
    output += '### 🔦 Lighthouse Analysis\n\n'

    output += '**To run Lighthouse locally:**\n'
    output += '```bash\n'
    output += `npx lighthouse ${url} --output=json --output-path=lighthouse-report.json\n`
    output += '```\n\n'

    output += '**Or use PageSpeed Insights:**\n'
    output += `https://pagespeed.web.dev/report?url=${encodeURIComponent(url)}\n\n`

    // Performance targets
    output += '**Performance Targets:**\n\n'
    output += '| Metric | Target | Good | Needs Work |\n'
    output += '|--------|--------|------|------------|\n'
    output += '| First Contentful Paint | <1.8s | <1.0s | >3.0s |\n'
    output += '| Largest Contentful Paint | <2.5s | <1.5s | >4.0s |\n'
    output += '| Time to Interactive | <3.8s | <2.5s | >7.0s |\n'
    output += '| Cumulative Layout Shift | <0.1 | <0.05 | >0.25 |\n'
    output += '| Total Blocking Time | <300ms | <150ms | >600ms |\n'
    output += '\n'
  }

  // Quick wins recommendations
  output += '### 💡 Quick Performance Wins\n\n'
  output += '1. **Enable Image Optimization** - Use `next/image` for all images\n'
  output += '2. **Code Splitting** - Dynamic imports for large components\n'
  output += '3. **Font Optimization** - Use `next/font` for self-hosted fonts\n'
  output += '4. **Caching** - Leverage ISR for static pages\n'
  output += '5. **Compression** - Enable gzip/brotli (Vercel does this automatically)\n'
  output += '6. **Preconnect** - Add preconnect hints for external domains\n'
  output += '7. **Critical CSS** - Inline critical CSS above the fold\n'

  return {
    content: [{ type: 'text', text: output }],
  }
}
