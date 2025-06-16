import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import useBookmarkInfoStore from "@/store/bookmark/bookmarkInfoStore";
import handleBookmark from "@/utils/bookmarkUtil";
import triggerToast from "@/utils/toast";
import { Star } from "lucide-react";
import { useState } from "react";

export default function BookMarkButton({ menu }: { menu: string }) {
  const { handleBookmarkTriggerClick, isBookmarked } = useBookmark(menu);
  return (
    <Button className="save-button" onClick={handleBookmarkTriggerClick}>
      <Star
        className={`size-4 ${isBookmarked ? "stroke-0 fill-yellow-400" : ""}`}
      />
      즐겨찾기
    </Button>
  );
}

const useBookmark = (menu: string) => {
  const { id } = useBookmarkInfoStore();
  const [isBookmarked, setIsBookmarked] = useState<undefined | boolean>();
  const user = useAuth();

  const handleBookmarkTriggerClick = async () => {
    if (!user) {
      return triggerToast("로그인 후 이용가능합니다.");
    }
    try {
      const isBookmarked = await handleBookmark(id!);
      if (typeof isBookmarked === "boolean") {
        setIsBookmarked(isBookmarked);
        triggerToast(
          `${menu}이(가) 즐겨찾기${
            isBookmarked ? "에 추가되었습니다." : "에서 삭제되었습니다."
          }`
        );
      } else {
        triggerToast("요청에 실패했습니다.");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return { isBookmarked, handleBookmarkTriggerClick };
};
