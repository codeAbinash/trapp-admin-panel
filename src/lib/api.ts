import { app } from '../constants'
import ls from './ls'

const API_URL = app.api

const API = {
  admin: {
    login: `${API_URL}/auth/login`,
  },
}
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

export default API

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
  else if (!data.errors) return { status: false, message: data.message || 'Network Error' }
  return { status: false, message: getError(data.errors) || data.message || 'Network Error' }
}

function catchError(err: any): apiResponse {
  console.log(err)
  return { status: false, message: 'Network Error' }
}

// All API calls

export async function login_f(email: string, password: string): Promise<apiResponse> {
  try {
    const body = { email, password }
    const res = await fetch(API.admin.login, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(body),
    })
    return await returnResponse(res)
  } catch (err) {
    return catchError(err)
  }
}
