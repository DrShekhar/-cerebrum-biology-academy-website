'use client'

// Force dynamic rendering to prevent auth issues during static build
export const dynamic = 'force-dynamic'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  RefreshCw,
  Check,
  X,
  Wifi,
  Building2,
} from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'

interface Batch {
  id: string
  classType: 'CLASS_11' | 'CLASS_12' | 'DROPPERS'
  batchNumber: number
  days: string[]
  startTime: string
  endTime: string
  offlineLocation: 'GURUGRAM' | 'SOUTH_EXT' | 'ROHINI'
  hasOnline: boolean
  status: 'AVAILABLE' | 'FULL'
  displayOrder: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const classTypeLabels: Record<string, string> = {
  CLASS_11: 'Class 11th',
  CLASS_12: 'Class 12th',
  DROPPERS: 'Droppers',
}

const locationLabels: Record<string, string> = {
  GURUGRAM: 'Gurugram',
  SOUTH_EXT: 'South Extension',
  ROHINI: 'Rohini',
}

const dayOptions = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function TimetableAdminPage() {
  const [batches, setBatches] = useState<Batch[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [classFilter, setClassFilter] = useState<string>('all')
  const [locationFilter, setLocationFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null)
  const [saving, setSaving] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    classType: 'CLASS_11' as 'CLASS_11' | 'CLASS_12' | 'DROPPERS',
    batchNumber: 1,
    days: ['Mon', 'Wed'] as string[],
    startTime: '16:00',
    endTime: '17:30',
    offlineLocation: 'GURUGRAM' as 'GURUGRAM' | 'SOUTH_EXT' | 'ROHINI',
    hasOnline: true,
    status: 'AVAILABLE' as 'AVAILABLE' | 'FULL',
  })

  const fetchBatches = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/timetable/batches?includeInactive=true')
      const result = await response.json()
      if (result.success) {
        setBatches(result.data)
      }
    } catch (error) {
      console.error('Error fetching batches:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBatches()
  }, [fetchBatches])

  const filteredBatches = batches.filter((batch) => {
    if (classFilter !== 'all' && batch.classType !== classFilter) return false
    if (locationFilter !== 'all' && batch.offlineLocation !== locationFilter) return false
    if (statusFilter !== 'all' && batch.status !== statusFilter) return false
    if (searchTerm) {
      const search = searchTerm.toLowerCase()
      return (
        batch.days.some((d) => d.toLowerCase().includes(search)) ||
        classTypeLabels[batch.classType].toLowerCase().includes(search) ||
        locationLabels[batch.offlineLocation].toLowerCase().includes(search)
      )
    }
    return true
  })

  const handleCreateBatch = async () => {
    try {
      setSaving(true)
      const response = await fetch('/api/timetable/batches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const result = await response.json()
      if (result.success) {
        setIsCreateModalOpen(false)
        resetForm()
        fetchBatches()
      } else {
        alert(result.error || 'Failed to create batch')
      }
    } catch (error) {
      console.error('Error creating batch:', error)
      alert('Failed to create batch')
    } finally {
      setSaving(false)
    }
  }

  const handleUpdateBatch = async () => {
    if (!selectedBatch) return
    try {
      setSaving(true)
      const response = await fetch(`/api/timetable/batches/${selectedBatch.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const result = await response.json()
      if (result.success) {
        setIsEditModalOpen(false)
        setSelectedBatch(null)
        resetForm()
        fetchBatches()
      } else {
        alert(result.error || 'Failed to update batch')
      }
    } catch (error) {
      console.error('Error updating batch:', error)
      alert('Failed to update batch')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteBatch = async () => {
    if (!selectedBatch) return
    try {
      setSaving(true)
      const response = await fetch(`/api/timetable/batches/${selectedBatch.id}`, {
        method: 'DELETE',
      })
      const result = await response.json()
      if (result.success) {
        setIsDeleteModalOpen(false)
        setSelectedBatch(null)
        fetchBatches()
      } else {
        alert(result.error || 'Failed to delete batch')
      }
    } catch (error) {
      console.error('Error deleting batch:', error)
      alert('Failed to delete batch')
    } finally {
      setSaving(false)
    }
  }

  const handleToggleStatus = async (batch: Batch) => {
    try {
      const newStatus = batch.status === 'AVAILABLE' ? 'FULL' : 'AVAILABLE'
      const response = await fetch(`/api/timetable/batches/${batch.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      const result = await response.json()
      if (result.success) {
        fetchBatches()
      }
    } catch (error) {
      console.error('Error toggling status:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      classType: 'CLASS_11',
      batchNumber: 1,
      days: ['Mon', 'Wed'],
      startTime: '16:00',
      endTime: '17:30',
      offlineLocation: 'GURUGRAM',
      hasOnline: true,
      status: 'AVAILABLE',
    })
  }

  const openEditModal = (batch: Batch) => {
    setSelectedBatch(batch)
    setFormData({
      classType: batch.classType,
      batchNumber: batch.batchNumber,
      days: batch.days,
      startTime: batch.startTime,
      endTime: batch.endTime,
      offlineLocation: batch.offlineLocation,
      hasOnline: batch.hasOnline,
      status: batch.status,
    })
    setIsEditModalOpen(true)
  }

  const toggleDay = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      days: prev.days.includes(day) ? prev.days.filter((d) => d !== day) : [...prev.days, day],
    }))
  }

  const getClassTypeColor = (type: string) => {
    switch (type) {
      case 'CLASS_11':
        return 'bg-blue-100 text-blue-800'
      case 'CLASS_12':
        return 'bg-purple-100 text-purple-800'
      case 'DROPPERS':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':')
    const h = parseInt(hours)
    const suffix = h >= 12 ? 'PM' : 'AM'
    const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h
    return `${displayHour}:${minutes} ${suffix}`
  }

  const stats = {
    total: batches.length,
    available: batches.filter((b) => b.status === 'AVAILABLE').length,
    full: batches.filter((b) => b.status === 'FULL').length,
    class11: batches.filter((b) => b.classType === 'CLASS_11').length,
    class12: batches.filter((b) => b.classType === 'CLASS_12').length,
    droppers: batches.filter((b) => b.classType === 'DROPPERS').length,
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Batch Timetable Management</h1>
            <p className="text-gray-600 mt-2">
              Manage batch schedules, timings, and availability status
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={fetchBatches} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                resetForm()
                setIsCreateModalOpen(true)
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Batch
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Batches</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="text-2xl font-bold text-green-600">{stats.available}</div>
            <div className="text-sm text-gray-600">Available</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="text-2xl font-bold text-red-600">{stats.full}</div>
            <div className="text-sm text-gray-600">Full</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="text-2xl font-bold text-blue-600">{stats.class11}</div>
            <div className="text-sm text-gray-600">Class 11th</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="text-2xl font-bold text-purple-600">{stats.class12}</div>
            <div className="text-sm text-gray-600">Class 12th</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="text-2xl font-bold text-orange-600">{stats.droppers}</div>
            <div className="text-sm text-gray-600">Droppers</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search batches..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4 flex-wrap">
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Classes</option>
                <option value="CLASS_11">Class 11th</option>
                <option value="CLASS_12">Class 12th</option>
                <option value="DROPPERS">Droppers</option>
              </select>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Locations</option>
                <option value="GURUGRAM">Gurugram</option>
                <option value="SOUTH_EXT">South Extension</option>
                <option value="ROHINI">Rohini</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="AVAILABLE">Available</option>
                <option value="FULL">Full</option>
              </select>
            </div>
          </div>
        </div>

        {/* Batches Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredBatches.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No batches found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {batches.length === 0
                ? 'Get started by creating a new batch.'
                : 'Try adjusting your filters.'}
            </p>
            {batches.length === 0 && (
              <Button
                className="mt-4"
                onClick={() => {
                  resetForm()
                  setIsCreateModalOpen(true)
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add First Batch
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBatches.map((batch, index) => (
              <motion.div
                key={batch.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white p-5 rounded-xl border-2 transition-all hover:shadow-lg ${
                  batch.status === 'AVAILABLE' ? 'border-green-200' : 'border-red-200'
                }`}
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getClassTypeColor(batch.classType)}`}
                    >
                      {classTypeLabels[batch.classType]}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mt-2">
                      Batch {batch.batchNumber}
                    </h3>
                  </div>
                  <button
                    onClick={() => handleToggleStatus(batch)}
                    className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                      batch.status === 'AVAILABLE'
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                    }`}
                  >
                    {batch.status}
                  </button>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    {batch.days.join(' / ')}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    {formatTime(batch.startTime)} - {formatTime(batch.endTime)}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                    {locationLabels[batch.offlineLocation]}
                  </div>
                  {batch.hasOnline && (
                    <div className="flex items-center text-sm text-indigo-600">
                      <Wifi className="w-4 h-4 mr-2" />
                      Online Available
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-4 border-t border-gray-100">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => openEditModal(batch)}
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => {
                      setSelectedBatch(batch)
                      setIsDeleteModalOpen(true)
                    }}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      <Modal
        open={isCreateModalOpen || isEditModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsCreateModalOpen(false)
            setIsEditModalOpen(false)
            setSelectedBatch(null)
            resetForm()
          }
        }}
        title={isEditModalOpen ? 'Edit Batch' : 'Add New Batch'}
        description={
          isEditModalOpen
            ? 'Update batch details and schedule'
            : 'Create a new batch with schedule and location'
        }
        size="lg"
      >
        <div className="space-y-6">
          {/* Class Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Class Type</label>
            <select
              value={formData.classType}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  classType: e.target.value as 'CLASS_11' | 'CLASS_12' | 'DROPPERS',
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="CLASS_11">Class 11th</option>
              <option value="CLASS_12">Class 12th</option>
              <option value="DROPPERS">Droppers</option>
            </select>
          </div>

          {/* Batch Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Batch Number</label>
            <input
              type="number"
              min="1"
              value={formData.batchNumber}
              onChange={(e) => setFormData({ ...formData, batchNumber: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Days */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Days</label>
            <div className="flex flex-wrap gap-2">
              {dayOptions.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    formData.days.includes(day)
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Offline Location</label>
            <select
              value={formData.offlineLocation}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  offlineLocation: e.target.value as 'GURUGRAM' | 'SOUTH_EXT' | 'ROHINI',
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="GURUGRAM">Gurugram</option>
              <option value="SOUTH_EXT">South Extension</option>
              <option value="ROHINI">Rohini</option>
            </select>
          </div>

          {/* Options */}
          <div className="flex items-center space-x-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.hasOnline}
                onChange={(e) => setFormData({ ...formData, hasOnline: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Online Available</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.status === 'AVAILABLE'}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.checked ? 'AVAILABLE' : 'FULL' })
                }
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">Available for Enrollment</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => {
                setIsCreateModalOpen(false)
                setIsEditModalOpen(false)
                setSelectedBatch(null)
                resetForm()
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={isEditModalOpen ? handleUpdateBatch : handleCreateBatch}
              disabled={saving || formData.days.length === 0}
            >
              {saving ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : isEditModalOpen ? (
                'Update Batch'
              ) : (
                'Create Batch'
              )}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={isDeleteModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsDeleteModalOpen(false)
            setSelectedBatch(null)
          }
        }}
        title="Delete Batch"
        description="Are you sure you want to delete this batch? This action cannot be undone."
        size="sm"
      >
        <div className="space-y-4">
          {selectedBatch && (
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm text-red-800">
                <strong>{classTypeLabels[selectedBatch.classType]}</strong> - Batch{' '}
                {selectedBatch.batchNumber}
                <br />
                {selectedBatch.days.join(' / ')} • {formatTime(selectedBatch.startTime)} -{' '}
                {formatTime(selectedBatch.endTime)}
                <br />
                {locationLabels[selectedBatch.offlineLocation]}
              </p>
            </div>
          )}
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteModalOpen(false)
                setSelectedBatch(null)
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleDeleteBatch}
              disabled={saving}
            >
              {saving ? 'Deleting...' : 'Delete Batch'}
            </Button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  )
}
