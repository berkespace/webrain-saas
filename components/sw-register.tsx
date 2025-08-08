"use client"

import { useEffect } from "react"

export function SWRegister() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }
  }, [])
  return null
}
