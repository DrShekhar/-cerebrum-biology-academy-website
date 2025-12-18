import * as fs from 'fs'
import * as path from 'path'

const sourceFile = 'src/components/illustrations/BlogIllustrations.tsx'
const outputDir = 'src/components/illustrations/blog'

// Read the source file
const content = fs.readFileSync(sourceFile, 'utf-8')

// Create shared.tsx with utilities
const sharedContent = `'use client'

import { motion } from 'framer-motion'

export interface IllustrationProps {
  className?: string
  animate?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

// Responsive size classes - use these when integrating illustrations
export const sizeClasses = {
  sm: 'w-full max-w-[200px] h-auto',
  md: 'w-full max-w-[300px] h-auto',
  lg: 'w-full max-w-[400px] h-auto',
  xl: 'w-full max-w-[500px] h-auto',
  full: 'w-full h-auto',
}

// Responsive wrapper component for blog illustrations
export function ResponsiveIllustrationWrapper({
  children,
  size = 'lg',
  className = '',
}: {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
}) {
  return (
    <div className={\`mx-auto \${sizeClasses[size]} \${className}\`} style={{ aspectRatio: '4/3' }}>
      {children}
    </div>
  )
}

// Helper function to get responsive classes
export function getResponsiveClasses(size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'lg'): string {
  return sizeClasses[size]
}

// Re-export motion for use in illustration components
export { motion }
`

fs.writeFileSync(path.join(outputDir, 'shared.tsx'), sharedContent)
console.log('Created shared.tsx')

// Find all exported function names and their line numbers
const exportRegex = /^export function (\w+)/gm
const exports: { name: string; startLine: number }[] = []
let match

const lines = content.split('\n')
for (let i = 0; i < lines.length; i++) {
  const line = lines[i]
  if (line.startsWith('export function ')) {
    const funcMatch = line.match(/^export function (\w+)/)
    if (funcMatch) {
      exports.push({ name: funcMatch[1], startLine: i })
    }
  }
}

console.log(`Found ${exports.length} exports`)

// Skip utility functions (first 3)
const illustrationExports = exports.filter(
  (e) =>
    e.name !== 'ResponsiveIllustrationWrapper' &&
    e.name !== 'getResponsiveClasses'
)

console.log(`Processing ${illustrationExports.length} illustration components`)

// Extract each illustration
const indexExports: string[] = []

for (let i = 0; i < illustrationExports.length; i++) {
  const current = illustrationExports[i]
  const next = illustrationExports[i + 1]

  const startLine = current.startLine
  const endLine = next ? next.startLine - 1 : lines.length - 1

  // Find the actual end of the function (closing brace)
  let functionContent = lines.slice(startLine, endLine + 1).join('\n')

  // Clean up any trailing empty lines or comments about next function
  functionContent = functionContent.replace(/\n\/\/.*\n*$/, '\n')

  // Create the component file
  const fileName = `${current.name}.tsx`
  const fileContent = `'use client'

import { motion } from 'framer-motion'
import type { IllustrationProps } from './shared'

${functionContent}
`

  fs.writeFileSync(path.join(outputDir, fileName), fileContent)
  indexExports.push(current.name)

  if (i % 10 === 0) {
    console.log(`Processed ${i + 1}/${illustrationExports.length}...`)
  }
}

// Create index.ts
const indexContent = `// Auto-generated index file for blog illustrations
// Re-exports all illustration components for easy importing

export * from './shared'

${indexExports.map((name) => `export { ${name} } from './${name}'`).join('\n')}
`

fs.writeFileSync(path.join(outputDir, 'index.ts'), indexContent)
console.log('Created index.ts')

console.log(`\nDone! Split ${illustrationExports.length} illustrations into ${outputDir}/`)
