import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Fetch function for SWR
export const fetcher = (url: string) => fetch(url).then((res) => res.json())

// 
export function displayValue(s: string, decimals: number) {
  var num = Number(s)
  if (Number.isInteger(num)) {
    return num.toFixed(0)
  }
  return num.toFixed(decimals)
}