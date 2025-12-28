export const RESULTS_PER_PAGE = 12
export const MAX_COMPARE = 3
export const MAX_SEARCH_RESULTS = 10

export const CATEGORIES = [
  { value: 'general', label: 'General' },
  { value: 'ews', label: 'EWS' },
  { value: 'obc', label: 'OBC' },
  { value: 'sc', label: 'SC' },
  { value: 'st', label: 'ST' },
] as const

export const COLLEGE_TYPES = [
  { value: 'All', label: 'All Types' },
  { value: 'Government', label: 'Government' },
  { value: 'Private/Deemed', label: 'Private/Deemed' },
] as const

export const FEE_RANGES = [
  { value: 'All', label: 'All Fees' },
  { value: 'low', label: 'Under ₹1 Lakh' },
  { value: 'medium', label: '₹1L - ₹15L' },
  { value: 'high', label: 'Above ₹15L' },
] as const

export const SORT_OPTIONS = [
  { value: 'cutoff', label: 'Best Match (Cutoff)' },
  { value: 'fees', label: 'Lowest Fees' },
  { value: 'tier', label: 'Top Tier' },
  { value: 'seats', label: 'Most Seats' },
] as const

export const QUOTA_PREFERENCES = [
  { value: 'all', label: 'Both AIQ & State' },
  { value: 'aiq', label: 'AIQ Only' },
  { value: 'state', label: 'State Only' },
] as const
