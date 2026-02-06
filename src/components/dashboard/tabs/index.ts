// Dashboard Tab Components - Modular architecture for PersonalizedStudentDashboard
// Split from original 1,238 line component for better maintainability

export { OverviewTab } from './OverviewTab'
export { StudySessionTab } from './StudySessionTab'
export { ToolsHubTab } from './ToolsHubTab'
export { ProgressTab } from './ProgressTab'
export { WeakAreasTab } from './WeakAreasTab'
export { PracticeTab } from './PracticeTab'
export { WeakAreaItem } from './WeakAreaItem'
export { WeakAreaBottomSheet } from './WeakAreaBottomSheet'
export { DashboardHeader } from './DashboardHeader'
export { DashboardTabs } from './DashboardTabs'
export { DashboardLoadingState } from './DashboardLoadingState'
export { DashboardEmptyState } from './DashboardEmptyState'

// Re-export types
export type {
  WeakArea,
  NEETProgress,
  StudySession,
  GamificationData,
  GamificationStats,
  GamificationAchievement,
} from './OverviewTab'

export type { Tab } from './DashboardTabs'
