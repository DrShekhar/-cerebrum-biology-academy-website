'use client'

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:font-semibold focus:shadow-xl focus:transform focus:transition-all"
    >
      Skip to main content
    </a>
  )
}
