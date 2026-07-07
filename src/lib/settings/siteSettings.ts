/**
 * Global site settings, stored key-per-section in the site_settings table.
 *
 * Each section has a zod schema + defaults; reads merge stored JSON over the
 * defaults so missing/legacy keys never crash a caller. Writes validate first.
 * A short module-level cache keeps hot paths (e.g. upsertLead) off the DB.
 */

import { z } from 'zod'
import { prisma } from '@/lib/prisma'

export const generalSettingsSchema = z.object({
  academyName: z.string().min(1).max(120),
  contactEmail: z.string().email(),
  contactPhone: z.string().min(8).max(20),
  whatsappNumber: z.string().min(8).max(20),
  timezone: z.string().min(1),
  demoDurationMinutes: z.number().int().min(30).max(180),
  autoAssignLeads: z.boolean(),
})

export const leadBoardSettingsSchema = z.object({
  // Team-wide color-tag vocabulary: counselors pick a color on a lead; the
  // legend shows everyone what each color means. Labels are editable.
  colorTags: z
    .array(
      z.object({
        id: z.string().min(1),
        color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
        label: z.string().min(1).max(60),
      })
    )
    .min(1)
    .max(12),
})

export const notificationSettingsSchema = z.object({
  channels: z.array(z.object({ id: z.string(), enabled: z.boolean() })),
  events: z.array(
    z.object({
      id: z.string(),
      email: z.boolean(),
      sms: z.boolean(),
      whatsapp: z.boolean(),
    })
  ),
})

const SECTION_SCHEMAS = {
  general: generalSettingsSchema,
  notifications: notificationSettingsSchema,
  leadBoard: leadBoardSettingsSchema,
} as const

export type SettingsSection = keyof typeof SECTION_SCHEMAS
export type GeneralSettings = z.infer<typeof generalSettingsSchema>
export type NotificationSettings = z.infer<typeof notificationSettingsSchema>
export type LeadBoardSettings = z.infer<typeof leadBoardSettingsSchema>

export const SETTINGS_DEFAULTS: { [K in SettingsSection]: z.infer<(typeof SECTION_SCHEMAS)[K]> } = {
  general: {
    academyName: 'Cerebrum Biology Academy',
    contactEmail: 'contact@cerebrumbiologyacademy.com',
    contactPhone: '+91 88264 44334',
    whatsappNumber: '+91 88264 44334',
    timezone: 'Asia/Kolkata',
    demoDurationMinutes: 60,
    autoAssignLeads: true,
  },
  notifications: {
    channels: [],
    events: [],
  },
  leadBoard: {
    colorTags: [
      { id: 'red', color: '#ef4444', label: 'Urgent — decision pending' },
      { id: 'orange', color: '#f97316', label: 'Fee negotiation' },
      { id: 'yellow', color: '#eab308', label: 'Needs parent discussion' },
      { id: 'green', color: '#22c55e', label: 'Ready to enroll' },
      { id: 'blue', color: '#3b82f6', label: 'Long-term nurture' },
      { id: 'purple', color: '#a855f7', label: 'VIP / high value' },
    ],
  },
}

const CACHE_TTL_MS = 60_000
const cache = new Map<SettingsSection, { value: unknown; expiresAt: number }>()

export async function getSettings<K extends SettingsSection>(
  section: K
): Promise<z.infer<(typeof SECTION_SCHEMAS)[K]>> {
  const cached = cache.get(section)
  if (cached && cached.expiresAt > Date.now()) {
    return cached.value as z.infer<(typeof SECTION_SCHEMAS)[K]>
  }

  const defaults = SETTINGS_DEFAULTS[section]
  let value: z.infer<(typeof SECTION_SCHEMAS)[K]>
  try {
    const row = await prisma.site_settings.findUnique({ where: { key: section } })
    const stored = (row?.value as Record<string, unknown> | null) || {}
    const parsed = SECTION_SCHEMAS[section].safeParse({ ...defaults, ...stored })
    value = (parsed.success ? parsed.data : defaults) as z.infer<(typeof SECTION_SCHEMAS)[K]>
  } catch {
    value = defaults
  }

  cache.set(section, { value, expiresAt: Date.now() + CACHE_TTL_MS })
  return value
}

export async function saveSettings<K extends SettingsSection>(
  section: K,
  data: unknown,
  userId?: string
): Promise<z.infer<(typeof SECTION_SCHEMAS)[K]>> {
  const parsed = SECTION_SCHEMAS[section].parse(data) as z.infer<(typeof SECTION_SCHEMAS)[K]>

  await prisma.site_settings.upsert({
    where: { key: section },
    create: { key: section, value: parsed as object, updatedBy: userId || null },
    update: { value: parsed as object, updatedBy: userId || null },
  })

  cache.set(section, { value: parsed, expiresAt: Date.now() + CACHE_TTL_MS })
  return parsed
}
