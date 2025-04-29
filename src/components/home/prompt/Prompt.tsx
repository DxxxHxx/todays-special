import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { ArrowUp } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const user = useAuth();
  const handleNavigate = () => {
    if (!user) {
      alert("로그인 후 이용 가능합니다..");
      return;
    }
    navigate("/map");
  };
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 pt-4 relative">
      <Textarea
        placeholder="기분이나 날씨, 재료 등 상황에 맞게 음식을 추천해드릴게요."
        className="w-full resize-none md:rounded-xl border p-5 h-[150px] shadow-lg"
        value={input}
        onChange={(e) => setInput(e.target.value)}
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
        <Button onClick={handleNavigate}>내 주변 추천음식 찾기</Button>
        <button className="border  p-2 rounded-full bg-foreground text-secondary cursor-pointer hover:bg-muted-foreground transition-colors duration-200">
          <ArrowUp />
        </button>
      </div>
    </form>
  );
}
