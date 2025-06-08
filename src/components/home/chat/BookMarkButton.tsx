import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import useBookmarkMenu from "@/hooks/useBookmarkMenu";
import useBookmarkInfoStore from "@/store/bookmark/bookmarkInfoStore";
import triggerToast from "@/utils/toast";
import { Star } from "lucide-react";
import { useState } from "react";

export default function BookMarkButton({ menu }: { menu: string }) {
  const { id } = useBookmarkInfoStore();
  const [isBookmarked, setIsBookmarked] = useState<null | boolean>(null);
  const user = useAuth();

  const bookmark = useBookmarkMenu(id!)!;

  const handleBookmarkTriggerClick = async () => {
    if (!user) {
      return triggerToast("로그인 후 이용가능합니다.");
    }
    try {
      const isBookmarked: boolean = (await bookmark()) ?? false;
      setIsBookmarked(isBookmarked);

      triggerToast(
        `${menu}이(가) 즐겨찾기${
          isBookmarked ? "에 추가되었습니다." : "에서 삭제되었습니다."
        }`
      );
    } catch (e) {
      alert(e);
    }
  };
  return (
    <Button className="save-button" onClick={handleBookmarkTriggerClick}>
      <Star
        className={`size-4 ${isBookmarked ? "stroke-0 fill-yellow-400" : ""}`}
      />
      즐겨찾기
    </Button>
  );
}
