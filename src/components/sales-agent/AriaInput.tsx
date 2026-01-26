/**
 * ARIA Sales Agent - Input Component
 * Message input with language toggle, send button, and lead capture modes
 */

'use client'

import { useState, useRef, useCallback, KeyboardEvent } from 'react'
import { Send, Globe, MessageSquare, Phone, User, GraduationCap, Loader2 } from 'lucide-react'
import type { Language, LeadStage } from '@/lib/aria/types'
import { getTranslation } from '@/lib/aria/translations'
import { validateLeadField } from '@/lib/aria/validation'

interface AriaInputProps {
  language: Language
  leadStage: LeadStage
  isStreaming: boolean
  onSendMessage: (message: string) => void
  onSubmitLeadField: (field: 'name' | 'phone' | 'class', value: string) => boolean
  onToggleLanguage: () => void
  disabled?: boolean
}

export function AriaInput({
  language,
  leadStage,
  isStreaming,
  onSendMessage,
  onSubmitLeadField,
  onToggleLanguage,
  disabled = false,
}: AriaInputProps) {
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const isLeadCapture = leadStage !== 'chat' && leadStage !== 'complete'

  const getPlaceholder = (): string => {
    switch (leadStage) {
      case 'name':
        return getTranslation('namePlaceholder', language)
      case 'phone':
        return getTranslation('phonePlaceholder', language)
      case 'class':
        return getTranslation('classPlaceholder', language)
      default:
        return getTranslation('typePlaceholder', language)
    }
  }

  const getStepLabel = (): string => {
    switch (leadStage) {
      case 'name':
        return getTranslation('stepName', language)
      case 'phone':
        return getTranslation('stepPhone', language)
      case 'class':
        return getTranslation('stepClass', language)
      default:
        return ''
    }
  }

  const getLeadIcon = () => {
    switch (leadStage) {
      case 'name':
        return <User className="h-4 w-4" />
      case 'phone':
        return <Phone className="h-4 w-4" />
      case 'class':
        return <GraduationCap className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const validateInput = (value: string): boolean => {
    if (!value.trim()) {
      setError(language === 'hi' ? 'कृपया कुछ लिखें' : 'Please enter something')
      return false
    }

    // Use centralized validation for lead capture fields
    if (isLeadCapture) {
      const field = leadStage as 'name' | 'phone' | 'class'
      const result = validateLeadField(field, value)
      if (!result.isValid && result.errorKey) {
        setError(getTranslation(result.errorKey, language))
        return false
      }
    }

    setError('')
    return true
  }

  const handleSubmit = useCallback(() => {
    const trimmedValue = inputValue.trim()
    if (!trimmedValue || disabled || isStreaming) return

    if (!validateInput(trimmedValue)) return

    if (isLeadCapture) {
      const field = leadStage as 'name' | 'phone' | 'class'
      const success = onSubmitLeadField(field, trimmedValue)
      if (success) {
        setInputValue('')
        setError('')
      }
    } else {
      onSendMessage(trimmedValue)
      setInputValue('')
      setError('')
    }

    // Keep focus on input
    inputRef.current?.focus()
  }, [
    inputValue,
    disabled,
    isStreaming,
    isLeadCapture,
    leadStage,
    onSendMessage,
    onSubmitLeadField,
    validateInput,
  ])

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleInputChange = (value: string) => {
    // For phone, only allow digits
    if (leadStage === 'phone') {
      value = value.replace(/\D/g, '').slice(0, 10)
    }
    setInputValue(value)
    if (error) setError('')
  }

  return (
    <div className="border-t border-slate-200 bg-white p-3">
      {/* Lead capture step indicator */}
      {isLeadCapture && (
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-green-600">{getStepLabel()}</span>
          <div className="flex gap-1">
            {['name', 'phone', 'class'].map((stage) => (
              <div
                key={stage}
                className={`h-1.5 w-8 rounded-full ${
                  stage === leadStage
                    ? 'bg-green-500'
                    : ['name', 'phone', 'class'].indexOf(leadStage) >
                        ['name', 'phone', 'class'].indexOf(stage)
                      ? 'bg-green-200'
                      : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mb-2 rounded-md bg-red-50 px-2 py-1 text-xs text-red-600">{error}</div>
      )}

      {/* Input row */}
      <div className="flex items-center gap-2">
        {/* Language toggle */}
        <button
          onClick={onToggleLanguage}
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-green-300 hover:bg-green-50 hover:text-green-600"
          title={getTranslation('languageToggle', language)}
        >
          <Globe className="h-4 w-4" />
        </button>

        {/* Input field */}
        <div className="relative flex-1">
          {isLeadCapture && (
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              {getLeadIcon()}
            </div>
          )}
          <input
            ref={inputRef}
            type={leadStage === 'phone' ? 'tel' : 'text'}
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={getPlaceholder()}
            disabled={disabled || isStreaming}
            className={`w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-green-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-green-400 disabled:cursor-not-allowed disabled:opacity-50 ${
              isLeadCapture ? 'pl-9' : 'pl-3'
            }`}
            autoComplete={leadStage === 'phone' ? 'tel' : leadStage === 'name' ? 'name' : 'off'}
          />
        </div>

        {/* Send button */}
        <button
          onClick={handleSubmit}
          disabled={!inputValue.trim() || disabled || isStreaming}
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-green-500 text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isStreaming ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Language indicator */}
      <div className="mt-2 flex items-center justify-center gap-1">
        <span className="text-[10px] text-slate-400">
          {language === 'hi' ? 'हिंदी में टाइप करें' : 'Type in English'}
        </span>
        <span className="text-[10px] text-slate-300">•</span>
        <button
          onClick={onToggleLanguage}
          className="text-[10px] font-medium text-green-600 hover:text-green-700"
        >
          {getTranslation('languageToggle', language)}
        </button>
      </div>
    </div>
  )
}
