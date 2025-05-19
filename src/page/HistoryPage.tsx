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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function HistoryPage() {
  const { handleOptionChange, option } = useSearchParamsOption();

  const { data: menus, isLoading } = useRecommendHistory(option);

  if (isLoading) return <h1>loading...</h1>;
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

      {menus?.map((item) => (
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

  const bookmark = useBookmarkMumation(id, is_bookmarked);
  return (
    <Button
      onClick={async () => {
        // const newBookmarkStatus = await handleBookmark(id, is_bookmarked);
        const res = await bookmark.mutateAsync();

        setNewBookmarkStatus(res);

        toast(
          `${menu_name}이(가) 즐겨찾기${
            newBookmarkStatus ? "에서 삭제되었습니다." : "에 추가되었습니다."
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

const useBookmarkMumation = (recommandId: string, isBookmarked: boolean) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data } = await supabase
        .from("recommendations")
        .update({ is_bookmarked: !isBookmarked })
        .eq("id", recommandId)
        .order("created_at", { ascending: false })
        .select("*");

      return data?.[0]?.is_bookmarked;
    },
    onSuccess: (isBookmarked) => {
      queryClient.invalidateQueries({
        queryKey: ["my-menu-history"],
      });

      return isBookmarked;
    },
    onError: (error) => {
      toast.error("북마크 상태 변경에 실패했습니다.", {
        description: error.message,
      });
    },
  });
};
