import { useState } from "react";
import { getMenuRecommendation } from "../service/openai";
import useSaveRecommandation from "@/hooks/useSaveRecommandation";
import ChatMessage from "@/components/home/chat/ChatMessage";
import Prompt from "@/components/home/prompt/Prompt";
import ChatBox from "@/components/home/chat/ChatBox";
import { formatAiChatResponse } from "@/utils/\bformatAiChatResponse";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  hasMenu: boolean;
  menu?: string;
}
export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { saveRecommandation } = useSaveRecommandation();

  const requestRecommend = async () => {
    if (!input) return;

    const userMsg: ChatMessage = {
      role: "user",
      content: input,
      hasMenu: false,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const chatResponse = await getMenuRecommendation(input);

    const aiMsg: ChatMessage = {
      role: "assistant",
      content: formatAiChatResponse(chatResponse),
      hasMenu: chatResponse.hasMenu,
      menu: chatResponse.hasMenu ? chatResponse.menu : "",
    };

    if (chatResponse.hasMenu) {
      await saveRecommandation({
        menu: chatResponse.menu,
        desc: chatResponse.reason,
        prompt: input,
      });
    }
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
        <ChatBox loading={loading} messages={messages} />
        <Prompt
          handleSubmit={handleSubmit}
          input={input}
          requestRecommend={requestRecommend}
          handleInputChange={(input: string) => setInput(input)}
        />
      </div>
    </div>
  );
}
