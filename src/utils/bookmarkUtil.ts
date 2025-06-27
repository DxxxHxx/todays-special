import supabase from "@/supabase/client";

const handleBookmark = async (recommandId: string) => {
  const { data: recommendations } = await supabase
    .from("recommendations")
    .select("is_bookmarked")
    .eq("id", recommandId);

  const [menu] = recommendations as { is_bookmarked: boolean }[];

  const isBookmarked = menu.is_bookmarked;

  const { error } = await supabase
    .from("recommendations")
    .update({ is_bookmarked: !isBookmarked })
    .eq("id", recommandId)
    .select();

  if (error) {
    console.log("요청에 실패 했습니다. 잠시 후 시도해주세요.");
    return;
  }

  console.log(`${isBookmarked}에서 ${!isBookmarked}로 변경`);
  return !isBookmarked;
};
export default handleBookmark;
