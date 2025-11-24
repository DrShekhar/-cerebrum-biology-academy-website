'use client'

import React, { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Label } from '@/components/ui/Label'
import { Select } from '@/components/ui/Select'
import { AlertCircle, Loader2, Upload, X } from 'lucide-react'

interface CreateDoubtModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: (doubt: any) => void
  categories?: Array<{
    id: string
    name: string
    icon?: string
    color?: string
  }>
  courses?: Array<{
    id: string
    name: string
  }>
}

export function CreateDoubtModal({
  open,
  onOpenChange,
  onSuccess,
  categories = [],
  courses = [],
}: CreateDoubtModalProps) {
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    priority: 'MEDIUM' as 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT',
    categoryId: '',
    courseId: '',
    tags: [] as string[],
  })
  const [tagInput, setTagInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.subject.trim()) {
      setError('Please enter a subject')
      return
    }

    if (!formData.description.trim()) {
      setError('Please enter a description')
      return
    }

    if (formData.description.length < 20) {
      setError('Description must be at least 20 characters')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/student/doubts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: formData.subject,
          description: formData.description,
          priority: formData.priority,
          categoryId: formData.categoryId || undefined,
          courseId: formData.courseId || undefined,
          tags: formData.tags,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create doubt')
      }

      setFormData({
        subject: '',
        description: '',
        priority: 'MEDIUM',
        categoryId: '',
        courseId: '',
        tags: [],
      })
      setTagInput('')
      onSuccess?.(data.doubt)
      onOpenChange(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create doubt')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddTag = () => {
    const tag = tagInput.trim()
    if (tag && !formData.tags.includes(tag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag],
      })
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Ask a Question"
      description="Get help from our instructors. Describe your doubt in detail for a better response."
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <div>
          <Label htmlFor="subject">Subject *</Label>
          <Input
            id="subject"
            placeholder="Brief summary of your doubt"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            maxLength={200}
            required
          />
          <p className="text-xs text-gray-500 mt-1">{formData.subject.length}/200 characters</p>
        </div>

        <div>
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            placeholder="Explain your doubt in detail. The more information you provide, the better the response."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={6}
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.description.length} characters (minimum 20)
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select
              id="priority"
              value={formData.priority}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  priority: e.target.value as 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT',
                })
              }
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </Select>
          </div>

          {categories.length > 0 && (
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                id="category"
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </div>
          )}

          {courses.length > 0 && (
            <div>
              <Label htmlFor="course">Related Course</Label>
              <Select
                id="course"
                value={formData.courseId}
                onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </Select>
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="tags">Tags (optional)</Label>
          <div className="flex gap-2">
            <Input
              id="tags"
              placeholder="Add tags to categorize your doubt"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAddTag()
                }
              }}
            />
            <Button type="button" onClick={handleAddTag} variant="outline" size="sm">
              Add
            </Button>
          </div>
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:bg-blue-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Submit Question'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
