import useSaveRecommandation from "@/hooks/useSaveRecommandation";
import { getMenuRecommendation } from "@/service/openai";
import { useState } from "react";

export default function HomePage() {
  const [recommendation, setRecommendation] = useState<null | {
    menu: string;
    reason: string;
  }>(null);
  const [loading, setLoading] = useState(false);
  const { saveRecommandation } = useSaveRecommandation();

  const handlePromptSubmit = async (prompt: string) => {
    setLoading(true);
    const result = await getMenuRecommendation(prompt);

    //db에 저장
    await saveRecommandation({
      desc: result.reason,
      menu: result.menu,
      prompt,
    });
    setRecommendation(result);
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">오늘 뭐 먹지? 🍽</h1>
      <PromptSection onSubmit={handlePromptSubmit} />
      {loading && <p className="mt-4 text-center">로딩 중...</p>}
      {recommendation && !loading && (
        <RecommendationResult
          menu={recommendation.menu}
          reason={recommendation.reason}
        />
      )}
    </div>
  );
}

function RecommendationResult({
  menu,
  reason,
}: {
  menu: string;
  reason: string;
}) {
  return (
    <div className="mt-6 p-4 bg--background text--primary rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">🥘 추천 메뉴: {menu}</h2>
      <p className="">{reason}</p>
    </div>
  );
}

function PromptSection({ onSubmit }: { onSubmit: (prompt: string) => void }) {
  const [prompt, setPrompt] = useState("든든한 한식 추천해줘");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onSubmit(prompt);
    setPrompt("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
      <textarea
        className="w-full p-3 border rounded-lg resize-none"
        placeholder="오늘 뭐 먹고 싶으신가요? (예: 든든한 한식 추천해줘)"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
      />
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        추천 받기
      </button>
    </form>
  );
}
