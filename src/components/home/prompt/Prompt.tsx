import { Textarea } from "@/components/ui/textarea";
import { ArrowUp } from "lucide-react";
import React from "react";
import SearchRestaurantDialog from "./SearchRestaurantDialog";

export default function Prompt({
  handleSubmit,
  input,
  requestRecommend,
  handleInputChange,
}: {
  handleSubmit: (e: React.FormEvent) => void;
  input: string;
  requestRecommend: () => Promise<void>;
  handleInputChange: (input: string) => void;
}) {
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 pt-4 relative">
      <Textarea
        placeholder="기분이나 날씨, 재료 등 상황에 맞게 음식을 추천해드릴게요."
        className="w-full resize-none md:rounded-xl border p-5 h-[150px] shadow-lg"
        value={input}
        onChange={(e) => handleInputChange(e.target.value)}
        rows={5}
        cols={50}
        onKeyDown={async (e) => {
          if (e.key == "Enter") {
            e.preventDefault();
            if (e.nativeEvent.isComposing) {
              return;
            }
            await requestRecommend();
          }
        }}
      />
      <div className="absolute bottom-[10px] right-[10px] md:bottom-[20px] md:right-[20px] flex justify-center items-center gap-x-3">
        <SearchRestaurantDialog />
        <button className="border  p-2 rounded-full bg-foreground text-secondary cursor-pointer hover:bg-muted-foreground transition-colors duration-200">
          <ArrowUp />
        </button>
      </div>
    </form>
  );
}
