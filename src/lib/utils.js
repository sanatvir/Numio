import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function createPageUrl(pageName) {
  if (pageName === "Start") return "/";
  if (pageName === "Calculator") return "/calculator";
  return "/";
}