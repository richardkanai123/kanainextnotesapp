import { clsx, type ClassValue } from "clsx"
import { formatDistanceStrict } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const DaysFromToday = (date: Date) => {
    const today = new Date()
    const formatedDistance = formatDistanceStrict(new Date(date), today, { addSuffix: true })
    return formatedDistance
}