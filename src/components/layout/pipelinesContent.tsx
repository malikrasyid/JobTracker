import { useEffect, useMemo, useState } from "react";
import { usePipelineStore, type Pipeline } from "../../services/store";
import { Loader2, Plus, Trash2, Edit2, Search, X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Modal } from "../ui/modal";
import { Spinner } from "../ui/spinner";

export default function PipelineContent() {
  const {
    pipelines,
    pipeline: detailedPipeline,
    loading,
    error,
    fetchPipelines,
    fetchPipelineById,
    createPipeline,
    updatePipeline,
    deletePipeline,
  } = usePipelineStore();

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPipelineName, setNewPipelineName] = useState("");
  const [stages, setStages] = useState<string[]>([]);
  const [currentStageInput, setCurrentStageInput] = useState("");

  const [selectedPipelineId, setSelectedPipelineId] = useState<string | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editData, setEditData] = useState<Partial<Pipeline> | null>(null);

  useEffect(() => {
    fetchPipelines();
  }, [fetchPipelines]);

  useEffect(() => {
    if (selectedPipelineId && !isDetailModalOpen) {
        // If modal closed, clear selected pipeline to clean up state
        setSelectedPipelineId(null);
        setEditData(null);
    } else if (selectedPipelineId && isDetailModalOpen) {
        fetchPipelineById(selectedPipelineId);
    }
  }, [selectedPipelineId, isDetailModalOpen, fetchPipelineById]);
  
  // Effect to initialize editData once detailedPipeline is fetched
  useEffect(() => {
    if (detailedPipeline && detailedPipeline.id === selectedPipelineId) {
        // Initialize local edit state with fetched data
        setEditData(detailedPipeline);
    }
  }, [detailedPipeline, selectedPipelineId]);

  const filteredPipeline = useMemo(() => {
    return pipelines.filter((pipeline) => {
      const matchSearch = pipeline.name.toLowerCase().includes(search.toLowerCase());
      return matchSearch;
    });
  }, [pipelines, search]);

  const handleAddStage = (input: string, dataStateSetter: React.Dispatch<React.SetStateAction<any>>, currentStages: string[]) => {
    const trimmedStage = input.trim();
    if (trimmedStage && !currentStages.includes(trimmedStage)) {
      dataStateSetter([...currentStages, trimmedStage]);
      setCurrentStageInput(""); // Only clear for the creation modal input
    }
  };

  const handleRemoveStage = (stageToRemove: string, dataStateSetter: React.Dispatch<React.SetStateAction<any>>, currentStages: string[]) => {
    dataStateSetter(currentStages.filter(stage => stage !== stageToRemove));
  };

  const handleStageInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, dataStateSetter: React.Dispatch<React.SetStateAction<any>>, currentStages: string[]) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Use event target value for adding stage in modal context
      const inputElement = e.target as HTMLInputElement;
      handleAddStage(inputElement.value, dataStateSetter, currentStages);
      // Manually clear input after adding if it's the creation modal's input
      if (dataStateSetter === setStages as any) {
          setCurrentStageInput("");
      }
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
  const handleDetailUpdate = async () => {
    if (!selectedPipelineId || !editData || !editData.name?.trim()) return;
    await updatePipeline(selectedPipelineId, { name: editData.name, stages: editData.stages });
    setIsDetailModalOpen(false);
  }

  // ❌ Delete pipeline
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this pipeline?")) {
      await deletePipeline(id);
    }
  };

  const handlePipelineCardClick = (pipelineId: string) => {
    setSelectedPipelineId(pipelineId);
    setIsDetailModalOpen(true);
}

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
                  onKeyDown={(e) => handleStageInputKeyDown(e, setStages, stages)}
                />
                <Button onClick={() => handleAddStage(currentStageInput, setStages, stages)} variant="primary" className="shrink-0">
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
                        onClick={() => handleRemoveStage(stage, setStages, stages)}
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

        {/* PIPELINE DETAIL/EDIT MODAL */}
        <Modal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)}>
            {editData ? (
                <>
                    {/* HEADER: Removed Delete button from here */}
                    <h3 className="text-xl font-semibold mb-6 text-blue-700">
                        {editData.name}
                    </h3>
                    
                    <div className="space-y-4">
                        {/* Pipeline Name Input (Editable) */}
                        <div>
                            <label htmlFor="edit-pipeline-name" className="block text-sm font-medium text-gray-700 mb-1">Pipeline Name</label>
                            <Input
                                id="edit-pipeline-name"
                                value={editData.name}
                                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                            />
                        </div>

                        {/* Stages Input and Add Button (Editable) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pipeline Stages</label>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Enter new stage name"
                                    // Use local currentStageInput state, but when adding, update editData
                                    value={currentStageInput} 
                                    onChange={(e) => setCurrentStageInput(e.target.value)}
                                    onKeyDown={(e) => handleStageInputKeyDown(e, (newStages: string[]) => setEditData(s => ({ ...s, stages: newStages })), editData.stages || [])}
                                />
                                <Button 
                                    onClick={() => handleAddStage(currentStageInput, (newStages: string[]) => setEditData(s => ({ ...s, stages: newStages })), editData.stages || [])} 
                                    variant="secondary" 
                                    className="shrink-0"
                                >
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                        
                        {/* Stages List Display (Editable) */}
                        <div>
                            <p className="text-sm text-gray-500 mb-2">Stages ({(editData.stages || []).length})</p>
                            <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border border-dashed rounded-lg">
                                {(editData.stages || []).length === 0 ? (
                                    <p className="text-sm text-gray-400 italic">No stages added yet.</p>
                                ) : (
                                    (editData.stages || []).map((stage) => (
                                        <span 
                                            key={stage} 
                                            className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                                        >
                                            {stage}
                                            <button 
                                                onClick={() => handleRemoveStage(stage, (newStages: string[]) => setEditData(s => ({ ...s, stages: newStages })), editData.stages || [])}
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

                    {/* MODIFIED FOOTER: Separate Delete from Save/Cancel */}
                    <div className="flex justify-between items-center mt-6">
                        {/* DESTRUCTIVE ACTION (Left Side) */}
                        <Button 
                            size="sm"
                            variant="ghost" 
                            onClick={() => handleDelete(selectedPipelineId!)} 
                            title="Delete Pipeline"
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
                    <p className="mt-4 text-gray-600">Loading Pipeline Details...</p>
                </div>
            )}
        </Modal>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-gray-50 rounded-xl">
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search by pipeline name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
        {filteredPipeline.length === 0 ? (
          <p className="text-gray-500 text-center py-10 p-6 border rounded-xl bg-white">
            No pipelines found. A <span className="font-semibold text-blue-600">default pipeline</span> will be created automatically.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPipeline.map((pipe) => (
              <Card 
              key={pipe.id} 
              className="cursor-pointer hover:border-blue-400"
              onClick={() => handlePipelineCardClick(pipe.id)}>
                <CardHeader className="flex-row items-center justify-between p-4">
                    <CardTitle className="text-xl">
                      {pipe.name}
                    </CardTitle>                  
                </CardHeader>
                <CardContent className="space-y-3 p-4 pt-0">
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
              </Card>
            ))}
          </div>
        )}
      </div>
    );
}
