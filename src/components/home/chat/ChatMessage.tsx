import { ChatMessage as ChatMsgType } from "@/page/Home";
import BookMarkButton from "./BookMarkButton";

export default function ChatMessage({ msg }: { msg: ChatMsgType }) {
  const isUser = msg.role === "user";

  return (
    <div
      className={`flex items-start gap-2 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && <span className="text-2xl">😋</span>}
      <div
        className={`max-w-xs rounded-lg px-4 py-2 text-sm shadow text-pretty ${
          isUser ? "bg-blue-600 text-white" : "bg-muted text-foreground"
        }`}
        dangerouslySetInnerHTML={{ __html: msg.content }}
      ></div>
      {isUser && <span className="text-2xl">👀</span>}
      {msg.hasMenu && <BookMarkButton menu={msg.menu!} />}
    </div>
  );
}
