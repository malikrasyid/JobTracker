import { useEffect, useState } from "react";
import { usePipelineStore } from "../../services/store";
import { Loader2, Plus, Trash2, Edit2, Search, X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Modal } from "../ui/modal";

export default function PipelineContent() {
  const {
    pipelines,
    loading,
    error,
    fetchPipelines,
    createPipeline,
    updatePipeline,
    deletePipeline,
  } = usePipelineStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPipelineName, setNewPipelineName] = useState("");
  const [stages, setStages] = useState<string[]>([]);
  const [currentStageInput, setCurrentStageInput] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  useEffect(() => {
    fetchPipelines();
  }, [fetchPipelines]);

  const handleAddStage = () => {
    const trimmedStage = currentStageInput.trim();
    if (trimmedStage && !stages.includes(trimmedStage)) {
      setStages([...stages, trimmedStage]);
      setCurrentStageInput("");
    }
  };

  const handleRemoveStage = (stageToRemove: string) => {
    setStages(stages.filter(stage => stage !== stageToRemove));
  };

  const handleStageInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddStage();
    }
  };

  const resetModalState = () => {
    setNewPipelineName("");
    setStages([]);
    setCurrentStageInput("");
    setIsModalOpen(false);
  };

  // 🆕 Create pipeline
  const handleCreate = async () => {
    if (!newPipelineName.trim() || stages.length === 0) return;
    await createPipeline({ name: newPipelineName, stages: stages });
    resetModalState();
  };

  // ✏️ Update pipeline
  const handleUpdate = async (id: string) => {
    if (!editingName.trim()) return;
    await updatePipeline(id, { name: editingName });
    setEditingId(null);
    setEditingName("");
  };

  // ❌ Delete pipeline
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this pipeline?")) {
      await deletePipeline(id);
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
        {error || "Failed to load pipelines."}
      </div>
    );

    return (
      <div className="space-y-6">

        {/* CREATE PIPELINE MODAL */}
        <Modal isOpen={isModalOpen} onClose={resetModalState}>
          <h3 className="text-xl font-semibold mb-6 text-blue-700">Create New Pipeline</h3>
          
          <div className="space-y-4">
            {/* Pipeline Name Input */}
            <div>
              <label htmlFor="pipeline-name" className="block text-sm font-medium text-gray-700 mb-1">Pipeline Name</label>
              <Input
                id="pipeline-name"
                placeholder="e.g., Software Engineering, Sales Funnel"
                value={newPipelineName}
                onChange={(e) => setNewPipelineName(e.target.value)}
              />
            </div>

            {/* Stages Input and Add Button */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pipeline Stages</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter stage name (e.g., Applied, Interview)"
                  value={currentStageInput}
                  onChange={(e) => setCurrentStageInput(e.target.value)}
                  onKeyDown={handleStageInputKeyDown}
                />
                <Button onClick={handleAddStage} variant="secondary" className="shrink-0">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Stages List Display */}
            <div>
              <p className="text-sm text-gray-500 mb-2">Stages ({stages.length})</p>
              <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border border-dashed rounded-lg">
                {stages.length === 0 ? (
                  <p className="text-sm text-gray-400 italic">No stages added yet.</p>
                ) : (
                  stages.map((stage) => (
                    <span 
                      key={stage} 
                      className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {stage}
                      <button 
                        onClick={() => handleRemoveStage(stage)}
                        className="text-blue-500 hover:text-blue-700 p-0.5 rounded-full hover:bg-blue-200 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={resetModalState}>Cancel</Button>
            <Button onClick={handleCreate} disabled={!newPipelineName.trim() || stages.length === 0}>
              Create Pipeline
            </Button>
          </div>
        </Modal>
        
        {/* ➕ Add New Pipeline - Improved grouping and background */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-gray-50 rounded-xl">
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="Enter new pipeline name"
                value={newPipelineName}
                onChange={(e) => setNewPipelineName(e.target.value)}
                className="w-full bg-white pl-10"
              />
          </div>
          <div className="flex justify-end bg-gray-50 rounded-xl">
            <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> New Pipeline
            </Button>
          </div>
        </div>
  
        {/* 🧱 Pipeline List */}
        {pipelines.length === 0 ? (
          <p className="text-gray-500 text-center py-10 p-6 border rounded-xl bg-white">
            No pipelines found. A <span className="font-semibold text-blue-600">default pipeline</span> will be created automatically.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pipelines.map((pipe) => (
              <Card key={pipe.id} className="group hover:border-blue-400">
                <CardHeader className="flex-row items-center justify-between p-4">
                  {editingId === pipe.id ? (
                    <Input
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    <CardTitle className="text-xl">
                      {pipe.name}
                    </CardTitle>
                  )}
                </CardHeader>
                <CardContent className="space-y-3 p-4 pt-0 pb-0">
                  {/* Stages Display */}
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-700">Stages:</p>
                    <div className="flex flex-wrap gap-1">
                      {pipe.stages?.length === 0 ? (
                        <span className="text-sm text-gray-500 italic">No stages defined</span>
                      ) : (
                        pipe.stages?.map((stage: string, index: number) => (
                          <span key={index} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                            {stage}
                          </span>
                        ))
                      )}
                    </div>
                  </div>                              
                </CardContent>
                {/* Action Buttons (Repositioned to the bottom right) */}
                <div className="flex justify-end gap-1 p-4 pt-1 pb-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    {editingId === pipe.id ? (
                      <Button
                        size="sm"
                        onClick={() => handleUpdate(pipe.id)}
                        className="text-xs"
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingId(pipe.id);
                          setEditingName(pipe.name);
                        }}
                        title="Edit Pipeline"
                      >
                        <Edit2 className="w-4 h-4 text-gray-500 hover:text-blue-600" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(pipe.id)}
                      title="Delete Pipeline"
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
