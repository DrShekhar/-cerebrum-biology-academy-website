import { ZodError } from 'zod'

export function formatZodErrors(error: ZodError) {
  return {
    errors: error.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    })),
  }
}

export function getZodErrorMessages(error: ZodError): string[] {
  return error.issues.map((issue) => issue.message)
}

export function getFirstZodError(error: ZodError): string {
  return error.issues[0]?.message || 'Validation failed'
}
