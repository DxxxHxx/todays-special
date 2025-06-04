import supabase from "@/supabase/client";

const useBookmarkMenu = (recommandId: string) => {
  const handleBookmark = async () => {
    const { data: recommendations } = await supabase
      .from("recommendations")
      .select("is_bookmarked")
      .eq("id", recommandId);

    const isBookmarked = recommendations?.[0]?.is_bookmarked;

    const { error } = await supabase
      .from("recommendations")
      .update({ is_bookmarked: !isBookmarked })
      .eq("id", recommandId)
      .select();

    if (error) {
      alert("요청에 실패 했습니다. 잠시 후 시도해주세요.");
      return;
    }

    console.log(`${isBookmarked}에서 ${!isBookmarked}로 변경`);
    return !isBookmarked as boolean;
  };

  return handleBookmark;
};

export default useBookmarkMenu;
