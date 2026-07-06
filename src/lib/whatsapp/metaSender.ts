/**
 * Direct Meta (WhatsApp Cloud API) sender — W5 of the endpoint plan.
 *
 * Replaces the Interakt middleman: src/lib/interakt.ts routes its two core
 * send functions here automatically whenever WHATSAPP_ACCESS_TOKEN +
 * WHATSAPP_PHONE_NUMBER_ID are configured, so ALL ~20 send helpers
 * (OTP, demo confirmations, payment reminders, drips, campaigns) migrate to
 * the direct API the moment the owner adds the two Vercel env vars — zero
 * further code changes.
 *
 * Return shape matches the Interakt lib's InteraktResponse so callers are
 * agnostic to which provider actually sent the message.
 */

import { logger } from '@/lib/logger'

const GRAPH_VERSION = 'v21.0'

export interface MetaSendResult {
  success: boolean
  messageId?: string
  error?: string
  rawResponse?: unknown
}

export function isMetaWhatsAppConfigured(): boolean {
  return Boolean(process.env.WHATSAPP_ACCESS_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID)
}

/** E.164 digits without '+', as Meta expects ("919876543210"). */
export function toMetaRecipient(countryCode: string, phoneNumber: string): string {
  return `${countryCode.replace(/\D/g, '')}${phoneNumber.replace(/\D/g, '')}`
}

async function graphSend(payload: Record<string, unknown>): Promise<MetaSendResult> {
  const token = process.env.WHATSAPP_ACCESS_TOKEN
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
  if (!token || !phoneNumberId) {
    return { success: false, error: 'Meta WhatsApp Cloud API not configured' }
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messaging_product: 'whatsapp', ...payload }),
      }
    )
    const data = await res.json()

    if (!res.ok) {
      logger.error('Meta WhatsApp send failed', {
        service: 'meta-whatsapp',
        statusCode: res.status,
        error: data?.error,
      })
      return {
        success: false,
        error: data?.error?.message || `Meta API error (${res.status})`,
        rawResponse: data,
      }
    }

    return {
      success: true,
      messageId: data?.messages?.[0]?.id,
      rawResponse: data,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Meta WhatsApp request failed',
    }
  }
}

/** Free-form text (only works inside the 24h customer-service window). */
export async function sendMetaText(to: string, body: string): Promise<MetaSendResult> {
  return graphSend({
    to,
    type: 'text',
    text: { body, preview_url: true },
  })
}

/** Media message (image/video/document/audio) with optional caption. */
export async function sendMetaMedia(
  to: string,
  mediaType: 'image' | 'video' | 'document' | 'audio',
  link: string,
  caption?: string
): Promise<MetaSendResult> {
  const media: Record<string, unknown> = { link }
  if (caption && mediaType !== 'audio') media.caption = caption
  return graphSend({ to, type: mediaType, [mediaType]: media })
}

/**
 * Template message. bodyValues map positionally to {{1}}, {{2}}… in the
 * template body; headerValues to the header; buttonValues (index → url param)
 * to dynamic URL buttons. Templates must be approved under the SAME names in
 * WhatsApp Manager for the switchover from Interakt to be seamless.
 */
export async function sendMetaTemplate(params: {
  to: string
  templateName: string
  languageCode?: string
  bodyValues?: string[]
  headerValues?: string[]
  buttonValues?: Record<string, string>
}): Promise<MetaSendResult> {
  const components: Record<string, unknown>[] = []

  if (params.headerValues && params.headerValues.length > 0) {
    components.push({
      type: 'header',
      parameters: params.headerValues.map((text) => ({ type: 'text', text })),
    })
  }

  if (params.bodyValues && params.bodyValues.length > 0) {
    components.push({
      type: 'body',
      parameters: params.bodyValues.map((text) => ({ type: 'text', text })),
    })
  }

  if (params.buttonValues) {
    for (const [index, value] of Object.entries(params.buttonValues)) {
      components.push({
        type: 'button',
        sub_type: 'url',
        index,
        parameters: [{ type: 'text', text: value }],
      })
    }
  }

  return graphSend({
    to: params.to,
    type: 'template',
    template: {
      name: params.templateName,
      language: { code: params.languageCode || 'en' },
      ...(components.length > 0 ? { components } : {}),
    },
  })
}
