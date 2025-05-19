import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useRecommendHistory from "@/hooks/bookmark/useRecommendHistory";
import useSearchParamsOption from "@/hooks/bookmark/useSearchParamsOption";
import supabase from "@/supabase/client";
import { RecommendHistory } from "@/types/interface/recommend";
import { Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function HistoryPage() {
  const { handleOptionChange, option } = useSearchParamsOption();

  const menus = useRecommendHistory(option);

  return (
    <div className="max-w-2/3 m-auto">
      <div className="ml-auto w-[180px] mb-10">
        <Select onValueChange={handleOptionChange} value={option}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="-- 전체 or 북마크 --" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>-- 전체 or 북마크 --</SelectLabel>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="bookmarked">북마크</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {menus.map((item) => (
        <div className="mb-5 flex items-center gap-x-5" key={item.id}>
          <h1>{item.menu_name}</h1>
          <BookmarkBtn {...item} />
        </div>
      ))}
    </div>
  );
}

const BookmarkBtn = ({
  id,
  is_bookmarked,
  menu_name,
}: Pick<RecommendHistory, "id" | "is_bookmarked" | "menu_name">) => {
  const [newBookmarkStatus, setNewBookmarkStatus] =
    useState<boolean>(is_bookmarked);
  return (
    <Button
      onClick={async () => {
        const newBookmarkStatus = await handleBookmark(id, is_bookmarked);
        setNewBookmarkStatus(newBookmarkStatus!);
        toast(
          `${menu_name}이(가) 즐겨찾기${
            newBookmarkStatus ? "에 추가되었습니다." : "에서 삭제되었습니다."
          }`,
          {
            description: new Date().toLocaleString(),
            action: {
              label: "닫기",
              onClick: () => console.log("Undo"),
            },
          }
        );
      }}
      variant={"outline"}
      className={`save-button`}
    >
      <Star
        className={`size-4 ${
          newBookmarkStatus ? "fill-yellow-400 stroke-0" : ""
        }`}
      />
      즐겨찾기
    </Button>
  );
};

const handleBookmark = async (recommandId: string, isBookmarked: boolean) => {
  const { error, data } = await supabase
    .from("recommendations")
    .update({ is_bookmarked: !isBookmarked })
    .eq("id", recommandId)
    .select();

  console.log(data);

  if (error) {
    console.log(error);
    alert("요청에 실패 했습니다. 잠시 후 시도해주세요.");
    return;
  }

  console.log(`${isBookmarked}에서 ${!isBookmarked}로 변경`);
  return !isBookmarked as boolean;
};
