'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface ExampleWorkflowDemoProps {
  className?: string
  children?: React.ReactNode
}

export function ExampleWorkflowDemo({ className, children, ...props }: ExampleWorkflowDemoProps) {
  return (
    <div className={cn('', className)} {...props}>
      {children || (
        <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            ✅ New Workflow Demonstration
          </h3>
          <p className="text-green-700">This component was created using the new workflow:</p>
          <ul className="mt-3 space-y-1 text-sm text-green-600">
            <li>🚀 Generated with npm run create:component</li>
            <li>🧪 Includes comprehensive tests</li>
            <li>📚 Has TypeScript interfaces</li>
            <li>🎭 Ready for Storybook documentation</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default ExampleWorkflowDemo
