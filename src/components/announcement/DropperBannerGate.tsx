'use client'

/**
 * DropperBannerGate — shows the NEET 2027 Dropper Batch banner ONLY on
 * NEET-related pages (NEET coaching/dropper pages + the India homepage), not on
 * the international / AP / IB / A-Level / MCAT / USABO / portal pages where a
 * NEET dropper batch is irrelevant.
 */

import { usePathname } from 'next/navigation'
import { DropperBatchBanner } from './DropperBatchBanner'

// Paths where the NEET dropper banner is relevant.
function isNeetRelated(pathname: string): boolean {
  if (pathname === '/') return true // India NEET homepage
  const p = pathname.toLowerCase()
  // Exclude portal/app areas explicitly.
  if (/^\/(admin|counselor|teacher|student|dashboard|portal|api)/.test(p)) return false
  return p.includes('neet') || p.includes('dropper') || p.includes('re-neet')
}

export function DropperBannerGate() {
  const pathname = usePathname() || ''
  if (!isNeetRelated(pathname)) return null
  return <DropperBatchBanner />
}
