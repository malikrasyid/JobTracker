"use client"

import { useState } from "react"
import { ApplicationCard } from "@/components/application-card"
import { cn } from "@/lib/utils"
import type { Application, Tab, ApplicationStatus } from "@/types/application"

const tabs: Tab[] = [
  { id: "applied", label: "Applied", active: true },
  { id: "interviewing", label: "Interviewing", active: false },
  { id: "offer", label: "Offer", active: false },
  { id: "rejected", label: "Rejected", active: false },
]

const applications: Application[] = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Tech Innovators Inc.",
    location: "Remote",
    appliedDate: "2024-01-15",
    logoUrl: "/images/company-logo-1.jpg",
    status: "applied",
  },
  {
    id: 2,
    title: "Product Manager",
    company: "Global Solutions Ltd.",
    location: "New York, NY",
    appliedDate: "2024-01-20",
    logoUrl: "/images/company-logo-2.jpg",
    status: "applied",
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "Data Driven Corp.",
    location: "San Francisco, CA",
    appliedDate: "2024-01-25",
    logoUrl: "/images/company-logo-3.jpg",
    status: "applied",
  },
]

export function ApplicationsGrid() {
  const [activeTab, setActiveTab] = useState<ApplicationStatus>("applied")

  const filteredApplications: Application[] = applications.filter((app) => app.status === activeTab)

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "py-2 px-1 border-b-2 font-medium text-sm transition-colors",
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Applications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApplications.map((application) => (
          <ApplicationCard key={application.id} application={application} />
        ))}
      </div>
    </div>
  )
}
