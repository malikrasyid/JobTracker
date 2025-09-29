import { Card } from "../components/ui/card"

interface ApplicationCardProps {
  job: {
    id: string
    title: string
    company: string
    location: string
    createdAt: string
  }
}

export function ApplicationCard({ job }: ApplicationCardProps) {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {/* Company Logo Section */}
      <div className="h-32 bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center">
        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-green-600 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="text-sm text-gray-500">
          Posted on {formatDate(job.createdAt)}
        </div>

        <div>
          <h3 className="font-semibold text-lg text-gray-900 mb-1">{job.title}</h3>
          <p className="text-gray-600 text-sm">
            {job.company} | {job.location}
          </p>
        </div>
      </div>
    </Card>
  )
}
