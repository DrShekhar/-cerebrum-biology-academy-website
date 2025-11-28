import { init, id } from '@instantdb/admin'

// Initialize the admin database for server-side usage
// You'll need to get your app ID and admin token from InstantDB dashboard
const APP_ID = process.env.NEXT_PUBLIC_INSTANT_APP_ID as string
const ADMIN_TOKEN = process.env.INSTANT_APP_ADMIN_TOKEN as string

// Only log warnings in development mode to keep build output clean
if (process.env.NODE_ENV === 'development') {
  if (!APP_ID) {
    console.info('InstantDB Admin: APP_ID not configured. Using fallback mode.')
  }
  if (!ADMIN_TOKEN) {
    console.info('InstantDB Admin: ADMIN_TOKEN not configured. Admin operations will use fallback.')
  }
}

export const adminDb = init({
  appId: APP_ID || 'demo-app-id',
  adminToken: ADMIN_TOKEN || 'demo-admin-token',
})

// Export utilities
export { id }
