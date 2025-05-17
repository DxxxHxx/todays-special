import { Button } from "@/components/ui/button";
import useBookmarkMenu from "@/hooks/useBookmarkMenu";
import useBookmarkInfoStore from "@/store/bookmark/bookmarkInfoStore";
import { Star } from "lucide-react";

import { toast } from "sonner";

export default function BookMarkButton({ menu }: { menu: string }) {
  const { id, isBookmarked } = useBookmarkInfoStore();

  const bookmark = useBookmarkMenu(id!, isBookmarked)!;

  const handleBookmarkTriggerClick = async () => {
    try {
      await bookmark();

      toast(`${menu}이(가) 즐겨찾기에 추가되었습니다.`, {
        description: new Date().toLocaleString(),
        action: {
          label: "닫기",
          onClick: () => console.log("Undo"),
        },
      });
    } catch (e) {
      alert(e);
    }
  };
  return (
    <Button className="save-button" onClick={handleBookmarkTriggerClick}>
      <Star
        className={`size-5 ${isBookmarked ? "stroke-0 fill-yellow-400" : ""}`}
      />
      즐겨찾기
    </Button>
  );
}
