import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount)
}

export function eligibilityColor(level: string) {
  if (level === "High") return "text-emerald-600 bg-emerald-50"
  if (level === "Medium") return "text-yellow-600 bg-yellow-50"
  return "text-red-600 bg-red-50"
}

export function eligibilityBarColor(level: string) {
  if (level === "High") return "bg-emerald-500"
  if (level === "Medium") return "bg-yellow-500"
  return "bg-red-500"
}
