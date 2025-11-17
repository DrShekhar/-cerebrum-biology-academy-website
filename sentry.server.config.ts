import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // Adjust this value in production to reduce costs
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Environment configuration
  environment: process.env.NEXT_PUBLIC_ENV || process.env.NODE_ENV,

  // Ignore common errors
  ignoreErrors: [
    'ECONNREFUSED',
    'ENOTFOUND',
    'ETIMEDOUT',
  ],

  // Set sample rate for capturing errors
  beforeSend(event, hint) {
    // Filter out errors from development
    if (process.env.NODE_ENV === 'development') {
      return null
    }

    // Scrub sensitive data from event
    if (event.request?.headers) {
      delete event.request.headers.authorization
      delete event.request.headers.cookie
    }

    if (event.request?.cookies) {
      delete event.request.cookies
    }

    // Don't send errors that contain sensitive information
    const error = hint.originalException
    if (error && typeof error === 'object' && 'message' in error) {
      const message = String(error.message).toLowerCase()
      if (
        message.includes('password') ||
        message.includes('token') ||
        message.includes('secret') ||
        message.includes('api key')
      ) {
        return null
      }
    }

    return event
  },
})
