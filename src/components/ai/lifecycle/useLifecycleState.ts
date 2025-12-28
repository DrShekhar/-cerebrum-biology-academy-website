'use client'

import { useState, useEffect, useCallback } from 'react'
import type {
  TestLifecycle,
  DraftSettings,
  PublishSettings,
  ScheduleSettings,
  CloneSettings,
  PracticeModeSettings,
  AnswerKeySettings,
  SolutionReleaseSettings,
  RegradeOptions,
  LifecycleTab,
} from './types'
import { generateMockTests, generateMockVersions } from './mockData'

export interface LifecycleState {
  activeTab: LifecycleTab
  tests: TestLifecycle[]
  selectedTest: string
  loading: boolean
  saving: boolean
  draftSettings: DraftSettings
  publishSettings: PublishSettings
  scheduleSettings: ScheduleSettings
  cloneSettings: CloneSettings
  practiceSettings: PracticeModeSettings
  answerKeySettings: AnswerKeySettings
  solutionSettings: SolutionReleaseSettings
  regradeOptions: RegradeOptions
}

export interface LifecycleActions {
  setActiveTab: (tab: LifecycleTab) => void
  setSelectedTest: (testId: string) => void
  setDraftSettings: React.Dispatch<React.SetStateAction<DraftSettings>>
  setPublishSettings: React.Dispatch<React.SetStateAction<PublishSettings>>
  setScheduleSettings: React.Dispatch<React.SetStateAction<ScheduleSettings>>
  setCloneSettings: React.Dispatch<React.SetStateAction<CloneSettings>>
  setPracticeSettings: React.Dispatch<React.SetStateAction<PracticeModeSettings>>
  setAnswerKeySettings: React.Dispatch<React.SetStateAction<AnswerKeySettings>>
  setSolutionSettings: React.Dispatch<React.SetStateAction<SolutionReleaseSettings>>
  setRegradeOptions: React.Dispatch<React.SetStateAction<RegradeOptions>>
  saveAsDraft: () => void
  publishTest: () => void
  scheduleTest: () => void
  cloneTest: () => void
  enablePracticeMode: () => void
  generateAnswerKey: () => void
  releaseSolutions: () => void
  initiateRegrade: () => void
  getSelectedTestData: () => TestLifecycle | undefined
}

const initialDraftSettings: DraftSettings = {
  autoSave: true,
  saveInterval: 30,
  versions: [],
  collaborators: [],
  lastSaved: new Date().toISOString(),
}

const initialPublishSettings: PublishSettings = {
  publishImmediately: true,
  notifyStudents: true,
  notificationMessage: 'A new test is now available. Good luck!',
  accessRestrictions: {
    ipWhitelist: [],
    deviceLimit: 1,
    browserRequirements: [],
  },
  securitySettings: {
    preventCopyPaste: true,
    preventPrintScreen: true,
    lockdownBrowser: false,
    webcamMonitoring: false,
  },
}

const initialScheduleSettings: ScheduleSettings = {
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
  timezone: 'Asia/Kolkata',
  gracePeriod: 15,
  autoExtensions: false,
  reminderNotifications: {
    enabled: true,
    intervals: [7, 3, 1],
  },
  availabilityWindows: [],
}

const initialCloneSettings: CloneSettings = {
  newTitle: '',
  targetYear: new Date().getFullYear().toString(),
  preserveSchedule: false,
  updateQuestions: true,
  resetAnalytics: true,
  cloneType: 'updated',
  questionUpdates: {
    refreshContent: true,
    updateDifficulty: false,
    addNewQuestions: false,
    removeOutdated: false,
  },
}

const initialPracticeSettings: PracticeModeSettings = {
  allowUnlimitedAttempts: true,
  showAnswersImmediately: false,
  showExplanations: true,
  showScoreAfterEach: true,
  enableHints: true,
  randomizeQuestions: true,
  timeLimit: {
    enabled: false,
    duration: 60,
  },
  feedbackLevel: 'detailed',
}

const initialAnswerKeySettings: AnswerKeySettings = {
  includeExplanations: true,
  includeReferences: true,
  includeMarkingScheme: true,
  format: 'pdf',
  accessLevel: 'teachers',
  watermark: 'CONFIDENTIAL',
  generateQRCode: true,
  includeStatistics: false,
}

const initialSolutionSettings: SolutionReleaseSettings = {
  releaseType: 'scheduled',
  accessControl: {
    requireCompletion: true,
    minimumScore: 0,
    waitPeriod: 0,
  },
  contentLevel: 'complete',
  distributionMethod: 'platform',
}

const initialRegradeOptions: RegradeOptions = {
  regradeType: 'partial',
  selectedQuestions: [],
  reason: '',
  notifyStudents: true,
  preserveOriginalScores: true,
  approvalRequired: true,
  regradeBy: '',
  deadline: '',
  affectedStudents: [],
}

export function useLifecycleState(): LifecycleState & LifecycleActions {
  const [activeTab, setActiveTab] = useState<LifecycleTab>('draft')
  const [tests, setTests] = useState<TestLifecycle[]>([])
  const [selectedTest, setSelectedTest] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const [draftSettings, setDraftSettings] = useState<DraftSettings>(initialDraftSettings)
  const [publishSettings, setPublishSettings] = useState<PublishSettings>(initialPublishSettings)
  const [scheduleSettings, setScheduleSettings] = useState<ScheduleSettings>(initialScheduleSettings)
  const [cloneSettings, setCloneSettings] = useState<CloneSettings>(initialCloneSettings)
  const [practiceSettings, setPracticeSettings] =
    useState<PracticeModeSettings>(initialPracticeSettings)
  const [answerKeySettings, setAnswerKeySettings] =
    useState<AnswerKeySettings>(initialAnswerKeySettings)
  const [solutionSettings, setSolutionSettings] =
    useState<SolutionReleaseSettings>(initialSolutionSettings)
  const [regradeOptions, setRegradeOptions] = useState<RegradeOptions>(initialRegradeOptions)

  useEffect(() => {
    const mockTests = generateMockTests()
    setTests(mockTests)
    if (mockTests.length > 0) {
      setSelectedTest(mockTests[0].id)
    }

    const mockVersions = generateMockVersions()
    setDraftSettings((prev) => ({ ...prev, versions: mockVersions }))
  }, [])

  const getSelectedTestData = useCallback(() => {
    return tests.find((test) => test.id === selectedTest)
  }, [tests, selectedTest])

  const saveAsDraft = useCallback(() => {
    setSaving(true)
    setTimeout(() => {
      const newVersion = {
        id: `v${Date.now()}`,
        version: '2.2',
        timestamp: new Date().toISOString(),
        changes: 'Manual save triggered',
        author: 'Current User',
      }
      setDraftSettings((prev) => ({
        ...prev,
        versions: [newVersion, ...prev.versions],
        lastSaved: new Date().toISOString(),
      }))
      setSaving(false)
    }, 1000)
  }, [])

  const publishTest = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      setTests((prev) =>
        prev.map((test) =>
          test.id === selectedTest
            ? { ...test, status: 'published' as const, publishedAt: new Date().toISOString() }
            : test
        )
      )
      setLoading(false)
    }, 2000)
  }, [selectedTest])

  const scheduleTest = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      setTests((prev) =>
        prev.map((test) =>
          test.id === selectedTest
            ? {
                ...test,
                status: 'scheduled' as const,
                scheduledFor: `${scheduleSettings.startDate}T${scheduleSettings.startTime}:00`,
              }
            : test
        )
      )
      setLoading(false)
    }, 1500)
  }, [selectedTest, scheduleSettings])

  const cloneTest = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      const originalTest = tests.find((t) => t.id === selectedTest)
      if (originalTest) {
        const newTest: TestLifecycle = {
          ...originalTest,
          id: `test_${Date.now()}`,
          title: cloneSettings.newTitle || `${originalTest.title} (Copy)`,
          status: 'draft',
          version: '1.0',
          createdAt: new Date().toISOString(),
          lastModified: new Date().toISOString(),
          publishedAt: undefined,
          scheduledFor: undefined,
          participants: 0,
          completionRate: 0,
          averageScore: 0,
        }
        setTests((prev) => [...prev, newTest])
      }
      setLoading(false)
    }, 2000)
  }, [selectedTest, tests, cloneSettings.newTitle])

  const enablePracticeMode = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      setTests((prev) =>
        prev.map((test) =>
          test.id === selectedTest ? { ...test, status: 'practice' as const } : test
        )
      )
      setLoading(false)
    }, 1500)
  }, [selectedTest])

  const generateAnswerKey = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  const releaseSolutions = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  const initiateRegrade = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 4000)
  }, [])

  return {
    activeTab,
    tests,
    selectedTest,
    loading,
    saving,
    draftSettings,
    publishSettings,
    scheduleSettings,
    cloneSettings,
    practiceSettings,
    answerKeySettings,
    solutionSettings,
    regradeOptions,
    setActiveTab,
    setSelectedTest,
    setDraftSettings,
    setPublishSettings,
    setScheduleSettings,
    setCloneSettings,
    setPracticeSettings,
    setAnswerKeySettings,
    setSolutionSettings,
    setRegradeOptions,
    saveAsDraft,
    publishTest,
    scheduleTest,
    cloneTest,
    enablePracticeMode,
    generateAnswerKey,
    releaseSolutions,
    initiateRegrade,
    getSelectedTestData,
  }
}
