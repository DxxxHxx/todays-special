import { HistoryType } from "@/types/type/history";
import supabase from "@/supabase/client";
import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const useRecommendHistory = (type: HistoryType) => {
  const { id }: { id: string } = useOutletContext();

  return useQuery({
    queryKey: ["my-menu-history", type],
    queryFn: async () => {
      let query = supabase
        .from("recommendations")
        .select("*")
        .eq("user_id", id);

      if (type === "bookmarked") {
        query = query.eq("is_bookmarked", true);
      }

      const { data: menu, error } = await query;

      if (error) {
        console.log(error.message);
        return;
      }
      return menu;
    },
    staleTime: 0,
    gcTime: 0,
  });
};

export default useRecommendHistory;
