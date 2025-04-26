import { useState } from "react";
import { getMenuRecommendation } from "../service/openai";
import useSaveRecommandation from "@/hooks/useSaveRecommandation";
import useFixedScroll from "@/hooks/useFixedScroll";
import ChatMessage from "@/components/home/chat/ChatMessage";

import Prompt from "@/components/home/prompt/Prompt";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { saveRecommandation } = useSaveRecommandation();
  const anchoringRef = useFixedScroll(messages);

  const requestRecommend = async () => {
    const userMsg: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const { menu, reason } = await getMenuRecommendation(input);
    const aiMsg: ChatMessage = {
      role: "assistant",
      content: `${menu}\n\n${reason}`,
    };

    await saveRecommandation({
      menu,
      desc: reason,
      prompt: input,
    });
    setMessages((prev) => [...prev, aiMsg]);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    await requestRecommend();
  };

  return (
    <div className="mx-auto  p-4 space-y-4">
      <div className="fixed w-full md:max-w-2/3 left-0 right-0 m-auto bottom-0 md:bottom-[50px]">
        <div className="space-y-2 px-5 md:px-0 overflow-y-auto max-h-[400px] flex flex-col ">
          {messages.map((msg, idx) => (
            <ChatMessage key={idx} role={msg.role} content={msg.content} />
          ))}
          {loading && (
            <ChatMessage role="assistant" content="추천 중이에요..." />
          )}
          <div ref={anchoringRef}></div>
        </div>
        <Prompt
          handleSubmit={handleSubmit}
          input={input}
          setInput={setInput}
          requestRecommend={requestRecommend}
        />
      </div>
    </div>
  );
}
