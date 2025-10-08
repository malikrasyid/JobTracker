import { useEffect } from "react"
import { useJobStore } from "../services/store"

export function JobList() {
  const {jobs, loading, error, fetchJobs} = useJobStore();

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {jobs.map((job) => (
        <li key={job.id}>{job.title} ({job.stage})</li>
      ))}
    </ul>
  )
}
