'use client'

import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

interface IllustrationProps {
  className?: string
  animate?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

// Loading placeholder for lazy-loaded illustrations
const IllustrationLoader = () => (
  <div className="w-full h-48 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
    <span className="text-gray-400 text-sm">Loading illustration...</span>
  </div>
)

// Re-export utility functions from separate file (prevents loading 648KB illustrations)
export { ResponsiveIllustrationWrapper, getResponsiveClasses } from './IllustrationUtils'

// Lazy-loaded illustration components
// This reduces initial bundle size by ~500KB

export const KotaVsOnlineIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.KotaVsOnlineIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const ClassStartTimeIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.ClassStartTimeIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const DPSStudentIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.DPSStudentIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const CoachingCenterIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.CoachingCenterIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const BooksForNEETIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.BooksForNEETIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const MistakesToAvoidIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.MistakesToAvoidIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const Last6MonthsStrategyIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.Last6MonthsStrategyIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const MockTestIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.MockTestIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const NCERTReadingIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.NCERTReadingIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const NEET2026GuideIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.NEET2026GuideIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const ToppersSecretsIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.ToppersSecretsIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const ChapterWeightageIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.ChapterWeightageIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const HumanPhysiologyIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.HumanPhysiologyIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const GeneticsIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.GeneticsIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const EcologyIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.EcologyIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const CellBiologyIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.CellBiologyIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const PlantPhysiologyIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.PlantPhysiologyIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const HumanReproductionIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.HumanReproductionIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const BiotechnologyIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.BiotechnologyIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const AnimalKingdomIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.AnimalKingdomIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const PhotosynthesisVsRespirationIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.PhotosynthesisVsRespirationIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const MolecularBiologyIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.MolecularBiologyIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const PlantKingdomIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.PlantKingdomIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const EvolutionIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.EvolutionIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const MicrobesIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.MicrobesIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const NEET180StrategyIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.NEET180StrategyIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const DropperStrategyIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.DropperStrategyIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const Class11FoundationIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.Class11FoundationIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const Class12BoardBalanceIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.Class12BoardBalanceIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const FreeResourcesIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.FreeResourcesIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const ResultsAnalysisIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.ResultsAnalysisIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const DelhiNCRGuideIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.DelhiNCRGuideIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const LaxmiNagarIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.LaxmiNagarIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const NoidaIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.NoidaIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const DwarkaIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.DwarkaIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const SmallVsLargeBatchIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.SmallVsLargeBatchIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const TwoYearProgramIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.TwoYearProgramIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const SpecializedVsMassIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.SpecializedVsMassIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const BiomoleculesIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.BiomoleculesIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const CellDivisionIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.CellDivisionIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const HumanDigestionIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.HumanDigestionIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const RespirationIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.RespirationIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const CirculationIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.CirculationIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const ExcretorySystemIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.ExcretorySystemIllustration),
  { loading: IllustrationLoader, ssr: false }
)

export const NervousSystemIllustration = dynamic<IllustrationProps>(
  () => import('./BlogIllustrations').then((mod) => mod.NervousSystemIllustration),
  { loading: IllustrationLoader, ssr: false }
)
