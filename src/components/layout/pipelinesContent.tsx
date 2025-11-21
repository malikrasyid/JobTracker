import { useEffect, useState } from "react";
import { usePipelineStore } from "../../services/store";
import { Loader2, Plus, Trash2, Edit2, LayoutDashboard } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

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

  const [newPipelineName, setNewPipelineName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  useEffect(() => {
    fetchPipelines();
  }, [fetchPipelines]);

  // 🆕 Create pipeline
  const handleCreate = async () => {
    if (!newPipelineName.trim()) return;
    await createPipeline({ name: newPipelineName });
    setNewPipelineName("");
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
        {/* ➕ Add New Pipeline - Improved grouping and background */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-gray-50 rounded-xl">
          <Input
            placeholder="Enter new pipeline name"
            value={newPipelineName}
            onChange={(e) => setNewPipelineName(e.target.value)}
            className="w-full bg-white sm:w-64"
          />
          <Button onClick={handleCreate} variant="secondary" className="flex items-center gap-2 w-full sm:w-auto">
            <Plus className="w-4 h-4" /> Add Pipeline
          </Button>
        </div>
  
        {/* 🧱 Pipeline List */}
        {pipelines.length === 0 ? (
          <p className="text-gray-500 text-center py-10 p-6 border rounded-xl bg-white">
            No pipelines found. A <span className="font-semibold text-blue-600">default pipeline</span> will be created automatically.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pipelines.map((pipe) => (
              <Card key={pipe.id} className="cursor-pointer hover:border-blue-400">
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
                <CardContent className="flex justify-between items-center p-4 pt-0">
                  <div className="text-sm text-gray-500">
                    ID: <span className="font-mono text-xs">{pipe.id.substring(0, 8)}...</span>
                  </div>
  
                  <div className="flex items-center gap-1">
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
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
}
