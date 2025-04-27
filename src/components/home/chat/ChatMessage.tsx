import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";

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

  const handleBookmarkTriggerClick = () => {
    toast("즐겨찾기에 추가되었습니다.", {
      description: new Date().toLocaleString(),
      action: {
        label: "닫기",
        onClick: () => console.log("Undo"),
      },
    });
  };

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
      {!isUser && (
        <Button className="save-button" onClick={handleBookmarkTriggerClick}>
          <Star className="size-5" />
          즐겨찾기
        </Button>
      )}
    </div>
  );
}
