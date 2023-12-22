import { app } from '../constants'
import ls from './ls'

const API_URL = app.api

type defaultHeaders = {
  'Content-Type': 'application/json'
  Accept: 'application/json'
}
export const defaultHeaders: defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

type formDataHeaders = {
  ContentType: 'multipart/form-data'
  Accept: 'application/json'
  accept: 'application/json'
  //   secret: string
}
export const formDataHeaders: formDataHeaders = {
  //   secret: app.secret,
  Accept: 'application/json',
  accept: 'application/json',
  ContentType: 'multipart/form-data',
}

export function authorizedHeader(header: formDataHeaders | defaultHeaders) {
  return { ...header, Authorization: `Bearer ${ls.get('token')}` }
}

export type apiResponse = {
  status: boolean
  message: string
  data?: any
}

type errors = {
  [key: string]: string[]
}
export function getError(errors: errors) {
  const key = Object.keys(errors)[0]
  const value = errors[key][0]
  return value
}

async function returnResponse(res: any): Promise<apiResponse> {
  const data = await res.json()
  if (data.status === true) return { status: true, message: data.message, data: data }
  else if (data.message === 'Unauthenticated.') {
    ls.clear()
    window.location.href = ''
    return { status: false, message: data.message || 'Network Error' }
  } else if (!data.errors) return { status: false, message: data.message || 'Network Error' }
  return { status: false, message: getError(data.errors) || data.message || 'Network Error' }
}

function catchError(err: any): apiResponse {
  console.log(err)
  return { status: false, message: 'Network Error' }
}

const API = {
  login: `${API_URL}/auth/login`,
  admin: {
    get_profile: `${API_URL}/profile/get_profile`,
    update_profile: `${API_URL}/profile/edit_profile`,
  },
  dashboard: {
    get_counts: `${API_URL}/dashboard/get_counts`,
  },
  users: {
    get: `${API_URL}/user/get_users/all`,
    ban: `${API_URL}/user/ban_user`,
    unban: `${API_URL}/user/unban_user`,
    delete: `${API_URL}/user/delete_user`,
  },
  creators: {
    get: `${API_URL}/creator/get_creator/all`,
    add: `${API_URL}/creator/add_creator`,
    ban: `${API_URL}/creator/ban_creator`,
    unban: `${API_URL}/creator/unban_creator`,
    delete: `${API_URL}/creator/delete_creator`,
  },
  banners: {
    get_all: `${API_URL}/banner/get_banner`,
    create: `${API_URL}/banner/create_banner`,
    delete: `${API_URL}/banner/delete`,
  },
  videos: {
    list: `${API_URL}/video/video_list`,
    delete: `${API_URL}/video/delete`,
  },
  categories: {
    create: `${API_URL}/video/create_cat`,
    all: `${API_URL}/video/cat_list`,
    edit: `${API_URL}/video/cat_edit`,
    delete: `${API_URL}/video/cat_delete`,
  },
}
export default API

// All API calls

export async function delete_category_f(cat_id: number): Promise<apiResponse> {
  try {
    const headers = authorizedHeader(defaultHeaders)
    const res = await fetch(API.categories.delete, {
      method: 'POST',
      headers,
      body: JSON.stringify({ cat_id }),
    })
    return await returnResponse(res)
  } catch (err) {
    return catchError(err)
  }
}

export async function edit_category_f(cat_id: number, title: string): Promise<apiResponse> {
  try {
    const headers = authorizedHeader(defaultHeaders)
    const res = await fetch(API.categories.edit, {
      method: 'POST',
      headers,
      body: JSON.stringify({ cat_id, title }),
    })
    return await returnResponse(res)
  } catch (err) {
    return catchError(err)
  }
}

export async function get_categories_f(): Promise<apiResponse> {
  try {
    const headers = authorizedHeader(defaultHeaders)
    const res = await fetch(API.categories.all, {
      method: 'POST',
      headers,
    })
    return await returnResponse(res)
  } catch (err) {
    return catchError(err)
  }
}

export async function create_category_f(body: FormData): Promise<apiResponse> {
  try {
    const headers = authorizedHeader(formDataHeaders)
    const res = await fetch(API.categories.create, {
      method: 'POST',
      headers,
      body,
    })
    return await returnResponse(res)
  } catch (err) {
    return catchError(err)
  }
}

export async function delete_video_f(id: number): Promise<apiResponse> {
  try {
    const headers = authorizedHeader(defaultHeaders)
    const res = await fetch(API.videos.delete, {
      method: 'POST',
      headers,
      body: JSON.stringify({ id }),
    })
    return await returnResponse(res)
  } catch (err) {
    return catchError(err)
  }
}

export async function get_videos_list_f(url = API.videos.list): Promise<apiResponse> {
  try {
    const headers = authorizedHeader(defaultHeaders)
    const res = await fetch(url, {
      method: 'POST',
      headers,
    })
    return await returnResponse(res)
  } catch (err) {
    return catchError(err)
  }
}

export async function delete_creator_f(id: number): Promise<apiResponse> {
  try {
    const headers = authorizedHeader(defaultHeaders)
    const body = { id }
    console.log(body)
    const res = await fetch(API.creators.delete, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
    return await returnResponse(res)
  } catch (err) {
    return catchError(err)
  }
}

export async function unban_creator_f(id: number): Promise<apiResponse> {
  try {
    const headers = authorizedHeader(defaultHeaders)
    const body = { id }
    console.log(body)
    const res = await fetch(API.creators.unban, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
    return await returnResponse(res)
  } catch (err) {
    return catchError(err)
  }
}

export async function ban_creator_f(id: number, reasons: string): Promise<apiResponse> {
  try {
    const headers = authorizedHeader(defaultHeaders)
    const body = { id, reasons }
    console.log(body)
    const res = await fetch(API.creators.ban, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
    return await returnResponse(res)
  } catch (err) {
    return catchError(err)
  }
}

export async function add_creator_f(body: any): Promise<apiResponse> {
  try {
    const headers = authorizedHeader(defaultHeaders)
    const res = await fetch(API.creators.add, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
    return await returnResponse(res)
  } catch (err) {
    return catchError(err)
  }
}

export async function get_creators_f(url: string): Promise<apiResponse> {
  try {
    const headers = authorizedHeader(defaultHeaders)
    const res = await fetch(url, {
      method: 'POST',
      headers,
    })
    return await returnResponse(res)
  } catch (err) {
    return catchError(err)
  }
}

export async function delete_banner_f(id: number): Promise<apiResponse> {
  try {
    const headers = authorizedHeader(defaultHeaders)
    const body = { id }
    console.log(body)
    const res = await fetch(API.banners.delete, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
    return await returnResponse(res)
  } catch (err) {
    return catchError(err)
  }
}

export async function create_banner_f(body: any): Promise<apiResponse> {
  try {
    const headers = authorizedHeader(formDataHeaders)
    const res = await fetch(API.banners.create, {
      method: 'POST',
      headers,
      body: body,
    })
    return await returnResponse(res)
  } catch (err) {
    return catchError(err)
  }
}

export async function get_banners_f(): Promise<apiResponse> {
  try {
    const headers = authorizedHeader(defaultHeaders)
    const res = await fetch(API.banners.get_all, {
      method: 'POST',
      headers,
    })
    return await returnResponse(res)
  } catch (err) {
    return catchError(err)
  }
}

export async function unban_user_f(user_id: number): Promise<apiResponse> {
  try {
    const headers = authorizedHeader(defaultHeaders)
    const body = { user_id }
    console.log(body)
    const res = await fetch(API.users.unban, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
    return await returnResponse(res)
  } catch (err) {
    return catchError(err)
  }
}

export async function delete_user_f(user_id: number): Promise<apiResponse> {
  try {
    const headers = authorizedHeader(defaultHeaders)
    const body = { user_id }
    console.log(body)
    const res = await fetch(API.users.delete, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
    return await returnResponse(res)
  } catch (err) {
    return catchError(err)
  }
}

export async function ban_user_f(user_id: number, reasons: string): Promise<apiResponse> {
  try {
    const headers = authorizedHeader(defaultHeaders)
    const body = { user_id, reasons }
    console.log(body)
    const res = await fetch(API.users.ban, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
    return await returnResponse(res)
  } catch (err) {
    return catchError(err)
  }
}

// export async function update_profile_f(body: any): Promise<apiResponse> {
//   try {
//     const headers = authorizedHeader(defaultHeaders)
//     const res = await fetch(API.admin.update_profile, {
//       method: 'POST',
//       headers,
//       body: JSON.stringify(body),
//     })
//     return await returnResponse(res)
//   } catch (err) {
//     return catchError(err)
//   }
// }

export async function get_users_f(url: string): Promise<apiResponse> {
  try {
    const headers = authorizedHeader(defaultHeaders)
    const res = await fetch(url, {
      method: 'POST',
      headers,
    })
    return await returnResponse(res)
  } catch (err) {
    return catchError(err)
  }
}

export async function get_counts_f(): Promise<apiResponse> {
  try {
    const headers = authorizedHeader(defaultHeaders)
    const res = await fetch(API.dashboard.get_counts, {
      method: 'POST',
      headers,
    })
    return await returnResponse(res)
  } catch (err) {
    return catchError(err)
  }
}

export async function get_profile_f(): Promise<apiResponse> {
  try {
    const headers = authorizedHeader(defaultHeaders)
    const res = await fetch(API.admin.get_profile, {
      method: 'POST',
      headers,
    })
    return await returnResponse(res)
  } catch (err) {
    return catchError(err)
  }
}

export async function login_f(email: string, password: string): Promise<apiResponse> {
  try {
    const body = { email, password }
    const res = await fetch(API.login, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(body),
    })
    return await returnResponse(res)
  } catch (err) {
    return catchError(err)
  }
}
