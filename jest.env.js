// Environment variables for testing
process.env.NODE_ENV = 'test'
process.env.NEXT_PUBLIC_ENV = 'test'
process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000'
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3000/api'

// Auth configuration
process.env.AUTH_SECRET = 'test-secret-key-for-jest-tests'
process.env.AUTH_URL = 'http://localhost:3000'
process.env.ADMIN_EMAIL = 'admin@test.com'
process.env.ADMIN_PASSWORD_HASH = '$2a$12$test.hash'

// Database configuration
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/cerebrum_test'

// Disable external services in tests
process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = ''
process.env.NEXT_PUBLIC_GTM_ID = ''
process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID = ''

// Mock API keys for testing
process.env.NEXT_PUBLIC_INSTANT_APP_ID = 'test-instant-db-id'

// Mock Razorpay for payment tests
process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID = 'rzp_test_key'
process.env.RAZORPAY_KEY_SECRET = 'test_secret_key'

// Mock WhatsApp API
process.env.WHATSAPP_API_URL = 'https://graph.facebook.com/v17.0'
process.env.WHATSAPP_ACCESS_TOKEN = 'test_whatsapp_token'