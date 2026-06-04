import { Inngest } from 'inngest'

/**
 * CRM event names emitted by application code. Kept as a string union
 * here; full Inngest v4 typed schemas are deferred until we have a
 * second or third event and a clear pattern.
 *
 * Naming convention: `<domain>/<action>` — e.g. lead/enrolled,
 * payment/link.paid.
 */
export type CRMEventName = 'lead/enrolled' | 'payment/link.created'

export const inngest = new Inngest({
  id: 'cerebrum-crm',
})
