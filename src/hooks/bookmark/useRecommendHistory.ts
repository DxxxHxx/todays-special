import { HistoryType } from "@/types/type/history";
import { useEffect, useState } from "react";
import { useAuth } from "../useAuth";
import supabase from "@/supabase/client";
import { RecommendHistory } from "@/types/interface/recommend";

const useRecommendHistory = (type: HistoryType) => {
  const user = useAuth();
  const [menus, setMenus] = useState<RecommendHistory[]>([]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      let query = supabase
        .from("recommendations")
        .select("*")
        .eq("user_id", user?.id);

      if (type === "bookmarked") {
        query = query.eq("is_bookmarked", true);
      }

      const { data: menu, error } = await query;

      if (error) {
        console.log(error.message);
        return;
      }
      setMenus(menu);
    })();
  }, [user, type]);

  return menus;
};

export default useRecommendHistory;
