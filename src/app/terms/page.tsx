import { redirect } from 'next/navigation'

/**
 * Redirect /terms to /terms-of-service
 *
 * Many links across the site use /terms but the actual page is at /terms-of-service.
 * This redirect ensures all links work correctly.
 */
export default function TermsRedirect() {
  redirect('/terms-of-service')
}
