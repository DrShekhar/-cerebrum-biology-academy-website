import { notFound } from 'next/navigation'

// This catch-all route triggers 404 for all invalid paths
export default function NotFoundCatchAll() {
  notFound()
}
