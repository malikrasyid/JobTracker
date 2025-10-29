"use client";

import { useEffect, useMemo, useState } from "react";
import { useJobStore } from "../services/store";
import { usePipelineStore } from "../services/store";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Loader2 } from "lucide-react";

export default function DashboardContent() {
  const { jobs, loading: jobLoading, error: jobError, fetchJobs } = useJobStore();
  const { pipelines, loading: pipeLoading, error: pipeError, fetchPipelines } = usePipelineStore();

  // local filters
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [pipelineFilter, setPipelineFilter] = useState("all");

  useEffect(() => {
    fetchJobs();
    fetchPipelines();
  }, [fetchJobs, fetchPipelines]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase());
      const matchesStage = stageFilter === "all" || job.stage === stageFilter;
      const matchesPipeline =
        pipelineFilter === "all" ||
        job.pipelineId === pipelineFilter;

      return matchesSearch && matchesStage && matchesPipeline;
    });
  }, [jobs, search, stageFilter, pipelineFilter]);

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

  const uniqueStages = Array.from(new Set(jobs.map((j) => j.stage)));

  return (
    <div className="p-6 space-y-8">
      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* Search */}
          <Input
            placeholder="Search job title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="md:w-64"
          />

          {/* Stage Filter */}
          <Select value={stageFilter} onValueChange={setStageFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              {uniqueStages.map((stage) => (
                <SelectItem key={stage} value={stage}>
                  {stage}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Pipeline Filter */}
          <Select value={pipelineFilter} onValueChange={setPipelineFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by pipeline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Pipelines</SelectItem>
              {pipelines.map((pipe) => (
                <SelectItem key={pipe.id} value={pipe.id}>
                  {pipe.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Jobs Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Jobs</h2>
        {filteredJobs.length === 0 ? (
          <p className="text-gray-500">No jobs match your filters.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <Card
                key={job.id}
                className="hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer"
              >
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Stage: {job.stage}</p>
                  {job.pipeline && (
                    <p className="text-sm text-gray-500">Pipeline: {job.pipeline}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Pipelines Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Pipelines</h2>
        {pipelines.length === 0 ? (
          <p className="text-gray-500">No pipelines available.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pipelines.map((pipe) => (
              <Card key={pipe.id} className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle>{pipe.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">ID: {pipe.id}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
