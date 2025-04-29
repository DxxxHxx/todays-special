import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Star } from "lucide-react";
import { toast } from "sonner";

export default function BookMarkButton({ content }: { content: string }) {
  const user = useAuth();
  const handleBookmarkTriggerClick = () => {
    if (!user) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }
    const targetMenu = content
      .split("<p>")[0]
      .replace("추천 메뉴 :", "")
      .trim();

    toast(`${targetMenu}이(가) 즐겨찾기에 추가되었습니다.`, {
      description: new Date().toLocaleString(),
      action: {
        label: "닫기",
        onClick: () => console.log("Undo"),
      },
    });
  };
  return (
    <Button className="save-button" onClick={handleBookmarkTriggerClick}>
      <Star className="size-5" />
      즐겨찾기
    </Button>
  );
}
