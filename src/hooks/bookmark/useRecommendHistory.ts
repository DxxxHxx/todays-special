import { HistoryType } from "@/types/type/history";
import supabase from "@/supabase/client";
import { useOutletContext } from "react-router-dom";
import { keepPreviousData, useQueries } from "@tanstack/react-query";
import { RecommendHistory } from "@/types/interface/recommend";
import { User } from "@supabase/supabase-js";
import { PAGE_SIZE } from "@/components/history/list/HistoryList";
import { useEffect } from "react";
import { usePageIndexStore } from "@/store/history/usePageIndexStore";

const useRecommendHistory = (type: HistoryType, pageIndex: number) => {
  const { user }: { user: User } = useOutletContext();
  const handlePrevPage = usePageIndexStore((s) => s.handlePrevPage);

  const res = useQueries({
    queries: [
      {
        queryKey: ["my-menu-history", type],
        queryFn: async () => {
          let query = supabase
            .from("recommendations")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
            .range(pageIndex, pageIndex + PAGE_SIZE - 1);

          if (type === "bookmarked") {
            query = query.eq("is_bookmarked", true);
          }

          const { data: menu, error } = await query;

          if (error) {
            console.log(error.message);
            return;
          }
          return menu as RecommendHistory[];
        },
        staleTime: 0,
        gcTime: 0,
        placeholderData: keepPreviousData,
      },
      {
        queryKey: ["hitory-max-page", type],
        queryFn: async () => {
          let query = supabase
            .from("recommendations")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

          if (type === "bookmarked") {
            query = query.eq("is_bookmarked", true);
          }

          const res = await query;

          return res.data?.length;
        },
        staleTime: 0,
        gcTime: 0,
      },
    ],
    combine: (res) => {
      const totalPage = Math.ceil(res[1].data! / PAGE_SIZE);
      const currentPage = pageIndex / PAGE_SIZE + 1;

      return {
        data: res[0].data,
        isLoading: res[0].isLoading,
        pages: {
          currentPage,
          totalPage,
        },
      };
    },
  });

  /**
   * 페이지에 아이템 하나도 없으면 이전 페이지로 이동
   * ex) 페이지에 즐겨찾기 아이템 한개 있을 때 즐겨찾기 삭제하면 이전 페이지로 이동
   */
  useEffect(() => {
    if (res.data?.length === 0) {
      handlePrevPage();
      return;
    }
  }, [res.data, handlePrevPage]);

  return res;
};

export default useRecommendHistory;
