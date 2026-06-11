'use client'

/**
 * /admin/inquiries — unified view of the two lead tables that previously had
 * no admin surface (contact_inquiries + content_leads). Read-only on purpose:
 * the goal is that no captured lead ever rots unseen again.
 */

import { useCallback, useEffect, useState } from 'react'
import { MessageCircle, Phone, RefreshCw } from 'lucide-react'

interface ContactInquiry {
  id: string
  name: string
  email: string
  phone: string
  supportType: string
  message: string
  source: string
  status: string
  priority: string
  createdAt: string
}

interface ContentLead {
  id: string
  name: string | null
  email: string | null
  whatsappNumber: string | null
  source: string
  grade: string | null
  interestedIn: string | null
  landingPage: string | null
  country: string | null
  createdAt: string
}

function dialNumber(phone: string | null): string | null {
  if (!phone) return null
  const digits = phone.replace(/\D/g, '')
  if (!digits) return null
  return digits.length === 10 ? `91${digits}` : digits
}

function PhoneActions({ phone }: { phone: string | null }) {
  const dial = dialNumber(phone)
  if (!dial) return <span className="text-gray-400">—</span>
  return (
    <span className="flex items-center gap-2 whitespace-nowrap">
      <span className="font-medium">{phone}</span>
      <a
        href={`https://wa.me/${dial}`}
        target="_blank"
        rel="noopener noreferrer"
        title="WhatsApp"
        className="text-green-600 hover:text-green-700"
      >
        <MessageCircle className="h-4 w-4" />
      </a>
      <a href={`tel:+${dial}`} title="Call" className="text-blue-600 hover:text-blue-700">
        <Phone className="h-4 w-4" />
      </a>
    </span>
  )
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([])
  const [leads, setLeads] = useState<ContentLead[]>([])
  const [days, setDays] = useState(30)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/inquiries?days=${days}`)
      const json = await res.json()
      if (!res.ok || !json.success) {
        setError(json.error || 'Failed to load inquiries')
        return
      }
      setInquiries(json.data.contactInquiries)
      setLeads(json.data.contentLeads)
    } catch {
      setError('Failed to load inquiries')
    } finally {
      setLoading(false)
    }
  }, [days])

  useEffect(() => {
    void load()
  }, [load])

  const fmt = (iso: string) =>
    new Date(iso).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inquiries &amp; Enquiry Leads</h1>
          <p className="text-sm text-gray-600 mt-1">
            Contact inquiries (ARIA, chatbot, contact form, olympiad form) and enquiry leads (city
            pages, demo landing, lead magnets)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
            <option value={365}>Last year</option>
          </select>
          <button
            type="button"
            onClick={() => void load()}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Contact Inquiries <span className="text-gray-400 font-normal">({inquiries.length})</span>
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3">When</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {inquiries.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                    {loading ? 'Loading…' : 'No contact inquiries in this period'}
                  </td>
                </tr>
              )}
              {inquiries.map((q) => (
                <tr key={q.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-gray-500">{fmt(q.createdAt)}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {q.name}
                    {q.email && <div className="text-xs text-gray-500">{q.email}</div>}
                  </td>
                  <td className="px-4 py-3">
                    <PhoneActions phone={q.phone} />
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs">
                      {q.supportType}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{q.source}</td>
                  <td className="px-4 py-3 max-w-md">
                    <div className="line-clamp-3 text-gray-700">{q.message}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Enquiry Leads <span className="text-gray-400 font-normal">({leads.length})</span>
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3">When</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">WhatsApp</th>
                <th className="px-4 py-3">Interest</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Landing page</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                    {loading ? 'Loading…' : 'No enquiry leads in this period'}
                  </td>
                </tr>
              )}
              {leads.map((l) => (
                <tr key={l.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-gray-500">{fmt(l.createdAt)}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {l.name || '—'}
                    {l.email && <div className="text-xs text-gray-500">{l.email}</div>}
                    {l.country && <div className="text-xs text-gray-400">{l.country}</div>}
                  </td>
                  <td className="px-4 py-3">
                    <PhoneActions phone={l.whatsappNumber} />
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <div className="line-clamp-2 text-gray-700">
                      {[l.grade, l.interestedIn].filter(Boolean).join(' · ') || '—'}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{l.source}</td>
                  <td className="px-4 py-3 max-w-xs truncate text-gray-500">
                    {l.landingPage || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
