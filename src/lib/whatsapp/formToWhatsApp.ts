/**
 * Opens WhatsApp with pre-filled form data so the user sends it to admin.
 * No API needed — the user initiates the conversation.
 */

const ADMIN_WHATSAPP = '918826444334'

export function openWhatsAppWithFormData(
  formName: string,
  data: Record<string, string | number | boolean | null | undefined>
) {
  const lines: string[] = [`Hi! I just submitted the *${formName}* form on your website.`, '']

  for (const [key, value] of Object.entries(data)) {
    if (value === null || value === undefined || value === '') continue
    lines.push(`*${key}:* ${String(value)}`)
  }

  lines.push('', 'Please get back to me. Thank you!')

  const message = lines.join('\n')
  const url = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`

  window.open(url, '_blank', 'noopener')
}
