'use client'

import { useState, useEffect, memo } from 'react'
import dynamic from 'next/dynamic'
import { BookOpen } from 'lucide-react'

type IllustrationComponent = React.ComponentType<{ className?: string; animate?: boolean }>

// Lazy load illustrations only when needed - reduces initial bundle significantly
const illustrationLoaders: Record<string, () => Promise<{ default: IllustrationComponent }>> = {
  'kota-vs-online-neet-coaching-2025': () =>
    import('@/components/illustrations/BlogIllustrations').then((m) => ({
      default: m.KotaVsOnlineIllustration,
    })),
  'when-to-start-neet-preparation-class-9-vs-10': () =>
    import('@/components/illustrations/BlogIllustrations').then((m) => ({
      default: m.ClassStartTimeIllustration,
    })),
  'dps-students-neet-preparation-guide': () =>
    import('@/components/illustrations/BlogIllustrations').then((m) => ({
      default: m.DPSStudentIllustration,
    })),
  'top-10-neet-biology-coaching-delhi-ncr-2025': () =>
    import('@/components/illustrations/BlogIllustrations').then((m) => ({
      default: m.CoachingCenterIllustration,
    })),
  'neet-biology-coaching-delhi-ncr-guide': () =>
    import('@/components/illustrations/BlogIllustrations').then((m) => ({
      default: m.DelhiNCRGuideIllustration,
    })),
  'best-books-for-neet-2026-biology-physics-chemistry': () =>
    import('@/components/illustrations/BlogIllustrations').then((m) => ({
      default: m.BooksForNEETIllustration,
    })),
  'common-mistakes-neet-aspirants-avoid-2026': () =>
    import('@/components/illustrations/BlogIllustrations').then((m) => ({
      default: m.MistakesToAvoidIllustration,
    })),
  'last-6-months-neet-2026-preparation-strategy': () =>
    import('@/components/illustrations/BlogIllustrations').then((m) => ({
      default: m.Last6MonthsStrategyIllustration,
    })),
  'mock-test-strategy-neet-2026-complete-guide': () =>
    import('@/components/illustrations/BlogIllustrations').then((m) => ({
      default: m.MockTestIllustration,
    })),
  'ncert-reading-strategy-neet-biology-2026': () =>
    import('@/components/illustrations/BlogIllustrations').then((m) => ({
      default: m.NCERTReadingIllustration,
    })),
  'neet-2026-complete-guide-exam-pattern-syllabus-dates': () =>
    import('@/components/illustrations/BlogIllustrations').then((m) => ({
      default: m.NEET2026GuideIllustration,
    })),
  'what-neet-toppers-do-differently-secrets-revealed': () =>
    import('@/components/illustrations/BlogIllustrations').then((m) => ({
      default: m.ToppersSecretsIllustration,
    })),
  'neet-biology-chapter-wise-weightage-2026': () =>
    import('@/components/illustrations/BlogIllustrations').then((m) => ({
      default: m.ChapterWeightageIllustration,
    })),
  'genetics-heredity-variation-neet': () =>
    import('@/components/illustrations/BlogIllustrations').then((m) => ({
      default: m.GeneticsIllustration,
    })),
  'cell-structure-function-neet-notes': () =>
    import('@/components/illustrations/BlogIllustrations').then((m) => ({
      default: m.CellBiologyIllustration,
    })),
  'cell-division-mitosis-meiosis-neet': () =>
    import('@/components/illustrations/BlogIllustrations').then((m) => ({
      default: m.CellDivisionIllustration,
    })),
  'biomolecules-neet-biology-complete-guide': () =>
    import('@/components/illustrations/BlogIllustrations').then((m) => ({
      default: m.BiomoleculesIllustration,
    })),
  'photosynthesis-neet-biology-notes': () =>
    import('@/components/illustrations/BlogIllustrations').then((m) => ({
      default: m.PlantPhysiologyIllustration,
    })),
  'photosynthesis-vs-respiration-neet-comparison': () =>
    import('@/components/illustrations/BlogIllustrations').then((m) => ({
      default: m.PhotosynthesisVsRespirationIllustration,
    })),
  'human-digestion-absorption-neet': () =>
    import('@/components/illustrations/BlogIllustrations').then((m) => ({
      default: m.HumanDigestionIllustration,
    })),
  'breathing-gas-exchange-neet-notes': () =>
    import('@/components/illustrations/BlogIllustrations').then((m) => ({
      default: m.RespirationIllustration,
    })),
  'body-fluids-circulation-neet': () =>
    import('@/components/illustrations/BlogIllustrations').then((m) => ({
      default: m.CirculationIllustration,
    })),
  'excretory-system-neet-notes': () =>
    import('@/components/illustrations/BlogIllustrations').then((m) => ({
      default: m.ExcretorySystemIllustration,
    })),
  'nervous-system-neet-biology': () =>
    import('@/components/illustrations/BlogIllustrations').then((m) => ({
      default: m.NervousSystemIllustration,
    })),
  'plant-kingdom-classification-neet': () =>
    import('@/components/illustrations/BlogIllustrations').then((m) => ({
      default: m.PlantKingdomIllustration,
    })),
  'neet-biology-preparation-strategy-score-180-plus': () =>
    import('@/components/illustrations/BlogIllustrations').then((m) => ({
      default: m.NEET180StrategyIllustration,
    })),
  'neet-biology-syllabus-2025-complete-guide': () =>
    import('@/components/illustrations/BlogIllustrations').then((m) => ({
      default: m.ChapterWeightageIllustration,
    })),
  'ultimate-neet-2025-guide-specialized-vs-mass-coaching': () =>
    import('@/components/illustrations/BlogIllustrations').then((m) => ({
      default: m.SpecializedVsMassIllustration,
    })),
}

interface BlogThumbnailProps {
  slug: string
  title: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  category?: string
}

// Category-based fallback colors for visual variety
const categoryColors: Record<string, string> = {
  'neet-preparation': 'bg-slate-700',
  'biology-concepts': 'bg-green-600',
  'study-tips': 'bg-blue-600',
  'chapter-guides': 'bg-indigo-600',
  'exam-updates': 'bg-orange-500',
  'success-stories': 'bg-purple-600',
}

const sizeClasses = {
  sm: 'h-32',
  md: 'h-40',
  lg: 'h-48',
}

// Skeleton loader for illustrations
function IllustrationSkeleton({ size }: { size: 'sm' | 'md' | 'lg' }) {
  return (
    <div
      className={`relative w-full ${sizeClasses[size]} bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 rounded-xl overflow-hidden animate-pulse`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-xl bg-white/50" />
      </div>
    </div>
  )
}

// Memoized component for better performance
export const BlogThumbnail = memo(function BlogThumbnail({
  slug,
  title,
  className = '',
  size = 'md',
  category,
}: BlogThumbnailProps) {
  const [Illustration, setIllustration] = useState<IllustrationComponent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const loader = illustrationLoaders[slug]
    if (loader) {
      setIsLoading(true)
      loader()
        .then((module) => {
          setIllustration(() => module.default)
          setIsLoading(false)
        })
        .catch(() => {
          setHasError(true)
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
      setHasError(true)
    }
  }, [slug])

  // Loading state
  if (isLoading) {
    return <IllustrationSkeleton size={size} />
  }

  // Illustration loaded successfully
  if (Illustration && !hasError) {
    return (
      <div
        className={`relative w-full ${sizeClasses[size]} bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 rounded-xl overflow-hidden ${className}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%)]" />
        <div className="absolute inset-0 p-3 flex items-center justify-center">
          <Illustration className="w-full h-full max-w-full" animate={false} />
        </div>
      </div>
    )
  }

  // Fallback with category-based color and icon
  const fallbackColor = category ? categoryColors[category] || 'bg-slate-600' : 'bg-slate-600'

  return (
    <div
      className={`relative w-full ${sizeClasses[size]} ${fallbackColor} rounded-xl overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white/80">
        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-2">
          <BookOpen className="w-6 h-6" />
        </div>
        <span className="text-xs font-medium text-center px-2 line-clamp-2">{title}</span>
      </div>
    </div>
  )
})
