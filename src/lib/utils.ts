import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Fetch function for SWR
export const fetcher = (url: string) => fetch(url).then((res) => res.json())
