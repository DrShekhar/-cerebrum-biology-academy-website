'use client'

import { useState, useEffect, memo } from 'react'
import { AutoIllustration } from './AutoIllustration'

type IllustrationComponent = React.ComponentType<{ className?: string; animate?: boolean }>

// Dynamic loaders for all blog illustrations - loaded on demand AFTER initial render
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
  category?: string
  title?: string
  className?: string
}

export const BlogIllustrationLoader = memo(function BlogIllustrationLoader({
  slug,
  neetChapter,
  category,
  title,
  className = 'w-full h-full max-w-4xl drop-shadow-sm',
}: BlogIllustrationLoaderProps) {
  const [Illustration, setIllustration] = useState<IllustrationComponent | null>(null)
  const [hasLoaded, setHasLoaded] = useState(false)

  // Load illustration AFTER initial render (non-blocking for LCP)
  useEffect(() => {
    // Skip if no loader exists for this slug
    const loader = illustrationLoaders[slug]
    if (!loader) {
      setHasLoaded(true)
      return
    }

    // Use requestIdleCallback to load after main thread is free
    const loadIllustration = () => {
      loader()
        .then((module) => {
          setIllustration(() => module.default)
          setHasLoaded(true)
        })
        .catch(() => {
          setHasLoaded(true)
        })
    }

    // Defer loading to not block LCP
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadIllustration, { timeout: 2000 })
    } else {
      setTimeout(loadIllustration, 100)
    }
  }, [slug])

  // If illustration loaded, show it with fade-in
  if (Illustration && hasLoaded) {
    return (
      <div className="animate-fade-in">
        <Illustration className={className} animate={true} />
      </div>
    )
  }

  // CRITICAL: Render AutoIllustration IMMEDIATELY for fast LCP
  // Beautiful, unique SVG generated from blog metadata — zero network requests
  return (
    <AutoIllustration
      slug={slug}
      category={category}
      neetChapter={neetChapter}
      title={title}
      className={className}
    />
  )
})
