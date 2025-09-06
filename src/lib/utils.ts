import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const genPass = (len = 9) => {
  const sets = [
    'abcdefghijklmnopqrstuvwxyz',
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    '0123456789',
    '!@#$%^&*_/|',
  ]
  let p = sets.map((s) => s[(Math.random() * s.length) | 0]).join('')
  const all = sets.join('')
  while (p.length < len) p += all[(Math.random() * all.length) | 0]
  return [...p].sort(() => Math.random() - 0.5).join('')
}
