export interface College {
  name: string
  state: string
  type: 'Government' | 'Private/Deemed'
  quotaType: 'AIQ_Only' | 'AIQ_State' | 'Deemed'
  tier: 1 | 2 | 3
  totalSeats: number
  aiqSeats: number
  stateSeats: number
  nirfRank: number | null
  aiqCutoffs: {
    general: number
    ews: number
    obc: number
    sc: number
    st: number
    general_pwd: number
    ews_pwd: number
    obc_pwd: number
    sc_pwd: number
    st_pwd: number
  }
  stateCutoffs: {
    general: number
    ews: number
    obc: number
    sc: number
    st: number
    general_pwd: number
    ews_pwd: number
    obc_pwd: number
    sc_pwd: number
    st_pwd: number
  } | null
  fees: number
  feeDisplay: string
}

export type SortOption = 'cutoff' | 'fees' | 'tier' | 'seats'
export type QuotaPreference = 'all' | 'aiq' | 'state'
export type InputMode = 'rank' | 'marks'
export type SearchMode = 'rank' | 'college'

export interface ToastState {
  show: boolean
  message: string
  count: number
}

export interface CollegeResult {
  college: College
  quotaType: 'AIQ' | 'State'
  cutoff: number
  pwdCutoff: number
  seats: number
}

export interface ChanceLevel {
  level: 'High' | 'Medium' | 'Low' | 'Very Low'
  color: string
}

export interface CounsellingPrediction {
  round: string
  confidence: string
  color: string
}
