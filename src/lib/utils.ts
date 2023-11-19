import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function increaseCount(count: number, setCount: Function, delay: number = 50, increaseBy: number = Math.floor(count / 20)) {
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
  }, 50)
}
