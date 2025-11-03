import { useEffect, useMemo, useState } from "react";
import { useJobStore } from "../../services/store";
import { Loader2, Plus, Edit2, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";

export default function JobsContent() {
  const {
    jobs,
    loading,
    error,
    fetchJobs,
    createJob,
    updateJob,
    deleteJob,
  } = useJobStore();

  // Local state for filtering & job creation
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [creating, setCreating] = useState(false);
  const [newJob, setNewJob] = useState({
    name: "",
    company: "",
    role: "",
    location: "",
    stage: "",
    pipelineId: "",
    pipelineName: "",
    source: "",
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingJob, setEditingJob] = useState<any>(null);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchSearch = job.name.toLowerCase().includes(search.toLowerCase());
      const matchStage = stageFilter === "all" || job.stage === stageFilter;
      return matchSearch && matchStage;
    });
  }, [jobs, search, stageFilter]);

  const uniqueStages = Array.from(new Set(jobs.map((j) => j.stage)));

  const handleCreate = async () => {
    if (!newJob.name.trim() || !newJob.company.trim()) return;
    await createJob(newJob);
    setNewJob({
      name: "",
      company: "",
      role: "",
      location: "",
      stage: "",
      pipelineId: "",
      pipelineName: "",
      source: "",
    });
    setCreating(false);
  };

  const handleUpdate = async (id: string) => {
    await updateJob(id, editingJob);
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this job?")) {
      await deleteJob(id);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500">
        {error || "Failed to load jobs."}
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex gap-3">
          <Input
            placeholder="Search by job name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
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
        </div>

        <Button onClick={() => setCreating(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Job
        </Button>
      </div>

      {/* Create New Job Form */}
      {creating && (
        <div className="p-4 border rounded-lg bg-gray-50">
          <h3 className="font-semibold mb-2">New Job</h3>
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="Job Name" value={newJob.name}
              onChange={(e) => setNewJob({ ...newJob, name: e.target.value })} />
            <Input placeholder="Company" value={newJob.company}
              onChange={(e) => setNewJob({ ...newJob, company: e.target.value })} />
            <Input placeholder="Role" value={newJob.role}
              onChange={(e) => setNewJob({ ...newJob, role: e.target.value })} />
            <Input placeholder="Location" value={newJob.location}
              onChange={(e) => setNewJob({ ...newJob, location: e.target.value })} />
            <Input placeholder="Stage" value={newJob.stage}
              onChange={(e) => setNewJob({ ...newJob, stage: e.target.value })} />
            <Input placeholder="Source" value={newJob.source}
              onChange={(e) => setNewJob({ ...newJob, source: e.target.value })} />
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="ghost" onClick={() => setCreating(false)}>Cancel</Button>
            <Button onClick={handleCreate}>Save</Button>
          </div>
        </div>
      )}

      {/* Job Cards */}
      {filteredJobs.length === 0 ? (
        <p className="text-gray-500 text-center">No jobs found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <Card
              key={job.id}
              className="hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer"
            >
              <CardHeader className="flex justify-between items-center">
                {editingId === job.id ? (
                  <Input
                    value={editingJob?.name}
                    onChange={(e) =>
                      setEditingJob({ ...editingJob, name: e.target.value })
                    }
                  />
                ) : (
                  <CardTitle>{job.name}</CardTitle>
                )}
              </CardHeader>

              <CardContent className="space-y-1 text-sm text-gray-600">
                <p><span className="font-medium">Company:</span> {job.company}</p>
                <p><span className="font-medium">Role:</span> {job.role}</p>
                <p><span className="font-medium">Stage:</span> {job.stage}</p>
                <p><span className="font-medium">Location:</span> {job.location}</p>
                <p><span className="font-medium">Pipeline:</span> {job.pipelineName}</p>
                <div className="flex justify-end gap-2 mt-3">
                  {editingId === job.id ? (
                    <Button
                      size="sm"
                      onClick={() => handleUpdate(job.id)}
                      className="text-xs"
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditingId(job.id);
                        setEditingJob(job);
                      }}
                    >
                      <Edit2 className="w-4 h-4 text-gray-600" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(job.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
