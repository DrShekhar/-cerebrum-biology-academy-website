import { redirect } from 'next/navigation'

// The four payments pages were near-identical copies; the unified page at
// /admin/payments handles every status via the ?status= filter.
export default function FailedPaymentsPage() {
  redirect('/admin/payments?status=failed')
}
