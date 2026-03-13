import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { getSupabase } from '../DB/utils'
import { redirect } from 'next/navigation'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
