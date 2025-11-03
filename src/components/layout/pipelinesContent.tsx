import { useEffect, useState } from "react";
import { usePipelineStore } from "../../services/store";
import { Loader2, Plus, Trash2, Edit2 } from "lucide-react";
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
      {/* ➕ Add New Pipeline */}
      <div className="flex items-center gap-3">
        <Input
          placeholder="New pipeline name"
          value={newPipelineName}
          onChange={(e) => setNewPipelineName(e.target.value)}
          className="w-64"
        />
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Pipeline
        </Button>
      </div>

      {/* 🧱 Pipeline List */}
      {pipelines.length === 0 ? (
        <div className="text-gray-500 text-center py-10">
          No pipelines found. A <span className="font-semibold">default pipeline</span> will be created automatically.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pipelines.map((pipe: any) => (
            <Card key={pipe.id} className="hover:shadow-lg transition-all">
              <CardHeader className="flex justify-between items-center">
                {editingId === pipe.id ? (
                  <Input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="w-full"
                  />
                ) : (
                  <CardTitle>{pipe.name}</CardTitle>
                )}
              </CardHeader>
              <CardContent className="flex justify-between items-center mt-3">
                <div className="text-sm text-gray-600">
                  ID: <span className="text-gray-500">{pipe.id}</span>
                </div>

                <div className="flex items-center gap-2">
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
                    >
                      <Edit2 className="w-4 h-4 text-gray-600" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(pipe.id)}
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
