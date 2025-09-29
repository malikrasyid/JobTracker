import { useEffect, useState } from "react"
import { getJobs } from "../services/api"
import { ApplicationCard } from "../components/applicationCard"

interface Job {
  id: string
  title: string
  company: string
  location: string
  createdAt: string
}

export function JobList() {
  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() => {
    getJobs().then((data) => {
      setJobs(data) // assumes API returns an array of jobs
    })
  }, [])

  return (
    <div className="grid gap-4">
      {jobs.map((job) => (
        <ApplicationCard key={job.id} job={job} />
      ))}
    </div>
  )
}
