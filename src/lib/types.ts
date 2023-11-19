export type UserProfile = {
  id: number
  name: string
  email: string
  profile_pic: string
} | null

export type DashboardCounts = {
  users: number
  creators: number
  videos: number
  live: number
} | null
