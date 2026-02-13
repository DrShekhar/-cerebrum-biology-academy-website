'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Upload,
  Save,
  CheckCircle,
  AlertCircle,
  FileSpreadsheet,
  Loader2,
} from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface AnswerKey {
  id: string
  questionNo: number
  section: string | null
  correctAnswer: string
  explanation: string | null
  topic: string | null
  keyStatus: 'UNVERIFIED' | 'VERIFIED' | 'DISPUTED'
}

interface Paper {
  id: string
  paperCode: string
  title: string
  totalQuestions: number
  hasVerifiedKey: boolean
}

const ANSWER_OPTIONS = ['A', 'B', 'C', 'D', 'BONUS']

export default function AnswerKeysPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: paperId } = use(params)
  const router = useRouter()
  const [paper, setPaper] = useState<Paper | null>(null)
  const [answerKeys, setAnswerKeys] = useState<AnswerKey[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [csvMode, setCsvMode] = useState(false)
  const [csvData, setCsvData] = useState('')

  useEffect(() => {
    fetchData()
  }, [paperId])

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/admin/omr/answer-keys/${paperId}`)
      const data = await res.json()

      if (data.success) {
        setPaper(data.paper)
        setAnswerKeys(data.answerKeys)

        const existingAnswers: Record<number, string> = {}
        data.answerKeys.forEach((key: AnswerKey) => {
          existingAnswers[key.questionNo] = key.correctAnswer
        })
        setAnswers(existingAnswers)
      }
    } catch (error) {
      console.error('Failed to fetch data:', error)
      setError('Failed to load answer keys')
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerChange = (questionNo: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionNo]: answer,
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const keys = Object.entries(answers)
        .filter(([, answer]) => answer)
        .map(([qNo, answer]) => ({
          questionNo: parseInt(qNo),
          correctAnswer: answer,
        }))

      const res = await fetch(`/api/admin/omr/answer-keys/${paperId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keys, replaceExisting: false }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save answer keys')
      }

      setSuccess(`${keys.length} answer keys saved successfully`)
      fetchData()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const handleCSVUpload = async () => {
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const lines = csvData.trim().split('\n')
      const keys = lines
        .filter((line) => line.trim())
        .map((line) => {
          const parts = line.split(',').map((p) => p.trim())
          return {
            questionNo: parseInt(parts[0]),
            correctAnswer: parts[1]?.toUpperCase() || '',
            explanation: parts[2] || undefined,
            topic: parts[3] || undefined,
          }
        })
        .filter((k) => !isNaN(k.questionNo) && k.correctAnswer)

      if (keys.length === 0) {
        throw new Error('No valid answer keys found in CSV')
      }

      const res = await fetch(`/api/admin/omr/answer-keys/${paperId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keys, replaceExisting: true }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload CSV')
      }

      setSuccess(`${keys.length} answer keys uploaded from CSV`)
      setCsvMode(false)
      setCsvData('')
      fetchData()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to upload CSV')
    } finally {
      setSaving(false)
    }
  }

  const handleVerifyAll = async () => {
    setVerifying(true)
    setError('')
    setSuccess('')

    try {
      const res = await fetch(`/api/admin/omr/answer-keys/${paperId}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verifyAll: true, verifiedBy: 'Admin' }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to verify keys')
      }

      setSuccess(
        `All answer keys verified. Verified key is now ${data.hasVerifiedKey ? 'available' : 'not yet available'}`
      )
      fetchData()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to verify')
    } finally {
      setVerifying(false)
    }
  }

  const verifiedCount = answerKeys.filter((k) => k.keyStatus === 'VERIFIED').length
  const totalKeys = answerKeys.length

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-2 text-gray-500">Loading answer keys...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/admin/omr">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft className="w-5 h-5" />
              </button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Answer Keys</h1>
              <p className="text-gray-600">
                {paper?.paperCode} - {paper?.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setCsvMode(!csvMode)}
              className="flex items-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4" />
              {csvMode ? 'Manual Entry' : 'CSV Upload'}
            </Button>
            {totalKeys === paper?.totalQuestions && (
              <Button
                variant="outline"
                onClick={handleVerifyAll}
                disabled={verifying}
                className="flex items-center gap-2"
              >
                {verifying ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircle className="w-4 h-4" />
                )}
                Verify All
              </Button>
            )}
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            {success}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-500">Total Questions</p>
            <p className="text-xl font-bold">{paper?.totalQuestions}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-500">Keys Uploaded</p>
            <p className="text-xl font-bold">
              {totalKeys}/{paper?.totalQuestions}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-500">Verified</p>
            <p className="text-xl font-bold text-green-600">{verifiedCount}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-500">Verified Key Status</p>
            <p
              className={`text-lg font-bold ${paper?.hasVerifiedKey ? 'text-green-600' : 'text-yellow-600'}`}
            >
              {paper?.hasVerifiedKey ? 'Available' : 'Not Available'}
            </p>
          </div>
        </div>

        {csvMode ? (
          <div
            className="bg-white rounded-lg shadow-sm border p-6 animate-fadeInUp"
          >
            <h3 className="text-lg font-semibold mb-4">Upload Answer Keys via CSV</h3>
            <p className="text-sm text-gray-600 mb-4">
              Format: QuestionNo,Answer,Explanation (optional),Topic (optional)
              <br />
              Example: 1,A,Correct answer is A because...,Cell Biology
            </p>
            <textarea
              value={csvData}
              onChange={(e) => setCsvData(e.target.value)}
              rows={10}
              placeholder="1,A&#10;2,B&#10;3,C&#10;4,D&#10;..."
              className="w-full px-4 py-3 border rounded-lg font-mono text-sm focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
            <div className="flex justify-end gap-3 mt-4">
              <Button variant="outline" onClick={() => setCsvMode(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleCSVUpload}
                disabled={saving || !csvData.trim()}
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload CSV
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div
            className="bg-white rounded-lg shadow-sm border p-6 animate-fadeInUp"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Manual Answer Entry</h3>
              <Button variant="primary" onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save All
                  </>
                )}
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-3">
              {Array.from({ length: paper?.totalQuestions || 0 }, (_, i) => i + 1).map((qNo) => {
                const existingKey = answerKeys.find((k) => k.questionNo === qNo)
                const isVerified = existingKey?.keyStatus === 'VERIFIED'

                return (
                  <div
                    key={qNo}
                    className={`p-2 border rounded-lg ${isVerified ? 'border-green-300 bg-green-50' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-500">Q{qNo}</span>
                      {isVerified && <CheckCircle className="w-3 h-3 text-green-600" />}
                    </div>
                    <select
                      value={answers[qNo] || ''}
                      onChange={(e) => handleAnswerChange(qNo, e.target.value)}
                      className="w-full px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-green-600"
                    >
                      <option value="">-</option>
                      {ANSWER_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
