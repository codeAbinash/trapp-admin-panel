import ls from '@/lib/ls'
import { UserProfile } from '@/lib/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export function getProfileInfoLs(): UserProfile {
  return JSON.parse(ls.get('userProfile') || 'null')
}

export function setProfileInfoLs(data: UserProfile): void {
  ls.set('userProfile', JSON.stringify(data))
}

const initialState: UserProfile = getProfileInfoLs()

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (_, action: PayloadAction<UserProfile>) => {
      return action.payload
    },
  },
})

export const { setProfile } = profileSlice.actions

export default profileSlice.reducer
