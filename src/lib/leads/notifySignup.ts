import { upsertLead } from './upsertLead'

interface SignupInfo {
  name?: string | null
  email?: string | null
  phone?: string | null
  source: string
}

/**
 * Fire-and-forget: pull every new account signup into the CRM so a
 * counselor/admission-incharge owns the relationship from day one.
 *
 * - With a phone number → upsertLead: dedup by phone, round-robin counselor
 *   assignment, welcome activity + follow-up task (same pipeline as enquiry
 *   forms).
 * - Without a phone (some OAuth signups) → upsertLead would be keyed on
 *   nothing, so we skip the CRM write; the lead is picked up when the user
 *   later shares a phone anywhere on the site.
 *
 * Never throws and never blocks the signup path.
 */
export function notifySignupToCrm(info: SignupInfo): void {
  if (!info.phone || info.phone.replace(/\D/g, '').length < 8) return
  void upsertLead({
    phone: info.phone,
    name: info.name ?? undefined,
    email: info.email ?? undefined,
    source: info.source,
    courseInterest: 'New account signup',
  }).catch(() => {
    // swallow — CRM capture must never break auth
  })
}
