/**
 * Ambient types for @cashfreepayments/cashfree-js (v1.x), which ships without
 * bundled TypeScript declarations. Covers only the checkout surface we use in
 * the enrollment flow (src/app/checkout/page.tsx).
 */
declare module '@cashfreepayments/cashfree-js' {
  export interface CashfreeLoadOptions {
    mode: 'sandbox' | 'production'
  }

  export interface CashfreeCheckoutOptions {
    paymentSessionId: string
    /** '_modal' renders in-page and resolves the promise on close; '_self'/'_blank' redirect. */
    redirectTarget?: '_self' | '_blank' | '_modal'
    returnUrl?: string
  }

  export interface CashfreeCheckoutResult {
    error?: { message?: string; code?: string; type?: string }
    redirect?: boolean
    paymentDetails?: { paymentMessage?: string; [key: string]: unknown }
  }

  export interface CashfreeInstance {
    checkout(options: CashfreeCheckoutOptions): Promise<CashfreeCheckoutResult>
  }

  export function load(options: CashfreeLoadOptions): Promise<CashfreeInstance>
}
