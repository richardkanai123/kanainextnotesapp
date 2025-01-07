import { clsx, type ClassValue } from "clsx"
import { format, formatDistanceStrict } from "date-fns"
import { twMerge } from "tailwind-merge"
import { noteCategories } from "./Constants/categories"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const DaysFromToday = (date: Date) => {
    const today = new Date()
    const formatedDistance = formatDistanceStrict(new Date(date), today, { addSuffix: true })
    return formatedDistance
}

export const GetCategoryEmoji = (categoryName: string) => {
    return noteCategories.find((category) => category.name === categoryName)?.emoji
}

export const FormatDateIntoReadableString = (date: Date) => {

  const targetDate = new Date(date)
    const formattedDate = format(targetDate, "PPPP")
    return formattedDate
}