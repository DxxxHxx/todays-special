import BookMarkButton from "./BookMarkButton";

export default function ChatMessage({
  role,
  content,
  loading = false,
}: {
  role: "user" | "assistant";
  content: string;
  loading?: boolean;
}) {
  const isUser = role === "user";

  return (
    <div
      className={`flex items-start gap-2 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && <span className="text-2xl">😋</span>}
      {loading ? (
        <div className="flex items-center justify-center p-5 ">
          <div className="flex space-x-2 animate-pulse">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          </div>
        </div>
      ) : (
        <div
          className={`max-w-xs rounded-lg px-4 py-2 text-sm shadow text-pretty ${
            isUser ? "bg-blue-600 text-white" : "bg-muted text-foreground"
          }`}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      )}
      {isUser && <span className="text-2xl">👀</span>}
      {!isUser && content.includes("추천 메뉴 : ") && (
        <BookMarkButton content={content} />
      )}
    </div>
  );
}
