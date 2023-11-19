export type User = {
  name: string
  email: string | null
  profile_pic?: string | null
  phone: string | null
  country_code: string | null
  created_at?: string
  id: number
  status?: 'banned' | 'regular'
  subscription?: 'expired' | 'active' | 'trial'
}
export const data: User[] = [
  {
    id: 1,
    email: 'ken99@yahoo.com',
    name: 'Ken Wheeler',
    phone: '9876543210',
    country_code: '+91',
    status: 'regular',
    profile_pic: null,
    subscription: 'expired',
  },
  {
    id: 2,
    status: 'banned',
    name: 'Ken Wheeler',
    country_code: '+91',
    email: 'Abe45@gmail.com',
    phone: '9876543210',
    subscription: 'active',
  },
  {
    id: 3,
    status: 'regular',
    email: 'Monserrat44@gmail.com',
    name: 'Ken Wheeler',
    country_code: '+91',
    phone: '9876543210',
    subscription: 'trial',
  },
  {
    id: 4,
    status: 'regular',
    country_code: '+91',
    name: 'Ken Wheeler',
    email: 'Silas22@gmail.com',
    phone: '9876543210',
    subscription: 'active',
  },
  {
    id: 5,
    status: 'regular',
    country_code: '+91',
    email: 'carmella@hotmail.com',
    name: 'Ken Wheeler',
    phone: '9876543210',
    subscription: 'expired',
  },
  {
    id: 6,
    status: 'banned',
    email: 'ken99@yahoo.com',
    name: 'Ken Wheeler',
    phone: '9876543210',
    country_code: '+91',
    subscription: 'trial',
  },
  {
    id: 7,
    email: 'ken99@yahoo.com',
    name: 'Ken Wheeler',
    phone: '9876543210',
    country_code: '+91',
    status: 'regular',
    profile_pic: null,
    subscription: 'expired',
  },
  {
    id: 8,
    status: 'banned',
    name: 'Ken Wheeler',
    email: 'Abe45@gmail.com',
    country_code: '+91',
    phone: '9876543210',
    subscription: 'active',
  },
  {
    id: 9,
    status: 'regular',
    email: 'Monserrat44@gmail.com',
    name: 'Ken Wheeler',
    phone: '9876543210',
    country_code: '+91',
    subscription: 'trial',
  },
  {
    id: 10,
    status: 'regular',
    name: 'Ken Wheeler',
    country_code: '+91',
    email: 'Silas22@gmail.com',
    phone: '+91 9876543210',
    subscription: 'active',
  },
]
