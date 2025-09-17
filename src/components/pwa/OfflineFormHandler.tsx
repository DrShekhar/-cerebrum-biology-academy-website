'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WifiOff, Send, Clock, CheckCircle, AlertCircle, Trash2, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import pwaService, { OfflineFormData } from '@/lib/pwa/pwaService'

interface OfflineFormHandlerProps {
  children: React.ReactNode
}

interface StoredForm {
  id: string
  type: 'contact' | 'demo-booking' | 'enrollment'
  data: any
  timestamp: number
  status: 'pending' | 'syncing' | 'failed'
}

export function OfflineFormHandler({ children }: OfflineFormHandlerProps) {
  const [isOnline, setIsOnline] = useState(true)
  const [pendingForms, setPendingForms] = useState<StoredForm[]>([])
  const [showOfflineIndicator, setShowOfflineIndicator] = useState(false)

  useEffect(() => {
    // Check initial online status
    setIsOnline(navigator.onLine)

    // Listen for online/offline events
    const handleOnline = () => {
      setIsOnline(true)
      setShowOfflineIndicator(false)
      syncPendingForms()
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowOfflineIndicator(true)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Load pending forms from storage
    loadPendingForms()

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const loadPendingForms = async () => {
    try {
      const forms = await getStoredForms()
      setPendingForms(forms)
    } catch (error) {
      console.error('Failed to load pending forms:', error)
    }
  }

  const syncPendingForms = async () => {
    if (!isOnline) return

    const forms = await getStoredForms()

    for (const form of forms) {
      try {
        // Update status to syncing
        updateFormStatus(form.id, 'syncing')

        // Try to submit the form
        const success = await submitForm(form)

        if (success) {
          await removeStoredForm(form.id)
        } else {
          updateFormStatus(form.id, 'failed')
        }
      } catch (error) {
        console.error('Failed to sync form:', error)
        updateFormStatus(form.id, 'failed')
      }
    }

    // Reload pending forms
    await loadPendingForms()
  }

  const submitForm = async (form: StoredForm): Promise<boolean> => {
    let endpoint = ''

    switch (form.type) {
      case 'contact':
        endpoint = '/api/contact'
        break
      case 'demo-booking':
        endpoint = '/api/demo/book'
        break
      case 'enrollment':
        endpoint = '/api/enrollments'
        break
      default:
        return false
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form.data),
      })

      return response.ok
    } catch (error) {
      console.error('Form submission failed:', error)
      return false
    }
  }

  const updateFormStatus = (id: string, status: StoredForm['status']) => {
    setPendingForms((prev) => prev.map((form) => (form.id === id ? { ...form, status } : form)))
  }

  const retryForm = async (formId: string) => {
    const form = pendingForms.find((f) => f.id === formId)
    if (!form) return

    updateFormStatus(formId, 'syncing')

    const success = await submitForm(form)

    if (success) {
      await removeStoredForm(formId)
      await loadPendingForms()
    } else {
      updateFormStatus(formId, 'failed')
    }
  }

  const deleteForm = async (formId: string) => {
    await removeStoredForm(formId)
    await loadPendingForms()
  }

  const getFormTypeLabel = (type: string) => {
    switch (type) {
      case 'contact':
        return 'Contact Form'
      case 'demo-booking':
        return 'Demo Booking'
      case 'enrollment':
        return 'Course Enrollment'
      default:
        return 'Form Submission'
    }
  }

  const getStatusBadge = (status: StoredForm['status']) => {
    switch (status) {
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case 'syncing':
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
            Syncing
          </Badge>
        )
      case 'failed':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="relative">
      {children}

      {/* Offline Indicator */}
      <AnimatePresence>
        {showOfflineIndicator && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-0 right-0 z-50 bg-orange-600 text-white py-2 px-4"
          >
            <div className="flex items-center justify-center space-x-2 text-sm">
              <WifiOff className="w-4 h-4" />
              <span>You're offline. Forms will be saved and sent when you reconnect.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pending Forms Manager */}
      <AnimatePresence>
        {pendingForms.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed bottom-6 right-6 z-40 max-w-sm"
          >
            <Card className="border-2 border-orange-200 shadow-lg bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-lg">
                  <div className="flex items-center space-x-2">
                    <Send className="w-5 h-5 text-orange-600" />
                    <span>Pending Forms</span>
                  </div>
                  <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                    {pendingForms.length}
                  </Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3 max-h-64 overflow-y-auto">
                {pendingForms.map((form) => (
                  <motion.div
                    key={form.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-gray-50 rounded-lg border"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-sm text-gray-900">
                          {getFormTypeLabel(form.type)}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {new Date(form.timestamp).toLocaleString()}
                        </p>
                      </div>
                      {getStatusBadge(form.status)}
                    </div>

                    {/* Form preview */}
                    <div className="text-xs text-gray-600 mb-3">
                      {form.data.name && <div>Name: {form.data.name}</div>}
                      {form.data.email && <div>Email: {form.data.email}</div>}
                      {form.data.phone && <div>Phone: {form.data.phone}</div>}
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      {form.status === 'failed' && (
                        <Button
                          size="sm"
                          onClick={() => retryForm(form.id)}
                          className="text-xs px-2 py-1 h-auto bg-blue-600 hover:bg-blue-700"
                        >
                          <RefreshCw className="w-3 h-3 mr-1" />
                          Retry
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteForm(form.id)}
                        className="text-xs px-2 py-1 h-auto border-red-300 text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </motion.div>
                ))}

                {/* Sync All Button */}
                {isOnline &&
                  pendingForms.some((f) => f.status === 'pending' || f.status === 'failed') && (
                    <Button
                      onClick={syncPendingForms}
                      className="w-full bg-green-600 hover:bg-green-700 text-sm"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Sync All Forms
                    </Button>
                  )}

                {/* Offline Notice */}
                {!isOnline && (
                  <div className="p-2 bg-orange-50 rounded border border-orange-200">
                    <p className="text-xs text-orange-800 text-center">
                      Forms will sync automatically when you're back online
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Hook for handling offline form submissions
export function useOfflineFormSubmission() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    setIsOnline(navigator.onLine)

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const submitForm = async (
    type: 'contact' | 'demo-booking' | 'enrollment',
    data: any,
    endpoint: string
  ): Promise<{ success: boolean; offline?: boolean }> => {
    if (isOnline) {
      // Try online submission first
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })

        if (response.ok) {
          return { success: true }
        } else {
          throw new Error(`HTTP ${response.status}`)
        }
      } catch (error) {
        console.error('Online form submission failed:', error)
        // Fall through to offline storage
      }
    }

    // Store for offline sync
    const offlineData: OfflineFormData = {
      id: `${type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      data,
      timestamp: Date.now(),
    }

    try {
      await pwaService.storeOfflineData(offlineData)
      return { success: true, offline: true }
    } catch (error) {
      console.error('Offline form storage failed:', error)
      return { success: false }
    }
  }

  return {
    submitForm,
    isOnline,
  }
}

// Utility functions for IndexedDB operations
async function getStoredForms(): Promise<StoredForm[]> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('CerebrumOfflineDB', 1)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction(['forms'], 'readonly')
      const store = transaction.objectStore('forms')
      const getAllRequest = store.getAll()

      getAllRequest.onsuccess = () => {
        const forms = getAllRequest.result.map((form: any) => ({
          ...form,
          status: form.status || 'pending',
        }))
        resolve(forms)
      }
      getAllRequest.onerror = () => reject(getAllRequest.error)
    }
  })
}

async function removeStoredForm(id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('CerebrumOfflineDB', 1)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction(['forms'], 'readwrite')
      const store = transaction.objectStore('forms')
      const deleteRequest = store.delete(id)

      deleteRequest.onsuccess = () => resolve()
      deleteRequest.onerror = () => reject(deleteRequest.error)
    }
  })
}
