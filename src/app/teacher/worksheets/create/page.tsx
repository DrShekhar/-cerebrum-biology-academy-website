'use client'

// Teacher worksheet authoring. Until 2026-07 the worksheets table had NO
// writer anywhere — students had a full taking/grading UI over a table nothing
// could populate. Content shape matches what the student taking page renders:
// content.questions is a list of free-text questions answered in one text box.

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ArrowLeft, Plus, X, Loader2 } from 'lucide-react'
import { showToast } from '@/lib/toast'

interface Course {
  id: string
  name: string
}

export default function CreateWorksheetPage() {
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const [saving, setSaving] = useState<'draft' | 'publish' | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    courseId: '',
    instructions: '',
    maxMarks: '',
    duration: '',
    difficulty: 'MEDIUM',
    dueDate: '',
    allowLateSubmission: false,
  })
  const [questions, setQuestions] = useState<string[]>([''])

  useEffect(() => {
    fetch('/api/teacher/courses', { credentials: 'include' })
      .then((r) => r.json())
      .then((data) => {
        const list = data.courses || data.data || []
        setCourses(Array.isArray(list) ? list : [])
      })
      .catch(() => {
        // course dropdown stays empty — worksheet can still be global
      })
  }, [])

  const updateQuestion = (index: number, value: string) => {
    setQuestions((prev) => prev.map((q, i) => (i === index ? value : q)))
  }

  const handleSave = async (publish: boolean) => {
    if (!formData.title.trim()) {
      showToast.error('Title is required')
      return
    }
    const cleanQuestions = questions.map((q) => q.trim()).filter(Boolean)
    if (publish && cleanQuestions.length === 0 && !formData.instructions.trim()) {
      showToast.error('Add at least one question or instructions before publishing')
      return
    }

    try {
      setSaving(publish ? 'publish' : 'draft')
      const res = await fetch('/api/teacher/worksheets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: formData.title.trim(),
          description: formData.description.trim() || undefined,
          courseId: formData.courseId || null,
          instructions: formData.instructions.trim() || undefined,
          maxMarks: formData.maxMarks ? Number(formData.maxMarks) : undefined,
          duration: formData.duration ? Number(formData.duration) : undefined,
          difficulty: formData.difficulty || undefined,
          dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
          allowLateSubmission: formData.allowLateSubmission,
          content: cleanQuestions.length > 0 ? { questions: cleanQuestions } : undefined,
          publish,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save worksheet')
      }
      showToast.success(data.message || 'Worksheet saved')
      router.push('/teacher/worksheets')
    } catch (error) {
      showToast.error(error instanceof Error ? error.message : 'Failed to save worksheet')
    } finally {
      setSaving(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/teacher/worksheets">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create Worksheet</h1>
            <p className="text-sm text-gray-600">
              Published worksheets appear for enrolled students (or all students if no course is
              selected)
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Cell Structure — Practice Worksheet 1"
                maxLength={200}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={2}
                placeholder="What this worksheet covers"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                <select
                  value={formData.courseId}
                  onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                >
                  <option value="">All students (global)</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                >
                  <option value="EASY">Easy</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HARD">Hard</option>
                  <option value="EXPERT">Expert</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max marks</label>
                <Input
                  type="number"
                  min={1}
                  value={formData.maxMarks}
                  onChange={(e) => setFormData({ ...formData, maxMarks: e.target.value })}
                  placeholder="e.g. 20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (minutes)
                </label>
                <Input
                  type="number"
                  min={1}
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g. 30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due date</label>
                <Input
                  type="datetime-local"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
              </div>
              <div className="flex items-end pb-2">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.allowLateSubmission}
                    onChange={(e) =>
                      setFormData({ ...formData, allowLateSubmission: e.target.checked })
                    }
                    className="rounded text-blue-600 w-4 h-4"
                  />
                  Allow late submission
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
              <textarea
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="How students should complete and submit this worksheet"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {questions.map((q, i) => (
              <div key={i} className="flex gap-2 items-start">
                <span className="text-sm text-gray-400 pt-2 w-6 flex-shrink-0">{i + 1}.</span>
                <textarea
                  value={q}
                  onChange={(e) => updateQuestion(i, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={2}
                  placeholder={`Question ${i + 1}`}
                />
                <button
                  onClick={() => setQuestions((prev) => prev.filter((_, idx) => idx !== i))}
                  className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                  disabled={questions.length === 1}
                  aria-label={`Remove question ${i + 1}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => setQuestions((p) => [...p, ''])}>
              <Plus className="w-4 h-4 mr-1" /> Add question
            </Button>
          </CardContent>
        </Card>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={() => handleSave(false)} disabled={saving !== null}>
            {saving === 'draft' && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Save as Draft
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => handleSave(true)}
            disabled={saving !== null}
          >
            {saving === 'publish' && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Publish
          </Button>
        </div>
      </div>
    </div>
  )
}
