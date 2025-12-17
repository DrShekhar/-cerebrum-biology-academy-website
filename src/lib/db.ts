// Define your database schema
export interface User {
  id: string
  email: string
  name: string
  phone?: string
  createdAt: number
  grade?: string // Student's grade/class
  role?: 'STUDENT' | 'PARENT' | 'TEACHER' | 'ADMIN' | 'COUNSELOR'
  profile?: {
    class?: '11th' | '12th' | 'Dropper'
    targetYear?: string
    interestedCourses?: string[]
    location?: string
  }
  enrollments?: Array<{
    id: string
    courseId: string
    status: string
    enrollmentDate: number
  }>
}

export interface DemoBooking {
  id: string
  userId: string
  courseId: string
  studentName: string
  email: string
  phone: string
  preferredDate: string
  preferredTime: string
  message?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt: number
}

export interface Enrollment {
  id: string
  userId: string
  courseId: string
  studentName: string
  email: string
  phone: string
  paymentStatus: 'pending' | 'paid' | 'failed'
  enrollmentDate: number
  courseStartDate: string
  batchAssigned?: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string
  course: string
  message?: string
  preferredTime?: string
  status: 'new' | 'contacted' | 'converted'
  createdAt: number
}

export interface MarketingLead {
  id: string
  name: string
  email: string
  phone: string
  source: string
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
  createdAt: number
  updatedAt: number
}

// Validate that APP_ID is a valid UUID format
// InstantDB requires a valid UUID, not a placeholder string
const isValidUuid = (str: string) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return str && uuidRegex.test(str)
}

// Mock db object for SSR and when InstantDB is not configured
const mockDb = {
  useAuth: () => ({ user: null, isLoading: false, error: null }),
  auth: null,
  transact: () => Promise.resolve(),
  useQuery: () => ({ data: null, isLoading: false, error: null }),
}

// PERFORMANCE: Use dynamic import() for proper code-splitting
// This creates a separate chunk for InstantDB that only loads when needed
let _db: any = null
let _dbPromise: Promise<any> | null = null

async function loadInstantDB() {
  if (_db) return _db
  if (_dbPromise) return _dbPromise

  const rawAppId = process.env.NEXT_PUBLIC_INSTANT_APP_ID as string
  const APP_ID = isValidUuid(rawAppId) ? rawAppId : undefined

  if (!APP_ID) {
    _db = mockDb
    return _db
  }

  _dbPromise = import('@instantdb/react')
    .then(({ init }) => {
      _db = init({ appId: APP_ID })
      return _db
    })
    .catch((e) => {
      console.error('Failed to initialize InstantDB:', e)
      _db = mockDb
      return _db
    })

  return _dbPromise
}

// Synchronous access for components - returns mock until loaded
export const db: any = new Proxy(mockDb, {
  get(target, prop) {
    // Only initialize on client side
    if (typeof window !== 'undefined' && !_db && !_dbPromise) {
      loadInstantDB()
    }

    // Return from initialized db if available, otherwise from mock
    const source = _db || target
    const value = source[prop]
    return typeof value === 'function' ? value.bind(source) : value
  },
})

// Async getter for when you need to ensure DB is loaded
export const getDb = () => {
  if (typeof window === 'undefined') return Promise.resolve(mockDb)
  return loadInstantDB()
}

// Export utilities - dynamically loaded via import()
let _tx: any = null
let _id: any = null

// Create proxy functions that lazily load from @instantdb/react
export const tx = new Proxy(
  {},
  {
    get(target, prop) {
      if (typeof window !== 'undefined' && !_tx) {
        import('@instantdb/react')
          .then((mod) => {
            _tx = mod.tx
          })
          .catch(() => {
            _tx = {}
          })
      }
      return _tx?.[prop]
    },
  }
)

export const id = () => {
  if (typeof window !== 'undefined' && !_id) {
    import('@instantdb/react')
      .then((mod) => {
        _id = mod.id
      })
      .catch(() => {
        _id = () => `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      })
  }
  return _id ? _id() : `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
