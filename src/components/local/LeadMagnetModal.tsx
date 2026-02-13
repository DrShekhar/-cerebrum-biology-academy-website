'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/contexts/AuthContext'
import { X, Download, CheckCircle } from 'lucide-react'
import { LeadMagnet } from '@/data/leadMagnets'
import { LocalArea } from '@/data/localAreas'

interface LeadMagnetModalProps {
  isOpen: boolean
  onClose: () => void
  leadMagnet: LeadMagnet
  area: LocalArea
}

export function LeadMagnetModal({ isOpen, onClose, leadMagnet, area }: LeadMagnetModalProps) {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.profile?.phoneNumber || '',
    studentClass: '',
    currentSchool: '',
    targetScore: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate lead capture
      console.log('Lead captured:', {
        leadMagnet: leadMagnet.title.replace('[AREA]', area.displayName),
        area: area.name,
        formData,
      })

      // In real implementation, send to InstantDB and email service
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsSubmitted(true)
    } catch (error) {
      console.error('Lead capture error:', error)
      alert('Failed to download. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.profile?.phoneNumber || '',
      studentClass: '',
      currentSchool: '',
      targetScore: '',
    })
    setIsSubmitted(false)
    onClose()
  }

  if (!isOpen) return null

  return (
<div
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fadeInUp"
        onClick={handleClose}
      >
        <div
          className="bg-white rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto relative animate-fadeInUp"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSubmitted ? (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Download className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {leadMagnet.title.replace('[AREA]', area.displayName)}
                </h2>
                <p className="text-gray-600 mb-4">
                  {leadMagnet.description.replace('[AREA]', area.displayName)}
                </p>
                <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {leadMagnet.value}
                </div>
              </div>

              {/* Benefits List */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">What You&apos;ll Get:</h3>
                <ul className="space-y-3">
                  {leadMagnet.conversionBenefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        {benefit.replace('[AREA]', area.displayName)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Simple Form - Minimal Friction */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Class *</label>
                    <select
                      name="studentClass"
                      value={formData.studentClass}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      required
                    >
                      <option value="">Select</option>
                      <option value="11th">Class 11th</option>
                      <option value="12th">Class 12th</option>
                      <option value="dropper">Dropper</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    'Getting Your Free Resource...'
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      {leadMagnet.downloadText.replace('[AREA]', area.displayName)}
                    </>
                  )}
                </Button>
              </form>

              {/* Social Proof */}
              {leadMagnet.socialProof && (
                <div className="text-center text-sm text-gray-500 mt-4">
                  🎓 {leadMagnet.socialProof.replace('[AREA]', area.displayName)}
                </div>
              )}

              {/* Trust Signals */}
              <div className="text-center text-xs text-gray-500 mt-4 pt-4 border-t">
                ✅ Instant Download • ✅ No Spam • ✅ 100% Free • ✅ From AIIMS Faculty
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Download Sent Successfully! 📧
              </h3>
              <p className="text-gray-600 mb-6">
                We&apos;ve sent{' '}
                <strong>{leadMagnet.title.replace('[AREA]', area.displayName)}</strong> to your
                email <strong>{formData.email}</strong>.
              </p>
              <div className="bg-blue-50 rounded-2xl p-6 mb-6">
                <h4 className="font-semibold text-blue-900 mb-2">What&apos;s Next?</h4>
                <ul className="text-sm text-blue-800 text-left space-y-2">
                  <li>📧 Check your email for the download link</li>
                  <li>📱 We&apos;ll WhatsApp you additional study tips</li>
                  <li>📞 Our counselor will call within 24 hours</li>
                  <li>🎯 Book a free demo class when ready</li>
                </ul>
              </div>
              <Button onClick={handleClose} variant="primary" size="lg">
                Perfect, Got It!
              </Button>
            </div>
          )}
        </div>
      </div>
)
}
