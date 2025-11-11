'use client'

import React from 'react'

interface ScreenReaderOnlyProps {
  children: React.ReactNode
  as?: keyof React.JSX.IntrinsicElements
}

export function ScreenReaderOnly({ children, as = 'span' }: ScreenReaderOnlyProps) {
  const Component = as as React.ElementType

  return <Component className="sr-only">{children}</Component>
}
