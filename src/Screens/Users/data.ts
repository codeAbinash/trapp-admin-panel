export type User = {
  name: string
  email: string | null
  profile_pic?: string | null
  phone: string | null
  country_code: string | null
  created_at?: string
  id: number
  status?: 'banned' | 'regular'
  subscription?: 'active' | 'expired' | 'hold' | 'regular'
}

// Generated by https://quicktype.io

export interface Creator {
  id: number
  channel_name: string
  name: string
  email: string
  phone_number: string
  channel_logo: string
  status?: 'banned' | 'regular'
}
