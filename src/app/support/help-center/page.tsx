import { redirect } from 'next/navigation'

/**
 * Redirect /support/help-center to /help
 *
 * Navigation config references /support/help-center but the help page exists at /help.
 * This redirect ensures users reach the correct page.
 */
export default function HelpCenterRedirect() {
  redirect('/help')
}
