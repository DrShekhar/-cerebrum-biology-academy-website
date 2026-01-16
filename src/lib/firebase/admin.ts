import * as admin from 'firebase-admin'

let adminApp: admin.app.App | null = null

/**
 * Get Firebase Admin SDK instance (singleton pattern)
 * Used for server-side token verification in API routes
 */
export async function getFirebaseAdmin(): Promise<admin.app.App> {
  if (adminApp) {
    return adminApp
  }

  // Check if already initialized
  if (admin.apps.length > 0) {
    adminApp = admin.apps[0]!
    return adminApp
  }

  // Get service account credentials from environment
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON

  if (serviceAccountJson) {
    try {
      const serviceAccount = JSON.parse(serviceAccountJson)
      adminApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: serviceAccount.project_id,
      })
    } catch (error) {
      console.error('Error parsing Firebase service account:', error)
      throw new Error('Invalid Firebase service account JSON')
    }
  } else if (
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
  ) {
    // Use individual env vars (Vercel format with escaped newlines)
    adminApp = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
      projectId: process.env.FIREBASE_PROJECT_ID,
    })
  } else {
    // Use application default credentials (for local dev with gcloud auth)
    adminApp = admin.initializeApp({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    })
  }

  return adminApp
}

/**
 * Verify a Firebase ID token from client
 * Returns decoded token with user info (uid, phone_number, email)
 */
export async function verifyIdToken(token: string): Promise<admin.auth.DecodedIdToken> {
  const app = await getFirebaseAdmin()
  return app.auth().verifyIdToken(token)
}

/**
 * Get Firebase Auth instance for user management
 */
export async function getFirebaseAuth(): Promise<admin.auth.Auth> {
  const app = await getFirebaseAdmin()
  return app.auth()
}
