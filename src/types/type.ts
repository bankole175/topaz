export interface LoginT {
  email: String
  password: String
}

export interface LoginResponseT {
  data: UserT
  message: string
  success: string
}

export interface UserT {
  email: string
  first_name: string
  id: string
  is_super_admin: string
  last_name: string
  nickname: string
  profile_image: string
  token: string
}

export interface Address {
  city: string
  state: string
  country: string
  code: string
}

export interface Coordinates {
  type: string
  coordinates: string[]
}

export interface Geom {
  type: string
  coordinates: number[]
}

export interface DealLead {
  id: string
  first_name: string
  last_name: string
  email: string
  password: string
  profile_image: string
  nickname: string
  created_at: string
  updated_at: string
}

export interface CompanyT {
  id: string
  user_id: string
  company_name: string
  website: string
  year_founded: string
  formatted_address: string
  address: Address
  coordinates: Coordinates
  geom: Geom
  pitch_deck: string
  logo: string
  industry_type: string
  business_model: string
  funding_round: string
  funding_type: string
  min_amount: string
  max_amount: string
  current_stage: string
  can_proceed: boolean
  next_stage: string
  last_interaction_at: string
  stage_status: string
  company_summary: string
  rejection_reason?: any
  created_at: string
  updated_at: string
  deal_lead: DealLead
  collections: any[]
}

export interface KanbanRecordT {
  label: string
  companies: CompanyT[]
}
