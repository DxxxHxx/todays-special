import { Textarea } from "@/components/ui/textarea";
import { ArrowUp } from "lucide-react";
import React from "react";

export default function Prompt({
  handleSubmit,
  input,
  setInput,
  requestRecommend,
}: {
  handleSubmit: (e: React.FormEvent) => void;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  requestRecommend: () => Promise<void>;
}) {
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 pt-4 relative">
      <Textarea
        className="w-full resize-none md:rounded-xl border p-5 h-[150px] shadow"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={5}
        cols={50}
        onKeyDown={async (e) => {
          if (e.key !== "Enter") return;
          e.preventDefault();
          await requestRecommend();
        }}
      />
      <button className="border absolute bottom-[10px] right-[10px] md:bottom-[20px] md:right-[20px] p-2 rounded-full bg-foreground text-secondary cursor-pointer hover:bg-muted-foreground transition-colors duration-200">
        <ArrowUp />
      </button>
    </form>
  );
}
