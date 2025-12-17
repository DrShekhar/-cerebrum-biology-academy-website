'use client'

import { useState, useEffect, memo } from 'react'
import { BookOpen } from 'lucide-react'

type IllustrationComponent = React.ComponentType<{ className?: string; animate?: boolean }>

// Dynamic loaders for all blog illustrations - loaded on demand
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

interface BlogIllustrationLoaderProps {
  slug: string
  neetChapter?: string
  className?: string
}

// Skeleton loader matching the featured image dimensions
function IllustrationSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center text-slate-400 animate-pulse">
      <div className="w-20 h-20 rounded-2xl bg-white/60 shadow-lg flex items-center justify-center mb-4">
        <div className="w-10 h-10 bg-slate-200 rounded-lg" />
      </div>
      <div className="w-24 h-4 bg-slate-200 rounded" />
    </div>
  )
}

export const BlogIllustrationLoader = memo(function BlogIllustrationLoader({
  slug,
  neetChapter,
  className = 'w-full h-full max-w-4xl drop-shadow-sm',
}: BlogIllustrationLoaderProps) {
  const [Illustration, setIllustration] = useState<IllustrationComponent | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loader = illustrationLoaders[slug]
    if (loader) {
      loader()
        .then((module) => {
          setIllustration(() => module.default)
          setIsLoading(false)
        })
        .catch(() => {
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
    }
  }, [slug])

  if (isLoading) {
    return <IllustrationSkeleton />
  }

  if (Illustration) {
    return <Illustration className={className} animate={true} />
  }

  // Fallback
  return (
    <div className="flex flex-col items-center justify-center text-slate-400">
      <div className="w-20 h-20 rounded-2xl bg-white/80 shadow-lg flex items-center justify-center mb-4">
        <BookOpen className="w-10 h-10 text-blue-500" />
      </div>
      <span className="text-sm font-medium text-slate-500">{neetChapter || 'NEET Biology'}</span>
    </div>
  )
})
