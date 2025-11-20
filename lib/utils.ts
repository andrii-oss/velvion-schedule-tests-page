import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getCookieValue(cookie: string, key: any) {
  const regex = new RegExp(`${key}=([^;]+)`);
  const match = cookie.match(regex);
  return match ? match[1] : null;
}
