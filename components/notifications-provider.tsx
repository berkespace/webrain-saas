"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"

export type NotificationItem = {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "error" | "success"
  timestamp: Date
  read: boolean
  action?: {
    label: string
    url: string
  }
}

interface NotificationsContextValue {
  notifications: NotificationItem[]
  add: (n: Omit<NotificationItem, "id" | "timestamp" | "read">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  remove: (id: string) => void
}

const NotificationsContext = createContext<NotificationsContextValue | null>(null)

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])

  const add: NotificationsContextValue["add"] = (n) => {
    setNotifications((prev) => [
      {
        id: Math.random().toString(36).slice(2),
        title: n.title,
        message: n.message,
        type: n.type,
        timestamp: new Date(),
        read: false,
        action: n.action,
      },
      ...prev,
    ])
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((x) => (x.id === id ? { ...x, read: true } : x)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((x) => ({ ...x, read: true })))
  }

  const remove = (id: string) => {
    setNotifications((prev) => prev.filter((x) => x.id !== id))
  }

  // Demo: generate a sample notification every few minutes (dev only)
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return
    const interval = setInterval(() => {
      add({ title: "Bilgi", message: "Sistem kontrolü tamamlandı", type: "info" })
    }, 180000)
    return () => clearInterval(interval)
  }, [])

  const value = useMemo(() => ({ notifications, add, markAsRead, markAllAsRead, remove }), [notifications])

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext)
  if (!ctx) throw new Error("useNotifications must be used within NotificationsProvider")
  return ctx
}
