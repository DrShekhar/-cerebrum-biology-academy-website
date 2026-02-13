'use client'

import React from 'react'
import {
  Save,
  Send,
  Calendar,
  Copy,
  Play,
  Key,
  BookOpen,
  RotateCcw,
  Download,
  Plus,
} from 'lucide-react'
import { useLifecycleState } from './useLifecycleState'
import { getStatusColor } from './utils'
import {
  DraftTab,
  PublishTab,
  ScheduleTab,
  CloneTab,
  PracticeTab,
  AnswersTab,
  SolutionsTab,
  RegradeTab,
} from './components'
import type { LifecycleTab } from './types'

const tabs: { id: LifecycleTab; label: string; icon: React.ElementType }[] = [
  { id: 'draft', label: 'Draft', icon: Save },
  { id: 'publish', label: 'Publish', icon: Send },
  { id: 'schedule', label: 'Schedule', icon: Calendar },
  { id: 'clone', label: 'Clone', icon: Copy },
  { id: 'practice', label: 'Practice', icon: Play },
  { id: 'answers', label: 'Answer Key', icon: Key },
  { id: 'solutions', label: 'Solutions', icon: BookOpen },
  { id: 'regrade', label: 'Regrade', icon: RotateCcw },
]

export function Lifecycle() {
  const {
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
  } = useLifecycleState()

  const selectedTestData = getSelectedTestData()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Test</label>
              <select
                value={selectedTest}
                onChange={(e) => setSelectedTest(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Choose a test...</option>
                {tests.map((test) => (
                  <option key={test.id} value={test.id}>
                    {test.title} (v{test.version})
                  </option>
                ))}
              </select>
            </div>
            {selectedTest && selectedTestData && (
              <div className="text-sm">
                <div className="font-medium">{selectedTestData.title}</div>
                <div className="text-gray-500">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTestData.status)}`}
                  >
                    {selectedTestData.status}
                  </span>
                  <span className="ml-2">v{selectedTestData.version}</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Test
            </button>
          </div>
        </div>
      </div>

      {/* Test Overview */}
      {selectedTest && selectedTestData && (
        <div className="bg-white rounded-xl p-6 border">
          <h3 className="text-lg font-semibold mb-4">Test Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {selectedTestData.totalQuestions}
              </div>
              <div className="text-sm text-gray-600">Questions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{selectedTestData.totalMarks}</div>
              <div className="text-sm text-gray-600">Total Marks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{selectedTestData.duration}m</div>
              <div className="text-sm text-gray-600">Duration</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {selectedTestData.participants}
              </div>
              <div className="text-sm text-gray-600">Participants</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {selectedTestData.completionRate.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Completion</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">
                {selectedTestData.averageScore.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Avg Score</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="flex bg-gray-100 rounded-xl p-1 overflow-x-auto">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === id
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
{activeTab === 'draft' && (
          <DraftTab
            draftSettings={draftSettings}
            setDraftSettings={setDraftSettings}
            saving={saving}
            saveAsDraft={saveAsDraft}
          />
        )}

        {activeTab === 'publish' && (
          <PublishTab
            publishSettings={publishSettings}
            setPublishSettings={setPublishSettings}
            loading={loading}
            publishTest={publishTest}
          />
        )}

        {activeTab === 'schedule' && (
          <ScheduleTab
            scheduleSettings={scheduleSettings}
            setScheduleSettings={setScheduleSettings}
            loading={loading}
            scheduleTest={scheduleTest}
          />
        )}

        {activeTab === 'clone' && (
          <CloneTab
            cloneSettings={cloneSettings}
            setCloneSettings={setCloneSettings}
            loading={loading}
            cloneTest={cloneTest}
          />
        )}

        {activeTab === 'practice' && (
          <PracticeTab
            practiceSettings={practiceSettings}
            setPracticeSettings={setPracticeSettings}
            loading={loading}
            enablePracticeMode={enablePracticeMode}
          />
        )}

        {activeTab === 'answers' && (
          <AnswersTab
            answerKeySettings={answerKeySettings}
            setAnswerKeySettings={setAnswerKeySettings}
            loading={loading}
            generateAnswerKey={generateAnswerKey}
          />
        )}

        {activeTab === 'solutions' && (
          <SolutionsTab
            solutionSettings={solutionSettings}
            setSolutionSettings={setSolutionSettings}
            loading={loading}
            releaseSolutions={releaseSolutions}
          />
        )}

        {activeTab === 'regrade' && (
          <RegradeTab
            regradeOptions={regradeOptions}
            setRegradeOptions={setRegradeOptions}
            loading={loading}
            initiateRegrade={initiateRegrade}
          />
        )}
</div>
  )
}

export default Lifecycle
