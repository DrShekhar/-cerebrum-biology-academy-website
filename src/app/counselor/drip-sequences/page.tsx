'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Zap,
  Plus,
  Play,
  Pause,
  Trash2,
  Copy,
  Edit3,
  Clock,
  MessageSquare,
  Users,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  Loader2,
  X,
  CheckCircle2,
  AlertCircle,
  ArrowDown,
  GitBranch,
  Send,
  Eye,
} from 'lucide-react'
import { format, formatDistanceToNow } from 'date-fns'
import { showToast } from '@/lib/toast'

// ─── Types ───────────────────────────────────────────────────────────────────

interface SequenceStep {
  id: string
  stepNumber: number
  delayDays: number
  delayHours: number
  messageTemplate: string
  channel: 'WHATSAPP' | 'EMAIL' | 'SMS'
  stopOnReply: boolean
}

interface DripSequence {
  id: string
  name: string
  description: string
  triggerStage: string
  stopOnStageChange: boolean
  isActive: boolean
  steps: SequenceStep[]
  stats: {
    totalEnrolled: number
    active: number
    completed: number
    stopped: number
    replyRate: number
  }
  createdAt: string
  updatedAt: string
}

// ─── Pre-built Sequence Templates ────────────────────────────────────────────

const SEQUENCE_TEMPLATES = [
  {
    name: 'Post-Demo Nurture',
    description: 'Auto-follow-up after demo class with fee info and success stories',
    triggerStage: 'DEMO_COMPLETED',
    steps: [
      { delay: '0d 2h', message: '🎓 Hi {{name}}, thank you for attending our Biology demo class! We hope you found it insightful.\n\nHere\'s what our toppers say about our focused biology coaching: [Success Story Link]\n\nWould you like to discuss the next steps?', channel: 'WHATSAPP' },
      { delay: '2d 0h', message: '📋 Hi {{name}}, here are our batch options for NEET {{neet_year}}:\n\n🔹 Regular Batch: Mon-Sat, 4-7 PM\n🔹 Weekend Batch: Sat-Sun, 10 AM-2 PM\n🔹 Dropper Batch: Mon-Sat, 10 AM-5 PM\n\nWhich schedule works best for you?', channel: 'WHATSAPP' },
      { delay: '4d 0h', message: '💰 Hi {{name}}, sharing our fee structure for NEET {{neet_year}} session:\n\n📄 [Fee Structure PDF]\n\n✅ Early-bird discount available till {{deadline}}\n✅ EMI options: 3/6/9 month plans\n✅ Scholarship test available for additional discount\n\nShall I help you with the fee details?', channel: 'WHATSAPP' },
      { delay: '6d 0h', message: '🏆 Hi {{name}}, just a quick reminder — our scholarship admission test is coming up!\n\nScore 80%+ → 30% tuition waiver\nScore 90%+ → 50% tuition waiver\n\n📝 Book your slot: [Scholarship Test Link]\n\nLimited seats available. Let me know if you have any questions!', channel: 'WHATSAPP' },
    ],
  },
  {
    name: 'New Lead Welcome',
    description: 'Welcome sequence for new inquiries with demo class invitation',
    triggerStage: 'NEW_LEAD',
    steps: [
      { delay: '0d 1h', message: '👋 Welcome to Cerebrum Biology Academy, {{name}}!\n\nWe specialize exclusively in Biology for NEET — giving your child the edge where it matters most (Biology = 360/720 marks in NEET).\n\n🧬 Expert faculty | 📊 Proven results | 🎯 Focused approach\n\nWould you like to attend a free demo class?', channel: 'WHATSAPP' },
      { delay: '1d 0h', message: '📅 Hi {{name}}, we have demo classes available this week!\n\nFree demo includes:\n✅ 45-min concept class\n✅ Faculty interaction\n✅ NEET preparation roadmap\n✅ Doubt clearing session\n\nReply with your preferred day and I\'ll book a slot for you.', channel: 'WHATSAPP' },
      { delay: '3d 0h', message: '📊 Hi {{name}}, did you know?\n\n🎯 Biology alone decides NEET rank for 70% of students\n🧬 Our students scored 340+ avg in Biology section\n📈 92% improvement in mock test scores within 3 months\n\nDon\'t let Biology be the weak link. Book your free demo today!', channel: 'WHATSAPP' },
    ],
  },
  {
    name: 'Fee Reminder Sequence',
    description: 'Gentle reminders after fee structure is shared',
    triggerStage: 'OFFER_SENT',
    steps: [
      { delay: '2d 0h', message: '👋 Hi {{name}}, hope you had a chance to review our fee structure.\n\nQuick highlights:\n💳 Flexible EMI plans available\n🎁 Early-bird discount active\n🏆 Scholarship test for additional savings\n\nAny questions? Happy to help!', channel: 'WHATSAPP' },
      { delay: '5d 0h', message: '⏰ Hi {{name}}, just a friendly reminder — the early-bird discount expires on {{deadline}}.\n\nThat\'s a saving of ₹{{discount_amount}} on the total fee.\n\nWould you like me to set up a flexible payment plan? We have 3/6/9 month EMI options.', channel: 'WHATSAPP' },
      { delay: '8d 0h', message: '🔔 Hi {{name}}, only {{seats_remaining}} seats left in the {{batch_name}} batch!\n\nWe\'d hate for {{student_name}} to miss out. If fee is a concern, let\'s discuss:\n\n✅ Scholarship test for tuition waiver\n✅ Custom installment plans\n✅ Sibling discounts\n\nCall me anytime — happy to make it work for you.', channel: 'WHATSAPP' },
    ],
  },
  {
    name: 'Lost Lead Re-engagement',
    description: 'Win back leads who went cold or chose competitors',
    triggerStage: 'LOST',
    steps: [
      { delay: '7d 0h', message: '👋 Hi {{name}}, we noticed you were exploring NEET coaching options. No pressure at all!\n\nJust wanted to share a quick update — we\'ve added new batch timings that might work better for your schedule.\n\nWould you be open to a quick chat?', channel: 'WHATSAPP' },
      { delay: '21d 0h', message: '🏆 Hi {{name}}, our latest NEET results are in!\n\n🎯 {{result_highlight}}\n\nIf you\'re still considering NEET coaching, we\'d love to show you what makes our biology-focused approach different.\n\nFree demo classes available this week!', channel: 'WHATSAPP' },
    ],
  },
]

// ─── Stage Badge ─────────────────────────────────────────────────────────────

const stageColors: Record<string, string> = {
  NEW_LEAD: 'bg-blue-100 text-blue-700',
  DEMO_SCHEDULED: 'bg-purple-100 text-purple-700',
  DEMO_COMPLETED: 'bg-indigo-100 text-indigo-700',
  OFFER_SENT: 'bg-amber-100 text-amber-700',
  NEGOTIATING: 'bg-orange-100 text-orange-700',
  PAYMENT_PLAN_CREATED: 'bg-teal-100 text-teal-700',
  ENROLLED: 'bg-green-100 text-green-700',
  LOST: 'bg-red-100 text-red-700',
}

// ─── Step Editor ─────────────────────────────────────────────────────────────

function StepEditor({
  step,
  index,
  onUpdate,
  onDelete,
  isLast,
}: {
  step: SequenceStep
  index: number
  onUpdate: (step: SequenceStep) => void
  onDelete: () => void
  isLast: boolean
}) {
  return (
    <div className="relative">
      {/* Connector line */}
      {index > 0 && (
        <div className="absolute left-8 -top-6 w-0.5 h-6 bg-indigo-200" />
      )}

      <div className="flex gap-4">
        {/* Step number circle */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex flex-col items-center justify-center text-white">
            <span className="text-[10px] uppercase font-medium opacity-80">Step</span>
            <span className="text-lg font-bold">{index + 1}</span>
          </div>
          {!isLast && <div className="w-0.5 flex-1 bg-indigo-200 mt-2" />}
        </div>

        {/* Step content */}
        <div className="flex-1 bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow mb-4">
          {/* Delay config */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-lg">
              <Clock className="w-4 h-4 text-amber-600" />
              <span className="text-xs text-amber-700 font-medium">Wait</span>
              <input
                type="number"
                min="0"
                max="30"
                value={step.delayDays}
                onChange={(e) => onUpdate({ ...step, delayDays: Number(e.target.value) })}
                className="w-12 px-2 py-1 border border-amber-200 rounded text-center text-sm bg-white"
              />
              <span className="text-xs text-amber-600">days</span>
              <input
                type="number"
                min="0"
                max="23"
                value={step.delayHours}
                onChange={(e) => onUpdate({ ...step, delayHours: Number(e.target.value) })}
                className="w-12 px-2 py-1 border border-amber-200 rounded text-center text-sm bg-white"
              />
              <span className="text-xs text-amber-600">hours</span>
            </div>

            <select
              value={step.channel}
              onChange={(e) => onUpdate({ ...step, channel: e.target.value as any })}
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white"
            >
              <option value="WHATSAPP">📱 WhatsApp</option>
              <option value="EMAIL">📧 Email</option>
              <option value="SMS">💬 SMS</option>
            </select>

            <label className="flex items-center gap-1.5 text-xs text-gray-600 ml-auto">
              <input
                type="checkbox"
                checked={step.stopOnReply}
                onChange={(e) => onUpdate({ ...step, stopOnReply: e.target.checked })}
                className="rounded text-indigo-600"
              />
              Stop if replied
            </label>

            <button
              onClick={onDelete}
              className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Message content */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-gray-500">MESSAGE CONTENT</label>
              <span className="text-[10px] text-gray-400">
                Variables: {'{{name}}'} {'{{course}}'} {'{{neet_year}}'} {'{{deadline}}'} {'{{student_name}}'}
              </span>
            </div>
            <textarea
              value={step.messageTemplate}
              onChange={(e) => onUpdate({ ...step, messageTemplate: e.target.value })}
              placeholder="Type your message here... Use {{name}} for personalization"
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-y"
            />
            <p className="text-xs text-gray-400 mt-1 text-right">
              {step.messageTemplate.length} characters
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Sequence Builder Modal ──────────────────────────────────────────────────

function SequenceBuilderModal({
  isOpen,
  onClose,
  onSave,
  editSequence,
}: {
  isOpen: boolean
  onClose: () => void
  onSave: (seq: any) => void
  editSequence?: DripSequence | null
}) {
  const [name, setName] = useState(editSequence?.name || '')
  const [description, setDescription] = useState(editSequence?.description || '')
  const [triggerStage, setTriggerStage] = useState(editSequence?.triggerStage || 'DEMO_COMPLETED')
  const [stopOnStageChange, setStopOnStageChange] = useState(editSequence?.stopOnStageChange ?? true)
  const [steps, setSteps] = useState<SequenceStep[]>(
    editSequence?.steps || [
      { id: `step_1`, stepNumber: 1, delayDays: 0, delayHours: 2, messageTemplate: '', channel: 'WHATSAPP', stopOnReply: true },
    ]
  )
  const [saving, setSaving] = useState(false)
  const [showTemplates, setShowTemplates] = useState(!editSequence)

  function addStep() {
    const lastStep = steps[steps.length - 1]
    setSteps([
      ...steps,
      {
        id: `step_${Date.now()}`,
        stepNumber: steps.length + 1,
        delayDays: (lastStep?.delayDays || 0) + 2,
        delayHours: 0,
        messageTemplate: '',
        channel: 'WHATSAPP',
        stopOnReply: true,
      },
    ])
  }

  function updateStep(index: number, updatedStep: SequenceStep) {
    const newSteps = [...steps]
    newSteps[index] = updatedStep
    setSteps(newSteps)
  }

  function deleteStep(index: number) {
    if (steps.length <= 1) return
    setSteps(steps.filter((_, i) => i !== index))
  }

  function applyTemplate(template: (typeof SEQUENCE_TEMPLATES)[0]) {
    setName(template.name)
    setDescription(template.description)
    setTriggerStage(template.triggerStage)
    setSteps(
      template.steps.map((s, i) => {
        const [days, hours] = s.delay.split(' ').map((v) => parseInt(v))
        return {
          id: `step_${i + 1}`,
          stepNumber: i + 1,
          delayDays: days,
          delayHours: hours,
          messageTemplate: s.message,
          channel: s.channel as any,
          stopOnReply: true,
        }
      })
    )
    setShowTemplates(false)
  }

  async function handleSave() {
    if (!name.trim()) { showToast.error('Please enter a sequence name'); return }
    if (steps.some((s) => !s.messageTemplate.trim())) { showToast.error('All steps must have a message'); return }

    setSaving(true)
    try {
      await onSave({
        id: editSequence?.id,
        name,
        description,
        triggerStage,
        stopOnStageChange,
        steps: steps.map((s, i) => ({ ...s, stepNumber: i + 1 })),
      })
      onClose()
    } catch {
      showToast.error('Failed to save sequence')
    } finally {
      setSaving(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-gray-50 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {editSequence ? 'Edit Sequence' : 'Create Drip Sequence'}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">Build an automated WhatsApp nurture workflow</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Quick Templates */}
          {showTemplates && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">🚀 Start from a Template</h3>
              <div className="grid grid-cols-2 gap-3">
                {SEQUENCE_TEMPLATES.map((t) => (
                  <button
                    key={t.name}
                    onClick={() => applyTemplate(t)}
                    className="text-left p-4 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-sm transition-all"
                  >
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{t.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${stageColors[t.triggerStage]}`}>
                        {t.triggerStage.replace(/_/g, ' ')}
                      </span>
                      <span className="text-[10px] text-gray-400">{t.steps.length} steps</span>
                    </div>
                  </button>
                ))}
              </div>
              <div className="text-center mt-3">
                <button onClick={() => setShowTemplates(false)} className="text-sm text-indigo-600 hover:underline">
                  Or start from scratch →
                </button>
              </div>
            </div>
          )}

          {!showTemplates && (
            <>
              {/* Basic Info */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Sequence Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Post-Demo Nurture"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Trigger: When lead enters stage</label>
                    <select
                      value={triggerStage}
                      onChange={(e) => setTriggerStage(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                    >
                      {Object.keys(stageColors).map((stage) => (
                        <option key={stage} value={stage}>
                          {stage.replace(/_/g, ' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of this sequence..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={stopOnStageChange}
                    onChange={(e) => setStopOnStageChange(e.target.checked)}
                    className="rounded text-indigo-600"
                  />
                  Stop sequence when lead moves to a different stage
                </label>
              </div>

              {/* Steps Builder */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-4">
                  <GitBranch className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-lg font-bold text-gray-900">Sequence Steps</h3>
                </div>

                {/* Trigger indicator */}
                <div className="flex gap-4 mb-4">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-12 bg-green-100 border-2 border-green-300 rounded-xl flex items-center justify-center">
                      <Zap className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="w-0.5 h-4 bg-indigo-200 mt-2" />
                  </div>
                  <div className="flex items-center">
                    <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                      <p className="text-sm font-medium text-green-800">
                        Trigger: Lead enters "{triggerStage.replace(/_/g, ' ')}" stage
                      </p>
                      <p className="text-xs text-green-600 mt-0.5">Sequence starts automatically</p>
                    </div>
                  </div>
                </div>

                {/* Steps */}
                {steps.map((step, idx) => (
                  <StepEditor
                    key={step.id}
                    step={step}
                    index={idx}
                    onUpdate={(s) => updateStep(idx, s)}
                    onDelete={() => deleteStep(idx)}
                    isLast={idx === steps.length - 1}
                  />
                ))}

                {/* Add Step Button */}
                <div className="flex gap-4">
                  <div className="w-16" />
                  <button
                    onClick={addStep}
                    className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-indigo-300 text-indigo-600 rounded-xl hover:bg-indigo-50 transition-colors text-sm font-medium"
                  >
                    <Plus className="w-4 h-4" /> Add Step
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {!showTemplates && (
          <div className="bg-white px-6 py-4 border-t border-gray-200 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {steps.length} step{steps.length > 1 ? 's' : ''} •
              Total duration: {steps.reduce((sum, s) => sum + s.delayDays, 0)} days
            </div>
            <div className="flex gap-3">
              <button onClick={onClose} className="px-4 py-2 text-gray-600 text-sm">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                {editSequence ? 'Save Changes' : 'Create Sequence'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Sequence Card ───────────────────────────────────────────────────────────

function SequenceCard({
  sequence,
  onToggle,
  onEdit,
  onDelete,
  onDuplicate,
}: {
  sequence: DripSequence
  onToggle: () => void
  onEdit: () => void
  onDelete: () => void
  onDuplicate: () => void
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={`bg-white rounded-xl border-2 transition-all ${sequence.isActive ? 'border-green-200' : 'border-gray-200'}`}>
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-gray-900 truncate">{sequence.name}</h3>
              {sequence.isActive ? (
                <span className="flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-semibold rounded-full">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> ACTIVE
                </span>
              ) : (
                <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-semibold rounded-full">PAUSED</span>
              )}
            </div>
            <p className="text-sm text-gray-500 truncate">{sequence.description}</p>
          </div>
          <div className="flex items-center gap-1 ml-4">
            <button onClick={onToggle} className={`p-2 rounded-lg transition-colors ${sequence.isActive ? 'hover:bg-red-50 text-amber-500' : 'hover:bg-green-50 text-green-600'}`} title={sequence.isActive ? 'Pause' : 'Activate'}>
              {sequence.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button onClick={onEdit} className="p-2 hover:bg-gray-100 text-gray-400 rounded-lg"><Edit3 className="w-4 h-4" /></button>
            <button onClick={onDuplicate} className="p-2 hover:bg-gray-100 text-gray-400 rounded-lg"><Copy className="w-4 h-4" /></button>
            <button onClick={onDelete} className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg"><Trash2 className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Trigger + Stats */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${stageColors[sequence.triggerStage]}`}>
              {sequence.triggerStage.replace(/_/g, ' ')}
            </span>
          </div>
          <span className="text-xs text-gray-400">→</span>
          <span className="text-xs text-gray-500">{sequence.steps.length} steps over {sequence.steps.reduce((sum, s) => sum + s.delayDays, 0)} days</span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-blue-50 rounded-lg p-2.5 text-center">
            <p className="text-lg font-bold text-blue-700">{sequence.stats?.totalEnrolled || 0}</p>
            <p className="text-[10px] text-blue-500">Total Enrolled</p>
          </div>
          <div className="bg-green-50 rounded-lg p-2.5 text-center">
            <p className="text-lg font-bold text-green-700">{sequence.stats?.active || 0}</p>
            <p className="text-[10px] text-green-500">Active Now</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-2.5 text-center">
            <p className="text-lg font-bold text-purple-700">{sequence.stats?.completed || 0}</p>
            <p className="text-[10px] text-purple-500">Completed</p>
          </div>
          <div className="bg-amber-50 rounded-lg p-2.5 text-center">
            <p className="text-lg font-bold text-amber-700">{(sequence.stats?.replyRate || 0).toFixed(0)}%</p>
            <p className="text-[10px] text-amber-500">Reply Rate</p>
          </div>
        </div>

        {/* Expandable Steps Preview */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 mt-3 font-medium"
        >
          {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          {expanded ? 'Hide' : 'View'} steps
        </button>

        {expanded && (
          <div className="mt-3 space-y-2 border-t border-gray-100 pt-3">
            {sequence.steps.map((step, idx) => (
              <div key={step.id} className="flex items-start gap-3 text-sm">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 text-xs font-bold flex-shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-amber-600 font-medium">
                      {step.delayDays}d {step.delayHours}h delay
                    </span>
                    <span className="text-xs text-gray-300">•</span>
                    <span className="text-xs text-gray-500">{step.channel}</span>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2">{step.messageTemplate}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function DripSequencesPage() {
  const [sequences, setSequences] = useState<DripSequence[]>([])
  const [loading, setLoading] = useState(true)
  const [showBuilder, setShowBuilder] = useState(false)
  const [editingSequence, setEditingSequence] = useState<DripSequence | null>(null)

  useEffect(() => {
    fetchSequences()
  }, [])

  async function fetchSequences() {
    try {
      setLoading(true)
      const res = await fetch('/api/counselor/drip-sequences', { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        setSequences(data.data || [])
      }
    } catch {
      console.error('Failed to fetch sequences')
    } finally {
      setLoading(false)
    }
  }

  async function handleSave(seqData: any) {
    const method = seqData.id ? 'PUT' : 'POST'
    const res = await fetch('/api/counselor/drip-sequences', {
      method,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(seqData),
    })
    if (!res.ok) throw new Error('Failed to save')
    showToast.success(seqData.id ? 'Sequence updated!' : 'Sequence created!')
    fetchSequences()
  }

  async function handleToggle(id: string, currentStatus: boolean) {
    try {
      const res = await fetch('/api/counselor/drip-sequences', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id, isActive: !currentStatus }),
      })
      if (res.ok) {
        setSequences((prev) => prev.map((s) => (s.id === id ? { ...s, isActive: !currentStatus } : s)))
        showToast.success(currentStatus ? 'Sequence paused' : 'Sequence activated!')
      }
    } catch {
      showToast.error('Failed to toggle sequence')
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this sequence? Active nurturing will stop for all enrolled leads.')) return
    try {
      await fetch(`/api/counselor/drip-sequences?id=${id}`, { method: 'DELETE', credentials: 'include' })
      setSequences((prev) => prev.filter((s) => s.id !== id))
      showToast.success('Sequence deleted')
    } catch {
      showToast.error('Failed to delete')
    }
  }

  // Stats summary
  const totalActive = sequences.filter((s) => s.isActive).length
  const totalLeadsInSequences = sequences.reduce((sum, s) => sum + (s.stats?.active || 0), 0)
  const avgReplyRate = sequences.length > 0
    ? sequences.reduce((sum, s) => sum + (s.stats?.replyRate || 0), 0) / sequences.length
    : 0

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Drip Sequences</h1>
          <p className="text-gray-600 mt-1">Automated WhatsApp nurture workflows that run while you sleep</p>
        </div>
        <button
          onClick={() => { setEditingSequence(null); setShowBuilder(true) }}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
        >
          <Plus className="w-4 h-4" /> New Sequence
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-5 text-white">
          <div className="flex items-center gap-2 mb-1">
            <Play className="w-4 h-4 text-green-200" />
            <span className="text-green-100 text-xs font-medium">Active Sequences</span>
          </div>
          <p className="text-3xl font-bold">{totalActive}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-5 text-white">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-blue-200" />
            <span className="text-blue-100 text-xs font-medium">Leads in Sequences</span>
          </div>
          <p className="text-3xl font-bold">{totalLeadsInSequences}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-5 text-white">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-purple-200" />
            <span className="text-purple-100 text-xs font-medium">Avg Reply Rate</span>
          </div>
          <p className="text-3xl font-bold">{avgReplyRate.toFixed(0)}%</p>
        </div>
      </div>

      {/* Sequence Cards */}
      {sequences.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Zap className="w-10 h-10 text-indigo-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Sequences Yet</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Create automated WhatsApp nurture sequences that follow up with leads automatically based on their pipeline stage.
          </p>
          <button
            onClick={() => { setEditingSequence(null); setShowBuilder(true) }}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
          >
            Create Your First Sequence
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {sequences.map((seq) => (
            <SequenceCard
              key={seq.id}
              sequence={seq}
              onToggle={() => handleToggle(seq.id, seq.isActive)}
              onEdit={() => { setEditingSequence(seq); setShowBuilder(true) }}
              onDelete={() => handleDelete(seq.id)}
              onDuplicate={() => {
                const clone = { ...seq, id: undefined, name: `${seq.name} (Copy)`, isActive: false }
                handleSave(clone)
              }}
            />
          ))}
        </div>
      )}

      {/* Builder Modal */}
      <SequenceBuilderModal
        isOpen={showBuilder}
        onClose={() => { setShowBuilder(false); setEditingSequence(null) }}
        onSave={handleSave}
        editSequence={editingSequence}
      />
    </div>
  )
}
