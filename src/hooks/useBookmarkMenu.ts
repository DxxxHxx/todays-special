import supabase from "@/supabase/client";
import { useAuth } from "./useAuth";

const useBookmarkMenu = (recommandId: string, isBookmarked: boolean) => {
  const user = useAuth();
  if (!user) {
    alert("로그인 후 이용해주세요.");
    return;
  }

  const handleBookmark = async () => {
    console.log(`${isBookmarked}에서 ${!isBookmarked}로 변경돼야 함`);
    const { error } = await supabase
      .from("recommendations")
      .update({ is_bookmarked: !isBookmarked })
      .eq("id", recommandId)
      .select();

    if (error) {
      alert("요청에 실패 했습니다. 잠시 후 시도해주세요.");
      return;
    }
  };

  return handleBookmark;
};

export default useBookmarkMenu;
