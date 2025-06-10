import ChatMessage from "./ChatMessage";
import useFixedScroll from "@/hooks/useFixedScroll";
import { ChatMessage as IChatMessage } from "@/page/Home";
import MainLogo from "../logo/MainLogo";
import ChatLoading from "./ChatLoading";

export default function ChatBox({
  messages,
  loading,
}: {
  messages: IChatMessage[];
  loading: boolean;
}) {
  const anchoringRef = useFixedScroll(messages);

  return (
    <div className="space-y-2 relative px-5 md:px-0 overflow-y-auto max-h-[400px] flex flex-col ">
      {messages.map((msg, idx) => (
        <ChatMessage key={idx} msg={msg} />
      ))}
      {loading && <ChatLoading />}
      {messages.length === 0 && <MainLogo />}
      <div ref={anchoringRef}></div>
    </div>
  );
}
