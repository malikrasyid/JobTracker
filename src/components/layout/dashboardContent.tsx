"use client";

import { useEffect, useMemo } from "react";
import { useJobStore } from "../../services/store";
import { usePipelineStore } from "../../services/store";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Loader2, Zap, Target } from "lucide-react";

// Colors for the Pie Chart slices
const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#6366f1', '#06b6d4'];

export default function DashboardContent() {
  const { jobs, loading: jobLoading, error: jobError, fetchJobs } = useJobStore();
  const { pipelines, loading: pipeLoading, error: pipeError, fetchPipelines } = usePipelineStore();

  // const [search] = useState("");
  // const [stageFilter] = useState("all");
  // const [pipelineFilter] = useState("all");

  useEffect(() => {
    fetchJobs();
    fetchPipelines();
  }, [fetchJobs, fetchPipelines]);

  // const filteredJobs = useMemo(() => {
  //   return jobs.filter((job) => {
  //     const matchesSearch = job.name.toLowerCase().includes(search.toLowerCase());
  //     const matchesStage = stageFilter === "all" || job.stage === stageFilter;
  //     const matchesPipeline =
  //       pipelineFilter === "all" ||
  //       job.pipelineId === pipelineFilter ||
  //       job.pipelineName === pipelineFilter;

  //     return matchesSearch && matchesStage && matchesPipeline;
  //   });
  // }, [jobs, search, stageFilter, pipelineFilter]);

  // const uniqueStages = Array.from(new Set(jobs.map((j) => j.stage)));

  const { totalJobs, totalPipelines, jobsByStageData, mostRecentJobs} = useMemo(() => {
    const totalJobs = jobs.length;
    const totalPipelines = pipelines.length;

    const jobsByStageMap = jobs.reduce((acc, job) => {
      acc[job.stage] = (acc[job.stage] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const jobsByStageData = Object.entries(jobsByStageMap).map(([name, value]) => ({
      name,
      value,
    }));

    const mostRecentJobs = [...jobs]
      .sort((a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime())
      .slice(0, 5);


    return { totalJobs, totalPipelines, jobsByStageData, mostRecentJobs };
  }, [jobs, pipelines]);

  if (jobLoading || pipeLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );

  if (jobError || pipeError)
    return (
      <div className="text-center text-red-500">
        {jobError || pipeError || "Failed to load data."}
      </div>
    );

  return (
    <div className="space-y-6">

      {/* 📊 Key Metrics Counters */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Total Jobs Metric */}
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold text-gray-700">Total Applications</CardTitle>
            <Zap className="w-6 h-6 text-blue-600" />
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-3xl font-bold text-gray-900">{totalJobs}</p>
          </CardContent>
        </Card>

        {/* Total Pipelines Metric */}
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold text-gray-700">Active Pipelines</CardTitle>
            <Target className="w-6 h-6 text-green-600" />
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-3xl font-bold text-gray-900">{totalPipelines}</p>
          </CardContent>
        </Card>

        {/* Average Stage Time (Placeholder for illustration) */}
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold text-gray-700">Avg. Stage Time</CardTitle>
            <Loader2 className="w-6 h-6 text-yellow-600" />
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-3xl font-bold text-gray-900">~14 Days</p>
          </CardContent>
        </Card>
      </div>

      {/* 📈 Jobs By Stage Chart (Pie Chart) & Recent Applications List (side-by-side) */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pie Chart Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Stage Distribution</h2>
          <Card className="p-4 h-96">
            {jobsByStageData.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500">No job data available for chart.</div>
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={jobsByStageData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            fill="#8884d8"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                            {jobsByStageData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend wrapperStyle={{ paddingTop: '10px' }} />
                    </PieChart>
                </ResponsiveContainer>
            )}
          </Card>
        </section>

        {/* Recent Applications List */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">5 Most Recent Applications</h2>
          <Card className="p-0">
            {mostRecentJobs.length === 0 ? (
              <p className="text-gray-500 p-6 text-center">No recent applications found.</p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {mostRecentJobs.map((job) => (
                  <li key={job.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-semibold text-gray-900 truncate">{job.name}</p>
                      <p className="text-sm text-gray-500 truncate">{job.company}</p>
                    </div>
                    <div className="flex-shrink-0 ml-4 text-right">
                      <p className="text-sm font-medium text-blue-600">{job.stage}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(job.appliedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </section>
      </div>
    </div>
  );
}
