'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const SUBJECT_TYPES = [
  { value: 'BIOLOGY_XI', label: 'BIOLOGY XI', questions: 45 },
  { value: 'BIOLOGY_XII', label: 'BIOLOGY XII', questions: 45 },
  { value: 'BIOLOGY_XI_XII', label: 'BIOLOGY XI+XII', questions: 90 },
  { value: 'NEET_MOCK', label: 'Full Length NEET MOCK (PCB)', questions: 180 },
]

const TARGET_CLASSES = ['11th', '12th', 'Dropper']

export default function CreatePaperPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    paperCode: '',
    title: '',
    description: '',
    subjectType: 'BIOLOGY_XI',
    targetClass: '11th',
    examDate: '',
    submissionStart: '',
    submissionEnd: '',
    status: 'DRAFT',
  })

  const selectedSubject = SUBJECT_TYPES.find((s) => s.value === formData.subjectType)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/omr/papers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          examDate: new Date(formData.examDate).toISOString(),
          submissionStart: new Date(formData.submissionStart).toISOString(),
          submissionEnd: new Date(formData.submissionEnd).toISOString(),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create paper')
      }

      router.push(`/admin/omr/papers/${data.paper.id}/answer-keys`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create paper')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="p-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/admin/omr">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create New Paper</h1>
            <p className="text-gray-600">Set up a new OMR evaluation paper</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm border p-6 space-y-6 animate-fadeInUp"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Paper Code *</label>
              <input
                type="text"
                name="paperCode"
                value={formData.paperCode}
                onChange={handleChange}
                required
                placeholder="e.g., BIO-XI-W1"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Unique identifier for this paper</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject Type *</label>
              <select
                name="subjectType"
                value={formData.subjectType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              >
                {SUBJECT_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label} ({type.questions} questions)
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Paper Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g., Biology XI Weekly Test 1"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Optional description for this paper..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Class *</label>
              <select
                name="targetClass"
                value={formData.targetClass}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              >
                {TARGET_CLASSES.map((cls) => (
                  <option key={cls} value={cls}>
                    Class {cls}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              >
                <option value="DRAFT">Draft</option>
                <option value="ACTIVE">Active</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Exam Date *</label>
              <input
                type="datetime-local"
                name="examDate"
                value={formData.examDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Submission Start *
              </label>
              <input
                type="datetime-local"
                name="submissionStart"
                value={formData.submissionStart}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Submission End *
              </label>
              <input
                type="datetime-local"
                name="submissionEnd"
                value={formData.submissionEnd}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Paper Configuration</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Total Questions</p>
                <p className="font-semibold">{selectedSubject?.questions || 0}</p>
              </div>
              <div>
                <p className="text-gray-500">Total Marks</p>
                <p className="font-semibold">{(selectedSubject?.questions || 0) * 4}</p>
              </div>
              <div>
                <p className="text-gray-500">Marks per Correct</p>
                <p className="font-semibold text-green-600">+4</p>
              </div>
              <div>
                <p className="text-gray-500">Marks per Wrong</p>
                <p className="font-semibold text-red-600">-1</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t">
            <Link href="/admin/omr">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Create Paper
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
