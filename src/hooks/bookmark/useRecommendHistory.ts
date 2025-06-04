import { HistoryType } from "@/types/type/history";
import supabase from "@/supabase/client";
import { useOutletContext } from "react-router-dom";
import { keepPreviousData, useQueries } from "@tanstack/react-query";
import { RecommendHistory } from "@/types/interface/recommend";
import { User } from "@supabase/supabase-js";
import { PAGE_SIZE } from "@/components/history/list/HistoryList";

const useRecommendHistory = (type: HistoryType, pageIndex: number) => {
  const { user }: { user: User } = useOutletContext();

  return useQueries({
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
};

export default useRecommendHistory;
