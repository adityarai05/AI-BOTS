import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { uploadKnowledge } from "@/api/knowledgeApi";

interface KnowledgeUploaderProps {
  botId: string;
  onSuccess?: () => void;
}

export default function KnowledgeUploader({ botId, onSuccess }: KnowledgeUploaderProps) {
  const [content, setContent] = useState("");
  const mutation = useMutation({
    mutationFn: () => uploadKnowledge(botId, content.trim()),
    onSuccess: () => {
      setContent("");
      onSuccess?.();
    },
  });

  return (
    <div className="rounded-3xl border border-white/5 bg-white/[0.03] p-6 md:p-8 space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-black text-white uppercase tracking-tight">Paste Knowledge</h2>
        <p className="text-sm text-gray-400">
          Paste FAQs, documentation snippets, or any text content for training.
        </p>
      </div>

      <div className="space-y-2">
        <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Knowledge Text</Label>
        <Textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className="bg-white/5 border-white/10 rounded-xl min-h-[160px]"
          placeholder="Paste your knowledge content here..."
        />
      </div>

      <Button
        onClick={() => mutation.mutate()}
        disabled={!content.trim() || mutation.isPending}
        className="h-12 rounded-xl bg-primary text-black font-black uppercase tracking-widest"
      >
        {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
        Upload Knowledge
      </Button>

      {mutation.isError && (
        <p className="text-sm text-red-400">Upload failed. Please try again.</p>
      )}
      {mutation.isSuccess && (
        <p className="text-sm text-emerald-400">Knowledge uploaded successfully.</p>
      )}
    </div>
  );
}
