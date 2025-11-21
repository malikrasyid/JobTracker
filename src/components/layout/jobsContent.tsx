import { useEffect, useMemo, useState } from "react";
import { useJobStore } from "../../services/store";
import { Loader2, Plus, Edit2, Trash2, Briefcase, MapPin, Tag, Workflow, LayoutDashboard } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select } from "../ui/select";

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
      <div className="space-y-6">
        {/* Filters & Add Button */}
        <div className="flex flex-col md:flex-row md:justify-start md:items-center gap-4 bg-gray-50 rounded-xl">
            <Input
              placeholder="Search by job name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white md:flex-1"
            />
          <div className="flex gap-4">
            <Select value={stageFilter} onValueChange={setStageFilter} className="w-'[180px]'">
              <option value="all">All Stages</option>
              {uniqueStages.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </Select>        
            <Button 
              onClick={() => setCreating(true)} 
              variant="secondary"
              className="flex items-center gap-2 w-full"
            >
              <Plus className="w-4 h-4" /> Add Job
            </Button>
          </div>
        </div>
  
        {/* Create New Job Form - Used Card and blue-50 background for visual style */}
        {creating && (
          <Card className="p-6 bg-blue-50/50 border-blue-200">
            <h3 className="text-xl font-semibold mb-4 text-blue-700">New Job Application</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setCreating(false)}>Cancel</Button>
              <Button onClick={handleCreate}>Save Job</Button>
            </div>
          </Card>
        )}
  
        {/* Job Cards */}
        {filteredJobs.length === 0 ? (
          <p className="text-gray-500 text-center p-6 border rounded-xl bg-white">No jobs found matching your criteria.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredJobs.map((job) => (
              <Card
                key={job.id}
                className="group hover:border-blue-400"
              >
                <CardHeader className="p-4 flex-row items-center justify-between">
                  {editingId === job.id ? (
                    <Input
                      value={editingJob?.name}
                      onChange={(e) =>
                        setEditingJob({ ...editingJob, name: e.target.value })
                      }
                      className="w-full"
                    />
                  ) : (
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">{job.name}</CardTitle>
                  )}
                  
                  
                </CardHeader>
  
                <CardContent className="space-y-2 p-4 pt-0 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-gray-400 shrink-0" />
                    <p className="truncate"><span className="font-medium text-gray-800">Company:</span> {job.company}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-gray-400 shrink-0" />
                    <p className="truncate"><span className="font-medium text-gray-800">Role:</span> {job.role}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Workflow className="w-4 h-4 text-gray-400 shrink-0" />
                    <p className="truncate"><span className="font-medium text-gray-800">Stage:</span> <span className="text-blue-600 font-semibold">{job.stage}</span></p>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                    <p className="truncate"><span className="font-medium text-gray-800">Location:</span> {job.location}</p>
                  </div>
                  {job.pipelineName && (
                    <div className="flex items-center gap-2">
                      <LayoutDashboard className="w-4 h-4 text-gray-400 shrink-0" />
                      <p className="truncate"><span className="font-medium text-gray-800">Pipeline:</span> {job.pipelineName}</p>
                    </div>
                  )}
                </CardContent>
                {/* Action Buttons are moved to the header and hidden until hover for a cleaner look */}
                <div className="flex justify-end gap-1 p-4 pt-0 opacity-0 group-hover:opacity-100 transition-opacity">
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
                        title="Edit Job"
                      >
                        <Edit2 className="w-4 h-4 text-gray-500 hover:text-blue-600" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(job.id)}
                      title="Delete Job"
                    >
                      <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-500" />
                    </Button>
                  </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
}
