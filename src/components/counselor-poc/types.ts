export type LeadPriority = 'hot' | 'warm' | 'cold'
export type LeadStage =
  | 'new_lead'
  | 'demo_scheduled'
  | 'demo_completed'
  | 'offer_sent'
  | 'payment_plan_created'

export interface Lead {
  id: string
  name: string
  phone: string
  email: string
  course: string
  priority: LeadPriority
  stage: LeadStage
  lastContact: string
  nextFollowUp: string
  source: string
}

export interface StageConfig {
  id: LeadStage
  name: string
  color: string
  bgColor: string
  borderColor: string
}
