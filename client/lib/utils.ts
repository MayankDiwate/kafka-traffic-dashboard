import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTimestamp(timestamp: string): string {
  // Handle different timestamp formats
  let date: Date

  if (timestamp.includes(".")) {
    // Handle format like "10.12.03"
    const [hours, minutes, seconds] = timestamp.split(".")
    date = new Date()
    date.setHours(Number.parseInt(hours, 10))
    date.setMinutes(Number.parseInt(minutes, 10))
    date.setSeconds(Number.parseInt(seconds, 10))
  } else {
    // Handle ISO string or other formats
    date = new Date(timestamp)
  }

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })
}
