import { redirect } from 'next/navigation'

/**
 * /enroll shortcut - Redirects to the canonical /enrollment page.
 * Keeps URLs consistent and consolidates enrollment at one location.
 */
export default function EnrollShortcut() {
  redirect('/enrollment')
}
