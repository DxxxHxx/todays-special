import { Button } from "@/components/ui/button";
import useRecommendHistory from "@/hooks/bookmark/useRecommendHistory";
import supabase from "@/supabase/client";
import { RecommendHistory } from "@/types/interface/recommend";
import { HistoryType } from "@/types/type/history";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export default function HistoryList() {
  const [searchParams] = useSearchParams();
  const { data: menus, isLoading } = useRecommendHistory(
    searchParams.get("status") as HistoryType
  );
  if (isLoading) return <h1>loading...</h1>;
  return (
    <>
      {" "}
      {menus?.map((item) => (
        <div className="flex items-center mb-5 gap-x-5" key={item.id}>
          <h1>{item.menu_name}</h1>
          <BookmarkBtn {...item} />
          <SearchPlaceButton menu={item.menu_name} />
        </div>
      ))}{" "}
    </>
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

const SearchPlaceButton = ({ menu }: { menu: string }) => {
  return (
    <Link to={`/map?menu=${menu.trim()}`}>
      <Button variant={"destructive"}>내 주변 찾아보기</Button>
    </Link>
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
