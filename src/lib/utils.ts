import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { MB } from './constants'
import { userMessage } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function increaseCount(
  count: number,
  setCount: React.Dispatch<React.SetStateAction<number>>,
  delay: number = 50,
  increaseBy: number = Math.floor(count / 20),
) {
  // increase delay 100ms for 3 seconds
  let i = 0
  increaseBy = Math.floor(count / 20)
  const interval = setInterval(() => {
    setCount((prev: number) => {
      if (prev >= count) {
        clearInterval(interval)
        return count
      }
      return prev + increaseBy
    })
    i++
    if (i === 20) clearInterval(interval)
  }, delay)
}

export function delayFn(callback: () => void, time = 150) {
  return function () {
    setTimeout(callback, time)
  }
}

export function getStatusColor(status: string) {
  switch (status) {
    case 'banned':
      return 'bg-red-500'
    case 'regular':
      return 'bg-green-500'
    default:
      return 'bg-transparent'
  }
}

export function getSubscriptionColor(subscription: 'expired' | 'active' | 'hold' | 'regular') {
  switch (subscription) {
    case 'expired':
      return 'bg-gray-500'
    case 'active':
      return 'bg-green-500'
    case 'hold':
      return 'bg-yellow-500'
    case 'regular':
      return 'bg-black/20 dark:bg-white/25'
    default:
      return 'bg-transparent'
  }
}

export function picFileValidation(file: File | undefined | null, size: number = 1 * MB, sizeInText = '1MB'): userMessage {
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']
  const maxSize = size
  if (file && !allowedTypes.includes(file.type))
    return {
      message: 'Invalid file type (only .png, .jpeg, .jpg)',
      error: true,
    }
  if (file && file.size > maxSize)
    return {
      message: `Max File Size is ${sizeInText}`,
      error: true,
    }
  return { message: '', error: false }
}

export function nFormatter(num: number) {
  const formatter = Intl.NumberFormat('en', { notation: 'compact' })
  return formatter.format(num)
}
