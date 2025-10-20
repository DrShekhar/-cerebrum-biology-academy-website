import { init, id } from '@instantdb/admin'

// Initialize the admin database for server-side usage
// You'll need to get your app ID and admin token from InstantDB dashboard
const APP_ID = process.env.NEXT_PUBLIC_INSTANT_APP_ID as string
const ADMIN_TOKEN = process.env.INSTANT_APP_ADMIN_TOKEN as string

// Only warn in development mode, not during build
if (!APP_ID && process.env.NODE_ENV === 'development') {
  console.warn('NEXT_PUBLIC_INSTANT_APP_ID environment variable is not set. Using demo mode.')
}

if (!ADMIN_TOKEN && process.env.NODE_ENV === 'development') {
  console.warn(
    'INSTANT_APP_ADMIN_TOKEN environment variable is not set. Admin operations will fail.'
  )
}

export const adminDb = init({
  appId: APP_ID || 'demo-app-id',
  adminToken: ADMIN_TOKEN || 'demo-admin-token',
})

// Export utilities
export { id }
