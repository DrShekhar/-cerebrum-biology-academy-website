export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface ApiError {
  success: false
  error: string
  message?: string
  statusCode?: number
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    total: number
    page: number
    pageSize: number
    hasMore: boolean
    totalPages: number
  }
  error?: string
}

export interface PaginationParams {
  page?: number
  limit?: number
  offset?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface SearchParams extends PaginationParams {
  query?: string
  search?: string
  filters?: Record<string, unknown>
}

export interface FilterParams {
  dateFrom?: Date | string
  dateTo?: Date | string
  status?: string
  category?: string
  tags?: string[]
}

export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface ApiRequestConfig {
  method: ApiMethod
  headers?: Record<string, string>
  body?: unknown
  cache?: RequestCache
  revalidate?: number | false
}

export interface ApiHandlerOptions {
  requireAuth?: boolean
  allowedRoles?: string[]
  rateLimit?: {
    maxRequests: number
    windowMs: number
  }
}

export interface WebhookPayload<T = unknown> {
  event: string
  data: T
  timestamp: number
  signature?: string
}

export interface BulkOperationResponse<T = unknown> {
  success: boolean
  processed: number
  failed: number
  errors?: Array<{
    index: number
    error: string
  }>
  data?: T[]
}

export interface ValidationError {
  field: string
  message: string
  value?: unknown
}

export interface ApiValidationError extends ApiError {
  validationErrors: ValidationError[]
}
