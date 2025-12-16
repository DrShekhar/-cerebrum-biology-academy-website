'use client'

// PERFORMANCE: These utilities are extracted from BlogIllustrations.tsx
// to prevent loading the entire 648KB illustration file when only utilities are needed

// Responsive size classes - use these when integrating illustrations
const sizeClasses = {
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
    <div className={`mx-auto ${sizeClasses[size]} ${className}`} style={{ aspectRatio: '4/3' }}>
      {children}
    </div>
  )
}

// Helper function to get responsive classes
export function getResponsiveClasses(size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'lg'): string {
  return sizeClasses[size]
}
