'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'

interface NewCampaignFormProps {
  onSuccess: () => void
  onCancel: () => void
}

const CAMPAIGN_TYPES = ['whatsapp', 'sms', 'email', 'facebook', 'google', 'mixed'] as const
const OBJECTIVES = ['enrollment', 'demo_booking', 'retention', 'upsell', 'referral'] as const
const CLASSES = ['10th', '11th', '12th', 'Dropper'] as const
const ENROLLMENT_STATUS = ['enrolled', 'demo_taken', 'lead', 'inactive'] as const
const FREQUENCIES = ['once', 'daily', 'weekly', 'monthly'] as const

// Approved templates already used in production sends (suggestions only — the
// admin can type any template name approved in their Interakt dashboard).
const KNOWN_WA_TEMPLATES = [
  'course_information',
  'limited_offer',
  'last_chance_offer',
  'cart_recovery_discount',
  'welcome_message',
  'special_offer',
] as const

type CampaignType = (typeof CAMPAIGN_TYPES)[number]

export function NewCampaignForm({ onSuccess, onCancel }: NewCampaignFormProps) {
  const [name, setName] = useState('')
  const [type, setType] = useState<CampaignType>('whatsapp')
  const [objective, setObjective] = useState<(typeof OBJECTIVES)[number]>('enrollment')
  const [classes, setClasses] = useState<string[]>([])
  const [statuses, setStatuses] = useState<string[]>([])
  const [city, setCity] = useState('')

  // Content
  const [waMode, setWaMode] = useState<'text' | 'template'>('text')
  const [waMessage, setWaMessage] = useState('')
  const [waTemplateName, setWaTemplateName] = useState('')
  const [waParams, setWaParams] = useState<string[]>([])
  const [smsMessage, setSmsMessage] = useState('')
  const [emailSubject, setEmailSubject] = useState('')
  const [emailBody, setEmailBody] = useState('')

  // Scheduling
  const [scheduledAt, setScheduledAt] = useState('')
  const [frequency, setFrequency] = useState<(typeof FREQUENCIES)[number]>('once')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const showWhatsapp = type === 'whatsapp' || type === 'mixed'
  const showSms = type === 'sms' || type === 'mixed'
  const showEmail = type === 'email' || type === 'mixed'

  const toggle = (list: string[], set: (v: string[]) => void, value: string) => {
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError('Campaign name is required')
      return
    }

    const content: Record<string, unknown> = {}
    if (showWhatsapp) {
      if (waMode === 'template' && waTemplateName.trim()) {
        const templateParams: Record<string, string> = {}
        waParams.forEach((v, i) => {
          if (v.trim()) templateParams[String(i + 1)] = v.trim()
        })
        content.whatsapp = { templateName: waTemplateName.trim(), templateParams }
      } else if (waMode === 'text' && waMessage.trim()) {
        content.whatsapp = { message: waMessage.trim() }
      }
    }
    if (showSms && smsMessage.trim()) content.sms = { message: smsMessage.trim() }
    if (showEmail && (emailSubject.trim() || emailBody.trim())) {
      content.email = {
        subject: emailSubject.trim(),
        htmlContent: emailBody.trim(),
        textContent: emailBody.trim(),
      }
    }

    const targetAudience = {
      demographics: {
        class: classes,
        ...(city.trim()
          ? {
              city: city
                .split(',')
                .map((c) => c.trim())
                .filter(Boolean),
            }
          : {}),
      },
      behavior: {
        ...(statuses.length ? { enrollment_status: statuses } : {}),
      },
    }

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/admin/marketing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          type,
          objective,
          targetAudience,
          content,
          scheduledAt: scheduledAt ? new Date(scheduledAt).getTime() : undefined,
          frequency,
        }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to create campaign')
      }
      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create campaign')
    } finally {
      setIsSubmitting(false)
    }
  }

  const label = 'block text-sm font-medium text-gray-700 mb-1'
  const input =
    'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className={label}>Campaign name *</label>
          <input
            className={input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="NEET 2027 Dropper re-engagement"
          />
        </div>
        <div>
          <label className={label}>Channel *</label>
          <select
            className={input}
            value={type}
            onChange={(e) => setType(e.target.value as CampaignType)}
          >
            {CAMPAIGN_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={label}>Objective *</label>
        <select
          className={input}
          value={objective}
          onChange={(e) => setObjective(e.target.value as (typeof OBJECTIVES)[number])}
        >
          {OBJECTIVES.map((o) => (
            <option key={o} value={o}>
              {o.replace('_', ' ')}
            </option>
          ))}
        </select>
      </div>

      {/* Targeting */}
      <fieldset className="rounded-lg border border-gray-200 p-4">
        <legend className="px-1 text-sm font-semibold text-gray-700">Target audience</legend>
        <div className="mb-3">
          <span className={label}>Class</span>
          <div className="flex flex-wrap gap-3">
            {CLASSES.map((c) => (
              <label key={c} className="flex items-center gap-1.5 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={classes.includes(c)}
                  onChange={() => toggle(classes, setClasses, c)}
                />
                {c}
              </label>
            ))}
          </div>
        </div>
        <div className="mb-3">
          <span className={label}>Enrollment status</span>
          <div className="flex flex-wrap gap-3">
            {ENROLLMENT_STATUS.map((s) => (
              <label key={s} className="flex items-center gap-1.5 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={statuses.includes(s)}
                  onChange={() => toggle(statuses, setStatuses, s)}
                />
                {s.replace('_', ' ')}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className={label}>Cities (comma-separated, optional)</label>
          <input
            className={input}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Delhi, Noida, Gurugram"
          />
        </div>
      </fieldset>

      {/* Content */}
      {showWhatsapp && (
        <fieldset className="rounded-lg border border-gray-200 p-4">
          <legend className="px-1 text-sm font-semibold text-gray-700">WhatsApp content</legend>
          <div className="mb-3 flex gap-4 text-sm">
            <label className="flex items-center gap-1.5 text-gray-700">
              <input type="radio" checked={waMode === 'text'} onChange={() => setWaMode('text')} />
              Free text
            </label>
            <label className="flex items-center gap-1.5 text-gray-700">
              <input
                type="radio"
                checked={waMode === 'template'}
                onChange={() => setWaMode('template')}
              />
              Approved template
            </label>
          </div>

          {waMode === 'text' ? (
            <>
              <textarea
                className={input}
                rows={3}
                value={waMessage}
                onChange={(e) => setWaMessage(e.target.value)}
                placeholder="Hi, admissions for NEET 2027 are open…"
              />
              <p className="mt-1 text-xs text-amber-700">
                Free text is only delivered inside an open 24-hour chat window. For broadcasts to
                cold contacts, use an approved template.
              </p>
            </>
          ) : (
            <div className="space-y-3">
              <div>
                <label className={label}>Template name (approved in Interakt)</label>
                <input
                  className={input}
                  list="wa-template-suggestions"
                  value={waTemplateName}
                  onChange={(e) => setWaTemplateName(e.target.value)}
                  placeholder="e.g. limited_offer"
                />
                <datalist id="wa-template-suggestions">
                  {KNOWN_WA_TEMPLATES.map((t) => (
                    <option key={t} value={t} />
                  ))}
                </datalist>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className={label}>
                    Body values (in order: {'{{1}}'}, {'{{2}}'}…)
                  </span>
                  <button
                    type="button"
                    className="text-xs font-medium text-blue-600 hover:text-blue-800"
                    onClick={() => setWaParams([...waParams, ''])}
                  >
                    + Add value
                  </button>
                </div>
                {waParams.length === 0 && (
                  <p className="text-xs text-gray-500">
                    No parameters — add one per {'{{n}}'} placeholder your template uses.
                  </p>
                )}
                <div className="space-y-2">
                  {waParams.map((v, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-10 text-xs text-gray-500">{`{{${i + 1}}}`}</span>
                      <input
                        className={input}
                        value={v}
                        onChange={(e) => {
                          const next = [...waParams]
                          next[i] = e.target.value
                          setWaParams(next)
                        }}
                      />
                      <button
                        type="button"
                        className="text-xs text-red-600 hover:text-red-800"
                        onClick={() => setWaParams(waParams.filter((_, idx) => idx !== i))}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </fieldset>
      )}
      {showSms && (
        <div>
          <label className={label}>SMS message</label>
          <textarea
            className={input}
            rows={2}
            value={smsMessage}
            onChange={(e) => setSmsMessage(e.target.value)}
          />
        </div>
      )}
      {showEmail && (
        <div className="space-y-3">
          <div>
            <label className={label}>Email subject</label>
            <input
              className={input}
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
            />
          </div>
          <div>
            <label className={label}>Email body (HTML allowed)</label>
            <textarea
              className={input}
              rows={5}
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Scheduling */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className={label}>Schedule for (optional)</label>
          <input
            type="datetime-local"
            className={input}
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
          />
        </div>
        <div>
          <label className={label}>Frequency</label>
          <select
            className={input}
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as (typeof FREQUENCIES)[number])}
          >
            {FREQUENCIES.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        Saved as a {scheduledAt ? 'scheduled' : 'draft'} campaign. Sending to the audience is a
        separate, explicit step — creating a campaign does not message anyone.
      </p>

      <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isSubmitting ? 'Creating…' : 'Create campaign'}
        </Button>
      </div>
    </form>
  )
}
