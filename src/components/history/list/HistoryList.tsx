import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import useRecommendHistory from "@/hooks/bookmark/useRecommendHistory";
import supabase from "@/supabase/client";
import { RecommendHistory } from "@/types/interface/recommend";
import { HistoryType } from "@/types/type/history";
import triggerToast from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { usePageIndexStore } from "@/store/history/usePageIndexStore";
import PaginationButtons from "./PaginationButtons";
import HistoryListSkeleton from "@/components/skeleton/HistoryListSkeleton";

const tableHeadList = [
  { id: 1, text: "메뉴 명" },
  { id: 2, text: "추가 일" },
  { id: 3, text: "즐겨찾기" },
  { id: 4, text: "주변 식당 찾기" },
];

export const PAGE_SIZE = 5;
export default function HistoryList() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") as HistoryType;
  const queryClient = useQueryClient();
  const { pageIndex, handleNextPage, handlePrevPage } = usePageIndexStore();
  const {
    data: menus,
    isLoading,
    pages,
  } = useRecommendHistory(status, pageIndex);
  const listTitle = status === "all" ? "최근 추천 기록" : "즐겨찾기 목록";

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["my-menu-history"] });
  }, [pageIndex, queryClient]);

  useEffect(() => {
    if (menus?.length === 0) {
      handlePrevPage();
      return;
    }
  }, [menus, handlePrevPage]);

  if (isLoading) return <HistoryListSkeleton />;
  return (
    <>
      <Table className="w-full h-[321px]">
        <TableCaption>{listTitle}</TableCaption>
        <TableHeader>
          <TableRow className="flex justify-between">
            {tableHeadList.map((item) => (
              <TableHead key={item.id} className="table-col">
                {item.text}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {menus?.length === 0 || menus === undefined ? (
            <h1 className="my-5 text-center">결과 없음</h1>
          ) : (
            <>
              {menus?.map((menu) => (
                <TableRow key={menu.id} className="flex justify-between">
                  <TableCell className="table-col">{menu.menu_name}</TableCell>
                  <TableCell className="table-col">
                    {new Date(menu.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="table-col">
                    <BookmarkBtn {...menu} />
                  </TableCell>
                  <TableCell className="table-col">
                    <SearchPlaceButton menu={menu.menu_name} />
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>

      <PaginationButtons
        pages={pages}
        paginationHandler={{
          next: handleNextPage,
          prev: handlePrevPage,
        }}
      />
    </>
  );
}

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

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

        triggerToast(
          `${menu_name}이(가) 즐겨찾기${
            newBookmarkStatus ? "에서 삭제되었습니다." : "에 추가되었습니다."
          }`
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
      <Button variant={"destructive"} className="text-xs">
        내 주변 찾아보기
      </Button>
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
      ["my-menu-history", "hitory-max-page"].forEach((queryKey) =>
        queryClient.invalidateQueries({
          queryKey: [queryKey],
        })
      );

      return isBookmarked;
    },
    onError: () => {
      triggerToast("북마크 상태 변경에 실패했습니다.");
    },
  });
};
