import { useEffect, useMemo, useState } from "react";
import { useJobStore, type Job } from "../../services/store";
import { Loader2, Plus, Edit2, Trash2, Briefcase, MapPin, Tag, Workflow, LayoutDashboard, Search } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { Modal } from "../ui/modal";
import { Textarea } from "../ui/textarea";
import { Spinner } from "../ui/spinner";

export default function JobsContent() {
  const {
    jobs,
    job: detailedJob,
    loading,
    error,
    fetchJobs,
    fetchJobById,
    createJob,
    updateJob,
    deleteJob,
  } = useJobStore();

  // Local state for filtering & job creation
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [creating, setCreating] = useState(false);
  const [newJob, setNewJob] = useState<Partial<Job>>({    
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

  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editData, setEditData] = useState<Partial<Job> | null>(null);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    if (selectedJobId && !isDetailModalOpen) {
        // If modal closed, clear selected job to clean up state
        setSelectedJobId(null);
        setEditData(null);
    } else if (selectedJobId && isDetailModalOpen) {
        fetchJobById(selectedJobId);
    }
  }, [selectedJobId, isDetailModalOpen, fetchJobById]);
  
  // Effect to initialize editData once detailedJob is fetched
  useEffect(() => {
    if (detailedJob && detailedJob.id === selectedJobId) {
        setEditData(detailedJob);
    }
  }, [detailedJob, selectedJobId]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchSearch = job.name.toLowerCase().includes(search.toLowerCase());
      const matchStage = stageFilter === "all" || job.stage === stageFilter;
      return matchSearch && matchStage;
    });
  }, [jobs, search, stageFilter]);

  const uniqueStages = Array.from(new Set(jobs.map((j) => j.stage)));

  const handleCreate = async () => {
    if (!newJob.name?.trim() || !newJob.company?.trim()) return;
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

  const handleDetailUpdate = async () => {
    if (!selectedJobId || !editData || !editData.name?.trim()) return;
    await updateJob(selectedJobId, editData);
    setIsDetailModalOpen(false);
  }

  const handleJobCardClick = (jobId: string) => {
    setSelectedJobId(jobId);
    setIsDetailModalOpen(true);
  } 

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
        {/* MODAL FOR CREATING NEW JOB - USING CUSTOM GRID LAYOUT */}
        <Modal isOpen={creating} onClose={() => setCreating(false)}>
          <h3 className="text-xl font-semibold mb-6 text-blue-700">New Job Application</h3>
          
          {/* Custom Grid: 2 columns for short data, responsive to 1 column on small screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Job Name */}
            <div>
              <label htmlFor="job-name" className="block text-sm font-medium text-gray-700 mb-1">Job Name</label>
              <Input id="job-name" placeholder="Name or Title" value={newJob.name}
                onChange={(e) => setNewJob({ ...newJob, name: e.target.value })} />
            </div>

            {/* Company */}
            <div>
              <label htmlFor="job-company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <Input id="job-company" placeholder="Company Name" value={newJob.company}
                onChange={(e) => setNewJob({ ...newJob, company: e.target.value })} />
            </div>

            {/* Role */}
            <div>
              <label htmlFor="job-role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <Input id="job-role" placeholder="e.g., Senior Developer" value={newJob.role}
                onChange={(e) => setNewJob({ ...newJob, role: e.target.value })} />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="job-location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <Input id="job-location" placeholder="e.g., Remote, San Francisco" value={newJob.location}
                onChange={(e) => setNewJob({ ...newJob, location: e.target.value })} />
            </div>

            {/* Stage */}
            <div>
              <label htmlFor="job-stage" className="block text-sm font-medium text-gray-700 mb-1">Current Stage</label>
              <Input id="job-stage" placeholder="e.g., Applied, Interviewing" value={newJob.stage}
                onChange={(e) => setNewJob({ ...newJob, stage: e.target.value })} />
            </div>

            {/* Source */}
            <div>
              <label htmlFor="job-source" className="block text-sm font-medium text-gray-700 mb-1">Source</label>
              <Input id="job-source" placeholder="e.g., LinkedIn, Referral" value={newJob.source}
                onChange={(e) => setNewJob({ ...newJob, source: e.target.value })} />
            </div>
            
            {/* Notes - Spans 2 columns (Field dengan data panjang) */}
            <div className="md:col-span-2">
              <label htmlFor="job-notes" className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
              <Textarea id="job-notes" placeholder="Notes about the interview, salary, etc." 
                value={newJob.notes}
                onChange={(e) => setNewJob({ ...newJob, notes: e.target.value })} />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setCreating(false)}>Cancel</Button>
            <Button onClick={handleCreate}>Save Job</Button>
          </div>
        </Modal>
        
        {/* JOB DETAIL/EDIT MODAL - USING CUSTOM GRID LAYOUT */}
        <Modal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)}>
            {editData ? (
                <>
                    <h3 className="text-xl font-semibold mb-6 text-blue-700 flex justify-between items-center">
                        {editData.name}
                        
                    </h3>

                    {/* Custom Grid: 2 columns for short data, responsive to 1 column on small screens */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Job Name (Editable) */}
                        <div>
                            <label htmlFor="edit-job-name" className="block text-sm font-medium text-gray-700 mb-1">Job Name</label>
                            <Input id="edit-job-name" 
                                value={editData.name}
                                onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                        </div>

                        {/* Company (Editable) */}
                        <div>
                            <label htmlFor="edit-job-company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                            <Input id="edit-job-company" 
                                value={editData.company}
                                onChange={(e) => setEditData({ ...editData, company: e.target.value })} />
                        </div>

                        {/* Role (Editable) */}
                        <div>
                            <label htmlFor="edit-job-role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                            <Input id="edit-job-role" 
                                value={editData.role}
                                onChange={(e) => setEditData({ ...editData, role: e.target.value })} />
                        </div>
                        
                        {/* Location (Editable) */}
                        <div>
                            <label htmlFor="edit-job-location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <Input id="edit-job-location" 
                                value={editData.location}
                                onChange={(e) => setEditData({ ...editData, location: e.target.value })} />
                        </div>
                        
                        {/* Stage (Editable) */}
                        <div>
                            <label htmlFor="edit-job-stage" className="block text-sm font-medium text-gray-700 mb-1">Current Stage</label>
                            <Input id="edit-job-stage" 
                                value={editData.stage}
                                onChange={(e) => setEditData({ ...editData, stage: e.target.value })} />
                        </div>
                        
                        {/* Source (Editable) */}
                        <div>
                            <label htmlFor="edit-job-source" className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                            <Input id="edit-job-source" 
                                value={editData.source}
                                onChange={(e) => setEditData({ ...editData, source: e.target.value })} />
                        </div>
                        
                        {/* Notes (Editable) - Spans 2 columns (Field dengan data panjang) */}
                        <div className="md:col-span-2">
                            <label htmlFor="edit-job-notes" className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                            <Textarea id="edit-job-notes" 
                                value={editData.notes}
                                onChange={(e) => setEditData({ ...editData, notes: e.target.value })} />
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                        {/* ISOLATED DESTRUCTIVE ACTION (Left Side) */}
                        <Button 
                            size="sm"
                            variant="ghost" 
                            onClick={() => handleDelete(selectedJobId!)} 
                            title="Delete Job"
                        >
                            <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
                        </Button>
                        
                        {/* PRIMARY ACTIONS (Right Side) */}
                        <div className="flex gap-3">
                            <Button variant="outline" onClick={() => setIsDetailModalOpen(false)}>Cancel</Button>
                            <Button onClick={handleDetailUpdate}>Save Changes</Button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center p-8">
                    <Spinner size="lg" />
                    <p className="mt-4 text-gray-600">Loading Job Details...</p>
                </div>
            )}
        </Modal>

        {/* Filters & Add Button */}
        <div className="flex flex-col md:flex-row md:justify-start md:items-center gap-4 bg-gray-50 rounded-xl">
          <div className="relative w-full md:flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search by job name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white pl-10"
            />
          </div>
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
  
        {/* Job Cards */}
        {filteredJobs.length === 0 ? (
          <p className="text-gray-500 text-center p-6 border rounded-xl bg-white">No jobs found matching your criteria.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredJobs.map((job) => (
              <Card
                key={job.id}
                className="group hover:border-blue-400 cursor-pointer"
                onClick={() => handleJobCardClick(job.id)}
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
              </Card>
            ))}
          </div>
        )}
      </div>
    );
}
