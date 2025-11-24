/**
 * Invoice Download Button Component
 * Allows students to download/view invoice for a payment
 */

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Download, FileText, Loader2, Eye } from 'lucide-react'
import { showToast } from '@/lib/toast'
import { cn } from '@/lib/utils'

interface InvoiceDownloadButtonProps {
  paymentId: string
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
  showLabel?: boolean
  className?: string
  onDownloadStart?: () => void
  onDownloadComplete?: () => void
  onError?: (error: string) => void
}

export function InvoiceDownloadButton({
  paymentId,
  variant = 'outline',
  size = 'sm',
  showIcon = true,
  showLabel = true,
  className,
  onDownloadStart,
  onDownloadComplete,
  onError,
}: InvoiceDownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = async () => {
    try {
      setIsLoading(true)
      onDownloadStart?.()

      const invoiceUrl = `/api/student/payments/${paymentId}/invoice`

      window.open(invoiceUrl, '_blank')

      showToast.success('Invoice opened in new tab')
      onDownloadComplete?.()
    } catch (error) {
      console.error('Error downloading invoice:', error)
      const errorMessage = 'Failed to download invoice. Please try again.'
      showToast.error(errorMessage)
      onError?.(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleView = async () => {
    try {
      setIsLoading(true)
      const invoiceUrl = `/api/student/payments/${paymentId}/invoice`
      window.open(invoiceUrl, '_blank')
      showToast.info('Invoice opened for viewing')
    } catch (error) {
      console.error('Error viewing invoice:', error)
      showToast.error('Failed to view invoice. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Button
        variant={variant}
        size={size}
        onClick={handleDownload}
        disabled={isLoading}
        className="gap-2"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          showIcon && <Download className="w-4 h-4" />
        )}
        {showLabel && (isLoading ? 'Loading...' : 'Download Invoice')}
      </Button>

      <Button
        variant="ghost"
        size={size}
        onClick={handleView}
        disabled={isLoading}
        className="gap-2"
        title="View Invoice"
      >
        <Eye className="w-4 h-4" />
      </Button>
    </div>
  )
}
