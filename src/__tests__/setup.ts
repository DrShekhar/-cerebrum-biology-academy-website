import '@testing-library/jest-dom'

// Add custom matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveClass(className: string): R
    }
  }
}

// Mock next-auth/react
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: null,
    status: 'unauthenticated',
  })),
  signIn: jest.fn(),
  signOut: jest.fn(),
  SessionProvider: ({ children }: { children: React.ReactNode }) => children,
}))
