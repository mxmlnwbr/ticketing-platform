import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { format } from "date-fns"

export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return format(date, "MMMM dd, yyyy")
}

export const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  return format(date, "h:mm a")
}

// Update the formatCurrency function to use Swiss Francs (CHF)
export const formatCurrency = (amount: number) => {
  return `CHF ${amount.toFixed(2)}`
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

