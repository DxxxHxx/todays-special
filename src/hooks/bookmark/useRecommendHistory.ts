import { HistoryType } from "@/types/type/history";
import supabase from "@/supabase/client";
import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RecommendHistory } from "@/types/interface/recommend";
import { User } from "@supabase/supabase-js";

const useRecommendHistory = (type: HistoryType) => {
  const { user }: { user: User } = useOutletContext();

  return useQuery({
    queryKey: ["my-menu-history", type],
    queryFn: async () => {
      let query = supabase
        .from("recommendations")
        .select("*")
        .eq("user_id", user.id)
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
