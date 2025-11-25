import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'
import { ReadableStream } from 'stream/web'

// Polyfill for Next.js Web APIs in tests
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
global.ReadableStream = ReadableStream

// Proper Headers polyfill for Next.js
class MockHeaders {
  constructor(init) {
    this._headers = new Map()
    if (init) {
      if (init instanceof MockHeaders) {
        init._headers.forEach((v, k) => this._headers.set(k.toLowerCase(), v))
      } else if (Array.isArray(init)) {
        init.forEach(([k, v]) => this._headers.set(k.toLowerCase(), v))
      } else if (typeof init === 'object') {
        Object.entries(init).forEach(([k, v]) => this._headers.set(k.toLowerCase(), v))
      }
    }
  }
  get(name) { return this._headers.get(name.toLowerCase()) || null }
  set(name, value) { this._headers.set(name.toLowerCase(), value) }
  has(name) { return this._headers.has(name.toLowerCase()) }
  delete(name) { this._headers.delete(name.toLowerCase()) }
  append(name, value) {
    const existing = this._headers.get(name.toLowerCase())
    this._headers.set(name.toLowerCase(), existing ? `${existing}, ${value}` : value)
  }
  forEach(cb) { this._headers.forEach((v, k) => cb(v, k, this)) }
  entries() { return this._headers.entries() }
  keys() { return this._headers.keys() }
  values() { return this._headers.values() }
  [Symbol.iterator]() { return this._headers.entries() }
}

global.Headers = MockHeaders

// Mock Request for Next.js API routes
class MockRequest {
  constructor(input, init = {}) {
    this.url = typeof input === 'string' ? input : input?.url || 'http://localhost:3000'
    this.method = init.method || 'GET'
    this.headers = new MockHeaders(init.headers)
    this._body = init.body
    this.bodyUsed = false
  }
  async json() {
    this.bodyUsed = true
    return this._body ? JSON.parse(this._body) : {}
  }
  async text() {
    this.bodyUsed = true
    return this._body || ''
  }
  clone() {
    return new MockRequest(this.url, { method: this.method, headers: this.headers, body: this._body })
  }
}

global.Request = MockRequest

// Mock Response for Next.js API routes
class MockResponse {
  constructor(body, init = {}) {
    this._body = body
    this.status = init.status || 200
    this.statusText = init.statusText || 'OK'
    this.headers = new MockHeaders(init.headers)
    this.ok = this.status >= 200 && this.status < 300
  }
  async json() { return typeof this._body === 'string' ? JSON.parse(this._body) : this._body }
  async text() { return typeof this._body === 'string' ? this._body : JSON.stringify(this._body) }
  clone() { return new MockResponse(this._body, { status: this.status, headers: this.headers }) }
  static json(data, init = {}) {
    return new MockResponse(JSON.stringify(data), {
      ...init,
      headers: { 'content-type': 'application/json', ...init.headers }
    })
  }
}

global.Response = MockResponse

// Mock next/server for API route testing
jest.mock('next/server', () => {
  class MockNextRequest {
    constructor(input, init = {}) {
      this.url = typeof input === 'string' ? input : input?.url || 'http://localhost:3000'
      this.method = init.method || 'GET'
      this.headers = new global.Headers(init.headers)
      this._body = init.body
      this.bodyUsed = false
      this.nextUrl = new URL(this.url)
      this.cookies = {
        get: jest.fn().mockReturnValue(undefined),
        getAll: jest.fn().mockReturnValue([]),
        set: jest.fn(),
        delete: jest.fn(),
        has: jest.fn().mockReturnValue(false),
      }
      this.geo = {}
      this.ip = '127.0.0.1'
    }
    async json() {
      this.bodyUsed = true
      return this._body ? JSON.parse(this._body) : {}
    }
    async text() {
      this.bodyUsed = true
      return this._body || ''
    }
    clone() {
      return new MockNextRequest(this.url, { method: this.method, headers: this.headers, body: this._body })
    }
  }

  class MockNextResponse extends global.Response {
    constructor(body, init = {}) {
      super(body, init)
      this.cookies = {
        get: jest.fn().mockReturnValue(undefined),
        getAll: jest.fn().mockReturnValue([]),
        set: jest.fn(),
        delete: jest.fn(),
      }
    }
    static json(data, init = {}) {
      const response = new MockNextResponse(JSON.stringify(data), {
        ...init,
        headers: { 'content-type': 'application/json', ...(init.headers || {}) }
      })
      response.status = init.status || 200
      return response
    }
    static redirect(url, init) {
      return new MockNextResponse(null, { status: 307, headers: { Location: url } })
    }
    static next(init) {
      return new MockNextResponse(null, init)
    }
  }

  return {
    NextRequest: MockNextRequest,
    NextResponse: MockNextResponse,
  }
})

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      prefetch: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  },
}))

// Mock Next.js dynamic imports
jest.mock('next/dynamic', () => (func) => {
  const DynamicComponent = (props) => {
    const Component = func()
    return <Component {...props} />
  }
  DynamicComponent.displayName = 'DynamicComponent'
  return DynamicComponent
})

// Mock Next.js Image component
jest.mock('next/image', () => {
  const MockedImage = (props) => {
    const { src, alt, ...otherProps } = props
    return <img src={src} alt={alt} {...otherProps} />
  }
  MockedImage.displayName = 'NextImage'
  return MockedImage
})

// Mock NextAuth
jest.mock('next-auth/react', () => ({
  useSession: () => ({ data: null, status: 'unauthenticated' }),
  signIn: jest.fn(),
  signOut: jest.fn(),
  getSession: jest.fn(),
  SessionProvider: ({ children }) => children,
}))

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: (props) => <div {...props} />,
    section: (props) => <section {...props} />,
    article: (props) => <article {...props} />,
    span: (props) => <span {...props} />,
    h1: (props) => <h1 {...props} />,
    h2: (props) => <h2 {...props} />,
    h3: (props) => <h3 {...props} />,
    p: (props) => <p {...props} />,
    button: (props) => <button {...props} />,
    form: (props) => <form {...props} />,
    input: (props) => <input {...props} />,
  },
  AnimatePresence: ({ children }) => children,
}))

// Mock lucide-react icons
jest.mock('lucide-react', () => {
  const MockIcon = (props) => <span {...props} data-testid="mock-icon" />

  return new Proxy({}, {
    get: () => MockIcon,
  })
})

// Mock Toast component
jest.mock('@/components/ui/Toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
    toasts: [],
    dismiss: jest.fn(),
  }),
  ToastProvider: ({ children }) => children,
  Toast: () => null,
  ToastTitle: () => null,
  ToastDescription: () => null,
  ToastClose: () => null,
  ToastViewport: () => null,
}))

// Mock Toaster component
jest.mock('@/components/ui/Toaster', () => ({
  Toaster: () => null,
}))

// Mock environment variables
process.env.NODE_ENV = 'test'
process.env.NEXT_PUBLIC_ENV = 'test'
process.env.AUTH_SECRET = 'test-secret'
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test'

// Mock fetch
global.fetch = jest.fn()

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock matchMedia
global.matchMedia = jest.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}))

// Mock crypto for tests
Object.defineProperty(global, 'crypto', {
  value: {
    getRandomValues: jest.fn().mockImplementation(arr => {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256)
      }
      return arr
    }),
    randomUUID: jest.fn().mockReturnValue('test-uuid-123'),
  },
})

// Suppress console warnings in tests
const originalWarn = console.warn
beforeAll(() => {
  console.warn = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is deprecated')
    ) {
      return
    }
    originalWarn.call(console, ...args)
  }
})

afterAll(() => {
  console.warn = originalWarn
})

// Global test cleanup
afterEach(() => {
  jest.clearAllMocks()
})