"use client";

import { useEffect, useMemo, useState } from "react";
import { useJobStore } from "../../services/store";
import { usePipelineStore } from "../../services/store";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Loader2, Briefcase, Search, Zap, Target } from "lucide-react";

export default function DashboardContent() {
  const { jobs, loading: jobLoading, error: jobError, fetchJobs } = useJobStore();
  const { pipelines, loading: pipeLoading, error: pipeError, fetchPipelines } = usePipelineStore();

  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [pipelineFilter, setPipelineFilter] = useState("all");

  useEffect(() => {
    fetchJobs();
    fetchPipelines();
  }, [fetchJobs, fetchPipelines]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = job.name.toLowerCase().includes(search.toLowerCase());
      const matchesStage = stageFilter === "all" || job.stage === stageFilter;
      const matchesPipeline =
        pipelineFilter === "all" ||
        job.pipelineId === pipelineFilter ||
        job.pipelineName === pipelineFilter;

      return matchesSearch && matchesStage && matchesPipeline;
    });
  }, [jobs, search, stageFilter, pipelineFilter]);

  const uniqueStages = Array.from(new Set(jobs.map((j) => j.stage)));

  const { totalJobs, totalPipelines, jobsByStageData } = useMemo(() => {
    const totalJobs = jobs.length;
    const totalPipelines = pipelines.length;

    const jobsByStageMap = jobs.reduce((acc, job) => {
      acc[job.stage] = (acc[job.stage] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const jobsByStageData = Object.entries(jobsByStageMap).map(([stage, count]) => ({
      stage,
      count,
    }));

    return { totalJobs, totalPipelines, jobsByStageData };
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

      {/* 📈 Jobs By Stage Chart */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Applications by Stage</h2>
        <Card className="p-4 h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={jobsByStageData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="stage" stroke="#6b7280" angle={-15} textAnchor="end" height={45} />
              <YAxis allowDecimals={false} stroke="#6b7280" />
              <Tooltip 
                cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} 
                contentStyle={{ 
                  borderRadius: '0.5rem', 
                  border: '1px solid #e5e7eb', 
                  backgroundColor: '#ffffff' 
                }} 
              />
              <Legend />
              <Bar 
                dataKey="count" 
                name="Job Count" 
                fill="#3b82f6" 
                radius={[4, 4, 0, 0]} // Rounded tops
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </section>
            
      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-start gap-4 rounded-xl">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search job title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 bg-white"
          />
        </div>

        <div className="flex gap-4">
        {/* Stage Filter (Using the exported Select which is a native select with updated styles) */}
          <Select value={stageFilter} onValueChange={setStageFilter} className="w-[180px]">
            <option value="all">All Stages</option>
            {uniqueStages.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </Select>

          {/* Pipeline Filter (Using the exported Select which is a native select with updated styles) */}
          <Select value={pipelineFilter} onValueChange={setPipelineFilter} className="w-[180px]">
            <option value="all">All Pipelines</option>
            {pipelines.map((pipe) => (
              <option key={pipe.id} value={pipe.id}>
                {pipe.name}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {/* Jobs Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Open Jobs ({filteredJobs.length})</h2>
        {filteredJobs.length === 0 ? (
          <p className="text-gray-500 p-6 border rounded-xl bg-white text-center">No jobs match your filters. Try adjusting your search criteria.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredJobs.map((job) => (
                <Card
                  key={job.id}
                  className="cursor-pointer hover:border-blue-400"
                >
                  <CardHeader>
                    <CardTitle className="text-xl">{job.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-gray-600 font-medium">
                      <span className="text-gray-500">Stage:</span> <span className="text-blue-600 font-semibold">{job.stage}</span>
                    </p>
                    {job.pipelineId && (
                      <p className="text-sm text-gray-500">
                        <span className="font-medium text-gray-500">Pipeline:</span> {job.pipelineName}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Briefcase className="w-4 h-4 text-gray-400"/>
                      <span className="font-medium">{job.company}</span>
                    </div>
                  </CardContent>
                </Card>
            ))}
          </div>
        )}
      </section>

      {/* Pipelines Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Pipelines ({pipelines.length})</h2>
        {pipelines.length === 0 ? (
          <p className="text-gray-500 p-6 border rounded-xl bg-white text-center">No pipelines available.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pipelines.map((pipe) => (
                <Card key={pipe.id} className="cursor-default">
                  <CardHeader>
                    <CardTitle className="text-xl">{pipe.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-500">ID:</span> {pipe.id}
                    </p>
                  </CardContent>
                </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
