#!/usr/bin/env node

/**
 * Component Generator Script
 * Creates new React components with proper TypeScript, testing, and documentation
 *
 * Usage: npm run create:component ComponentName
 */

const fs = require('fs')
const path = require('path')

const componentName = process.argv[2]
if (!componentName) {
  console.error('❌ Please provide a component name')
  console.log('Usage: npm run create:component ComponentName')
  process.exit(1)
}

const componentDir = `src/components/ui/${componentName}`
const testDir = `src/__tests__/components/${componentName}`

// Create directories
if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir, { recursive: true })
}
if (!fs.existsSync(testDir)) {
  fs.mkdirSync(testDir, { recursive: true })
}

// Component template
const componentTemplate = `'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface ${componentName}Props {
  className?: string
  children?: React.ReactNode
}

export function ${componentName}({ className, children, ...props }: ${componentName}Props) {
  return (
    <div className={cn('', className)} {...props}>
      {children || <div>🚧 ${componentName} component - under development</div>}
    </div>
  )
}

export default ${componentName}
`

// Test template
const testTemplate = `import { render, screen } from '@testing-library/react'
import { ${componentName} } from '../../../components/ui/${componentName}/${componentName}'

describe('${componentName}', () => {
  it('should render without crashing', () => {
    render(<${componentName} />)
    expect(screen.getByText(/under development/i)).toBeInTheDocument()
  })

  it('should accept custom className', () => {
    render(<${componentName} className="custom-class" />)
    const element = screen.getByText(/under development/i).parentElement
    expect(element).toHaveClass('custom-class')
  })

  it('should render children when provided', () => {
    render(<${componentName}>Test content</${componentName}>)
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })
})
`

// Types template
const typesTemplate = `export interface ${componentName}Props {
  className?: string
  children?: React.ReactNode
}

export interface ${componentName}State {
  // Add state interface if needed
}

export interface ${componentName}Context {
  // Add context interface if needed
}
`

// Stories template (for Storybook if you add it later)
const storiesTemplate = `import type { Meta, StoryObj } from '@storybook/react'
import { ${componentName} } from './${componentName}'

const meta: Meta<typeof ${componentName}> = {
  title: 'UI/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithCustomClass: Story = {
  args: {
    className: 'border-2 border-blue-500 p-4',
  },
}

export const WithChildren: Story = {
  args: {
    children: 'Custom content for ${componentName}',
  },
}
`

// Write files
fs.writeFileSync(`${componentDir}/${componentName}.tsx`, componentTemplate)
fs.writeFileSync(`${componentDir}/types.ts`, typesTemplate)
fs.writeFileSync(`${componentDir}/${componentName}.stories.tsx`, storiesTemplate)
fs.writeFileSync(
  `${componentDir}/index.ts`,
  `export { ${componentName} } from './${componentName}'`
)
fs.writeFileSync(`${testDir}/${componentName}.test.tsx`, testTemplate)

console.log(`✅ Component ${componentName} created successfully!`)
console.log(`📁 Component: ${componentDir}/${componentName}.tsx`)
console.log(`🧪 Test: ${testDir}/${componentName}.test.tsx`)
console.log(`📖 Stories: ${componentDir}/${componentName}.stories.tsx`)
console.log('\n📝 Next steps:')
console.log(`1. Implement the component logic in ${componentName}.tsx`)
console.log(`2. Add proper props and types in types.ts`)
console.log(`3. Write comprehensive tests in ${componentName}.test.tsx`)
console.log(
  `4. Import and use: import { ${componentName} } from '@/components/ui/${componentName}'`
)
