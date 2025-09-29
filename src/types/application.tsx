import type React from "react"
export interface Application {
  id: number
  title: string
  company: string
  location: string
  appliedDate: string
  logoUrl: string
  status: ApplicationStatus
}

export type ApplicationStatus = "applied" | "interviewing" | "offer" | "rejected"

export interface Tab {
  id: ApplicationStatus
  label: string
  active: boolean
}

export interface MenuItem {
  icon: React.ComponentType<{ className?: string }>
  label: string
  active: boolean
}
