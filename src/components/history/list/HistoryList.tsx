import useRecommendHistory from "@/hooks/bookmark/useRecommendHistory";
import { HistoryType } from "@/types/type/history";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { usePageIndexStore } from "@/store/history/usePageIndexStore";
import PaginationButtons from "./PaginationButtons";
import HistoryListSkeleton from "@/components/skeleton/HistoryListSkeleton";
import HistoryTable from "./HistoryTable";

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

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["my-menu-history"] });
  }, [pageIndex, queryClient]);

  if (isLoading) return <HistoryListSkeleton />;
  return (
    <>
      <HistoryTable
        listTitle={status === "all" ? "최근 추천 기록" : "즐겨찾기 목록"}
        menus={menus}
      />

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
