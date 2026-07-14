import { Mail } from 'lucide-react'

/** Where US email enquiries go. Single source of truth for the mailto target. */
export const ENQUIRY_EMAIL = 'shekharcsingh57@gmail.com'

interface EmailEnquiryButtonProps {
  /** Pre-filled email subject line. */
  subject: string
  /** Pre-filled email body. */
  body: string
  /** Button text (default "Email us"). */
  label?: string
  /** Style override; falls back to a white-outline secondary button. */
  className?: string
}

/**
 * Secondary "Email us" CTA.
 *
 * Opens the visitor's mail client (mailto:) with a pre-filled subject + body —
 * mirroring how the WhatsApp CTA opens WhatsApp. Many US families don't use
 * WhatsApp, so this gives them a familiar one-tap contact path alongside it.
 * WhatsApp stays the PRIMARY CTA; this sits beside it as the secondary option.
 *
 * Plain anchor — no JS, works in server and client components. The
 * data-cta attribute lets GTM track mailto clicks as an outbound conversion.
 */
export function EmailEnquiryButton({
  subject,
  body,
  label = 'Email us',
  className,
}: EmailEnquiryButtonProps) {
  const href = `mailto:${ENQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  return (
    <a
      href={href}
      data-cta="email-enquiry"
      className={
        className ??
        'inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10'
      }
    >
      <Mail className="h-5 w-5" />
      {label}
    </a>
  )
}
