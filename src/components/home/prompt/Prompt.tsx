import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
  const handleNavigate = () => {
    if (localStorage.getItem("menu")) {
      navigate("/map", { state: { menu: localStorage.getItem("menu") } });
      return;
    } else {
      alert("최근 추천받은 음식이 없습니다.");
      return;
    }
  };
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
      <div className="absolute bottom-[10px] right-[10px] md:bottom-[20px] md:right-[20px] flex justify-center items-center gap-x-3">
        <Button onClick={handleNavigate}>내 주변 추천음식 찾기</Button>
        <button className="border  p-2 rounded-full bg-foreground text-secondary cursor-pointer hover:bg-muted-foreground transition-colors duration-200">
          <ArrowUp />
        </button>
      </div>
    </form>
  );
}
