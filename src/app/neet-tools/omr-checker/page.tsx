'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Lock,
  FileText,
  ArrowRight,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Clock,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

const OMR_PASSWORD = '156265'

const SUBJECT_TYPES = [
  { value: 'BIOLOGY_XI', label: 'BIOLOGY XI', questions: 45 },
  { value: 'BIOLOGY_XII', label: 'BIOLOGY XII', questions: 45 },
  { value: 'BIOLOGY_XI_XII', label: 'BIOLOGY XI+XII', questions: 90 },
  { value: 'NEET_MOCK', label: 'Full Length NEET MOCK (PCB)', questions: 180 },
]

const ANSWER_OPTIONS = ['A', 'B', 'C', 'D']

interface Paper {
  id: string
  paperCode: string
  title: string
  subjectType: string
  totalQuestions: number
  totalMarks: number
  sections: { name: string; start: number; end: number }[]
  isSubmissionOpen: boolean
  hasVerifiedKey: boolean
  verifiedKeyStatus: string
  submissionStart: string
  submissionEnd: string
}

interface SectionResult {
  total: number
  attempted: number
  correct: number
  wrong: number
  unattempted: number
  marks: number
  maxMarks: number
  percentage: number
}

interface QuestionResult {
  questionNo: number
  section: string
  studentAnswer: string | null
  correctAnswer: string
  isCorrect: boolean
  marks: number
  explanation?: string
  topic?: string
}

interface Result {
  totalQuestions: number
  totalAttempted: number
  totalCorrect: number
  totalWrong: number
  totalUnattempted: number
  marksObtained: number
  maxMarks: number
  percentage: number
  sectionResults: Record<string, SectionResult>
  questionResults: QuestionResult[]
}

type Step = 'password' | 'subject' | 'paper' | 'answers' | 'result'

export default function OMRCheckerPage() {
  const [step, setStep] = useState<Step>('password')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const [selectedSubject, setSelectedSubject] = useState('')
  const [papers, setPapers] = useState<Paper[]>([])
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null)
  const [loadingPapers, setLoadingPapers] = useState(false)

  const [answers, setAnswers] = useState<Record<number, string | null>>({})
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    phone: '',
    email: '',
    class: '12th',
    rollNo: '',
  })
  const [useVerifiedKey, setUseVerifiedKey] = useState(false)

  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const [keyType, setKeyType] = useState<'verified' | 'unverified'>('unverified')
  const [error, setError] = useState('')

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === OMR_PASSWORD) {
      setStep('subject')
      setPasswordError('')
    } else {
      setPasswordError('Incorrect password. Please try again.')
    }
  }

  const handleSubjectSelect = async (subjectType: string) => {
    setSelectedSubject(subjectType)
    setLoadingPapers(true)

    try {
      const res = await fetch(`/api/omr/papers?subjectType=${subjectType}`)
      const data = await res.json()
      if (data.success) {
        setPapers(data.papers)
      }
    } catch (error) {
      console.error('Failed to fetch papers:', error)
    } finally {
      setLoadingPapers(false)
    }

    setStep('paper')
  }

  const handlePaperSelect = (paper: Paper) => {
    setSelectedPaper(paper)
    setAnswers({})
    setStep('answers')
  }

  const handleAnswerSelect = (questionNo: number, answer: string | null) => {
    setAnswers((prev) => ({
      ...prev,
      [questionNo]: prev[questionNo] === answer ? null : answer,
    }))
  }

  const handleSubmit = async () => {
    if (!selectedPaper) return

    if (!studentInfo.name || !studentInfo.phone) {
      setError('Please enter your name and phone number')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/omr/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paperId: selectedPaper.id,
          studentName: studentInfo.name,
          studentPhone: studentInfo.phone,
          studentEmail: studentInfo.email || undefined,
          studentClass: studentInfo.class,
          studentRollNo: studentInfo.rollNo || undefined,
          submittedAnswers: answers,
          useVerifiedKey,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit')
      }

      setResult(data.result)
      setKeyType(data.keyType)
      setStep('result')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to submit')
    } finally {
      setSubmitting(false)
    }
  }

  const answeredCount = Object.values(answers).filter((a) => a !== null).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">OMR Evaluation Tool</h1>
          <p className="text-gray-600">Check your test answers and get instant results</p>
        </div>

        <AnimatePresence mode="wait">
          {step === 'password' && (
            <motion.div
              key="password"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-md mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-xl font-semibold">Enter Access Code</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Enter the password provided by your teacher
                  </p>
                </div>

                <form onSubmit={handlePasswordSubmit}>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full px-4 py-3 text-center text-2xl tracking-widest border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent mb-4"
                  />
                  {passwordError && (
                    <p className="text-red-500 text-sm text-center mb-4">{passwordError}</p>
                  )}
                  <Button type="submit" variant="primary" className="w-full py-3">
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </div>
            </motion.div>
          )}

          {step === 'subject' && (
            <motion.div
              key="subject"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-semibold text-center mb-6">Select Subject Type</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SUBJECT_TYPES.map((subject) => (
                    <button
                      key={subject.value}
                      onClick={() => handleSubjectSelect(subject.value)}
                      className="p-6 border-2 rounded-xl hover:border-green-600 hover:bg-green-50 transition-all text-left"
                    >
                      <FileText className="w-8 h-8 text-green-600 mb-3" />
                      <h3 className="font-semibold text-lg">{subject.label}</h3>
                      <p className="text-gray-500 text-sm">{subject.questions} Questions</p>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 'paper' && (
            <motion.div
              key="paper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <button
                  onClick={() => setStep('subject')}
                  className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back
                </button>

                <h2 className="text-xl font-semibold mb-6">Select Paper</h2>

                {loadingPapers ? (
                  <div className="text-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-green-600" />
                    <p className="text-gray-500 mt-2">Loading papers...</p>
                  </div>
                ) : papers.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No active papers found for this subject</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {papers.map((paper) => (
                      <button
                        key={paper.id}
                        onClick={() => paper.isSubmissionOpen && handlePaperSelect(paper)}
                        disabled={!paper.isSubmissionOpen}
                        className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                          paper.isSubmissionOpen
                            ? 'hover:border-green-600 hover:bg-green-50'
                            : 'opacity-50 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{paper.paperCode}</h3>
                            <p className="text-sm text-gray-600">{paper.title}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {paper.totalQuestions} Questions | {paper.totalMarks} Marks
                            </p>
                          </div>
                          <div className="text-right">
                            {paper.isSubmissionOpen ? (
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                Open
                              </span>
                            ) : (
                              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                Closed
                              </span>
                            )}
                            <p className="text-xs text-gray-400 mt-1">
                              {paper.hasVerifiedKey ? (
                                <span className="text-green-600">Verified Key Available</span>
                              ) : (
                                <span className="text-yellow-600">Unverified Key Only</span>
                              )}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {step === 'answers' && selectedPaper && (
            <motion.div
              key="answers"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div>
                    <button
                      onClick={() => setStep('paper')}
                      className="flex items-center text-gray-600 hover:text-gray-900 mb-2"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Back
                    </button>
                    <h2 className="text-xl font-semibold">{selectedPaper.paperCode}</h2>
                    <p className="text-gray-500 text-sm">{selectedPaper.title}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      Answered: <span className="font-semibold">{answeredCount}</span>/
                      {selectedPaper.totalQuestions}
                    </p>
                    <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
                      <div
                        className="h-full bg-green-600 rounded-full transition-all"
                        style={{
                          width: `${(answeredCount / selectedPaper.totalQuestions) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    value={studentInfo.name}
                    onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    value={studentInfo.phone}
                    onChange={(e) => setStudentInfo({ ...studentInfo, phone: e.target.value })}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600"
                    required
                  />
                  <select
                    value={studentInfo.class}
                    onChange={(e) => setStudentInfo({ ...studentInfo, class: e.target.value })}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600"
                  >
                    <option value="11th">Class 11th</option>
                    <option value="12th">Class 12th</option>
                    <option value="Dropper">Dropper</option>
                  </select>
                </div>

                {selectedPaper.sections?.map((section) => (
                  <div key={section.name} className="mb-6">
                    <h3 className="font-semibold text-gray-700 mb-3 pb-2 border-b">
                      {section.name} (Q{section.start} - Q{section.end})
                    </h3>
                    <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-15 gap-2">
                      {Array.from(
                        { length: section.end - section.start + 1 },
                        (_, i) => section.start + i
                      ).map((qNo) => (
                        <div key={qNo} className="text-center">
                          <span className="text-xs text-gray-500 block mb-1">{qNo}</span>
                          <div className="flex flex-wrap justify-center gap-1">
                            {ANSWER_OPTIONS.map((opt) => (
                              <button
                                key={opt}
                                onClick={() => handleAnswerSelect(qNo, opt)}
                                className={`w-7 h-7 text-xs font-medium rounded-full border-2 transition-all ${
                                  answers[qNo] === opt
                                    ? 'bg-green-600 border-green-600 text-white'
                                    : 'border-gray-300 hover:border-green-400'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 mb-4">
                    {error}
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t">
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="keyType"
                        checked={!useVerifiedKey}
                        onChange={() => setUseVerifiedKey(false)}
                        className="w-4 h-4 text-green-600"
                      />
                      <span className="text-sm">Unverified Key</span>
                      <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                        Always Available
                      </span>
                    </label>
                    <label
                      className={`flex items-center gap-2 ${selectedPaper.hasVerifiedKey ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                    >
                      <input
                        type="radio"
                        name="keyType"
                        checked={useVerifiedKey}
                        onChange={() => selectedPaper.hasVerifiedKey && setUseVerifiedKey(true)}
                        disabled={!selectedPaper.hasVerifiedKey}
                        className="w-4 h-4 text-green-600"
                      />
                      <span className="text-sm">Verified Key</span>
                      {selectedPaper.hasVerifiedKey ? (
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                          Available
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          Not Uploaded Yet
                        </span>
                      )}
                    </label>
                  </div>

                  <Button
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="px-8"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit & Get Results
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'result' && result && selectedPaper && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="text-center mb-8">
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      result.percentage >= 80
                        ? 'bg-green-100'
                        : result.percentage >= 60
                          ? 'bg-yellow-100'
                          : 'bg-red-100'
                    }`}
                  >
                    <span
                      className={`text-2xl font-bold ${
                        result.percentage >= 80
                          ? 'text-green-600'
                          : result.percentage >= 60
                            ? 'text-yellow-600'
                            : 'text-red-600'
                      }`}
                    >
                      {result.percentage}%
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Your Result</h2>
                  <p className="text-gray-500">
                    {selectedPaper.paperCode} | {keyType === 'verified' ? 'Verified' : 'Unverified'}{' '}
                    Key
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-3xl font-bold text-blue-600">
                      {result.marksObtained}/{result.maxMarks}
                    </p>
                    <p className="text-sm text-gray-600">Total Marks</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-3xl font-bold text-green-600">{result.totalCorrect}</p>
                    <p className="text-sm text-gray-600">Correct</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <p className="text-3xl font-bold text-red-600">{result.totalWrong}</p>
                    <p className="text-sm text-gray-600">Wrong</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-3xl font-bold text-gray-600">{result.totalUnattempted}</p>
                    <p className="text-sm text-gray-600">Unattempted</p>
                  </div>
                </div>

                <h3 className="font-semibold text-lg mb-4">Section-wise Analysis</h3>
                <div className="overflow-x-auto mb-8">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm">Section</th>
                        <th className="px-4 py-2 text-center text-sm">Correct</th>
                        <th className="px-4 py-2 text-center text-sm">Wrong</th>
                        <th className="px-4 py-2 text-center text-sm">Skipped</th>
                        <th className="px-4 py-2 text-center text-sm">Marks</th>
                        <th className="px-4 py-2 text-center text-sm">%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(result.sectionResults).map(([section, data]) => (
                        <tr key={section} className="border-b">
                          <td className="px-4 py-3 font-medium">{section}</td>
                          <td className="px-4 py-3 text-center text-green-600">{data.correct}</td>
                          <td className="px-4 py-3 text-center text-red-600">{data.wrong}</td>
                          <td className="px-4 py-3 text-center text-gray-400">
                            {data.unattempted}
                          </td>
                          <td className="px-4 py-3 text-center font-semibold">
                            {data.marks}/{data.maxMarks}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span
                              className={`font-semibold ${
                                data.percentage >= 80
                                  ? 'text-green-600'
                                  : data.percentage >= 60
                                    ? 'text-yellow-600'
                                    : 'text-red-600'
                              }`}
                            >
                              {data.percentage.toFixed(1)}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h3 className="font-semibold text-lg mb-4">
                  Incorrect Questions (
                  {result.questionResults.filter((q) => !q.isCorrect && q.studentAnswer).length})
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {result.questionResults
                    .filter((q) => !q.isCorrect && q.studentAnswer)
                    .map((q) => (
                      <div
                        key={q.questionNo}
                        className="p-4 bg-red-50 border border-red-100 rounded-lg"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="font-semibold">Q{q.questionNo}</span>
                            <span className="text-gray-500 text-sm ml-2">({q.section})</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm">
                              Your Answer:{' '}
                              <span className="font-semibold text-red-600">{q.studentAnswer}</span>
                            </span>
                            <span className="text-sm">
                              Correct:{' '}
                              <span className="font-semibold text-green-600">
                                {q.correctAnswer}
                              </span>
                            </span>
                          </div>
                        </div>
                        {q.explanation && (
                          <p className="text-sm text-gray-600 mt-2">{q.explanation}</p>
                        )}
                        {q.topic && <p className="text-xs text-gray-400 mt-1">Topic: {q.topic}</p>}
                      </div>
                    ))}
                </div>

                <div className="flex justify-center gap-4 mt-8 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setStep('subject')
                      setResult(null)
                      setAnswers({})
                      setSelectedPaper(null)
                    }}
                  >
                    Check Another Paper
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
