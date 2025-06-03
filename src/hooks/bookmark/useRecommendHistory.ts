import { HistoryType } from "@/types/type/history";
import supabase from "@/supabase/client";
import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RecommendHistory } from "@/types/interface/recommend";

const useRecommendHistory = (type: HistoryType) => {
  const { id }: { id: string } = useOutletContext();

  return useQuery({
    queryKey: ["my-menu-history", type],
    queryFn: async () => {
      let query = supabase
        .from("recommendations")
        .select("*")
        .eq("user_id", id)
        .order("created_at", { ascending: false });

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
  });
};

export default useRecommendHistory;
