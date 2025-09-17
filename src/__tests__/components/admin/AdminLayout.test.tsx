import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { useSession } from 'next-auth/react'
import { AdminLayout } from '@/components/admin/AdminLayout'

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}))

const { useSession } = require('next-auth/react')
const mockUseSession = useSession as jest.MockedFunction<typeof useSession>

// Mock next/navigation
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => '/admin',
}))

describe('AdminLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shows loading state while session is loading', () => {
    mockUseSession.mockReturnValue({
      status: 'loading',
      data: null,
      update: jest.fn(),
    })

    render(
      <AdminLayout>
        <div>Test Content</div>
      </AdminLayout>
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument()
  })

  it('redirects to login when user is unauthenticated', async () => {
    mockUseSession.mockReturnValue({
      status: 'unauthenticated',
      data: null,
      update: jest.fn(),
    })

    render(
      <AdminLayout>
        <div>Test Content</div>
      </AdminLayout>
    )

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/admin/login')
    })
  })

  it('redirects to login when user does not have admin role', async () => {
    mockUseSession.mockReturnValue({
      status: 'authenticated',
      data: {
        user: {
          id: 'user-1',
          email: 'user@example.com',
          name: 'Regular User',
          role: 'student',
        },
        expires: '2024-12-31',
      },
      update: jest.fn(),
    })

    render(
      <AdminLayout>
        <div>Test Content</div>
      </AdminLayout>
    )

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/admin/login')
    })
  })

  it('renders content when user is authenticated admin', () => {
    mockUseSession.mockReturnValue({
      status: 'authenticated',
      data: {
        user: {
          id: 'admin-1',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'admin',
        },
        expires: '2024-12-31',
      },
      update: jest.fn(),
    })

    render(
      <AdminLayout>
        <div>Test Content</div>
      </AdminLayout>
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()
    expect(screen.getByText('Admin User')).toBeInTheDocument()
    expect(screen.getByText('admin@example.com')).toBeInTheDocument()
  })

  it('displays navigation menu', () => {
    mockUseSession.mockReturnValue({
      status: 'authenticated',
      data: {
        user: {
          id: 'admin-1',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'admin',
        },
        expires: '2024-12-31',
      },
      update: jest.fn(),
    })

    render(
      <AdminLayout>
        <div>Test Content</div>
      </AdminLayout>
    )

    // Check for navigation items
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Demo Bookings')).toBeInTheDocument()
    expect(screen.getByText('Students')).toBeInTheDocument()
    expect(screen.getByText('Courses')).toBeInTheDocument()
    expect(screen.getByText('Payments')).toBeInTheDocument()
    expect(screen.getByText('Marketing')).toBeInTheDocument()
    expect(screen.getByText('Analytics')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('shows Cerebrum branding', () => {
    mockUseSession.mockReturnValue({
      status: 'authenticated',
      data: {
        user: {
          id: 'admin-1',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'admin',
        },
        expires: '2024-12-31',
      },
      update: jest.fn(),
    })

    render(
      <AdminLayout>
        <div>Test Content</div>
      </AdminLayout>
    )

    expect(screen.getByText('Cerebrum')).toBeInTheDocument()
    expect(screen.getByText('Admin Panel')).toBeInTheDocument()
  })

  it('displays real-time indicators', () => {
    mockUseSession.mockReturnValue({
      status: 'authenticated',
      data: {
        user: {
          id: 'admin-1',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'admin',
        },
        expires: '2024-12-31',
      },
      update: jest.fn(),
    })

    render(
      <AdminLayout>
        <div>Test Content</div>
      </AdminLayout>
    )

    expect(screen.getByText('Live')).toBeInTheDocument()
    expect(screen.getByText('12 online')).toBeInTheDocument()
  })

  it('has search functionality', () => {
    mockUseSession.mockReturnValue({
      status: 'authenticated',
      data: {
        user: {
          id: 'admin-1',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'admin',
        },
        expires: '2024-12-31',
      },
      update: jest.fn(),
    })

    render(
      <AdminLayout>
        <div>Test Content</div>
      </AdminLayout>
    )

    const searchInput = screen.getByPlaceholderText(/search students, bookings, payments/i)
    expect(searchInput).toBeInTheDocument()
  })

  it('shows notification bell with badge', () => {
    mockUseSession.mockReturnValue({
      status: 'authenticated',
      data: {
        user: {
          id: 'admin-1',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'admin',
        },
        expires: '2024-12-31',
      },
      update: jest.fn(),
    })

    render(
      <AdminLayout>
        <div>Test Content</div>
      </AdminLayout>
    )

    // Check for notification badge
    const notificationBadge = screen.getByText('3')
    expect(notificationBadge).toBeInTheDocument()
  })
})
