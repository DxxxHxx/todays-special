export default function ChatMessage({
  role,
  content,
}: {
  role: "user" | "assistant";
  content: string;
}) {
  const isUser = role === "user";

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
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
      {isUser && <span className="text-2xl">👀</span>}
    </div>
  );
}
