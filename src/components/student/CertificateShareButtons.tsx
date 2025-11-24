'use client'

import React from 'react'
import { Share2, Linkedin, Facebook, Twitter, Link as LinkIcon } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface CertificateShareButtonsProps {
  certificateId: string
  studentName: string
  courseName: string
  certificateType: string
  verificationCode: string
}

export default function CertificateShareButtons({
  certificateId,
  studentName,
  courseName,
  certificateType,
  verificationCode,
}: CertificateShareButtonsProps) {
  const baseUrl =
    typeof window !== 'undefined' ? window.location.origin : 'https://cerebrumbiologyacademy.com'

  const certificateUrl = `${baseUrl}/verify-certificate/${verificationCode}`
  const shareText = `I have successfully completed ${courseName} and earned a ${certificateType
    .split('_')
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ')} certificate from Cerebrum Biology Academy!`

  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(certificateUrl)}`
    window.open(linkedInUrl, '_blank', 'width=600,height=600')
  }

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(certificateUrl)}&quote=${encodeURIComponent(shareText)}`
    window.open(facebookUrl, '_blank', 'width=600,height=600')
  }

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(certificateUrl)}`
    window.open(twitterUrl, '_blank', 'width=600,height=600')
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(certificateUrl)
      toast.success('Certificate link copied to clipboard!')
    } catch (error) {
      toast.error('Failed to copy link')
    }
  }

  const handleNativeShare = async () => {
    const shareData = {
      title: `${certificateType} Certificate`,
      text: shareText,
      url: certificateUrl,
    }

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData)
        toast.success('Shared successfully!')
      } else {
        await handleCopyLink()
      }
    } catch (error) {
      console.error('Share error:', error)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900">Share Your Achievement</h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={handleLinkedInShare}
          className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors group"
        >
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <Linkedin className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700">LinkedIn</span>
        </button>

        <button
          onClick={handleFacebookShare}
          className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors group"
        >
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <Facebook className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700">Facebook</span>
        </button>

        <button
          onClick={handleTwitterShare}
          className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors group"
        >
          <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <Twitter className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700">Twitter</span>
        </button>

        <button
          onClick={handleCopyLink}
          className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors group"
        >
          <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <LinkIcon className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700">Copy Link</span>
        </button>
      </div>

      {typeof window !== 'undefined' && navigator.share && (
        <button
          onClick={handleNativeShare}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          <Share2 className="w-5 h-5" />
          <span>Share Certificate</span>
        </button>
      )}
    </div>
  )
}
