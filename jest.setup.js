import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'
import { ReadableStream } from 'stream/web'

// Polyfill for Next.js Web APIs in tests
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
global.ReadableStream = ReadableStream

// Mock Request and Response for Next.js API routes
if (typeof Request === 'undefined') {
  global.Request = class Request {}
}
if (typeof Response === 'undefined') {
  global.Response = class Response {}
}
if (typeof Headers === 'undefined') {
  global.Headers = class Headers {}
}

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