import React from 'react'

interface ScreenReaderOnlyProps {
  children: React.ReactNode
  as?: keyof JSX.IntrinsicElements
}

export function ScreenReaderOnly({ children, as = 'span' }: ScreenReaderOnlyProps) {
  const Component = as

  return <Component className="sr-only">{children}</Component>
}
